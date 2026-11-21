import { k } from "./_helpers.mjs";
import { serverLog, CITIES, MAKE_SH, MAKE_PS1 } from "./_cli-files.mjs";

export default {
  id: "command-line",
  slug: "command-line",
  title: "Command Line Essentials",
  software: "A terminal (Bash or zsh; PowerShell notes included)",
  apps: ["Terminal"],
  intro:
    "Get comfortable in the terminal: move around folders, create, copy, move and delete files safely, read and search text, connect commands with pipes and redirects, and write a first script. The commands work in Bash and zsh on Mac and Linux and in Git Bash on Windows, with PowerShell equivalents noted.",
  platformNote: "The shortcuts are terminal shortcuts and use Ctrl on every system, including a Mac.",
  store: {
    category: "code",
    level: "Beginner",
    software: "A terminal: Terminal on a Mac (zsh), any Linux terminal, or Git Bash on Windows (free); PowerShell notes included",
    softwareShort: "Terminal",
    softwareHtml: `<p>This guide uses a <strong>Bash or zsh terminal</strong>: the built-in Terminal app on a Mac, any terminal on Linux, or <strong>Git Bash</strong> on Windows, which comes free with Git for Windows from git-scm.com. Where Windows PowerShell differs, the guide shows the PowerShell command too. No software is included with the guide; anything you need is obtained separately and free.</p>`,
    forWho: [
      "You've been told to “just run this in the terminal” and want to understand what you're typing.",
      "You're starting with coding, data or servers, where the command line is everywhere.",
      "You want to handle files and search logs faster than with a mouse.",
    ],
    notFor: [
      "You need Linux system administration: users, services, networking or security hardening.",
      "You want advanced shell programming. The guide ends with a first, simple script.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "make_practice.sh", title: "Practice folder maker (Bash)", desc: "Creates a practice folder of photos, documents and music to work with. Run it with bash." },
    { name: "make_practice.ps1", title: "Practice folder maker (PowerShell)", desc: "The same practice folder for Windows PowerShell." },
    { name: "server.log", title: "Web server log", desc: "80 lines from a day of web requests, with INFO, WARN and ERROR entries, for searching and counting." },
    { name: "cities.csv", title: "Cities", desc: "Twelve European cities with country and population, for sorting and cutting columns." },
  ],
  shortcuts: [
    { keys: "Tab", action: "Complete a command, file or folder name", app: "Terminal" },
    { keys: "ArrowUp", action: "Bring back the previous command", app: "Terminal" },
    { keys: "Ctrl+C", action: "Stop the running command", app: "Terminal" },
    { keys: "Ctrl+A", action: "Jump to the start of the line", app: "Terminal" },
    { keys: "Ctrl+E", action: "Jump to the end of the line", app: "Terminal" },
    { keys: "Ctrl+U", action: "Delete from the cursor to the start of the line", app: "Terminal" },
    { keys: "Q", action: "Quit less (the file viewer)", app: "Terminal" },
    { keys: "/", action: "Search inside less", app: "Terminal" },
    { keys: "Space", action: "Next page in less", app: "Terminal" },
    { keys: "Ctrl+R", action: "Search your command history", app: "Terminal", practice: false, note: "Your browser uses this shortcut to reload the page." },
    { keys: "Ctrl+L", action: "Clear the screen", app: "Terminal", practice: false, note: "Your browser uses this shortcut for the address bar." },
    { keys: "Ctrl+D", action: "Close the terminal session (on an empty line)", app: "Terminal" },
  ],
  lessons: [
    {
      id: "navigate",
      title: "Finding your way around",
      summary: "Open a terminal, read the prompt, see where you are, list files, move between folders, and let Tab do the typing.",
      diagram: { type: "terminal", shell: "bash", lines: [["$", "pwd"], ["", "/home/sam"], ["$", "cd Downloads/practice"], ["$", "ls"], ["", "docs  music  photos"]], highlight: [2] },
      steps: [
        {
          title: "Open a terminal",
          body: `<p>On a Mac, open <em>Terminal</em> (search for it with Spotlight). On Windows, install Git for Windows and open <em>Git Bash</em>. On Linux, open your terminal app. The text before the cursor is the <strong>prompt</strong>; it often shows the current folder and ends in <code>$</code> (or <code>%</code> in zsh).</p>`,
        },
        {
          title: "Where am I? What's here?",
          body: `<p><code>pwd</code> (print working directory) shows the folder you're in. <code>ls</code> lists its contents; <code>ls -l</code> adds sizes and dates, and <code>ls -la</code> also shows hidden files, whose names start with a dot.</p>`,
        },
        {
          title: "Moving around",
          body: `<p><code>cd photos</code> goes into a folder; <code>cd ..</code> goes up one level; <code>cd ~</code> (or just <code>cd</code>) goes home; <code>cd -</code> goes back to the previous folder. A path starting with <code>/</code> is <em>absolute</em> (from the top); anything else is <em>relative</em> to where you are.</p>`,
        },
        {
          title: "Let Tab type for you",
          body: `<p>Type the first few letters of a name and press ${k("Tab")}: the terminal completes it, or lists the options if there are several. ${k("ArrowUp")} brings back earlier commands, and <code>history</code> lists them. Names with spaces need quotes: <code>cd "My Documents"</code>.</p>`,
        },
      ],
      quiz: [
        { q: "Which command shows the folder you're currently in?", options: ["ls", "pwd", "cd", "where"], answer: 1, explain: "pwd prints the working directory." },
        { q: "What does cd .. do?", options: ["Goes to the home folder", "Goes up one folder", "Lists hidden files", "Goes back to the previous folder"], answer: 1, explain: ".. means the parent folder." },
      ],
      exercise: {
        title: "Make and explore the practice folder",
        task: `<p>Go to the folder where you saved the practice files and run <code>bash make_practice.sh</code> (PowerShell: <code>powershell -ExecutionPolicy Bypass -File make_practice.ps1</code>). Then use <code>cd</code> and <code>ls</code> to find out what's inside practice/docs.</p>`,
        files: ["make_practice.sh", "make_practice.ps1"],
        solution: [
          "<code>cd</code> to the download folder, for example <code>cd ~/Downloads</code>, and check with <code>ls</code> that make_practice.sh is there.",
          "<code>bash make_practice.sh</code> lists the files it created.",
          "<code>cd practice/docs</code> then <code>ls</code>: <strong>budget.csv, old, reminder.txt, report.txt</strong>.",
          "<code>ls -l</code> shows that old is a folder (its line starts with <code>d</code>). <code>cd ../..</code> takes you back.",
        ],
      },
    },
    {
      id: "files",
      title: "Creating, copying, moving and deleting",
      summary: "Make folders and files, copy and move them, use wildcards to work on many at once, and delete safely.",
      diagram: { type: "table", head: ["Command", "Does", "PowerShell"], rows: [["mkdir -p a/b", "make folders", "New-Item -ItemType Directory"], ["cp file dest", "copy", "Copy-Item"], ["mv file dest", "move or rename", "Move-Item"], ["rm file", "delete (no undo)", "Remove-Item"]], highlight: { rows: [3] }, caption: "The four commands for managing files" },
      steps: [
        {
          title: "Make folders and files",
          body: `<p><code>mkdir backups</code> makes a folder; <code>mkdir -p archive/2026/march</code> makes the whole path at once. <code>touch notes.txt</code> creates an empty file (or updates an existing file's date). <code>echo "hello" &gt; hello.txt</code> creates a file with text in it.</p>`,
        },
        {
          title: "Copy and move",
          body: `<p><code>cp report.txt backups/</code> copies a file into a folder; <code>cp -r photos backups/</code> copies a folder and everything in it (<code>-r</code> means recursive). <code>mv report.txt report-march.txt</code> renames; <code>mv report-march.txt backups/</code> moves. In PowerShell, <code>cp</code> and <code>mv</code> also work, as short names for Copy-Item and Move-Item.</p>`,
        },
        {
          title: "Wildcards",
          body: `<p><code>*</code> matches any characters, so <code>ls photos/*.jpg</code> lists only the JPEGs and <code>cp photos/beach-* backups/</code> copies every file starting with “beach-”. Run <code>ls</code> with the same pattern first to see exactly what a command will touch.</p>`,
        },
        {
          title: "Delete with care",
          body: `<p><code>rm file</code> deletes a file immediately: no recycle bin, no undo. <code>rm -r folder</code> deletes a folder and everything inside. Add <code>-i</code> to be asked before each deletion. Before any <code>rm</code> with a wildcard, run <code>ls</code> with the same pattern; never run a delete you copied from somewhere without understanding it.</p>`,
        },
      ],
      quiz: [
        { q: "Which command copies a folder with everything in it?", options: ["cp folder dest", "cp -r folder dest", "mv -r folder dest", "copy folder"], answer: 1, explain: "-r copies recursively." },
        { q: "What should you do before rm *.txt?", options: ["Nothing, it's safe", "Run ls *.txt to see what it will delete", "Add sudo", "Close other programs"], answer: 1, explain: "Checking the pattern first prevents deleting the wrong files." },
      ],
      exercise: {
        title: "Organize the practice files",
        task: `<p>Inside practice, make a folder called archive/2024, move docs/old/notes-2024.txt into it, copy all the beach photos into a new folder called favorites, rename docs/report.txt to report-march.txt, and delete the now-empty docs/old folder.</p>`,
        files: ["make_practice.sh"],
        solution: [
          "<code>cd practice</code> and <code>mkdir -p archive/2024</code>.",
          "<code>mv docs/old/notes-2024.txt archive/2024/</code>",
          "<code>mkdir favorites</code> then <code>ls photos/beach-*</code> (two files) and <code>cp photos/beach-* favorites/</code>.",
          "<code>mv docs/report.txt docs/report-march.txt</code>",
          "<code>rmdir docs/old</code> (rmdir only removes empty folders, which makes it a safe choice here).",
        ],
      },
    },
    {
      id: "reading",
      title: "Reading files",
      summary: "Print short files, page through long ones, look at the beginning or end, count lines, and watch a file as it grows.",
      diagram: { type: "terminal", shell: "bash", lines: [["$", "wc -l server.log"], ["", "80 server.log"], ["$", "head -n 1 server.log"], ["", "2026-03-14 08:01:16 ERROR /about 500 663ms"]], highlight: [0] },
      steps: [
        {
          title: "cat for short files",
          body: `<p><code>cat practice/docs/reminder.txt</code> prints a file's contents. It's fine for short files; for long ones, everything scrolls past. <code>cat</code> can also join files: <code>cat part1.txt part2.txt</code> prints both in turn.</p>`,
        },
        {
          title: "less for long files",
          body: `<p><code>less server.log</code> opens a scrollable viewer: arrow keys or ${k("Space")} to move, ${k("/")} then a word to search (<code>n</code> for the next match), and ${k("Q")} to quit. The file isn't changed; less only reads.</p>`,
        },
        {
          title: "The beginning and the end",
          body: `<p><code>head -n 5 server.log</code> shows the first five lines; <code>tail -n 5</code> the last five. Logs grow at the bottom, so <code>tail</code> shows the latest entries. <code>tail -f</code> keeps watching and prints new lines as they're added; press ${k("Ctrl", "C")} to stop.</p>`,
        },
        {
          title: "Counting",
          body: `<p><code>wc -l server.log</code> counts lines: 80. <code>wc -w</code> counts words. In PowerShell, <code>Get-Content server.log -TotalCount 5</code> is like head, <code>Get-Content server.log -Tail 5</code> like tail, and <code>(Get-Content server.log).Count</code> counts lines.</p>`,
        },
      ],
      quiz: [
        { q: "How do you leave less?", options: ["Esc", "Q", "Ctrl+X", "exit"], answer: 1, explain: "Press q to quit less." },
        { q: "Which command shows the last 10 lines of a log?", options: ["head server.log", "tail server.log", "cat -10 server.log", "less -end server.log"], answer: 1, explain: "tail shows the end of a file (10 lines by default)." },
      ],
      exercise: {
        title: "Look at the log",
        task: `<p>Count the lines in <strong>server.log</strong>, show its first and last lines, and use less to search for the word ERROR. What time is the first entry, and what time is the last?</p>`,
        files: ["server.log"],
        solution: [
          "<code>wc -l server.log</code> → <strong>80</strong> lines.",
          "<code>head -n 1 server.log</code> → the first entry is at <strong>08:01:16</strong> (and it's an ERROR on /about).",
          "<code>tail -n 1 server.log</code> → the last entry is at <strong>17:14:36</strong>.",
          "<code>less server.log</code>, type <code>/ERROR</code> and press Enter; <code>n</code> jumps to each next match; <code>q</code> quits.",
        ],
      },
    },
    {
      id: "search",
      title: "Searching and filtering with pipes",
      summary: "Find lines with grep, connect commands with pipes, and sort, count and cut columns to answer questions about data.",
      diagram: { type: "flow", nodes: ["grep ERROR", "cut -d' ' -f4", "sort", "uniq -c", "sort -rn"], highlight: 3, title: "Which pages cause errors? One pipeline answers it" },
      steps: [
        {
          title: "grep",
          body: `<p><code>grep ERROR server.log</code> prints every line containing ERROR. Useful options: <code>-c</code> counts matching lines, <code>-i</code> ignores case, <code>-n</code> shows line numbers, <code>-v</code> shows lines that <em>don't</em> match. <code>grep -c ERROR server.log</code> → 8.</p>`,
        },
        {
          title: "Pipes",
          body: `<p>The pipe <code>|</code> sends one command's output into the next: <code>grep ERROR server.log | head -n 3</code> shows the first three errors. Small commands that each do one thing combine into powerful questions.</p>`,
        },
        {
          title: "cut, sort and uniq",
          body: `<p><code>cut -d' ' -f4</code> keeps the 4th space-separated field (the page path); <code>-d,</code> splits on commas instead. <code>sort</code> sorts lines (<code>-n</code> numerically, <code>-r</code> reversed). <code>uniq -c</code> collapses repeated adjacent lines and counts them, which is why it almost always follows <code>sort</code>.</p>`,
        },
        {
          title: "Put it together",
          body: `<p><code>grep ERROR server.log | cut -d' ' -f4 | sort | uniq -c | sort -rn</code> lists which pages produced errors, most first. In PowerShell, <code>Select-String</code> is the grep equivalent: <code>(Select-String ERROR server.log).Count</code>.</p>`,
        },
      ],
      quiz: [
        { q: "Why does uniq -c usually come after sort?", options: ["uniq needs numbers", "uniq only merges repeated lines that are next to each other", "sort removes duplicates", "It doesn't matter"], answer: 1, explain: "Sorting brings identical lines together so uniq can count them." },
        { q: "What does grep -v INFO server.log show?", options: ["Only INFO lines", "Every line that doesn't contain INFO", "The count of INFO lines", "The INFO lines numbered"], answer: 1, explain: "-v inverts the match." },
      ],
      exercise: {
        title: "Investigate the errors",
        task: `<p>Using <strong>server.log</strong>: count the ERROR and WARN lines, list which pages produced errors and how often, and find the three most requested pages overall.</p>`,
        files: ["server.log"],
        solution: [
          "<code>grep -c ERROR server.log</code> → <strong>8</strong>; <code>grep -c WARN server.log</code> → <strong>10</strong>. Together: <code>grep -v INFO server.log | wc -l</code> → 18.",
          "<code>grep ERROR server.log | cut -d' ' -f4 | sort | uniq -c | sort -rn</code> → <strong>3 /contact, 3 /about, 2 /api/stock</strong>.",
          "<code>cut -d' ' -f4 server.log | sort | uniq -c | sort -rn | head -n 3</code> → <strong>18 /api/stock, 16 /order, 15 /</strong>.",
        ],
      },
    },
    {
      id: "redirect",
      title: "Redirects, chaining and finding files",
      summary: "Save output to files, append to them, run commands one after another or only on success, and find files by name or type.",
      diagram: { type: "table", head: ["Symbol", "Meaning"], rows: [[">", "write output to a file (replaces it)"], [">>", "add output to the end of a file"], ["|", "send output to the next command"], ["&&", "run the next command only if this one worked"]], highlight: { rows: [0] }, caption: "Four symbols that connect commands and files" },
      steps: [
        {
          title: "Save output with > and >>",
          body: `<p><code>grep ERROR server.log &gt; errors.txt</code> saves the matching lines to a file, replacing anything already in it. <code>&gt;&gt;</code> appends instead: <code>grep WARN server.log &gt;&gt; errors.txt</code> adds the warnings below. Be careful with <code>&gt;</code>: it empties the file before writing.</p>`,
        },
        {
          title: "Chaining with && and ;",
          body: `<p><code>mkdir reports &amp;&amp; cd reports</code> only changes folder if the folder was created. <code>;</code> runs the next command regardless. Use <code>&amp;&amp;</code> when later steps depend on earlier ones succeeding.</p>`,
        },
        {
          title: "find",
          body: `<p><code>find practice -name "*.jpg"</code> searches a folder and everything below it for matching names (quote the pattern). <code>-type f</code> limits results to files, <code>-type d</code> to folders. <code>find practice -type f | wc -l</code> counts every file: 9 in the fresh practice folder.</p>`,
        },
        {
          title: "Sorting a CSV",
          body: `<p><code>tail -n +2 cities.csv</code> skips the header line. <code>sort -t, -k3 -n -r</code> sorts comma-separated lines by the 3rd column, numerically, largest first. Combine them with a pipe and <code>head -n 3</code> for the three largest cities.</p>`,
        },
      ],
      quiz: [
        { q: "What's the difference between > and >>?", options: ["None", "> replaces the file's contents; >> adds to the end", ">> replaces; > adds", "> is for folders"], answer: 1, explain: "Use >> when you want to keep what's already there." },
        { q: "In mkdir reports && cd reports, when does cd run?", options: ["Always", "Only if mkdir succeeded", "Only if mkdir failed", "Before mkdir"], answer: 1, explain: "&& runs the next command only after success." },
      ],
      exercise: {
        title: "A small report",
        task: `<p>Create a file errors-report.txt containing all ERROR lines followed by all WARN lines, then count its lines. Find how many .jpg files are in a fresh practice folder, and list the three largest cities in <strong>cities.csv</strong>.</p>`,
        files: ["server.log", "cities.csv", "make_practice.sh"],
        solution: [
          "<code>grep ERROR server.log &gt; errors-report.txt &amp;&amp; grep WARN server.log &gt;&gt; errors-report.txt</code>",
          "<code>wc -l errors-report.txt</code> → <strong>18</strong> (8 errors, then 10 warnings).",
          "<code>bash make_practice.sh</code> then <code>find practice -name \"*.jpg\" | wc -l</code> → <strong>2</strong>.",
          "<code>tail -n +2 cities.csv | sort -t, -k3 -n -r | head -n 3</code> → <strong>Madrid 3280, Rome 2749, Paris 2103</strong>.",
        ],
      },
    },
    {
      id: "scripts",
      title: "Your first script and your environment",
      summary: "Save commands in a script, make it executable, use variables, and understand PATH, aliases and file permissions.",
      diagram: { type: "code", lang: "log-summary.sh", lines: ["#!/usr/bin/env bash", "log=\"${1:-server.log}\"", "echo \"Lines:  $(wc -l < \"$log\")\"", "echo \"Errors: $(grep -c ERROR \"$log\")\""], highlight: [0], notes: [[0, "Which program runs it"], [1, "First argument, or a default"]] },
      steps: [
        {
          title: "A script is a list of commands",
          body: `<p>Put commands in a text file such as <code>log-summary.sh</code>, one per line. The first line, <code>#!/usr/bin/env bash</code> (the “shebang”), says which program runs it. Run it with <code>bash log-summary.sh</code>, or make it executable first.</p>`,
        },
        {
          title: "Permissions and chmod",
          body: `<p><code>ls -l</code> shows permissions such as <code>-rw-r--r--</code>: read, write and execute flags for you, your group and everyone. <code>chmod +x log-summary.sh</code> adds execute permission, and then <code>./log-summary.sh</code> runs it; <code>./</code> means “in this folder”. (Git Bash on Windows handles permissions differently, so <code>bash script.sh</code> is the reliable way there.)</p>`,
        },
        {
          title: "Variables and arguments",
          body: `<p><code>name="value"</code> sets a variable (no spaces around =) and <code>$name</code> uses it; quote it as <code>"$name"</code> in case it contains spaces. <code>$1</code> is the first argument after the script's name; <code>\${1:-server.log}</code> means “the first argument, or server.log if there isn't one”. <code>$(command)</code> inserts a command's output.</p>`,
        },
        {
          title: "PATH and aliases",
          body: `<p>When you type a command, the shell looks for it in the folders listed in <code>$PATH</code> (<code>echo $PATH</code> shows them). An alias is a shortcut: <code>alias ll="ls -la"</code>. To keep it, add that line to <code>~/.bashrc</code> (Bash) or <code>~/.zshrc</code> (zsh on a Mac) and open a new terminal.</p>`,
        },
      ],
      quiz: [
        { q: "What does chmod +x script.sh do?", options: ["Deletes it", "Makes it executable", "Makes it read-only", "Hides it"], answer: 1, explain: "+x adds execute permission." },
        { q: "In a script, what does ${1:-server.log} mean?", options: ["Always server.log", "The first argument, or server.log if none was given", "The first line of server.log", "An error"], answer: 1, explain: "The :- part supplies a default value." },
      ],
      exercise: {
        title: "Write log-summary.sh",
        task: `<p>Write a script that takes a log file name (defaulting to server.log) and prints its number of lines, ERROR count and WARN count. Make it executable, run it, and add an alias <code>ll</code> for <code>ls -la</code> to your shell's startup file.</p>`,
        files: ["server.log"],
        solution: [
          "Create log-summary.sh with the four lines in the diagram, plus <code>echo \"Warnings: $(grep -c WARN \"$log\")\"</code>.",
          "<code>chmod +x log-summary.sh</code> then <code>./log-summary.sh</code> (or <code>bash log-summary.sh</code> in Git Bash).",
          "Output: Lines: <strong>80</strong>, Errors: <strong>8</strong>, Warnings: <strong>10</strong>.",
          "<code>echo 'alias ll=\"ls -la\"' &gt;&gt; ~/.bashrc</code> (or ~/.zshrc), then open a new terminal and type <code>ll</code>.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-backup",
      title: "Bonus project: a dated backup script",
      summary: "Write a script that copies a folder into a dated backup, keeps only the newest few backups, and logs what it did.",
      diagram: { type: "tree", root: "backups/", items: [["practice-2026-03-12", 1], ["practice-2026-03-13", 1], ["practice-2026-03-14", 1, true], ["older ones removed automatically", 2]], caption: "One dated copy per run, oldest pruned" },
      steps: [
        {
          title: "A dated name",
          body: `<p><code>stamp=$(date +%Y-%m-%d)</code> stores today's date in YYYY-MM-DD form, which sorts correctly as text. <code>dest="backups/practice-$stamp"</code> builds the folder name, and <code>mkdir -p backups &amp;&amp; cp -r practice "$dest"</code> makes the copy.</p>`,
        },
        {
          title: "Keep only the newest",
          body: `<p><code>ls -1d backups/practice-* | sort | head -n -3</code> lists every backup except the newest three (GNU systems; on a Mac use <code>tail -r</code> or a loop). Pipe those names to <code>xargs rm -r</code> to delete them, but run the list on its own first to check it.</p>`,
        },
        {
          title: "Log every run",
          body: `<p>Append a line to a log each time: <code>echo "$(date '+%Y-%m-%d %H:%M') backed up to $dest" &gt;&gt; backups/backup.log</code>. When something goes wrong weeks later, the log tells you what happened.</p>`,
        },
      ],
      quiz: [
        { q: "Why use YYYY-MM-DD in backup names?", options: ["It's shorter", "Names sort in date order as plain text", "It's required by cp", "It hides the files"], answer: 1, explain: "Year first, then month and day, makes alphabetical order match date order." },
        { q: "Why run the list of old backups on its own before piping it to rm?", options: ["It's faster", "To check exactly what would be deleted", "rm needs it", "To create a log"], answer: 1, explain: "Deletions can't be undone." },
      ],
      exercise: {
        title: "Write backup.sh",
        task: `<p>Write backup.sh to copy the practice folder into backups/practice-YYYY-MM-DD, log the run, and (after checking the list) remove all but the newest three backups. Test it by creating a few dated folders by hand.</p>`,
        files: ["make_practice.sh"],
        solution: [
          "Start with <code>#!/usr/bin/env bash</code> and <code>set -e</code> (stop at the first error).",
          "<code>stamp=$(date +%Y-%m-%d)</code>; <code>dest=\"backups/practice-$stamp\"</code>; <code>mkdir -p backups &amp;&amp; cp -r practice \"$dest\"</code>.",
          "Append the log line from step 3.",
          "Test pruning: <code>mkdir backups/practice-2026-01-0{1,2,3,4}</code>, run <code>ls -1d backups/practice-* | sort | head -n -3</code> to see the older ones, then add <code>| xargs rm -r</code>.",
        ],
      },
    },
    quizbank: [
      { q: "What does ls -la show that ls doesn't?", options: ["Only folders", "Details and hidden files", "File contents", "Deleted files"], answer: 1, explain: "-l gives details, -a includes hidden files." },
      { q: "What does ~ stand for in a path?", options: ["The root folder", "Your home folder", "The previous folder", "The current folder"], answer: 1, explain: "~ is shorthand for your home directory." },
      { q: "Which command creates nested folders in one go?", options: ["mkdir a/b/c", "mkdir -p a/b/c", "touch a/b/c", "md -r a/b/c"], answer: 1, explain: "-p creates parent folders as needed." },
      { q: "What does grep -c ERROR server.log print for the practice log?", options: ["8", "10", "18", "80"], answer: 0, explain: "Eight lines contain ERROR." },
      { q: "Which command stops a running command such as tail -f?", options: ["Ctrl+Z", "Ctrl+C", "Ctrl+Q", "Esc"], answer: 1, explain: "Ctrl+C interrupts the running command." },
      { q: "How many cities from Italy are in cities.csv?", options: ["3", "4", "2", "5"], answer: 1, explain: "Turin, Milan, Naples and Rome: cut -d, -f2 | sort | uniq -c shows 4." },
      { q: "What's PowerShell's equivalent of grep?", options: ["Find-Text", "Select-String", "Get-Grep", "Search-File"], answer: 1, explain: "Select-String searches text for patterns." },
      { q: "Why does running ./script.sh need chmod +x first?", options: ["To compile it", "Files aren't executable unless given execute permission", "To rename it", "To add the shebang"], answer: 1, explain: "The execute flag allows running the file directly." },
    ],
  },
  async makeFiles() {
    return {
      "make_practice.sh": MAKE_SH,
      "make_practice.ps1": MAKE_PS1.replace(/\n/g, "\r\n"),
      "server.log": serverLog(),
      "cities.csv": CITIES,
    };
  },
};
