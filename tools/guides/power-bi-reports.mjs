import { k } from "./_helpers.mjs";

// Small sales dataset: 3 stores, 4 products, 24 orders across Jan-Mar 2026.
const STORES = [["StoreID", "Store", "City"], [1, "Harbor", "Seaview"], [2, "Hilltop", "Ridgeford"], [3, "Market", "Seaview"]];
const PRODUCTS = [["ProductID", "Product", "Category", "Price"], [10, "Espresso beans", "Coffee", 14], [11, "Pour-over kit", "Equipment", 38], [12, "Ceramic mug", "Equipment", 12], [13, "Decaf beans", "Coffee", 13]];
const ORDERS = [
  ["OrderID", "Date", "StoreID", "ProductID", "Units"],
  [5001, "2026-01-03", 1, 10, 4], [5002, "2026-01-05", 2, 11, 1], [5003, "2026-01-08", 3, 12, 6], [5004, "2026-01-12", 1, 13, 2],
  [5005, "2026-01-15", 2, 10, 5], [5006, "2026-01-19", 3, 10, 3], [5007, "2026-01-24", 1, 12, 2], [5008, "2026-01-28", 2, 13, 4],
  [5009, "2026-02-02", 3, 11, 2], [5010, "2026-02-06", 1, 10, 6], [5011, "2026-02-09", 2, 12, 3], [5012, "2026-02-13", 3, 13, 1],
  [5013, "2026-02-17", 1, 11, 1], [5014, "2026-02-20", 2, 10, 2], [5015, "2026-02-24", 3, 12, 4], [5016, "2026-02-27", 1, 13, 3],
  [5017, "2026-03-03", 2, 11, 2], [5018, "2026-03-06", 3, 10, 7], [5019, "2026-03-10", 1, 12, 5], [5020, "2026-03-14", 2, 13, 2],
  [5021, "2026-03-18", 3, 11, 1], [5022, "2026-03-21", 1, 10, 3], [5023, "2026-03-25", 2, 12, 2], [5024, "2026-03-29", 3, 13, 4],
];
const csv = (rows) => rows.map((r) => r.join(",")).join("\r\n") + "\r\n";

