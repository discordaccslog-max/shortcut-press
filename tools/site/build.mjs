// Builds every HTML page, the guide data files, the search index, sitemap,
// web app manifest and service worker. Run with: npm run build
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { esc, products as storeCopy, library as libCopy } from "./storefront.mjs";
import { I_SEARCH, I_SUN, I_MOON, I_CLOSE, ART, AREA, BENTO_ORDER, keyboard } from "./art.mjs";
import * as copy from "./copy.mjs";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SITE = "https://www.shortcutpress.online/";
const YEAR = "2026";
const Diagrams = require(path.join(ROOT, "js/diagrams.js"));

/* ---------- data ---------- */
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "js/products.js"), "utf8"), ctx);
const catalog = ctx.window.SHORTCUT_PRODUCTS;
const cfg = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "js/site-config.js"), "utf8"), cfg);
const SUPPORT = cfg.window.SITE_CONFIG.supportEmail;

const GUIDE_IDS = ["spreadsheet-formulas", "pivot-tables-charts", "document-formatting", "blender-3d-modeling", "davinci-resolve-editing", "figma-interface-design", "inkscape-vector-illustration"];
const guides = {};
for (const id of GUIDE_IDS) guides[id] = (await import(`../guides/${id}.mjs`)).default;
const copyById = Object.fromEntries([...storeCopy, libCopy].map((p) => [p.id, p]));
const allIds = [...GUIDE_IDS, "complete-library"];

const VERSION_NOTE = "Software makers update their programs, so menus and button locations can change between versions. This guide is revised when an update changes the steps, and the revised version appears the next time you open it.";

function sizeOf(file) {
  const b = fs.statSync(file).size;
  return b >= 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB";
}
for (const id of GUIDE_IDS) {
  const g = guides[id];
  g.versionNote = VERSION_NOTE;
  for (const f of g.files) f.size = sizeOf(path.join(ROOT, "guides", g.slug, "files", f.name));
}

const lessonCount = (id) => (id === "complete-library" ? GUIDE_IDS.reduce((a, g) => a + guides[g].lessons.length, 0) : guides[id].lessons.length);
const quizCount = (id) => (id === "complete-library" ? GUIDE_IDS.reduce((a, g) => a + quizCount(g), 0) : guides[id].lessons.reduce((a, l) => a + l.quiz.length, 0));
const fileCount = (id) => (id === "complete-library" ? GUIDE_IDS.reduce((a, g) => a + guides[g].files.length, 0) : guides[id].files.length);
const practiceShortcuts = (id) => guides[id].shortcuts.filter((s) => s.practice !== false).length;

/* ---------- shell ---------- */
const NAV = [["index.html#guides", "Guides", "guides"], ["about.html", "About", "about"], ["faq.html", "FAQ", "faq"], ["contact.html", "Contact", "contact"]];

const HEAD_SCRIPT = `<script>(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("sp-theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);var s=JSON.parse(localStorage.getItem("sp-data-v1")||"null");if(s&&s.settings&&s.settings.largeUI)d.setAttribute("data-ui","large");}catch(e){}})();</script>`;
const BASE_404 = `<script>(function(){if(location.protocol==="file:")return;var p=location.pathname.split("/"),b=document.createElement("base");b.href=/\\.github\\.io$/.test(location.hostname)&&p.length>2&&p[1]?"/"+p[1]+"/":"/";document.head.appendChild(b);})();</script>\n`;

function header(r, current) {
  return `<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="${r}index.html"><span class="brand-mark" aria-hidden="true">S/P</span><span class="brand-name">Shortcut Press</span></a>
    <nav class="nav" aria-label="Primary"><ul>${NAV.map(([h, l, k]) => `<li><a href="${r}${h}"${k === current ? ' aria-current="page"' : ""}>${l}</a></li>`).join("")}</ul></nav>
    <div class="header-tools js-only">
      <button type="button" class="search-btn" data-open-palette aria-label="Search" aria-keyshortcuts="Control+K Meta+K">${I_SEARCH}<span class="search-btn-label" aria-hidden="true">Search</span><kbd aria-hidden="true"><span data-mod-key>Ctrl</span>&nbsp;K</kbd></button>
      <button type="button" class="icon-btn theme-btn" data-theme-toggle aria-label="Switch theme">${I_SUN}${I_MOON}</button>
    </div>
  </div>
</header>`;
}

