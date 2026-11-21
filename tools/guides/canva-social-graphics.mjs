import { k } from "./_helpers.mjs";

const BRAND = `Harbor Coffee: brand guide for the Canva practice project

Colors
  Sea blue     #1F6F8B   headlines, buttons, one accent per design
  Sand         #F6F1E8   backgrounds
  Ink          #1D2733   body text
  Terracotta   #C8784F   highlights, prices, small details

Fonts (free in Canva)
  Headings     a bold sans serif, for example Montserrat ExtraBold
  Body         a clean sans serif, for example Open Sans

Logo
  harbor-logo.svg on light backgrounds; leave space around it at least the height of the cup.

Voice
  Short, warm, specific. "Cardamom buns are back" rather than "Exciting news!"
`;

const COPY = `Post 1: new menu item (square post, 1080 x 1080)
Headline: Cardamom buns are back
Subline: Baked every morning from 7am
Small print: 12 Quay Street, Seaview

Post 2: event (story, 1080 x 1920)
Headline: Latte art night
Details: Friday 14 March, 6pm to 8pm
Call to action: Free entry, spaces are limited, reply to save yours

Post 3: carousel (5 slides) for the bonus project
1. How we brew a pour-over
2. Grind: medium-fine, 15 g
3. Bloom: 30 g water, wait 30 seconds
4. Pour: slow circles to 250 g
5. Visit us to taste the difference
`;

const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 120" width="360" height="120">
  <g fill="none" stroke="#1F6F8B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24 40h60v34a26 26 0 0 1-26 26h-8a26 26 0 0 1-26-26z"/>
    <path d="M84 50h8a14 14 0 0 1 0 28h-8"/>
    <path d="M38 24c0-8 8-8 8-16M58 24c0-8 8-8 8-16"/>
  </g>
  <text x="124" y="62" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700" fill="#1D2733">Harbor</text>
  <text x="124" y="100" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#1F6F8B">Coffee</text>
