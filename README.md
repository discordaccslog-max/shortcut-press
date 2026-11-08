# Shortcut Press

Static website for Shortcut Press, a store for self-paced software skills guides delivered as digital downloads.

Plain HTML, CSS and vanilla JavaScript with no build step. Served by GitHub Pages from the root of the `main` branch.

## Adding contact details and checkout links

- **Support email:** set `supportEmail` in `js/site-config.js`. It then appears on the Contact page and in the footer of every page as a mailto link. While it is empty, the email line is not shown.
- **Buy buttons:** set a product's `checkoutUrl` in `js/products.js`. The buy button then appears on that product's page and links to the URL. While it is empty, no button is shown. Prices also come from this file.

## Structure

- `index.html` — home page
- one page per product (for example `spreadsheet-formulas-functions.html`)
- `about.html`, `faq.html`, `contact.html`
- `terms-of-service.html`, `privacy-policy.html`, `refund-policy.html`, `delivery-policy.html`, `disclaimer.html`
- `404.html`
- `css/styles.css` — all styles, with light and dark mode
- `js/main.js` — renders the email, prices and buy buttons, and handles header and scroll effects
