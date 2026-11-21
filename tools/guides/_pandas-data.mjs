// Deterministic practice data for Data Analysis with Python & pandas.
function lcg(seed) {
  let s = seed >>> 0;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

export const PRODUCTS = [
  ["Notebook", 3.5],
  ["Pen set", 4.25],
  ["Desk lamp", 24.0],
  ["Stapler", 8.75],
  ["Backpack", 39.0],
];
const REGIONS = ["North", "South", "East", "West"];
// Messy spellings that the cleaning lesson fixes.
const MESSY = { North: ["North", "north", " North"], South: ["South", "SOUTH"], East: ["East", "east "], West: ["West"] };

export function ordersCsv() {
  const rnd = lcg(20260301);
  const rows = [["order_id", "date", "region", "product", "units", "unit_price"]];
  for (let i = 0; i < 120; i++) {
    const month = 1 + Math.floor(i / 20);
    const day = 1 + Math.floor(rnd() * 28);
    const region = REGIONS[Math.floor(rnd() * 4)];
    const spellings = MESSY[region];
    const spelled = rnd() < 0.15 ? spellings[1 + Math.floor(rnd() * (spellings.length - 1))] || region : region;
    const [product, price] = PRODUCTS[Math.floor(rnd() * PRODUCTS.length)];
    let units = 1 + Math.floor(rnd() * 12);
    const missingUnits = i % 37 === 11;
    rows.push([3001 + i, `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`, spelled, product, missingUnits ? "" : units, price]);
  }
  // Two exact duplicate rows, as exports sometimes contain.
  rows.splice(31, 0, rows[30].slice());
  rows.splice(77, 0, rows[76].slice());
  return rows.map((r) => r.map((v) => (/[,"]/.test(String(v)) || /^\s|\s$/.test(String(v)) ? `"${v}"` : v)).join(",")).join("\r\n") + "\r\n";
}

export const REGIONS_CSV = "region,manager,quarter_target\r\nNorth,Amara Okafor,1000\r\nSouth,Ben Ruiz,1300\r\nEast,Chen Wei,800\r\nWest,Dana Fischer,900\r\n";
