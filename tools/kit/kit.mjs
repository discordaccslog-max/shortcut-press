// Builds fulfillment-kit/ from the live site: screenshots of every delivery step for every
// product, saved confirmation PDFs, a screen recording, a paste-ready summary and a PDF overview.
// Run with: npm run kit   (needs Microsoft Edge)
// Checkout screenshots are included only when every product has a checkoutUrl in js/products.js.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { pathToFileURL, fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "fulfillment-kit");
const SHOTS = path.join(OUT, "screenshots");
const PDFS = path.join(OUT, "confirmations");
const VIDEO = path.join(OUT, "video");
const LIVE = "https://www.shortcutpress.online/";
const L = require(path.join(ROOT, "js/license.js"));

const load = (file, key) => {
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), "utf8"), ctx);
  return ctx.window[key];
};
const catalog = load("js/products.js", "SHORTCUT_PRODUCTS");
const config = load("js/site-config.js", "SITE_CONFIG");
const guides = load("js/guides-index.js", "SP_GUIDES");
const IDS = Object.keys(catalog);
const GUIDE_IDS = IDS.filter((id) => id !== "complete-library");
const allCheckout = IDS.every((id) => /^https?:\/\//.test(catalog[id].checkoutUrl || ""));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const money = (n) => "$" + n;
const today = new Date();
const dateText = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
const img = (file) => `data:image/${file.endsWith(".jpg") ? "jpeg" : "png"};base64,${fs.readFileSync(path.join(SHOTS, file)).toString("base64")}`;
const cited = new Set();
const url = (p) => {
  const u = LIVE + p;
  cited.add(u);
  return u;
};

async function settle(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350);
}

