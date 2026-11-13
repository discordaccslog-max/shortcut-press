// Generates every practice file into guides/<slug>/files/. All content is original and made by code.
// Run with: npm run files   (videos need Microsoft Edge or Chrome for WebCodecs encoding)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { xlsx, docx, Obj, wav } from "./formats.mjs";
import { sfProducts, sfPeople, sfOrders, salesRows, salesRawRows, salesExtraRows, serial } from "./datasets.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const out = (slug, name, data) => {
  const dir = path.join(ROOT, "guides", slug, "files");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), data);
  console.log("  " + path.join("guides", slug, "files", name), (Buffer.byteLength(data) / 1024).toFixed(1) + " KB");
};

/* ================= Spreadsheet Formulas & Functions ================= */
function spreadsheetFiles() {
  const slug = "spreadsheet-formulas-functions";
  const products = sfProducts.map((r) => r.slice(0, 5));
  const people = sfPeople.map((r, i) => (i === 0 ? r : [r[0], { date: r[1] }, { date: r[2] }, r[3]]));
  const sheets = (solved) => [
    {
      name: "References",
      rows: [
        ["ID", "Item", "Unit price", "Qty", "Total incl. tax", 0.08, "← tax rate"],
        ...products.slice(1).map((r, i) => [r[0], r[1], r[2], r[3], solved ? { f: `C${i + 2}*D${i + 2}*(1+$F$1)` } : null]),
      ],
      widths: [8, 16, 12, 8, 16, 8, 12],
    },
    {
      name: "Lookups",
      rows: [
        ["ID", "Item", "Unit price", "Qty", "Supplier code", null, "Find ID", "Unit price", "Item (INDEX/MATCH)"],
        ...products.slice(1).map((r, i) => [...r, null, ...(i === 0 ? [103, solved ? { f: "VLOOKUP(G2,$A$2:$E$9,3,FALSE)" } : null, solved ? { f: "INDEX($B$2:$B$9,MATCH(G2,$A$2:$A$9,0))" } : null] : [])]),
      ],
      widths: [8, 16, 12, 8, 14, 4, 10, 12, 18],
    },
    {
      name: "Logic",
      rows: [
        ["Order", "Region", "Amount", "Status", null, "Region", "Total", "Paid total", "Size"],
        ...sfOrders.slice(1).map((r, i) => [...r, null, i === 0 ? "North" : null, i === 0 && solved ? { f: "SUMIF($B$2:$B$9,F2,$C$2:$C$9)" } : null, i === 0 && solved ? { f: 'SUMIFS($C$2:$C$9,$B$2:$B$9,F2,$D$2:$D$9,"Paid")' } : null, solved ? { f: `IF(C${i + 2}>=100,"Large","Standard")` } : null]),
      ],
      widths: [10, 10, 10, 10, 4, 10, 10, 12, 12],
    },
    {
      name: "Text",
      rows: [
        ["Raw name", "Supplier code", "Clean name", "Code prefix"],
        ...people.slice(1).map((r, i) => [r[0], products[i + 1][4], solved ? { f: `PROPER(TRIM(A${i + 2}))` } : null, solved ? { f: `LEFT(B${i + 2},FIND("-",B${i + 2})-1)` } : null]),
      ],
      widths: [22, 14, 20, 12],
    },
    {
      name: "Dates",
      rows: [
        ["Name", "Start date", "Review date", "Days", "Whole months", "Review + 3 months"],
        ...people.slice(1).map((r, i) => [`Person ${i + 1}`, r[1], r[2], solved ? { f: `C${i + 2}-B${i + 2}` } : null, solved ? { f: `DATEDIF(B${i + 2},C${i + 2},"M")` } : null, solved ? { f: `EDATE(C${i + 2},3)`, date: true } : null]),
      ],
      widths: [12, 12, 12, 8, 14, 18],
    },
    {
      name: "Errors",
      rows: [
        ["Item", "Revenue", "Units", "Price per unit"],
        ["Notebook", 42, 12, solved ? { f: 'IFERROR(B2/C2,"No sales")' } : { f: "B2/C2" }],
        ["Gel pen", 50, 40, solved ? { f: 'IFERROR(B3/C3,"No sales")' } : { f: "B3/C3" }],
        ["Paper clips", 0, 0, solved ? { f: 'IFERROR(B4/C4,"No sales")' } : { f: "B4/C4" }],
        ["Desk lamp", 72, 3, solved ? { f: 'IFERROR(B5/C5,"No sales")' } : { f: "B5/C5" }],
      ],
      widths: [14, 10, 8, 14],
    },
  ];
  out(slug, "formulas-practice.xlsx", xlsx(sheets(false), "Spreadsheet Formulas & Functions — practice"));
  out(slug, "formulas-solutions.xlsx", xlsx(sheets(true), "Spreadsheet Formulas & Functions — solutions"));
}