function footer(r) {
  const list = allIds.map((id) => `<li><a href="${r}${catalog[id].page}">${esc(catalog[id].name)}</a></li>`).join("");
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="brand" href="${r}index.html"><span class="brand-mark" aria-hidden="true">S/P</span><span>Shortcut Press</span></a>
        <p style="margin-top:16px">Interactive software skills guides that run in your browser, unlocked with a license code.</p>
        <p class="footer-email" data-email-block hidden><span data-email-link></span></p>
        <button type="button" class="footer-keys js-only" data-open-shortcuts><kbd>?</kbd> Keyboard shortcuts</button>
      </div>
      <nav aria-labelledby="footer-guides"><h2 class="footer-h" id="footer-guides">Guides</h2><ul class="footer-links">${list}</ul></nav>
      <nav aria-labelledby="footer-company"><h2 class="footer-h" id="footer-company">Shortcut Press</h2><ul class="footer-links"><li><a href="${r}about.html">About</a></li><li><a href="${r}faq.html">FAQ</a></li><li><a href="${r}contact.html">Contact</a></li></ul></nav>
      <nav aria-labelledby="footer-policies"><h2 class="footer-h" id="footer-policies">Policies</h2><ul class="footer-links"><li><a href="${r}terms-of-service.html">Terms</a></li><li><a href="${r}privacy-policy.html">Privacy</a></li><li><a href="${r}refund-policy.html">Refunds</a></li><li><a href="${r}delivery-policy.html">Delivery</a></li><li><a href="${r}disclaimer.html">Disclaimer</a></li><li><a href="${r}consumer-rights.html">Consumer rights</a></li><li><a href="${r}contact.html">Contact</a></li></ul></nav>
    </div>
    <div class="footer-base">
      <p>&copy; <span data-year>${YEAR}</span> Shortcut Press. All rights reserved.</p>
      <p>All software names are trademarks of their respective owners. Shortcut Press is not affiliated with or endorsed by any software maker.</p>
    </div>
  </div>
</footer>`;
}

function dialogs() {
  return `<dialog class="dlg palette" id="palette" aria-label="Search the site">
  <div class="pal-input-row">${I_SEARCH}<label class="visually-hidden" for="pal-input">Search guides, pages and commands</label><input class="pal-input" id="pal-input" type="text" role="combobox" aria-expanded="true" aria-controls="pal-list" aria-autocomplete="list" autocomplete="off" spellcheck="false" placeholder="Search guides, pages and commands"><kbd>Esc</kbd></div>
  <ul class="pal-list" id="pal-list" role="listbox" aria-label="Results"></ul>
  <p class="pal-empty" hidden>No matches. Try a program name, a topic, or a word like “license” or “refund”.</p>
  <p class="pal-foot"><span><kbd>&uarr;</kbd><kbd>&darr;</kbd> to move</span><span><kbd>Enter</kbd> to open</span><span><kbd>Esc</kbd> to close</span></p>
</dialog>
<dialog class="dlg" id="shortcuts" aria-labelledby="shortcuts-title">
  <div class="dlg-head"><h2 id="shortcuts-title">Keyboard shortcuts</h2><button type="button" class="icon-btn" data-close-dialog aria-label="Close keyboard shortcuts">${I_CLOSE}</button></div>
  <div class="dlg-scroll">
    <dl class="keys-list">
      <div><dt><kbd data-mod-key>Ctrl</kbd> <kbd>K</kbd></dt><dd>Open search and commands</dd></div>
      <div><dt><kbd>/</kbd></dt><dd>Open search <span class="tag-single">single key</span></dd></div>
      <div><dt><kbd>?</kbd></dt><dd>Show this list <span class="tag-single">single key</span></dd></div>
      <div><dt><kbd>T</kbd></dt><dd>Switch between light and dark theme <span class="tag-single">single key</span></dd></div>
      <div><dt><kbd>&uarr;</kbd> <kbd>&darr;</kbd></dt><dd>Move through search results</dd></div>
      <div><dt><kbd>Enter</kbd></dt><dd>Open the selected result</dd></div>
      <div><dt><kbd>Esc</kbd></dt><dd>Close search, My Guides or this panel</dd></div>
    </dl>
    <div class="switch-row">
      <div><p class="switch-label" id="sk-label">Single-key shortcuts</p><p class="switch-desc" id="sk-desc">Turn off <kbd>/</kbd>, <kbd>?</kbd> and <kbd>T</kbd> if you use speech input or press keys by accident. <kbd data-mod-key>Ctrl</kbd> <kbd>K</kbd> and the footer link keep working.</p></div>
      <button type="button" class="switch" role="switch" aria-checked="true" aria-labelledby="sk-label" aria-describedby="sk-desc" data-single-key-switch><span class="switch-on"></span><span class="switch-thumb"></span></button>
    </div>
  </div>
</dialog>`;
}

function page({ file, title, description, current = "", body, r = "", ogType = "website", noindex = false, is404 = false, bodyClass = "", readProgress = false, after = "", extraScripts = [], noFooter = false }) {
  const url = file === "index.html" ? SITE : SITE + file.replace(/index\.html$/, "");
  const scripts = ["js/site-config.js", "js/products.js", "js/license.js", "js/store.js", "js/guides-index.js", "js/dock.js", "js/search-index.js", "js/main.js", ...extraScripts];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${is404 ? BASE_404 : ""}${HEAD_SCRIPT}
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, nofollow">' : `<link rel="canonical" href="${url}">`}
<meta property="og:site_name" content="Shortcut Press">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${noindex ? "" : `<meta property="og:url" content="${url}">\n`}<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary">
<meta name="color-scheme" content="dark light">
<meta name="theme-color" content="#08090b" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#f4f4f1" media="(prefers-color-scheme: light)">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${r}icons/icon-192.png">
<link rel="manifest" href="${r}manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&amp;family=Geist:wght@400..600&amp;family=Geist+Mono:wght@400..500&amp;display=swap">
<link rel="stylesheet" href="${r}css/styles.css">
<link rel="stylesheet" href="${r}css/app.css">
${scripts.map((s) => `<script src="${s.startsWith("http") || s.startsWith("./") ? s : r + s}" defer></script>`).join("\n")}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
${is404 ? "" : '<a class="skip-link" href="#main">Skip to content</a>\n'}${readProgress ? '<div class="read-progress" aria-hidden="true"><span></span></div>\n' : ""}${header(r, current)}
${body}
${noFooter ? "" : footer(r)}
${after}${dialogs()}
</body>
</html>
`;
}

/* ---------- shared pieces ---------- */
const slug = (s) => String(s).replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const label = (num, text) => `<p class="label"><span class="label-num">${num}</span><span class="label-sep">/</span>${text}</p>`;
const faqItem = ([q, a]) => `<details class="faq" id="q-${slug(q)}"><summary>${q}</summary><div class="faq-a">${a}</div></details>`;
const BUY_LINE = (r = "") => `Instant access with a license &middot; <a href="${r}refund-policy.html">14-day refund policy</a> &middot; Applicable taxes are shown at checkout`;

function tree(title, items, note) {
  return `<div class="panel tree-panel"><p class="tree-title">${title}</p><ul class="tree">${items
    .map(([name, desc, kids]) => `<li><span class="tree-name">${name}</span>${desc ? `<span class="tree-desc">${desc}</span>` : ""}${kids ? `<ul>${kids.map((k) => `<li><span class="tree-name">${k}</span></li>`).join("")}</ul>` : ""}</li>`)
    .join("")}</ul>${note ? `<p class="tree-note">${note}</p>` : ""}</div>`;
}

