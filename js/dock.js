/*
  Shortcut Press — the My Guides dock.
  A floating button on every page opens a slide-out panel listing the guides
  activated on this device with their progress, an Add a license field, license
  details, backup export and import, display settings and support contact.
  Also registers the service worker that makes the site work offline.
  Requires js/license.js, js/store.js, js/products.js and js/guides-index.js.
*/
(function () {
  "use strict";

  var script = document.currentScript;
  var ROOT = script ? new URL("../", script.src).href : "/";
  var Store = window.SPStore;
  var L = window.SPLicense;
  var catalog = window.SHORTCUT_PRODUCTS || {};
  var guides = window.SP_GUIDES || {};
  var config = window.SITE_CONFIG || {};
  if (!Store || !L) return;

  window.SP_ROOT = ROOT;

  /* ---------- service worker ---------- */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(ROOT + "sw.js").catch(function () {});
    });
  }

  /* ---------- larger interface setting ---------- */
  function applyUi() {
    if (Store.getSetting("largeUI", false)) document.documentElement.setAttribute("data-ui", "large");
    else document.documentElement.removeAttribute("data-ui");
  }
  applyUi();

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function productName(id) {
    return (catalog[id] && catalog[id].name) || id;
  }

  function guideUrl(id, lesson, step) {
    var p = catalog[id];
    if (!p) return ROOT;
    return ROOT + p.guidePath + (lesson ? "#/lesson/" + lesson + "/" + (step || 0) : "");
  }

  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    } catch (e) {
      return iso;
    }
  }

  var ICON = {
    guides: '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><rect x="3" y="3" width="6" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="11" y="3" width="6" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    close: '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  };

  /* ---------- markup ---------- */
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "dock-btn";
  btn.setAttribute("aria-haspopup", "dialog");
  btn.setAttribute("aria-controls", "dock");
  btn.innerHTML = ICON.guides + '<span class="dock-btn-label">My Guides</span><span class="dock-btn-count" aria-hidden="true"></span>';
  document.body.appendChild(btn);

  var dock = document.createElement("dialog");
  dock.id = "dock";
  dock.className = "dock";
  dock.setAttribute("aria-labelledby", "dock-title");
  dock.innerHTML =
    '<div class="dock-panel">' +
    '<div class="dock-head"><h2 id="dock-title">My Guides</h2><button type="button" class="icon-btn dock-close" aria-label="Close My Guides">' + ICON.close + "</button></div>" +
    '<div class="dock-body">' +
    '<div class="dock-reminder" data-dock-reminder hidden></div>' +
    '<section class="dock-sec" aria-labelledby="dock-guides-h"><h3 id="dock-guides-h" class="dock-h">Your guides on this device</h3><div data-dock-guides></div></section>' +
    '<section class="dock-sec" aria-labelledby="dock-add-h"><h3 id="dock-add-h" class="dock-h">Add a license</h3>' +
    '<form class="dock-add" data-dock-add novalidate>' +
    '<label for="dock-code" class="dock-label">License code</label>' +
    '<div class="dock-add-row"><input id="dock-code" name="code" type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="SCUT-XX-XXXX-XXXX-XX" aria-describedby="dock-code-help dock-add-status">' +
    '<button type="submit" class="btn btn-primary-soft">Add</button></div>' +
    '<p id="dock-code-help" class="dock-help">Enter the code from your order confirmation. Capitals, spaces and dashes don\'t matter. To use a guide on another device, open My Guides there and enter the same code.</p>' +
    '<p id="dock-add-status" class="dock-status" role="status" aria-live="polite"></p>' +
    "</form></section>" +
    '<section class="dock-sec" aria-labelledby="dock-lic-h"><h3 id="dock-lic-h" class="dock-h">License details</h3><div data-dock-licenses></div></section>' +
    '<section class="dock-sec" aria-labelledby="dock-backup-h"><h3 id="dock-backup-h" class="dock-h">Backup</h3>' +
    '<p class="dock-help">Your licenses and progress are stored only in this browser. Export a backup file to keep them safe, and import it on any device.</p>' +
    '<div class="dock-row"><button type="button" class="btn btn-ghost" data-dock-export>Export backup</button><button type="button" class="btn btn-ghost" data-dock-import>Import backup</button><input type="file" accept=".json,application/json" data-dock-file hidden></div>' +
    '<p class="dock-help" data-dock-lastbackup></p>' +
    '<p class="dock-status" data-dock-backup-status role="status" aria-live="polite"></p></section>' +
    '<section class="dock-sec" aria-labelledby="dock-set-h"><h3 id="dock-set-h" class="dock-h">Display</h3>' +
    '<div class="switch-row dock-switch"><div><p class="switch-label" id="dock-large-label">Larger interface</p><p class="switch-desc" id="dock-large-desc">Makes text and controls larger across the site and in the guides.</p></div>' +
    '<button type="button" class="switch" role="switch" aria-checked="false" aria-labelledby="dock-large-label" aria-describedby="dock-large-desc" data-dock-large><span class="switch-on"></span><span class="switch-thumb"></span></button></div></section>' +
    '<section class="dock-sec" aria-labelledby="dock-help-h"><h3 id="dock-help-h" class="dock-h">Help</h3>' +
    '<p class="dock-help">Lost a license or need help? Contact us through the <a href="' + ROOT + 'contact.html">Contact page</a> with your order number.</p>' +
    (config.supportEmail ? '<p class="dock-help">Email: <a href="mailto:' + esc(config.supportEmail) + '">' + esc(config.supportEmail) + "</a></p>" : "") +
    "</section>" +
    "</div></div>";
  document.body.appendChild(dock);

  var guidesEl = dock.querySelector("[data-dock-guides]");
  var licEl = dock.querySelector("[data-dock-licenses]");
  var form = dock.querySelector("[data-dock-add]");
  var input = dock.querySelector("#dock-code");
  var addStatus = dock.querySelector("#dock-add-status");
  var reminder = dock.querySelector("[data-dock-reminder]");
  var largeSwitch = dock.querySelector("[data-dock-large]");
  var backupStatus = dock.querySelector("[data-dock-backup-status]");
  var lastBackupEl = dock.querySelector("[data-dock-lastbackup]");
  var fileInput = dock.querySelector("[data-dock-file]");

  function setStatus(el, kind, text) {
    el.className = (el === addStatus || el === backupStatus ? "dock-status" : "") + (kind ? " status-msg status-" + kind : "");
    el.innerHTML = text ? '<span class="status-icon" aria-hidden="true"></span><span>' + text + "</span>" : "";
  }

  /* ---------- rendering ---------- */
  function render() {
    var unlocked = Store.unlockedGuides();
    btn.querySelector(".dock-btn-count").textContent = unlocked.length ? String(unlocked.length) : "";
    btn.setAttribute("aria-label", "My Guides" + (unlocked.length ? ", " + unlocked.length + " guide" + (unlocked.length === 1 ? "" : "s") : ""));

    if (!unlocked.length) {
      guidesEl.innerHTML = '<p class="dock-empty">No guides on this device yet. Add the license code from your order confirmation below, and your guides will appear here.</p>';
    } else {
      guidesEl.innerHTML =
        '<ul class="dock-guides">' +
        unlocked
          .map(function (id) {
            var g = guides[id];
            var total = g ? g.lessons.length : 0;
            var c = Store.completion(id, total);
            var started = c.last && c.last.lesson;
            var href = started ? guideUrl(id, c.last.lesson, c.last.step) : guideUrl(id);
            var done = c.done === total && total > 0;
            return (
              '<li class="dock-guide">' +
              '<a class="dock-guide-link" href="' + esc(href) + '"><span class="dock-guide-name">' + esc(productName(id)) + "</span>" +
              '<span class="dock-guide-meta"><span class="state-icon ' + (done ? "state-done" : started ? "state-progress" : "state-new") + '" aria-hidden="true"></span>' +
              (done ? "Completed" : c.done + " of " + total + " lessons complete") + " · " + (started ? "Resume" : "Start") + "</span>" +
              '<span class="progress" aria-hidden="true"><span style="transform:scaleX(' + (c.percent / 100).toFixed(3) + ')"></span></span></a></li>'
            );
          })
          .join("") +
        "</ul>";
    }

    var lics = Store.getLicenses();
    if (!lics.length) {
      licEl.innerHTML = '<p class="dock-help">No licenses on this device.</p>';
    } else {
      licEl.innerHTML = lics
        .map(function (l, i) {
          var unlocks = L.unlocks(l.productId);
          return (
            '<details class="dock-lic"><summary><span>' + esc(productName(l.productId)) + '</span><code>' + esc(l.code) + "</code></summary>" +
            '<dl class="dock-lic-dl"><dt>Code</dt><dd><code>' + esc(l.code) + '</code> <button type="button" class="link-btn" data-copy="' + esc(l.code) + '">Copy</button></dd>' +
            "<dt>Unlocks</dt><dd>" + (unlocks.length > 1 ? "All seven guides" : esc(productName(unlocks[0]))) + "</dd>" +
            "<dt>Added</dt><dd>" + esc(fmtDate(l.activatedAt)) + "</dd>" +
            (l.orderRef ? "<dt>Order</dt><dd>" + esc(l.orderRef) + "</dd>" : "") +
            '</dl><button type="button" class="link-btn link-btn-danger" data-remove="' + i + '">Remove from this device</button></details>'
          );
        })
        .join("");
    }

    var last = Store.lastBackupAt();
    lastBackupEl.textContent = last ? "Last backup: " + fmtDate(last) + "." : lics.length ? "No backup made yet." : "";
    if (Store.needsBackupReminder()) {
      reminder.hidden = false;
      reminder.innerHTML = '<span class="status-icon" aria-hidden="true"></span><span>It\'s been more than 30 days since your last backup. Export a backup to keep your licenses and progress safe.</span>';
      reminder.className = "dock-reminder status-msg status-info";
    } else {
      reminder.hidden = true;
    }
    largeSwitch.setAttribute("aria-checked", Store.getSetting("largeUI", false) ? "true" : "false");
  }

  /* ---------- open / close ---------- */
  var returnTo = null;
  function open(focusAdd) {
    render();
    if (!dock.open) {
      returnTo = document.activeElement;
      if (typeof dock.showModal === "function") dock.showModal();
      else dock.setAttribute("open", "");
      document.documentElement.classList.add("dock-open");
    }
    Store.requestPersist();
    (focusAdd ? input : dock.querySelector(".dock-close")).focus();
  }
  function close() {
    if (dock.open) dock.close();
  }
  dock.addEventListener("close", function () {
    document.documentElement.classList.remove("dock-open");
    if (returnTo && returnTo !== document.body && document.contains(returnTo)) returnTo.focus();
    returnTo = null;
  });
  dock.addEventListener("click", function (e) {
    if (e.target === dock) close();
  });
  dock.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var items = Array.prototype.filter.call(dock.querySelectorAll('a[href], button:not([disabled]), input:not([type="file"]), summary'), function (el) {
      return el.offsetParent !== null;
    });
    if (!items.length) return;
    var first = items[0], lastEl = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      first.focus();
    }
  });
  btn.addEventListener("click", function () { open(false); });
  dock.querySelector(".dock-close").addEventListener("click", close);

  /* ---------- actions ---------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var r = Store.activate(input.value);
    if (!r.ok) {
      setStatus(addStatus, "bad", esc(r.message));
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }
    input.removeAttribute("aria-invalid");
    var unlocks = L.unlocks(r.license.productId);
    var target = guideUrl(unlocks[0], guides[unlocks[0]] && guides[unlocks[0]].lessons[0] && guides[unlocks[0]].lessons[0].id, 0);
    setStatus(addStatus, "good", (r.already ? "This license is already on this device: " : "Added: ") + esc(productName(r.license.productId)) + '. <a href="' + esc(target) + '">Open ' + (unlocks.length > 1 ? "your guides" : "the guide") + "</a>");
    input.value = "";
    render();
  });

  licEl.addEventListener("click", function (e) {
    var copy = e.target.closest("[data-copy]");
    if (copy) {
      copyText(copy.getAttribute("data-copy")).then(function (ok) {
        copy.textContent = ok ? "Copied" : "Select and copy the code";
        setTimeout(function () { copy.textContent = "Copy"; }, 2000);
      });
    }
    var rm = e.target.closest("[data-remove]");
    if (rm) {
      var lic = Store.getLicenses()[parseInt(rm.getAttribute("data-remove"), 10)];
      if (lic && window.confirm("Remove " + productName(lic.productId) + " (" + lic.code + ") from this device? Your progress stays saved, and you can add the license again with the same code.")) {
        Store.removeLicense(lic.code);
        render();
        dock.querySelector(".dock-close").focus();
      }
    }
  });

  dock.querySelector("[data-dock-export]").addEventListener("click", function () {
    var data = Store.exportData();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "shortcut-press-backup-" + data.exportedAt.slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 1000);
    setStatus(backupStatus, "good", "Backup exported. Keep the file somewhere safe.");
    render();
  });
  dock.querySelector("[data-dock-import]").addEventListener("click", function () {
    fileInput.click();
  });
  fileInput.addEventListener("change", function () {
    var file = fileInput.files && fileInput.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var r;
      try {
        r = Store.importData(JSON.parse(reader.result));
      } catch (err) {
        r = { ok: false, message: "That file couldn't be read as a Shortcut Press backup." };
      }
      if (r.ok) setStatus(backupStatus, "good", "Backup imported: " + r.licensesAdded + " license" + (r.licensesAdded === 1 ? "" : "s") + " added, progress restored for " + r.guides + " guide" + (r.guides === 1 ? "" : "s") + ".");
      else setStatus(backupStatus, "bad", esc(r.message));
      fileInput.value = "";
      render();
    };
    reader.readAsText(file);
  });

  largeSwitch.addEventListener("click", function () {
    Store.setSetting("largeUI", !Store.getSetting("largeUI", false));
    applyUi();
    render();
  });

  window.addEventListener("sp:store", function () {
    applyUi();
    if (dock.open) render();
    else btn.querySelector(".dock-btn-count").textContent = Store.unlockedGuides().length || "";
  });

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return false; });
    }
    return Promise.resolve(false);
  }

  render();
  window.SPDock = { open: open, close: close, render: render, copyText: copyText, guideUrl: guideUrl, root: ROOT };

  // Buttons elsewhere on the page that open the dock, and the notice shown on a
  // product page when someone arrives from a guide without a license.
  Array.prototype.forEach.call(document.querySelectorAll("[data-open-dock]"), function (b) {
    b.addEventListener("click", function () { open(true); });
  });
  if (/[?&]license=required\b/.test(location.search)) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-license-note]"), function (n) { n.hidden = false; });
  }
})();
