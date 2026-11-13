// Bento tile illustrations, the hero keyboard and shared icons.
import { esc } from "./storefront.mjs";
/* ---------- icons ---------- */

export const I_SEARCH = `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="7" cy="7" r="4.75" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5 14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
export const I_SUN = `<svg class="i-sun" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;
export const I_MOON = `<svg class="i-moon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M13.2 10.1A5.6 5.6 0 0 1 5.9 2.8a5.6 5.6 0 1 0 7.3 7.3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
export const I_CLOSE = `<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

/* ---------- bento illustrations ---------- */

export function artSheets() {
  let s = `<svg class="art-sheets" viewBox="0 0 240 150" aria-hidden="true" focusable="false">`;
  const cols = 8, rows = 5, w = 26, h = 20, g = 3, x0 = 6, y0 = 19;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const x = x0 + c * (w + g), y = y0 + r * (h + g), d = r * cols + c;
      const acc = [10, 19, 28, 37].includes(d);
      s += `<rect class="i-cell" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/>`;
      s += `<rect class="cf ${acc ? "i-acc" : "cf-fill"}${d < 21 ? " on" : ""}" style="--d:${d}" x="${x + 2.5}" y="${y + 2.5}" width="${w - 5}" height="${h - 5}" rx="1.5"/>`;
    }
  return s + `</svg>`;
}

export function artPivot() {
  let s = `<svg class="art-pivot" viewBox="0 0 240 150" aria-hidden="true" focusable="false">`;
  [38, 68, 98].forEach((y) => (s += `<line class="i-stroke-faint" x1="14" y1="${y}" x2="226" y2="${y}" stroke-dasharray="3 4"/>`));
  s += `<line class="i-stroke" x1="14" y1="128" x2="226" y2="128"/>`;
  [46, 70, 38, 88, 60, 96, 52, 74].forEach((h, i) => {
    s += `<rect class="bar ${i === 5 ? "i-acc" : "i-faint"}" style="--d:${i}" x="${22 + i * 26}" y="${128 - h}" width="16" height="${h}" rx="2"/>`;
  });
  return s + `</svg>`;
}

export function artCube() {
  return `<div class="art-cube" aria-hidden="true"><div class="cube-scene"><div class="cube"><span class="face f-front"></span><span class="face f-back"></span><span class="face f-right"></span><span class="face f-left"></span><span class="face f-top"></span><span class="face f-bottom"></span></div></div><svg class="cube-floor" viewBox="0 0 180 24" focusable="false"><ellipse class="i-stroke-faint" cx="90" cy="12" rx="84" ry="10"/><ellipse class="i-fill" cx="90" cy="12" rx="48" ry="5"/></svg></div>`;
}

export function artVideo() {
  let s = `<svg class="art-video" viewBox="0 0 240 150" aria-hidden="true" focusable="false">`;
  for (let i = 0; i < 13; i++) s += `<line class="i-stroke-faint" x1="${12 + i * 18}" y1="${i % 2 ? 14 : 8}" x2="${12 + i * 18}" y2="20"/>`;
  [[12, 70], [86, 64], [154, 74]].forEach(([x, w], i) => {
    s += `<rect class="i-fill" x="${x}" y="30" width="${w}" height="24" rx="3"/><rect class="i-cell" x="${x}" y="30" width="${w}" height="24" rx="3"/>`;
    if (i === 1) s += `<rect class="clip-hi" x="${x}" y="30" width="${w}" height="24" rx="3"/>`;
  });
  [[40, 92], [140, 60]].forEach(([x, w]) => (s += `<rect class="i-faint" x="${x}" y="60" width="${w}" height="18" rx="3"/>`));
  s += `<rect class="i-fill" x="12" y="86" width="216" height="40" rx="3"/>`;
  for (let i = 0; i < 42; i++) {
    const h = 4 + Math.round(Math.abs(Math.sin(i * 1.7) * 11 + Math.sin(i * 0.55) * 6));
    s += `<rect class="i-ink" x="${17 + i * 5}" y="${106 - h / 2}" width="2" height="${h}" rx="1" opacity="0.7"/>`;
  }
  s += `<g class="playhead"><line x1="22" y1="4" x2="22" y2="138" stroke="var(--accent)" stroke-width="1.5"/><path d="M16 2h12v7l-6 5-6-5z" fill="var(--accent)"/></g>`;
  return s + `</svg>`;
}