/* ---------- home ---------- */
function tile(id, i) {
  const p = catalog[id];
  const c = copyById[id];
  const area = AREA[id];
  return `<article class="tile" data-area="${area}" style="--i:${i}">
  <div class="tile-art">${ART[c.topic]()}</div>
  <div class="tile-body">
    <p class="tile-meta"><span>${esc(c.level)}</span><span>${area === "lib" ? "7 guides · one license" : esc(c.software)}</span></p>
    <h3 class="tile-title"><a class="tile-link" href="${p.page}">${esc(p.name)}</a></h3>
    <p class="tile-desc">${esc(p.summary)}</p>
    <p class="tile-foot"><span class="price" data-price="${id}">$${p.price}</span><span class="tile-go" aria-hidden="true">View guide &rarr;</span></p>
  </div>
  <span class="tile-glow" aria-hidden="true"><span class="glow-dot"></span></span>
  <span class="tile-edge" aria-hidden="true"><span class="glow-dot"></span></span>
</article>`;
}

function home() {
  const previewQs = [copy.FAQ[0].items[0], copy.FAQ[1].items[1], copy.FAQ[2].items[0], copy.FAQ[4].items[2]];
  const body = `<main id="main">
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="label"><span class="label-num">Shortcut Press</span><span class="label-sep">/</span>Interactive software guides</p>
      <h1 class="hero-title" id="hero-title"><span class="line"><span>Software skills,</span></span><span class="line"><span>written down</span></span><span class="line"><span>step by step.</span></span></h1>
      <p class="lead">Shortcut Press guides are interactive lessons that run in your web browser. Each one teaches a program step by step with diagrams, quizzes, exercises with worked solutions, practice files and a shortcut trainer, unlocked with a license code.</p>
      <div class="hero-actions">
        <a class="btn btn-ghost" href="#guides">Browse the guides</a>
        <p class="hint js-only">or press <kbd data-mod-key>Ctrl</kbd> <kbd>K</kbd> to search</p>
      </div>
      <ul class="hero-facts" aria-label="Every guide at a glance"><li>Runs in your browser</li><li>Practice files</li><li>Worked solutions</li><li>No video lessons or tutoring</li></ul>
    </div>
    ${keyboard()}
  </div>
</section>

<section class="section" id="guides" aria-labelledby="guides-title">
  <div class="container">
    <div class="sec-head">
      <div>${label("01", "The guides")}<h2 id="guides-title">Seven guides and the complete library</h2></div>
      <p>Each guide covers one program, from the first steps to a finished piece of work. Prices are in US dollars; applicable taxes are shown at checkout.</p>
    </div>
    <div class="bento">
      ${BENTO_ORDER.map((id, i) => tile(id, i)).join("\n      ")}
    </div>
  </div>
</section>

<section class="section" id="included" aria-labelledby="included-title">
  <div class="container split-2">
    <div class="sec-head fade">
      <div>${label("02", "In every guide")}<h2 id="included-title">What's inside each guide</h2></div>
      <div class="sec-head-text"><p>Every guide is built the same way. Each lesson explains a skill, breaks it into steps with an original diagram, checks your understanding with a short quiz, and ends with a practice exercise and a worked solution.</p><p style="margin-top:16px">Your progress is saved in your browser, so Resume always takes you back to where you left off.</p></div>
    </div>
    <div class="fade">${tree("An interactive guide", [
      ["Lessons", "Each skill explained, then broken into numbered steps.", ["Step-by-step instructions", "Original diagrams", "A short quiz", "An exercise with a worked solution"]],
      ["Practice files", "Workbooks, documents, 3D models, video clips or vector assets for the exercises, downloaded inside the guide."],
      ["Shortcut trainer", "Practice the program's keyboard shortcuts and get instant feedback."],
      ["Formula sandbox", "In the two spreadsheet guides: type formulas into a grid and see the results."],
      ["Progress tracking", "Completed lessons, quiz answers and a Resume button."],
    ], "Software is not included. Each guide's page names the program it uses, which you obtain separately from its maker.")}</div>
  </div>
</section>

<section class="section" id="how-it-works" aria-labelledby="how-title">
  <div class="container">
    <div class="sec-head">
      <div>${label("03", "Purchase and delivery")}<h2 id="how-title">How buying a guide works</h2></div>
      <p>Everything is digital. Your guide is ready the moment your payment goes through.</p>
    </div>
    <ol class="timeline fade">
      <li class="tl-item"><span class="tl-step" aria-hidden="true">01</span><h3>Choose a guide</h3><p>Each guide's page shows what it covers, its level, the software it uses, a preview from the guide, and its price.</p></li>
      <li class="tl-item"><span class="tl-step" aria-hidden="true">02</span><h3>Agree and pay</h3><p>Agree to the Terms and Refund Policy, then pay on the payment provider's checkout. Applicable taxes are shown there.</p></li>
      <li class="tl-item"><span class="tl-step" aria-hidden="true">03</span><h3>Get your license</h3><p>Your confirmation page shows your license code and activates it in that browser straight away.</p></li>
      <li class="tl-item"><span class="tl-step" aria-hidden="true">04</span><h3>Open your guide</h3><p>Open my guide takes you to the first lesson. On another device, enter the same code in My Guides.</p></li>
    </ol>
    <p class="after-note">Every purchase has a <a href="refund-policy.html">14-day refund policy</a>, no reason needed. The <a href="delivery-policy.html">Delivery Policy</a> explains each step.</p>
  </div>
</section>

<section class="section" id="self-study" aria-labelledby="self-study-title">
  <div class="container split-2">
    <div class="sec-head fade">
      <div>${label("04", "Plainly stated")}<h2 id="self-study-title">Self-study material, nothing more</h2></div>
      <div class="sec-head-text"><p>Shortcut Press guides are written for working through on your own. ${copy.SELF_STUDY}</p></div>
    </div>
    <div class="fade">
      <table class="spec-table">
        <caption class="visually-hidden">What a Shortcut Press guide includes and does not include</caption>
        <thead><tr><th scope="col">Item</th><th scope="col">Status</th></tr></thead>
        <tbody>
          <tr><th scope="row">Interactive lessons with diagrams</th><td><span class="status status-yes">Included</span></td></tr>
          <tr><th scope="row">Quizzes and exercises with worked solutions</th><td><span class="status status-yes">Included</span></td></tr>
          <tr><th scope="row">Practice files and a shortcut trainer</th><td><span class="status status-yes">Included</span></td></tr>
          <tr><th scope="row">Progress tracking and offline use</th><td><span class="status status-yes">Included</span></td></tr>
          <tr><th scope="row">Video lessons</th><td><span class="status status-no">Not included</span></td></tr>
          <tr><th scope="row">Live instruction or tutoring</th><td><span class="status status-no">Not included</span></td></tr>
          <tr><th scope="row">Feedback on your work</th><td><span class="status status-no">Not included</span></td></tr>
          <tr><th scope="row">The software itself<span class="spec-note">Obtained separately from its maker</span></th><td><span class="status status-no">Not included</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section" id="faq-preview" aria-labelledby="faq-preview-title">
  <div class="container split-2">
    <div class="sec-head">
      <div>${label("05", "Questions")}<h2 id="faq-preview-title">Before you buy</h2></div>
      <div class="sec-head-text"><p>The questions people ask most. Every other answer is on the FAQ page.</p></div>
    </div>
    <div class="fade">
      <div class="faq-list">${previewQs.map(faqItem).join("")}</div>
      <a class="more-link" href="faq.html">Read all frequently asked questions &rarr;</a>
    </div>
  </div>
</section>
</main>`;
  return page({ file: "index.html", title: "Shortcut Press — Interactive software skills guides", description: "Interactive, self-paced software skills guides that run in your browser: step-by-step lessons with diagrams, quizzes, exercises with worked solutions, practice files and a shortcut trainer, unlocked with a license code.", body });
}

