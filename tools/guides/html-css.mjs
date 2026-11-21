import { k } from "./_helpers.mjs";

const STARTER_HTML = `Harbor Coffee

Small-batch coffee by the water since 2019.

Our menu
Espresso 2.80
Flat white 3.60
Pour-over 4.20
Cardamom bun 3.20

Visit us
12 Quay Street, Seaview
Open every day, 7am to 5pm

Say hello: hello@harbor-coffee.test
`;

const FINISHED_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Harbor Coffee</title>
  <link rel="stylesheet" href="finished-style.css">
</head>
<body>
  <header class="site-header">
    <p class="logo">Harbor Coffee</p>
    <nav>
      <ul class="nav">
        <li><a href="#menu">Menu</a></li>
        <li><a href="#visit">Visit</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="hero">
      <img src="hero.png" alt="Abstract illustration of waves and a coffee cup">
      <h1>Small-batch coffee by the water</h1>
      <p>Roasted in Seaview since 2019.</p>
    </section>

    <section id="menu">
      <h2>Our menu</h2>
      <ul class="cards">
        <li class="card"><h3>Espresso</h3><p class="price">2.80</p></li>
        <li class="card"><h3>Flat white</h3><p class="price">3.60</p></li>
        <li class="card"><h3>Pour-over</h3><p class="price">4.20</p></li>
        <li class="card"><h3>Cardamom bun</h3><p class="price">3.20</p></li>
      </ul>
    </section>

    <section id="visit">
      <h2>Visit us</h2>
      <p>12 Quay Street, Seaview<br>Open every day, 7am to 5pm</p>
    </section>

    <section id="contact">
      <h2>Say hello</h2>
      <form class="contact-form">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" required>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" required>
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4"></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Harbor Coffee</p>
  </footer>
</body>
</html>
`;

const FINISHED_CSS = `*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --ink: #1d2733;
  --sea: #1f6f8b;
  --sand: #f6f1e8;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--ink);
  background: var(--sand);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: white;
}

.logo {
  margin: 0;
  font-weight: 700;
  color: var(--sea);
}

