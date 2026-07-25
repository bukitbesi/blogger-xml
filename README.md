# The Bukit Besi — Blogger XML

Production engineering repository for the
[The Bukit Besi](https://www.thebukitbesi.com/) Blogger theme.

## Goals

- valid Blogger XML and Layout editor compatibility;
- mobile-first editorial web-app design;
- search, schema and social metadata without duplication;
- Core Web Vitals-focused rendering;
- AdSense-safe layout and rollback-first releases;
- progressive migration from legacy jQuery to vanilla JavaScript.

## Important files

- `blogger/production/thebukitbesi.xml` — current restore candidate
- `blogger/backups/original-2026-07-23.xml` — immutable imported baseline
- `app/` — Sites visual reference
- `AGENTS.md` — mandatory engineering rules
- `docs/DEPLOYMENT.md` — test, release and rollback process
- `docs/THEME-CUSTOMIZATION.md` — font, logo and subscriber-widget controls

## Local checks

```bash
npm ci
npm run validate:blogger
npm run audit:blogger
npm run lint
```

## Release policy

Changes go through a feature branch and pull request. A passing repository check
does not prove that Blogger will accept or render every dynamic expression, so
every candidate must be restored to a non-production Blogger test blog before
production use.

Production restore, domain, robots, analytics and advertising changes always
require explicit owner approval.