/* ---------- product pages ---------- */
function preview(id) {
  const g = guides[id];
  const l = g.lessons[0];
  const q = l.quiz[0];
  return `<div class="preview-frame" role="img" aria-label="Preview of the first lesson of ${esc(g.title)}: the lesson list, the lesson overview with its diagram, and a quiz question">
  <div class="preview-frame-bar" aria-hidden="true"><span>Lesson 1 of ${g.lessons.length}</span><span>·</span><span>${esc(l.title)}</span></div>
  <div class="preview-frame-body" aria-hidden="true">
    <ol class="preview-lessons">${g.lessons.map((x, i) => `<li><span class="gd-lesson-n">${String(i + 1).padStart(2, "0")}</span>${esc(x.title)}</li>`).join("")}</ol>
    <div class="preview-main"><h3>${esc(l.title)}</h3><p class="small-note">${esc(l.summary)}</p><div class="gd-figure">${Diagrams.render(l.diagram)}</div>
    <div class="preview-quiz"><strong>Check your understanding:</strong> ${q.q}<ul>${q.options.map((o) => `<li>${o}</li>`).join("")}</ul></div></div>
  </div>
</div>`;
}

function aside(id) {
  const p = catalog[id];
  const c = copyById[id];
  const isLib = id === "complete-library";
  return `<aside class="p-aside" aria-labelledby="p-title">
  <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">Home</a></li><li><a href="index.html#guides">Guides</a></li><li><span aria-current="page">${isLib ? "Library" : esc(c.software)}</span></li></ol></nav>
  <h1 class="p-title" id="p-title">${esc(p.name)}</h1>
  <dl class="p-specs">
    <dt>Level</dt><dd>${esc(c.level)}</dd>
    <dt>Format</dt><dd>${isLib ? "Seven interactive guides in your web browser, unlocked with one license" : "Interactive guide in your web browser, unlocked with a license"}</dd>
    <dt>Software</dt><dd>${isLib ? "Each guide uses its own program (not included)" : `${esc(c.software)} (not included)`}</dd>
    <dt>Delivery</dt><dd>License code on your order confirmation page, immediately after payment</dd>
    <dt>Needs</dt><dd>A modern web browser on a computer, tablet or phone</dd>
  </dl>
  <p class="p-price"><span class="price" data-price="${id}">$${p.price}</span><span class="p-currency">USD</span></p>
  <p class="p-terms">${BUY_LINE()}</p>
  <div class="agree" data-agree hidden>
    <label class="agree-label"><input type="checkbox" class="agree-box" data-agree-box aria-describedby="agree-hint"><span>I agree to the <a href="terms-of-service.html">Terms of Service</a> and <a href="refund-policy.html">Refund Policy</a></span></label>
    <p class="agree-hint" id="agree-hint" data-agree-hint>Tick the box to enable the buy button. You need to agree before checkout.</p>
  </div>
  <div class="buy-slot" data-buy="${id}"></div>
  <p class="p-selfstudy"><strong>Self-study material.</strong> ${copy.SELF_STUDY}</p>
</aside>`;
}

function pbar(id) {
  const p = catalog[id];
  return `<div class="p-bar" role="region" aria-label="Purchase summary">
  <div class="p-bar-info"><p class="p-bar-name">${esc(p.name)}</p><p class="p-bar-meta"><span class="price" data-price="${id}">$${p.price}</span> USD &middot; <a href="refund-policy.html">14-day refunds</a></p><p class="p-bar-hint" data-agree-bar-hint hidden>Tick the agreement box above to enable buying.</p></div>
  <div class="buy-slot" data-buy="${id}"></div>
</div>
`;
}

const seqList = (items) => `<ol class="seq" data-seq><span class="seq-track" aria-hidden="true"><span class="seq-fill"></span></span>${items.map(([h, t], i) => `<li class="seq-item"><span class="seq-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><div><h3>${h}</h3><p>${t}</p></div></li>`).join("")}</ol>`;

function licenseNote() {
  return `<div class="status-msg status-info license-note" data-license-note hidden><span class="status-icon" aria-hidden="true"></span><span>This guide needs a license on this device. If you've bought it, open <button type="button" class="link-btn" data-open-dock>My Guides</button> and enter your license code.</span></div>`;
}

