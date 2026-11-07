// Builds static preview pages for TBB Lite from the theme's own skin CSS (variables set to their defaults),
// so layout, dark mode and mobile behaviour can be checked in a browser without a Blogger blog.
import { readFile, writeFile, mkdir } from "node:fs/promises";

const xml = await readFile(new URL("../themes/tbb-lite/tbb-lite.xml", import.meta.url), "utf8");
const skin = xml.match(/<b:skin[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/b:skin>/)[1];
const vars = Object.fromEntries(
  [...skin.matchAll(/<Variable name="([^"]+)"[^>]*default="([^"]+)"/g)].map(([, k, v]) => [k, v]),
);
const menuJs = xml.match(/<script>\/\/<!\[CDATA\[\n([\s\S]*?)\n\/\/\]\]><\/script>/)[1];
const css = skin
  .replace(/\/\* Variable definitions[\s\S]*?\*\//, "")
  .replace(/\$\(([a-z.]+)\)/g, (_, k) => {
    if (!(k in vars)) throw new Error(`Undefined skin variable ${k}`);
    return vars[k];
  });

const thumb = (n) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'><rect width='16' height='9' fill='hsl(${n * 47} 60% 55%)'/></svg>`)}`;

const shell = (title, main, wide = false) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark"><title>${title}</title><style>${css}</style></head>
<body><a class="tbb-skip" href="#tbb-content">Skip to content</a>
<header class="tbb-header"><div class="tbb-wrap tbb-header__bar">
  <div class="tbb-brand-area"><a class="tbb-brand" href="index.html"><h1 class="tbb-brand__title">TBB Lite Demo</h1></a></div>
  <button aria-controls="tbb-nav" aria-expanded="false" aria-label="Menu" class="tbb-menu-btn" hidden type="button"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  <div class="tbb-menu" id="tbb-nav"><nav aria-label="Main"><ul><li><a href="index.html">Home</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul></nav></div>
  <form action="#" class="tbb-search" role="search"><label class="tbb-sr" for="tbb-q">Search this blog</label>
    <input id="tbb-q" name="q" placeholder="Search…" type="search"><button type="submit">Search</button></form>
</div></header>
<div class="tbb-wrap"><main class="tbb-main${wide ? " tbb-main--wide" : ""}" id="tbb-content"><div class="tbb-content">${main}</div>
${wide ? "" : `<aside aria-label="Sidebar" class="tbb-side"><div class="widget"><h2>Popular posts</h2><ul class="tbb-popular">
${[1, 2, 3].map((n) => `<li><img alt="" src="${thumb(n)}" width="72" height="72"><a href="post.html">How to plan a monthly budget on a single income, part ${n}</a></li>`).join("")}
<li><a href="post.html">A popular post without an image</a></li></ul></div>
<div class="widget"><h2>Topics</h2><div class="tbb-labels"><a href="#">Finance</a><a href="#">Blogging</a><a href="#">SEO</a><a href="#">Malaysia</a></div></div></aside>`}
</main></div>
<footer class="tbb-footer"><div class="tbb-wrap"><div class="tbb-footer__cols">
<div><h2>About this blog</h2><div>Write one or two sentences about who runs this blog and what readers will find here.</div></div>
<div><h2>Pages</h2><ul><li><a href="#">Privacy policy</a></li><li><a href="#">Contact</a></li></ul></div><div></div></div>
<div class="tbb-footer__bar"><span>© TBB Lite Demo</span><span>Theme: <a href="https://www.thebukitbesi.com/" rel="nofollow">TBB Lite</a></span></div></div></footer>
<script>${menuJs}</script>
</body></html>`;

const cards = Array.from({ length: 7 }, (_, i) => `<article class="tbb-card">
${i === 3 ? "" : `<a class="tbb-card__thumb" href="post.html" tabindex="-1" aria-label="Post ${i + 1}"><img alt="" src="${thumb(i)}" width="640" height="360"${i ? ' loading="lazy"' : ' fetchpriority="high"'}></a>`}
<div class="tbb-card__body"><h2 class="tbb-card__title"><a href="post.html">Sample post ${i + 1}: a realistic headline that wraps onto two lines on phones</a></h2>
<p class="tbb-meta"><time datetime="2026-11-0${i + 1}">November ${i + 1}, 2026</time></p>
<p class="tbb-card__snippet">A short summary taken from the start of the post. Blogger trims this automatically, and the theme clamps it to three lines so every card keeps the same height.</p></div></article>`).join("");

const home = `<h2 class="tbb-heading">Latest posts</h2><div class="tbb-grid">${cards}</div>
<nav aria-label="Pagination" class="tbb-pager"><a class="tbb-btn tbb-pager__next" href="#" rel="next">Older posts →</a></nav>`;

const post = `<article class="tbb-post"><header class="tbb-post__header">
<nav aria-label="Breadcrumb" class="tbb-crumbs"><ol><li><a href="index.html">Home</a></li><li><a href="#">Finance</a></li><li aria-current="page"><span aria-hidden="true">Article</span></li></ol></nav>
<h1>How to plan a monthly budget on a single income</h1>
<p class="tbb-meta"><span>Author Name</span><time datetime="2026-11-07">November 7, 2026</time><a href="#comments">3 Comments</a></p></header>
<div class="tbb-post__body"><p>The answer first: list fixed costs, set aside savings on payday, then split what is left across variable spending.</p>
<img alt="" src="${thumb(9)}" width="1200" height="675"><h2>Step 1: list fixed costs</h2><p>Rent, utilities and loan repayments come first. <a href="#">Read the guide</a>.</p>
<blockquote>A budget is a plan for money you already have.</blockquote>
<table><tr><th>Item</th><th>Amount (RM)</th><th>Notes</th><th>Due date</th></tr><tr><td>Rent</td><td>900</td><td>Fixed</td><td>1st of month</td></tr></table>
<pre><code>const total = items.reduce((sum, item) =&gt; sum + item.amount, 0);</code></pre>
<iframe title="Video" src="about:blank" width="560" height="315"></iframe></div>
<ul class="tbb-tags"><li><a href="#" rel="tag">Finance</a></li><li><a href="#" rel="tag">Budget</a></li></ul>
<aside class="tbb-author"><img alt="" src="${thumb(4)}" width="64" height="64"><div><strong><a href="#">Author Name</a></strong><p>Writes about personal finance in Malaysia.</p></div></aside>
<section class="tbb-comments" id="comments"><h2>Comments (3)</h2><p>Blogger renders the comment thread and form here.</p></section></article>`;

const out = new URL("../reports/tbb-lite-preview/", import.meta.url);
await mkdir(out, { recursive: true });
await writeFile(new URL("index.html", out), shell("TBB Lite: home", home));
await writeFile(new URL("post.html", out), shell("TBB Lite: post", post));
await writeFile(new URL("page.html", out), shell("TBB Lite: page", post, true));
console.log(`TBB Lite preview: ${Buffer.byteLength(css)} bytes CSS, pages in reports/tbb-lite-preview/`);
