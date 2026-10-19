const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const cheerio = require('cheerio');
const { buildSite } = require('./site.cjs');

async function fixture(t, options) {
    const base = await fs.mkdtemp(path.join(os.tmpdir(), 'chic-theme-'));
    t.after(() => fs.rm(base, { recursive: true, force: true }));
    const output = await buildSite(base, options);
    return async route => cheerio.load(await fs.readFile(path.join(output, route), 'utf8'));
}
const posts = [2, 7, 1, 6, 3, 5, 4].map(day => ({
    title: `文章${day}`, date: `2021-08-0${day} 12:00:00`,
    body: '<script>hiddenScript()</script><p>正文 <strong>摘要</strong> &amp; &lt;script&gt;。</p>'
}));

test('builds five newest published posts, separate works, and all original routes', async t => {
    const read = await fixture(t, {
        posts: [...posts, { title: '未发布', date: '2022-01-01', published: false },
            { title: '未来文章', date: '2099-01-01' }],
        works: [
            { title: '旧作品', date: '2020-01-01' },
            { title: '新作品 <script>', date: '2021-01-01', description: '一个作品摘要', body: '## 项目目标\n\n**独立正文**' }
        ]
    });
    const home = await read('index.html');
    assert.deepEqual(home('.home-post h2').map((_, el) => home(el).text()).get(),
        ['文章7', '文章6', '文章5', '文章4', '文章3']);
    assert.equal(home('.home-posts > h2').length, 0);
    assert.equal(home('.scroll-cue').attr('href'), '#home-posts');
    assert.equal(home('#home-posts').attr('tabindex'), '-1');
    assert.equal(home('.home-post p script').length, 0);
    assert(!home('.home-post p').text().includes('hiddenScript'));
    assert.equal(home('.home-post p').first().text(), '正文 摘要 & <script>。');
    assert.equal(home('.profile-container .nickname').text(), 'Qin Peng');
    assert.equal(home('.links a[title=ZhiHu]').length, 0);
    const works = await read('works/index.html');
    assert.deepEqual(works('.portfolio-item h3').map((_, el) => works(el).text()).get(), ['新作品 <script>', '旧作品']);
    assert.equal(works('.portfolio-item script').length, 0);
    assert(works('title').text().includes('个人作品'));
    const detail = await read('works/project-1/index.html');
    assert.equal(detail('.post-content strong').text(), '独立正文');
    assert.equal(detail('.portfolio-back').attr('href'), '/works/');
    assert(detail('title').text().includes('新作品'));
    for (const route of ['index.html', 'works/index.html', 'works/project-1/index.html']) {
        const page = await read(route);
        for (const destination of ['/archives', '/category', '/tag', '/works/', '/about']) {
            assert.equal(page(`.navbar .menu a[href="${destination}"]`).length, 1, `${route}: ${destination}`);
            assert.equal(page(`#mobile-menu a[href="${destination}"]`).length, 1);
        }
    }
    for (const route of ['archives/index.html', 'tag/index.html', 'category/index.html',
        'tags/测试标签/index.html', 'categories/测试分类/index.html', 'about/index.html', 'page/2/index.html']) {
        const page = await read(route);
        assert(page('title').text().length > 0, route);
        assert(!page('.archive-item').text().includes('新作品'), route);
    }
    const categories = await read('category/index.html');
    assert.equal(categories('.category-tree .cat-name').text(), '测试分类');
    assert(categories('.cat-name').attr('href').startsWith('/categories/'));
    const continuation = await read('page/2/index.html');
    assert.equal(continuation('.home-posts').length, 0);
    assert(continuation('.archive-item').length > 0);
});

test('supports fewer than five posts, custom works index and subdirectory hosting', async t => {
    const read = await fixture(t, { root: '/blog/', posts: posts.slice(0, 2),
        works: [{ title: '作品', date: '2021-01-01' }], customWorksIndex: true });
    const home = await read('index.html');
    assert.equal(home('.home-post').length, 2);
    assert(home('.home-post h2 a').attr('href').startsWith('/blog/2021/'));
    const works = await read('works/index.html');
    assert.equal(works('h1').text(), '自定义作品标题');
    assert.equal(works('.portfolio-item a').attr('href'), '/blog/works/project-0/index.html');
    const detail = await read('works/project-0/index.html');
    assert.equal(detail('.portfolio-back').attr('href'), '/blog/works/');
});

test('empty site has no fake articles or works and can retain the full-height profile', async t => {
    const read = await fixture(t, { homePosts: false });
    const home = await read('index.html');
    assert.equal(home('.home-posts').length, 0);
    assert.equal(home('.home-with-posts').length, 0);
    assert.equal(home('.scroll-cue').length, 0);
    assert.equal(home('.profile-container').length, 1);
    const works = await read('works/index.html');
    assert.equal(works('.portfolio-item').length, 0);
    assert.equal(works('.portfolio-empty').text(), '暂无作品。');
});