export default {
  id: "power-bi-reports",
  slug: "power-bi-reports",
  title: "Reports & Dashboards in Power BI",
  software: "Power BI Desktop",
  apps: ["Power BI Desktop"],
  intro:
    "Turn three CSV files into an interactive report in Power BI Desktop: load and shape data, build a data model with relationships and a date table, write DAX measures, design visuals, add slicers and drill-down, and export the finished report.",
  platformNote: "Power BI Desktop runs on Windows only. Shortcuts are shown for Windows.",
  store: {
    category: "office",
    level: "Beginner to intermediate",
    software: "Microsoft Power BI Desktop (Windows)",
    softwareShort: "Power BI Desktop",
    softwareHtml: `<p>This guide is written for <strong>Microsoft Power BI Desktop</strong>, a free download for Windows from Microsoft. It doesn't run on a Mac (Mac users can run it in a Windows virtual machine). Power BI Desktop is not included with the guide; you obtain it separately from Microsoft. Publishing reports to the Power BI service needs a work or school account and, for sharing, a paid license; the guide's lessons don't require either.</p>`,
    forWho: [
      "You make the same charts in Excel every month and want a report that updates itself.",
      "You're comfortable with spreadsheets and want to learn data models and measures.",
      "You've opened Power BI Desktop before and weren't sure where to start.",
    ],
    notFor: [
      "You use a Mac without Windows. Power BI Desktop is Windows only.",
      "You need administration of the Power BI service, gateways or company-wide deployment.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "orders.csv", title: "Orders", desc: "24 orders from January to March 2026: date, store, product and units." },
    { name: "products.csv", title: "Products", desc: "Four products with category and price." },
    { name: "stores.csv", title: "Stores", desc: "Three stores and the cities they're in." },
  ],
  shortcuts: [
    { keys: "Ctrl+S", action: "Save the report", app: "Power BI Desktop" },
    { keys: "Ctrl+Z", action: "Undo", app: "Power BI Desktop" },
    { keys: "Ctrl+Y", action: "Redo", app: "Power BI Desktop" },
    { keys: "Ctrl+G", action: "Group the selected visuals", app: "Power BI Desktop" },
    { keys: "Ctrl+Shift+G", action: "Ungroup visuals", app: "Power BI Desktop" },
    { keys: "Ctrl+A", action: "Select all visuals on the page", app: "Power BI Desktop" },
    { keys: "Ctrl+C", action: "Copy the selected visual", app: "Power BI Desktop" },
    { keys: "Ctrl+V", action: "Paste a visual", app: "Power BI Desktop" },
    { keys: "Shift+Enter", action: "New line in the DAX formula bar", app: "Power BI Desktop" },
    { keys: "Ctrl+/", action: "Comment or uncomment a DAX line", app: "Power BI Desktop" },
    { keys: "Alt+ArrowUp", action: "Move a DAX line up", app: "Power BI Desktop" },
    { keys: "Alt+ArrowDown", action: "Move a DAX line down", app: "Power BI Desktop" },
  ],
  lessons: [
    {
      id: "get-data",
      title: "Get and shape the data",
      summary: "Load three CSV files into Power BI Desktop, check them in Power Query, and find your way around the report, table and model views.",
      diagram: { type: "flow", nodes: ["Get data", "Transform (Power Query)", "Load", "Model", "Report"], highlight: 1, title: "From files to report" },
      steps: [
        {
          title: "Three views",
          body: `<p>Open Power BI Desktop and start a blank report. The icons down the left edge switch between <strong>Report</strong> view (the canvas where visuals go), <strong>Table</strong> view (the loaded data, called Data view in older versions) and <strong>Model</strong> view (tables and the relationships between them).</p>`,
        },
        {
          title: "Load the CSV files",
          body: `<p>Choose <em>Home › Get data › Text/CSV</em>, pick <strong>orders.csv</strong>, and in the preview select <em>Transform Data</em>. Repeat for products.csv and stores.csv, using <em>New Source</em> inside Power Query, so all three open in the Power Query Editor.</p>`,
        },
        {
          title: "Check types and names",
          body: `<p>In Power Query, check each column's type icon: Date should be a date, Units and Price numbers, IDs whole numbers. Rename queries to Orders, Products and Stores in the <em>Query Settings</em> pane. Power Query in Power BI works the same way as in Excel: each change is an applied step.</p>`,
        },
        {
          title: "Close & Apply",
          body: `<p>Select <em>Home › Close &amp; Apply</em>. The tables appear in the <em>Data</em> pane on the right of Report view. Save the report as a .pbix file with ${k("Ctrl", "S")}. The .pbix holds the data, the model and every page of the report.</p>`,
        },
      ],
      quiz: [
        { q: "Which view shows the tables and the relationships between them?", options: ["Report view", "Table view", "Model view", "Power Query"], answer: 2, explain: "Model view is a diagram of tables and relationships." },
        { q: "What does Close & Apply do?", options: ["Publishes the report", "Loads the shaped queries into the model", "Deletes the source files", "Exports to Excel"], answer: 1, explain: "It runs the queries and loads the results into Power BI's model." },
      ],
      exercise: {
        title: "Load the three tables",
        task: `<p>Load <strong>orders.csv</strong>, <strong>products.csv</strong> and <strong>stores.csv</strong> through Power Query, set sensible types, name the queries Orders, Products and Stores, and save the report as coffee-sales.pbix. How many rows does Orders have?</p>`,
        files: ["orders.csv", "products.csv", "stores.csv"],
        solution: [
          "<em>Home › Get data › Text/CSV</em> › orders.csv › <em>Transform Data</em>; inside Power Query, <em>New Source › Text/CSV</em> for the other two.",
          "Check types: Date as Date, Units and Price as Whole/Decimal Number, the ID columns as Whole Number.",
          "Rename each query in <em>Query Settings › Name</em>.",
          "<em>Close &amp; Apply</em>, then Ctrl+S and name the file coffee-sales.pbix.",
          "In Table view, select Orders: the status bar shows <strong>24 rows</strong>.",
        ],
      },
    },
    {
      id: "model",
      title: "The data model",
      summary: "Connect fact and dimension tables with relationships, understand filter direction, and add a date table for time-based analysis.",
      diagram: { type: "tree", root: "Orders (fact table)", items: [["Products: ProductID → many orders", 1, true], ["Stores: StoreID → many orders", 1], ["Dates: Date → many orders", 1], ["Filters flow from one side to many side", 2]], caption: "A star schema: one fact table, several lookup tables" },
      steps: [
        {
          title: "Facts and dimensions",
          body: `<p><strong>Orders</strong> is a fact table: one row per event, with numbers to add up. <strong>Products</strong> and <strong>Stores</strong> are dimension tables: one row per thing, with descriptions to slice by. Arranged around the fact table, they form a <em>star schema</em>, the shape Power BI works best with.</p>`,
        },
        {
          title: "Relationships",
          body: `<p>In Model view, drag <em>ProductID</em> from Products onto <em>ProductID</em> in Orders. A line appears with <strong>1</strong> at the Products end and <strong>*</strong> (many) at the Orders end. Do the same for StoreID. Power BI may have created these automatically; double-click a line to check its columns and cardinality.</p>`,
        },
        {
          title: "Filter direction",
          body: `<p>The arrow on a relationship line shows which way filters travel: from the one side to the many side. Selecting “Coffee” in a Category slicer filters Products, which filters Orders. Leave the cross filter direction as <em>Single</em> unless you have a specific reason; <em>Both</em> can make results hard to predict.</p>`,
        },
        {
          title: "A date table",
          body: `<p>Choose <em>Table tools › New table</em> (or <em>Modeling › New table</em>) and type <code>Dates = CALENDAR(DATE(2026,1,1), DATE(2026,12,31))</code>. Add columns with <em>New column</em>, for example <code>Month = FORMAT(Dates[Date], "mmm")</code> and <code>MonthNo = MONTH(Dates[Date])</code>. Select the table and choose <em>Mark as date table</em>, then relate Dates[Date] to Orders[Date].</p>`,
        },
      ],
      quiz: [
        { q: "In the relationship between Products and Orders, which table is on the 'many' side?", options: ["Products", "Orders", "Neither", "Both"], answer: 1, explain: "Each product appears once in Products but in many rows of Orders." },
        { q: "Why add a separate date table?", options: ["Power BI can't read dates in CSV files", "It gives every date and columns like month for time-based slicing and DAX time intelligence", "It makes the file smaller", "It's needed for relationships to work"], answer: 1, explain: "A continuous, marked date table makes month-level grouping and time functions reliable." },
      ],
      exercise: {
        title: "Build the star schema",
        task: `<p>In Model view, relate Products and Stores to Orders, add a Dates table for 2026 with Month and MonthNo columns, mark it as the date table and relate it to Orders. Sort the Month column by MonthNo so months appear in calendar order.</p>`,
        files: ["orders.csv", "products.csv", "stores.csv"],
        solution: [
          "Model view: drag Products[ProductID] to Orders[ProductID] and Stores[StoreID] to Orders[StoreID]; check each is one-to-many, single direction.",
          '<em>New table</em>: <code>Dates = CALENDAR(DATE(2026,1,1), DATE(2026,12,31))</code>. Add <code>Month = FORMAT(Dates[Date], "mmm")</code> and <code>MonthNo = MONTH(Dates[Date])</code> with <em>New column</em>.',
          "Select Dates, <em>Mark as date table</em>, choose the Date column.",
          "Drag Dates[Date] onto Orders[Date].",
          "In Table view, select the Month column and choose <em>Column tools › Sort by column › MonthNo</em>.",
        ],
      },
    },
    {
      id: "dax",
      title: "Measures with DAX",
      summary: "Write measures for revenue, units, averages and shares, understand why measures beat calculated columns for totals, and meet CALCULATE.",
      diagram: { type: "code", lang: "DAX measures", lines: ["Revenue = SUMX(Orders, Orders[Units] * RELATED(Products[Price]))", "Units = SUM(Orders[Units])", "Orders count = COUNTROWS(Orders)", "Coffee revenue = CALCULATE([Revenue], Products[Category] = \"Coffee\")"], highlight: [0], notes: [] },
      steps: [
        {
          title: "Measures, not stored numbers",
          body: `<p>A <strong>measure</strong> is a formula that's calculated for whatever is being shown: the whole report, one store, one month. Select the Orders table in the Data pane and choose <em>Home › New measure</em>. Type <code>Units = SUM(Orders[Units])</code> in the formula bar and press Enter.</p>`,
        },
        {
          title: "Revenue across two tables",
          body: `<p>Price lives in Products, units in Orders. <code>SUMX</code> goes row by row through a table and adds up an expression; <code>RELATED</code> fetches the matching value across a relationship:</p><p><code>Revenue = SUMX(Orders, Orders[Units] * RELATED(Products[Price]))</code></p><p>Press ${k("Shift", "Enter")} for a new line to keep long measures readable.</p>`,
        },
        {
          title: "DIVIDE for safe ratios",
          body: `<p><code>Avg order value = DIVIDE([Revenue], COUNTROWS(Orders))</code>. DIVIDE returns blank instead of an error when there's nothing to divide by, for example in a month with no orders. Set a measure's format in <em>Measure tools › Format</em> (currency, decimal places).</p>`,
        },
        {
          title: "CALCULATE changes the filter",
          body: `<p><code>CALCULATE</code> evaluates a measure with filters you add: <code>Coffee revenue = CALCULATE([Revenue], Products[Category] = "Coffee")</code>. Share of total uses <code>ALL</code> to remove a filter: <code>Share = DIVIDE([Revenue], CALCULATE([Revenue], ALL(Products)))</code>.</p>`,
        },
      ],
      quiz: [
        { q: "Why does Revenue need SUMX and RELATED?", options: ["SUM can't add decimals", "Units and Price are in different tables, so each row's units must be multiplied by its product's price", "RELATED makes it faster", "It formats the result as currency"], answer: 1, explain: "SUMX multiplies row by row, and RELATED brings in the price from Products." },
        { q: "What does DIVIDE do when the denominator is zero?", options: ["Returns an error", "Returns blank (or an alternative you give)", "Returns zero always", "Stops the report"], answer: 1, explain: "DIVIDE handles division by zero without an error." },
      ],
      exercise: {
        title: "Write the core measures",
        task: `<p>Create the measures Units, Revenue, Orders count and Avg order value, format Revenue and Avg order value as currency, and add a Coffee revenue measure with CALCULATE. Put each in a card visual. What's total revenue?</p>`,
        files: ["orders.csv", "products.csv"],
        solution: [
          "Select Orders, <em>New measure</em>: <code>Units = SUM(Orders[Units])</code> (75 units).",
          "<code>Revenue = SUMX(Orders, Orders[Units] * RELATED(Products[Price]))</code>; <em>Measure tools › Format › Currency</em>.",
          "<code>Orders count = COUNTROWS(Orders)</code> (24) and <code>Avg order value = DIVIDE([Revenue], [Orders count])</code>.",
          '<code>Coffee revenue = CALCULATE([Revenue], Products[Category] = "Coffee")</code>.',
          "Add four card visuals. Total revenue is <strong>$1,158</strong>: coffee $628 (espresso beans $14 × 30 units + decaf $13 × 16 units) and equipment $530.",
        ],
      },
    },
    {
      id: "visuals",
      title: "Visuals that answer questions",
      summary: "Build bar, line, card and matrix visuals, choose fields for each well, and format them for a clean, readable page.",
      diagram: { type: "chartpick", title: "Choose the visual for the question" },
      steps: [
        {
          title: "Add a visual",
          body: `<p>In Report view, click an empty spot on the canvas, then pick a visual in the <em>Visualizations</em> pane, such as <em>Clustered bar chart</em>. Drag Stores[Store] into the <em>Y-axis</em> well and the Revenue measure into <em>X-axis</em>. Each visual's wells (axis, values, legend) are shown under its icon.</p>`,
        },
        {
          title: "Time with a line chart",
          body: `<p>Add a <em>Line chart</em> with Dates[Month] on the X-axis and Revenue as the value. If months appear alphabetically, check that Month is sorted by MonthNo (Lesson 2). A line chart answers “how is it changing?”; a bar chart answers “which is biggest?”.</p>`,
        },
        {
          title: "Cards and a matrix",
          body: `<p>Cards show one headline number each: Revenue, Units, Avg order value. A <em>Matrix</em> is a pivot table: put Products[Category] and Products[Product] in <em>Rows</em>, Dates[Month] in <em>Columns</em> and Revenue in <em>Values</em>. Use the + icons in the matrix to expand categories into products.</p>`,
        },
        {
          title: "Format for reading",
          body: `<p>Select a visual and open <em>Format visual</em> (the paintbrush in the Visualizations pane). Give each a clear title that says what it shows, turn on data labels where exact values matter, and remove gridlines you don't need. Align visuals with <em>Format › Align</em>, and keep three to six visuals per page.</p>`,
        },
      ],
      quiz: [
        { q: "Which visual is best for revenue by month?", options: ["Pie chart", "Line chart", "Card", "Slicer"], answer: 1, explain: "Line charts show change over time." },
        { q: "Months appear as Apr, Feb, Jan… What's the fix?", options: ["Rename the months", "Sort the Month column by MonthNo", "Use a pie chart", "Delete the date table"], answer: 1, explain: "Sort by column makes text months follow their number." },
      ],
      exercise: {
        title: "Build the first page",
        task: `<p>On page 1, add three cards (Revenue, Units, Avg order value), a bar chart of revenue by store, a line chart of revenue by month, and a matrix of revenue by category and product. Give every visual a title. Which store sold the most?</p>`,
        files: ["orders.csv", "products.csv", "stores.csv"],
        solution: [
          "Three <em>Card</em> visuals with the three measures.",
          "<em>Clustered bar chart</em>: Stores[Store] on the Y-axis, Revenue on the X-axis.",
          "<em>Line chart</em>: Dates[Month] on the X-axis, Revenue as the value. January $380, February $362, March $416.",
          "<em>Matrix</em>: Category and Product in Rows, Revenue in Values.",
          "The bar chart shows <strong>Market</strong> highest at $439, then Harbor at $369 and Hilltop at $350.",
        ],
      },
    },
    {
      id: "interactivity",
      title: "Slicers, filters and drill-down",
      summary: "Let readers filter the page with slicers, control how visuals filter each other, drill from category to product, and add helpful tooltips.",
      diagram: { type: "flow", nodes: ["Click a slicer", "Products filtered", "Orders filtered", "Every visual updates"], highlight: 0, title: "One click filters the whole page" },
      steps: [
        {
          title: "Slicers",
          body: `<p>Add a <em>Slicer</em> visual and put Products[Category] in its <em>Field</em> well. Clicking Coffee filters every visual on the page. In <em>Format visual › Slicer settings</em>, choose a style such as <em>Tile</em> (buttons) or <em>Dropdown</em>. A slicer on Dates[Date] gives a date range slider.</p>`,
        },
        {
          title: "Visuals filter each other",
          body: `<p>Click a bar in the store chart: the other visuals highlight or filter to that store. To control this, select the bar chart and choose <em>Format › Edit interactions</em>. Small icons appear on the other visuals: <em>Filter</em>, <em>Highlight</em> or <em>None</em>. Select <em>Edit interactions</em> again to finish.</p>`,
        },
        {
          title: "Drill-down",
          body: `<p>Put both Category and Product in a bar chart's axis well. Arrows appear above the visual: turn on <em>drill down</em> (the single down arrow), then click a category bar to see its products. The up arrow goes back. This keeps a chart simple until someone wants detail.</p>`,
        },
        {
          title: "Filters pane and tooltips",
          body: `<p>The <em>Filters</em> pane applies filters to one visual, the page, or all pages, and you can hide or lock them before sharing. Drag a measure into a visual's <em>Tooltips</em> well so hovering shows extra numbers, such as Units alongside Revenue.</p>`,
        },
      ],
      quiz: [
        { q: "How do you stop the store chart from filtering the line chart?", options: ["Delete the relationship", "Format › Edit interactions, then choose None on the line chart", "Use a different measure", "Lock the filters pane"], answer: 1, explain: "Edit interactions controls how a selected visual affects each other visual." },
        { q: "What does drill-down need in the axis well?", options: ["A measure", "Two or more levels, such as Category then Product", "A date table", "A slicer"], answer: 1, explain: "Drill-down moves between levels of a hierarchy in the axis." },
      ],
      exercise: {
        title: "Make the page interactive",
        task: `<p>Add a Category slicer as tiles and a Store slicer as a dropdown. Stop the bar chart from filtering the cards (so the cards always show the slicer selection). Put Category then Product on the bar chart's axis and drill into Coffee.</p>`,
        files: [],
        solution: [
          "<em>Slicer</em> with Products[Category]; <em>Format visual › Slicer settings › Style › Tile</em>. Another slicer with Stores[Store], style <em>Dropdown</em>.",
          "Select the bar chart, <em>Format › Edit interactions</em>, and choose <em>None</em> on each card. Select <em>Edit interactions</em> again.",
          "Change the bar chart's axis to Products[Category] then Products[Product] (replace Store, or make a new chart).",
          "Turn on drill down and click the Coffee bar: Espresso beans $420 and Decaf beans $208.",
        ],
      },
    },
    {
      id: "finish",
      title: "Design, export and share",
      summary: "Apply a theme and consistent layout, add a second page with page navigation, check the mobile layout, and export or publish the report.",
      diagram: { type: "layers", items: ["Theme: colors and fonts", "Layout grid: aligned visuals", "Pages with navigation", "Export: PDF or publish"], highlight: 0, caption: "Finishing touches, from look to delivery" },
      steps: [
        {
          title: "Themes",
          body: `<p>Choose <em>View › Themes</em> and pick one, or select <em>Customize current theme</em> to set your own colors and fonts. Every visual follows the theme, so you don't recolor charts one by one. Keep one accent color for the thing that matters most on each page.</p>`,
        },
        {
          title: "Pages and navigation",
          body: `<p>Add a page with the + tab at the bottom and rename it by double-clicking its tab. For navigation buttons, choose <em>Insert › Buttons › Navigator › Page navigator</em>: it adds a button for every page. In Power BI Desktop, hold ${k("Ctrl")} and click a button to follow it while editing.</p>`,
        },
        {
          title: "Mobile layout",
          body: `<p>Choose <em>View › Mobile layout</em>. A phone-shaped canvas appears; drag visuals from the <em>Page visuals</em> pane onto it in the order a phone reader should see them, usually cards first. This layout is used when the report is opened in the Power BI mobile apps.</p>`,
        },
        {
          title: "Export or publish",
          body: `<p><em>File › Export › Export to PDF</em> saves every page as a PDF, which anyone can open. To share an interactive version, <em>Home › Publish</em> sends the report to the Power BI service; that needs a work or school account, and sharing with others usually needs a paid license. Either way, keep the .pbix file as your master copy.</p>`,
        },
      ],
      quiz: [
        { q: "Where do you set colors and fonts for every visual at once?", options: ["Format visual on each chart", "View › Themes", "Model view", "Power Query"], answer: 1, explain: "A theme applies colors and fonts across the whole report." },
        { q: "Which option shares the report without any Power BI account?", options: ["Home › Publish", "File › Export › Export to PDF", "Mobile layout", "Edit interactions"], answer: 1, explain: "A PDF can be opened by anyone; publishing needs a Power BI service account." },
      ],
      exercise: {
        title: "Finish and export",
        task: `<p>Apply a theme, add a second page called “Products” with the matrix and a slicer, add a page navigator to both pages, set up the mobile layout for page 1, and export the report to PDF.</p>`,
        files: [],
        solution: [
          "<em>View › Themes</em>: pick one, or <em>Customize current theme</em> to set your colors.",
          "Select + at the bottom, double-click the new tab and rename it Products. Cut the matrix from page 1 (Ctrl+X) and paste it (Ctrl+V), then add a Category slicer.",
          "On each page, <em>Insert › Buttons › Navigator › Page navigator</em>.",
          "<em>View › Mobile layout</em>; drag the three cards, then the line chart, onto the phone canvas.",
          "<em>File › Export › Export to PDF</em>. The PDF has one page per report page.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-targets",
      title: "Bonus project: monthly targets and variance",
      summary: "Add a targets table, relate it through the date table, and build a report page that shows each store's revenue against target with conditional colors.",
      diagram: { type: "bars", values: [369, 400, 350, 400, 439, 400], labels: ["Harb.", "tgt", "Hill.", "tgt", "Mkt", "tgt"], highlight: 2, title: "Each store against its quarter target" },
      steps: [
        {
          title: "A targets table",
          body: `<p>Choose <em>Home › Enter data</em> and type a small table: Store and Target, with each store's quarterly target (for example 400 each). Name it Targets and relate Targets[Store] to Stores[Store] (one-to-one or one-to-many, single direction from Stores).</p>`,
        },
        {
          title: "Variance measures",
          body: `<p><code>Target = SUM(Targets[Target])</code>, <code>Variance = [Revenue] - [Target]</code> and <code>Variance % = DIVIDE([Variance], [Target])</code>. Format Variance % as a percentage.</p>`,
        },
        {
          title: "Conditional colors",
          body: `<p>In a table visual with Store, Revenue, Target and Variance, open <em>Format visual › Cell elements</em>, choose the Variance series and turn on <em>Font color</em>. Select <em>fx</em>, set <em>Format style</em> to <em>Rules</em>: if the value is less than 0, red; otherwise green.</p>`,
        },
      ],
      quiz: [
        { q: "Hilltop has revenue of 350 against a target of 400. What's Variance %?", options: ["−12.5%", "14.3%", "−50%", "87.5%"], answer: 0, explain: "(350 − 400) ÷ 400 = −12.5%." },
        { q: "Where do you type a small table straight into Power BI?", options: ["Get data › Text/CSV", "Home › Enter data", "New measure", "Model view › Properties"], answer: 1, explain: "Enter data creates a table from values you type or paste." },
      ],
      exercise: {
        title: "Build the targets page",
        task: `<p>Add a Targets table with a quarterly target of 400 for each store, write Target, Variance and Variance % measures, and build a table visual with red or green variance colors. Which stores beat their target?</p>`,
        files: ["stores.csv"],
        solution: [
          "<em>Home › Enter data</em>: Store = Harbor, Hilltop, Market; Target = 400, 400, 400. Name it Targets and relate it to Stores on Store.",
          "Write the three measures from step 2.",
          "Table visual: Stores[Store], Revenue, Target, Variance, Variance %. Add the font color rule on Variance.",
          "Only <strong>Market</strong> beats its target (+39, +9.8%); Harbor is −31 (−7.8%) and Hilltop −50 (−12.5%).",
        ],
      },
    },
    quizbank: [
      { q: "What file type does Power BI Desktop save reports as?", options: [".xlsx", ".pbix", ".pdf", ".csv"], answer: 1, explain: "A .pbix file holds the data, model and report pages." },
      { q: "Which DAX function counts the rows of a table?", options: ["COUNT", "COUNTROWS", "ROWS", "SUMX"], answer: 1, explain: "COUNTROWS(Orders) returns the number of rows in the current filter context." },
      { q: "What does RELATED do?", options: ["Creates a relationship", "Fetches a value from the one side of a relationship for the current row", "Filters a table", "Adds a date table"], answer: 1, explain: "RELATED works in row context to pull a value across a relationship." },
      { q: "A slicer on Category filters Orders because…", options: ["Slicers filter every table", "The filter flows from Products (one side) to Orders (many side)", "Orders contains the Category column", "Of the date table"], answer: 1, explain: "Filters travel along relationships from the one side to the many side." },
      { q: "What is a fact table?", options: ["A table of descriptions", "A table of events with numbers to aggregate", "A table of dates", "A hidden table"], answer: 1, explain: "Fact tables record events (orders); dimension tables describe things (products, stores)." },
      { q: "Which function removes filters inside CALCULATE?", options: ["FILTER", "ALL", "RELATED", "VALUES"], answer: 1, explain: "ALL(Products) ignores any filter on Products." },
      { q: "With this guide's data, how many units of Ceramic mugs were sold?", options: ["18", "22", "25", "12"], answer: 1, explain: "6 + 2 + 3 + 4 + 5 + 2 = 22 mugs." },
      { q: "Where do you change whether a clicked bar filters or highlights another visual?", options: ["Filters pane", "Format › Edit interactions", "Model view", "View › Themes"], answer: 1, explain: "Edit interactions sets Filter, Highlight or None for each visual." },
    ],
  },
  async makeFiles() {
    return { "orders.csv": csv(ORDERS), "products.csv": csv(PRODUCTS), "stores.csv": csv(STORES) };
  },
};
