# TBB Lite: free Blogger theme

A fast, original Blogger theme by [The Bukit Besi](https://www.thebukitbesi.com/).
One XML file, about 34 KB, no external CSS, fonts or scripts. The only theme JavaScript
is a 0.3 KB menu toggle, and the menu still works without it.

| | |
|---|---|
| File | `tbb-lite.xml` |
| Version | 1.0.1 |
| Licence | [CC BY 4.0](LICENSE): free for personal and commercial blogs; keep the footer credit or credit the author elsewhere on the blog |
| Blogger | Layouts v3, widget version 2 |

## Features

- Mobile-first: one column on phones, posts plus sidebar from 1000 px, full width on static pages.
- Automatic dark mode (follows the reader's device setting).
- Post cards with 16:9 thumbnails sized by Blogger's image server (`srcset`), with the first image
  loaded eagerly as the likely LCP element and the rest lazy-loaded.
- SEO: one canonical, one meta description, Open Graph and X card tags, `noindex, follow` on search,
  label, archive and error pages, `WebSite` JSON-LD on the homepage and one `BlogPosting` plus
  `BreadcrumbList` graph on posts. No fake ratings, FAQ or organisation data.
- Accessibility: skip link, visible focus, 44 px menu and button targets, `aria-expanded` menu button,
  `prefers-reduced-motion` respected.
- AdSense-ready: "Above posts" and "Below posts" slots for ad widgets, kept separate from navigation.
- Blogger threaded comments with the embedded form.
- Print styles for posts.

## Install

1. **Back up first.** Blogger dashboard → **Theme** → arrow next to **Customize** → **Backup** → **Download**.
2. Same menu → **Restore** → upload `tbb-lite.xml`.
3. **Layout:** set the blog title or logo (Header), edit the **Main menu** links, the footer
   **About this blog** text and the **Pages** links.
4. **Theme → Customize → Advanced:** change the brand colour, light and dark colours, fonts,
   page width and sidebar width.
5. **Settings → Posts:** 6–12 posts on the main page works well with the card grid.

Test on a spare blog before installing on a live site. Restoring a theme replaces the old theme's
widgets that have no matching section.

## Sections

| Section | Use |
|---|---|
| Logo / blog title | Header widget: upload a logo (about 48 px tall), or leave text |
| Main menu | One Link List |
| Above posts / Below posts | Ads or notices (AdSense, HTML/JavaScript) |
| Blog posts | Blog widget |
| Sidebar | Popular Posts and Labels by default; add any widget (hidden on static pages) |
| Footer columns 1–3 | Text, Link List or any widget |

## Restore-test checklist

Check these on a test blog after every change, at phone width and on desktop:

- [ ] Theme saves in the Blogger HTML editor with no error
- [ ] Layout editor shows all nine sections
- [ ] Homepage, a post, a static page, a label page, a search and a 404 page render
- [ ] Older posts / newer posts links work
- [ ] Comment form shows and a test comment posts; replies thread
- [ ] Mobile menu opens and closes; desktop menu is visible
- [ ] View source on a post: one canonical, one description, JSON-LD passes
      [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Theme → Customize colour and font changes apply

## Development

```bash
npm run validate:lite    # Blogger XML structure check
node --test tests/tbb-lite.test.mjs
npm run preview:lite     # static preview pages in reports/tbb-lite-preview/
```

The preview uses the theme's real CSS with the default variable values and sample markup that
mirrors the template. It checks layout only; Blogger itself renders the data tags.

## Changelog

- **1.0.1:** separate link colours for light and dark mode (`link.color`, `dark.link`). The brand red used
  as link text was 3.97:1 on the dark background and 4.45:1 on light cards, under the WCAG AA minimum of 4.5:1.
  Every default text and link colour now passes 4.5:1 in both modes, and a test enforces it.
- **1.0.0:** first release.
