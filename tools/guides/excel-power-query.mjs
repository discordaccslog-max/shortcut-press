import { k } from "./_helpers.mjs";

const SALES_HEAD = ["OrderID", "Date", "Region", "Product", "Units", "UnitPrice"];
const JAN = [
  [1001, "2026-01-04", "North", "Notebook", 12, 3.5],
  [1002, "2026-01-06", "South", "Pen set", 30, 4.25],
  [1003, "2026-01-09", "East", "Stapler", 5, 8.75],
  [1004, "2026-01-12", "North", "Folder", 40, 1.2],
  [1005, "2026-01-15", "West", "Notebook", 20, 3.5],
  [1006, "2026-01-19", "South", "Desk lamp", 2, 24],
  [1007, "2026-01-23", "East", "Pen set", 15, 4.25],
  [1008, "2026-01-28", "West", "Folder", 25, 1.2],
];
const FEB = [
  [1009, "2026-02-02", "North", "Stapler", 6, 8.75],
  [1010, "2026-02-05", "East", "Notebook", 18, 3.5],
  [1011, "2026-02-11", "South", "Folder", 50, 1.2],
  [1012, "2026-02-16", "West", "Desk lamp", 3, 24],
  [1013, "2026-02-20", "North", "Pen set", 22, 4.25],
  [1014, "2026-02-25", "East", "Folder", 10, 1.2],
];
const PRODUCTS = [["Product", "Category"], ["Notebook", "Paper"], ["Folder", "Paper"], ["Pen set", "Writing"], ["Stapler", "Desk"], ["Desk lamp", "Desk"]];
const TARGETS = [["Region", "Jan", "Feb", "Mar"], ["North", 90, 100, 110], ["South", 120, 110, 130], ["East", 60, 70, 80], ["West", 70, 80, 90]];
const CONTACTS = `name,email,phone,location
"  ana LOPEZ ",ana.lopez@example.com,555-0101,"Austin, TX"
BEN carter,ben.carter@example.com,(555) 0102,"Denver, CO"
,,,
chloe  nguyen,chloe.nguyen@example.com,555.0103,"Portland, OR"
Dev Patel ,dev.patel@example.com,5550104,"Austin, TX"
BEN carter,ben.carter@example.com,(555) 0102,"Denver, CO"
ella brooks,ella.brooks@example.com,555-0105,"Boise, ID"
,,,
finn olsen,finn.olsen@example.com,555 0106,"Denver, CO"
`;
const csv = (rows) => [SALES_HEAD, ...rows].map((r) => r.join(",")).join("\r\n") + "\r\n";

