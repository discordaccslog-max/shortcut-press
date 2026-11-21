-- Bookshop practice database for SQL Queries for Data Analysis (Shortcut Press).
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

INSERT INTO customers VALUES (1, 'Amara Okafor', 'Leeds', '2025-02-14');
INSERT INTO customers VALUES (2, 'Ben Ruiz', 'York', '2025-03-02');
INSERT INTO customers VALUES (3, 'Chen Wei', 'Leeds', '2025-05-19');
INSERT INTO customers VALUES (4, 'Dana Fischer', 'Bath', '2025-07-08');
INSERT INTO customers VALUES (5, 'Eli Novak', 'York', '2025-09-23');
INSERT INTO customers VALUES (6, 'Farah Haddad', 'Leeds', '2025-11-30');
INSERT INTO customers VALUES (7, 'Gus Larsen', 'Bath', '2026-01-12');
INSERT INTO customers VALUES (8, 'Hana Sato', NULL, '2026-02-03');

INSERT INTO books VALUES (1, 'The Quiet Orchard', 'M. Ellery', 'Fiction', 12.99);
INSERT INTO books VALUES (2, 'Rivers of Salt', 'J. Amadi', 'Fiction', 14.5);
INSERT INTO books VALUES (3, 'Small Engines', 'P. Grant', 'Non-fiction', 22);
INSERT INTO books VALUES (4, 'A Year of Bread', 'L. Moreau', 'Cooking', 18.75);
INSERT INTO books VALUES (5, 'Night Trains', 'M. Ellery', 'Fiction', 11.25);
INSERT INTO books VALUES (6, 'Field Notes on Birds', 'R. Okoye', 'Non-fiction', 16.4);
INSERT INTO books VALUES (7, 'Soup Season', 'L. Moreau', 'Cooking', 15);
INSERT INTO books VALUES (8, 'The Glass Archive', 'J. Amadi', 'Fiction', 13.75);

INSERT INTO orders VALUES (101, 1, '2026-01-04');
INSERT INTO orders VALUES (102, 2, '2026-01-07');
INSERT INTO orders VALUES (103, 1, '2026-01-15');
INSERT INTO orders VALUES (104, 3, '2026-01-21');
INSERT INTO orders VALUES (105, 4, '2026-02-02');
INSERT INTO orders VALUES (106, 5, '2026-02-09');
INSERT INTO orders VALUES (107, 2, '2026-02-14');
INSERT INTO orders VALUES (108, 6, '2026-02-20');
INSERT INTO orders VALUES (109, 1, '2026-03-01');
INSERT INTO orders VALUES (110, 7, '2026-03-05');
INSERT INTO orders VALUES (111, 3, '2026-03-12');
INSERT INTO orders VALUES (112, 4, '2026-03-19');

INSERT INTO order_items VALUES (101, 1, 1);
INSERT INTO order_items VALUES (101, 4, 1);
INSERT INTO order_items VALUES (102, 3, 1);
INSERT INTO order_items VALUES (103, 5, 2);
INSERT INTO order_items VALUES (104, 2, 1);
INSERT INTO order_items VALUES (104, 6, 1);
INSERT INTO order_items VALUES (105, 7, 1);
INSERT INTO order_items VALUES (105, 4, 1);
INSERT INTO order_items VALUES (106, 8, 1);
INSERT INTO order_items VALUES (107, 1, 1);
INSERT INTO order_items VALUES (107, 2, 1);
INSERT INTO order_items VALUES (108, 3, 2);
INSERT INTO order_items VALUES (109, 6, 1);
INSERT INTO order_items VALUES (110, 5, 1);
INSERT INTO order_items VALUES (110, 8, 1);
INSERT INTO order_items VALUES (111, 4, 1);
INSERT INTO order_items VALUES (112, 1, 3);
INSERT INTO order_items VALUES (112, 7, 1);
