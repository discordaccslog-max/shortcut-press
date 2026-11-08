# Shortcut Press

Static website for Shortcut Press, a store for self-paced software skills guides delivered as digital downloads.

Plain HTML, CSS and vanilla JavaScript with no build step and no third-party libraries. Served by GitHub Pages (root of `main`) and Vercel.

## Adding contact details and checkout links

- **Support email:** set `supportEmail` in `js/site-config.js`. It then appears on the Contact page and in the footer of every page as a mailto link. While it is empty, the email line is not shown.
- **Buy buttons:** set a product's `checkoutUrl` in `js/products.js`. The buy button then appears on that product's page (in the sticky column on desktop and the bottom bar on mobile) and links to the URL. While it is empty, no button is shown. Prices also come from this file.

## Structure

- `index.html` — home page (keycap hero, bento grid of guides)
- one page per product (for example `spreadsheet-formulas-functions.html`)
- `about.html`, `faq.html`, `contact.html`
- `terms-of-service.html`, `privacy-policy.html`, `refund-policy.html`, `delivery-policy.html`, `disclaimer.html`
- `404.html`
- `css/styles.css` — all styles; dark by default with a light theme
- `js/main.js` — email, prices and buy buttons, theme toggle, command palette, keyboard shortcuts, keycap hero, scroll effects
- `js/search-index.js` — the guides, pages and FAQ questions the command palette searches

## Keyboard shortcuts

<kbd>Ctrl</kbd> <kbd>K</kbd> (or <kbd>⌘</kbd> <kbd>K</kbd>) opens search. <kbd>/</kbd>, <kbd>?</kbd> and <kbd>T</kbd> are single-key shortcuts that visitors can turn off from the shortcuts panel.
