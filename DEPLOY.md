# 部署说明（QR Studio Pro）

本项目为 **纯静态前端**（Vite + React），构建产物为 `dist/` 目录，可部署到任意静态托管。

## 构建

```bash
pnpm install
pnpm run build
```

## 产物

- 输出目录：`dist/`
- 入口：`dist/index.html`

本地预览构建结果：

```bash
pnpm run preview
```

## 托管建议

| 方式 | 说明 |
|------|------|
| Nginx / Caddy | 将站点根目录指向 `dist/`，并配置 SPA 回退到 `index.html`（本应用仅单页 `/`，无动态路由时也可只配 `try_files` 到 `index.html`）。 |
| Vercel / Netlify / Cloudflare Pages | 项目根选本仓库，构建命令 `pnpm run build`，发布目录 `dist`。 |
| 对象存储 + CDN | 上传 `dist` 内全部文件，确保 `index.html` 为默认文档。 |

## 与「二维码里填什么 URL」

- 用户在应用内输入的 **Content** 即为二维码编码数据（如 `https://你的官网.com` 或纯文本），**不依赖**本站点部署 URL。
- 若你未来做「短链跳转页」等需要自家域名的能力，再在新模块中约定生产环境 **H5/落地页** 的完整 `https://...` 并写入接口与 `docs/features` 文档。

## 环境变量

首版无服务端、无构建期密钥要求。
