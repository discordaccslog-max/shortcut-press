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
    summary: "All seven guides, unlocked by a single license.",
    description: "All seven Shortcut Press guides, unlocked by a single license code. Each guide is complete on its own, with lessons, diagrams, quizzes, exercises with worked solutions, a keyboard shortcut trainer, practice files and progress tracking, so you can work through them in any order.",
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
  }
};
