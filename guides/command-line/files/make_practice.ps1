# Creates a practice folder for the Command Line Essentials guide (PowerShell).
# Run it with:  powershell -ExecutionPolicy Bypass -File make_practice.ps1
Remove-Item -Recurse -Force practice -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force practice/photos, practice/docs/old, practice/music | Out-Null
"beach-01.jpg", "beach-02.jpg", "city.png" | ForEach-Object { New-Item -ItemType File "practice/photos/$_" | Out-Null }
"report.txt", "budget.csv", "old/notes-2024.txt" | ForEach-Object { New-Item -ItemType File "practice/docs/$_" | Out-Null }
"song-a.mp3", "song-b.mp3" | ForEach-Object { New-Item -ItemType File "practice/music/$_" | Out-Null }
Set-Content practice/docs/reminder.txt "Remember to water the basil."
Write-Output "Created the practice folder:"
Get-ChildItem -Recurse practice | ForEach-Object { $_.FullName }
