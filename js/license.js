/*
  Shortcut Press — license codes (runs in the browser and in Node for tests).

  Format: SCUT-PP-RRRR-RRRR-KC
    SCUT  fixed prefix
    PP    product code (see PRODUCT_CODES)
    R…    8 random characters (or derived from the payment provider's order ID)
    K     hash character over the product code and random section
    C     check character (weighted sum, modulus 31)

  Alphabet: 31 characters with no 0/O or 1/I/L. Because 31 is prime and every
  weight is between 1 and 30, the check character catches every
  single-character error and every swap of two adjacent characters.
  Entry ignores case, spaces and dashes.
*/
(function (root) {
  "use strict";

  var ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  var MOD = ALPHABET.length; // 31, prime
  var PREFIX = "SCUT";
  var RANDOM_LENGTH = 8;

  var PRODUCT_CODES = {
    SF: "spreadsheet-formulas",
    PT: "pivot-tables-charts",
    DF: "document-formatting",
    BD: "blender-3d-modeling",
    DR: "davinci-resolve-editing",
    FG: "figma-interface-design",
    VX: "inkscape-vector-illustration",
    CS: "complete-library"
  };

  var LIBRARY_CODE = "CS";

  function valueOf(ch) {
    return ALPHABET.indexOf(ch);
  }

  function normalize(input) {
    return String(input == null ? "" : input).toUpperCase().replace(/[\s\-_‐-―]/g, "");
  }

  // Hash character: FNV-1a over the body, reduced to the alphabet.
  function hashChar(body) {
    var h = 0x811c9dc5;
    for (var i = 0; i < body.length; i++) {
      h ^= body.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return ALPHABET[h % MOD];
  }

  // Check character so that sum(position * value) over the whole payload is 0 (mod 31).
  function checkChar(payload) {
    var sum = 0;
    for (var i = 0; i < payload.length; i++) sum += (i + 1) * valueOf(payload[i]);
    var weight = payload.length + 1;
    for (var v = 0; v < MOD; v++) {
      if ((sum + weight * v) % MOD === 0) return ALPHABET[v];
    }
    return ALPHABET[0];
  }

  function weightedOk(payload) {
    var sum = 0;
    for (var i = 0; i < payload.length; i++) {
      var v = valueOf(payload[i]);
      if (v < 0) return false;
      sum += (i + 1) * v;
    }
    return sum % MOD === 0;
  }

  function build(productCode, randomPart) {
    var body = productCode + randomPart;
    var withHash = body + hashChar(body);
    var full = withHash + checkChar(withHash);
    return format(PREFIX + full);
  }

  function format(normalized) {
    var n = normalize(normalized);
    if (n.length !== 4 + 2 + RANDOM_LENGTH + 2) return n;
    return [n.slice(0, 4), n.slice(4, 6), n.slice(6, 10), n.slice(10, 14), n.slice(14, 16)].join("-");
  }

  function randomSection(getRandomValues) {
    var out = "";
    var buf = new Uint8Array(1);
    while (out.length < RANDOM_LENGTH) {
      getRandomValues(buf);
      if (buf[0] < 248) out += ALPHABET[buf[0] % MOD]; // 248 = 8 * 31, avoids bias
    }
    return out;
  }

  function cryptoObj() {
    if (typeof root.crypto !== "undefined" && root.crypto.getRandomValues) return root.crypto;
    if (typeof globalThis !== "undefined" && globalThis.crypto) return globalThis.crypto;
    return null;
  }

  function generateRandom(productCode) {
    if (!PRODUCT_CODES[productCode]) throw new Error("Unknown product code");
    var c = cryptoObj();
    return build(productCode, randomSection(c.getRandomValues.bind(c)));
  }

  // Same order ID and product always give the same code.
  function generateFromOrder(productCode, orderId) {
    if (!PRODUCT_CODES[productCode]) return Promise.reject(new Error("Unknown product code"));
    var c = cryptoObj();
    var data = new TextEncoder().encode(PREFIX + "|" + productCode + "|" + String(orderId).trim());
    return c.subtle.digest("SHA-256", data).then(function (digest) {
      var bytes = new Uint8Array(digest);
      var out = "";
      for (var i = 0; i < bytes.length && out.length < RANDOM_LENGTH; i++) {
        if (bytes[i] < 248) out += ALPHABET[bytes[i] % MOD];
      }
      var j = 0;
      while (out.length < RANDOM_LENGTH) out += ALPHABET[bytes[j++] % MOD];
      return build(productCode, out);
    });
  }

  function validate(input) {
    var n = normalize(input);
    if (!n) return { valid: false, reason: "empty" };
    if (n.indexOf(PREFIX) !== 0) return { valid: false, reason: "prefix" };
    if (n.length !== 16) return { valid: false, reason: "length" };
    var payload = n.slice(4);
    for (var i = 0; i < payload.length; i++) {
      if (valueOf(payload[i]) < 0) return { valid: false, reason: "character" };
    }
    var productCode = payload.slice(0, 2);
    if (!PRODUCT_CODES[productCode]) return { valid: false, reason: "product" };
    if (!weightedOk(payload)) return { valid: false, reason: "check" };
    var body = payload.slice(0, 2 + RANDOM_LENGTH);
    if (hashChar(body) !== payload[2 + RANDOM_LENGTH]) return { valid: false, reason: "check" };
    return {
      valid: true,
      code: format(n),
      productCode: productCode,
      productId: PRODUCT_CODES[productCode],
      isLibrary: productCode === LIBRARY_CODE
    };
  }

  // Product IDs a license unlocks. The Library unlocks all seven guides.
  function unlocks(productId) {
    if (productId === PRODUCT_CODES[LIBRARY_CODE]) {
      return Object.keys(PRODUCT_CODES)
        .filter(function (c) {
          return c !== LIBRARY_CODE;
        })
        .map(function (c) {
          return PRODUCT_CODES[c];
        });
    }
    return [productId];
  }

  function codeForProduct(productId) {
    for (var c in PRODUCT_CODES) if (PRODUCT_CODES[c] === productId) return c;
    return null;
  }

  var api = {
    ALPHABET: ALPHABET,
    PREFIX: PREFIX,
    PRODUCT_CODES: PRODUCT_CODES,
    LIBRARY_CODE: LIBRARY_CODE,
    normalize: normalize,
    format: format,
    validate: validate,
    generateRandom: generateRandom,
    generateFromOrder: generateFromOrder,
    unlocks: unlocks,
    codeForProduct: codeForProduct
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.SPLicense = api;
})(typeof window !== "undefined" ? window : globalThis);
