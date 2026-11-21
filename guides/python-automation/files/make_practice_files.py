"""Creates a messy practice folder for the Python automation guide.

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
    (folder / name).write_text("practice file\n", encoding="utf-8")
print(f"Created {len(names)} files in {folder}")
