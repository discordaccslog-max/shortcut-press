import { k } from "./_helpers.mjs";

const OUTLINE = `Starting a Community Garden
\tA plan for the empty lot on Maple Street
Why a garden here
\tThe lot has been empty for six years
\tTwenty-three neighbors signed up in one week
\tThe nearest grocery store is two miles away
What we need
\tPermission from the city
\tRaised beds and soil
\tA water connection
\tVolunteers for the first season
The first season
\tMarch: clear the lot and build beds
\tApril: plant greens and herbs
\tJune: first harvest
What it will cost
\tBeds and soil: 1,800
\tTools and a shed: 950
\tWater connection: 600
How you can help
\tAdopt a bed
\tJoin a Saturday work party
\tTell a neighbor
`;

const HARVEST = [
  ["Month", "Greens (kg)", "Herbs (kg)", "Tomatoes (kg)"],
  ["May", 12, 3, 0],
  ["June", 28, 6, 4],
  ["July", 34, 8, 22],
  ["August", 30, 7, 41],
  ["September", 22, 5, 26],
];

export default {
  id: "powerpoint-presentations",
  slug: "powerpoint-presentations",
  title: "Presentation Design in PowerPoint",
  software: "PowerPoint",
  apps: ["PowerPoint"],
  intro:
    "Design clear, consistent presentations in Microsoft PowerPoint: slide masters and layouts, turning an outline into slides, alignment and spacing, charts and tables, pictures and icons, and animation and presenting. The lessons build one short talk from the practice outline.",
  platformNote: "Shortcuts are shown for PowerPoint for Windows. On a Mac, use Cmd in place of Ctrl; to start a slide show from the beginning on a Mac, press Cmd+Shift+Enter.",
  store: {
    category: "office",
    level: "Beginner to intermediate",
    software: "Microsoft PowerPoint",
    softwareShort: "PowerPoint",
    softwareHtml: `<p>This guide is written for the desktop version of <strong>Microsoft PowerPoint</strong> (Microsoft 365 or PowerPoint 2021 and later) on Windows or Mac. Most steps also work in PowerPoint for the web, which has fewer options in some menus. PowerPoint is not included with the guide; you need your own copy or subscription, obtained separately from Microsoft.</p>`,
    forWho: [
      "You make slides for work, school or community groups and want them to look consistent.",
      "You fix fonts and colors slide by slide and want to set them once instead.",
      "You'd like charts, pictures and animation that support the talk rather than distract from it.",
    ],
    notFor: [
      "You want public speaking coaching. The guide covers building and running the slides, not delivering the talk.",
      "You use Google Slides or Keynote. The menus and shortcuts here are PowerPoint's.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "talk-outline.txt", title: "Talk outline", desc: "A six-slide talk outline, indented with tabs so PowerPoint can turn it into slides." },
    { name: "harvest-data.xlsx", title: "Chart data", desc: "Five months of harvest figures for the chart lesson." },
    { name: "garden-icons.svg", title: "Icon set", desc: "Six simple line icons in one SVG file, to convert to shapes and recolor." },
    { name: "garden-photo.png", title: "Background picture", desc: "An abstract garden-rows picture, 1200 × 675 pixels, for the pictures lesson." },
  ],
  shortcuts: [
    { keys: "Ctrl+M", action: "New slide", app: "PowerPoint" },
    { keys: "Ctrl+D", action: "Duplicate the selected slide or object", app: "PowerPoint" },
    { keys: "Ctrl+Enter", action: "Move to the next placeholder (or add a slide after the last)", app: "PowerPoint" },
    { keys: "Alt+Shift+Right", action: "Demote a line in the outline", app: "PowerPoint" },
    { keys: "Alt+Shift+Left", action: "Promote a line in the outline", app: "PowerPoint" },
    { keys: "Ctrl+G", action: "Group the selected objects", app: "PowerPoint" },
    { keys: "Ctrl+Shift+G", action: "Ungroup", app: "PowerPoint" },
    { keys: "Ctrl+]", action: "Increase the font size", app: "PowerPoint" },
    { keys: "Ctrl+[", action: "Decrease the font size", app: "PowerPoint" },
    { keys: "Ctrl+E", action: "Center the text", app: "PowerPoint" },
    { keys: "Ctrl+K", action: "Insert a link", app: "PowerPoint" },
    { keys: "Alt+F10", action: "Show or hide the Selection pane", app: "PowerPoint" },
    { keys: "Ctrl+Alt+V", action: "Paste Special", app: "PowerPoint" },
    { keys: "B", action: "Black screen during a slide show", app: "PowerPoint" },
    { keys: "W", action: "White screen during a slide show", app: "PowerPoint" },
    { keys: "Esc", action: "End the slide show", app: "PowerPoint", practice: false, note: "The trainer uses Esc to leave the practice area." },
    { keys: "F5", action: "Start the slide show from the beginning", app: "PowerPoint", practice: false, note: "Your browser uses this key to reload the page." },
    { keys: "Shift+F5", action: "Start the slide show from the current slide", app: "PowerPoint", practice: false, note: "Your browser may reload the page." },
    { keys: "Ctrl+Shift+C", action: "Copy formatting", app: "PowerPoint", practice: false, note: "Your browser uses this shortcut for its developer tools." },
  ],
  lessons: [
    {
      id: "masters",
      title: "Slide masters and layouts",
      summary: "Set fonts, colors and placeholders once in the slide master so every slide in the deck follows them.",
      diagram: { type: "tree", root: "Slide master", items: [["Title Slide layout", 1], ["Title and Content layout", 1, true], ["Section Header layout", 1], ["Your slides use a layout", 2], ["Change the layout: every slide follows", 2]], caption: "Change the master once; every layout and slide follows" },
      steps: [
        {
          title: "The master, the layouts, the slides",
          body: `<p>Every slide is built on a <strong>layout</strong> (Title Slide, Title and Content, Two Content and so on), and every layout belongs to a <strong>slide master</strong>. Choose <em>View › Slide Master</em> to see them: the master is the large thumbnail at the top of the left pane, with its layouts indented below.</p>`,
        },
        {
          title: "Theme fonts and colors",
          body: `<p>On the <em>Slide Master</em> tab, open <em>Fonts</em> and choose a pairing, or select <em>Customize Fonts</em> to choose a heading font and a body font. Open <em>Colors</em> and pick or customize a palette. Text and shapes that use theme fonts and colors update everywhere when you change them here.</p>`,
        },
        {
          title: "Adjust a layout",
          body: `<p>Select a layout thumbnail and edit it like a slide: move the title placeholder, change its size, or add a placeholder with <em>Insert Placeholder</em> (for example, a Picture placeholder). Select <em>Insert Layout</em> to make a new one and <em>Rename</em> to give it a clear name.</p>`,
        },
        {
          title: "Back to the slides",
          body: `<p>Select <em>Close Master View</em>. To switch a slide to another layout, right-click it in the thumbnail pane and choose <em>Layout</em>. If a slide has drifted from its layout after manual edits, <em>Home › Reset</em> puts its placeholders back.</p>`,
        },
      ],
      quiz: [
        { q: "Where do you change the fonts for every slide at once?", options: ["Home › Font on each slide", "View › Slide Master, then Fonts", "Design › Format Background", "Insert › Text Box"], answer: 1, explain: "Theme fonts set in the slide master apply to every layout and slide that uses them." },
        { q: "A slide's title has been dragged out of place. What puts it back where the layout says?", options: ["Ctrl+Z repeatedly", "Home › Reset", "Delete the slide", "View › Normal"], answer: 1, explain: "Reset restores the slide's placeholders to the positions and formatting of its layout." },
      ],
      exercise: {
        title: "Set up the deck's look",
        task: `<p>Start a blank presentation. In the slide master, choose a heading and body font and a color palette, move the title placeholder of the Title and Content layout to the left edge, and add a new layout named “Photo” with a full-slide picture placeholder.</p>`,
        files: [],
        solution: [
          "<em>File › New › Blank Presentation</em>, then <em>View › Slide Master</em>.",
          "On the Slide Master tab, <em>Fonts › Customize Fonts</em>: pick a heading and body font and save. <em>Colors</em>: choose a palette.",
          "Select the Title and Content layout and drag its title placeholder to the left edge.",
          "Select <em>Insert Layout</em>, then <em>Rename</em> and type “Photo”. Delete the placeholders you don't need.",
          "<em>Insert Placeholder › Picture</em> and drag it over the whole layout. Select <em>Close Master View</em>.",
        ],
      },
    },
    {
      id: "outline",
      title: "From outline to slides",
      summary: "Write the talk as an outline and let PowerPoint turn it into slides, then edit the structure in Outline view.",
      diagram: { type: "code", lang: "talk-outline.txt", lines: ["Why a garden here", "→ The lot has been empty…", "→ Twenty-three neighbors…", "What we need", "→ Permission from the city"], highlight: [0, 3], notes: [[0, "No tab: a slide title"], [1, "One tab: a bullet"]] },
      steps: [
        {
          title: "Outline first",
          body: `<p>Slides are easier to design once the content is settled. In a text file or a document, write one line per slide title and indent the points under it with a tab. That indentation is all PowerPoint needs to build the slides.</p>`,
        },
        {
          title: "Slides from Outline",
          body: `<p>On the <em>Home</em> tab, open the <em>New Slide</em> menu (the arrow under the button) and choose <em>Slides from Outline</em>. Pick <strong>talk-outline.txt</strong>. Every line without a tab becomes a new slide's title; every tabbed line becomes a bullet on it.</p>`,
        },
        {
          title: "Edit the structure in Outline view",
          body: `<p>Choose <em>View › Outline View</em>. The left pane now shows the whole talk as text. Press ${k("Alt", "Shift", "Left")} on a bullet to promote it to its own slide, or ${k("Alt", "Shift", "Right")} on a title to demote it into the previous slide. ${k("Tab")} and ${k("Shift", "Tab")} do the same.</p>`,
        },
        {
          title: "Apply the right layouts",
          body: `<p>Imported slides arrive with the Title and Content layout. Select all of them in the thumbnail pane, right-click and choose <em>Reset Slide</em> so they pick up your master's fonts. Then give the first slide the Title Slide layout.</p>`,
        },
      ],
      quiz: [
        { q: "In an outline imported with Slides from Outline, what does a line with no tab become?", options: ["A bullet", "A slide title", "Speaker notes", "Nothing: it's skipped"], answer: 1, explain: "Unindented lines start new slides; indented lines become bullets." },
        { q: "In Outline view, which shortcut turns a bullet into a slide of its own?", options: ["Alt+Shift+Right", "Alt+Shift+Left", "Ctrl+M", "Ctrl+D"], answer: 1, explain: "Promoting (Alt+Shift+Left or Shift+Tab) moves a line up a level; at the top level it becomes a slide title." },
      ],
      exercise: {
        title: "Build the talk from the outline",
        task: `<p>Using your presentation from Lesson 1, import <strong>talk-outline.txt</strong> with Slides from Outline. In Outline view, move “The first season” so it comes after “What it will cost”, and reset the imported slides so they use your master's fonts.</p>`,
        files: ["talk-outline.txt"],
        solution: [
          "<em>Home › New Slide</em> (arrow) <em>› Slides from Outline</em>, choose the file and select <em>Insert</em>. Six slides appear.",
          "<em>View › Outline View</em>. Select the line “The first season” and its bullets by clicking its slide icon.",
          "Drag the slide icon down below the “What it will cost” bullets, or cut it and paste it there.",
          "In the thumbnail pane, press Ctrl+A, right-click and choose <em>Reset Slide</em>. Set slide 1 to the Title Slide layout with <em>Home › Layout</em>.",
        ],
      },
    },
    {
      id: "alignment",
      title: "Alignment, spacing and space",
      summary: "Line things up with smart guides and the Align tools, space them evenly, and leave room so each slide makes one point.",
      diagram: { type: "frames", variant: "autolayout", title: "Equal gaps and shared edges make a slide look ordered" },
      steps: [
        {
          title: "Smart guides and gridlines",
          body: `<p>When you drag a shape, dashed red lines appear as it lines up with other objects or the slide's center: those are <strong>smart guides</strong>. For a fixed reference, turn on <em>View › Guides</em> (drag them where you want) or <em>View › Gridlines</em>.</p>`,
        },
        {
          title: "Align and distribute",
          body: `<p>Select several objects, then on the <em>Shape Format</em> tab choose <em>Align</em>. <em>Align Top</em> or <em>Align Middle</em> lines them up; <em>Distribute Horizontally</em> makes the gaps between them equal. Choose <em>Align to Slide</em> first to center things on the slide instead.</p>`,
        },
        {
          title: "Group and the Selection pane",
          body: `<p>Press ${k("Ctrl", "G")} to group objects that belong together so they move as one. Press ${k("Alt", "F10")} to open the Selection pane, where you can rename, hide and reorder objects, which helps when shapes sit on top of each other.</p>`,
        },
        {
          title: "One point per slide",
          body: `<p>If a slide needs more than about six short lines, it's two slides. Split it with ${k("Ctrl", "D")} to duplicate, then delete half the bullets from each copy. Leave generous margins: space around text makes it easier to read from the back of a room.</p>`,
        },
      ],
      quiz: [
        { q: "You've placed three icons in a row with uneven gaps. Which command fixes the gaps?", options: ["Align Center", "Distribute Horizontally", "Group", "Bring to Front"], answer: 1, explain: "Distribute Horizontally makes the space between the selected objects equal." },
        { q: "Which shortcut opens the Selection pane?", options: ["Alt+F10", "Ctrl+G", "Alt+F9", "Ctrl+Alt+V"], answer: 0, explain: "Alt+F10 shows or hides the Selection pane." },
      ],
      exercise: {
        title: "Lay out three points",
        task: `<p>On the “What we need” slide, replace the bullets with three rounded rectangles in a row, each holding one need. Make them the same size, align their tops, space them evenly, center the row on the slide, and group it.</p>`,
        files: [],
        solution: [
          "<em>Insert › Shapes › Rectangle: Rounded Corners</em>, draw one box and type the first need into it.",
          `Select it and press ${k("Ctrl", "D")} twice for two copies; edit their text.`,
          "Select all three. <em>Shape Format › Align › Align Top</em>, then <em>Align › Distribute Horizontally</em>.",
          `Press ${k("Ctrl", "G")} to group, then <em>Align › Align Center</em> with <em>Align to Slide</em> ticked.`,
          "Delete the original bullet placeholder's text, or the placeholder itself.",
        ],
      },
    },
    {
      id: "charts",
      title: "Charts and tables",
      summary: "Insert a chart that stays editable, choose the right type, simplify it, and use a table when exact numbers matter.",
      diagram: { type: "bars", values: [15, 38, 64, 78, 53], labels: ["May", "Jun", "Jul", "Aug", "Sep"], highlight: 3, showValues: true, title: "One message per chart: August was the biggest month" },
      steps: [
        {
          title: "Insert a chart",
          body: `<p>Choose <em>Insert › Chart</em>, pick <em>Column</em> and select <em>OK</em>. A small spreadsheet opens with sample data. Paste your figures over it (copy A1:D6 from <strong>harvest-data.xlsx</strong>) and close it. The chart stays editable: <em>Chart Design › Edit Data</em> reopens it.</p>`,
        },
        {
          title: "Pick the type for the message",
          body: `<p>Columns compare amounts; a line shows change over time; a pie shows parts of one whole and only works with a few slices. <em>Chart Design › Change Chart Type</em> switches type without losing data. For the harvest, a stacked column shows each month's total and what it was made of.</p>`,
        },
        {
          title: "Simplify",
          body: `<p>Select the <strong>+</strong> button beside the chart (<em>Chart Elements</em>) and remove gridlines you don't need; add data labels if the exact numbers matter. Write the message as the slide title (“August was our biggest month”) rather than “Harvest by month”. Color one series or bar in the accent color to point at it.</p>`,
        },
        {
          title: "When to use a table",
          body: `<p>If people need to read exact figures, such as the costs on the budget slide, use <em>Insert › Table</em>. Keep it small, right-align numbers so the digits line up, and use a <em>Table Design</em> style with light banding.</p>`,
        },
      ],
      quiz: [
        { q: "How do you change the numbers behind a chart you inserted in PowerPoint?", options: ["Retype the labels on the chart", "Chart Design › Edit Data", "Insert a new chart", "Home › Replace"], answer: 1, explain: "Edit Data reopens the chart's own spreadsheet." },
        { q: "Which slide title best supports a harvest chart?", options: ["Chart 1", "Harvest by month", "August was our biggest month", "Data"], answer: 2, explain: "A title that states the point tells the audience what to see in the chart." },
      ],
      exercise: {
        title: "Chart the first season",
        task: `<p>Add a slide after “The first season” with a stacked column chart of <strong>harvest-data.xlsx</strong>. Give it a title that states the point, remove the gridlines, and add a total in the slide's text if you like.</p>`,
        files: ["harvest-data.xlsx"],
        solution: [
          `Select “The first season” and press ${k("Ctrl", "M")} for a new slide.`,
          "<em>Insert › Chart › Column › Stacked Column</em>, <em>OK</em>.",
          "In the chart's spreadsheet, paste the harvest data over the sample, drag the blue range border to fit A1:D6, and close it.",
          "Select <em>Chart Elements</em> (+) and untick <em>Gridlines</em>.",
          "Type a title such as “August was our biggest month: 78 kg”.",
        ],
      },
    },
    {
      id: "pictures",
      title: "Pictures and icons",
      summary: "Crop and fit pictures, use icons you can recolor, and add alt text so everyone can follow the deck.",
      diagram: { type: "layers", items: ["Title text", "Dark overlay (40% transparent)", "Full-slide picture"], highlight: 1, caption: "A semi-transparent shape keeps text readable on a photo" },
      steps: [
        {
          title: "Insert and crop",
          body: `<p>Choose <em>Insert › Pictures › This Device</em> and pick <strong>garden-photo.png</strong>. On the <em>Picture Format</em> tab, select <em>Crop</em> and drag the black handles, or open the <em>Crop</em> menu and choose <em>Crop to Shape</em> or an <em>Aspect Ratio</em> such as 16:9. Click outside the picture to finish.</p>`,
        },
        {
          title: "Text on a picture",
          body: `<p>Stretch the picture over the whole slide, then draw a rectangle on top, fill it black, and set its transparency to around 40% in <em>Format Shape</em>. Put the title above that shape (right-click › <em>Bring to Front</em>). The text stays readable whatever the picture shows.</p>`,
        },
        {
          title: "Icons you can recolor",
          body: `<p>Insert <strong>garden-icons.svg</strong> with <em>Insert › Pictures</em>. With it selected, choose <em>Graphics Format › Convert to Shape</em>, then press ${k("Ctrl", "Shift", "G")} to ungroup. Each icon is now a shape you can recolor with <em>Shape Outline</em>. <em>Insert › Icons</em> also has a library you can use in the same way.</p>`,
        },
        {
          title: "Alt text and the accessibility checker",
          body: `<p>Right-click a picture and choose <em>View Alt Text</em> to describe it for people using screen readers, or mark it as decorative. <em>Review › Check Accessibility</em> lists slides with missing alt text, missing titles or low contrast.</p>`,
        },
      ],
      quiz: [
        { q: "How do you make SVG icons recolorable as separate shapes?", options: ["Picture Format › Recolor", "Graphics Format › Convert to Shape, then ungroup", "Paste Special as a picture", "Insert › Screenshot"], answer: 1, explain: "Converting the SVG to shapes and ungrouping gives you one editable shape per icon." },
        { q: "Why put a semi-transparent dark shape between a photo and its title?", options: ["To reduce the file size", "To keep the text readable over any part of the photo", "It's required for animation", "To add alt text"], answer: 1, explain: "The overlay evens out the photo's light and dark areas behind the text." },
      ],
      exercise: {
        title: "A photo title slide and an icon row",
        task: `<p>Make the title slide a full-slide <strong>garden-photo.png</strong> with a 40% transparent black overlay and white title text. On the “How you can help” slide, add three icons from <strong>garden-icons.svg</strong>, recolored to your accent color, above the three points. Add alt text to the photo.</p>`,
        files: ["garden-photo.png", "garden-icons.svg"],
        solution: [
          "On slide 1, <em>Insert › Pictures › This Device</em>, choose the photo and stretch it to cover the slide; right-click › <em>Send to Back</em>.",
          "Draw a rectangle over the slide, set the fill to black and transparency to 40% (right-click › <em>Format Shape</em>), and send it backward once so it sits between the photo and the title. Make the title text white.",
          "On the help slide, insert the SVG, choose <em>Graphics Format › Convert to Shape</em>, and press Ctrl+Shift+G.",
          "Keep three icons, delete the rest, set <em>Shape Outline</em> to your accent color, and align and distribute them above the points.",
          "Right-click the photo, choose <em>View Alt Text</em>, and type a short description, or tick <em>Mark as decorative</em>.",
        ],
      },
    },
    {
      id: "presenting",
      title: "Animation, transitions and presenting",
      summary: "Use animation to reveal points in order, Morph for smooth changes, Presenter View for notes, and export a PDF to share.",
      diagram: { type: "timeline", variant: "cut", title: "Reveal one point at a time, in the order you'll speak" },
      steps: [
        {
          title: "Reveal points one at a time",
          body: `<p>Select a text placeholder and choose <em>Animations › Appear</em> or <em>Fade</em>. Each bullet now appears on a click. Open <em>Animations › Animation Pane</em> to see the order, change <em>Start</em> to <em>With Previous</em> or <em>After Previous</em>, and drag items to reorder them.</p>`,
        },
        {
          title: "Morph between slides",
          body: `<p>Duplicate a slide with ${k("Ctrl", "D")}, then move, resize or recolor objects on the copy. Select the copy and choose <em>Transitions › Morph</em>. During the show, PowerPoint animates every object from its old place to its new one. Use the same transition across the deck for a calm feel.</p>`,
        },
        {
          title: "Presenter View and notes",
          body: `<p>Type what you want to say in the <em>Notes</em> pane under each slide. With a second screen connected, tick <em>Slide Show › Use Presenter View</em>: you see your notes, the next slide and a timer while the audience sees only the slide. Start with <em>Slide Show › From Beginning</em>; press ${k("B")} to black the screen and ${k("Esc")} to end.</p>`,
        },
        {
          title: "Share it as a PDF",
          body: `<p>Choose <em>File › Export › Create PDF/XPS Document</em>. Under <em>Options</em> you can include notes pages or hidden slides. A PDF opens on any device and keeps your fonts and layout, although animations and transitions don't carry over.</p>`,
        },
      ],
      quiz: [
        { q: "What does the Morph transition need to work?", options: ["A video on each slide", "The same objects on two consecutive slides", "Presenter View turned on", "Animations on every object"], answer: 1, explain: "Morph matches objects that appear on both slides and animates the differences." },
        { q: "During a slide show, which key blacks out the screen?", options: ["Esc", "B", "W", "Space"], answer: 1, explain: "B toggles a black screen; W toggles a white one." },
      ],
      exercise: {
        title: "Rehearse-ready deck",
        task: `<p>Make the bullets on “Why a garden here” appear one at a time, add a Morph transition between two slides of your choice, write a one-line note for every slide, and export the deck as a PDF.</p>`,
        files: [],
        solution: [
          "Select the bullet placeholder on “Why a garden here”, choose <em>Animations › Fade</em>; open the <em>Animation Pane</em> to check there are three entries, one per bullet.",
          `Select a slide, press ${k("Ctrl", "D")}, move or resize something on the copy, and choose <em>Transitions › Morph</em> on the copy.`,
          "Click into the <em>Notes</em> pane below each slide and type a reminder line (choose <em>View › Notes</em> if it's hidden).",
          "<em>File › Export › Create PDF/XPS Document › Create PDF/XPS</em>, choose a location and select <em>Publish</em>.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-pitch",
      title: "Bonus project: a five-slide pitch",
      summary: "Plan and build a five-slide pitch with a problem, a solution, proof, a cost and an ask, using one layout system and one accent color from start to finish.",
      diagram: { type: "flow", nodes: ["Problem", "Solution", "Proof", "Cost", "Ask"], highlight: 4, title: "Five slides, each with one job" },
      steps: [
        {
          title: "Write the five headlines first",
          body: `<p>Before opening PowerPoint, write five sentences, one per slide: the problem, your solution, evidence it works, what it costs, and what you're asking for. Each sentence becomes a slide title. If a headline needs “and”, it's two slides.</p>`,
        },
        {
          title: "One layout system",
          body: `<p>In the slide master, make two layouts: a <em>Statement</em> layout (large title, nothing else) and a <em>Statement + Visual</em> layout (title on the left third, a picture placeholder on the right). Every slide in the pitch uses one of the two; that consistency is what makes a short deck look designed.</p>`,
        },
        {
          title: "End on the ask",
          body: `<p>The last slide states exactly what you want from the audience and how to do it: an amount, a date, a link. Use ${k("Ctrl", "K")} to make the link clickable in the PDF version, and keep it on screen during questions.</p>`,
        },
      ],
      quiz: [
        { q: "Why write the five headlines before designing?", options: ["PowerPoint requires titles first", "It fixes the story so design decisions follow the message", "It makes the file smaller", "Headlines can't be changed later"], answer: 1, explain: "Settled content means every layout choice supports a point you've already decided to make." },
        { q: "Which slide should stay on screen during questions?", options: ["The title slide", "The proof slide", "The ask", "A blank slide"], answer: 2, explain: "Leaving the ask visible keeps the next step in front of the audience." },
      ],
      exercise: {
        title: "Build the pitch",
        task: `<p>Build a five-slide pitch for the community garden asking local businesses to sponsor a raised bed. Use two layouts only, one accent color, at least one chart or icon, and a clickable link on the last slide.</p>`,
        files: ["harvest-data.xlsx", "garden-icons.svg"],
        solution: [
          "Headlines, for example: “The Maple Street lot has been empty for six years”; “A community garden for 23 households”; “Last season we grew 248 kg of food”; “A sponsored bed costs 150”; “Sponsor a bed by April 1”.",
          "In <em>View › Slide Master</em>, add the two layouts described in the steps and set the accent color under <em>Colors</em>.",
          "Insert five slides with <em>Home › New Slide</em>, choosing a layout for each. Put the stacked harvest chart on the proof slide.",
          "On the ask slide, type the sign-up address, select it and press Ctrl+K to link it.",
          "Check every slide uses the accent color for one thing only, then export a PDF.",
        ],
      },
    },
    practice: [
      {
        title: "Rebuild a cluttered slide",
        task: `<p>Make a slide with the “What it will cost” content written as one long paragraph. Rebuild it as a three-row table with right-aligned numbers and a total, using a light table style.</p>`,
        files: ["talk-outline.txt"],
        solution: [
          "<em>Insert › Table</em>, 2 columns × 4 rows. Type the three items and amounts, and “Total” in the last row.",
          "Select the amount column and press Ctrl+R to right-align it.",
          "In the total cell type 3,350 (1,800 + 950 + 600) and make the row bold.",
          "Choose a light style in <em>Table Design</em> and untick <em>Banded Rows</em> if it looks busy.",
        ],
      },
      {
        title: "A section divider layout",
        task: `<p>Add a “Section Header” style layout to your master with a full-width colored band and a large number, then use it for a divider before “What it will cost”.</p>`,
        files: [],
        solution: [
          "<em>View › Slide Master</em>, select the Section Header layout (or <em>Insert Layout</em>).",
          "Draw a rectangle across the layout, fill it with the accent color, and send it to the back.",
          "Add a text placeholder for the number with <em>Insert Placeholder › Text</em>, set a large font size, and close the master view.",
          "Select the slide before “What it will cost”, press Ctrl+M, and choose the new layout from <em>Home › Layout</em>.",
        ],
      },
      {
        title: "Animate a chart by series",
        task: `<p>On the harvest chart slide, make the chart appear one series at a time: greens, then herbs, then tomatoes.</p>`,
        files: ["harvest-data.xlsx"],
        solution: [
          "Select the chart and choose <em>Animations › Wipe</em> (or Fade).",
          "Select <em>Effect Options › By Series</em>.",
          "Open the <em>Animation Pane</em> and expand the entry to check there's one step per series.",
          "Play the slide with Shift+F5 to check the order.",
        ],
      },
    ],
  },
  async makeFiles({ xlsx, png }) {
    const icons = [
      '<path d="M12 21V11M12 11c0-4 3-6 7-6 0 4-3 6-7 6zM12 14c0-3-2-5-6-5 0 3 2 5 6 5z"/>',
      '<path d="M5 21h14M7 21V10l5-4 5 4v11M10 21v-5h4v5"/>',
      '<path d="M12 3c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z"/>',
      '<path d="M4 20l7-7M14 4l6 6-5 5-6-6zM9 9l6 6"/>',
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
      '<path d="M8 11a4 4 0 1 1 8 0v1a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3zM6 21c1-3 3-5 6-5s5 2 6 5"/>',
    ];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 36" width="648" height="108" fill="none" stroke="#1f2a1c" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">\n${icons.map((d, i) => `<g transform="translate(${i * 36 + 6} 6)">${d}</g>`).join("\n")}\n</svg>\n`;
    const W = 1200, H = 675;
    const photo = png(W, H, (x, y) => {
      if (y < 260) {
        const t = y / 260;
        return [170 + 50 * t, 205 + 30 * t, 230 - 10 * t];
      }
      const row = Math.floor((y - 260) / 34);
      const band = ((y - 260) % 34) / 34;
      const wave = Math.sin(x / 38 + row * 1.7) * 0.5 + 0.5;
      const leafy = band > 0.18 && band < 0.82 && wave > 0.35;
      const depth = (y - 260) / (H - 260);
      return leafy ? [52 + 30 * depth, 112 + 40 * wave, 50 + 10 * depth] : [96 + 30 * depth, 74 + 20 * depth, 52 + 10 * depth];
    });
    return {
      "talk-outline.txt": OUTLINE.replace(/\n/g, "\r\n"),
      "harvest-data.xlsx": xlsx([{ name: "Harvest", rows: HARVEST, widths: [12, 12, 12, 14] }], "Harvest data"),
      "garden-icons.svg": svg,
      "garden-photo.png": photo,
    };
  },
};