/* ================= Data Analysis with Pivot Tables & Charts ================= */
function pivotFiles() {
  const slug = "data-analysis-pivot-tables-charts";
  const header = ["Order", "Date", "Region", "Category", "Channel", "Units", "Unit price", "Sales"];
  const rowOf = (r) => [r.order, { date: r.date }, r.region, r.category, r.channel, r.units, r.price, r.sales];
  const widths = [10, 12, 10, 10, 10, 8, 10, 10];
  out(slug, "sales-clean.xlsx", xlsx([{ name: "Sales", rows: [header, ...salesRows().map(rowOf)], widths }], "Sales data — clean"));
  out(slug, "sales-raw.xlsx", xlsx([{ name: "Sales (raw)", rows: [header, ...salesRawRows().map((r) => [r.order, r.dateText ? r.dateText : { date: r.date }, r.region, r.category, r.channel, r.units, r.price, r.sales])], widths }], "Sales data — raw"));
  const iso = (n) => new Date(Date.UTC(1899, 11, 30) + n * 86400000).toISOString().slice(0, 10);
  const csv = (rows) => [header.join(","), ...rows.map((r) => [r.order, iso(r.date), r.region, r.category, r.channel, r.units, r.price, r.sales].join(","))].join("\r\n") + "\r\n";
  out(slug, "sales-clean.csv", csv(salesRows()));
  out(slug, "sales-new-rows.csv", csv(salesExtraRows));
}