</svg>
`;

export default {
  id: "canva-social-graphics",
  slug: "canva-social-graphics",
  title: "Social Media Graphics in Canva",
  software: "Canva",
  apps: ["Canva"],
  intro:
    "Design consistent, readable social media graphics in Canva for a small café: choose the right sizes, build a clear type hierarchy, apply brand colors and a logo, work with photos, frames and grids, align everything neatly, and export or animate the finished posts. Every lesson notes which features are free and which need a paid Canva plan.",
  platformNote: "Shortcuts are shown for Canva in a browser on Windows. On a Mac, use Cmd in place of Ctrl and Option in place of Alt.",
  store: {
    category: "design",
    level: "Beginner",
    software: "Canva (free plan; a few optional features need a paid plan)",
    softwareShort: "Canva",
    softwareHtml: `<p>This guide is written for <strong>Canva</strong> in a web browser or the desktop app, with a free account obtained separately from canva.com; Canva is not included with the guide. Everything in the lessons can be done on the free plan. Features that need a paid plan, such as one-click resizing, the background remover and transparent PNG downloads, are clearly marked, with a free alternative where there is one.</p>`,
    forWho: [
      "You make posts for a small business, club or project and want them to look consistent.",
      "You use templates but aren't sure why some designs look better than others.",
      "You want to work faster in Canva with shortcuts and good habits.",
    ],
    notFor: [
      "You want vector illustration or professional print layout. See Vector Illustration in Inkscape.",
      "You need a social media strategy or advertising advice. The guide is about design.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "brand-guide.txt", title: "Brand guide", desc: "Colors with hex codes, font choices, logo rules and tone of voice for the practice café." },
    { name: "post-copy.txt", title: "Post text", desc: "The words for a square post, a story and a five-slide carousel." },
    { name: "harbor-logo.svg", title: "Logo", desc: "The café's logo as an SVG, which Canva keeps sharp at any size." },
    { name: "buns.png", title: "Photo: buns", desc: "An abstract warm-toned photo of buns on a tray, 1600 × 1200 pixels." },
    { name: "latte.png", title: "Photo: latte", desc: "An abstract top-down latte with a heart, 1200 × 1200 pixels." },
  ],
  shortcuts: [
    { keys: "T", action: "Add a text box", app: "Canva" },
    { keys: "R", action: "Add a rectangle", app: "Canva" },
    { keys: "C", action: "Add a circle", app: "Canva" },
    { keys: "L", action: "Add a line", app: "Canva" },
    { keys: "Ctrl+D", action: "Duplicate the selection", app: "Canva" },
    { keys: "Ctrl+G", action: "Group the selection", app: "Canva" },
    { keys: "Ctrl+Shift+G", action: "Ungroup", app: "Canva" },
    { keys: "Ctrl+]", action: "Bring forward", app: "Canva" },
    { keys: "Ctrl+[", action: "Send backward", app: "Canva" },
    { keys: "Ctrl+B", action: "Bold", app: "Canva" },
    { keys: "Ctrl+I", action: "Italic", app: "Canva" },
    { keys: "Ctrl+K", action: "Add a link", app: "Canva" },
    { keys: "Ctrl+A", action: "Select everything on the page", app: "Canva" },
    { keys: "Shift+ArrowRight", action: "Nudge the selection right by a larger step", app: "Canva" },
    { keys: "Ctrl+Z", action: "Undo", app: "Canva" },
    { keys: "Ctrl+Shift+Z", action: "Redo", app: "Canva" },
  ],
  lessons: [
    {
      id: "sizes",
      title: "Sizes and the editor",
      summary: "Start designs at the right size for each platform, find your way around the editor, and work with pages.",
      diagram: { type: "table", head: ["Format", "Size (px)", "Shape"], rows: [["Square post", "1080 × 1080", "1:1"], ["Portrait post", "1080 × 1350", "4:5"], ["Story / reel cover", "1080 × 1920", "9:16"], ["Link preview", "1200 × 630", "about 1.9:1"]], highlight: { rows: [0] }, caption: "Common sizes at the time of writing; platforms change them occasionally" },
      steps: [
        {
          title: "Start at the right size",
          body: `<p>On Canva's home page, select <em>Create a design</em> and search for the format, such as “Instagram post (square)”, or choose <em>Custom size</em> and type the pixels. Starting at the right size matters: resizing later on the free plan means rebuilding by hand.</p>`,
        },
        {
          title: "The editor",
          body: `<p>The side panel on the left holds <em>Design</em> (templates), <em>Elements</em>, <em>Text</em>, <em>Uploads</em> and more. The canvas is in the middle; when you select something, its options appear in the toolbar above the canvas. Zoom with the percentage control at the bottom.</p>`,
        },
        {
          title: "Pages",
          body: `<p>A design can have many pages of the same size: use them for a carousel, or for variations of a post. Add one with <em>Add page</em> below the canvas; the page thumbnails at the bottom duplicate, reorder and delete them.</p>`,
        },
        {
          title: "Templates or blank?",
          body: `<p>Templates are a fast start, but they're designed for someone else's brand. If you use one, change the fonts, colors and photos to your own and remove anything that doesn't serve your message. In this guide you'll build from blank pages so you understand each decision.</p>`,
        },
      ],
      quiz: [
        { q: "Which size suits a full-screen story?", options: ["1080 × 1080", "1200 × 630", "1080 × 1920", "1080 × 1350"], answer: 2, explain: "Stories are tall 9:16 images." },
        { q: "Where do a selected element's options appear?", options: ["In the side panel", "In the toolbar above the canvas", "In a pop-up window", "In the page thumbnails"], answer: 1, explain: "The toolbar changes to match the selection." },
      ],
      exercise: {
        title: "Set up two designs",
        task: `<p>Create a blank 1080 × 1080 square post and a blank 1080 × 1920 story. Name them “Harbor: buns post” and “Harbor: latte night story”, and add a second page to the square post.</p>`,
        files: ["post-copy.txt"],
        solution: [
          "Home › <em>Create a design</em> › <em>Custom size</em>: 1080 × 1080 px › <em>Create new design</em>.",
          "Click the design's name at the top of the editor and type “Harbor: buns post”.",
          "Select <em>Add page</em> below the canvas.",
          "Repeat with 1080 × 1920 for the story and name it.",
        ],
      },
    },
    {
      id: "type",
      title: "Text and hierarchy",
      summary: "Add text, set a clear hierarchy of headline, supporting line and small print, pair fonts, and keep text readable on small screens.",
      diagram: { type: "layers", items: ["Headline: big, bold, 4–6 words", "Subline: half the size", "Small print: smallest, quiet color"], highlight: 0, caption: "Three levels are enough for most posts" },
      steps: [
        {
          title: "Add text",
          body: `<p>Press ${k("T")} for a text box, or use the <em>Text</em> panel's <em>Add a heading</em>, <em>subheading</em> and <em>body text</em>. Type or paste from <strong>post-copy.txt</strong>. Change the font, size and color in the toolbar.</p>`,
        },
        {
          title: "Hierarchy",
          body: `<p>Decide what someone should read first, second and third. Make the headline much larger (around 90 to 120 pixels on a 1080 square), the subline about half that, and small print smaller still in a quieter color. Big differences read as intentional; small differences look like mistakes.</p>`,
        },
        {
          title: "Pair fonts",
          body: `<p>Use one or two typefaces: a bold one for headlines and a plain one for everything else (the brand guide suggests Montserrat ExtraBold and Open Sans). Adjust <em>Spacing</em> in the toolbar: a little tighter letter spacing for big headlines, more line spacing for body text.</p>`,
        },
        {
          title: "Readability",
          body: `<p>Most people see your post on a phone, scrolling. Keep headlines short, avoid thin fonts at small sizes, and keep strong contrast between text and background. Check by zooming the canvas to about 25%: if you can still read it, it'll work in a feed.</p>`,
        },
      ],
      quiz: [
        { q: "Why make big size differences between headline and subline?", options: ["It saves space", "Clear differences show what to read first and look deliberate", "Canva requires it", "It loads faster"], answer: 1, explain: "Hierarchy guides the eye; subtle differences confuse it." },
        { q: "How can you quickly check readability on a phone?", options: ["Export a PDF", "Zoom the canvas out to about 25% and see if it's still legible", "Use more fonts", "Make all text bold"], answer: 1, explain: "Small on screen approximates a phone feed." },
      ],
      exercise: {
        title: "Type the buns post",
        task: `<p>On the square post, add the headline, subline and small print for Post 1 from <strong>post-copy.txt</strong>, with a clear size hierarchy and two fonts. Check readability at 25% zoom.</p>`,
        files: ["post-copy.txt", "brand-guide.txt"],
        solution: [
          `${k("T")}, type “Cardamom buns are back”, font Montserrat ExtraBold, size about 110.`,
          "Another text box for “Baked every morning from 7am”: Open Sans, about 52.",
          "A third for the address: Open Sans, about 30, a quieter color.",
          "Zoom to 25% using the zoom control: the headline and subline should still read clearly.",
        ],
      },
    },
    {
      id: "brand",
      title: "Brand colors and logo",
      summary: "Apply exact brand colors from hex codes, add a logo, keep designs consistent, and know what the Brand Kit adds on paid plans.",
      diagram: { type: "table", head: ["Color", "Hex", "Use"], rows: [["Sea blue", "#1F6F8B", "headlines, one accent"], ["Sand", "#F6F1E8", "backgrounds"], ["Ink", "#1D2733", "body text"], ["Terracotta", "#C8784F", "highlights"]], highlight: { rows: [0] }, caption: "From brand-guide.txt" },
      steps: [
        {
          title: "Exact colors from hex codes",
          body: `<p>Select an element or text and click its color swatch in the toolbar. Under <em>Document colors</em>, select <em>+</em> (<em>Add a new color</em>) and type the hex code from <strong>brand-guide.txt</strong>, such as <code>#1F6F8B</code>. Colors you add appear under Document colors for one-click reuse in that design.</p>`,
        },
        {
          title: "Backgrounds",
          body: `<p>Click an empty part of the page and set its color with the background color button in the toolbar. A calm Sand background with Ink text and one Sea blue accent follows the brand guide: one strong accent per design keeps attention on the message.</p>`,
        },
        {
          title: "Upload the logo",
          body: `<p>In <em>Uploads</em>, select <em>Upload files</em> and choose <strong>harbor-logo.svg</strong>. SVG logos stay crisp at any size. Drag it onto the page, give it breathing room, and keep it in the same corner on every post so people learn where to find it.</p>`,
        },
        {
          title: "Brand Kit (paid plans for the full version)",
          body: `<p>Canva's <em>Brand</em> area stores brand colors, fonts and logos so they appear in every design. The full Brand Kit, with multiple kits and font settings, needs a paid plan. On the free plan, keep the brand guide open and add the colors once per design, or start new posts by duplicating a finished one.</p>`,
        },
      ],
      quiz: [
        { q: "Why upload the logo as SVG rather than a small PNG?", options: ["SVGs are smaller to upload", "SVGs stay sharp at any size", "Canva can't use PNGs", "SVGs change color automatically"], answer: 1, explain: "Vector files scale without blurring." },
        { q: "On the free plan, what's a practical way to keep posts consistent?", options: ["Use a different template each time", "Duplicate a finished post as the starting point", "Change fonts every post", "Avoid colors"], answer: 1, explain: "Starting from your own finished design carries its decisions forward." },
      ],
      exercise: {
        title: "Brand the buns post",
        task: `<p>Apply the brand colors to the buns post: Sand background, Ink small print, Sea blue headline and one Terracotta detail. Upload the logo and place it in the top-left corner with clear space around it.</p>`,
        files: ["brand-guide.txt", "harbor-logo.svg"],
        solution: [
          "Click the page background › background color › <em>+</em> › <code>#F6F1E8</code>.",
          "Select the headline › text color › <em>+</em> › <code>#1F6F8B</code>; small print <code>#1D2733</code>.",
          `Press ${k("L")} for a line, place it under the headline and set its color to Terracotta (<code>#C8784F</code>).`,
          "<em>Uploads › Upload files</em> › harbor-logo.svg; drag it top-left at about 220 px wide with clear space.",
        ],
      },
    },
    {
      id: "photos",
      title: "Photos, frames and elements",
      summary: "Upload and place photos, crop them into shapes with frames and grids, adjust them, and add simple shapes and lines.",
      diagram: { type: "compare", left: { title: "Frames", items: ["A shape that crops a photo", "Circle, arch, blob…", "Drag a photo in"] }, right: { title: "Grids", items: ["Splits the page into cells", "One photo per cell", "Even spacing built in"] }, accentRight: true, title: "Two ways to crop photos inside a design" },
      steps: [
        {
          title: "Upload and place",
          body: `<p>Upload <strong>buns.png</strong> and <strong>latte.png</strong> in <em>Uploads</em>. Drag one onto the page; drag it onto the background to make it fill the whole page. Double-click a photo to crop or reposition it inside its box.</p>`,
        },
        {
          title: "Frames and grids",
          body: `<p>In <em>Elements</em>, search “frames” and add a circle or arch frame, then drag a photo onto it: the photo is cropped to that shape. Search “grids” for layouts that split the page into cells; drop a photo into each cell. Both keep photos editable inside.</p>`,
        },
        {
          title: "Adjust photos",
          body: `<p>Select a photo and choose <em>Edit</em> (or <em>Edit photo</em>) in the toolbar, then <em>Adjust</em> for brightness, contrast, warmth and saturation. Small adjustments that make several photos feel alike help a feed look consistent. The background remover is a paid feature.</p>`,
        },
        {
          title: "Shapes, lines and layering",
          body: `<p>${k("R")}, ${k("C")} and ${k("L")} add a rectangle, circle and line. Put a semi-transparent rectangle (Transparency in the toolbar's checkerboard menu) between a busy photo and text to keep it readable. ${k("Ctrl", "]")} and ${k("Ctrl", "[")} move the selection forward and backward; <em>Position › Layers</em> shows the full order.</p>`,
        },
      ],
      quiz: [
        { q: "How do you crop a photo into a circle while keeping it editable?", options: ["Use the eraser", "Drop it into a circle frame", "Export and re-upload", "Change the page size"], answer: 1, explain: "Frames crop non-destructively." },
        { q: "Which feature needs a paid plan?", options: ["Adjusting brightness", "Frames", "The background remover", "Uploading photos"], answer: 2, explain: "Background removal is part of Canva's paid plans." },
      ],
      exercise: {
        title: "Add the photo",
        task: `<p>Add <strong>buns.png</strong> to the buns post in an arch frame on the right half, warm it slightly with Adjust, and make sure the headline still has a clear background behind it.</p>`,
        files: ["buns.png"],
        solution: [
          "<em>Uploads</em> › upload buns.png.",
          "<em>Elements</em>, search “arch frame”, add one and size it to the right half of the page.",
          "Drag buns.png onto the frame; double-click to reposition the buns inside.",
          "With the photo selected: <em>Edit</em> › <em>Adjust</em> › Warmth about +15.",
          "Move the headline to the left half so it sits on the plain Sand background.",
        ],
      },
    },
    {
      id: "layout",
      title: "Alignment and layout",
      summary: "Align and distribute elements, use margins, rulers and guides, group and lock finished parts, and leave safe zones on stories.",
      diagram: { type: "frames", variant: "autolayout", title: "Shared edges and equal gaps" },
      steps: [
        {
          title: "Snap and align",
          body: `<p>As you drag, pink guide lines show when an element lines up with the page center or other elements. For several elements, select them (Shift+click), choose <em>Position</em> in the toolbar and use <em>Align elements</em> (left, center, top…) or <em>Tidy up</em> to space them evenly.</p>`,
        },
        {
          title: "Margins and guides",
          body: `<p>Leave a margin of about 60 to 80 pixels on a 1080 square so nothing crowds the edge. Turn on rulers and guides from <em>File › Settings › Show rulers and guides</em>, then drag guides out of the rulers to mark your margins on every page.</p>`,
        },
        {
          title: "Group and lock",
          body: `<p>Select elements that belong together (the headline and its line) and press ${k("Ctrl", "G")} to group them; ${k("Ctrl", "Shift", "G")} ungroups. Lock finished elements with the lock icon in the toolbar so they don't move while you work around them.</p>`,
        },
        {
          title: "Safe zones on stories",
          body: `<p>Phones overlay the top and bottom of stories with the profile name and reply bar. Keep important text out of roughly the top 250 and bottom 250 pixels of a 1080 × 1920 story. Mark those zones with guides while you design.</p>`,
        },
      ],
      quiz: [
        { q: "What does Tidy up do?", options: ["Deletes unused elements", "Spaces selected elements evenly", "Aligns everything to the left", "Groups elements"], answer: 1, explain: "Tidy up evens out the spacing." },
        { q: "Why keep text out of the top and bottom of a story?", options: ["It's printed there", "Phone interfaces cover those areas", "Canva crops them", "To save space"], answer: 1, explain: "Profile details and reply controls sit on top of the story." },
      ],
      exercise: {
        title: "Lay out the story",
        task: `<p>Design the latte night story from Post 2: add 70 px margin guides and safe-zone guides at 250 px from the top and bottom, place the latte photo in a circle frame, align the headline, details and call to action centrally, and group the text.</p>`,
        files: ["latte.png", "post-copy.txt", "brand-guide.txt"],
        solution: [
          "<em>File › Settings › Show rulers and guides</em>; drag guides to 70 px from each side and 250 px from top and bottom.",
          "Add a circle frame in the upper middle and drop latte.png into it.",
          "Add the three text lines, with the brand fonts and colors, inside the safe zone.",
          `Select the three lines › <em>Position</em> › <em>Align elements › Center</em>, then press ${k("Ctrl", "G")} to group them.`,
          "Zoom to 25% to check the hierarchy still reads.",
        ],
      },
    },
    {
      id: "export",
      title: "Resizing, animation and export",
      summary: "Adapt a design to another size, add subtle animation, choose the right download format, and keep files organized.",
      diagram: { type: "table", head: ["Use", "Download as", "Notes"], rows: [["Feed posts", "PNG or JPG", "PNG for text-heavy designs"], ["Animated post", "MP4 or GIF", "MP4 is smaller and smoother"], ["Print or email", "PDF Standard or Print", "Print adds bleed options"]], highlight: { rows: [0] }, caption: "Share › Download › File type" },
      steps: [
        {
          title: "Adapting to another size",
          body: `<p>On paid plans, <em>Resize</em> (with Magic Switch) converts a design to new sizes in one step. On the free plan, create a design at the new size, copy elements across (${k("Ctrl", "C")} and ${k("Ctrl", "V")} work between designs), and rearrange them. A square post becomes a story by stacking its parts vertically.</p>`,
        },
        {
          title: "Animation",
          body: `<p>Select a page or element and choose <em>Animate</em> in the toolbar. Gentle effects such as <em>Fade</em> or <em>Rise</em> on the headline draw the eye; animating everything at once is distracting. Preview with the play button before downloading.</p>`,
        },
        {
          title: "Download",
          body: `<p>Select <em>Share › Download</em>. Choose PNG for crisp text and graphics, JPG for photo-heavy posts with smaller files, MP4 for animated designs, and PDF for documents. Pick which pages to download. Transparent backgrounds and size scaling are paid options.</p>`,
        },
        {
          title: "Stay organized",
          body: `<p>Name designs consistently (“Harbor: 2026-03 buns post”) and keep them in a folder from Canva's <em>Projects</em> page. Reusing your own finished designs is the fastest way to keep a feed consistent.</p>`,
        },
      ],
      quiz: [
        { q: "Which format suits an animated post?", options: ["PNG", "PDF", "MP4", "SVG"], answer: 2, explain: "MP4 video keeps animation and stays small." },
        { q: "On the free plan, how do you turn a square post into a story?", options: ["Resize with Magic Switch", "Create a story-size design and copy the elements across", "Stretch the square", "Download as PDF"], answer: 1, explain: "One-click resizing is a paid feature; copying works on any plan." },
      ],
      exercise: {
        title: "Finish and export",
        task: `<p>Add a Fade animation to the story's headline, download the story as MP4 and the buns post as PNG, and make a story version of the buns post by copying its elements into a 1080 × 1920 design.</p>`,
        files: ["post-copy.txt"],
        solution: [
          "In the story, select the headline › <em>Animate</em> › <em>Fade</em>; preview with play.",
          "<em>Share › Download</em> › File type MP4 Video › <em>Download</em>.",
          "In the buns post: <em>Share › Download</em> › PNG › <em>Download</em>.",
          "Create a 1080 × 1920 design; in the post, Ctrl+A, Ctrl+C; in the new design, Ctrl+V; rearrange vertically inside the safe zones.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-carousel",
      title: "Bonus project: a five-slide carousel",
      summary: "Design a carousel with a consistent slide template, a strong first slide, and a clear last-slide call to action.",
      diagram: { type: "flow", nodes: ["Hook", "Step 1", "Step 2", "Step 3", "Call to action"], highlight: 0, title: "Five slides, one template" },
      steps: [
        {
          title: "One template slide",
          body: `<p>In a 1080 × 1350 design, build slide 2 first: a number in the corner, a short headline, one line of detail and the logo, all on guides. This becomes the template for the middle slides.</p>`,
        },
        {
          title: "Duplicate and fill",
          body: `<p>Duplicate the page for slides 3 and 4 from the page thumbnails and change only the text and numbers. Identical positions make swiping feel smooth.</p>`,
        },
        {
          title: "Hook and close",
          body: `<p>Slide 1 is the hook: a big headline and a photo, with a small arrow suggesting there's more. Slide 5 states what to do next. Download all pages as PNG; they upload as a carousel in the right order.</p>`,
        },
      ],
      quiz: [
        { q: "Why build one middle slide first and duplicate it?", options: ["Canva requires it", "Identical layouts make the carousel consistent and fast to build", "To reduce file size", "To animate it"], answer: 1, explain: "A template keeps every slide aligned." },
        { q: "What's the first slide's job?", options: ["List every detail", "Make people want to swipe", "Show the logo only", "Thank the viewer"], answer: 1, explain: "The hook earns the swipe." },
      ],
      exercise: {
        title: "Build the pour-over carousel",
        task: `<p>Design the five-slide pour-over carousel from Post 3 in <strong>post-copy.txt</strong> at 1080 × 1350, using one template for slides 2 to 4, and download all pages as PNG.</p>`,
        files: ["post-copy.txt", "latte.png", "harbor-logo.svg"],
        solution: [
          "Create a 1080 × 1350 design; add margin guides.",
          "Build slide 2: large “2” in Terracotta, headline “Grind”, detail “medium-fine, 15 g”, logo bottom-right.",
          "Duplicate twice for slides 3 and 4 and change the text.",
          "Add slide 1 (photo and hook headline) before them and slide 5 (visit us) after.",
          "<em>Share › Download</em> › PNG › All pages.",
        ],
      },
    },
    quizbank: [
      { q: "Which key adds a text box in Canva?", options: ["X", "T", "W", "A"], answer: 1, explain: "T adds text." },
      { q: "How many fonts should most posts use?", options: ["One or two", "Four", "As many as fit", "One per line"], answer: 0, explain: "One or two typefaces keep designs calm and consistent." },
      { q: "Where do you type a brand color's hex code?", options: ["In the text box", "In the color panel's Add a new color (+)", "In File settings", "In Uploads"], answer: 1, explain: "Document colors › + lets you enter hex codes." },
      { q: "What does Ctrl+G do?", options: ["Adds a grid", "Groups the selection", "Opens guides", "Downloads"], answer: 1, explain: "Group keeps elements together." },
      { q: "Which download format keeps text crispest?", options: ["JPG", "PNG", "GIF", "MP4"], answer: 1, explain: "PNG is lossless, so text edges stay sharp." },
      { q: "What's a good margin on a 1080 × 1080 post?", options: ["0 px", "About 60–80 px", "300 px", "Half the page"], answer: 1, explain: "Enough room that nothing crowds the edges." },
      { q: "Which of these needs a paid Canva plan?", options: ["Uploading an SVG", "Animating text", "Transparent background downloads", "Adding a page"], answer: 2, explain: "Transparent PNG downloads are a paid option." },
      { q: "How can you make text readable over a busy photo?", options: ["Use a thinner font", "Put a semi-transparent shape behind the text", "Make the text smaller", "Add more photos"], answer: 1, explain: "A dimmed band evens out the background behind the text." },
    ],
  },
  async makeFiles({ png }) {
    const buns = png(1600, 1200, (x, y) => {
      const tray = y > 200 && y < 1050 && x > 150 && x < 1450;
      let c = tray ? [120, 84, 60] : [236, 226, 206];
      const centers = [[420, 420], [800, 400], [1180, 430], [450, 800], [820, 820], [1190, 790]];
      for (const [cx, cy] of centers) {
        const d = Math.hypot(x - cx, (y - cy) * 1.15);
        if (d < 150) {
          const swirl = Math.sin(Math.atan2(y - cy, x - cx) * 3 + d / 18) * 0.5 + 0.5;
          const shade = 1 - d / 260;
          c = [200 * shade + 40 * swirl, 140 * shade + 30 * swirl, 80 * shade + 10 * swirl];
        }
      }
      return c;
    });
    const latte = png(1200, 1200, (x, y) => {
      const d = Math.hypot(x - 600, y - 600);
      if (d > 520) return [196, 168, 140];
      if (d > 470) return [245, 243, 238];
      const hx = (x - 600) / 180, hy = -(y - 620) / 180;
      const heart = Math.pow(hx * hx + hy * hy - 1, 3) - hx * hx * hy * hy * hy < 0;
      if (heart) return [246, 236, 220];
      const t = d / 470;
      return [150 - 40 * t, 96 - 30 * t, 60 - 20 * t];
    });
    return { "brand-guide.txt": BRAND, "post-copy.txt": COPY, "harbor-logo.svg": LOGO, "buns.png": buns, "latte.png": latte };
  },
};
