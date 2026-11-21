/*
  Shortcut Press — product catalog.

  name / slug / code: product name, URL slug and license product code.
  price:              price in USD.
  summary:            one-line description used on cards and in search.
  description:        the longer description shown on the product page.
  page:               product page.
  guidePath:          where the guide lives once unlocked.
  confirmationPath:   the page the payment provider sends buyers to after payment.
  checkoutUrl:        the checkout link for the product's buy button. While it is
                      an empty string, the product page shows no buy button; once a
                      URL is added here, the button appears and links to it.
*/
window.SHORTCUT_PRODUCTS = {
  "spreadsheet-formulas": {
    name: "Spreadsheet Formulas & Functions",
    slug: "spreadsheet-formulas-functions",
    code: "SF",
    price: 29,
    summary: "Cell references, lookups, logical, text and date functions, and error handling, for Excel and Google Sheets.",
    description: "An interactive browser guide to writing spreadsheet formulas: cell references, lookups, logical functions, text and date functions, and handling errors, written for both Microsoft Excel and Google Sheets, with an in-browser formula sandbox and downloadable practice workbooks.",
    page: "spreadsheet-formulas-functions.html",
    guidePath: "guides/spreadsheet-formulas-functions/",
    confirmationPath: "thank-you/spreadsheet-formulas-functions/",
    checkoutUrl: ""
  },
  "pivot-tables-charts": {
    name: "Data Analysis with Pivot Tables & Charts",
    slug: "data-analysis-pivot-tables-charts",
    code: "PT",
    price: 39,
    summary: "Cleaning data, building pivot tables, summarizing and filtering, and choosing and formatting charts.",
    description: "An interactive browser guide to turning a raw table of data into clear summaries and charts in Microsoft Excel and Google Sheets: cleaning data, building pivot tables, summarizing and filtering, and choosing and formatting charts, with a formula sandbox and downloadable practice datasets.",
    page: "data-analysis-pivot-tables-charts.html",
    guidePath: "guides/data-analysis-pivot-tables-charts/",
    confirmationPath: "thank-you/data-analysis-pivot-tables-charts/",
    checkoutUrl: ""
  },
  "document-formatting": {
    name: "Professional Document Formatting",
    slug: "professional-document-formatting",
    code: "DF",
    price: 22,
    summary: "Styles, headings, automatic tables of contents, page layout, and reusable templates in Word and Google Docs.",
    description: "An interactive browser guide to formatting long documents in Microsoft Word and Google Docs so they stay consistent and easy to update: styles, headings, automatic tables of contents, page layout, and reusable templates, with downloadable Word-compatible practice documents.",
    page: "professional-document-formatting.html",
    guidePath: "guides/professional-document-formatting/",
    confirmationPath: "thank-you/professional-document-formatting/",
    checkoutUrl: ""
  },
  "blender-3d-modeling": {
    name: "3D Modeling Fundamentals in Blender",
    slug: "blender-3d-modeling-fundamentals",
    code: "BD",
    price: 49,
    summary: "Navigating the interface, modeling with basic shapes, modifiers, materials, lighting, and rendering a scene.",
    description: "An interactive browser guide to building and rendering your first 3D scenes in Blender: navigating the interface, modeling with basic shapes, modifiers, materials, lighting, and rendering a finished scene, with downloadable OBJ practice models.",
    page: "blender-3d-modeling-fundamentals.html",
    guidePath: "guides/blender-3d-modeling-fundamentals/",
    confirmationPath: "thank-you/blender-3d-modeling-fundamentals/",
    checkoutUrl: ""
  },
  "davinci-resolve-editing": {
    name: "Video Editing in DaVinci Resolve",
    slug: "davinci-resolve-video-editing",
    code: "DR",
    price: 45,
    summary: "Organizing footage, cutting on the timeline, transitions, titles, color correction, audio cleanup, and exporting.",
    description: "An interactive browser guide to editing a video from raw clips to a finished file in DaVinci Resolve: importing and organizing footage, cutting on the timeline, transitions, titles, basic color correction, audio cleanup, and exporting, with downloadable practice clips.",
    page: "davinci-resolve-video-editing.html",
    guidePath: "guides/davinci-resolve-video-editing/",
    confirmationPath: "thank-you/davinci-resolve-video-editing/",
    checkoutUrl: ""
  },
  "figma-interface-design": {
    name: "Interface Design in Figma",
    slug: "figma-interface-design",
    code: "FG",
    price: 35,
    summary: "Frames, auto layout, components, styles, and prototyping a simple app screen flow.",
    description: "An interactive browser guide to designing app screens in Figma: frames, auto layout, components, styles, and prototyping a simple app screen flow, with downloadable SVG practice assets.",
    page: "figma-interface-design.html",
    guidePath: "guides/figma-interface-design/",
    confirmationPath: "thank-you/figma-interface-design/",
    checkoutUrl: ""
  },
  "inkscape-vector-illustration": {
    name: "Vector Illustration in Inkscape",
    slug: "inkscape-vector-illustration",
    code: "VX",
    price: 27,
    summary: "Shapes, paths, the pen tool, text, and exporting for print and web.",
    description: "An interactive browser guide to drawing clean vector artwork in Inkscape: shapes, paths, the pen tool, text, and exporting for print and web, with downloadable SVG practice files.",
    page: "inkscape-vector-illustration.html",
    guidePath: "guides/inkscape-vector-illustration/",
    confirmationPath: "thank-you/inkscape-vector-illustration/",
    checkoutUrl: ""
  },
  "complete-library": {
    name: "Complete Software Skills Library",
    slug: "complete-software-skills-library",
    code: "CS",
    price: 149,
    summary: "The seven original guides, unlocked by a single license.",
    description: "Seven Shortcut Press guides (spreadsheets, data analysis, documents, Blender, DaVinci Resolve, Figma and Inkscape), unlocked by a single license code. Each guide is complete on its own, with lessons, diagrams, quizzes, exercises with worked solutions, a keyboard shortcut trainer, practice files and progress tracking, so you can work through them in any order. Guides added later are sold separately.",
    page: "complete-software-skills-library.html",
    guidePath: "guides/complete-software-skills-library/",
    confirmationPath: "thank-you/complete-software-skills-library/",
    includes: [
      "spreadsheet-formulas",
      "pivot-tables-charts",
      "document-formatting",
      "blender-3d-modeling",
      "davinci-resolve-editing",
      "figma-interface-design",
      "inkscape-vector-illustration"
    ],
    checkoutUrl: ""
  },

  /*
    Guides sold on their own. Each has optional add-ons (extras):
      addons: [{ id, name, price, kind, description }]
    kind is how the guide delivers it: cheatsheet, workbook or flashcards are made
    from the guide itself; project, quizbank and practice use the extras in the
    guide's content. The order matters: add-on n is bit n of the license code's
    add-on mask (see js/license.js), so never reorder or remove an add-on once sold;
    add new ones at the end (at most four per guide).
  */
  "google-sheets-budgeting": {
    name: "Personal Budgeting in Google Sheets",
    slug: "google-sheets-budgeting",
    code: "BG",
    price: 24,
    summary: "A monthly budget built from scratch: transactions, SUMIF totals, budget versus actual, charts and savings goals.",
    description: "An interactive browser guide to building your own monthly budget in Google Sheets: a tidy transactions sheet, totals and category summaries with SUMIF and SUMIFS, a budget-versus-actual table, conditional formatting and charts, and a savings goal tracker, with an in-browser formula sandbox and practice workbooks.",
    page: "google-sheets-budgeting.html",
    guidePath: "guides/google-sheets-budgeting/",
    confirmationPath: "thank-you/google-sheets-budgeting/",
    addons: [
      { id: "year-dashboard", name: "Bonus project: yearly budget dashboard", price: 4, kind: "project", description: "An extra lesson that turns one month into a whole year: a month column, a category-by-month SUMIFS grid and sparkline trends." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on budgeting formulas, references and formatting, with explanations and a running score." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "Every Google Sheets shortcut in the guide and the key steps of each lesson, as a PDF to print and keep beside your keyboard." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for the cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "powerpoint-presentations": {
    name: "Presentation Design in PowerPoint",
    slug: "powerpoint-presentations",
    code: "PP",
    price: 32,
    summary: "Slide masters, outlines to slides, alignment, charts, pictures and icons, animation and presenting.",
    description: "An interactive browser guide to designing clear, consistent presentations in Microsoft PowerPoint: slide masters and layouts, turning an outline into slides, alignment and spacing, charts and tables, pictures and icons, and animation, Presenter View and PDF export, with practice files for a complete short talk.",
    page: "powerpoint-presentations.html",
    guidePath: "guides/powerpoint-presentations/",
    confirmationPath: "thank-you/powerpoint-presentations/",
    addons: [
      { id: "pitch-project", name: "Bonus project: five-slide pitch", price: 5, kind: "project", description: "An extra lesson that plans and builds a five-slide pitch with a problem, solution, proof, cost and ask, using one layout system." },
      { id: "practice-pack", name: "Extra practice pack", price: 3, kind: "practice", description: "Three more exercises with worked solutions: rebuilding a cluttered slide as a table, a section divider layout, and animating a chart by series." },
      { id: "workbook", name: "Printable workbook", price: 3, kind: "workbook", description: "The whole guide as a PDF to read and write on away from the screen, with every quiz and exercise and the answers at the back." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "Every PowerPoint shortcut in the guide and the key steps of each lesson, as a PDF to print." }
    ],
    checkoutUrl: ""
  },
  "excel-power-query": {
    name: "Cleaning Data with Excel Power Query",
    slug: "excel-power-query",
    code: "PQ",
    price: 59,
    summary: "Repeatable data cleaning: import, fix text and types, unpivot, append, merge, group and refresh.",
    description: "An interactive browser guide to cleaning and reshaping data with Power Query in Microsoft Excel: importing files, fixing text and data types, unpivoting wide tables, appending monthly exports, merging lookup tables, and grouping into a report that refreshes with one click, with messy practice files to clean.",
    page: "excel-power-query.html",
    guidePath: "guides/excel-power-query/",
    confirmationPath: "thank-you/excel-power-query/",
    addons: [
      { id: "folder-report", name: "Bonus project: self-refreshing report", price: 5, kind: "project", description: "An extra lesson that builds a monthly report from a folder of exports, merges categories and groups totals, updated by one refresh." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on steps, joins, appends and M functions, with explanations and a running score." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "The guide's shortcuts and every lesson's key steps on paper, for quick reference beside your keyboard." },
      { id: "workbook", name: "Printable workbook", price: 3, kind: "workbook", description: "The whole guide as a PDF with every lesson, quiz and exercise, and the worked solutions at the back." }
    ],
    checkoutUrl: ""
  },
  "excel-vba-macros": {
    name: "Automating Excel with Macros & VBA",
    slug: "excel-vba-macros",
    code: "VB",
    price: 55,
    summary: "Record macros, read and write VBA, loop through rows, add buttons and write your own functions.",
    description: "An interactive browser guide to automating Microsoft Excel with macros and VBA: recording macros, the VBA editor, ranges and worksheets in code, variables, loops and decisions, message boxes and buttons, and your own worksheet functions and event macros, with a practice workbook and a finished code module to compare.",
    page: "excel-vba-macros.html",
    guidePath: "guides/excel-vba-macros/",
    confirmationPath: "thank-you/excel-vba-macros/",
    addons: [
      { id: "report-macro", name: "Bonus project: one-click weekly report", price: 5, kind: "project", description: "An extra lesson that writes a macro to copy, sort, total and summarize the orders on a new dated sheet." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on the editor, objects, loops, events and macro security, with explanations." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "Every editor shortcut in the guide and the key steps of each lesson, as a PDF to keep beside you while you code." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "financial-modeling-excel": {
    name: "Financial Modeling in Excel",
    slug: "financial-modeling-excel",
    code: "FM",
    price: 95,
    summary: "A five-year model for a small business: drivers, costs, a loan schedule, NPV and IRR, scenarios and checks.",
    description: "An interactive browser guide to building a clear, checkable financial model in Microsoft Excel for a small café: an inputs sheet, a five-year revenue and cost forecast, a loan schedule with PMT, NPV and IRR, scenario switches, data tables and Goal Seek, and the checks, protection and charts that make a model ready to hand over, with a formula sandbox and practice workbooks.",
    page: "financial-modeling-excel.html",
    guidePath: "guides/financial-modeling-excel/",
    confirmationPath: "thank-you/financial-modeling-excel/",
    addons: [
      { id: "monthly-cash", name: "Bonus project: Year 1 monthly cash flow", price: 5, kind: "project", description: "An extra lesson that splits Year 1 into months with seasonality and a running cash balance, and finds the lowest cash point." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on structure, PMT, NPV, IRR and what-if tools, with explanations and a running score." },
      { id: "workbook", name: "Printable workbook", price: 3, kind: "workbook", description: "The whole guide as a PDF with every lesson, quiz and exercise, and the worked solutions at the back." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "The modeling shortcuts and each lesson's key steps on paper, for quick reference while you build." }
    ],
    checkoutUrl: ""
  },
  "power-bi-reports": {
    name: "Reports & Dashboards in Power BI",
    slug: "power-bi-reports",
    code: "PB",
    price: 75,
    summary: "From CSV files to an interactive report: data model, DAX measures, visuals, slicers and export.",
    description: "An interactive browser guide to building reports in Microsoft Power BI Desktop: loading and shaping data, a star-schema data model with a date table, DAX measures with CALCULATE, visuals that answer questions, slicers, interactions and drill-down, and themes, mobile layout and PDF export, with three practice data files.",
    page: "power-bi-reports.html",
    guidePath: "guides/power-bi-reports/",
    confirmationPath: "thank-you/power-bi-reports/",
    addons: [
      { id: "targets-project", name: "Bonus project: targets and variance page", price: 5, kind: "project", description: "An extra lesson that adds a targets table and builds a page of revenue against target with conditional colors." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on models, relationships, DAX and interactions, with explanations and a running score." },
      { id: "workbook", name: "Printable workbook", price: 3, kind: "workbook", description: "The whole guide as a PDF with every lesson, quiz and exercise, and the worked solutions at the back." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "sql-queries": {
    name: "SQL Queries for Data Analysis",
    slug: "sql-queries",
    code: "SQ",
    price: 39,
    summary: "SELECT, WHERE, GROUP BY, JOINs, revenue across tables, subqueries and views, in a free SQLite tool.",
    description: "An interactive browser guide to querying data with SQL in the free DB Browser for SQLite: selecting, filtering and sorting, counting and grouping, inner and left joins, calculating revenue across four tables, and subqueries, views and safe changes, with a practice bookshop database where every answer is checked against the data.",
    page: "sql-queries.html",
    guidePath: "guides/sql-queries/",
    confirmationPath: "thank-you/sql-queries/",
    addons: [
      { id: "customer-report", name: "Bonus project: customer value report", price: 4, kind: "project", description: "An extra lesson that builds a view of every customer's spend and value tier with CASE, and finds the biggest order." },
      { id: "practice-pack", name: "Extra practice pack", price: 3, kind: "practice", description: "Three more exercises with worked solutions: importing a CSV, querying by date, and finding books nobody has bought." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "The guide's shortcuts and every lesson's key steps as a PDF, for quick reference while you write queries." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "obsidian-notes": {
    name: "Linked Notes in Obsidian",
    slug: "obsidian-notes",
    code: "MD",
    price: 20,
    summary: "Markdown notes, links and backlinks, tags and properties, the graph, Canvas, daily notes and templates.",
    description: "An interactive browser guide to building a personal knowledge base in Obsidian: Markdown notes in a vault you own, links and backlinks, folders, tags and properties, the graph view and Canvas, daily notes and templates, and embeds, callouts and backups, with a small practice vault.",
    page: "obsidian-notes.html",
    guidePath: "guides/obsidian-notes/",
    confirmationPath: "thank-you/obsidian-notes/",
    addons: [
      { id: "reading-project", name: "Bonus project: reading notes system", price: 4, kind: "project", description: "An extra lesson that sets up a reading template, linked ideas and a live search index for books and articles." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on vaults, links, embeds, properties and plugins, with explanations and a running score." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "Every Obsidian shortcut in the guide and the key steps of each lesson, as a PDF to print." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "python-automation": {
    name: "Python for Everyday Automation",
    slug: "python-automation",
    code: "PY",
    price: 45,
    summary: "Small Python scripts that tidy folders, total CSV exports, extract text and run on a schedule.",
    description: "An interactive browser guide to automating everyday computer tasks with Python and Visual Studio Code, from installing Python to running scripts on a schedule: Python basics, tidying folders with pathlib, reports from CSV files, finding text with regular expressions, and functions, error handling and command-line options, with practice files and finished scripts to compare.",
    page: "python-automation.html",
    guidePath: "guides/python-automation/",
    confirmationPath: "thank-you/python-automation/",
    addons: [
      { id: "renamer-project", name: "Bonus project: safe photo renamer", price: 4, kind: "project", description: "An extra lesson that renames photos to a date pattern without overwriting anything, with a log and an undo script." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on Python basics, files, CSV, regular expressions and errors, with explanations." },
      { id: "workbook", name: "Printable workbook", price: 3, kind: "workbook", description: "The whole guide as a PDF with every lesson, quiz and exercise, and the worked solutions at the back." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "The VS Code shortcuts and each lesson's key steps on paper, to keep beside you while you code." }
    ],
    checkoutUrl: ""
  },
  "python-pandas": {
    name: "Data Analysis with Python & pandas",
    slug: "python-pandas",
    code: "PA",
    price: 89,
    summary: "Load, filter, clean, group, merge, pivot and chart data with pandas in a Jupyter notebook.",
    description: "An interactive browser guide to analyzing data with Python and pandas in a Jupyter notebook: loading and exploring a CSV, selecting and filtering, cleaning duplicates, messy text and missing values, calculated columns and groupby, merging tables, dates and pivot tables, and charts and exports, with practice data, a starter notebook and a completed notebook.",
    page: "python-pandas.html",
    guidePath: "guides/python-pandas/",
    confirmationPath: "thank-you/python-pandas/",
    addons: [
      { id: "report-project", name: "Bonus project: reusable monthly report", price: 5, kind: "project", description: "An extra lesson that turns the analysis into functions that clean any orders file and write a multi-sheet Excel report." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on DataFrames, cleaning, grouping and merging, each answered from the practice data." },
      { id: "workbook", name: "Printable workbook", price: 3, kind: "workbook", description: "The whole guide as a PDF with every lesson, quiz and exercise, and the worked solutions at the back." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "machine-learning-sklearn": {
    name: "Machine Learning Foundations with scikit-learn",
    slug: "machine-learning-sklearn",
    code: "SK",
    price: 145,
    summary: "Regression, classification, pipelines, trees and forests, cross-validation and responsible use, with real numbers.",
    description: "An interactive browser guide to machine learning with Python and scikit-learn, in eight lessons: the train-and-test workflow, exploring data, linear regression, classification metrics, preprocessing pipelines, decision trees and random forests, cross-validation and tuning, and thresholds, leakage, fairness and saving models, with two practice datasets and notebooks whose results match the guide exactly.",
    page: "machine-learning-sklearn.html",
    guidePath: "guides/machine-learning-sklearn/",
    confirmationPath: "thank-you/machine-learning-sklearn/",
    addons: [
      { id: "price-pipeline", name: "Bonus project: full house-price pipeline", price: 5, kind: "project", description: "An extra lesson that adds the neighborhood with a pipeline, compares it with the simpler model and checks errors by area." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on fitting, metrics, overfitting, tuning and pipelines, with explanations." },
      { id: "workbook", name: "Printable workbook", price: 3, kind: "workbook", description: "The whole guide as a PDF with every lesson, quiz and exercise, and the worked solutions at the back." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "git-github": {
    name: "Version Control with Git & GitHub",
    slug: "git-github",
    code: "GH",
    price: 35,
    summary: "Commits, undoing safely, branches, merge conflicts, and pushing, pulling and pull requests on GitHub.",
    description: "An interactive browser guide to version control with Git and GitHub: setting up Git, staging and committing, looking back and undoing safely, branches and merging, resolving merge conflicts, and publishing to GitHub with push, pull and pull requests, with a small practice website to track.",
    page: "git-github.html",
    guidePath: "guides/git-github/",
    confirmationPath: "thank-you/git-github/",
    addons: [
      { id: "release-project", name: "Bonus project: tags, releases and a changelog", price: 4, kind: "project", description: "An extra lesson that marks versions with tags, writes a changelog from history and publishes a GitHub release." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on status, staging, branches, merges and remotes, with explanations." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "The guide's shortcuts and every lesson's key steps as a PDF, for quick reference at the terminal." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "html-css": {
    name: "Build a Web Page with HTML & CSS",
    slug: "html-css",
    code: "HC",
    price: 38,
    summary: "A responsive one-page site from plain text: structure, styling, the box model, Flexbox, Grid and media queries.",
    description: "An interactive browser guide to building a responsive one-page website for a small café with HTML and CSS: page structure and meaning, styling with selectors and custom properties, the box model, Flexbox and Grid layouts, a labeled contact form, and media queries and finishing touches, with the content, a hero picture and a finished version to compare.",
    page: "html-css.html",
    guidePath: "guides/html-css/",
    confirmationPath: "thank-you/html-css/",
    addons: [
      { id: "second-page", name: "Bonus project: second page and dark mode", price: 4, kind: "project", description: "An extra lesson that adds an About page sharing the stylesheet, and dark mode with custom properties." },
      { id: "practice-pack", name: "Extra practice pack", price: 3, kind: "practice", description: "Three more exercises with worked solutions: an opening-hours table, a link styled as a button, and a two-column layout." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "The editor and browser shortcuts and every lesson's key steps on paper." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "javascript-basics": {
    name: "JavaScript Fundamentals for the Browser",
    slug: "javascript-basics",
    code: "JV",
    price: 49,
    summary: "Variables, functions, arrays and objects, the DOM, events and forms, fetch and localStorage, in one small app.",
    description: "An interactive browser guide to JavaScript in the browser, built around a small expense tracker: variables and types, functions and decisions, arrays and objects with map, filter and reduce, changing the page with the DOM, events and forms, and loading data with fetch and saving it with localStorage, with starter files and a finished version.",
    page: "javascript-basics.html",
    guidePath: "guides/javascript-basics/",
    confirmationPath: "thank-you/javascript-basics/",
    addons: [
      { id: "chart-project", name: "Bonus project: a category chart without libraries", price: 4, kind: "project", description: "An extra lesson that totals spending by category with reduce and draws bars with plain elements that update live." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on types, arrays, the DOM, events and async code, with explanations." },
      { id: "workbook", name: "Printable workbook", price: 3, kind: "workbook", description: "The whole guide as a PDF with every lesson, quiz and exercise, and the worked solutions at the back." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "The console and editor shortcuts and every lesson's key steps as a PDF." }
    ],
    checkoutUrl: ""
  },
  "command-line": {
    name: "Command Line Essentials",
    slug: "command-line",
    code: "CM",
    price: 27,
    summary: "Navigate, manage files, read and search text, pipes and redirects, and a first script, in Bash or zsh.",
    description: "An interactive browser guide to the command line in Bash and zsh, with PowerShell equivalents: moving around folders, creating, copying, moving and deleting files safely, reading files, searching and filtering with grep and pipes, redirects and find, and a first script with variables, permissions, PATH and aliases, with a practice folder maker, a server log and a CSV file.",
    page: "command-line.html",
    guidePath: "guides/command-line/",
    confirmationPath: "thank-you/command-line/",
    addons: [
      { id: "backup-project", name: "Bonus project: dated backup script", price: 4, kind: "project", description: "An extra lesson that writes a script to make dated backups, keep the newest few and log every run." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on navigation, files, grep, pipes and scripts, with explanations." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "Every terminal shortcut in the guide and the key steps of each lesson, as a PDF to keep beside your keyboard." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "docker-containers": {
    name: "Containers with Docker",
    slug: "docker-containers",
    code: "DK",
    price: 85,
    summary: "Run, build and combine containers: images, Dockerfiles, layers, volumes, Compose and safe sharing.",
    description: "An interactive browser guide to containers with Docker, in seven lessons: images and containers, running and managing containers, building your own image, layers and caching, keeping data with volumes, running several services with Docker Compose, and sharing images with good security habits, built around a small practice web app with no extra libraries.",
    page: "docker-containers.html",
    guidePath: "guides/docker-containers/",
    confirmationPath: "thank-you/docker-containers/",
    addons: [
      { id: "postgres-project", name: "Bonus project: add a database service", price: 5, kind: "project", description: "An extra lesson that adds PostgreSQL to the Compose setup with a volume, a health check and a backup command." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on images, Dockerfiles, volumes and Compose, with explanations and a running score." },
      { id: "workbook", name: "Printable workbook", price: 3, kind: "workbook", description: "The whole guide as a PDF with every lesson, quiz and exercise, and the worked solutions at the back." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "The terminal shortcuts and each lesson's key steps and commands as a PDF." }
    ],
    checkoutUrl: ""
  },
  "gimp-photo-editing": {
    name: "Photo Editing in GIMP",
    slug: "gimp-photo-editing",
    code: "GP",
    price: 34,
    summary: "Crop and straighten, fix exposure and color, retouch, cut out with masks, and export, in free software.",
    description: "An interactive browser guide to editing photos in GIMP, the free image editor: the workspace, cropping, straightening and resizing, exposure and color with levels and curves, healing and cloning, selections, layer masks and cutouts, and text, sharpening and export, with practice images made for each lesson.",
    page: "gimp-photo-editing.html",
    guidePath: "guides/gimp-photo-editing/",
    confirmationPath: "thank-you/gimp-photo-editing/",
    addons: [
      { id: "collage-project", name: "Bonus project: three-photo collage", price: 4, kind: "project", description: "An extra lesson that builds a square social collage with guides, layer masks and a shared color treatment." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on tools, adjustments, retouching and export, with explanations." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "Every GIMP shortcut in the guide and the key steps of each lesson, as a PDF to print." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "krita-digital-painting": {
    name: "Digital Painting in Krita",
    slug: "krita-digital-painting",
    code: "KR",
    price: 36,
    summary: "Brushes, layers and blending modes, coloring line art, light and shadow, transforms and export.",
    description: "An interactive browser guide to digital painting in Krita, the free painting program: canvas, brushes and navigation, layers and blending modes, coloring line art with the fill tool and colorize masks, light and shadow, selections and transformations, and adjustments and export, with line art, a value study and a color palette to work with.",
    page: "krita-digital-painting.html",
    guidePath: "guides/krita-digital-painting/",
    confirmationPath: "thank-you/krita-digital-painting/",
    addons: [
      { id: "pattern-project", name: "Bonus project: a seamless pattern", price: 4, kind: "project", description: "An extra lesson that paints a repeating pattern tile in wrap-around mode and checks it for seams." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on brushes, layers, blending modes and export, with explanations." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "Every Krita shortcut in the guide and the key steps of each lesson, as a PDF to keep beside your tablet." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "canva-social-graphics": {
    name: "Social Media Graphics in Canva",
    slug: "canva-social-graphics",
    code: "CV",
    price: 21,
    summary: "Right sizes, clear type, brand colors, photos and frames, tidy layouts, animation and export.",
    description: "An interactive browser guide to designing consistent social media graphics in Canva: sizes and the editor, text hierarchy, brand colors and logos, photos, frames and grids, alignment and safe zones, and resizing, animation and export, with a practice brand, photos and post text, and free-plan alternatives wherever a feature needs a paid plan.",
    page: "canva-social-graphics.html",
    guidePath: "guides/canva-social-graphics/",
    confirmationPath: "thank-you/canva-social-graphics/",
    addons: [
      { id: "carousel-project", name: "Bonus project: five-slide carousel", price: 3, kind: "project", description: "An extra lesson that designs a carousel with one slide template, a strong hook and a clear call to action." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 1, kind: "quizbank", description: "Eight more questions on sizes, type, color, layout and export, with explanations." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "Every Canva shortcut in the guide and the key steps of each lesson, as a PDF." }
    ],
    checkoutUrl: ""
  },
  "godot-game-dev": {
    name: "2D Game Development in Godot",
    slug: "godot-game-dev",
    code: "GD",
    price: 65,
    summary: "A small platformer from scratch: scenes, GDScript movement, tiles, camera, coins, score, sound and export.",
    description: "An interactive browser guide to making a small 2D platformer in the free Godot Engine 4: projects, scenes and nodes, a player that runs and jumps in GDScript, input actions and tuning, platforms, tiles and a following camera, coins and signals, and a score, sound and an exported game, with sprites, a sound effect and finished scripts.",
    page: "godot-game-dev.html",
    guidePath: "guides/godot-game-dev/",
    confirmationPath: "thank-you/godot-game-dev/",
    addons: [
      { id: "enemy-project", name: "Bonus project: a patrolling enemy", price: 5, kind: "project", description: "An extra lesson that adds an enemy that patrols platforms, turns at edges and restarts the level on contact." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on nodes, physics, input, signals and export, with explanations." },
      { id: "workbook", name: "Printable workbook", price: 3, kind: "workbook", description: "The whole guide as a PDF with every lesson, quiz and exercise, and the worked solutions at the back." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "freecad-3d-printing": {
    name: "3D-Printable Parts in FreeCAD",
    slug: "freecad-3d-printing",
    code: "FC",
    price: 55,
    summary: "Constrained sketches, pads and pockets, holes, fillets, parameters and STL export for 3D printing.",
    description: "An interactive browser guide to designing parts for 3D printing in FreeCAD's Part Design workbench: navigation, fully constrained sketches, pads and pockets, holes on sketched faces, fillets, chamfers and patterns, and spreadsheet-driven parameters and STL export, built around a shelf bracket from a dimensioned drawing.",
    page: "freecad-3d-printing.html",
    guidePath: "guides/freecad-3d-printing/",
    confirmationPath: "thank-you/freecad-3d-printing/",
    addons: [
      { id: "box-project", name: "Bonus project: a box with a snug lid", price: 5, kind: "project", description: "An extra lesson that designs a parametric box and a matching lid with a clearance you tune for your printer." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on sketches, features, parameters and printing, with explanations." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "The FreeCAD shortcuts and each lesson's key steps as a PDF to keep beside you." },
      { id: "workbook", name: "Printable workbook", price: 3, kind: "workbook", description: "The whole guide as a PDF with every lesson, quiz and exercise, and the worked solutions at the back." }
    ],
    checkoutUrl: ""
  },
  "after-effects-motion": {
    name: "Motion Graphics in After Effects",
    slug: "after-effects-motion",
    code: "AE",
    price: 69,
    summary: "A ten-second logo sting: keyframes, easing, shape and text animation, parenting, precomps and rendering.",
    description: "An interactive browser guide to motion graphics in Adobe After Effects, built around a ten-second logo animation: compositions and layers, keyframes and transform properties, easing and the graph editor, shape layers and animated text, parenting, precomps and mattes, and timing to music and rendering, with a storyboard, artwork and a music loop.",
    page: "after-effects-motion.html",
    guidePath: "guides/after-effects-motion/",
    confirmationPath: "thank-you/after-effects-motion/",
    addons: [
      { id: "lower-third-project", name: "Bonus project: reusable lower third", price: 5, kind: "project", description: "An extra lesson that builds an animated lower third with Essential Graphics controls for quick reuse." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on keyframes, easing, layers and rendering, with explanations." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "Every After Effects shortcut in the guide and the key steps of each lesson, as a PDF." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "audacity-audio": {
    name: "Audio Editing & Podcasts in Audacity",
    slug: "audacity-audio",
    code: "AU",
    price: 26,
    summary: "Edit spoken audio, remove noise, hum and clicks, set loudness, duck music and export a podcast episode.",
    description: "An interactive browser guide to editing spoken audio and producing a short podcast in Audacity: navigation and editing, removing noise, hum and clicks, compression and loudness normalization, music beds with fades and automatic ducking, and labels, metadata and export, with a raw test recording full of problems to fix and a music bed.",
    page: "audacity-audio.html",
    guidePath: "guides/audacity-audio/",
    confirmationPath: "thank-you/audacity-audio/",
    addons: [
      { id: "macro-project", name: "Bonus project: one-click clean-up macro", price: 3, kind: "project", description: "An extra lesson that saves the clean-up chain as a macro to run on every new recording." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on editing, noise reduction, loudness and export, with explanations." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "Every Audacity shortcut in the guide and the key steps of each lesson, as a PDF to print." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "lmms-beat-making": {
    name: "Beat Making in LMMS",
    slug: "lmms-beat-making",
    code: "BM",
    price: 42,
    summary: "Drums, chords and bass, arrangement, mixing, automation and export, in a free music program.",
    description: "An interactive browser guide to making a complete beat in LMMS, the free music production program: the workspace, programming drums in the Beat+Bassline Editor, instruments and the Piano Roll, arranging a song, mixing with the FX Mixer, and automation and export, with drum samples, MIDI chords and bass, and a song plan.",
    page: "lmms-beat-making.html",
    guidePath: "guides/lmms-beat-making/",
    confirmationPath: "thank-you/lmms-beat-making/",
    addons: [
      { id: "pump-project", name: "Bonus project: pumping chords", price: 4, kind: "project", description: "An extra lesson that makes the chords dip on every beat with an amplifier and an LFO controller." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on patterns, notes, mixing and export, with explanations." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "Every LMMS shortcut in the guide and the key steps of each lesson, as a PDF." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  },
  "obs-streaming": {
    name: "Recording & Streaming with OBS Studio",
    slug: "obs-streaming",
    code: "ST",
    price: 29,
    summary: "Scenes and sources, clean microphone audio, transitions and hotkeys, safe recording and streaming.",
    description: "An interactive browser guide to recording and streaming with OBS Studio: setup and the OBS window, screen, camera and overlay sources, clean and consistent audio with filters, scenes, transitions and hotkeys, crash-safe recording, and streaming safely and using the virtual camera, with overlays, a test tone and a show plan.",
    page: "obs-streaming.html",
    guidePath: "guides/obs-streaming/",
    confirmationPath: "thank-you/obs-streaming/",
    addons: [
      { id: "countdown-project", name: "Bonus project: live clock and countdown", price: 3, kind: "project", description: "An extra lesson that adds a countdown and a clock to your scenes with local Browser sources." },
      { id: "quiz-pack", name: "Extra quiz pack", price: 2, kind: "quizbank", description: "Eight more questions on scenes, sources, audio, recording and streaming, with explanations." },
      { id: "cheat-sheet", name: "Printable cheat sheet", price: 2, kind: "cheatsheet", description: "The OBS shortcuts and each lesson's key steps as a PDF to keep beside your setup." },
      { id: "flashcards", name: "Flashcard deck", price: 1, kind: "flashcards", description: "An interactive, shuffled deck of the guide's shortcuts and quiz questions, with a pile for cards you're still learning." }
    ],
    checkoutUrl: ""
  }
};