/* ================= Professional Document Formatting ================= */
function documentFiles() {
  const slug = "professional-document-formatting";
  const H = (text, size = 14) => ({ text, bold: true, size });
  const P = (text) => ({ text, spaceAfter: 8 });

  out(slug, "report-draft.docx", docx([
    { text: "Quarterly Facilities Report", bold: true, size: 22 },
    P("Prepared for the operations team. This draft was typed without styles: every heading below was made bold and enlarged by hand."),
    H("1. Background", 16),
    H("Scope", 13),
    P("This report covers the shared workspace on the second and third floors, including the meeting rooms, the kitchen and the storage area. It does not cover the ground-floor reception, which is managed separately."),
    H("Approach", 13),
    P("Each area was inspected twice during the quarter. Energy readings were taken from the building meters at the start of each month, and maintenance requests were counted from the shared request log."),
    H("2. Findings", 16),
    H("Energy use", 13),
    P("Electricity use fell compared with the previous quarter, mainly because the meeting-room lights now switch off automatically when the rooms are empty. Heating use rose slightly during the colder final month."),
    H("Maintenance", 13),
    P("Most requests concerned the kitchen equipment and the third-floor printer. Requests were resolved more quickly when they included a photo and the exact location."),
    H("3. Recommendations", 16),
    H("Short term", 13),
    P("Add a short checklist to the request form asking for the location and a description of the problem. Replace the third-floor printer's paper tray."),
    H("Longer term", 13),
    P("Review the heating schedule before winter, and consider motion-sensing lights for the storage area."),
  ], "Quarterly Facilities Report (draft)"));

  const chapter = (title, sections) => [
    { pageBreak: true },
    H(title, 18),
    ...sections.flatMap(([h, paras]) => [H(h, 13), ...paras.map(P)]),
  ];
  out(slug, "handbook-draft.docx", docx([
    { text: "Team Handbook", bold: true, size: 26 },
    P("A practice document for the guide. The chapters and sections are formatted by hand; the exercises replace that with styles, a table of contents and page layout."),
    ...chapter("Chapter 1: Welcome", [
      ["About this handbook", ["This handbook explains how the team works day to day: when we work, what equipment we use, how time off works, and where to find help. Read it once from start to finish, then keep it as a reference."]],
      ["Who it's for", ["Everyone on the team, from their first day onwards. If anything here is unclear or out of date, tell the team lead so it can be corrected."]],
    ]),
    ...chapter("Chapter 2: Working hours", [
      ["Core hours", ["Core hours are 10:00 to 15:00, when everyone is available for meetings and questions. Outside core hours, plan your day in whatever way suits your work."]],
      ["Breaks", ["Take a proper lunch break away from your desk, and short breaks during long stretches of screen work."]],
      ["Working from home", ["You may work from home on agreed days. Let the team know in the shared calendar so meetings can be planned around it."]],
    ]),
    ...chapter("Chapter 3: Equipment", [
      ["Your laptop", ["Every team member receives a laptop with the standard software installed. Keep it updated, and lock the screen whenever you step away."]],
      ["Shared equipment", ["Projectors, cameras and spare cables are kept in the storage room. Sign them out in the equipment log and return them the same day."]],
      ["Reporting a fault", ["If anything stops working, report it through the request form with a short description of the problem."]],
    ]),
    ...chapter("Chapter 4: Leave", [
      ["Booking time off", ["Request leave at least two weeks ahead for anything longer than two days, and add it to the shared calendar once approved."]],
      ["Sick days", ["If you're unwell, tell the team lead as early as you can in the morning. You don't need to explain the details."]],
    ]),
    ...chapter("Chapter 5: Getting help", [
      ["Day-to-day questions", ["Ask in the team chat first; someone usually knows the answer."]],
      ["Personal matters", ["For anything personal or confidential, speak to the team lead directly."]],
    ]),
    { pageBreak: true },
    H("Appendix: Contact sheet", 18),
    P("Role — Area — How to reach them"),
    P("Team lead — Planning, leave, personal matters — Team chat or in person"),
    P("Facilities — Rooms, heating, equipment faults — Request form"),
    P("IT support — Laptops, accounts, software — IT request form"),
    P("Finance — Expenses and purchases — Finance shared mailbox"),
  ], "Team Handbook (draft)"));

  out(slug, "letter-draft.docx", docx([
    { text: "Riverside Community Workshop", bold: true, size: 16 },
    P("12 Mill Lane · Riverside"),
    P("3 March"),
    P("Jordan Ellis"),
    P("Woodworking group coordinator"),
    { text: "Subject: Saturday workshop booking", bold: true },
    P("Dear Jordan,"),
    P("Thank you for booking the main workshop room for the Saturday woodworking sessions. The room is reserved from 9:00 to 13:00 each week, with the tool cupboard unlocked for the whole session."),
    P("Please return the cupboard key to the front desk at the end of each session, and let us know a week ahead if you need to cancel a date."),
    P("Kind regards,"),
    P("Sam Okafor"),
    P("Bookings, Riverside Community Workshop"),
  ], "Letter (draft)"));
}

