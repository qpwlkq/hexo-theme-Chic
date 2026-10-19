const fs = require('node:fs/promises');
const path = require('node:path');
const Hexo = require('hexo');

const themeRoot = path.resolve(__dirname, '..');
const plugins = ['hexo-renderer-ejs', 'hexo-renderer-stylus', 'hexo-renderer-marked',
    'hexo-generator-index', 'hexo-generator-archive', 'hexo-generator-category', 'hexo-generator-tag'];

async function buildSite(base, options = {}) {
    const themeCopy = path.join(base, 'themes/chic');
    await fs.mkdir(themeCopy, { recursive: true });
    // Copy only theme runtime files: a symlink to the repo would recurse into this preview.
    for (const entry of ['layout', 'source', 'scripts', 'languages', '_config.yml']) {
        await fs.cp(path.join(themeRoot, entry), path.join(themeCopy, entry), { recursive: true });
    }
    const themeConfigPath = path.join(themeCopy, '_config.yml');
    const themeConfig = await fs.readFile(themeConfigPath, 'utf8');
    await fs.writeFile(themeConfigPath, themeConfig.replace(/links:\n[\s\S]*?\n# how links show/,
        `links:\n${options.originalProfile ? '  Blog: /archives\n  Instagram: /\n  Reddit: /\n' : ''}  Github: https://github.com/qpwlkq\n\n# how links show`));
    await fs.symlink(path.join(themeRoot, 'node_modules'), path.join(base, 'node_modules'), 'dir');
    await fs.writeFile(path.join(base, 'package.json'), JSON.stringify({
        name: 'chic-local-fixture', private: true, hexo: { version: require('hexo/package.json').version },
        dependencies: Object.fromEntries(plugins.map(name => [name, '*']))
    }));
    const config = {
        title: "Qin Peng's Blog", author: 'Qin Peng', language: 'zh-CN', timezone: 'Asia/Shanghai',
        url: `http://localhost${options.root || '/'}`, root: options.root || '/',
        theme: 'chic', per_page: options.perPage || 2, permalink: ':year/:month/:day/:title/',
        future: false, render_drafts: false,
        theme_config: {
            navname: "Qin Peng's Blog", nickname: 'Qin Peng',
            description: '劝君莫惜金缕衣, 劝君惜取少年时。<br>有花堪折直须折, 莫待无花空折枝。',
            avatar: 'https://qpwlkq.github.io/image/avatar.jpg',
            links_text_enable: !options.originalProfile, links_icon_enable: !!options.originalProfile,
            links: { Github: 'https://github.com/qpwlkq', ZhiHu: false },
            home_posts: { enable: options.homePosts !== false, excerpt_length: 100 }
        }
    };
    await fs.writeFile(path.join(base, '_config.yml'), JSON.stringify(config));
    async function write(relative, text) {
        const file = path.join(base, 'source', relative);
        await fs.mkdir(path.dirname(file), { recursive: true });
        await fs.writeFile(file, text);
    }
    for (const [index, post] of (options.posts || []).entries()) {
        await write(`_posts/${index}.md`, `---\n${JSON.stringify({
            title: post.title, date: post.date, tags: ['测试标签'], categories: ['测试分类'],
            description: post.description, published: post.published !== false,
            slug: `post-${index}`
        })}\n---\n${post.body || '文章正文。'}\n`);
    }
    for (const [index, work] of (options.works || []).entries()) {
        await write(`works/project-${index}/index.md`, `---\n${JSON.stringify({
            layout: 'work', title: work.title, date: work.date, description: work.description,
            status: '进行中', published: work.published !== false
        })}\n---\n${work.body || '## 项目介绍\n\n这是一篇独立的作品介绍。'}\n`);
    }
    await write('tag/index.md', '---\ntitle: 标签\nlayout: tag\n---\n');
    await write('category/index.md', '---\ntitle: 分类\nlayout: category\n---\n');
    await write('about/index.md', '---\ntitle: 关于\nlayout: page\n---\n关于 Qin Peng。');
    if (options.customWorksIndex) {
        await write('works/index.md', '---\ntitle: 自定义作品标题\nlayout: works\n---\n');
    }
    const hexo = new Hexo(base, { silent: true });
    try {
        await hexo.init();
        await hexo.call('generate');
        const css = await fs.readFile(path.join(base, 'public/css/style.css'), 'utf8');
        if (!css.includes('.home-post') || !css.includes('.portfolio-wrap')) {
            throw new Error('Theme stylesheet was not generated correctly');
        }
    } finally {
        await hexo.exit();
    }
    return path.join(base, 'public');
}
module.exports = { buildSite };