function productPage(id) {
  const p = catalog[id];
  const c = copyById[id];
  const g = guides[id];
  const isLib = id === "complete-library";
  const coverItems = isLib
    ? GUIDE_IDS.map((gid) => [`<a href="${catalog[gid].page}">${esc(catalog[gid].name)}</a>`, `${esc(catalog[gid].summary)} ${guides[gid].lessons.length} lessons. Uses ${esc(copyById[gid].software)}.`])
    : g.lessons.map((l) => [esc(l.title), esc(l.summary)]);
  const inside = isLib
    ? tree("Your library", [
        ["Seven complete guides", `${lessonCount(id)} lessons and ${quizCount(id)} quiz questions in total, each guide with its own progress tracking.`],
        ["All practice files", `${fileCount(id)} practice files across the seven guides.`],
        ["Seven shortcut trainers", "One for each program."],
        ["Two formula sandboxes", "In the spreadsheet guides."],
      ], "One license code unlocks all seven guides on every device you use.")
    : tree(`${esc(g.title)}`, [
        [`${g.lessons.length} lessons`, `Each with step-by-step instructions, an original diagram, a short quiz (${quizCount(id)} questions in total) and an exercise with a worked solution.`],
        [`${g.files.length} practice files`, g.files.map((f) => esc(f.name)).join(", ")],
        ["Shortcut trainer", `${practiceShortcuts(id)} ${esc(c.software)} shortcuts to practice, with instant feedback.`],
        ...(g.sandbox ? [["Formula sandbox", "Type formulas into a grid and check your exercise answers in the browser."]] : []),
        ["Progress tracking", "Completed lessons, quiz answers and a Resume button that returns to where you left off."],
      ], "Works offline on a device once you've opened it there.");
  const software = isLib
    ? `<p>Each guide uses its own program. None of the software is included with the library; you need your own copy of, or access to, each program you want to work with, obtained separately from its maker. You only need the programs for the guides you choose to work through.</p><ul class="plain-list">${GUIDE_IDS.map((gid) => `<li><strong>${esc(catalog[gid].name)}:</strong> ${esc(copyById[gid].software)}</li>`).join("")}</ul>`
    : c.softwareHtml;
  const forWho = isLib ? ["You work with several of these programs, or plan to.", "You want every guide, practice file and shortcut trainer under one license.", "You like to work through guides at your own pace, in any order."] : c.forWho;
  const notFor = isLib ? ["You only need one or two programs. The individual guides may suit you better.", 'You want to use the guides with a class or team. That needs a group license; see the <a href="faq.html#q-can-teachers-schools-or-companies-use-the-guides-with-a-group">FAQ</a>.', "You want video lessons, live help, or someone to review your work."] : c.notFor.map(esc);
  const previewId = isLib ? "spreadsheet-formulas" : id;

  const body = `<main id="main">
<div class="container p-layout">
  ${aside(id)}
  <div class="p-main">
    ${licenseNote()}
    <p class="p-lead">${esc(p.description)}</p>
    <section class="p-sec" id="contents" aria-labelledby="contents-title">
      <h2 id="contents-title">${isLib ? "What the library includes" : "What the guide covers"}</h2>
      ${seqList(coverItems)}
    </section>
    <section class="p-sec" id="preview" aria-labelledby="preview-title">
      <h2 id="preview-title">Preview from the guide</h2>
      <p>${isLib ? "This is the first lesson of Spreadsheet Formulas &amp; Functions, one of the seven guides, rendered from the guide itself." : "This is the first lesson, rendered from the guide itself: the lesson list, the lesson overview with its diagram, and a quiz question."}</p>
      ${preview(previewId)}
    </section>
    <section class="p-sec" id="inside" aria-labelledby="inside-title">
      <h2 id="inside-title">What's inside</h2>
      ${inside}
    </section>
    <section class="p-sec" id="software" aria-labelledby="software-title">
      <h2 id="software-title">Software required</h2>
      ${software}
      <div class="callout"><p><strong>About software updates.</strong> ${VERSION_NOTE}</p></div>
    </section>
    <section class="p-sec" id="needs" aria-labelledby="needs-title">
      <h2 id="needs-title">What you need</h2>
      <ul class="check-list"><li>A modern web browser (such as Chrome, Edge, Firefox or Safari) on a computer, tablet or phone.</li><li>${isLib ? "The software for each guide you work through, obtained separately." : `${esc(c.software)}, obtained separately, to follow the steps.`}</li><li>An internet connection the first time you open the guide on a device; after that it also works offline.</li></ul>
    </section>
    <section class="p-sec" id="format" aria-labelledby="format-title">
      <h2 id="format-title">How the guide works</h2>
      <p>This is a self-study guide. You read each step, carry it out in your own copy of the software, check your understanding with the quiz, then try the exercise and compare your work with the worked solution. ${copy.SELF_STUDY}</p>
    </section>
    <section class="p-sec" id="fit" aria-labelledby="fit-title">
      <h2 id="fit-title">Is this ${isLib ? "library" : "guide"} a good fit?</h2>
      <div class="fit">
        <div><h3>Who it's for</h3><ul class="check-list">${forWho.map((x) => `<li>${isLib ? x : esc(x)}</li>`).join("")}</ul></div>
        <div><h3>Who it isn't for</h3><ul class="cross-list">${notFor.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      </div>
    </section>
    <section class="p-sec" aria-labelledby="related-title">
      <h2 id="related-title">Other guides</h2>
      <ul class="chips">${allIds.filter((o) => o !== id).map((o) => `<li><a href="${catalog[o].page}">${esc(catalog[o].name)}</a></li>`).join("")}</ul>
    </section>
  </div>
</div>
</main>`;
  const metaDesc = isLib
    ? `All seven Shortcut Press guides unlocked by a single license: spreadsheets, data analysis, document formatting, Blender, DaVinci Resolve, Figma and Inkscape. $${p.price} USD.`
    : `${p.name}: an interactive browser guide to ${p.summary.charAt(0).toLowerCase() + p.summary.slice(1).replace(/\.$/, "")}. Lessons, quizzes, worked solutions, practice files and a shortcut trainer. $${p.price} USD.`;
  return page({ file: p.page, title: `${p.name} — Shortcut Press`, description: metaDesc, current: "guides", body, ogType: "product", bodyClass: "has-pbar", after: pbar(id) });
}