.nav {
  display: flex;
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav a {
  color: var(--ink);
  text-decoration: none;
}

.nav a:hover,
.nav a:focus-visible {
  color: var(--sea);
  text-decoration: underline;
}

main {
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

.hero {
  padding: 2rem 0;
  text-align: center;
}

.hero h1 {
  font-size: clamp(2rem, 6vw, 3.25rem);
  line-height: 1.15;
  margin: 1.5rem 0 0.5rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.card {
  padding: 1.25rem;
  background: white;
  border: 1px solid #e3dccf;
  border-radius: 0.75rem;
}

.card h3 {
  margin: 0;
}

.price {
  margin: 0.25rem 0 0;
  font-weight: 700;
  color: var(--sea);
}

.contact-form {
  display: grid;
  gap: 0.5rem;
  max-width: 28rem;
}

.contact-form input,
.contact-form textarea {
  font: inherit;
  padding: 0.6rem 0.75rem;
  border: 1px solid #b9b2a5;
  border-radius: 0.5rem;
}

.contact-form button {
  justify-self: start;
  margin-top: 0.5rem;
  padding: 0.6rem 1.25rem;
  font: inherit;
  color: white;
  background: var(--sea);
  border: 0;
  border-radius: 0.5rem;
  cursor: pointer;
}

.site-footer {
  padding: 1.5rem;
  text-align: center;
  background: white;
}

@media (max-width: 40rem) {
  .site-header {
    flex-direction: column;
    gap: 0.5rem;
  }
}
`;

export default {
  id: "html-css",
  slug: "html-css",
  title: "Build a Web Page with HTML & CSS",
  software: "A code editor and a web browser",
  apps: ["VS Code", "Browser"],
  intro:
    "Build a real, responsive one-page website for a small café from plain text: HTML structure and meaning, CSS for type and color, the box model, Flexbox and Grid layouts, a contact form, and media queries for phones. You need only a code editor and a browser.",
  platformNote: "Shortcuts are shown for VS Code on Windows and Linux. On a Mac, use Cmd in place of Ctrl and Option in place of Alt.",
  store: {
    category: "code",
    level: "Beginner",
    software: "A code editor (the guide uses VS Code, free) and any modern web browser",
    softwareShort: "VS Code + browser",
    softwareHtml: `<p>This guide needs only a <strong>code editor</strong> and a <strong>web browser</strong>. The steps use <strong>Visual Studio Code</strong>, which is free and obtained separately from code.visualstudio.com; it is not included with the guide. Any current browser (Chrome, Edge, Firefox or Safari) works for viewing and testing your page.</p>`,
    forWho: [
      "You've never written HTML or CSS and want to build a page from scratch.",
      "You edit websites through a page builder and want to understand what's underneath.",
      "You learn best by building one real thing step by step.",
    ],
    notFor: [
      "You want JavaScript interactivity. See JavaScript Fundamentals for the Browser.",
      "You need a content management system, online store or hosting setup.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "content.txt", title: "Page content", desc: "The café's text, unformatted, to turn into HTML." },
    { name: "hero.png", title: "Hero picture", desc: "An abstract waves-and-cup illustration, 1200 × 500 pixels." },
    { name: "finished-index.html", title: "Finished page (HTML)", desc: "The completed page from the guide, to compare with your own." },
    { name: "finished-style.css", title: "Finished page (CSS)", desc: "The completed stylesheet, to compare with your own." },
  ],
  shortcuts: [
    { keys: "Ctrl+S", action: "Save the file", app: "VS Code" },
    { keys: "Tab", action: "Expand an Emmet abbreviation such as ! or ul>li*3", app: "VS Code" },
    { keys: "Ctrl+/", action: "Comment or uncomment", app: "VS Code" },
    { keys: "Shift+Alt+F", action: "Format the document", app: "VS Code" },
    { keys: "Ctrl+D", action: "Select the next match", app: "VS Code" },
    { keys: "Alt+ArrowUp", action: "Move the line up", app: "VS Code" },
    { keys: "Alt+ArrowDown", action: "Move the line down", app: "VS Code" },
    { keys: "Ctrl+P", action: "Quick open a file", app: "VS Code" },
    { keys: "Ctrl+Shift+P", action: "Command palette", app: "VS Code" },
    { keys: "F5", action: "Reload the page in the browser", app: "Browser", practice: false, note: "Your browser uses this key to reload this page." },
    { keys: "F12", action: "Open the browser's developer tools", app: "Browser", practice: false, note: "Your browser reserves this key." },
    { keys: "Ctrl+Shift+I", action: "Open the developer tools (alternative)", app: "Browser", practice: false, note: "Your browser reserves this shortcut." },
  ],
  lessons: [
    {
      id: "html-basics",
      title: "Your first HTML page",
      summary: "Create an HTML file, understand tags and elements, add headings, paragraphs, links and an image, and view it in a browser.",
      diagram: { type: "code", lang: "index.html", lines: ["<!doctype html>", "<html lang=\"en\">", "<head> <title>Harbor Coffee</title> </head>", "<body>", "  <h1>Harbor Coffee</h1>", "</body>"], highlight: [4], notes: [[2, "Information about the page"], [4, "What visitors see"]] },
      steps: [
        {
          title: "Tags and elements",
          body: `<p>HTML marks up text with <strong>tags</strong> in angle brackets. <code>&lt;h1&gt;Harbor Coffee&lt;/h1&gt;</code> is an element: an opening tag, content, and a closing tag with a slash. The tag says what the content <em>is</em> (a top-level heading), not how it looks; looks come from CSS later.</p>`,
        },
        {
          title: "The page skeleton",
          body: `<p>In VS Code, make a folder for the site, create <code>index.html</code>, type <code>!</code> and press ${k("Tab")}: Emmet writes the skeleton for you. <code>&lt;head&gt;</code> holds information about the page (title, character set, viewport); <code>&lt;body&gt;</code> holds everything visitors see.</p>`,
        },
        {
          title: "Headings, paragraphs, links, images",
          body: `<p>Use <code>&lt;h1&gt;</code> once for the page's main heading and <code>&lt;h2&gt;</code> for sections. <code>&lt;p&gt;</code> wraps paragraphs. A link: <code>&lt;a href="#menu"&gt;Menu&lt;/a&gt;</code>. An image: <code>&lt;img src="hero.png" alt="…"&gt;</code>, where <code>alt</code> describes it for people who can't see it.</p>`,
        },
        {
          title: "View it",
          body: `<p>Save with ${k("Ctrl", "S")}, then open the file in your browser (double-click it in your file manager, or drag it into a browser window). After each change, save in VS Code and reload the browser. Unknown or mistyped tags don't cause errors; they're just ignored, so check what you see.</p>`,
        },
      ],
      quiz: [
        { q: "What does an HTML tag describe?", options: ["How text looks", "What the content is", "Where the file is saved", "The page's colors"], answer: 1, explain: "HTML gives meaning and structure; CSS handles appearance." },
        { q: "What is the alt attribute on an image for?", options: ["A tooltip", "A text description for people who can't see the image", "The file size", "Image alignment"], answer: 1, explain: "Screen readers read alt text aloud, and it shows if the image fails to load." },
      ],
      exercise: {
        title: "Mark up the café's content",
        task: `<p>Create index.html with the Emmet skeleton and the title “Harbor Coffee”. Using <strong>content.txt</strong>, add an h1, a paragraph for the tagline, h2 headings for “Our menu” and “Visit us”, and the hero image with alt text. View it in your browser.</p>`,
        files: ["content.txt", "hero.png"],
        solution: [
          "Type <code>!</code> and press Tab, then change the <code>&lt;title&gt;</code> to Harbor Coffee.",
          "In the body: <code>&lt;h1&gt;Harbor Coffee&lt;/h1&gt;</code> and <code>&lt;p&gt;Small-batch coffee by the water since 2019.&lt;/p&gt;</code>.",
          "Add <code>&lt;img src=\"hero.png\" alt=\"Abstract illustration of waves and a coffee cup\"&gt;</code> (with hero.png in the same folder).",
          "Add <code>&lt;h2&gt;Our menu&lt;/h2&gt;</code> and <code>&lt;h2&gt;Visit us&lt;/h2&gt;</code> with their text in paragraphs.",
          "Save and open the file in a browser: plain, unstyled text with the picture.",
        ],
      },
    },
    {
      id: "semantics",
      title: "Structure and meaning",
      summary: "Organize the page with header, nav, main, section and footer, use lists, and make it accessible from the start.",
      diagram: { type: "layers", items: ["<header> with <nav>", "<main> with <section>s", "<footer>"], highlight: 1, caption: "Landmarks tell browsers and screen readers what each part is" },
      steps: [
        {
          title: "Landmark elements",
          body: `<p>Wrap the logo and navigation in <code>&lt;header&gt;</code>, the page's unique content in <code>&lt;main&gt;</code>, and the copyright line in <code>&lt;footer&gt;</code>. Group each topic in a <code>&lt;section&gt;</code> with its own h2. These elements look like nothing on their own, but screen readers use them to jump around the page.</p>`,
        },
        {
          title: "Lists",
          body: `<p>A menu of items is a list: <code>&lt;ul&gt;</code> (unordered) with an <code>&lt;li&gt;</code> per item; <code>&lt;ol&gt;</code> numbers them. Emmet shortcut: type <code>ul&gt;li*4</code> and press ${k("Tab")} for a list with four items. Navigation links are usually a list inside <code>&lt;nav&gt;</code>.</p>`,
        },
        {
          title: "Links within the page",
          body: `<p>Give a section an id, <code>&lt;section id="menu"&gt;</code>, and link to it with <code>&lt;a href="#menu"&gt;</code>. Clicking jumps to that section. Ids must be unique on the page.</p>`,
        },
        {
          title: "Headings in order",
          body: `<p>Headings form an outline: one h1, then h2s for sections, h3s inside those. Don't pick a heading level for its size; choose by structure and style the size with CSS. A tidy outline helps search engines and people using screen readers alike.</p>`,
        },
      ],
      quiz: [
        { q: "Which element should hold the page's unique main content?", options: ["<div>", "<main>", "<section>", "<body>"], answer: 1, explain: "There's one <main> per page, for its primary content." },
        { q: "How do you link to a section with id=\"visit\" on the same page?", options: ["<a href=\"visit\">", "<a href=\"#visit\">", "<a id=\"visit\">", "<a href=\"/visit\">"], answer: 1, explain: "A # followed by the id links to that element." },
      ],
      exercise: {
        title: "Give the page structure",
        task: `<p>Add a header with the café name and a nav list linking to #menu, #visit and #contact; wrap the content in main with three sections (with matching ids); make the menu a list with four items; and add a footer.</p>`,
        files: ["content.txt", "finished-index.html"],
        solution: [
          "<code>&lt;header&gt;</code> with <code>&lt;p class=\"logo\"&gt;Harbor Coffee&lt;/p&gt;</code> and <code>&lt;nav&gt;&lt;ul&gt;</code> holding three <code>&lt;li&gt;&lt;a href=\"#…\"&gt;</code> links.",
          "<code>&lt;main&gt;</code> containing <code>&lt;section id=\"menu\"&gt;</code>, <code>&lt;section id=\"visit\"&gt;</code> and <code>&lt;section id=\"contact\"&gt;</code>.",
          "In the menu section, type <code>ul&gt;li*4</code> + Tab and fill in the four items with their prices.",
          "<code>&lt;footer&gt;&lt;p&gt;&amp;copy; 2026 Harbor Coffee&lt;/p&gt;&lt;/footer&gt;</code>. Compare with finished-index.html.",
        ],
      },
    },
    {
      id: "css-basics",
      title: "Styling with CSS",
      summary: "Link a stylesheet, write rules with selectors and properties, choose fonts and colors with custom properties, and understand the cascade.",
      diagram: { type: "code", lang: "style.css", lines: [".price {", "  font-weight: 700;", "  color: var(--sea);", "}"], highlight: [0], notes: [[0, "Selector: which elements"], [1, "Property: value;"]] },
      steps: [
        {
          title: "Link a stylesheet",
          body: `<p>Create <code>style.css</code> next to index.html, and in the head add <code>&lt;link rel="stylesheet" href="style.css"&gt;</code>. Keeping all styles in one file means one change restyles every page that links to it.</p>`,
        },
        {
          title: "Rules",
          body: `<p>A rule is a selector and a block of declarations: <code>h1 { color: #1f6f8b; }</code>. Selectors can target elements (<code>h1</code>), classes (<code>.price</code>, matching <code>class="price"</code>) or ids. Prefer classes for styling; they're reusable and easy to read.</p>`,
        },
        {
          title: "Type and color",
          body: `<p>Set the base on <code>body</code>: <code>font-family: system-ui, sans-serif; line-height: 1.6; color: #1d2733; background: #f6f1e8;</code>. Children inherit these. Store brand colors in custom properties, <code>:root { --sea: #1f6f8b; }</code>, and use them with <code>var(--sea)</code>, so changing a color is one edit.</p>`,
        },
        {
          title: "The cascade",
          body: `<p>When two rules set the same property, the more <em>specific</em> selector wins (an id beats a class, a class beats an element); if they're equally specific, the later rule wins. Your browser's developer tools (${k("F12")}) show every rule applied to an element, with overridden ones crossed out.</p>`,
        },
      ],
      quiz: [
        { q: "Which selector matches <p class=\"price\">?", options: ["price", ".price", "#price", "p.price only"], answer: 1, explain: "A dot targets a class (p.price would also work)." },
        { q: "Two rules with equally specific selectors set different colors. Which wins?", options: ["The first", "The one later in the stylesheet", "The darker color", "Neither"], answer: 1, explain: "With equal specificity, the last rule wins." },
      ],
      exercise: {
        title: "Brand colors and type",
        task: `<p>Link style.css, define --ink, --sea and --sand custom properties, set the body's font, line height, text color and background, and make prices bold in the sea color.</p>`,
        files: ["finished-style.css"],
        solution: [
          "In the head: <code>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</code>.",
          "<code>:root { --ink: #1d2733; --sea: #1f6f8b; --sand: #f6f1e8; }</code>",
          "<code>body { font-family: system-ui, sans-serif; line-height: 1.6; color: var(--ink); background: var(--sand); }</code>",
          "Add <code>class=\"price\"</code> to each price, then <code>.price { font-weight: 700; color: var(--sea); }</code>. Reload to check.",
        ],
      },
    },
    {
      id: "box-model",
      title: "The box model and spacing",
      summary: "Understand content, padding, border and margin, fix sizing with box-sizing, and center content with a readable width.",
      diagram: { type: "frames", variant: "autolayout", title: "Margin outside, border, padding inside, then content" },
      steps: [
        {
          title: "Every element is a box",
          body: `<p>From the inside out: the <strong>content</strong>, then <strong>padding</strong> (space inside the border), the <strong>border</strong>, and <strong>margin</strong> (space outside, between boxes). Developer tools draw these layers when you hover an element in the Elements panel.</p>`,
        },
        {
          title: "box-sizing: border-box",
          body: `<p>By default, <code>width</code> sets only the content's width, and padding and border are added on top, which makes sizes hard to predict. Put <code>*, *::before, *::after { box-sizing: border-box; }</code> at the top of the stylesheet so width includes padding and border.</p>`,
        },
        {
          title: "Readable width, centered",
          body: `<p>Long lines are hard to read. <code>main { max-width: 60rem; margin: 0 auto; padding: 0 1.5rem; }</code> limits the width, centers it with automatic side margins, and keeps text off the screen edges on phones. <code>rem</code> is relative to the browser's font size, so the layout respects the reader's settings.</p>`,
        },
        {
          title: "Cards",
          body: `<p>A card is a box with padding, background and border: <code>.card { padding: 1.25rem; background: white; border: 1px solid #e3dccf; border-radius: 0.75rem; }</code>. Remove the list's bullets and default spacing with <code>list-style: none; margin: 0; padding: 0;</code> on the <code>ul</code>.</p>`,
        },
      ],
      quiz: [
        { q: "Which property adds space inside an element's border?", options: ["margin", "padding", "gap", "outline"], answer: 1, explain: "Padding is inside the border; margin is outside." },
        { q: "What does margin: 0 auto do to a block with a max-width?", options: ["Removes it", "Centers it horizontally", "Aligns it right", "Adds space above"], answer: 1, explain: "Automatic left and right margins share the leftover space equally." },
      ],
      exercise: {
        title: "Space and cards",
        task: `<p>Add the box-sizing reset, center main at a maximum of 60rem with side padding, turn each menu item into a card, and remove the list's bullets.</p>`,
        files: ["finished-style.css"],
        solution: [
          "At the top: <code>*, *::before, *::after { box-sizing: border-box; }</code>.",
          "<code>main { max-width: 60rem; margin: 0 auto; padding: 0 1.5rem 3rem; }</code>",
          "Give the menu list <code>class=\"cards\"</code> and each item <code>class=\"card\"</code>.",
          "<code>.cards { list-style: none; margin: 0; padding: 0; }</code> and the .card rule from the last step.",
        ],
      },
    },
    {
      id: "layout",
      title: "Layout with Flexbox and Grid",
      summary: "Lay out the header and navigation in a row with Flexbox, and the menu cards in a responsive grid with CSS Grid.",
      diagram: { type: "compare", left: { title: "Flexbox (one direction)", items: ["Header: logo ↔ nav", "Nav links in a row", "justify-content, gap"] }, right: { title: "Grid (rows and columns)", items: ["Menu cards", "repeat(auto-fit,", "  minmax(12rem, 1fr))", "Wraps by itself"] }, accentRight: true, title: "Flexbox for rows, Grid for grids" },
      steps: [
        {
          title: "Flexbox for the header",
          body: `<p><code>.site-header { display: flex; justify-content: space-between; align-items: center; }</code> puts the logo and nav on one line, pushed to opposite ends and centered vertically. <code>justify-content</code> works along the row; <code>align-items</code> across it.</p>`,
        },
        {
          title: "Nav links in a row",
          body: `<p>The nav list is also a flex container: <code>.nav { display: flex; gap: 1.25rem; list-style: none; padding: 0; margin: 0; }</code>. <code>gap</code> sets the space between items without margins on each link.</p>`,
        },
        {
          title: "Grid for the cards",
          body: `<p><code>.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); gap: 1rem; }</code> makes as many columns as fit, each at least 12rem wide, sharing extra space equally. On a wide screen you get four columns; on a phone, one. No media query needed.</p>`,
        },
        {
          title: "Forms in a grid",
          body: `<p>A contact form is a single column of labels and fields: <code>.contact-form { display: grid; gap: 0.5rem; max-width: 28rem; }</code>. Every input needs a <code>&lt;label for="…"&gt;</code> matching its id, so clicking the label focuses the field and screen readers announce it.</p>`,
        },
      ],
      quiz: [
        { q: "Which CSS puts items at opposite ends of a flex row?", options: ["align-items: center", "justify-content: space-between", "gap: auto", "flex-wrap: wrap"], answer: 1, explain: "space-between pushes the first and last items to the edges." },
        { q: "What does repeat(auto-fit, minmax(12rem, 1fr)) do?", options: ["Always four columns", "As many columns as fit, each at least 12rem wide", "One column", "Columns exactly 12rem wide"], answer: 1, explain: "The grid adapts its column count to the available width." },
      ],
      exercise: {
        title: "Lay out the header, menu and form",
        task: `<p>Make the header a flex row with the logo left and nav right, the nav links a row with a gap, the menu cards a responsive grid, and the contact form a single-column grid with labeled fields and a button.</p>`,
        files: ["finished-index.html", "finished-style.css"],
        solution: [
          "<code>.site-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; background: white; }</code>",
          "<code>.nav { display: flex; gap: 1.25rem; margin: 0; padding: 0; list-style: none; }</code>",
          "<code>.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); gap: 1rem; }</code>",
          "Form: label + input pairs (name, email with <code>type=\"email\"</code>, message textarea) and a submit button; <code>.contact-form { display: grid; gap: 0.5rem; max-width: 28rem; }</code>.",
          "Resize the browser window: the cards go from four columns to one.",
        ],
      },
    },
    {
      id: "responsive",
      title: "Responsive design and finishing touches",
      summary: "Make the page work on phones with the viewport tag and media queries, keep images flexible, add focus styles, and check it in the browser's device mode.",
      diagram: { type: "compare", left: { title: "Wide screen", items: ["Header: one row", "Cards: 4 columns", "Max-width keeps lines short"] }, right: { title: "Phone (under 40rem)", items: ["Header: stacked", "Cards: 1 column", "Images shrink to fit"] }, accentRight: true, title: "One page, two layouts" },
      steps: [
        {
          title: "The viewport tag",
          body: `<p>Without <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code> in the head, phones pretend to be wide screens and shrink your page to fit. Emmet's skeleton includes it; keep it in every page.</p>`,
        },
        {
          title: "Flexible images and type",
          body: `<p><code>img { max-width: 100%; height: auto; display: block; }</code> stops images overflowing small screens. <code>font-size: clamp(2rem, 6vw, 3.25rem)</code> on the hero heading grows with the screen width but never below 2rem or above 3.25rem.</p>`,
        },
        {
          title: "Media queries",
          body: `<p>A media query applies rules only when a condition is true: <code>@media (max-width: 40rem) { .site-header { flex-direction: column; gap: 0.5rem; } }</code> stacks the header on narrow screens. Grid's auto-fit handles the cards already, so you need fewer queries than you might expect.</p>`,
        },
        {
          title: "Test and polish",
          body: `<p>Open developer tools and turn on the device toolbar (the phone-and-tablet icon) to preview phone sizes. Press ${k("Tab")} through the page: every link and field should show where focus is, so add <code>:focus-visible</code> styles alongside <code>:hover</code>. Check text contrast against the background.</p>`,
        },
      ],
      quiz: [
        { q: "What happens on a phone without the viewport meta tag?", options: ["The page won't load", "The phone renders it as a wide page and shrinks it", "Images disappear", "Nothing changes"], answer: 1, explain: "Mobile browsers assume a desktop-width page unless told otherwise." },
        { q: "What does @media (max-width: 40rem) { … } do?", options: ["Sets the page width to 40rem", "Applies the rules only when the viewport is 40rem wide or less", "Applies them above 40rem", "Limits images to 40rem"], answer: 1, explain: "The rules inside apply only when the condition is true." },
      ],
      exercise: {
        title: "Make it work on a phone",
        task: `<p>Check the viewport tag, make images flexible, size the hero heading with clamp, stack the header below 40rem, add focus styles to the nav links, and preview the page at a phone size in your browser's device toolbar.</p>`,
        files: ["finished-style.css", "finished-index.html"],
        solution: [
          "Confirm <code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;</code> is in the head.",
          "<code>img { max-width: 100%; height: auto; display: block; }</code> and <code>.hero h1 { font-size: clamp(2rem, 6vw, 3.25rem); }</code>",
          "<code>@media (max-width: 40rem) { .site-header { flex-direction: column; gap: 0.5rem; } }</code>",
          "<code>.nav a:hover, .nav a:focus-visible { color: var(--sea); text-decoration: underline; }</code>",
          "In developer tools, turn on the device toolbar and pick a phone: the header stacks and the cards form one column.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-second-page",
      title: "Bonus project: a second page and dark mode",
      summary: "Add an About page that shares the stylesheet and navigation, and support dark mode with a media query and custom properties.",
      diagram: { type: "tree", root: "harbor-coffee/", items: [["index.html", 1], ["about.html", 1, true], ["style.css (shared)", 1], ["hero.png", 1]], caption: "Two pages, one stylesheet" },
      steps: [
        {
          title: "A second page",
          body: `<p>Copy index.html to about.html, keep the header and footer, and replace main's content with an About section. Change the nav links to point between pages: <code>index.html#menu</code>, <code>about.html</code>. Mark the current page's link with <code>aria-current="page"</code>.</p>`,
        },
        {
          title: "Dark mode with custom properties",
          body: `<p>Because colors live in custom properties, dark mode is a few lines: <code>@media (prefers-color-scheme: dark) { :root { --ink: #eef2f5; --sand: #12181e; } }</code>. Replace fixed colors such as <code>background: white</code> with properties too, for example <code>--card: white</code>, so they switch as well.</p>`,
        },
        {
          title: "Style the current page",
          body: `<p><code>.nav a[aria-current="page"] { font-weight: 700; }</code> styles the link to the page you're on, using the same attribute screen readers announce. One attribute serves both purposes.</p>`,
        },
      ],
      quiz: [
        { q: "Why does storing colors in custom properties make dark mode easy?", options: ["Browsers invert them automatically", "You only redefine the properties inside one media query", "Custom properties are dark by default", "It isn't easier"], answer: 1, explain: "Every rule using var(--ink) updates when the property changes." },
        { q: "What does aria-current=\"page\" do?", options: ["Hides the link", "Tells assistive technology this link is the current page, and gives CSS a hook", "Opens the page in a new tab", "Makes the link bold automatically"], answer: 1, explain: "It's announced by screen readers and can be targeted with an attribute selector." },
      ],
      exercise: {
        title: "About page and dark mode",
        task: `<p>Create about.html sharing the header, footer and stylesheet, link the pages both ways with aria-current on the current link, and add a dark color scheme that switches with the system setting.</p>`,
        files: ["finished-index.html", "finished-style.css"],
        solution: [
          "Copy index.html to about.html, replace main with <code>&lt;section&gt;&lt;h1&gt;About Harbor Coffee&lt;/h1&gt;…&lt;/section&gt;</code>.",
          "Nav on both pages: Menu → index.html#menu, About → about.html; add <code>aria-current=\"page\"</code> to the current page's link.",
          "Add <code>--card: white;</code> to :root and use <code>var(--card)</code> for the header, cards and footer backgrounds.",
          "<code>@media (prefers-color-scheme: dark) { :root { --ink: #eef2f5; --sand: #12181e; --card: #1c252e; } }</code>",
          "Switch your system to dark mode and reload: both pages change.",
        ],
      },
    },
    practice: [
      {
        title: "An opening-hours table",
        task: `<p>Add an opening-hours table to the Visit section with a caption, a header row and seven days, styled with borders between rows.</p>`,
        files: ["finished-index.html"],
        solution: [
          "<code>&lt;table&gt;&lt;caption&gt;Opening hours&lt;/caption&gt;&lt;thead&gt;&lt;tr&gt;&lt;th scope=\"col\"&gt;Day&lt;/th&gt;&lt;th scope=\"col\"&gt;Hours&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;</code>",
          "A <code>&lt;tbody&gt;</code> with a row per day: <code>&lt;tr&gt;&lt;th scope=\"row\"&gt;Monday&lt;/th&gt;&lt;td&gt;7am–5pm&lt;/td&gt;&lt;/tr&gt;</code>.",
          "<code>table { border-collapse: collapse; } th, td { padding: 0.5rem 1rem; border-bottom: 1px solid #e3dccf; text-align: left; }</code>",
        ],
      },
      {
        title: "A button style for links",
        task: `<p>Make a “View the menu” link in the hero look like a button, with hover and focus styles, without changing it from a link.</p>`,
        files: ["finished-style.css"],
        solution: [
          "In the hero: <code>&lt;a class=\"button\" href=\"#menu\"&gt;View the menu&lt;/a&gt;</code>.",
          "<code>.button { display: inline-block; padding: 0.6rem 1.25rem; color: white; background: var(--sea); border-radius: 0.5rem; text-decoration: none; }</code>",
          "<code>.button:hover, .button:focus-visible { background: #165a71; outline: 2px solid var(--ink); outline-offset: 2px; }</code>",
          "It stays a link because it goes somewhere; real buttons are for actions such as submitting a form.",
        ],
      },
      {
        title: "Two columns on wide screens",
        task: `<p>On screens wider than 60rem, show the Visit and Contact sections side by side; keep them stacked on smaller screens.</p>`,
        files: ["finished-index.html", "finished-style.css"],
        solution: [
          "Wrap the two sections in <code>&lt;div class=\"two-up\"&gt;</code>.",
          "<code>@media (min-width: 60rem) { .two-up { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; } }</code>",
          "Resize the window across 60rem to see the switch.",
        ],
      },
    ],
  },
  async makeFiles({ png }) {
    const W = 1200, H = 500;
    const hero = png(W, H, (x, y) => {
      const wave = Math.sin(x / 70 + Math.sin(y / 90) * 1.2) * 18;
      const bands = Math.floor((y + wave) / 60);
      const t = bands / 9;
      const cx = 600, cy = 230, r = Math.hypot((x - cx) / 1.15, y - cy);
      if (r < 95 && y < cy + 40 && y > cy - 70) return [246, 241, 232];
      if (r < 105 && y < cy + 50 && y > cy - 80) return [31, 111, 139];
      return [30 + 40 * t, 90 + 50 * t, 120 + 50 * t];
    });
    return {
      "content.txt": STARTER_HTML,
      "hero.png": hero,
      "finished-index.html": FINISHED_HTML,
      "finished-style.css": FINISHED_CSS,
    };
  },
};
