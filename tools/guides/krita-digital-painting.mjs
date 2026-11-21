import { k } from "./_helpers.mjs";

const PALETTE = `GIMP Palette
Name: Shortcut Press Garden
Columns: 4
#
 52  78  60	Deep leaf
 96 140  88	Leaf
170 196 120	New growth
236 226 196	Cream
200 120  80	Terracotta
150  80  60	Brick
 90 120 160	Dusk blue
160 190 220	Sky
250 200 110	Sun
 60  50  60	Ink
120 110 120	Stone
250 248 242	Paper
`;

// Distance helpers for drawing clean line art.
const segDist = (px, py, ax, ay, bx, by) => {
  const dx = bx - ax, dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
};
const ink = (d, w = 3) => (d < w ? 0 : d < w + 1.2 ? (d - w) / 1.2 : 1);

export default {
  id: "krita-digital-painting",
  slug: "krita-digital-painting",
  title: "Digital Painting in Krita",
  software: "Krita",
  apps: ["Krita"],
  intro:
    "Paint digitally in Krita, the free painting program: set up a canvas and brushes, organize work in layers and blending modes, color clean line art, shade with light and shadow, transform and correct, and export finished artwork. A drawing tablet helps, but every exercise can be done with a mouse.",
  platformNote: "Shortcuts are shown for Krita 5 on Windows and Linux. On a Mac, use Cmd in place of Ctrl.",
  store: {
    category: "design",
    level: "Beginner",
    software: "Krita 5 (free and open source, for Windows, Mac and Linux)",
    softwareShort: "Krita",
    softwareHtml: `<p>This guide is written for <strong>Krita 5</strong>, the free and open-source painting program for Windows, Mac and Linux, obtained separately from krita.org; it is not included with the guide. A pressure-sensitive drawing tablet makes painting more natural but isn't required: every exercise works with a mouse.</p>`,
    forWho: [
      "You draw on paper and want to try painting on a computer.",
      "You've installed Krita and want a clear way through brushes, layers and coloring.",
      "You'd like to color line art, add shading and export finished pieces.",
    ],
    notFor: [
      "You want to learn drawing fundamentals such as anatomy or perspective in depth.",
      "You need animation; Krita can animate, but the guide doesn't cover it.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "cottage-lineart.png", title: "Line art", desc: "A clean ink drawing of a cottage, a tree and the sun, with closed shapes ready to fill." },
    { name: "sphere-values.png", title: "Value study", desc: "A shaded sphere in grays showing light, midtone, core shadow, reflected light and cast shadow." },
    { name: "garden-palette.gpl", title: "Color palette", desc: "Twelve garden colors in GIMP palette format, which Krita imports." },
  ],
  shortcuts: [
    { keys: "B", action: "Freehand brush tool", app: "Krita" },
    { keys: "E", action: "Switch the brush to eraser mode and back", app: "Krita" },
    { keys: "[", action: "Make the brush smaller", app: "Krita" },
    { keys: "]", action: "Make the brush bigger", app: "Krita" },
    { keys: "F", action: "Fill tool", app: "Krita" },
    { keys: "Insert", action: "New paint layer", app: "Krita" },
    { keys: "Ctrl+J", action: "Duplicate the layer", app: "Krita" },
    { keys: "Ctrl+E", action: "Merge the layer down", app: "Krita" },
    { keys: "Ctrl+G", action: "Group layers", app: "Krita" },
    { keys: "Ctrl+T", action: "Transform tool", app: "Krita" },
    { keys: "M", action: "Mirror the canvas view", app: "Krita" },
    { keys: "4", action: "Rotate the canvas left", app: "Krita" },
    { keys: "6", action: "Rotate the canvas right", app: "Krita" },
    { keys: "5", action: "Reset canvas rotation", app: "Krita" },
    { keys: "X", action: "Swap foreground and background colors", app: "Krita" },
    { keys: "D", action: "Reset colors to black and white", app: "Krita" },
    { keys: "/", action: "Switch to the previous brush preset", app: "Krita" },
    { keys: "W", action: "Wrap-around mode on or off", app: "Krita" },
    { keys: "Tab", action: "Canvas-only mode (hide panels)", app: "Krita" },
    { keys: "Ctrl+Shift+Z", action: "Redo", app: "Krita" },
    { keys: "Ctrl+R", action: "Rectangular selection tool", app: "Krita", practice: false, note: "Your browser uses this shortcut to reload the page." },
    { keys: "Ctrl+Shift+A", action: "Deselect", app: "Krita", practice: false, note: "Your browser uses this shortcut to search tabs." },
  ],
  lessons: [
    {
      id: "canvas",
      title: "Canvas, brushes and navigation",
      summary: "Create a canvas, choose and size brushes, erase, and rotate and mirror the canvas as you would turn paper.",
      diagram: { type: "tree", root: "Krita window", items: [["Toolbox (left)", 1], ["Canvas (middle)", 1], ["Brush Presets docker", 1, true], ["Layers docker", 1], ["Advanced Color Selector", 1]], caption: "Dockers can be shown from Settings › Dockers" },
      steps: [
        {
          title: "A new canvas",
          body: `<p>Choose <em>File › New</em>. Under <em>Custom Document</em>, set the size (for example 2400 × 1800 pixels) and resolution (300 for print, any for screen), and leave the background white. Bigger canvases allow more detail but need more memory; this size is plenty for practice.</p>`,
        },
        {
          title: "Brushes",
          body: `<p>Press ${k("B")} for the freehand brush. Pick a preset in the <em>Brush Presets</em> docker; “Basic-5 Size Opacity” and “Ink-2 Fineliner” are good starting points. Change size with ${k("[")} and ${k("]")}, or hold ${k("Shift")} and drag on the canvas. With a tablet, pressure controls size or opacity, depending on the preset.</p>`,
        },
        {
          title: "Erasing",
          body: `<p>Press ${k("E")} to turn the current brush into an eraser with the same shape and size; press it again to switch back. Erasing with the brush you painted with gives softer, more natural corrections than a hard eraser.</p>`,
        },
        {
          title: "Turn the canvas, not your wrist",
          body: `<p>Press ${k("4")} and ${k("6")} to rotate the view and ${k("5")} to reset, like turning paper for a comfortable stroke. ${k("M")} mirrors the view, which reveals lopsided drawings instantly. ${k("Tab")} hides every panel for a distraction-free canvas.</p>`,
        },
      ],
      quiz: [
        { q: "What does pressing E do with the brush tool?", options: ["Selects the eraser tool with a default size", "Switches the current brush into eraser mode", "Clears the layer", "Exports the image"], answer: 1, explain: "Eraser mode keeps the current brush's shape and size." },
        { q: "Why mirror the canvas with M?", options: ["To paint faster", "To spot proportions and symmetry problems with fresh eyes", "To flip the actual image", "To save memory"], answer: 1, explain: "Mirroring changes only the view, revealing mistakes you'd stopped seeing." },
      ],
      exercise: {
        title: "Warm-up strokes",
        task: `<p>Create a 2400 × 1800 canvas. With three different brush presets, fill a row each with lines, circles and a shaded patch. Try different sizes with [ and ], erase a few strokes with E, and rotate and mirror the view.</p>`,
        files: [],
        solution: [
          "<em>File › New › Custom Document</em>, 2400 × 1800 px, <em>Create</em>.",
          `${k("B")}, pick a preset in Brush Presets, and draw a row of strokes; repeat with two other presets.`,
          `Change sizes with ${k("[")} and ${k("]")} (or Shift+drag).`,
          `${k("E")}, erase across a few strokes, ${k("E")} again to paint.`,
          `${k("4")}, ${k("6")}, ${k("5")} to rotate and reset; ${k("M")} to mirror the view and back.`,
        ],
      },
    },
    {
      id: "layers",
      title: "Layers and blending modes",
      summary: "Keep sketch, ink and color on separate layers, change opacity and order, group layers, and use blending modes such as Multiply.",
      diagram: { type: "layers", items: ["Ink (Multiply)", "Shadows (Multiply)", "Flat colors", "Sketch (30% opacity, hidden later)", "Background (paper)"], highlight: 0, caption: "A typical painting's layer stack" },
      steps: [
        {
          title: "Why layers",
          body: `<p>Each layer is a transparent sheet. Put the sketch, the ink and the colors on separate layers and you can fix one without touching the others. Press ${k("Insert")} for a new paint layer; double-click its name in the <em>Layers</em> docker to rename it.</p>`,
        },
        {
          title: "Order and opacity",
          body: `<p>Drag layers up and down in the docker; higher layers cover lower ones. Lower a sketch layer's opacity to around 30% (the slider at the top of the Layers docker) so you can ink over it, and click its eye icon to hide it when you're done.</p>`,
        },
        {
          title: "Blending modes",
          body: `<p>The dropdown at the top of the Layers docker sets how a layer combines with those below. <strong>Multiply</strong> darkens: white disappears and only darker tones show, perfect for ink over colors and for shadows. <strong>Screen</strong> or <strong>Add</strong> lightens, for glows. <em>Normal</em> simply covers.</p>`,
        },
        {
          title: "Groups and alpha lock",
          body: `<p>Select layers and press ${k("Ctrl", "G")} to group them. The alpha lock (checkerboard icon on a layer) lets you paint only where the layer already has paint, so you can recolor a shape without going over its edges. ${k("Ctrl", "J")} duplicates a layer before a risky change.</p>`,
        },
      ],
      quiz: [
        { q: "What does Multiply do to white areas of a layer?", options: ["Makes them brighter", "Makes them disappear, so only darker tones affect the layers below", "Inverts them", "Nothing"], answer: 1, explain: "Multiplying by white leaves the colors below unchanged." },
        { q: "What does alpha lock let you do?", options: ["Lock the layer completely", "Paint only where the layer already has paint", "Hide the layer", "Merge layers"], answer: 1, explain: "It protects the transparent areas." },
      ],
      exercise: {
        title: "Sketch, ink, recolor",
        task: `<p>On a new canvas, make a Sketch layer and draw a quick mug at 30% opacity. Ink it on an Ink layer above, then hide the sketch. On a Color layer below the ink, block in the mug, then use alpha lock to change its color without going over the edges.</p>`,
        files: [],
        solution: [
          `${k("Insert")}, rename to Sketch, draw the mug, set the layer opacity to 30%.`,
          `${k("Insert")} again, rename to Ink, choose a fineliner preset and trace cleanly; hide Sketch with its eye icon.`,
          `${k("Insert")}, rename to Color, drag it below Ink, and fill in the mug with a broad brush.`,
          "Click Color's alpha lock icon, pick a new color and paint over the whole mug: only the painted area changes.",
        ],
      },
    },
    {
      id: "flats",
      title: "Coloring line art",
      summary: "Import line art, set it to Multiply, fill flat colors on a separate layer with the fill tool, and try the colorize mask for quick flats.",
      diagram: { type: "flow", nodes: ["Line art (Multiply)", "Flats layer below", "Fill: reference all layers", "Grow selection to close gaps"], highlight: 2, title: "The fill tool reads the lines but paints on its own layer" },
      steps: [
        {
          title: "Bring in the line art",
          body: `<p><em>File › Open</em> <strong>cottage-lineart.png</strong>. In the Layers docker, set its blending mode to <strong>Multiply</strong> so its white background turns see-through, and rename it Lines. Press ${k("Insert")} for a Flats layer and drag it below Lines.</p>`,
        },
        {
          title: "Fill on the layer below",
          body: `<p>Press ${k("F")} for the fill tool. In <em>Tool Options</em>, set the fill to read <em>All layers</em> (in some versions, <em>Sample merged</em> or <em>Reference: All layers</em>). Now clicking inside a shape on the Flats layer fills up to the lines drawn on the Lines layer. Set <em>Grow selection</em> to 1 or 2 pixels so the fill tucks under the lines without white gaps.</p>`,
        },
        {
          title: "Load the palette",
          body: `<p>Open <em>Settings › Dockers › Palette</em>. Use the palette menu in the docker to import <strong>garden-palette.gpl</strong>. Click a swatch to set the color: terracotta for the roof, cream for the walls, leaf greens for the tree. A small, consistent palette makes artwork look deliberate.</p>`,
        },
        {
          title: "Colorize mask",
          body: `<p>For many small areas, right-click the Lines layer and choose <em>Add › Colorize Mask</em>. Scribble a stroke of each color inside the areas, then select <em>Update</em> in the tool options: Krita spreads the colors up to the lines. When happy, uncheck <em>Edit key strokes</em> and convert the mask to a paint layer.</p>`,
        },
      ],
      quiz: [
        { q: "Why fill on a separate layer below the line art?", options: ["Fill doesn't work on line art", "Colors can be changed later without damaging the lines", "It's faster", "Multiply requires it"], answer: 1, explain: "Keeping lines and colors apart keeps both editable." },
        { q: "What does Grow selection do in the fill tool?", options: ["Fills the whole canvas", "Expands the fill a few pixels under the lines to avoid gaps", "Selects more colors", "Smooths edges"], answer: 1, explain: "It hides the thin halo left between fill and line." },
      ],
      exercise: {
        title: "Flat-color the cottage",
        task: `<p>Open <strong>cottage-lineart.png</strong>, set it to Multiply, and on a Flats layer below fill every area with colors from <strong>garden-palette.gpl</strong>. Check at 100% zoom for white gaps along the lines.</p>`,
        files: ["cottage-lineart.png", "garden-palette.gpl"],
        solution: [
          "Open the file; in Layers set the blend mode to Multiply and rename it Lines.",
          `${k("Insert")}, rename to Flats, drag it below Lines.`,
          `${k("F")}; in Tool Options choose to reference all layers and set Grow selection to 2 px.`,
          "Import the palette in the Palette docker; click swatches and fill: roof Terracotta, walls Cream, door Brick, window Sky, tree Leaf, trunk Stone, sun Sun.",
          `Zoom in to 100% (the zoom level is shown at the bottom right of the window) and check the edges; touch up any gaps on Flats with a small brush.`,
        ],
      },
    },
    {
      id: "shading",
      title: "Light and shadow",
      summary: "Understand values from the sphere study, add shadows on a Multiply layer, highlights on a Screen layer, and keep them inside the shapes.",
      diagram: { type: "table", head: ["Zone", "Value", "Where"], rows: [["Highlight", "lightest", "facing the light"], ["Midtone", "base color", "turning away"], ["Core shadow", "darkest on the form", "where light stops"], ["Reflected light", "slightly lighter", "shadow's edge"], ["Cast shadow", "dark", "on the ground"]], highlight: { rows: [2] }, caption: "The zones on sphere-values.png" },
      steps: [
        {
          title: "Values first",
          body: `<p>Open <strong>sphere-values.png</strong>. Light falls from the upper left, giving a highlight, the midtones, a core shadow where the surface turns away, a little reflected light from the ground, and a cast shadow. Every object you shade has the same zones; getting the light and dark right matters more than the colors.</p>`,
        },
        {
          title: "Shadows on a Multiply layer",
          body: `<p>Back in the cottage, add a layer above Flats called Shadows and set it to Multiply. Paint with a soft brush in a muted blue-purple (Dusk blue from the palette). Multiplied over each flat color it darkens naturally, much more convincingly than painting with black.</p>`,
        },
        {
          title: "Keep shading inside the shapes",
          body: `<p>Put Flats and Shadows in a group (${k("Ctrl", "G")}) and turn on <em>Inherit alpha</em> for Shadows (the α icon among the layer's icons in the Layers docker): shading then only appears where Flats has color. Alternatively, select an area on Flats with the contiguous selection tool and paint inside the selection.</p>`,
        },
        {
          title: "Highlights",
          body: `<p>Add a Highlights layer set to <strong>Screen</strong> (or Add) and paint lightly in a warm yellow where the sun hits: the roof's sunny side, the tree's top-left. Less is more; a few bright touches read as sunlight.</p>`,
        },
      ],
      quiz: [
        { q: "Why shade with a colored Multiply layer rather than black on Normal?", options: ["Black isn't allowed", "Colored multiply shadows darken each color naturally instead of making it gray", "Normal mode can't be used", "It saves memory"], answer: 1, explain: "Multiplying by a cool color keeps shadows rich." },
        { q: "Where is the core shadow on a sphere lit from the upper left?", options: ["Upper left", "The band where the surface turns away from the light, toward the lower right", "On the ground", "In the center"], answer: 1, explain: "It's the darkest part of the object itself." },
      ],
      exercise: {
        title: "Light the cottage",
        task: `<p>With the light coming from the sun at the upper right of the drawing, add a Multiply shadow layer and a Screen highlight layer to your flat-colored cottage, keeping both inside the colored areas.</p>`,
        files: ["sphere-values.png", "cottage-lineart.png", "garden-palette.gpl"],
        solution: [
          `Select Flats, press ${k("Insert")} for a layer above it, rename it Shadows, mode Multiply.`,
          "Group Flats and Shadows, and turn on Inherit alpha for Shadows.",
          "With a soft brush in Dusk blue at about 40% opacity, shade the sides facing away from the sun (the left side of the cottage and tree), plus a cast shadow to their lower left.",
          "Add a Highlights layer above, mode Screen, inherit alpha on, and dab warm yellow on the sunlit edges.",
          "Hide and show the two layers to compare.",
        ],
      },
    },
    {
      id: "transform",
      title: "Selections and transformations",
      summary: "Select parts of a painting, move, scale and rotate them, use perspective and warp, and fix proportions with liquify.",
      diagram: { type: "compare", left: { title: "Transform modes", items: ["Free: move, scale, rotate", "Perspective", "Warp and cage", "Liquify"] }, right: { title: "Good habits", items: ["Duplicate the layer first", "Work on one layer at a time", "Apply with Enter"] }, accentRight: true, title: "Ctrl+T opens the transform tool" },
      steps: [
        {
          title: "Select",
          body: `<p>The selection tools (rectangle, ellipse, freehand lasso, contiguous “magic wand”, similar color) work on the current layer. Hold ${k("Shift")} to add to a selection and ${k("Alt")} to subtract. Selections limit painting, filters and transforms to the selected area.</p>`,
        },
        {
          title: "Transform",
          body: `<p>Press ${k("Ctrl", "T")}: handles appear around the layer (or selection). Drag a corner to scale (hold ${k("Shift")} to keep proportions), drag outside to rotate, drag inside to move. Press Enter to apply or Esc to cancel. Transforms in Krita stay editable until applied.</p>`,
        },
        {
          title: "Perspective, warp and liquify",
          body: `<p>In the transform tool's options, choose <em>Perspective</em> to fit a sign onto a slanted wall, <em>Warp</em> to bend something to a curve, or <em>Liquify</em> to push and pull paint like soft clay, useful for fixing proportions such as a lopsided tree crown.</p>`,
        },
        {
          title: "Check with the mirror",
          body: `<p>Press ${k("M")} to mirror the view: proportion problems jump out. Fix them with transform or liquify on a duplicated layer (${k("Ctrl", "J")}), then hide the original once you're happy.</p>`,
        },
      ],
      quiz: [
        { q: "Which shortcut opens the transform tool?", options: ["Ctrl+T", "T", "Ctrl+Shift+T", "Alt+T"], answer: 0, explain: "Ctrl+T transforms the active layer or selection." },
        { q: "Why duplicate a layer before liquifying it?", options: ["Liquify needs two layers", "So you can compare with and return to the original", "It's faster", "To keep the selection"], answer: 1, explain: "Non-destructive habits make experiments safe." },
      ],
      exercise: {
        title: "Adjust the tree",
        task: `<p>On your cottage painting, select the tree on its layers, make it 10% larger and move it a little left, then use liquify to round out one side of the crown. Compare with the mirror view.</p>`,
        files: ["cottage-lineart.png"],
        solution: [
          "Duplicate the Flats and Lines layers (Ctrl+J) as a backup, or work in a duplicated group.",
          "Select the tree with the freehand lasso on the relevant layer.",
          `${k("Ctrl", "T")}, Shift+drag a corner to about 110%, drag inside to move it left, press Enter.`,
          "Reopen the transform tool, choose <em>Liquify</em>, and push the flatter side of the crown outward with a large soft brush; press Enter.",
          `${k("M")} to check the balance, ${k("M")} again to return.`,
        ],
      },
    },
    {
      id: "finish",
      title: "Adjustments and export",
      summary: "Adjust colors with filters and filter layers, crop and resize the canvas, and export for the web and print while keeping a layered .kra file.",
      diagram: { type: "table", head: ["Save as", "Keeps", "Use for"], rows: [[".kra", "layers, masks, settings", "your working file"], [".png", "transparency, no layers", "web graphics, prints"], [".jpg", "smaller, no transparency", "sharing photos and paintings"]], highlight: { rows: [0] }, caption: "Save the .kra, export copies" },
      steps: [
        {
          title: "Color adjustments",
          body: `<p><em>Filter › Adjust › HSV Adjustment</em> shifts hue, saturation and value; <em>Levels</em> and <em>Color Curves</em> adjust contrast. To keep it editable, add a filter layer instead: right-click in the Layers docker and choose <em>Add › Filter Layer</em>. It affects everything below and can be changed or hidden anytime.</p>`,
        },
        {
          title: "Crop and canvas size",
          body: `<p>The crop tool (in the toolbox) trims the canvas to a rectangle you drag. <em>Image › Resize Canvas</em> adds space around the painting without scaling it; <em>Image › Scale Image to New Size</em> resizes the whole painting.</p>`,
        },
        {
          title: "Save and export",
          body: `<p><em>File › Save</em> writes a <code>.kra</code> file with all layers. <em>File › Export</em> (${k("Ctrl", "Shift", "E")}) writes a flattened copy: PNG for crisp graphics or prints, JPEG for smaller sharing files. Choose the export size for its use: about 2000 pixels on the long side for the web.</p>`,
        },
        {
          title: "Sign and archive",
          body: `<p>Add your signature on its own layer so it's easy to move or remove. Keep each finished .kra with its exports in one folder; later, you'll be glad to revisit layers you can still edit.</p>`,
        },
      ],
      quiz: [
        { q: "What's the advantage of a filter layer over Filter › Adjust?", options: ["It's faster", "It stays editable and can be changed or hidden later", "It uses less memory", "It exports automatically"], answer: 1, explain: "Filter layers are non-destructive adjustments." },
        { q: "Which format keeps all your layers?", options: [".png", ".jpg", ".kra", ".gif"], answer: 2, explain: "Krita's native .kra keeps everything." },
      ],
      exercise: {
        title: "Finish the cottage",
        task: `<p>Add an HSV filter layer to warm up the cottage painting slightly, sign it on a separate layer, crop away any unused edges, save it as cottage.kra and export cottage-web.jpg at 2000 pixels wide.</p>`,
        files: ["cottage-lineart.png"],
        solution: [
          "Right-click in Layers › <em>Add › Filter Layer</em>, choose <em>HSV Adjustment</em>, move Hue a few points toward warm and raise Saturation slightly.",
          `${k("Insert")}, rename Signature, sign in a corner with a small brush.`,
          "Crop tool: drag a rectangle around the scene and press Enter.",
          "<em>File › Save As</em> cottage.kra.",
          "<em>Image › Scale Image to New Size</em> on a copy if needed (or set the size in the export dialog), then <em>File › Export</em> as cottage-web.jpg.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-pattern",
      title: "Bonus project: a seamless pattern",
      summary: "Paint a repeating pattern tile with wrap-around mode, check that it tiles without seams, and export it for fabric, wrapping paper or backgrounds.",
      diagram: { type: "grid", cols: ["A", "B", "C"], rows: 3, cells: { A1: "tile", B1: "tile", C1: "tile", A2: "tile", B2: "tile", C2: "tile", A3: "tile", B3: "tile", C3: "tile" }, highlight: { B2: "accent" }, title: "One tile, repeated without visible edges" },
      steps: [
        {
          title: "Square canvas and wrap-around",
          body: `<p>Create a 1000 × 1000 canvas. Press ${k("W")} for wrap-around mode: the canvas repeats in every direction, and strokes that leave one edge continue on the opposite edge. You're painting the tile and its neighbors at once.</p>`,
        },
        {
          title: "Paint motifs across the edges",
          body: `<p>Scatter leaves and flowers using the garden palette, deliberately crossing the edges. Vary size and rotation, and fill gaps evenly so there are no empty patches or obvious rows when the pattern repeats.</p>`,
        },
        {
          title: "Test and export",
          body: `<p>Zoom out with wrap-around on to see many repeats; look for clumps or lines that give the grid away. Press ${k("W")} to turn it off and export the 1000 × 1000 PNG: that single tile repeats seamlessly in any program that tiles images.</p>`,
        },
      ],
      quiz: [
        { q: "What does wrap-around mode do?", options: ["Wraps text around images", "Repeats the canvas so strokes continue across opposite edges", "Rotates the canvas", "Mirrors the canvas"], answer: 1, explain: "It's designed for painting seamless tiles." },
        { q: "How do you spot a weak pattern?", options: ["Look at one tile at 100%", "Zoom out to see many repeats and look for clumps or lines", "Export as JPEG", "Mirror the canvas"], answer: 1, explain: "Repetition reveals unevenness that one tile hides." },
      ],
      exercise: {
        title: "Paint a garden pattern",
        task: `<p>Paint a 1000 × 1000 seamless tile of leaves and flowers with the garden palette in wrap-around mode, check it zoomed out, and export garden-tile.png.</p>`,
        files: ["garden-palette.gpl"],
        solution: [
          `<em>File › New</em> 1000 × 1000; press ${k("W")}.`,
          "Fill the background with Cream; on a new layer paint leaves in the greens, crossing every edge at least once.",
          "Add flowers in Terracotta and Sun on another layer, spreading them evenly.",
          "Zoom out: fix clumps or gaps.",
          `${k("W")} off, <em>File › Export</em> garden-tile.png.`,
        ],
      },
    },
    quizbank: [
      { q: "Which key opens a new paint layer?", options: ["N", "Insert", "Ctrl+L", "L"], answer: 1, explain: "Insert adds a paint layer above the current one." },
      { q: "What does pressing / do with brushes?", options: ["Opens brush settings", "Switches to the previously used brush preset", "Deletes the preset", "Halves the size"], answer: 1, explain: "It toggles between your last two presets." },
      { q: "Which blending mode lightens, for glows and highlights?", options: ["Multiply", "Screen", "Darken", "Normal"], answer: 1, explain: "Screen (and Add) lighten the layers below." },
      { q: "In the fill tool, why reference all layers?", options: ["To fill every layer at once", "So the fill stops at lines drawn on another layer", "To use more colors", "To fill faster"], answer: 1, explain: "The fill reads the line layer but paints on the current one." },
      { q: "What file format does a .gpl palette use?", options: ["Binary image", "Plain text listing RGB values and names", "Krita-only format", "PDF"], answer: 1, explain: "GIMP palette files are simple text, which Krita imports." },
      { q: "Which keys rotate the canvas view?", options: ["R and T", "4 and 6", "Ctrl+arrows", "Q and E"], answer: 1, explain: "4 and 6 rotate; 5 resets." },
      { q: "What's the difference between Resize Canvas and Scale Image?", options: ["None", "Resize Canvas adds or trims space; Scale Image resizes the painting itself", "Scale Image adds space", "Resize Canvas changes colors"], answer: 1, explain: "Canvas versus content." },
      { q: "Why put your signature on its own layer?", options: ["It's required", "It's easy to move, resize or remove later", "It exports separately", "It prevents copying"], answer: 1, explain: "Separate layers keep elements editable." },
    ],
  },
  async makeFiles({ png }) {
    const W = 1600, H = 1200;
    const segs = [
      // cottage walls and roof
      [520, 640, 520, 1000], [1000, 640, 1000, 1000], [0, 1000, 1600, 1000],
      [470, 640, 760, 400], [760, 400, 1050, 640], [470, 640, 1050, 640],
      // door and window
      [700, 1000, 700, 820], [700, 820, 800, 820], [800, 820, 800, 1000],
      [860, 700, 960, 700], [960, 700, 960, 790], [960, 790, 860, 790], [860, 790, 860, 700],
      // trunk
      [1230, 1000, 1230, 866], [1290, 1000, 1290, 866],
    ];
    const art = png(W, H, (x, y) => {
      let d = Infinity;
      for (const s of segs) d = Math.min(d, segDist(x, y, ...s));
      d = Math.min(d, Math.abs(Math.hypot(x - 1260, y - 720) - 150)); // tree crown
      d = Math.min(d, Math.abs(Math.hypot(x - 1350, y - 230) - 90)); // sun
      const v = 255 * ink(d);
      return [v, v, v];
    });
    const sphere = png(1000, 800, (x, y) => {
      const cx = 480, cy = 380, r = 230;
      const dx = (x - cx) / r, dy = (y - cy) / r, dd = dx * dx + dy * dy;
      if (dd <= 1) {
        const nz = Math.sqrt(1 - dd);
        const lx = -0.55, ly = -0.6, lz = 0.58;
        let lum = Math.max(0, dx * lx + dy * ly + nz * lz);
        const reflect = Math.max(0, dy * 0.6 + dx * 0.3) * 0.18;
        lum = Math.min(1, 0.08 + lum * 0.9 + reflect);
        const v = 40 + lum * 205;
        return [v, v, v];
      }
      const shadow = Math.hypot((x - 600) / 1.9, (y - 640) / 0.55) < 120;
      if (shadow) return [70, 70, 72];
      return [214, 212, 208];
    });
    return { "cottage-lineart.png": art, "sphere-values.png": sphere, "garden-palette.gpl": PALETTE };
  },
};
