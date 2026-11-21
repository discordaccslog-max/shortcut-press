"""Pulls email addresses, phone numbers and dates out of notes.txt."""
import re
from pathlib import Path

text = (Path(__file__).parent / "notes.txt").read_text(encoding="utf-8")

emails = re.findall(r"[\w.+-]+@[\w-]+\.[\w.-]+", text)
phones = re.findall(r"\b\d{3}-\d{4}\b", text)
dates = re.findall(r"\b\d{4}-\d{2}-\d{2}\b", text)

print("Emails:", emails)
print("Phones:", phones)
print("Dates: ", dates)

tidy = re.sub(r" {2,}", " ", text)
(Path(__file__).parent / "notes-tidy.txt").write_text(tidy, encoding="utf-8")
