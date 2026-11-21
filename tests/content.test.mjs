// Checks every guide's content: structure, quizzes, files, extras and well-formed HTML.
// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { LIBRARY_GUIDES, MORE_GUIDES, loadGuides } from "../tools/guides/index.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "js/products.js"), "utf8"), ctx);
const catalog = ctx.window.SHORTCUT_PRODUCTS;
const guides = await loadGuides([...LIBRARY_GUIDES, ...MORE_GUIDES]);
const L = (await import("../js/license.js")).default;

// Tags must open and close in order (void elements excepted).
function checkHtml(html, where) {
  const VOID = new Set(["br", "img", "input", "hr", "meta", "link", "wbr"]);
  const stack = [];
  for (const m of String(html).matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g)) {
    const [, close, name, selfClose] = m;
    const tag = name.toLowerCase();
    if (VOID.has(tag) || selfClose) continue;
    if (!close) stack.push(tag);
    else {
      const top = stack.pop();
      assert.equal(top, tag, `${where}: </${tag}> closes <${top}>`);
    }
  }
  assert.deepEqual(stack, [], `${where}: unclosed ${stack.join(", ")}`);
  const prose = String(html).replace(/<code>[\s\S]*?<\/code>/g, "");
  assert.ok(!/<\/?[a-z]+›|‹|\$\{/.test(prose), `${where}: stray characters in markup`);
}

function checkLesson(g, l, where) {
  assert.ok(l.id && l.title && l.summary, `${where}: id, title and summary`);
  assert.ok(l.steps.length >= 3, `${where}: at least 3 steps`);
  for (const [i, s] of l.steps.entries()) checkHtml(s.body, `${where} step ${i + 1}`);
  assert.ok(l.quiz.length >= 2, `${where}: at least 2 quiz questions`);
  for (const q of l.quiz) {
    assert.ok(q.answer >= 0 && q.answer < q.options.length, `${where}: quiz answer in range for "${q.q}"`);
    assert.equal(new Set(q.options).size, q.options.length, `${where}: duplicate options in "${q.q}"`);
    checkHtml(q.q + q.explain + q.options.join(""), `${where} quiz`);
  }
  const ex = l.exercise;
  assert.ok(ex && ex.title && ex.task && ex.solution.length >= 3, `${where}: exercise with a worked solution`);
  checkHtml(ex.task, `${where} exercise task`);
  for (const s of ex.solution) checkHtml(s, `${where} solution`);
  for (const f of ex.files || []) assert.ok(g.files.some((x) => x.name === f), `${where}: exercise file ${f} is listed in the guide's files`);
  if (l.diagram) assert.ok(typeof l.diagram.type === "string", `${where}: diagram type`);
}

test("every guide has complete lessons, valid quizzes and well-formed HTML", () => {
  for (const [id, g] of Object.entries(guides)) {
    assert.ok(g.lessons.length >= (MORE_GUIDES.includes(id) ? 6 : 5), `${id}: enough lessons`);
    assert.equal(new Set(g.lessons.map((l) => l.id)).size, g.lessons.length, `${id}: unique lesson ids`);
    for (const l of g.lessons) checkLesson(g, l, `${id}/${l.id}`);
    assert.ok(g.files.length >= 2, `${id}: at least 2 practice files`);
    for (const f of g.files) assert.ok(fs.existsSync(path.join(ROOT, "guides", g.slug, "files", f.name)), `${id}: ${f.name} exists`);
    assert.ok(g.shortcuts.filter((s) => s.practice !== false).length >= 8, `${id}: at least 8 practiceable shortcuts`);
    if (MORE_GUIDES.includes(id)) for (const s of g.shortcuts) if (s.practice === false) assert.ok(s.note, `${id}: ${s.keys} explains why it isn't practiced`);
  }
});

test("every guide sold on its own has 3–4 add-ons at $1–5, each with its content", () => {
  for (const id of MORE_GUIDES.filter((x) => guides[x] && catalog[x])) {
    const p = catalog[id];
    const g = guides[id];
    assert.ok(p, `${id}: in the catalog`);
    assert.ok(L.hasAddons(p.code), `${id}: its product code carries add-ons`);
    assert.equal(L.PRODUCT_CODES[p.code], id, `${id}: product code maps back`);
    assert.ok(p.price >= 20 && p.price <= 145, `${id}: price between $20 and $145`);
    assert.ok(p.addons.length >= 3 && p.addons.length <= 4, `${id}: 3 or 4 add-ons`);
    assert.equal(new Set(p.addons.map((a) => a.id)).size, p.addons.length, `${id}: unique add-on ids`);
    for (const a of p.addons) {
      assert.ok(a.price >= 1 && a.price <= 5 && Number.isInteger(a.price), `${id}/${a.id}: price $1–5`);
      assert.ok(["cheatsheet", "workbook", "flashcards", "project", "quizbank", "practice"].includes(a.kind), `${id}/${a.id}: known kind`);
      if (a.kind === "project") checkLesson(g, g.extras.project, `${id} bonus project`);
      if (a.kind === "quizbank") {
        assert.ok(g.extras.quizbank.length >= 6, `${id}: quiz pack has at least 6 questions`);
        for (const q of g.extras.quizbank) assert.ok(q.answer >= 0 && q.answer < q.options.length, `${id}: quiz pack answer in range`);
      }
      if (a.kind === "practice") {
        assert.ok(g.extras.practice.length >= 3, `${id}: practice pack has at least 3 exercises`);
        for (const ex of g.extras.practice) {
          checkHtml(ex.task + ex.solution.join(""), `${id} practice pack`);
          for (const f of ex.files || []) assert.ok(g.files.some((x) => x.name === f), `${id}: practice file ${f} is listed`);
        }
      }
    }
  }
});

test("product codes are unique and the Library keeps its seven guides", () => {
  const codes = Object.values(catalog).map((p) => p.code);
  assert.equal(new Set(codes).size, codes.length);
  assert.deepEqual([...catalog["complete-library"].includes].sort(), [...LIBRARY_GUIDES].sort());
  assert.equal(L.unlocks("complete-library").length, 7);
});
