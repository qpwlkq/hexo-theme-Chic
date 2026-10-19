> Qin Peng 的自定义版本：保留 Chic 首屏布局，增加最近五篇文章、独立作品页和圆角下滑箭头。基于 [Siricee/hexo-theme-Chic](https://github.com/Siricee/hexo-theme-Chic) 修改。

<h1 align="center"><a href="https://github.com/Siricee/hexo-theme-Chic" target="_blank">Chic Theme</a></h1>

<p align="center">
<img src="https://i.loli.net/2019/06/12/5d006bd289aa325037.png" alt="Chic theme">
</p>

> Chic,法语词意同'Elegant'

<p align="center">
<img alt="Author" src="https://img.shields.io/badge/Author-Sirice-lightgray.svg"/>
<img alt="Node" src="https://img.shields.io/badge/Node-6.0%2B-43853d.svg"/>
<img alt="Hexo" src="https://img.shields.io/badge/Hexo-3.0+-0e83cd.svg"/>
<img alt="Device" src="https://img.shields.io/badge/Device-responsive-orange.svg"/>
<img alt="Build Status" src="https://img.shields.io/badge/build-passing-brightgreen"/>
</p>

## 文档语言

- [中文文档](README-CN.md)
- [English](README.md)

## Contents 目录

- [文档语言](#文档语言)
- [Contents 目录](#contents-目录)
- [Introduction 介绍](#introduction-介绍)
- [Demo 演示](#demo-演示)
- [Features 特点](#features-特点)
- [Installation 安装](#installation-安装)
- [Configuration 配置](#configuration-配置)
  - [添加 Tag、Category 页面](#添加-tagcategory-页面)
  - [开启 MathJax 支持（数学公式）](#开启-mathjax-支持数学公式)
  - [图片标题](#图片标题)
- [Customize 自定义](#customize-自定义)
- [FAQ 提问](#faq-提问)
- [Gallary 图片展示](#gallary-图片展示)
- [LICENSE 开源许可](#license-开源许可)

## Introduction 介绍

优雅、功能全面、阅读友好的 hexo 主题。

## Demo 演示

- [Demo site](https://siricee.github.io/hexo-theme-Chic)
- <del>[作者的博客](https://siricee.github.io/)</del> (_不再使用 hexo 驱动_)

## Features 特点

- 恰到好处的留白，优雅却不简陋。
- 夜间模式主题一键切换。
- 多种代码高亮方案。
- 精心挑选的字体，最好的阅读体验。\* _特别推荐 微软正黑_
- 响应式适配移动端/桌面端。
- 支持 MathJax，支持 LaTeX 语法的数学公式

## Installation 安装

```bash
cd your-blog/themes
git clone https://github.com/qpwlkq/hexo-theme-Chic.git Chic
// Modify theme setting in _config.yml to Chic.
```

## Configuration 配置

<details>
<summary><mark>点击展开配置文件</mark></summary>

```yaml
# Header
navname: Bentham's Blog

# navigatior items
nav:
  Posts: /archives
  Categories: /category
  Tags: /tag
  About: /about

# favicon
favicon: /favicon.ico

# Profile
nickname: Jeremy Bentham

### this variable is MarkDown form.
description: Lorem ipsum dolor sit amet, **consectetur adipiscing elit.** <br>Fusce eget urna vitae velit *eleifend interdum at ac* nisi.
avatar: /image/avatar.jpeg

# main menu navigation
## links key words should not be changed.
## Complete url after key words.
## Unused key can be commented out.
links:
  Blog: /archives
  #  Category:
  #  Tags:
  #  Link:
  #  Resume:
  #  Publish:
  #  Trophy:
  #  Gallary:
  #  RSS:
  #  AliPay:
  ZhiHu: https://www.zhihu.com/people/sirice
  #  LinkedIn:
  #  FaceBook:
  #  Twitter:
  #  Skype:
  #  CodeSandBox:
  #  CodePen:
  #  Sketch:
  #  Gitlab:
  #  Dribble:
  Instagram:
  Reddit:
  #  YouTube:
  #  QQ:
  #  Weibo:
  #  WeChat:
  Github: https://github.com/Siricee

# how links show: you have 2 choice--text or icon.
links_text_enable: false
links_icon_enable: true

# Post page
## Post_meta
post_meta_enable: true

post_author_enable: true
post_date_enable: true
post_category_enable: true
## Post copyright
post_copyright_enable: true

post_copyright_author_enable: true
post_copyright_permalink_enable: true
post_copyright_license_enable: true
post_copyright_license_text: Copyright (c) 2019 <a href="http://creativecommons.org/licenses/by-nc/4.0/">CC-BY-NC-4.0</a> LICENSE
post_copyright_slogan_enable: true
post_copyright_slogan_text: Do you believe in <strong>DESTINY<strong>?
## toc
post_toc_enable: true

# Page
page_title_enable: true

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: MMMM D, YYYY
time_format: H:mm:ss

# stylesheets loaded in the <head>
stylesheets:
  - /css/style.css

# scripts loaded in the end of the body
scripts:
  - /js/script.js
  - /js/tocbot.min.js
    # tscanlin/tocbot: Build a table of contents from headings in an HTML document.
    # https://github.com/tscanlin/tocbot

# plugin functions
## Mathjax: Math Formula Support
## https://www.mathjax.org
mathjax:
  enable: true
  import: demand # global or demand
  ## global: all pages will load mathjax,this will degrade performance and some grammers may be parsed wrong.
  ## demand: Recommend option,if your post need fomula, you can declare 'mathjax: true' in Front-matter
```

</details>
<br>

### 添加 Tag、Category 页面

Hexo 初始化没有 tag、category 页面，需要自行添加，本主题请按以下步骤进行:<br>

1. 执行命令

```bash
hexo new page tag
hexo new page category
```

2. 进入页面目录

```bash
cd source/tag
```

3. 增加 layout 字段

```yaml
// source\tag\index.md
---
title: Tag
layout: tag
---
```

4. category 页面同理，layout 字段键值为 category。 <br>

### 首页最近文章与个人作品

此分支保留原头像、昵称、介绍和原有归档、分类、标签、关于页。首页个人介绍下方直接展示最近 **5 篇已发布文章**，按发布日期倒序排列，没有“最近文章”标题和“查看全部”按钮。桌面日期靠左，手机日期放在摘要下方；文章不足五篇时显示实际数量。归档页继续展示全部博客文章。

摘要依次使用文章的 `description`、`excerpt` 或正文，去除 HTML 和代码块后截取文本。可在博客根目录的 `_config.Chic.yml` 中设置（文件名中的 `Chic` 应与主题目录名称一致）：

```yaml
home_posts:
  enable: true
  excerpt_length: 120
works:
  title: 个人作品
  description: 项目、工具与动手实践。
```

设置 `home_posts.enable: false` 可以恢复仅展示个人介绍的首页。

#### 添加作品

主题自动生成 `/works/` 列表。每篇作品是独立的 Markdown **页面**，不放在 `_posts`，也不占首页五篇文章的名额。新建博客文件 `source/works/my-project/index.md`：

```markdown
---
layout: work
title: 我的项目
date: 2026-10-19 10:00:00
description: 用一两句话介绍项目。
status: 进行中
---

## 项目介绍

这里可以像写文章一样添加文字、图片、代码和演示链接。
```

保存后运行 `hexo clean && hexo generate`，作品出现在按年份分组、按日期倒序的列表中。点击标题进入详情，详情顶部可以返回作品列表。`status` 可省略。未准备发布的作品请先保存在 `source` 目录之外；作品采用 Hexo 页面机制。

没有作品时展示“暂无作品”，主题不附带虚构项目。若需要自定义列表页标题，可新建 `source/works/index.md` 并指定 `layout: works`；主题不会重复生成同一路径。可直接复制主题的 `examples/work.md` 作为作品起点。

导航默认保留 `Posts`、`Categories`、`Tags`、`About` 并增加 `Works: /works/`。如果你的站点覆盖了完整的 `nav` 配置，请在保留旧项目的基础上补上该入口。现有的 `source/tag/index.md`（`layout: tag`）、`source/category/index.md`（`layout: category`）及 `source/about/index.md` 应继续保留。所有主题内部链接通过 Hexo 的根路径处理，支持 GitHub Pages 项目子目录。

#### 本地验证

本分支开发测试使用 Node.js 20.19+ 与 Hexo 8。仅使用主题无需安装测试依赖；继续使用博客原有 Hexo 依赖即可。

```bash
# 在主题目录执行
npm ci
npm test
npm run preview:build
python3 -m http.server 56089 --bind 127.0.0.1 --directory .preview-site/public
```

访问 `http://127.0.0.1:56089/` 查看由真正的主题模板生成的验收站点。示例正文、分类、标签和作品只用于验证，不是完整旧博客迁移。预览目录会在每次 `preview:build` 时重新生成，不要在其中维护正式内容。

依赖检查（2026-10-19）：开发验收环境的 `npm audit` 仍报告 11 项上游依赖告警（2 项中等、8 项高危、1 项严重），涉及 Hexo 及其传递依赖。已尝试常规 `npm audit fix`，未使用强制版本替换。这些是本地生成/测试工具的依赖，不会随静态页面作为浏览器脚本发布；正式构建环境仍需跟进上游修复。

### 开启 MathJax 支持（数学公式）

相关配置文件内容（`Chic/_config.yml`）：

```yaml
# plugin functions
## Mathjax: Math Formula Support
## https://www.mathjax.org
mathjax:
  enable: true
  import: global # global or demand
  ## global: all pages will load mathjax,this will degrade performance and some grammers may be parsed wrong.
  ## demand: if your post need fomula, you can declare 'mathjax: true' in Front-matter
```

`mathjax`有如下字段：

- `enable`:值为 true 为开启该功能（默认开启）；false 为关闭
- `import`:该字段为 mathjax 的加载方式，可选值为`global`和`demand`。
  - `global`：全局引入，所有页面均加载。好处是便利，缺点是可能会导致部分 markdown 语法被错误解析，比如连续`$$`会被解析为公式；而且全局引入会在没有公式的页面明显浪费页面性能。
  - `demand`【推荐方式】：按需引入。使用方法为在 config 中设置该字段后，文章中如果需要使用 mathjax，在 Front-matter 中声明即可
    ```yaml
    ---
    title: MathJax Test
    date: 2019-07-05 21:27:59
    tags:
    mathjax: true # 加入这个声明，这篇文章就会开启mathjax渲染
    ---
    ```
    LaTeX 语法这里不做解释，本主题中，单 dollar 符号包围的为行内公式，例：`$f(x)=ax+b$`，双 dollar 符号包围的为块公式，例`$$f(x)=ax+b$$`更多写法请参考 LaTeX 和[Demo site 中的公式测试页面](https://siricee.github.io/hexo-theme-Chic/2019/07/05/MathJax_test/)。

### 图片标题

在 Hexo 中，你有两种方式引入图片：

- GFM 语法直接引入（不显示图片标题）
  ```
  ![pic](picUrl)
  ```
- Hexo 内置标签系统-图片标签（显示图片标题）
  `    {% img [class names] /path/to/image [width] [height] '"alt text" "title text"' %}
   `
  所以如果你仅仅想方便快捷引入图片，那你应该使用 GFM 语法，这种方式也是兼容性最好的方案。

但如果你需要显示**图片标题**，你就应该使用第二种方案，**图片标签方式**。

- `"alt text"` 用来显示当图片加载失败时垫底的提示文字。
- `"title text"` 将会被显示到图片下方作为图片标题。

你可以在 [Demo site](https://siricee.github.io/hexo-theme-Chic/2019/06/05/markdown_test/#Image) 中查看图片标题的效果和示例语法。

## Customize 自定义

- 代码高亮风格 在 `hexo-theme-Chic\themes\Chic\source\css\style.styl` 中

  ```css
  // light theme code-block style
  body:not(.dark-theme) {
    @import "_highlight/atelier-forest-light.styl"; // 亮色主题
  }
  // dark theme code-block style
  body.dark-theme {
    @import "_highlight/darkula.styl";              // 暗色主题
  }
  ```
  将预设地址改为 `_highlight` 文件夹中的 stylus 文件即可更换代码高亮风格。

  此处需注意 亮色和暗色主题的样式包未必完全一致，如行高等设定，推荐尽量使用同一套代码主题包的不同模式，如 `atelier-savanna-light.styl` 和 `atelier-savanna-dark.styl`

- 自定义 css(stylus 语法) 您可以在 `hexo-theme-Chic\themes\Chic\source\css\custom.styl` 路径文件中添加 css 规则

- 自定义 JavaScript 您可以在 `hexo-theme-Chic\themes\Chic\source\js` 路径中添加 js 脚本，并在\_config.yml 中 `script` 字段添加声明。

## FAQ 提问

1. 我在二级地址（非 github page 根 repo，即 username.github.io/Blog）上部署了 hexo，为什么 css、avatar 等资源都 404 了？

   答：此处需要另外填写主配置文件 URL 字段。以该主题 repo 为例：

   ```yaml
   # (blog/_config.yml)

   # URL
   ## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
   url: https://siricee.github.io/hexo-theme-Chic/ # 此处为你的部署url
   root: /hexo-theme-Chic/ # 此处为你的项目根文件夹url。
   permalink: :year/:month/:day/:title/
   permalink_defaults:
   ```

2. 我想将黑色主题设为默认全局主题该怎么做？

   答：此处只需要改一下`themes\Chic\source\js\script.js`中`doucument.ready`函数的内容。代码如下

   ```javascript
    document.ready(
        // toggleTheme function.
        // this script shouldn't be changed.
        () => {
            const pagebody = document.getElementsByTagName('body')[0]

            const default_theme = 'light' // 改为 'dark'
   ```

   即可实现效果。

3. 常见问题待补充……

## Gallary 图片展示

![screely-1560228577821.png](https://i.loli.net/2019/06/12/5d00a0850285252790.png)
![screely-1560228791041.png](https://i.loli.net/2019/06/12/5d00a0856063661133.png)
![screely-1560228621288.png](https://i.loli.net/2019/06/12/5d00a084e29cd40271.png)
![screely-1560228761180.png](https://i.loli.net/2019/06/12/5d00a0855d28072392.png)

![smartmockups_jwrd4ru3.png](https://i.loli.net/2019/06/12/5d00a085d115d16700.png)

![smartmockups_jwrd9y4r.png](https://i.loli.net/2019/06/12/5d00a085ec26284832.png)

## LICENSE 开源许可

![](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)

This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
