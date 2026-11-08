/*
  Shortcut Press — page behavior.
  Reads js/site-config.js and js/products.js, then:
  - renders the support email wherever the page asks for it
  - renders prices and buy buttons from the product catalog
  - compacts the sticky header on scroll
  - reveals content on scroll (skipped under reduced motion)
*/
(function () {
  "use strict";

  var config = window.SITE_CONFIG || {};
  var catalog = window.SHORTCUT_PRODUCTS || {};
  var root = document.documentElement;
  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function clean(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function formatPrice(amount) {
    var n = Number(amount);
    if (!isFinite(n)) return "";
    return "$" + (n % 1 === 0 ? String(n) : n.toFixed(2));
  }

  function isUsableUrl(url) {
    return /^https?:\/\//i.test(url);
  }

  /* Support email */
  var email = clean(config.supportEmail);

  if (email) {
    document.querySelectorAll("[data-email-link]").forEach(function (slot) {
      var link = document.createElement("a");
      link.href = "mailto:" + email;
      link.textContent = email;
      if (slot.className) link.className = slot.className;
      slot.replaceWith(link);
    });
    document.querySelectorAll("[data-email-block]").forEach(function (block) {
      block.hidden = false;
    });
  }

  /* Prices */
  document.querySelectorAll("[data-price]").forEach(function (el) {
    var product = catalog[el.getAttribute("data-price")];
    if (product && product.price !== undefined) {
      var text = formatPrice(product.price);
      if (text) el.textContent = text;
    }
  });

  /* Buy buttons: rendered only when the product has a checkout URL */
  document.querySelectorAll("[data-buy]").forEach(function (slot) {
    var product = catalog[slot.getAttribute("data-buy")];
    if (!product) return;
    var url = clean(product.checkoutUrl);
    if (!url || !isUsableUrl(url)) return;

    var button = document.createElement("a");
    button.className = "btn btn-primary btn-block";
    button.href = url;
    button.textContent = "Buy now · " + formatPrice(product.price);
    slot.appendChild(button);
  });

  /* Current year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Sticky header compacts after the page scrolls */
  var header = document.querySelector("[data-header]");
  if (header) {
    var ticking = false;
    var update = function () {
      header.classList.toggle("is-compact", window.scrollY > 24);
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  /* Scroll reveals */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var items = document.querySelectorAll(".reveal");
    if (items.length) {
      root.classList.add("reveal-ready");
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      items.forEach(function (item) {
        observer.observe(item);
      });
    }
  }
})();
