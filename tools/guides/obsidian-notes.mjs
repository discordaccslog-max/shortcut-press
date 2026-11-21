import { k } from "./_helpers.mjs";

const NOTES = {
  "Welcome.md": `# Welcome to the practice vault

This vault goes with the Shortcut Press guide to Obsidian. Every note here is plain Markdown.

## What's inside
- [[Garden project]]: a small project note with properties and tags
- A meeting note and a seed list that link back to it
- A meeting template in the Templates folder

## Try this first
- [ ] Switch between editing and reading view
- [ ] Follow a link and come back
- [ ] Open the graph view
`,
  "Garden project.md": `---
status: active
due: 2026-04-01
tags:
  - project/garden
---
# Garden project

Turn the empty lot on Maple Street into a community garden.

## Goals
1. Build six raised beds by the end of March
2. Plant greens and herbs in April
3. First harvest in June

## Notes
The first meeting is written up in [[Meeting 2026-03-04]].
Seeds are tracked in [[Seed list]].

## Open questions
- Who holds the key to the water tap?
- Do we need insurance for work parties?
`,
  "Seed list.md": `# Seed list

Part of the [[Garden project]]. #project/garden

| Crop | Variety | Sow by |
| --- | --- | --- |
| Lettuce | Little Gem | 2026-04-05 |
| Basil | Genovese | 2026-04-20 |
| Tomato | Gardener's Delight | 2026-04-10 |

## To buy
- [x] Lettuce seeds
- [ ] Basil seeds
- [ ] Tomato seedlings
`,
  "Meeting 2026-03-04.md": `# Meeting 2026-03-04

Project: [[Garden project]]
Attendees: Amara, Ben, Chen

## Decisions
- Beds will be 1.2 m wide so everyone can reach the middle.
- We reviewed the seed list and agreed to start with greens.

## Actions
- [ ] Amara: ask the city about the water connection
- [ ] Ben: price timber for six beds
- [ ] Chen: set up the shared calendar
`,
  "Template - Meeting.md": `# {{title}}

Date: {{date}}
Project:
Attendees:

## Decisions
-

## Actions
- [ ]
`,
};

