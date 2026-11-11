/*
  Shortcut Press — page behavior (vanilla JavaScript, no libraries).

  Reads js/site-config.js, js/products.js and js/search-index.js, then:
  - renders the support email, prices and buy buttons
  - theme toggle (defaults to prefers-color-scheme)
  - command palette (Ctrl+K / Cmd+K) and keyboard shortcuts overlay (?)
  - hero keycaps that react to the visitor's keyboard and play shortcuts when idle
  - bento tile entrances, cursor spotlight and off-screen pausing
  - product page progress line, docs table of contents and reading progress
*/
(function () {
  "use strict";

  var root = document.documentElement;
  var config = window.SITE_CONFIG || {};
  var catalog = window.SHORTCUT_PRODUCTS || {};
  var index = window.SHORTCUT_INDEX || [];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover)").matches;
  var isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || "");

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
    return null;
  }

  function clean(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function formatPrice(amount) {
    var n = Number(amount);
    if (!isFinite(n)) return "";
    return "$" + (n % 1 === 0 ? String(n) : n.toFixed(2));
  }

  function each(selector, fn, scope) {
    Array.prototype.forEach.call((scope || document).querySelectorAll(selector), fn);
  }

  /* ---------- Support email ---------- */

  var email = clean(config.supportEmail);
  if (email) {
    each("[data-email-link]", function (slot) {
      var link = document.createElement("a");
      link.href = "mailto:" + email;
      link.textContent = email;
      if (slot.className) link.className = slot.className;
      slot.replaceWith(link);
    });
    each("[data-email-block]", function (block) {
      block.hidden = false;
    });
  }

  /* ---------- Prices and buy buttons ---------- */

  each("[data-price]", function (el) {
    var product = catalog[el.getAttribute("data-price")];
    if (product && product.price !== undefined) {
      var text = formatPrice(product.price);
      if (text) el.textContent = text;
    }
  });

  var buyButtons = [];

  each("[data-buy]", function (slot) {
    var product = catalog[slot.getAttribute("data-buy")];
    if (!product) return;
    var url = clean(product.checkoutUrl);
    if (!url || !/^https?:\/\//i.test(url)) return;
    var button = document.createElement("a");
    button.className = "btn btn-buy";
    button.href = url;
    button.setAttribute("data-href", url);
    button.textContent = "Buy now · " + formatPrice(product.price);
    slot.appendChild(button);
    buyButtons.push(button);
  });

  /* Terms agreement: shown only when buy buttons exist; buttons stay disabled until it is ticked */
  var agree = document.querySelector("[data-agree]");
  var agreeBox = agree ? agree.querySelector("[data-agree-box]") : null;
  var agreeHint = agree ? agree.querySelector("[data-agree-hint]") : null;
  var barHint = document.querySelector("[data-agree-bar-hint]");

  function syncBuyButtons() {
    var ok = !!(agreeBox && agreeBox.checked);
    buyButtons.forEach(function (button) {
      if (ok) {
        button.href = button.getAttribute("data-href");
        button.removeAttribute("aria-disabled");
        button.removeAttribute("role");
        button.removeAttribute("aria-describedby");
        button.classList.remove("is-disabled");
      } else {
        button.removeAttribute("href");
        button.setAttribute("role", "link");
        button.setAttribute("aria-disabled", "true");
        button.setAttribute("aria-describedby", "agree-hint");
        button.classList.add("is-disabled");
      }
    });
    if (agreeHint) agreeHint.hidden = ok;
    if (barHint) barHint.hidden = ok;
  }

  if (buyButtons.length && agree && agreeBox) {
    agree.hidden = false;
    agreeBox.checked = false;
    agreeBox.addEventListener("change", syncBuyButtons);
    buyButtons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        if (agreeBox.checked) return;
        e.preventDefault();
        agreeBox.focus();
        agreeBox.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
    syncBuyButtons();
  }

  each("[data-year]", function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  each("[data-mod-key]", function (el) {
    el.textContent = isMac ? "⌘" : "Ctrl";
  });

  /* ---------- Theme ---------- */

  var themeMeta = document.querySelectorAll('meta[name="theme-color"]');

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set === "light" || set === "dark") return set;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function syncThemeUi() {
    var theme = currentTheme();
    var next = theme === "dark" ? "light" : "dark";
    each("[data-theme-toggle]", function (btn) {
      btn.setAttribute("aria-label", "Switch to " + next + " theme");
      btn.setAttribute("title", "Switch to " + next + " theme");
    });
    Array.prototype.forEach.call(themeMeta, function (m) {
      m.setAttribute("content", theme === "dark" ? "#08090b" : "#f4f4f1");
      m.removeAttribute("media");
    });
  }

  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    store("sp-theme", next);
    syncThemeUi();
  }

  each("[data-theme-toggle]", function (btn) {
    btn.addEventListener("click", toggleTheme);
  });
  syncThemeUi();

  /* ---------- Dialog helpers ---------- */

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function trapTab(dialog, event) {
    if (event.key !== "Tab") return;
    var items = Array.prototype.filter.call(dialog.querySelectorAll(FOCUSABLE), function (el) {
      return el.offsetParent !== null || el === document.activeElement;
    });
    if (!items.length) {
      event.preventDefault();
      return;
    }
    var first = items[0];
    var last = items[items.length - 1];
    if (items.length === 1) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function setupDialog(dialog) {
    var returnTo = null;
    dialog.addEventListener("keydown", function (e) {
      trapTab(dialog, e);
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", function () {
      if (returnTo && returnTo !== document.body && document.contains(returnTo)) {
        returnTo.focus();
      } else if (document.activeElement && dialog.contains(document.activeElement)) {
        document.activeElement.blur();
      }
      returnTo = null;
    });
    each("[data-close-dialog]", function (btn) {
      btn.addEventListener("click", function () {
        dialog.close();
      });
    }, dialog);
    return {
      open: function (focusEl) {
        if (dialog.open) return;
        returnTo = document.activeElement;
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
        if (focusEl) focusEl.focus();
      },
      close: function () {
        if (dialog.open) dialog.close();
      },
      isOpen: function () {
        return dialog.open;
      }
    };
  }

  function anyDialogOpen() {
    return !!document.querySelector("dialog[open]");
  }

  /* ---------- Shortcuts overlay ---------- */

  var keysDialogEl = document.getElementById("shortcuts");
  var keysDialog = keysDialogEl ? setupDialog(keysDialogEl) : null;
  var singleSwitch = document.querySelector("[data-single-key-switch]");

  function singleKeysOn() {
    return store("sp-single-keys") !== "off";
  }

  function syncSwitch() {
    if (singleSwitch) singleSwitch.setAttribute("aria-checked", singleKeysOn() ? "true" : "false");
  }

  if (singleSwitch) {
    singleSwitch.addEventListener("click", function () {
      store("sp-single-keys", singleKeysOn() ? "off" : "on");
      syncSwitch();
    });
    syncSwitch();
  }

  function openShortcuts() {
    if (!keysDialog) return;
    if (palette) palette.close();
    keysDialog.open(keysDialogEl.querySelector("[data-close-dialog]"));
  }

  each("[data-open-shortcuts]", function (btn) {
    btn.addEventListener("click", openShortcuts);
  });

  /* ---------- Command palette ---------- */

  var palEl = document.getElementById("palette");
  var palette = palEl ? setupDialog(palEl) : null;
  var palInput = palEl ? palEl.querySelector(".pal-input") : null;
  var palList = palEl ? palEl.querySelector(".pal-list") : null;
  var palEmpty = palEl ? palEl.querySelector(".pal-empty") : null;
  var results = [];
  var active = 0;

  var actions = [
    { kind: "Action", title: "Switch light / dark theme", keywords: "theme dark light mode appearance", run: toggleTheme },
    { kind: "Action", title: "Show keyboard shortcuts", keywords: "keys shortcuts help accessibility single-key", run: openShortcuts }
  ];

  function entryMeta(item) {
    if (item.id && catalog[item.id]) return formatPrice(catalog[item.id].price);
    return item.meta || "";
  }

  function fuzzy(query, text) {
    var q = query.toLowerCase().replace(/\s+/g, "");
    var t = text.toLowerCase();
    if (!q) return { score: 0, hits: [] };
    var from = 0;
    var last = -2;
    var score = 0;
    var hits = [];
    for (var i = 0; i < q.length; i++) {
      var at = t.indexOf(q[i], from);
      if (at === -1) return null;
      var s = 1;
      if (at === last + 1) s += 5;
      if (at === 0 || /[\s\-&/(]/.test(t[at - 1])) s += 4;
      score += s;
      hits.push(at);
      last = at;
      from = at + 1;
    }
    if (hits[hits.length - 1] - hits[0] > q.length * 4 + 6) return null;
    return { score: score - t.length * 0.02, hits: hits };
  }

  function keywordMatch(query, text) {
    var words = query.toLowerCase().split(/\s+/).filter(Boolean);
    var t = text.toLowerCase();
    if (!words.length) return null;
    for (var i = 0; i < words.length; i++) {
      if (words[i].length < 2 || t.indexOf(words[i]) === -1) return null;
    }
    return { score: words.join("").length };
  }

  function search(query) {
    var all = index.concat(actions);
    if (!query.trim()) {
      return all
        .filter(function (item) {
          return item.kind !== "FAQ";
        })
        .map(function (item) {
          return { item: item, hits: [] };
        });
    }
    var out = [];
    all.forEach(function (item) {
      var title = fuzzy(query, item.title);
      var extra = title ? null : keywordMatch(query, item.keywords || "");
      if (title) out.push({ item: item, hits: title.hits, score: title.score + 10 });
      else if (extra) out.push({ item: item, hits: [], score: extra.score - 6 });
    });
    out.sort(function (a, b) {
      return b.score - a.score;
    });
    return out.slice(0, 14);
  }

  function highlight(el, text, hits) {
    var set = {};
    hits.forEach(function (h) {
      set[h] = true;
    });
    var run = "";
    var marked = false;
    function flush() {
      if (!run) return;
      if (marked) {
        var m = document.createElement("mark");
        m.textContent = run;
        el.appendChild(m);
      } else {
        el.appendChild(document.createTextNode(run));
      }
      run = "";
    }
    for (var i = 0; i < text.length; i++) {
      var isHit = !!set[i];
      if (isHit !== marked) {
        flush();
        marked = isHit;
      }
      run += text[i];
    }
    flush();
  }

  function setActive(i) {
    if (!results.length) return;
    active = (i + results.length) % results.length;
    each(".pal-opt", function (opt, n) {
      opt.setAttribute("aria-selected", n === active ? "true" : "false");
    }, palList);
    var current = document.getElementById("pal-opt-" + active);
    if (current) {
      palInput.setAttribute("aria-activedescendant", current.id);
      current.scrollIntoView({ block: "nearest" });
    }
  }

  function render() {
    results = search(palInput.value);
    palList.textContent = "";
    results.forEach(function (r, n) {
      var li = document.createElement("li");
      li.className = "pal-opt";
      li.id = "pal-opt-" + n;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", "false");
      var kind = document.createElement("span");
      kind.className = "pal-kind";
      kind.textContent = r.item.kind;
      var title = document.createElement("span");
      title.className = "pal-title";
      highlight(title, r.item.title, r.hits);
      var meta = document.createElement("span");
      meta.className = "pal-meta";
      meta.textContent = entryMeta(r.item);
      li.appendChild(kind);
      li.appendChild(title);
      li.appendChild(meta);
      li.addEventListener("mousemove", function () {
        if (active !== n) setActive(n);
      });
      li.addEventListener("click", function () {
        choose(n);
      });
      palList.appendChild(li);
    });
    palEmpty.hidden = results.length > 0;
    palInput.setAttribute("aria-expanded", results.length ? "true" : "false");
    if (!results.length) palInput.removeAttribute("aria-activedescendant");
    active = 0;
    setActive(0);
  }

  function choose(n) {
    var r = results[n];
    if (!r) return;
    palette.close();
    if (r.item.run) {
      r.item.run();
    } else if (r.item.url) {
      window.location.href = r.item.url;
    }
  }

  function openPalette() {
    if (!palette) return;
    if (keysDialog) keysDialog.close();
    palInput.value = "";
    render();
    palette.open(palInput);
  }

  if (palette) {
    palInput.addEventListener("input", render);
    palInput.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive(active + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive(active - 1);
      } else if (e.key === "Home" && e.ctrlKey) {
        e.preventDefault();
        setActive(0);
      } else if (e.key === "End" && e.ctrlKey) {
        e.preventDefault();
        setActive(results.length - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        choose(active);
      }
    });
    each("[data-open-palette]", function (btn) {
      btn.addEventListener("click", openPalette);
    });
  }

  /* ---------- Global shortcuts ---------- */

  function isTyping(target) {
    if (!target || !target.closest) return false;
    return !!target.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]') || target.isContentEditable;
  }

  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      if (palette && palette.isOpen()) palette.close();
      else openPalette();
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.defaultPrevented || anyDialogOpen() || isTyping(e.target) || !singleKeysOn()) return;
    var unidentified = !e.key || e.key === "Unidentified";
    if (e.key === "?" || (unidentified && e.code === "Slash" && e.shiftKey)) {
      e.preventDefault();
      openShortcuts();
    } else if (e.key === "/") {
      e.preventDefault();
      openPalette();
    } else if (e.key === "t" || e.key === "T") {
      toggleTheme();
    }
  });

  /* ---------- Hero keycaps ---------- */

  var kb = document.querySelector("[data-kb]");
  var kbNow = document.querySelector("[data-kb-now]");

  if (kb) {
    var keyFor = function (code) {
      var map = {
        ShiftRight: "ShiftLeft",
        ControlRight: "ControlLeft",
        MetaLeft: "ControlLeft",
        MetaRight: "ControlLeft",
        AltRight: "AltLeft"
      };
      return kb.querySelector('[data-code="' + (map[code] || code) + '"]');
    };

    var lastUserKey = 0;

    if (!reduceMotion) {
      document.addEventListener("keydown", function (e) {
        if (isTyping(e.target) || anyDialogOpen()) return;
        var key = keyFor(e.code);
        lastUserKey = Date.now();
        if (key) key.classList.add("is-down");
      });
      document.addEventListener("keyup", function (e) {
        var key = keyFor(e.code);
        if (key) key.classList.remove("is-down");
        if (e.key === "Meta" || e.key === "Control") {
          each(".key.is-down", function (k) {
            k.classList.remove("is-down");
          }, kb);
        }
      });
      window.addEventListener("blur", function () {
        each(".key.is-down", function (k) {
          k.classList.remove("is-down");
        }, kb);
      });

      var sequences = [
        { keys: ["ControlLeft", "KeyC"], label: ["Ctrl", "C"], action: "Copy" },
        { keys: ["ControlLeft", "KeyV"], label: ["Ctrl", "V"], action: "Paste" },
        { keys: ["ControlLeft", "KeyZ"], label: ["Ctrl", "Z"], action: "Undo" },
        { keys: ["ControlLeft", "ShiftLeft", "KeyS"], label: ["Ctrl", "Shift", "S"], action: "Save as" },
        { keys: ["ControlLeft", "KeyF"], label: ["Ctrl", "F"], action: "Find" },
        { keys: ["ControlLeft", "KeyB"], label: ["Ctrl", "B"], action: "Bold" },
        { keys: ["ControlLeft", "KeyA"], label: ["Ctrl", "A"], action: "Select all" }
      ];
      var step = 0;
      var visible = true;
      var timers = [];

      var showCaption = function (seq) {
        if (!kbNow) return;
        kbNow.textContent = "";
        seq.label.forEach(function (k) {
          var el = document.createElement("kbd");
          el.textContent = k;
          kbNow.appendChild(el);
        });
        var a = document.createElement("span");
        a.className = "kb-action";
        a.textContent = seq.action;
        kbNow.appendChild(a);
      };

      var later = function (fn, ms) {
        timers.push(setTimeout(fn, ms));
      };

      var play = function () {
        timers = [];
        var idle = Date.now() - lastUserKey > 4000;
        if (!visible || document.hidden || !idle) {
          later(play, 1200);
          return;
        }
        var seq = sequences[step % sequences.length];
        step++;
        showCaption(seq);
        seq.keys.forEach(function (code, i) {
          later(function () {
            var k = keyFor(code);
            if (k) k.classList.add("is-down");
          }, i * 170);
        });
        later(function () {
          seq.keys.forEach(function (code) {
            var k = keyFor(code);
            if (k) k.classList.remove("is-down");
          });
        }, seq.keys.length * 170 + 650);
        later(play, seq.keys.length * 170 + 1700);
      };

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          visible = entries[0].isIntersecting;
        }).observe(kb);
      }
      later(play, 1100);
    }
  }

  /* ---------- Bento tiles ---------- */

  var tiles = document.querySelectorAll(".tile");
  if (tiles.length && "IntersectionObserver" in window) {
    if (!reduceMotion) root.classList.add("bento-ready");
    var tileObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-playing", entry.isIntersecting);
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );
    Array.prototype.forEach.call(tiles, function (tile) {
      tileObserver.observe(tile);
    });
  } else {
    Array.prototype.forEach.call(tiles, function (tile) {
      tile.classList.add("is-playing", "is-in");
    });
  }

  if (canHover && !reduceMotion) {
    Array.prototype.forEach.call(tiles, function (tile) {
      var dots = tile.querySelectorAll(".glow-dot");
      var frame = 0;
      tile.addEventListener("pointermove", function (e) {
        var rect = tile.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(function () {
          Array.prototype.forEach.call(dots, function (dot) {
            dot.style.transform = "translate(" + x + "px, " + y + "px)";
          });
        });
      });
    });
  }

  /* ---------- Scroll-linked progress (product line, reading bar) ---------- */

  var seq = document.querySelector("[data-seq]");
  var seqFill = seq ? seq.querySelector(".seq-fill") : null;
  var seqItems = seq ? seq.querySelectorAll(".seq-item") : [];
  var readBar = document.querySelector(".read-progress span");
  var pending = false;

  function clamp(v) {
    return Math.max(0, Math.min(1, v));
  }

  function updateProgress() {
    pending = false;
    var vh = window.innerHeight;
    if (seq && seqFill) {
      var r = seq.getBoundingClientRect();
      var line = vh * 0.6;
      var p = clamp((line - r.top) / Math.max(1, r.height));
      seqFill.style.transform = "scaleY(" + p.toFixed(4) + ")";
      Array.prototype.forEach.call(seqItems, function (item) {
        var top = item.getBoundingClientRect().top;
        item.classList.toggle("is-active", top < line);
      });
    }
    if (readBar) {
      var max = document.documentElement.scrollHeight - vh;
      readBar.style.transform = "scaleX(" + clamp(max > 0 ? window.scrollY / max : 0).toFixed(4) + ")";
    }
  }

  if (!reduceMotion && (seq || readBar)) {
    window.addEventListener(
      "scroll",
      function () {
        if (!pending) {
          pending = true;
          requestAnimationFrame(updateProgress);
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", updateProgress);
    updateProgress();
  } else if (seq && seqFill) {
    seqFill.style.transform = "scaleY(1)";
    Array.prototype.forEach.call(seqItems, function (item) {
      item.classList.add("is-active");
    });
  }

  /* ---------- Docs: current section in the table of contents ---------- */

  var tocLinks = document.querySelectorAll(".toc-list a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    var headings = [];
    Array.prototype.forEach.call(tocLinks, function (a) {
      var id = decodeURIComponent(a.getAttribute("href").slice(1));
      var h = document.getElementById(id);
      if (h) {
        byId[id] = a;
        headings.push(h);
      }
    });
    var markCurrent = function () {
      var line = window.innerHeight * 0.3;
      var current = headings[0];
      headings.forEach(function (h) {
        if (h.getBoundingClientRect().top < line) current = h;
      });
      Array.prototype.forEach.call(tocLinks, function (a) {
        var on = current && byId[current.id] === a;
        a.classList.toggle("is-current", on);
        if (on) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    };
    var queued = false;
    window.addEventListener(
      "scroll",
      function () {
        if (!queued) {
          queued = true;
          requestAnimationFrame(function () {
            queued = false;
            markCurrent();
          });
        }
      },
      { passive: true }
    );
    markCurrent();
  }

  /* ---------- Text-heavy pages: opacity reveal ---------- */

  var fades = document.querySelectorAll(".fade");
  if (fades.length && !reduceMotion && "IntersectionObserver" in window) {
    root.classList.add("fade-ready");
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    Array.prototype.forEach.call(fades, function (el) {
      fadeObserver.observe(el);
    });
  }

  /* ---------- FAQ: open the question named in the address ---------- */

  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (target && target.tagName === "DETAILS") {
      target.open = true;
      target.scrollIntoView();
    }
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
