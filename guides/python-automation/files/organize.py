"""Sorts the files in messy-downloads into folders by type.

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
