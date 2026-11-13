/*
  Shortcut Press — order confirmation page (/thank-you/<slug>/).
  Issues the license code, activates it in this browser, shows the order details,
  and offers Copy, Save confirmation (PDF), Print and Open my guide.

  If the payment provider adds an order ID to the address (session_id, order_id,
  order, transaction_id, txn_id or token), the code is derived from it, so the
  same order always produces the same code. Otherwise a random code is issued
  and remembered on this device so reloading the page shows the same code.
*/
(function () {
  "use strict";

  var L = window.SPLicense;
  var Store = window.SPStore;
  var catalog = window.SHORTCUT_PRODUCTS || {};
  var guides = window.SP_GUIDES || {};
  var ROOT = window.SP_ROOT || new URL("../../", location.href).href;
  var root = document.getElementById("confirm-app");
  if (!root || !L || !Store) return;

  var productId = root.getAttribute("data-product");
  var product = catalog[productId];
  var productCode = L.codeForProduct(productId);
  var PARAMS = ["session_id", "order_id", "order", "transaction_id", "txn_id", "token"];

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function orderRef() {
    var q = new URLSearchParams(location.search);
    for (var i = 0; i < PARAMS.length; i++) {
      var v = q.get(PARAMS[i]);
      if (v && v.trim()) return v.trim().slice(0, 200);
    }
    return null;
  }

  function read(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch (e) {
      return null;
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  function issue() {
    var ref = orderRef();
    if (ref) {
      return L.generateFromOrder(productCode, ref).then(function (code) {
        var key = "sp-order-" + code;
        var seen = read(key);
        var issuedAt = (seen && seen.issuedAt) || new Date().toISOString();
        if (!seen) write(key, { issuedAt: issuedAt });
        return { code: code, ref: ref, issuedAt: issuedAt };
      });
    }
    var key = "sp-confirm-" + productId;
    var saved = read(key);
    if (saved && saved.code && L.validate(saved.code).valid && L.validate(saved.code).productId === productId) {
      return Promise.resolve({ code: saved.code, ref: null, issuedAt: saved.issuedAt });
    }
    var fresh = { code: L.generateRandom(productCode), issuedAt: new Date().toISOString() };
    write(key, fresh);
    return Promise.resolve({ code: fresh.code, ref: null, issuedAt: fresh.issuedAt });
  }

  function when(iso) {
    var d = new Date(iso);
    var date = d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    var time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", timeZoneName: "short" });
    return { date: date, time: time, text: date + ", " + time };
  }

  function firstLessonUrl(id) {
    var p = catalog[id];
    var g = guides[id];
    return ROOT + p.guidePath + (g && g.lessons[0] ? "#/lesson/" + g.lessons[0].id + "/0" : "");
  }

  function render(order) {
    var activation = Store.activate(order.code, { orderRef: order.ref });
    var unlocks = L.unlocks(productId);
    var isLib = unlocks.length > 1;
    var t = when(order.issuedAt);
    var openUrl = firstLessonUrl(unlocks[0]);

    root.innerHTML =
      '<div class="cf-head">' +
      '<p class="cf-badge status-msg status-good"><span class="status-icon" aria-hidden="true"></span><span>Order complete</span></p>' +
      "<h1>Your order is complete and your guide" + (isLib ? "s are" : " is") + " ready</h1>" +
      '<p class="lead">' + esc(product.name) + (isLib ? " (all seven guides)" : "") + " has been delivered to you as a license code, and it's already activated in this browser.</p>" +
      "</div>" +
      '<div class="cf-grid">' +
      '<section class="cf-card" aria-labelledby="cf-details">' +
      '<h2 id="cf-details" class="cf-h">Order details</h2>' +
      '<dl class="cf-dl">' +
      "<dt>Product</dt><dd>" + esc(product.name) + "</dd>" +
      "<dt>Date</dt><dd>" + esc(t.date) + "</dd>" +
      "<dt>Time</dt><dd>" + esc(t.time) + "</dd>" +
      (order.ref ? "<dt>Order reference</dt><dd><code>" + esc(order.ref) + "</code></dd>" : "") +
      "<dt>Delivery</dt><dd>License code, shown below and activated in this browser</dd>" +
      "</dl></section>" +
      '<section class="cf-card cf-code-card" aria-labelledby="cf-code-h">' +
      '<h2 id="cf-code-h" class="cf-h">Your license code</h2>' +
      '<p class="cf-code"><code data-cf-code>' + esc(order.code) + "</code></p>" +
      '<div class="cf-actions"><button type="button" class="btn btn-ghost" data-cf-copy>Copy code</button></div>' +
      '<p class="cf-status status-msg status-' + (activation.ok ? "good" : "bad") + '" role="status"><span class="status-icon" aria-hidden="true"></span><span>' +
      (activation.ok ? "Activated in this browser. " + (isLib ? "All seven guides are unlocked." : "Your guide is unlocked.") : "This browser couldn't save the license. Copy the code and add it in My Guides.") +
      "</span></p>" +
      '<p class="small-note">Keep this code. To use your guide' + (isLib ? "s" : "") + " on another device, open My Guides there (bottom-left corner) and enter the same code.</p>" +
      "</section></div>" +
      '<div class="cf-open">' +
      '<a class="btn btn-buy cf-open-btn" href="' + esc(openUrl) + '" data-cf-open>Open my guide</a>' +
      '<button type="button" class="btn btn-ghost" data-cf-pdf>Save confirmation</button>' +
      '<button type="button" class="btn btn-ghost" data-cf-print>Print</button>' +
      "</div>" +
      (isLib
        ? '<section class="cf-card cf-lib" aria-labelledby="cf-lib-h"><h2 id="cf-lib-h" class="cf-h">Your seven guides</h2><ul>' +
          unlocks.map(function (id) { return '<li><a href="' + esc(firstLessonUrl(id)) + '">' + esc(catalog[id].name) + "</a></li>"; }).join("") +
          "</ul></section>"
        : "") +
      '<p class="cf-links small-note">This purchase is covered by the <a href="' + ROOT + 'terms-of-service.html">Terms of Service</a>, <a href="' + ROOT + 'refund-policy.html">Refund Policy</a> and <a href="' + ROOT + 'delivery-policy.html">Delivery Policy</a>. Questions? <a href="' + ROOT + 'contact.html">Contact us</a> with your order number.</p>';

    root.querySelector("[data-cf-copy]").addEventListener("click", function (e) {
      var b = e.currentTarget;
      var done = function (ok) {
        if (!ok) {
          var range = document.createRange();
          range.selectNodeContents(root.querySelector("[data-cf-code]"));
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
        b.textContent = ok ? "Copied" : "Selected: press Ctrl+C to copy";
        setTimeout(function () { b.textContent = "Copy code"; }, 2500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(order.code).then(function () { done(true); }, function () { done(false); });
      else done(false);
    });

    root.querySelector("[data-cf-print]").addEventListener("click", function () {
      window.print();
    });

    root.querySelector("[data-cf-pdf]").addEventListener("click", function () {
      var blocks = [
        { text: "Shortcut Press", size: 18, bold: true },
        { text: "Order confirmation", size: 13, color: "muted" },
        { rule: true, gap: 10 },
        { text: "Order complete. Product delivered.", size: 14, bold: true, gap: 6 },
        { text: "Product: " + product.name + (isLib ? " (all seven guides)" : ""), gap: 6 },
        { text: "Date: " + t.date },
        { text: "Time: " + t.time },
      ];
      if (order.ref) blocks.push({ text: "Order reference: " + order.ref });
      blocks.push(
        { text: "License code: " + order.code, bold: true, gap: 8 },
        { text: "Delivery: license code shown on the confirmation page and activated in the browser used for the purchase.", color: "muted" },
        { text: "Unlocks: " + unlocks.map(function (id) { return catalog[id].name; }).join(", "), color: "muted" },
        { rule: true, gap: 12 },
        { text: "Open your guide", bold: true, gap: 4 },
        { text: openUrl, link: openUrl },
        { text: "To use your guide on another device, open My Guides there and enter the same license code.", color: "muted", gap: 4 },
        { text: "Policies", bold: true, gap: 12 },
        { text: "Terms of Service: " + ROOT + "terms-of-service.html", link: ROOT + "terms-of-service.html" },
        { text: "Refund Policy: " + ROOT + "refund-policy.html", link: ROOT + "refund-policy.html" },
        { text: "Delivery Policy: " + ROOT + "delivery-policy.html", link: ROOT + "delivery-policy.html" },
        { text: "Support: contact us through " + ROOT + "contact.html with your order number.", link: ROOT + "contact.html", gap: 8 }
      );
      var bytes = window.SPPdf.create({ title: "Shortcut Press order confirmation", blocks: blocks });
      var blob = new Blob([bytes], { type: "application/pdf" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "shortcut-press-confirmation-" + product.slug + ".pdf";
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 1000);
    });

    if (window.SPDock) window.SPDock.render();
  }

  issue().then(render).catch(function () {
    root.innerHTML = '<div class="cf-head"><h1>We couldn\'t show your license code</h1><p class="lead">Your browser blocked something this page needs. Reload the page, or contact us through the <a href="' + ROOT + 'contact.html">Contact page</a> with your order number and we\'ll send your code.</p></div>';
  });
})();