/* ================= Blender ================= */
function blenderFiles() {
  const slug = "blender-3d-modeling-fundamentals";
  // Note: OBJ is Y-up; Blender imports it as Z-up (OBJ -Z becomes Blender +Y).
  const a = new Obj("Blockout shapes");
  a.box("Cube", -3, 1, 0, 2, 2, 2);
  a.cylinder("Cylinder", 0, 0, 0, 1, 2, 24);
  a.sphere("Sphere", 3, 1, 0, 1, 24, 12);
  out(slug, "blockout-shapes.obj", a.toString());

  const st = new Obj("Stool starter: a 1 m square seat and one leg. Duplicating the leg 0.8 m along X and Y places the other three.");
  st.box("Seat", 0, 0.9, 0, 1.0, 0.1, 1.0);
  st.box("Leg", 0.4, 0.425, -0.4, 0.08, 0.85, 0.08);
  out(slug, "stool-start.obj", st.toString());

  // Half a mug body: outer wall, inner wall, rim and base for x >= 0, open along the x = 0 plane.
  const m = new Obj("Half a mug body, centered on the X axis for the Mirror modifier");
  m.object("Mug");
  const seg = 12, rings = 6, R = 0.45, r = 0.39, H = 1.0, base = 0.08;
  const half = (rad, y0, y1) => {
    const pts = [];
    for (let j = 0; j <= rings; j++) {
      const y = y0 + ((y1 - y0) * j) / rings;
      for (let i = 0; i <= seg; i++) {
        const th = -Math.PI / 2 + (Math.PI * i) / seg;
        pts.push([rad * Math.cos(th), y, rad * Math.sin(th)]);
      }
    }
    return pts;
  };
  const W = seg + 1;
  const ob = m.verts(half(R, 0, H));
  for (let j = 0; j < rings; j++) for (let i = 0; i < seg; i++) m.face(ob, [j * W + i, (j + 1) * W + i, (j + 1) * W + i + 1, j * W + i + 1]);
  const ib = m.verts(half(r, base, H));
  for (let j = 0; j < rings; j++) for (let i = 0; i < seg; i++) m.face(ib, [j * W + i, j * W + i + 1, (j + 1) * W + i + 1, (j + 1) * W + i]);
  for (let i = 0; i < seg; i++) m.face(0, [ob + rings * W + i, ib + rings * W + i, ib + rings * W + i + 1, ob + rings * W + i + 1]);
  const bc = m.verts([[0, 0, 0], [0, base, 0]]);
  for (let i = 0; i < seg; i++) {
    m.face(0, [bc, ob + i + 1, ob + i]);
    m.face(0, [bc + 1, ib + i, ib + i + 1]);
  }
  out(slug, "mug-half.obj", m.toString());

  const room = new Obj("Room scene: floor, two walls, a table, a lamp, a book and a vase");
  room.box("Floor", 0, -0.05, 0, 6, 0.1, 6);
  room.box("Wall_Back", 0, 1.5, -3, 6, 3, 0.1);
  room.box("Wall_Left", -3, 1.5, 0, 0.1, 3, 6);
  room.object("Table");
  room.box(null, 0, 0.75, 0, 1.6, 0.06, 0.9, false);
  for (const [x, z] of [[0.72, 0.38], [-0.72, 0.38], [0.72, -0.38], [-0.72, -0.38]]) room.box(null, x, 0.36, z, 0.06, 0.72, 0.06, false);
  room.object("Lamp");
  room.cylinder(null, 0.5, 0.78, -0.15, 0.1, 0.03, 20);
  room.cylinder(null, 0.5, 0.81, -0.15, 0.015, 0.35, 12);
  room.cylinder(null, 0.5, 1.12, -0.15, 0.16, 0.18, 20, 0.08);
  room.box("Book", -0.35, 0.8, 0.1, 0.32, 0.04, 0.24);
  room.cylinder("Vase", -0.55, 0.78, -0.2, 0.08, 0.26, 20, 0.05);
  out(slug, "room-scene.obj", room.toString());
}

