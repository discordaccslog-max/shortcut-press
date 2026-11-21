// Practice files for JavaScript Fundamentals for the Browser.
export const EXPENSES = [
  { id: 1, label: "Groceries", amount: 64.2, category: "Food" },
  { id: 2, label: "Bus pass", amount: 45, category: "Transport" },
  { id: 3, label: "Lunch with Sam", amount: 18.5, category: "Food" },
  { id: 4, label: "Electricity", amount: 61.15, category: "Bills" },
  { id: 5, label: "Cinema", amount: 24, category: "Fun" },
  { id: 6, label: "Groceries", amount: 58.75, category: "Food" },
];

export const INDEX_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pocket Expenses</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 34rem; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    form { display: grid; grid-template-columns: 1fr 7rem 8rem auto; gap: .5rem; margin-bottom: 1rem; }
    input, select, button { font: inherit; padding: .4rem .5rem; }
    ul { list-style: none; padding: 0; }
    li { display: flex; justify-content: space-between; gap: 1rem; padding: .5rem 0; border-bottom: 1px solid #ddd; }
    li.big { font-weight: 700; }
    .total { font-size: 1.25rem; }
    .error { color: #b00020; }
  </style>
  <script src="app.js" defer></script>
</head>
<body>
  <h1>Pocket Expenses</h1>
  <form id="add-form">
    <input id="label" placeholder="What was it?" aria-label="What was it?">
    <input id="amount" type="number" step="0.01" min="0" placeholder="Amount" aria-label="Amount">
    <select id="category" aria-label="Category">
      <option>Food</option><option>Transport</option><option>Bills</option><option>Fun</option>
    </select>
    <button type="submit">Add</button>
  </form>
  <p class="error" id="error" hidden></p>
  <label>Show <select id="filter"><option value="All">All categories</option><option>Food</option><option>Transport</option><option>Bills</option><option>Fun</option></select></label>
  <ul id="list"></ul>
  <p class="total">Total: <strong id="total">0.00</strong></p>
</body>
</html>
`;

export const STARTER_JS = `// Pocket Expenses: starter script for JavaScript Fundamentals for the Browser.
// Each lesson adds a section below. Open index.html in your browser and the
// browser's console (F12 or Ctrl+Shift+J) to see what this file does.

console.log("app.js is connected");

// Lesson 1: variables
// Lesson 2: functions
// Lesson 3: arrays and objects
// Lesson 4: showing the list on the page
// Lesson 5: the form
// Lesson 6: loading and saving
`;

export const FINISHED_JS = `// Pocket Expenses: finished script.
let expenses = [];

function formatMoney(amount) {
  return amount.toFixed(2);
}

function total(list) {
  return list.reduce((sum, e) => sum + e.amount, 0);
}

function render() {
  const filter = document.querySelector("#filter").value;
  const shown = filter === "All" ? expenses : expenses.filter((e) => e.category === filter);
  const list = document.querySelector("#list");
  list.innerHTML = "";
  for (const e of shown) {
    const li = document.createElement("li");
    li.textContent = e.label + " (" + e.category + ")";
    if (e.amount >= 50) li.classList.add("big");
    const amount = document.createElement("span");
    amount.textContent = formatMoney(e.amount);
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.dataset.id = e.id;
    li.append(amount, del);
    list.append(li);
  }
  document.querySelector("#total").textContent = formatMoney(total(shown));
}

function save() {
  localStorage.setItem("pocket-expenses", JSON.stringify(expenses));
}

document.querySelector("#add-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const label = document.querySelector("#label").value.trim();
  const amount = Number(document.querySelector("#amount").value);
  const error = document.querySelector("#error");
  if (!label || !(amount > 0)) {
    error.textContent = "Enter what it was and an amount above zero.";
    error.hidden = false;
    return;
  }
  error.hidden = true;
  const category = document.querySelector("#category").value;
  expenses.push({ id: Date.now(), label, amount, category });
  save();
  render();
  event.target.reset();
});

document.querySelector("#list").addEventListener("click", (event) => {
  if (!event.target.matches("button")) return;
  const id = Number(event.target.dataset.id);
  expenses = expenses.filter((e) => e.id !== id);
  save();
  render();
});

document.querySelector("#filter").addEventListener("change", render);

async function load() {
  const saved = localStorage.getItem("pocket-expenses");
  if (saved) {
    expenses = JSON.parse(saved);
  } else {
    try {
      const response = await fetch("expenses.json");
      expenses = await response.json();
    } catch (err) {
      console.error("Couldn't load expenses.json", err);
    }
  }
  render();
}

load();
`;
