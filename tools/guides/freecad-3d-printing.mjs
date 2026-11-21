import { k } from "./_helpers.mjs";

// ASCII STL of a union of boxes (good enough as a size reference in any viewer or slicer).
function stlBoxes(name, boxes) {
  const tri = (a, b, c) => {
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const len = Math.hypot(...n) || 1;
    return `  facet normal ${(n[0] / len).toFixed(4)} ${(n[1] / len).toFixed(4)} ${(n[2] / len).toFixed(4)}\n    outer loop\n${[a, b, c].map((p) => `      vertex ${p[0]} ${p[1]} ${p[2]}`).join("\n")}\n    endloop\n  endfacet\n`;
  };
  let out = `solid ${name}\n`;
  for (const [x0, y0, z0, x1, y1, z1] of boxes) {
    const p = (i, j, kk) => [i ? x1 : x0, j ? y1 : y0, kk ? z1 : z0];
    const faces = [
      [p(0, 0, 0), p(0, 1, 0), p(1, 1, 0), p(1, 0, 0)],
      [p(0, 0, 1), p(1, 0, 1), p(1, 1, 1), p(0, 1, 1)],
      [p(0, 0, 0), p(1, 0, 0), p(1, 0, 1), p(0, 0, 1)],
      [p(0, 1, 0), p(0, 1, 1), p(1, 1, 1), p(1, 1, 0)],
      [p(0, 0, 0), p(0, 0, 1), p(0, 1, 1), p(0, 1, 0)],
      [p(1, 0, 0), p(1, 1, 0), p(1, 1, 1), p(1, 0, 1)],
    ];
    for (const [a, b, c, d] of faces) out += tri(a, b, c) + tri(a, c, d);
  }
  return out + `endsolid ${name}\n`;
}

const DRAWING = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560" width="900" height="560" font-family="Arial, Helvetica, sans-serif" font-size="16">
  <rect width="900" height="560" fill="#ffffff"/>
  <text x="30" y="40" font-size="22" font-weight="700">Shelf bracket: dimensions in millimeters</text>
  <text x="30" y="64" fill="#555">Base 60 × 40 × 5, upright 60 × 5 × 40, two 5 mm holes, 3 mm fillet on the inside corner</text>
  <!-- Front view -->
  <text x="60" y="110" font-weight="700">Front view</text>
  <path d="M80 420 H320 V400 H100 V260 H80 Z" fill="#e8eef5" stroke="#1d2733" stroke-width="2"/>
  <line x1="80" y1="450" x2="320" y2="450" stroke="#1f6f8b"/><text x="185" y="472" fill="#1f6f8b">40</text>
  <line x1="50" y1="260" x2="50" y2="420" stroke="#1f6f8b"/><text x="20" y="345" fill="#1f6f8b">40</text>
  <line x1="340" y1="400" x2="340" y2="420" stroke="#1f6f8b"/><text x="348" y="415" fill="#1f6f8b">5</text>
  <text x="100" y="250" fill="#1f6f8b">5 (upright thickness)</text>
  <!-- Top view -->
  <text x="470" y="110" font-weight="700">Top view</text>
  <rect x="490" y="140" width="240" height="160" fill="#e8eef5" stroke="#1d2733" stroke-width="2"/>
  <rect x="490" y="140" width="20" height="160" fill="#cfdbe8" stroke="#1d2733" stroke-width="2"/>
  <circle cx="620" cy="180" r="10" fill="#ffffff" stroke="#1d2733" stroke-width="2"/>
  <circle cx="620" cy="260" r="10" fill="#ffffff" stroke="#1d2733" stroke-width="2"/>
  <line x1="760" y1="140" x2="760" y2="300" stroke="#1f6f8b"/><text x="770" y="225" fill="#1f6f8b">60</text>
  <line x1="490" y1="320" x2="730" y2="320" stroke="#1f6f8b"/><text x="600" y="342" fill="#1f6f8b">40</text>
  <text x="640" y="176" fill="#1f6f8b">Ø5</text>
  <text x="500" y="380" fill="#1d2733">Holes: 15 mm from each end, 25 mm from the upright's outer face</text>
  <text x="500" y="404" fill="#1d2733">Hole centers 30 mm apart</text>
  <text x="30" y="530" fill="#555">Print flat on the base. 0.2 mm layers, 3 walls, 20% infill. Shortcut Press practice drawing.</text>