/* ---------- docs pages ---------- */
function processDoc(html) {
  const toc = [];
  const used = new Set();
  const uid = (b) => { let id = b, n = 2; while (used.has(id)) id = `${b}-${n++}`; used.add(id); return id; };
  let out = html.replace(/<(h2|h3)( id="([^"]+)")?>([\s\S]*?)<\/\1>/g, (m, tag, _a, id, text) => {
    const plain = text.replace(/<[^>]+>/g, "");
    const theId = uid(id || slug(plain));
    if (tag === "h2") toc.push([theId, plain]);
    return `<div class="h-wrap ${tag}"><${tag} id="${theId}">${text}</${tag}><a class="anchor" href="#${theId}" aria-label="Link to this section: ${esc(plain)}">#</a></div>`;
  });
  out = out.split(/(?=<div class="h-wrap h2">)/).filter((s) => s.trim()).map((s) => `<section class="fade">${s}</section>`).join("\n");
  return { html: out, toc };
}

function docPage({ file, title, h1, lead, eyebrow, updated, html, description, current = "" }) {
  const { html: content, toc } = processDoc(html);
  const body = `<main id="main">
<div class="container doc">
  <nav class="doc-toc" aria-label="On this page"><p class="toc-title">On this page</p><ol class="toc-list">${toc.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join("")}</ol></nav>
  <div class="doc-main">
    <header class="doc-head">
      <p class="label"><span class="label-num">${eyebrow}</span></p>
      <h1>${h1}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
      ${updated ? `<p class="updated">Last updated: <time datetime="${copy.UPDATED.iso}">${copy.UPDATED.human}</time></p>` : ""}
    </header>
    <article class="doc-body">
${content}
    </article>
  </div>
</div>
</main>`;
  return page({ file, title, description, current, body, readProgress: true });
}

const faqHtml = () => copy.FAQ.map((g) => `<h2>${g.group}</h2>\n<div class="faq-list">${g.items.map(faqItem).join("")}</div>`).join("\n");

/* ---------- contact ---------- */
function contact() {
  const body = `<main id="main">
<div class="container contact">
  <div>
    <p class="label"><span class="label-num">Contact</span></p>
    <h1>Contact Shortcut Press</h1>
    <p class="lead">Questions about a guide, an order, a license, a refund or a group license all come to the same place.</p>
    <p class="muted">Many answers are already on the <a href="faq.html">FAQ page</a>.</p>
  </div>
  <div class="c-stack">
    <section class="c-panel c-panel-accent" aria-labelledby="c-email" data-email-block hidden>
      <h2 id="c-email">Email</h2>
      <p><span class="c-email" data-email-link></span></p>
    </section>
    <section class="c-panel" aria-labelledby="c-time">
      <h2 id="c-time">Response time</h2>
      <p class="c-big">Within two business days</p>
      <p class="muted">Every message gets a reply within two business days.</p>
    </section>
    <section class="c-panel" aria-labelledby="c-include">
      <h2 id="c-include">What to include</h2>
      <ul class="check-list"><li>Your order number</li><li>The email address you used at checkout</li><li>Which guide your message is about</li></ul>
    </section>
    <section class="c-panel" aria-labelledby="c-topics">
      <h2 id="c-topics">Common requests</h2>
      <ul class="check-list">
        <li><strong>A lost license code.</strong> Include your order number and the email used at checkout, and we'll send your code again. If the guide is still activated on one of your devices, the code is also listed in My Guides there.</li>
        <li><strong>A refund.</strong> Any purchase can be refunded within 14 days, no reason needed. Include your order number. See the <a href="refund-policy.html">Refund Policy</a>.</li>
        <li><strong>Something not working.</strong> Tell us the guide, the lesson and what happens. The Report a problem link in every lesson fills these in for you.</li>
        <li><strong>A group license.</strong> For teachers, schools and companies. Include your organization's name and roughly how many people would use the guides.</li>
        <li><strong>Your personal information.</strong> Requests to access, correct or delete your information are handled as described in the <a href="privacy-policy.html">Privacy Policy</a>.</li>
      </ul>
    </section>
  </div>
</div>
</main>`;
  return page({ file: "contact.html", title: "Contact — Shortcut Press", description: "How to reach Shortcut Press about orders, license codes, refunds and group licenses, with a reply within two business days.", current: "contact", body });
}

/* ---------- 404 ---------- */
function notFound() {
  const body = `<main id="main">
<div class="container nf">
  <span class="key nf-key" aria-hidden="true"><span class="key-cap"><span class="key-label">Esc</span></span></span>
  <p class="label"><span class="label-num">Error 404</span></p>
  <h1>This page doesn't exist</h1>
  <p class="lead">The address may have a typo, or the page may have moved. Everything on the site is reachable from the links below.</p>
  <div class="nf-links"><a class="btn btn-ghost" href="index.html">Go to the home page</a><a class="btn btn-ghost" href="index.html#guides">See all guides</a><a class="btn btn-ghost" href="faq.html">FAQ</a></div>
  <p class="hint js-only" style="margin-top:24px">Or press <kbd data-mod-key>Ctrl</kbd> <kbd>K</kbd> to search the site.</p>
</div>
</main>`;
  return page({ file: "404.html", title: "Page not found — Shortcut Press", description: "The page you were looking for doesn't exist on the Shortcut Press website.", body, noindex: true, is404: true });
}

/* ---------- guide shells ---------- */
function guideShell(id) {
  const p = catalog[id];
  const r = "../../";
  const isHub = id === "complete-library";
  const g = guides[id];
  const extra = ["js/diagrams.js", "js/trainer.js"];
  if (g && g.sandbox) extra.unshift("vendor/fast-formula-parser/parser.min.js", "js/sandbox.js");
  extra.push(...(isHub ? [] : ["./content.js"]), "js/guide-app.js");
  const body = `<div id="guide-app" data-guide="${id}" data-mode="${isHub ? "hub" : "guide"}">
  <div class="container gd-locked"><h1>${esc(p.name)}</h1>
  <noscript><p class="lead">This guide runs in your browser and needs JavaScript. Turn JavaScript on and reload this page.</p></noscript>
  <p class="lead">Opening your guide…</p>
  <p class="muted">If it doesn't open, you'll be taken to the <a href="${r}${p.page}">product page</a>, where you can add your license in My Guides.</p></div>
</div>`;
  return page({ file: p.guidePath + "index.html", r, title: `${p.name} — Shortcut Press`, description: `${p.name}: the interactive guide. Requires a license.`, body, noindex: true, extraScripts: extra, noFooter: true });
}

