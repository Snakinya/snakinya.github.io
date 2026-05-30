// Hugo -> Docusaurus 迁移脚本（一次性运行）
import fs from 'fs';
import path from 'path';

const SRC = path.resolve('../content');
const DOCS = path.resolve('docs');

const CATS = {
  JavaSec:  {slug: 'javasec',          label: 'JavaSec',  pos: 1},
  CTF:      {slug: 'ctf',              label: 'CTF',      pos: 2},
  程序分析:  {slug: 'program-analysis', label: '程序分析', pos: 3},
  协议安全:  {slug: 'protocol-security', label: '协议安全', pos: 4},
  论文笔记:  {slug: 'paper-notes',       label: '论文笔记', pos: 5},
  LLM:      {slug: 'llm',              label: 'LLM',      pos: 6},
  随笔:      {slug: 'essays',            label: '随笔',     pos: 7},
};

function parseFM(raw) {
  raw = raw.replace(/\r\n?/g, '\n').replace(/^\s+/, '');
  const m = raw.match(/^\+\+\+\s*\n([\s\S]*?)\n\+\+\+\s*\n?/);
  if (!m) return {fm: {}, body: raw};
  const fm = {};
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^(\w+)\s*=\s*(.+)$/);
    if (!mm) continue;
    let v = mm[2].trim();
    if (v.startsWith('[')) {
      v = v.replace(/^\[|\]$/g, '').split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    } else {
      v = v.replace(/^["']|["']$/g, '');
    }
    fm[mm[1]] = v;
  }
  return {fm, body: raw.slice(m[0].length)};
}

function slugify(name) {
  return name.replace(/\.md$/, '')
    .replace(/[（）()|]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 1) 文章按分类迁移
const posts = fs.readdirSync(path.join(SRC, 'posts')).filter(f => f.endsWith('.md'));
const byCat = {};
for (const f of posts) {
  const {fm, body} = parseFM(fs.readFileSync(path.join(SRC, 'posts', f), 'utf8'));
  const cat = Array.isArray(fm.categories) ? fm.categories[0] : fm.categories;
  const c = CATS[cat];
  if (!c) { console.warn('未知分类，跳过:', cat, f); continue; }
  (byCat[c.slug] ??= {...c, items: []}).items.push({
    title: fm.title || f.replace(/\.md$/, ''),
    date: fm.date || '',
    slug: slugify(f),
    body,
  });
}

for (const [slug, c] of Object.entries(byCat)) {
  const dir = path.join(DOCS, slug);
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(path.join(dir, '_category_.json'),
    JSON.stringify({label: c.label, position: c.pos, link: {type: 'generated-index'}}, null, 2));
  c.items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  c.items.forEach((it, i) => {
    const front = `---\ntitle: ${JSON.stringify(it.title)}\nsidebar_position: ${i + 1}\n---\n\n`;
    fs.writeFileSync(path.join(dir, it.slug + '.md'), front + it.body);
  });
  console.log(`${c.label}: ${c.items.length} 篇`);
}

// 2) about/books/friends -> 顶层文档
const PAGES = [
  {src: 'about/index.md',   slug: 'about',   label: '关于',  pos: 10},
  {src: 'books/index.md',   slug: 'books',   label: '书单',  pos: 11},
  {src: 'friends/index.md', slug: 'friends', label: '友链',  pos: 12},
];
for (const p of PAGES) {
  const {fm, body} = parseFM(fs.readFileSync(path.join(SRC, p.src), 'utf8'));
  const front = `---\ntitle: ${JSON.stringify(fm.title || p.label)}\nsidebar_label: ${JSON.stringify(p.label)}\nsidebar_position: ${p.pos}\n---\n\n`;
  fs.writeFileSync(path.join(DOCS, p.slug + '.md'), front + body);
  console.log(`页面: ${p.label}`);
}

// 3) 首页 intro
fs.rmSync(path.join(DOCS, 'intro.mdx'), {force: true});
fs.writeFileSync(path.join(DOCS, 'intro.md'),
  `---\nsidebar_position: 0\ntitle: 欢迎\n---\n\n# Snakinya-明烛天南\n\n苍山负雪，明烛天南。\n\n这里收录我在 Java 安全、CTF、程序分析、协议安全、论文笔记、LLM 等方向的笔记。\n请使用左侧分类导航浏览。\n`);
console.log('intro.md 已生成');
