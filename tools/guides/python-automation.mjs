import { k } from "./_helpers.mjs";
import { EXPENSES, NOTES, MAKE_FILES, ORGANIZE, REPORT, EXTRACT } from "./_python-files.mjs";

const crlf = (s) => s.replace(/\n/g, "\r\n");

export default {
  id: "python-automation",
  slug: "python-automation",
  title: "Python for Everyday Automation",
  software: "Python and Visual Studio Code",
  apps: ["Python", "VS Code"],
  intro:
    "Write small Python scripts that save you real time: tidy a messy folder, total a spreadsheet export, pull email addresses and dates out of text, and run it all from the command line or on a schedule. No programming experience needed; every script is short and explained line by line.",
  platformNote: "Shortcuts are shown for Visual Studio Code on Windows and Linux. On a Mac, use Cmd in place of Ctrl (the terminal shortcut is Ctrl+` on every system), and type python3 where the guide says python.",
  store: {
    category: "code",
    level: "Beginner",
    software: "Python 3 and Visual Studio Code (both free, for Windows, Mac and Linux)",
    softwareShort: "Python + VS Code",
    softwareHtml: `<p>This guide uses <strong>Python 3</strong> (3.10 or later) and <strong>Visual Studio Code</strong> with Microsoft's Python extension. All three are free and obtained separately: Python from python.org and VS Code from code.visualstudio.com. They are not included with the guide. Any other code editor works too, but the steps and shortcuts follow VS Code.</p>`,
    forWho: [
      "You do repetitive computer tasks, such as renaming files or totaling exports, and suspect a script could do them.",
      "You've never programmed, or tried once and got stuck on setup.",
      "You'd rather learn by building small, useful tools than by studying theory.",
    ],
    notFor: [
      "You want to build websites, apps or games. The guide is about small automation scripts.",
      "You already write Python comfortably. See Data Analysis with Python & pandas instead.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "make_practice_files.py", title: "Practice folder maker", desc: "Run once to create a messy-downloads folder of twelve empty files to organize." },
    { name: "expenses.csv", title: "Expenses export", desc: "Fourteen expenses for March with date, category, amount and note." },
    { name: "notes.txt", title: "Meeting notes", desc: "Notes with email addresses, phone numbers, dates and untidy spacing." },
    { name: "organize.py", title: "Solution: organize.py", desc: "The finished folder organizer from Lesson 3." },
    { name: "report.py", title: "Solution: report.py", desc: "The finished expenses report from Lesson 4." },
    { name: "extract.py", title: "Solution: extract.py", desc: "The finished text extractor from Lesson 5." },
  ],
  shortcuts: [
    { keys: "Ctrl+`", action: "Show or hide the terminal", app: "VS Code" },
    { keys: "Ctrl+Shift+P", action: "Command palette", app: "VS Code" },
    { keys: "Ctrl+P", action: "Quick open a file by name", app: "VS Code" },
    { keys: "Ctrl+S", action: "Save the file", app: "VS Code" },
    { keys: "Ctrl+/", action: "Comment or uncomment the line", app: "VS Code" },
    { keys: "Alt+ArrowUp", action: "Move the line up", app: "VS Code" },
    { keys: "Alt+ArrowDown", action: "Move the line down", app: "VS Code" },
    { keys: "Shift+Alt+ArrowDown", action: "Copy the line down", app: "VS Code" },
    { keys: "Ctrl+D", action: "Select the next match of the selection", app: "VS Code" },
    { keys: "Ctrl+Space", action: "Show suggestions", app: "VS Code" },
    { keys: "Ctrl+B", action: "Show or hide the sidebar", app: "VS Code" },
    { keys: "F2", action: "Rename a variable everywhere", app: "VS Code" },
    { keys: "F5", action: "Run with the debugger", app: "VS Code", practice: false, note: "Your browser uses this key to reload the page." },
  ],
  lessons: [
    {
      id: "setup",
      title: "Set up and run your first script",
      summary: "Install Python and VS Code, make a project folder, write a one-line script, and run it from the editor and the terminal.",
      diagram: { type: "terminal", shell: "terminal", lines: [["$", "python --version"], ["", "Python 3.12.10"], ["$", "python hello.py"], ["", "Hello from Python!"]], highlight: [2] },
      steps: [
        {
          title: "Install Python",
          body: `<p>Download Python 3 from python.org and run the installer. On Windows, tick <strong>Add python.exe to PATH</strong> on the first screen; it lets you run <code>python</code> from any terminal. On a Mac, Python 3 is run as <code>python3</code>.</p>`,
        },
        {
          title: "Install VS Code and the Python extension",
          body: `<p>Install Visual Studio Code, open it, select the Extensions icon in the left bar, search for <em>Python</em> and install the one published by Microsoft. Then choose <em>File › Open Folder</em> and open a new, empty folder for this guide, such as <em>automation</em>, and put the practice files in it.</p>`,
        },
        {
          title: "Write and run a script",
          body: `<p>Create a file called <code>hello.py</code> and type <code>print("Hello from Python!")</code>. Save with ${k("Ctrl", "S")}. Select the ▷ (<em>Run Python File</em>) button at the top right: the terminal opens at the bottom and shows the output.</p>`,
        },
        {
          title: "The terminal",
          body: `<p>Press ${k("Ctrl", "`")} to show the terminal. It's already in your project folder. Type <code>python --version</code> to check Python is found, then <code>python hello.py</code> to run your script by hand. Every script in this guide can be run either way.</p>`,
        },
      ],
      quiz: [
        { q: "Why tick 'Add python.exe to PATH' when installing on Windows?", options: ["It installs VS Code too", "So typing python in a terminal finds the program", "It makes Python faster", "It's needed for the Python extension to install"], answer: 1, explain: "PATH is the list of folders Windows searches for commands." },
        { q: "Which shortcut shows the terminal in VS Code?", options: ["Ctrl+Shift+P", "Ctrl+`", "Ctrl+P", "Ctrl+B"], answer: 1, explain: "Ctrl+` (the key left of 1) toggles the terminal panel." },
      ],
      exercise: {
        title: "Run the practice folder maker",
        task: `<p>Put the practice files in your project folder and run <strong>make_practice_files.py</strong> from the terminal. What does it print, and what appears in the Explorer?</p>`,
        files: ["make_practice_files.py"],
        solution: [
          `Open the folder in VS Code and press ${k("Ctrl", "`")} for the terminal.`,
          "Type <code>python make_practice_files.py</code> (<code>python3</code> on a Mac) and press Enter.",
          "It prints <code>Created 12 files in …messy-downloads</code>.",
          "In the Explorer, a messy-downloads folder appears with twelve files: photos, PDFs, text files, audio and a spreadsheet.",
        ],
      },
    },
    {
      id: "basics",
      title: "Python basics in ten minutes",
      summary: "Variables, text, numbers, lists, dictionaries, loops and decisions: the handful of ideas every script in this guide uses.",
      diagram: { type: "code", lang: "basics.py", lines: ["prices = [64.20, 58.75, 71.30]", "total = 0", "for price in prices:", "    total = total + price", "print(f\"Total: {total:.2f}\")"], highlight: [2, 3], notes: [[2, "Repeat for each item"], [3, "Indented = inside the loop"]] },
      steps: [
        {
          title: "Variables, text and numbers",
          body: `<p><code>name = "Amara"</code> stores text (a <em>string</em>); <code>count = 3</code> and <code>price = 64.20</code> store numbers. An f-string puts values into text: <code>print(f"{name} bought {count} books")</code>. Inside the braces, <code>{price:.2f}</code> shows two decimal places.</p>`,
        },
        {
          title: "Lists and loops",
          body: `<p>A list holds several values in order: <code>prices = [64.20, 58.75, 71.30]</code>. <code>for price in prices:</code> repeats the indented lines below it once per item. Python uses indentation (four spaces) to know which lines belong to the loop.</p>`,
        },
        {
          title: "Decisions with if",
          body: `<p><code>if total &gt; 150:</code> runs the indented lines only when the condition is true; <code>elif</code> checks another condition and <code>else</code> catches everything else. Compare with <code>==</code> (equal), <code>!=</code>, <code>&lt;</code>, <code>&gt;=</code>.</p>`,
        },
        {
          title: "Dictionaries",
          body: `<p>A dictionary maps keys to values: <code>totals = {"Groceries": 64.20}</code>. Read with <code>totals["Groceries"]</code>, add or change with <code>totals["Rent"] = 950</code>. <code>totals.get("Books", 0)</code> returns 0 instead of an error when the key is missing, which you'll use in Lesson 4.</p>`,
        },
      ],
      quiz: [
        { q: "How does Python know which lines are inside a for loop?", options: ["Curly braces", "Indentation", "The word end", "Semicolons"], answer: 1, explain: "Indented lines under the for line make up the loop's body." },
        { q: "What does totals.get(\"Books\", 0) return if there's no Books key?", options: ["An error", "None", "0", "\"Books\""], answer: 2, explain: "get returns the default you give when the key is missing." },
      ],
      exercise: {
        title: "Total the groceries",
        task: `<p>Write <code>basics.py</code> with a list of the five grocery amounts from <strong>expenses.csv</strong> (64.20, 58.75, 71.30, 49.90, 66.10). Loop through them to add up the total, print it with two decimals, and print “Over budget” if it's more than 300.</p>`,
        files: ["expenses.csv"],
        solution: [
          "<code>prices = [64.20, 58.75, 71.30, 49.90, 66.10]</code> and <code>total = 0</code>.",
          "<code>for price in prices:</code>, then on an indented line <code>total = total + price</code>.",
          'After the loop (not indented): <code>print(f"Groceries: {total:.2f}")</code> prints <strong>Groceries: 310.25</strong>.',
          'Add <code>if total &gt; 300:</code> and, indented, <code>print("Over budget")</code>: it prints, because 310.25 is more than 300.',
        ],
      },
    },
    {
      id: "files",
      title: "Tidy a folder with pathlib",
      summary: "List the files in a folder, decide where each one goes by its extension, preview the changes, then move them for real.",
      diagram: { type: "tree", root: "messy-downloads", items: [["Images (4)", 1, true], ["Documents (6)", 1], ["Audio (2)", 1], ["path.suffix decides the folder", 2]], caption: "12 files sorted by extension" },
      steps: [
        {
          title: "Paths",
          body: `<p><code>from pathlib import Path</code> gives you <code>Path</code> objects for files and folders. <code>folder = Path("messy-downloads")</code>; <code>folder / "notes.txt"</code> builds a path inside it. A path knows its parts: <code>.name</code> (notes.txt), <code>.stem</code> (notes) and <code>.suffix</code> (.txt).</p>`,
        },
        {
          title: "List a folder",
          body: `<p><code>for path in folder.iterdir():</code> loops over everything in the folder. Check <code>path.is_file()</code> to skip subfolders, and <code>sorted(...)</code> around <code>iterdir()</code> to get them in name order.</p>`,
        },
        {
          title: "Decide, then preview",
          body: `<p>A dictionary maps extensions to folder names: <code>FOLDERS = {".jpg": "Images", ".pdf": "Documents", …}</code>. <code>FOLDERS.get(path.suffix.lower(), "Other")</code> picks the folder, with “Other” for anything unknown. Print what <em>would</em> happen first; scripts that move files should always have a preview mode.</p>`,
        },
        {
          title: "Move for real",
          body: `<p><code>target.mkdir(exist_ok=True)</code> makes the folder if it isn't there; <code>path.rename(target / path.name)</code> moves the file. In <strong>organize.py</strong>, moving only happens when you run <code>python organize.py --move</code>; <code>"--move" in sys.argv</code> checks what you typed.</p>`,
        },
      ],
      quiz: [
        { q: "What is Path(\"recipe.txt\").suffix?", options: ["recipe", ".txt", "txt", "recipe.txt"], answer: 1, explain: ".suffix includes the dot." },
        { q: "Why does organize.py print a preview before moving anything?", options: ["Python requires it", "So you can check the plan before files actually move", "It's faster", "To create the folders"], answer: 1, explain: "A dry run catches mistakes before they change your files." },
      ],
      exercise: {
        title: "Organize messy-downloads",
        task: `<p>Write (or read through) <strong>organize.py</strong>. Run it without <code>--move</code> to preview, then with it. How many files end up in Images, Documents and Audio? Finally, run make_practice_files.py again to start over.</p>`,
        files: ["organize.py", "make_practice_files.py"],
        solution: [
          "<code>python organize.py</code> prints twelve lines such as <code>budget.xlsx -&gt; Documents/</code> and ends with “12 files would be moved.”",
          "<code>python organize.py --move</code> moves them and prints “12 files moved.”",
          "<strong>Images 4</strong> (two holiday photos, the screenshot and garden-plan.png), <strong>Documents 6</strong> (three PDFs, two text files and the spreadsheet) and <strong>Audio 2</strong>.",
          "<code>python make_practice_files.py</code> deletes the folder and makes a fresh messy one.",
        ],
      },
    },
    {
      id: "csv",
      title: "Reports from a CSV file",
      summary: "Read a spreadsheet export with the csv module, total amounts by category, and write the summary to a new CSV file.",
      diagram: { type: "table", head: ["category", "total"], rows: [["Rent", "950.00"], ["Groceries", "310.25"], ["Utilities", "96.15"], ["Eating out", "60.25"]], highlight: { rows: [1] }, caption: "summary.csv, written by report.py" },
      steps: [
        {
          title: "Open and read",
          body: `<p><code>with open("expenses.csv", newline="", encoding="utf-8") as f:</code> opens the file and closes it when the indented block ends. Inside, <code>csv.DictReader(f)</code> turns each line into a dictionary keyed by the header row, so you can write <code>row["amount"]</code>.</p>`,
        },
        {
          title: "Text to numbers",
          body: `<p>Everything read from a CSV is text. <code>float(row["amount"])</code> turns "64.20" into the number 64.2. Forgetting this is the most common CSV bug: "64.20" + "58.75" joins the text instead of adding.</p>`,
        },
        {
          title: "Totals by category",
          body: `<p>Start with an empty dictionary, <code>totals = {}</code>, and for each row: <code>totals[cat] = totals.get(cat, 0) + amount</code>. The first time a category appears, <code>get</code> supplies 0; after that it adds to the running total.</p>`,
        },
        {
          title: "Write the summary",
          body: `<p>Open <code>summary.csv</code> with <code>"w"</code> (write) and use <code>csv.writer(f)</code>: <code>writer.writerow(["category", "total"])</code> for the header, then one row per category. Sorting by total, largest first, uses <code>sorted(totals.items(), key=lambda item: item[1], reverse=True)</code>.</p>`,
        },
      ],
      quiz: [
        { q: "What type is row[\"amount\"] when read with csv.DictReader?", options: ["A number", "Text (a string)", "A list", "A date"], answer: 1, explain: "CSV values arrive as strings; convert with float() or int()." },
        { q: "What does opening a file with \"w\" do to an existing file?", options: ["Adds to the end", "Replaces its contents", "Opens it read-only", "Makes a backup"], answer: 1, explain: "\"w\" overwrites; \"a\" appends." },
      ],
      exercise: {
        title: "Write report.py",
        task: `<p>Write <strong>report.py</strong> to total <strong>expenses.csv</strong> by category, print a neat table, and write summary.csv sorted by total. What's the total for all categories, and which category is second largest?</p>`,
        files: ["expenses.csv", "report.py"],
        solution: [
          "Read with <code>csv.DictReader</code>, convert with <code>float()</code>, and build <code>totals</code> with <code>get</code>.",
          'Print each line with an aligned f-string: <code>print(f"{category:&lt;12}{total:&gt;10.2f}")</code>.',
          "Write summary.csv with <code>csv.writer</code>, header first.",
          "Totals: Rent 950.00, <strong>Groceries 310.25</strong> (second), Utilities 96.15, Eating out 60.25, Transport 57.40, Books 22.00. All: <strong>1496.05</strong>.",
        ],
      },
    },
    {
      id: "text",
      title: "Find things in text with regular expressions",
      summary: "Read a text file, find email addresses, phone numbers and dates with patterns, and write a tidied copy.",
      diagram: { type: "code", lang: "patterns", lines: ["[\\w.+-]+@[\\w-]+\\.[\\w.-]+   email", "\\b\\d{3}-\\d{4}\\b             phone", "\\b\\d{4}-\\d{2}-\\d{2}\\b       date", " {2,}                      2+ spaces"], highlight: [2], notes: [] },
      steps: [
        {
          title: "Read the whole file",
          body: `<p><code>text = Path("notes.txt").read_text(encoding="utf-8")</code> reads a file into one string. <code>text.splitlines()</code> gives a list of lines; <code>"seed" in text</code> checks whether a word appears; <code>text.replace("old", "new")</code> swaps text.</p>`,
        },
        {
          title: "Patterns",
          body: `<p>A regular expression describes text by its shape. <code>\\d</code> is any digit, <code>{4}</code> means exactly four of the thing before it, <code>\\w</code> is a letter, digit or underscore, <code>+</code> means one or more, and <code>\\b</code> marks the edge of a word. So <code>\\d{4}-\\d{2}-\\d{2}</code> matches dates like 2026-03-11.</p>`,
        },
        {
          title: "findall",
          body: `<p><code>import re</code>, then <code>re.findall(pattern, text)</code> returns a list of every match. Write patterns as raw strings, <code>r"\\d{3}-\\d{4}"</code>, so Python leaves the backslashes alone.</p>`,
        },
        {
          title: "Clean up with sub",
          body: `<p><code>re.sub(r" {2,}", " ", text)</code> replaces every run of two or more spaces with one. Write the result to a new file with <code>Path("notes-tidy.txt").write_text(tidy, encoding="utf-8")</code>, so the original stays untouched.</p>`,
        },
      ],
      quiz: [
        { q: "What does the pattern \\d{3}-\\d{4} match?", options: ["Any 7 characters", "Three digits, a dash and four digits", "A date", "An email address"], answer: 1, explain: "\\d{3} is exactly three digits, then a literal dash, then four digits." },
        { q: "Why write patterns as r\"…\" strings?", options: ["They run faster", "So backslashes reach the regex engine unchanged", "They're required by findall", "To ignore case"], answer: 1, explain: "Raw strings stop Python treating backslashes as its own escapes." },
      ],
      exercise: {
        title: "Extract contacts and dates",
        task: `<p>Write <strong>extract.py</strong> to print every email address, phone number and YYYY-MM-DD date in <strong>notes.txt</strong>, and save a copy with the extra spaces removed. How many of each did you find?</p>`,
        files: ["notes.txt", "extract.py"],
        solution: [
          "Read the file with <code>read_text</code>.",
          '<code>re.findall(r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+", text)</code> finds <strong>3 emails</strong>: two @maple-garden.test addresses and sales@northside-supplies.test.',
          '<code>re.findall(r"\\b\\d{3}-\\d{4}\\b", text)</code> finds <strong>2 phone numbers</strong> (555-0142 and 555-0199).',
          '<code>re.findall(r"\\b\\d{4}-\\d{2}-\\d{2}\\b", text)</code> finds <strong>2 dates</strong> (2026-03-11 and 2026-03-18); the “4 March 2026” style isn\'t matched by this pattern.',
          '<code>re.sub(r" {2,}", " ", text)</code> and <code>write_text</code> save notes-tidy.txt with single spaces.',
        ],
      },
    },
    {
      id: "reuse",
      title: "Functions, errors and running on a schedule",
      summary: "Wrap code in functions, handle missing files gracefully, accept options from the command line, and run a script automatically.",
      diagram: { type: "flow", nodes: ["def a function", "try / except", "Command-line options", "Scheduled run"], highlight: 1, title: "From a one-off script to a reliable tool" },
      steps: [
        {
          title: "Functions",
          body: `<p><code>def organize(folder, move=False):</code> names a block of code you can run again with different inputs; <code>return count</code> sends a result back. <code>move=False</code> is a default the caller can override. The line <code>if __name__ == "__main__":</code> at the bottom runs only when the file is run directly, not when another script imports it.</p>`,
        },
        {
          title: "Handle errors",
          body: `<p>If expenses.csv is missing, <code>open()</code> raises <code>FileNotFoundError</code> and the script stops with a long message. Wrap it: <code>try:</code> the risky lines, <code>except FileNotFoundError:</code> print a clear message instead. Catch the specific error you expect, not every error.</p>`,
        },
        {
          title: "Options from the command line",
          body: `<p><code>sys.argv</code> is the list of words typed after <code>python</code>: for <code>python report.py april.csv</code>, <code>sys.argv[1]</code> is <code>"april.csv"</code>. For named options and automatic help, the <code>argparse</code> module builds a proper interface in a few lines.</p>`,
        },
        {
          title: "Run on a schedule",
          body: `<p>On Windows, <em>Task Scheduler</em> can run <code>python C:\\path\\to\\organize.py --move</code> every evening (<em>Create Basic Task</em>, then choose a trigger and <em>Start a program</em>). On a Mac or Linux, a cron line does the same. Use full paths in scheduled tasks, because they don't start in your project folder.</p>`,
        },
      ],
      quiz: [
        { q: "What does if __name__ == \"__main__\": do?", options: ["Makes the script run faster", "Runs the block only when the file is run directly", "Defines the main function", "Handles errors"], answer: 1, explain: "Importing the file from another script skips that block." },
        { q: "For python report.py april.csv, what is sys.argv[1]?", options: ["python", "report.py", "april.csv", "1"], answer: 2, explain: "sys.argv[0] is the script name; arguments follow." },
      ],
      exercise: {
        title: "A report for any file",
        task: `<p>Change report.py so the CSV file name can be given on the command line (defaulting to expenses.csv), and so a missing file prints “File not found: …” instead of an error.</p>`,
        files: ["report.py", "expenses.csv"],
        solution: [
          "At the top: <code>import sys</code>.",
          '<code>name = sys.argv[1] if len(sys.argv) &gt; 1 else "expenses.csv"</code>',
          "Wrap the reading part in <code>try:</code> and add <code>except FileNotFoundError:</code> with <code>print(f\"File not found: {name}\")</code> and <code>sys.exit(1)</code>.",
          "<code>python report.py</code> works as before; <code>python report.py april.csv</code> prints “File not found: april.csv”.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-renamer",
      title: "Bonus project: a safe photo renamer",
      summary: "Rename photos to a consistent date-based pattern, avoid overwriting files with the same name, and keep a log so every rename can be undone.",
      diagram: { type: "table", head: ["before", "after"], rows: [["garden-plan.png", "2026-03-photo-001.png"], ["holiday-photo-01.jpg", "2026-03-photo-002.jpg"], ["holiday-photo-02.jpg", "2026-03-photo-003.jpg"]], highlight: { cols: [1] }, caption: "A pattern, a counter and a log" },
      steps: [
        {
          title: "Pick the files and the pattern",
          body: `<p>Collect image files with <code>[p for p in folder.iterdir() if p.suffix.lower() in {".jpg", ".png"}]</code>, sorted by name. The new name uses a counter padded to three digits: <code>f"2026-03-photo-{n:03}{p.suffix.lower()}"</code>.</p>`,
        },
        {
          title: "Never overwrite",
          body: `<p>Before renaming, check <code>if new_path.exists():</code> and skip (or add a suffix). <code>rename</code> on Windows refuses to overwrite, but on Mac and Linux it silently replaces the other file, so the check matters.</p>`,
        },
        {
          title: "Log and undo",
          body: `<p>Write each rename to <code>rename-log.csv</code> as old name and new name. An <code>undo.py</code> script reads the log and renames each file back, newest first. With a log, a renaming script stops being scary.</p>`,
        },
      ],
      quiz: [
        { q: "What does f\"{7:03}\" produce?", options: ["7", "007", "700", "0.07"], answer: 1, explain: ":03 pads the number with zeros to three digits." },
        { q: "Why keep a log of renames?", options: ["Python requires it", "So an undo script can rename every file back", "To speed up renaming", "To count files"], answer: 1, explain: "The log records old and new names, so the change can be reversed." },
      ],
      exercise: {
        title: "Rename and undo",
        task: `<p>Recreate messy-downloads, then write rename_photos.py to rename its four images to the 2026-03-photo-NNN pattern with a log, and undo.py to reverse it. Check the folder before and after each.</p>`,
        files: ["make_practice_files.py"],
        solution: [
          "Collect the images: garden-plan.png, holiday-photo-01.jpg, holiday-photo-02.jpg and screenshot 2026-03-02.png (sorted by name).",
          "Loop with <code>enumerate(images, start=1)</code>, build the new name, skip if it exists, rename, and append <code>[old, new]</code> to a list.",
          "Write the list with <code>csv.writer</code> to rename-log.csv: four rows, 2026-03-photo-001.png to 2026-03-photo-004.png.",
          "undo.py: read the log, <code>reversed()</code> the rows, and rename each new name back to its old name.",
        ],
      },
    },
    quizbank: [
      { q: "Which command checks the installed Python version?", options: ["python -v", "python --version", "py version", "pip --python"], answer: 1, explain: "python --version prints e.g. Python 3.12.10 (python3 on a Mac)." },
      { q: "What does len([4, 8, 15]) return?", options: ["3", "27", "15", "[4, 8, 15]"], answer: 0, explain: "len counts the items in a list." },
      { q: "Which loop line goes through every file in a folder?", options: ["for path in folder:", "for path in folder.iterdir():", "while folder.next():", "folder.loop()"], answer: 1, explain: "iterdir() yields every entry in the folder." },
      { q: "What does float(\"58.75\") + float(\"64.20\") give?", options: ["\"58.7564.20\"", "122.95", "An error", "12295"], answer: 1, explain: "Converting both strings to numbers lets them be added." },
      { q: "In a regex, what does + mean?", options: ["Add", "One or more of the previous item", "Exactly one", "Optional"], answer: 1, explain: "+ repeats the previous item one or more times." },
      { q: "Which error does opening a missing file raise?", options: ["ValueError", "FileNotFoundError", "KeyError", "TypeError"], answer: 1, explain: "Catch FileNotFoundError to handle a missing file." },
      { q: "Which VS Code shortcut comments out the current line?", options: ["Ctrl+/", "Ctrl+K", "Ctrl+#", "Alt+C"], answer: 0, explain: "Ctrl+/ toggles a # comment in Python files." },
      { q: "What does \"--move\" in sys.argv check?", options: ["Whether a file called --move exists", "Whether --move was typed after the script name", "Whether files have moved", "Whether the folder is empty"], answer: 1, explain: "sys.argv holds the words from the command line." },
    ],
  },
  async makeFiles() {
    return {
      "make_practice_files.py": crlf(MAKE_FILES),
      "expenses.csv": crlf(EXPENSES),
      "notes.txt": crlf(NOTES),
      "organize.py": crlf(ORGANIZE),
      "report.py": crlf(REPORT),
      "extract.py": crlf(EXTRACT),
    };
  },
};
