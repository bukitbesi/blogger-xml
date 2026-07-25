---
applyTo: "blogger/**/*.xml"
---

- Keep the document well-formed XML.
- Preserve `xmlns`, `b:`, `data:` and `expr:` syntax.
- Escape literal ampersands and keep JavaScript containing XML-sensitive
  characters inside CDATA.
- Do not renumber or delete widget IDs without a documented migration.
- Keep output compatible with Blogger Theme Restore and Layout editor.
- Never inject unsupported schema properties merely for SEO.
- Preserve a rollback path for every material change.

