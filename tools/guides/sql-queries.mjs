import { k } from "./_helpers.mjs";
import { sqlScript, BOOKS, CUSTOMERS } from "./_bookshop-data.mjs";

const csv = (head, rows) => [head, ...rows].map((r) => r.map((v) => (v === null ? "" : /[,"]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v)).join(",")).join("\r\n") + "\r\n";

export default {
  id: "sql-queries",
  slug: "sql-queries",
  title: "SQL Queries for Data Analysis",
  software: "DB Browser for SQLite",
  apps: ["DB Browser for SQLite"],
  intro:
    "Learn to ask questions of data with SQL, using a small bookshop database in the free DB Browser for SQLite: selecting and filtering rows, sorting, counting and grouping, joining tables, calculating revenue across four tables, and subqueries, views and safe changes.",
  platformNote: "Shortcuts are shown for Windows and Linux. On a Mac, use Cmd in place of Ctrl.",
  store: {
    category: "office",
    level: "Beginner",
    software: "DB Browser for SQLite (free, for Windows, Mac and Linux)",
    softwareShort: "DB Browser for SQLite",
    softwareHtml: `<p>This guide uses <strong>DB Browser for SQLite</strong>, a free, open-source program for Windows, Mac and Linux, obtained separately from its makers at sqlitebrowser.org. It is not included with the guide. The SQL itself is standard and works with small changes in other databases such as PostgreSQL, MySQL or SQL Server.</p>`,
    forWho: [
      "You work with data in spreadsheets and want to query it with SQL.",
      "You've been asked to pull numbers from a database and don't know where to start.",
      "You learn best by running a query and seeing the result straight away.",
    ],
    notFor: [
      "You want to design or administer production databases. The guide is about querying.",
      "You need a specific company system's dialect in depth, such as T-SQL procedures.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "bookshop.sql", title: "Bookshop database script", desc: "Creates the four tables (customers, books, orders, order_items) and fills them with sample data. Run it once in DB Browser for SQLite." },
    { name: "books.csv", title: "Books as CSV", desc: "The books table as a CSV file, for the import exercise." },
    { name: "customers.csv", title: "Customers as CSV", desc: "The customers table as a CSV file, including one customer with no city." },
  ],
  shortcuts: [
    { keys: "Ctrl+Enter", action: "Execute all SQL (or the selected part)", app: "DB Browser for SQLite" },
    { keys: "Shift+F5", action: "Execute the current line", app: "DB Browser for SQLite" },
    { keys: "Ctrl+S", action: "Write changes to the database file", app: "DB Browser for SQLite" },
    { keys: "Ctrl+O", action: "Open a database", app: "DB Browser for SQLite" },
    { keys: "Ctrl+F", action: "Find in the SQL editor", app: "DB Browser for SQLite" },
    { keys: "Ctrl+Z", action: "Undo typing in the editor", app: "DB Browser for SQLite" },
    { keys: "Ctrl+A", action: "Select all the SQL in the editor", app: "DB Browser for SQLite" },
    { keys: "Ctrl+C", action: "Copy the selected result cells", app: "DB Browser for SQLite" },
    { keys: "F5", action: "Execute all SQL", app: "DB Browser for SQLite", practice: false, note: "Your browser uses this key to reload the page." },
    { keys: "Ctrl+T", action: "Open a new SQL editor tab", app: "DB Browser for SQLite", practice: false, note: "Your browser uses this shortcut to open a new tab." },
    { keys: "Ctrl+N", action: "New database", app: "DB Browser for SQLite", practice: false, note: "Your browser uses this shortcut to open a new window." },
  ],
  lessons: [
    {
      id: "setup",
      title: "Your first database",
      summary: "Create a database file, run the practice script to build four tables, and look around the structure and data.",
      diagram: { type: "tree", root: "bookshop.db", items: [["customers (8 rows)", 1], ["books (8 rows)", 1, true], ["orders (12 rows)", 1], ["order_items (18 rows)", 1], ["one row per book in an order", 2]], caption: "Four related tables" },
      steps: [
        {
          title: "Tables, rows and columns",
          body: `<p>A database stores data in <strong>tables</strong>, like spreadsheet sheets with strict rules: every row has the same columns, each column has a type, and an <code>id</code> column identifies each row. Tables refer to each other by id: an order stores a <code>customer_id</code> instead of copying the customer's name.</p>`,
        },
        {
          title: "Create the database",
          body: `<p>Open DB Browser for SQLite and choose <em>New Database</em>. Save the file as <em>bookshop.db</em>. When a <em>Edit table definition</em> window opens, select <em>Cancel</em>: the practice script creates the tables for you.</p>`,
        },
        {
          title: "Run the script",
          body: `<p>Go to the <em>Execute SQL</em> tab, open <strong>bookshop.sql</strong> with the <em>Open SQL file</em> button in the editor toolbar (or paste its contents), and press ${k("Ctrl", "Enter")} to run it all. Then press ${k("Ctrl", "S")} (<em>Write Changes</em>): DB Browser holds changes until you write them to the file.</p>`,
        },
        {
          title: "Look around",
          body: `<p>The <em>Database Structure</em> tab lists the four tables and their columns. <em>Browse Data</em> shows a table's rows; pick one in the <em>Table</em> dropdown. Notice that <code>orders</code> only holds ids and dates; the details live in other tables.</p>`,
        },
      ],
      quiz: [
        { q: "Why does an order store customer_id rather than the customer's name?", options: ["Names are too long", "Each fact is stored once and tables are linked by id", "SQLite can't store text", "It sorts faster"], answer: 1, explain: "Storing the id avoids repeating customer details in every order and keeps them consistent." },
        { q: "What do you need to do after running SQL that changes the database?", options: ["Nothing", "Write Changes (Ctrl+S)", "Restart the program", "Export to CSV"], answer: 1, explain: "DB Browser keeps changes pending until you write them to the file." },
      ],
      exercise: {
        title: "Build the bookshop database",
        task: `<p>Create <em>bookshop.db</em>, run <strong>bookshop.sql</strong>, write the changes, then run <code>SELECT COUNT(*) FROM books;</code> in a new line of the editor. How many books are there?</p>`,
        files: ["bookshop.sql"],
        solution: [
          "<em>New Database</em>, save as bookshop.db, <em>Cancel</em> the table window.",
          "<em>Execute SQL</em> tab › <em>Open SQL file</em> › bookshop.sql, then Ctrl+Enter. The message area reports the statements ran without errors.",
          "Ctrl+S to write changes.",
          `Type <code>SELECT COUNT(*) FROM books;</code> on a new line, put the cursor in it and press ${k("Shift", "F5")}: the result is <strong>8</strong>.`,
        ],
      },
    },
    {
      id: "select",
      title: "SELECT, WHERE and ORDER BY",
      summary: "Choose columns, filter rows with conditions, match patterns and missing values, and sort and limit the results.",
      diagram: { type: "table", head: ["title", "price"], rows: [["Rivers of Salt", "14.5"], ["The Glass Archive", "13.75"], ["The Quiet Orchard", "12.99"], ["Night Trains", "11.25"]], highlight: { rows: [0] }, caption: "SELECT title, price FROM books WHERE genre = 'Fiction' ORDER BY price DESC" },
      steps: [
        {
          title: "SELECT and FROM",
          body: `<p><code>SELECT title, author FROM books;</code> returns two columns from every row. <code>SELECT *</code> returns all columns, handy for a first look. SQL keywords aren't case-sensitive, but writing them in capitals makes queries easier to read. End each statement with a semicolon.</p>`,
        },
        {
          title: "WHERE filters rows",
          body: `<p><code>WHERE</code> keeps only rows that meet a condition: <code>WHERE genre = 'Fiction'</code>, <code>WHERE price &gt; 15</code>. Text goes in single quotes. Combine conditions with <code>AND</code> and <code>OR</code>, using brackets when you mix them: <code>WHERE genre = 'Cooking' OR (genre = 'Fiction' AND price &lt; 12)</code>.</p>`,
        },
        {
          title: "Patterns and missing values",
          body: `<p><code>LIKE</code> matches patterns, with <code>%</code> standing for any characters: <code>WHERE title LIKE '%the%'</code> (in SQLite, LIKE ignores case for plain letters). A missing value is <code>NULL</code>, and it can't be compared with <code>=</code>: use <code>WHERE city IS NULL</code> or <code>IS NOT NULL</code>.</p>`,
        },
        {
          title: "ORDER BY and LIMIT",
          body: `<p><code>ORDER BY price DESC</code> sorts from highest to lowest (<code>ASC</code>, the default, goes lowest first). <code>LIMIT 3</code> keeps only the first three rows, so <code>ORDER BY price DESC LIMIT 3</code> gives the three most expensive books.</p>`,
        },
      ],
      quiz: [
        { q: "Which condition finds customers with no city recorded?", options: ["city = NULL", "city IS NULL", "city = ''", "city LIKE NULL"], answer: 1, explain: "NULL means unknown; it's tested with IS NULL, never with =." },
        { q: "What does ORDER BY price DESC LIMIT 1 return?", options: ["The cheapest book", "The most expensive book", "All books", "The first book added"], answer: 1, explain: "Descending order puts the highest price first, and LIMIT 1 keeps only that row." },
      ],
      exercise: {
        title: "Fiction by price",
        task: `<p>List the title and price of every Fiction book, most expensive first. Then find the books that cost more than 15.00, and the customer with no city.</p>`,
        files: ["bookshop.sql"],
        solution: [
          "<code>SELECT title, price FROM books WHERE genre = 'Fiction' ORDER BY price DESC;</code>",
          "Four rows: Rivers of Salt 14.50, The Glass Archive 13.75, The Quiet Orchard 12.99, Night Trains 11.25.",
          "<code>SELECT title, price FROM books WHERE price &gt; 15 ORDER BY price;</code> gives Field Notes on Birds, A Year of Bread and Small Engines.",
          "<code>SELECT name FROM customers WHERE city IS NULL;</code> gives <strong>Hana Sato</strong>.",
        ],
      },
    },
    {
      id: "group",
      title: "Counting and grouping",
      summary: "Summarize data with COUNT, SUM, AVG, MIN and MAX, group rows by a column, and filter groups with HAVING.",
      diagram: { type: "table", head: ["genre", "books", "avg price"], rows: [["Fiction", "4", "13.12"], ["Non-fiction", "2", "19.2"], ["Cooking", "2", "16.88"]], highlight: { cols: [1] }, caption: "GROUP BY genre: one row per genre" },
      steps: [
        {
          title: "Aggregate functions",
          body: `<p><code>COUNT(*)</code> counts rows; <code>SUM()</code>, <code>AVG()</code>, <code>MIN()</code> and <code>MAX()</code> work on a column. <code>SELECT COUNT(*), AVG(price) FROM books;</code> returns one row: 8 books, with an average price of 15.58. <code>ROUND(AVG(price), 2)</code> tidies the decimals.</p>`,
        },
        {
          title: "GROUP BY",
          body: `<p><code>GROUP BY genre</code> splits the rows into one group per genre and runs the aggregates for each: <code>SELECT genre, COUNT(*) AS books, ROUND(AVG(price), 2) AS avg_price FROM books GROUP BY genre;</code>. <code>AS</code> names a result column. Every column in the SELECT should either be grouped or aggregated.</p>`,
        },
        {
          title: "HAVING filters groups",
          body: `<p><code>WHERE</code> filters rows <em>before</em> grouping; <code>HAVING</code> filters the groups <em>after</em>. To list cities with at least two customers: <code>SELECT city, COUNT(*) FROM customers GROUP BY city HAVING COUNT(*) &gt;= 2;</code>.</p>`,
        },
        {
          title: "COUNT(*) and COUNT(column)",
          body: `<p><code>COUNT(*)</code> counts every row; <code>COUNT(city)</code> counts only rows where city isn't NULL, so for customers it returns 7, not 8. <code>COUNT(DISTINCT customer_id)</code> counts different values: 7 different customers have placed orders.</p>`,
        },
      ],
      quiz: [
        { q: "Which clause keeps only genres with more than two books?", options: ["WHERE COUNT(*) > 2", "HAVING COUNT(*) > 2", "LIMIT 2", "ORDER BY COUNT(*)"], answer: 1, explain: "Conditions on aggregates go in HAVING, which runs after grouping." },
        { q: "The customers table has 8 rows and one NULL city. What does COUNT(city) return?", options: ["8", "7", "1", "NULL"], answer: 1, explain: "COUNT(column) skips NULLs." },
      ],
      exercise: {
        title: "Books per genre",
        task: `<p>Write a query that shows each genre with its number of books and average price rounded to two decimals, largest genre first. Then list the authors with more than one book.</p>`,
        files: ["bookshop.sql"],
        solution: [
          "<code>SELECT genre, COUNT(*) AS books, ROUND(AVG(price), 2) AS avg_price FROM books GROUP BY genre ORDER BY books DESC;</code>",
          "Result: Fiction 4 books, 13.12; Non-fiction 2, 19.20 (shown as 19.2); Cooking 2, 16.88.",
          "<code>SELECT author, COUNT(*) AS books FROM books GROUP BY author HAVING COUNT(*) &gt; 1;</code>",
          "Three authors: J. Amadi, L. Moreau and M. Ellery, with two books each.",
        ],
      },
    },
    {
      id: "joins",
      title: "Joining tables",
      summary: "Combine rows from two tables with INNER JOIN, keep unmatched rows with LEFT JOIN, and use table aliases.",
      diagram: { type: "compare", left: { title: "INNER JOIN", items: ["Only customers who", "have orders", "7 customers", "Hana Sato missing"] }, right: { title: "LEFT JOIN", items: ["Every customer", "orders or not", "8 customers", "Hana Sato: 0 orders"] }, accentRight: true, title: "INNER keeps matches; LEFT keeps every row on the left" },
      steps: [
        {
          title: "INNER JOIN",
          body: `<p>To see each order with its customer's name, join on the matching ids:</p><p><code>SELECT orders.id, customers.name FROM orders JOIN customers ON customers.id = orders.customer_id;</code></p><p><code>JOIN</code> means <code>INNER JOIN</code>: only rows with a match in both tables come back.</p>`,
        },
        {
          title: "Aliases",
          body: `<p>Short aliases keep joins readable: <code>FROM orders o JOIN customers c ON c.id = o.customer_id</code>. Then refer to <code>o.id</code> and <code>c.name</code>. When two tables have a column with the same name (both have <code>id</code>), the alias says which one you mean.</p>`,
        },
        {
          title: "LEFT JOIN",
          body: `<p><code>LEFT JOIN</code> keeps every row from the first (left) table, with NULLs where there's no match. Counting orders per customer with a LEFT JOIN includes customers who haven't ordered: <code>COUNT(o.id)</code> counts only real orders, so they show 0.</p>`,
        },
        {
          title: "Finding what's missing",
          body: `<p>A LEFT JOIN plus <code>WHERE o.id IS NULL</code> finds rows with no match, such as customers who have never ordered. It's one of the most useful patterns in data checking.</p>`,
        },
      ],
      quiz: [
        { q: "Which join keeps customers who have never placed an order?", options: ["INNER JOIN customers to orders", "LEFT JOIN from customers to orders", "JOIN orders to books", "None of them"], answer: 1, explain: "A LEFT JOIN from customers keeps every customer, matched or not." },
        { q: "Why use COUNT(o.id) instead of COUNT(*) after a LEFT JOIN?", options: ["It's faster", "COUNT(*) would count the NULL row for customers with no orders as 1", "COUNT(*) doesn't work with joins", "To count distinct customers"], answer: 1, explain: "COUNT(o.id) skips the NULLs, giving 0 for customers without orders." },
      ],
      exercise: {
        title: "Orders per customer",
        task: `<p>List every customer with the number of orders they've placed, including customers with none, most orders first. Who has ordered most, and who hasn't ordered at all?</p>`,
        files: ["bookshop.sql"],
        solution: [
          "<code>SELECT c.name, COUNT(o.id) AS orders FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id ORDER BY orders DESC, c.name;</code>",
          "<strong>Amara Okafor</strong> has 3 orders; Ben Ruiz, Chen Wei and Dana Fischer have 2; Eli Novak, Farah Haddad and Gus Larsen 1.",
          "<strong>Hana Sato</strong> has 0.",
          "To list only customers with no orders: add <code>WHERE o.id IS NULL</code> before GROUP BY (or use the query without grouping).",
        ],
      },
    },
    {
      id: "revenue",
      title: "Revenue across four tables",
      summary: "Calculate values in queries, join a chain of tables, and answer business questions: revenue by genre, by month and by book.",
      diagram: { type: "flow", nodes: ["order_items", "× books.price", "+ orders.date", "GROUP BY", "Revenue by month"], highlight: 1, title: "Chain the joins, then group" },
      steps: [
        {
          title: "Calculated columns",
          body: `<p>You can calculate in SELECT: <code>SELECT title, price, price * 1.2 AS price_with_tax FROM books;</code>. Revenue for each order line is quantity × price, but quantity is in <code>order_items</code> and price in <code>books</code>, so join them: <code>SELECT oi.qty * b.price FROM order_items oi JOIN books b ON b.id = oi.book_id;</code>.</p>`,
        },
        {
          title: "Total and by group",
          body: `<p>Wrap the calculation in SUM for the total: <code>SELECT SUM(oi.qty * b.price) FROM order_items oi JOIN books b ON b.id = oi.book_id;</code> returns 340.25. Add <code>b.genre</code> to the SELECT and <code>GROUP BY b.genre</code> for revenue by genre.</p>`,
        },
        {
          title: "Chaining joins",
          body: `<p>For revenue by month you need the order date too: join <code>orders</code> to <code>order_items</code>, and <code>order_items</code> to <code>books</code>. Each JOIN adds one table with its own ON condition. Dates in this database are text like <code>2026-01-15</code>, so <code>substr(o.order_date, 1, 7)</code> gives the month, <code>2026-01</code>.</p>`,
        },
        {
          title: "Top sellers",
          body: `<p>Group by book, sum the quantities, sort and limit: <code>SELECT b.title, SUM(oi.qty) AS units FROM order_items oi JOIN books b ON b.id = oi.book_id GROUP BY b.id ORDER BY units DESC LIMIT 3;</code>. The Quiet Orchard leads with 5 copies.</p>`,
        },
      ],
      quiz: [
        { q: "Why must order_items be joined to books to calculate revenue?", options: ["order_items has no rows", "Quantity is in order_items but price is in books", "books has the dates", "SQLite requires two tables"], answer: 1, explain: "Each table holds part of the calculation." },
        { q: "What does substr('2026-01-15', 1, 7) return?", options: ["2026", "2026-01", "01-15", "2026-01-15"], answer: 1, explain: "Seven characters starting at position 1." },
      ],
      exercise: {
        title: "Revenue by genre and month",
        task: `<p>Write two queries: revenue by genre (rounded to two decimals, highest first), and revenue by month. Which genre brings in the most, and which month was best?</p>`,
        files: ["bookshop.sql"],
        solution: [
          "<code>SELECT b.genre, ROUND(SUM(oi.qty * b.price), 2) AS revenue FROM order_items oi JOIN books b ON b.id = oi.book_id GROUP BY b.genre ORDER BY revenue DESC;</code>",
          "<strong>Fiction 155.20</strong>, Non-fiction 98.80, Cooking 86.25 (total 340.25).",
          "<code>SELECT substr(o.order_date, 1, 7) AS month, ROUND(SUM(oi.qty * b.price), 2) AS revenue FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN books b ON b.id = oi.book_id GROUP BY month;</code>",
          "January 107.14, <strong>February 118.99</strong>, March 114.12.",
        ],
      },
    },
    {
      id: "subqueries",
      title: "Subqueries, views and changing data",
      summary: "Use a query inside another, save a query as a view, and insert, update and delete rows safely.",
      diagram: { type: "code", lang: "SQL", lines: ["SELECT title, price FROM books", "WHERE price > (", "  SELECT AVG(price) FROM books", ");"], highlight: [2], notes: [[2, "Runs first: 15.58"]] },
      steps: [
        {
          title: "Subqueries",
          body: `<p>A subquery is a query in brackets used as a value or a list. Books priced above average: <code>SELECT title, price FROM books WHERE price &gt; (SELECT AVG(price) FROM books);</code>. Customers who have never ordered: <code>SELECT name FROM customers WHERE id NOT IN (SELECT customer_id FROM orders);</code>.</p>`,
        },
        {
          title: "Views",
          body: `<p>A view saves a query under a name, so you can query it like a table: <code>CREATE VIEW monthly_revenue AS SELECT …;</code>. Then <code>SELECT * FROM monthly_revenue;</code>. Views don't copy data; they rerun the query each time, so they're always up to date.</p>`,
        },
        {
          title: "INSERT, UPDATE, DELETE",
          body: `<p><code>INSERT INTO books VALUES (9, 'Paper Moons', 'K. Dale', 'Fiction', 10.5);</code> adds a row. <code>UPDATE books SET price = 13.5 WHERE id = 1;</code> changes one row. <code>DELETE FROM books WHERE id = 9;</code> removes it. Without a <code>WHERE</code>, UPDATE and DELETE affect <em>every</em> row.</p>`,
        },
        {
          title: "Change safely",
          body: `<p>Before an UPDATE or DELETE, run the same WHERE as a SELECT to see exactly which rows it will touch. In DB Browser, changes aren't saved until you write them: if something goes wrong, choose <em>Revert Changes</em> instead of ${k("Ctrl", "S")}.</p>`,
        },
      ],
      quiz: [
        { q: "What happens if you run UPDATE books SET price = 0; without WHERE?", options: ["Nothing", "Only the first book changes", "Every book's price becomes 0", "SQLite refuses"], answer: 2, explain: "Without WHERE, the change applies to every row." },
        { q: "What does a view store?", options: ["A copy of the data", "The query, rerun whenever you select from it", "Only the column names", "A backup"], answer: 1, explain: "A view is a saved query, not a stored copy." },
      ],
      exercise: {
        title: "Above-average books and a view",
        task: `<p>List the books priced above the average, then create a view named <code>monthly_revenue</code> from the revenue-by-month query in Lesson 5 and select from it. Finally, raise the price of The Quiet Orchard to 13.50, check it, and revert the change.</p>`,
        files: ["bookshop.sql"],
        solution: [
          "<code>SELECT title, price FROM books WHERE price &gt; (SELECT AVG(price) FROM books) ORDER BY price DESC;</code> gives Small Engines 22.00, A Year of Bread 18.75 and Field Notes on Birds 16.40 (the average is 15.58).",
          "<code>CREATE VIEW monthly_revenue AS</code> followed by the Lesson 5 month query (without the final semicolon inside), then <code>SELECT * FROM monthly_revenue;</code>: three rows.",
          "<code>SELECT * FROM books WHERE id = 1;</code> first, then <code>UPDATE books SET price = 13.5 WHERE id = 1;</code> and run the SELECT again.",
          "Choose <em>Revert Changes</em> to undo everything since the last write, view included, or Ctrl+S if you want to keep the view.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-customers",
      title: "Bonus project: a customer value report",
      summary: "Combine everything into one report: each customer's total spend, number of orders, a value tier with CASE, and the store's biggest single order.",
      diagram: { type: "table", head: ["name", "spent", "tier"], rows: [["Dana Fischer", "87.72", "Gold"], ["Amara Okafor", "70.64", "Gold"], ["Chen Wei", "49.65", "Silver"]], highlight: { cols: [2] }, caption: "CASE turns a number into a label" },
      steps: [
        {
          title: "Spend per customer, everyone included",
          body: `<p>Start from customers and LEFT JOIN through orders and order_items to books, so customers with no orders still appear. <code>COALESCE(SUM(oi.qty * b.price), 0)</code> turns their NULL total into 0.</p>`,
        },
        {
          title: "CASE for tiers",
          body: `<p><code>CASE WHEN spent &gt;= 50 THEN 'Gold' WHEN spent &gt;= 25 THEN 'Silver' ELSE 'Bronze' END</code> returns the first label whose condition is true. In the same query, repeat the full expression instead of the alias, or wrap the spend query in a subquery and apply CASE outside it.</p>`,
        },
        {
          title: "The biggest order",
          body: `<p>Group by order instead of customer, sort by total and keep one row: <code>… GROUP BY o.id ORDER BY total DESC LIMIT 1;</code>. Save the customer query as a view called <code>customer_value</code> so it's one line to rerun.</p>`,
        },
      ],
      quiz: [
        { q: "What does COALESCE(NULL, 0) return?", options: ["NULL", "0", "An error", "An empty string"], answer: 1, explain: "COALESCE returns its first non-NULL argument." },
        { q: "A customer spent 49.65. With the tiers in this lesson, which tier are they?", options: ["Gold", "Silver", "Bronze", "None"], answer: 1, explain: "49.65 is below 50 but at least 25." },
      ],
      exercise: {
        title: "Build customer_value",
        task: `<p>Create a view <code>customer_value</code> with every customer's name, total spend (two decimals, 0 for none) and tier. How many customers are in each tier? Then find the biggest single order.</p>`,
        files: ["bookshop.sql"],
        solution: [
          "<code>CREATE VIEW customer_value AS SELECT name, ROUND(spent, 2) AS spent, CASE WHEN spent &gt;= 50 THEN 'Gold' WHEN spent &gt;= 25 THEN 'Silver' ELSE 'Bronze' END AS tier FROM (SELECT c.name, COALESCE(SUM(oi.qty * b.price), 0) AS spent FROM customers c LEFT JOIN orders o ON o.customer_id = c.id LEFT JOIN order_items oi ON oi.order_id = o.id LEFT JOIN books b ON b.id = oi.book_id GROUP BY c.id);</code>",
          "<code>SELECT tier, COUNT(*) FROM customer_value GROUP BY tier;</code> gives <strong>Gold 2</strong> (Dana Fischer 87.72, Amara Okafor 70.64), <strong>Silver 4</strong> (Chen Wei, Ben Ruiz, Farah Haddad, Gus Larsen at exactly 25.00) and <strong>Bronze 2</strong> (Eli Novak 13.75, Hana Sato 0).",
          "Biggest order: <code>SELECT o.id, ROUND(SUM(oi.qty * b.price), 2) AS total FROM orders o JOIN order_items oi ON oi.order_id = o.id JOIN books b ON b.id = oi.book_id GROUP BY o.id ORDER BY total DESC LIMIT 1;</code> gives order <strong>112</strong> at 53.97.",
        ],
      },
    },
    practice: [
      {
        title: "Import a CSV as a new table",
        task: `<p>In a new, empty database, import <strong>customers.csv</strong> with <em>File › Import › Table from CSV file</em>, then count the customers per city, including the one with no city.</p>`,
        files: ["customers.csv"],
        solution: [
          "<em>New Database</em>, then <em>File › Import › Table from CSV file</em>, choose customers.csv.",
          "Tick <em>Column names in first line</em>, name the table customers and select <em>OK</em>.",
          "<code>SELECT city, COUNT(*) FROM customers GROUP BY city;</code>",
          "Bath 2, Leeds 3, York 2 and one row with an empty city. (An imported empty field may arrive as empty text rather than NULL, so check with <code>WHERE city = ''</code> too.)",
        ],
      },
      {
        title: "Customers who joined this year",
        task: `<p>In bookshop.db, list the customers who joined on or after 1 January 2026, and count the orders placed in February 2026.</p>`,
        files: ["bookshop.sql"],
        solution: [
          "<code>SELECT name, joined FROM customers WHERE joined &gt;= '2026-01-01';</code> gives Gus Larsen and Hana Sato. Text dates in YYYY-MM-DD format sort and compare correctly.",
          "<code>SELECT COUNT(*) FROM orders WHERE order_date BETWEEN '2026-02-01' AND '2026-02-28';</code> gives 4.",
          "BETWEEN includes both ends.",
        ],
      },
      {
        title: "Books nobody has bought",
        task: `<p>Find any book that has never been ordered, using a LEFT JOIN. Then add a new book and run the query again.</p>`,
        files: ["bookshop.sql", "books.csv"],
        solution: [
          "<code>SELECT b.title FROM books b LEFT JOIN order_items oi ON oi.book_id = b.id WHERE oi.book_id IS NULL;</code>",
          "With the practice data every book has sold at least once, so the result is empty.",
          "<code>INSERT INTO books VALUES (9, 'Paper Moons', 'K. Dale', 'Fiction', 10.5);</code> and rerun: Paper Moons appears.",
          "Revert the changes afterwards if you want to keep the database as it was.",
        ],
      },
    ],
  },
  async makeFiles() {
    return {
      "bookshop.sql": sqlScript().replace(/\n/g, "\r\n"),
      "books.csv": csv(["id", "title", "author", "genre", "price"], BOOKS),
      "customers.csv": csv(["id", "name", "city", "joined"], CUSTOMERS),
    };
  },
};
