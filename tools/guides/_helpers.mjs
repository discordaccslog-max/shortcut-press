// Helpers for writing guide content.

const COLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Turn a 2D array into a { "A1": value } map, starting at the given cell.
export function cells(rows, start = "A1") {
  const col0 = COLS.indexOf(start.replace(/\d+/g, ""));
  const row0 = parseInt(start.replace(/\D+/g, ""), 10);
  const out = {};
  rows.forEach((row, r) => {
    row.forEach((v, c) => {
      if (v !== null && v !== undefined && v !== "") out[COLS[col0 + c] + (row0 + r)] = v;
    });
  });
  return out;
}

export const k = (...keys) => keys.map((x) => `<kbd>${x}</kbd>`).join(" ");
