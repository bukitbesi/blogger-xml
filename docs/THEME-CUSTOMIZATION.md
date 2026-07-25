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
