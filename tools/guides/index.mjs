// The list of guides, shared by the site build and the practice-file build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));

// The seven guides in the Complete Software Skills Library.
export const LIBRARY_GUIDES = ["spreadsheet-formulas", "pivot-tables-charts", "document-formatting", "blender-3d-modeling", "davinci-resolve-editing", "figma-interface-design", "inkscape-vector-illustration"];

// Guides sold on their own, with add-ons. Listed in catalog order.
export const MORE_GUIDES = [
  "google-sheets-budgeting",
  "powerpoint-presentations",
  "excel-power-query",
  "excel-vba-macros",
  "financial-modeling-excel",
  "power-bi-reports",
  "sql-queries",
  "obsidian-notes",
  "python-automation",
  "python-pandas",
  "machine-learning-sklearn",
  "git-github",
  "html-css",
  "javascript-basics",
  "command-line",
  "docker-containers",
  "gimp-photo-editing",
  "krita-digital-painting",
  "canva-social-graphics",
  "godot-game-dev",
  "freecad-3d-printing",
  "after-effects-motion",
  "audacity-audio",
  "lmms-beat-making",
  "obs-streaming",
];

export const CATEGORIES = [
  ["office", "Office & data"],
  ["code", "Code & development"],
  ["design", "Design & 3D"],
  ["media", "Audio & video"],
];

// Guide modules that exist (lets the catalog grow one batch at a time).
export function available(ids) {
  return ids.filter((id) => fs.existsSync(path.join(HERE, id + ".mjs")));
}

export async function loadGuides(ids) {
  const out = {};
  for (const id of available(ids)) out[id] = (await import(`./${id}.mjs`)).default;
  return out;
}
