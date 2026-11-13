// Deterministic, original practice data shared by the practice files and the guide text,
// so worked solutions quote the exact numbers learners will see in the downloaded files.

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Excel/Sheets serial number for a date (days since 1899-12-30).
export function serial(y, m, d) {
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(1899, 11, 30)) / 86400000);
}

export function isoFromSerial(n) {
  const d = new Date(Date.UTC(1899, 11, 30) + n * 86400000);
  return d.toISOString().slice(0, 10);
}

/* ---------- Spreadsheet Formulas & Functions ---------- */

export const sfProducts = [
  ["ID", "Item", "Unit price", "Qty", "Supplier code"],
  [101, "Notebook", 3.5, 12, "NB-4471"],
  [102, "Gel pen", 1.25, 40, "GP-1020"],
  [103, "Stapler", 8.75, 5, "ST-3305"],
  [104, "Paper clips", 0.9, 0, "PC-0098"],
  [105, "Desk lamp", 24, 3, "DL-7712"],
  [106, "Folder", 0.6, 75, "FD-2240"],
  [107, "Marker set", 6.4, 9, "MK-5581"],
  [108, "Ruler", 1.1, 22, "RL-0307"],
];

export const sfPeople = [
  ["Raw name", "Start date", "Review date", "Department"],
  ["  ada   lovelace ", serial(2023, 3, 6), serial(2025, 3, 3), "Research"],
  ["GRACE HOPPER", serial(2021, 11, 15), serial(2025, 2, 14), "Engineering"],
  ["alan  turing", serial(2024, 1, 8), serial(2025, 1, 31), "Research"],
  ["  katherine johnson", serial(2022, 7, 25), serial(2025, 4, 30), "Operations"],
  ["edsger dijkstra  ", serial(2020, 5, 4), serial(2025, 6, 2), "Engineering"],
];

export const sfOrders = [
  ["Order", "Region", "Amount", "Status"],
  ["A-1001", "North", 120, "Paid"],
  ["A-1002", "South", 80, "Paid"],
  ["A-1003", "North", 45.5, "Open"],
  ["A-1004", "East", 60, "Paid"],
  ["A-1005", "North", 30, "Paid"],
  ["A-1006", "West", 95, "Open"],
  ["A-1007", "South", 150, "Paid"],
  ["A-1008", "East", 22.5, "Open"],
];

export const sfScores = [
  ["Learner", "Score"],
  ["Mira", 92],
  ["Tomas", 78],
  ["Ines", 50],
  ["Kofi", 64],
  ["Lena", 41],
];

/* ---------- Data Analysis with Pivot Tables & Charts ---------- */

const REGIONS = ["North", "South", "East", "West"];
const CATEGORIES = ["Paper", "Writing", "Storage", "Desk"];
const CHANNELS = ["Online", "Store"];

export function salesRows() {
  const r = rng(20251113);
  const rows = [];
  for (let i = 0; i < 160; i++) {
    const month = 1 + Math.floor(r() * 12);
    const day = 1 + Math.floor(r() * 28);
    const region = REGIONS[Math.floor(r() * REGIONS.length)];
    const category = CATEGORIES[Math.floor(r() * CATEGORIES.length)];
    const channel = CHANNELS[r() < 0.55 ? 0 : 1];
    const units = 1 + Math.floor(r() * 24);
    const price = [3.5, 1.25, 8.75, 24, 6.4, 12][Math.floor(r() * 6)];
    rows.push({
      order: `S-${String(2001 + i)}`,
      date: serial(2025, month, day),
      month,
      region,
      category,
      channel,
      units,
      price,
      sales: Math.round(units * price * 100) / 100,
    });
  }
  rows.sort((a, b) => a.date - b.date || a.order.localeCompare(b.order));
  return rows;
}

export function quarterOf(month) {
  return "Q" + (Math.floor((month - 1) / 3) + 1);
}

export function salesSummary() {
  const rows = salesRows();
  const round = (n) => Math.round(n * 100) / 100;
  const byRegion = {};
  const byRegionQuarter = {};
  const byCategory = {};
  const byChannel = {};
  let total = 0;
  for (const row of rows) {
    total += row.sales;
    byRegion[row.region] = (byRegion[row.region] || 0) + row.sales;
    byCategory[row.category] = (byCategory[row.category] || 0) + row.sales;
    byChannel[row.channel] = (byChannel[row.channel] || 0) + row.sales;
    const k = row.region + "|" + quarterOf(row.month);
    byRegionQuarter[k] = (byRegionQuarter[k] || 0) + row.sales;
  }
  for (const o of [byRegion, byCategory, byChannel, byRegionQuarter]) for (const k in o) o[k] = round(o[k]);
  const counts = {};
  for (const row of rows) counts[row.region] = (counts[row.region] || 0) + 1;
  return { rows: rows.length, total: round(total), byRegion, byRegionQuarter, byCategory, byChannel, counts, regions: REGIONS, categories: CATEGORIES };
}

// The "raw" version used for the cleaning lesson: duplicated rows, stray spaces,
// inconsistent capitalization and dates stored as text.
export function salesRawRows() {
  const rows = salesRows().slice(0, 60);
  const r = rng(77);
  const out = [];
  rows.forEach((row, i) => {
    const messy = { ...row };
    if (i % 7 === 0) messy.region = "  " + row.region.toLowerCase() + " ";
    else if (i % 5 === 0) messy.region = row.region.toUpperCase();
    if (i % 9 === 0) messy.dateText = isoFromSerial(row.date);
    out.push(messy);
    if (i % 11 === 3) out.push({ ...messy });
  });
  void r;
  return out;
}

export function salesRawStats() {
  const raw = salesRawRows();
  const seen = new Set();
  let dupes = 0;
  for (const row of raw) {
    const key = JSON.stringify([row.order, row.date, row.region, row.category, row.units, row.price]);
    if (seen.has(key)) dupes++;
    seen.add(key);
  }
  return { rows: raw.length, duplicates: dupes, unique: raw.length - dupes };
}

// Extra rows used in the "Keeping it current" lesson.
export const salesExtraRows = [
  { order: "S-2161", date: serial(2025, 12, 29), month: 12, region: "North", category: "Desk", channel: "Online", units: 4, price: 24, sales: 96 },
  { order: "S-2162", date: serial(2025, 12, 30), month: 12, region: "West", category: "Paper", channel: "Store", units: 10, price: 3.5, sales: 35 },
  { order: "S-2163", date: serial(2025, 12, 31), month: 12, region: "South", category: "Writing", channel: "Online", units: 12, price: 1.25, sales: 15 },
];