export default {
  id: "excel-power-query",
  slug: "excel-power-query",
  title: "Cleaning Data with Excel Power Query",
  software: "Excel",
  apps: ["Excel"],
  intro:
    "Use Power Query in Microsoft Excel to clean and reshape data with steps you record once and refresh forever: importing files, fixing text and types, unpivoting, appending months of exports, merging lookup tables, and grouping into a report.",
  platformNote: "Shortcuts are shown for Excel for Windows. On a Mac, use Cmd in place of Ctrl where the shortcut exists; Power Query in Excel for Mac has fewer menu options.",
  store: {
    category: "office",
    level: "Intermediate",
    software: "Microsoft Excel (Microsoft 365 or Excel 2021 and later, for Windows)",
    softwareShort: "Excel",
    softwareHtml: `<p>This guide is written for <strong>Microsoft Excel for Windows</strong> (Microsoft 365, Excel 2021 or Excel 2024), where Power Query is built in under the <em>Data</em> tab. Excel for Mac (Microsoft 365) includes the Power Query editor too, but some options, such as combining files from a folder, may be missing or in different places. Excel is not included with the guide; you need your own copy or subscription, obtained separately from Microsoft.</p>`,
    forWho: [
      "You clean the same exported data by hand every week or month.",
      "You're comfortable with Excel tables and basic formulas and want to stop copying and pasting.",
      "You combine data from several files or look values up from another table.",
    ],
    notFor: [
      "You're new to Excel. Start with Spreadsheet Formulas & Functions.",
      "You want to write advanced M code or connect to company databases. The guide uses the editor's buttons, with a little M where it helps.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "contacts-messy.csv", title: "Messy contacts", desc: "Nine rows of contact data with stray spaces, mixed capitals, blank rows, a duplicate and a combined location column." },
    { name: "sales-jan.csv", title: "January sales export", desc: "Eight orders exported from a sales system." },
    { name: "sales-feb.csv", title: "February sales export", desc: "Six more orders with the same columns, for appending." },
    { name: "lookups.xlsx", title: "Lookup workbook", desc: "A product-to-category table and a wide table of monthly targets to unpivot." },
  ],
  shortcuts: [
    { keys: "Ctrl+T", action: "Format a range as a table", app: "Excel" },
    { keys: "Ctrl+Alt+F5", action: "Refresh all queries and connections", app: "Excel" },
    { keys: "Alt+F5", action: "Refresh the selected query's table", app: "Excel" },
    { keys: "Ctrl+Shift+L", action: "Turn filters on or off", app: "Excel" },
    { keys: "Alt+ArrowDown", action: "Open a column's filter menu", app: "Excel" },
    { keys: "Ctrl+Space", action: "Select the column", app: "Excel" },
    { keys: "Ctrl+Shift+ArrowDown", action: "Extend the selection to the last filled cell", app: "Excel" },
    { keys: "F2", action: "Rename the selected column (Power Query Editor)", app: "Power Query" },
    { keys: "Shift+F10", action: "Open the context menu for the selection", app: "Excel" },
    { keys: "Ctrl+Z", action: "Undo (in the editor, delete the last applied step instead)", app: "Excel" },
  ],
  lessons: [
    {
      id: "editor",
      title: "Get data and the Power Query Editor",
      summary: "Import a CSV file, find your way around the Power Query Editor, and see how every change is recorded as an applied step.",
      diagram: { type: "flow", nodes: ["Source file", "Applied steps", "Close & Load", "Excel table", "Refresh"], highlight: 1, title: "Power Query records steps, then replays them on refresh" },
      steps: [
        {
          title: "Import, but transform first",
          body: `<p>On the <em>Data</em> tab, choose <em>From Text/CSV</em> and pick <strong>contacts-messy.csv</strong>. A preview opens. Instead of <em>Load</em>, select <em>Transform Data</em>: that opens the Power Query Editor, where you clean the data before it reaches the worksheet.</p>`,
        },
        {
          title: "The editor at a glance",
          body: `<p>The middle shows a preview of the data. On the left, the <em>Queries</em> pane lists every query in the workbook. On the right, <em>Query Settings</em> holds the query's name and the <strong>Applied Steps</strong> list. Turn on <em>View › Formula Bar</em> to see each step's formula, written in Power Query's language, M.</p>`,
        },
        {
          title: "Steps, not edits",
          body: `<p>Power Query never changes the source file. Each click you make adds a step, such as “Promoted Headers” or “Changed Type”. Select an earlier step to see the data as it was at that point; select the X beside a step to delete it. That's how you undo in the editor.</p>`,
        },
        {
          title: "Close & Load, then refresh",
          body: `<p>On the <em>Home</em> tab, select <em>Close & Load</em>. The cleaned data lands in a new sheet as an Excel table, and the query appears in <em>Data › Queries & Connections</em>. When the source file changes, press ${k("Ctrl", "Alt", "F5")} (<em>Refresh All</em>) and every step runs again on the new data.</p>`,
        },
      ],
      quiz: [
        { q: "What happens to the original CSV file when you clean it in Power Query?", options: ["It's overwritten with the cleaned data", "Nothing: Power Query reads it and records steps", "It's converted to an Excel file", "It's moved into the workbook"], answer: 1, explain: "Queries read the source and apply steps to a copy; the file itself is never changed." },
        { q: "How do you undo a change in the Power Query Editor?", options: ["Delete the step in Applied Steps", "Close and reopen Excel", "Edit the CSV file", "Refresh the query"], answer: 0, explain: "Select the X next to the step you want to remove." },
      ],
      exercise: {
        title: "Import the contacts",
        task: `<p>Import <strong>contacts-messy.csv</strong> into the Power Query Editor, rename the query “Contacts”, turn on the formula bar, and look at the steps Power Query added automatically. Then close and load it to a new sheet.</p>`,
        files: ["contacts-messy.csv"],
        solution: [
          "<em>Data › From Text/CSV</em>, choose the file, then <em>Transform Data</em>.",
          "In <em>Query Settings</em>, select the <em>Name</em> box, type “Contacts” and press Enter.",
          "<em>View › Formula Bar</em>. Two or three steps are already listed, usually <em>Source</em>, <em>Promoted Headers</em> and <em>Changed Type</em>.",
          "<em>Home › Close & Load</em>. The data, still messy, arrives in a new sheet as a table with 9 rows, including the two blank ones.",
        ],
      },
    },
    {
      id: "clean-text",
      title: "Clean text, rows and types",
      summary: "Trim stray spaces, fix capitals, split a combined column, remove blank and duplicate rows, and set data types.",
      diagram: { type: "table", head: ["name (before)", "name (after)", "city", "state"], rows: [["  ana LOPEZ ", "Ana Lopez", "Austin", "TX"], ["BEN carter", "Ben Carter", "Denver", "CO"], ["chloe  nguyen", "Chloe Nguyen", "Portland", "OR"]], highlight: { cols: [1] }, caption: "Trim, Capitalize Each Word and Split Column, recorded as three steps" },
      steps: [
        {
          title: "Trim and capitalize",
          body: `<p>Right-click the Contacts query in <em>Data › Queries & Connections</em> and choose <em>Edit</em>. Select the <em>name</em> column, then on the <em>Transform</em> tab open <em>Format</em> and choose <em>Trim</em> (removes spaces at the start and end), then <em>Format › Capitalize Each Word</em>.</p>`,
        },
        {
          title: "Spaces in the middle",
          body: `<p>Trim leaves double spaces inside text (“Chloe  Nguyen”). With the column selected, choose <em>Transform › Replace Values</em>, type two spaces in <em>Value To Find</em> and one space in <em>Replace With</em>.</p>`,
        },
        {
          title: "Split a combined column",
          body: `<p>Select <em>location</em> and choose <em>Home › Split Column › By Delimiter</em>. Choose <em>Custom</em>, type a comma followed by a space, and split at each occurrence. Rename the new columns <em>city</em> and <em>state</em>: double-click a header or press ${k("F2")}.</p>`,
        },
        {
          title: "Remove blanks and duplicates, then set types",
          body: `<p><em>Home › Remove Rows › Remove Blank Rows</em> drops the empty lines. Select the <em>email</em> column and choose <em>Remove Rows › Remove Duplicates</em>: rows with an email already seen are dropped. Finally, set each column's type with the icon at the left of its header (<em>ABC</em> for text, <em>123</em> for whole numbers).</p>`,
        },
      ],
      quiz: [
        { q: "What does Trim remove?", options: ["All spaces", "Spaces at the start and end only", "Double spaces in the middle", "Non-printing characters"], answer: 1, explain: "Trim removes leading and trailing whitespace; Replace Values fixes doubled spaces inside the text, and Clean removes non-printing characters." },
        { q: "You select the email column and choose Remove Duplicates. Which rows go?", options: ["Rows where every column repeats", "Later rows whose email repeats an earlier one", "All rows with an email", "The first row of each pair"], answer: 1, explain: "Remove Duplicates keeps the first occurrence of each value in the selected columns." },
      ],
      exercise: {
        title: "Clean the contacts",
        task: `<p>Edit the Contacts query: trim and capitalize the names, fix double spaces, split location into city and state, remove blank rows and duplicates by email, and make phone numbers digits only with a custom column. How many contacts are left?</p>`,
        files: ["contacts-messy.csv"],
        solution: [
          "Select <em>name</em>; <em>Transform › Format › Trim</em>, then <em>Format › Capitalize Each Word</em>; <em>Replace Values</em>: two spaces to one.",
          "Select <em>location</em>; <em>Split Column › By Delimiter</em>, custom delimiter “, ” (comma and space); rename to city and state.",
          "<em>Remove Rows › Remove Blank Rows</em>; select <em>email</em>, <em>Remove Rows › Remove Duplicates</em>.",
          'For the phones, <em>Add Column › Custom Column</em>, name it “phone digits”, formula <code>Text.Select([phone], {"0".."9"})</code>; then remove the old phone column.',
          "<strong>6 contacts</strong> are left (9 rows minus 2 blank rows and 1 duplicate). Close & Load.",
        ],
      },
    },
    {
      id: "reshape",
      title: "Reshape: unpivot and headers",
      summary: "Turn a wide table with one column per month into a long table that pivot tables and charts can use.",
      diagram: { type: "compare", left: { title: "Wide (one column per month)", items: ["Region  Jan  Feb  Mar", "North    90  100  110", "South   120  110  130", "Hard to filter or chart"] }, right: { title: "Long (one row per value)", items: ["Region  Month  Target", "North   Jan     90", "North   Feb    100", "North   Mar    110", "Ready for pivots"] }, accentRight: true, title: "Unpivot turns columns into rows" },
      steps: [
        {
          title: "Why long beats wide",
          body: `<p>A table with a column per month is easy to read but hard to work with: adding April means a new column, and a pivot table can't treat “month” as a field. A long table has one row per region per month, with a Month column and a value column, and grows by rows.</p>`,
        },
        {
          title: "Bring in a table from the workbook",
          body: `<p>Open <strong>lookups.xlsx</strong>, go to the <em>Targets</em> sheet, click inside the data and press ${k("Ctrl", "T")} to make it a table. Then choose <em>Data › From Table/Range</em>: the table opens in the Power Query Editor.</p>`,
        },
        {
          title: "Unpivot Other Columns",
          body: `<p>Select the <em>Region</em> column (the one to keep), then choose <em>Transform › Unpivot Columns › Unpivot Other Columns</em>. Every month column becomes rows in two new columns, <em>Attribute</em> and <em>Value</em>. Rename them <em>Month</em> and <em>Target</em>. Because you chose <em>Other</em> columns, a new April column is included on the next refresh.</p>`,
        },
        {
          title: "Headers in the wrong place",
          body: `<p>Exports sometimes put a title line above the headers. Use <em>Home › Remove Rows › Remove Top Rows</em> to drop it, then <em>Home › Use First Row as Headers</em>. If a column holds a value only on its first row of each group, select it and choose <em>Transform › Fill › Down</em>.</p>`,
        },
      ],
      quiz: [
        { q: "Why choose Unpivot Other Columns rather than Unpivot Columns?", options: ["It's faster", "Columns added to the source later are unpivoted too", "It keeps the original wide table", "It sorts the result"], answer: 1, explain: "It names the columns to keep, so any new month column is unpivoted automatically." },
        { q: "After unpivoting a 4-region, 3-month table, how many rows are there?", options: ["4", "7", "12", "3"], answer: 2, explain: "One row per region per month: 4 × 3 = 12." },
      ],
      exercise: {
        title: "Unpivot the targets",
        task: `<p>Unpivot the <em>Targets</em> sheet of <strong>lookups.xlsx</strong> into a Region, Month, Target table, set Target to whole number, and load it. Then add an Apr column of your own to the source table and refresh.</p>`,
        files: ["lookups.xlsx"],
        solution: [
          `Click in the targets data, press ${k("Ctrl", "T")}, confirm <em>My table has headers</em>, then <em>Data › From Table/Range</em>.`,
          "Select <em>Region</em>, then <em>Transform › Unpivot Columns › Unpivot Other Columns</em>.",
          "Rename <em>Attribute</em> to Month and <em>Value</em> to Target; set Target's type to Whole Number. 12 rows. <em>Close & Load</em>.",
          `Back in the source table, type “Apr” in E1 and four numbers below; press ${k("Ctrl", "Alt", "F5")}. The loaded table now has 16 rows.`,
        ],
      },
    },
    {
      id: "append",
      title: "Append months of data",
      summary: "Stack monthly exports into one table with Append, or point Power Query at a folder and combine every file in it.",
      diagram: { type: "layers", items: ["sales-feb.csv (6 rows)", "sales-jan.csv (8 rows)", "Appended: 14 rows, same columns"], highlight: 2, caption: "Append stacks tables that share column names" },
      steps: [
        {
          title: "Import each month as a connection",
          body: `<p>Import <strong>sales-jan.csv</strong> with <em>From Text/CSV</em> and <em>Transform Data</em>, then choose <em>Home › Close & Load › Close & Load To</em> and pick <em>Only Create Connection</em>. Do the same for February. Connection-only queries do their work without filling a sheet.</p>`,
        },
        {
          title: "Append Queries as New",
          body: `<p>In any query in the editor, choose <em>Home › Append Queries › Append Queries as New</em>, pick the two monthly queries and select <em>OK</em>. The new query stacks February under January, matching columns by name. Rename it “Sales”.</p>`,
        },
        {
          title: "Or combine a whole folder",
          body: `<p>Put every monthly export in one folder. Choose <em>Data › Get Data › From File › From Folder</em>, pick the folder and select <em>Combine & Transform Data</em>. Power Query builds helper queries and one combined query, with a <em>Source.Name</em> column that records which file each row came from. Next month, drop the new file into the folder and refresh.</p>`,
        },
        {
          title: "Check the result",
          body: `<p>Look at the row count in the editor's status bar (bottom left) and filter a column with its header arrow to spot surprises. Set types after appending: Units as whole number, UnitPrice as decimal, Date as date.</p>`,
        },
      ],
      quiz: [
        { q: "How does Append match the columns of the two tables?", options: ["By position", "By column name", "By data type", "It doesn't: it adds new columns"], answer: 1, explain: "Columns with the same name are stacked; a column only one table has is filled with null in the other's rows." },
        { q: "What does Only Create Connection do?", options: ["Deletes the query", "Saves the query without loading data to a sheet", "Loads to a pivot table", "Shares the query"], answer: 1, explain: "The query is available to other queries but doesn't fill a worksheet." },
      ],
      exercise: {
        title: "One sales table",
        task: `<p>Bring <strong>sales-jan.csv</strong> and <strong>sales-feb.csv</strong> in as connection-only queries, append them into a new query called Sales, add a Revenue column (Units × UnitPrice), and load it. How many rows, and what's the total revenue?</p>`,
        files: ["sales-jan.csv", "sales-feb.csv"],
        solution: [
          "Import each file with <em>Transform Data</em>, then <em>Close & Load To › Only Create Connection</em>.",
          "Edit either query, choose <em>Home › Append Queries › Append Queries as New</em>, select both, <em>OK</em>; rename the result “Sales”.",
          "Set Units to Whole Number and UnitPrice to Decimal Number.",
          "<em>Add Column › Custom Column</em>, name “Revenue”, formula <code>[Units] * [UnitPrice]</code>; set its type to Decimal Number.",
          "<em>Close & Load</em>: <strong>14 rows</strong>; the Revenue column totals <strong>826</strong> (473 in January and 353 in February).",
        ],
      },
    },
    {
      id: "merge",
      title: "Merge: look up values from another table",
      summary: "Join two queries on a shared column to bring in matching values, and choose the right kind of join.",
      diagram: { type: "table", head: ["Product", "Revenue", "Category (merged)"], rows: [["Notebook", "42.00", "Paper"], ["Pen set", "127.50", "Writing"], ["Stapler", "43.75", "Desk"]], highlight: { cols: [2] }, caption: "Merge matches on Product and expands Category" },
      steps: [
        {
          title: "Merge is a lookup for whole tables",
          body: `<p>Merging does what XLOOKUP does for a single cell, but for every row at once and as a recorded step. Bring the <em>Products</em> sheet of <strong>lookups.xlsx</strong> in as a connection-only query (make it a table, then <em>From Table/Range</em>).</p>`,
        },
        {
          title: "Merge Queries",
          body: `<p>Edit the Sales query and choose <em>Home › Merge Queries</em>. Select the <em>Product</em> column in Sales, choose Products in the second dropdown and select its <em>Product</em> column. Leave <em>Join Kind</em> as <em>Left Outer</em>: keep every sales row and bring in matches. The dialog shows how many rows matched.</p>`,
        },
        {
          title: "Expand the new column",
          body: `<p>A new column appears with <em>Table</em> in every cell. Select the expand icon in its header, tick only <em>Category</em>, untick <em>Use original column name as prefix</em>, and select <em>OK</em>.</p>`,
        },
        {
          title: "Other join kinds",
          body: `<p><em>Inner</em> keeps only rows that match in both tables. <em>Left Anti</em> keeps rows in the first table with <em>no</em> match, which is handy for finding products missing from the lookup table. <em>Full Outer</em> keeps everything from both.</p>`,
        },
      ],
      quiz: [
        { q: "Which join keeps every row of the first table and adds matching values from the second?", options: ["Inner", "Left Outer", "Right Anti", "Full Outer"], answer: 1, explain: "Left Outer keeps all rows on the left; rows without a match get null." },
        { q: "You want a list of sales rows whose product isn't in the lookup table. Which join?", options: ["Left Anti", "Inner", "Left Outer", "Full Outer"], answer: 0, explain: "Left Anti returns only the left-table rows with no match." },
      ],
      exercise: {
        title: "Add categories to Sales",
        task: `<p>Merge the Products lookup into Sales to add a Category column. Use the expand step to bring in only Category. Then check the merge: how many of the 14 rows matched?</p>`,
        files: ["lookups.xlsx"],
        solution: [
          "Make the Products sheet a table, <em>Data › From Table/Range</em>, then <em>Close & Load To › Only Create Connection</em>.",
          "Edit Sales; <em>Home › Merge Queries</em>; select Product in both tables; Join Kind <em>Left Outer</em>.",
          "The dialog reports that the selection matches <strong>14 of 14</strong> rows. Select <em>OK</em>.",
          "Expand the new column, tick only Category, untick the prefix option, <em>OK</em>. Close & Load.",
        ],
      },
    },
    {
      id: "report",
      title: "Group, summarize and refresh",
      summary: "Group rows into totals, load summaries where you need them, and set queries to refresh so the report updates itself.",
      diagram: { type: "table", head: ["Category", "Revenue"], rows: [["Paper", "325.00"], ["Writing", "284.75"], ["Desk", "216.25"]], highlight: { rows: [0] }, caption: "Group By: one row per category, Sum of Revenue" },
      steps: [
        {
          title: "Reference, don't duplicate",
          body: `<p>Right-click Sales in the <em>Queries</em> pane and choose <em>Reference</em>. The new query starts from Sales' result, so cleaning steps happen once and both queries stay in step. Rename it “Revenue by category”.</p>`,
        },
        {
          title: "Group By",
          body: `<p>Choose <em>Home › Group By</em>. Group by <em>Category</em>, name the new column <em>Revenue</em>, set the operation to <em>Sum</em> and the column to <em>Revenue</em>. Choose <em>Advanced</em> to group by more than one column or add more aggregations, such as a count of rows.</p>`,
        },
        {
          title: "Load where it's useful",
          body: `<p><em>Close & Load To</em> can put a query in a table, a PivotTable report, or only a connection. A common setup: the detailed Sales query as connection-only, the summaries as tables on a Report sheet, and a PivotTable built straight from Sales.</p>`,
        },
        {
          title: "Keep it fresh",
          body: `<p>In <em>Data › Queries & Connections</em>, right-click a query and choose <em>Properties</em>. Tick <em>Refresh data when opening the file</em>, or <em>Refresh every</em> so many minutes. ${k("Ctrl", "Alt", "F5")} refreshes everything at once.</p>`,
        },
      ],
      quiz: [
        { q: "Why use Reference instead of Duplicate for a summary query?", options: ["Duplicates can't be grouped", "A reference builds on the original's result, so cleaning happens once", "References load faster to sheets", "Duplicate deletes the original"], answer: 1, explain: "A duplicate copies all the steps; a reference starts from the other query's output and stays in step with it." },
        { q: "With this guide's data, what's the Paper category's revenue?", options: ["175", "284.75", "325", "826"], answer: 2, explain: "Notebooks 175 plus folders 150." },
      ],
      exercise: {
        title: "Revenue by category and region",
        task: `<p>Reference the Sales query, group it by Category to get total Revenue, and load it as a table. Then make a second reference grouped by Region. Which region had the highest revenue?</p>`,
        files: ["sales-jan.csv", "sales-feb.csv", "lookups.xlsx"],
        solution: [
          "Right-click Sales › <em>Reference</em>; rename to “Revenue by category”.",
          "<em>Home › Group By</em>: by Category, new column Revenue, Sum of Revenue. Result: Paper 325, Writing 284.75, Desk 216.25.",
          "<em>Close & Load</em>. Repeat with a new reference grouped by Region.",
          "<strong>North</strong> is highest at 236, just ahead of South at 235.5; East has 182.5 and West 172.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-folder-report",
      title: "Bonus project: a report that refreshes itself",
      summary: "Build a monthly report that combines every export in a folder, merges categories, groups the totals, and updates with one refresh when next month's file arrives.",
      diagram: { type: "flow", nodes: ["Folder of exports", "Combine", "Merge categories", "Group", "Report sheet"], highlight: 0, title: "Drop a file in, refresh, done" },
      steps: [
        {
          title: "Set up the folder",
          body: `<p>Make a folder named <em>sales-exports</em> and put <strong>sales-jan.csv</strong> in it (not February yet). Choose <em>Data › Get Data › From File › From Folder</em>, pick the folder, and select <em>Combine & Transform Data</em>. Rename the combined query “Sales”.</p>`,
        },
        {
          title: "Rebuild the pipeline",
          body: `<p>Add the Revenue custom column, merge the Products lookup for Category, and make two references grouped by Category and by Region, as in Lessons 4 to 6. Load the two summaries to a sheet named Report.</p>`,
        },
        {
          title: "The monthly routine",
          body: `<p>Copy <strong>sales-feb.csv</strong> into the folder and press ${k("Ctrl", "Alt", "F5")}. Every step runs again: the report now covers both months. Turn on <em>Refresh data when opening the file</em> in the query's Properties so opening the workbook is the whole routine.</p>`,
        },
      ],
      quiz: [
        { q: "What does the Source.Name column from a folder query hold?", options: ["The folder's path", "The name of the file each row came from", "The query's name", "The sheet name"], answer: 1, explain: "It records the source file, which is useful for filtering or adding a month column." },
        { q: "After adding February's file and refreshing, what should the report's total revenue be?", options: ["473", "353", "826", "1,299"], answer: 2, explain: "473 + 353 = 826, the same as the appended query in Lesson 4." },
      ],
      exercise: {
        title: "Build and test the folder report",
        task: `<p>Build the folder-based report with January only and note the category totals. Add February's file, refresh, and check the totals match Lesson 6.</p>`,
        files: ["sales-jan.csv", "sales-feb.csv", "lookups.xlsx"],
        solution: [
          "From Folder with only January: total revenue 473. By category: Paper 190 (notebooks 112, folders 78), Writing 191.25, Desk 91.75 (stapler 43.75, lamp 48).",
          "Copy sales-feb.csv into the folder and press Ctrl+Alt+F5.",
          "Totals become Paper 325, Writing 284.75, Desk 216.25, total 826: the same as Lesson 6.",
          "In <em>Queries & Connections</em>, right-click each summary › <em>Properties</em> › tick <em>Refresh data when opening the file</em>.",
        ],
      },
    },
    quizbank: [
      { q: "Which step type does Power Query usually add right after importing a CSV?", options: ["Merged Queries", "Changed Type", "Grouped Rows", "Unpivoted Columns"], answer: 1, explain: "Power Query guesses each column's type and records a Changed Type step." },
      { q: "Where do you see the M formula for the selected step?", options: ["The Queries pane", "The formula bar (View › Formula Bar)", "The Excel cell", "The status bar"], answer: 1, explain: "The formula bar shows the M code behind each applied step." },
      { q: "Which feature fills empty cells with the value above them?", options: ["Replace Values", "Fill Down", "Remove Blank Rows", "Use First Row as Headers"], answer: 1, explain: "Transform › Fill › Down copies the last non-null value into the empty cells below it." },
      { q: "You append a query that has an extra 'Notes' column. What happens to rows from the other query?", options: ["The append fails", "Their Notes cells are null", "The Notes column is dropped", "Rows are matched by position"], answer: 1, explain: "Columns that exist in only one table are kept, with null for the other table's rows." },
      { q: "What does Text.Select([phone], {\"0\"..\"9\"}) return for \"(555) 0102\"?", options: ["(555) 0102", "5550102", "555", "0102"], answer: 1, explain: "Text.Select keeps only the listed characters: the digits." },
      { q: "Which join kind returns only rows that have a match in both tables?", options: ["Left Outer", "Inner", "Left Anti", "Full Outer"], answer: 1, explain: "Inner keeps only matching rows." },
      { q: "What does Ctrl+Alt+F5 do in Excel?", options: ["Opens the Power Query Editor", "Refreshes all queries and connections", "Closes and loads", "Inserts a table"], answer: 1, explain: "Refresh All reruns every query in the workbook." },
      { q: "Why load a detailed query as Only Create Connection?", options: ["It hides it from other queries", "It keeps the workbook small while other queries and PivotTables still use it", "It stops it refreshing", "It converts it to a table"], answer: 1, explain: "The data is available without filling a large worksheet." },
    ],
  },
  async makeFiles({ xlsx }) {
    return {
      "contacts-messy.csv": CONTACTS.replace(/\n/g, "\r\n"),
      "sales-jan.csv": csv(JAN),
      "sales-feb.csv": csv(FEB),
      "lookups.xlsx": xlsx(
        [
          { name: "Products", rows: PRODUCTS, widths: [14, 12] },
          { name: "Targets", rows: TARGETS, widths: [10, 8, 8, 8] },
        ],
        "Lookups"
      ),
    };
  },
};
