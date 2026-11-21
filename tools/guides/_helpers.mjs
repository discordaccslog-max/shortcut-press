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

// Builds a Jupyter notebook (nbformat 4) from [kind, text] cells.
export function notebook(cells) {
  return JSON.stringify(
    {
      cells: cells.map(([kind, text]) => ({
        cell_type: kind,
        metadata: {},
        source: text.split("\n").map((l, i, a) => (i < a.length - 1 ? l + "\n" : l)),
        ...(kind === "code" ? { execution_count: null, outputs: [] } : {}),
      })),
      metadata: { kernelspec: { display_name: "Python 3", language: "python", name: "python3" }, language_info: { name: "python" } },
      nbformat: 4,
      nbformat_minor: 5,
    },
    null,
    1
  ) + "\n";
}