/* ================= Figma ================= */
function figmaFiles() {
  const slug = "figma-interface-design";
  const icon = (id, x, y, inner) => `<g id="${id}" transform="translate(${x} ${y})" fill="none" stroke="#1E2023" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
  const icons = [
    ["icon-home", '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'],
    ["icon-search", '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>'],
    ["icon-user", '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>'],
    ["icon-settings", '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>'],
    ["icon-bell", '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>'],
    ["icon-heart", '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>'],
    ["icon-plus", '<path d="M12 5v14M5 12h14"/>'],
    ["icon-arrow-left", '<path d="M19 12H5M11 6l-6 6 6 6"/>'],
  ];
  const set = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="80" viewBox="0 0 400 80">
<title>Icon set — Shortcut Press practice file</title>
<rect width="400" height="80" fill="#FFFFFF"/>
${icons.map(([id, d], i) => icon(id, 16 + i * 48, 28, d)).join("\n")}
</svg>
`;
  out(slug, "icon-set.svg", set);

  const ui = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="360" viewBox="0 0 420 360" font-family="Arial, Helvetica, sans-serif">
<title>Interface pieces — Shortcut Press practice file</title>
<rect width="420" height="360" fill="#F4F4F1"/>
<g id="button"><rect x="24" y="24" width="140" height="44" rx="10" fill="#3D6600"/><text x="94" y="51" font-size="15" fill="#FFFFFF" text-anchor="middle" font-weight="bold">Sign in</text></g>
<g id="text-field"><text x="24" y="104" font-size="13" fill="#55595F">Email</text><rect x="24" y="112" width="240" height="44" rx="8" fill="#FFFFFF" stroke="#CBCBC4"/><text x="38" y="139" font-size="14" fill="#9A9EA4">name@example.org</text></g>
<g id="card"><rect x="24" y="180" width="240" height="150" rx="14" fill="#FFFFFF" stroke="#E0E0DA"/><rect x="40" y="196" width="208" height="70" rx="8" fill="#E0E0DA"/><text x="40" y="290" font-size="15" fill="#0F1012" font-weight="bold">Card title</text><text x="40" y="312" font-size="13" fill="#55595F">Supporting text</text></g>
<g id="toggle"><rect x="300" y="40" width="52" height="30" rx="15" fill="#3D6600"/><circle cx="337" cy="55" r="11" fill="#FFFFFF"/></g>
</svg>
`;
  out(slug, "ui-pieces.svg", ui);

  const screen = (x, title, inner) => `<g id="${title.toLowerCase().replace(/\s+/g, "-")}"><rect x="${x}" y="20" width="240" height="480" rx="28" fill="#FFFFFF" stroke="#30353C" stroke-width="2"/><text x="${x + 24}" y="76" font-size="20" font-weight="bold" fill="#0F1012">${title}</text>${inner}</g>`;
  const wf = `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="520" viewBox="0 0 560 520" font-family="Arial, Helvetica, sans-serif">
<title>Sign-in wireframe — Shortcut Press practice file</title>
<rect width="560" height="520" fill="#F4F4F1"/>
${screen(20, "Sign in", '<rect x="44" y="110" width="192" height="40" rx="8" fill="#E0E0DA"/><rect x="44" y="164" width="192" height="40" rx="8" fill="#E0E0DA"/><rect x="44" y="230" width="192" height="44" rx="22" fill="#9A9EA4"/><text x="140" y="257" font-size="14" fill="#FFFFFF" text-anchor="middle">Sign in</text><text x="140" y="300" font-size="12" fill="#55595F" text-anchor="middle">Create account</text>')}
${screen(300, "Home", '<rect x="324" y="100" width="192" height="90" rx="12" fill="#E0E0DA"/><rect x="324" y="204" width="192" height="90" rx="12" fill="#E0E0DA"/><rect x="324" y="308" width="192" height="90" rx="12" fill="#E0E0DA"/><rect x="300" y="440" width="240" height="60" fill="#F4F4F1"/><circle cx="360" cy="470" r="10" fill="#9A9EA4"/><circle cx="420" cy="470" r="10" fill="#9A9EA4"/><circle cx="480" cy="470" r="10" fill="#9A9EA4"/>')}
</svg>
`;
  out(slug, "sign-in-wireframe.svg", wf);
}

/* ================= Inkscape ================= */
function inkscapeFiles() {
  const slug = "inkscape-vector-illustration";
  const head = (w, h, title) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" width="${w}mm" height="${h}mm" viewBox="0 0 ${w * 4} ${h * 4}">
<title>${title} — Shortcut Press practice file</title>`;

  out(slug, "shapes-starter.svg", `${head(150, 100, "Shapes starter")}
<g inkscape:groupmode="layer" inkscape:label="Reference" id="reference">
<text x="20" y="40" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#55595F">Build this icon from a circle and eight rounded bars</text>
<g transform="translate(470 220)" fill="none" stroke="#9A9EA4" stroke-width="3" stroke-dasharray="6 6">
<circle r="40"/>
${Array.from({ length: 8 }, (_, i) => `<rect x="-6" y="-92" width="12" height="30" rx="6" transform="rotate(${i * 45})"/>`).join("")}
</g>
<g transform="translate(20 340)">${["#F2C14E", "#E76F51", "#2A9D8F", "#264653", "#E9C46A", "#F4F4F1"].map((c, i) => `<rect x="${i * 50}" y="0" width="40" height="40" rx="6" fill="${c}" stroke="#30353C"/>`).join("")}</g>
</g>
<g inkscape:groupmode="layer" inkscape:label="Your drawing" id="drawing"/>
</svg>
`);

  out(slug, "path-combine.svg", `${head(150, 100, "Shapes to combine")}
<g inkscape:groupmode="layer" inkscape:label="Shapes" id="shapes">
<text x="40" y="40" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#55595F">Union these into a cloud</text>
<rect x="60" y="210" width="200" height="60" rx="30" fill="#9AC2E6" stroke="#30353C" stroke-width="2"/>
<circle cx="110" cy="200" r="48" fill="#9AC2E6" stroke="#30353C" stroke-width="2"/>
<circle cx="175" cy="170" r="62" fill="#9AC2E6" stroke="#30353C" stroke-width="2"/>
<circle cx="230" cy="210" r="40" fill="#9AC2E6" stroke="#30353C" stroke-width="2"/>
<text x="360" y="40" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#55595F">Difference: smaller circle on top</text>
<circle cx="450" cy="210" r="90" fill="#F2C14E" stroke="#30353C" stroke-width="2"/>
<circle cx="495" cy="180" r="80" fill="#264653" stroke="#30353C" stroke-width="2"/>
</g>
</svg>
`);

  out(slug, "sketch-to-trace.svg", `${head(150, 100, "Sketch to trace")}
<g inkscape:groupmode="layer" inkscape:label="Sketch" id="sketch" sodipodi:insensitive="true" opacity="0.45">
<path d="M150 320 C 70 250, 90 120, 190 70 C 260 140, 250 260, 150 320 Z" fill="none" stroke="#7A7F86" stroke-width="2.5"/>
<path d="M150 320 L 150 360 M 152 300 C 170 220, 180 150, 190 80" fill="none" stroke="#7A7F86" stroke-width="2"/>
<path d="M360 150 h 140 v 140 a 30 30 0 0 1 -30 30 h -80 a 30 30 0 0 1 -30 -30 Z M 500 180 c 50 0 50 80 0 80" fill="none" stroke="#7A7F86" stroke-width="2.5"/>
</g>
<g inkscape:groupmode="layer" inkscape:label="Trace here" id="trace"/>
</svg>
`);

  out(slug, "badge-text.svg", `${head(100, 100, "Badge for text on a path")}
<g inkscape:groupmode="layer" inkscape:label="Badge" id="badge">
<circle cx="200" cy="200" r="170" fill="#264653"/>
<circle cx="200" cy="200" r="150" fill="none" stroke="#F4F4F1" stroke-width="3"/>
<circle cx="200" cy="200" r="70" fill="#E9C46A"/>
<path d="M200 140 l 18 38 42 6 -30 29 7 42 -37 -20 -37 20 7 -42 -30 -29 42 -6 Z" fill="#264653"/>
</g>
<g inkscape:groupmode="layer" inkscape:label="Guide" id="guide">
<path id="text-guide" d="M 80 200 A 120 120 0 0 1 320 200" fill="none" stroke="#E76F51" stroke-width="1.5" stroke-dasharray="4 4"/>
</g>
</svg>
`);
}

