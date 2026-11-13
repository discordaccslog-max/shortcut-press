// End-to-end tests in headless Microsoft Edge (or Chrome) against a local copy of the site.
// Run with: npm test
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { startServer } from "../tools/serve-lib.mjs";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const L = require("../js/license.js");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "js/products.js"), "utf8"), ctx);
const catalog = ctx.window.SHORTCUT_PRODUCTS;
const GUIDE_IDS = Object.keys(catalog).filter((id) => id !== "complete-library");

let server, browser, BASE;

async function launch() {
  for (const channel of ["msedge", "chrome"]) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch (e) {}
  }
  throw new Error("Microsoft Edge or Google Chrome is required for the end-to-end tests.");
}

async function newPage(opts = {}) {
  const context = await browser.newContext({ acceptDownloads: true, serviceWorkers: opts.serviceWorkers || "block", viewport: opts.viewport || { width: 1360, height: 900 }, reducedMotion: "reduce", ...(opts.mobile ? { isMobile: true, hasTouch: true } : {}) });
  await context.addInitScript(() => {
    try {
      // Skip the first-run walkthrough unless a test asks for it.
      if (!sessionStorage.getItem("keep-tour")) {
        const d = JSON.parse(localStorage.getItem("sp-data-v1") || "null") || { version: 1, licenses: [], progress: {}, settings: {}, lastBackupAt: null, firstActivatedAt: null };
        ["spreadsheet-formulas", "pivot-tables-charts", "document-formatting", "blender-3d-modeling", "davinci-resolve-editing", "figma-interface-design", "inkscape-vector-illustration"].forEach((g) => (d.settings["walkthrough-" + g] = true));
        localStorage.setItem("sp-data-v1", JSON.stringify(d));
      }
    } catch (e) {}
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error" && !/fonts\.(googleapis|gstatic)\.com|ERR_INTERNET_DISCONNECTED|Failed to load resource/.test(m.text())) errors.push(m.text());
  });
  return { context, page, errors };
}

before(async () => {
  server = await startServer(ROOT, 0);
  BASE = `http://localhost:${server.port}/`;
  browser = await launch();
});

after(async () => {
  await browser?.close();
  await server?.close();
});

test("order-linked codes: the same order always produces the same code, matching the license module", async () => {
  const p = catalog["figma-interface-design"];
  const codes = [];
  for (let i = 0; i < 2; i++) {
    const { context, page } = await newPage();
    await page.goto(BASE + p.confirmationPath + "?session_id=cs_test_ORDER_42");
    await page.waitForSelector("[data-cf-code]");
    codes.push(await page.textContent("[data-cf-code]"));
    assert.match(await page.textContent("#confirm-app"), /cs_test_ORDER_42/);
    await context.close();
  }
  assert.equal(codes[0], codes[1]);
  assert.equal(codes[0], await L.generateFromOrder("FG", "cs_test_ORDER_42"));
  for (const param of ["order_id", "order", "transaction_id", "txn_id", "token"]) {
    const { context, page } = await newPage();
    await page.goto(BASE + p.confirmationPath + `?${param}=ABC-123`);
    await page.waitForSelector("[data-cf-code]");
    assert.equal(await page.textContent("[data-cf-code]"), await L.generateFromOrder("FG", "ABC-123"), param);
    await context.close();
  }
});

