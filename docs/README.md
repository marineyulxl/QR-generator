# 项目文档目录

本目录与仓库根目录 **[`DEPLOY.md`](../DEPLOY.md)** 配合使用：**功能模块**按篇写在 `features/`，**按日摘要**写在 [`CHANGELOG.md`](CHANGELOG.md)。

## 结构说明

| 路径 | 用途 |
|------|------|
| [`features/`](features/) | 按模块一篇：目标、路由、实现要点、取舍、构建/部署入口 |
| [`CHANGELOG.md`](CHANGELOG.md) | 变更回溯（日期块 + 短条目，链回对应 feature） |
| 根目录 [`DEPLOY.md`](../DEPLOY.md) | 静态构建产物、托管方式、与「二维码里填什么 URL」的口径 |

## 当前功能文档索引

| 序号 | 文档 | 说明 |
|------|------|------|
| 01 | [`features/01-qr-studio-pc.md`](features/01-qr-studio-pc.md) | PC 端二维码工作台（QR Studio Pro） |

新增整块功能时：先补 `features/NN-…md`，再在 `CHANGELOG.md` 当日区块追加一条并链到该文档。
