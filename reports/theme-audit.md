# Blogger theme audit

Generated from `blogger/production/thebukitbesi.xml`.

## Snapshot

- Size: 309.6 KiB
- Lines: 4498
- Blogger sections: 22
- Blogger widgets: 36
- External scripts: 4

## Risk checks

| Severity | Check | Found | Target maximum | Status |
| --- | --- | ---: | ---: | --- |
| high | External jQuery runtime | 1 | 0 | review |
| medium | Bootstrap Icons dependency | 6 | 0 | review |
| high | Service worker or manifest references | 0 | 0 | pass |
| high | History manipulation used as canonicalization | 0 | 0 | pass |
| high | English hreflang pointing at the same URL | 0 | 0 | pass |
| high | Synchronous feed request | 1 | 0 | review |
| medium | Article-type schema declarations in source | 2 | 2 | pass |

## Prioritized actions

- **External jQuery runtime:** Migrate legacy menu, feed, shortcode and widget behavior to vanilla JavaScript before removing the runtime.
- **Bootstrap Icons dependency:** Replace icon-font usage with a small reviewed inline SVG sprite after shortcode parity is covered.
- **Synchronous feed request:** Replace synchronous feed access with asynchronous fetch and cached rendering.

## External script sources

- `https://www.googletagmanager.com/gtag/js?id=G-0XL6FW2M0R`
- `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0182550701431501`
- `${r}`
- `https://cdn.jsdelivr.net/gh/tbbcom/on@0dca42de260846ac87d369048af6ab3e86e95e4e/master-ads-injector.js`

## Interpretation

This is a deterministic source audit, not a rendered Blogger or field Core Web
Vitals test. Production release still requires a test-blog restore, rendered
metadata review, Lighthouse diagnostics and Search Console monitoring.
