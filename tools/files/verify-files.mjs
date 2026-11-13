// Checks the generated practice files: Office XML is well-formed, SVGs render,
// videos decode with picture and sound. Run with: node tools/files/verify-files.mjs
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { startServer } from "../serve-lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function unzip(buf) {
  const out = {};
  let i = 0;
  while (i + 4 <= buf.length && buf.readUInt32LE(i) === 0x04034b50) {
    const method = buf.readUInt16LE(i + 8);
    const csize = buf.readUInt32LE(i + 18);
    const nlen = buf.readUInt16LE(i + 26);
    const xlen = buf.readUInt16LE(i + 28);
    const name = buf.slice(i + 30, i + 30 + nlen).toString();
    const data = buf.slice(i + 30 + nlen + xlen, i + 30 + nlen + xlen + csize);
    out[name] = method === 8 ? zlib.inflateRawSync(data).toString() : data.toString();
    i += 30 + nlen + xlen + csize;
  }
  return out;
}

export async function verifyFiles({ frameDir } = {}) {
  const server = await startServer(ROOT, 0);
  const base = `http://localhost:${server.port}/`;
  const browser = await chromium.launch({ channel: "msedge", headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage();
  await page.goto(base + "robots.txt");
  const results = [];
  let failures = 0;
  const report = (ok, line) => {
    if (!ok) failures++;
    results.push((ok ? "PASS  " : "FAIL  ") + line);
  };

  for (const g of fs.readdirSync(path.join(ROOT, "guides"))) {
    const dir = path.join(ROOT, "guides", g, "files");
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      const full = path.join(dir, f);
      const url = `${base}guides/${g}/files/${f}`;
      if (/\.(xlsx|docx)$/.test(f)) {
        const parts = unzip(fs.readFileSync(full));
        const bad = await page.evaluate(
          (parts) =>
            Object.entries(parts)
              .filter(([n]) => n.endsWith(".xml") || n.endsWith(".rels"))
              .filter(([, x]) => new DOMParser().parseFromString(x, "application/xml").querySelector("parsererror"))
              .map(([n]) => n),
          parts
        );
        report(bad.length === 0 && Object.keys(parts).length >= 4, `${f}: ${Object.keys(parts).length} parts, ${bad.length ? "XML errors in " + bad.join(", ") : "all XML well-formed"}`);
      } else if (/\.svg$/.test(f)) {
        const ok = await page.evaluate(async (u) => {
          const img = new Image();
          img.src = u;
          try {
            await img.decode();
            return img.naturalWidth > 0;
          } catch (e) {
            return false;
          }
        }, url);
        report(ok, `${f}: renders as an image`);
      } else if (/\.mp4$/.test(f)) {
        const s = fs.readFileSync(full).toString("latin1");
        const info = await page.evaluate(async (u) => {
          const v = document.createElement("video");
          v.src = u;
          document.body.appendChild(v);
          const wait = (p, ms) => Promise.race([p, new Promise((_, j) => setTimeout(() => j(new Error("timeout")), ms))]);
          try {
            await wait(new Promise((r, j) => { v.onloadedmetadata = r; v.onerror = () => j(new Error("media error")); }), 15000);
            await wait(v.play(), 10000);
            await new Promise((r) => setTimeout(r, 1500));
            v.pause();
            return { ok: true, dur: v.duration, w: v.videoWidth, h: v.videoHeight, audio: v.webkitAudioDecodedByteCount, frames: v.getVideoPlaybackQuality().totalVideoFrames };
          } catch (e) {
            return { ok: false, err: String(e) };
          }
        }, url);
        if (!info.ok) report(false, `${f}: ${info.err}`);
        else {
          const ok = info.w === 1280 && info.h === 720 && Math.abs(info.dur - 6) < 0.2 && info.audio > 0 && info.frames > 10 && s.indexOf("moov") < s.indexOf("mdat");
          report(ok, `${f}: ${info.w}x${info.h}, ${info.dur.toFixed(2)} s, ${info.frames} frames decoded, ${info.audio} audio bytes decoded, H.264 ${s.includes("avc1")}, AAC ${s.includes("mp4a")}, fast start ${s.indexOf("moov") < s.indexOf("mdat")}`);
          if (frameDir) {
            await page.evaluate(async (u) => {
              document.body.innerHTML = `<video src="${u}" muted style="width:640px;display:block"></video>`;
              const v = document.querySelector("video");
              await new Promise((r) => (v.onloadeddata = r));
              v.currentTime = 3;
              await new Promise((r) => (v.onseeked = r));
            }, url);
            await page.locator("video").screenshot({ path: path.join(frameDir, f + ".png") });
            await page.evaluate(() => (document.body.innerHTML = ""));
          }
        }
      } else if (/\.obj$/.test(f)) {
        const txt = fs.readFileSync(full, "utf8");
        const v = (txt.match(/^v /gm) || []).length;
        const faces = txt.match(/^f .+$/gm) || [];
        const maxIdx = Math.max(...faces.flatMap((l) => l.slice(2).split(" ").map(Number)));
        report(v > 0 && faces.length > 0 && maxIdx <= v, `${f}: ${v} vertices, ${faces.length} faces, indices within range`);
      } else if (/\.wav$/.test(f)) {
        const b = fs.readFileSync(full);
        report(b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WAVE", `${f}: ${(b.readUInt32LE(40) / b.readUInt32LE(28)).toFixed(1)} s, ${b.readUInt32LE(24)} Hz, ${b.readUInt16LE(22)} channels`);
      } else if (/\.csv$/.test(f)) {
        const lines = fs.readFileSync(full, "utf8").trim().split(/\r?\n/);
        const cols = lines[0].split(",").length;
        report(lines.every((l) => l.split(",").length === cols), `${f}: ${lines.length - 1} rows, ${cols} columns`);
      }
    }
  }
  await browser.close();
  await server.close();
  return { results, failures };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const { results, failures } = await verifyFiles({ frameDir: process.env.FRAME_DIR });
  console.log(results.join("\n"));
  console.log(failures ? `\n${failures} FAILED` : "\nALL PRACTICE FILES PASSED");
  process.exit(failures ? 1 : 0);
}
