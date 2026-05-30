# 写作与维护说明（SOP）

本站基于 Docusaurus，作为**知识库**组织：分类 = `docs/` 下的目录，文章 = 目录里的 `.md`。

## 新增一篇文章

1. 复制 `templates/post.md` 到对应分类目录，文件名用英文 kebab（与 `slug` 一致），例如 `docs/protocol-security/my-topic.md`。
2. 填写 front matter（只需三项）：
   - `title`：标题，**不要**带 `分类 |` 前缀（分类由目录表达）。
   - `date`：发布日期 `"YYYY-MM-DD"`，用于排序和索引列表显示时间。
   - `slug`：干净短链，如 `/my-topic`（最终 URL）。
3. 图片放到同名的 `<slug>.assets/` 目录，相对引用 `./my-topic.assets/x.png`。
   若正文里是外链图（OSS/图床），先跑 `npm run localize` 自动下载并改成本地引用。
4. 本地预览 `npm start` 即可（会自动重建分类索引）。

> 不需要手写：`sidebar_position`（按 `date` 自动排序）、分类索引页（自动生成）、`last_update`（由 git 提交时间自动维护）。

## 新增一个分类

新建目录 + `_category_.json`（`{"label": "中文名", "position": 序号}`），放入文章即可；索引页 `index.md` 由脚本自动生成。

## 时间显示

- 文章页底部「最后更新于」取 **git 最后提交时间**，所以请正常按篇提交改动。
- 仅历史文章（git 时间不准）才用 `last_update.date` front matter 钉住真实日期。

## 归档（下线但保留）

把整个分类目录或单篇移到 `docusaurus/archive/`（不参与构建，可随时移回）。

## 脚本

- `npm run gen`：重建各分类索引页（`scripts/gen-index.mjs`，start/build 会自动调用）。
- `npm run localize`：把文档内外链图片下载到本地 `.assets/`（`scripts/localize-images.mjs`）。
