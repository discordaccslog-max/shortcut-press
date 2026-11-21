import { k } from "./_helpers.mjs";

// A small café business model used throughout the guide.
const INPUTS = [
  ["Input", "Value"],
  ["Customers per day", 120],
  ["Average ticket", 6.5],
  ["Days open per year", 360],
  ["Annual growth", { pct: 0.08 }],
  ["Cost of goods (% of revenue)", { pct: 0.32 }],
  ["Rent per year", 36000],
  ["Staff per year", 90000],
  ["Other costs per year", 12000],
  ["Loan amount", 50000],
  ["Loan rate", { pct: 0.06 }],
  ["Loan years", 5],
  ["Scenario (1 low, 2 base, 3 high)", 2],
  ["Growth if low", { pct: 0.04 }],
  ["Growth if high", { pct: 0.12 }],
];
const SBX_INPUTS = { A1: "Input", B1: "Value", A2: "Customers/day", B2: 120, A3: "Avg ticket", B3: 6.5, A4: "Days open", B4: 360, A5: "Growth", B5: 0.08 };

export default {
  id: "financial-modeling-excel",
  slug: "financial-modeling-excel",
  title: "Financial Modeling in Excel",
  software: "Excel",
  apps: ["Excel"],
  intro:
    "Build a clear, checkable financial model in Microsoft Excel for a small café: an inputs sheet, a five-year revenue and cost forecast, a loan schedule, NPV and IRR, scenarios and sensitivity tables, and the checks and charts that make a model trustworthy. A formula sandbox lets you try the key formulas in your browser.",
  platformNote: "Shortcuts are shown for Excel for Windows. On a Mac, use Cmd in place of Ctrl; F4 for absolute references is Cmd+T on a Mac.",
  sandbox: true,
  sandboxCells: { ...SBX_INPUTS, A7: "Loan", B7: 50000, A8: "Rate", B8: 0.06, A9: "Years", B9: 5, D1: "Cash flows", D2: -60000, D3: 15000, D4: 18000, D5: 20000, D6: 22000, D7: 24000 },
  sandboxHint: "Try <code>=B2*B3*B4</code>, <code>=PMT(B8, B9, -B7)</code>, <code>=IPMT(B8, 1, B9, -B7)</code>, <code>=NPV(10%, D3:D7)+D2</code> or <code>=IRR(D2:D7)</code>.",
  store: {
    category: "office",
    level: "Intermediate",
    software: "Microsoft Excel (Microsoft 365 or Excel 2021 and later)",
    softwareShort: "Excel",
    softwareHtml: `<p>This guide is written for <strong>Microsoft Excel</strong> (Microsoft 365, Excel 2021 or Excel 2024) on Windows or Mac. Data tables and Goal Seek are also available in Excel for the web. Excel is not included with the guide; you need your own copy or subscription, obtained separately from Microsoft. The practice workbooks also open in Google Sheets, but the steps follow Excel.</p>`,
    forWho: [
      "You build forecasts or budgets in Excel and want them structured so others can follow them.",
      "You're comfortable with formulas and absolute references and want to learn PMT, NPV, IRR and scenario tools.",
      "You want to test a business idea's numbers with your own assumptions.",
    ],
    notFor: [
      "You want financial, investment or tax advice. The guide teaches modeling techniques with made-up numbers.",
      "You need corporate valuation or three-statement models with balance sheets. The guide stays with one small business.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "cafe-model-starter.xlsx", title: "Model starter", desc: "An Inputs sheet with every assumption and empty Model, Loan and Valuation sheets to build in." },
    { name: "cafe-model-completed.xlsx", title: "Completed model", desc: "The finished model with every formula from the guide, to compare with your own." },
  ],
  shortcuts: [
    { keys: "F4", action: "Switch between relative and absolute references", app: "Excel" },
    { keys: "F2", action: "Edit the active cell", app: "Excel" },
    { keys: "Ctrl+`", action: "Show formulas instead of results", app: "Excel" },
    { keys: "Ctrl+[", action: "Select the cells a formula uses (precedents)", app: "Excel" },
    { keys: "Ctrl+]", action: "Select the cells that use this one (dependents)", app: "Excel" },
    { keys: "Alt+=", action: "AutoSum", app: "Excel" },
    { keys: "Ctrl+1", action: "Format Cells dialog", app: "Excel" },
    { keys: "Ctrl+Shift+4", action: "Currency format", app: "Excel" },
    { keys: "Ctrl+Shift+5", action: "Percentage format", app: "Excel" },
    { keys: "Ctrl+Shift+1", action: "Number format with two decimals", app: "Excel" },
    { keys: "Ctrl+D", action: "Fill down", app: "Excel" },
    { keys: "F9", action: "Calculate now (or evaluate part of a formula while editing)", app: "Excel" },
    { keys: "Ctrl+F3", action: "Open the Name Manager", app: "Excel" },
    { keys: "Ctrl+R", action: "Fill right", app: "Excel", practice: false, note: "Your browser uses this shortcut to reload the page." },
    { keys: "Ctrl+PageDown", action: "Next worksheet", app: "Excel", practice: false, note: "Your browser uses this shortcut to switch tabs." },
  ],
  lessons: [
    {
      id: "structure",
      title: "Model structure",
      summary: "Separate inputs, calculations and outputs, mark inputs clearly, lay years out across columns, and name the key assumptions.",
      diagram: { type: "flow", nodes: ["Inputs (blue)", "Calculations", "Outputs", "Checks"], highlight: 0, title: "Assumptions flow one way: inputs to outputs" },
      steps: [
        {
          title: "Inputs in one place",
          body: `<p>Every assumption (customers per day, prices, growth, costs, loan terms) lives on an <strong>Inputs</strong> sheet, typed once. Calculation sheets only ever <em>refer</em> to inputs; they never contain typed numbers. When an assumption changes, you change one cell and the whole model follows.</p>`,
        },
        {
          title: "Mark the inputs",
          body: `<p>A common convention: blue text for typed inputs, black for formulas, green for links to other sheets. Select the input values and set the font color to blue (or use a light yellow fill). Anyone opening the model can see at a glance what they're allowed to change.</p>`,
        },
        {
          title: "Time across, items down",
          body: `<p>On the <strong>Model</strong> sheet, put years across row 1 (Year 1 to Year 5 in B1:F1) and line items down column A: revenue, cost of goods, gross profit, fixed costs, operating profit. Every row then uses <em>one</em> formula filled right, which makes errors easy to spot.</p>`,
        },
        {
          title: "Name key assumptions",
          body: `<p>Select an input cell such as the growth rate, then choose <em>Formulas › Define Name</em> and name it <code>Growth</code>. Formulas can now say <code>=B2*(1+Growth)</code>, which reads like a sentence. ${k("Ctrl", "F3")} opens the Name Manager to see and edit every name.</p>`,
        },
      ],
      quiz: [
        { q: "Where should a typed number like the 8% growth rate appear?", options: ["In every formula that uses it", "Once, on the Inputs sheet", "On the Outputs sheet", "In a comment"], answer: 1, explain: "Typing it once means one change updates the whole model." },
        { q: "Why lay years out across columns with one formula per row?", options: ["Excel requires it", "Each row can be filled right, so inconsistent formulas stand out", "It prints better", "It makes the file smaller"], answer: 1, explain: "A row with one formula copied across is easy to check; an odd one out is easy to see with Ctrl+`." },
      ],
      exercise: {
        title: "Set up the model's skeleton",
        task: `<p>Open <strong>cafe-model-starter.xlsx</strong>. Color the input values on the Inputs sheet blue, name the growth rate cell <code>Growth</code> and the cost-of-goods cell <code>COGSRate</code>, and on the Model sheet put Year 1 to Year 5 across B1:F1 and the five line items down A2:A6.</p>`,
        files: ["cafe-model-starter.xlsx"],
        solution: [
          "On Inputs, select B2:B15 and set <em>Home › Font Color</em> to blue.",
          "Select B5 (Annual growth), <em>Formulas › Define Name</em>, name <code>Growth</code>, <em>OK</em>. Do the same for B6 as <code>COGSRate</code>.",
          "On Model, type 1 in B1 and 2 in C1, select both and drag the fill handle to F1 (or type “Year 1” to “Year 5”).",
          "In A2:A6 type Revenue, Cost of goods, Gross profit, Fixed costs, Operating profit.",
          `Press ${k("Ctrl", "F3")} to check both names appear in the Name Manager.`,
        ],
      },
    },
    {
      id: "revenue",
      title: "The revenue forecast",
      summary: "Build revenue from drivers (customers, ticket size, days open), then grow it year by year with one formula filled across.",
      diagram: { type: "grid", cols: ["A", "B", "C", "D"], rows: 3, cells: { A1: "", B1: "Year 1", C1: "Year 2", D1: "Year 3", A2: "Revenue", B2: "=C*T*D", C2: "=B2*(1+g)", D2: "=C2*(1+g)" }, highlight: { B2: "soft", C2: "accent", D2: "accent" }, arrows: [["B2", "C2"], ["C2", "D2"]], title: "Year 1 from drivers, later years from growth" },
      steps: [
        {
          title: "Build from drivers",
          body: `<p>Revenue isn't one number to guess; it's the product of things you can reason about. For the café: customers per day × average ticket × days open. Year 1: <code>=Inputs!B2*Inputs!B3*Inputs!B4</code>, which is 120 × 6.50 × 360 = <strong>280,800</strong>.</p>`,
        },
        {
          title: "Grow it with one formula",
          body: `<p>Year 2 is Year 1 plus growth: in C2, <code>=B2*(1+Growth)</code> (or <code>=B2*(1+Inputs!$B$5)</code> if you didn't name it). Because the growth reference is absolute, you can fill C2 right to F2 with ${k("Ctrl", "R")} after selecting C2:F2, and each year grows from the one before.</p>`,
        },
        {
          title: "Check with Show Formulas",
          body: `<p>Press ${k("Ctrl", "`")} (the key left of 1) to show formulas instead of results. Every cell in the row from C onwards should look the same apart from the column letter. Press it again to go back to values.</p>`,
        },
        {
          title: "Trace where a number comes from",
          body: `<p>Click a revenue cell and press ${k("Ctrl", "[")} to jump to the cells it uses, or choose <em>Formulas › Trace Precedents</em> to draw arrows. <em>Remove Arrows</em> clears them. This is how you or a reviewer follow any output back to its inputs.</p>`,
        },
      ],
      quiz: [
        { q: "What's Year 2 revenue with 8% growth on 280,800?", options: ["288,800", "303,264", "302,400", "280,808"], answer: 1, explain: "280,800 × 1.08 = 303,264." },
        { q: "What does Ctrl+` do?", options: ["Fills right", "Shows formulas instead of results", "Opens Name Manager", "Traces dependents"], answer: 1, explain: "It toggles between showing formulas and showing their results." },
      ],
      exercise: {
        title: "Year 2 revenue",
        task: `<p>The sandbox has the drivers in B2:B5 and Year 1 revenue already in B7. In <code>C7</code>, write Year 2 revenue so the formula could be filled right to later years without breaking.</p>`,
        files: ["cafe-model-starter.xlsx"],
        sandbox: { cells: { ...SBX_INPUTS, A6: "", B6: "Year 1", C6: "Year 2", D6: "Year 3", A7: "Revenue", B7: "=B2*B3*B4" }, answer: { cell: "C7", expected: 303264, tolerance: 0.01, mustInclude: ["$B$5"] } },
        solution: [
          "Click <code>C7</code> and type <code>=B7*(1+B5)</code>, but don't press Enter yet.",
          `Put the cursor in <code>B5</code> and press ${k("F4")} so it becomes <code>$B$5</code>.`,
          "The formula is now <code>=B7*(1+$B$5)</code>. Press Enter: <strong>303,264</strong>.",
          "Fill right to D7: 327,525.12. In the workbook, the same pattern runs to Year 5 (382,025.30).",
        ],
      },
    },
    {
      id: "costs",
      title: "Costs and operating profit",
      summary: "Model variable and fixed costs, work out gross and operating profit, and add margin rows that show how healthy each year is.",
      diagram: { type: "bars", values: [280.8, 89.9, 190.9, 138, 52.9], labels: ["Rev.", "COGS", "Gross", "Fixed", "Op."], highlight: 4, title: "Year 1 in thousands: revenue down to operating profit" },
      steps: [
        {
          title: "Variable costs follow revenue",
          body: `<p>Cost of goods (coffee, milk, food) rises with sales, so model it as a percentage: <code>=B2*COGSRate</code>. At 32%, Year 1 cost of goods is 89,856. Gross profit is revenue minus that: <code>=B2-B3</code>, which gives 190,944.</p>`,
        },
        {
          title: "Fixed costs don't",
          body: `<p>Rent, staff and other overheads stay the same whatever the sales: <code>=Inputs!$B$7+Inputs!$B$8+Inputs!$B$9</code>, which is 138,000 a year. Keep them on separate rows if you'll want to change them separately later.</p>`,
        },
        {
          title: "Operating profit and margins",
          body: `<p>Operating profit is gross profit minus fixed costs: <code>=B4-B5</code>, which is <strong>52,944</strong> in Year 1. Add a margin row, <code>=B6/B2</code>, formatted as a percentage with ${k("Ctrl", "Shift", "5")}: 18.9% in Year 1. Margins growing year by year show fixed costs being spread over more sales.</p>`,
        },
        {
          title: "Fill and format",
          body: `<p>Select B3:F6 and use ${k("Ctrl", "R")} after writing column B, or write each row's first formula and fill right. Format money rows with ${k("Ctrl", "Shift", "1")} (or no decimals, for a cleaner look) and make the profit rows bold so the eye lands on them.</p>`,
        },
      ],
      quiz: [
        { q: "Which cost should be modeled as a percentage of revenue?", options: ["Rent", "Cost of goods", "Insurance", "The loan payment"], answer: 1, explain: "Cost of goods scales with sales; rent and insurance are fixed." },
        { q: "Year 1 gross profit is 190,944 and fixed costs are 138,000. What's operating profit?", options: ["52,944", "328,944", "89,856", "138,000"], answer: 0, explain: "190,944 − 138,000 = 52,944." },
      ],
      exercise: {
        title: "Year 1 operating profit",
        task: `<p>In the sandbox, B1 is Year 1 revenue, B2 the cost-of-goods rate and B3 total fixed costs. In <code>B4</code>, work out Year 1 operating profit in one formula.</p>`,
        files: ["cafe-model-starter.xlsx"],
        sandbox: { cells: { A1: "Revenue", B1: 280800, A2: "COGS rate", B2: 0.32, A3: "Fixed costs", B3: 138000, A4: "Operating profit" }, answer: { cell: "B4", expected: 52944, tolerance: 0.01 } },
        solution: [
          "Operating profit = revenue − cost of goods − fixed costs, and cost of goods = revenue × rate.",
          "In <code>B4</code> type <code>=B1-B1*B2-B3</code> (or <code>=B1*(1-B2)-B3</code>).",
          "Press Enter: <strong>52,944</strong>.",
          "In the model, keep the steps on separate rows (cost of goods, gross profit, operating profit) so each can be checked.",
        ],
      },
    },
    {
      id: "loan",
      title: "A loan schedule",
      summary: "Work out a loan's payment with PMT, split each payment into interest and principal, and build a schedule that ends at zero.",
      diagram: { type: "table", head: ["Year", "Opening", "Interest", "Principal", "Closing"], rows: [["1", "50,000.00", "3,000.00", "8,869.82", "41,130.18"], ["2", "41,130.18", "2,467.81", "9,402.01", "31,728.17"], ["…", "…", "…", "…", "…"], ["5", "11,197.94", "671.88", "11,197.94", "0.00"]], highlight: { cols: [4] }, caption: "Each closing balance is the next year's opening balance" },
      steps: [
        {
          title: "PMT",
          body: `<p><code>=PMT(rate, nper, pv)</code> gives the payment per period. For a 50,000 loan at 6% a year over 5 years: <code>=PMT(6%, 5, -50000)</code> returns <strong>11,869.82</strong>. The loan amount is negative because, from your side, money comes in now and goes out later; making it negative gives a positive payment.</p>`,
        },
        {
          title: "Monthly payments",
          body: `<p>Rate and number of periods must use the same unit. For monthly payments, divide the yearly rate by 12 and multiply the years by 12: <code>=PMT(6%/12, 5*12, -50000)</code> gives 966.64 a month.</p>`,
        },
        {
          title: "Interest and principal",
          body: `<p>On a <strong>Loan</strong> sheet, make columns for year, opening balance, payment, interest, principal and closing balance. Interest is the opening balance × rate (3,000 in Year 1); principal is payment − interest (8,869.82); closing balance is opening − principal (41,130.18). Excel's <code>IPMT</code> and <code>PPMT</code> functions give the same splits directly.</p>`,
        },
        {
          title: "Check it ends at zero",
          body: `<p>Each year's opening balance is the previous closing balance. Fill the rows down to Year 5: the last closing balance should be 0.00. If it isn't, a reference is probably relative where it should be absolute. Link the payment into the Model sheet as a loan payment row.</p>`,
        },
      ],
      quiz: [
        { q: "Why is the loan amount entered as a negative number in =PMT(6%, 5, -50000)?", options: ["Loans are always negative", "So the payment comes out as a positive number", "To round the result", "Excel ignores the sign"], answer: 1, explain: "PMT returns a payment with the opposite sign to the loan amount." },
        { q: "For monthly payments over 5 years at 6% a year, which arguments are right?", options: ["PMT(6%, 5, …)", "PMT(6%/12, 5*12, …)", "PMT(6%, 60, …)", "PMT(0.5%, 5, …)"], answer: 1, explain: "Both the rate and the number of periods must be monthly." },
      ],
      exercise: {
        title: "The yearly payment",
        task: `<p>The sandbox holds a loan of 50,000 (B1) at 6% a year (B2) over 5 years (B3). In <code>B4</code>, work out the yearly payment as a positive number.</p>`,
        files: ["cafe-model-starter.xlsx"],
        sandbox: { cells: { A1: "Loan amount", B1: 50000, A2: "Rate per year", B2: 0.06, A3: "Years", B3: 5, A4: "Payment", A5: "Year 1 interest" }, answer: { cell: "B4", expected: 11869.82, tolerance: 0.01 } },
        solution: [
          "Click <code>B4</code> and type <code>=PMT(B2, B3, -B1)</code>.",
          "Press Enter: <strong>11,869.82</strong>.",
          "In B5, <code>=IPMT(B2, 1, B3, -B1)</code> gives Year 1's interest: 3,000.",
          "In the workbook, build the full schedule on the Loan sheet and check the Year 5 closing balance is 0.00.",
        ],
      },
    },
    {
      id: "valuation",
      title: "NPV and IRR",
      summary: "Discount future cash flows to today's value with NPV, find the return an investment earns with IRR, and avoid the most common NPV mistake.",
      diagram: { type: "bars", values: [60, 15, 18, 20, 22, 24], labels: ["Now", "Y1", "Y2", "Y3", "Y4", "Y5"], highlight: 0, title: "An investment now (thousands), cash coming back each year" },
      steps: [
        {
          title: "Money later is worth less",
          body: `<p>Money received in five years is worth less than the same amount today, because today's money could be earning a return. <strong>Discounting</strong> converts future amounts to today's value using a discount rate, the return you could get elsewhere for similar risk.</p>`,
        },
        {
          title: "NPV, and the classic mistake",
          body: `<p><code>=NPV(rate, values)</code> discounts a series of cash flows that start <em>one period from now</em>. An investment paid today must not be inside the range; add it separately: <code>=NPV(10%, D3:D7)+D2</code>. For the café's 60,000 fit-out returning 15,000 to 24,000 a year, that's <strong>13,467.10</strong>: positive, so it beats a 10% return.</p>`,
        },
        {
          title: "IRR",
          body: `<p><code>=IRR(D2:D7)</code> finds the discount rate at which NPV is exactly zero: the investment's own yearly return. Here it's <strong>17.76%</strong>. Unlike NPV, IRR's range <em>includes</em> today's investment as the first value, which must be negative.</p>`,
        },
        {
          title: "Uneven dates",
          body: `<p>NPV and IRR assume equal periods. When cash flows arrive on specific dates, use <code>XNPV</code> and <code>XIRR</code>, which take a range of dates as well as values.</p>`,
        },
      ],
      quiz: [
        { q: "Why add the initial investment outside NPV's range?", options: ["NPV can't use negative numbers", "NPV treats the first value as one period away, but the investment happens now", "It makes the result positive", "It's a matter of style"], answer: 1, explain: "Putting today's payment inside NPV discounts it by a year, which overstates the result." },
        { q: "What does IRR tell you?", options: ["The loan's interest rate", "The discount rate at which NPV is zero", "The total profit", "The payback period"], answer: 1, explain: "IRR is the rate of return that makes the cash flows' present value net to zero." },
      ],
      exercise: {
        title: "Value the fit-out",
        task: `<p>D2 holds the fit-out cost today (−60,000) and D3:D7 the cash flows for years 1 to 5. In <code>B2</code>, work out the NPV at a 10% discount rate (B1), treating the investment correctly.</p>`,
        files: ["cafe-model-starter.xlsx"],
        sandbox: { cells: { A1: "Discount rate", B1: 0.1, A2: "NPV", A3: "IRR", D1: "Cash flow", D2: -60000, D3: 15000, D4: 18000, D5: 20000, D6: 22000, D7: 24000 }, answer: { cell: "B2", expected: 13467.1, tolerance: 0.01 } },
        solution: [
          "Click <code>B2</code> and type <code>=NPV(B1, D3:D7)+D2</code>.",
          "Press Enter: <strong>13,467.10</strong>.",
          "The common mistake, <code>=NPV(B1, D2:D7)</code>, gives 12,242.82, because it discounts the investment by a year.",
          "In B3, <code>=IRR(D2:D7)</code> gives 0.1776, or <strong>17.76%</strong> as a percentage.",
        ],
      },
    },
    {
      id: "scenarios",
      title: "Scenarios and sensitivity",
      summary: "Switch between low, base and high cases with one input, see how results change with data tables, and work backwards with Goal Seek.",
      diagram: { type: "table", head: ["Customers", "6.00", "6.50", "7.00"], rows: [["100", "8,880", "21,120", "33,360"], ["120", "38,256", "52,944", "67,632"], ["140", "67,632", "84,768", "101,904"]], highlight: { rows: [1] }, caption: "A two-way data table: operating profit for each combination" },
      steps: [
        {
          title: "A scenario switch",
          body: `<p>Put a scenario number on the Inputs sheet (1 = low, 2 = base, 3 = high) and the growth rate for each case. Then make the growth used by the model pick one: <code>=CHOOSE(Inputs!B13, Inputs!B14, Inputs!B5, Inputs!B15)</code>. Change the switch and the whole model recalculates for that case.</p>`,
        },
        {
          title: "One-variable data table",
          body: `<p>List possible customer numbers down a column (100, 110, 120, 130, 140), and in the cell above and to the right of the list, refer to the output you care about (Year 1 operating profit). Select the whole block, choose <em>Data › What-If Analysis › Data Table</em>, leave <em>Row input cell</em> empty and set <em>Column input cell</em> to the customers input. Excel fills each row with the result for that value.</p>`,
        },
        {
          title: "Two-variable data table",
          body: `<p>Put customer numbers down a column, ticket prices across a row, and the output formula in the corner cell where they meet. Select the block, open <em>Data Table</em>, and set both the row input cell (price) and the column input cell (customers). The grid shows operating profit for every combination.</p>`,
        },
        {
          title: "Goal Seek",
          body: `<p>To find the break-even point, choose <em>Data › What-If Analysis › Goal Seek</em>. Set cell: Year 1 operating profit; To value: 0; By changing cell: customers per day. Excel finds about <strong>86.7 customers a day</strong>. Press Cancel instead of OK if you don't want to keep the changed input.</p>`,
        },
      ],
      quiz: [
        { q: "With the switch set to 3, what does =CHOOSE(3, 4%, 8%, 12%) return?", options: ["4%", "8%", "12%", "An error"], answer: 2, explain: "CHOOSE returns the value in the position given by its first argument." },
        { q: "Which tool works backwards from a target result to the input that produces it?", options: ["Data Table", "Goal Seek", "Trace Precedents", "Name Manager"], answer: 1, explain: "Goal Seek adjusts one input until a formula reaches the value you set." },
      ],
      exercise: {
        title: "Pick the scenario's growth rate",
        task: `<p>In the sandbox, B1 is the scenario switch (1 low, 2 base, 3 high), and B2:B4 hold the low, base and high growth rates. In <code>B5</code>, write a formula that returns the growth rate for the chosen scenario.</p>`,
        files: ["cafe-model-starter.xlsx"],
        sandbox: { cells: { A1: "Scenario", B1: 3, A2: "Growth low", B2: 0.04, A3: "Growth base", B3: 0.08, A4: "Growth high", B4: 0.12, A5: "Growth used" }, answer: { cell: "B5", expected: 0.12, tolerance: 0.000001 } },
        solution: [
          "Click <code>B5</code> and type <code>=CHOOSE(B1, B2, B3, B4)</code>.",
          "Press Enter: <strong>0.12</strong>, because the switch is 3.",
          "Change B1 to 1: the result becomes 0.04.",
          "In the workbook, use this cell in place of the growth rate in the revenue row, then try Goal Seek for break-even customers (about 86.7 a day).",
        ],
      },
    },
    {
      id: "checks",
      title: "Checks, charts and handing it over",
      summary: "Add checks that flag mistakes, protect the formulas, chart the results, and write a short summary so someone else can use the model.",
      diagram: { type: "flow", nodes: ["Checks pass", "Inputs unlocked", "Sheet protected", "Summary + chart"], highlight: 0, title: "A model others can trust and use" },
      steps: [
        {
          title: "Build checks into the model",
          body: `<p>Add a <strong>Checks</strong> area that tests things that must be true: the loan's last closing balance is zero (<code>=ABS(Loan!F6)&lt;0.01</code>), the scenario switch is 1, 2 or 3, and totals add up. Then a single cell such as <code>=IF(AND(B2:B4), "All checks pass", "CHECK THE MODEL")</code> sums them up; show it at the top of the Outputs sheet.</p>`,
        },
        {
          title: "Find errors quickly",
          body: `<p><em>Formulas › Error Checking</em> walks through cells with errors. ${k("Ctrl", "[")} jumps to a formula's inputs; ${k("Ctrl", "]")} to the cells that depend on it. Wrap risky divisions in <code>IFERROR</code> only when you understand why they can fail; hiding errors hides mistakes.</p>`,
        },
        {
          title: "Protect formulas, leave inputs open",
          body: `<p>Select the input cells, press ${k("Ctrl", "1")}, and on the <em>Protection</em> tab untick <em>Locked</em>. Then choose <em>Review › Protect Sheet</em>. People can now type in the inputs but not overwrite a formula by accident. A password is optional.</p>`,
        },
        {
          title: "Chart and summarize",
          body: `<p>Select the revenue and operating profit rows with the year headings and insert a clustered column or line chart. On an Outputs sheet, write three lines in plain words: what the model shows, the key assumptions, and what would change the answer most (from your data tables). That summary is what most readers will look at first.</p>`,
        },
      ],
      quiz: [
        { q: "Before protecting a sheet, what do you do to the input cells?", options: ["Delete them", "Untick Locked in Format Cells › Protection", "Make them bold", "Hide them"], answer: 1, explain: "Unlocked cells stay editable when the sheet is protected." },
        { q: "Why is wrapping every formula in IFERROR a bad habit?", options: ["It slows Excel down a lot", "It hides real mistakes behind a blank or zero", "It breaks charts", "IFERROR doesn't work with PMT"], answer: 1, explain: "Errors are signals; hide them only where you've decided they're expected." },
      ],
      exercise: {
        title: "Make the model handover-ready",
        task: `<p>In your model, add a check that the loan ends at zero and a summary cell for all checks, unlock the input cells and protect the calculation sheets, and add a chart of revenue and operating profit by year to an Outputs sheet.</p>`,
        files: ["cafe-model-completed.xlsx"],
        solution: [
          "On a Checks sheet: A2 “Loan repaid”, B2 <code>=ABS(Loan!F6)&lt;0.01</code> (TRUE). A3 “Scenario valid”, B3 <code>=OR(Inputs!B13=1, Inputs!B13=2, Inputs!B13=3)</code>.",
          'In B1: <code>=IF(AND(B2:B3), "All checks pass", "CHECK THE MODEL")</code>; link it to the top of Outputs.',
          "On Inputs, select B2:B15, Ctrl+1 › <em>Protection</em> › untick <em>Locked</em>. On Model and Loan, <em>Review › Protect Sheet</em>.",
          "On Model, select A1:F2 and A6:F6 (hold Ctrl), <em>Insert › Charts › Clustered Column</em>, then cut and paste the chart onto Outputs.",
          "Operating profit should rise from 52,944 in Year 1 to about 121,777 in Year 5 in the base case.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-monthly",
      title: "Bonus project: a monthly cash flow for Year 1",
      summary: "Break Year 1 into twelve months with seasonality, monthly loan payments and an opening cash balance, and find the lowest cash point of the year.",
      diagram: { type: "bars", values: [6, 5, 7, 8, 9, 9, 10, 10, 9, 8, 7, 12], labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], highlight: 1, title: "Seasonality: share of the year's sales by month" },
      steps: [
        {
          title: "Seasonality weights",
          body: `<p>Sales aren't even across the year. Add a row of twelve monthly weights that sum to 100% (for example 6%, 5%, 7% … 12% for December). Monthly revenue is Year 1 revenue × that month's weight; check the twelve months add back to 280,800 with ${k("Alt", "=")}.</p>`,
        },
        {
          title: "Monthly costs and loan",
          body: `<p>Cost of goods stays at 32% of each month's revenue; fixed costs are a twelfth of the year's 138,000 (11,500 a month). The monthly loan payment is <code>=PMT(6%/12, 60, -50000)</code>, which is 966.64.</p>`,
        },
        {
          title: "Running cash balance",
          body: `<p>Start with an opening cash balance (say 10,000). Each month's closing cash is opening + revenue − costs − loan payment, and becomes the next month's opening. <code>=MIN()</code> across the closing row shows the lowest point, the cash you need in reserve.</p>`,
        },
      ],
      quiz: [
        { q: "Twelve monthly weights should add up to what?", options: ["12", "100%", "1,200%", "Year 1 revenue"], answer: 1, explain: "The weights split the year's revenue, so together they're 100%." },
        { q: "What's the monthly fixed cost when yearly fixed costs are 138,000?", options: ["11,500", "13,800", "1,150", "138,000"], answer: 0, explain: "138,000 ÷ 12 = 11,500." },
      ],
      exercise: {
        title: "Find the lowest cash month",
        task: `<p>Build the twelve-month cash flow with the weights 6, 5, 7, 8, 9, 9, 10, 10, 9, 8, 7 and 12% and an opening balance of 10,000. Which month has the lowest closing cash?</p>`,
        files: ["cafe-model-completed.xlsx"],
        solution: [
          "Monthly revenue = 280,800 × weight: January 16,848, February 14,040 and so on.",
          "Monthly cash flow = revenue × (1 − 32%) − 11,500 − 966.64. January: 11,456.64 − 12,466.64 = −1,010.00; February: 9,547.20 − 12,466.64 = −2,919.44.",
          "Closing cash: January 8,990.00, February 6,070.56, March 6,970.00 (March's cash flow is +899.44). Every later month adds cash.",
          "<code>=MIN()</code> over the closing row gives <strong>6,070.56 in February</strong>: the low point of the year.",
        ],
      },
    },
    quizbank: [
      { q: "Which color convention marks typed inputs in many models?", options: ["Red", "Blue text", "Bold black", "Green fill"], answer: 1, explain: "Blue for inputs, black for formulas and green for links is a widely used convention." },
      { q: "What does Ctrl+[ do in Excel?", options: ["Decreases the font size", "Selects the cells the active formula refers to", "Opens the Name Manager", "Inserts a row"], answer: 1, explain: "It jumps to the formula's precedents." },
      { q: "PMT(6%/12, 60, -50000) is about 966.64. What does the total of all payments come to?", options: ["50,000", "57,998.40", "59,349.10", "966.64"], answer: 1, explain: "966.64 × 60 = 57,998.40, of which 7,998.40 is interest." },
      { q: "Year 3 revenue is 327,525.12. With 8% growth, what is Year 4?", options: ["353,727.13", "335,525.12", "350,000.00", "382,025.30"], answer: 0, explain: "327,525.12 × 1.08 = 353,727.13." },
      { q: "An NPV of zero at a 10% discount rate means…", options: ["The project loses money", "The project earns exactly 10% a year", "The IRR is zero", "The cash flows are equal"], answer: 1, explain: "When NPV is zero, the discount rate equals the IRR." },
      { q: "Where are data tables found?", options: ["Insert › Table", "Data › What-If Analysis › Data Table", "Formulas › Name Manager", "Review › Protect"], answer: 1, explain: "Data tables live under What-If Analysis with Goal Seek and Scenario Manager." },
      { q: "Which function suits cash flows on irregular dates?", options: ["NPV", "XNPV", "PMT", "IRR"], answer: 1, explain: "XNPV (and XIRR) take a list of dates along with the values." },
      { q: "Break-even customers per day come out at about 86.7. What does that mean?", options: ["The café needs 86.7 customers to open", "Below about 87 customers a day, Year 1 operating profit is negative", "Revenue is 86.7 thousand", "Growth is 86.7%"], answer: 1, explain: "At that level revenue × (1 − 32%) just covers the 138,000 of fixed costs." },
    ],
  },
  async makeFiles({ xlsx }) {
    const book = (solved) => {
      const f = (formula) => (solved ? { f: formula } : null);
      const cols = ["B", "C", "D", "E", "F"];
      const growth = "CHOOSE(Inputs!$B$13,Inputs!$B$14,Inputs!$B$5,Inputs!$B$15)";
      const model = [
        ["Line item", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
        ["Revenue", ...cols.map((c, i) => f(i === 0 ? "Inputs!B2*Inputs!B3*Inputs!B4" : `${cols[i - 1]}2*(1+${growth})`))],
        ["Cost of goods", ...cols.map((c) => f(`${c}2*Inputs!$B$6`))],
        ["Gross profit", ...cols.map((c) => f(`${c}2-${c}3`))],
        ["Fixed costs", ...cols.map(() => f("Inputs!$B$7+Inputs!$B$8+Inputs!$B$9"))],
        ["Operating profit", ...cols.map((c) => f(`${c}4-${c}5`))],
        ["Operating margin", ...cols.map((c) => (solved ? { f: `${c}6/${c}2`, pct: true } : null))],
        ["Loan payment", ...cols.map(() => f("PMT(Inputs!$B$11,Inputs!$B$12,-Inputs!$B$10)"))],
        ["Cash after loan", ...cols.map((c) => f(`${c}6-${c}8`))],
      ];
      const loan = [["Year", "Opening", "Payment", "Interest", "Principal", "Closing"]];
      for (let y = 1; y <= 5; y++) {
        const r = y + 1;
        loan.push([y, f(y === 1 ? "Inputs!B10" : `F${r - 1}`), f("PMT(Inputs!$B$11,Inputs!$B$12,-Inputs!$B$10)"), f(`B${r}*Inputs!$B$11`), f(`C${r}-D${r}`), f(`B${r}-E${r}`)]);
      }
      const valuation = [
        ["Item", "Value"],
        ["Discount rate", { pct: 0.1 }],
        ["Fit-out today", -60000],
        ["Year 1", 15000],
        ["Year 2", 18000],
        ["Year 3", 20000],
        ["Year 4", 22000],
        ["Year 5", 24000],
        ["NPV", f("NPV(B2,B4:B8)+B3")],
        ["IRR", solved ? { f: "IRR(B3:B8)", pct: true } : null],
      ];
      return xlsx(
        [
          { name: "Inputs", rows: INPUTS, widths: [32, 12] },
          { name: "Model", rows: model, widths: [18, 12, 12, 12, 12, 12] },
          { name: "Loan", rows: loan, widths: [8, 12, 12, 12, 12, 12] },
          { name: "Valuation", rows: valuation, widths: [16, 12] },
        ],
        solved ? "Café model (completed)" : "Café model starter"
      );
    };
    return { "cafe-model-starter.xlsx": book(false), "cafe-model-completed.xlsx": book(true) };
  },
};
