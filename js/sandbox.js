/*
  Shortcut Press — in-browser formula sandbox.
  A small grid where learners type values and formulas and see results.
  Formulas are evaluated by fast-formula-parser (MIT, vendor/fast-formula-parser),
  with a few functions added or corrected to match Excel and Google Sheets.
*/
(function () {
  "use strict";

  var COLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var FP = window.FormulaParser;

  function FE(name) {
    var E = FP && FP.FormulaError;
    return E && E[name] ? E[name] : new Error("#" + name);
  }

  function flat(arg) {
    var v = arg && arg.value !== undefined ? arg.value : arg;
    if (Array.isArray(v)) return v.reduce(function (a, row) { return a.concat(Array.isArray(row) ? row : [row]); }, []);
    return [v];
  }

  function scalar(arg) {
    var v = arg && arg.value !== undefined ? arg.value : arg;
    if (Array.isArray(v)) v = Array.isArray(v[0]) ? v[0][0] : v[0];
    return v;
  }

  function isErr(v) {
    return v && typeof v === "object" && typeof v.toString === "function" && /^#/.test(String(v));
  }

  // Criteria such as ">5", "<>Paid", "North", "N*"
  function matcher(criteria) {
    var c = scalar(criteria);
    if (typeof c === "number") return function (v) { return v === c; };
    var s = String(c == null ? "" : c);
    var m = /^(<=|>=|<>|=|<|>)(.*)$/.exec(s);
    var op = m ? m[1] : "=";
    var rhs = m ? m[2] : s;
    var num = rhs !== "" && !isNaN(Number(rhs)) ? Number(rhs) : null;
    if (num !== null && op !== "=" && op !== "<>") {
      return function (v) {
        if (typeof v !== "number") return false;
        if (op === ">") return v > num;
        if (op === "<") return v < num;
        if (op === ">=") return v >= num;
        return v <= num;
      };
    }
    var re = new RegExp("^" + rhs.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$", "i");
    var eq = function (v) {
      if (num !== null && typeof v === "number") return v === num;
      return re.test(String(v == null ? "" : v));
    };
    return op === "<>" ? function (v) { return !eq(v); } : eq;
  }

  function ifsCore(sumRange, pairs) {
    var target = flat(sumRange);
    var keep = target.map(function () { return true; });
    for (var i = 0; i < pairs.length; i += 2) {
      var range = flat(pairs[i]);
      var test = matcher(pairs[i + 1]);
      range.forEach(function (v, j) { if (!test(v)) keep[j] = false; });
    }
    return { target: target, keep: keep };
  }

  var extra = {
    TRIM: function (t) { return String(scalar(t) == null ? "" : scalar(t)).replace(/ +/g, " ").replace(/^ | $/g, ""); },
    SEARCH: function (find, within, start) {
      var s = String(scalar(within)).toLowerCase();
      var f = String(scalar(find)).toLowerCase();
      var from = start ? Number(scalar(start)) - 1 : 0;
      var re = new RegExp(f.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, "."));
      var idx = s.slice(from).search(re);
      if (idx < 0) throw FE("VALUE");
      return idx + from + 1;
    },
    UPPER: function (t) { return String(scalar(t) == null ? "" : scalar(t)).toUpperCase(); },
    SUBSTITUTE: function (t, oldT, newT, nth) {
      var s = String(scalar(t)), o = String(scalar(oldT)), n = String(scalar(newT));
      if (!o) return s;
      if (nth) {
        var k = Number(scalar(nth)), count = 0;
        return s.replace(new RegExp(o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), function (m) { count++; return count === k ? n : m; });
      }
      return s.split(o).join(n);
    },
    VALUE: function (t) {
      var v = scalar(t);
      if (typeof v === "number") return v;
      var n = Number(String(v).replace(/[, ]/g, ""));
      if (isNaN(n)) throw FE("VALUE");
      return n;
    },
    MAX: function () {
      var nums = [].slice.call(arguments).reduce(function (a, x) { return a.concat(flat(x)); }, []).filter(function (v) { return typeof v === "number"; });
      return nums.length ? Math.max.apply(null, nums) : 0;
    },
    MIN: function () {
      var nums = [].slice.call(arguments).reduce(function (a, x) { return a.concat(flat(x)); }, []).filter(function (v) { return typeof v === "number"; });
      return nums.length ? Math.min.apply(null, nums) : 0;
    },
    COUNTA: function () {
      return [].slice.call(arguments).reduce(function (a, x) { return a.concat(flat(x)); }, []).filter(function (v) { return v !== null && v !== undefined && v !== ""; }).length;
    },
    MATCH: function (value, range, type) {
      var v = scalar(value);
      var list = flat(range);
      var t = type === undefined ? 1 : Number(scalar(type));
      if (t === 0) {
        var test = matcher(typeof v === "string" ? "=" + v : v);
        for (var i = 0; i < list.length; i++) if (test(list[i])) return i + 1;
        throw FE("NA");
      }
      var best = -1;
      for (var j = 0; j < list.length; j++) {
        if (t === 1 ? list[j] <= v : list[j] >= v) best = j;
        else break;
      }
      if (best < 0) throw FE("NA");
      return best + 1;
    },
    XLOOKUP: function (value, lookupRange, returnRange, ifNotFound) {
      var v = scalar(value);
      var keys = flat(lookupRange);
      var vals = flat(returnRange);
      var test = matcher(typeof v === "string" ? "=" + v : v);
      for (var i = 0; i < keys.length; i++) if (test(keys[i])) return vals[i];
      if (ifNotFound !== undefined) return scalar(ifNotFound);
      throw FE("NA");
    },
    TEXTJOIN: function (delim, ignoreEmpty) {
      var d = String(scalar(delim));
      var skip = !!scalar(ignoreEmpty);
      var parts = [].slice.call(arguments, 2).reduce(function (a, x) { return a.concat(flat(x)); }, []);
      return parts.filter(function (p) { return !(skip && (p === null || p === undefined || p === "")); }).map(function (p) { return p == null ? "" : String(p); }).join(d);
    },
    SUMIFS: function (sumRange) {
      var r = ifsCore(sumRange, [].slice.call(arguments, 1));
      return r.target.reduce(function (a, v, i) { return a + (r.keep[i] && typeof v === "number" ? v : 0); }, 0);
    },
    COUNTIFS: function () {
      var args = [].slice.call(arguments);
      var r = ifsCore(args[0], args);
      return r.keep.filter(Boolean).length;
    },
    AVERAGEIFS: function (avgRange) {
      var r = ifsCore(avgRange, [].slice.call(arguments, 1));
      var nums = r.target.filter(function (v, i) { return r.keep[i] && typeof v === "number"; });
      if (!nums.length) throw FE("DIV0");
      return nums.reduce(function (a, b) { return a + b; }, 0) / nums.length;
    },
    IFNA: function (value, alt) {
      var v = scalar(value);
      return isErr(v) && String(v) === "#N/A" ? scalar(alt) : v;
    }
  };

  function parseRef(ref) {
    var m = /^\$?([A-Z]+)\$?(\d+)$/.exec(ref);
    return m ? { col: COLS.indexOf(m[1]) + 1, row: parseInt(m[2], 10) } : null;
  }

  function serialToISO(n) {
    var d = new Date(Date.UTC(1899, 11, 30) + Math.round(n) * 86400000);
    return d.toISOString().slice(0, 10);
  }

  function display(v, isDate) {
    if (v === null || v === undefined) return "";
    if (isErr(v)) return String(v);
    if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
    if (typeof v === "number") {
      if (isDate && v > 0 && v < 2958466) return serialToISO(v);
      return String(Number(v.toFixed(10)));
    }
    if (Array.isArray(v)) return display(scalar(v), isDate);
    return String(v);
  }

  function Sandbox(container, spec) {
    this.el = container;
    this.spec = spec || {};
    this.initial = Object.assign({}, this.spec.cells || {});
    this.cells = Object.assign({}, this.initial);
    this.dateCells = this.spec.dateCells || [];
    var maxCol = 4, maxRow = 6;
    var keys = Object.keys(this.cells).concat(this.spec.answer ? [this.spec.answer.cell] : []);
    keys.forEach(function (k) {
      var p = parseRef(k);
      if (p) {
        maxCol = Math.max(maxCol, p.col + 1);
        maxRow = Math.max(maxRow, p.row + 1);
      }
    });
    this.nCols = Math.min(this.spec.cols || maxCol, 12);
    this.nRows = Math.min(this.spec.rows || maxRow, 20);
    this.active = this.spec.answer ? this.spec.answer.cell : "A1";
    this.uid = "sbx" + Math.random().toString(36).slice(2, 8);
    this.build();
  }

  Sandbox.prototype.evaluateAll = function () {
    var self = this;
    var cache = {};
    var stack = {};
    var parser = new FP({
      functions: extra,
      onCell: function (ref) {
        return evalCell(COLS[ref.col - 1] + ref.row);
      },
      onRange: function (ref) {
        var out = [];
        var r2 = Math.min(ref.to.row, self.nRows + 50);
        var c2 = Math.min(ref.to.col, 26);
        for (var r = ref.from.row; r <= r2; r++) {
          var row = [];
          for (var c = ref.from.col; c <= c2; c++) row.push(evalCell(COLS[c - 1] + r));
          out.push(row);
        }
        return out;
      }
    });
    function evalCell(key) {
      if (key in cache) return cache[key];
      var raw = self.cells[key];
      if (raw === undefined || raw === "") return (cache[key] = null);
      if (typeof raw === "string" && raw.charAt(0) === "=") {
        if (stack[key]) return FE("REF");
        stack[key] = true;
        var p = parseRef(key);
        var result;
        try {
          result = parser.parse(raw.slice(1), { sheet: "Sheet1", row: p.row, col: p.col });
          if (Array.isArray(result)) result = scalar(result);
        } catch (e) {
          result = /not implemented/i.test(String(e && e.message)) ? FE("NAME") : isErr(e) ? e : FE("VALUE");
        }
        delete stack[key];
        return (cache[key] = result);
      }
      if (typeof raw === "string" && raw.trim() !== "" && !isNaN(Number(raw))) return (cache[key] = Number(raw));
      return (cache[key] = raw);
    }
    this.values = {};
    for (var r = 1; r <= this.nRows; r++) for (var c = 1; c <= this.nCols; c++) {
      var k = COLS[c - 1] + r;
      this.values[k] = evalCell(k);
    }
    if (this.spec.answer && !(this.spec.answer.cell in this.values)) this.values[this.spec.answer.cell] = evalCell(this.spec.answer.cell);
    this.evalCell = evalCell;
  };

  Sandbox.prototype.build = function () {
    var self = this;
    var a = this.spec.answer;
    this.el.classList.add("sbx");
    this.el.innerHTML =
      '<div class="sbx-bar">' +
      '<label class="sbx-ref" for="' + this.uid + '-in"><span class="visually-hidden">Editing cell </span><span data-sbx-ref>' + this.active + "</span></label>" +
      '<input class="sbx-input" id="' + this.uid + '-in" type="text" autocomplete="off" spellcheck="false" aria-describedby="' + this.uid + '-help">' +
      '<button type="button" class="btn sbx-enter">Enter</button>' +
      "</div>" +
      '<p class="sbx-help" id="' + this.uid + '-help">Select a cell, then type a value or a formula starting with = and press Enter. Arrow keys move between cells; Enter or F2 edits the selected cell.</p>' +
      '<div class="sbx-scroll"><table class="sbx-grid" role="grid" aria-label="Formula sandbox grid"><thead><tr><th scope="col"><span class="visually-hidden">Row</span></th>' +
      COLS.slice(0, this.nCols).split("").map(function (c) { return '<th scope="col">' + c + "</th>"; }).join("") +
      "</tr></thead><tbody></tbody></table></div>" +
      '<div class="sbx-actions">' +
      (a ? '<button type="button" class="btn btn-ghost sbx-check">Check my answer in ' + a.cell + "</button>" : "") +
      '<button type="button" class="btn btn-ghost sbx-reset">Reset the sandbox</button>' +
      "</div>" +
      '<p class="sbx-status" role="status" aria-live="polite"></p>';
    this.input = this.el.querySelector(".sbx-input");
    this.tbody = this.el.querySelector("tbody");
    this.status = this.el.querySelector(".sbx-status");
    this.render();
    this.select(this.active, false);

    this.tbody.addEventListener("click", function (e) {
      var td = e.target.closest("td[data-ref]");
      if (td) self.select(td.getAttribute("data-ref"), true);
    });
    this.tbody.addEventListener("dblclick", function (e) {
      var td = e.target.closest("td[data-ref]");
      if (td) {
        self.select(td.getAttribute("data-ref"), false);
        self.input.focus();
      }
    });
    this.tbody.addEventListener("keydown", function (e) {
      var td = e.target.closest("td[data-ref]");
      if (!td) return;
      var p = parseRef(td.getAttribute("data-ref"));
      var move = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
      if (move) {
        e.preventDefault();
        var c = Math.max(1, Math.min(self.nCols, p.col + move[0]));
        var r = Math.max(1, Math.min(self.nRows, p.row + move[1]));
        self.select(COLS[c - 1] + r, true);
      } else if (e.key === "Enter" || e.key === "F2") {
        e.preventDefault();
        self.input.focus();
        self.input.setSelectionRange(self.input.value.length, self.input.value.length);
      } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        self.commit(td.getAttribute("data-ref"), "");
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        self.input.value = e.key;
        self.input.focus();
      }
    });
    this.input.addEventListener("keydown", function (e) {
      var p = parseRef(self.active);
      if (e.key === "Enter") {
        e.preventDefault();
        self.commit(self.active, self.input.value);
        self.select(COLS[p.col - 1] + Math.min(self.nRows, p.row + 1), true);
      } else if (e.key === "Tab" && !e.shiftKey) {
        self.commit(self.active, self.input.value);
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        self.select(self.active, true);
      }
    });
    this.el.querySelector(".sbx-enter").addEventListener("click", function () {
      self.commit(self.active, self.input.value);
    });
    var check = this.el.querySelector(".sbx-check");
    if (check) check.addEventListener("click", function () { self.check(); });
    this.el.querySelector(".sbx-reset").addEventListener("click", function () {
      self.cells = Object.assign({}, self.initial);
      self.render();
      self.select(self.active, false);
      self.setStatus("", "");
    });
  };

  Sandbox.prototype.render = function () {
    this.evaluateAll();
    var html = "";
    var a = this.spec.answer;
    for (var r = 1; r <= this.nRows; r++) {
      html += '<tr><th scope="row">' + r + "</th>";
      for (var c = 1; c <= this.nCols; c++) {
        var k = COLS[c - 1] + r;
        var v = this.values[k];
        var text = display(v, this.dateCells.indexOf(k) !== -1);
        var cls = [];
        if (isErr(v)) cls.push("sbx-err");
        if (typeof v === "number") cls.push("sbx-num");
        if (a && a.cell === k) cls.push("sbx-target");
        if (r === 1 && v !== null && typeof v === "string") cls.push("sbx-head");
        html += '<td role="gridcell" tabindex="-1" data-ref="' + k + '" class="' + cls.join(" ") + '" aria-label="' + k + (text ? ", " + text.replace(/"/g, "&quot;") : ", empty") + (a && a.cell === k ? ", answer cell" : "") + '">' + text.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</td>";
      }
      html += "</tr>";
    }
    this.tbody.innerHTML = html;
  };

  Sandbox.prototype.select = function (ref, focusCell) {
    this.active = ref;
    var raw = this.cells[ref];
    this.input.value = raw === undefined ? "" : String(raw);
    this.el.querySelector("[data-sbx-ref]").textContent = ref;
    this.input.setAttribute("aria-label", "Value or formula for cell " + ref);
    var tds = this.tbody.querySelectorAll("td");
    for (var i = 0; i < tds.length; i++) {
      var on = tds[i].getAttribute("data-ref") === ref;
      tds[i].classList.toggle("sbx-active", on);
      tds[i].setAttribute("tabindex", on ? "0" : "-1");
      tds[i].setAttribute("aria-selected", on ? "true" : "false");
      if (on && focusCell) tds[i].focus();
    }
  };

  Sandbox.prototype.commit = function (ref, value) {
    var v = String(value);
    if (v === "") delete this.cells[ref];
    else this.cells[ref] = v;
    this.render();
    this.select(ref, false);
  };

  Sandbox.prototype.setStatus = function (kind, text) {
    this.status.className = "sbx-status" + (kind ? " status-msg status-" + kind : "");
    this.status.innerHTML = text ? '<span class="status-icon" aria-hidden="true"></span><span>' + text + "</span>" : "";
  };

  Sandbox.prototype.check = function () {
    var a = this.spec.answer;
    var raw = this.cells[a.cell];
    var v = this.values[a.cell];
    if (raw === undefined || raw === "") return this.setStatus("info", "Cell " + a.cell + " is empty. Select it and type your formula, starting with =.");
    if (typeof raw !== "string" || raw.charAt(0) !== "=") return this.setStatus("bad", "Cell " + a.cell + " holds a typed value. Write a formula starting with = so it calculates the answer.");
    if (isErr(v)) return this.setStatus("bad", "Your formula returns " + String(v) + ". Check the function names, the ranges and any text in quotes.");
    var ok = typeof a.expected === "number" ? typeof v === "number" && Math.abs(v - a.expected) <= (a.tolerance || 1e-9) : String(v) === String(a.expected);
    if (!ok) return this.setStatus("bad", "Not quite: your formula returns " + display(v) + ". Compare it with the steps above and try again.");
    var missing = (a.mustInclude || []).filter(function (s) { return raw.toUpperCase().indexOf(s.toUpperCase()) === -1; });
    if (missing.length) return this.setStatus("info", "The result is right. To make the formula safe to copy down, lock the reference with " + missing.join(" ") + ".");
    this.setStatus("good", "Correct: " + display(v) + ". Compare your formula with the worked solution below.");
  };

  window.SPSandbox = {
    mount: function (el, spec) {
      if (!FP) {
        el.innerHTML = '<p class="small-note">The formula sandbox couldn\'t load. Reload the page to try again.</p>';
        return null;
      }
      return new Sandbox(el, spec);
    },
    _functions: extra
  };
})();
