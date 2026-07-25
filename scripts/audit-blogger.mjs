import { mkdir, readFile, writeFile } from "node:fs/promises";

const candidate =
  process.argv[2] ?? "blogger/production/thebukitbesi.xml";
const reportPath = process.argv[3] ?? "reports/theme-audit.md";
const xml = await readFile(candidate, "utf8");

const checks = [
  {
    id: "jquery",
    severity: "high",
    label: "External jQuery runtime",
    pattern: /jquery(?:\.min)?\.js/gi,
    target: 0,
    action: "Migrate legacy menu, feed, shortcode and widget behavior to vanilla JavaScript before removing the runtime.",
  },
  {
    id: "bootstrap-icons",
    severity: "medium",
    label: "Bootstrap Icons dependency",
    pattern: /bootstrap-icons/gi,
    target: 0,
    action: "Replace icon-font usage with a small reviewed inline SVG sprite after shortcode parity is covered.",
  },
  {
    id: "service-worker",
    severity: "high",
    label: "Service worker or manifest references",
    pattern: /serviceWorker|rel=['"]manifest['"]/gi,
    target: 0,
    action: "Keep the Blogger theme free of cross-origin PWA registration.",
  },
  {
    id: "canonical-history",
    severity: "high",
    label: "History manipulation used as canonicalization",
    pattern: /history\.replaceState/gi,
    target: 0,
    action: "Use server-rendered canonical links and redirects, not client-side URL rewriting.",
  },
  {
    id: "invalid-hreflang",
    severity: "high",
    label: "English hreflang pointing at the same URL",
    pattern: /hreflang=['"]en['"]/gi,
    target: 0,
    action: "Emit hreflang only when a real equivalent translated page exists.",
  },
  {
    id: "sync-xhr",
    severity: "high",
    label: "Synchronous feed request",
    pattern: /async\s*:\s*!1/gi,
    target: 0,
    action: "Replace synchronous feed access with asynchronous fetch and cached rendering.",
  },
  {
    id: "article-entities",
    severity: "medium",
    label: "Article-type schema declarations in source",
    pattern: /@type(?:&quot;|")\s*:\s*(?:&quot;|")(?:NewsArticle|BlogPosting)/gi,
    target: 2,
    action: "Keep only the conditional NewsArticle and BlogPosting branches in one JSON-LD graph.",
  },
];

const result = checks.map((check) => {
  const count = (xml.match(check.pattern) ?? []).length;
  return {
    ...check,
    count,
    status: count <= check.target ? "pass" : "review",
  };
});

const externalScripts = [
  ...xml.matchAll(/<script[^>]+src=['"]([^'"]+)['"][^>]*\/?>/gi),
].map((match) => match[1]);

const table = result
  .map(
    (item) =>
      `| ${item.severity} | ${item.label} | ${item.count} | ${item.target} | ${item.status} |`,
  )
  .join("\n");

const actions = result
  .filter((item) => item.status === "review")
  .map((item) => `- **${item.label}:** ${item.action}`)
  .join("\n");

const report = `# Blogger theme audit

Generated from \`${candidate}\`.

## Snapshot

- Size: ${(Buffer.byteLength(xml) / 1024).toFixed(1)} KiB
- Lines: ${xml.split("\n").length}
- Blogger sections: ${(xml.match(/<b:section\b/g) ?? []).length}
- Blogger widgets: ${(xml.match(/<b:widget\b/g) ?? []).length}
- External scripts: ${externalScripts.length}

## Risk checks

| Severity | Check | Found | Target maximum | Status |
| --- | --- | ---: | ---: | --- |
${table}

## Prioritized actions

${actions || "- No flagged risks."}

## External script sources

${externalScripts.map((source) => `- \`${source}\``).join("\n") || "- None"}

## Interpretation

This is a deterministic source audit, not a rendered Blogger or field Core Web
Vitals test. Production release still requires a test-blog restore, rendered
metadata review, Lighthouse diagnostics and Search Console monitoring.
`;

await mkdir(new URL("../reports/", import.meta.url), { recursive: true });
await writeFile(reportPath, report);
console.log(`Theme audit written to ${reportPath}`);
