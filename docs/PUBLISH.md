# 发布到 GitHub

本次仅整理本地目录，尚未创建 Git 仓库或上传。请先阅读 README 和 OPEN_SOURCE_PREPARATION。

1. 运行 npm run check:public 与 npm run build。
2. 在当前目录初始化 Git，检查 .gitignore 生效，并仔细查看暂存文件清单。
3. 不要使用强制添加绕过忽略规则。node_modules、dist、.env、.wrangler 不应进入提交。
4. 在 GitHub 创建新的空仓库，然后连接远程、提交并推送审核过的文件。
5. 设置项目简介、贡献指南和 Issues；先保持生产部署手动审批，不给外部 PR 注入生产秘密。

本地 node_modules 与 dist 是为验证生成的，可保留用于运行，已在 .gitignore 中排除。不要将整个目录无差别打包上传。