/* ---------- confirmation pages ---------- */
function confirmShell(id) {
  const p = catalog[id];
  const r = "../../";
  const body = `<main id="main">
<div class="container cf"><div id="confirm-app" data-product="${id}">
  <div class="cf-head"><h1>Your order confirmation</h1>
  <noscript><p class="lead">This page needs JavaScript to issue and show your license code. Turn JavaScript on and reload this page, or <a href="${r}contact.html">contact us through the Contact page</a> with your order number.</p></noscript>
  <p class="lead">Preparing your license code…</p></div>
</div></div>
</main>`;
  return page({ file: p.confirmationPath + "index.html", r, title: `Order confirmation: ${p.name} — Shortcut Press`, description: `Order confirmation and license code for ${p.name}.`, body, noindex: true, extraScripts: ["js/pdf.js", "js/confirm.js"] });
}

/* ---------- data files ---------- */
function guidesIndex() {
  const out = {};
  for (const id of GUIDE_IDS) out[id] = { title: guides[id].title, lessons: guides[id].lessons.map((l) => ({ id: l.id, title: l.title })) };
  return `/* Shortcut Press — lesson index for My Guides (generated by tools/site/build.mjs). */\nwindow.SP_GUIDES = ${JSON.stringify(out)};\n`;
}

function guideContent(id) {
  const g = { ...guides[id] };
  if (g.sandbox) {
    const { sfProducts } = awaitDatasets;
    const cells = {};
    const COLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    sfProducts.forEach((row, r) => row.forEach((v, c) => (cells[COLS[c] + (r + 1)] = v)));
    cells.G1 = "Find ID";
    cells.G2 = 103;
    cells.H1 = "Result";
    g.sandboxCells = cells;
  }
  return `/* Shortcut Press — ${g.title} guide content (generated by tools/site/build.mjs). */\nwindow.SP_GUIDE = ${JSON.stringify(g)};\n`;
}
const awaitDatasets = await import("../files/datasets.mjs");

function searchIndex() {
  const entries = [];
  for (const id of allIds) entries.push({ kind: "Guide", id, title: catalog[id].name, url: catalog[id].page, keywords: `${copyById[id].software} ${copyById[id].level} ${catalog[id].summary} ${id === "complete-library" ? "all seven bundle" : guides[id].lessons.map((l) => l.title).join(" ")}` });
  const pages = [
    ["Home", "index.html", "start overview"],
    ["All guides", "index.html#guides", "products catalog"],
    ["How buying a guide works", "index.html#how-it-works", "purchase checkout delivery license confirmation"],
    ["About Shortcut Press", "about.html", "about why"],
    ["Frequently asked questions", "faq.html", "faq help questions license backup offline devices"],
    ["Contact", "contact.html", "email support help order lost license"],
    ["Refund Policy", "refund-policy.html", "refund money back 14 days cancel"],
    ["Delivery Policy", "delivery-policy.html", "delivery license code confirmation access"],
    ["Privacy Policy", "privacy-policy.html", "privacy data gdpr ccpa cookies storage"],
    ["Terms of Service", "terms-of-service.html", "terms license legal"],
    ["Disclaimer", "disclaimer.html", "disclaimer trademarks results"],
    ["Consumer Rights", "consumer-rights.html", "consumer rights cancel withdrawal eu uk faulty"],
  ];
  for (const [title, url, keywords] of pages) entries.push({ kind: "Page", title, url, keywords });
  for (const g of copy.FAQ) for (const [q, a] of g.items) entries.push({ kind: "FAQ", title: q.replace(/&amp;/g, "&"), url: `faq.html#q-${slug(q)}`, keywords: `${g.group} ${a.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").slice(0, 220)}` });
  return `/*\n  Shortcut Press — search index for the command palette.\n  Every guide, page and FAQ question, with the words used to match it.\n*/\nwindow.SHORTCUT_INDEX = ${JSON.stringify(entries, null, 2)};\n`;
}

