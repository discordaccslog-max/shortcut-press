// Renders the app icons (PNG) from the brand keycap. Run once with: node tools/site/icons.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dir = path.join(ROOT, "icons");
fs.mkdirSync(dir, { recursive: true });

const mark = (pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<rect width="512" height="512" fill="#08090b"/>
<g transform="translate(${pad} ${pad}) scale(${(512 - pad * 2) / 512})">
<rect x="56" y="88" width="400" height="380" rx="84" fill="#050607"/>
<rect x="56" y="56" width="400" height="372" rx="80" fill="#22262c"/>
<rect x="88" y="84" width="336" height="270" rx="60" fill="#2b3037"/>
<text x="256" y="262" text-anchor="middle" font-family="Consolas, 'Courier New', monospace" font-size="132" font-weight="700" fill="#ededef">S/P</text>
<rect x="166" y="306" width="180" height="22" rx="11" fill="#c8ff3d"/>
</g></svg>`;

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage();
for (const [name, size, pad] of [["icon-192.png", 192, 0], ["icon-512.png", 512, 0], ["icon-maskable-512.png", 512, 72]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<html><body style="margin:0;background:#08090b">${mark(pad).replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`);
  await page.screenshot({ path: path.join(dir, name), clip: { x: 0, y: 0, width: size, height: size } });
  console.log("icons/" + name);
}
await browser.close();
