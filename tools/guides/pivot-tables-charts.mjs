import { cells, k } from "./_helpers.mjs";
import { salesSummary, salesRawStats, salesExtraRows } from "../files/datasets.mjs";

const s = salesSummary();
const raw = salesRawStats();
const money = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const extra = Math.round(salesExtraRows.reduce((a, r) => a + r.sales, 0) * 100) / 100;
const newTotal = Math.round((s.total + extra) * 100) / 100;
const q = (r, qq) => s.byRegionQuarter[r + "|" + qq];
const pct = (n) => (Math.round((n / s.total) * 1000) / 10).toFixed(1) + "%";

export default {
  id: "pivot-tables-charts",
  slug: "data-analysis-pivot-tables-charts",
  title: "Data Analysis with Pivot Tables & Charts",
  software: "Microsoft Excel or Google Sheets",
  apps: ["Excel", "Sheets"],
  intro:
    "Turn a raw table of data into clear summaries and charts: cleaning data, building pivot tables, summarizing and filtering, and choosing and formatting charts. Every lesson covers both Microsoft Excel and Google Sheets. You should already be comfortable with basic formulas and cell references.",
  platformNote: "Shortcuts are shown for Windows and ChromeOS. On a Mac, use Cmd in place of Ctrl unless a lesson says otherwise.",
  sandbox: true,
  files: [
    { name: "sales-raw.xlsx", title: "Raw sales data", desc: `${raw.rows} rows of untidy order data for the cleaning lesson: duplicated rows, stray spaces, inconsistent capitals and dates stored as text.` },
    { name: "sales-clean.xlsx", title: "Clean sales data", desc: `${s.rows} orders for the pivot table and chart lessons: date, region, category, channel, units, price and sales.` },
    { name: "sales-clean.csv", title: "Clean sales data (CSV)", desc: "The same clean data as plain comma-separated text, for importing into any spreadsheet program." },
    { name: "sales-new-rows.csv", title: "Three new orders", desc: "Extra rows for the lesson on refreshing a pivot table when the data grows." },
  ],
  shortcuts: [
    { keys: "Ctrl+A", action: "Select the current data region", app: "Excel and Sheets" },
    { keys: "Ctrl+Shift+ArrowDown", action: "Extend the selection to the last filled row", app: "Excel and Sheets" },
    { keys: "Ctrl+H", action: "Find and replace", app: "Excel and Sheets" },
    { keys: "Ctrl+Shift+L", action: "Turn filters on or off", app: "Excel for Windows" },
    { keys: "Alt+F5", action: "Refresh the selected pivot table", app: "Excel for Windows" },
    { keys: "Ctrl+Alt+F5", action: "Refresh all pivot tables and data", app: "Excel for Windows" },
    { keys: "Alt+F1", action: "Insert a chart of the selected data", app: "Excel for Windows" },
    { keys: "F2", action: "Edit the active cell", app: "Excel and Sheets" },
    { keys: "Ctrl+Space", action: "Select the whole column", app: "Excel and Sheets" },
    { keys: "Ctrl+Z", action: "Undo", app: "Excel and Sheets" },
    { keys: "Ctrl+T", action: "Format the data as a table", app: "Excel", practice: false },
  ],
  lessons: [
    {
      id: "preparing-data",
      title: "Preparing data",
      summary: "What a well-structured table looks like, and how to remove duplicates, fix stray spaces and capitals, and repair dates stored as text.",
      diagram: { type: "flow", title: "From raw rows to analysis-ready data", nodes: ["One header row", "Remove duplicates", "Trim and fix case", "Real dates", "Ready for a pivot"], highlight: 4 },
      steps: [
        {
          title: "The shape pivot tables need",
          body: `<p>Pivot tables and charts work best on a plain table:</p>
<ul><li>One header row, with a short, unique name for each column.</li>
<li>One record per row, such as one order, and no subtotal or blank rows in the middle.</li>
<li>One kind of value per column: all dates, all numbers or all text.</li>
<li>No merged cells.</li></ul>
<p>If your data has months spread across columns (Jan, Feb, Mar…), it will be harder to summarize than one Month column with one row per record.</p>`,
        },
        {
          title: "Remove duplicate rows",
          body: `<ul><li><strong>Excel:</strong> click inside the data, then <strong>Data &gt; Remove Duplicates</strong>. Tick the columns that together identify a duplicate (often all of them) and select OK. Excel tells you how many rows it removed.</li>
<li><strong>Google Sheets:</strong> select the data, then <strong>Data &gt; Data cleanup &gt; Remove duplicates</strong>, tick <em>Data has header row</em>, choose the columns, and select <em>Remove duplicates</em>.</li></ul>
<p>Work on a copy of the sheet first, so you can compare the result with the original.</p>`,
        },
        {
          title: "Fix spaces and inconsistent text",
          body: `<p>"North", " north " and "NORTH" look similar but count as three different regions in a pivot table.</p>
<ul><li><strong>Google Sheets:</strong> <strong>Data &gt; Data cleanup &gt; Trim whitespace</strong> removes leading, trailing and repeated spaces in the selection.</li>
<li><strong>Both:</strong> in a helper column, <code>=PROPER(TRIM(B2))</code> fixes spacing and capitals at once. Copy it down, paste values only over the original column, and delete the helper.</li>
<li><strong>Both:</strong> ${k("Ctrl", "H")} opens Find and replace for fixing one spelling everywhere.</li></ul>`,
        },
        {
          title: "Repair dates stored as text",
          body: `<p>Dates typed or imported as text sit at the left of the cell and won't group by month. Test with <code>=ISNUMBER(A2)</code>: a real date returns TRUE.</p>
<ul><li><strong>Excel:</strong> select the column, then <strong>Data &gt; Text to Columns</strong> and select <em>Finish</em>; text dates in a recognizable format become real dates. A formula alternative is <code>=DATEVALUE(A2)</code> in a helper column.</li>
<li><strong>Google Sheets:</strong> select the column, then <strong>Format &gt; Number &gt; Date</strong>; values in a standard format such as 2025-03-14 convert. <code>=DATEVALUE(A2)</code> also works.</li></ul>`,
        },
        {
          title: "Keep the range growing (Excel)",
          body: `<p>In Excel, click inside the data and choose <strong>Insert &gt; Table</strong> (${k("Ctrl", "T")}). A table grows automatically when you add rows underneath, and a pivot table built from it picks up new rows when refreshed. Google Sheets has no equivalent; the last lesson shows how to handle new rows there.</p>`,
        },
      ],
      quiz: [
        { q: "Why might a pivot table show North twice?", options: ["Some cells contain extra spaces or different capitals", "The data has too many rows", "The pivot table needs a filter", "The region column is formatted as a date"], answer: 0, explain: "Values must match exactly to be grouped. \" north \" and \"North\" are different text to a spreadsheet." },
        { q: "Which formula shows whether A2 holds a real date rather than text?", options: ["<code>=ISTEXT(A2)</code> returning TRUE", "<code>=ISNUMBER(A2)</code> returning TRUE", "<code>=LEN(A2)</code>", "<code>=TRIM(A2)</code>"], answer: 1, explain: "Real dates are numbers underneath, so ISNUMBER returns TRUE for them and FALSE for dates stored as text." },
      ],
      exercise: {
        title: "Clean the raw sales file",
        task: `<p>Open <strong>sales-raw.xlsx</strong>. Remove the duplicated rows, fix the Region column so every region is spelled with a capital first letter and no extra spaces, and convert the dates stored as text. The sandbox lets you try the region-cleaning formula first: in <code>C2</code>, clean the value in <code>B2</code>.</p>`,
        files: ["sales-raw.xlsx"],
        sandbox: {
          cells: { A1: "Order", B1: "Region (raw)", C1: "Region (clean)", A2: "S-2001", B2: "  north ", A3: "S-2002", B3: "SOUTH", A4: "S-2003", B4: "East" },
          answer: { cell: "C2", expected: "North" },
        },
        solution: [
          `Duplicates: in Excel, <strong>Data &gt; Remove Duplicates</strong> with all columns ticked; in Google Sheets, <strong>Data &gt; Data cleanup &gt; Remove duplicates</strong>. ${raw.duplicates} duplicate rows are removed, leaving <strong>${raw.unique}</strong> orders.`,
          "Regions: insert a helper column next to Region and enter <code>=PROPER(TRIM(C2))</code> (adjust to your Region column), copy it down, paste values only over the Region column, then delete the helper. In the sandbox, <code>=PROPER(TRIM(B2))</code> returns <strong>North</strong>.",
          "Dates: in the Date column, check with <code>=ISNUMBER()</code>. Convert any text dates with Data &gt; Text to Columns &gt; Finish (Excel) or Format &gt; Number &gt; Date (Google Sheets).",
          "Afterwards, a pivot table with Region in Rows should show exactly four regions: East, North, South and West.",
        ],
      },
    },
    {
      id: "building-pivot-tables",
      title: "Building pivot tables",
      summary: "Choose rows, columns and values, switch between sum, count and average, and group dates and numbers.",
      diagram: { type: "pivot", title: "Dragging source columns into the four pivot table areas", fields: ["Date", "Region", "Category", "Channel", "Units", "Sales"], areas: { rows: ["Region"], columns: ["Quarter"], values: ["Sum of Sales"], filters: ["Channel"] } },
      steps: [
        {
          title: "Create the pivot table",
          body: `<ul><li><strong>Excel:</strong> click any cell in the data, then <strong>Insert &gt; PivotTable</strong>, choose <em>From Table/Range</em>, confirm the range, pick <em>New Worksheet</em>, and select OK. The PivotTable Fields pane opens on the right.</li>
<li><strong>Google Sheets:</strong> select the data including headers, then <strong>Insert &gt; Pivot table</strong>, choose <em>New sheet</em>, and select <em>Create</em>. The pivot table editor opens on the right.</li></ul>`,
        },
        {
          title: "Rows, columns, values and filters",
          body: `<p>A pivot table has four areas:</p>
<ul><li><strong>Rows:</strong> one row per distinct value, such as each region.</li>
<li><strong>Columns:</strong> one column per distinct value, such as each quarter.</li>
<li><strong>Values:</strong> the numbers to calculate, such as total sales.</li>
<li><strong>Filters:</strong> limit which records are counted, such as online orders only.</li></ul>
<p>In Excel, drag field names into the boxes at the bottom of the Fields pane. In Google Sheets, select <em>Add</em> next to Rows, Columns, Values or Filters and pick a column.</p>`,
        },
        {
          title: "Sum, count or average",
          body: `<p>Numeric fields are summed by default; text fields are counted.</p>
<ul><li><strong>Excel:</strong> in the Values box, select the field's arrow, choose <strong>Value Field Settings</strong>, and pick Sum, Count, Average, Max or Min under <em>Summarize value field by</em>.</li>
<li><strong>Google Sheets:</strong> under Values, change <em>Summarize by</em> to SUM, COUNTA, AVERAGE, MAX or MIN.</li></ul>
<p>Count tells you how many orders there were; Sum of Sales tells you how much they were worth.</p>`,
        },
        {
          title: "Group dates and numbers",
          body: `<ul><li><strong>Excel:</strong> right-click any date in the pivot table and choose <strong>Group</strong>, then select Months, Quarters, Years or a combination. Recent versions may group dates automatically when you add a date field. For numbers, Group lets you set a starting value, ending value and interval.</li>
<li><strong>Google Sheets:</strong> right-click a date in the pivot table and choose <strong>Create pivot date group</strong>, then Month, Quarter, Year or another option. For numbers, right-click and choose <strong>Create pivot group rule</strong>.</li></ul>`,
        },
      ],
      quiz: [
        { q: "You want one row per region and one column per quarter. Where does Region go?", options: ["Values", "Rows", "Columns", "Filters"], answer: 1, explain: "Rows creates one row for each distinct value of the field." },
        { q: "A text field added to Values shows numbers. What are they?", options: ["The sum of the text", "A count of the records", "The average length of the text", "An error"], answer: 1, explain: "Text can't be added up, so both programs count it instead." },
      ],
      exercise: {
        title: "Sales by region and quarter",
        task: `<p>Open <strong>sales-clean.xlsx</strong> and build a pivot table with Region in Rows, the order date grouped by quarter in Columns, and the sum of Sales in Values.</p>`,
        files: ["sales-clean.xlsx", "sales-clean.csv"],
        solution: [
          "Click inside the data and insert a pivot table on a new sheet (Excel: Insert &gt; PivotTable; Google Sheets: Insert &gt; Pivot table).",
          "Add <strong>Region</strong> to Rows and <strong>Sales</strong> to Values (Sum).",
          "Add <strong>Date</strong> to Columns, then group it by quarter (Excel: right-click a date &gt; Group &gt; Quarters; Google Sheets: right-click &gt; Create pivot date group &gt; Quarter). If Excel adds Years as well, that's fine; all the orders are from 2025.",
          `Check your totals: the grand total is <strong>${money(s.total)}</strong>. North is ${money(s.byRegion.North)} (Q1 ${money(q("North", "Q1"))}, Q2 ${money(q("North", "Q2"))}, Q3 ${money(q("North", "Q3"))}, Q4 ${money(q("North", "Q4"))}); East ${money(s.byRegion.East)}; South ${money(s.byRegion.South)}; West ${money(s.byRegion.West)}.`,
        ],
      },
    },
    {
      id: "summarizing-filtering",
      title: "Summarizing and filtering",
      summary: "Filter and sort a pivot table, show values as a share of the total, and add calculated fields.",
      diagram: { type: "bars", title: "Share of total sales by region", values: [s.byRegion.North, s.byRegion.South, s.byRegion.East, s.byRegion.West], labels: ["North", "South", "East", "West"], highlight: 2 },
      steps: [
        {
          title: "Filter what's counted",
          body: `<ul><li><strong>Excel:</strong> drag a field into <em>Filters</em> to get a drop-down above the pivot table, or use the arrow on the Row Labels heading to tick and untick items.</li>
<li><strong>Google Sheets:</strong> select <em>Add</em> next to Filters, choose a column, then pick <em>Filter by values</em> or <em>Filter by condition</em>.</li></ul>
<p>To filter interactively, Excel offers <strong>PivotTable Analyze &gt; Insert Slicer</strong> and Google Sheets offers <strong>Data &gt; Add a slicer</strong>: on-sheet controls anyone can click.</p>`,
        },
        {
          title: "Sort by value",
          body: `<ul><li><strong>Excel:</strong> right-click a number in the values column and choose <strong>Sort &gt; Sort Largest to Smallest</strong>.</li>
<li><strong>Google Sheets:</strong> under Rows, set <em>Sort by</em> to the value (for example, SUM of Sales) and <em>Order</em> to Descending.</li></ul>`,
        },
        {
          title: "Show values as a percentage",
          body: `<ul><li><strong>Excel:</strong> <strong>Value Field Settings &gt; Show Values As</strong>, then <em>% of Grand Total</em> (or % of Column Total or % of Row Total).</li>
<li><strong>Google Sheets:</strong> under Values, set <em>Show as</em> to <em>% of grand total</em> (or % of row or % of column).</li></ul>
<p>Add the same field to Values twice to see both the amount and the share side by side.</p>`,
        },
        {
          title: "Calculated fields",
          body: `<p>A calculated field creates a new value from existing ones, such as average price per unit.</p>
<ul><li><strong>Excel:</strong> click in the pivot table, then <strong>PivotTable Analyze &gt; Fields, Items &amp; Sets &gt; Calculated Field</strong>. Name it, enter a formula such as <code>=Sales/Units</code>, and select Add.</li>
<li><strong>Google Sheets:</strong> under Values, select <em>Add &gt; Calculated field</em> and enter a formula such as <code>=Sales/Units</code>, using the column names.</li></ul>`,
        },
      ],
      quiz: [
        { q: "Which option shows each region's sales as a share of all sales?", options: ["Summarize by Count", "Show values as % of grand total", "Group by quarter", "Sort descending"], answer: 1, explain: "Showing values as a percentage of the grand total turns each amount into its share." },
        { q: "What does a calculated field let you do?", options: ["Add a new column to the source data", "Create a value from other fields, such as Sales/Units", "Filter the pivot table", "Change the chart type"], answer: 1, explain: "Calculated fields combine existing fields with a formula inside the pivot table." },
      ],
      exercise: {
        title: "Each region's share",
        task: `<p>The sandbox holds the regional totals from the clean data. In <code>C2</code>, write a formula for North's share of total sales, written so it could be copied down to the other regions. (In a pivot table you'd use "% of grand total"; this does the same with a formula.)</p>`,
        files: ["sales-clean.xlsx"],
        sandbox: {
          cells: { ...cells([["Region", "Sales", "Share"], ...s.regions.map((r) => [r, s.byRegion[r]])]) },
          answer: { cell: "C2", expected: s.byRegion.North / s.total, tolerance: 1e-6, mustInclude: ["$"] },
        },
        solution: [
          "Click <code>C2</code>.",
          "Type <code>=B2/SUM($B$2:$B$5)</code>. The total range is absolute, so every row divides by the same total.",
          `Press Enter. The result is about <strong>${(s.byRegion.North / s.total).toFixed(4)}</strong>; format the cell as a percentage to see <strong>${pct(s.byRegion.North)}</strong>.`,
          `Copy it down: South ${pct(s.byRegion.South)}, East ${pct(s.byRegion.East)}, West ${pct(s.byRegion.West)}. In the pivot table, Show values as % of grand total gives the same figures.`,
        ],
      },
    },
    {
      id: "choosing-a-chart",
      title: "Choosing a chart",
      summary: "Match the chart type to the question: comparing categories, change over time, part of a whole, and relationships between values.",
      diagram: { type: "chartpick" },
      steps: [
        {
          title: "Start from the question",
          body: `<ul><li><strong>Comparing categories</strong> (sales by region): a column or bar chart. Horizontal bars suit long labels.</li>
<li><strong>Change over time</strong> (sales by month): a line chart, with time running left to right.</li>
<li><strong>Part of a whole</strong> (share by channel): a stacked bar, or a pie chart only if there are two to four slices.</li>
<li><strong>Relationship between two numbers</strong> (units against price): a scatter chart.</li>
<li><strong>Distribution</strong> (how order sizes spread out): a histogram, available in Excel 2016 and later and in Google Sheets.</li></ul>`,
        },
        {
          title: "Insert a chart",
          body: `<ul><li><strong>Excel:</strong> select the data (or a cell in a pivot table), then <strong>Insert &gt; Recommended Charts</strong> to see suggestions, or pick a type from the Charts group. ${k("Alt", "F1")} inserts the default chart type immediately. From a pivot table, <strong>PivotTable Analyze &gt; PivotChart</strong> makes a chart that follows the pivot's filters.</li>
<li><strong>Google Sheets:</strong> select the data, then <strong>Insert &gt; Chart</strong>. In the Chart editor, the <em>Setup</em> tab sets the chart type and data range.</li></ul>`,
        },
        {
          title: "Charts to avoid",
          body: `<ul><li>3D effects, which distort the size of bars and slices.</li>
<li>Pie charts with many slices, which are hard to compare.</li>
<li>Line charts for unrelated categories, which imply a trend that isn't there.</li>
<li>Two different scales on one chart, unless clearly labeled.</li></ul>`,
        },
      ],
      quiz: [
        { q: "Which chart suits monthly sales over a year?", options: ["Pie chart", "Line chart", "Scatter chart", "Stacked bar"], answer: 1, explain: "Line charts show change over time, with time on the horizontal axis." },
        { q: "When is a pie chart reasonable?", options: ["For 12 monthly values", "For two to four parts of a whole", "For comparing two numbers over time", "For showing a relationship"], answer: 1, explain: "Pies only work for a few slices of one whole; beyond that, a bar chart is easier to read." },
      ],
      exercise: {
        title: "Pick a chart for each question",
        task: `<p>Using <strong>sales-clean.xlsx</strong>, decide which chart type answers each question, then build two of them: (1) Which category sells the most? (2) How did sales change from month to month? (3) What share of sales came through each channel? (4) Do orders with more units have a higher total?</p>`,
        files: ["sales-clean.xlsx"],
        solution: [
          `(1) A bar or column chart of Sum of Sales by Category. Paper is highest at ${money(s.byCategory.Paper)}.`,
          "(2) A line chart of Sum of Sales by month, made from a pivot table with Date grouped by month in Rows.",
          `(3) Two channels make a reasonable pie or a single stacked bar: Online ${money(s.byChannel.Online)} (${pct(s.byChannel.Online)}) and Store ${money(s.byChannel.Store)} (${pct(s.byChannel.Store)}).`,
          "(4) A scatter chart with Units on the horizontal axis and Sales on the vertical axis.",
        ],
      },
    },
    {
      id: "formatting-charts",
      title: "Formatting charts",
      summary: "Titles, axis labels, colors, gridlines and data labels, and removing clutter so a chart can be read at a glance.",
      diagram: { type: "bars", title: "One highlighted bar with direct value labels", values: [s.byCategory.Paper, s.byCategory.Storage, s.byCategory.Desk, s.byCategory.Writing].map((v) => Math.round(v)), labels: ["Paper", "Storage", "Desk", "Writing"], highlight: 0, showValues: true },
      steps: [
        {
          title: "Say what the chart shows",
          body: `<p>Use the title to state the takeaway ("Paper is the best-selling category") rather than only the topic ("Sales by category"). Label each axis with what it measures and its unit.</p>
<ul><li><strong>Excel:</strong> select the chart, then use <strong>Chart Design &gt; Add Chart Element</strong> for titles, axis titles, data labels, gridlines and the legend. Double-click any part of the chart to open its Format pane.</li>
<li><strong>Google Sheets:</strong> double-click the chart to open the Chart editor, then use the <em>Customize</em> tab: <em>Chart &amp; axis titles</em>, <em>Series</em>, <em>Legend</em> and <em>Gridlines and ticks</em>.</li></ul>`,
        },
        {
          title: "Remove clutter",
          body: `<ul><li>Sort bars from largest to smallest unless the categories have a natural order.</li>
<li>Start the value axis of a bar chart at zero.</li>
<li>Lighten or remove gridlines; add data labels instead when exact values matter.</li>
<li>Delete the legend when there's only one series, or label lines directly.</li>
<li>Use one color for everything, plus one highlight color for the bar you're talking about.</li></ul>`,
        },
        {
          title: "Change a single bar's color",
          body: `<ul><li><strong>Excel:</strong> click the bars once to select the series, click again to select one bar, then choose a fill color in the Format pane or with <strong>Format &gt; Shape Fill</strong>.</li>
<li><strong>Google Sheets:</strong> in the Chart editor's <em>Customize &gt; Series</em> section, select <em>Format data point</em>, choose the bar, and pick a color.</li></ul>`,
        },
      ],
      quiz: [
        { q: "Which title tells the reader the most?", options: ["Chart 1", "Sales by category", "Paper is the best-selling category", "Category vs. sales"], answer: 2, explain: "A title that states the takeaway tells the reader what to notice." },
        { q: "Where should the value axis of a bar chart usually start?", options: ["At the smallest value", "At zero", "At the average", "Wherever the program chooses"], answer: 1, explain: "Bar length represents the value, so starting above zero exaggerates differences." },
      ],
      exercise: {
        title: "Tidy the category chart",
        task: `<p>Take the category bar chart you made in the previous lesson and format it so it can be read in a few seconds: a takeaway title, sorted bars, one highlight color, data labels, and no unnecessary legend or heavy gridlines.</p>`,
        files: ["sales-clean.xlsx"],
        solution: [
          "Sort the pivot table (or source range) by Sum of Sales, largest to smallest, so the bars follow.",
          "Set the chart title to “Paper is the best-selling category”.",
          "Make every bar a neutral gray, then color only the Paper bar with a strong color.",
          `Add data labels; the four values are Paper ${money(s.byCategory.Paper)}, Storage ${money(s.byCategory.Storage)}, Desk ${money(s.byCategory.Desk)} and Writing ${money(s.byCategory.Writing)}. Remove the legend and lighten or remove the gridlines.`,
        ],
      },
    },
    {
      id: "keeping-current",
      title: "Keeping it current",
      summary: "Refresh a pivot table when the source data changes, and keep charts connected to the data they show.",
      diagram: { type: "flow", title: "What happens when new rows are added", nodes: ["New rows added", "Source range includes them", "Refresh pivot table", "Pivot chart updates"], highlight: 2 },
      steps: [
        {
          title: "Excel pivot tables don't update by themselves",
          body: `<p>When the source data changes, click inside the pivot table and choose <strong>PivotTable Analyze &gt; Refresh</strong> (${k("Alt", "F5")}), or <strong>Refresh All</strong> (${k("Ctrl", "Alt", "F5")}) to update every pivot table in the workbook.</p>
<p>New rows are included only if they're inside the source range. If the source is a Table (Insert &gt; Table), new rows typed directly underneath are included automatically. Otherwise use <strong>PivotTable Analyze &gt; Change Data Source</strong> to extend the range.</p>
<p>To refresh every time the file opens: <strong>PivotTable Analyze &gt; Options &gt; Data</strong>, then tick <em>Refresh data when opening the file</em>.</p>`,
        },
        {
          title: "Google Sheets updates automatically",
          body: `<p>A Google Sheets pivot table recalculates as soon as the data in its range changes. Rows added below the range aren't included, though. Open the pivot table editor and edit the range at the top, or set the range to whole columns (for example <code>Sales!A:H</code>) so new rows are always included.</p>`,
        },
        {
          title: "Charts follow their data",
          body: `<p>A chart made from a pivot table updates when the pivot table does. A chart made from a fixed range only shows that range; extend it in the chart's data settings (Excel: <strong>Chart Design &gt; Select Data</strong>; Google Sheets: Chart editor &gt; <em>Setup &gt; Data range</em>).</p>`,
        },
      ],
      quiz: [
        { q: "You add rows to an Excel table that feeds a pivot table. What else do you need to do?", options: ["Nothing; it updates instantly", "Refresh the pivot table", "Rebuild the pivot table", "Save the file"], answer: 1, explain: "Excel pivot tables keep a snapshot of the data until they're refreshed." },
        { q: "How do you make a Google Sheets pivot table include rows added later?", options: ["Press Alt+F5", "Use whole columns as the source range", "Add a slicer", "Group the dates"], answer: 1, explain: "A range like Sales!A:H includes any rows added later." },
      ],
      exercise: {
        title: "Add three orders and refresh",
        task: `<p>Paste the three orders from <strong>sales-new-rows.csv</strong> below the data in sales-clean.xlsx, then make your region-by-quarter pivot table include them.</p>`,
        files: ["sales-new-rows.csv", "sales-clean.xlsx"],
        solution: [
          "Open sales-new-rows.csv, copy the three data rows (not the header), and paste them directly under the last row of the clean data.",
          "Excel: if the data is a Table, click in the pivot table and press Alt+F5 (or PivotTable Analyze &gt; Refresh). If it isn't, use Change Data Source to include the new rows first, then refresh.",
          "Google Sheets: if the pivot table's range ends at the old last row, edit it to include the new rows, or change it to whole columns.",
          `Check the result: the grand total rises by ${money(extra)} to <strong>${money(newTotal)}</strong>, all of it in Q4.`,
        ],
      },
    },
  ],
};
