# Smoky Motors / EmDash 1.2.0 feature map

## Public site

- Astro renders responsive Home, Inventory, vehicle detail, About, and Contact / Visit pages.
- The lot address is 7264 HWY 411, Benton, TN 37307. There is no payments or checkout flow.
- Vehicle detail pages expose only asking price, mileage, VIN, photos, description, status, and the required “Sold as-is, no warranty.” language.
- `src/config.ts` is the single contact configuration. `PUBLIC_CONTACT_PHONE` is intentionally empty until Ryan supplies the lot number; email defaults to `sales@smokymotors.com`.
- Open Graph, Twitter, viewport, Google Maps, and conditional `tel:` / `sms:` links are present.

## EmDash content and privacy

- `seed/seed.json` defines editable `pages` and `vehicles` collections and seeds twelve realistic sample vehicles with placeholder images.
- `purchase_price` exists for admin accounting only. Public Astro templates and `/api/vehicles.json` explicitly project an allow-list and never serialize it.
- The seed creates `site-primary` only when it is missing, with Home, Inventory, About, and Contact / Visit. The menu is read from EmDash and editable in `/_emdash/admin`.
- `@emdash-cms/plugin-forms` is enabled as the upstream plugin. The exact public `/contact/submit` route proxies to its submit handler so Access can bypass only that route; submissions remain CMS records.
- `/_emdash/admin` is provided by the EmDash Astro integration for editing seeded content.

## Cloudflare

- `wrangler.jsonc` declares committed D1 and KV IDs, R2 media, the custom domain, `workers_dev: false`, `preview_urls: false`, and observability sampling at 1.
- The Worker keeps the EmDash runtime in one bundle, including the Kysely circular-import fix from draft PR #3. The live config values overlap draft PR #5 and should be reconciled when this PR lands.
- Node is pinned via `.nvmrc` and the package engine to 22.16+.

## Verification

- `bin/verify-site` crawls every same-origin link/asset, fails on 404s, encoded `%2F`, placeholder text, empty inventory, missing vehicle price/mileage/VIN/as-is copy, and any `purchase_price` leak in HTML or JSON.
- Run `npm run verify -- --url=http://127.0.0.1:4321` against the production build served by `wrangler dev`.