export default {
  id: "obsidian-notes",
  slug: "obsidian-notes",
  title: "Linked Notes in Obsidian",
  software: "Obsidian",
  apps: ["Obsidian"],
  intro:
    "Build a personal knowledge base in Obsidian: write notes in Markdown, connect them with links and backlinks, organize with folders, tags and properties, explore with the graph and Canvas, and set up daily notes, templates and embeds. The lessons use a small practice vault about a garden project.",
  platformNote: "Shortcuts are shown for Windows and Linux. On a Mac, use Cmd in place of Ctrl and Option in place of Alt.",
  store: {
    category: "office",
    level: "Beginner",
    software: "Obsidian (free for personal use, Windows, Mac, Linux, iOS and Android)",
    softwareShort: "Obsidian",
    softwareHtml: `<p>This guide is written for the desktop version of <strong>Obsidian</strong> on Windows, Mac or Linux. Obsidian is free for personal use and is obtained separately from its makers at obsidian.md; it is not included with the guide. The mobile apps work with the same vault, but the guide's steps follow the desktop app. Paid add-ons such as Obsidian Sync or Publish are not needed.</p>`,
    forWho: [
      "Your notes are scattered across apps and files and you want them in one place you own.",
      "You'd like notes that link to each other, so ideas and projects connect.",
      "You want plain text files that stay readable without any special program.",
    ],
    notFor: [
      "You need real-time collaboration on shared documents. Obsidian is built for personal notes.",
      "You want an in-depth tour of community plugins. The guide uses Obsidian's core features.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: Object.keys(NOTES).map((name) => ({
    name,
    title: name.replace(/\.md$/, ""),
    desc: {
      "Welcome.md": "A start page with headings, a list and a checklist.",
      "Garden project.md": "A project note with properties, a nested tag and links.",
      "Seed list.md": "A table and a shopping checklist that link back to the project.",
      "Meeting 2026-03-04.md": "A meeting note with decisions and actions.",
      "Template - Meeting.md": "A meeting template with {{title}} and {{date}} placeholders.",
    }[name],
  })),
  shortcuts: [
    { keys: "Ctrl+O", action: "Quick switcher: open a note by name", app: "Obsidian" },
    { keys: "Ctrl+P", action: "Command palette", app: "Obsidian" },
    { keys: "Ctrl+E", action: "Switch between editing and reading view", app: "Obsidian" },
    { keys: "Ctrl+Shift+F", action: "Search all notes", app: "Obsidian" },
    { keys: "Ctrl+G", action: "Open the graph view", app: "Obsidian" },
    { keys: "Ctrl+,", action: "Open settings", app: "Obsidian" },
    { keys: "Ctrl+B", action: "Bold", app: "Obsidian" },
    { keys: "Ctrl+I", action: "Italic", app: "Obsidian" },
    { keys: "Ctrl+K", action: "Insert a Markdown link", app: "Obsidian" },
    { keys: "Alt+Enter", action: "Follow the link under the cursor", app: "Obsidian" },
    { keys: "Ctrl+Alt+ArrowLeft", action: "Go back", app: "Obsidian" },
    { keys: "Ctrl+]", action: "Indent a list item", app: "Obsidian" },
    { keys: "Ctrl+[", action: "Outdent a list item", app: "Obsidian" },
    { keys: "Ctrl+N", action: "New note", app: "Obsidian", practice: false, note: "Your browser uses this shortcut to open a new window." },
    { keys: "Ctrl+L", action: "Toggle a checklist item", app: "Obsidian", practice: false, note: "Your browser uses this shortcut for the address bar." },
  ],
  lessons: [
    {
      id: "vault",
      title: "Vaults and Markdown notes",
      summary: "Open a folder as a vault, write a note with Markdown headings, lists and checklists, and switch between editing and reading views.",
      diagram: { type: "code", lang: "Welcome.md", lines: ["# Welcome to the practice vault", "## What's inside", "- [[Garden project]]: a small project", "- [ ] Open the graph view"], highlight: [0, 3], notes: [[0, "# is a heading"], [3, "- [ ] is a checkbox"]] },
      steps: [
        {
          title: "A vault is a folder",
          body: `<p>Obsidian keeps notes as ordinary <code>.md</code> text files in a folder it calls a <strong>vault</strong>. Make a folder named <em>Practice vault</em>, put the five practice files in it, then in Obsidian choose <em>Open folder as vault</em> and pick it. Because they're plain files, your notes stay readable in any text editor, now or in twenty years.</p>`,
        },
        {
          title: "Markdown basics",
          body: `<p>Markdown is formatting you type: <code># Heading</code> (more # for smaller headings), <code>**bold**</code>, <code>*italic*</code>, <code>- item</code> for a bullet and <code>1.</code> for a numbered list. <code>- [ ]</code> makes a checkbox; ${k("Ctrl", "B")} and ${k("Ctrl", "I")} wrap selected text for you.</p>`,
        },
        {
          title: "Editing and reading views",
          body: `<p>By default Obsidian shows <em>Live Preview</em>: formatting is drawn as you type and the symbols appear only on the line you're editing. Press ${k("Ctrl", "E")} for reading view, where checkboxes can be ticked and links clicked. <em>Settings › Editor › Default editing mode</em> switches to <em>Source mode</em> if you prefer to see every symbol.</p>`,
        },
        {
          title: "Find any note fast",
          body: `<p>Press ${k("Ctrl", "O")} for the quick switcher, type part of a name and press Enter. Type a name that doesn't exist and press ${k("Shift", "Enter")} to create it. ${k("Ctrl", "P")} opens the command palette, which lists every command Obsidian has.</p>`,
        },
      ],
      quiz: [
        { q: "What is an Obsidian vault?", options: ["A cloud account", "A folder of Markdown files on your device", "A database file", "A paid feature"], answer: 1, explain: "A vault is just a folder; each note is a .md file inside it." },
        { q: "Which Markdown makes a checkbox?", options: ["[x]", "- [ ]", "* checkbox", "#todo"], answer: 1, explain: "A dash, a space and empty square brackets start a checklist item; [x] marks it done." },
      ],
      exercise: {
        title: "Open the practice vault",
        task: `<p>Put the five practice files in a folder, open it as a vault, and in <strong>Welcome.md</strong> tick the first checkbox in reading view. Then create a new note called “Inbox” with a heading and two bullet points.</p>`,
        files: ["Welcome.md", "Garden project.md", "Seed list.md", "Meeting 2026-03-04.md", "Template - Meeting.md"],
        solution: [
          "Create a folder, download the five files into it, then in Obsidian choose <em>Open folder as vault</em> (or <em>Open another vault</em> from the vault switcher at the bottom left).",
          "Open Welcome, press Ctrl+E for reading view and click the first checkbox: the file now says <code>- [x]</code>.",
          "Press Ctrl+O, type Inbox and press Shift+Enter to create it.",
          "Type <code># Inbox</code>, press Enter, then <code>- </code> and two items.",
        ],
      },
    },
    {
      id: "links",
      title: "Links and backlinks",
      summary: "Link notes with double brackets, link to headings and with different text, and use backlinks to see every note that points to the one you're reading.",
      diagram: { type: "tree", root: "Garden project", items: [["← Welcome", 1], ["← Seed list", 1], ["← Meeting 2026-03-04", 1, true], ["3 backlinks: notes that link here", 2]], caption: "Backlinks are found for you, without any extra work" },
      steps: [
        {
          title: "Double-bracket links",
          body: `<p>Type <code>[[</code> and Obsidian suggests notes as you type; pick one with Enter to make a link like <code>[[Seed list]]</code>. In reading view click it; in editing view hold ${k("Ctrl")} and click, or put the cursor on it and press ${k("Alt", "Enter")}. ${k("Ctrl", "Alt", "ArrowLeft")} goes back.</p>`,
        },
        {
          title: "Links to a note that doesn't exist yet",
          body: `<p>A link can point to a note you haven't written: <code>[[Water connection]]</code> shows in a fainter color. Clicking it creates the note. This is a natural way to grow notes: write the link first, fill in the note when you need it.</p>`,
        },
        {
          title: "Headings and display text",
          body: `<p><code>[[Garden project#Goals]]</code> links to a heading inside a note. <code>[[Garden project|the garden]]</code> shows “the garden” as the link text. Rename a note in the file explorer and Obsidian updates every link to it (if <em>Automatically update internal links</em> is on in <em>Settings › Files and links</em>).</p>`,
        },
        {
          title: "Backlinks and unlinked mentions",
          body: `<p>Open <em>Garden project</em> and choose <em>Open backlinks</em> from the command palette (or the backlinks icon in the right sidebar). It lists every note that links here. Under <em>Unlinked mentions</em> it also finds notes that mention the name without linking; select <em>Link</em> next to one to turn it into a link.</p>`,
        },
      ],
      quiz: [
        { q: "How many backlinks does Garden project have in the practice vault?", options: ["1", "2", "3", "5"], answer: 2, explain: "Welcome, Seed list and the meeting note all link to it." },
        { q: "What does [[Garden project|the garden]] display?", options: ["Garden project", "the garden", "Garden project|the garden", "A broken link"], answer: 1, explain: "The text after the vertical bar is shown instead of the note name." },
      ],
      exercise: {
        title: "Connect the notes",
        task: `<p>In the meeting note, the phrase “seed list” is plain text. Use the Seed list note's unlinked mentions to turn it into a link. Then add a link to a new note, <code>[[Water connection]]</code>, in the meeting's first action, and create that note by clicking the link.</p>`,
        files: ["Meeting 2026-03-04.md", "Seed list.md"],
        solution: [
          "Open Seed list and open its backlinks (command palette › <em>Backlinks: Open backlinks</em>, or the right sidebar).",
          "Expand <em>Unlinked mentions</em>: the meeting note appears. Select <em>Link</em>: the text becomes <code>[[Seed list|seed list]]</code> (or <code>[[Seed list]]</code>, depending on your version).",
          "In the meeting note, change the first action to “ask the city about the [[Water connection]]”.",
          "Ctrl+click the faint link: Obsidian creates Water connection.md and opens it.",
        ],
      },
    },
    {
      id: "organize",
      title: "Folders, tags and properties",
      summary: "Choose when to use folders, tags and links, add properties to notes, and search with operators.",
      diagram: { type: "compare", left: { title: "Folders", items: ["One place per note", "Good for kinds of note:", "Templates, Daily, Archive"] }, right: { title: "Tags and properties", items: ["Many per note", "Good for status and topics:", "#project/garden", "status: active"] }, accentRight: true, title: "Folders say what a note is; tags and properties describe it" },
      steps: [
        {
          title: "Folders: few and broad",
          body: `<p>A note can only be in one folder, so keep folders for broad kinds of note: <em>Templates</em>, <em>Daily</em>, <em>Archive</em>. Right-click in the file explorer and choose <em>New folder</em>; drag notes into it. Links keep working when notes move.</p>`,
        },
        {
          title: "Tags",
          body: `<p>Type <code>#project/garden</code> anywhere in a note to tag it. The slash makes a <em>nested</em> tag: searching for <code>#project</code> finds every project. The <em>Tags</em> view (open it from the command palette) lists all tags with counts.</p>`,
        },
        {
          title: "Properties",
          body: `<p>Properties are labeled values at the top of a note, stored as YAML between two lines of <code>---</code>. In <em>Garden project</em> you'll see <code>status: active</code> and a due date. Add one with the command palette's <em>Add file property</em>, or type <code>---</code> on the first line of a note. Property types (text, date, checkbox, list) are set by clicking the property's icon.</p>`,
        },
        {
          title: "Search with operators",
          body: `<p>Press ${k("Ctrl", "Shift", "F")}. Plain words find notes containing them; <code>tag:#project/garden</code> filters by tag, <code>path:Daily</code> by folder, <code>"exact phrase"</code> matches exactly, and <code>[status:active]</code> finds notes with that property value. Search results update as you type.</p>`,
        },
      ],
      quiz: [
        { q: "Why prefer tags over folders for a note's status or topic?", options: ["Tags are faster to type", "A note can have many tags but only one folder", "Folders break links", "Tags are stored separately"], answer: 1, explain: "Tags (and properties) can describe a note in several ways at once." },
        { q: "Which search finds notes with the property status set to active?", options: ["status active", "tag:status", "[status:active]", "path:active"], answer: 2, explain: "Square brackets search properties: [property:value]." },
      ],
      exercise: {
        title: "Organize the vault",
        task: `<p>Make a <em>Templates</em> folder and move the meeting template into it. Add the properties <code>status: planning</code> and <code>tags: project/garden</code> to the Water connection note. Then search for every note tagged <code>#project/garden</code>. How many are there?</p>`,
        files: ["Template - Meeting.md", "Garden project.md"],
        solution: [
          "Right-click the file explorer › <em>New folder</em>, name it Templates, and drag Template - Meeting into it.",
          "Open Water connection, run <em>Add file property</em> from the command palette, name it status and type planning. Add a property named tags with project/garden.",
          "Ctrl+Shift+F and search <code>tag:#project/garden</code>.",
          "Three notes: Garden project, Seed list (tagged in its text) and Water connection.",
        ],
      },
    },
    {
      id: "graph",
      title: "The graph and Canvas",
      summary: "Explore connections in the graph view and a note's local graph, and lay out notes and ideas visually on a Canvas.",
      diagram: { type: "cycle", nodes: ["Garden project", "Seed list", "Meeting", "Water connection", "Welcome"], highlight: 0, center: "Notes as dots, links as lines" },
      steps: [
        {
          title: "Graph view",
          body: `<p>Press ${k("Ctrl", "G")}. Every note is a dot and every link a line; notes with more links draw bigger dots. Hover to highlight a note's neighbors, click to open it, and scroll to zoom. In the practice vault, Garden project sits in the middle.</p>`,
        },
        {
          title: "Filters, groups and the local graph",
          body: `<p>The settings button in the graph's corner opens filters (show tags, attachments, orphans: notes with no links) and <em>Groups</em>, which color notes by a search such as <code>tag:#project</code>. Open the command palette and choose <em>Graph view: Open local graph</em> to see only the current note and its direct connections.</p>`,
        },
        {
          title: "Canvas",
          body: `<p>Choose <em>New canvas</em> from the command palette or the ribbon. A canvas is an endless board: drag notes onto it from the file explorer, double-click empty space to add a text card, and drag from a card's edge to another card to draw an arrow. Canvases are saved as <code>.canvas</code> files in the vault.</p>`,
        },
        {
          title: "Use them for questions",
          body: `<p>The graph is best at answering questions such as “what's connected to this?” or “which notes are orphans?”. A canvas is best for planning: laying out a project's parts, or sorting ideas before writing. Neither replaces good links; they show the links you've made.</p>`,
        },
      ],
      quiz: [
        { q: "What is an orphan in the graph view?", options: ["A deleted note", "A note with no links to or from it", "A note without a folder", "A tag with no notes"], answer: 1, explain: "Orphans aren't connected to anything, which often means they need a link." },
        { q: "How is a canvas stored?", options: ["In the cloud only", "As a .canvas file in the vault", "Inside a note's properties", "It isn't saved"], answer: 1, explain: "Canvases are files in your vault, like notes." },
      ],
      exercise: {
        title: "Plan the garden on a canvas",
        task: `<p>Open the local graph for Garden project and count its direct connections. Then make a canvas named “Garden plan” with the project note, the seed list, and two text cards (“Build beds” and “Plant greens”) connected by arrows in order.</p>`,
        files: ["Garden project.md", "Seed list.md"],
        solution: [
          "Open Garden project, then command palette › <em>Graph view: Open local graph</em>.",
          "It shows Garden project linked with Welcome, Seed list, Meeting 2026-03-04 and Water connection (if you linked it through the meeting note, it appears at depth 2; raise <em>Depth</em> in the local graph's settings to see it).",
          "Command palette › <em>Canvas: Create new canvas</em>, rename it Garden plan.",
          "Drag Garden project and Seed list from the file explorer onto the canvas; double-click empty space twice to add the two text cards.",
          "Drag from the edge of “Build beds” to “Plant greens” to draw the arrow.",
        ],
      },
    },
    {
      id: "daily",
      title: "Daily notes and templates",
      summary: "Turn on daily notes, set up a template folder, and insert templates with the date and title filled in.",
      diagram: { type: "flow", nodes: ["Open today's note", "Template inserted", "Log and link", "Review weekly"], highlight: 1, title: "A daily note routine" },
      steps: [
        {
          title: "Core plugins",
          body: `<p>Daily notes and Templates are <em>core plugins</em>, built in but switchable. Open <em>Settings › Core plugins</em> and check both are on. Core plugins are maintained by Obsidian's makers; community plugins (a separate list) are written by others.</p>`,
        },
        {
          title: "Daily notes",
          body: `<p>In <em>Settings › Daily notes</em>, set <em>New file location</em> to a folder such as <em>Daily</em>. Then <em>Daily notes: Open today's daily note</em> in the command palette (or the calendar icon in the ribbon) creates a note named with today's date, or opens it if it exists. It's a natural place to log what happened and link to project notes.</p>`,
        },
        {
          title: "Templates",
          body: `<p>In <em>Settings › Templates</em>, set <em>Template folder location</em> to <em>Templates</em>. In any note, run <em>Templates: Insert template</em> and pick one. <code>{{title}}</code> becomes the note's name and <code>{{date}}</code> today's date (the format is set in the same settings page). Point the daily notes setting at a template too, so every daily note starts the same way.</p>`,
        },
        {
          title: "A sustainable routine",
          body: `<p>Keep daily notes short: what you did, decisions, links to anything that deserves its own note. Once a week, search <code>path:Daily</code> for unchecked tasks (<code>task-todo:</code> in search finds them in recent versions, or search <code>"- [ ]"</code>) and move anything still open.</p>`,
        },
      ],
      quiz: [
        { q: "In a template, what does {{title}} become?", options: ["The word title", "The name of the note it's inserted into", "Today's date", "The vault name"], answer: 1, explain: "{{title}} is replaced with the note's name when the template is inserted." },
        { q: "Where do you choose the folder that holds templates?", options: ["Settings › Templates", "Settings › Appearance", "The graph view", "File › New folder"], answer: 0, explain: "The Templates core plugin's settings set the template folder location." },
      ],
      exercise: {
        title: "A new meeting note from the template",
        task: `<p>Set the template folder to Templates and daily notes to a Daily folder. Create a note called “Meeting 2026-03-11”, insert the meeting template, fill in the project with a link to Garden project, and open today's daily note with a link to the new meeting.</p>`,
        files: ["Template - Meeting.md"],
        solution: [
          "<em>Settings › Templates › Template folder location</em>: Templates. <em>Settings › Daily notes › New file location</em>: Daily (create the folder first).",
          "Ctrl+O, type Meeting 2026-03-11, Shift+Enter.",
          "Command palette › <em>Templates: Insert template</em> › Template - Meeting. The heading becomes “Meeting 2026-03-11” and the date line today's date.",
          "After “Project:”, type <code>[[Garden project]]</code>.",
          "Command palette › <em>Daily notes: Open today's daily note</em>, and type <code>[[Meeting 2026-03-11]]</code>.",
        ],
      },
    },
    {
      id: "embeds",
      title: "Embeds, attachments and keeping your vault safe",
      summary: "Embed notes, sections and images inside other notes, add callouts, and back up a vault you own.",
      diagram: { type: "layers", items: ["Callout: > [!tip]", "Embedded section: ![[Garden project#Goals]]", "Your note"], highlight: 1, caption: "An embed shows another note's content in place" },
      steps: [
        {
          title: "Embed instead of copying",
          body: `<p>Put an exclamation mark before a link to show the other note's content in place: <code>![[Seed list]]</code>. Embed one section with <code>![[Garden project#Goals]]</code>. Edit the original and every embed updates, so there's one source of truth.</p>`,
        },
        {
          title: "Images and other files",
          body: `<p>Drag an image or PDF into a note and Obsidian copies it into the vault and embeds it. <em>Settings › Files and links › Default location for new attachments</em> keeps them tidy, for example in an <em>Attachments</em> folder. Resize an image embed with <code>![[photo.png|300]]</code>.</p>`,
        },
        {
          title: "Callouts",
          body: `<p>A callout is a highlighted box: start a quote with a type, <code>&gt; [!tip] Remember</code>, and put the content on the next lines, each starting with <code>&gt;</code>. Types include note, tip, warning and question. Add a minus sign, <code>&gt; [!note]-</code>, to make it fold closed.</p>`,
        },
        {
          title: "Back up what you own",
          body: `<p>Your vault is a folder, so back it up like any folder: copy it to an external drive or to cloud storage you already use. Obsidian also keeps a local history of changes in the <em>File recovery</em> core plugin (<em>Settings › File recovery</em>), which can restore an earlier version of a note.</p>`,
        },
      ],
      quiz: [
        { q: "What does ![[Garden project#Goals]] do?", options: ["Links to the Goals heading", "Shows the Goals section inside the current note", "Copies the Goals text permanently", "Deletes the section"], answer: 1, explain: "The ! turns a link into an embed of that section." },
        { q: "How do you make a callout fold closed by default?", options: ["> [!note]+", "> [!note]-", ">> [!note]", "[!fold]"], answer: 1, explain: "A minus sign after the type makes it collapsed; a plus makes it open but foldable." },
      ],
      exercise: {
        title: "A project dashboard note",
        task: `<p>Make a note called “Garden dashboard” that embeds the Goals section of Garden project and the whole Seed list, and has a warning callout that asks “Who holds the key to the water tap?”. Then back up the vault by copying the folder.</p>`,
        files: ["Garden project.md", "Seed list.md"],
        solution: [
          "Ctrl+O, type Garden dashboard, Shift+Enter.",
          "Type <code>![[Garden project#Goals]]</code> on one line and <code>![[Seed list]]</code> below it.",
          "Add <code>&gt; [!warning] Open question</code> and on the next line <code>&gt; Who holds the key to the water tap?</code>",
          "Press Ctrl+E to check the embeds and callout in reading view.",
          "Close Obsidian (or not; it's fine either way) and copy the vault folder to another drive or a cloud storage folder.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-reading",
      title: "Bonus project: a reading notes system",
      summary: "Set up a template, properties and a search-based index for notes on books and articles, so everything you read connects to your other notes.",
      diagram: { type: "tree", root: "Reading index", items: [["Book: Small Engines", 1], ["Quote → [[Garden project]]", 2, true], ["Article: Raised beds", 1], ["Idea → new note", 2]], caption: "Each reading note links out to the ideas it touches" },
      steps: [
        {
          title: "A reading template",
          body: `<p>Create <em>Templates/Template - Reading.md</em> with properties for <code>type</code> (book or article), <code>author</code>, <code>status</code> (to-read, reading, done) and <code>rating</code>, then headings for Summary, Quotes and Ideas.</p>`,
        },
        {
          title: "Link ideas, not just books",
          body: `<p>Under Ideas, every thought that connects to something you're working on becomes a link: “[[Garden project]] could use the bed design from chapter 3”. Over time, your project notes' backlinks show everything you've read that's relevant.</p>`,
        },
        {
          title: "An index from search",
          body: `<p>An embedded search keeps a list up to date: in a note named Reading index, add a code block with the language <code>query</code> containing <code>[status:reading]</code>. It shows every note currently being read. Make a second one for <code>[status:to-read]</code>.</p>`,
        },
      ],
      quiz: [
        { q: "Why link ideas to project notes rather than only filing reading notes in a folder?", options: ["Folders can't hold reading notes", "The project's backlinks then gather everything relevant you've read", "Links make files smaller", "Search doesn't work in folders"], answer: 1, explain: "Links make the connection visible from both sides." },
        { q: "Which code block language embeds a live search?", options: ["search", "query", "dataview", "find"], answer: 1, explain: "A code block marked query shows search results inside the note." },
      ],
      exercise: {
        title: "Set up reading notes",
        task: `<p>Create the reading template, use it for one book (status: reading) and one article (status: to-read), link at least one idea to Garden project, and build a Reading index with two embedded searches.</p>`,
        files: ["Garden project.md"],
        solution: [
          "Create the template with the four properties and three headings.",
          "Make two notes, insert the template in each, and set their type and status properties.",
          "In the book's Ideas section, write a sentence with <code>[[Garden project]]</code>.",
          "In Reading index, add a code block with the language query containing <code>[status:reading]</code>, and another with <code>[status:to-read]</code>.",
          "Open Garden project's backlinks: the book now appears there.",
        ],
      },
    },
    quizbank: [
      { q: "What file extension do Obsidian notes use?", options: [".txt", ".md", ".obs", ".note"], answer: 1, explain: "Notes are Markdown files with the .md extension." },
      { q: "Which shortcut opens the quick switcher?", options: ["Ctrl+P", "Ctrl+O", "Ctrl+G", "Ctrl+E"], answer: 1, explain: "Ctrl+O opens a note by name; Ctrl+P is the command palette." },
      { q: "How do you link to a heading called Goals in Garden project?", options: ["[[Garden project > Goals]]", "[[Garden project#Goals]]", "[[Goals@Garden project]]", "#Goals"], answer: 1, explain: "A # after the note name points to a heading." },
      { q: "What's the difference between a link and an embed?", options: ["None", "An embed (with !) shows the content in place", "Links only work in reading view", "Embeds can't be edited"], answer: 1, explain: "![[…]] displays the other note's content inside the current one." },
      { q: "Where are properties stored in a note's file?", options: ["In a hidden database", "In YAML between --- lines at the top", "In the file name", "In a separate .json file"], answer: 1, explain: "Properties are front matter at the top of the Markdown file." },
      { q: "Which plugin type is maintained by Obsidian's makers?", options: ["Community plugins", "Core plugins", "Both equally", "Neither"], answer: 1, explain: "Core plugins ship with Obsidian; community plugins are third-party." },
      { q: "How do you back up an Obsidian vault?", options: ["Only with Obsidian Sync", "Copy the vault folder like any other folder", "Export each note", "It can't be backed up"], answer: 1, explain: "A vault is a normal folder of files." },
      { q: "What does search for path:Daily do?", options: ["Finds the word Daily", "Limits results to notes in the Daily folder", "Opens today's note", "Lists daily tags"], answer: 1, explain: "path: filters by folder or file path." },
    ],
  },
  async makeFiles() {
    const out = {};
    for (const [name, text] of Object.entries(NOTES)) out[name] = text;
    return out;
  },
};