/* ---------- write pages ---------- */
const files = {
  "index.html": home(),
  "about.html": docPage({ file: "about.html", title: "About — Shortcut Press", h1: "About Shortcut Press", eyebrow: "About", lead: "Shortcut Press makes interactive, self-paced guides to software for spreadsheets, documents, 3D modeling, video editing, interface design and illustration.", html: copy.aboutHtml, description: "What Shortcut Press makes and why: interactive, self-paced software guides that run in your browser, with diagrams, quizzes, exercises, practice files and a shortcut trainer.", current: "about" }),
  "faq.html": docPage({ file: "faq.html", title: "FAQ — Shortcut Press", h1: "Frequently asked questions", eyebrow: "FAQ", lead: 'Licenses, devices, backups, offline use, software, refunds and licensing for groups. If your question isn\'t answered here, contact us through the <a href="contact.html">Contact page</a>.', html: faqHtml(), description: "Answers about Shortcut Press guides: what you receive and how, licenses on other devices, backups, offline use, supported devices, software, updates, group licenses and refunds.", current: "faq" }),
  "contact.html": contact(),
  "refund-policy.html": docPage({ file: "refund-policy.html", title: "Refund Policy — Shortcut Press", h1: "Refund Policy", eyebrow: "Policy", lead: "Every purchase can be refunded in full within 14 days.", updated: true, html: copy.refundHtml, description: "Shortcut Press refund policy: a full refund on any purchase within 14 days, no reason required, issued to your original payment method within 5 business days." }),
  "delivery-policy.html": docPage({ file: "delivery-policy.html", title: "Delivery Policy — Shortcut Press", h1: "Delivery Policy", eyebrow: "Policy", lead: "All products are digital. Here is exactly how delivery works.", updated: true, html: copy.deliveryHtml, description: "How Shortcut Press guides are delivered: a license code issued and activated on your order confirmation page immediately after payment, usable on any device. No physical shipment." }),
  "privacy-policy.html": docPage({ file: "privacy-policy.html", title: "Privacy Policy — Shortcut Press", h1: "Privacy Policy", eyebrow: "Policy", lead: "What information Shortcut Press receives, what stays on your device, and your rights.", updated: true, html: copy.privacyHtml, description: "Shortcut Press privacy policy: no cookies, analytics or trackers; licenses and progress stored only in your browser; order information used only for support, refunds and tax obligations." }),
  "terms-of-service.html": docPage({ file: "terms-of-service.html", title: "Terms of Service — Shortcut Press", h1: "Terms of Service", eyebrow: "Policy", lead: "The terms that apply to this website and every purchase.", updated: true, html: copy.termsHtml, description: "Shortcut Press terms of service: browser-based guides unlocked with a license, the personal-use license, license codes, backups, payment, delivery, refunds and limits of liability." }),
  "disclaimer.html": docPage({ file: "disclaimer.html", title: "Disclaimer — Shortcut Press", h1: "Disclaimer", eyebrow: "Policy", lead: "What the guides are, what they aren't, and what to keep in mind.", updated: true, html: copy.disclaimerHtml, description: "Shortcut Press disclaimer: self-study materials with no tutoring or feedback, no promised results, software changes, backups, trademarks and independence." }),
  "consumer-rights.html": docPage({ file: "consumer-rights.html", title: "Consumer Rights — Shortcut Press", h1: "Consumer Rights", eyebrow: "Policy", lead: "Your rights when you buy from Shortcut Press, including information for customers in the EU and UK.", updated: true, html: copy.consumerHtml, description: "Consumer rights at Shortcut Press: who you're buying from, what you're buying, prices, your 14-day right to cancel, faulty digital content, updates and complaints." }),
  "404.html": notFound(),
};
for (const id of allIds) files[catalog[id].page] = productPage(id);
for (const id of allIds) files[catalog[id].guidePath + "index.html"] = guideShell(id);
for (const id of allIds) files[catalog[id].confirmationPath + "index.html"] = confirmShell(id);

for (const [name, html] of Object.entries(files)) {
  const full = path.join(ROOT, name);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
}
fs.writeFileSync(path.join(ROOT, "js/guides-index.js"), guidesIndex());
for (const id of GUIDE_IDS) fs.writeFileSync(path.join(ROOT, "guides", guides[id].slug, "content.js"), guideContent(id));
fs.writeFileSync(path.join(ROOT, "js/search-index.js"), searchIndex());

const sitemapPages = Object.keys(files).filter((f) => f !== "404.html" && !f.startsWith("guides/") && !f.startsWith("thank-you/"));
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPages.map((f) => `  <url><loc>${f === "index.html" ? SITE : SITE + f}</loc><lastmod>${copy.UPDATED.iso}</lastmod></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);

fs.writeFileSync(path.join(ROOT, "manifest.webmanifest"), JSON.stringify({
  name: "Shortcut Press",
  short_name: "Shortcut Press",
  description: "Interactive software skills guides that run in your browser.",
  start_url: "./",
  scope: "./",
  display: "standalone",
  background_color: "#08090b",
  theme_color: "#08090b",
  icons: [
    { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
}, null, 2) + "\n");

/* ---------- service worker ---------- */
function listFiles(dir, filter) {
  const out = [];
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFiles(rel, filter));
    else if (filter(rel)) out.push(rel);
  }
  return out;
}
const precache = [
  "./",
  ...Object.keys(files).filter((f) => !f.startsWith("thank-you/") && f !== "index.html").map((f) => f.replace(/index\.html$/, "")),
  ...listFiles("css", () => true),
  ...listFiles("js", () => true),
  ...listFiles("vendor", (f) => f.endsWith(".js")),
  ...GUIDE_IDS.map((id) => `guides/${guides[id].slug}/content.js`),
  "favicon.svg",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
].filter((v, i, a) => a.indexOf(v) === i);
const hash = crypto.createHash("sha256");
for (const f of [...precache, ...listFiles("guides", (x) => x.includes("/files/"))]) {
  const disk = f === "./" ? "index.html" : f.endsWith("/") ? f + "index.html" : f;
  const full = path.join(ROOT, disk);
  hash.update(f);
  if (fs.existsSync(full)) hash.update(fs.readFileSync(full));
}
const VERSION = hash.digest("hex").slice(0, 12);
fs.writeFileSync(path.join(ROOT, "sw.js"), `/*
  Shortcut Press — service worker (generated by tools/site/build.mjs).
  Caches the site so guides work offline once loaded. VERSION changes whenever any
  site file changes, which installs a new worker and refreshes the cached files.
*/
var VERSION = "${VERSION}";
var CACHE = "sp-" + VERSION;
var RUNTIME = "sp-runtime-" + VERSION;
var PRECACHE = ${JSON.stringify(precache)};

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(PRECACHE.map(function (u) { return new Request(u, { cache: "reload" }); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE && k !== RUNTIME && k.indexOf("sp-") === 0; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function fromNetworkThenCache(request, cacheName) {
  return fetch(request).then(function (response) {
    if (response && (response.ok || response.type === "opaque")) {
      var copy = response.clone();
      caches.open(cacheName).then(function (c) { c.put(request, copy); });
    }
    return response;
  });
}

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  if (url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com") {
    event.respondWith(caches.match(req).then(function (hit) { return hit || fromNetworkThenCache(req, RUNTIME); }));
    return;
  }
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    event.respondWith(
      fromNetworkThenCache(req, RUNTIME).catch(function () {
        return caches.match(req, { ignoreSearch: true }).then(function (hit) {
          return hit || caches.match(new URL("404.html", self.registration.scope).href);
        });
      })
    );
    return;
  }
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      return hit || fromNetworkThenCache(req, RUNTIME);
    })
  );
});
`);

console.log(`Built ${Object.keys(files).length} pages, ${GUIDE_IDS.length} guide data files, service worker ${VERSION} (${precache.length} files precached).`);
