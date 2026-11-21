import { k } from "./_helpers.mjs";

const ORDERS = [
  ["Order", "Customer", "Region", "Amount", "Status"],
  ["A101", "Ortiz", "North", 420, "Paid"],
  ["A102", "Chen", "South", 780, "Open"],
  ["A103", "Gray", "East", 150, "Paid"],
  ["A104", "Haddad", "West", 990, "Paid"],
  ["A105", "Iyer", "North", 310, "Open"],
  ["A106", "Jensen", "South", 560, "Paid"],
  ["A107", "Kowal", "East", 95, "Open"],
  ["A108", "Larsen", "West", 640, "Paid"],
  ["A109", "Mensah", "North", 205, "Paid"],
  ["A110", "Novak", "South", 870, "Open"],
];

const BAS = `Attribute VB_Name = "PracticeMacros"
Option Explicit

' Practice module for Automating Excel with Macros & VBA.
' Import it in the VBA editor with File > Import File (Ctrl+M).

' Lesson 3: format the header row of the active sheet.
Sub FormatHeader()
    With ActiveSheet.Range("A1:E1")
        .Font.Bold = True
        .Interior.Color = RGB(230, 230, 230)
    End With
    ActiveSheet.Columns("A:E").AutoFit
End Sub

' Lesson 4: highlight every order of 500 or more.
Sub HighlightLargeOrders()
    Dim lastRow As Long, r As Long
    lastRow = Cells(Rows.Count, "A").End(xlUp).Row
    For r = 2 To lastRow
        If Cells(r, "D").Value >= 500 Then
            Cells(r, "D").Interior.Color = RGB(255, 235, 150)
        End If
    Next r
End Sub

' Lesson 5: report how many orders are open.
Sub CountOpenOrders()
    Dim n As Long
    n = Application.WorksheetFunction.CountIf(Range("E:E"), "Open")
    MsgBox n & " orders are open.", vbInformation, "Open orders"
End Sub

' Lesson 6: a worksheet function you can use in any cell, e.g. =WITHTAX(D2, 8%)
Function WITHTAX(amount As Double, rate As Double) As Double
    WITHTAX = Round(amount * (1 + rate), 2)
End Function
`;

