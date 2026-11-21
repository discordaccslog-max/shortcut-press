// Pocket Expenses: finished script.
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
