import { readFile } from "node:fs/promises";
import { XMLParser, XMLValidator } from "fast-xml-parser";

const candidate =
  process.argv[2] ?? "blogger/production/thebukitbesi.xml";
const xml = await readFile(candidate, "utf8");

const validation = XMLValidator.validate(xml, {
  allowBooleanAttributes: true,
});

if (validation !== true) {
  const { err } = validation;
  console.error(
    `Invalid XML at line ${err.line}, column ${err.col}: ${err.msg}`,
  );
  process.exit(1);
}

const requiredFragments = [
  ["Blogger namespace", "xmlns:b='http://www.google.com/2005/gml/b'"],
  ["Blogger data namespace", "xmlns:data='http://www.google.com/2005/gml/data'"],
  ["Blogger expression namespace", "xmlns:expr='http://www.google.com/2005/gml/expr'"],
  ["Blogger skin", "<b:skin"],
  ["Blogger section", "<b:section"],
  ["Blogger widget", "<b:widget"],
  ["canonical URL", "rel='canonical'"],
];

const missing = requiredFragments
  .filter(([, fragment]) => !xml.includes(fragment))
  .map(([name]) => name);

if (missing.length) {
  console.error(`Missing required theme structure: ${missing.join(", ")}`);
  process.exit(1);
}

const parser = new XMLParser({
  allowBooleanAttributes: true,
  ignoreAttributes: false,
  preserveOrder: true,
  processEntities: false,
  trimValues: false,
});

parser.parse(xml);

const counts = {
  bytes: Buffer.byteLength(xml),
  lines: xml.split("\n").length,
  sections: (xml.match(/<b:section\b/g) ?? []).length,
  widgets: (xml.match(/<b:widget\b/g) ?? []).length,
  includables: (xml.match(/<b:includable\b/g) ?? []).length,
};

console.log(
  `Blogger XML valid: ${candidate} (${counts.lines} lines, ${counts.sections} sections, ${counts.widgets} widgets, ${counts.includables} includables)`,
);