</svg>
`;

export default {
  id: "freecad-3d-printing",
  slug: "freecad-3d-printing",
  title: "3D-Printable Parts in FreeCAD",
  software: "FreeCAD",
  apps: ["FreeCAD"],
  intro:
    "Design precise, editable parts for 3D printing in FreeCAD's Part Design workbench: navigate the 3D view, draw fully constrained sketches, pad and pocket them into solids, add holes, fillets and patterns, drive the design from a spreadsheet of parameters, and export a clean STL for your slicer. The lessons build a shelf bracket from a dimensioned drawing.",
  platformNote: "Shortcuts are shown for FreeCAD 1.0 on Windows and Linux. On a Mac, use Cmd in place of Ctrl.",
  store: {
    category: "design",
    level: "Beginner to intermediate",
    software: "FreeCAD 1.0 (free and open source, for Windows, Mac and Linux)",
    softwareShort: "FreeCAD",
    softwareHtml: `<p>This guide is written for <strong>FreeCAD 1.0</strong>, the free and open-source parametric 3D modeler for Windows, Mac and Linux, obtained separately from freecad.org; it is not included with the guide. A 3D printer is not required: the last lesson exports an STL file that any slicer (such as PrusaSlicer, Cura or Bambu Studio, also obtained separately) can open.</p>`,
    forWho: [
      "You have, or plan to use, a 3D printer and want to design your own functional parts.",
      "You've tried FreeCAD and found sketches and constraints confusing.",
      "You want designs you can change by editing a number, not by redrawing.",
    ],
    notFor: [
      "You want organic, sculpted models. See 3D Modeling Fundamentals in Blender.",
      "You need assemblies, technical drawings or CNC toolpaths in depth.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "bracket-drawing.svg", title: "Bracket drawing", desc: "A dimensioned drawing of the shelf bracket the lessons build." },
    { name: "bracket-reference.stl", title: "Reference STL", desc: "The bracket's outer shape as an STL, to compare sizes in a viewer or slicer." },
  ],
  shortcuts: [
    { keys: "0", action: "Isometric view", app: "FreeCAD" },
    { keys: "1", action: "Front view", app: "FreeCAD" },
    { keys: "2", action: "Top view", app: "FreeCAD" },
    { keys: "3", action: "Right view", app: "FreeCAD" },
    { keys: "4", action: "Rear view", app: "FreeCAD" },
    { keys: "5", action: "Bottom view", app: "FreeCAD" },
    { keys: "6", action: "Left view", app: "FreeCAD" },
    { keys: "Space", action: "Show or hide the selected object", app: "FreeCAD" },
    { keys: "F2", action: "Rename the selected object in the tree", app: "FreeCAD" },
    { keys: "Ctrl+S", action: "Save the document", app: "FreeCAD" },
    { keys: "Ctrl+Z", action: "Undo", app: "FreeCAD" },
    { keys: "Ctrl+Y", action: "Redo", app: "FreeCAD" },
    { keys: "Delete", action: "Delete the selected object", app: "FreeCAD" },
    { keys: "Esc", action: "Finish the current sketch tool", app: "FreeCAD", practice: false, note: "The trainer uses Esc to leave the practice area." },
  ],
  lessons: [
    {
      id: "interface",
      title: "The interface and navigation",
      summary: "Start a Part Design document, find the model tree, property view and toolbars, and move around the 3D view confidently.",
      diagram: { type: "tree", root: "bracket.FCStd", items: [["Body", 1, true], ["Origin (planes and axes)", 2], ["Sketch → Pad", 2], ["Sketch001 → Pocket", 2], ["Fillet", 2]], caption: "Part Design builds a body from a history of features" },
      steps: [
        {
          title: "Part Design workbench",
          body: `<p>FreeCAD is organized into <em>workbenches</em>, each with its own tools. Start a new document with <em>File › New</em>, then choose <strong>Part Design</strong> from the workbench selector in the toolbar. Part Design builds a solid body from features such as pads and pockets, each based on a sketch.</p>`,
        },
        {
          title: "Tree and properties",
          body: `<p>The <em>Combo View</em> on the left has the <em>Model</em> tab: a tree of everything in the document. Below it, the <em>Property View</em> shows the selected object's settings, such as a pad's length. Most changes later in the guide happen there.</p>`,
        },
        {
          title: "Navigate the 3D view",
          body: `<p>Press ${k("0")} for an isometric view and ${k("1")} to ${k("6")} for front, top, right, rear, bottom and left. How the mouse rotates and pans depends on the <em>navigation style</em>, chosen from the small menu at the bottom right of the window; <em>Gesture</em> or <em>Blender</em> suit most people. Scroll to zoom toward the cursor.</p>`,
        },
        {
          title: "Save often",
          body: `<p>Press ${k("Ctrl", "S")} and save as <em>bracket.FCStd</em>. FreeCAD's native file keeps the entire history, so you can change any feature later. Select an object and press ${k("Space")} to hide or show it; ${k("F2")} renames it in the tree.</p>`,
        },
      ],
      quiz: [
        { q: "What is a workbench in FreeCAD?", options: ["A file format", "A set of tools for one kind of work, such as Part Design", "A printer setting", "A view mode"], answer: 1, explain: "Switching workbenches changes the available tools." },
        { q: "Which key gives an isometric view?", options: ["1", "0", "I", "Space"], answer: 1, explain: "0 is isometric; 1–6 are the standard views." },
      ],
      exercise: {
        title: "Set up the document",
        task: `<p>Create a new document in Part Design, choose a navigation style you're comfortable with, cycle through the standard views with 0 to 6, and save it as bracket.FCStd.</p>`,
        files: ["bracket-drawing.svg"],
        solution: [
          "<em>File › New</em>, then pick <em>Part Design</em> in the workbench selector.",
          "Bottom-right navigation menu › <em>Gesture</em> (or another style); try rotating, panning and zooming.",
          `Press ${k("0")} to ${k("6")} in turn; the view changes each time.`,
          `${k("Ctrl", "S")}, name bracket.FCStd.`,
        ],
      },
    },
    {
      id: "sketch",
      title: "Sketches and constraints",
      summary: "Create a body and a sketch, draw a profile, and fully constrain it with geometric and dimensional constraints until it turns green.",
      diagram: { type: "flow", nodes: ["Draw roughly", "Geometric constraints", "Dimensions", "Fully constrained (green)"], highlight: 3, title: "Draw first, then pin it down" },
      steps: [
        {
          title: "Body and sketch",
          body: `<p>Select <em>Create body</em>, then <em>Create sketch</em> and choose the <strong>XZ plane</strong> (the front plane, because the bracket's L shape is seen from the front). The view turns to face the plane and the Sketcher tools appear.</p>`,
        },
        {
          title: "Draw roughly",
          body: `<p>Use the <em>Polyline</em> tool to draw the bracket's L profile: click six corners roughly in the right places and finish back at the first point. Don't worry about exact sizes yet; constraints will set them. Press ${k("Esc")} to stop drawing.</p>`,
        },
        {
          title: "Geometric constraints",
          body: `<p>FreeCAD usually adds horizontal and vertical constraints as you draw (small icons next to the lines). Add any missing ones with the <em>Constrain horizontal</em> and <em>Constrain vertical</em> tools, and make the corner sit on the origin with <em>Constrain coincident</em> between the corner point and the origin point.</p>`,
        },
        {
          title: "Dimensions until green",
          body: `<p>Select a line and use <em>Constrain distance</em> (or the dimension tool) to type its length from <strong>bracket-drawing.svg</strong>: 40 mm overall width and height, 5 mm thickness for both legs. The <em>Solver messages</em> panel counts remaining degrees of freedom; at zero, the sketch turns green: <strong>fully constrained</strong>. Select <em>Close</em>.</p>`,
        },
      ],
      quiz: [
        { q: "What does it mean when a sketch turns green?", options: ["It has an error", "It's fully constrained: nothing can move", "It's been padded", "It's selected"], answer: 1, explain: "Green means zero degrees of freedom." },
        { q: "Why constrain a sketch fully?", options: ["FreeCAD requires it to save", "So it changes predictably when you edit dimensions later", "To make it print faster", "To color it"], answer: 1, explain: "Unconstrained geometry can shift unexpectedly when other things change." },
      ],
      exercise: {
        title: "Sketch the L profile",
        task: `<p>Create a body and a sketch on the XZ plane, draw the L-shaped profile of the bracket with its outer corner at the origin, and constrain it fully using the dimensions on <strong>bracket-drawing.svg</strong>.</p>`,
        files: ["bracket-drawing.svg"],
        solution: [
          "<em>Create body</em>, then <em>Create sketch</em> › XZ_Plane › <em>OK</em>.",
          "Polyline: six clicks for the L (outer corner, along the bottom, up the inside, along the top of the base, up the upright, back down) and close it on the first point.",
          "Coincident constraint between the outer corner and the origin; check every line has a horizontal or vertical constraint.",
          "Distances: bottom edge 40, outer upright edge 40, base thickness 5, upright thickness 5.",
          "The solver reports fully constrained and the lines turn green; <em>Close</em>.",
        ],
      },
    },
    {
      id: "pad",
      title: "From sketch to solid",
      summary: "Pad a sketch into a solid, choose its direction and length, edit a feature later, and understand the feature history.",
      diagram: { type: "layers", items: ["Pad (60 mm, symmetric to plane)", "Sketch (L profile, fully constrained)", "XZ plane"], highlight: 0, caption: "Each feature builds on the one below" },
      steps: [
        {
          title: "Pad",
          body: `<p>Select the sketch in the tree and choose <em>Pad</em>. In the task panel, set the <em>Length</em> to 60 mm and tick <em>Symmetric to plane</em> so the bracket extends 30 mm each side of the sketch. Select <em>OK</em>: the L becomes a solid bracket.</p>`,
        },
        {
          title: "Edit any time",
          body: `<p>Double-click <em>Pad</em> in the tree to reopen its task panel, or change <em>Length</em> directly in the Property View. Double-click the sketch to change its dimensions. Everything after it recomputes automatically.</p>`,
        },
        {
          title: "The feature history",
          body: `<p>Features in a body are applied in order, top to bottom. The last one with the <em>Tip</em> marker is the shape you see. Right-click an earlier feature and choose <em>Set Tip</em> to view the part as it was then; set it back to the last feature before continuing.</p>`,
        },
        {
          title: "Check dimensions",
          body: `<p>Use the <em>Measure</em> tool (on the toolbar in FreeCAD 1.0) and click two faces or edges to read the distance. The bracket should be 40 mm wide, 40 mm tall and 60 mm long.</p>`,
        },
      ],
      quiz: [
        { q: "What does Symmetric to plane do in a Pad?", options: ["Mirrors the sketch", "Extends half the length on each side of the sketch plane", "Doubles the length", "Makes it hollow"], answer: 1, explain: "A 60 mm symmetric pad goes 30 mm each way." },
        { q: "How do you change a pad's length after creating it?", options: ["Delete and redo it", "Double-click it in the tree or edit Length in the Property View", "Edit the STL", "Scale the body"], answer: 1, explain: "Features stay editable." },
      ],
      exercise: {
        title: "Make the bracket solid",
        task: `<p>Pad the L sketch 60 mm symmetrically, then change the base thickness in the sketch from 5 to 6 mm and back again, watching the solid update. Measure the overall size.</p>`,
        files: ["bracket-drawing.svg", "bracket-reference.stl"],
        solution: [
          "Select Sketch, <em>Pad</em>, Length 60 mm, tick <em>Symmetric to plane</em>, <em>OK</em>.",
          "Double-click Sketch, double-click the 5 mm base-thickness dimension, type 6, <em>Close</em>: the base thickens. Change it back to 5.",
          "Measure: 40 × 40 × 60 mm.",
          "Optional: open bracket-reference.stl in a viewer or slicer and compare its outer size.",
        ],
      },
    },
    {
      id: "holes",
      title: "Pockets, holes and sketches on faces",
      summary: "Sketch on a face of the solid, cut material with Pocket, and add proper screw holes with the Hole feature.",
      diagram: { type: "compare", left: { title: "Pocket", items: ["Cuts any sketch shape", "Depth or Through all", "Good for slots and recesses"] }, right: { title: "Hole", items: ["Cuts from circle centers", "Countersink, counterbore,", "threads and standard sizes"] }, accentRight: true, title: "Two ways to remove material" },
      steps: [
        {
          title: "Sketch on a face",
          body: `<p>Click the top face of the bracket's base so it's highlighted, then choose <em>Create sketch</em>. The new sketch is attached to that face and moves with it if the design changes. Press ${k("2")} if you need the top view.</p>`,
        },
        {
          title: "Place the hole centers",
          body: `<p>Draw two circles (or two points) and constrain their centers from the drawing: 15 mm from each end of the base and 25 mm from the upright's outer face, so their centers are 30 mm apart. Use <em>Constrain diameter</em> to set 5 mm, and make the circles equal with <em>Constrain equal</em>.</p>`,
        },
        {
          title: "Hole",
          body: `<p>With the sketch selected, choose <em>Hole</em>. Set the diameter (5 mm), depth <em>Through all</em>, and optionally a countersink or counterbore for screw heads. The Hole feature creates one hole at each circle center.</p>`,
        },
        {
          title: "Pocket for other shapes",
          body: `<p>For a slot or recess, sketch the shape and use <em>Pocket</em> instead, with a set depth or <em>Through all</em>. For example, a 10 × 20 mm recess 1 mm deep in the upright for a label.</p>`,
        },
      ],
      quiz: [
        { q: "Why attach a sketch to a face of the solid?", options: ["It's faster to draw", "The sketch moves with that face if the design changes", "Faces can't be pocketed otherwise", "It hides the sketch"], answer: 1, explain: "Attachment keeps features in place as earlier features change." },
        { q: "What advantage does the Hole feature have over a circular Pocket?", options: ["None", "Standard options such as countersinks, counterbores and threads", "It's always deeper", "It works without a sketch"], answer: 1, explain: "Hole knows about screw hole types." },
      ],
      exercise: {
        title: "Add the screw holes",
        task: `<p>Sketch on the top face of the base, place two 5 mm circles exactly where the drawing shows, fully constrain them, and make them through-holes with the Hole feature.</p>`,
        files: ["bracket-drawing.svg"],
        solution: [
          "Click the base's top face, <em>Create sketch</em>.",
          "Draw two circles; Constrain diameter 5 on one and Constrain equal between them.",
          "Constrain the centers: 15 mm from the nearer end of the base, 25 mm from the upright's outer face. The sketch turns green; <em>Close</em>.",
          "With the sketch selected: <em>Hole</em>, diameter 5 mm, depth <em>Through all</em>, <em>OK</em>.",
          "Press 5 for the bottom view: both holes go all the way through.",
        ],
      },
    },
    {
      id: "details",
      title: "Fillets, chamfers and patterns",
      summary: "Strengthen inside corners with fillets, break sharp edges with chamfers, and repeat features with mirrors and patterns.",
      diagram: { type: "flow", nodes: ["Select edge", "Fillet 3 mm", "Mirror or pattern", "Recompute"], highlight: 1, title: "Finishing features" },
      steps: [
        {
          title: "Fillet the inside corner",
          body: `<p>Sharp inside corners concentrate stress and crack first. Select the inside edge where the base meets the upright and choose <em>Fillet</em>; set the radius to 3 mm. A fillet there makes the printed bracket noticeably stronger.</p>`,
        },
        {
          title: "Chamfer outside edges",
          body: `<p>Select the outer top edges and choose <em>Chamfer</em> with a size of 0.5 to 1 mm. Chamfers remove sharp edges and print better than fillets on edges that touch the print bed, where a rounded edge would overhang.</p>`,
        },
        {
          title: "Mirrored and patterns",
          body: `<p><em>Mirrored</em> copies a feature across a plane; <em>LinearPattern</em> repeats it along a direction a set number of times; <em>PolarPattern</em> repeats it around an axis. For example, sketch one hole, make it, then use LinearPattern for the second: change the count later to get three holes.</p>`,
        },
        {
          title: "Order matters",
          body: `<p>Add fillets and chamfers near the end of the history; a fillet made before a pocket may fail if the pocket later removes its edge. If a feature turns red with an error after a change, double-click it and reselect the edges.</p>`,
        },
      ],
      quiz: [
        { q: "Why fillet the inside corner of a printed bracket?", options: ["For looks only", "Sharp inside corners concentrate stress and crack first", "It saves filament", "Slicers require it"], answer: 1, explain: "A radius spreads the load." },
        { q: "Why prefer a chamfer to a fillet on edges touching the print bed?", options: ["Chamfers are smaller", "A fillet there overhangs and prints poorly; a chamfer doesn't", "Fillets can't be printed", "It's required"], answer: 1, explain: "The chamfer's 45° slope prints without support." },
      ],
      exercise: {
        title: "Strengthen and finish",
        task: `<p>Add a 3 mm fillet on the inside corner and 0.8 mm chamfers on the top edges of the upright. Then try a LinearPattern of the holes with three occurrences and undo it.</p>`,
        files: ["bracket-drawing.svg"],
        solution: [
          "Click the inside edge between base and upright, <em>Fillet</em>, radius 3 mm, <em>OK</em>.",
          "Select the top edges of the upright (Ctrl+click to add), <em>Chamfer</em>, size 0.8 mm, <em>OK</em>.",
          "Select the Hole feature, <em>LinearPattern</em>, direction along the base's length, Length 30 mm, Occurrences 3, <em>OK</em>.",
          "Look, then Ctrl+Z (or delete the pattern) to go back to two holes.",
        ],
      },
    },
    {
      id: "export",
      title: "Parameters and exporting for printing",
      summary: "Drive dimensions from a spreadsheet so the whole part updates from one table, check the design for printing, and export an STL.",
      diagram: { type: "table", head: ["Alias", "Value", "Used in"], rows: [["length", "60 mm", "Pad length"], ["thickness", "5 mm", "both legs in the sketch"], ["hole_d", "5 mm", "Hole diameter"]], highlight: { rows: [1] }, caption: "Change a cell; the bracket updates" },
      steps: [
        {
          title: "A spreadsheet of parameters",
          body: `<p>Switch to the <em>Spreadsheet</em> workbench and create a spreadsheet. Type names in column A and values in column B (length 60, thickness 5, hole_d 5). Right-click each value cell, choose <em>Properties › Alias</em>, and give it the name, so formulas can refer to it.</p>`,
        },
        {
          title: "Expressions",
          body: `<p>In any number field (a pad's length, a sketch dimension), type <code>=</code> to open the expression editor and enter <code>Spreadsheet.length</code>. Do the same for the thickness dimensions and the hole diameter. Now changing a cell changes the part: try length 80 for a longer bracket.</p>`,
        },
        {
          title: "Design for printing",
          body: `<p>Keep walls at least 1.2 mm (three perimeters with a 0.4 mm nozzle), avoid overhangs steeper than about 45° without support, and allow about 0.2 mm clearance where parts must fit together. Print this bracket flat on its base, so layers run along the load.</p>`,
        },
        {
          title: "Export an STL",
          body: `<p>Select the <em>Body</em> in the tree and choose <em>File › Export</em>, then pick <em>STL Mesh (*.stl)</em> as the file type. Open it in your slicer to check size and orientation. Keep the .FCStd: the STL is a mesh for printing and can't be edited parametrically.</p>`,
        },
      ],
      quiz: [
        { q: "What does Spreadsheet.length do in a pad's Length field?", options: ["Opens the spreadsheet", "Links the length to the cell with alias length", "Copies the value once", "Measures the pad"], answer: 1, explain: "Expressions keep the value linked to the cell." },
        { q: "Why keep the .FCStd after exporting the STL?", options: ["The STL is larger", "The STL is a mesh that can't be edited parametrically", "Slicers need both", "To print in color"], answer: 1, explain: "Changes are made in FreeCAD, then re-exported." },
      ],
      exercise: {
        title: "A parametric bracket",
        task: `<p>Create a spreadsheet with length, thickness and hole_d, link the pad length, both thickness dimensions and the hole diameter to it, change length to 80 to check everything updates, set it back to 60, and export bracket.stl.</p>`,
        files: ["bracket-reference.stl"],
        solution: [
          "Spreadsheet workbench › <em>Create spreadsheet</em>; A1–A3 names, B1–B3 values 60, 5, 5; set each B cell's alias (length, thickness, hole_d).",
          "Back in Part Design: Pad Length field › type = › <code>Spreadsheet.length</code>.",
          "In the sketch, the two 5 mm dimensions › <code>Spreadsheet.thickness</code>; in the Hole, diameter › <code>Spreadsheet.hole_d</code>.",
          "Change B1 to 80 and recompute (Ctrl+R or the refresh button): the bracket lengthens and the holes stay in place relative to their constraints. Set it back to 60.",
          "Select Body › <em>File › Export</em> › STL Mesh › bracket.stl; open it in a slicer to check.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-box",
      title: "Bonus project: a box with a snug lid",
      summary: "Design a parametric storage box and a lid that fits, using a shell, a lip and a clearance parameter you can tune for your printer.",
      diagram: { type: "table", head: ["Alias", "Value"], rows: [["inner_w", "60 mm"], ["inner_d", "40 mm"], ["wall", "1.6 mm"], ["clearance", "0.2 mm"]], highlight: { rows: [3] }, caption: "One clearance value makes the lid fit your printer" },
      steps: [
        {
          title: "The box",
          body: `<p>In a spreadsheet, define inner width, depth and height, wall thickness and clearance. Sketch a rectangle the outer size (inner + 2 × wall), pad it to the height, then use <em>Thickness</em> on the top face to hollow it, leaving walls of <code>Spreadsheet.wall</code>.</p>`,
        },
        {
          title: "The lid in a second body",
          body: `<p>Create a new Body for the lid: a thin plate the box's outer size, plus a lip underneath whose outer size is the box's inner size minus 2 × clearance. Linking the lip to the same parameters keeps the parts matched whatever size you choose.</p>`,
        },
        {
          title: "Test print and tune",
          body: `<p>Export each body as its own STL. If the lid is too tight, raise clearance to 0.3 mm; if it rattles, lower it to 0.15. That single number captures your printer's accuracy for every future fit.</p>`,
        },
      ],
      quiz: [
        { q: "Why subtract clearance from the lid's lip?", options: ["To save filament", "Printed parts come out slightly oversized; clearance lets them fit", "For looks", "To make the lid heavier"], answer: 1, explain: "Clearance compensates for printing tolerances." },
        { q: "Why put the lid in a separate body?", options: ["Bodies must be printed separately and stay independent solids", "It's required for spreadsheets", "To change color", "To hide it"], answer: 0, explain: "Each body is one solid part to export and print." },
      ],
      exercise: {
        title: "Build the box and lid",
        task: `<p>Make a parametric 60 × 40 × 30 mm (inside) box with 1.6 mm walls and a lid with a lip using 0.2 mm clearance. Export both as STLs.</p>`,
        files: [],
        solution: [
          "Spreadsheet: inner_w 60, inner_d 40, inner_h 30, wall 1.6, clearance 0.2 (with aliases).",
          "Box body: rectangle <code>=Spreadsheet.inner_w + 2 * Spreadsheet.wall</code> by the same for depth, pad <code>=Spreadsheet.inner_h + Spreadsheet.wall</code>, then <em>Thickness</em> on the top face with <code>=Spreadsheet.wall</code>.",
          "Lid body: plate the outer size, 2 mm thick; a lip sketch on its underside sized <code>=Spreadsheet.inner_w - 2 * Spreadsheet.clearance</code>, padded 4 mm.",
          "Export each body separately as box.stl and lid.stl.",
        ],
      },
    },
    quizbank: [
      { q: "Which workbench builds solids from sketches and features?", options: ["Draft", "Part Design", "Mesh", "Spreadsheet"], answer: 1, explain: "Part Design is the feature-based modeling workbench." },
      { q: "What color is a fully constrained sketch?", options: ["White", "Red", "Green", "Blue"], answer: 2, explain: "Fully constrained geometry turns green." },
      { q: "Which feature adds material from a sketch?", options: ["Pocket", "Pad", "Hole", "Chamfer"], answer: 1, explain: "Pad extrudes a sketch into material." },
      { q: "What does the Tip marker show?", options: ["The selected object", "The feature that defines the body's current shape", "The first feature", "An error"], answer: 1, explain: "Features after the Tip aren't applied." },
      { q: "Which key shows the top view?", options: ["1", "2", "3", "0"], answer: 1, explain: "2 is the top view." },
      { q: "What's a sensible minimum wall thickness with a 0.4 mm nozzle?", options: ["0.2 mm", "About 1.2 mm", "5 mm", "0.4 mm"], answer: 1, explain: "Three perimeters of 0.4 mm make a sturdy wall." },
      { q: "Which file should you keep for future edits?", options: ["The STL", "The .FCStd", "The slicer's G-code", "A screenshot"], answer: 1, explain: "The FreeCAD file keeps the parametric history." },
      { q: "How do you link a dimension to a spreadsheet cell?", options: ["Copy the value", "Type = in the field and enter Spreadsheet.alias", "Drag the cell onto the part", "It's automatic"], answer: 1, explain: "The expression editor links values to cells." },
    ],
  },
  async makeFiles() {
    // Bracket: base 40 (x) × 60 (y) × 5 (z), upright 5 × 60 × 40 at x = 0..5.
    const stl = stlBoxes("bracket", [
      [0, -30, 0, 40, 30, 5],
      [0, -30, 0, 5, 30, 40],
    ]);
    return { "bracket-drawing.svg": DRAWING, "bracket-reference.stl": stl };
  },
};
