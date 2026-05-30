// 下载文档内图片到每篇文章的 <slug>.assets/ 并改写为相对路径
import fs from 'fs';
import path from 'path';

const RE = /https?:\/\/[^\s)"'<>]+\.(?:png|jpe?g|gif|webp)/gi;
const SKIP = /intranetproxy\.alipay\.com|yuque/i; // 蚂蚁内网，保留原样

function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap(d => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}

function localName(url, used) {
  const base = decodeURIComponent(url.split('/').pop().split('?')[0]);
  const ext = (base.match(/\.(png|jpe?g|gif|webp)$/i) || ['.png'])[0].toLowerCase();
  let stem = base.slice(0, base.length - ext.length)
    .replace(/[^A-Za-z0-9._-]+/g, '-').replace(/-+/g, '-').replace(/^[-.]+|[-.]+$/g, '');
  if (!stem) stem = 'img';
  let name = stem + ext, i = 1;
  while (used.has(name)) name = `${stem}-${i++}${ext}`;
  used.add(name);
  return name;
}

async function dl(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, {signal: ctrl.signal});
    if (!res.ok) return {url, err: res.status};
    return {url, buf: Buffer.from(await res.arrayBuffer())};
  } catch (e) {
    return {url, err: e.message};
  } finally {
    clearTimeout(t);
  }
}

let ok = 0, skip = 0, fail = 0;
const fails = [];

for (const file of walk('docs')) {
  let content = fs.readFileSync(file, 'utf8');
  const urls = [...new Set(content.match(RE) || [])].filter(u => !SKIP.test(u));
  skip += [...new Set(content.match(RE) || [])].length - urls.length;
  if (!urls.length) continue;

  const dir = path.dirname(file);
  const slug = path.basename(file).replace(/\.md$/, '');
  const assetsRel = `${slug}.assets`;
  const assetsDir = path.join(dir, assetsRel);
  const used = new Set();
  const map = {};

  const results = await Promise.all(urls.map(dl));
  for (const r of results) {
    if (r.err) { fails.push(`${r.err}  ${r.url}`); fail++; continue; }
    fs.mkdirSync(assetsDir, {recursive: true});
    const name = localName(r.url, used);
    fs.writeFileSync(path.join(assetsDir, name), r.buf);
    map[r.url] = `./${assetsRel}/${name}`;
    ok++;
  }

  // <img src> -> Markdown 图片（丢弃 style 等），便于 Docusaurus 打包
  content = content.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = tag.match(/src=["']([^"']+)["']/i);
    if (!src || !map[src[1]]) return tag;
    const alt = (tag.match(/alt=["']([^"']*)["']/i) || [, ''])[1];
    return `![${alt}](${map[src[1]]})`;
  });
  // 剩余 Markdown 图片直链替换（长 URL 优先，避免前缀冲突）
  for (const url of Object.keys(map).sort((a, b) => b.length - a.length)) {
    content = content.split(url).join(map[url]);
  }
  fs.writeFileSync(file, content);
  console.log(`${path.relative('docs', file)}  ↓${Object.keys(map).length}`);
}

console.log(`\n下载成功 ${ok} | 跳过(内网) ${skip} | 失败 ${fail}`);
if (fails.length) console.log('失败列表:\n' + fails.join('\n'));
