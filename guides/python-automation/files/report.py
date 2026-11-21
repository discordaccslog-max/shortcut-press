"""Totals expenses.csv by category and writes summary.csv."""
import csv
from pathlib import Path

here = Path(__file__).parent
totals = {}
with open(here / "expenses.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        amount = float(row["amount"])
        totals[row["category"]] = totals.get(row["category"], 0) + amount

with open(here / "summary.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["category", "total"])
    for category, total in sorted(totals.items(), key=lambda item: item[1], reverse=True):
        writer.writerow([category, f"{total:.2f}"])
        print(f"{category:<12}{total:>10.2f}")

print(f"{'All':<12}{sum(totals.values()):>10.2f}")
