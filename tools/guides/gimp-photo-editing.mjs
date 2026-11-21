import { k } from "./_helpers.mjs";

// Smooth procedural "photos" (no noise, so the PNG files stay small).
function landscape(x, y, W, H, tilt = 0) {
  const horizon = H * 0.55 + (x - W / 2) * Math.tan(tilt);
  if (y < horizon - 60 - Math.sin(x / 140) * 40) {
    const t = y / horizon;
    return [120 + 60 * t, 165 + 45 * t, 215 + 20 * t];
  }
  if (y < horizon) return [70 + Math.sin(x / 60) * 6, 112, 78];
  const d = (y - horizon) / (H - horizon);
  const ripple = Math.sin(y / 6 + Math.sin(x / 50)) * 6;
  return [60 + 40 * d + ripple, 110 + 30 * d + ripple, 150 + 10 * d + ripple];
}
const flatten = (c, amount, cast) => c.map((v, i) => 128 + (v - 128) * amount + cast[i]);

export default {
  id: "gimp-photo-editing",
  slug: "gimp-photo-editing",
  title: "Photo Editing in GIMP",
  software: "GIMP",
  apps: ["GIMP"],
  intro:
    "Edit photos in GIMP, the free image editor: find your way around the workspace, crop and straighten, fix exposure and color with levels and curves, retouch with healing and cloning, cut out subjects with selections and masks, and add text and export for the web and print.",
  platformNote: "Shortcuts are shown for GIMP 3 on Windows and Linux. On a Mac, use Cmd in place of Ctrl.",
  store: {
    category: "design",
    level: "Beginner",
    software: "GIMP 3 (free and open source, for Windows, Mac and Linux)",
    softwareShort: "GIMP",
    softwareHtml: `<p>This guide is written for <strong>GIMP 3</strong>, the free and open-source image editor for Windows, Mac and Linux, obtained separately from gimp.org; it is not included with the guide. Most steps also work in GIMP 2.10, where a few menus are named or placed differently.</p>`,
    forWho: [
      "You want to improve your own photos without paying for a subscription editor.",
      "You've opened GIMP and found the tools and menus overwhelming.",
      "You need practical results: brighter photos, clean backgrounds, images sized for the web.",
    ],
    notFor: [
      "You need Photoshop specifically. The ideas carry over, but the steps here are GIMP's.",
      "You want digital painting. See Digital Painting in Krita.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "lake-dull.png", title: "Dull landscape", desc: "A flat, slightly blue-tinted lake scene to fix with levels, curves and white balance." },
    { name: "lake-tilted.png", title: "Tilted horizon", desc: "The same scene with a crooked horizon, to straighten and crop." },
    { name: "old-scan.png", title: "Dusty scan", desc: "A scanned sunset illustration covered in light and dark dust specks and a long scratch, for healing and cloning." },
    { name: "mug-product.png", title: "Product shot", desc: "A red mug on a gray background, for selections, masks and a new background." },
  ],
  shortcuts: [
    { keys: "R", action: "Rectangle Select tool", app: "GIMP" },
    { keys: "E", action: "Ellipse Select tool", app: "GIMP" },
    { keys: "F", action: "Free Select (lasso) tool", app: "GIMP" },
    { keys: "U", action: "Fuzzy Select (magic wand) tool", app: "GIMP" },
    { keys: "Shift+C", action: "Crop tool", app: "GIMP" },
    { keys: "Shift+M", action: "Measure tool", app: "GIMP" },
    { keys: "H", action: "Heal tool", app: "GIMP" },
    { keys: "C", action: "Clone tool", app: "GIMP" },
    { keys: "T", action: "Text tool", app: "GIMP" },
    { keys: "M", action: "Move tool", app: "GIMP" },
    { keys: "[", action: "Make the brush smaller", app: "GIMP" },
    { keys: "]", action: "Make the brush bigger", app: "GIMP" },
    { keys: "1", action: "Zoom to 100%", app: "GIMP" },
    { keys: "Ctrl+I", action: "Invert the selection", app: "GIMP" },
    { keys: "Ctrl+Shift+N", action: "New layer", app: "GIMP" },
    { keys: "Ctrl+Shift+D", action: "Duplicate the layer", app: "GIMP" },
    { keys: "Ctrl+Shift+E", action: "Export As", app: "GIMP" },
    { keys: "X", action: "Swap foreground and background colors", app: "GIMP" },
    { keys: "D", action: "Reset colors to black and white", app: "GIMP" },
    { keys: "Ctrl+Shift+A", action: "Select none", app: "GIMP", practice: false, note: "Your browser uses this shortcut to search tabs." },
    { keys: "Ctrl+Shift+J", action: "Fit the image in the window", app: "GIMP", practice: false, note: "Your browser uses this shortcut for its developer tools." },
  ],
  lessons: [
    {
      id: "workspace",
      title: "The GIMP workspace",
      summary: "Open an image, find the toolbox, tool options, layers and undo history, zoom and pan, and understand the difference between saving and exporting.",
      diagram: { type: "tree", root: "GIMP window", items: [["Toolbox (left)", 1], ["Tool Options (under the toolbox)", 2, true], ["Canvas (middle)", 1], ["Layers, Channels, Paths (right)", 1], ["Undo History", 2]], caption: "Every tool's settings live in Tool Options" },
      steps: [
        {
          title: "Open an image",
          body: `<p>Choose <em>File › Open</em> and pick <strong>lake-dull.png</strong>. The toolbox is on the left; below it, <em>Tool Options</em> shows the settings for whichever tool is active. On the right, the <em>Layers</em> panel lists the image's layers. If a panel is missing, find it under <em>Windows › Dockable Dialogs</em>.</p>`,
        },
        {
          title: "Grouped tools",
          body: `<p>Tools are grouped: a small triangle on a tool's icon means there are more under it. Pressing a tool's key (${k("R")} for Rectangle Select, ${k("M")} for Move) is usually quicker. Hover any tool to see its name and shortcut.</p>`,
        },
        {
          title: "Zoom and pan",
          body: `<p>${k("1")} shows the image at 100% (one image pixel per screen pixel), ideal for judging detail; ${k("Ctrl", "Shift", "J")} fits the whole image in the window. Ctrl+scroll zooms, and holding the Space bar while dragging pans.</p>`,
        },
        {
          title: "Save versus export",
          body: `<p><em>File › Save</em> writes an <code>.xcf</code> file: GIMP's own format, keeping layers, masks and selections so you can keep editing. <em>File › Export As</em> (${k("Ctrl", "Shift", "E")}) writes a PNG, JPEG or other file for sharing, flattened. Keep the .xcf as your working copy and export as often as you like.</p>`,
        },
      ],
      quiz: [
        { q: "Where are the settings for the active tool?", options: ["The Layers panel", "Tool Options", "The Image menu", "Preferences only"], answer: 1, explain: "Tool Options changes with whichever tool you pick." },
        { q: "Which file keeps your layers so you can edit later?", options: ["PNG", "JPEG", "XCF", "PDF"], answer: 2, explain: "XCF is GIMP's native format; exports flatten the image." },
      ],
      exercise: {
        title: "Open, look and save",
        task: `<p>Open <strong>lake-dull.png</strong>, zoom to 100% and then fit it to the window, find the Layers and Undo History panels, and save it as lake.xcf. How many layers does it have?</p>`,
        files: ["lake-dull.png"],
        solution: [
          "<em>File › Open</em>, choose the file.",
          `Press ${k("1")} for 100%, then ${k("Ctrl", "Shift", "J")} to fit.`,
          "Layers panel on the right shows <strong>one layer</strong>; open Undo History with <em>Windows › Dockable Dialogs › Undo History</em> if it's not visible.",
          "<em>File › Save As</em>, name it lake.xcf.",
        ],
      },
    },
    {
      id: "crop",
      title: "Crop, straighten and resize",
      summary: "Straighten a crooked horizon with the Measure tool, crop to a composition or exact ratio, and resize an image for its use.",
      diagram: { type: "compare", left: { title: "Before", items: ["Horizon tilted about 3°", "Empty sky at the top", "3000 px wide"] }, right: { title: "After", items: ["Horizon level", "Cropped to 3:2", "Scaled to 1600 px for the web"] }, accentRight: true, title: "Straighten first, then crop, then resize" },
      steps: [
        {
          title: "Straighten with the Measure tool",
          body: `<p>Open <strong>lake-tilted.png</strong> and press ${k("Shift", "M")} for the Measure tool. Drag along the horizon from left to right. The status bar shows the angle; then select <em>Straighten</em> in Tool Options. GIMP rotates the image so your line is level.</p>`,
        },
        {
          title: "Crop",
          body: `<p>Rotating leaves transparent corners. Press ${k("Shift", "C")} for the Crop tool, tick <em>Fixed: Aspect ratio</em> in Tool Options and type <code>3:2</code>, then drag a box that avoids the corners. Drag inside the box to move it and press Enter to crop. Turn on <em>Delete cropped pixels</em> to really discard the edges.</p>`,
        },
        {
          title: "Canvas versus image size",
          body: `<p><em>Image › Scale Image</em> resizes the picture itself (making it smaller or larger); <em>Image › Canvas Size</em> changes the area around it, adding or trimming space without scaling. For the web, scale the long side to 1600 to 2000 pixels; keep the chain icon linked so the proportions stay right.</p>`,
        },
        {
          title: "Resolution for print",
          body: `<p>For print, what matters is pixels per inch at the printed size. In <em>Scale Image</em>, set the resolution to 300 pixels per inch and the width in inches to see whether the image is big enough. Scaling up adds no real detail, so start from the largest original you have.</p>`,
        },
      ],
      quiz: [
        { q: "What does Image › Canvas Size change?", options: ["The picture's pixel dimensions by scaling", "The area around the picture without scaling it", "The resolution only", "The file format"], answer: 1, explain: "Canvas Size adds or trims space; Scale Image resizes the picture." },
        { q: "Why straighten before cropping?", options: ["Cropping is faster afterwards", "Rotating creates empty corners that the crop can then remove", "GIMP requires it", "It improves colors"], answer: 1, explain: "Crop last so the rotated corners are cut away." },
      ],
      exercise: {
        title: "Level the horizon",
        task: `<p>Straighten <strong>lake-tilted.png</strong> with the Measure tool, crop it to 3:2 without transparent corners, scale it to 1600 pixels wide, and export it as lake-straight.jpg.</p>`,
        files: ["lake-tilted.png"],
        solution: [
          `${k("Shift", "M")}, drag along the horizon from left to right; the status bar shows about 3°. Select <em>Straighten</em>.`,
          `${k("Shift", "C")}, tick <em>Fixed: Aspect ratio</em>, type 3:2, drag a box inside the image clear of the corners, press Enter.`,
          "<em>Image › Scale Image</em>: width 1600 px with the chain linked, then <em>Scale</em>.",
          `${k("Ctrl", "Shift", "E")}, name it lake-straight.jpg, <em>Export</em>, choose a quality around 85.`,
        ],
      },
    },
    {
      id: "tone",
      title: "Exposure and color",
      summary: "Read the histogram, fix flat images with Levels, shape contrast with Curves, remove a color cast, and adjust saturation.",
      diagram: { type: "levels", variant: "exposure", title: "Curves: lift or lower shadows, midtones and highlights separately" },
      steps: [
        {
          title: "The histogram",
          body: `<p><em>Colors › Levels</em> shows a histogram: how many pixels there are at each brightness, from black on the left to white on the right. In <strong>lake-dull.png</strong> the hump sits in the middle with empty space at both ends: no true blacks or whites, which is why it looks flat.</p>`,
        },
        {
          title: "Levels",
          body: `<p>In the Levels dialog, drag the black input slider right to where the histogram starts, and the white slider left to where it ends. Shadows get darker, highlights brighter, and the image gains contrast. The middle (gray) slider brightens or darkens midtones. Tick <em>Preview</em> to compare.</p>`,
        },
        {
          title: "Curves",
          body: `<p><em>Colors › Curves</em> gives finer control: click the line to add points and drag them. A gentle S-shape (lower point down a little, upper point up a little) adds contrast while protecting the extremes. Switch the <em>Channel</em> to Red, Green or Blue to adjust one color.</p>`,
        },
        {
          title: "Color cast and saturation",
          body: `<p>This scene has a blue cast. <em>Colors › Auto › White Balance</em> often fixes it in one step; for manual control, use <em>Colors › Color Balance</em> and move the yellow–blue slider towards yellow. <em>Colors › Hue-Saturation</em> then adds or reduces color intensity; small changes look most natural.</p>`,
        },
      ],
      quiz: [
        { q: "A histogram with empty space at both ends means…", options: ["The image is too dark", "It lacks true blacks and whites, so it looks flat", "It's overexposed", "It's black and white"], answer: 1, explain: "Stretching the ends with Levels restores contrast." },
        { q: "Which curve shape adds contrast?", options: ["A straight diagonal", "A gentle S-shape", "A flat line", "A curve raised everywhere"], answer: 1, explain: "The S darkens shadows and brightens highlights." },
      ],
      exercise: {
        title: "Bring the lake to life",
        task: `<p>Fix <strong>lake-dull.png</strong>: stretch the histogram with Levels, add a gentle S-curve, remove the blue cast, and raise saturation slightly. Export the result as lake-fixed.jpg and compare it with the original.</p>`,
        files: ["lake-dull.png"],
        solution: [
          "<em>Colors › Levels</em>: drag the black input slider to the left edge of the histogram hump and the white slider to its right edge; <em>OK</em>.",
          "<em>Colors › Curves</em>: add a point at about a quarter up and pull it slightly down, another at three quarters and pull it slightly up.",
          "<em>Colors › Auto › White Balance</em> removes the blue tint (or <em>Color Balance</em>, midtones, a little towards yellow).",
          "<em>Colors › Hue-Saturation</em>: Saturation +10 to +20.",
          `${k("Ctrl", "Shift", "E")} to export lake-fixed.jpg. The sky is bluer, the trees greener and the water darker.`,
        ],
      },
    },
    {
      id: "retouch",
      title: "Retouching: healing and cloning",
      summary: "Remove dust and blemishes with the Heal tool, copy texture with the Clone tool, and work non-destructively on a separate layer.",
      diagram: { type: "flow", nodes: ["New empty layer", "Ctrl+click a clean source", "Paint over the spot", "Check at 100%"], highlight: 1, title: "Heal and Clone both copy from a source you choose" },
      steps: [
        {
          title: "Work on a separate layer",
          body: `<p>Open <strong>old-scan.png</strong>. Press ${k("Ctrl", "Shift", "N")} to add a transparent layer named “Retouch”. In the Heal or Clone tool's options, tick <em>Sample merged</em> so they copy from what you see, while painting only on the new layer. If you overdo it, erase part of the layer; the original is untouched.</p>`,
        },
        {
          title: "The Heal tool",
          body: `<p>Press ${k("H")}. Hold ${k("Ctrl")} and click a clean area near the spot to set the source, then paint over the dust. Heal blends the copied texture with the surroundings' color and brightness, so it's ideal for specks on smooth areas such as sky. Size the brush with ${k("[")} and ${k("]")}, just larger than the speck.</p>`,
        },
        {
          title: "The Clone tool",
          body: `<p>Press ${k("C")}. It works the same way but copies pixels exactly, without blending. Use it for edges and patterns, such as where the scratch crosses the edge of the sun, where you need to continue the sun's curved edge rather than smooth it over. Re-sample often so repeated patterns don't give you away.</p>`,
        },
        {
          title: "Check your work",
          body: `<p>Press ${k("1")} to view at 100% and pan across the image. Toggle the Retouch layer's eye icon to compare before and after. Small, varied strokes look more natural than long sweeps.</p>`,
        },
      ],
      quiz: [
        { q: "What's the main difference between Heal and Clone?", options: ["Heal is faster", "Heal blends with the surrounding color and brightness; Clone copies pixels exactly", "Clone only works on text", "Heal needs a selection"], answer: 1, explain: "Use Heal on smooth areas and Clone where structure must continue." },
        { q: "Why retouch on a new layer with Sample merged ticked?", options: ["It's required", "The original stays untouched and mistakes are easy to undo", "It makes the file smaller", "It sharpens the image"], answer: 1, explain: "Non-destructive edits can be adjusted later." },
      ],
      exercise: {
        title: "Clean up the scan",
        task: `<p>On a separate layer, remove the dust specks from the sky of <strong>old-scan.png</strong> with the Heal tool and repair the scratch with the Clone tool. Compare before and after by toggling the layer, then export old-scan-clean.png.</p>`,
        files: ["old-scan.png"],
        solution: [
          `${k("Ctrl", "Shift", "N")}, name the layer Retouch, fill type Transparency.`,
          `${k("H")}, tick <em>Sample merged</em>, size the brush to just cover a speck, Ctrl+click clean sky nearby, then click each speck.`,
          `Heal the scratch across the sky the same way. Where it crosses the sun, switch to ${k("C")}: Ctrl+click an unscratched part of the sun's edge and paint along it in short strokes.`,
          "Click the Retouch layer's eye icon on and off to compare.",
          `${k("Ctrl", "Shift", "E")}, export old-scan-clean.png.`,
        ],
      },
    },
    {
      id: "selections",
      title: "Selections, masks and cutouts",
      summary: "Select a subject with the right tool, refine the edge, cut it out with a layer mask, and place it on a new background.",
      diagram: { type: "layers", items: ["Mug layer with a layer mask", "New background layer (gradient)"], highlight: 0, caption: "White in a mask shows the layer; black hides it" },
      steps: [
        {
          title: "Pick a selection tool",
          body: `<p>Open <strong>mug-product.png</strong>. The background is a smooth gray, so the easiest route is to select the background and invert: press ${k("U")} for Fuzzy Select, click the gray (adjust <em>Threshold</em> in Tool Options if it misses parts), then hold ${k("Shift")} and click the gray inside the handle too, because it isn't connected to the rest. Press ${k("Ctrl", "I")} to invert so the mug is selected.</p>`,
        },
        {
          title: "Refine the edge",
          body: `<p>Hold ${k("Shift")} while using a selection tool to add to the selection, ${k("Ctrl")} to subtract. <em>Select › Shrink</em> by 1 pixel removes a gray fringe; <em>Select › Feather</em> by 1 to 2 pixels softens the edge so it blends naturally. Press Shift+Q to see the selection as a red overlay (Quick Mask) and check it.</p>`,
        },
        {
          title: "Layer masks",
          body: `<p>Instead of deleting the background, hide it. Right-click the layer and choose <em>Add Layer Mask</em>, pick <em>Selection</em> and select <em>Add</em>. White areas of the mask show the layer; black areas hide it. To fix the edge later, paint on the mask with black or white.</p>`,
        },
        {
          title: "A new background",
          body: `<p>Press ${k("Ctrl", "Shift", "N")} for a new layer, drag it below the mug in the Layers panel, and fill it with the Gradient tool (${k("G")}) or a color. The mug now sits on the new background. Export as PNG to keep transparency, or as JPEG once a background is in place.</p>`,
        },
      ],
      quiz: [
        { q: "Why select the background and invert, instead of selecting the mug directly?", options: ["Inverting is required", "A plain background is easier to select accurately in one click", "The mug can't be selected", "It's faster to export"], answer: 1, explain: "Fuzzy Select works best on smooth, even areas." },
        { q: "On a layer mask, what does black do?", options: ["Shows the layer", "Hides the layer", "Darkens the layer", "Deletes the layer"], answer: 1, explain: "White reveals, black conceals, gray is partly transparent." },
      ],
      exercise: {
        title: "Cut out the mug",
        task: `<p>Select the mug in <strong>mug-product.png</strong>, refine the edge, hide the gray background with a layer mask, place a soft gradient behind it, and export two versions: mug-transparent.png (no background) and mug-final.jpg.</p>`,
        files: ["mug-product.png"],
        solution: [
          `${k("U")}, click the gray background, Shift+click the gray inside the handle (and the shadow, unless you want to keep it), then ${k("Ctrl", "I")} to invert.`,
          "<em>Select › Shrink</em> 1 px, then <em>Select › Feather</em> 1.5 px.",
          "Layers panel: right-click the layer › <em>Add Layer Mask</em> › <em>Selection</em> › <em>Add</em>. If the layer has no alpha channel, GIMP adds one automatically.",
          "Export mug-transparent.png now. Then add a new layer, move it below, and drag a gradient across it.",
          "Export mug-final.jpg.",
        ],
      },
    },
    {
      id: "finish",
      title: "Text, sharpening and export",
      summary: "Add text, sharpen for the final size, export the right format at the right quality, and batch-friendly habits.",
      diagram: { type: "table", head: ["Use", "Format", "Notes"], rows: [["Photos on the web", "JPEG or WebP", "Quality 80–85, long side 1600–2000 px"], ["Graphics, transparency", "PNG", "Lossless, larger files"], ["Print", "TIFF or high-quality JPEG", "300 ppi at print size"]], highlight: { rows: [0] }, caption: "Choose the export format for where the image is going" },
      steps: [
        {
          title: "Add text",
          body: `<p>Press ${k("T")}, click on the image and type. Change the font, size and color in Tool Options or the floating text toolbar. Each text box is its own layer; move it with the Move tool (${k("M")}). For readability on a photo, add a semi-transparent dark layer behind the text.</p>`,
        },
        {
          title: "Sharpen last",
          body: `<p>Sharpen after resizing, for the final size. <em>Filters › Enhance › Sharpen (Unsharp Mask)</em>: a small Radius (about 1) and modest Amount (0.3 to 0.6) at 100% zoom. Too much shows as bright halos along edges.</p>`,
        },
        {
          title: "Export options",
          body: `<p><em>File › Export As</em> picks the format from the extension you type. JPEG quality 80 to 85 is a good balance for photos. Under <em>Advanced options</em>, you can strip metadata such as the camera's location data before sharing. PNG keeps transparency; WebP makes smaller files for the web.</p>`,
        },
        {
          title: "Good habits",
          body: `<p>Keep originals untouched, work in an .xcf, and name exports by their use (lake-web.jpg, lake-print.tif). <em>File › Overwrite</em> updates the last exported file in one step after small changes.</p>`,
        },
      ],
      quiz: [
        { q: "When should you sharpen?", options: ["First, before anything else", "Last, after resizing to the final size", "Before cropping", "Never"], answer: 1, explain: "Sharpening depends on the final pixel size." },
        { q: "Which format keeps transparency?", options: ["JPEG", "PNG", "BMP", "All of them"], answer: 1, explain: "PNG (and WebP) support transparency; JPEG doesn't." },
      ],
      exercise: {
        title: "A captioned web image",
        task: `<p>Take your fixed lake photo, add the caption “Lake Ardel, early autumn” on a soft dark band along the bottom, sharpen lightly, and export a 1600-pixel JPEG at quality 85 with metadata stripped.</p>`,
        files: ["lake-dull.png"],
        solution: [
          "Open your lake.xcf (or lake-fixed.jpg). Scale to 1600 px wide if needed.",
          "New layer; Rectangle Select a band along the bottom, fill it black, set the layer's opacity to about 40%.",
          `${k("T")}, click on the band, type the caption in white.`,
          "Select the photo layer, <em>Filters › Enhance › Sharpen (Unsharp Mask)</em>: Radius 1, Amount 0.4.",
          `${k("Ctrl", "Shift", "E")}, lake-web.jpg, Quality 85, untick the metadata options under Advanced options, <em>Export</em>.`,
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-collage",
      title: "Bonus project: a three-photo collage",
      summary: "Build a square collage from three images with guides, layer masks and consistent color, ready for social media.",
      diagram: { type: "frames", variant: "nest", title: "A grid of frames: one large, two small" },
      steps: [
        {
          title: "Canvas and guides",
          body: `<p><em>File › New</em>: 1080 × 1080 pixels. <em>Image › Guides › New Guide (by Percent)</em> adds guides at 50% vertical and 50% horizontal on the right half. The left half holds one large image, the right two smaller ones.</p>`,
        },
        {
          title: "Place images with masks",
          body: `<p><em>File › Open as Layers</em> brings each image in as a layer. Scale each with ${k("Shift", "S")} so it covers its cell, then Rectangle Select the cell (it snaps to the guides) and add a layer mask from the selection. The masks crop without throwing away pixels, so you can reposition later.</p>`,
        },
        {
          title: "Make it consistent",
          body: `<p>Different photos rarely match. Apply similar Curves to each, or add a single color layer on top in <em>Soft light</em> mode at low opacity to tie them together. Leave a thin, even gap between cells for a clean look.</p>`,
        },
      ],
      quiz: [
        { q: "Why crop each image with a layer mask instead of the Crop tool?", options: ["Masks are faster", "You can reposition the image later because no pixels are deleted", "The Crop tool can't crop layers", "Masks improve color"], answer: 1, explain: "Masks hide rather than delete." },
        { q: "What does File › Open as Layers do?", options: ["Opens a new window", "Adds the chosen images as layers in the current image", "Merges all layers", "Exports layers"], answer: 1, explain: "It's the quick way to combine images." },
      ],
      exercise: {
        title: "Make the collage",
        task: `<p>Combine your fixed lake photo, the cleaned scan and the mug cutout into a 1080 × 1080 collage with even gaps, one shared color treatment, and export it as collage.jpg.</p>`,
        files: ["lake-dull.png", "old-scan.png", "mug-product.png"],
        solution: [
          "<em>File › New</em> 1080 × 1080; add guides at 50% vertical and, for the right half, 50% horizontal.",
          "<em>File › Open as Layers</em> for the three images.",
          `For each: ${k("Shift", "S")} to scale it over its cell, ${k("R")} to select the cell (shrink it 6 px for the gap with <em>Select › Shrink</em>), then <em>Add Layer Mask › Selection</em>.`,
          "Add a top layer filled with a warm color, mode <em>Soft light</em>, opacity 20%.",
          `${k("Ctrl", "Shift", "E")} as collage.jpg.`,
        ],
      },
    },
    quizbank: [
      { q: "Which key selects the Fuzzy Select tool?", options: ["F", "U", "S", "W"], answer: 1, explain: "U is Fuzzy Select; F is Free Select." },
      { q: "What does pressing 1 do in GIMP?", options: ["Opens the first image", "Zooms to 100%", "Selects layer 1", "Sets opacity to 100%"], answer: 1, explain: "1 shows the image at actual pixels." },
      { q: "Which menu holds Levels and Curves?", options: ["Image", "Colors", "Filters", "Layer"], answer: 1, explain: "Tonal and color adjustments are under Colors." },
      { q: "How do you set the source for the Heal or Clone tool?", options: ["Right-click", "Ctrl+click the source area", "Shift+click", "Double-click"], answer: 1, explain: "Ctrl+click sets where pixels are copied from." },
      { q: "What does Select › Feather do?", options: ["Removes the selection", "Softens the selection's edge", "Grows the selection", "Inverts it"], answer: 1, explain: "Feathering blends the edge over a few pixels." },
      { q: "You export a cutout as JPEG and the background turns white. Why?", options: ["A bug", "JPEG doesn't support transparency", "The mask was deleted", "Feathering was too high"], answer: 1, explain: "Use PNG or WebP to keep transparency." },
      { q: "What does Image › Scale Image change?", options: ["Only the canvas", "The image's pixel dimensions", "The file format", "The color mode"], answer: 1, explain: "Scale Image resizes the picture itself." },
      { q: "Which shortcut adds a new layer?", options: ["Ctrl+N", "Ctrl+Shift+N", "Ctrl+L", "Shift+N"], answer: 1, explain: "Ctrl+N is a new image; Ctrl+Shift+N a new layer." },
    ],
  },
  async makeFiles({ png }) {
    const W = 1500, H = 1000;
    const lakeDull = png(W, H, (x, y) => flatten(landscape(x, y, W, H), 0.55, [-6, 2, 18]));
    const lakeTilted = png(W, H, (x, y) => landscape(x, y, W, H, (3 * Math.PI) / 180));
    // Dusty sunset scan: smooth bands plus deterministic specks and one scratch.
    const specks = [];
    let s = 17;
    const rnd = () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
    for (let i = 0; i < 40; i++) specks.push([rnd() * 1200, rnd() * 420, 2 + rnd() * 4, rnd() < 0.5]);
    const scan = png(1200, 800, (x, y) => {
      for (const [sx, sy, r, light] of specks) if ((x - sx) ** 2 + (y - sy) ** 2 < r * r) return light ? [250, 245, 235] : [40, 30, 30];
      if (Math.abs(y - (x * 0.35 + 180)) < 1.2 && x > 300 && x < 820) return [245, 240, 230];
      const sun = Math.hypot(x - 760, y - 470);
      if (sun < 90) return [252, 214, 120];
      if (y > 520) return [70 + Math.sin(x / 30) * 8, 44, 70];
      const t = y / 520;
      return [235 - 40 * t, 150 - 60 * t + 20 * Math.sin(y / 40), 120 - 20 * t];
    });
    const mug = png(1200, 900, (x, y) => {
      const bg = 196 + (y / 900) * 18;
      const inBody = x > 430 && x < 740 && y > 260 && y < 660;
      const handle = Math.abs(Math.hypot(x - 760, y - 450) - 85) < 22 && x > 740;
      const shadow = Math.hypot((x - 585) / 2.2, y - 680) < 70;
      if (inBody || handle) {
        const shade = inBody ? 1 - Math.abs(x - 560) / 260 : 0.6;
        return [150 + 90 * shade, 22 + 20 * shade, 30 + 20 * shade];
      }
      if (shadow) return [bg - 40, bg - 40, bg - 38];
      return [bg, bg, bg + 2];
    });
    return { "lake-dull.png": lakeDull, "lake-tilted.png": lakeTilted, "old-scan.png": scan, "mug-product.png": mug };
  },
};
