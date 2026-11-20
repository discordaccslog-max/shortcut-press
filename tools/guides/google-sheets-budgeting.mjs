import { k, cells } from "./_helpers.mjs";

// March transactions used by the sandbox, the lessons and the practice workbook.
// Dates are spreadsheet serial numbers (46082 = 1 March 2026).
const TX = [
  ["Date", "Description", "Category", "Type", "Amount"],
  [46082, "Paycheck", "Income", "Income", 1200],
  [46082, "Rent", "Housing", "Expense", 950],
  [46084, "Grocery store", "Food", "Expense", 82.4],
  [46086, "Electric bill", "Utilities", "Expense", 61.15],
  [46089, "Bus pass", "Transport", "Expense", 45],
  [46091, "Grocery store", "Food", "Expense", 67.9],
  [46095, "Cinema", "Fun", "Expense", 24],
  [46096, "Paycheck", "Income", "Income", 1200],
  [46099, "Phone plan", "Utilities", "Expense", 35],
  [46103, "Grocery store", "Food", "Expense", 74.25],
  [46108, "Concert ticket", "Fun", "Expense", 58],
];
const BUDGET = [
  ["Category", "Budget", "Actual", "Left", "Status"],
  ["Housing", 950, 950],
  ["Food", 250, 224.55],
  ["Utilities", 90, 96.15],
  ["Transport", 60, 45],
  ["Fun", 100, 82],
];

