// 自动生成各分类索引页 index.md，并导出 src/data/posts.json（供主页"最近更新"使用）。
// 由 npm start / build 自动调用，无需手动维护。
import fs from 'fs';
import path from 'path';

const DOCS = path.resolve('docs');

function frontMatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  if (m) for (const line of m[1].split('\n')) {
    const mm = line.match(/^(\w+):\s*(.+)$/);
    if (mm) fm[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, '');
  }
  return fm;
}

const allPosts = [];
const categories = [];

for (const cat of fs.readdirSync(DOCS, {withFileTypes: true})) {
  if (!cat.isDirectory()) continue;
  const dir = path.join(DOCS, cat.name);
  const catFile = path.join(dir, '_category_.json');
  if (!fs.existsSync(catFile)) continue;
  const meta = JSON.parse(fs.readFileSync(catFile, 'utf8'));
  const label = meta.label || cat.name;
  categories.push({label, slug: `/${cat.name}`, position: meta.position ?? 99});

  const posts = fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .map((f) => {
      const fm = frontMatter(fs.readFileSync(path.join(dir, f), 'utf8'));
      return {
        title: (fm.title || f.replace(/\.md$/, '')).replace(/^[^|]*\|\s*/, ''),
        date: fm.date || '',
        slug: fm.slug || `/${f.replace(/\.md$/, '')}`,
      };
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  for (const p of posts) allPosts.push({...p, category: label});

  const list = posts.map((p) => `- [${p.title}](${p.slug})`).join('\n');
  const out = `---\ntitle: ${label}\n---\n\n<!-- 本文件由 gen-index.mjs 自动生成，请勿手改 -->\n\n# ${label}\n\n${list}\n`;
  fs.writeFileSync(path.join(dir, 'index.md'), out);
  console.log(`${cat.name}: ${posts.length} 篇`);
}

allPosts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
categories.sort((a, b) => a.position - b.position);
fs.mkdirSync(path.resolve('src/data'), {recursive: true});
fs.writeFileSync(path.resolve('src/data/posts.json'),
  JSON.stringify({posts: allPosts, categories}, null, 2));
