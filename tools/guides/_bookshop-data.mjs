// Bookshop sample database for the SQL guide (SQLite).
export const CUSTOMERS = [
  [1, "Amara Okafor", "Leeds", "2025-02-14"],
  [2, "Ben Ruiz", "York", "2025-03-02"],
  [3, "Chen Wei", "Leeds", "2025-05-19"],
  [4, "Dana Fischer", "Bath", "2025-07-08"],
  [5, "Eli Novak", "York", "2025-09-23"],
  [6, "Farah Haddad", "Leeds", "2025-11-30"],
  [7, "Gus Larsen", "Bath", "2026-01-12"],
  [8, "Hana Sato", null, "2026-02-03"],
];
export const BOOKS = [
  [1, "The Quiet Orchard", "M. Ellery", "Fiction", 12.99],
  [2, "Rivers of Salt", "J. Amadi", "Fiction", 14.5],
  [3, "Small Engines", "P. Grant", "Non-fiction", 22.0],
  [4, "A Year of Bread", "L. Moreau", "Cooking", 18.75],
  [5, "Night Trains", "M. Ellery", "Fiction", 11.25],
  [6, "Field Notes on Birds", "R. Okoye", "Non-fiction", 16.4],
  [7, "Soup Season", "L. Moreau", "Cooking", 15.0],
  [8, "The Glass Archive", "J. Amadi", "Fiction", 13.75],
];
export const ORDERS = [
  [101, 1, "2026-01-04"], [102, 2, "2026-01-07"], [103, 1, "2026-01-15"], [104, 3, "2026-01-21"],
  [105, 4, "2026-02-02"], [106, 5, "2026-02-09"], [107, 2, "2026-02-14"], [108, 6, "2026-02-20"],
  [109, 1, "2026-03-01"], [110, 7, "2026-03-05"], [111, 3, "2026-03-12"], [112, 4, "2026-03-19"],
];
export const ITEMS = [
  [101, 1, 1], [101, 4, 1], [102, 3, 1], [103, 5, 2], [104, 2, 1], [104, 6, 1],
  [105, 7, 1], [105, 4, 1], [106, 8, 1], [107, 1, 1], [107, 2, 1], [108, 3, 2],
  [109, 6, 1], [110, 5, 1], [110, 8, 1], [111, 4, 1], [112, 1, 3], [112, 7, 1],
];

const q = (v) => (v === null ? "NULL" : typeof v === "number" ? String(v) : `'${String(v).replace(/'/g, "''")}'`);
export function sqlScript() {
  return `-- Bookshop practice database for SQL Queries for Data Analysis (Shortcut Press).
-- Run this whole script once in DB Browser for SQLite (Execute SQL tab) to create the tables.
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  joined TEXT NOT NULL
);

CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT NOT NULL,
  price REAL NOT NULL
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  order_date TEXT NOT NULL
);

CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(id),
  book_id INTEGER NOT NULL REFERENCES books(id),
  qty INTEGER NOT NULL
);

${CUSTOMERS.map((r) => `INSERT INTO customers VALUES (${r.map(q).join(", ")});`).join("\n")}

${BOOKS.map((r) => `INSERT INTO books VALUES (${r.map(q).join(", ")});`).join("\n")}

${ORDERS.map((r) => `INSERT INTO orders VALUES (${r.map(q).join(", ")});`).join("\n")}

${ITEMS.map((r) => `INSERT INTO order_items VALUES (${r.map(q).join(", ")});`).join("\n")}
`;
}
