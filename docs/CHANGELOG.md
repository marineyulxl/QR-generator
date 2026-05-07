# 变更回溯（摘要）

## 2026-05-07

- **i18n**：文案拆为 [`locales/zh.ts`](../src/i18n/locales/zh.ts) / [`locales/en.ts`](../src/i18n/locales/en.ts)，[`messages.ts`](../src/i18n/messages.ts) 聚合；`I18nProvider` + `localStorage`；顶栏语言切换；校验 `contentErrorKey` + `t()`。详见 [`features/01-qr-studio-pc.md`](features/01-qr-studio-pc.md)。
- **文档体系**：按 `docs-features-module-spec` 补齐 `docs/README.md`、本文件与 [`features/01-qr-studio-pc.md`](features/01-qr-studio-pc.md)；根目录增加 [`README.md`](../README.md) 指向文档入口。
- **QR Studio Pro（PC）**：Vite + React 19 + TS + Tailwind 4 单页工作台；`qr-code-styling` 动态 `import()` 延迟加载；生成/下载 PNG·SVG·打印。详见 [`features/01-qr-studio-pc.md`](features/01-qr-studio-pc.md)。
- **前端结构**：状态迁入 `useReducer`（`src/qr/qr-studio-reducer.ts`），选项构建与下载纯函数拆至 `src/qr/`；`ControlPanel`/`PreviewPane` 使用 `React.memo`；`useQrStudio` 拆分 effect、下载/生成回调配合 `ref` 稳定引用，对齐 Vercel `vercel-react-best-practices` 适用项。详见 [`features/01-qr-studio-pc.md`](features/01-qr-studio-pc.md)。
