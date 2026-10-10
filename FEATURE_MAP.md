# Smoky Motors feature map

## Launch page

- `src/pages/index.astro` renders the single coming-soon experience with a large CMS-backed wordmark, status line, address, animated atmosphere, and responsive styling.
- `src/middleware.ts` adds `X-Robots-Tag: noindex, nofollow` to every response.
- `public/_headers` provides the same header for Cloudflare static asset responses.
- `public/robots.txt` disallows all crawlers.

## EmDash content

- `seed/seed.json` defines the `pages` collection and creates the `home` page content: headline, status line, and address.
- The same seed creates the empty `site-primary` EmDash menu only when it is missing. No navigation or footer links are hardcoded.
- `/_emdash/admin` is provided by the EmDash Astro integration for editing seeded content.

## Cloudflare

- `wrangler.jsonc` declares the `smokymotors` Worker, D1 binding `DB` / database `smokymotors`, and R2 binding `MEDIA` / bucket `smokymotors-media`.
- Cloudflare resource IDs intentionally remain placeholders. This repository does not create resources or deploy.

## Verification

- `bin/verify-site` crawls same-origin HTML links/assets, requires HTTP 200 responses, and verifies the address, robots meta tag, `X-Robots-Tag`, and `robots.txt`.
- Run `npm run verify -- --url=http://127.0.0.1:4321` against a running local site or provide any deployed/base URL.
