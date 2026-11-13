import { cells, k } from "./_helpers.mjs";
import { sfProducts, sfPeople, sfOrders, sfScores } from "../files/datasets.mjs";

export default {
  id: "spreadsheet-formulas",
  slug: "spreadsheet-formulas-functions",
  title: "Spreadsheet Formulas & Functions",
  software: "Microsoft Excel or Google Sheets",
  apps: ["Excel", "Sheets"],
  intro:
    "Write spreadsheet formulas with confidence: cell references, lookups, logical functions, text and date functions, and handling errors. Every lesson works in both Microsoft Excel and Google Sheets, and wherever the two differ, both are shown.",
  platformNote: "Shortcuts are shown for Windows and ChromeOS. On a Mac, use Cmd in place of Ctrl unless a lesson says otherwise.",
  sandbox: true,
  files: [
    { name: "formulas-practice.xlsx", title: "Practice workbook", desc: "Starter data for every exercise, one sheet per lesson. Opens in Excel; in Google Sheets use File > Import (or upload it to Google Drive and open it)." },
    { name: "formulas-solutions.xlsx", title: "Solutions workbook", desc: "The same sheets with the worked-solution formulas filled in, so you can compare your work." },
  ],
  shortcuts: [
    { keys: "F2", action: "Edit the active cell", app: "Excel and Sheets" },
    { keys: "F4", action: "Cycle a reference between relative, absolute and mixed while editing", app: "Excel for Windows and Sheets", note: "Excel for Mac uses Cmd+T." },
    { keys: "Ctrl+;", action: "Insert today's date", app: "Excel and Sheets" },
    { keys: "Ctrl+Shift+;", action: "Insert the current time", app: "Excel and Sheets" },
    { keys: "Ctrl+`", action: "Show formulas instead of results", app: "Excel and Sheets" },
    { keys: "Ctrl+D", action: "Fill down from the top cell of the selection", app: "Excel and Sheets" },
    { keys: "Ctrl+Space", action: "Select the whole column", app: "Excel and Sheets" },
    { keys: "Shift+Space", action: "Select the whole row", app: "Excel and Sheets" },
    { keys: "Ctrl+ArrowDown", action: "Jump to the last filled cell in the column", app: "Excel and Sheets" },
    { keys: "Alt+=", action: "Insert a SUM formula (AutoSum)", app: "Excel for Windows" },
    { keys: "Ctrl+Z", action: "Undo", app: "Excel and Sheets" },
    { keys: "Ctrl+1", action: "Open Format Cells", app: "Excel for Windows", practice: false },
  ],
  lessons: [
    {
      id: "formulas-references",
      title: "Formulas and cell references",
      summary: "How a formula is put together, and what relative, absolute and mixed references do when you copy a formula.",
      diagram: {
        type: "grid",
        title: "A relative and an absolute reference copied down a column",
        cols: ["A", "B", "C", "D", "E", "F"],
        rows: 4,
        note: "D2 = B2*C2*(1+$F$1)",
        cells: { A1: "Item", B1: "Price", C1: "Qty", D1: "Total", F1: "0.08", A2: "Notebook", B2: "3.50", C2: "12", A3: "Gel pen", B3: "1.25", C3: "40", A4: "Stapler", B4: "8.75", C4: "5" },
        highlight: { D2: "accent", D3: "soft", D4: "soft", F1: "range" },
        arrows: [["F1", "D3"]],
      },
      steps: [
        {
          title: "How a formula is built",
          body: `<p>Every formula starts with an equals sign. After it you combine values, <strong>cell references</strong> such as <code>B2</code>, operators and functions. Type <code>=B2*C2</code> into a cell and press ${k("Enter")}; the cell shows the result while the formula stays behind it.</p>
<ul><li>Operators: <code>+</code> add, <code>-</code> subtract, <code>*</code> multiply, <code>/</code> divide, <code>^</code> power, <code>&amp;</code> join text.</li>
<li>Order of operations: brackets first, then <code>^</code>, then <code>*</code> and <code>/</code>, then <code>+</code> and <code>-</code>. <code>=2+3*4</code> is 14; <code>=(2+3)*4</code> is 20.</li>
<li>${k("F2")} edits the active cell in both programs; ${k("Esc")} cancels an edit without changing anything.</li></ul>`,
        },
        {
          title: "Relative references move with the formula",
          body: `<p>A reference like <code>B2</code> is <strong>relative</strong>. When you copy the formula one row down, it becomes <code>B3</code>; one column right, it becomes <code>C2</code>. The formula keeps the same shape, pointing at cells in the same position relative to itself.</p>
<p>To copy down, select the cell and drag the small square at the bottom-right corner of the selection (the fill handle), or select the formula cell plus the cells below it and press ${k("Ctrl", "D")}. Copy and paste (${k("Ctrl", "C")}, ${k("Ctrl", "V")}) adjusts references the same way.</p>`,
        },
        {
          title: "Absolute references stay fixed",
          body: `<p>Sometimes every row should point at the same cell, such as a tax rate in <code>F1</code>. Add dollar signs to lock it: <code>$F$1</code> is <strong>absolute</strong> and doesn't change when copied.</p>
<p>While editing a formula, put the cursor in a reference and press ${k("F4")} to cycle through <code>$F$1</code> → <code>F$1</code> → <code>$F1</code> → <code>F1</code>. This works in Excel for Windows and in Google Sheets. In Excel for Mac, press ${k("Cmd", "T")} instead.</p>`,
        },
        {
          title: "Mixed references lock one direction",
          body: `<p>A <strong>mixed</strong> reference locks only the column or only the row:</p>
<ul><li><code>$A2</code> keeps column A but lets the row change as you copy down.</li>
<li><code>B$1</code> keeps row 1 but lets the column change as you copy across.</li></ul>
<p>A multiplication table shows why: with numbers down column A and across row 1, <code>=$A2*B$1</code> in B2 can be copied to the whole table and every cell multiplies its own row header by its own column header.</p>`,
        },
        {
          title: "Check formulas at a glance",
          body: `<p>Press ${k("Ctrl", "`")} (the key left of <kbd>1</kbd> on most keyboards) to switch every cell between showing results and showing formulas. In Google Sheets the same view is also under <strong>View &gt; Show &gt; Formulas</strong>. Press it again to switch back. It's the quickest way to spot a formula that was typed over with a plain number.</p>`,
        },
      ],
      quiz: [
        { q: "D2 contains <code>=B2*$F$1</code>. You copy it to D3. What does D3 contain?", options: ["<code>=B3*$F$1</code>", "<code>=B3*$F$2</code>", "<code>=B2*$F$1</code>", "<code>=C3*$G$2</code>"], answer: 0, explain: "B2 is relative, so it moves down one row to B3. $F$1 is absolute, so it stays exactly the same." },
        { q: "Which reference keeps the column fixed but lets the row change when you copy the formula down?", options: ["<code>A$1</code>", "<code>$A1</code>", "<code>$A$1</code>", "<code>A1</code>"], answer: 1, explain: "The dollar sign sits in front of the part it locks. In $A1 the column A is locked and the row number is free to change." },
        { q: "What does <code>=(2+3)*4</code> return?", options: ["14", "20", "24", "9"], answer: 1, explain: "Brackets are calculated first: 2+3 is 5, and 5*4 is 20." },
      ],
      exercise: {
        title: "Totals with a fixed tax rate",
        task: `<p>The sandbox below holds the first rows of the <em>References</em> sheet. The tax rate is in <code>F1</code>. In <code>E2</code>, write a formula for the total including tax for row 2 (unit price × quantity × (1 + tax rate)), written so it could be copied down the column without breaking.</p>`,
        files: ["formulas-practice.xlsx"],
        sandbox: {
          cells: { ...cells(sfProducts.slice(0, 5).map((r) => r.slice(0, 4))), E1: "Total incl. tax", F1: 0.08, G1: "← tax rate" },
          answer: { cell: "E2", expected: 45.36, mustInclude: ["$F$1"] },
        },
        solution: [
          "Click <code>E2</code> and type <code>=C2*D2*(1+F1)</code>, but don't press Enter yet.",
          `Put the cursor inside <code>F1</code> and press ${k("F4")} (Excel for Mac: ${k("Cmd", "T")}) so it becomes <code>$F$1</code>.`,
          "Press Enter. The formula is <code>=C2*D2*(1+$F$1)</code> and the result is <strong>45.36</strong> (3.50 × 12 × 1.08).",
          "In the practice workbook, copy E2 down to E9. Each row uses its own price and quantity, and every row still uses the rate in $F$1.",
        ],
      },
    },
    {
      id: "lookups",
      title: "Lookups",
      summary: "Find a value in one table and return the matching value from another, with exact and approximate matches.",
      diagram: {
        type: "grid",
        title: "A lookup finds an ID in the first column and returns a value from the same row",
        cols: ["A", "B", "C", "D", "E", "F"],
        rows: 5,
        note: "F2 = VLOOKUP(E2, A2:C5, 3, FALSE)",
        cells: { A1: "ID", B1: "Item", C1: "Price", E1: "Find ID", F1: "Price", A2: "101", B2: "Notebook", C2: "3.50", A3: "102", B3: "Gel pen", C3: "1.25", A4: "103", B4: "Stapler", C4: "8.75", A5: "104", B5: "Clips", C5: "0.90", E2: "103", F2: "8.75" },
        highlight: { A4: "range", C4: "accent", E2: "soft", F2: "accent" },
        arrows: [["E2", "A4"], ["A4", "C4"]],
      },
      steps: [
        {
          title: "What a lookup does",
          body: `<p>A lookup answers "find this value in a list, then give me something from the same row". Typical uses: the price for a product ID, the department for an employee number, the rate for a band. In both programs the lookup value has to match the stored value exactly, including stray spaces, which the text-functions lesson shows how to remove.</p>`,
        },
        {
          title: "VLOOKUP with an exact match",
          body: `<p><code>=VLOOKUP(lookup_value, table, column_number, FALSE)</code></p>
<ul><li><strong>lookup_value</strong>: what you're looking for, such as <code>E2</code>.</li>
<li><strong>table</strong>: the whole block, with the lookup column as its <em>first</em> column, such as <code>$A$2:$C$9</code>. Lock it with dollar signs if you'll copy the formula.</li>
<li><strong>column_number</strong>: which column of the table to return, counting the first column as 1.</li>
<li><strong>FALSE</strong>: exact match. If the value isn't found, the result is <code>#N/A</code>.</li></ul>
<p>VLOOKUP works the same way in Excel and Google Sheets.</p>`,
        },
        {
          title: "Approximate matches for bands",
          body: `<p>With <code>TRUE</code> as the last argument, VLOOKUP returns the row with the largest value that is less than or equal to the lookup value. That's right for bands: a table of 0, 50, 100 with discounts 0%, 5%, 10% gives 5% for an order of 72.</p>
<p>The first column must be sorted smallest to largest for approximate matches to work. For IDs, codes and names, always use <code>FALSE</code>.</p>`,
        },
        {
          title: "INDEX and MATCH",
          body: `<p>VLOOKUP can only return columns to the right of the lookup column. INDEX with MATCH has no such limit:</p>
<p><code>=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))</code></p>
<p>MATCH finds the position of the value (the <code>0</code> means exact match); INDEX returns the item at that position from another column. For example, <code>=INDEX(B2:B9, MATCH(E2, A2:A9, 0))</code> returns the item name for the ID in E2. Inserting new columns never breaks it, because it doesn't rely on a column number.</p>`,
        },
        {
          title: "XLOOKUP where it's available",
          body: `<p><code>=XLOOKUP(lookup_value, lookup_range, return_range, "Not found")</code> combines the two steps and has a built-in value to show when nothing matches. It's available in Excel for Microsoft 365, Excel 2021 and later, and Google Sheets, but not in Excel 2019 or earlier. If you share files with people on older versions, INDEX and MATCH is the safe choice.</p>`,
        },
      ],
      quiz: [
        { q: "In <code>=VLOOKUP(E2, A2:C9, 3, FALSE)</code>, what does the 3 mean?", options: ["Return the third row", "Return column C, the table's third column", "Allow up to three mismatched characters", "Search the first three rows only"], answer: 1, explain: "The column number counts across the table from its first column, so 3 is the third column of A2:C9, column C." },
        { q: "Which approach can return a value from a column to the <em>left</em> of the lookup column?", options: ["VLOOKUP with TRUE", "VLOOKUP with FALSE", "INDEX with MATCH", "COUNTIF"], answer: 2, explain: "INDEX and MATCH work with any two ranges. XLOOKUP can too, where it's available." },
        { q: "An approximate-match VLOOKUP returns strange results. What's the most likely cause?", options: ["The first column isn't sorted ascending", "The table has more than three columns", "The lookup value is a number", "The formula uses absolute references"], answer: 0, explain: "Approximate matches assume the first column is sorted from smallest to largest." },
      ],
      exercise: {
        title: "Look up a price by ID",
        task: `<p>The product table is in <code>A1:E9</code>. <code>G2</code> holds an ID. In <code>H2</code>, write a formula that returns the unit price for that ID, using an exact match.</p>`,
        files: ["formulas-practice.xlsx"],
        sandbox: {
          cells: { ...cells(sfProducts), G1: "Find ID", G2: 103, H1: "Unit price" },
          answer: { cell: "H2", expected: 8.75 },
        },
        solution: [
          "Click <code>H2</code>.",
          "Type <code>=VLOOKUP(G2, A2:E9, 3, FALSE)</code>. A2:E9 is the table, 3 is the Unit price column, and FALSE asks for an exact match.",
          "Press Enter. The result is <strong>8.75</strong>, the price of the stapler.",
          "The same answer with INDEX and MATCH: <code>=INDEX(C2:C9, MATCH(G2, A2:A9, 0))</code>.",
          "Change G2 to 999 to see <code>#N/A</code>: the ID isn't in the table. The error-handling lesson shows how to replace it with a message.",
        ],
      },
    },
    {
      id: "logical-functions",
      title: "Logical functions",
      summary: "IF, AND and OR, handling more than two outcomes, and counting or adding up only the rows that meet a condition.",
      diagram: { type: "flow", title: "How IF decides", nodes: ["Test: C2 >= 50", "TRUE → \"Pass\"", "FALSE → \"Retry\"", "One result per row"], highlight: 0, caption: '=IF(C2>=50, "Pass", "Retry")' },
      steps: [
        {
          title: "IF: one test, two outcomes",
          body: `<p><code>=IF(test, value_if_true, value_if_false)</code></p>
<p>The test compares values with <code>=</code>, <code>&lt;&gt;</code> (not equal), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code> or <code>&lt;=</code>. Text results go in double quotes: <code>=IF(B2&gt;=50, "Pass", "Retry")</code>. Leave a result empty with <code>""</code>.</p>`,
        },
        {
          title: "Combining conditions with AND and OR",
          body: `<p><code>AND(test1, test2, …)</code> is TRUE only when every test is true; <code>OR(…)</code> is TRUE when at least one is. Put them inside IF as the test:</p>
<p><code>=IF(AND(C2&gt;1, D2&gt;5), "Bulk", "Standard")</code></p>
<p><code>=IF(OR(D2=0, E2="Discontinued"), "Reorder check", "")</code></p>`,
        },
        {
          title: "More than two outcomes",
          body: `<p>For several bands, nest IFs so each FALSE result asks the next question:</p>
<p><code>=IF(B2&gt;=90, "A", IF(B2&gt;=75, "B", IF(B2&gt;=50, "C", "D")))</code></p>
<p>Excel 2019 and later, Excel for Microsoft 365 and Google Sheets also have IFS, which lists test-and-result pairs in order: <code>=IFS(B2&gt;=90, "A", B2&gt;=75, "B", B2&gt;=50, "C", TRUE, "D")</code>. The final <code>TRUE</code> catches everything left over. Order matters: put the strictest test first.</p>`,
        },
        {
          title: "Counting and adding with conditions",
          body: `<ul><li><code>=COUNTIF(range, criteria)</code> counts matching cells: <code>=COUNTIF(B2:B9, "North")</code>, <code>=COUNTIF(C2:C9, "&gt;100")</code>.</li>
<li><code>=SUMIF(range, criteria, sum_range)</code> adds the sum_range values where the range matches: <code>=SUMIF(B2:B9, "North", C2:C9)</code>.</li>
<li><code>=AVERAGEIF(range, criteria, average_range)</code> works the same way for averages.</li></ul>
<p>Comparison criteria go in quotes. To compare against a cell, join them: <code>"&gt;"&amp;F1</code>.</p>`,
        },
        {
          title: "Several conditions at once",
          body: `<p>COUNTIFS, SUMIFS and AVERAGEIFS take any number of range-and-criteria pairs. SUMIFS puts the range to add <em>first</em>:</p>
<p><code>=SUMIFS(C2:C9, B2:B9, "North", D2:D9, "Paid")</code> adds the amounts for paid North orders.</p>
<p>All of these work identically in Excel and Google Sheets.</p>`,
        },
      ],
      quiz: [
        { q: "B2 contains 50. What does <code>=IF(B2&gt;=50, \"Pass\", \"Retry\")</code> return?", options: ["Pass", "Retry", "TRUE", "50"], answer: 0, explain: ">= means greater than or equal to, so 50 passes the test." },
        { q: "Which argument comes first in SUMIFS?", options: ["The first criteria range", "The range of values to add", "The first criteria", "The number of conditions"], answer: 1, explain: "SUMIFS starts with the sum range, then lists range-and-criteria pairs. SUMIF is the other way round, with the sum range last." },
        { q: "Why does an IFS formula end with <code>TRUE, \"D\"</code>?", options: ["To turn on IFS", "As a catch-all for anything no earlier test matched", "To sort the results", "Because IFS needs an even number of arguments"], answer: 1, explain: "TRUE is always true, so the last pair returns D for any value that failed every earlier test." },
      ],
      exercise: {
        title: "Total for one region",
        task: `<p>The orders are in <code>A1:D9</code>. In <code>G2</code>, write a formula that adds up the Amount for every order in the region named in <code>F2</code>.</p>`,
        files: ["formulas-practice.xlsx"],
        sandbox: {
          cells: { ...cells(sfOrders), F1: "Region", F2: "North", G1: "Total" },
          answer: { cell: "G2", expected: 195.5 },
        },
        solution: [
          "Click <code>G2</code>.",
          "Type <code>=SUMIF(B2:B9, F2, C2:C9)</code>: check the regions in B2:B9 against F2, and add the matching amounts in C2:C9.",
          "Press Enter. The result is <strong>195.5</strong> (120 + 45.5 + 30).",
          'To total only the <em>paid</em> North orders, use SUMIFS: <code>=SUMIFS(C2:C9, B2:B9, F2, D2:D9, "Paid")</code> gives 150.',
        ],
      },
    },
    {
      id: "text-functions",
      title: "Text functions",
      summary: "Join and split text, trim stray spaces, change case, and pull one part out of a longer value.",
      diagram: {
        type: "grid",
        title: "Cleaning a name and splitting a code with text functions",
        cols: ["A", "B", "C"],
        rows: 3,
        note: "B2 = PROPER(TRIM(A2))",
        cells: { A1: "Raw name", B1: "Clean", C1: "Prefix", A2: "  ada   lovelace", B2: "Ada Lovelace", A3: "NB-4471", C3: "NB" },
        highlight: { B2: "accent", C3: "accent", A2: "soft", A3: "soft" },
        arrows: [["A2", "B2"], ["A3", "C3"]],
      },
      steps: [
        {
          title: "Joining text",
          body: `<p>Join values with <code>&amp;</code>: <code>=B2&amp;" "&amp;C2</code> puts a space between a first and last name. <code>CONCAT(…)</code> does the same with a list of values. <code>TEXTJOIN(", ", TRUE, B2:D2)</code> joins a whole range with a delimiter and skips empty cells; it's in Excel 2019 and later, Excel for Microsoft 365, and Google Sheets.</p>`,
        },
        {
          title: "Taking part of a value",
          body: `<ul><li><code>LEFT(text, n)</code> and <code>RIGHT(text, n)</code> take characters from either end: <code>=LEFT("NB-4471", 2)</code> is NB.</li>
<li><code>MID(text, start, n)</code> takes n characters from a position: <code>=MID("NB-4471", 4, 4)</code> is 4471.</li>
<li><code>LEN(text)</code> counts characters, including spaces.</li>
<li><code>FIND(what, text)</code> gives the position of one piece of text inside another and is case-sensitive; <code>SEARCH</code> does the same but ignores case.</li></ul>
<p>Combine them when the length varies: <code>=LEFT(E2, FIND("-", E2) - 1)</code> returns everything before the dash.</p>`,
        },
        {
          title: "Cleaning spaces and case",
          body: `<p><code>TRIM</code> removes spaces at the start and end and shrinks runs of spaces between words to a single space. Imported data is often full of them, and they make lookups fail.</p>
<p><code>UPPER</code>, <code>LOWER</code> and <code>PROPER</code> change case; PROPER capitalizes each word. Nest them: <code>=PROPER(TRIM(A2))</code> turns <code>"  ada   lovelace "</code> into <code>Ada Lovelace</code>.</p>`,
        },
        {
          title: "Splitting a column without formulas",
          body: `<p>To split "Last, First" or "Code-Number" into separate columns in one go:</p>
<ul><li><strong>Excel:</strong> select the column, then <strong>Data &gt; Text to Columns</strong>, choose <em>Delimited</em>, pick the separator, and finish.</li>
<li><strong>Google Sheets:</strong> select the column, then <strong>Data &gt; Split text to columns</strong>, and choose the separator from the box that appears.</li></ul>
<p>Leave empty columns to the right first, because the split fills them. Google Sheets also has a <code>SPLIT</code> function, and Excel for Microsoft 365 has <code>TEXTSPLIT</code>.</p>`,
        },
        {
          title: "Turning formulas into fixed text",
          body: `<p>After cleaning a column with formulas, you often want to keep the results and delete the messy original. Copy the formula cells, then paste values only: in Excel use <strong>Home &gt; Paste &gt; Paste Values</strong>; in Google Sheets use <strong>Edit &gt; Paste special &gt; Values only</strong> (${k("Ctrl", "Shift", "V")}). The cells now hold plain text that no longer depends on the original column.</p>`,
        },
      ],
      quiz: [
        { q: "What does <code>=LEFT(\"SKU-4471\", 3)</code> return?", options: ["SKU", "4471", "SKU-", "471"], answer: 0, explain: "LEFT takes the given number of characters from the start of the text." },
        { q: "What does <code>=TRIM(\"  red   apple \")</code> return?", options: ["\"red   apple\"", "\"red apple\"", "\"redapple\"", "\"  red apple\""], answer: 1, explain: "TRIM removes spaces at both ends and reduces each run of spaces between words to one." },
        { q: "Which function finds text regardless of upper and lower case?", options: ["FIND", "SEARCH", "MID", "EXACT"], answer: 1, explain: "SEARCH ignores case. FIND is case-sensitive." },
      ],
      exercise: {
        title: "Clean up a name",
        task: `<p>Column A holds names typed with extra spaces and inconsistent capitals. In <code>E2</code>, write a formula that returns the name in <code>A2</code> with the extra spaces removed and each word capitalized.</p>`,
        files: ["formulas-practice.xlsx"],
        sandbox: {
          cells: { ...cells(sfPeople.map((r) => [r[0], null, null, r[3]])), E1: "Clean name" },
          answer: { cell: "E2", expected: "Ada Lovelace" },
        },
        solution: [
          "Click <code>E2</code>.",
          "Type <code>=PROPER(TRIM(A2))</code>. TRIM runs first and removes the spaces; PROPER then capitalizes each word.",
          "Press Enter. The result is <strong>Ada Lovelace</strong>.",
          "In the practice workbook, copy the formula down the column, then paste values only if you want to replace the original names.",
        ],
      },
    },
    {
      id: "date-functions",
      title: "Date functions",
      summary: "How spreadsheets store dates, the time between two dates, adding days and months, and formatting dates for display.",
      diagram: { type: "dates" },
      steps: [
        {
          title: "Dates are numbers",
          body: `<p>Both programs store a date as a whole number of days and a time as a fraction of a day. In Excel, 1 is 1 January 1900; Google Sheets counts from 30 December 1899, so dates from March 1900 onwards have the same number in both. Because dates are numbers, you can subtract them and add days to them.</p>
<p>Press ${k("Ctrl", ";")} to type today's date as a fixed value, or ${k("Ctrl", "Shift", ";")} for the current time. <code>=TODAY()</code> gives today's date and updates every time the sheet recalculates.</p>`,
        },
        {
          title: "Building and splitting dates",
          body: `<p><code>=DATE(2025, 3, 31)</code> builds a date from year, month and day, which avoids any confusion between day-first and month-first typing. <code>YEAR</code>, <code>MONTH</code> and <code>DAY</code> take a date apart: <code>=MONTH(B2)</code> is 3 for any date in March.</p>`,
        },
        {
          title: "Time between dates",
          body: `<ul><li>Days: subtract, as in <code>=C2-B2</code>.</li>
<li>Whole years, months or days: <code>=DATEDIF(B2, C2, "Y")</code>, with <code>"M"</code> or <code>"D"</code>. Excel doesn't suggest DATEDIF as you type, but it works in both programs.</li>
<li>Working days, skipping weekends: <code>=NETWORKDAYS(B2, C2)</code>. Add a range of holiday dates as a third argument.</li></ul>`,
        },
        {
          title: "Adding days and months",
          body: `<p>Add days directly: <code>=B2+30</code>. Months have different lengths, so use <code>=EDATE(B2, 3)</code> for the same day three months later; it returns the last day of a shorter month when needed (31 January plus one month is the last day of February). <code>=EOMONTH(B2, 0)</code> gives the last day of the date's own month; <code>=EOMONTH(B2, 1)</code> the last day of the next.</p>`,
        },
        {
          title: "Showing dates the way you want",
          body: `<p>Formatting changes how a date looks without changing its value:</p>
<ul><li><strong>Excel:</strong> <strong>Home</strong> tab, Number Format list, or press ${k("Ctrl", "1")} for <strong>Format Cells &gt; Number &gt; Date</strong> (or <em>Custom</em>, with codes such as <code>dd mmm yyyy</code>).</li>
<li><strong>Google Sheets:</strong> <strong>Format &gt; Number &gt; Date</strong>, or <strong>Format &gt; Number &gt; Custom date and time</strong>.</li></ul>
<p>If a result shows a number such as 45658 instead of a date, the formula is right; the cell just needs a date format. To turn a date into text inside a sentence, use <code>TEXT</code>: <code>="Due "&amp;TEXT(B2, "d mmm yyyy")</code>.</p>`,
        },
      ],
      quiz: [
        { q: "B2 is 1 March and C2 is 15 March of the same year. What does <code>=C2-B2</code> return?", options: ["14", "15", "0.14", "An error"], answer: 0, explain: "Dates are day numbers, so subtracting gives the number of days between them." },
        { q: "A formula shows 45658 when you expected a date. What's wrong?", options: ["The formula is broken", "The cell needs a date format", "The date is before 1900", "The sheet needs recalculating"], answer: 1, explain: "45658 is the date's underlying number. Apply a date format and it displays as a date." },
        { q: "Which function returns the same day a number of months later?", options: ["EOMONTH", "EDATE", "DATEDIF", "NETWORKDAYS"], answer: 1, explain: "EDATE adds months. EOMONTH returns the last day of a month." },
      ],
      exercise: {
        title: "Days until a review",
        task: `<p>Row 2 has a start date in <code>B2</code> and a review date in <code>C2</code>. In <code>E2</code>, write a formula that returns the number of days from the start date to the review date.</p>`,
        files: ["formulas-practice.xlsx"],
        sandbox: {
          cells: { A1: "Name", B1: "Start date", C1: "Review date", A2: "Alan Turing", B2: "=DATE(2024,1,8)", C2: "=DATE(2025,1,31)", E1: "Days" },
          answer: { cell: "E2", expected: 389 },
          dateCells: ["B2", "C2"],
        },
        solution: [
          "Click <code>E2</code>.",
          "Type <code>=C2-B2</code> and press Enter.",
          "The result is <strong>389</strong> days. If it shows as a date, change the cell's format to Number.",
          'The same with DATEDIF: <code>=DATEDIF(B2, C2, "D")</code>. For whole months instead, use <code>"M"</code>, which gives 12.',
        ],
      },
    },
    {
      id: "error-handling",
      title: "Error handling",
      summary: "What the common error values mean, how to trace a problem to its source, and how to return a clean result when a formula can't calculate.",
      diagram: {
        type: "compare",
        title: "Common error values and what usually causes them",
        left: { title: "Error", items: ["#DIV/0!", "#N/A", "#VALUE!", "#REF!", "#NAME?", "#NUM!"] },
        right: { title: "Usual cause", items: ["Dividing by zero or an empty cell", "A lookup found no match", "Text where a number is needed", "A referenced cell was deleted", "A misspelled function or name", "An impossible number result"] },
        accentRight: true,
      },
      steps: [
        {
          title: "Read the error first",
          body: `<p>Each error value points at a different problem. The most common:</p>
<ul><li><code>#DIV/0!</code>: dividing by zero or by an empty cell.</li>
<li><code>#N/A</code>: a lookup couldn't find the value.</li>
<li><code>#VALUE!</code>: the wrong type, such as text in a calculation.</li>
<li><code>#REF!</code>: the formula points at a cell that was deleted.</li>
<li><code>#NAME?</code>: a misspelled function, or text missing its quotes.</li>
<li><code>#NUM!</code>: a number that can't be calculated, such as the square root of a negative.</li></ul>`,
        },
        {
          title: "Trace where the problem starts",
          body: `<p>An error in one cell spreads to every formula that uses it, so fix the first one in the chain.</p>
<ul><li><strong>Excel:</strong> select the cell, then use <strong>Formulas &gt; Trace Precedents</strong> to draw arrows to the cells it uses, or <strong>Formulas &gt; Evaluate Formula</strong> to step through the calculation one part at a time. <strong>Remove Arrows</strong> clears them.</li>
<li><strong>Google Sheets:</strong> double-click the cell; each reference in the formula is colored to match an outline around the cells it uses. Hover over the cell to read the error message.</li></ul>`,
        },
        {
          title: "IFERROR and IFNA",
          body: `<p>When an error is expected, such as an ID that isn't in the list yet, replace it with something useful:</p>
<p><code>=IFERROR(VLOOKUP(G2, A2:E9, 3, FALSE), "Not found")</code></p>
<p><code>IFNA</code> works the same way but only catches <code>#N/A</code>. For lookups it's the better choice, because it still shows other errors, such as a broken reference, instead of hiding them.</p>`,
        },
        {
          title: "Don't hide real mistakes",
          body: `<p>Wrapping everything in IFERROR makes a sheet look clean while hiding mistakes. Use it only where you know which error to expect and why. Check the result for a couple of rows by hand, and use ${k("Ctrl", "`")} to view the formulas.</p>`,
        },
      ],
      quiz: [
        { q: "A VLOOKUP returns <code>#N/A</code>. What does that usually mean?", options: ["The function name is misspelled", "The value wasn't found in the first column", "A referenced cell was deleted", "The result is too large"], answer: 1, explain: "#N/A means not available: the lookup couldn't find a match. Check for typing differences and extra spaces." },
        { q: "Which function catches <em>only</em> #N/A errors?", options: ["IFERROR", "IFNA", "ISBLANK", "IF"], answer: 1, explain: "IFNA reacts only to #N/A, so other errors stay visible." },
        { q: "A formula shows <code>#NAME?</code>. What should you check first?", options: ["The spelling of the function", "The column width", "The date format", "Whether the sheet is protected"], answer: 0, explain: "#NAME? appears when the program doesn't recognize a name, often a typo in a function or text missing its quotes." },
      ],
      exercise: {
        title: "Average price without errors",
        task: `<p>Column B has revenue and column C has units sold. Row 4 sold no units, so dividing gives <code>#DIV/0!</code>. In <code>D4</code>, write a formula that divides revenue by units but shows the text <code>No sales</code> when it can't.</p>`,
        files: ["formulas-practice.xlsx"],
        sandbox: {
          cells: { A1: "Item", B1: "Revenue", C1: "Units", D1: "Price per unit", A2: "Notebook", B2: 42, C2: 12, A3: "Gel pen", B3: 50, C3: 40, A4: "Paper clips", B4: 0, C4: 0, A5: "Desk lamp", B5: 72, C5: 3, D2: "=B2/C2", D3: "=B3/C3" },
          answer: { cell: "D4", expected: "No sales" },
        },
        solution: [
          "Click <code>D4</code>.",
          'Type <code>=IFERROR(B4/C4, "No sales")</code> and press Enter.',
          "The result is <strong>No sales</strong>, because B4/C4 divides by zero.",
          "Copy the formula to the other rows: rows with sales still show their price per unit.",
        ],
      },
    },
    {
      id: "excel-and-sheets",
      title: "Excel and Google Sheets side by side",
      summary: "What works identically, where the two programs differ, and how to move files between them.",
      diagram: {
        type: "compare",
        title: "Where Excel and Google Sheets differ",
        left: { title: "Microsoft Excel", items: ["Ribbon tabs: Home, Formulas, Data", "Format Cells (Ctrl+1)", "Text to Columns", "Formulas > Evaluate Formula", "XLOOKUP in 365 and 2021+", "TEXTSPLIT in Microsoft 365"] },
        right: { title: "Google Sheets", items: ["Menus: Format, Data, Insert", "Format > Number", "Split text to columns", "Colored references on edit", "XLOOKUP available", "SPLIT, QUERY, IMPORTRANGE"] },
      },
      steps: [
        {
          title: "What stays the same",
          body: `<p>References, operators and nearly every function in this guide (VLOOKUP, INDEX, MATCH, IF, the COUNTIF family, the text and date functions, IFERROR) are written identically in both programs. A formula you write in one usually works unchanged in the other.</p>`,
        },
        {
          title: "Where they differ",
          body: `<ul><li><strong>Menus:</strong> Excel groups commands into ribbon tabs (Home, Insert, Formulas, Data); Google Sheets uses menus (File, Edit, View, Insert, Format, Data).</li>
<li><strong>Some functions are only in one program:</strong> QUERY, IMPORTRANGE and SPLIT are Google Sheets functions; TEXTSPLIT is in Excel for Microsoft 365. XLOOKUP is in both, but not in Excel 2019 or earlier.</li>
<li><strong>Separators:</strong> in some regional settings, both programs use semicolons between arguments instead of commas. The formula works the same; only the separator changes.</li></ul>`,
        },
        {
          title: "Moving files between them",
          body: `<ul><li><strong>Open an Excel file in Google Sheets:</strong> <strong>File &gt; Import</strong> and upload the .xlsx, or upload it to Google Drive and open it with Google Sheets.</li>
<li><strong>Save a Google Sheet for Excel:</strong> <strong>File &gt; Download &gt; Microsoft Excel (.xlsx)</strong>.</li></ul>
<p>After converting, check any formula that uses a function only one program has; it shows <code>#NAME?</code> in the other.</p>`,
        },
        {
          title: "Keyboard differences",
          body: `<p>The shortcuts in this guide's trainer work in both programs unless marked. On a Mac, use ${k("Cmd")} in place of ${k("Ctrl")}. Excel for Mac uses ${k("Cmd", "T")} instead of ${k("F4")} to cycle references.</p>`,
        },
      ],
      quiz: [
        { q: "Which of these is a Google Sheets function that Excel doesn't have?", options: ["VLOOKUP", "QUERY", "SUMIFS", "TRIM"], answer: 1, explain: "QUERY is specific to Google Sheets. The others work in both programs." },
        { q: "How do you save a Google Sheet as an Excel file?", options: ["File > Download > Microsoft Excel (.xlsx)", "Data > Export", "Format > Excel mode", "Share > Copy link"], answer: 0, explain: "File > Download offers several formats, including Microsoft Excel." },
      ],
      exercise: {
        title: "Round trip between programs",
        task: `<p>Open <strong>formulas-solutions.xlsx</strong> in the program you didn't use for this guide (Google Sheets if you used Excel, or Excel if you used Google Sheets). Check that every formula on every sheet calculates, and note any that don't.</p>`,
        files: ["formulas-solutions.xlsx"],
        solution: [
          "Google Sheets: <strong>File &gt; Import &gt; Upload</strong>, choose formulas-solutions.xlsx, and pick <em>Insert new sheet(s)</em> or <em>Replace spreadsheet</em>. Excel: download the Google Sheet with <strong>File &gt; Download &gt; Microsoft Excel (.xlsx)</strong> and open it.",
          `On each sheet, press ${k("Ctrl", "`")} to show formulas, then press it again to see results.`,
          "Every formula in the solutions workbook uses functions available in both programs, so all of them should calculate. If you add XLOOKUP, check it opens in the version of Excel you're sharing with.",
        ],
      },
    },
  ],
};
