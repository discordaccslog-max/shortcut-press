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
    "</ul></details></nav>" +
    '<main class="gd-main" id="main" tabindex="-1" data-gd-main></main>' +
    "</div>";

  var side = app.querySelector(".gd-side-toggle");
  var mainEl = app.querySelector("[data-gd-main]");
  var listEl = app.querySelector("[data-gd-lessons]");
  var progressEl = app.querySelector("[data-gd-progress]");
  var mq = window.matchMedia("(max-width: 899px)");
  function syncSide() {
    if (mq.matches) side.removeAttribute("open");
    else side.setAttribute("open", "");
  }
  syncSide();
  if (mq.addEventListener) mq.addEventListener("change", syncSide);

  function renderList(currentId) {
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
      '<div class="callout"><p>Try <code>=VLOOKUP(G2, A2:E9, 3, FALSE)</code> in H2, <code>=SUMIF(D2:D9, "&gt;10")</code>, <code>=PROPER(TRIM(B2))</code> or <code>=IFERROR(C2/D5, "No stock")</code>.</p></div></div>';
    if (window.SPSandbox) window.SPSandbox.mount(mainEl.querySelector("[data-sbx]"), { cells: G.sandboxCells, cols: 9, rows: 12 });
    renderList(null);
  }

  function lessonView(id, stepIndex) {
    var li = lessonIndex[id];
    if (li === undefined) return overview();
    var lesson = lessons[li];
    var steps = stepsOf(lesson);
    var si = Math.max(0, Math.min(steps.length - 1, stepIndex || 0));
    var step = steps[si];
    Store.setPosition(guideId, id, si);
    var progress = Store.guideProgress(guideId);
    var lp = progress.lessons[id] || {};

    var body = "";
    if (step.kind === "intro") {
      body = '<p class="gd-summary">' + esc(lesson.summary) + "</p>" + '<figure class="gd-figure">' + window.SPDiagrams.render(lesson.diagram) + "</figure>" +
        '<h3 class="gd-h3">In this lesson</h3><ol class="gd-steplist">' + lesson.steps.map(function (s, i) { return '<li><a href="#/lesson/' + id + "/" + (i + 1) + '">' + esc(s.title) + "</a></li>"; }).join("") +
        '<li><a href="#/lesson/' + id + "/" + (steps.length - 2) + '">Check your understanding</a></li><li><a href="#/lesson/' + id + "/" + (steps.length - 1) + '">Practice: ' + esc(lesson.exercise.title) + "</a></li></ol>";
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
      '<nav class="gd-crumbs" aria-label="Breadcrumb"><a href="#/">' + esc(G.title) + '</a><span aria-hidden="true">/</span><span>Lesson ' + (li + 1) + " of " + lessons.length + "</span></nav>" +
      "<h1>" + esc(lesson.title) + "</h1>" +
      '<ol class="gd-stepper" aria-label="Steps in this lesson">' + steps.map(function (s, i) {
        return '<li><a href="#/lesson/' + id + "/" + i + '"' + (i === si ? ' aria-current="step"' : "") + ' title="' + esc(stripTags(s.title)) + '"><span class="visually-hidden">Step ' + (i + 1) + ": " + esc(stripTags(s.title)) + "</span></a></li>";
      }).join("") + "</ol>" +
      '<h2 class="gd-step-title"><span class="gd-step-n">Step ' + (si + 1) + " of " + steps.length + "</span>" + esc(step.title) + "</h2>" +
      body +
      '<div class="gd-nav">' +
      (si > 0 ? '<a class="btn btn-ghost" href="#/lesson/' + id + "/" + (si - 1) + '">Previous</a>' : li > 0 ? '<a class="btn btn-ghost" href="#/lesson/' + lessons[li - 1].id + '/0">Previous lesson</a>' : "<span></span>") +
      (isLastStep
        ? '<div class="gd-finish"><button type="button" class="btn ' + (lp.done ? "btn-ghost" : "btn-primary-soft") + '" data-gd-done aria-pressed="' + (lp.done ? "true" : "false") + '">' + (lp.done ? '<span class="state-icon state-done" aria-hidden="true"></span>Lesson complete' : "Mark lesson complete") + "</button>" +
          (nextLesson ? '<a class="btn btn-ghost" href="#/lesson/' + nextLesson.id + '/0">Next lesson</a>' : '<a class="btn btn-ghost" href="#/">Back to the guide overview</a>') + "</div>"
        : '<a class="btn btn-primary-soft" href="#/lesson/' + id + "/" + (si + 1) + '">Next: ' + esc(stripTags(steps[si + 1].title)) + "</a>") +
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
        Store.saveQuizAnswer(guideId, id, qi, choice);
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

    renderList(id);
    document.title = lesson.title + " — " + G.title + " — Shortcut Press";
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
