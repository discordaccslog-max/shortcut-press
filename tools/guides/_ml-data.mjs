// Deterministic practice datasets for Machine Learning Foundations with scikit-learn.
function lcg(seed) {
  let s = seed >>> 0;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}
function normal(rnd) {
  const u = Math.max(rnd(), 1e-9), v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
const r2 = (x) => Math.round(x * 100) / 100;

// House prices (in thousands): 240 homes.
export function housesCsv() {
  const rnd = lcg(42);
  const rows = [["size_m2", "bedrooms", "age_years", "distance_km", "neighborhood", "price_k"]];
  for (let i = 0; i < 240; i++) {
    const size = Math.round(45 + rnd() * 155);
    const bedrooms = Math.max(1, Math.min(5, Math.round(size / 40 + normal(rnd) * 0.6)));
    const age = Math.round(rnd() * 60);
    const distance = r2(0.5 + rnd() * 24);
    const hood = ["Old Town", "Riverside", "Hillcrest"][Math.floor(rnd() * 3)];
    const hoodEffect = { "Old Town": 40, Riverside: 15, Hillcrest: 0 }[hood];
    const price = 60 + 2.2 * size + 9 * bedrooms - 0.8 * age - 3.5 * distance + hoodEffect + normal(rnd) * 22;
    rows.push([size, bedrooms, age, distance, hood, r2(price)]);
  }
  return rows.map((r) => r.join(",")).join("\r\n") + "\r\n";
}

// Customer churn: 400 customers.
export function churnCsv() {
  const rnd = lcg(7);
  const rows = [["tenure_months", "monthly_fee", "support_calls", "plan", "auto_pay", "churned"]];
  for (let i = 0; i < 400; i++) {
    const tenure = Math.round(1 + rnd() * 59);
    const plan = ["Basic", "Plus", "Pro"][Math.floor(rnd() * 3)];
    const fee = r2({ Basic: 15, Plus: 30, Pro: 55 }[plan] + normal(rnd) * 4);
    const calls = Math.min(9, Math.floor(-Math.log(Math.max(rnd(), 1e-9)) * 1.6));
    const autoPay = rnd() < 0.55 ? "yes" : "no";
    const z = 0.2 - 0.11 * tenure + 0.04 * fee + 0.7 * calls + (autoPay === "no" ? 1.4 : 0) + normal(rnd) * 0.3;
    const churned = 1 / (1 + Math.exp(-z)) > rnd() ? 1 : 0;
    rows.push([tenure, fee, calls, plan, autoPay, churned]);
  }
  return rows.map((r) => r.join(",")).join("\r\n") + "\r\n";
}