export function artFrames() {
  let s = `<svg class="art-frames" viewBox="0 0 240 150" aria-hidden="true" focusable="false">`;
  s += `<rect class="i-paper" x="78" y="8" width="84" height="134" rx="10"/>`;
  const blocks = [
    ["i-ink", 88, 20, 40, 8, 2, "-70px", "-4px", "-12deg"],
    ["i-fill", 88, 36, 64, 26, 4, "64px", "-16px", "9deg"],
    ["i-fill", 88, 68, 64, 26, 4, "-66px", "20px", "-7deg"],
    ["i-faint", 88, 100, 64, 12, 3, "60px", "28px", "14deg"],
    ["i-acc", 88, 118, 64, 14, 7, "-34px", "14px", "-18deg"],
  ];
  blocks.forEach(([cls, x, y, w, h, rx, dx, dy, r], i) => {
    s += `<rect class="fb ${cls}" style="--d:${i};--x:${dx};--y:${dy};--r:${r}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"${cls === "i-fill" ? ' stroke="var(--line-strong)"' : ""}/>`;
  });
  s += `<g class="fm">`;
  [[28, 36], [62, 68], [94, 100], [112, 118]].forEach(([a, b]) => (s += `<path class="i-astroke" d="M170 ${a}v${b - a}M167 ${a}h6M167 ${b}h6" stroke-width="1.2"/>`));
  s += `<path class="i-astroke" d="M83 50h5M83 47v6" stroke-width="1.2"/></g>`;
  return s + `</svg>`;
}

export function artVector() {
  let s = `<svg class="art-vector" viewBox="0 0 240 150" aria-hidden="true" focusable="false">`;
  s += `<circle class="i-fill" cx="176" cy="96" r="34"/><rect class="i-fill" x="40" y="22" width="56" height="56" rx="6" opacity="0.8"/>`;
  const curve = (c1, c2, cls) => `<path class="vc ${cls}" d="M30 112 C ${c1} ${c2} 210 42" fill="none" stroke="var(--text)" stroke-width="2.5" stroke-linecap="round"/>`;
  s += curve("70 43", "170 111", "vc-a") + curve("44 33", "149 93", "vc-b") + curve("91 61", "196 121", "vc-c");
  s += `<g class="vh vh-1"><line x1="30" y1="112" x2="70" y2="43" stroke="var(--accent)" stroke-width="1.2"/><circle cx="70" cy="43" r="4.5" fill="var(--accent)"/></g>`;
  s += `<g class="vh vh-2"><line x1="210" y1="42" x2="170" y2="111" stroke="var(--accent)" stroke-width="1.2"/><circle cx="170" cy="111" r="4.5" fill="var(--accent)"/></g>`;
  s += `<rect x="25.5" y="107.5" width="9" height="9" fill="var(--text)"/><rect x="205.5" y="37.5" width="9" height="9" fill="var(--panel)" stroke="var(--text)" stroke-width="1.5"/>`;
  return s + `</svg>`;
}

