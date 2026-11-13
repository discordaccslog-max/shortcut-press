/*
  Shortcut Press — on-device storage for licenses, learning progress and settings.
  Everything stays in this browser (localStorage). Nothing is sent anywhere.
  Requires js/license.js.
*/
(function () {
  "use strict";

  var KEY = "sp-data-v1";
  var L = window.SPLicense;
  var DAY = 24 * 60 * 60 * 1000;

  function blank() {
    return { version: 1, licenses: [], progress: {}, settings: {}, lastBackupAt: null, firstActivatedAt: null };
  }

  function read() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return blank();
      var data = JSON.parse(raw);
      var base = blank();
      for (var k in base) if (data[k] === undefined) data[k] = base[k];
      if (!Array.isArray(data.licenses)) data.licenses = [];
      return data;
    } catch (e) {
      return blank();
    }
  }

  var memory = null;
  var storageOk = true;

  function load() {
    if (!memory) memory = read();
    return memory;
  }

  function save(data, reason) {
    memory = data;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(data));
      storageOk = true;
    } catch (e) {
      storageOk = false;
    }
    window.dispatchEvent(new CustomEvent("sp:store", { detail: { reason: reason || "change" } }));
  }

  window.addEventListener("storage", function (e) {
    if (e.key === KEY) {
      memory = null;
      window.dispatchEvent(new CustomEvent("sp:store", { detail: { reason: "sync" } }));
    }
  });

  function requestPersist() {
    try {
      if (navigator.storage && navigator.storage.persist) {
        return navigator.storage.persisted().then(function (already) {
          return already || navigator.storage.persist();
        });
      }
    } catch (e) {}
    return Promise.resolve(false);
  }

  /* ---------- licenses ---------- */

  function getLicenses() {
    return load().licenses.slice();
  }

  function activate(input, extra) {
    var v = L.validate(input);
    if (!v.valid) {
      var messages = {
        empty: "Enter your license code.",
        prefix: "License codes start with SCUT. Check the code and try again.",
        length: "That code has the wrong number of characters. Check it and try again.",
        character: "That code contains a character license codes never use (such as 0, O, 1, I or L). Check it and try again.",
        product: "That code doesn't match any Shortcut Press guide. Check it and try again.",
        check: "That code isn't valid. One or more characters may be mistyped; check it and try again."
      };
      return { ok: false, reason: v.reason, message: messages[v.reason] || messages.check };
    }
    var data = load();
    for (var i = 0; i < data.licenses.length; i++) {
      if (data.licenses[i].code === v.code) return { ok: true, already: true, license: data.licenses[i] };
    }
    var license = { code: v.code, productId: v.productId, activatedAt: new Date().toISOString() };
    if (extra && extra.orderRef) license.orderRef = String(extra.orderRef).slice(0, 200);
    data.licenses.push(license);
    if (!data.firstActivatedAt) data.firstActivatedAt = license.activatedAt;
    save(data, "activate");
    requestPersist();
    return { ok: true, already: false, license: license };
  }

  function removeLicense(code) {
    var data = load();
    data.licenses = data.licenses.filter(function (l) {
      return l.code !== code;
    });
    save(data, "remove");
  }

  function licenseFor(productId) {
    var list = load().licenses;
    for (var i = 0; i < list.length; i++) {
      if (L.unlocks(list[i].productId).indexOf(productId) !== -1 || list[i].productId === productId) return list[i];
    }
    return null;
  }

  function hasAccess(productId) {
    return !!licenseFor(productId);
  }

  function unlockedGuides() {
    var out = [];
    load().licenses.forEach(function (l) {
      L.unlocks(l.productId).forEach(function (id) {
        if (out.indexOf(id) === -1) out.push(id);
      });
    });
    return out;
  }

  /* ---------- progress ---------- */

  function guideProgress(guideId) {
    var p = load().progress[guideId];
    return p ? JSON.parse(JSON.stringify(p)) : { lessons: {}, last: null };
  }

  function updateProgress(guideId, fn, reason) {
    var data = load();
    var p = data.progress[guideId] || { lessons: {}, last: null };
    fn(p);
    p.updatedAt = new Date().toISOString();
    data.progress[guideId] = p;
    save(data, reason || "progress");
  }

  function setPosition(guideId, lessonId, step) {
    updateProgress(guideId, function (p) {
      p.last = { lesson: lessonId, step: step };
    }, "position");
  }

  function setLessonDone(guideId, lessonId, done) {
    updateProgress(guideId, function (p) {
      var l = p.lessons[lessonId] || {};
      if (done) l.done = new Date().toISOString();
      else delete l.done;
      p.lessons[lessonId] = l;
    }, "lesson");
  }

  function saveQuizAnswer(guideId, lessonId, questionIndex, choice) {
    updateProgress(guideId, function (p) {
      var l = p.lessons[lessonId] || {};
      l.quiz = l.quiz || {};
      l.quiz[questionIndex] = choice;
      p.lessons[lessonId] = l;
    }, "quiz");
  }

  function completion(guideId, totalLessons) {
    var p = guideProgress(guideId);
    var done = 0;
    for (var k in p.lessons) if (p.lessons[k].done) done++;
    return { done: done, total: totalLessons, percent: totalLessons ? Math.round((done / totalLessons) * 100) : 0, last: p.last };
  }

  /* ---------- settings ---------- */

  function getSetting(name, fallback) {
    var s = load().settings;
    return s[name] === undefined ? fallback : s[name];
  }

  function setSetting(name, value) {
    var data = load();
    data.settings[name] = value;
    save(data, "setting");
  }

  /* ---------- backup ---------- */

  function exportData() {
    var data = load();
    var out = {
      app: "Shortcut Press",
      kind: "backup",
      version: 1,
      exportedAt: new Date().toISOString(),
      licenses: data.licenses,
      progress: data.progress,
      settings: data.settings
    };
    data.lastBackupAt = out.exportedAt;
    save(data, "backup");
    return out;
  }

  function importData(obj) {
    if (!obj || obj.app !== "Shortcut Press" || obj.kind !== "backup" || !Array.isArray(obj.licenses)) {
      return { ok: false, message: "That file isn't a Shortcut Press backup." };
    }
    var data = load();
    var added = 0;
    obj.licenses.forEach(function (lic) {
      var v = L.validate(lic && lic.code);
      if (!v.valid) return;
      var exists = data.licenses.some(function (l) {
        return l.code === v.code;
      });
      if (!exists) {
        var entry = { code: v.code, productId: v.productId, activatedAt: lic.activatedAt || new Date().toISOString() };
        if (lic.orderRef) entry.orderRef = String(lic.orderRef).slice(0, 200);
        data.licenses.push(entry);
        added++;
      }
    });
    var guides = 0;
    var progress = obj.progress && typeof obj.progress === "object" ? obj.progress : {};
    Object.keys(progress).forEach(function (gid) {
      var incoming = progress[gid];
      if (!incoming || typeof incoming !== "object") return;
      var current = data.progress[gid] || { lessons: {}, last: null };
      var lessons = incoming.lessons && typeof incoming.lessons === "object" ? incoming.lessons : {};
      Object.keys(lessons).forEach(function (lid) {
        var a = current.lessons[lid] || {};
        var b = lessons[lid] || {};
        current.lessons[lid] = {
          done: a.done || b.done || undefined,
          quiz: Object.assign({}, b.quiz || {}, a.quiz || {})
        };
        if (!current.lessons[lid].done) delete current.lessons[lid].done;
      });
      if (!current.last && incoming.last) current.last = incoming.last;
      data.progress[gid] = current;
      guides++;
    });
    if (obj.settings && typeof obj.settings === "object") {
      Object.keys(obj.settings).forEach(function (k) {
        if (data.settings[k] === undefined) data.settings[k] = obj.settings[k];
      });
    }
    if (!data.firstActivatedAt && data.licenses.length) data.firstActivatedAt = data.licenses[0].activatedAt;
    save(data, "import");
    return { ok: true, licensesAdded: added, guides: guides };
  }

  function needsBackupReminder() {
    var data = load();
    if (!data.licenses.length) return false;
    var since = data.lastBackupAt || data.firstActivatedAt;
    if (!since) return false;
    return Date.now() - new Date(since).getTime() > 30 * DAY;
  }

  window.SPStore = {
    getLicenses: getLicenses,
    activate: activate,
    removeLicense: removeLicense,
    licenseFor: licenseFor,
    hasAccess: hasAccess,
    unlockedGuides: unlockedGuides,
    guideProgress: guideProgress,
    setPosition: setPosition,
    setLessonDone: setLessonDone,
    saveQuizAnswer: saveQuizAnswer,
    completion: completion,
    getSetting: getSetting,
    setSetting: setSetting,
    exportData: exportData,
    importData: importData,
    needsBackupReminder: needsBackupReminder,
    lastBackupAt: function () {
      return load().lastBackupAt;
    },
    requestPersist: requestPersist,
    storageAvailable: function () {
      return storageOk;
    }
  };
})();