export default {
  id: "google-sheets-budgeting",
  slug: "google-sheets-budgeting",
  title: "Personal Budgeting in Google Sheets",
  software: "Google Sheets",
  apps: ["Google Sheets"],
  intro:
    "Build a working monthly budget in Google Sheets: a tidy transactions sheet, totals and category summaries with SUMIF and SUMIFS, a budget-versus-actual table, conditional formatting and charts, and a savings goal tracker. Every lesson uses the same month of sample transactions.",
  platformNote: "Shortcuts are shown for Windows and ChromeOS. On a Mac, use Cmd in place of Ctrl and Option in place of Alt.",
  sandbox: true,
  sandboxCells: { ...cells(TX), G1: "Category", G2: "Food", H1: "Spent" },
  sandboxHint: 'Try <code>=SUMIF(D2:D12, "Expense", E2:E12)</code>, <code>=SUMIF(C2:C12, G2, E2:E12)</code> in H2, or <code>=COUNTIF(C2:C12, "Food")</code>.',
  store: {
    category: "office",
    level: "Beginner",
    software: "Google Sheets",
    softwareShort: "Google Sheets",
    softwareHtml: `<p>This guide is written for <strong>Google Sheets</strong> in a web browser. Google Sheets is not included with the guide; you need your own Google account to use it, obtained separately from Google. The practice workbooks also open in Microsoft Excel, but the steps, menus and shortcuts follow Google Sheets.</p>`,
    forWho: [
      "You want a budget you understand, built yourself rather than copied from a template.",
      "You can type into a spreadsheet but haven't used SUMIF, conditional formatting or charts.",
      "You'd like a monthly routine for checking where your money goes.",
    ],
    notFor: [
      "You want financial, tax or investment advice. The guide teaches spreadsheet skills, not what to do with your money.",
      "You need bank connections or automatic imports. The guide works with transactions you enter or paste in.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "budget-starter.xlsx", title: "Budget starter workbook", desc: "March transactions, an empty budget table and a savings goal sheet, ready to import into Google Sheets." },
    { name: "budget-completed.xlsx", title: "Completed budget workbook", desc: "The same workbook with every formula from the guide filled in, to compare with your own." },
  ],
  shortcuts: [
    { keys: "Ctrl+Shift+4", action: "Format as currency", app: "Google Sheets" },
    { keys: "Ctrl+Shift+5", action: "Format as percent", app: "Google Sheets" },
    { keys: "Ctrl+Shift+3", action: "Format as date", app: "Google Sheets" },
    { keys: "Ctrl+;", action: "Insert today's date", app: "Google Sheets" },
    { keys: "Ctrl+D", action: "Fill down", app: "Google Sheets" },
    { keys: "Ctrl+Enter", action: "Fill the selected range with the entry", app: "Google Sheets" },
    { keys: "Ctrl+Shift+V", action: "Paste values only", app: "Google Sheets" },
    { keys: "F4", action: "Switch between relative and absolute references", app: "Google Sheets" },
    { keys: "Ctrl+Space", action: "Select the whole column", app: "Google Sheets" },
    { keys: "Shift+Space", action: "Select the whole row", app: "Google Sheets" },
    { keys: "Ctrl+Shift+7", action: "Add an outer border", app: "Google Sheets" },
    { keys: "Ctrl+Alt+M", action: "Insert a comment", app: "Google Sheets" },
    { keys: "Ctrl+Home", action: "Go to the first cell", app: "Google Sheets" },
    { keys: "Ctrl+/", action: "Show all keyboard shortcuts", app: "Google Sheets" },
    { keys: "Ctrl+Z", action: "Undo", app: "Google Sheets" },
    { keys: "Ctrl+R", action: "Fill right", app: "Google Sheets", practice: false, note: "Your browser uses this shortcut to reload the page." },
  ],
  lessons: [
    {
      id: "setup",
      title: "Set up the budget sheet",
      summary: "Import the practice workbook, lay out a transactions table, and format dates and amounts so the rest of the budget is easy to build.",
      diagram: { type: "grid", cols: ["A", "B", "C", "D", "E"], rows: 4, note: "One row per transaction", cells: { A1: "Date", B1: "Description", C1: "Category", D1: "Type", E1: "Amount", A2: "3/1/2026", B2: "Paycheck", C2: "Income", D2: "Income", E2: "1,200.00", A3: "3/1/2026", B3: "Rent", C3: "Housing", D3: "Expense", E3: "950.00", A4: "3/3/2026", B4: "Grocery", C4: "Food", D4: "Expense", E4: "82.40" }, highlight: { A1: "soft", B1: "soft", C1: "soft", D1: "soft", E1: "soft", C4: "accent" }, title: "A transactions table: one row per money movement" },
      steps: [
        {
          title: "Import the starter workbook",
          body: `<p>In Google Sheets, choose <em>File › Import</em>, select the <em>Upload</em> tab and pick <strong>budget-starter.xlsx</strong>. Choose <em>Replace spreadsheet</em> to open it as a new Google Sheets file. Sheets keeps the three tabs at the bottom: <em>Transactions</em>, <em>Budget</em> and <em>Goals</em>.</p>`,
        },
        {
          title: "One row per transaction",
          body: `<p>A budget works best as a simple list: one row for every money movement, with the same five columns every time: <strong>Date</strong>, <strong>Description</strong>, <strong>Category</strong>, <strong>Type</strong> (Income or Expense) and <strong>Amount</strong>. Keep amounts positive and let the Type column say which way the money went; it makes every total later on simpler.</p>`,
        },
        {
          title: "Freeze the header and format the columns",
          body: `<p>Choose <em>View › Freeze › 1 row</em> so the headings stay visible as the list grows. Select column A (click its letter, or press ${k("Ctrl", "Space")} in it) and press ${k("Ctrl", "Shift", "3")} to show dates. Select column E and press ${k("Ctrl", "Shift", "4")} to show currency.</p>`,
        },
        {
          title: "A dropdown for categories",
          body: `<p>Typos split one category into two (“Food” and “food ”). Select C2:C100, choose <em>Data › Data validation</em>, select <em>Add rule</em>, and set the criteria to <em>Dropdown</em>. Enter Housing, Food, Utilities, Transport, Fun and Income as the options and select <em>Done</em>. Do the same for column D with Income and Expense.</p>`,
        },
      ],
      quiz: [
        { q: "Why keep every amount positive and record the direction in a Type column?", options: ["Google Sheets can't store negative numbers", "It makes totals by type and category simpler to write", "It formats the cells as currency", "It sorts the list by date"], answer: 1, explain: "With a Type column, one SUMIF adds up all income or all expenses without worrying about signs." },
        { q: "Which shortcut formats the selected cells as currency?", options: ["Ctrl+Shift+3", "Ctrl+Shift+4", "Ctrl+Shift+5", "Ctrl+;"], answer: 1, explain: "Ctrl+Shift+4 is currency (the $ key); Ctrl+Shift+5 is percent and Ctrl+Shift+3 is date." },
      ],
      exercise: {
        title: "Tidy the transactions sheet",
        task: `<p>Import <strong>budget-starter.xlsx</strong>. On the <em>Transactions</em> tab, freeze the header row, show column A as dates and column E as currency, and add dropdowns to the Category and Type columns. Then add one new row: today's date, “Coffee”, Food, Expense, 4.50.</p>`,
        files: ["budget-starter.xlsx"],
        solution: [
          "<em>File › Import › Upload</em>, choose the file, then <em>Replace spreadsheet</em> and <em>Import data</em>.",
          "<em>View › Freeze › 1 row</em>.",
          `Click the column A letter and press ${k("Ctrl", "Shift", "3")}; click the column E letter and press ${k("Ctrl", "Shift", "4")}.`,
          "Select C2:C100, <em>Data › Data validation › Add rule</em>, criteria <em>Dropdown</em>, add the six categories, <em>Done</em>. Repeat for D2:D100 with Income and Expense.",
          `Click A13, press ${k("Ctrl", ";")} for today's date, then fill in Coffee, choose Food and Expense from the dropdowns, and type 4.50.`,
        ],
      },
    },
    {
      id: "totals",
      title: "Totals with SUM and SUMIF",
      summary: "Add up all income and all expenses, and work out what's left at the end of the month.",
      diagram: { type: "flow", nodes: ["Check each Type", "Keep the matches", "Add their Amounts", "One total"], highlight: 2, title: "How SUMIF adds only matching rows" },
      steps: [
        {
          title: "SUM adds a whole range",
          body: `<p><code>=SUM(E2:E12)</code> adds every amount, but in a budget that mixes income with spending, which isn't a useful number. You need a total that only counts some rows.</p>`,
        },
        {
          title: "SUMIF adds only the rows that match",
          body: `<p><code>=SUMIF(range, criterion, sum_range)</code> checks each cell in <em>range</em> against the <em>criterion</em> and adds the matching cells in <em>sum_range</em>:</p><p><code>=SUMIF(D2:D12, "Income", E2:E12)</code> adds every amount whose Type is Income.</p><p>Change the criterion to <code>"Expense"</code> for total spending.</p>`,
        },
        {
          title: "What's left over",
          body: `<p>Put the two totals in their own cells, for example income in H2 and expenses in H3, then subtract: <code>=H2-H3</code>. Label each one in column G so the numbers explain themselves. With the sample data, income is 2,400.00, spending is 1,397.70 and 1,002.30 is left.</p>`,
        },
        {
          title: "Whole-column ranges for a growing list",
          body: `<p>A range like <code>D2:D12</code> stops at row 12, so new transactions aren't counted. In Google Sheets you can write <code>D2:D</code> and <code>E2:E</code> instead, which run to the bottom of the sheet: <code>=SUMIF(D2:D, "Expense", E2:E)</code>.</p>`,
        },
      ],
      quiz: [
        { q: "In =SUMIF(D2:D12, \"Expense\", E2:E12), which range is added up?", options: ["D2:D12", "E2:E12", "Both ranges", "Neither: it counts rows"], answer: 1, explain: "D2:D12 is checked against the criterion; E2:E12 holds the amounts that are added." },
        { q: "Why use D2:D instead of D2:D12?", options: ["It calculates faster", "It includes rows added later", "It ignores blank cells", "It's required by SUMIF"], answer: 1, explain: "An open-ended range keeps counting new rows as the list grows." },
      ],
      exercise: {
        title: "Total the month's spending",
        task: `<p>The sandbox holds March's transactions. In <code>H2</code>, write a formula that adds up every amount whose Type is <strong>Expense</strong>.</p>`,
        files: ["budget-starter.xlsx"],
        sandbox: { cells: { ...cells(TX), G2: "Spending", H1: "Total" }, answer: { cell: "H2", expected: 1397.7, tolerance: 0.001 } },
        solution: [
          "Click <code>H2</code>.",
          'Type <code>=SUMIF(D2:D12, "Expense", E2:E12)</code> and press Enter.',
          "The result is <strong>1397.7</strong>: rent 950, food 224.55, utilities 96.15, transport 45 and fun 82.",
          'In your own sheet, use open-ended ranges so new rows count: <code>=SUMIF(D2:D, "Expense", E2:E)</code>.',
        ],
      },
    },
    {
      id: "categories",
      title: "Category summaries",
      summary: "Build a summary table that totals each category, and use absolute references so one formula fills the whole table.",
      diagram: { type: "table", head: ["Category", "Formula", "Spent"], rows: [["Housing", "SUMIF(…, G2, …)", "950.00"], ["Food", "SUMIF(…, G3, …)", "224.55"], ["Utilities", "SUMIF(…, G4, …)", "96.15"]], highlight: { rows: [1] }, caption: "One formula, filled down: only the category cell changes" },
      steps: [
        {
          title: "Point the criterion at a cell",
          body: `<p>Instead of typing "Food" into the formula, type the category names into a column (G2:G6) and refer to them: <code>=SUMIF(C2:C12, G2, E2:E12)</code>. Now the same formula works for any category; it reads the name from the cell beside it.</p>`,
        },
        {
          title: "Lock the ranges with F4",
          body: `<p>When you fill that formula down, every reference moves one row, so <code>C2:C12</code> becomes <code>C3:C13</code> and the totals go wrong. Click inside each range in the formula bar and press ${k("F4")} to make it absolute: <code>=SUMIF($C$2:$C$12, G2, $E$2:$E$12)</code>. Leave <code>G2</code> relative so it moves to G3, G4 and so on.</p>`,
        },
        {
          title: "Fill the table",
          body: `<p>Select the formula cell and the empty cells below it, then press ${k("Ctrl", "D")} to fill down. Check one result by hand: Food should be 224.55 (82.40 + 67.90 + 74.25).</p>`,
        },
        {
          title: "Two conditions with SUMIFS",
          body: `<p><code>SUMIFS</code> takes the sum range first, then any number of range and criterion pairs. To total only food spending (and never a refund entered as Income in the Food category): <code>=SUMIFS(E2:E12, C2:C12, "Food", D2:D12, "Expense")</code>.</p>`,
        },
      ],
      quiz: [
        { q: "You fill =SUMIF(C2:C12, G2, E2:E12) down and the totals go wrong. What's the fix?", options: ["Use SUM instead", "Make C2:C12 and E2:E12 absolute with $", "Make G2 absolute", "Sort the transactions first"], answer: 1, explain: "The data ranges must stay put while the category reference moves down a row each time." },
        { q: "In SUMIFS, where does the range being added go?", options: ["Last", "First", "Second", "It doesn't take one"], answer: 1, explain: "SUMIFS starts with the sum range, then takes range and criterion pairs, unlike SUMIF." },
      ],
      exercise: {
        title: "Total one category",
        task: `<p>In the sandbox, <code>G2</code> holds a category name. In <code>H2</code>, write a formula that totals the amounts for the category in G2, written so it could be filled down a list of categories.</p>`,
        files: ["budget-starter.xlsx"],
        sandbox: { cells: { ...cells(TX), G1: "Category", G2: "Food", H1: "Spent" }, answer: { cell: "H2", expected: 224.55, tolerance: 0.001, mustInclude: ["$C$2", "$E$2"] } },
        solution: [
          "Click <code>H2</code> and type <code>=SUMIF(C2:C12, G2, E2:E12)</code>, but don't press Enter yet.",
          `Click inside <code>C2:C12</code> and press ${k("F4")}; do the same inside <code>E2:E12</code>.`,
          "The formula is <code>=SUMIF($C$2:$C$12, G2, $E$2:$E$12)</code>. Press Enter: the result is <strong>224.55</strong>.",
          "In the practice workbook, type the other categories below G2 and fill H2 down to total each one.",
        ],
      },
    },
    {
      id: "budget-vs-actual",
      title: "Budget versus actual",
      summary: "Compare what you planned to spend with what you spent, show what's left, and flag categories that went over.",
      diagram: { type: "bars", values: [950, 950, 250, 225, 90, 96, 60, 45], labels: ["Hous.", "", "Food", "", "Util.", "", "Trans.", ""], highlight: 5, title: "Budget and actual side by side: utilities went over" },
      steps: [
        {
          title: "The budget table",
          body: `<p>The <em>Budget</em> tab lists each category with a <strong>Budget</strong> amount (what you plan to spend) and an <strong>Actual</strong> column. Fill Actual with the SUMIF from the last lesson, pointing at the Transactions tab: <code>=SUMIF(Transactions!$C$2:$C, A2, Transactions!$E$2:$E)</code>.</p>`,
        },
        {
          title: "What's left",
          body: `<p>In the <strong>Left</strong> column, subtract actual from budget: <code>=B2-C2</code>. A positive number is money still available; a negative one means the category went over.</p>`,
        },
        {
          title: "Flag overspending with IF",
          body: `<p>In the <strong>Status</strong> column: <code>=IF(C2>B2, "Over", "OK")</code>. IF checks a condition and returns one value when it's true and another when it's false. Fill both columns down with ${k("Ctrl", "D")}.</p>`,
        },
        {
          title: "Percent of budget used",
          body: `<p>Add a column with <code>=C2/B2</code> and press ${k("Ctrl", "Shift", "5")} to show it as a percentage. Food at 90% means most of the month's food money is gone; utilities at 107% went over.</p>`,
        },
      ],
      quiz: [
        { q: "Budget is in B2 and actual in C2. Which formula shows how much is left?", options: ["=C2-B2", "=B2-C2", "=B2/C2", "=SUM(B2:C2)"], answer: 1, explain: "Budget minus actual leaves a positive number when money remains." },
        { q: "What does =IF(C2>B2, \"Over\", \"OK\") return when actual equals the budget?", options: ["Over", "OK", "An error", "Nothing"], answer: 1, explain: "C2>B2 is false when they're equal, so IF returns the second value, \"OK\"." },
      ],
      exercise: {
        title: "Work out what's left for food",
        task: `<p>The sandbox holds the budget table. In <code>D3</code>, write a formula for how much of the food budget is left.</p>`,
        files: ["budget-starter.xlsx"],
        sandbox: { cells: cells(BUDGET), answer: { cell: "D3", expected: 25.45, tolerance: 0.001 } },
        solution: [
          "Click <code>D3</code> and type <code>=B3-C3</code>.",
          "Press Enter. The result is <strong>25.45</strong> (250 − 224.55).",
          'In <code>E3</code>, <code>=IF(C3>B3, "Over", "OK")</code> returns OK. For utilities (row 4) it returns Over, because 96.15 is more than 90.',
          "In the workbook, fill D2:E2 down to row 6.",
        ],
      },
    },
    {
      id: "visuals",
      title: "Conditional formatting and charts",
      summary: "Make overspending stand out with conditional formatting, and chart where the money went.",
      diagram: { type: "chartpick", title: "Pick the chart for the question" },
      steps: [
        {
          title: "Highlight categories that went over",
          body: `<p>On the Budget tab, select A2:E6 and choose <em>Format › Conditional formatting</em>. Under <em>Format cells if</em>, choose <em>Custom formula is</em> and enter <code>=$C2>$B2</code>. Pick a fill color and select <em>Done</em>. The dollar sign before C and B keeps every cell in the row looking at those two columns, so the whole row lights up.</p>`,
        },
        {
          title: "A color scale for percent used",
          body: `<p>Select the percent column, open conditional formatting again and switch to the <em>Color scale</em> tab. Choose a preset that runs from a calm color at the minimum to a strong one at the maximum. It shows at a glance which categories are nearly used up.</p>`,
        },
        {
          title: "Chart where the money went",
          body: `<p>Select the Category and Actual columns (A1:A6 and C1:C6: select the first range, then hold ${k("Ctrl")} and select the second) and choose <em>Insert › Chart</em>. In the Chart editor, set the chart type to <em>Pie chart</em> for shares of total spending, or <em>Column chart</em> to compare categories.</p>`,
        },
        {
          title: "Budget against actual in one chart",
          body: `<p>Select A1:C6 and insert a <em>Column chart</em>. Sheets draws two columns per category, budget and actual, side by side. In the Chart editor's <em>Customize</em> tab, give it a title and color the actual series so it stands out.</p>`,
        },
      ],
      quiz: [
        { q: "Why does the custom formula =$C2>$B2 use dollar signs before the column letters?", options: ["To make it absolute in both directions", "So every cell in a row compares the same two columns", "Conditional formatting requires them", "To format the cells as currency"], answer: 1, explain: "Locking the columns makes the whole row highlight, not just the cells in columns B and C." },
        { q: "Which chart best shows each category's share of total spending?", options: ["Line chart", "Pie chart", "Scatter chart", "Area chart"], answer: 1, explain: "A pie chart shows parts of a whole; a column chart is better for comparing categories with each other." },
      ],
      exercise: {
        title: "Make the budget readable",
        task: `<p>In your budget workbook, highlight every row of the Budget table where actual is more than budget, and add a column chart that compares budget with actual for each category.</p>`,
        files: ["budget-completed.xlsx"],
        solution: [
          "Select A2:E6, <em>Format › Conditional formatting</em>, <em>Custom formula is</em> <code>=$C2>$B2</code>, choose a fill, <em>Done</em>. Only the Utilities row is highlighted.",
          "Select A1:C6 and choose <em>Insert › Chart</em>.",
          "In the Chart editor, set <em>Chart type</em> to <em>Column chart</em>. Check that the Budget and Actual series both appear.",
          "On the <em>Customize</em> tab, open <em>Chart & axis titles</em> and type a title such as “March: budget and actual”.",
        ],
      },
    },
    {
      id: "goals",
      title: "Savings goals and the monthly review",
      summary: "Track progress towards a savings goal, work out how many months it will take, and set up a routine for the next month.",
      diagram: { type: "cycle", nodes: ["Record", "Summarize", "Compare", "Adjust"], highlight: 3, center: "Each month" },
      steps: [
        {
          title: "Progress towards a goal",
          body: `<p>The <em>Goals</em> tab has a goal amount, what's saved so far and a planned monthly saving. Progress is <code>=B3/B2</code> (saved ÷ goal), shown as a percent with ${k("Ctrl", "Shift", "5")}. For a quick visual in one cell, try <code>=SPARKLINE(B3, {"charttype","bar";"max",B2})</code>.</p>`,
        },
        {
          title: "Months to reach it",
          body: `<p>What's still needed is the goal minus what's saved. Divide by the monthly saving and round up, because a part month still counts: <code>=ROUNDUP((B2-B3)/B4, 0)</code>.</p>`,
        },
        {
          title: "Start a new month",
          body: `<p>Right-click the Transactions tab and choose <em>Duplicate</em>, rename the copy (for example “April”), and delete the old rows below the header. Your Budget formulas still point at the original tab, so update them, or keep one long Transactions list and add a Month column instead (the bonus project does this).</p>`,
        },
        {
          title: "A five-minute monthly review",
          body: `<p>At the end of each month: check that every transaction has a category; read the Status column; look at the chart for surprises; and adjust next month's budget amounts. Add a comment with ${k("Ctrl", "Alt", "M")} to note why you changed a number.</p>`,
        },
      ],
      quiz: [
        { q: "Why use ROUNDUP when working out months to a goal?", options: ["ROUND doesn't work on division", "A part month still needs a whole month of saving", "It formats the result as a whole number", "It avoids a #DIV/0! error"], answer: 1, explain: "If you need 10.2 months, you reach the goal during the 11th month." },
        { q: "The goal is 3,000, you've saved 450, and you save 250 a month. How many months to go?", options: ["10", "11", "12", "13"], answer: 1, explain: "(3000 − 450) ÷ 250 = 10.2, which rounds up to 11." },
      ],
      exercise: {
        title: "Months to a savings goal",
        task: `<p>In the sandbox, B2 is the goal, B3 what's saved so far and B4 the monthly saving. In <code>B5</code>, work out how many whole months it takes to reach the goal.</p>`,
        files: ["budget-starter.xlsx"],
        sandbox: { cells: { A1: "Emergency fund", A2: "Goal", B2: 3000, A3: "Saved so far", B3: 450, A4: "Saved per month", B4: 250, A5: "Months to go" }, answer: { cell: "B5", expected: 11 } },
        solution: [
          "Click <code>B5</code>.",
          "Type <code>=ROUNDUP((B2-B3)/B4, 0)</code> and press Enter.",
          "The result is <strong>11</strong>: 2,550 still needed, at 250 a month, is 10.2 months, rounded up.",
          "Add progress in B6 with <code>=B3/B2</code> and format it as a percent: 15%.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-year",
      title: "Bonus project: a yearly budget dashboard",
      summary: "Turn one month into a whole year: add a month column, total every category by month with SUMIFS, and add sparklines that show each category's trend.",
      diagram: { type: "table", head: ["Category", "Jan", "Feb", "Mar", "Trend"], rows: [["Food", "238", "251", "225", "▂▃▂"], ["Fun", "64", "120", "82", "▁▃▂"]], highlight: { cols: [3] }, caption: "One SUMIFS per cell: category and month must both match" },
      steps: [
        {
          title: "Add a Month column",
          body: `<p>Keep all transactions for the year on one tab. Insert a column after Date and fill it with <code>=MONTH(A2)</code>, which turns a date into a number from 1 to 12. Fill it down with ${k("Ctrl", "D")}.</p>`,
        },
        {
          title: "A category-by-month grid",
          body: `<p>On a new <em>Year</em> tab, list categories down column A and the numbers 1 to 12 across row 1. In B2: <code>=SUMIFS(Transactions!$F:$F, Transactions!$D:$D, $A2, Transactions!$B:$B, B$1)</code>. The mixed references (<code>$A2</code> and <code>B$1</code>) let one formula fill the whole grid: select B2:M6 and press ${k("Ctrl", "Enter")}.</p>`,
        },
        {
          title: "Trends with SPARKLINE",
          body: `<p>In N2, <code>=SPARKLINE(B2:M2)</code> draws a tiny line chart of that category across the year. Fill it down. A rising line is worth a look in your monthly review.</p>`,
        },
      ],
      quiz: [
        { q: "In =SUMIFS(…, $A2, …, B$1), what does B$1 do when the formula is filled across and down?", options: ["Stays B1 everywhere", "Changes column but always uses row 1", "Changes row but always uses column B", "Changes both"], answer: 1, explain: "The $ before 1 locks the row, so each column reads its month number from row 1." },
        { q: "What does =MONTH(A2) return for 15 March 2026?", options: ["15", "3", "March", "2026"], answer: 1, explain: "MONTH returns the month number, 1 to 12." },
      ],
      exercise: {
        title: "Build the year grid",
        task: `<p>In your budget workbook, add a Month column to Transactions and a Year tab with categories down the side and months 1 to 12 across the top. Fill the grid with one SUMIFS formula and add a sparkline per category.</p>`,
        files: ["budget-completed.xlsx"],
        solution: [
          "Right-click column B's letter on Transactions, <em>Insert 1 column left</em>, name it Month, and in B2 type <code>=MONTH(A2)</code>; fill down.",
          "Add a tab named Year. Type the categories in A2:A6 and 1 to 12 in B1:M1.",
          "Select B2:M6, type <code>=SUMIFS(Transactions!$F:$F, Transactions!$D:$D, $A2, Transactions!$B:$B, B$1)</code> and press Ctrl+Enter.",
          "March (column D) matches the Budget tab's actuals: Food 224.55, Fun 82 and so on.",
          "In N2 type <code>=SPARKLINE(B2:M2)</code> and fill down to N6.",
        ],
      },
    },
    quizbank: [
      { q: "Which function counts how many transactions are in the Food category?", options: ["SUMIF", "COUNTIF", "COUNTA", "AVERAGE"], answer: 1, explain: "COUNTIF counts cells that match a criterion; SUMIF adds the values." },
      { q: "What does Ctrl+Shift+V do in Google Sheets?", options: ["Pastes formatting only", "Pastes values only", "Pastes a link", "Opens version history"], answer: 1, explain: "Paste values only drops the formulas and keeps the results." },
      { q: "A SUMIF formula returns 0 although Food rows exist. What's the most likely cause?", options: ["The amounts are formatted as currency", "Some categories contain extra spaces or different spelling", "The sheet is frozen", "The data has a header row"], answer: 1, explain: "\"Food \" with a trailing space doesn't match \"Food\". Dropdowns prevent this." },
      { q: "Which reference stays fixed when the formula is copied anywhere?", options: ["A1", "$A1", "A$1", "$A$1"], answer: 3, explain: "Dollar signs before both the column and the row make the reference fully absolute." },
      { q: "You want rows where actual is over budget to turn red. Where do you set this up?", options: ["Data › Data validation", "Format › Conditional formatting", "Insert › Chart", "View › Freeze"], answer: 1, explain: "Conditional formatting changes a cell's look when a condition is true." },
      { q: "What does the formula =SUMIFS(E2:E12, C2:C12, \"Fun\", D2:D12, \"Expense\") return with this guide's data?", options: ["24", "58", "82", "106"], answer: 2, explain: "Two Fun expenses: the cinema (24) and the concert (58)." },
      { q: "Where do you add a dropdown list of categories?", options: ["Format › Number", "Data › Data validation", "Insert › Dropdown only", "Tools › Notifications"], answer: 1, explain: "Data validation with the Dropdown criterion. Newer versions of Sheets also offer Insert › Dropdown, which opens the same panel." },
      { q: "The goal is 1,200 and you save 150 a month from nothing. What does =ROUNDUP(1200/150, 0) return?", options: ["7", "8", "9", "8.5"], answer: 1, explain: "1200 ÷ 150 is exactly 8, so rounding up leaves it at 8." },
    ],
  },
  async makeFiles({ xlsx }) {
    const tx = TX.map((r, i) => (i === 0 ? r : [{ date: r[0] }, r[1], r[2], r[3], r[4]]));
    const budget = (solved) => BUDGET.map((r, i) => {
      if (i === 0) return [...r, "Used"];
      const n = i + 1;
      return [r[0], r[1], solved ? { f: `SUMIF(Transactions!$C$2:$C$100,A${n},Transactions!$E$2:$E$100)` } : null, solved ? { f: `B${n}-C${n}` } : null, solved ? { f: `IF(C${n}>B${n},"Over","OK")` } : null, solved ? { f: `C${n}/B${n}`, pct: true } : null];
    });
    const goals = (solved) => [
      ["Emergency fund", "Amount"],
      ["Goal", 3000],
      ["Saved so far", 450],
      ["Saved per month", 250],
      ["Months to go", solved ? { f: "ROUNDUP((B2-B3)/B4,0)" } : null],
      ["Progress", solved ? { f: "B3/B2", pct: true } : null],
    ];
    const summary = (solved) => [
      ["Total", "Amount"],
      ["Income", solved ? { f: 'SUMIF(Transactions!$D$2:$D$100,"Income",Transactions!$E$2:$E$100)' } : null],
      ["Spending", solved ? { f: 'SUMIF(Transactions!$D$2:$D$100,"Expense",Transactions!$E$2:$E$100)' } : null],
      ["Left over", solved ? { f: "B2-B3" } : null],
    ];
    const book = (solved) =>
      xlsx(
        [
          { name: "Transactions", rows: tx, widths: [12, 18, 12, 10, 10] },
          { name: "Summary", rows: summary(solved), widths: [12, 12] },
          { name: "Budget", rows: budget(solved), widths: [12, 10, 10, 10, 10, 10] },
          { name: "Goals", rows: goals(solved), widths: [18, 12] },
        ],
        solved ? "Budget (completed)" : "Budget starter"
      );
    return { "budget-starter.xlsx": book(false), "budget-completed.xlsx": book(true) };
  },
};
