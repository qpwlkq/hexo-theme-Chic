const fs = require('node:fs/promises');
const path = require('node:path');
const { buildSite } = require('../test/site.cjs');
const base = path.resolve(__dirname, '../.preview-site');
(async () => {
    await fs.rm(base, { recursive: true, force: true });
    const output = await buildSite(base, {
        perPage: 10,
        originalProfile: true,
        posts: [
            { title: '字节跳动-后端开发效率工程被捞-一面', date: '2021-08-05 12:00:00', description: '一次后端岗位面试的记录，整理当场遇到的三道算法题与面试感受。' },
            { title: '手写线程池byC', date: '2021-08-05 10:00:00', description: '记录 C 与 C++ 线程池的学习资料和实现笔记。' },
            { title: 'zookeeperJAVA客户端', date: '2021-08-02 12:00:00', description: '整理 ZooKeeper 的 Java 客户端选择，以及使用 Curator 建立连接和创建节点的示例。' },
            { title: 'zookeeper常用命令', date: '2021-08-02 10:00:00', description: '服务端的启动与状态检查，以及客户端连接、节点创建和数据读取等常用操作。' },
            { title: 'Nginx-1-安装配置', date: '2021-07-30 12:00:00', description: 'Nginx 安装与访问配置的学习记录，包括端口和防火墙相关注意事项。' },
            { title: 'zookeeper从入门到放弃', date: '2021-07-30 10:00:00', description: '从配置中心、分布式锁到集群管理，整理 ZooKeeper 的几个主要用途。' }
        ].map(post => ({ ...post, body: `${post.description}\n\n这是本地主题验收用的示例正文，完整历史文章尚未迁入。` })),
        works: [{ title: 'Chic 个人博客主题改造', date: '2026-10-19',
            description: '保留原首页，补充最近文章和独立作品页面。',
            body: '## 想解决的问题\n\n首页往下滚动就能读到文章，并有独立的入口展示作品。\n\n## 当前设计\n\n- 保留原来的头像、名字和介绍。\n- 首页底部展示最近五篇文章。\n- 每篇作品拥有独立的详情页。\n\n## 进度\n\n这是本地验收的示例作品，尚未发布到线上。' }]
    });
    console.log(`Preview generated at ${output}`);
})().catch(error => { console.error(error); process.exitCode = 1; });
