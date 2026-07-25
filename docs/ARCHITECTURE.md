# Architecture

## Two deliverables

1. `app/` is the lightweight Sites reference used to review visual hierarchy,
   responsive behavior and accessibility.
2. `blogger/production/thebukitbesi.xml` is the installable Blogger theme.

The Sites deployment does not replace Blogger, own the production domain or
publish blog content. The design system is implemented in Blogger only through
reviewed XML changes.

## Repository boundaries

| Path | Purpose |
| --- | --- |
| `blogger/backups/` | Immutable imported baselines |
| `blogger/production/` | Current restore candidate |
| `app/` | Sites visual reference |
| `scripts/` | Deterministic validation and audit |
| `reports/` | Generated audit evidence |
| `docs/` | Architecture, deployment and operating rules |

## Performance strategy

- System fonts in the reference implementation.
- No client JavaScript for the initial Sites viewport.
- Responsive CSS with one mobile and at most two editorial desktop columns.
- Stable ad and media placeholders.
- Theme-owned features are progressively enhanced.
- Third-party scripts are isolated, delayed when safe and measured separately.

## Blogger migration sequence

The imported theme still contains a large jQuery runtime and legacy shortcodes.
Replacing that system is deliberately split into reviewed milestones:

1. repository baseline and deterministic audit;
2. duplicate SEO/schema and unsafe canonical/PWA cleanup;
3. navigation, theme mode and accessibility migration;
4. feeds, related posts, search and load-more migration;
5. shortcode compatibility migration;
6. remove jQuery and Bootstrap Icons only after parity tests.

This sequence prevents a fast rewrite from silently breaking old posts,
widgets, ads or Blogger Layout configuration.

