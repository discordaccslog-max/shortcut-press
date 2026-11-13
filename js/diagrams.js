/*
  Shortcut Press — original explanatory diagrams for the guides.
  Each renderer returns an SVG string from a small spec. The diagrams are abstract
  and never reproduce any program's interface, logo or icons.
  Runs in the browser (guides) and in Node (product page previews).
*/
(function (root) {
  "use strict";

  var W = 480;
  var H = 240;

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function svg(inner, title, h) {
    var height = h || H;
    return '<svg class="dg" viewBox="0 0 ' + W + " " + height + '" role="img" aria-label="' + esc(title) + '" xmlns="http://www.w3.org/2000/svg"><title>' + esc(title) + "</title>" + inner + "</svg>";
  }

  function text(x, y, s, cls, anchor) {
    return '<text class="' + (cls || "dg-t") + '" x="' + x + '" y="' + y + '"' + (anchor ? ' text-anchor="' + anchor + '"' : "") + ">" + esc(s) + "</text>";
  }

  function rect(x, y, w, h, cls, rx) {
    return '<rect class="' + (cls || "dg-box") + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx == null ? 6 : rx) + '"/>';
  }

  function arrow(x1, y1, x2, y2, cls) {
    var ang = Math.atan2(y2 - y1, x2 - x1);
    var a1 = ang + 2.6;
    var a2 = ang - 2.6;
    var s = 8;
    return '<path class="' + (cls || "dg-arrow") + '" d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '"/>' +
      '<path class="dg-arrowhead" d="M' + x2 + " " + y2 + " L" + (x2 + s * Math.cos(a1)).toFixed(1) + " " + (y2 + s * Math.sin(a1)).toFixed(1) + " L" + (x2 + s * Math.cos(a2)).toFixed(1) + " " + (y2 + s * Math.sin(a2)).toFixed(1) + ' Z"/>';
  }

  function tag(x, y, s, cls) {
    var w = Math.max(40, s.length * 6.6 + 16);
    return rect(x, y, w, 22, cls || "dg-tag", 11) + text(x + w / 2, y + 15, s, "dg-tag-t", "middle");
  }

  /* ---------- spreadsheet grid ---------- */
  function grid(d) {
    var cols = d.cols || ["A", "B", "C", "D", "E"];
    var rows = d.rows || 5;
    var cw = Math.min(88, (W - 60) / cols.length);
    var rh = 26;
    var x0 = 40;
    var y0 = d.note ? 46 : 22;
    var out = "";
    if (d.note) out += tag(x0, 10, d.note, "dg-tag-acc");
    cols.forEach(function (c, i) {
      out += text(x0 + i * cw + cw / 2, y0 + 16, c, "dg-h", "middle");
    });
    for (var r = 1; r <= rows; r++) out += text(x0 - 12, y0 + r * rh + 17, String(r), "dg-h", "middle");
    var hi = d.highlight || {};
    for (r = 1; r <= rows; r++) {
      cols.forEach(function (c, i) {
        var key = c + r;
        var cls = hi[key] === "accent" ? "dg-cell dg-cell-acc" : hi[key] === "soft" ? "dg-cell dg-cell-soft" : hi[key] === "range" ? "dg-cell dg-cell-range" : "dg-cell";
        out += rect(x0 + i * cw, y0 + r * rh, cw, rh, cls, 0);
        var v = d.cells && d.cells[key];
        if (v != null) out += text(x0 + i * cw + 7, y0 + r * rh + 17, v, String(v).charAt(0) === "=" ? "dg-f" : "dg-t");
      });
    }
    (d.arrows || []).forEach(function (a) {
      var p = function (k) {
        var col = cols.indexOf(k.replace(/\d+/g, ""));
        var row = parseInt(k.replace(/\D+/g, ""), 10);
        return [x0 + col * cw + cw / 2, y0 + row * rh + rh / 2];
      };
      var s = p(a[0]);
      var e = p(a[1]);
      out += arrow(s[0], s[1], e[0] - (e[0] > s[0] ? 14 : -14), e[1], "dg-arrow-acc");
    });
    var height = y0 + (rows + 1) * rh + 14;
    return svg(out, d.title || "Spreadsheet diagram", Math.max(height, 120));
  }

  /* ---------- process flow ---------- */
  function flow(d) {
    var nodes = d.nodes || [];
    var n = nodes.length;
    var gap = 22;
    var bw = (W - 20 - gap * (n - 1)) / n;
    var out = "";
    nodes.forEach(function (label, i) {
      var x = 10 + i * (bw + gap);
      var acc = d.highlight === i;
      out += rect(x, 80, bw, 64, acc ? "dg-box dg-box-acc" : "dg-box", 8);
      out += text(x + 10, 102, String(i + 1).padStart(2, "0"), "dg-num");
      var words = String(label).split(" ");
      var line1 = [];
      var line2 = [];
      words.forEach(function (w) {
        if ((line1.join(" ") + " " + w).length <= Math.floor(bw / 7.2) && !line2.length) line1.push(w);
        else line2.push(w);
      });
      out += text(x + 10, 122, line1.join(" "), "dg-t");
      if (line2.length) out += text(x + 10, 137, line2.join(" "), "dg-t");
      if (i < n - 1) out += arrow(x + bw + 3, 112, x + bw + gap - 3, 112);
    });
    if (d.caption) out += text(W / 2, 180, d.caption, "dg-cap", "middle");
    return svg(out, d.title || "Process diagram", 200);
  }

  /* ---------- bar chart ---------- */
  function bars(d) {
    var vals = d.values || [];
    var max = Math.max.apply(null, vals.concat([1]));
    var bw = (W - 80) / vals.length;
    var out = '<path class="dg-axis" d="M40 20 V200 H' + (W - 20) + '"/>';
    vals.forEach(function (v, i) {
      var h = (v / max) * 160;
      var x = 52 + i * bw;
      out += rect(x, 200 - h, bw - 18, h, d.highlight === i ? "dg-bar dg-bar-acc" : "dg-bar", 3);
      if (d.labels) out += text(x + (bw - 18) / 2, 218, d.labels[i], "dg-h", "middle");
      if (d.showValues) out += text(x + (bw - 18) / 2, 194 - h, String(v), "dg-h", "middle");
    });
    return svg(out, d.title || "Bar chart", 230);
  }

  /* ---------- pivot table field layout ---------- */
  function pivot(d) {
    var out = rect(10, 20, 150, 200, "dg-box", 8) + text(22, 42, "Source columns", "dg-h");
    (d.fields || []).forEach(function (f, i) {
      out += rect(22, 54 + i * 30, 126, 22, "dg-chip", 4) + text(30, 69 + i * 30, f, "dg-t");
    });
    var areas = d.areas || {};
    var boxes = [["Filters", areas.filters, 190, 20], ["Columns", areas.columns, 340, 20], ["Rows", areas.rows, 190, 122], ["Values", areas.values, 340, 122]];
    boxes.forEach(function (b) {
      out += rect(b[2], b[3], 130, 98, b[0] === "Values" ? "dg-box dg-box-acc" : "dg-box", 8) + text(b[2] + 12, b[3] + 22, b[0], "dg-h");
      (b[1] || []).forEach(function (f, i) {
        out += rect(b[2] + 12, b[3] + 34 + i * 28, 106, 22, "dg-chip dg-chip-acc", 4) + text(b[2] + 20, b[3] + 49 + i * 28, f, "dg-t");
      });
    });
    out += arrow(160, 120, 186, 120, "dg-arrow-acc");
    return svg(out, d.title || "Pivot table areas", 240);
  }

  /* ---------- document page compositions ---------- */
  function page(d) {
    var v = d.variant || "styles";
    var out = "";
    function sheet(x, y, w, h) {
      return rect(x, y, w, h, "dg-paper", 4);
    }
    function lines(x, y, w, n, gap) {
      var s = "";
      for (var i = 0; i < n; i++) s += rect(x, y + i * (gap || 9), i === n - 1 ? w * 0.6 : w, 4, "dg-line", 2);
      return s;
    }
    if (v === "styles") {
      out += sheet(20, 16, 170, 210) + text(105, 236, "Formatted by hand", "dg-cap", "middle");
      out += rect(36, 34, 110, 10, "dg-ink", 2) + lines(36, 54, 138, 3) + rect(36, 92, 80, 8, "dg-ink", 2) + lines(36, 108, 138, 3) + rect(36, 146, 96, 11, "dg-ink", 2) + lines(36, 166, 138, 4);
      out += sheet(290, 16, 170, 210) + text(375, 236, "Built with styles", "dg-cap", "middle");
      out += rect(306, 34, 110, 10, "dg-acc", 2) + lines(306, 54, 138, 3) + rect(306, 92, 80, 8, "dg-acc", 2) + lines(306, 108, 138, 3) + rect(306, 146, 80, 8, "dg-acc", 2) + lines(306, 162, 138, 4);
      out += tag(196, 60, "Heading 1") + tag(196, 104, "Heading 2") + tag(196, 148, "Normal");
    } else if (v === "headings") {
      var items = [["Heading 1", 0], ["Heading 2", 22], ["Heading 3", 44], ["Heading 2", 22], ["Heading 1", 0], ["Heading 2", 22]];
      items.forEach(function (it, i) {
        var y = 24 + i * 34;
        out += rect(30 + it[1], y, 150 - it[1], 22, it[1] === 0 ? "dg-box dg-box-acc" : "dg-box", 4) + text(40 + it[1], y + 15, it[0], "dg-t");
      });
      out += sheet(270, 16, 190, 210) + text(365, 236, "Outline built from headings", "dg-cap", "middle");
      [0, 14, 28, 14, 0, 14].forEach(function (ind, i) {
        out += rect(286 + ind, 34 + i * 30, 150 - ind, 8, ind === 0 ? "dg-acc" : "dg-ink", 2);
      });
    } else if (v === "toc") {
      out += sheet(20, 16, 190, 210) + text(36, 40, "Contents", "dg-h");
      [["Introduction", 1], ["Methods", 3], ["Results", 6], ["Discussion", 9]].forEach(function (r, i) {
        var y = 64 + i * 32;
        out += text(36, y, r[0], "dg-t") + '<path class="dg-dots" d="M' + (40 + r[0].length * 7) + " " + (y - 3) + " H180\"/>" + text(194, y, String(r[1]), "dg-t", "end");
      });
      out += arrow(220, 120, 262, 120, "dg-arrow-acc");
      out += sheet(270, 16, 190, 210);
      out += rect(286, 34, 110, 10, "dg-acc", 2) + lines(286, 54, 150, 4) + rect(286, 104, 90, 10, "dg-acc", 2) + lines(286, 124, 150, 5);
      out += text(240, 108, "built from", "dg-cap", "middle");
    } else if (v === "layout") {
      out += sheet(30, 16, 150, 200) + '<rect class="dg-margin" x="50" y="36" width="110" height="160"/>' + text(105, 232, "Portrait · margins", "dg-cap", "middle");
      out += sheet(214, 46, 200, 140) + '<rect class="dg-margin" x="232" y="64" width="164" height="104"/>' + text(314, 232, "Landscape section", "dg-cap", "middle");
      out += tag(190, 18, "Section break (next page)", "dg-tag-acc");
      out += rect(62, 22, 86, 6, "dg-line", 2) + text(105, 210, "Header · Footer · Page 1", "dg-h", "middle");
    } else if (v === "template") {
      out += sheet(20, 30, 130, 170) + text(85, 214, "Template (.dotx)", "dg-cap", "middle") + rect(34, 46, 80, 9, "dg-acc", 2) + lines(34, 64, 100, 3) + rect(34, 100, 60, 7, "dg-acc", 2) + lines(34, 114, 100, 3);
      [0, 1, 2].forEach(function (i) {
        var x = 220 + i * 86;
        out += arrow(152, 115, x - 4, 70 + i * 10, "dg-arrow");
        out += sheet(x, 40, 76, 120) + rect(x + 10, 52, 46, 6, "dg-acc", 2) + lines(x + 10, 66, 56, 3, 7);
      });
      out += text(340, 182, "New documents start from the same structure", "dg-cap", "middle");
    }
    return svg(out, d.title || "Document layout diagram", 244);
  }

  /* ---------- 3D mesh concepts ---------- */
  function mesh(d) {
    var v = d.variant || "axes";
    var out = "";
    function cube(cx, cy, s, cls) {
      var h = s * 0.5;
      var p = [[cx, cy - s], [cx + s, cy - h], [cx, cy], [cx - s, cy - h], [cx - s, cy + h], [cx, cy + s], [cx + s, cy + h]];
      var P = function (i) {
        return p[i][0].toFixed(1) + " " + p[i][1].toFixed(1);
      };
      return '<path class="' + (cls || "dg-wire") + '" d="M' + P(0) + " L" + P(1) + " L" + P(2) + " L" + P(3) + " Z M" + P(3) + " L" + P(4) + " L" + P(5) + " L" + P(6) + " L" + P(1) + " M" + P(2) + " L" + P(5) + '"/>';
    }
    if (v === "axes") {
      out += cube(240, 130, 60);
      out += arrow(240, 130, 360, 190, "dg-arrow-x") + text(366, 200, "X", "dg-axis-x");
      out += arrow(240, 130, 140, 186, "dg-arrow-y") + text(126, 198, "Y", "dg-axis-y");
      out += arrow(240, 130, 240, 22, "dg-arrow-z") + text(248, 24, "Z", "dg-axis-z");
      out += text(20, 228, "G move · R rotate · S scale, then X, Y or Z to lock an axis", "dg-cap");
    } else if (v === "select") {
      out += cube(110, 130, 50) + '<circle class="dg-acc-dot" cx="110" cy="80" r="6"/>' + text(110, 218, "Vertex (1)", "dg-cap", "middle");
      out += cube(240, 130, 50) + '<path class="dg-acc-line" d="M240 130 L240 180"/>' + text(240, 218, "Edge (2)", "dg-cap", "middle");
      out += cube(370, 130, 50) + '<path class="dg-acc-face" d="M370 80 L420 105 L370 130 L320 105 Z"/>' + text(370, 218, "Face (3)", "dg-cap", "middle");
    } else if (v === "extrude") {
      out += cube(130, 140, 50) + '<path class="dg-acc-face" d="M130 90 L180 115 L130 140 L80 115 Z"/>' + text(130, 222, "Select a face", "dg-cap", "middle");
      out += arrow(196, 120, 262, 120);
      out += cube(350, 150, 50) + '<path class="dg-wire" d="M300 125 L300 65 L350 40 L400 65 L400 125 M350 90 L350 40"/>' + '<path class="dg-acc-face" d="M350 40 L400 65 L350 90 L300 65 Z"/>' + text(350, 222, "E, then move the mouse", "dg-cap", "middle");
    } else if (v === "loopcut") {
      out += cube(140, 130, 60) + '<path class="dg-acc-line" d="M110 85 L170 115 L170 175 M110 85 L110 145"/>' + text(140, 222, "Ctrl+R adds an edge loop", "dg-cap", "middle");
      out += cube(340, 130, 60) + '<path class="dg-wire-soft" d="M300 104 L380 104"/>' + '<path class="dg-acc-face" d="M340 98 L370 113 L340 128 L310 113 Z"/>' + text(340, 222, "I insets the selected face", "dg-cap", "middle");
    }
    return svg(out, d.title || "3D modeling diagram", 236);
  }

  /* ---------- modifier stack ---------- */
  function stack(d) {
    var items = d.items || [];
    var out = text(30, 28, d.heading || "Modifier stack (top runs first)", "dg-h");
    items.forEach(function (it, i) {
      var y = 40 + i * 46;
      out += rect(30, y, 220, 36, i === d.highlight ? "dg-box dg-box-acc" : "dg-box", 6) + text(44, y + 23, (i + 1) + ". " + it, "dg-t");
      if (i < items.length - 1) out += arrow(140, y + 36, 140, y + 44);
    });
    out += '<path class="dg-wire" d="M330 70 h80 v80 h-80 z"/>' + arrow(262, 110, 316, 110, "dg-arrow-acc") + '<path class="dg-acc-line" d="M330 70 C 330 40, 410 40, 410 70 M330 150 C 330 180, 410 180, 410 150"/>';
    out += text(370, 206, "Original mesh stays editable", "dg-cap", "middle");
    return svg(out, d.title || "Modifier stack", 230);
  }

  /* ---------- three-point lighting (top view) ---------- */
  function lights() {
    var out = '<circle class="dg-box dg-box-acc" cx="240" cy="120" r="34"/>' + text(240, 124, "Subject", "dg-t", "middle");
    out += rect(222, 196, 36, 26, "dg-box", 4) + text(240, 236, "Camera", "dg-cap", "middle") + arrow(240, 194, 240, 160);
    var L = [["Key light", 90, 60, "Brightest, 45° to one side"], ["Fill light", 390, 70, "Softer, opposite side"], ["Rim light", 330, 20, "Behind, outlines the edges"]];
    L.forEach(function (l) {
      out += '<circle class="dg-light" cx="' + l[1] + '" cy="' + l[2] + '" r="12"/>' + arrow(l[1] + (l[1] < 240 ? 14 : -14), l[2] + 8, l[1] < 240 ? 206 : 274, l[2] < 50 ? 92 : 104, "dg-arrow-acc");
      out += text(l[1] + (l[1] < 240 ? -10 : 18), l[2] - 18, l[0], "dg-h", l[1] < 240 ? "start" : "start");
    });
    out += text(20, 230, "Key", "dg-cap") + text(56, 230, "· Fill · Rim", "dg-cap");
    return svg(out, "Three-point lighting seen from above", 244);
  }

  /* ---------- editing timeline ---------- */
  function timeline(d) {
    var v = d.variant || "cut";
    var out = "";
    for (var i = 0; i < 17; i++) out += '<path class="dg-tick" d="M' + (40 + i * 25) + " 20 V" + (i % 4 ? 28 : 34) + '"/>';
    out += text(14, 64, "V2", "dg-h") + text(14, 104, "V1", "dg-h") + text(14, 154, "A1", "dg-h");
    function clip(x, y, w, h, cls, label) {
      return rect(x, y, w, h, cls || "dg-clip", 4) + (label ? text(x + 8, y + h / 2 + 4, label, "dg-t") : "");
    }
    if (v === "cut") {
      out += clip(40, 84, 150, 32, null, "Clip A") + clip(190, 84, 120, 32, "dg-clip dg-clip-acc", "Clip B") + clip(310, 84, 130, 32, null, "Clip C");
      out += clip(40, 132, 400, 40, "dg-clip-audio");
      out += '<path class="dg-playhead" d="M250 14 V190"/>' + text(256, 202, "Playhead", "dg-h");
      out += '<path class="dg-inout" d="M190 76 V124 M310 76 V124"/>' + text(176, 74, "In (I)", "dg-h") + text(300, 74, "Out (O)", "dg-h");
    } else if (v === "trim") {
      out += clip(40, 84, 160, 32, null, "Clip A") + clip(200, 84, 140, 32, "dg-clip dg-clip-acc", "Clip B") + clip(340, 84, 100, 32, null, "Clip C");
      out += arrow(200, 130, 170, 130, "dg-arrow-acc") + text(130, 150, "Ripple trim shortens Clip B", "dg-cap") + text(130, 166, "and later clips move left to close the gap", "dg-cap");
    } else if (v === "transition") {
      out += clip(40, 84, 200, 32, null, "Clip A") + clip(240, 84, 200, 32, null, "Clip B");
      out += '<path class="dg-acc-face" d="M210 84 L270 84 L270 116 L210 116 Z"/>' + text(240, 72, "Cross Dissolve", "dg-h", "middle");
      out += text(40, 150, "Needs handles: unused frames past each clip's edge", "dg-cap");
    } else if (v === "titles") {
      out += clip(120, 44, 180, 32, "dg-clip dg-clip-acc", "Title (V2)") + clip(40, 84, 400, 32, null, "Footage (V1)");
      out += text(40, 150, "Upper tracks appear on top of lower tracks", "dg-cap");
    }
    return svg(out, d.title || "Editing timeline diagram", 214);
  }

  /* ---------- audio and exposure levels ---------- */
  function levels(d) {
    var v = d.variant || "audio";
    var out = "";
    if (v === "audio") {
      out += '<path class="dg-axis" d="M40 20 V200 H460"/>';
      for (var i = 0; i < 70; i++) {
        var amp = Math.abs(Math.sin(i * 0.7) * 50 + Math.sin(i * 0.23) * 30) + (i > 30 && i < 44 ? 30 : 0);
        out += rect(46 + i * 6, 110 - amp / 2, 3, amp, "dg-wave", 1);
      }
      out += '<path class="dg-target" d="M40 60 H460"/>' + text(462, 56, "Peak target", "dg-h", "end");
      out += '<path class="dg-noise" d="M40 108 H460"/>' + text(46, 228, "Keep peaks below the target; reduce the steady background hiss", "dg-cap");
    } else {
      out += rect(40, 30, 400, 150, "dg-box", 6);
      [[0.15, "Shadows"], [0.5, "Midtones"], [0.85, "Highlights"]].forEach(function (s) {
        var x = 40 + s[0] * 400;
        out += '<path class="dg-tick" d="M' + x + ' 30 V180"/>' + text(x, 200, s[1], "dg-h", "middle");
      });
      out += '<path class="dg-curve" d="M40 180 C 160 170, 300 70, 440 40"/>' + '<path class="dg-curve-acc" d="M40 175 C 140 150, 300 60, 440 32"/>';
      out += text(40, 226, "Raise or lower each range separately to balance the image", "dg-cap");
    }
    return svg(out, d.title || "Levels diagram", 236);
  }

  /* ---------- frames and auto layout ---------- */
  function frames(d) {
    var v = d.variant || "autolayout";
    var out = "";
    if (v === "nest") {
      out += rect(30, 20, 180, 200, "dg-frame", 10) + text(36, 14, "Screen frame", "dg-h");
      out += rect(46, 46, 148, 50, "dg-frame-inner", 6) + text(52, 42, "Header", "dg-h");
      out += rect(46, 108, 148, 96, "dg-frame-inner", 6) + text(52, 104, "Content", "dg-h");
      out += text(260, 70, "Frames can contain frames.", "dg-t") + text(260, 92, "Children move with their parent", "dg-t") + text(260, 114, "and can be clipped to its edges.", "dg-t");
    } else if (v === "autolayout") {
      out += rect(40, 20, 170, 200, "dg-frame", 10);
      [40, 96, 152].forEach(function (y, i) {
        out += rect(56, y, 138, 44, i === 2 ? "dg-box dg-box-acc" : "dg-box", 6);
      });
      out += '<path class="dg-measure" d="M200 84 V96 M200 140 V152"/>' + text(204, 94, "gap", "dg-h");
      out += '<path class="dg-measure" d="M40 30 H56"/>' + text(30, 14, "padding", "dg-h");
      out += text(250, 70, "Auto layout (Shift+A):", "dg-h") + text(250, 92, "direction, gap and padding", "dg-t") + text(250, 112, "are set once; adding or removing", "dg-t") + text(250, 132, "items re-flows the stack.", "dg-t");
    } else if (v === "resize") {
      [["Hug", 70], ["Fixed", 110], ["Fill", 170]].forEach(function (r, i) {
        var y = 30 + i * 64;
        out += rect(30, y, 260, 44, "dg-frame", 8) + rect(40, y + 8, r[1], 28, "dg-box dg-box-acc", 6) + text(310, y + 27, r[0] === "Hug" ? "Hug contents" : r[0] === "Fixed" ? "Fixed width" : "Fill container", "dg-t");
      });
    }
    return svg(out, d.title || "Frames and auto layout", 240);
  }

  /* ---------- components ---------- */
  function components() {
    var out = rect(30, 70, 140, 60, "dg-box dg-box-acc", 8) + text(42, 64, "Main component", "dg-h") + text(46, 105, "Button", "dg-t");
    [0, 1, 2].forEach(function (i) {
      var y = 26 + i * 66;
      out += arrow(172, 100, 286, y + 26, "dg-arrow") + rect(290, y, 140, 52, "dg-box", 8) + text(302, y + 31, i === 1 ? "Instance · text override" : "Instance", "dg-t");
    });
    out += text(30, 222, "Edit the main component and every instance updates", "dg-cap");
    return svg(out, "A main component and its instances", 236);
  }

  /* ---------- prototype ---------- */
  function prototype() {
    var out = rect(40, 20, 120, 200, "dg-frame", 12) + text(48, 14, "Sign in", "dg-h") + rect(56, 150, 88, 26, "dg-box dg-box-acc", 13);
    out += rect(320, 20, 120, 200, "dg-frame", 12) + text(328, 14, "Home", "dg-h") + rect(336, 50, 88, 40, "dg-box", 6) + rect(336, 100, 88, 40, "dg-box", 6);
    out += '<path class="dg-noodle" d="M146 163 C 230 163, 230 120, 316 120"/>' + '<circle class="dg-acc-dot" cx="146" cy="163" r="5"/>';
    out += tag(186, 80, "On click → Navigate to");
    out += text(240, 232, "A connection from a button to a screen", "dg-cap", "middle");
    return svg(out, "Prototype connection between two screens", 244);
  }

  /* ---------- bezier paths ---------- */
  function bezier(d) {
    var v = d.variant || "handles";
    var out = "";
    out += '<path class="dg-curve-acc" d="M60 180 C 120 40, 300 40, 420 160"/>';
    out += '<path class="dg-handle" d="M60 180 L120 40 M420 160 L300 40"/>';
    out += '<circle class="dg-handle-dot" cx="120" cy="40" r="5"/><circle class="dg-handle-dot" cx="300" cy="40" r="5"/>';
    out += rect(54, 174, 12, 12, "dg-node", 1) + rect(414, 154, 12, 12, "dg-node", 1);
    if (v === "handles") {
      out += text(128, 36, "Handle", "dg-h") + text(70, 204, "Node", "dg-h") + text(150, 224, "Handles set the direction and depth of the curve", "dg-cap");
    } else {
      out += text(20, 224, "Pen: click for a corner, click and drag for a smooth node", "dg-cap");
      out += '<path class="dg-handle" d="M240 72 L180 72 M240 72 L300 72"/>' + rect(234, 66, 12, 12, "dg-node", 1);
    }
    return svg(out, d.title || "Bezier curve with nodes and handles", 236);
  }

  /* ---------- path operations ---------- */
  function booleans() {
    var ops = [["Union", "u"], ["Difference", "d"], ["Intersection", "i"], ["Exclusion", "x"]];
    var out = "";
    ops.forEach(function (o, i) {
      var cx = 70 + i * 112;
      var id = "clip" + o[1] + Math.round(Math.random() * 1e6);
      if (o[1] === "u") out += '<circle class="dg-shape-acc" cx="' + (cx - 14) + '" cy="100" r="30"/><circle class="dg-shape-acc" cx="' + (cx + 14) + '" cy="100" r="30"/>';
      if (o[1] === "d") out += '<path class="dg-shape-acc" fill-rule="evenodd" d="M' + (cx - 44) + ' 100 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0 Z M' + (cx - 16) + ' 100 a30 30 0 1 1 60 0 a30 30 0 1 1 -60 0 Z"/><circle class="dg-shape-ghost" cx="' + (cx + 14) + '" cy="100" r="30"/>';
      if (o[1] === "i") out += '<defs><clipPath id="' + id + '"><circle cx="' + (cx - 14) + '" cy="100" r="30"/></clipPath></defs><circle class="dg-shape-ghost" cx="' + (cx - 14) + '" cy="100" r="30"/><circle class="dg-shape-ghost" cx="' + (cx + 14) + '" cy="100" r="30"/><circle class="dg-shape-acc" clip-path="url(#' + id + ')" cx="' + (cx + 14) + '" cy="100" r="30"/>';
      if (o[1] === "x") out += '<path class="dg-shape-acc" fill-rule="evenodd" d="M' + (cx - 44) + ' 100 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0 Z M' + (cx - 16) + ' 100 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0 Z"/>';
      out += text(cx, 160, o[0], "dg-t", "middle");
    });
    out += text(240, 196, "Two overlapping shapes, four results", "dg-cap", "middle");
    return svg(out, "Path operations: union, difference, intersection and exclusion", 210);
  }

  /* ---------- export targets ---------- */
  function exportTo(d) {
    var formats = d.formats || [["PNG", "Pixels at a chosen size"], ["SVG", "Scalable, for the web"], ["PDF", "Vector, for print"]];
    var out = rect(30, 60, 140, 110, "dg-paper", 6) + '<circle class="dg-shape-acc" cx="100" cy="115" r="30"/>' + text(100, 190, d.source || "Artwork", "dg-cap", "middle");
    formats.forEach(function (f, i) {
      var y = 24 + i * 66;
      out += arrow(172, 115, 262, y + 24, "dg-arrow") + rect(266, y, 190, 48, "dg-box", 8) + text(280, y + 21, f[0], "dg-h") + text(280, y + 38, f[1], "dg-t");
    });
    return svg(out, d.title || "Export formats", 230);
  }

  /* ---------- two-column comparison ---------- */
  function compare(d) {
    var out = "";
    [d.left, d.right].forEach(function (col, c) {
      var x = 20 + c * 236;
      out += rect(x, 14, 220, 210, c === 1 && d.accentRight ? "dg-box dg-box-acc" : "dg-box", 8) + text(x + 14, 38, col.title, "dg-h");
      (col.items || []).forEach(function (it, i) {
        out += text(x + 14, 66 + i * 26, it, "dg-t");
      });
    });
    return svg(out, d.title || "Comparison", 236);
  }

  /* ---------- dates as serial numbers ---------- */
  function dates() {
    var out = '<path class="dg-axis" d="M30 110 H450"/>';
    [["1 Jan 2025", "45658", 60], ["2 Jan 2025", "45659", 150], ["31 Jan 2025", "45688", 300], ["1 Feb 2025", "45689", 400]].forEach(function (p, i) {
      out += '<path class="dg-tick" d="M' + p[2] + ' 100 V120"/>' + text(p[2], 90, p[0], "dg-h", "middle") + rect(p[2] - 30, 128, 60, 24, i === 2 ? "dg-chip dg-chip-acc" : "dg-chip", 4) + text(p[2], 145, p[1], "dg-f", "middle");
    });
    out += text(30, 196, "A date is a whole number of days; formatting only changes how it looks.", "dg-cap");
    out += text(30, 216, "So =B2-A2 gives the days between two dates.", "dg-cap");
    return svg(out, "Dates stored as serial numbers", 230);
  }

  /* ---------- chart choice ---------- */
  function chartpick() {
    var out = "";
    var cells = [["Compare categories", "bar"], ["Change over time", "line"], ["Part of a whole", "stack"], ["Relationship", "scatter"]];
    cells.forEach(function (c, i) {
      var x = 14 + i * 118;
      out += rect(x, 20, 108, 150, "dg-box", 8);
      if (c[1] === "bar") [50, 80, 36, 64].forEach(function (h, j) { out += rect(x + 14 + j * 22, 150 - h, 14, h, j === 1 ? "dg-bar dg-bar-acc" : "dg-bar", 2); });
      if (c[1] === "line") out += '<path class="dg-curve-acc" d="M' + (x + 12) + " 140 L" + (x + 36) + " 120 L" + (x + 58) + " 126 L" + (x + 80) + " 90 L" + (x + 96) + ' 70"/>';
      if (c[1] === "stack") out += rect(x + 30, 50, 46, 100, "dg-bar", 2) + rect(x + 30, 90, 46, 60, "dg-bar dg-bar-acc", 2) + rect(x + 30, 130, 46, 20, "dg-bar", 2);
      if (c[1] === "scatter") [[20, 130], [34, 118], [46, 112], [58, 96], [70, 92], [84, 70], [92, 76]].forEach(function (p) { out += '<circle class="dg-acc-dot" cx="' + (x + p[0]) + '" cy="' + p[1] + '" r="4"/>'; });
      out += text(x + 54, 192, c[0].split(" ")[0] + " " + (c[0].split(" ")[1] || ""), "dg-h", "middle") + text(x + 54, 208, c[0].split(" ").slice(2).join(" "), "dg-h", "middle");
    });
    return svg(out, "Matching chart types to questions", 222);
  }

  /* ---------- color balance ---------- */
  function color(d) {
    var v = d.variant || "balance";
    var out = "";
    if (v === "balance") {
      out += rect(30, 30, 180, 120, "dg-warm", 6) + text(120, 170, "Warm cast", "dg-cap", "middle");
      out += arrow(220, 90, 262, 90, "dg-arrow-acc");
      out += rect(270, 30, 180, 120, "dg-neutral", 6) + text(360, 170, "Neutral after white balance", "dg-cap", "middle");
      out += text(30, 206, "Something that should be white or gray is used as the neutral reference", "dg-cap");
    } else {
      [0, 1, 2].forEach(function (i) {
        out += rect(30 + i * 150, 40, 130, 90, i === 1 ? "dg-cool" : "dg-neutral", 6) + text(95 + i * 150, 150, "Shot " + (i + 1), "dg-cap", "middle");
      });
      out += arrow(190, 180, 170, 140, "dg-arrow-acc") + text(240, 200, "Match shot 2 to its neighbors", "dg-cap", "middle");
    }
    return svg(out, d.title || "Color correction diagram", 220);
  }

  /* ---------- text on a path / text concepts ---------- */
  function textpath() {
    var out = '<defs><path id="tp-arc" d="M80 170 A160 120 0 0 1 400 170"/></defs>';
    out += '<path class="dg-handle" d="M80 170 A160 120 0 0 1 400 170"/>';
    out += '<text class="dg-big"><textPath href="#tp-arc" startOffset="50%" text-anchor="middle">TEXT FOLLOWS THE PATH</textPath></text>';
    out += text(240, 214, "Text > Put on Path keeps the text editable", "dg-cap", "middle");
    return svg(out, "Text placed along a curved path", 228);
  }

  var renderers = {
    grid: grid,
    flow: flow,
    bars: bars,
    pivot: pivot,
    page: page,
    mesh: mesh,
    stack: stack,
    lights: lights,
    timeline: timeline,
    levels: levels,
    frames: frames,
    components: components,
    prototype: prototype,
    bezier: bezier,
    booleans: booleans,
    export: exportTo,
    compare: compare,
    dates: dates,
    chartpick: chartpick,
    color: color,
    textpath: textpath
  };

  function render(spec) {
    if (!spec || !renderers[spec.type]) return "";
    return renderers[spec.type](spec);
  }

  var api = { render: render, types: Object.keys(renderers) };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.SPDiagrams = api;
})(typeof window !== "undefined" ? window : globalThis);
