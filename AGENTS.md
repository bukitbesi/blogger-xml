# The Bukit Besi Blogger Engineering Rules

## Mission

Maintain a production-grade Blogger XML theme for `https://www.thebukitbesi.com/`
and a lightweight Sites reference implementation. Prioritize correctness,
rollback safety, search discoverability, accessibility, Core Web Vitals, and
AdSense policy safety.

## Sources of truth

- Production candidate: `blogger/production/thebukitbesi.xml`
- Immutable imported baseline: `blogger/backups/original-2026-07-23.xml`
- Visual reference: `app/`
- Audit output: `reports/theme-audit.md`

Never modify the baseline backup. Never deploy directly to Blogger from an
automated workflow.

## Required workflow

1. Create a feature branch.
2. Audit before editing the production XML.
3. Make the smallest coherent, rollback-safe change.
4. Run `npm run validate:blogger` and `npm run audit:blogger`.
5. Review generated audit changes.
6. Open a pull request; do not push changes directly to `main`.
7. Restore-test the candidate on a non-production Blogger blog.
8. Ask for explicit approval before production installation, domain changes,
   robots changes, AdSense changes, analytics changes, or secrets.

## Blogger invariants

- Preserve valid XML, Blogger namespaces and native `b:`, `data:` and `expr:`
  syntax.
- Preserve Layout editor compatibility, widget IDs, post URLs and legacy post
  shortcodes unless a migration is documented.
- Support homepage, posts, static pages, labels, search, archive, comments,
  widgets and 404 views.
- Do not fabricate Blogger APIs, expressions or widget behavior.
- Keep `https://www.thebukitbesi.com/` as the canonical host.
- Do not add a service worker or cross-origin PWA registration.

## Front-end standards

- Mobile-first: one column on small screens, no more than two editorial columns
  on desktop.
- Prefer semantic HTML, CSS and vanilla JavaScript.
- No new jQuery, Bootstrap, icon-font, UI-framework or render-blocking
  dependency.
- Give images, embeds and ads explicit dimensions or stable reserved space.
- Never lazy-load the LCP image.
- Respect `prefers-reduced-motion`.
- Preserve keyboard navigation, visible focus and 44px touch targets.

## SEO and structured data

- Exactly one canonical link and one description per rendered page.
- Exactly one primary article entity per post: `NewsArticle` only for genuine
  news content, otherwise `BlogPosting`.
- Use one coherent JSON-LD graph; prevent duplicated Article or Breadcrumb
  entities.
- Do not emit translated `hreflang` alternates unless equivalent translated
  pages exist.
- Never promise rankings or fabricate author, organization or review data.
- Do not auto-create FAQ schema from content that is not visibly an FAQ.

## AdSense safety

- Never alter AdSense code in a way that disguises ads or encourages clicks.
- Keep ads visually separate from navigation and interactive controls.
- Prevent layout shifts using stable containers.
- Ask before changing publisher IDs, slot IDs, Auto Ads, consent or ad density.

## Validation targets

- Blogger XML structural validation passes.
- No new duplicate IDs or duplicate core SEO elements.
- Theme-owned JavaScript and CSS stay within documented budgets.
- Lab targets: LCP <= 2.0s, CLS <= 0.05, TBT <= 150ms where third-party ads
  are disabled for diagnosis.
- Field pass criteria: LCP <= 2.5s, INP <= 200ms and CLS <= 0.1 at p75.