/* ================= DaVinci Resolve audio ================= */
function resolveAudio() {
  const slug = "davinci-resolve-video-editing";
  const SR = 48000;
  const seconds = 12;
  const n = SR * seconds;
  const L = new Float32Array(n), R = new Float32Array(n);
  const chords = [[220, 277.18, 329.63], [196, 246.94, 293.66], [174.61, 220, 261.63], [196, 246.94, 329.63]];
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const ci = Math.floor(t / 3) % chords.length;
    const local = t % 3;
    const env = Math.min(1, local / 0.4) * Math.min(1, (3 - local) / 0.4);
    let s = 0;
    chords[ci].forEach((f, k) => (s += Math.sin(2 * Math.PI * f * t) * (0.18 - k * 0.03)));
    s += Math.sin(2 * Math.PI * chords[ci][0] * 2 * t) * 0.03;
    L[i] = s * env * 0.9;
    R[i] = s * env * 0.85 + Math.sin(2 * Math.PI * chords[ci][1] * t + 0.4) * 0.02 * env;
  }
  out(slug, "music-bed.wav", wav(L, R, SR));

  const n2 = SR * 8;
  const L2 = new Float32Array(n2), R2 = new Float32Array(n2);
  let seed = 12345;
  const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
  for (let i = 0; i < n2; i++) {
    const t = i / SR;
    const gate = t > 1 && t < 7 ? Math.min(1, (t - 1) / 0.05) * Math.min(1, (7 - t) / 0.05) : 0;
    const tone = Math.sin(2 * Math.PI * 440 * t) * 0.32 * gate * (0.8 + 0.2 * Math.sin(2 * Math.PI * 3 * t));
    const hum = Math.sin(2 * Math.PI * 60 * t) * 0.08 + Math.sin(2 * Math.PI * 120 * t) * 0.03;
    const hiss = rand() * 0.035;
    L2[i] = tone + hum + hiss;
    R2[i] = tone + hum + rand() * 0.035;
  }
  out(slug, "tone-with-hum.wav", wav(L2, R2, SR));
}

