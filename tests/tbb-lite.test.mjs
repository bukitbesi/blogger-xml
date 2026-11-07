import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { XMLValidator } from "fast-xml-parser";

const xml = await readFile(new URL("../themes/tbb-lite/tbb-lite.xml", import.meta.url), "utf8");
const count = (re) => (xml.match(re) ?? []).length;

test("TBB Lite is well-formed Blogger XML", () => {
  assert.equal(XMLValidator.validate(xml, { allowBooleanAttributes: true }), true);
  for (const ns of ["b", "data", "expr"]) assert.match(xml, new RegExp(`xmlns:${ns}='http://www\\.google\\.com/2005/gml/${ns}'`));
  assert.match(xml, /b:layoutsVersion='3'/);
  assert.match(xml, /b:defaultwidgetversion='2'/);
  assert.equal(count(/<b:widget id='Blog1'[^>]+type='Blog'/g), 1);
});

test("TBB Lite is original work, not a copy of the licensed production theme", () => {
  assert.doesNotMatch(xml, /probloggertemplates|Pro Blogger Templates/i);
  assert.doesNotMatch(xml, /\bpbt[-_]/);
  assert.doesNotMatch(xml, /thebukitbesi\.xml|syxsjt7zf0|ca-pub-\d+|GTM-|G-[A-Z0-9]{8,}/);
});

test("one canonical, one description and noindex on thin views", () => {
  assert.equal(count(/rel='canonical'/g), 1);
  assert.equal(count(/name='description'/g), 1);
  assert.match(xml, /data:view\.isSearch or data:view\.isArchive or data:view\.isError'>\s*<meta content='noindex, follow' name='robots'\/>/);
  assert.doesNotMatch(xml, /hreflang/);
});

test("structured data: one BlogPosting graph, no fabricated entities", () => {
  assert.equal(count(/&quot;@type&quot;:&quot;BlogPosting&quot;/g), 1);
  assert.equal(count(/&quot;@type&quot;:&quot;BreadcrumbList&quot;/g), 1);
  assert.equal(count(/&quot;@type&quot;:&quot;WebSite&quot;/g), 1);
  assert.doesNotMatch(xml, /NewsArticle|FAQPage|AggregateRating|Review/);
  // The BlogPosting and breadcrumb are only emitted on post pages.
  assert.match(xml, /<b:if cond='data:view\.isPost'>[\s\S]*<b:include data='post' name='tbbSchema'\/>/);
});

test("every skin variable used in CSS is declared", () => {
  const skin = xml.match(/<b:skin[^>]*><!\[CDATA\[([\s\S]*?)\]\]><\/b:skin>/)[1];
  const declared = new Set([...skin.matchAll(/<Variable name="([^"]+)"/g)].map((m) => m[1]));
  const used = [...skin.matchAll(/\$\(([a-z.]+)\)/g)].map((m) => m[1]);
  assert.ok(used.length > 10);
  for (const v of used) assert.ok(declared.has(v), `Undeclared skin variable ${v}`);
  assert.ok(declared.has("brand.color"));
  assert.match(xml, /data:skin\.vars\.brand_color/);
});

test("every custom include resolves to an includable in this theme", () => {
  const defined = new Set([...xml.matchAll(/<b:includable id='([^']+)'/g)].map((m) => m[1]));
  const included = [...xml.matchAll(/<b:include [^>]*name='(tbb[A-Za-z]+)'/g)].map((m) => m[1]);
  assert.ok(included.length >= 6);
  for (const name of included) assert.ok(defined.has(name), `Missing includable ${name}`);
});

test("performance and accessibility budgets", () => {
  assert.ok(Buffer.byteLength(xml) < 40_000, "theme stays under 40 KB");
  assert.doesNotMatch(xml, /jquery|bootstrap|font-awesome|fonts\.googleapis/i);
  assert.equal(count(/<script\b[^>]*\bsrc=/g), 0, "no external scripts");
  const inlineJs = [...xml.matchAll(/<script>\/\/<!\[CDATA\[([\s\S]*?)\/\/\]\]><\/script>/g)].map((m) => m[1]).join("");
  assert.ok(Buffer.byteLength(inlineJs) < 500, "inline JS under 0.5 KB");
  for (const img of xml.match(/<img\b[^>]*>/g)) {
    assert.match(img, /\b(expr:)?width=/, `img without width: ${img}`);
    assert.match(img, /\b(expr:)?height=/, `img without height: ${img}`);
  }
  // The first card image is the likely LCP element: never lazy-load it.
  assert.match(xml, /<b:attr cond='data:card\.i != 0' name='loading' value='lazy'\/>/);
  assert.match(xml, /prefers-reduced-motion/);
  assert.match(xml, /class='tbb-skip' href='#tbb-content'/);
  assert.match(xml, /aria-expanded='false'/);
});

test("footer credit is nofollow (sitewide template links must not pass PageRank)", () => {
  assert.match(xml, /<a href='https:\/\/www\.thebukitbesi\.com\/' rel='nofollow'>TBB Lite<\/a>/);
});

test("default colours pass WCAG AA (4.5:1) for text and links in light and dark mode", () => {
  const def = Object.fromEntries([...xml.matchAll(/<Variable name="([^"]+)"[^>]*type="color" default="(#[0-9a-f]{6})"/g)].map((m) => [m[1], m[2]]));
  const lum = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return Math.floor(((x + 0.05) / (y + 0.05)) * 100) / 100; };
  const pairs = [
    ["text.color", "page.bg"], ["text.color", "surface.bg"], ["muted.color", "page.bg"], ["muted.color", "surface.bg"],
    ["link.color", "page.bg"], ["link.color", "surface.bg"], ["brand.ink", "brand.color"],
    ["dark.text", "dark.bg"], ["dark.text", "dark.surface"], ["dark.muted", "dark.bg"], ["dark.muted", "dark.surface"],
    ["dark.link", "dark.bg"], ["dark.link", "dark.surface"],
  ];
  for (const [fg, bg] of pairs) assert.ok(ratio(def[fg], def[bg]) >= 4.5, `${fg} on ${bg}: ${ratio(def[fg], def[bg])}:1`);
  // Text never uses the brand colour directly, since the brand only has to pass 3:1 as a border or button fill.
  assert.doesNotMatch(xml, /[{;]color:var\(--tbb-brand\)/);
});
