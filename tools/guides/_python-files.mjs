// Practice files for Python for Everyday Automation (shared so the guide text can quote them).
export const EXPENSES = `date,category,amount,note
2026-03-01,Rent,950.00,March rent
2026-03-02,Groceries,64.20,Weekly shop
2026-03-04,Transport,45.00,Bus pass
2026-03-06,Eating out,18.50,Lunch with Sam
2026-03-09,Groceries,58.75,Weekly shop
2026-03-11,Utilities,61.15,Electricity
2026-03-13,Eating out,32.00,Birthday dinner
2026-03-16,Groceries,71.30,Weekly shop
2026-03-18,Utilities,35.00,Phone
2026-03-20,Transport,12.40,Taxi
2026-03-23,Groceries,49.90,Weekly shop
2026-03-25,Eating out,9.75,Coffee and cake
2026-03-27,Books,22.00,Small Engines
2026-03-30,Groceries,66.10,Weekly shop
`;

export const NOTES = `Meeting notes, 4 March 2026
Present: Amara (amara.okafor@maple-garden.test), Ben (ben.ruiz@maple-garden.test)
Chen will send the plan by 2026-03-11. Call the city office on 555-0142.

Follow-up 11 March 2026
Timber quote from Northside Supplies: contact sales@northside-supplies.test or 555-0199.
Next meeting: 2026-03-18.   Bring   the   seed   list.
`;

export const MAKE_FILES = `"""Creates a messy practice folder for the Python automation guide.

Run it once:  python make_practice_files.py
It makes a folder called messy-downloads next to this script, filled with
empty files of different types. Run it again any time to start over.
"""
from pathlib import Path
import shutil

names = [
    "holiday-photo-01.jpg", "holiday-photo-02.jpg", "receipt-march.pdf",
    "budget.xlsx", "notes.txt", "song-demo.mp3", "screenshot 2026-03-02.png",
    "invoice-1042.pdf", "recipe.txt", "garden-plan.png", "contract.pdf", "podcast.mp3",
]

folder = Path(__file__).parent / "messy-downloads"
if folder.exists():
    shutil.rmtree(folder)
folder.mkdir()
for name in names:
    (folder / name).write_text("practice file\\n", encoding="utf-8")
print(f"Created {len(names)} files in {folder}")
`;

export const ORGANIZE = `"""Sorts the files in messy-downloads into folders by type.

Usage:  python organize.py          (shows what would happen)
        python organize.py --move   (actually moves the files)
"""
from pathlib import Path
import sys

FOLDERS = {
    ".jpg": "Images", ".png": "Images",
    ".pdf": "Documents", ".txt": "Documents", ".xlsx": "Documents",
    ".mp3": "Audio",
}

def organize(folder, move=False):
    count = 0
    for path in sorted(folder.iterdir()):
        if not path.is_file():
            continue
        target_name = FOLDERS.get(path.suffix.lower(), "Other")
        target = folder / target_name
        print(f"{path.name} -> {target_name}/")
        if move:
            target.mkdir(exist_ok=True)
            path.rename(target / path.name)
        count += 1
    return count

if __name__ == "__main__":
    folder = Path(__file__).parent / "messy-downloads"
    if not folder.exists():
        print("Run make_practice_files.py first.")
        sys.exit(1)
    moved = organize(folder, move="--move" in sys.argv)
    print(f"{moved} files {'moved' if '--move' in sys.argv else 'would be moved'}.")
`;

export const REPORT = `"""Totals expenses.csv by category and writes summary.csv."""
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
`;

export const EXTRACT = `"""Pulls email addresses, phone numbers and dates out of notes.txt."""
import re
from pathlib import Path

text = (Path(__file__).parent / "notes.txt").read_text(encoding="utf-8")

emails = re.findall(r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+", text)
phones = re.findall(r"\\b\\d{3}-\\d{4}\\b", text)
dates = re.findall(r"\\b\\d{4}-\\d{2}-\\d{2}\\b", text)

print("Emails:", emails)
print("Phones:", phones)
print("Dates: ", dates)

tidy = re.sub(r" {2,}", " ", text)
(Path(__file__).parent / "notes-tidy.txt").write_text(tidy, encoding="utf-8")
`;
