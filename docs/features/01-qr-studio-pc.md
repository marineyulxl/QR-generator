# 01 — QR Studio Pro 工作台（已实现）

## 目标

- **用户场景**：在 PC 端配置二维码内容（URL/文本）、外观（颜色、码点/码眼、边距、纠错、版本等）、可选中心 Logo，预览并 **下载 PNG / SVG** 或 **打印**。
- **与后端协作边界**：**无后端**。生成、渲染与下载均在浏览器内完成；无登录、无云端历史接口。

## 路由

| 路径 | 页面 |
|------|------|
| `/` | 单页应用主界面（左右分栏工作台） |

应用入口：[`src/main.tsx`](../../src/main.tsx) 挂载 [`src/App.tsx`](../../src/App.tsx)。未使用 `react-router` 多路径。

## 主要实现要点

- **技术栈**：Vite 8、React 19、TypeScript（strict）、Tailwind CSS 4（`@tailwindcss/vite`）、`pnpm`。
- **设计参考**：[`stitch_modern_qr_studio/code.html`](../../stitch_modern_qr_studio/code.html)、[`stitch_modern_qr_studio/DESIGN.md`](../../stitch_modern_qr_studio/DESIGN.md)；设计令牌在 [`src/styles/index.css`](../../src/styles/index.css) 的 `@theme` 中维护。
- **国际化（i18n）**：中文表 [`src/i18n/locales/zh.ts`](../../src/i18n/locales/zh.ts)（并导出 `MessageKey`）、英文表 [`src/i18n/locales/en.ts`](../../src/i18n/locales/en.ts)（`Record<MessageKey, string>` 约束与中文键一致）；[`src/i18n/messages.ts`](../../src/i18n/messages.ts) 组装 `messagesByLocale`、插值与 `localStorage` 读写。[`src/i18n/I18nProvider.tsx`](../../src/i18n/I18nProvider.tsx) 提供 `t()`、`locale`、切换时同步 `document.documentElement.lang` 与 `document.title`。顶栏右侧 **语言切换**；校验错误用 [`contentErrorKey`](../../src/qr/types.ts) + `t('errors.emptyContent')`。
- **二维码与性能**：遵循仓库内 Vercel skill [`vercel-react-best-practices`](../../.agents/skills/vercel-react-best-practices/SKILL.md) 的可适用条目，包括但不限于：**bundle-dynamic-imports**（[`getQrCodeStylingConstructor`](../../src/hooks/useQrStudio.ts) 动态加载 `qr-code-styling`）、**rerender-split-combined-hooks**（卸载清理与「同步 QR 选项」拆成两个 `useEffect`）、**rerender-memo**（[`ControlPanel`](../../src/components/ControlPanel.tsx) / [`PreviewPane`](../../src/components/PreviewPane.tsx) 使用 `memo`）、**稳定事件处理器**（下载/生成等通过 `useRef` 读取最新 state，回调尽量 `[]` 依赖以减少子树无效更新）、**useReducer** 收敛表单状态（[`qr-studio-reducer`](../../src/qr/qr-studio-reducer.ts)）、纯函数与副作用分离（[`build-options`](../../src/qr/build-options.ts)、[`download`](../../src/qr/download.ts)）。
- **打印**：全局 [`@media print`](../../src/styles/index.css) 仅显示 `#print-area`，隐藏侧栏与页脚 chrome。

## 关键文件

| 文件 | 说明 |
|------|------|
| [`src/App.tsx`](../../src/App.tsx) | 根布局：顶栏 + 主区 + 页脚 |
| [`src/components/AppHeader.tsx`](../../src/components/AppHeader.tsx) | 顶栏品牌与导航占位 |
| [`src/components/ControlPanel.tsx`](../../src/components/ControlPanel.tsx) | 左侧 40% 配置区 |
| [`src/components/PreviewPane.tsx`](../../src/components/PreviewPane.tsx) | 右侧预览、导出按钮、`#print-area` |
| [`src/components/AppFooter.tsx`](../../src/components/AppFooter.tsx) | 页脚 |
| [`src/hooks/useQrStudio.ts`](../../src/hooks/useQrStudio.ts) | `useReducer` + ref、动态加载 QR 库、对外 API |
| [`src/qr/qr-studio-reducer.ts`](../../src/qr/qr-studio-reducer.ts) | 表单与生成标志的 reducer |
| [`src/qr/build-options.ts`](../../src/qr/build-options.ts) | 由状态构造 `qr-code-styling` 的 `Options`（纯函数） |
| [`src/qr/types.ts`](../../src/qr/types.ts) | `QrStudioState` / `OutputMode` / action 类型 |
| [`src/qr/download.ts`](../../src/qr/download.ts) | 浏览器下载 Blob/字符串 |
| [`src/i18n/locales/zh.ts`](../../src/i18n/locales/zh.ts) | 简体中文文案、`MessageKey` |
| [`src/i18n/locales/en.ts`](../../src/i18n/locales/en.ts) | 英文文案 |
| [`src/i18n/messages.ts`](../../src/i18n/messages.ts) | 合并语言表、插值、`localStorage` |
| [`src/i18n/I18nProvider.tsx`](../../src/i18n/I18nProvider.tsx) | `I18nProvider`、`useI18n` |
| [`vite.config.ts`](../../vite.config.ts) | Vite + React + Tailwind 插件 |

## 产品取舍记录

- **顶栏「历史 / 模板 / 分析」**：`href="#"` 占位，无路由与数据。
- **Logo 图库**：`alert` 占位提示，无真实图库。
- **纠错文案**：L/M/Q/H 与近似百分比说明对应 `qr-code-styling` 纠错等级。
- **Version**：`0` 为自动版本；非 0 传入 `qrOptions.typeNumber`。
- **Eye Color**：勾选时为码眼应用与前景色一致的颜色。
- **With Text**：预览区二维码下方展示说明文字（独立输入或内容首行），**不编码进**二维码图像。

## 验收步骤

1. `pnpm install` && `pnpm dev`，打开 `/`。
2. 在 Content 中输入非空文本或 URL，点击「生成二维码」，右侧出现可扫二维码。
3. 调整颜色/形状/纠错等，确认预览随交互更新（已生成状态下）。
4. 「下载 PNG」「下载 SVG」可保存文件；浏览器打印仅见预览卡片区域。

## 部署与二维码

见根目录 [`DEPLOY.md`](../../DEPLOY.md)。静态托管 `dist/`；二维码 **payload** 为用户输入的 Content，与站点部署域名无强制绑定。

## 构建命令

```bash
pnpm install
pnpm run build
```

产物目录：`dist/`。