async function freshContext(browser, opts = {}) {
  const context = await browser.newContext({ viewport: { width: 1360, height: 900 }, deviceScaleFactor: 1, colorScheme: "dark", reducedMotion: "reduce", acceptDownloads: true, ...opts });
  return context;
}

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  for (const d of [SHOTS, PDFS, VIDEO]) fs.mkdirSync(d, { recursive: true });

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const records = {};

  for (const id of IDS) {
    const p = catalog[id];
    const slug = p.slug;
    const rec = (records[id] = { name: p.name, price: p.price, slug, shots: {} });
    console.log("•", p.name);

    // 1. Product page (a first-time visitor)
    const buyer = await freshContext(browser);
    const page = await buyer.newPage();
    await page.goto(url(p.page));
    await settle(page);
    await page.screenshot({ path: path.join(SHOTS, `${slug}-1-product-page.png`), fullPage: true });
    await page.screenshot({ path: path.join(SHOTS, `${slug}-1-product-page-top.png`) });
    rec.shots.product = `${slug}-1-product-page-top.png`;

    if (allCheckout) {
      await page.locator(".p-aside").screenshot({ path: path.join(SHOTS, `${slug}-2-checkout-box-unticked.png`) });
      await page.check("[data-agree-box]");
      await page.waitForTimeout(150);
      await page.locator(".p-aside").screenshot({ path: path.join(SHOTS, `${slug}-2-checkout-box-ticked.png`) });
      rec.shots.checkout = [`${slug}-2-checkout-box-unticked.png`, `${slug}-2-checkout-box-ticked.png`];
    }

    // 2. Confirmation page (what the buyer sees right after payment)
    await page.goto(url(p.confirmationPath));
    await page.waitForSelector("[data-cf-code]");
    await settle(page);
    rec.code = (await page.textContent("[data-cf-code]")).trim();
    if (!L.validate(rec.code).valid || L.validate(rec.code).productId !== id) throw new Error("Confirmation page issued an invalid code for " + id);
    await page.screenshot({ path: path.join(SHOTS, `${slug}-3-confirmation-page.png`), fullPage: true });
    await page.screenshot({ path: path.join(SHOTS, `${slug}-3-confirmation-page-top.png`) });
    rec.shots.confirm = `${slug}-3-confirmation-page-top.png`;

    // 3. Saved confirmation PDF
    const [download] = await Promise.all([page.waitForEvent("download"), page.click("[data-cf-pdf]")]);
    const pdfPath = path.join(PDFS, `${slug}-confirmation.pdf`);
    await download.saveAs(pdfPath);
    const pdfText = fs.readFileSync(pdfPath, "latin1");
    if (!pdfText.startsWith("%PDF") || !pdfText.includes(rec.code)) throw new Error("Saved confirmation PDF is missing the code for " + id);
    const viewer = await buyer.newPage();
    await viewer.setViewportSize({ width: 900, height: 1100 });
    // Open a copy from the system temp folder so the browser process can always read it.
    const viewCopy = path.join(process.env.TEMP || process.env.TMPDIR || "/tmp", `sp-kit-${slug}-confirmation.pdf`);
    fs.copyFileSync(pdfPath, viewCopy);
    await viewer.goto(pathToFileURL(viewCopy).href);
    await viewer.waitForTimeout(2500);
    await viewer.screenshot({ path: path.join(SHOTS, `${slug}-4-saved-confirmation-pdf.png`) });
    rec.shots.pdf = `${slug}-4-saved-confirmation-pdf.png`;
    await viewer.close();

    // 4. The guide in use (Open my guide → first lesson, then a later step)
    await page.click("[data-cf-open]");
    await page.waitForSelector(".tour h2");
    await page.screenshot({ path: path.join(SHOTS, `${slug}-5-guide-first-open-walkthrough.png`) });
    await page.click("[data-tour-skip]");
    await page.waitForSelector(".gd-lesson h1");
    await settle(page);
    await page.screenshot({ path: path.join(SHOTS, `${slug}-6-guide-first-lesson.png`), fullPage: true });
    await page.screenshot({ path: path.join(SHOTS, `${slug}-6-guide-first-lesson-top.png`) });
    rec.shots.guide = `${slug}-6-guide-first-lesson-top.png`;
    const guideId = id === "complete-library" ? "spreadsheet-formulas" : id;
    const firstLesson = guides[guideId].lessons[0].id;
    await page.evaluate((h) => (location.hash = h), `#/lesson/${firstLesson}/99`);
    await page.waitForSelector(".gd-step-n");
    await settle(page);
    await page.screenshot({ path: path.join(SHOTS, `${slug}-7-guide-exercise.png`), fullPage: true });
    if (id === "complete-library") {
      await page.goto(url(p.guidePath));
      await page.waitForSelector(".gd-hub-item");
      await settle(page);
      await page.screenshot({ path: path.join(SHOTS, `${slug}-8-library-hub.png`), fullPage: true });
      rec.shots.hub = `${slug}-8-library-hub.png`;
    } else {
      await page.evaluate(() => (location.hash = "#/trainer"));
      await page.waitForSelector(".trainer-pad");
      await page.screenshot({ path: path.join(SHOTS, `${slug}-8-guide-shortcut-trainer.png`), fullPage: true });
    }
    await buyer.close();

    // 5. Activating the same license on another device through My Guides
    const device2 = await freshContext(browser);
    const d2 = await device2.newPage();
    await d2.goto(url("index.html"));
    await settle(d2);
    await d2.click(".dock-btn");
    await d2.waitForSelector("#dock[open]");
    await d2.fill("#dock-code", rec.code);
    await d2.click(".dock-add button[type=submit]");
    await d2.waitForFunction(() => /Added:/.test(document.querySelector("#dock-add-status").textContent));
    await d2.waitForTimeout(400);
    await d2.screenshot({ path: path.join(SHOTS, `${slug}-9-another-device-my-guides.png`) });
    rec.shots.dock = `${slug}-9-another-device-my-guides.png`;
    await device2.close();
  }

  // Screen recording: confirmation page → guide in use
  console.log("• Recording");
  const vctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: "dark", recordVideo: { dir: VIDEO, size: { width: 1280, height: 800 } } });
  const v = await vctx.newPage();
  const sf = catalog["spreadsheet-formulas"];
  await v.goto(url(sf.confirmationPath));
  await v.waitForSelector("[data-cf-code]");
  await settle(v);
  await v.waitForTimeout(3500);
  await v.mouse.wheel(0, 300);
  await v.waitForTimeout(1500);
  await v.click("[data-cf-open]");
  await v.waitForSelector(".tour h2");
  for (let i = 0; i < 4; i++) {
    await v.waitForTimeout(1300);
    await v.click("[data-tour-next]");
  }
  await v.waitForSelector(".gd-lesson h1");
  await v.waitForTimeout(2000);
  for (let s = 1; s <= 3; s++) {
    await v.click(".gd-nav .btn-primary-soft");
    await v.waitForTimeout(2200);
  }
  await v.evaluate(() => (location.hash = "#/lesson/formulas-references/6"));
  await v.waitForSelector(".gd-q");
  await v.waitForTimeout(1200);
  await v.check(".gd-q >> nth=0 >> input >> nth=0");
  await v.click(".gd-q >> nth=0 >> .gd-check");
  await v.waitForTimeout(2200);
  await v.click(".gd-nav .btn-primary-soft");
  await v.waitForSelector(".sbx-grid");
  await v.waitForTimeout(1500);
  await v.click('td[data-ref="E2"]');
  await v.type(".sbx-input", "=C2*D2*(1+$F$1)", { delay: 70 });
  await v.press(".sbx-input", "Enter");
  await v.waitForTimeout(1000);
  await v.click(".sbx-check");
  await v.waitForTimeout(2500);
  await v.click(".gd-solution summary");
  await v.waitForTimeout(2500);
  const videoPath = await v.video().path();
  await vctx.close();
  fs.renameSync(videoPath, path.join(VIDEO, "confirmation-page-to-guide-in-use.webm"));

  /* ---------- verify every cited URL ---------- */
  const extra = ["", "terms-of-service.html", "refund-policy.html", "delivery-policy.html", "privacy-policy.html", "consumer-rights.html", "contact.html", "faq.html"].map(url);
  void extra;
  for (const id of IDS) url(catalog[id].guidePath);
  const bad = [];
  for (const u of cited) {
    const res = await fetch(u, { redirect: "follow" });
    if (res.status !== 200) bad.push(`${u} → ${res.status}`);
  }
  if (bad.length) throw new Error("Some cited URLs don't load:\n" + bad.join("\n"));

  /* ---------- summary ---------- */
  const lines = IDS.map((id) => `  - ${catalog[id].name}: ${money(catalog[id].price)}${id === "complete-library" ? " (all seven guides, one license)" : ""}`).join("\n");
  const summary = `BUSINESS AND FULFILLMENT SUMMARY

Business: Shortcut Press
Website: ${LIVE}
Support: ${config.supportEmail} (replies within two business days), or the Contact page: ${LIVE}contact.html

What we sell
Interactive, self-paced software skills guides that run in the web browser and are unlocked with a license code. Each guide teaches one program through lessons with step-by-step instructions, original diagrams, short quizzes and exercises with worked solutions, plus downloadable practice files, a keyboard shortcut trainer and progress tracking. These are self-study materials: there are no video lessons, no live instruction and no tutoring, and the software each guide teaches is not included. Prices are in US dollars; applicable taxes are shown at checkout.
${lines}

How and when products are delivered
Delivery is digital and immediate. On the product page, the buyer ticks a box to agree to the Terms of Service and Refund Policy and pays on the payment provider's checkout. Immediately after payment, the buyer is shown the product's order confirmation page, which issues a license code, activates it in that browser, and offers an "Open my guide" button that goes straight into the first lesson. The confirmation can be saved as a PDF or printed. The same license code activates the guide on any other device through the My Guides panel on every page of the site. Online access continues for as long as Shortcut Press operates.

Physical shipment
None. All products are digital. Nothing is shipped and there are no shipping charges.

Refund policy
Full refund on any purchase if requested within 14 days, with no reason required. Refunds are requested through the Contact page with the order number and are issued to the original payment method within 5 business days of the request; the payment provider's processing time may add a few days. The license ends when a purchase is refunded.

Customer support
Email ${config.supportEmail} or use the Contact page (${LIVE}contact.html). Replies within two business days. Lost license codes are sent again on request with the order number and the email used at checkout.

Policies
Terms of Service: ${LIVE}terms-of-service.html
Refund Policy: ${LIVE}refund-policy.html
Delivery Policy: ${LIVE}delivery-policy.html
Privacy Policy: ${LIVE}privacy-policy.html
Consumer Rights: ${LIVE}consumer-rights.html
`;
  fs.writeFileSync(path.join(OUT, "Business-and-Fulfillment-Summary.txt"), summary);

  /* ---------- PDF ---------- */
  const fig = (file, caption) => `<figure><img src="${img(file)}" alt=""><figcaption>${caption}</figcaption></figure>`;
  const checkoutSection = allCheckout
    ? `<p>Each product page shows the agreement checkbox above the buy button. The buy button stays disabled until the box is ticked.</p>${IDS.map((id) => `<div class="pair">${fig(records[id].shots.checkout[0], `${esc(records[id].name)}: box not ticked, buy button disabled.`)}${fig(records[id].shots.checkout[1], "Box ticked, buy button enabled.")}</div>`).join("")}`
    : `<p>On each product page, the buyer ticks “I agree to the Terms of Service and Refund Policy” (both linked); the buy button stays disabled until the box is ticked. The buy button opens the payment provider's checkout, where the buyer pays and applicable taxes are shown. Shortcut Press never sees full card details. After payment, the payment provider sends the buyer to the product's confirmation page shown in step 3.</p>
       <p>The buy button and checkbox appear on a product page once that product's checkout link is added to the site. Checkout links have not been added yet, so this step is described here in writing rather than shown in screenshots.</p>`;

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Shortcut Press — Fulfillment Overview</title>
<style>
  @page { size: Letter; margin: 16mm 15mm; }
  body { font-family: "Segoe UI", system-ui, sans-serif; font-size: 10.5pt; line-height: 1.5; color: #111; }
  h1 { font-size: 22pt; margin: 0 0 4pt; }
  h2 { font-size: 14pt; margin: 20pt 0 8pt; padding-top: 8pt; border-top: 1px solid #ccc; break-after: avoid; }
  h3 { font-size: 11.5pt; margin: 14pt 0 4pt; break-after: avoid; }
  .meta { color: #555; margin: 0 0 12pt; }
  pre { white-space: pre-wrap; font-family: Consolas, "Courier New", monospace; font-size: 8.8pt; background: #f4f4f1; border: 1px solid #ddd; padding: 10pt; border-radius: 4pt; }
  figure { margin: 8pt 0 14pt; break-inside: avoid; }
  figure img { width: 100%; border: 1px solid #ccc; border-radius: 3pt; }
  figcaption { font-size: 8.8pt; color: #444; margin-top: 3pt; }
  .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 8pt; break-inside: avoid; }
  .narrow img { width: 70%; }
  table { border-collapse: collapse; width: 100%; font-size: 9pt; }
  td, th { border: 1px solid #ccc; padding: 4pt 6pt; text-align: left; vertical-align: top; }
  th { background: #f4f4f1; }
  code { font-family: Consolas, monospace; font-size: 9pt; }
  ul, ol { padding-left: 16pt; }
  .pb { break-before: page; }
</style></head><body>
<h1>Shortcut Press — Fulfillment Overview</h1>
<p class="meta">${dateText} · ${LIVE} · Screenshots captured from the live site with Microsoft Edge on ${dateText}.</p>

<h2>1. Business and Fulfillment Summary</h2>
<p>Plain text for payment provider forms. The same text is saved as <code>Business-and-Fulfillment-Summary.txt</code>.</p>
<pre>${esc(summary)}</pre>

<h2 class="pb">2. The delivery process, step by step</h2>
<p>Every product follows the same steps. Screenshots of each step for all eight products are in the <code>screenshots</code> folder; a selection appears below.</p>

<h3>Step 1. The buyer reviews the product page</h3>
<p>Each product page shows the price in US dollars, the level, the format (an interactive guide in the web browser, unlocked with a license), the software required (not included), the delivery method (a license code on the order confirmation page immediately after payment), what's needed (a modern web browser), and the line “Instant access with a license · 14-day refund policy · Applicable taxes are shown at checkout”, with the refund policy linked. The page also shows the full contents, a preview rendered from the guide, what's inside, and who the guide is and isn't for.</p>
${fig(records["spreadsheet-formulas"].shots.product, `${esc(catalog["spreadsheet-formulas"].name)}: ${url(catalog["spreadsheet-formulas"].page)}`)}
<table><tr><th>Product</th><th>Price</th><th>Product page</th></tr>${IDS.map((id) => `<tr><td>${esc(catalog[id].name)}</td><td>${money(catalog[id].price)}</td><td>${url(catalog[id].page)}</td></tr>`).join("")}</table>

<h3>Step 2. The buyer agrees to the terms and pays</h3>
${checkoutSection}

<h3 class="pb">Step 3. The confirmation page issues and activates the license</h3>
<p>Immediately after payment, the buyer sees the product's confirmation page. It states that the order is complete and the product is delivered, and shows the product, the date and time, the license code with a Copy button, and confirmation that the license is activated in that browser. When the payment provider adds an order ID to the confirmation page address, the order reference is shown as well and the license code is derived from it, so the same order always produces the same code.</p>
${fig(records["spreadsheet-formulas"].shots.confirm, `Confirmation page for ${esc(catalog["spreadsheet-formulas"].name)}.`)}

<h3>Step 4. The buyer can save or print the confirmation</h3>
<p>Save confirmation downloads a PDF with the product, date and time, order reference when available, and license code, with links to the Terms of Service, Refund Policy and Delivery Policy. A Print button prints the page. All eight saved PDFs are in the <code>confirmations</code> folder.</p>
<div class="narrow">${fig(records["spreadsheet-formulas"].shots.pdf, "The saved confirmation PDF, opened in Microsoft Edge.")}</div>

<h3 class="pb">Step 5. Open my guide goes straight into the first lesson</h3>
<p>The first time a guide opens, a short walkthrough explains the lesson list, steps, quizzes, exercises and My Guides; it can be skipped. Each lesson has step-by-step instructions, a diagram, a quiz and an exercise with a worked solution; the spreadsheet guides include a formula sandbox. Every guide also has practice files to download, a shortcut trainer and progress tracking.</p>
${GUIDE_IDS.map((id) => fig(records[id].shots.guide, `${esc(catalog[id].name)} in use: the first lesson.`)).join("")}
${fig(records["complete-library"].shots.hub, "The Complete Software Skills Library: one license unlocks all seven guides.")}

<h3 class="pb">Step 6. Using the guide on another device</h3>
<p>On any other device, the buyer opens My Guides (the button in the bottom-left corner of every page) and enters the same license code. The screenshot below was taken in a separate browser with no saved data, using the code issued in step 3.</p>
${fig(records["spreadsheet-formulas"].shots.dock, "My Guides after adding the license code in another browser.")}

<h2>3. Replacement licenses</h2>
<p>License codes are listed in My Guides on every device where they're activated, and buyers can export a backup file containing their licenses and progress. If a buyer loses their code, they contact Shortcut Press through the Contact page or at ${esc(config.supportEmail)} with their order number and the email address used at checkout, and the code is sent again. When the payment provider adds the order ID to the confirmation page address, opening that address again produces the same code, so a lost code can be recovered from the order. This is stated in the Delivery Policy and FAQ.</p>

<h2>4. Refunds</h2>
<ul>
<li>A full refund on any purchase if requested within 14 days, with no reason required.</li>
<li>Requested through the Contact page with the order number.</li>
<li>Issued to the original payment method within 5 business days of the request; the payment provider's processing time may add a few days.</li>
<li>The license ends when a purchase is refunded.</li>
</ul>
<p>Full policy: ${url("refund-policy.html")}. Consumer rights information for EU and UK customers: ${url("consumer-rights.html")}.</p>

<h2 class="pb">5. Reviewer access</h2>
<p>Each code below is a working license code issued by the live confirmation pages on ${dateText}. To open a guide: go to ${LIVE}, select <strong>My Guides</strong> in the bottom-left corner, enter a code under <em>Add a license</em>, and select the link that appears. The Complete Software Skills Library code unlocks all seven guides.</p>
<table><tr><th>Product</th><th>License code</th><th>Guide address (opens after the code is added)</th></tr>
${IDS.map((id) => `<tr><td>${esc(catalog[id].name)}</td><td><code>${esc(records[id].code)}</code></td><td>${url(catalog[id].guidePath)}</td></tr>`).join("")}
</table>

<h2>6. Files in this kit</h2>
<ul>
<li><code>Fulfillment-Overview.pdf</code>: this document.</li>
<li><code>Business-and-Fulfillment-Summary.txt</code>: the summary in section 1.</li>
<li><code>screenshots/</code>: ${fs.readdirSync(SHOTS).length} full-page and viewport screenshots of every step for all eight products.</li>
<li><code>confirmations/</code>: the eight saved confirmation PDFs.</li>
<li><code>video/confirmation-page-to-guide-in-use.webm</code>: a screen recording from the confirmation page to the guide in use.</li>
<li><code>Reviewer-License-Codes.txt</code>: the reviewer codes from section 5.</li>
</ul>
</body></html>`;

  fs.writeFileSync(path.join(OUT, "Reviewer-License-Codes.txt"), `Shortcut Press — reviewer license codes (issued by the live confirmation pages on ${dateText})\n\nOpen ${LIVE}, select My Guides in the bottom-left corner, and enter a code under "Add a license".\n\n` + IDS.map((id) => `${catalog[id].name}\n  ${records[id].code}\n  ${LIVE}${catalog[id].guidePath}\n`).join("\n"));

  const pctx = await browser.newContext();
  const pp = await pctx.newPage();
  await pp.setContent(html, { waitUntil: "load" });
  await pp.pdf({ path: path.join(OUT, "Fulfillment-Overview.pdf"), format: "Letter", printBackground: true, margin: { top: "16mm", bottom: "16mm", left: "15mm", right: "15mm" } });
  fs.writeFileSync(path.join(process.env.TEMP || process.env.TMPDIR || "/tmp", "shortcut-press-kit-overview.html"), html);
  await browser.close();

  console.log(`\nKit written to ${OUT}`);
  console.log(`Checkout screenshots: ${allCheckout ? "included" : "not included (checkout links not added yet)"}`);
  console.log(`Cited URLs verified: ${cited.size}`);
  for (const id of IDS) console.log(`  ${catalog[id].name.padEnd(42)} ${records[id].code}`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
