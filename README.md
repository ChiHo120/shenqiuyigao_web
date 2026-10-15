# 沈丘一高网站开源版

> 一个由校友维护的高中校园网站模板：保留沈丘一高的页面结构与设计，使用脱敏演示数据，欢迎一起把它做得更好。

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stack: React + TypeScript](https://img.shields.io/badge/stack-React%20%2B%20TypeScript-3178C6.svg)](package.json)
[![Issues](https://img.shields.io/github/issues/ChiHo120/shenqiuyigao_web)](https://github.com/ChiHo120/shenqiuyigao_web/issues)

## 为什么开源

这个项目从一所真实学校的网站开始，但仓库本身只发布代码、数据库结构、虚构样例和占位素材。你可以把它当作校园官网的起点，也可以借鉴其中的内容管理、公开展示和权限隔离思路。

**适合一起改进的方向：** 移动端体验、无障碍、测试、页面性能、内容模型和后台管理。

为母校沈丘一高制作的校园网站，欢迎校友和开发者协作完善。保留“沈丘一高”名称与网站设计；本仓库提供虚构数据和占位素材，不包含生产站点的真实个人数据、账号、口令或私有配置。

这是校友维护的开源项目。学校名称用于说明项目背景，不代表获得学校官方背书或商标授权。

## 快速开始

需要 Node.js 22 与 npm。在项目目录运行：

    npm ci --ignore-scripts
    npm run dev

打开终端显示的本地地址。无需 .env 和数据库即可浏览演示。

    npm run check:public
    npm run build
    npm run preview

默认 noindex，演示内容不应作为正式学校信息被搜索引擎收录。

## 先看这里

- 想运行项目：从[快速开始](#快速开始)开始。
- 想贡献代码：先看[贡献指南](CONTRIBUTING.md)，再从带有 `good first issue` 或 `help wanted` 标签的任务开始。
- 想接入数据库：阅读[数据库说明](docs/DATABASE.md)，请使用自己的 Supabase 项目。
- 想了解哪些内容不能提交：阅读[整理记录](docs/OPEN_SOURCE_PREPARATION.md)和[安全说明](SECURITY.md)。
- 想了解后续方向：查看[开源路线图](docs/ROADMAP.md)。

## 内容与功能

- React + TypeScript + Vite + Tailwind CSS。
- 首页、学校概况、新闻与通知详情、师资、校园、毕业相册、视频和招生页面。
- 新闻、相册等本地编辑保存在当前浏览器，页面有演示标识。
- 联系页留言仅保存在本机，不发送给学校，请勿输入真实个人资料。
- 后台代码保留；默认不提供管理员账号或共享密码。自建数据库接入见 [数据库说明](docs/DATABASE.md)。部分原有后台功能仍待完善。

## 开源范围

代码、类型、数据库结构、虚构样例和自制占位图公开。真实人员名单、成绩资料、人像、毕业合影、视频、用户留言、私有数据库与部署凭据不随仓库发布。原站媒体未复制。

详细交付边界与未验证事项见 [整理记录](docs/OPEN_SOURCE_PREPARATION.md)。

## 贡献与发布

阅读 [贡献指南](CONTRIBUTING.md) 与 [安全说明](SECURITY.md)。欢迎从移动端体验、可访问性、测试和后台功能入手。生产与预览环境必须使用不同数据库和权限。

小型改动也很有价值：修复一个移动端间距、补一个空状态、改善一条错误提示，都可以提交 Issue 或 Pull Request。提交前请说明改动目的、验证方式和是否涉及内容或素材授权。

GitHub Actions 对推送和 Pull Request 自动运行公开源码检查与构建，不自动部署，也不需要生产密钥。

MIT 许可证见 [LICENSE](LICENSE)。许可证不覆盖学校名称、标识或未随仓库提供的第三方素材；新增素材必须注明授权来源。

## 项目状态

当前是持续完善中的开源版本，不是学校官方发布系统。前台演示可以直接运行；后台和 Supabase 接入需要使用者自行配置，不能直接连接生产数据。