test("confirmation pages: every product issues a valid code, activates it and opens the guide", async () => {
  for (const id of Object.keys(catalog)) {
    const p = catalog[id];
    const { context, page, errors } = await newPage();
    await page.goto(BASE + p.confirmationPath);
    await page.waitForSelector("[data-cf-code]");
    const code = await page.textContent("[data-cf-code]");
    const v = L.validate(code);
    assert.ok(v.valid, code);
    assert.equal(v.productId, id);
    const text = await page.textContent("#confirm-app");
    assert.match(text, /order is complete/i);
    assert.match(text, new RegExp(p.name.replace(/[.*+?^${}()|[\]\\&]/g, ".")));
    assert.match(text, /Activated in this browser/);
    assert.equal(await page.getAttribute('meta[name="robots"]', "content"), "noindex, nofollow");
    // reload shows the same code
    await page.reload();
    await page.waitForSelector("[data-cf-code]");
    assert.equal(await page.textContent("[data-cf-code]"), code);
    await page.click("[data-cf-open]");
    await page.waitForSelector(".gd-lesson h1");
    assert.match(page.url(), /#\/lesson\//);
    assert.deepEqual(errors, [], id);
    await context.close();
  }
});

test("a Complete Software Skills Library code unlocks all seven guides", async () => {
  const { context, page } = await newPage();
  await page.goto(BASE + catalog["complete-library"].confirmationPath);
  await page.waitForSelector("[data-cf-code]");
  for (const id of GUIDE_IDS) {
    await page.goto(BASE + catalog[id].guidePath);
    await page.waitForSelector(".gd-wrap h1");
    assert.ok(page.url().includes(catalog[id].guidePath), id);
  }
  await page.goto(BASE + catalog["complete-library"].guidePath);
  await page.waitForSelector(".gd-hub-item");
  assert.equal(await page.locator(".gd-hub-item").count(), 7);
  await context.close();
});

test("visitors without a license are sent to the product page", async () => {
  for (const id of Object.keys(catalog)) {
    const { context, page } = await newPage();
    await page.goto(BASE + catalog[id].guidePath);
    await page.waitForURL((u) => u.pathname.endsWith(catalog[id].page));
    if (id !== "complete-library") assert.ok(await page.isVisible("[data-license-note]"), id);
    await context.close();
  }
});

test("activation through the My Guides dock", async () => {
  const { context, page, errors } = await newPage();
  await page.goto(BASE + "index.html");
  await page.click(".dock-btn");
  await page.waitForSelector("#dock[open]");
  assert.match(await page.textContent("#dock"), /No guides on this device yet/);
  assert.match(await page.textContent("#dock"), /shortpressmail@shortcutpress\.online/);
  await page.fill("#dock-code", "SCUT-XX-0000-0000-00");
  await page.click(".dock-add button[type=submit]");
  assert.match(await page.textContent("#dock-add-status"), /isn't valid|doesn't match|never use|wrong number|start with/);
  const code = L.generateRandom("DF");
  await page.fill("#dock-code", code.toLowerCase().replace(/-/g, " "));
  await page.click(".dock-add button[type=submit]");
  assert.match(await page.textContent("#dock-add-status"), /Added: Professional Document Formatting/);
  assert.match(await page.textContent("[data-dock-guides]"), /Professional Document Formatting/);
  assert.match(await page.textContent("[data-dock-licenses]"), new RegExp(code));
  await page.keyboard.press("Escape");
  await page.goto(BASE + catalog["document-formatting"].guidePath);
  await page.waitForSelector(".gd-wrap h1");
  assert.match(await page.textContent(".gd-wrap h1"), /Professional Document Formatting/);
  assert.deepEqual(errors, []);
  await context.close();
});

test("activation through the command palette", async () => {
  const { context, page } = await newPage();
  await page.goto(BASE + "faq.html");
  await page.keyboard.press("Control+K");
  await page.fill("#pal-input", "activate");
  assert.match(await page.textContent(".pal-opt[aria-selected=true]"), /Activate a license/);
  await page.keyboard.press("Enter");
  await page.waitForSelector("#dock[open]");
  assert.equal(await page.evaluate(() => document.activeElement.id), "dock-code");
  await page.keyboard.type(L.generateRandom("BD"));
  await page.keyboard.press("Enter");
  assert.match(await page.textContent("#dock-add-status"), /3D Modeling Fundamentals in Blender/);
  await page.keyboard.press("Escape");
  await page.keyboard.press("Control+K");
  await page.fill("#pal-input", "open my guides");
  await page.keyboard.press("Enter");
  await page.waitForSelector("#dock[open]");
  assert.match(await page.textContent("[data-dock-guides]"), /Blender/);
  await context.close();
});

test("the confirmation PDF contains the order details and policy links", async () => {
  const { context, page } = await newPage();
  await page.goto(BASE + catalog["pivot-tables-charts"].confirmationPath + "?order_id=PO-778");
  await page.waitForSelector("[data-cf-code]");
  const code = await page.textContent("[data-cf-code]");
  const [download] = await Promise.all([page.waitForEvent("download"), page.click("[data-cf-pdf]")]);
  const file = await download.path();
  const pdf = fs.readFileSync(file).toString("latin1");
  assert.ok(pdf.startsWith("%PDF-1.4"));
  assert.ok(pdf.trimEnd().endsWith("%%EOF"));
  for (const s of ["Order complete. Product delivered.", "Data Analysis with Pivot Tables & Charts", code, "PO-778", "terms-of-service.html", "refund-policy.html", "delivery-policy.html", "/URI"]) assert.ok(pdf.includes(s), s);
  assert.match(download.suggestedFilename(), /\.pdf$/);
  await context.close();
});

test("the formula sandbox evaluates formulas and checks answers", async () => {
  const { context, page, errors } = await newPage();
  await page.goto(BASE + catalog["spreadsheet-formulas"].confirmationPath);
  await page.waitForSelector("[data-cf-code]");
  await page.goto(BASE + catalog["spreadsheet-formulas"].guidePath + "#/sandbox");
  await page.waitForSelector(".sbx-grid");
  const set = async (ref, value) => {
    await page.click(`td[data-ref="${ref}"]`);
    await page.fill(".sbx-input", value);
    await page.press(".sbx-input", "Enter");
  };
  const val = (ref) => page.textContent(`td[data-ref="${ref}"]`);
  await set("H2", "=VLOOKUP(G2,A2:E9,3,FALSE)");
  assert.equal(await val("H2"), "8.75");
  await set("H3", '=SUMIF(D2:D9,">10",C2:C9)');
  assert.equal(await val("H3"), "6.45");
  await set("H4", "=PROPER(TRIM(\"  ada   lovelace \"))");
  assert.equal(await val("H4"), "Ada Lovelace");
  await set("H5", "=INDEX(B2:B9,MATCH(105,A2:A9,0))");
  assert.equal(await val("H5"), "Desk lamp");
  await set("H6", "=C2/D5");
  assert.equal(await val("H6"), "#DIV/0!");
  await set("H7", '=IFERROR(C2/D5,"No stock")');
  assert.equal(await val("H7"), "No stock");
  await set("H8", "=MAX(C2:C9)-MIN(C2:C9)");
  assert.equal(await val("H8"), "23.4");
  await set("H9", '=SUMIFS(D2:D9,C2:C9,">1",C2:C9,"<10")');
  assert.equal(await val("H9"), "88");
  // every lesson sandbox: the worked-solution formula gives the expected answer and passes the check
  for (const gid of ["spreadsheet-formulas", "pivot-tables-charts"]) {
    if (gid === "pivot-tables-charts") {
      await page.goto(BASE + catalog[gid].confirmationPath);
      await page.waitForSelector("[data-cf-code]");
    }
    const lessons = await page.evaluate(async (url) => {
      const src = await (await fetch(url)).text();
      const w = {};
      new Function("window", src)(w);
      return w.SP_GUIDE.lessons.filter((l) => l.exercise.sandbox).map((l) => ({ id: l.id, cell: l.exercise.sandbox.answer.cell, formula: l.exercise.solution.map((s) => (s.match(/<code>(=[^<]+)<\/code>/g) || []).map((c) => c.replace(/<\/?code>/g, "").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&"))).flat() }));
    }, BASE + catalog[gid].guidePath + "content.js");
    for (const l of lessons) {
      await page.goto(BASE + catalog[gid].guidePath + "#/lesson/" + l.id + "/0");
      await page.goto(BASE + catalog[gid].guidePath + "#/lesson/" + l.id + "/99");
      await page.waitForSelector(".sbx-grid");
      let passed = false;
      const tried = [];
      for (const formula of l.formula) {
        await page.click(`td[data-ref="${l.cell}"]`);
        await page.fill(".sbx-input", formula);
        await page.press(".sbx-input", "Enter");
        await page.click(".sbx-check");
        const status = await page.textContent(".sbx-status");
        tried.push(formula + " → " + status);
        if (/^Correct/.test(status)) {
          passed = true;
          break;
        }
      }
      assert.ok(passed, `${gid}/${l.id}: ${tried.join(" | ")}`);
    }
  }
  assert.deepEqual(errors, []);
  await context.close();
});

test("practice file downloads work for every guide", async () => {
  const { context, page } = await newPage();
  await page.goto(BASE + catalog["complete-library"].confirmationPath);
  await page.waitForSelector("[data-cf-code]");
  const sig = { xlsx: "PK", docx: "PK", mp4: "ftyp", wav: "RIFF", svg: "<svg", obj: "#", csv: "Order," };
  let count = 0;
  for (const id of GUIDE_IDS) {
    await page.goto(BASE + catalog[id].guidePath + "#/files");
    await page.waitForSelector(".gd-files a");
    const links = await page.$$eval(".gd-files a", (as) => as.map((a) => ({ href: a.href, download: a.hasAttribute("download") })));
    assert.ok(links.length >= 2, id);
    for (const l of links) {
      assert.ok(l.download, l.href);
      const res = await page.request.get(l.href);
      assert.equal(res.status(), 200, l.href);
      const body = await res.body();
      const ext = l.href.split(".").pop();
      const head = body.toString("latin1", 0, 64);
      assert.ok(head.includes(sig[ext]), `${l.href} signature`);
      count++;
    }
    // one real download through the browser
    const [dl] = await Promise.all([page.waitForEvent("download"), page.click(".gd-files a >> nth=0")]);
    assert.ok((await dl.suggestedFilename()).length > 3);
  }
  assert.ok(count >= 26);
  await context.close();
});

test("backup export and import restore licenses and progress", async () => {
  const a = await newPage();
  await a.page.goto(BASE + catalog["inkscape-vector-illustration"].confirmationPath);
  await a.page.waitForSelector("[data-cf-code]");
  const code = await a.page.textContent("[data-cf-code]");
  await a.page.goto(BASE + catalog["inkscape-vector-illustration"].guidePath + "#/lesson/paths/99");
  await a.page.waitForSelector("[data-gd-done]");
  await a.page.click("[data-gd-done]");
  await a.page.click(".dock-btn");
  const [dl] = await Promise.all([a.page.waitForEvent("download"), a.page.click("[data-dock-export]")]);
  const backupPath = path.join(fs.mkdtempSync(path.join(process.env.TEMP || process.env.TMPDIR || "/tmp", "sp-backup-")), dl.suggestedFilename());
  await dl.saveAs(backupPath);
  assert.match(dl.suggestedFilename(), /^shortcut-press-backup-\d{4}-\d{2}-\d{2}\.json$/);
  const backup = JSON.parse(fs.readFileSync(backupPath, "utf8"));
  assert.equal(backup.app, "Shortcut Press");
  assert.equal(backup.licenses[0].code, code);
  assert.ok(backup.progress["inkscape-vector-illustration"].lessons.paths.done);
  assert.match(await a.page.textContent("[data-dock-lastbackup]"), /Last backup/);
  await a.context.close();

  const b = await newPage();
  await b.page.goto(BASE + "index.html");
  await b.page.click(".dock-btn");
  await b.page.setInputFiles("[data-dock-file]", backupPath);
  await b.page.waitForFunction(() => /Backup imported/.test(document.querySelector("[data-dock-backup-status]").textContent));
  assert.match(await b.page.textContent("[data-dock-guides]"), /Vector Illustration in Inkscape/);
  assert.match(await b.page.textContent("[data-dock-guides]"), /1 of 5 lessons complete/);
  await b.page.keyboard.press("Escape");
  await b.page.goto(BASE + catalog["inkscape-vector-illustration"].guidePath);
  await b.page.waitForSelector(".gd-progress-num");
  assert.match(await b.page.textContent(".gd-progress-num"), /1 of 5/);
  await b.context.close();
});

test("the 30-day backup reminder appears when no backup has been made", async () => {
  const { context, page } = await newPage();
  await page.goto(BASE + "index.html");
  await page.evaluate((code) => {
    const d = JSON.parse(localStorage.getItem("sp-data-v1"));
    d.licenses.push({ code, productId: "figma-interface-design", activatedAt: new Date(Date.now() - 40 * 864e5).toISOString() });
    d.firstActivatedAt = d.licenses[0].activatedAt;
    localStorage.setItem("sp-data-v1", JSON.stringify(d));
  }, L.generateRandom("FG"));
  await page.reload();
  await page.click(".dock-btn");
  assert.ok(await page.isVisible("[data-dock-reminder]"));
  await context.close();
});

test("guides load offline after the first visit", async () => {
  const { context, page } = await newPage({ serviceWorkers: "allow" });
  await page.goto(BASE + catalog["davinci-resolve-editing"].confirmationPath);
  await page.waitForSelector("[data-cf-code]");
  await page.goto(BASE + catalog["davinci-resolve-editing"].guidePath);
  await page.waitForSelector(".gd-wrap h1");
  await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) await new Promise((r) => navigator.serviceWorker.addEventListener("controllerchange", r, { once: true }));
    return !!reg.active;
  });
  await context.setOffline(true);
  await page.reload();
  await page.waitForSelector(".gd-wrap h1");
  assert.match(await page.textContent(".gd-wrap h1"), /Video Editing in DaVinci Resolve/);
  await page.goto(BASE + catalog["davinci-resolve-editing"].guidePath + "#/lesson/transitions/2");
  await page.waitForSelector(".gd-lesson h1");
  assert.match(await page.textContent(".gd-lesson h1"), /Transitions/);
  await page.goto(BASE + "faq.html");
  assert.match(await page.textContent("h1"), /Frequently asked questions/);
  await context.close();
});

test("the terms checkbox gates the buy buttons when checkout links exist (links injected in this test browser only)", async () => {
  const { context, page } = await newPage();
  const src = fs.readFileSync(path.join(ROOT, "js/products.js"), "utf8").replace(/checkoutUrl: ""/g, 'checkoutUrl: "https://checkout.invalid/x"');
  await page.route("**/js/products.js", (r) => r.fulfill({ contentType: "text/javascript", body: src }));
  await page.goto(BASE + catalog["figma-interface-design"].page);
  const btn = page.locator(".p-aside .btn-buy");
  assert.ok(await page.isVisible("[data-agree]"));
  assert.equal(await btn.getAttribute("aria-disabled"), "true");
  await page.check("[data-agree-box]");
  assert.equal(await btn.getAttribute("href"), "https://checkout.invalid/x");
  await page.uncheck("[data-agree-box]");
  assert.equal(await btn.getAttribute("aria-disabled"), "true");
  await context.close();

  const live = await newPage();
  await live.page.goto(BASE + catalog["figma-interface-design"].page);
  assert.equal(await live.page.locator(".btn-buy").count(), 0);
  assert.ok(await live.page.isHidden("[data-agree]"));
  await live.context.close();
});

async function walkGuides(viewport, label) {
  const { context, page, errors } = await newPage({ viewport, mobile: viewport.width < 500 });
  await page.goto(BASE + catalog["complete-library"].confirmationPath);
  await page.waitForSelector("[data-cf-code]");
  let steps = 0;
  for (const id of GUIDE_IDS) {
    const g = await page.evaluate(async (url) => {
      const w = {};
      new Function("window", await (await fetch(url)).text())(w);
      return w.SP_GUIDE.lessons.map((l) => ({ id: l.id, steps: l.steps.length + 3 }));
    }, BASE + catalog[id].guidePath + "content.js");
    await page.goto(BASE + catalog[id].guidePath);
    await page.waitForSelector(".gd-wrap h1");
    for (const lesson of g) {
      for (let s = 0; s < lesson.steps; s++) {
        await page.evaluate((h) => (location.hash = h), `#/lesson/${lesson.id}/${s}`);
        await page.waitForFunction((t) => document.querySelector(".gd-step-n") && document.querySelector(".gd-step-n").textContent.startsWith("Step " + t), s + 1);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        assert.ok(overflow <= 1, `${label} ${id}/${lesson.id}/${s} overflows by ${overflow}px`);
        steps++;
      }
      // answer the quiz with the first option to exercise the feedback path
      await page.evaluate((h) => (location.hash = h), `#/lesson/${lesson.id}/${lesson.steps - 2}`);
      await page.waitForSelector(".gd-q");
      await page.click(".gd-q >> nth=0 >> input >> nth=0");
      await page.click(".gd-q >> nth=0 >> .gd-check");
      assert.match(await page.textContent(".gd-q >> nth=0 >> .gd-feedback"), /Correct\.|Not quite\./);
    }
    for (const view of ["#/files", "#/trainer"]) {
      await page.evaluate((h) => (location.hash = h), view);
      await page.waitForSelector(view === "#/files" ? ".gd-files" : ".trainer-pad");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      assert.ok(overflow <= 1, `${label} ${id} ${view} overflows`);
    }
  }
  assert.deepEqual(errors, [], label);
  await context.close();
  return steps;
}

test("every step of every guide renders on desktop without errors", async () => {
  const steps = await walkGuides({ width: 1360, height: 900 }, "desktop");
  assert.ok(steps > 250);
});

test("every step of every guide renders on a narrow mobile viewport without overflow", async () => {
  const steps = await walkGuides({ width: 360, height: 760 }, "mobile");
  assert.ok(steps > 250);
});

test("the shortcut trainer checks key presses", async () => {
  const { context, page } = await newPage();
  await page.goto(BASE + catalog["blender-3d-modeling"].confirmationPath);
  await page.waitForSelector("[data-cf-code]");
  await page.goto(BASE + catalog["blender-3d-modeling"].guidePath + "#/trainer");
  await page.click(".trainer-start");
  for (let i = 0; i < 3; i++) {
    const action = await page.textContent(".trainer-action");
    const keys = await page.evaluate((a) => window.SP_GUIDE.shortcuts.find((s) => s.action === a).keys, action);
    let combo = keys.replace(/^Ctrl\+/, "Control+");
    if (/^[A-Z]$/.test(combo)) combo = combo.toLowerCase();
    combo = combo.replace(/^(Control|Alt)\+([A-Z])$/, (m, mod, k) => mod + "+" + k.toLowerCase());
    await page.keyboard.press(combo);
    assert.match(await page.textContent(".trainer-status"), /^Correct/, `${action}: ${keys}`);
    await page.keyboard.press("Enter");
  }
  await page.keyboard.press("q");
  assert.match(await page.textContent(".trainer-status"), /You pressed Q/);
  await context.close();
});

test("every link and asset on every page resolves", async () => {
  const pages = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = path.posix.join(dir, e.name);
      if (e.isDirectory()) {
        if (!["node_modules", ".git", "tools", "tests", "fulfillment-kit", "vendor", ".vercel"].includes(e.name)) walk(rel);
      } else if (e.name.endsWith(".html")) pages.push(rel.replace(/^\.\//, ""));
    }
  };
  walk(".");
  assert.ok(pages.length >= 35);
  const bad = [];
  for (const p of pages) {
    const html = fs.readFileSync(path.join(ROOT, p), "utf8");
    const dir = path.posix.dirname(p);
    for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const u = m[1];
      if (/^(https?:|mailto:|data:)/.test(u)) continue;
      const [file, hash] = u.split("#");
      const target = file ? path.posix.normalize(path.posix.join(dir, file)) : p;
      const disk = target.endsWith("/") || target === "." ? path.posix.join(target, "index.html") : target;
      if (!fs.existsSync(path.join(ROOT, disk))) {
        bad.push(`${p} → ${u}`);
        continue;
      }
      if (hash && !hash.startsWith("/") && disk.endsWith(".html")) {
        const t = fs.readFileSync(path.join(ROOT, disk), "utf8");
        if (!t.includes(`id="${hash}"`)) bad.push(`${p} → ${u} (missing anchor)`);
      }
    }
  }
  assert.deepEqual(bad, []);
});

test("WebKit (the Safari engine) on an iPhone-sized screen: confirmation, dock, sandbox and every guide step", async (t) => {
  const { webkit } = await import("playwright-core");
  let wk;
  try {
    wk = await webkit.launch();
  } catch (e) {
    t.skip("WebKit isn't installed (npx playwright-core install webkit)");
    return;
  }
  const context = await wk.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: "block" });
  await context.addInitScript(() => {
    const d = { version: 1, licenses: [], progress: {}, settings: {}, lastBackupAt: null, firstActivatedAt: null };
    ["spreadsheet-formulas", "pivot-tables-charts", "document-formatting", "blender-3d-modeling", "davinci-resolve-editing", "figma-interface-design", "inkscape-vector-illustration"].forEach((g) => (d.settings["walkthrough-" + g] = true));
    if (!localStorage.getItem("sp-data-v1")) localStorage.setItem("sp-data-v1", JSON.stringify(d));
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(BASE + catalog["complete-library"].confirmationPath + "?order=WK-1");
  await page.waitForSelector("[data-cf-code]");
  assert.equal(await page.textContent("[data-cf-code]"), await L.generateFromOrder("CS", "WK-1"));
  await page.tap(".dock-btn");
  await page.waitForSelector("#dock[open]");
  assert.match(await page.textContent("[data-dock-guides]"), /Interface Design in Figma/);
  await page.fill("#dock-code", L.generateRandom("SF"));
  await page.tap(".dock-add button[type=submit]");
  assert.match(await page.textContent("#dock-add-status"), /Spreadsheet Formulas/);
  await page.keyboard.press("Escape");
  await page.goto(BASE + catalog["spreadsheet-formulas"].guidePath + "#/sandbox");
  await page.waitForSelector(".sbx-grid");
  await page.tap('td[data-ref="H2"]');
  await page.fill(".sbx-input", "=VLOOKUP(G2,A2:E9,3,FALSE)");
  await page.press(".sbx-input", "Enter");
  assert.equal(await page.textContent('td[data-ref="H2"]'), "8.75");
  let steps = 0;
  for (const id of GUIDE_IDS) {
    await page.goto(BASE + catalog[id].guidePath);
    await page.waitForSelector(".gd-wrap h1");
    const lessons = await page.evaluate(() => window.SP_GUIDE.lessons.map((l) => ({ id: l.id, n: l.steps.length + 3 })));
    for (const l of lessons) {
      for (let s = 0; s < l.n; s++) {
        await page.evaluate((h) => (location.hash = h), `#/lesson/${l.id}/${s}`);
        await page.waitForFunction((t) => document.querySelector(".gd-step-n") && document.querySelector(".gd-step-n").textContent.startsWith("Step " + t), s + 1);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        assert.ok(overflow <= 1, `webkit ${id}/${l.id}/${s} overflows by ${overflow}px`);
        steps++;
      }
    }
  }
  assert.ok(steps > 250);
  assert.deepEqual(errors, []);
  await wk.close();
});