export default {
  id: "excel-vba-macros",
  slug: "excel-vba-macros",
  title: "Automating Excel with Macros & VBA",
  software: "Excel",
  apps: ["Excel", "VBA editor"],
  intro:
    "Automate repetitive Excel work with macros: record your first macro, read and edit the code in the VBA editor, work with ranges and sheets, use variables, loops and decisions, add buttons and messages, and write your own worksheet functions.",
  platformNote: "Shortcuts are shown for Excel for Windows. Excel for Mac also runs VBA, but the editor's menus and several shortcuts differ; use Option+F11 (or Fn+Option+F11) to open the editor on a Mac.",
  store: {
    category: "office",
    level: "Intermediate",
    software: "Microsoft Excel for Windows (Microsoft 365 or Excel 2021 and later)",
    softwareShort: "Excel",
    softwareHtml: `<p>This guide is written for <strong>Microsoft Excel for Windows</strong> (Microsoft 365, Excel 2021 or Excel 2024). VBA also works in Excel for Mac, but the editor looks different and some steps change. Macros don't run in Excel for the web. Excel is not included with the guide; you need your own copy or subscription, obtained separately from Microsoft.</p>`,
    forWho: [
      "You repeat the same formatting or tidying steps in Excel every week.",
      "You're comfortable with formulas and want to start reading and writing simple code.",
      "You've recorded a macro before but couldn't change what it does.",
    ],
    notFor: [
      "You want Office Scripts, Python in Excel or Power Automate. The guide covers VBA only.",
      "You're new to Excel. Start with Spreadsheet Formulas & Functions.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "weekly-orders.xlsx", title: "Orders workbook", desc: "Ten unformatted orders to practice recording and writing macros on. Save it as a macro-enabled workbook (.xlsm) once you add code." },
    { name: "PracticeMacros.bas", title: "Practice module", desc: "The finished macros from the lessons as a VBA module to import and compare with your own." },
  ],
  shortcuts: [
    { keys: "Alt+F11", action: "Open the VBA editor (or switch back to Excel)", app: "Excel" },
    { keys: "Alt+F8", action: "Open the Macro dialog", app: "Excel" },
    { keys: "F8", action: "Step into: run the next line (VBA editor)", app: "VBA editor" },
    { keys: "Shift+F8", action: "Step over (VBA editor)", app: "VBA editor" },
    { keys: "F9", action: "Toggle a breakpoint (VBA editor)", app: "VBA editor" },
    { keys: "Ctrl+G", action: "Show the Immediate window (VBA editor)", app: "VBA editor" },
    { keys: "F4", action: "Show the Properties window (VBA editor)", app: "VBA editor" },
    { keys: "F7", action: "Show the code window (VBA editor)", app: "VBA editor" },
    { keys: "Ctrl+Space", action: "Complete the word you're typing (VBA editor)", app: "VBA editor" },
    { keys: "Ctrl+J", action: "List properties and methods (VBA editor)", app: "VBA editor" },
    { keys: "Ctrl+M", action: "Import a module file (VBA editor)", app: "VBA editor" },
    { keys: "Alt+Q", action: "Close the editor and return to Excel", app: "VBA editor" },
    { keys: "F5", action: "Run the macro the cursor is in (VBA editor)", app: "VBA editor", practice: false, note: "Your browser uses this key to reload the page." },
    { keys: "Ctrl+R", action: "Show the Project Explorer (VBA editor)", app: "VBA editor", practice: false, note: "Your browser uses this shortcut to reload the page." },
  ],
  lessons: [
    {
      id: "record",
      title: "Record your first macro",
      summary: "Turn on the Developer tab, record a macro, run it again, and save the workbook so the macro is kept.",
      diagram: { type: "flow", nodes: ["Record Macro", "Do the steps", "Stop Recording", "Run it again"], highlight: 1, title: "The macro recorder writes code while you work" },
      steps: [
        {
          title: "Show the Developer tab",
          body: `<p>Choose <em>File › Options › Customize Ribbon</em>, tick <em>Developer</em> in the right-hand list and select <em>OK</em>. The Developer tab holds the macro recorder, the VBA editor button and the controls you'll add later.</p>`,
        },
        {
          title: "Record",
          body: `<p>Open <strong>weekly-orders.xlsx</strong>, then <em>Developer › Record Macro</em>. Name it <code>FormatOrders</code> (no spaces), store it in <em>This Workbook</em> and select <em>OK</em>. Now do the work once: make row 1 bold, fill it gray, select columns A to E and autofit them. Choose <em>Developer › Stop Recording</em>.</p>`,
        },
        {
          title: "Run it",
          body: `<p>Undo your formatting (or open a fresh copy), then press ${k("Alt", "F8")}, select <code>FormatOrders</code> and choose <em>Run</em>. Excel repeats every step. Recorded macros remember exact cells; to record moves relative to the active cell instead, select <em>Use Relative References</em> before recording.</p>`,
        },
        {
          title: "Save as .xlsm and macro security",
          body: `<p>An ordinary .xlsx file can't hold macros. Choose <em>File › Save As</em> and pick <em>Excel Macro-Enabled Workbook (*.xlsm)</em>. When you reopen it, Excel may show a bar asking you to <em>Enable Content</em>. Files downloaded from the internet are blocked from running macros: right-click the file in File Explorer, choose <em>Properties</em> and tick <em>Unblock</em>, but only for files you trust.</p>`,
        },
      ],
      quiz: [
        { q: "Why save the workbook as .xlsm?", options: ["It's smaller", "Only macro-enabled formats keep VBA code", "It opens faster", "It's required for formulas"], answer: 1, explain: "Saving as .xlsx removes the macros; .xlsm keeps them." },
        { q: "Which shortcut opens the Macro dialog to run a macro?", options: ["Alt+F11", "Alt+F8", "Ctrl+F8", "F5"], answer: 1, explain: "Alt+F8 lists the macros you can run; Alt+F11 opens the editor." },
      ],
      exercise: {
        title: "Record a formatting macro",
        task: `<p>Record a macro named <code>FormatOrders</code> on <strong>weekly-orders.xlsx</strong> that makes the header bold with a gray fill, formats column D as currency and autofits A:E. Clear the formatting, run the macro to check it, and save as .xlsm.</p>`,
        files: ["weekly-orders.xlsx"],
        solution: [
          "<em>Developer › Record Macro</em>, name <code>FormatOrders</code>, store in <em>This Workbook</em>, <em>OK</em>.",
          "Select A1:E1, press Ctrl+B, and choose a gray fill. Select column D and choose <em>Currency</em> in <em>Home › Number Format</em>. Select A:E and double-click a column border to autofit.",
          "<em>Developer › Stop Recording</em>.",
          "<em>Home › Clear › Clear Formats</em> on A:E, then Alt+F8, select FormatOrders, <em>Run</em>.",
          "<em>File › Save As</em>, type <em>Excel Macro-Enabled Workbook (*.xlsm)</em>, <em>Save</em>.",
        ],
      },
    },
    {
      id: "editor",
      title: "The VBA editor",
      summary: "Find your recorded code, read a Sub from top to bottom, run and step through it, and use the Immediate window.",
      diagram: { type: "code", lang: "Module1", lines: ["Sub FormatOrders()", "    Range(\"A1:E1\").Select", "    Selection.Font.Bold = True", "    Columns(\"A:E\").AutoFit", "End Sub"], highlight: [0, 4], notes: [[0, "A macro is a Sub"], [2, "Object.Property = value"]] },
      steps: [
        {
          title: "Open the editor",
          body: `<p>Press ${k("Alt", "F11")}. On the left, the <em>Project Explorer</em> lists open workbooks; expand yours and open <em>Modules › Module1</em>: that's where the recorder put your macro. The big area on the right is the code window.</p>`,
        },
        {
          title: "Read a Sub",
          body: `<p>A macro starts with <code>Sub FormatOrders()</code> and ends with <code>End Sub</code>. Each line in between is one instruction, mostly in the form <code>Object.Property = value</code>, such as <code>Selection.Font.Bold = True</code>. Lines starting with an apostrophe are comments that VBA ignores.</p>`,
        },
        {
          title: "Run and step",
          body: `<p>Click anywhere inside the Sub and choose <em>Run › Run Sub/UserForm</em> to run it. To watch it line by line, press ${k("F8")}: the next line turns yellow, and each press runs it. Arrange the editor beside Excel to see each step happen. Press ${k("F9")} on a line to set a breakpoint where running stops.</p>`,
        },
        {
          title: "The Immediate window",
          body: `<p>Press ${k("Ctrl", "G")} to open the Immediate window. Type <code>?Range("D2").Value</code> and press Enter to print a value, or <code>Range("A1").Select</code> to run a single instruction. In your code, <code>Debug.Print</code> writes to this window, which is handy for checking what a variable holds.</p>`,
        },
      ],
      quiz: [
        { q: "What does pressing F8 in the VBA editor do?", options: ["Runs the whole macro", "Runs the next line only", "Saves the module", "Opens Excel"], answer: 1, explain: "F8 steps through the code one line at a time." },
        { q: "In the Immediate window, what does ?Range(\"D2\").Value do?", options: ["Changes D2", "Prints D2's value", "Selects D2", "Deletes D2"], answer: 1, explain: "The question mark prints the result of the expression." },
      ],
      exercise: {
        title: "Tidy the recorded code",
        task: `<p>Open your recorded <code>FormatOrders</code> macro. Step through it with F8 and watch each line act. Then delete the lines the recorder added that you don't need (scroll and selection moves), and run it again to check it still works.</p>`,
        files: ["weekly-orders.xlsx"],
        solution: [
          "Alt+F11, then open <em>Modules › Module1</em>.",
          "Click inside the Sub and press F8 repeatedly; each yellow line runs when you press again.",
          "Delete lines such as <code>ActiveWindow.ScrollColumn = 1</code> or extra <code>Range(\"A1\").Select</code> lines that only move the view.",
          "Combine a Select line and the Selection line under it, for example <code>Range(\"A1:E1\").Font.Bold = True</code>.",
          "Clear the formats in Excel and run the macro again from Alt+F8.",
        ],
      },
    },
    {
      id: "objects",
      title: "Ranges, sheets and properties",
      summary: "Refer to cells, ranges and worksheets directly in code, change their properties without selecting them, and group changes with With.",
      diagram: { type: "tree", root: "Application (Excel)", items: [["Workbooks(\"weekly-orders.xlsm\")", 1], ["Worksheets(\"Orders\")", 2], ["Range(\"A1:E1\")", 3, true], [".Font.Bold = True", 4], [".Interior.Color = RGB(…)", 4]], caption: "Objects contain objects; properties describe them" },
      steps: [
        {
          title: "Range and Cells",
          body: `<p><code>Range("D2")</code> and <code>Range("A1:E1")</code> refer to cells by address. <code>Cells(2, 4)</code> refers to row 2, column 4, which is also D2; numbers are easy to change in a loop. <code>Cells(2, "D")</code> works too.</p>`,
        },
        {
          title: "No need to select",
          body: `<p>The recorder selects cells before changing them, but code doesn't have to: <code>Range("A1:E1").Font.Bold = True</code> is shorter and faster than selecting first. To work on a particular sheet, name it: <code>Worksheets("Orders").Range("A1").Value = "Order"</code>.</p>`,
        },
        {
          title: "Properties and methods",
          body: `<p>A <strong>property</strong> is a setting you read or change (<code>.Value</code>, <code>.Font.Bold</code>, <code>.Interior.Color</code>). A <strong>method</strong> is an action (<code>.AutoFit</code>, <code>.ClearContents</code>, <code>.Copy</code>). Type a dot after an object and the editor lists both; press ${k("Ctrl", "J")} to show the list again.</p>`,
        },
        {
          title: "With blocks",
          body: `<p>When several lines change the same object, wrap them in <code>With</code>:</p><p><code>With Range("A1:E1")</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;.Font.Bold = True</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;.Interior.Color = RGB(230, 230, 230)</code><br><code>End With</code></p><p>Each line starting with a dot applies to the object named on the With line.</p>`,
        },
      ],
      quiz: [
        { q: "Which reference means the same cell as Range(\"D2\")?", options: ["Cells(4, 2)", "Cells(2, 4)", "Cells(\"D\", 2)", "Range(2, 4)"], answer: 1, explain: "Cells takes the row first, then the column: row 2, column 4." },
        { q: "Which of these is a method rather than a property?", options: [".Value", ".Font.Bold", ".AutoFit", ".Interior.Color"], answer: 2, explain: "AutoFit performs an action; the others are settings." },
      ],
      exercise: {
        title: "Write FormatHeader by hand",
        task: `<p>Insert a new module (<em>Insert › Module</em>) and write a <code>FormatHeader</code> macro, without selecting anything, that makes A1:E1 bold with a light gray fill and autofits columns A to E. Run it on the Orders sheet.</p>`,
        files: ["weekly-orders.xlsx", "PracticeMacros.bas"],
        solution: [
          "In the editor, <em>Insert › Module</em>.",
          "Type <code>Sub FormatHeader()</code> and press Enter; the editor adds <code>End Sub</code>.",
          'Inside, type <code>With ActiveSheet.Range("A1:E1")</code>, then <code>.Font.Bold = True</code>, <code>.Interior.Color = RGB(230, 230, 230)</code> and <code>End With</code>.',
          'Add <code>ActiveSheet.Columns("A:E").AutoFit</code> before <code>End Sub</code>.',
          "Click inside it and choose <em>Run › Run Sub/UserForm</em>. Compare with FormatHeader in PracticeMacros.bas.",
        ],
      },
    },
    {
      id: "loops",
      title: "Variables, loops and decisions",
      summary: "Store values in variables, find the last row of data, loop through every row, and act only on rows that meet a condition.",
      diagram: { type: "flow", nodes: ["Find last row", "For each row", "If amount ≥ 500", "Highlight cell", "Next row"], highlight: 2, title: "A loop with a decision inside" },
      steps: [
        {
          title: "Variables",
          body: `<p>Declare a variable with <code>Dim</code> and a type: <code>Dim total As Double</code>, <code>Dim r As Long</code>, <code>Dim name As String</code>. Put <code>Option Explicit</code> at the top of the module so VBA warns you about misspelled variable names instead of silently creating new ones.</p>`,
        },
        {
          title: "Find the last row",
          body: `<p>Data grows, so don't hard-code row 11. This line starts at the bottom of column A and jumps up to the last filled cell, like pressing ${k("Ctrl", "ArrowUp")}:</p><p><code>lastRow = Cells(Rows.Count, "A").End(xlUp).Row</code></p>`,
        },
        {
          title: "For…Next",
          body: `<p><code>For r = 2 To lastRow</code> … <code>Next r</code> runs the lines in between once for every row from 2 to the last. Inside, <code>Cells(r, "D")</code> means column D of the current row.</p>`,
        },
        {
          title: "If…Then",
          body: `<p>Inside the loop, act only when a condition is true:</p><p><code>If Cells(r, "D").Value >= 500 Then</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;Cells(r, "D").Interior.Color = RGB(255, 235, 150)</code><br><code>End If</code></p><p>Add <code>Else</code> for what happens otherwise. Step through with ${k("F8")} and hover over <code>r</code> to see its value change.</p>`,
        },
      ],
      quiz: [
        { q: "What does Option Explicit do?", options: ["Speeds up the code", "Requires every variable to be declared", "Hides the code", "Runs the macro automatically"], answer: 1, explain: "With Option Explicit, an undeclared or misspelled variable is reported as an error." },
        { q: "With the practice data, how many orders does a ≥ 500 highlight loop mark?", options: ["4", "5", "6", "10"], answer: 1, explain: "780, 990, 560, 640 and 870: five orders." },
      ],
      exercise: {
        title: "Highlight large orders",
        task: `<p>Write <code>HighlightLargeOrders</code>: find the last row of data, loop from row 2 to it, and fill the Amount cell yellow when it's 500 or more. Then add a second row of data at the bottom and run it again to check the new row is included.</p>`,
        files: ["weekly-orders.xlsx", "PracticeMacros.bas"],
        solution: [
          "Start the module with <code>Option Explicit</code>, then <code>Sub HighlightLargeOrders()</code>.",
          'Declare <code>Dim lastRow As Long, r As Long</code> and set <code>lastRow = Cells(Rows.Count, "A").End(xlUp).Row</code>.',
          'Write <code>For r = 2 To lastRow</code>, the If block from the last step, and <code>Next r</code>.',
          "Run it: five Amount cells turn yellow (A102, A104, A106, A108, A110).",
          "Add an order with an amount of 700 in row 12 and run it again: it's highlighted too.",
        ],
      },
    },
    {
      id: "interaction",
      title: "Messages, input and buttons",
      summary: "Show results with MsgBox, ask for a value with InputBox, handle mistakes gracefully, and run macros from a button on the sheet.",
      diagram: { type: "flow", nodes: ["Button click", "InputBox asks", "Code runs", "MsgBox reports"], highlight: 0, title: "A macro people can use without opening the editor" },
      steps: [
        {
          title: "MsgBox",
          body: `<p><code>MsgBox "Done!"</code> shows a message. Add an icon and a title: <code>MsgBox n &amp; " orders are open.", vbInformation, "Open orders"</code>. The <code>&amp;</code> joins text and numbers.</p>`,
        },
        {
          title: "Use worksheet functions in code",
          body: `<p>Most worksheet functions are available through <code>Application.WorksheetFunction</code>: <code>n = Application.WorksheetFunction.CountIf(Range("E:E"), "Open")</code>. That's often simpler than writing a loop.</p>`,
        },
        {
          title: "InputBox and errors",
          body: `<p><code>limit = InputBox("Highlight orders of at least:", "Limit", 500)</code> asks the user for a value with 500 as the default. If they type text where a number is needed, the macro stops with an error. Check first with <code>If Not IsNumeric(limit) Then Exit Sub</code>, or use <code>On Error GoTo</code> to jump to a line that explains the problem.</p>`,
        },
        {
          title: "A button on the sheet",
          body: `<p>Choose <em>Developer › Insert › Button (Form Control)</em> and draw a button. The <em>Assign Macro</em> dialog opens; pick your macro and select <em>OK</em>. Right-click the button and choose <em>Edit Text</em> to label it. Anyone using the workbook can now run the macro with one click.</p>`,
        },
      ],
      quiz: [
        { q: "Which line counts the cells in column E that say Open?", options: ["MsgBox CountIf(\"Open\")", "Application.WorksheetFunction.CountIf(Range(\"E:E\"), \"Open\")", "Range(\"E:E\").Count(\"Open\")", "Cells.Find(\"Open\")"], answer: 1, explain: "WorksheetFunction gives code access to COUNTIF and most other worksheet functions." },
        { q: "With the practice data, what does CountOpenOrders report?", options: ["3", "4", "6", "10"], answer: 1, explain: "A102, A105, A107 and A110 are open." },
      ],
      exercise: {
        title: "A button that reports open orders",
        task: `<p>Write <code>CountOpenOrders</code>, which shows a message with the number of open orders, and put a button labeled “Count open orders” on the sheet that runs it.</p>`,
        files: ["weekly-orders.xlsx", "PracticeMacros.bas"],
        solution: [
          "In a module: <code>Sub CountOpenOrders()</code>, <code>Dim n As Long</code>.",
          '<code>n = Application.WorksheetFunction.CountIf(Range("E:E"), "Open")</code>',
          '<code>MsgBox n &amp; " orders are open.", vbInformation, "Open orders"</code>, then <code>End Sub</code>.',
          "Back in Excel, <em>Developer › Insert › Button (Form Control)</em>, draw it, choose CountOpenOrders, <em>OK</em>.",
          "Right-click › <em>Edit Text</em>, type the label, click away, then click the button: it reports <strong>4 orders are open</strong>.",
        ],
      },
    },
    {
      id: "functions-events",
      title: "Your own functions and automatic macros",
      summary: "Write a function you can use in cells, run code automatically when a sheet changes, and keep everyday macros in the Personal Macro Workbook.",
      diagram: { type: "code", lang: "PracticeMacros", lines: ["Function WITHTAX(amount As Double, rate As Double) As Double", "    WITHTAX = Round(amount * (1 + rate), 2)", "End Function"], highlight: [1], notes: [[1, "Assign the result to the name"]] },
      steps: [
        {
          title: "Function instead of Sub",
          body: `<p>A <code>Function</code> returns a value, so you can use it in a cell like a built-in function. Inside, assign the result to the function's own name:</p><p><code>Function WITHTAX(amount As Double, rate As Double) As Double</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;WITHTAX = Round(amount * (1 + rate), 2)</code><br><code>End Function</code></p><p>In a cell: <code>=WITHTAX(D2, 8%)</code>.</p>`,
        },
        {
          title: "Event macros",
          body: `<p>Code in a sheet's own module can run by itself. In the Project Explorer, double-click the sheet (for example <em>Sheet1 (Orders)</em>), choose <em>Worksheet</em> in the left dropdown above the code and <em>Change</em> in the right one. The <code>Worksheet_Change</code> Sub runs every time a cell on that sheet is edited; <code>Target</code> is the cell that changed.</p>`,
        },
        {
          title: "Keep it safe",
          body: `<p>Event code runs on every edit, so keep it short and check <code>Target</code> first, for example <code>If Target.Column &lt;&gt; 5 Then Exit Sub</code>. If your code edits cells itself, wrap the edit in <code>Application.EnableEvents = False</code> and <code>True</code>, or it triggers itself again.</p>`,
        },
        {
          title: "The Personal Macro Workbook",
          body: `<p>Macros you want in every workbook belong in the Personal Macro Workbook. When recording, set <em>Store macro in</em> to <em>Personal Macro Workbook</em>; Excel creates a hidden file, PERSONAL.XLSB, that opens every time Excel starts. You'll see it in the Project Explorer as <em>VBAProject (PERSONAL.XLSB)</em>.</p>`,
        },
      ],
      quiz: [
        { q: "How does a VBA Function return its result?", options: ["With a Return statement", "By assigning the value to the function's name", "With MsgBox", "By writing to a cell"], answer: 1, explain: "In VBA you assign the result to the function's name, for example WITHTAX = …" },
        { q: "What does =WITHTAX(420, 8%) return?", options: ["428.00", "453.60", "420.08", "33.60"], answer: 1, explain: "420 × 1.08 = 453.60." },
      ],
      exercise: {
        title: "WITHTAX and a status stamp",
        task: `<p>Add the <code>WITHTAX</code> function and use it in column F for every order with an 8% rate. Then add a <code>Worksheet_Change</code> macro to the Orders sheet that writes today's date in column G whenever a Status cell (column E) is changed.</p>`,
        files: ["weekly-orders.xlsx", "PracticeMacros.bas"],
        solution: [
          "Paste the WITHTAX function into a standard module. In F1 type “With tax”, in F2 <code>=WITHTAX(D2, 8%)</code> (453.60) and fill down.",
          "Double-click the Orders sheet in the Project Explorer and choose <em>Worksheet</em> and <em>Change</em> in the dropdowns.",
          "Inside <code>Worksheet_Change(ByVal Target As Range)</code>: <code>If Target.Column &lt;&gt; 5 Then Exit Sub</code>.",
          "Then <code>Application.EnableEvents = False</code>, <code>Target.Offset(0, 2).Value = Date</code>, <code>Application.EnableEvents = True</code>.",
          "Change a Status cell to Paid: today's date appears in column G of that row.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-report-macro",
      title: "Bonus project: a one-click weekly report",
      summary: "Write a macro that copies the orders to a new sheet, sorts them, adds a totals row and a summary by region, and names the sheet with today's date.",
      diagram: { type: "flow", nodes: ["Copy data", "Sort by amount", "Totals row", "Region summary", "Name the sheet"], highlight: 3, title: "Five steps, one button" },
      steps: [
        {
          title: "Copy to a new sheet",
          body: `<p><code>Worksheets("Orders").Copy After:=Worksheets(Worksheets.Count)</code> copies the sheet to the end. Name it with the date: <code>ActiveSheet.Name = "Report " &amp; Format(Date, "yyyy-mm-dd")</code>. A sheet name must be unique, so running it twice in one day stops with an error; handle that with <code>On Error</code>.</p>`,
        },
        {
          title: "Sort and total",
          body: `<p>Sort by amount, largest first: <code>Range("A1").CurrentRegion.Sort Key1:=Range("D1"), Order1:=xlDescending, Header:=xlYes</code>. Then find the last row and put a SUM formula under the Amount column: <code>Cells(lastRow + 1, "D").Formula = "=SUM(D2:D" &amp; lastRow &amp; ")"</code>.</p>`,
        },
        {
          title: "Summary by region",
          body: `<p>Write the four region names in G2:G5 and use SUMIF formulas beside them, written by the code with <code>.Formula</code>. Writing formulas rather than values keeps the report correct if someone edits an amount afterwards.</p>`,
        },
      ],
      quiz: [
        { q: "Why write a SUM formula into the totals cell instead of the calculated value?", options: ["Formulas are faster", "The total stays right if an amount is edited later", "Values can't be written by VBA", "Formulas are smaller"], answer: 1, explain: "A formula recalculates; a value written once would go stale." },
        { q: "With the practice data, what's the North region's total?", options: ["935", "2,210", "1,235", "1,630"], answer: 0, explain: "420 + 310 + 205 = 935." },
      ],
      exercise: {
        title: "Write WeeklyReport",
        task: `<p>Write a <code>WeeklyReport</code> macro that does all five steps, and put a button for it on the Orders sheet. Check the totals: the Amount total and the four region totals.</p>`,
        files: ["weekly-orders.xlsx"],
        solution: [
          'Copy and rename: <code>Worksheets("Orders").Copy After:=Worksheets(Worksheets.Count)</code>, then the Name line from step 1.',
          "Sort with the CurrentRegion line, find <code>lastRow</code>, and write the SUM formula: the total is <strong>5,020</strong>.",
          'In G1:H1 write “Region” and “Total”; in G2:G5 North, South, East, West; in H2 <code>.Formula = "=SUMIF(C:C,G2,D:D)"</code> and so on.',
          "Region totals: North 935, South 2,210, East 245, West 1,630 (together 5,020).",
          "Add a Form Control button on Orders and assign WeeklyReport.",
        ],
      },
    },
    quizbank: [
      { q: "Where are recorded macros stored by default when you choose This Workbook?", options: ["In a sheet's module", "In a standard module such as Module1", "In PERSONAL.XLSB", "In the ribbon"], answer: 1, explain: "The recorder adds a standard module to the workbook." },
      { q: "What does Cells(Rows.Count, \"A\").End(xlUp).Row return?", options: ["The first empty row", "The row number of the last filled cell in column A", "The number of rows in the sheet", "The active row"], answer: 1, explain: "It starts at the bottom of column A and jumps up to the last filled cell." },
      { q: "Which keyword declares a variable?", options: ["Set", "Dim", "Var", "Let"], answer: 1, explain: "Dim declares variables; Set assigns object references." },
      { q: "What does F9 do in the VBA editor?", options: ["Runs the macro", "Toggles a breakpoint", "Opens the Immediate window", "Compiles the project"], answer: 1, explain: "F9 sets or clears a breakpoint on the current line." },
      { q: "Why might a downloaded .xlsm not run its macros?", options: ["Macros expire", "Windows marks internet files and Excel blocks their macros", "It must be renamed", "It needs the Developer tab"], answer: 1, explain: "Files from the internet carry a mark; unblock only files you trust in the file's Properties." },
      { q: "In a Worksheet_Change macro, what is Target?", options: ["The whole sheet", "The cell or range that was changed", "The active workbook", "The previous value"], answer: 1, explain: "Target refers to the changed cells." },
      { q: "What does Application.EnableEvents = False prevent?", options: ["Errors", "Event macros firing because of the code's own edits", "Screen updates", "Saving"], answer: 1, explain: "Turning events off while your code edits cells stops the event macro triggering itself." },
      { q: "Which is the correct way to join text and a number in VBA?", options: ["\"Total: \" + n", "\"Total: \" & n", "\"Total: \" . n", "Join(\"Total: \", n)"], answer: 1, explain: "The & operator concatenates text with any value." },
    ],
  },
  async makeFiles({ xlsx }) {
    return {
      "weekly-orders.xlsx": xlsx([{ name: "Orders", rows: ORDERS, widths: [9, 12, 10, 10, 9] }], "Weekly orders"),
      "PracticeMacros.bas": BAS.replace(/\n/g, "\r\n"),
    };
  },
};
