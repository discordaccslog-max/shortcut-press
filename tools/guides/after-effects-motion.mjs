import { k } from "./_helpers.mjs";

const STORYBOARD = `Harbor Coffee: 10-second logo sting (1920 x 1080, 30 fps)

0:00 - 0:01  Background fades up from black.
0:01 - 0:03  Logo mark scales from 0% to 100% with an overshoot, while rotating -20 to 0 degrees.
0:02 - 0:04  A line draws itself under the logo (Trim Paths).
0:03 - 0:06  "Harbor Coffee" types on, letter by letter, rising 20 px as each letter fades in.
0:06 - 0:08  Tagline "Small-batch coffee by the water" fades in below.
0:08 - 0:10  Hold, then everything fades out together (parented to one null).

Music: music-loop.wav, 120 BPM, starts at 0:00. Beats fall every 0.5 s: land key moments on beats.
`;

export default {
  id: "after-effects-motion",
  slug: "after-effects-motion",
  title: "Motion Graphics in After Effects",
  software: "Adobe After Effects",
  apps: ["After Effects"],
  intro:
    "Animate a ten-second logo sting in Adobe After Effects: compositions, layers and the timeline, keyframes and transform properties, easing with the graph editor, shape layers and animated text, parenting, precomps and mattes, and rendering a finished video. The lessons follow a storyboard and land key moments on the music's beats.",
  platformNote: "Shortcuts are shown for After Effects on Windows. On a Mac, use Cmd in place of Ctrl and Option in place of Alt.",
  store: {
    category: "media",
    level: "Beginner to intermediate",
    software: "Adobe After Effects (Creative Cloud subscription)",
    softwareShort: "After Effects",
    softwareHtml: `<p>This guide is written for <strong>Adobe After Effects</strong> (recent Creative Cloud versions) on Windows or Mac. After Effects is not included with the guide; it needs a Creative Cloud subscription or trial, obtained separately from Adobe. Exporting to MP4 uses <em>Adobe Media Encoder</em>, which comes with the subscription, or the H.264 option in After Effects' own Render Queue.</p>`,
    forWho: [
      "You want to animate logos, titles and graphics for videos or social media.",
      "You've opened After Effects and found the timeline and properties confusing.",
      "You know a design tool such as Illustrator, Figma or Canva and want things to move.",
    ],
    notFor: [
      "You need visual effects compositing, 3D tracking or rotoscoping in depth.",
      "You want to edit long videos. See Video Editing in DaVinci Resolve.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "storyboard.txt", title: "Storyboard", desc: "Second-by-second plan for the ten-second logo sting." },
    { name: "logo-mark.png", title: "Logo mark", desc: "A 1000 × 1000 pixel coffee-cup mark on a transparent background." },
    { name: "background.png", title: "Background", desc: "A soft 1920 × 1080 sea-blue gradient." },
    { name: "music-loop.wav", title: "Music loop", desc: "A ten-second, 120 BPM loop with a clear beat for timing animation." },
  ],
  shortcuts: [
    { keys: "Space", action: "Play or stop the preview", app: "After Effects" },
    { keys: "P", action: "Show Position", app: "After Effects" },
    { keys: "S", action: "Show Scale", app: "After Effects" },
    { keys: "R", action: "Show Rotation", app: "After Effects" },
    { keys: "T", action: "Show Opacity", app: "After Effects" },
    { keys: "A", action: "Show Anchor Point", app: "After Effects" },
    { keys: "U", action: "Show every animated property", app: "After Effects" },
    { keys: "J", action: "Go to the previous keyframe", app: "After Effects" },
    { keys: "K", action: "Go to the next keyframe", app: "After Effects" },
    { keys: "B", action: "Set the work area start", app: "After Effects" },
    { keys: "N", action: "Set the work area end", app: "After Effects" },
    { keys: "F9", action: "Easy Ease the selected keyframes", app: "After Effects" },
    { keys: "Ctrl+D", action: "Duplicate the layer", app: "After Effects" },
    { keys: "Alt+[", action: "Trim the layer's start to the current time", app: "After Effects" },
    { keys: "Alt+]", action: "Trim the layer's end to the current time", app: "After Effects" },
    { keys: "Ctrl+Y", action: "New solid layer", app: "After Effects" },
    { keys: "Ctrl+M", action: "Add to the Render Queue", app: "After Effects" },
    { keys: "Ctrl+N", action: "New composition", app: "After Effects", practice: false, note: "Your browser uses this shortcut to open a new window." },
    { keys: "Ctrl+Shift+C", action: "Precompose", app: "After Effects", practice: false, note: "Your browser uses this shortcut for its developer tools." },
  ],
  lessons: [
    {
      id: "comp",
      title: "Projects, compositions and layers",
      summary: "Set up a project, import files, create a composition with the right size and length, and find your way around the timeline.",
      diagram: { type: "timeline", variant: "titles", title: "Layers stack in the timeline: upper layers appear in front" },
      steps: [
        {
          title: "Import",
          body: `<p>Start a new project and choose <em>File › Import › File</em> (${k("Ctrl", "I")}) to bring in <strong>logo-mark.png</strong>, <strong>background.png</strong> and <strong>music-loop.wav</strong>. They appear in the <em>Project</em> panel. Files are linked, not copied, so keep them in one folder with the project.</p>`,
        },
        {
          title: "A composition",
          body: `<p>Choose <em>Composition › New Composition</em>: name it “Logo sting”, 1920 × 1080, frame rate 30, duration 0:00:10:00. A composition (comp) is a timeline with its own size and length; drag the background, logo and music from the Project panel into it.</p>`,
        },
        {
          title: "The timeline",
          body: `<p>Each item is a layer, one per row; higher layers appear in front. The blue current-time indicator shows where you are; drag it to scrub. Press ${k("Space")} to preview. Set a shorter work area with ${k("B")} (start) and ${k("N")} (end) to preview just the part you're working on.</p>`,
        },
        {
          title: "Organize",
          body: `<p>Rename layers by selecting one and pressing Enter. Lock the background with the lock switch so you don't nudge it, and color-code layers with the label swatch. With the music layer selected, press <code>L</code> twice to show its waveform; peaks show you where the beats are.</p>`,
        },
      ],
      quiz: [
        { q: "What is a composition?", options: ["A rendered video", "A timeline with its own size, frame rate and duration, holding layers", "An imported file", "An effect"], answer: 1, explain: "Comps are where animation happens." },
        { q: "What do B and N set?", options: ["Bold and normal text", "The start and end of the work area", "Keyframes", "Blend modes"], answer: 1, explain: "The work area limits previews and renders." },
      ],
      exercise: {
        title: "Set up the logo sting",
        task: `<p>Import the three practice media files, create a 1920 × 1080, 30 fps, 10-second comp called “Logo sting”, and stack background, logo and music in the right order. Show the music's waveform and preview.</p>`,
        files: ["logo-mark.png", "background.png", "music-loop.wav", "storyboard.txt"],
        solution: [
          `${k("Ctrl", "I")}, select the three files, <em>Import</em>.`,
          "<em>Composition › New Composition</em>: Logo sting, 1920 × 1080, 30 fps, 0:00:10:00, <em>OK</em>.",
          "Drag background.png, then logo-mark.png, then music-loop.wav into the timeline; the logo above the background.",
          "Select the music layer, press L twice: the waveform shows a strong peak every half second.",
          `${k("Space")} to preview.`,
        ],
      },
    },
    {
      id: "keyframes",
      title: "Keyframes and transform properties",
      summary: "Animate position, scale, rotation and opacity with keyframes, move the anchor point, and read keyframes in the timeline.",
      diagram: { type: "keyframes", tracks: [["Scale", [0.1, 0.3], 1], ["Rotation", [0.1, 0.3]], ["Opacity", [0, 0.1]]], caption: "Keyframes store values at times; After Effects fills in between" },
      steps: [
        {
          title: "Transform properties",
          body: `<p>Every layer has five transform properties. Select it and press a letter to show just one: ${k("P")} position, ${k("S")} scale, ${k("R")} rotation, ${k("T")} opacity, ${k("A")} anchor point. Hold ${k("Shift")} and press another letter to add it to the view.</p>`,
        },
        {
          title: "Set keyframes",
          body: `<p>Move to 0:01, show Scale, and click the stopwatch next to it: a keyframe appears with the current value. Set Scale to 0%. Move to 0:03 and set 100%: After Effects adds a second keyframe and animates between them. Every value change at a new time adds a keyframe once the stopwatch is on.</p>`,
        },
        {
          title: "The anchor point",
          body: `<p>Scale and rotation happen around the anchor point, normally the layer's center. To make something pivot from another spot, move the anchor point with the <em>Pan Behind</em> tool (Y) or by changing the Anchor Point property. Moving it changes where the layer appears, so set it before animating.</p>`,
        },
        {
          title: "Work with keyframes",
          body: `<p>Press ${k("U")} to show every animated property. ${k("J")} and ${k("K")} jump to the previous and next keyframe. Drag keyframes to retime them, select several to move them together, and copy and paste keyframes between layers with Ctrl+C and Ctrl+V.</p>`,
        },
      ],
      quiz: [
        { q: "What happens after you click a property's stopwatch?", options: ["The property is deleted", "Keyframing is turned on: changing the value at another time adds a keyframe", "The layer is locked", "The comp renders"], answer: 1, explain: "The stopwatch enables animation for that property." },
        { q: "Which key shows every animated property?", options: ["A", "U", "E", "K"], answer: 1, explain: "U reveals properties with keyframes." },
      ],
      exercise: {
        title: "Animate the logo in",
        task: `<p>Following the storyboard, fade the background up from 0% to 100% opacity between 0:00 and 0:01, and scale the logo from 0% to 100% between 0:01 and 0:03 while rotating it from −20° to 0°.</p>`,
        files: ["storyboard.txt", "logo-mark.png"],
        solution: [
          `Background: at 0:00 press ${k("T")}, stopwatch, Opacity 0%; at 0:01, 100%.`,
          `Logo: at 0:01 press ${k("S")}, then ${k("Shift")}+${k("R")}; click both stopwatches; Scale 0%, Rotation −20°.`,
          "At 0:03: Scale 100%, Rotation 0°.",
          `Press ${k("U")} on the logo: four keyframes. ${k("Space")} to preview: the logo grows and straightens at a steady, mechanical speed (Lesson 3 fixes that).`,
        ],
      },
    },
    {
      id: "easing",
      title: "Easing and the graph editor",
      summary: "Make motion feel natural with Easy Ease, shape speed in the graph editor, and add an overshoot that settles.",
      diagram: { type: "keyframes", tracks: [["Scale", [0.15, 0.5, 0.7], 1]], ease: true, caption: "Ease in and out: slow at the ends, fast in the middle" },
      steps: [
        {
          title: "Why linear looks robotic",
          body: `<p>By default, values change at a constant speed between keyframes, then stop dead. Real objects speed up and slow down. Easing makes animation feel physical, which is the single biggest step from amateur to polished motion.</p>`,
        },
        {
          title: "Easy Ease",
          body: `<p>Select keyframes and press ${k("F9")} for <em>Easy Ease</em>: they turn into hourglass shapes and the motion starts and ends gently. Shift+F9 eases only the arriving side, Ctrl+Shift+F9 only the leaving side.</p>`,
        },
        {
          title: "The graph editor",
          body: `<p>Click the <em>Graph Editor</em> button above the layers. The speed graph shows how fast the value changes; drag the yellow handles to make a sharper ease, such as a quick start that glides to a stop. Steep curves feel snappy; long gentle ones feel calm.</p>`,
        },
        {
          title: "Overshoot",
          body: `<p>For a lively logo, overshoot: add a keyframe where Scale goes past the final value (110% at 0:02.15) before settling to 100% at 0:03. With easing on all three, the logo pops and settles like something with weight. Keep overshoots small and fast.</p>`,
        },
      ],
      quiz: [
        { q: "What does F9 do?", options: ["Renders", "Applies Easy Ease to selected keyframes", "Adds a keyframe", "Opens the graph editor"], answer: 1, explain: "Easy Ease smooths the start and end of motion." },
        { q: "What does an overshoot add?", options: ["A blur", "A brief pass beyond the final value before settling, giving a sense of weight", "A second layer", "Sound"], answer: 1, explain: "Overshoot and settle feels natural." },
      ],
      exercise: {
        title: "Ease and overshoot the logo",
        task: `<p>Add a 110% scale keyframe at about two-thirds of the logo's animation, ease every keyframe, and shape the speed graph so the logo arrives quickly and settles gently. Compare before and after.</p>`,
        files: ["storyboard.txt"],
        solution: [
          "On the logo, move to 0:02 + 15 frames (0:02.15); set Scale to 110%.",
          `Select all the logo's keyframes and press ${k("F9")}.`,
          "Open the Graph Editor, show the speed graph, and drag the handles of the first keyframe to make it leave faster.",
          `${k("Space")}: the logo pops past full size and settles. Undo the easing (Ctrl+Z) briefly to feel the difference, then redo.`,
        ],
      },
    },
    {
      id: "shapes-text",
      title: "Shape layers and animated text",
      summary: "Draw shape layers, animate a line drawing on with Trim Paths, add text, and animate it letter by letter with a text animator.",
      diagram: { type: "flow", nodes: ["Text layer", "Animate › Position", "Add Opacity", "Range Selector offset 0→100%"], highlight: 3, title: "A text animator reveals letters one by one" },
      steps: [
        {
          title: "Shape layers",
          body: `<p>With no layer selected, use the Rectangle or Ellipse tool (Q) or the Pen (G) to draw: a new shape layer appears. Its contents include a path, a stroke and a fill, all animatable. Hold Shift while drawing a line with the Pen to keep it straight.</p>`,
        },
        {
          title: "Trim Paths",
          body: `<p>Draw a horizontal line under the logo. In the shape layer's contents, choose <em>Add › Trim Paths</em>. Keyframe <em>End</em> from 0% at 0:02 to 100% at 0:04 and the line draws itself. Animate <em>Start</em> as well, slightly later, and the line travels instead.</p>`,
        },
        {
          title: "Text",
          body: `<p>Use the Type tool (Ctrl+T) and click to type “Harbor Coffee”. Set the font, size and color in the <em>Character</em> panel and align it with the <em>Align</em> panel. Text layers stay editable: the words can change after animating.</p>`,
        },
        {
          title: "Text animators",
          body: `<p>Open the text layer, select <em>Animate › Position</em> and set its Y to 20 (letters start 20 px lower). Select <em>Add › Property › Opacity</em> in the same animator and set 0%. Then keyframe the <em>Range Selector</em>'s <em>Offset</em> from 0% to 100% between 0:03 and 0:06: letters rise and fade in one after another.</p>`,
        },
      ],
      quiz: [
        { q: "What does keyframing Trim Paths' End from 0% to 100% do?", options: ["Deletes the path", "Draws the stroke on along its length", "Changes the color", "Scales the shape"], answer: 1, explain: "Trim Paths reveals part of a path." },
        { q: "In a text animator, what does animating the Range Selector's Offset do?", options: ["Changes the font", "Moves the range across the letters, applying the animator's values letter by letter", "Deletes letters", "Sets the text color"], answer: 1, explain: "The range sweeps through the text." },
      ],
      exercise: {
        title: "Line and type-on",
        task: `<p>Add a line under the logo that draws on from 0:02 to 0:04 with Trim Paths, then add “Harbor Coffee” and animate it letter by letter from 0:03 to 0:06 with a Position and Opacity text animator.</p>`,
        files: ["storyboard.txt"],
        solution: [
          "Deselect all, Pen tool (G), Shift+click two points under the logo; set the stroke to 6 px, white, and no fill.",
          "Contents › <em>Add › Trim Paths</em>; End: 0% at 0:02, 100% at 0:04; select both and press F9.",
          "Type tool: “Harbor Coffee”, centered below the line.",
          "Text › <em>Animate › Position</em>, Position 0, 20; <em>Add › Property › Opacity</em>, 0%.",
          "Range Selector › Offset: 0% at 0:03, 100% at 0:06. Preview with Space.",
        ],
      },
    },
    {
      id: "structure",
      title: "Parenting, precomps and mattes",
      summary: "Link layers so they move together, group animation into precomps, and reveal layers through masks and track mattes.",
      diagram: { type: "tree", root: "Null: Controller", items: [["Logo mark (parented)", 1, true], ["Line (parented)", 1], ["Harbor Coffee text (parented)", 1], ["Tagline (parented)", 1]], caption: "Animate the null and everything follows" },
      steps: [
        {
          title: "Parenting",
          body: `<p>Turn on the <em>Parent &amp; Link</em> column if it's hidden (right-click a column header). Drag a layer's pick whip (the spiral) onto another layer to parent it: the child now follows the parent's position, scale and rotation, while keeping its own animation.</p>`,
        },
        {
          title: "Nulls as controllers",
          body: `<p>Choose <em>Layer › New › Null Object</em>. A null is invisible but has transforms. Parent the logo, line and text to it; then one Scale or Opacity keyframe on the null affects all of them, which is perfect for the storyboard's final fade-out. (Opacity isn't inherited by children; use the null's Scale, or put the group in a precomp and fade that.)</p>`,
        },
        {
          title: "Precompose",
          body: `<p>Select layers and choose <em>Layer › Pre-compose</em>. They move into their own composition, which appears as one layer in the main comp. Precomps keep complex animation tidy and let you fade, time-shift or reuse a group as a single layer.</p>`,
        },
        {
          title: "Masks and track mattes",
          body: `<p>Draw a rectangle with a layer selected to create a mask that hides everything outside it; keyframe the mask path to wipe in. A track matte uses one layer's shape or brightness to reveal another: in the <em>Track Matte</em> column, pick the matte layer for the layer you want revealed.</p>`,
        },
      ],
      quiz: [
        { q: "Which property does a child layer not inherit from its parent?", options: ["Position", "Scale", "Rotation", "Opacity"], answer: 3, explain: "Opacity isn't passed down through parenting." },
        { q: "Why precompose a group of layers?", options: ["To render them separately", "To treat them as one layer for fading, timing and reuse", "To delete them", "To add music"], answer: 1, explain: "A precomp behaves like a single layer in the main comp." },
      ],
      exercise: {
        title: "Fade everything out together",
        task: `<p>Add the tagline from the storyboard (fading in from 0:06 to 0:08), then precompose the logo, line, title and tagline into “Logo group” and fade the precomp out between 0:09 and 0:10.</p>`,
        files: ["storyboard.txt"],
        solution: [
          "Type tool: “Small-batch coffee by the water”, smaller, below the title; T, Opacity 0% at 0:06 and 100% at 0:08.",
          "Select the logo, line, title and tagline layers; <em>Layer › Pre-compose</em>, name “Logo group”, <em>Move all attributes into the new composition</em>, <em>OK</em>.",
          "Select the Logo group layer, T: Opacity 100% at 0:09, 0% at 0:10; press F9.",
          "Preview: everything fades out together, while the background and music stay.",
        ],
      },
    },
    {
      id: "render",
      title: "Timing to music and rendering",
      summary: "Land key moments on the beat, add motion blur, and render a finished MP4 with the Render Queue or Media Encoder.",
      diagram: { type: "flow", nodes: ["Check timing on beats", "Motion blur on", "Add to Render Queue", "H.264 MP4"], highlight: 2, title: "From comp to video file" },
      steps: [
        {
          title: "Timing to the beat",
          body: `<p>At 120 BPM, beats fall every half second (every 15 frames at 30 fps). Add markers on strong beats: select the music layer and press the asterisk key on the number pad at each one while previewing. Nudge keyframes so the logo's settle and the title's start land on markers. Synchronized motion feels intentional.</p>`,
        },
        {
          title: "Motion blur",
          body: `<p>Fast motion looks choppy without blur. Turn on the <em>Motion Blur</em> switch for animated layers and enable the comp's master motion blur button at the top of the timeline. It increases render time, so turn it on near the end.</p>`,
        },
        {
          title: "Render an MP4",
          body: `<p>Choose <em>Composition › Add to Render Queue</em> (${k("Ctrl", "M")}). In the Render Queue, set <em>Output Module</em> to H.264 (the format behind most MP4 files; in recent versions it's an option directly in the Render Queue), choose a file name, and select <em>Render</em>. Alternatively, <em>Composition › Add to Adobe Media Encoder Queue</em> renders in the background with presets for every platform.</p>`,
        },
        {
          title: "Check and archive",
          body: `<p>Watch the rendered file in a normal video player, not just After Effects' preview. To archive or share the project, <em>File › Dependencies › Collect Files</em> copies the project and every file it uses into one folder.</p>`,
        },
      ],
      quiz: [
        { q: "At 120 BPM and 30 fps, how many frames apart are the beats?", options: ["30", "15", "60", "12"], answer: 1, explain: "Half a second at 30 fps is 15 frames." },
        { q: "What does Collect Files do?", options: ["Imports files", "Copies the project and all its files into one folder", "Renders the comp", "Deletes unused files"], answer: 1, explain: "It gathers everything needed to open the project elsewhere." },
      ],
      exercise: {
        title: "Render the sting",
        task: `<p>Mark the beats at 1, 2 and 3 seconds on the music layer, line up the logo's settle with the 3-second beat, turn on motion blur, and render a 1920 × 1080 H.264 MP4. Watch it in a video player.</p>`,
        files: ["music-loop.wav", "storyboard.txt"],
        solution: [
          "Select the music layer; at 0:01, 0:02 and 0:03 press the number pad * key (or <em>Layer › Markers › Add Marker</em>).",
          "Drag the logo's last scale keyframe exactly onto the 0:03 marker (hold Shift to snap).",
          "Enable Motion Blur on the logo, line and text layers, and the comp's master Motion Blur button.",
          `${k("Ctrl", "M")}; Output Module: H.264; Output To: logo-sting.mp4; <em>Render</em>.`,
          "Open logo-sting.mp4 in your video player: ten seconds, with the logo settling on the beat.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-lower-third",
      title: "Bonus project: a reusable lower third",
      summary: "Build an animated name-and-title lower third with Essential Graphics controls, so anyone can change the text without touching keyframes.",
      diagram: { type: "layers", items: ["Name text (editable)", "Title text (editable)", "Shape bar with Trim Paths", "Video below"], highlight: 0, caption: "A lower third sits in the bottom third of the frame" },
      steps: [
        {
          title: "Design and animate",
          body: `<p>In a new 1920 × 1080, 6-second comp, draw a bar with a shape layer in the lower third, animate it on with Trim Paths, and add name and title text that slide in with text animators. Animate out in the last second.</p>`,
        },
        {
          title: "Essential Graphics",
          body: `<p>Open <em>Window › Essential Graphics</em>, choose your comp as the master, and drag the text layers' <em>Source Text</em> properties and the bar's color into the panel. These become simple controls anyone can edit.</p>`,
        },
        {
          title: "Reuse",
          body: `<p>Drag the comp into another comp several times: in each instance, the Essential Graphics controls let you type a different name without opening the original. Export it as a Motion Graphics template (.mogrt) from the same panel for use in Premiere Pro.</p>`,
        },
      ],
      quiz: [
        { q: "What does adding Source Text to Essential Graphics allow?", options: ["Faster rendering", "Changing the text in each use without editing the original comp", "Animating text automatically", "Exporting fonts"], answer: 1, explain: "Controls are editable per instance." },
        { q: "What is a .mogrt file?", options: ["A video", "A Motion Graphics template for reuse, for example in Premiere Pro", "An audio file", "A project backup"], answer: 1, explain: "It packages a comp with its controls." },
      ],
      exercise: {
        title: "Build the lower third",
        task: `<p>Create the lower third with an animated bar, name and title, expose the two texts and the bar color in Essential Graphics, and use it twice in another comp with different names.</p>`,
        files: ["background.png"],
        solution: [
          "New comp “Lower third”, 1920 × 1080, 6 s; shape bar in the bottom third with Trim Paths End 0→100% over 0:00–0:01.",
          "Name and title text layers with Position and Opacity animators; reverse the animation in the last second.",
          "<em>Window › Essential Graphics</em>: Primary composition Lower third; drag both Source Text properties and the bar's Fill Color into the panel.",
          "In a new comp with background.png, drag Lower third in twice; in the Essential Properties of each, type different names.",
        ],
      },
    },
    quizbank: [
      { q: "Which key shows a layer's Position property?", options: ["O", "P", "S", "X"], answer: 1, explain: "P is Position." },
      { q: "Which property does T show?", options: ["Text", "Opacity", "Time", "Track matte"], answer: 1, explain: "T stands for transparency: Opacity." },
      { q: "How many frames are in 2 seconds at 30 fps?", options: ["30", "60", "120", "15"], answer: 1, explain: "30 × 2 = 60." },
      { q: "What does Easy Ease change?", options: ["Layer order", "The speed at which values change near keyframes", "Colors", "Resolution"], answer: 1, explain: "Easing slows motion near keyframes." },
      { q: "Which tool group draws shape layers?", options: ["Brush", "Rectangle/Ellipse (Q) and Pen (G)", "Clone", "Puppet"], answer: 1, explain: "Drawing with no layer selected creates a shape layer." },
      { q: "What does a null object do?", options: ["Renders as black", "Acts as an invisible controller that other layers can be parented to", "Deletes layers", "Holds audio"], answer: 1, explain: "Nulls are invisible transform controllers." },
      { q: "What's the quickest way to send a comp to render?", options: ["Ctrl+M (Add to Render Queue)", "Ctrl+R", "F12", "Ctrl+E"], answer: 0, explain: "Ctrl+M adds the comp to the Render Queue." },
      { q: "Why turn motion blur on near the end of a project?", options: ["It's only available at the end", "It increases render and preview times", "It changes colors", "It can't be undone"], answer: 1, explain: "Blur costs processing time." },
    ],
  },
  async makeFiles({ png, wav }) {
    const logo = png(1000, 1000, (x, y) => {
      const cupBody = x > 300 && x < 640 && y >= 398 && (y < 640 || Math.hypot((x - 470) / 170, (y - 640) / 80) < 1);
      const rim = y > 370 && y < 400 && x > 290 && x < 650;
      const handle = Math.abs(Math.hypot(x - 650, y - 520) - 75) < 18 && x > 640;
      const steam = (Math.abs(x - (420 + Math.sin(y / 30) * 18)) < 9 || Math.abs(x - (520 + Math.sin(y / 30 + 1) * 18)) < 9) && y > 200 && y < 340;
      if (cupBody || rim || handle) return [246, 241, 232, 255];
      if (steam) return [246, 241, 232, 200];
      return [0, 0, 0, 0];
    });
    const bg = png(1920, 1080, (x, y) => {
      const d = Math.hypot((x - 960) / 1100, (y - 540) / 700);
      return [20 + 30 * (1 - d), 80 + 40 * (1 - d), 110 + 40 * (1 - d)];
    });
    const rate = 44100, secs = 10, n = rate * secs;
    const Lc = new Float32Array(n), Rc = new Float32Array(n);
    const chords = [[220, 277.18, 329.63], [174.61, 220, 261.63], [196, 246.94, 293.66], [164.81, 207.65, 246.94]];
    for (let i = 0; i < n; i++) {
      const t = i / rate;
      const beat = t % 0.5;
      const bar = Math.floor(t / 2) % 4;
      const kick = beat < 0.12 ? Math.sin(2 * Math.PI * (55 + 90 * Math.exp(-beat * 40)) * beat) * Math.exp(-beat * 22) * 0.7 : 0;
      const pad = chords[bar].reduce((s, f) => s + Math.sin(2 * Math.PI * f * t), 0) * 0.06;
      const hat = (t + 0.25) % 0.5 < 0.03 ? (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.08 * Math.exp(-((t + 0.25) % 0.5) * 120) : 0;
      const fade = Math.min(1, t / 0.2, (secs - t) / 0.4);
      Lc[i] = (kick + pad + hat) * fade;
      Rc[i] = (kick + pad * 0.9 - hat) * fade;
    }
    return { "storyboard.txt": STORYBOARD, "logo-mark.png": logo, "background.png": bg, "music-loop.wav": wav(Lc, Rc, rate) };
  },
};
