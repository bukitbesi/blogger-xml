# SEO and performance contract

## Core Web Vitals

Field success is evaluated at the 75th percentile:

- LCP: 2.5 seconds or less
- INP: 200 milliseconds or less
- CLS: 0.1 or less

Development budgets are intentionally stricter: LCP 2.0 seconds, CLS 0.05 and
TBT 150 milliseconds with advertising disabled for diagnosis.

## Indexing and metadata

- Canonical host: `https://www.thebukitbesi.com/`
- Primary language: Malay for Malaysia (`ms-MY`)
- Search result pages should be reviewed for `noindex,follow`.
- Label and archive behavior must be based on GSC and crawl evidence, not a
  blanket robots rule.
- Each rendered page gets one title, one description and one canonical.

## Structured data

- Homepage: `WebSite` and `Organization`.
- Standard post: `BlogPosting`.
- Genuine time-sensitive news post: `NewsArticle`.
- Static page: `WebPage`.
- Breadcrumbs: one `BreadcrumbList`.
- Visible FAQs only: `FAQPage`.

Structured data must describe visible page content and must not invent ratings,
authors, translations, products or business details.

## Third parties

AdSense, analytics and consent tools affect lab and field measurements. Test the
theme-owned layer separately, then test the complete production stack. Never
remove required policy or revenue scripts merely to increase a Lighthouse
score.

