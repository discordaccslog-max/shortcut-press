#!/usr/bin/env bash
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
