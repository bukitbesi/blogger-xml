import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const productionPath = new URL(
  "../blogger/production/thebukitbesi.xml",
  import.meta.url,
);
const backupPath = new URL(
  "../blogger/backups/original-2026-07-23.xml",
  import.meta.url,
);

test("production candidate preserves required Blogger structure", async () => {
  const xml = await readFile(productionPath, "utf8");

  assert.match(xml, /xmlns:b='http:\/\/www\.google\.com\/2005\/gml\/b'/);
  assert.match(xml, /<b:skin\b/);
  assert.match(xml, /<b:section\b/);
  assert.match(xml, /<b:widget\b/);
  assert.match(xml, /rel='canonical'/);
});

test("safe SEO migration removes known invalid patterns", async () => {
  const xml = await readFile(productionPath, "utf8");

  assert.doesNotMatch(xml, /history\.replaceState/);
  assert.doesNotMatch(xml, /serviceWorker/);
  assert.doesNotMatch(xml, /hreflang='en'/);
  assert.doesNotMatch(xml, /rel='manifest'/);
  assert.equal(
    (xml.match(/@type&quot;:\s*&quot;NewsArticle/g) ?? []).length,
    1,
  );
  assert.equal(
    (xml.match(/@type&quot;:\s*&quot;BlogPosting/g) ?? []).length,
    1,
  );
});

test("imported baseline stays available for rollback", async () => {
  const [production, backup] = await Promise.all([
    readFile(productionPath),
    readFile(backupPath),
  ]);

  // Production is intentionally smaller than the immutable baseline: the
  // bulk of the theme CSS and the site JS engine are externalized to
  // blogger/style.min.css and blogger/tbb.min.js (CDN-cached across page
  // views) instead of being duplicated inline on every request.
  assert.ok(backup.byteLength > 250_000);
  assert.ok(production.byteLength > 150_000);
  assert.notDeepEqual(production, backup);
});

test("layout widgets and editable typography remain intact", async () => {
  const xml = await readFile(productionPath, "utf8");

  const requiredSections = [
    "main-logo",
    "main-menu",
    "featured",
    "content-section",
    "main",
    "content-section-2",
    "sidebar",
    "footer-info",
    "footer-widgets",
    "footer-copyright",
    "footer-menu",
  ];

  for (const id of requiredSections) {
    assert.match(xml, new RegExp(`<b:section[^>]+id='${id}'`));
  }

  assert.match(
    xml,
    /<Variable name="main\.font"[^>]+type="font"[^>]+family="Inter"/,
  );
  assert.match(
    xml,
    /<Variable name="title\.font"[^>]+type="font"[^>]+family="Inter"/,
  );
  assert.match(
    xml,
    /<Variable name="text\.font"[^>]+type="font"[^>]+family="Inter"/,
  );

  assert.match(xml, /<b:widget id='HTML6'[^>]+title='Stay Informed'/);
  assert.match(xml, /<b:widget id='HTML12'[^>]+title='Stay Informed'/);
});
