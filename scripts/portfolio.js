'use strict';

hexo.extend.helper.register('chic_recent_posts', function () {
    // Use the whole published collection, not the current index pagination page.
    return this.site.posts.sort('date', -1).limit(5);
});

hexo.extend.helper.register('chic_summary_html', function (entry) {
    const source = String(entry.description || entry.excerpt || entry.content || '');
    const text = this.strip_html(source.replace(/<(script|style|pre)\b[^>]*>[\s\S]*?<\/\1>/gi, ''))
        .replace(/\s+/g, ' ').trim();
    const configuredLength = Number(this.theme.home_posts && this.theme.home_posts.excerpt_length);
    const length = configuredLength > 0 ? configuredLength : 120;
    // Escape text while retaining already-encoded entities from rendered Markdown.
    // Entities are parsed as text, so an encoded '<script>' stays literal text.
    return this.escape_html(this.truncate(text, { length, omission: '…' }))
        .replace(/&amp;((?:#[0-9]+|#x[0-9a-f]+|[a-z][a-z0-9]+);)/gi, '&$1');
});

hexo.extend.helper.register('chic_works', function () {
    return this.site.pages.filter(entry => entry.layout === 'work' && entry.published !== false)
        .sort('date', -1);
});

hexo.extend.generator.register('chic-works', function (locals) {
    // An explicitly authored index page takes precedence over the generated one.
    if (locals.pages.findOne({ path: 'works/index.html' })) return [];
    return {
        path: 'works/index.html',
        layout: 'works',
        data: { title: (this.theme.config.works || {}).title || 'Works' }
    };
});

hexo.extend.generator.register('chic-empty-home', function (locals) {
    if (locals.posts.length || locals.pages.findOne({ path: 'index.html' })) return [];
    // hexo-generator-index does not emit a route for an empty post collection.
    if (this.config.index_generator && this.config.index_generator.path) return [];
    return { path: 'index.html', layout: 'index', data: { __index: true, current: 1 } };
});
