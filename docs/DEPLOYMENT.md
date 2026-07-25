# Deployment and rollback

## Sites reference

Sites checkpoints are visual review artifacts. They do not change
thebukitbesi.com.

## Blogger candidate

1. Download the approved XML from `blogger/production/`.
2. Export the current production theme and blog content from Blogger.
3. Restore the candidate to a dedicated test blog.
4. Test homepage, post, page, label, search, archive, comments, widgets, ads and
   404 views on mobile and desktop.
5. Validate rendered canonicals, descriptions, Open Graph and JSON-LD.
6. Obtain explicit production approval.
7. Restore the approved candidate through Blogger Theme.
8. Keep the previous XML locally until field monitoring is complete.

## Rollback

If navigation, Layout editor, posts, ads or indexing controls regress, restore
the last known-good production export. Do not attempt live emergency editing
unless rollback is unavailable.

## Sensitive operations

Explicit approval is required for:

- production Blogger restore;
- public Sites access or production-domain changes;
- robots.txt, Cloudflare redirects or canonical-host changes;
- AdSense publisher/slot/Auto Ads changes;
- analytics, consent, verification tokens or secrets.

