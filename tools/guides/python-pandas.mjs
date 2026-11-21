import { k } from "./_helpers.mjs";
import { ordersCsv, REGIONS_CSV } from "./_pandas-data.mjs";

// Builds a Jupyter notebook (nbformat 4) from [kind, text] cells.
function notebook(cells) {
  return JSON.stringify(
    {
      cells: cells.map(([kind, text]) => ({
        cell_type: kind,
        metadata: {},
        source: text.split("\n").map((l, i, a) => (i < a.length - 1 ? l + "\n" : l)),
        ...(kind === "code" ? { execution_count: null, outputs: [] } : {}),
      })),
      metadata: { kernelspec: { display_name: "Python 3", language: "python", name: "python3" }, language_info: { name: "python" } },
      nbformat: 4,
      nbformat_minor: 5,
    },
    null,
    1
  ) + "\n";
}

const SOLUTION = [
  ["markdown", "# Orders analysis\nCompleted notebook for *Data Analysis with Python & pandas*. Run the cells from top to bottom."],
  ["code", "import pandas as pd\n\ndf = pd.read_csv(\"orders.csv\")\ndf.shape"],
  ["markdown", "## 1. Explore"],
  ["code", "df.head()"],
  ["code", "df.info()\ndf.describe()"],
  ["markdown", "## 2. Select and filter"],
  ["code", "big = df[df[\"units\"] >= 10]\nlen(big)"],
  ["code", "df[(df[\"product\"] == \"Desk lamp\") & (df[\"units\"] >= 5)].sort_values(\"units\", ascending=False)"],
  ["markdown", "## 3. Clean"],
  ["code", "df = df.drop_duplicates()\ndf[\"region\"] = df[\"region\"].str.strip().str.title()\ndf[\"units\"] = df[\"units\"].fillna(0).astype(int)\ndf[\"date\"] = pd.to_datetime(df[\"date\"])\ndf[\"region\"].value_counts()"],
  ["markdown", "## 4. Calculate and group"],
  ["code", "df[\"revenue\"] = df[\"units\"] * df[\"unit_price\"]\nround(df[\"revenue\"].sum(), 2)"],
  ["code", "df.groupby(\"region\")[\"revenue\"].agg([\"sum\", \"mean\", \"count\"]).round(2).sort_values(\"sum\", ascending=False)"],
  ["markdown", "## 5. Combine"],
  ["code", "regions = pd.read_csv(\"regions.csv\")\nq1 = df[df[\"date\"] < \"2026-04-01\"].groupby(\"region\", as_index=False)[\"revenue\"].sum()\nq1 = q1.merge(regions, on=\"region\", how=\"left\")\nq1[\"vs_target\"] = q1[\"revenue\"] - q1[\"quarter_target\"]\nq1"],
  ["markdown", "## 6. Time and reshaping"],
  ["code", "monthly = df.groupby(df[\"date\"].dt.to_period(\"M\"))[\"revenue\"].sum()\nmonthly"],
  ["code", "df.pivot_table(index=\"region\", columns=df[\"date\"].dt.month, values=\"revenue\", aggfunc=\"sum\").round(2)"],
  ["markdown", "## 7. Chart and export"],
  ["code", "monthly.plot(kind=\"bar\", title=\"Revenue by month\")"],
  ["code", "df.to_csv(\"orders-clean.csv\", index=False)\nq1.to_excel(\"q1-vs-target.xlsx\", index=False)"],
];
const STARTER = [
  ["markdown", "# Orders analysis\nStarter notebook for *Data Analysis with Python & pandas*. Each heading matches a lesson; fill in the code cells as you go."],
  ["code", "import pandas as pd\n\ndf = pd.read_csv(\"orders.csv\")"],
  ...["1. Explore", "2. Select and filter", "3. Clean", "4. Calculate and group", "5. Combine", "6. Time and reshaping", "7. Chart and export"].flatMap((h) => [["markdown", "## " + h], ["code", ""]]),
];

