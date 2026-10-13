# GitHub 发布与后续更新

公开仓库：ChiHo120/shenqiuyigao_web。

本地目录已初始化 Git，main 分支已连接 origin/main。后续提交前运行 npm run check:public 与 npm run build，并检查 git diff 与暂存文件清单。

node_modules、dist、.env 和 .wrangler 已排除。不要用强制添加绕过忽略规则，也不要将整个工作目录无差别打包上传。

## 自动检查

本次 GitHub 登录令牌没有 workflow 权限，因此自动 CI 暂未启用。完整模板保存在 ci-workflow.example.yml；以后获取 workflow 权限后，再把模板复制到 .github/workflows/ci.yml 并提交。

## 部署边界

仓库公开不等于正式网站已部署。生产与预览环境应使用独立数据库，生产部署由维护者审核，不要给外部 PR 提供生产凭据。