/* ================= DaVinci Resolve video (WebCodecs in Edge/Chrome) ================= */
async function resolveVideos() {
  const slug = "davinci-resolve-video-editing";
  const { chromium } = await import("playwright-core");
  let browser;
  for (const channel of ["msedge", "chrome"]) {
    try {
      browser = await chromium.launch({ channel, headless: true });
      break;
    } catch (e) {}
  }
  if (!browser) throw new Error("Microsoft Edge or Google Chrome is needed to encode the practice videos.");
  // WebCodecs needs a secure context, so serve a blank page from localhost.
  const http = await import("node:http");
  const server = http.createServer((req, res) => res.end("<!doctype html><title>encoder</title>"));
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const page = await browser.newPage();
  await page.goto(`http://localhost:${server.address().port}/`);
  await page.addScriptTag({ content: fs.readFileSync(path.join(ROOT, "node_modules/mp4-muxer/build/mp4-muxer.js"), "utf8") });
  await page.addScriptTag({ path: path.join(ROOT, "tools/files/video-encoder.js") });
  for (const kind of ["orbits", "waves", "grid", "warm-dark"]) {
    const b64 = await page.evaluate((k) => window.makeClip(k, 6), kind);
    const name = { orbits: "clip-01-orbits.mp4", waves: "clip-02-waves.mp4", grid: "clip-03-grid.mp4", "warm-dark": "clip-04-warm-dark.mp4" }[kind];
    out(slug, name, Buffer.from(b64, "base64"));
  }
  await browser.close();
  server.close();
}

const only = process.argv[2];
console.log("Generating practice files…");
if (!only || only === "sheets") spreadsheetFiles();
if (!only || only === "pivot") pivotFiles();
if (!only || only === "docs") documentFiles();
if (!only || only === "blender") blenderFiles();
if (!only || only === "figma") figmaFiles();
if (!only || only === "inkscape") inkscapeFiles();
if (!only || only === "resolve" || only === "audio") resolveAudio();
if (!only || only === "resolve" || only === "video") await resolveVideos();
console.log("Done.");
