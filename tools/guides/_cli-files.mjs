// Practice files for Command Line Essentials.
function lcg(seed) {
  let s = seed >>> 0;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

export function serverLog() {
  const rnd = lcg(11);
  const paths = ["/", "/menu", "/about", "/order", "/api/stock", "/contact"];
  const lines = [];
  for (let i = 0; i < 80; i++) {
    const mins = i * 7 + Math.floor(rnd() * 5);
    const hh = String(8 + Math.floor(mins / 60)).padStart(2, "0");
    const mm = String(mins % 60).padStart(2, "0");
    const ss = String(Math.floor(rnd() * 60)).padStart(2, "0");
    const path = paths[Math.floor(rnd() * paths.length)];
    const r = rnd();
    const [level, status] = r < 0.08 ? ["ERROR", 500] : r < 0.2 ? ["WARN", 404] : ["INFO", 200];
    const ms = 20 + Math.floor(rnd() * (level === "ERROR" ? 900 : 180));
    lines.push(`2026-03-14 ${hh}:${mm}:${ss} ${level} ${path} ${status} ${ms}ms`);
  }
  return lines.join("\n") + "\n";
}

export const CITIES = `city,country,population_k
Lisbon,Portugal,545
Porto,Portugal,232
Madrid,Spain,3280
Seville,Spain,684
Valencia,Spain,792
Lyon,France,522
Paris,France,2103
Nice,France,342
Turin,Italy,848
Milan,Italy,1371
Naples,Italy,909
Rome,Italy,2749
`;

export const MAKE_SH = `#!/usr/bin/env bash
# Creates a practice folder for the Command Line Essentials guide.
# Run it with:  bash make_practice.sh
set -e
rm -rf practice
mkdir -p practice/photos practice/docs/old practice/music
touch practice/photos/beach-01.jpg practice/photos/beach-02.jpg practice/photos/city.png
touch practice/docs/report.txt practice/docs/budget.csv practice/docs/old/notes-2024.txt
touch practice/music/song-a.mp3 practice/music/song-b.mp3
echo "Remember to water the basil." > practice/docs/reminder.txt
echo "Created the practice folder:"
find practice | sort
`;

export const MAKE_PS1 = `# Creates a practice folder for the Command Line Essentials guide (PowerShell).
# Run it with:  powershell -ExecutionPolicy Bypass -File make_practice.ps1
Remove-Item -Recurse -Force practice -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force practice/photos, practice/docs/old, practice/music | Out-Null
"beach-01.jpg", "beach-02.jpg", "city.png" | ForEach-Object { New-Item -ItemType File "practice/photos/$_" | Out-Null }
"report.txt", "budget.csv", "old/notes-2024.txt" | ForEach-Object { New-Item -ItemType File "practice/docs/$_" | Out-Null }
"song-a.mp3", "song-b.mp3" | ForEach-Object { New-Item -ItemType File "practice/music/$_" | Out-Null }
Set-Content practice/docs/reminder.txt "Remember to water the basil."
Write-Output "Created the practice folder:"
Get-ChildItem -Recurse practice | ForEach-Object { $_.FullName }
`;
