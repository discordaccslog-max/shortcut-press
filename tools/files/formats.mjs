// Writers for the practice file formats: ZIP, XLSX, DOCX, OBJ, WAV. No third-party code.
import zlib from "node:zlib";

/* ---------- ZIP ---------- */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// Fixed timestamp (2026-01-01 00:00) so rebuilt files are byte-identical.
const DOS_TIME = 0;
const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1;

export function zip(entries) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const { name, data } of entries) {
    const raw = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8");
    const comp = zlib.deflateRawSync(raw, { level: 9 });
    const nameBuf = Buffer.from(name, "utf8");
    const crc = crc32(raw);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(DOS_TIME, 10);
    local.writeUInt16LE(DOS_DATE, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(comp.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuf, comp);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(DOS_TIME, 12);
    central.writeUInt16LE(DOS_DATE, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(comp.length, 20);
    central.writeUInt32LE(raw.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, nameBuf);
    offset += 30 + nameBuf.length + comp.length;
  }
  const centralBuf = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, centralBuf, end]);
}

const xml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------- XLSX ---------- */

const COLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/*
  sheets: [{ name, rows: [[cell, ...], ...], widths?: [chars...] }]
  cell: number | string | { f: "FORMULA" } | { date: serial } | { pct: number } | null
  The first row is written bold.
*/
export function xlsx(sheets, title) {
  const sheetXml = sheets.map((sheet) => {
    const rows = sheet.rows
      .map((row, r) => {
        const cellsXml = row
          .map((v, c) => {
            if (v === null || v === undefined || v === "") return "";
            const ref = COLS[c] + (r + 1);
            const header = r === 0 ? ' s="2"' : "";
            if (typeof v === "number") return `<c r="${ref}"${header}><v>${v}</v></c>`;
            if (typeof v === "string") return `<c r="${ref}" t="inlineStr"${header}><is><t xml:space="preserve">${xml(v)}</t></is></c>`;
            if (v.f) return `<c r="${ref}"${v.date ? ' s="1"' : v.pct ? ' s="3"' : ""}><f>${xml(v.f)}</f></c>`;
            if (v.date !== undefined) return `<c r="${ref}" s="1"><v>${v.date}</v></c>`;
            if (v.pct !== undefined) return `<c r="${ref}" s="3"><v>${v.pct}</v></c>`;
            return "";
          })
          .join("");
        return `<row r="${r + 1}">${cellsXml}</row>`;
      })
      .join("");
    const widths = sheet.widths || sheet.rows[0].map(() => 16);
    const cols = `<cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("")}</cols>`;
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>${cols}<sheetData>${rows}</sheetData></worksheet>`;
  });

  const entries = [
    {
      name: "[Content_Types].xml",
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`,
    },
    {
      name: "_rels/.rels",
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`,
    },
    { name: "docProps/core.xml", data: coreProps(title) },
    {
      name: "xl/workbook.xml",
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView/></bookViews><sheets>${sheets.map((s, i) => `<sheet name="${xml(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets><calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>`,
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    },
    {
      name: "xl/styles.xml",
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="4"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="14" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="10" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`,
    },
    ...sheetXml.map((d, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, data: d })),
  ];
  return zip(entries);
}

function coreProps(title) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${xml(title || "")}</dc:title><dc:creator>Shortcut Press</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">2026-01-01T00:00:00Z</dcterms:created></cp:coreProperties>`;
}

/* ---------- DOCX ---------- */

/*
  paragraphs: [{ text, bold?, size? (points), italic?, pageBreakBefore? }]
  The drafts are deliberately formatted by hand (bold, sizes) with no styles applied,
  because the guide's exercises replace that with styles.
*/
export function docx(paragraphs, title) {
  const body = paragraphs
    .map((p) => {
      if (p.pageBreak) return `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;
      const rPr = [p.bold ? "<w:b/>" : "", p.italic ? "<w:i/>" : "", p.size ? `<w:sz w:val="${p.size * 2}"/><w:szCs w:val="${p.size * 2}"/>` : ""].join("");
      const pPr = p.spaceAfter !== undefined ? `<w:pPr><w:spacing w:after="${p.spaceAfter * 20}"/></w:pPr>` : "";
      return `<w:p>${pPr}<w:r>${rPr ? `<w:rPr>${rPr}</w:rPr>` : ""}<w:t xml:space="preserve">${xml(p.text)}</w:t></w:r></w:p>`;
    })
    .join("");
  const entries = [
    {
      name: "[Content_Types].xml",
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`,
    },
    {
      name: "_rels/.rels",
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`,
    },
    { name: "docProps/core.xml", data: coreProps(title) },
    {
      name: "word/document.xml",
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body></w:document>`,
    },
  ];
  return zip(entries);
}

/* ---------- OBJ ---------- */

export class Obj {
  constructor(header) {
    this.lines = [`# ${header}`, "# Original practice model by Shortcut Press. Y is up; Blender's OBJ importer converts it to Z up."];
    this.v = 0;
  }
  object(name) {
    this.lines.push(`o ${name}`);
    return this;
  }
  verts(list) {
    const base = this.v;
    list.forEach(([x, y, z]) => this.lines.push(`v ${x.toFixed(4)} ${y.toFixed(4)} ${z.toFixed(4)}`));
    this.v += list.length;
    return base;
  }
  face(base, idx) {
    this.lines.push("f " + idx.map((i) => base + i + 1).join(" "));
  }
  box(name, cx, cy, cz, sx, sy, sz, addObject = true) {
    if (addObject && name) this.object(name);
    const hx = sx / 2, hy = sy / 2, hz = sz / 2;
    const b = this.verts([
      [cx - hx, cy - hy, cz - hz], [cx + hx, cy - hy, cz - hz], [cx + hx, cy + hy, cz - hz], [cx - hx, cy + hy, cz - hz],
      [cx - hx, cy - hy, cz + hz], [cx + hx, cy - hy, cz + hz], [cx + hx, cy + hy, cz + hz], [cx - hx, cy + hy, cz + hz],
    ]);
    [[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [2, 3, 7, 6], [1, 2, 6, 5], [0, 4, 7, 3]].forEach((f) => this.face(b, f));
    return this;
  }
  cylinder(name, cx, cy, cz, r, h, seg = 24, r2 = r) {
    if (name) this.object(name);
    const ring = (y, rr) => Array.from({ length: seg }, (_, i) => [cx + rr * Math.cos((i / seg) * Math.PI * 2), y, cz + rr * Math.sin((i / seg) * Math.PI * 2)]);
    const b = this.verts([...ring(cy, r), ...ring(cy + h, r2)]);
    for (let i = 0; i < seg; i++) {
      const j = (i + 1) % seg;
      this.face(b, [i, i + seg, j + seg, j]);
    }
    this.face(b, Array.from({ length: seg }, (_, i) => i));
    this.face(b, Array.from({ length: seg }, (_, i) => seg + (seg - 1 - i)));
    return this;
  }
  sphere(name, cx, cy, cz, r, seg = 24, rings = 12) {
    if (name) this.object(name);
    const pts = [[cx, cy + r, cz]];
    for (let j = 1; j < rings; j++) {
      const phi = (j / rings) * Math.PI;
      for (let i = 0; i < seg; i++) {
        const th = (i / seg) * Math.PI * 2;
        pts.push([cx + r * Math.sin(phi) * Math.cos(th), cy + r * Math.cos(phi), cz + r * Math.sin(phi) * Math.sin(th)]);
      }
    }
    pts.push([cx, cy - r, cz]);
    const b = this.verts(pts);
    const last = pts.length - 1;
    for (let i = 0; i < seg; i++) this.face(b, [0, 1 + ((i + 1) % seg), 1 + i]);
    for (let j = 0; j < rings - 2; j++) {
      for (let i = 0; i < seg; i++) {
        const a = 1 + j * seg + i, bb = 1 + j * seg + ((i + 1) % seg);
        this.face(b, [a, bb, bb + seg, a + seg]);
      }
    }
    const lastRing = 1 + (rings - 2) * seg;
    for (let i = 0; i < seg; i++) this.face(b, [lastRing + i, lastRing + ((i + 1) % seg), last]);
    return this;
  }
  toString() {
    return this.lines.join("\n") + "\n";
  }
}

/* ---------- WAV ---------- */

export function wav(left, right, sampleRate = 48000) {
  const n = left.length;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 4, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(left[i] * 32767))), 44 + i * 4);
    buf.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(right[i] * 32767))), 46 + i * 4);
  }
  return buf;
}
