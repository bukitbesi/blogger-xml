# Blogger theme audit

Generated from `blogger/production/thebukitbesi.xml`.

## Snapshot

- Size: 306.8 KiB
- Lines: 5193
- Blogger sections: 22
- Blogger widgets: 36
- External scripts: 4

## Risk checks

| Severity | Check | Found | Target maximum | Status |
| --- | --- | ---: | ---: | --- |
| high | External jQuery runtime | 0 | 0 | pass |
| medium | Bootstrap Icons dependency | 6 | 0 | review |
| high | Service worker or manifest references | 0 | 0 | pass |
| high | History manipulation used as canonicalization | 0 | 0 | pass |
| high | English hreflang pointing at the same URL | 0 | 0 | pass |
| high | Synchronous feed request | 0 | 0 | pass |
| medium | Article-type schema declarations in source | 2 | 2 | pass |

## Prioritized actions

- **Bootstrap Icons dependency:** Replace icon-font usage with a small reviewed inline SVG sprite after shortcode parity is covered.

## External script sources

- `https://www.googletagmanager.com/gtag/js?id=G-0XL6FW2M0R`
- `https://news.google.com/swg/js/v1/swg-basic.js`
- `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0182550701431501`
- `https://cdn.jsdelivr.net/gh/tbbcom/on@main/master-ads-injector.js`

## Interpretation

This is a deterministic source audit, not a rendered Blogger or field Core Web
Vitals test. Production release still requires a test-blog restore, rendered
metadata review, Lighthouse diagnostics and Search Console monitoring.