export default {
  id: "python-pandas",
  slug: "python-pandas",
  title: "Data Analysis with Python & pandas",
  software: "Python, pandas and Jupyter",
  apps: ["Jupyter", "VS Code"],
  intro:
    "Analyze real-looking data with pandas in a Jupyter notebook: load and explore a CSV, select and filter rows, clean messy text, duplicates and missing values, calculate and group, merge tables, work with dates and pivot tables, and finish with charts and exported files. Every answer in the guide comes from the practice data.",
  platformNote: "Shortcuts are shown for Jupyter notebooks in VS Code or JupyterLab on Windows and Linux. On a Mac, use Cmd in place of Ctrl. Single-letter shortcuts work in command mode (press Esc first to leave the cell you're typing in).",
  store: {
    category: "code",
    level: "Intermediate",
    software: "Python 3 with pandas and Jupyter (all free), in VS Code or JupyterLab",
    softwareShort: "Python + pandas",
    softwareHtml: `<p>This guide uses <strong>Python 3</strong> with the <strong>pandas</strong> library, in a <strong>Jupyter</strong> notebook run either in Visual Studio Code (with its Python and Jupyter extensions) or in JupyterLab. All are free and obtained separately: Python from python.org, then <code>pip install pandas matplotlib openpyxl notebook</code>. None of the software is included with the guide. The steps are written for pandas 2 and later.</p>`,
    forWho: [
      "You know basic Python (variables, lists, loops) and want to analyze data with it.",
      "You've outgrown spreadsheets: files are too big, steps too many, or you want analysis you can rerun.",
      "You want a clear path through the parts of pandas you'll use every day.",
    ],
    notFor: [
      "You've never written Python. Start with Python for Everyday Automation.",
      "You want statistics or machine learning in depth. See Machine Learning Foundations with scikit-learn.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "orders.csv", title: "Orders", desc: "122 rows of orders from January to June 2026, with messy region names, missing units and two duplicate rows to clean." },
    { name: "regions.csv", title: "Regions", desc: "Each region's manager and quarterly revenue target, for merging." },
    { name: "orders-starter.ipynb", title: "Starter notebook", desc: "A notebook with one heading per lesson and empty code cells." },
    { name: "orders-completed.ipynb", title: "Completed notebook", desc: "The finished analysis from every lesson, to compare with your own." },
  ],
  shortcuts: [
    { keys: "Shift+Enter", action: "Run the cell and move to the next one", app: "Jupyter" },
    { keys: "Ctrl+Enter", action: "Run the cell and stay on it", app: "Jupyter" },
    { keys: "Alt+Enter", action: "Run the cell and insert a new one below", app: "Jupyter" },
    { keys: "A", action: "Insert a cell above (command mode)", app: "Jupyter" },
    { keys: "B", action: "Insert a cell below (command mode)", app: "Jupyter" },
    { keys: "M", action: "Change the cell to Markdown (command mode)", app: "Jupyter" },
    { keys: "Y", action: "Change the cell to code (command mode)", app: "Jupyter" },
    { keys: "Ctrl+S", action: "Save the notebook", app: "Jupyter" },
    { keys: "Ctrl+/", action: "Comment or uncomment lines", app: "Jupyter" },
    { keys: "Tab", action: "Complete a name (in a code cell)", app: "Jupyter" },
    { keys: "Esc", action: "Leave the cell (command mode)", app: "Jupyter", practice: false, note: "The trainer uses Esc to leave the practice area." },
  ],
  lessons: [
    {
      id: "load",
      title: "Notebooks and your first DataFrame",
      summary: "Set up pandas and a Jupyter notebook, load a CSV into a DataFrame, and get a first look at its size, columns and values.",
      diagram: { type: "table", head: ["order_id", "date", "region", "product", "units"], rows: [["3001", "2026-01-05", "West", "Pen set", "5"], ["3002", "2026-01-24", "South", "Pen set", "5"], ["3003", "2026-01-01", "South", "Desk lamp", "4"]], highlight: { cols: [2] }, caption: "df.head(3): a DataFrame is a table with labeled columns" },
      steps: [
        {
          title: "Install and open a notebook",
          body: `<p>In a terminal, run <code>pip install pandas matplotlib openpyxl notebook</code> (<code>pip3</code> on some Macs). In VS Code, install the Python and Jupyter extensions, open your project folder with the practice files, and open <strong>orders-starter.ipynb</strong>. When asked, pick your Python installation as the <em>kernel</em>.</p>`,
        },
        {
          title: "Cells",
          body: `<p>A notebook is a list of cells. Code cells run Python and show the result underneath; Markdown cells hold notes. Click into the first code cell and press ${k("Shift", "Enter")} to run it and move on. The variables you create stay in memory, so later cells can use them.</p>`,
        },
        {
          title: "Load the CSV",
          body: `<p><code>import pandas as pd</code> then <code>df = pd.read_csv("orders.csv")</code> loads the file into a <strong>DataFrame</strong>, pandas' table. Each column is a <em>Series</em>. <code>df.shape</code> gives (rows, columns): <strong>(122, 6)</strong>.</p>`,
        },
        {
          title: "First look",
          body: `<p><code>df.head()</code> shows the first five rows; <code>df.info()</code> lists each column's type and how many values aren't missing (units has 119 of 122, so 3 are missing); <code>df.describe()</code> gives statistics for the number columns: the average order is 6.4 units, the largest 12.</p>`,
        },
      ],
      quiz: [
        { q: "What does df.shape return for the practice orders?", options: ["(6, 122)", "(122, 6)", "122", "6"], answer: 1, explain: "Rows first, then columns." },
        { q: "Which method shows each column's type and count of non-missing values?", options: ["df.head()", "df.info()", "df.describe()", "df.shape"], answer: 1, explain: "info() summarizes columns, types and non-null counts." },
      ],
      exercise: {
        title: "Load and inspect the orders",
        task: `<p>In the starter notebook, load <strong>orders.csv</strong> and use <code>shape</code>, <code>info()</code> and <code>describe()</code> to answer: how many rows are there, which column has missing values, and what's the median number of units?</p>`,
        files: ["orders.csv", "orders-starter.ipynb"],
        solution: [
          "Run <code>import pandas as pd</code> and <code>df = pd.read_csv(\"orders.csv\")</code>.",
          "<code>df.shape</code> → <strong>(122, 6)</strong>: 122 rows.",
          "<code>df.info()</code> shows units with 119 non-null values: <strong>3 missing</strong>. It's stored as float64 because missing values force a decimal type.",
          "<code>df.describe()</code> shows the 50% (median) of units as <strong>7.0</strong>.",
        ],
      },
    },
    {
      id: "select",
      title: "Selecting, filtering and sorting",
      summary: "Pick columns, keep the rows that match conditions, combine conditions, and sort to find the largest values.",
      diagram: { type: "code", lang: "pandas", lines: ["df[\"units\"]                    # one column", "df[[\"region\", \"units\"]]          # several", "df[df[\"units\"] >= 10]           # rows that match", "df.sort_values(\"units\", ascending=False)"], highlight: [2], notes: [] },
      steps: [
        {
          title: "Columns",
          body: `<p><code>df["units"]</code> returns one column as a Series; <code>df[["region", "units"]]</code> (note the double brackets) returns a smaller DataFrame. <code>df.columns</code> lists the column names.</p>`,
        },
        {
          title: "Filter with conditions",
          body: `<p><code>df["units"] &gt;= 10</code> gives True or False for every row. Put it inside brackets to keep only the True rows: <code>df[df["units"] &gt;= 10]</code>. <code>len()</code> of the result counts them: 23 rows in the raw data.</p>`,
        },
        {
          title: "Combine conditions",
          body: `<p>Use <code>&amp;</code> for “and” and <code>|</code> for “or”, with each condition in brackets: <code>df[(df["product"] == "Desk lamp") &amp; (df["units"] &gt;= 5)]</code>. <code>df[df["region"].isin(["North", "South"])]</code> matches any of a list.</p>`,
        },
        {
          title: "Sort and pick rows",
          body: `<p><code>df.sort_values("units", ascending=False)</code> puts the largest first; <code>df.nlargest(3, "units")</code> is a shortcut for the top three. <code>df.loc[rows, columns]</code> selects by label and condition together, for example <code>df.loc[df["units"] &gt;= 10, ["order_id", "product"]]</code>.</p>`,
        },
      ],
      quiz: [
        { q: "Why does df[[\"region\", \"units\"]] use double brackets?", options: ["It's a typo-proof style", "The inner brackets make a list of column names", "To select rows", "To sort"], answer: 1, explain: "The outer brackets select; the inner ones are a Python list of names." },
        { q: "Which operator means 'and' between pandas conditions?", options: ["and", "&&", "&", "+"], answer: 2, explain: "pandas uses & (with brackets around each condition); Python's and doesn't work element by element." },
      ],
      exercise: {
        title: "Find the big desk lamp orders",
        task: `<p>Using the raw data, count the orders of 10 or more units, then list the Desk lamp orders with at least 5 units, largest first. How many desk lamp orders is that?</p>`,
        files: ["orders.csv"],
        solution: [
          "<code>big = df[df[\"units\"] &gt;= 10]</code> and <code>len(big)</code> → <strong>23</strong> (one of them is a duplicate row you'll remove in Lesson 3).",
          "<code>lamps = df[(df[\"product\"] == \"Desk lamp\") &amp; (df[\"units\"] &gt;= 5)]</code>",
          "<code>lamps.sort_values(\"units\", ascending=False)</code> shows them largest first.",
          "<code>len(lamps)</code> → <strong>22</strong> desk lamp orders.",
        ],
      },
    },
    {
      id: "clean",
      title: "Cleaning messy data",
      summary: "Remove duplicate rows, tidy inconsistent text, deal with missing values, and set the right data types.",
      diagram: { type: "table", head: ["region (raw)", "count", "after strip + title"], rows: [["east ", "5", "East"], ["SOUTH", "4", "South"], ["north", "2", "North"], [" North", "1", "North"]], highlight: { cols: [2] }, caption: "8 spellings become 4 regions" },
      steps: [
        {
          title: "Duplicates",
          body: `<p><code>df.duplicated().sum()</code> counts rows that exactly repeat an earlier row: <strong>2</strong>. <code>df = df.drop_duplicates()</code> removes them, leaving 120 rows. Assign the result back to <code>df</code>: most pandas methods return a new DataFrame rather than changing the old one.</p>`,
        },
        {
          title: "Inconsistent text",
          body: `<p><code>df["region"].value_counts()</code> reveals 8 spellings: “east ”, “SOUTH”, “ North” and so on. The <code>.str</code> methods work on a whole text column: <code>df["region"] = df["region"].str.strip().str.title()</code> removes the stray spaces and fixes the capitals, leaving exactly four regions.</p>`,
        },
        {
          title: "Missing values",
          body: `<p><code>df.isna().sum()</code> counts missing values per column: 3 in units. Choose deliberately: <code>dropna(subset=["units"])</code> removes those rows; <code>fillna(0)</code> treats them as zero units. Here, the orders exist but the quantity wasn't recorded, so this guide fills them with 0 to keep every order in the counts.</p>`,
        },
        {
          title: "Types",
          body: `<p>After filling, <code>df["units"] = df["units"].fillna(0).astype(int)</code> makes units whole numbers. <code>df["date"] = pd.to_datetime(df["date"])</code> turns date text into real dates, which unlocks the date tools in Lesson 6. Check with <code>df.dtypes</code>.</p>`,
        },
      ],
      quiz: [
        { q: "Why write df = df.drop_duplicates() rather than just df.drop_duplicates()?", options: ["It runs faster", "The method returns a new DataFrame; assigning keeps the result", "It's required syntax", "To create a copy for safety"], answer: 1, explain: "Without assigning, the cleaned result is shown and then discarded." },
        { q: "After strip() and title(), how many orders does North have?", options: ["30", "31", "33", "28"], answer: 1, explain: "30 “North” + 2 “north” + 1 “ North” makes 33, and both duplicate rows were North orders, so 31 remain." },
      ],
      exercise: {
        title: "Clean the orders",
        task: `<p>Remove duplicates, tidy the region names, fill missing units with 0 as whole numbers, and convert dates. Then show the region counts. How many rows are left, and how many orders does each region have?</p>`,
        files: ["orders.csv", "orders-completed.ipynb"],
        solution: [
          "<code>df = df.drop_duplicates()</code> → 120 rows.",
          "<code>df[\"region\"] = df[\"region\"].str.strip().str.title()</code>",
          "<code>df[\"units\"] = df[\"units\"].fillna(0).astype(int)</code> and <code>df[\"date\"] = pd.to_datetime(df[\"date\"])</code>.",
          "<code>df[\"region\"].value_counts()</code> → <strong>South 36, North 31, West 30, East 23</strong> (120 in total).",
        ],
      },
    },
    {
      id: "group",
      title: "New columns and grouping",
      summary: "Calculate a revenue column, then summarize it by region and product with groupby and agg.",
      diagram: { type: "bars", values: [3124, 2862, 2126, 2030], labels: ["West", "South", "East", "North"], highlight: 0, showValues: true, title: "Revenue by region after cleaning" },
      steps: [
        {
          title: "Calculated columns",
          body: `<p>Arithmetic on columns works row by row: <code>df["revenue"] = df["units"] * df["unit_price"]</code>. <code>df["revenue"].sum()</code> totals it: <strong>10,142.25</strong>. <code>.mean()</code>, <code>.max()</code> and <code>.count()</code> work the same way.</p>`,
        },
        {
          title: "groupby",
          body: `<p><code>df.groupby("region")["revenue"].sum()</code> splits the rows by region, adds up revenue in each group, and returns one row per region. Chain <code>.sort_values(ascending=False)</code> to rank them: West leads with 3,124.25.</p>`,
        },
        {
          title: "Several summaries at once",
          body: `<p><code>.agg(["sum", "mean", "count"])</code> calculates several statistics per group. Named aggregation gives clean column names: <code>df.groupby("product").agg(units=("units", "sum"), revenue=("revenue", "sum"))</code>.</p>`,
        },
        {
          title: "Counting categories",
          body: `<p><code>df["product"].value_counts()</code> counts rows per product; add <code>normalize=True</code> for shares. To count by two columns, group by both: <code>df.groupby(["region", "product"]).size()</code>.</p>`,
        },
      ],
      quiz: [
        { q: "What is total revenue after cleaning?", options: ["10,142.25", "9,876.50", "10,312.00", "743"], answer: 0, explain: "units × unit_price summed over the 120 cleaned rows." },
        { q: "Which product sold the most units?", options: ["Pen set", "Notebook", "Desk lamp", "Backpack"], answer: 2, explain: "Desk lamps: 195 units, ahead of pen sets (166)." },
      ],
      exercise: {
        title: "Revenue by region and product",
        task: `<p>Add the revenue column, then make two summaries: revenue by region (sum, mean and count, highest sum first) and units and revenue by product. Which product brings in the most revenue?</p>`,
        files: ["orders.csv"],
        solution: [
          "<code>df[\"revenue\"] = df[\"units\"] * df[\"unit_price\"]</code>",
          "<code>df.groupby(\"region\")[\"revenue\"].agg([\"sum\", \"mean\", \"count\"]).round(2).sort_values(\"sum\", ascending=False)</code> → West 3,124.25, South 2,862.25, East 2,126.00, North 2,029.75.",
          "<code>df.groupby(\"product\").agg(units=(\"units\", \"sum\"), revenue=(\"revenue\", \"sum\")).sort_values(\"revenue\", ascending=False)</code>",
          "<strong>Desk lamp</strong> leads with 4,680.00 from 195 units; backpacks are second (2,886.00) from only 74 units.",
        ],
      },
    },
    {
      id: "merge",
      title: "Combining tables",
      summary: "Merge in information from a second table on a shared column, choose the join type, and stack tables with concat.",
      diagram: { type: "table", head: ["region", "Q1 revenue", "target", "vs target"], rows: [["North", "1,031.50", "1,000", "+31.50"], ["South", "1,412.50", "1,300", "+112.50"], ["East", "615.75", "800", "−184.25"], ["West", "921.25", "900", "+21.25"]], highlight: { rows: [2] }, caption: "Q1 revenue merged with regions.csv" },
      steps: [
        {
          title: "merge",
          body: `<p><code>regions = pd.read_csv("regions.csv")</code> holds each region's manager and quarterly target. <code>df.merge(regions, on="region", how="left")</code> adds those columns to every order whose region matches, like a lookup on every row at once.</p>`,
        },
        {
          title: "Join types",
          body: `<p><code>how="left"</code> keeps every row of the left table; <code>"inner"</code> keeps only matches; <code>"outer"</code> keeps everything from both. After a left merge, missing values in the new columns mean a row found no match, which is worth checking with <code>isna()</code>.</p>`,
        },
        {
          title: "Summarize, then merge",
          body: `<p>Targets are per quarter, so summarize first: filter to Q1 (<code>df[df["date"] &lt; "2026-04-01"]</code>), group by region with <code>as_index=False</code> so region stays a column, then merge with regions and subtract: <code>q1["vs_target"] = q1["revenue"] - q1["quarter_target"]</code>.</p>`,
        },
        {
          title: "concat",
          body: `<p><code>pd.concat([jan, feb])</code> stacks DataFrames with the same columns on top of each other, for example monthly exports. Add <code>ignore_index=True</code> to number the rows afresh.</p>`,
        },
      ],
      quiz: [
        { q: "Which how= keeps every order even if its region isn't in regions.csv?", options: ["inner", "left", "right", "cross"], answer: 1, explain: "A left merge keeps all rows of the left DataFrame." },
        { q: "Why use as_index=False in the Q1 groupby?", options: ["It sorts the result", "It keeps region as a normal column, ready to merge on", "It removes missing values", "It's faster"], answer: 1, explain: "Without it, region becomes the index; merging on a column is simpler." },
      ],
      exercise: {
        title: "Q1 against target",
        task: `<p>Total Q1 (January to March) revenue by region, merge it with <strong>regions.csv</strong>, and add a vs_target column. Which regions beat their target, and which missed it?</p>`,
        files: ["orders.csv", "regions.csv"],
        solution: [
          "<code>q1 = df[df[\"date\"] &lt; \"2026-04-01\"].groupby(\"region\", as_index=False)[\"revenue\"].sum()</code>",
          "<code>q1 = q1.merge(regions, on=\"region\", how=\"left\")</code>",
          "<code>q1[\"vs_target\"] = q1[\"revenue\"] - q1[\"quarter_target\"]</code>",
          "North +31.50, South +112.50 and West +21.25 beat their targets; <strong>East missed by 184.25</strong> (615.75 against 800).",
        ],
      },
    },
    {
      id: "time",
      title: "Dates and pivot tables",
      summary: "Pull parts out of dates, total by month, and reshape data with pivot_table and melt.",
      diagram: { type: "bars", values: [1144, 1115, 1722, 2233, 2717, 1212], labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], highlight: 4, title: "Revenue by month: May was the best" },
      steps: [
        {
          title: "Date parts",
          body: `<p>Once a column holds real dates, <code>.dt</code> gives its parts: <code>df["date"].dt.month</code>, <code>.dt.day_name()</code>, <code>.dt.year</code>. <code>df["date"].dt.to_period("M")</code> turns each date into its month, such as 2026-03, which is perfect for grouping.</p>`,
        },
        {
          title: "Totals by month",
          body: `<p><code>monthly = df.groupby(df["date"].dt.to_period("M"))["revenue"].sum()</code> gives six rows, January to June. May is the best month at 2,717.25; February the weakest at 1,114.75.</p>`,
        },
        {
          title: "pivot_table",
          body: `<p>A pivot table puts one category down the side and another across the top: <code>df.pivot_table(index="region", columns=df["date"].dt.month, values="revenue", aggfunc="sum")</code>. Add <code>margins=True</code> for totals. The biggest single cell is West in April, 1,041.50.</p>`,
        },
        {
          title: "melt: wide back to long",
          body: `<p><code>pivot.reset_index().melt(id_vars="region", var_name="month", value_name="revenue")</code> turns a wide table back into one row per region per month, the shape that charting libraries and databases prefer.</p>`,
        },
      ],
      quiz: [
        { q: "What does df[\"date\"].dt.to_period(\"M\") return for 2026-03-14?", options: ["14", "3", "2026-03", "March"], answer: 2, explain: "A monthly period: year and month." },
        { q: "Which month had the highest revenue?", options: ["March", "April", "May", "June"], answer: 2, explain: "May: 2,717.25." },
      ],
      exercise: {
        title: "Monthly revenue and a region-by-month pivot",
        task: `<p>Total revenue by month, then build a pivot table of revenue by region and month with totals. What's the best month, and which region and month combination is largest?</p>`,
        files: ["orders.csv"],
        solution: [
          "<code>monthly = df.groupby(df[\"date\"].dt.to_period(\"M\"))[\"revenue\"].sum()</code> → Jan 1,144.00, Feb 1,114.75, Mar 1,722.25, Apr 2,232.50, <strong>May 2,717.25</strong>, Jun 1,211.50.",
          "<code>pt = df.pivot_table(index=\"region\", columns=df[\"date\"].dt.month, values=\"revenue\", aggfunc=\"sum\", margins=True).round(2)</code>",
          "The largest cell is <strong>West in month 4 (April): 1,041.50</strong>, just ahead of South in May (1,025.00).",
          "The margins row and column (“All”) total to 10,142.25.",
        ],
      },
    },
    {
      id: "share",
      title: "Charts and sharing results",
      summary: "Draw quick charts from pandas, make them readable, and export cleaned data and summaries to CSV and Excel.",
      diagram: { type: "flow", nodes: ["Clean DataFrame", "Summary tables", "Charts", "CSV / Excel files"], highlight: 3, title: "From analysis to something others can use" },
      steps: [
        {
          title: "Charts in one line",
          body: `<p>pandas draws charts with matplotlib (installed in Lesson 1). <code>monthly.plot(kind="bar", title="Revenue by month")</code> draws a bar chart under the cell; <code>kind="line"</code> a line chart. On a DataFrame, each column becomes a series.</p>`,
        },
        {
          title: "Make it readable",
          body: `<p>The plot call returns an axes object: <code>ax = monthly.plot(kind="bar")</code>, then <code>ax.set_ylabel("Revenue")</code> and <code>ax.set_xlabel("")</code>. Sort bars with <code>sort_values()</code> before plotting when order matters, and keep one message per chart.</p>`,
        },
        {
          title: "Export",
          body: `<p><code>df.to_csv("orders-clean.csv", index=False)</code> saves the cleaned data; <code>index=False</code> leaves out pandas' row numbers. <code>q1.to_excel("q1-vs-target.xlsx", index=False)</code> writes an Excel file (that's what openpyxl is for). To save a chart: <code>ax.figure.savefig("monthly.png", dpi=150, bbox_inches="tight")</code>.</p>`,
        },
        {
          title: "A notebook others can rerun",
          body: `<p>Before sharing, choose <em>Restart</em> and then <em>Run All</em> from the notebook's toolbar: if every cell runs top to bottom without errors, someone else can reproduce your results. Delete scratch cells, and use Markdown cells to say what each section shows.</p>`,
        },
      ],
      quiz: [
        { q: "What does index=False do in to_csv?", options: ["Skips the header", "Leaves out the row index column", "Sorts the rows", "Compresses the file"], answer: 1, explain: "Without it, pandas writes its row numbers as an unnamed first column." },
        { q: "Why Restart and Run All before sharing a notebook?", options: ["It makes the file smaller", "To check every cell runs in order from a fresh start", "To clear the charts", "It's needed to save"], answer: 1, explain: "Cells run out of order can hide errors that appear on a fresh run." },
      ],
      exercise: {
        title: "Chart and export",
        task: `<p>Draw a bar chart of monthly revenue with a y-axis label, save it as monthly.png, export the cleaned orders to orders-clean.csv and the Q1 table to q1-vs-target.xlsx. Then restart and run the whole notebook.</p>`,
        files: ["orders-completed.ipynb"],
        solution: [
          "<code>ax = monthly.plot(kind=\"bar\", title=\"Revenue by month\")</code> then <code>ax.set_ylabel(\"Revenue\")</code>.",
          "<code>ax.figure.savefig(\"monthly.png\", dpi=150, bbox_inches=\"tight\")</code>",
          "<code>df.to_csv(\"orders-clean.csv\", index=False)</code>: 120 rows plus a header, with the new revenue column.",
          "<code>q1.to_excel(\"q1-vs-target.xlsx\", index=False)</code>: four rows.",
          "<em>Restart</em>, then <em>Run All</em>: every cell should run without errors.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-report-fn",
      title: "Bonus project: a reusable monthly report",
      summary: "Turn the notebook into a function that loads, cleans and summarizes any orders file, and writes a multi-sheet Excel report.",
      diagram: { type: "tree", root: "report.xlsx", items: [["Sheet: Summary (one row per region)", 1, true], ["Sheet: By product", 1], ["Sheet: By month", 1], ["made by build_report(\"orders.csv\")", 2]], caption: "One function call, one finished workbook" },
      steps: [
        {
          title: "A cleaning function",
          body: `<p>Move the Lesson 3 steps into <code>def load_orders(path):</code> that reads the CSV, cleans it, adds revenue and <code>return</code>s the DataFrame. Now any export with the same columns is one line away from clean.</p>`,
        },
        {
          title: "Several sheets in one file",
          body: `<p><code>with pd.ExcelWriter("report.xlsx") as writer:</code> then <code>summary.to_excel(writer, sheet_name="Summary")</code> for each table. Everything inside the <code>with</code> block goes into one workbook.</p>`,
        },
        {
          title: "Check it against the notebook",
          body: `<p>Call <code>build_report("orders.csv", "report.xlsx")</code> and compare: the Summary sheet's total revenue must be 10,142.25 and West must be highest at 3,124.25. Matching numbers mean the function reproduces your analysis exactly.</p>`,
        },
      ],
      quiz: [
        { q: "What does pd.ExcelWriter let you do?", options: ["Read Excel files", "Write several DataFrames to separate sheets of one workbook", "Format charts", "Convert CSV to JSON"], answer: 1, explain: "Each to_excel call inside the with block adds a sheet." },
        { q: "Why compare the function's totals with the notebook's?", options: ["Excel rounds differently", "To confirm the function reproduces the analysis exactly", "To speed it up", "It's required by pandas"], answer: 1, explain: "Matching totals show the refactor didn't change the results." },
      ],
      exercise: {
        title: "Write build_report",
        task: `<p>Write <code>load_orders(path)</code> and <code>build_report(path, out)</code> that writes Summary (by region), By product and By month sheets. Run it on orders.csv and check the totals.</p>`,
        files: ["orders.csv", "orders-completed.ipynb"],
        solution: [
          "<code>load_orders</code>: read_csv, drop_duplicates, strip/title region, fillna(0).astype(int) units, to_datetime date, revenue column; return df.",
          "<code>build_report</code>: call load_orders, make the three groupby tables, write them with ExcelWriter.",
          "By month: <code>df.groupby(df[\"date\"].dt.to_period(\"M\").astype(str))[\"revenue\"].sum()</code> (converting periods to text keeps Excel happy).",
          "Open report.xlsx: Summary totals 10,142.25 with West highest (3,124.25); By month shows May highest (2,717.25).",
        ],
      },
    },
    quizbank: [
      { q: "What is a Series in pandas?", options: ["A whole table", "A single column (or row) of values with an index", "A chart", "A list of DataFrames"], answer: 1, explain: "Each DataFrame column is a Series." },
      { q: "Which method returns the first five rows?", options: ["df.top()", "df.head()", "df.first()", "df.show()"], answer: 1, explain: "head() shows the first rows; tail() the last." },
      { q: "Why is units stored as float64 in the raw data?", options: ["Some units are fractions", "Missing values (NaN) force a decimal type", "CSV files only store floats", "pandas always uses floats"], answer: 1, explain: "NaN is a float, so a column with missing values becomes float." },
      { q: "What does df[\"region\"].str.strip() do?", options: ["Removes the column", "Removes spaces at the start and end of each value", "Splits the text", "Changes case"], answer: 1, explain: "strip() removes leading and trailing whitespace." },
      { q: "How many orders of Backpacks are in North after cleaning?", options: ["2", "4", "6", "13"], answer: 1, explain: "Filtering cleaned data for North and Backpack gives 4 rows." },
      { q: "What's the average revenue per order after cleaning?", options: ["84.52", "13.15", "101.42", "6.19"], answer: 0, explain: "10,142.25 ÷ 120 orders ≈ 84.52." },
      { q: "Which merge keeps only rows that match in both DataFrames?", options: ["how=\"left\"", "how=\"inner\"", "how=\"outer\"", "how=\"right\""], answer: 1, explain: "Inner keeps matches only." },
      { q: "Which order has the highest revenue?", options: ["3014", "3055", "3085", "3001"], answer: 2, explain: "Order 3085: 390.00." },
    ],
  },
  async makeFiles() {
    return {
      "orders.csv": ordersCsv(),
      "regions.csv": REGIONS_CSV,
      "orders-starter.ipynb": notebook(STARTER),
      "orders-completed.ipynb": notebook(SOLUTION),
    };
  },
};
