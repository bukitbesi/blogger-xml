import { readFile, writeFile } from "node:fs/promises";
import { resolve, sep } from "node:path";

const candidate =
  process.argv[2] ?? "blogger/production/thebukitbesi.xml";
const candidatePath = resolve(candidate);
const backupRoot = resolve("blogger/backups");

if (
  candidatePath === backupRoot ||
  candidatePath.startsWith(`${backupRoot}${sep}`)
) {
  throw new Error("Refusing to migrate an immutable Blogger backup.");
}

let xml = await readFile(candidatePath, "utf8");
const changes = [];

function replaceOnce(label, search, replacement) {
  const next = xml.replace(search, replacement);
  if (next === xml) {
    console.log(`Skipped (already migrated or not found): ${label}`);
    return;
  }
  xml = next;
  changes.push(label);
}

replaceOnce(
  "remove duplicate early NewsArticle JSON-LD",
  /\n\s*<!-- Enhanced NewsArticle JSON-LD for Google News & Discover \(2026\) - Safe version -->[\s\S]*?<\/script>\s*<\/b:if>\n/,
  "\n",
);

replaceOnce(
  "remove duplicate static-page description",
  /(\s*<b:elseif cond='data:view\.isPage'\/>\s*[\s\S]*?<meta expr:content='data:view\.description\.escaped' name='description'\/>)\s*<meta expr:content='data:blog\.metaDescription\.escaped' name='description'\/>/,
  "$1",
);

replaceOnce(
  "remove invalid same-URL hreflang cluster",
  /\s*<!-- hreflang: BM primary, EN secondary, x-default = BM -->\s*<link expr:href='data:view\.url\.canonical' hreflang='ms' rel='alternate'\/>\s*<link expr:href='data:view\.url\.canonical' hreflang='en' rel='alternate'\/>\s*<link expr:href='data:view\.url\.canonical' hreflang='x-default' rel='alternate'\/>/,
  "",
);

replaceOnce(
  "remove client-side canonical history rewrite",
  /\s*<script type='text\/javascript'>\s*\/\/<!\[CDATA\[\s*\/\/ Force Canonical URL[\s\S]*?\/\/\]\]>\s*<\/script>/,
  "",
);

replaceOnce(
  "remove cross-origin manifest",
  /\s*<link href='https:\/\/tbbcom\.github\.io\/on\/manifest\.json' rel='manifest'\/>/,
  "",
);

replaceOnce(
  "remove cross-origin service worker registration",
  /\s*<script type='text\/javascript'>\s*\/\/<!\[CDATA\[\s*if \('serviceWorker' in navigator\)[\s\S]*?\/\/\]\]>\s*<\/script>/,
  "",
);

replaceOnce(
  "update theme migration banner",
  /- Updated jQuery 3\.7\.1 \+ defer for better INP/,
  "- Legacy jQuery isolated pending tested vanilla-JS parity migration",
);

await writeFile(candidatePath, xml);
console.log(`Applied ${changes.length} safe migrations to ${candidate}:`);
for (const change of changes) console.log(`- ${change}`);

