// Unit tests for js/license.js: generation, validation, error detection, order-linked codes, Library unlocking.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const L = require("../js/license.js");
const CODES = Object.keys(L.PRODUCT_CODES);

test("generated codes have the expected format for every product", () => {
  for (const pc of CODES) {
    for (let i = 0; i < 50; i++) {
      const code = L.generateRandom(pc);
      assert.match(code, /^SCUT-[A-Z2-9]{2}-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{2}$/);
      assert.equal(code.slice(5, 7), pc);
      for (const ch of code.replace(/-/g, "")) assert.ok(!"01OIL".includes(ch), `confusable character ${ch} in ${code}`);
      const v = L.validate(code);
      assert.equal(v.valid, true, code);
      assert.equal(v.productId, L.PRODUCT_CODES[pc]);
    }
  }
});

test("entry ignores case, spaces and dashes", () => {
  const code = L.generateRandom("SF");
  const raw = code.replace(/-/g, "");
  for (const variant of [code.toLowerCase(), raw, raw.toLowerCase(), ` ${raw.slice(0, 8)} ${raw.slice(8)} `, raw.split("").join("-"), code.replace(/-/g, " ")]) {
    const v = L.validate(variant);
    assert.equal(v.valid, true, variant);
    assert.equal(v.code, code);
  }
});

test("every single-character error is rejected", () => {
  const universe = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let checked = 0;
  for (const pc of CODES) {
    for (let n = 0; n < 40; n++) {
      const raw = L.normalize(L.generateRandom(pc));
      for (let pos = 0; pos < raw.length; pos++) {
        for (const ch of universe) {
          if (ch === raw[pos]) continue;
          const bad = raw.slice(0, pos) + ch + raw.slice(pos + 1);
          assert.equal(L.validate(bad).valid, false, `accepted ${bad} (from ${raw})`);
          checked++;
        }
      }
    }
  }
  assert.ok(checked > 150000);
});

test("every swap of two adjacent characters is rejected", () => {
  let checked = 0;
  for (const pc of CODES) {
    for (let n = 0; n < 400; n++) {
      const raw = L.normalize(L.generateRandom(pc));
      for (let pos = 0; pos < raw.length - 1; pos++) {
        if (raw[pos] === raw[pos + 1]) continue;
        const bad = raw.slice(0, pos) + raw[pos + 1] + raw[pos] + raw.slice(pos + 2);
        assert.equal(L.validate(bad).valid, false, `accepted swap ${bad} (from ${raw})`);
        checked++;
      }
    }
  }
  assert.ok(checked > 40000);
});

test("wrong prefix, length, characters and unknown products are rejected", () => {
  const raw = L.normalize(L.generateRandom("DR"));
  assert.equal(L.validate("").valid, false);
  assert.equal(L.validate("ABCD" + raw.slice(4)).valid, false);
  assert.equal(L.validate(raw.slice(0, -1)).valid, false);
  assert.equal(L.validate(raw + "2").valid, false);
  assert.equal(L.validate(raw.slice(0, 7) + "O" + raw.slice(8)).valid, false);
  assert.equal(L.validate("SCUTZZ" + raw.slice(6)).valid, false);
});

test("random section has at least 8 characters and codes are not repeated", () => {
  const seen = new Set();
  for (let i = 0; i < 5000; i++) seen.add(L.generateRandom("FG"));
  assert.equal(seen.size, 5000);
  assert.equal(L.normalize(L.generateRandom("FG")).slice(6, 14).length, 8);
});

test("order-linked codes: same order always gives the same code, different orders differ", async () => {
  for (const pc of CODES) {
    const a = await L.generateFromOrder(pc, "cs_live_a1B2c3D4e5");
    const b = await L.generateFromOrder(pc, "cs_live_a1B2c3D4e5");
    const c = await L.generateFromOrder(pc, "cs_live_a1B2c3D4e6");
    assert.equal(a, b);
    assert.notEqual(a, c);
    assert.equal(L.validate(a).valid, true);
    assert.equal(L.validate(a).productCode, pc);
  }
  const sf = await L.generateFromOrder("SF", "ORDER-1001");
  const pt = await L.generateFromOrder("PT", "ORDER-1001");
  assert.notEqual(sf.slice(8), pt.slice(8));
});

test("a Library code unlocks all seven guides; other codes unlock only their own", () => {
  const lib = L.validate(L.generateRandom("CS"));
  assert.equal(lib.isLibrary, true);
  const unlocked = L.unlocks(lib.productId);
  assert.equal(unlocked.length, 7);
  assert.deepEqual(new Set(unlocked), new Set(Object.values(L.PRODUCT_CODES).filter((id) => id !== "complete-library")));
  assert.deepEqual(L.unlocks("figma-interface-design"), ["figma-interface-design"]);
});
