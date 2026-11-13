import { k } from "./_helpers.mjs";

export default {
  id: "davinci-resolve-editing",
  slug: "davinci-resolve-video-editing",
  title: "Video Editing in DaVinci Resolve",
  software: "DaVinci Resolve",
  apps: ["Resolve"],
  intro:
    "Edit a video from raw clips to a finished file in DaVinci Resolve: importing and organizing footage, cutting on the timeline, transitions, titles, basic color correction, audio cleanup, and exporting. Everything in this guide works in the free version of DaVinci Resolve.",
  platformNote: "Shortcuts are shown for Windows and Linux. On a Mac, use Cmd in place of Ctrl and Option in place of Alt.",
  files: [
    { name: "clip-01-orbits.mp4", title: "Clip 1: orbits", desc: "Circles orbiting a center point, with a soft synthesized tone." },
    { name: "clip-02-waves.mp4", title: "Clip 2: waves", desc: "Horizontal waves scrolling across the frame, with a rising tone." },
    { name: "clip-03-grid.mp4", title: "Clip 3: grid", desc: "A grid of squares lighting up in sequence, with short pulses." },
    { name: "clip-04-warm-dark.mp4", title: "Clip 4: warm and dark", desc: "An underexposed shot with a warm color cast, for the color correction lesson." },
    { name: "music-bed.wav", title: "Music bed", desc: "A gentle synthesized chord loop to place under the clips." },
    { name: "tone-with-hum.wav", title: "Tone with hum and hiss", desc: "A steady tone with low hum and background hiss, for the audio cleanup lesson." },
  ],
  shortcuts: [
    { keys: "Space", action: "Play or stop", app: "Resolve" },
    { keys: "J", action: "Play backwards (press again to go faster)", app: "Resolve" },
    { keys: "K", action: "Stop", app: "Resolve" },
    { keys: "L", action: "Play forwards (press again to go faster)", app: "Resolve" },
    { keys: "I", action: "Mark an In point", app: "Resolve" },
    { keys: "O", action: "Mark an Out point", app: "Resolve" },
    { keys: "A", action: "Selection mode", app: "Resolve" },
    { keys: "T", action: "Trim edit mode", app: "Resolve" },
    { keys: "B", action: "Blade edit mode", app: "Resolve" },
    { keys: "F9", action: "Insert the source clip at the playhead", app: "Resolve" },
    { keys: "F10", action: "Overwrite the timeline with the source clip", app: "Resolve" },
    { keys: "ArrowUp", action: "Jump to the previous edit point", app: "Resolve" },
    { keys: "ArrowDown", action: "Jump to the next edit point", app: "Resolve" },
    { keys: "ArrowLeft", action: "Step back one frame", app: "Resolve" },
    { keys: "ArrowRight", action: "Step forward one frame", app: "Resolve" },
    { keys: "Ctrl+I", action: "Import media", app: "Resolve" },
    { keys: "Alt+S", action: "Add a serial node (Color page)", app: "Resolve" },
    { keys: "Ctrl+Z", action: "Undo", app: "Resolve" },
    { keys: "Ctrl+S", action: "Save the project", app: "Resolve" },
    { keys: "F12", action: "Place the source clip on top", app: "Resolve", practice: false, note: "Your browser may reserve this key for developer tools." },
    { keys: "Ctrl+N", action: "New timeline", app: "Resolve", practice: false, note: "Your browser uses this shortcut to open a new window." },
    { keys: "Ctrl+T", action: "Add the default transition", app: "Resolve", practice: false, note: "Your browser uses this shortcut to open a new tab." },
  ],
  lessons: [
    {
      id: "importing-organizing",
      title: "Importing and organizing footage",
      summary: "Set up a project, bring in clips, sort them into bins, and find the shot you need quickly.",
      diagram: { type: "flow", title: "From files to an organized project", nodes: ["New project", "Set frame rate", "Import clips", "Sort into bins", "Save the project"], highlight: 2 },
      steps: [
        {
          title: "Create a project",
          body: `<p>When DaVinci Resolve starts, the <strong>Project Manager</strong> opens. Select <strong>New Project</strong>, give it a name and select <strong>Create</strong>. Resolve keeps projects in its own project library rather than as single files you save to a folder. To move a project to another computer, use <strong>File &gt; Export Project</strong>.</p>`,
        },
        {
          title: "Check the frame rate first",
          body: `<p>Open <strong>File &gt; Project Settings</strong> and look at <strong>Master Settings</strong>: <em>Timeline resolution</em> and <em>Timeline frame rate</em>. Set the frame rate before you add clips to a timeline, because it can't be changed afterwards. If you skip this, Resolve asks whether to change the project frame rate to match the first clip you add to a timeline; choosing <em>Change</em> is usually right.</p>`,
        },
        {
          title: "Import clips",
          body: `<p>The bottom of the window has buttons for each page: Media, Cut, Edit, Fusion, Color, Fairlight and Deliver. On the <strong>Media</strong> page, browse to your files in the <em>Media Storage</em> panel and drag them into the <em>Media Pool</em> below. From any page, <strong>File &gt; Import &gt; Media</strong> (${k("Ctrl", "I")}) does the same, and you can also drag files straight from your file browser into the Media Pool.</p>`,
        },
        {
          title: "Organize with bins",
          body: `<p>Bins are folders inside the Media Pool. Right-click an empty part of the Media Pool and choose <strong>New Bin</strong>, name it (for example Footage, Music, Titles), and drag clips into it. Switch between thumbnail and list views at the top of the Media Pool; list view shows duration and frame rate. Double-click a clip to load it into the source viewer.</p>`,
        },
        {
          title: "Save often",
          body: `<p>Press ${k("Ctrl", "S")} (<strong>File &gt; Save Project</strong>). Resolve can also save automatically: in <strong>DaVinci Resolve &gt; Preferences &gt; User &gt; Project Save and Load</strong>, turn on <em>Live save</em>.</p>`,
        },
      ],
      quiz: [
        { q: "When should you set the timeline frame rate?", options: ["After editing", "Before adding clips to a timeline", "During export", "It can be changed at any time"], answer: 1, explain: "The timeline frame rate locks once clips are added to a timeline." },
        { q: "How do you move a Resolve project to another computer?", options: ["Copy the .mp4 files", "File > Export Project", "Save it to the desktop with Ctrl+S", "Use the Deliver page"], answer: 1, explain: "Projects live in Resolve's library, so export one to get a file you can move." },
      ],
      exercise: {
        title: "Set up the practice project",
        task: `<p>Create a project called "Practice edit", import all six practice files, and sort them into two bins: Footage (the four clips) and Audio (the two WAV files).</p>`,
        files: ["clip-01-orbits.mp4", "clip-02-waves.mp4", "clip-03-grid.mp4", "clip-04-warm-dark.mp4", "music-bed.wav", "tone-with-hum.wav"],
        solution: [
          "Project Manager &gt; New Project &gt; “Practice edit” &gt; Create.",
          "File &gt; Project Settings &gt; Master Settings: the practice clips are 1280 × 720 at 30 frames per second, so set Timeline resolution 1280 × 720 HD and Timeline frame rate 30, then Save.",
          `On the Media page (or with ${k("Ctrl", "I")}), import the six files into the Media Pool.`,
          "Right-click the Media Pool &gt; New Bin twice; name them Footage and Audio, and drag the files in. Save with Ctrl+S.",
        ],
      },
    },
    {
      id: "cutting-timeline",
      title: "Cutting on the timeline",
      summary: "Mark in and out points, place clips, trim, ripple delete, and work with more than one track.",
      diagram: { type: "timeline", variant: "cut", title: "In and out points, clips on tracks, and the playhead" },
      steps: [
        {
          title: "Make a timeline",
          body: `<p>Go to the <strong>Edit</strong> page. Choose <strong>File &gt; New Timeline</strong>, name it, and select <strong>Create</strong>. The timeline has video tracks (V1, V2…) above audio tracks (A1, A2…); upper video tracks appear on top of lower ones.</p>`,
        },
        {
          title: "Choose the part of a clip you want",
          body: `<p>Double-click a clip in the Media Pool to open it in the source viewer (left). Play it with ${k("Space")}, or shuttle with ${k("J")} (back), ${k("K")} (stop) and ${k("L")} (forward); press J or L twice to go faster. Press ${k("I")} where the part you want starts and ${k("O")} where it ends.</p>`,
        },
        {
          title: "Put it on the timeline",
          body: `<p>Drag from the source viewer onto the timeline, or drag it onto the timeline viewer (right) to see the edit options. With the timeline playhead in place, ${k("F9")} inserts the clip there, pushing later clips along, and ${k("F10")} overwrites whatever is there.</p>`,
        },
        {
          title: "Edit modes: select, trim and blade",
          body: `<ul><li>${k("A")} <strong>Selection mode</strong>: click to select clips, drag to move them, drag a clip's edge to shorten or lengthen it.</li>
<li>${k("T")} <strong>Trim edit mode</strong>: dragging an edge ripples, moving later clips so no gap appears.</li>
<li>${k("B")} <strong>Blade edit mode</strong>: click a clip to cut it in two at that point. Press A afterwards to return to selection.</li></ul>
<p>${k("ArrowUp")} and ${k("ArrowDown")} jump the playhead between edit points; ${k("ArrowLeft")} and ${k("ArrowRight")} step one frame.</p>`,
        },
        {
          title: "Remove clips without leaving gaps",
          body: `<p>Select a clip and choose <strong>Edit &gt; Ripple Delete</strong> to remove it and close the gap, or <strong>Edit &gt; Delete Selected</strong> to remove it and leave the gap. Both are also on the clip's right-click menu. To shorten without leaving gaps, use Trim edit mode.</p>`,
        },
      ],
      quiz: [
        { q: "Which keys mark the start and end of the part of a clip you want?", options: ["S and E", "I and O", "J and L", "A and B"], answer: 1, explain: "I marks the In point and O marks the Out point." },
        { q: "Which key switches to Blade edit mode?", options: ["B", "C", "X", "R"], answer: 0, explain: "B is Blade edit mode; click a clip to cut it." },
        { q: "What does Edit > Ripple Delete do?", options: ["Removes the clip and leaves a gap", "Removes the clip and closes the gap", "Mutes the clip", "Cuts the clip in two"], answer: 1, explain: "Ripple operations move later clips so no gap remains." },
      ],
      exercise: {
        title: "A first rough cut",
        task: `<p>Build a timeline about 15 seconds long from the first three practice clips: about 5 seconds of each, in order, with no gaps. Then cut clip 2 in half with the blade and ripple delete the second half.</p>`,
        files: ["clip-01-orbits.mp4", "clip-02-waves.mp4", "clip-03-grid.mp4"],
        solution: [
          "Edit page &gt; File &gt; New Timeline &gt; Create.",
          `For each clip: double-click it, press ${k("I")} near the start and ${k("O")} about 5 seconds later, then press ${k("F9")} (or drag it into the timeline). The playhead moves to the end of each new clip, so the next one follows.`,
          `Press ${k("B")}, click the middle of clip 2 on the timeline, then press ${k("A")}.`,
          "Select the second half of clip 2, then Edit &gt; Ripple Delete. Clip 3 moves left and the timeline is about 12.5 seconds long.",
        ],
      },
    },
    {
      id: "transitions",
      title: "Transitions",
      summary: "Add, adjust and remove transitions, and when a straight cut works better.",
      diagram: { type: "timeline", variant: "transition", title: "A dissolve across an edit point needs handles" },
      steps: [
        {
          title: "Add a transition",
          body: `<p>Open the <strong>Effects</strong> panel at the top left of the Edit page. Under <strong>Toolbox &gt; Video Transitions</strong>, find <strong>Cross Dissolve</strong> (in the Dissolve group) and drag it onto the edit point between two clips.</p>`,
        },
        {
          title: "Handles: why a transition might be shorter than you asked",
          body: `<p>A dissolve overlaps the end of one clip with the start of the next, so both clips need unused frames beyond the edit point, called <em>handles</em>. If a clip was used right to its last frame, Resolve can only make a shorter transition, or none. Trim a little off the ends to create handles.</p>`,
        },
        {
          title: "Adjust or remove it",
          body: `<p>Drag either edge of the transition to change its length, or select it and set <em>Duration</em> in the <strong>Inspector</strong> (top right). To remove it, select it and press ${k("Delete")} or ${k("Backspace")}. For audio, <strong>Toolbox &gt; Audio Transitions</strong> has cross fades.</p>`,
        },
        {
          title: "When to use one",
          body: `<p>Most edits are straight cuts. Use a dissolve to show time passing or to soften a change of scene, and keep it short (half a second to a second). If every edit has a transition, none of them stand out.</p>`,
        },
      ],
      quiz: [
        { q: "Why might Resolve refuse to add a full-length dissolve?", options: ["The timeline has too many tracks", "The clips have no handles (unused frames past the edit)", "The project isn't saved", "Transitions only work on audio"], answer: 1, explain: "A dissolve needs extra frames from both clips to overlap." },
        { q: "Where are the video transitions?", options: ["Media page", "Effects > Toolbox > Video Transitions", "Deliver page", "File > Import"], answer: 1, explain: "Transitions are in the Effects panel's Toolbox." },
      ],
      exercise: {
        title: "Dissolve between two clips",
        task: `<p>In your rough cut, add a one-second Cross Dissolve between clip 1 and clip 2, and a cross fade on their audio.</p>`,
        files: ["clip-01-orbits.mp4", "clip-02-waves.mp4"],
        solution: [
          "Effects &gt; Toolbox &gt; Video Transitions &gt; Cross Dissolve, dragged onto the edit between clips 1 and 2.",
          "Select it and set Duration to 1 second in the Inspector. If it won't grow, trim a few frames off the end of clip 1 and the start of clip 2 to make handles.",
          "Effects &gt; Toolbox &gt; Audio Transitions &gt; a cross fade, dragged onto the same edit on the audio track.",
          "Play across the edit to check it.",
        ],
      },
    },
    {
      id: "titles",
      title: "Titles",
      summary: "Add text titles and lower thirds, set their timing, and keep them readable.",
      diagram: { type: "timeline", variant: "titles", title: "A title on the track above the footage" },
      steps: [
        {
          title: "Add a title",
          body: `<p>In the <strong>Effects</strong> panel, open <strong>Toolbox &gt; Titles</strong> and drag <strong>Text</strong> onto the track above your footage (V2). It appears over the shot for as long as the title clip lasts. <strong>Text+</strong> offers more control, and the Fusion Titles group has ready-made animated designs.</p>`,
        },
        {
          title: "Edit the text",
          body: `<p>Select the title clip and open the <strong>Inspector</strong>. Type in the text box, then set the font, size, color, tracking and alignment. <em>Position</em> moves it; the Drop Shadow and Background options help it stand out against busy footage.</p>`,
        },
        {
          title: "Lower thirds and safe areas",
          body: `<p>A lower third is a name or caption in the lower part of the frame. Keep text inside the safe area so it isn't cropped on some screens: choose <strong>View &gt; Safe Area</strong> to show the guides.</p>`,
        },
        {
          title: "Timing",
          body: `<p>Trim the title clip's edges like any other clip. Leave it on screen long enough to read twice. Dissolves from the Video Transitions group work on titles too, for a soft fade in and out.</p>`,
        },
      ],
      quiz: [
        { q: "Where does a title go so it appears over the footage?", options: ["On an audio track", "On a video track above the footage", "On the same track before the clip", "In the Media Pool only"], answer: 1, explain: "Higher video tracks are drawn on top of lower ones." },
        { q: "Which panel changes a title's font and size?", options: ["Inspector", "Media Pool", "Project Manager", "Render Queue"], answer: 0, explain: "Select the title clip and use the Inspector." },
      ],
      exercise: {
        title: "Add an opening title",
        task: `<p>Put a title reading “Practice edit” over the first three seconds of clip 1, with a fade in and out, positioned in the lower third of the frame.</p>`,
        files: ["clip-01-orbits.mp4"],
        solution: [
          "Effects &gt; Toolbox &gt; Titles &gt; Text, dragged onto V2 at the start of the timeline.",
          "Trim it to 3 seconds. In the Inspector, type “Practice edit”, pick a clear font and set Size so it's easy to read.",
          "Move it down with Position until it sits in the lower third, inside the safe area.",
          "Add short Cross Dissolves to the start and end of the title clip.",
        ],
      },
    },
    {
      id: "color-correction",
      title: "Basic color correction",
      summary: "Adjust exposure and white balance, and make shots from the same scene look like they belong together.",
      diagram: { type: "color", variant: "balance", title: "Neutralizing a warm color cast" },
      steps: [
        {
          title: "Open the Color page and the scopes",
          body: `<p>Select a clip on the timeline and go to the <strong>Color</strong> page. Turn on the scopes (<strong>Workspace &gt; Video Scopes</strong>, or the Scopes button) and choose the <em>Waveform</em>. It shows brightness from bottom (black) to top (white) across the frame. It's more reliable than your eyes, which adapt to whatever is on screen.</p>`,
        },
        {
          title: "Set exposure with Lift, Gamma and Gain",
          body: `<p>In <strong>Primaries</strong>, the color wheels each have a master control beneath them:</p>
<ul><li><strong>Lift</strong> moves the shadows.</li>
<li><strong>Gamma</strong> moves the midtones.</li>
<li><strong>Gain</strong> moves the highlights.</li></ul>
<p>Raise Gain until the brightest parts sit just below the top of the waveform, lower Lift until the darkest parts just touch the bottom, then use Gamma for overall brightness.</p>`,
        },
        {
          title: "Correct the white balance",
          body: `<p>If whites look yellow or blue, adjust <em>Temp</em> and <em>Tint</em> in Primaries, or use the white balance picker there and click something that should be neutral gray or white. In the waveform's RGB view, a neutral area shows red, green and blue at the same height.</p>`,
        },
        {
          title: "Work in nodes and match shots",
          body: `<p>Corrections live in nodes. Press ${k("Alt", "S")} to add a new serial node so each fix (exposure, then balance) stays separate and can be switched off to compare. To make one shot match another, select the shot you want to fix in the clips strip, then right-click the shot to match and choose <strong>Shot Match to This Clip</strong>. Fine-tune the result by eye and with the scopes.</p>`,
        },
      ],
      quiz: [
        { q: "Which control moves mainly the highlights?", options: ["Lift", "Gamma", "Gain", "Offset"], answer: 2, explain: "Gain affects the brightest parts of the image most." },
        { q: "Why use the waveform scope instead of judging by eye?", options: ["It's prettier", "Your eyes adapt to the screen, while the scope measures brightness consistently", "It's required for export", "It adds contrast"], answer: 1, explain: "Scopes give an objective reading of levels and color balance." },
      ],
      exercise: {
        title: "Fix the warm, dark clip",
        task: `<p>Add <strong>clip-04-warm-dark.mp4</strong> to the timeline. It's underexposed with a warm cast. Correct its exposure and white balance so the gray background reads as neutral and the brightest parts sit near the top of the waveform.</p>`,
        files: ["clip-04-warm-dark.mp4"],
        solution: [
          "Add the clip to the timeline, select it, and open the Color page with the waveform showing.",
          "Node 1 (exposure): raise Gain until the brightest shapes approach the top of the waveform; lower Lift so the darkest parts touch the bottom; adjust Gamma for overall brightness.",
          `Press ${k("Alt", "S")} for node 2 (balance): lower Temp (cooler) until the gray background shows red, green and blue at the same height in the RGB waveform, or click the background with the white balance picker.`,
          "Switch each node off and on to compare before and after.",
        ],
      },
    },
    {
      id: "audio-cleanup",
      title: "Audio cleanup",
      summary: "Set levels, reduce background noise, add fades, and keep the main sound clear under music.",
      diagram: { type: "levels", variant: "audio", title: "Peaks below the target, with a steady noise floor" },
      steps: [
        {
          title: "Set levels",
          body: `<p>Watch the audio meters while playing. Speech or the main sound usually sits with peaks around −12 to −6 dBFS, and nothing should reach 0. Change a clip's level by dragging the thin volume line on the audio clip up or down, or select the clip and set <em>Volume</em> in the <strong>Inspector &gt; Audio</strong> tab.</p>`,
        },
        {
          title: "Normalize",
          body: `<p>To bring several clips to a consistent level, select them, right-click and choose <strong>Normalize Audio Levels</strong>. Choose <em>Sample Peak Program</em> with a target such as −6 dBFS, and set them independently or relative to each other.</p>`,
        },
        {
          title: "Fades and lowering music under speech",
          body: `<p>Drag the small handles at the top corners of an audio clip inwards for a fade in or out. To lower music under speech, add volume keyframes on the music clip: ${k("Alt")} + click the volume line to add points, then drag the section between them down.</p>`,
        },
        {
          title: "Reduce noise",
          body: `<p>In the <strong>Effects</strong> panel, look under <strong>Audio FX &gt; Fairlight FX</strong> for <strong>Noise Reduction</strong> and drag it onto the clip. Open its controls and raise the reduction gradually while listening; too much makes the sound hollow or watery. Hum at a fixed low pitch responds well to a high-pass filter, available in the Inspector's equalizer for the clip. Some audio tools, such as Voice Isolation, are only in the paid DaVinci Resolve Studio.</p>`,
        },
      ],
      quiz: [
        { q: "Where should the peaks of the main sound usually sit?", options: ["At 0 dBFS", "Around −12 to −6 dBFS", "Below −40 dBFS", "Above 0 dBFS"], answer: 1, explain: "That range leaves headroom and avoids clipping at 0." },
        { q: "How do you add a volume keyframe on an audio clip?", options: ["Double-click the clip", "Alt + click the volume line", "Press K", "Right-click > Normalize"], answer: 1, explain: "Alt (Option on a Mac) + clicking the volume line adds a keyframe you can drag." },
      ],
      exercise: {
        title: "Clean the noisy tone and duck the music",
        task: `<p>Place <strong>tone-with-hum.wav</strong> on A1 under your clips and <strong>music-bed.wav</strong> on A2. Reduce the hum and hiss on the tone, bring its peaks to about −6 dBFS, and lower the music by about 10 dB while the tone plays.</p>`,
        files: ["tone-with-hum.wav", "music-bed.wav"],
        solution: [
          "Drag the two WAV files onto A1 and A2.",
          "Effects &gt; Audio FX &gt; Fairlight FX &gt; Noise Reduction onto the tone clip; raise the reduction until the hiss drops without the tone sounding watery. In the Inspector's equalizer, turn on a high-pass filter around 100 Hz to cut the low hum.",
          "Right-click the tone clip &gt; Normalize Audio Levels &gt; Sample Peak Program, target −6 dBFS.",
          "On the music clip, Alt + click the volume line just before and just after the tone, plus two points inside, and drag the middle section down by about 10 dB. Add fades at the start and end of both clips.",
        ],
      },
    },
    {
      id: "exporting",
      title: "Exporting",
      summary: "Choose export settings for common uses and render the finished video.",
      diagram: { type: "export", title: "Choosing an export format", source: "Timeline", formats: [["MP4 · H.264", "Plays almost everywhere"], ["MP4 · H.265", "Smaller files, newer devices"], ["QuickTime master", "High quality for archiving"]] },
      steps: [
        {
          title: "Quick Export",
          body: `<p>For a fast, standard file, choose <strong>File &gt; Quick Export</strong>, pick a preset such as H.264, choose where to save, and select <strong>Export</strong>.</p>`,
        },
        {
          title: "The Deliver page",
          body: `<p>For full control, open the <strong>Deliver</strong> page. In <strong>Render Settings</strong>, choose a preset (for example <em>H.264 Master</em> or a web preset) or set it yourself:</p>
<ul><li><strong>File name</strong> and <strong>Location</strong> (Browse).</li>
<li><strong>Format:</strong> MP4 or QuickTime. <strong>Codec:</strong> H.264 for compatibility, H.265 for smaller files.</li>
<li><strong>Resolution</strong> and <strong>Frame rate</strong>: match the timeline.</li>
<li><strong>Audio:</strong> AAC is standard for MP4.</li></ul>`,
        },
        {
          title: "Render the whole timeline or a range",
          body: `<p>Above the timeline on the Deliver page, choose <em>Entire Timeline</em> or <em>In/Out Range</em> (mark the range with ${k("I")} and ${k("O")}). Select <strong>Add to Render Queue</strong>, then <strong>Render All</strong> in the Render Queue panel. Play the finished file in a media player to check it.</p>`,
        },
      ],
      quiz: [
        { q: "Which codec gives the widest compatibility for sharing?", options: ["H.264", "Uncompressed", "ProRes 4444", "DNxHR"], answer: 0, explain: "H.264 in an MP4 container plays on almost every device and website." },
        { q: "What do you select after Add to Render Queue?", options: ["Save Project", "Render All", "Quick Export", "Import"], answer: 1, explain: "Render All processes every job in the queue." },
      ],
      exercise: {
        title: "Export the finished edit",
        task: `<p>Export your edit as an MP4 at the timeline's resolution and frame rate, named practice-edit.mp4.</p>`,
        files: ["clip-01-orbits.mp4"],
        solution: [
          "Open the Deliver page.",
          "Choose the H.264 Master preset (or set Format MP4, Codec H.264). Set the file name to practice-edit and pick a Location.",
          "Check Resolution 1280 × 720 and Frame rate 30, matching the timeline, and Audio codec AAC.",
          "Entire Timeline &gt; Add to Render Queue &gt; Render All. Open the file to check it.",
        ],
      },
    },
  ],
};
