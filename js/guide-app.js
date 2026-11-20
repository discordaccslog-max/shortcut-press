/*
  Shortcut Press — guide reader.
  Runs on /guides/<slug>/ pages. Checks the license on this device, then shows
  the guide's lessons (lesson list on the left, current step on the right),
  quizzes, exercises with worked solutions, practice files, the formula sandbox
  and the shortcut trainer. Progress is saved in this browser only.
*/
(function () {
  "use strict";

  var Store = window.SPStore;
  var L = window.SPLicense;
  var catalog = window.SHORTCUT_PRODUCTS || {};
  var config = window.SITE_CONFIG || {};
  var ROOT = window.SP_ROOT || new URL("../../", location.href).href;
  var app = document.getElementById("guide-app");
  if (!app || !Store) return;

  var mode = app.getAttribute("data-mode");
  var guideId = app.getAttribute("data-guide");
  var product = catalog[guideId];

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function stripTags(s) {
    return String(s).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
  }

  /* ---------- access ---------- */
  if (!Store.hasAccess(guideId)) {
    location.replace(ROOT + (product ? product.page : "") + "?license=required");
    return;
  }
  document.documentElement.classList.add("guide-unlocked");

  // Offline use: guides aren't precached, so once the service worker controls this
  // page, fetch the guide's page and content through it to store them.
  (function warmCache() {
    if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
    var urls = [location.href.split("#")[0]];
    if (mode !== "hub" && product) urls.push(ROOT + product.guidePath + "content.js");
    var go = function () {
      urls.forEach(function (u) { fetch(u, { credentials: "same-origin" }).catch(function () {}); });
    };
    if (navigator.serviceWorker.controller) go();
    else navigator.serviceWorker.addEventListener("controllerchange", go, { once: true });
  })();

  /* ---------- library hub ---------- */
  if (mode === "hub") {
    var all = window.SP_GUIDES || {};
    var lib = catalog["complete-library"];
    app.innerHTML =
      '<main id="main" class="container gd-hub"><p class="label"><span class="label-num">Your library</span></p><h1>' + esc(lib.name) + "</h1>" +
      '<p class="lead">Your license unlocks all seven guides. Open any of them; progress is saved separately for each guide in this browser.</p>' +
      '<ul class="gd-hub-list">' +
      (lib.includes || [])
        .map(function (id) {
          var g = all[id];
          var p = catalog[id];
          var c = Store.completion(id, g ? g.lessons.length : 0);
          var href = ROOT + p.guidePath + (c.last ? "#/lesson/" + c.last.lesson + "/" + c.last.step : "");
          return '<li class="gd-hub-item"><a href="' + esc(href) + '"><span class="gd-hub-name">' + esc(p.name) + '</span><span class="gd-hub-meta"><span class="state-icon ' + (c.done === c.total && c.total ? "state-done" : c.last ? "state-progress" : "state-new") + '" aria-hidden="true"></span>' + c.done + " of " + c.total + " lessons complete · " + (c.last ? "Resume" : "Start") + '</span><span class="progress" aria-hidden="true"><span style="transform:scaleX(' + (c.percent / 100).toFixed(3) + ')"></span></span></a></li>';
        })
        .join("") +
      "</ul></main>";
    return;
  }

  var G = window.SP_GUIDE;
  if (!G) {
    app.innerHTML = '<div class="container gd-error"><h1>This guide couldn\'t load</h1><p>Check your connection and reload the page.</p></div>';
    return;
  }
  var lessons = G.lessons;
  var addons = (product && product.addons) || [];
  var extras = G.extras || {};
  function addonIndex(id) {
    for (var i = 0; i < addons.length; i++) if (addons[i].id === id) return i;
    return -1;
  }
  function addonUnlocked(i) {
    return Store.hasAddon(guideId, i);
  }
  var lessonIndex = {};
  lessons.forEach(function (l, i) { lessonIndex[l.id] = i; });

  function stepsOf(lesson) {
    var s = [{ kind: "intro", title: "Overview" }];
    lesson.steps.forEach(function (st, i) { s.push({ kind: "step", title: st.title, i: i }); });
    s.push({ kind: "quiz", title: "Check your understanding" });
    s.push({ kind: "exercise", title: "Practice: " + lesson.exercise.title });
    return s;
  }

  function reportLink(lesson, stepTitle) {
    var email = config.supportEmail || "";
    var subject = "Problem report: " + G.title + " / " + lesson.title;
    var body = "Guide: " + G.title + "\nLesson: " + lesson.title + "\nStep: " + stepTitle + "\nPage: " + location.href + "\n\nWhat happened:\n\n";
    return "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function fileUrl(name) {
    return ROOT + product.guidePath + "files/" + name;
  }

  function fileInfo(name) {
    for (var i = 0; i < G.files.length; i++) if (G.files[i].name === name) return G.files[i];
    return { name: name, title: name, desc: "" };
  }

  function fileLink(name) {
    var f = fileInfo(name);
    return '<a class="gd-file" href="' + esc(fileUrl(name)) + '" download><span class="gd-file-name">' + esc(f.name) + '</span><span class="gd-file-meta">' + esc(f.title) + (f.size ? " · " + esc(f.size) : "") + "</span></a>";
  }

  /* ---------- layout ---------- */
  app.innerHTML =
    '<div class="gd">' +
    '<nav class="gd-side" aria-label="Lessons">' +
    '<details class="gd-side-toggle" open><summary class="gd-side-title"><span>' + esc(G.title) + '</span><span class="gd-side-progress" data-gd-progress></span></summary>' +
    '<ol class="gd-lessons" data-gd-lessons></ol>' +
    '<ul class="gd-tools">' +
    '<li><a href="#/">Guide overview</a></li>' +
    '<li><a href="#/files">Practice files</a></li>' +
    '<li><a href="#/trainer">Shortcut trainer</a></li>' +
    (G.sandbox ? '<li><a href="#/sandbox">Formula sandbox</a></li>' : "") +
    "</ul>" +
    (addons.length ? '<p class="gd-tools-h">Extras</p><ul class="gd-tools gd-extras" data-gd-extras></ul>' : "") +
    "</details></nav>" +
    '<main class="gd-main" id="main" tabindex="-1" data-gd-main></main>' +
    "</div>";

  var side = app.querySelector(".gd-side-toggle");
  var mainEl = app.querySelector("[data-gd-main]");
  var listEl = app.querySelector("[data-gd-lessons]");
  var progressEl = app.querySelector("[data-gd-progress]");
  var extrasEl = app.querySelector("[data-gd-extras]");
  function renderExtras(currentId) {
    if (!extrasEl) return;
    extrasEl.innerHTML = addons.map(function (a, i) {
      var open = addonUnlocked(i);
      return '<li><a href="#/extra/' + a.id + '"' + (a.id === currentId ? ' aria-current="page"' : "") + (open ? "" : ' class="is-locked"') + ">" + esc(a.name) + (open ? "" : '<span class="gd-lock" aria-hidden="true"></span><span class="visually-hidden"> (not included with your license)</span>') + "</a></li>";
    }).join("");
  }
  var mq = window.matchMedia("(max-width: 899px)");
  function syncSide() {
    if (mq.matches) side.removeAttribute("open");
    else side.setAttribute("open", "");
  }
  syncSide();
  if (mq.addEventListener) mq.addEventListener("change", syncSide);

  var currentExtra = null;
  function renderList(currentId, extraId) {
    currentExtra = extraId || null;
    var p = Store.guideProgress(guideId);
    var done = 0;
    listEl.innerHTML = lessons
      .map(function (l, i) {
        var isDone = p.lessons[l.id] && p.lessons[l.id].done;
        if (isDone) done++;
        var started = p.last && p.last.lesson === l.id;
        return (
          '<li><a href="#/lesson/' + l.id + '/0"' + (l.id === currentId ? ' aria-current="page"' : "") + ">" +
          '<span class="state-icon ' + (isDone ? "state-done" : started ? "state-progress" : "state-new") + '" aria-hidden="true"></span>' +
          '<span class="gd-lesson-n">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<span class="gd-lesson-t">' + esc(l.title) + '<span class="visually-hidden">' + (isDone ? " (completed)" : started ? " (in progress)" : "") + "</span></span></a></li>"
        );
      })
      .join("");
    renderExtras(currentExtra);
    progressEl.textContent = done + "/" + lessons.length;
    progressEl.setAttribute("aria-label", done + " of " + lessons.length + " lessons complete");
  }

  /* ---------- views ---------- */
  function overview() {
    var c = Store.completion(guideId, lessons.length);
    var resume = c.last && lessonIndex[c.last.lesson] !== undefined ? c.last : null;
    var first = lessons[0];
    mainEl.innerHTML =
      '<div class="gd-wrap">' +
      '<p class="label"><span class="label-num">Guide</span><span class="label-sep">/</span>' + esc(G.software) + "</p>" +
      "<h1>" + esc(G.title) + "</h1>" +
      '<p class="lead">' + esc(G.intro) + "</p>" +
      '<div class="gd-progress-card"><div><p class="gd-progress-num">' + c.done + " of " + lessons.length + ' lessons complete</p><span class="progress progress-lg" aria-hidden="true"><span style="transform:scaleX(' + (c.percent / 100).toFixed(3) + ')"></span></span></div>' +
      '<a class="btn btn-primary-soft" href="#/lesson/' + (resume ? resume.lesson + "/" + resume.step : first.id + "/0") + '">' + (resume ? "Resume: " + esc(lessons[lessonIndex[resume.lesson]].title) : "Start the first lesson") + "</a></div>" +
      '<h2 class="gd-h2">Lessons</h2><ol class="gd-overview-lessons">' +
      lessons.map(function (l, i) {
        return '<li><a href="#/lesson/' + l.id + '/0"><span class="gd-lesson-n">' + String(i + 1).padStart(2, "0") + "</span><span><strong>" + esc(l.title) + "</strong><span>" + esc(l.summary) + "</span></span></a></li>";
      }).join("") +
      "</ol>" +
      '<h2 class="gd-h2">Also in this guide</h2><ul class="gd-cards">' +
      '<li><a href="#/files"><strong>Practice files</strong><span>' + G.files.length + " files to download for the exercises.</span></a></li>" +
      '<li><a href="#/trainer"><strong>Shortcut trainer</strong><span>Practice ' + G.shortcuts.filter(function (s) { return s.practice !== false; }).length + " keyboard shortcuts for " + esc(G.software) + ".</span></a></li>" +
      (G.sandbox ? '<li><a href="#/sandbox"><strong>Formula sandbox</strong><span>Try any formula on sample data in your browser.</span></a></li>' : "") +
      "</ul>" +
      (addons.length
        ? '<h2 class="gd-h2">Extras</h2><ul class="gd-cards">' + addons.map(function (a, i) {
            var open = addonUnlocked(i);
            return '<li><a href="#/extra/' + a.id + '"' + (open ? "" : ' class="is-locked"') + "><strong>" + esc(a.name) + (open ? "" : ' <span class="gd-extra-tag">Not included</span>') + "</strong><span>" + esc(a.description) + "</span></a></li>";
          }).join("") + "</ul>"
        : "") +
      '<div class="callout"><p><strong>About software versions.</strong> ' + esc(G.versionNote) + "</p><p>" + esc(G.platformNote) + "</p></div>" +
      "</div>";
    renderList(null);
  }

  function filesView() {
    mainEl.innerHTML =
      '<div class="gd-wrap"><p class="label"><span class="label-num">Practice files</span></p><h1>Practice files</h1>' +
      '<p class="lead">Download these to work through the exercises in ' + esc(G.software) + ". Every file is original and made for this guide.</p>" +
      '<ul class="gd-files">' + G.files.map(function (f) {
        return '<li><a class="gd-file gd-file-lg" href="' + esc(fileUrl(f.name)) + '" download><span class="gd-file-name">' + esc(f.name) + '</span><span class="gd-file-meta">' + esc(f.title) + (f.size ? " · " + esc(f.size) : "") + '</span><span class="gd-file-desc">' + esc(f.desc) + "</span></a></li>";
      }).join("") + "</ul>" +
      '<p class="small-note">Keep a copy of your own work before trying new techniques on it; these practice files are there so you never have to practice on your own files.</p></div>';
    renderList(null);
  }

  function trainerView() {
    mainEl.innerHTML = '<div class="gd-wrap"><p class="label"><span class="label-num">Shortcut trainer</span></p><h1>Shortcut trainer</h1><p class="lead">Practice the ' + esc(G.software) + ' shortcuts used in this guide. The trainer shows an action; press the shortcut to check it.</p><div data-trainer></div></div>';
    if (window.SPTrainer) window.SPTrainer.mount(mainEl.querySelector("[data-trainer]"), { shortcuts: G.shortcuts });
    renderList(null);
  }

  function sandboxView() {
    mainEl.innerHTML = '<div class="gd-wrap"><p class="label"><span class="label-num">Formula sandbox</span></p><h1>Formula sandbox</h1><p class="lead">A small grid for trying formulas. It supports the functions used in this guide. Your entries here aren\'t saved; select Reset to start again.</p><div data-sbx></div>' +
      '<div class="callout"><p>' + (G.sandboxHint || 'Try <code>=VLOOKUP(G2, A2:E9, 3, FALSE)</code> in H2, <code>=SUMIF(D2:D9, "&gt;10")</code>, <code>=PROPER(TRIM(B2))</code> or <code>=IFERROR(C2/D5, "No stock")</code>.') + '</p></div></div>';
    if (window.SPSandbox) window.SPSandbox.mount(mainEl.querySelector("[data-sbx]"), { cells: G.sandboxCells, cols: 9, rows: 12 });
    renderList(null);
  }

  // bonus: { addon, lesson } when showing a bonus project lesson from Extras.
  function lessonView(id, stepIndex, bonus) {
    var li = bonus ? -1 : lessonIndex[id];
    if (li === undefined) return overview();
    var lesson = bonus ? bonus.lesson : lessons[li];
    var base = bonus ? "#/extra/" + bonus.addon.id + "/" : "#/lesson/" + id + "/";
    var progressKey = bonus ? "extra-" + bonus.addon.id : id;
    var steps = stepsOf(lesson);
    var si = Math.max(0, Math.min(steps.length - 1, stepIndex || 0));
    var step = steps[si];
    if (!bonus) Store.setPosition(guideId, id, si);
    var progress = Store.guideProgress(guideId);
    var lp = progress.lessons[progressKey] || {};

    var body = "";
    if (step.kind === "intro") {
      body = '<p class="gd-summary">' + esc(lesson.summary) + "</p>" + '<figure class="gd-figure">' + window.SPDiagrams.render(lesson.diagram) + "</figure>" +
        '<h3 class="gd-h3">In this lesson</h3><ol class="gd-steplist">' + lesson.steps.map(function (s, i) { return '<li><a href="' + base + (i + 1) + '">' + esc(s.title) + "</a></li>"; }).join("") +
        '<li><a href="' + base + (steps.length - 2) + '">Check your understanding</a></li><li><a href="' + base + (steps.length - 1) + '">Practice: ' + esc(lesson.exercise.title) + "</a></li></ol>";
    } else if (step.kind === "step") {
      body = '<div class="gd-prose">' + lesson.steps[step.i].body + "</div>";
    } else if (step.kind === "quiz") {
      body = '<div class="gd-quiz">' + lesson.quiz.map(function (q, qi) {
        var saved = lp.quiz && lp.quiz[qi] !== undefined ? lp.quiz[qi] : null;
        return '<fieldset class="gd-q" data-q="' + qi + '"><legend><span class="gd-q-n">Question ' + (qi + 1) + " of " + lesson.quiz.length + "</span>" + q.q + "</legend>" +
          q.options.map(function (o, oi) {
            var oid = "q" + qi + "o" + oi;
            return '<div class="gd-opt"><input type="radio" name="q' + qi + '" id="' + oid + '" value="' + oi + '"' + (saved === oi ? " checked" : "") + '><label for="' + oid + '">' + o + "</label></div>";
          }).join("") +
          '<button type="button" class="btn btn-ghost gd-check">Check answer</button><div class="gd-feedback" role="status" aria-live="polite"></div></fieldset>';
      }).join("") + "</div>";
    } else {
      var ex = lesson.exercise;
      body = '<div class="gd-prose">' + ex.task + "</div>" +
        (ex.files && ex.files.length ? '<h3 class="gd-h3">Practice files</h3><div class="gd-file-row">' + ex.files.map(fileLink).join("") + "</div>" : "") +
        (ex.sandbox ? '<h3 class="gd-h3">Try it in the sandbox</h3><div data-sbx></div>' : "") +
        '<details class="gd-solution"><summary>Show the worked solution</summary><ol>' + ex.solution.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol></details>";
    }

    var isLastStep = si === steps.length - 1;
    var nextLesson = lessons[li + 1];
    mainEl.innerHTML =
      '<article class="gd-wrap gd-lesson">' +
      '<nav class="gd-crumbs" aria-label="Breadcrumb"><a href="#/">' + esc(G.title) + '</a><span aria-hidden="true">/</span><span>' + (bonus ? "Extras: " + esc(bonus.addon.name) : "Lesson " + (li + 1) + " of " + lessons.length) + "</span></nav>" +
      "<h1>" + esc(lesson.title) + "</h1>" +
      '<ol class="gd-stepper" aria-label="Steps in this lesson">' + steps.map(function (s, i) {
        return '<li><a href="' + base + i + '"' + (i === si ? ' aria-current="step"' : "") + ' title="' + esc(stripTags(s.title)) + '"><span class="visually-hidden">Step ' + (i + 1) + ": " + esc(stripTags(s.title)) + "</span></a></li>";
      }).join("") + "</ol>" +
      '<h2 class="gd-step-title"><span class="gd-step-n">Step ' + (si + 1) + " of " + steps.length + "</span>" + esc(step.title) + "</h2>" +
      body +
      '<div class="gd-nav">' +
      (si > 0 ? '<a class="btn btn-ghost" href="' + base + (si - 1) + '">Previous</a>' : li > 0 ? '<a class="btn btn-ghost" href="#/lesson/' + lessons[li - 1].id + '/0">Previous lesson</a>' : "<span></span>") +
      (isLastStep && bonus
        ? '<a class="btn btn-ghost" href="#/">Back to the guide overview</a>'
        : isLastStep
        ? '<div class="gd-finish"><button type="button" class="btn ' + (lp.done ? "btn-ghost" : "btn-primary-soft") + '" data-gd-done aria-pressed="' + (lp.done ? "true" : "false") + '">' + (lp.done ? '<span class="state-icon state-done" aria-hidden="true"></span>Lesson complete' : "Mark lesson complete") + "</button>" +
          (nextLesson ? '<a class="btn btn-ghost" href="#/lesson/' + nextLesson.id + '/0">Next lesson</a>' : '<a class="btn btn-ghost" href="#/">Back to the guide overview</a>') + "</div>"
        : '<a class="btn btn-primary-soft" href="' + base + (si + 1) + '">Next: ' + esc(stripTags(steps[si + 1].title)) + "</a>") +
      "</div>" +
      '<p class="gd-report"><a href="' + esc(reportLink(lesson, stripTags(step.title))) + '">Report a problem with this lesson</a></p>' +
      "</article>";

    // quiz interactions
    Array.prototype.forEach.call(mainEl.querySelectorAll(".gd-q"), function (fs) {
      var qi = parseInt(fs.getAttribute("data-q"), 10);
      var q = lesson.quiz[qi];
      var fb = fs.querySelector(".gd-feedback");
      function show(choice) {
        var ok = choice === q.answer;
        fb.className = "gd-feedback status-msg status-" + (ok ? "good" : "bad");
        fb.innerHTML = '<span class="status-icon" aria-hidden="true"></span><span><strong>' + (ok ? "Correct." : "Not quite.") + "</strong> " + q.explain + "</span>";
      }
      var saved = lp.quiz && lp.quiz[qi] !== undefined ? lp.quiz[qi] : null;
      if (saved !== null) show(saved);
      fs.querySelector(".gd-check").addEventListener("click", function () {
        var picked = fs.querySelector("input:checked");
        if (!picked) {
          fb.className = "gd-feedback status-msg status-info";
          fb.innerHTML = '<span class="status-icon" aria-hidden="true"></span><span>Choose an answer first.</span>';
          return;
        }
        var choice = parseInt(picked.value, 10);
        Store.saveQuizAnswer(guideId, progressKey, qi, choice);
        show(choice);
      });
    });

    var sbx = mainEl.querySelector("[data-sbx]");
    if (sbx && window.SPSandbox) window.SPSandbox.mount(sbx, lesson.exercise.sandbox);

    var doneBtn = mainEl.querySelector("[data-gd-done]");
    if (doneBtn) doneBtn.addEventListener("click", function () {
      var now = !(Store.guideProgress(guideId).lessons[id] || {}).done;
      Store.setLessonDone(guideId, id, now);
      lessonView(id, si);
      var b = mainEl.querySelector("[data-gd-done]");
      if (b) b.focus();
    });

    renderList(bonus ? null : id, bonus ? bonus.addon.id : null);
    document.title = lesson.title + " — " + G.title + " — Shortcut Press";
  }

  /* ---------- extras (add-ons bought with the guide) ---------- */
  function plain(html) {
    return stripTags(String(html).replace(/<\/(p|li|h3)>/g, " ").replace(/<kbd>/g, "").replace(/<\/kbd>\s*<kbd>/g, "+")).replace(/&nbsp;/g, " ").replace(/&[a-z]+;/g, "").replace(/\s+/g, " ").trim();
  }

  function downloadPdf(fileName, title, blocks) {
    if (!window.SPPdf) return;
    var bytes = window.SPPdf.create({ title: title, blocks: blocks });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 1000);
  }

  function cheatBlocks() {
    var b = [{ text: G.title + ": cheat sheet", size: 18, bold: true }, { text: "Shortcut Press · " + G.software + " · " + G.platformNote, size: 9, color: "muted", gap: 4 }, { rule: true, gap: 10 }];
    b.push({ text: "Keyboard shortcuts", size: 13, bold: true, gap: 6 });
    G.shortcuts.forEach(function (s) { b.push({ text: s.keys + "   " + s.action + (s.note ? " (" + s.note + ")" : ""), size: 10, gap: 2 }); });
    b.push({ text: "Lesson by lesson", size: 13, bold: true, gap: 14 });
    lessons.forEach(function (l, i) {
      b.push({ text: (i + 1) + ". " + l.title, size: 11, bold: true, gap: 8 });
      b.push({ text: l.summary, size: 10, color: "muted", gap: 2 });
      l.steps.forEach(function (st) { b.push({ text: "• " + plain(st.title), size: 10, gap: 2 }); });
    });
    return b;
  }

  function workbookBlocks() {
    var b = [{ text: G.title + ": printable workbook", size: 18, bold: true }, { text: "Shortcut Press · for personal use with your license", size: 9, color: "muted", gap: 4 }, { rule: true, gap: 10 }];
    lessons.forEach(function (l, i) {
      b.push({ text: "Lesson " + (i + 1) + ": " + l.title, size: 15, bold: true, gap: 18 });
      b.push({ text: l.summary, size: 10, color: "muted", gap: 4 });
      l.steps.forEach(function (st, si) {
        b.push({ text: (si + 1) + ". " + plain(st.title), size: 11, bold: true, gap: 8 });
        b.push({ text: plain(st.body), size: 10, gap: 2 });
      });
      b.push({ text: "Check your understanding", size: 12, bold: true, gap: 10 });
      l.quiz.forEach(function (q, qi) {
        b.push({ text: "Q" + (qi + 1) + ". " + plain(q.q), size: 10, gap: 4 });
        q.options.forEach(function (o, oi) { b.push({ text: "   " + "ABCD"[oi] + ") " + plain(o), size: 10, gap: 1 }); });
      });
      b.push({ text: "Practice: " + l.exercise.title, size: 12, bold: true, gap: 10 });
      b.push({ text: plain(l.exercise.task), size: 10, gap: 2 });
      b.push({ text: "Notes: ______________________________________________________________", size: 10, color: "muted", gap: 8 });
      b.push({ text: "______________________________________________________________________", size: 10, color: "muted", gap: 8 });
    });
    b.push({ text: "Answers and worked solutions", size: 15, bold: true, gap: 22 });
    lessons.forEach(function (l, i) {
      b.push({ text: "Lesson " + (i + 1) + ": " + l.title, size: 11, bold: true, gap: 10 });
      l.quiz.forEach(function (q, qi) { b.push({ text: "Q" + (qi + 1) + ": " + "ABCD"[q.answer] + ". " + plain(q.explain), size: 10, gap: 2 }); });
      l.exercise.solution.forEach(function (st, si) { b.push({ text: (si + 1) + ". " + plain(st), size: 10, gap: 2 }); });
    });
    return b;
  }

  function quizMarkup(questions, saved) {
    return '<div class="gd-quiz">' + questions.map(function (q, qi) {
      var pick = saved && saved[qi] !== undefined ? saved[qi] : null;
      return '<fieldset class="gd-q" data-q="' + qi + '"><legend><span class="gd-q-n">Question ' + (qi + 1) + " of " + questions.length + "</span>" + q.q + "</legend>" +
        q.options.map(function (o, oi) {
          var oid = "x" + qi + "o" + oi;
          return '<div class="gd-opt"><input type="radio" name="x' + qi + '" id="' + oid + '" value="' + oi + '"' + (pick === oi ? " checked" : "") + '><label for="' + oid + '">' + o + "</label></div>";
        }).join("") +
        '<button type="button" class="btn btn-ghost gd-check">Check answer</button><div class="gd-feedback" role="status" aria-live="polite"></div></fieldset>';
    }).join("") + "</div>";
  }

  function wireQuiz(questions, key, onChange) {
    var saved = (Store.guideProgress(guideId).lessons[key] || {}).quiz || {};
    Array.prototype.forEach.call(mainEl.querySelectorAll(".gd-q"), function (fs) {
      var qi = parseInt(fs.getAttribute("data-q"), 10);
      var q = questions[qi];
      var fb = fs.querySelector(".gd-feedback");
      function show(choice) {
        var ok = choice === q.answer;
        fb.className = "gd-feedback status-msg status-" + (ok ? "good" : "bad");
        fb.innerHTML = '<span class="status-icon" aria-hidden="true"></span><span><strong>' + (ok ? "Correct." : "Not quite.") + "</strong> " + q.explain + "</span>";
      }
      if (saved[qi] !== undefined) show(saved[qi]);
      fs.querySelector(".gd-check").addEventListener("click", function () {
        var picked = fs.querySelector("input:checked");
        if (!picked) {
          fb.className = "gd-feedback status-msg status-info";
          fb.innerHTML = '<span class="status-icon" aria-hidden="true"></span><span>Choose an answer first.</span>';
          return;
        }
        Store.saveQuizAnswer(guideId, key, qi, parseInt(picked.value, 10));
        show(parseInt(picked.value, 10));
        if (onChange) onChange();
      });
    });
  }

  function flashcards(el) {
    var cards = G.shortcuts.map(function (s) { return { front: s.action, back: s.keys.split("+").map(function (k) { return "<kbd>" + esc(k) + "</kbd>"; }).join(" "), hint: "Which shortcut?" }; })
      .concat([].concat.apply([], lessons.map(function (l) {
        return l.quiz.map(function (q) { return { front: q.q, back: q.options[q.answer] + '<span class="fc-explain">' + q.explain + "</span>", hint: l.title }; });
      })));
    var order = cards.map(function (_, i) { return i; });
    var pos = 0;
    var known = 0;
    var flipped = false;
    function shuffle() {
      for (var i = order.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = order[i]; order[i] = order[j]; order[j] = t;
      }
      pos = 0; known = 0; flipped = false;
    }
    function draw() {
      if (pos >= order.length) {
        el.innerHTML = '<div class="fc-done status-msg status-good"><span class="status-icon" aria-hidden="true"></span><span>Deck finished: you marked ' + known + " of " + order.length + ' cards as known.</span></div><button type="button" class="btn btn-primary-soft" data-fc-again>Shuffle and start again</button>';
        el.querySelector("[data-fc-again]").addEventListener("click", function () { shuffle(); draw(); });
        return;
      }
      var c = cards[order[pos]];
      el.innerHTML = '<p class="fc-count">Card ' + (pos + 1) + " of " + order.length + " · " + known + ' known</p>' +
        '<button type="button" class="fc-card' + (flipped ? " is-flipped" : "") + '" data-fc-flip aria-live="polite"><span class="fc-hint">' + esc(flipped ? "Answer" : c.hint) + '</span><span class="fc-text">' + (flipped ? c.back : c.front) + '</span><span class="fc-tap">' + (flipped ? "" : "Select or press Space to turn over") + "</span></button>" +
        '<div class="fc-actions">' + (flipped ? '<button type="button" class="btn btn-ghost" data-fc-again-card>Show again later</button><button type="button" class="btn btn-primary-soft" data-fc-known>I knew it</button>' : "") + "</div>";
      el.querySelector("[data-fc-flip]").addEventListener("click", function () { flipped = !flipped; draw(); el.querySelector("[data-fc-flip]").focus(); });
      var k = el.querySelector("[data-fc-known]");
      if (k) k.addEventListener("click", function () { known++; pos++; flipped = false; draw(); el.querySelector("button").focus(); });
      var a = el.querySelector("[data-fc-again-card]");
      if (a) a.addEventListener("click", function () { order.push(order[pos]); pos++; flipped = false; draw(); el.querySelector("button").focus(); });
    }
    shuffle();
    draw();
  }

  function extraView(id, stepIndex) {
    var idx = addonIndex(id);
    if (idx === -1) return overview();
    var a = addons[idx];
    var head = '<p class="label"><span class="label-num">Extras</span></p><h1>' + esc(a.name) + "</h1>";
    if (!addonUnlocked(idx)) {
      mainEl.innerHTML = '<div class="gd-wrap">' + head + '<p class="lead">' + esc(a.description) + "</p>" +
        '<div class="status-msg status-info"><span class="status-icon" aria-hidden="true"></span><span>This extra isn\'t included with the license on this device. Extras are chosen on the guide\'s page when you buy it. If you bought it, add the license code from that order in <button type="button" class="link-btn" data-open-dock>My Guides</button>. To add it to an earlier purchase, <a href="' + esc(ROOT) + 'contact.html">contact us</a> with your order number.</span></div></div>';
      var ob = mainEl.querySelector("[data-open-dock]");
      if (ob) ob.addEventListener("click", function () { if (window.SPDock) window.SPDock.open(); });
      renderList(null, id);
      return;
    }
    var kind = a.kind;
    if (kind === "project" && extras.project) return lessonView(id, stepIndex, { addon: a, lesson: extras.project });
    var html = '<div class="gd-wrap">' + head + '<p class="lead">' + esc(a.description) + "</p>";
    if (kind === "cheatsheet") {
      html += '<div class="gd-actions"><button type="button" class="btn btn-primary-soft" data-x-pdf>Download the PDF</button><button type="button" class="btn btn-ghost" data-x-print>Print this page</button></div>' +
        '<h2 class="gd-h2">Keyboard shortcuts</h2><table class="gd-cheat"><thead><tr><th scope="col">Shortcut</th><th scope="col">Action</th></tr></thead><tbody>' +
        G.shortcuts.map(function (s) { return "<tr><td>" + s.keys.split("+").map(function (k) { return "<kbd>" + esc(k) + "</kbd>"; }).join(" ") + "</td><td>" + esc(s.action) + (s.note ? ' <span class="small-note">(' + esc(s.note) + ")</span>" : "") + "</td></tr>"; }).join("") +
        "</tbody></table>" +
        '<h2 class="gd-h2">Lesson by lesson</h2><div class="gd-cheat-lessons">' + lessons.map(function (l, i) {
          return "<section><h3>" + (i + 1) + ". " + esc(l.title) + "</h3><ul>" + l.steps.map(function (st) { return "<li>" + esc(plain(st.title)) + "</li>"; }).join("") + "</ul></section>";
        }).join("") + "</div>";
    } else if (kind === "workbook") {
      html += '<div class="gd-actions"><button type="button" class="btn btn-primary-soft" data-x-pdf>Download the workbook (PDF)</button></div>' +
        '<h2 class="gd-h2">What\'s in the workbook</h2><ul class="check-list"><li>Every lesson\'s steps, written out for reading away from the screen</li><li>All ' + lessons.reduce(function (n, l) { return n + l.quiz.length; }, 0) + " quiz questions, with the answers at the back</li><li>Every practice exercise with space for notes, and the worked solutions at the back</li></ul>" +
        '<p class="small-note">The PDF is made in your browser from the current version of this guide, so it always matches what you see here.</p>';
    } else if (kind === "flashcards") {
      html += '<div class="fc" data-fc></div>';
    } else if (kind === "quizbank" && extras.quizbank) {
      html += '<p class="gd-score" data-x-score role="status"></p>' + quizMarkup(extras.quizbank, (Store.guideProgress(guideId).lessons["extra-" + id] || {}).quiz);
    } else if (kind === "practice" && extras.practice) {
      html += extras.practice.map(function (ex, i) {
        return '<section class="gd-xpractice"><h2 class="gd-h2">' + (i + 1) + ". " + esc(ex.title) + '</h2><div class="gd-prose">' + ex.task + "</div>" +
          (ex.files && ex.files.length ? '<div class="gd-file-row">' + ex.files.map(fileLink).join("") + "</div>" : "") +
          '<details class="gd-solution"><summary>Show the worked solution</summary><ol>' + ex.solution.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol></details></section>";
      }).join("");
    }
    html += '<p class="gd-report"><a href="#/">Back to the guide overview</a></p></div>';
    mainEl.innerHTML = html;
    var pdfBtn = mainEl.querySelector("[data-x-pdf]");
    if (pdfBtn) pdfBtn.addEventListener("click", function () {
      if (kind === "cheatsheet") downloadPdf(product.slug + "-cheat-sheet.pdf", G.title + " cheat sheet", cheatBlocks());
      else downloadPdf(product.slug + "-workbook.pdf", G.title + " workbook", workbookBlocks());
    });
    var printBtn = mainEl.querySelector("[data-x-print]");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
    var fc = mainEl.querySelector("[data-fc]");
    if (fc) flashcards(fc);
    if (kind === "quizbank" && extras.quizbank) {
      var key = "extra-" + id;
      var score = function () {
        var saved = (Store.guideProgress(guideId).lessons[key] || {}).quiz || {};
        var answered = 0, right = 0;
        extras.quizbank.forEach(function (q, qi) { if (saved[qi] !== undefined) { answered++; if (saved[qi] === q.answer) right++; } });
        mainEl.querySelector("[data-x-score]").textContent = answered ? right + " correct out of " + answered + " answered (" + extras.quizbank.length + " questions in total)" : extras.quizbank.length + " questions. Your answers are saved in this browser.";
      };
      wireQuiz(extras.quizbank, key, score);
      score();
    }
    renderList(null, id);
    document.title = a.name + " — " + G.title + " — Shortcut Press";
  }

  /* ---------- router ---------- */
  var firstRoute = true;
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/");
    document.title = G.title + " — Shortcut Press";
    if (parts[0] === "lesson") lessonView(parts[1], parseInt(parts[2], 10) || 0);
    else if (parts[0] === "files") filesView();
    else if (parts[0] === "trainer") trainerView();
    else if (parts[0] === "sandbox" && G.sandbox) sandboxView();
    else if (parts[0] === "extra") extraView(parts[1], parseInt(parts[2], 10) || 0);
    else overview();
    if (!firstRoute) {
      mainEl.focus({ preventScroll: true });
      window.scrollTo(0, 0);
      if (mq.matches) side.removeAttribute("open");
    }
    firstRoute = false;
  }
  window.addEventListener("hashchange", route);
  route();

  /* ---------- first-run walkthrough ---------- */
  var seenKey = "walkthrough-" + guideId;
  if (!Store.getSetting(seenKey, false)) {
    var tour = [
      ["Welcome to your guide", "Each lesson is a short series of steps. Work through them with " + G.software + " open beside this page."],
      ["Lessons and steps", "The lesson list is on the left (under the guide title on small screens). Inside a lesson, use Next and Previous, or the step markers at the top."],
      ["Check, then practice", "Every lesson ends with a short quiz and a practice exercise. Download the practice files, try the task, then open the worked solution to compare."],
      ["Progress and your licenses", "Progress is saved in this browser, and Resume takes you back to where you left off. The My Guides button in the bottom-left corner holds your licenses and backups."]
    ];
    var dlg = document.createElement("dialog");
    dlg.className = "dlg tour";
    dlg.setAttribute("aria-labelledby", "tour-title");
    document.body.appendChild(dlg);
    var ti = 0;
    var drawTour = function () {
      dlg.innerHTML = '<div class="tour-box"><p class="tour-count">' + (ti + 1) + " of " + tour.length + '</p><h2 id="tour-title">' + esc(tour[ti][0]) + "</h2><p>" + esc(tour[ti][1]) + '</p><div class="tour-actions"><button type="button" class="btn btn-ghost" data-tour-skip>Skip</button><button type="button" class="btn btn-primary-soft" data-tour-next>' + (ti === tour.length - 1 ? "Start" : "Next") + "</button></div></div>";
      dlg.querySelector("[data-tour-skip]").addEventListener("click", function () { dlg.close(); });
      dlg.querySelector("[data-tour-next]").addEventListener("click", function () {
        if (ti === tour.length - 1) return dlg.close();
        ti++;
        drawTour();
        dlg.querySelector("[data-tour-next]").focus();
      });
    };
    dlg.addEventListener("close", function () {
      Store.setSetting(seenKey, true);
      dlg.remove();
      mainEl.focus({ preventScroll: true });
    });
    drawTour();
    if (typeof dlg.showModal === "function") {
      dlg.showModal();
      dlg.querySelector("[data-tour-next]").focus();
    }
  }
})();
