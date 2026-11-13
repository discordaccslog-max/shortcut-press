# Shortcut Press

Website and interactive browser-based guides for Shortcut Press. Each guide teaches one program with lessons, diagrams, quizzes, exercises with worked solutions, practice files, a shortcut trainer and progress tracking, unlocked with a license code.

The published site is static HTML, CSS and vanilla JavaScript, served by Vercel (www.shortcutpress.online) and GitHub Pages. Node is only needed to rebuild pages, practice files and the fulfillment kit, and to run the tests.

## Everyday changes

- **Checkout links:** set a product's `checkoutUrl` in `js/products.js`. The buy button and the terms checkbox then appear on that product's page. Point the payment provider's success page at the product's confirmation page (`confirmationPath`, for example `https://www.shortcutpress.online/thank-you/figma-interface-design/`) and let it add the order ID to the address (`session_id`, `order_id`, `order`, `transaction_id`, `txn_id` or `token`).
- **Support email and legal details:** `js/site-config.js` (`supportEmail`, plus optional `legalName` and `businessAddress`).
- **Copy:** policies, FAQ and About are in `tools/site/copy.mjs`; guide lessons are in `tools/guides/*.mjs`. Rebuild with `npm run build`.

## Commands

- `npm install` — installs the build and test tools.
- `npm run build` — regenerates every page, the guide data files, search index, sitemap, manifest and service worker.
- `npm run files` — regenerates every practice file (needs Microsoft Edge or Google Chrome for the video clips).
- `npm test` — license unit tests and end-to-end tests in Edge or Chrome (and WebKit when installed with `npx playwright-core install webkit`).
- `npm run kit` — rebuilds `fulfillment-kit/` from the live site (screenshots, video, summary and PDF). Run it again after adding checkout links to include checkout screenshots.
- `npm run serve` — serves the site locally at http://localhost:8765/.

## Structure

- Storefront pages at the root; guides at `guides/<slug>/`; confirmation pages at `thank-you/<slug>/` (not linked, `noindex`).
- `js/license.js` license codes · `js/store.js` on-device storage and backups · `js/dock.js` My Guides · `js/guide-app.js` guide reader · `js/sandbox.js` formula sandbox · `js/trainer.js` shortcut trainer · `js/confirm.js` confirmation page · `js/pdf.js` confirmation PDF · `js/diagrams.js` lesson diagrams.
- `vendor/fast-formula-parser/` — formula engine (MIT).
- `tools/` — generators; `tests/` — tests. Neither is uploaded to Vercel.
