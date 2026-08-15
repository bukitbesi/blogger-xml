# Theme customization

## Font

Inter is the default for the main interface, headings and article text. It is
not hard-coded into individual widgets. After restoring the XML to Blogger,
change it from:

**Theme → Customize → Advanced → Fonts**

The three independent settings are:

- Main Font — interface, navigation and widgets
- Title Font — headings and post titles
- Text Font — article summaries and body content

System sans-serif fallbacks remain available if Inter is not loaded.

## Header logo

The existing `main-logo` section keeps Blogger's native Image widget. Replace
the image from:

**Layout → Header Logo → Edit**

Use a transparent WebP or PNG, ideally around 600 × 134 pixels. The theme
reserves the logo height to reduce layout shift.

## Subscriber widgets

The original theme contains two separate `Stay Informed` widgets:

- `HTML6` in the sidebar
- `HTML12` in the footer

Both are intentionally preserved for rollback safety. Remove or hide either one
from Blogger Layout after testing. Do not delete both unless the subscription
form is no longer required.

## Layout editor

All original section and widget IDs stay intact. The visual web-app layer only
changes CSS presentation; it does not replace Blogger's Layout editor,
dashboard or widget storage.

## Externalized CSS and JS

`blogger/production/thebukitbesi.xml` only inlines the CSS Blogger must
compile itself: the `<Variable>` Customize-Options declarations, the
`:root`/`.is-dark`/`html.rtl` custom-property blocks, and the site JS
bootstrap objects (`pbt`, `options`, `noThumbnail`, `disqus_*`) that are
templated per page with `data:`/`b:eval`. Everything else lives in two files
loaded from jsDelivr so the browser caches them once across every page view
instead of re-downloading them inline on every request:

- `blogger/style.min.css` — all non-variable theme CSS (reset, layout,
  components, responsive rules). Referenced via
  `<link href='https://cdn.jsdelivr.net/gh/bukitbesi/blogger-xml@main/blogger/style.min.css' rel='stylesheet'/>`.
- `blogger/tbb.min.js` — the site JS engine (menu, lazy-load, search,
  shortcodes, dark mode, etc.), loaded after the `vanilla.js` jQuery-API
  shim via
  `<b:tag name='script' src='https://cdn.jsdelivr.net/gh/bukitbesi/blogger-xml@main/blogger/tbb.min.js' type='text/javascript'/>`.

Because these two files are cascaded/loaded *after* the inline `:root` block,
color and font values set through **Theme → Customize** keep working
normally — Designer changes only ever touch the small inline block.

To ship a change to either file: edit it in this repo, get it merged to
`main`, then purge the jsDelivr cache for the `@main` ref (jsDelivr caches
branch refs for up to a few hours) via
[purge.jsdelivr.net](https://www.jsdelivr.com/tools/purge) so the CDN serves
the new content immediately. Pin a commit SHA instead of `@main` in the theme
if you need a change to be instant and reproducible.
