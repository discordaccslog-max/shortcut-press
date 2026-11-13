/*
  Shortcut Press — a small PDF writer for order confirmations (no libraries).
  Produces a one- or multi-page Letter PDF with Helvetica text and clickable links.
  Works in the browser and in Node (for tests).
*/
(function (root) {
  "use strict";

  var PAGE_W = 612;
  var PAGE_H = 792;
  var MARGIN = 56;

  // WinAnsi mapping for the few non-ASCII characters used on the site.
  var WIN = { "—": 0x97, "–": 0x96, "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "·": 0xb7, "•": 0x95, "…": 0x85, " ": 0x20 };

  function toLatin1(str) {
    var out = "";
    for (var i = 0; i < str.length; i++) {
      var ch = str[i];
      var code = ch.charCodeAt(0);
      if (WIN[ch] !== undefined) out += String.fromCharCode(WIN[ch]);
      else if (code < 256) out += ch;
      else out += "?";
    }
    return out;
  }

  function escapeText(str) {
    return toLatin1(str).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }

  // Approximate Helvetica widths (per 1000 units) for wrapping.
  function charWidth(ch, bold) {
    if (" ,.;:'|!il".indexOf(ch) !== -1) return bold ? 300 : 278;
    if ("fjrt()[]-".indexOf(ch) !== -1) return 333;
    if ("mwMW".indexOf(ch) !== -1) return bold ? 890 : 833;
    if (/[A-Z]/.test(ch)) return bold ? 722 : 667;
    if (/[0-9]/.test(ch)) return 556;
    return bold ? 611 : 556;
  }

  function textWidth(str, size, bold) {
    var w = 0;
    for (var i = 0; i < str.length; i++) w += charWidth(str[i], bold);
    return (w / 1000) * size;
  }

  function wrap(text, size, bold, maxWidth) {
    var words = String(text).split(/\s+/);
    var lines = [];
    var line = "";
    words.forEach(function (word) {
      var test = line ? line + " " + word : word;
      if (textWidth(test, size, bold) > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines.length ? lines : [""];
  }

  /*
    blocks: [{ text, size?, bold?, link?, gap?, color? }]
    color: "muted" for gray text.
  */
  function create(opts) {
    var blocks = opts.blocks || [];
    var maxWidth = PAGE_W - MARGIN * 2;
    var pages = [{ ops: [], links: [] }];
    var y = PAGE_H - MARGIN;

    blocks.forEach(function (b) {
      var size = b.size || 11;
      var leading = size * 1.4;
      if (b.gap) y -= b.gap;
      if (b.rule) {
        if (y < MARGIN + 20) {
          pages.push({ ops: [], links: [] });
          y = PAGE_H - MARGIN;
        }
        pages[pages.length - 1].ops.push("0.8 0.8 0.8 RG 0.75 w " + MARGIN + " " + y.toFixed(2) + " m " + (PAGE_W - MARGIN) + " " + y.toFixed(2) + " l S");
        y -= 10;
        return;
      }
      var lines = wrap(b.text || "", size, !!b.bold, maxWidth);
      lines.forEach(function (ln) {
        if (y - leading < MARGIN) {
          pages.push({ ops: [], links: [] });
          y = PAGE_H - MARGIN;
        }
        y -= leading;
        var page = pages[pages.length - 1];
        var gray = b.color === "muted" ? "0.33 0.35 0.37 rg" : b.link ? "0.16 0.36 0.0 rg" : "0.06 0.06 0.07 rg";
        page.ops.push("BT " + gray + " /" + (b.bold ? "F2" : "F1") + " " + size + " Tf " + MARGIN + " " + y.toFixed(2) + " Td (" + escapeText(ln) + ") Tj ET");
        if (b.link) {
          var w = textWidth(ln, size, !!b.bold);
          page.ops.push("0.16 0.36 0.0 RG 0.6 w " + MARGIN + " " + (y - 2).toFixed(2) + " m " + (MARGIN + w).toFixed(2) + " " + (y - 2).toFixed(2) + " l S");
          page.links.push({ x1: MARGIN, y1: y - 3, x2: MARGIN + w, y2: y + size, url: b.link });
        }
      });
    });

    // Assemble objects
    var objects = [];
    function add(str) {
      objects.push(str);
      return objects.length;
    }
    var catalogId = add(null);
    var pagesId = add(null);
    var f1 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
    var f2 = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
    var pageIds = [];
    pages.forEach(function (pg) {
      var stream = pg.ops.join("\n");
      var contentId = add("<< /Length " + toLatin1(stream).length + " >>\nstream\n" + stream + "\nendstream");
      var annots = pg.links.map(function (lk) {
        return add(
          "<< /Type /Annot /Subtype /Link /Border [0 0 0] /Rect [" +
            [lk.x1, lk.y1, lk.x2, lk.y2].map(function (n) {
              return n.toFixed(2);
            }).join(" ") +
            "] /A << /S /URI /URI (" + escapeText(lk.url) + ") >> >>"
        );
      });
      var pageId = add(
        "<< /Type /Page /Parent " + pagesId + " 0 R /MediaBox [0 0 " + PAGE_W + " " + PAGE_H + "] /Resources << /Font << /F1 " + f1 + " 0 R /F2 " + f2 + " 0 R >> >> /Contents " + contentId + " 0 R" +
          (annots.length ? " /Annots [" + annots.map(function (a) { return a + " 0 R"; }).join(" ") + "]" : "") + " >>"
      );
      pageIds.push(pageId);
    });
    objects[catalogId - 1] = "<< /Type /Catalog /Pages " + pagesId + " 0 R >>";
    objects[pagesId - 1] = "<< /Type /Pages /Kids [" + pageIds.map(function (p) { return p + " 0 R"; }).join(" ") + "] /Count " + pageIds.length + " >>";
    var infoId = add("<< /Title (" + escapeText(opts.title || "Order confirmation") + ") /Producer (Shortcut Press) /CreationDate (D:" + pdfDate(new Date()) + ") >>");

    var out = "%PDF-1.4\n%âãÏÓ\n";
    var offsets = [];
    objects.forEach(function (body, i) {
      offsets.push(out.length);
      out += (i + 1) + " 0 obj\n" + body + "\nendobj\n";
    });
    var xref = out.length;
    out += "xref\n0 " + (objects.length + 1) + "\n0000000000 65535 f \n";
    offsets.forEach(function (o) {
      out += ("0000000000" + o).slice(-10) + " 00000 n \n";
    });
    out += "trailer\n<< /Size " + (objects.length + 1) + " /Root " + catalogId + " 0 R /Info " + infoId + " 0 R >>\nstartxref\n" + xref + "\n%%EOF\n";

    var bytes = new Uint8Array(out.length);
    for (var i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
    return bytes;
  }

  function pdfDate(d) {
    function p(n) {
      return (n < 10 ? "0" : "") + n;
    }
    return d.getUTCFullYear() + p(d.getUTCMonth() + 1) + p(d.getUTCDate()) + p(d.getUTCHours()) + p(d.getUTCMinutes()) + p(d.getUTCSeconds()) + "Z";
  }

  var api = { create: create };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.SPPdf = api;
})(typeof window !== "undefined" ? window : globalThis);
