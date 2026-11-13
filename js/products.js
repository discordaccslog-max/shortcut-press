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
  }
};
