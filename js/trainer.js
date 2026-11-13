/*
  Shortcut Press — keyboard shortcut trainer.
  Shows an action, the learner presses the shortcut, and the trainer checks it.
  Shortcuts the browser reserves (new tab, reload, developer tools…) are listed
  for reference but not practiced. Esc always leaves the practice area.
*/
(function () {
  "use strict";

  var isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || "");

  var LABELS = {
    ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→",
    Numpad0: "Numpad 0", Numpad1: "Numpad 1", Numpad3: "Numpad 3", Numpad5: "Numpad 5", Numpad7: "Numpad 7", "Numpad.": "Numpad ."
  };

  // Split "Ctrl+Shift+A", "Ctrl++", "Ctrl+-" into parts.
  function parts(keys) {
    if (/\+\+$/.test(keys)) return keys.slice(0, -2).split("+").concat(["+"]);
    return keys.split("+");
  }

  function spec(keys) {
    var p = parts(keys);
    var key = p[p.length - 1];
    var mods = p.slice(0, -1);
    return { key: key, ctrl: mods.indexOf("Ctrl") !== -1, shift: mods.indexOf("Shift") !== -1, alt: mods.indexOf("Alt") !== -1 };
  }

  var SHIFTED = { "*": true, "+": true, "?": true };

  function keyMatches(want, e) {
    if (/^[A-Z]$/.test(want)) return e.code === "Key" + want;
    if (/^[0-9]$/.test(want)) return e.code === "Digit" + want;
    if (/^Numpad[0-9]$/.test(want)) return e.code === want;
    if (want === "Numpad.") return e.code === "NumpadDecimal";
    if (/^F[0-9]{1,2}$/.test(want)) return e.key === want;
    var named = { Space: " ", Tab: "Tab", Enter: "Enter", Home: "Home", End: "End", Delete: "Delete", Backspace: "Backspace", ArrowUp: "ArrowUp", ArrowDown: "ArrowDown", ArrowLeft: "ArrowLeft", ArrowRight: "ArrowRight", Esc: "Escape" };
    if (named[want] !== undefined) return e.key === named[want];
    var codes = { ";": ["Semicolon"], "`": ["Backquote"], "\\": ["Backslash", "IntlBackslash"], "=": ["Equal"], "-": ["Minus", "NumpadSubtract"], "+": ["Equal", "NumpadAdd"], "*": ["Digit8", "NumpadMultiply"], "/": ["Slash", "NumpadDivide"], ".": ["Period"], ",": ["Comma"] };
    if (codes[want]) return codes[want].indexOf(e.code) !== -1 || e.key === want;
    return e.key === want;
  }

  function matches(s, e) {
    var ctrl = isMac ? e.metaKey || e.ctrlKey : e.ctrlKey;
    if (ctrl !== s.ctrl) return false;
    if (e.altKey !== s.alt) return false;
    if (!SHIFTED[s.key] && e.shiftKey !== s.shift) return false;
    return keyMatches(s.key, e);
  }

  function describe(e) {
    var out = [];
    if (e.ctrlKey) out.push("Ctrl");
    if (e.metaKey) out.push(isMac ? "Cmd" : "Meta");
    if (e.altKey) out.push(isMac ? "Option" : "Alt");
    if (e.shiftKey) out.push("Shift");
    var k = e.code && /^Key[A-Z]$/.test(e.code) ? e.code.slice(3) : e.code && /^Digit[0-9]$/.test(e.code) ? e.code.slice(5) : e.key === " " ? "Space" : e.key;
    if (["Control", "Shift", "Alt", "Meta"].indexOf(e.key) === -1) out.push(k);
    return out.join("+");
  }

  function kbdHtml(keys) {
    return parts(keys)
      .map(function (k) {
        var label = LABELS[k] || k;
        if (isMac && k === "Ctrl") label = "⌘";
        if (isMac && k === "Alt") label = "⌥";
        return "<kbd>" + label.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</kbd>";
      })
      .join(" ");
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function Trainer(el, opts) {
    this.el = el;
    this.all = opts.shortcuts || [];
    this.pool = this.all.filter(function (s) { return s.practice !== false; });
    this.order = [];
    this.index = -1;
    this.correct = 0;
    this.attempts = 0;
    this.revealed = false;
    this.build();
  }

  Trainer.prototype.shuffle = function () {
    var o = this.pool.map(function (_, i) { return i; });
    for (var i = o.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = o[i]; o[i] = o[j]; o[j] = t;
    }
    this.order = o;
  };

  Trainer.prototype.build = function () {
    var self = this;
    this.el.classList.add("trainer");
    this.el.innerHTML =
      '<div class="trainer-card">' +
      '<p class="trainer-count" aria-live="polite"></p>' +
      '<div class="trainer-pad" tabindex="0" role="group" data-shortcut-capture aria-roledescription="shortcut practice area" aria-describedby="trainer-instructions">' +
      '<p class="trainer-app"></p><p class="trainer-action">Select Start to practice the shortcuts for this program.</p><p class="trainer-keys" aria-hidden="true"></p>' +
      "</div>" +
      '<p class="trainer-help" id="trainer-instructions">Press the shortcut while the practice area has focus. Press Esc to leave the practice area. On a Mac, use Cmd where a shortcut shows Ctrl.</p>' +
      '<p class="trainer-status" role="status" aria-live="polite"></p>' +
      '<div class="trainer-buttons">' +
      '<button type="button" class="btn btn-primary-soft trainer-start">Start</button>' +
      '<button type="button" class="btn btn-ghost trainer-reveal" disabled>Show the keys</button>' +
      '<button type="button" class="btn btn-ghost trainer-next" disabled>Next shortcut</button>' +
      "</div></div>" +
      '<h3 class="trainer-list-title">All shortcuts in this guide</h3>' +
      '<div class="table-wrap"><table class="trainer-table"><thead><tr><th scope="col">Keys</th><th scope="col">Action</th><th scope="col">Program</th></tr></thead><tbody>' +
      this.all
        .map(function (s) {
          return "<tr><td>" + kbdHtml(s.keys) + "</td><td>" + esc(s.action) + (s.note ? '<span class="trainer-note">' + esc(s.note) + "</span>" : "") + (s.practice === false ? '<span class="trainer-note">Reference only: practice it in the program itself.</span>' : "") + "</td><td>" + esc(s.app) + "</td></tr>";
        })
        .join("") +
      "</tbody></table></div>";

    this.pad = this.el.querySelector(".trainer-pad");
    this.count = this.el.querySelector(".trainer-count");
    this.status = this.el.querySelector(".trainer-status");
    this.actionEl = this.el.querySelector(".trainer-action");
    this.appEl = this.el.querySelector(".trainer-app");
    this.keysEl = this.el.querySelector(".trainer-keys");
    this.startBtn = this.el.querySelector(".trainer-start");
    this.nextBtn = this.el.querySelector(".trainer-next");
    this.revealBtn = this.el.querySelector(".trainer-reveal");

    this.startBtn.addEventListener("click", function () {
      self.shuffle();
      self.index = -1;
      self.correct = 0;
      self.attempts = 0;
      self.next();
      self.pad.focus();
    });
    this.nextBtn.addEventListener("click", function () {
      self.next();
      self.pad.focus();
    });
    this.revealBtn.addEventListener("click", function () {
      self.reveal();
      self.pad.focus();
    });
    // After a correct answer, Enter moves to the next shortcut.
    this.pad.addEventListener("keydown", function (e) {
      if (self.awaitNext && e.key === "Enter") {
        e.preventDefault();
        e.stopImmediatePropagation();
        self.next();
      }
    }, true);
    this.pad.addEventListener("keydown", function (e) { self.onKey(e); });
    this.updateCount();
  };

  Trainer.prototype.current = function () {
    return this.index >= 0 && this.index < this.order.length ? this.pool[this.order[this.index]] : null;
  };

  Trainer.prototype.updateCount = function () {
    var total = this.pool.length;
    this.count.textContent = this.index < 0 ? total + " shortcuts to practice" : "Shortcut " + Math.min(this.index + 1, total) + " of " + total + " · " + this.correct + " correct";
  };

  Trainer.prototype.next = function () {
    this.awaitNext = false;
    this.index++;
    this.revealed = false;
    this.keysEl.innerHTML = "";
    this.setStatus("", "");
    var s = this.current();
    if (!s) {
      this.actionEl.textContent = "Done: " + this.correct + " of " + this.pool.length + " correct on the first try.";
      this.appEl.textContent = "";
      this.startBtn.textContent = "Practice again";
      this.nextBtn.disabled = true;
      this.revealBtn.disabled = true;
      this.updateCount();
      return;
    }
    this.firstTry = true;
    this.actionEl.textContent = s.action;
    this.appEl.textContent = s.app;
    this.nextBtn.disabled = false;
    this.revealBtn.disabled = false;
    this.startBtn.textContent = "Restart";
    this.updateCount();
  };

  Trainer.prototype.reveal = function () {
    var s = this.current();
    if (!s) return;
    this.revealed = true;
    this.firstTry = false;
    this.keysEl.innerHTML = kbdHtml(s.keys);
    this.setStatus("info", "The shortcut is " + s.keys + ". Press it to continue.");
  };

  Trainer.prototype.setStatus = function (kind, text) {
    this.status.className = "trainer-status" + (kind ? " status-msg status-" + kind : "");
    this.status.innerHTML = text ? '<span class="status-icon" aria-hidden="true"></span><span>' + esc(text) + "</span>" : "";
  };

  Trainer.prototype.onKey = function (e) {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      (this.nextBtn.disabled ? this.startBtn : this.nextBtn).focus();
      return;
    }
    if (["Control", "Shift", "Alt", "Meta", "AltGraph", "CapsLock"].indexOf(e.key) !== -1) return;
    var s = this.current();
    if (!s) return;
    var want = spec(s.keys);
    if (e.key === "Tab" && want.key !== "Tab") return; // never trap Tab
    e.preventDefault();
    e.stopPropagation();
    this.attempts++;
    if (matches(want, e)) {
      if (this.firstTry) this.correct++;
      this.keysEl.innerHTML = kbdHtml(s.keys);
      this.setStatus("good", "Correct: " + s.keys + ". Press Enter for the next one.");
      this.updateCount();
      this.awaitNext = true;
    } else {
      this.firstTry = false;
      this.setStatus("bad", "You pressed " + describe(e) + ". Try again, or select Show the keys.");
    }
  };

  window.SPTrainer = {
    mount: function (el, opts) {
      return new Trainer(el, opts);
    },
    _matches: function (keys, e) {
      return matches(spec(keys), e);
    }
  };
})();