export function artDocs() {
  let s = `<svg class="art-docs" viewBox="0 0 240 150" aria-hidden="true" focusable="false">`;
  s += `<rect class="i-paper" x="64" y="8" width="112" height="134" rx="4"/>`;
  const lines = [
    ["i-acc", 20, 56, 7],
    ["i-faint", 36, 88], ["i-faint", 44, 84], ["i-faint", 52, 88], ["i-faint", 60, 52],
    ["i-ink", 74, 40, 5],
    ["i-faint", 86, 88], ["i-faint", 94, 80], ["i-faint", 102, 86], ["i-faint", 110, 60],
    ["i-faint", 124, 88], ["i-faint", 132, 40],
  ];
  lines.forEach(([cls, y, w, h = 4], i) => {
    const dx = i % 2 ? "38px" : "-44px";
    const dy = `${((i * 7) % 9) - 4}px`;
    const sx = i % 3 === 0 ? 1.5 : i % 3 === 1 ? 0.6 : 1.3;
    s += `<rect class="dl ${cls}" style="--d:${i};--x:${dx};--y:${dy};--s:${sx}" x="76" y="${y}" width="${w}" height="${h}" rx="2"/>`;
  });
  return s + `</svg>`;
}

export function artLibrary() {
  const labels = ["Fx", "Pv", "Dc", "3D", "Ed", "UI", "Vx"];
  const key = (l, i) => `<span class="key"><span class="key-cap" style="--d:${i}"><span class="key-label">${l}</span></span></span>`;
  return `<div class="art-lib" aria-hidden="true"><div class="kb-mini"><div class="kb-row">${labels.slice(0, 4).map(key).join("")}</div><div class="kb-row">${labels.slice(4).map((l, i) => key(l, i + 4)).join("")}</div></div></div>`;
}

export const ART = { sheets: artSheets, pivot: artPivot, blender: artCube, resolve: artVideo, figma: artFrames, inkscape: artVector, docs: artDocs, library: artLibrary };
export const AREA = {
  "complete-library": "lib",
  "spreadsheet-formulas": "sh",
  "pivot-tables-charts": "pv",
  "blender-3d-modeling": "bl",
  "davinci-resolve-editing": "rs",
  "figma-interface-design": "fg",
  "document-formatting": "dc",
  "inkscape-vector-illustration": "in",
};
export const BENTO_ORDER = ["complete-library", "spreadsheet-formulas", "pivot-tables-charts", "blender-3d-modeling", "davinci-resolve-editing", "figma-interface-design", "document-formatting", "inkscape-vector-illustration"];

/* ---------- hero keyboard ---------- */

export const KB_ROWS = [
  [["Esc", "Escape", 1.5], ["Q", "KeyQ"], ["W", "KeyW"], ["E", "KeyE"], ["R", "KeyR"], ["T", "KeyT"]],
  [["Tab", "Tab", 1.5], ["A", "KeyA"], ["S", "KeyS"], ["D", "KeyD"], ["F", "KeyF"], ["G", "KeyG"]],
  [["Shift", "ShiftLeft", 1.5], ["Z", "KeyZ"], ["X", "KeyX"], ["C", "KeyC"], ["V", "KeyV"], ["B", "KeyB"]],
  [["Ctrl", "ControlLeft", 1.5], ["Alt", "AltLeft", 1.25], ["", "Space", 3.75]],
];

export function keyboard() {
  const rows = KB_ROWS.map(
    (row) =>
      `<div class="kb-row">${row
        .map(([label, code, w = 1]) => `<span class="key" data-code="${code}"${w !== 1 ? ` style="--w:${w}"` : ""}><span class="key-cap"><span class="key-label">${label}</span></span></span>`)
        .join("")}</div>`
  ).join("");
  return `<div class="kb-panel">
      <div class="kb-stage" role="img" aria-label="A cluster of keyboard keys. Each key presses down when you press the same key on your keyboard, and the cluster plays through common shortcuts on its own when idle.">
        <div class="kb" data-kb>${rows}</div>
      </div>
      <p class="kb-caption"><span class="kb-now" data-kb-now aria-hidden="true"><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>S</kbd><span class="kb-action">Save as</span></span><span class="kb-hint js-only">Press a key on your keyboard</span></p>
    </div>`;
}
