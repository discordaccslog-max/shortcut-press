import { k } from "./_helpers.mjs";

const PLAN = `Garden Hour podcast, episode 1: practice plan

interview-raw.wav (about 24 seconds, synthesized voice-like test signal, no real speech)
  0.0 - 1.5 s   room noise only (use this for the noise profile)
  1.5 - 9 s     first answer
  9 - 12 s      long pause to tighten
  12 - 22 s     second answer, with two loud clicks to repair
  22 - 24 s     room noise
  Problems to fix: a low hum, steady hiss, two clicks, a quiet overall level.

music-bed.wav (20 seconds, 100 BPM)
  Intro under the first answer, ducked automatically while the voice plays.

Chapters (labels): Intro at 0 s, Answer 1, Answer 2.
Export: MP3, about -16 LUFS integrated loudness, with title and artist metadata.
`;

function lcg(seed) {
  let s = seed >>> 0;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

export default {
  id: "audacity-audio",
  slug: "audacity-audio",
  title: "Audio Editing & Podcasts in Audacity",
  software: "Audacity",
  apps: ["Audacity"],
  intro:
    "Edit and clean up spoken audio in Audacity, the free audio editor, and put together a short podcast: navigate and edit recordings, remove noise, hum and clicks, even out levels with compression and loudness normalization, mix in music that ducks under the voice, and export a finished MP3 with chapters and metadata.",
  platformNote: "Shortcuts are shown for Audacity 3 on Windows and Linux. On a Mac, use Cmd in place of Ctrl.",
  store: {
    category: "media",
    level: "Beginner",
    software: "Audacity 3 (free and open source, for Windows, Mac and Linux)",
    softwareShort: "Audacity",
    softwareHtml: `<p>This guide is written for <strong>Audacity 3</strong> (3.4 or later), the free and open-source audio editor for Windows, Mac and Linux, obtained separately from audacityteam.org; it is not included with the guide. A microphone is useful for recording your own voice but isn't needed: the practice files cover every exercise.</p>`,
    forWho: [
      "You record a podcast, voice-overs, interviews or lectures and want them to sound clean.",
      "You've opened Audacity and weren't sure which effects to use or in what order.",
      "You want a simple, repeatable routine from raw recording to finished file.",
    ],
    notFor: [
      "You want music production. See Beat Making in LMMS.",
      "You need professional mastering or broadcast compliance in depth.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "interview-raw.wav", title: "Raw interview", desc: "A 24-second synthesized voice-like recording (no real speech) with hum, hiss, a long pause and two clicks to fix." },
    { name: "music-bed.wav", title: "Music bed", desc: "A 20-second, 100 BPM music loop to mix under the voice." },
    { name: "episode-plan.txt", title: "Episode plan", desc: "Timings of every section and problem in the raw interview, and the export targets." },
  ],
  shortcuts: [
    { keys: "Space", action: "Play or stop", app: "Audacity" },
    { keys: "R", action: "Record", app: "Audacity" },
    { keys: "P", action: "Pause", app: "Audacity" },
    { keys: "Ctrl+I", action: "Split the clip at the cursor or selection", app: "Audacity" },
    { keys: "Ctrl+K", action: "Delete the selected audio", app: "Audacity" },
    { keys: "Ctrl+D", action: "Duplicate the selection to a new track", app: "Audacity" },
    { keys: "Ctrl+B", action: "Add a label at the selection", app: "Audacity" },
    { keys: "Ctrl+A", action: "Select all", app: "Audacity" },
    { keys: "Ctrl+E", action: "Zoom to the selection", app: "Audacity" },
    { keys: "Ctrl+F", action: "Zoom to fit the whole project", app: "Audacity" },
    { keys: "Home", action: "Jump to the start", app: "Audacity" },
    { keys: "End", action: "Jump to the end", app: "Audacity" },
    { keys: "F2", action: "Envelope tool", app: "Audacity" },
    { keys: "Ctrl+Shift+E", action: "Export audio", app: "Audacity" },
    { keys: "Ctrl+1", action: "Zoom in", app: "Audacity", practice: false, note: "Your browser uses this shortcut to switch tabs." },
    { keys: "Ctrl+3", action: "Zoom out", app: "Audacity", practice: false, note: "Your browser uses this shortcut to switch tabs." },
    { keys: "Ctrl+L", action: "Silence the selection", app: "Audacity", practice: false, note: "Your browser uses this shortcut for the address bar." },
  ],
  lessons: [
    {
      id: "basics",
      title: "Projects, waveforms and navigation",
      summary: "Import audio, read the waveform, play and zoom, and save a project you can come back to.",
      diagram: { type: "levels", variant: "audio", title: "A waveform: louder sounds are taller" },
      steps: [
        {
          title: "Import",
          body: `<p>Open Audacity and choose <em>File › Import › Audio</em>, or drag <strong>interview-raw.wav</strong> into the window. It appears as a track. The waveform's height shows loudness: tall shapes are speech, flat stretches are silence or room noise.</p>`,
        },
        {
          title: "Play and move",
          body: `<p>Press ${k("Space")} to play from the cursor and again to stop. Click in the waveform to place the cursor; ${k("Home")} and ${k("End")} jump to the start and end. Click in the timeline above the track to start playback from that point.</p>`,
        },
        {
          title: "Zoom",
          body: `<p>Drag across part of the waveform to select it, then press ${k("Ctrl", "E")} to zoom to the selection. ${k("Ctrl", "F")} fits the whole project back in the window. Ctrl+scroll zooms in and out around the mouse.</p>`,
        },
        {
          title: "Save a project",
          body: `<p><em>File › Save Project</em> writes a single <code>.aup3</code> file containing the audio and every edit, so you can continue later. It's a working file: share audio by exporting (Lesson 6), not by sending the project. Audacity never changes the original WAV you imported.</p>`,
        },
      ],
      quiz: [
        { q: "What does a tall part of the waveform mean?", options: ["Higher pitch", "Louder sound", "A later time", "Stereo"], answer: 1, explain: "Waveform height is amplitude: loudness." },
        { q: "What does the .aup3 project file contain?", options: ["Only edit instructions", "The audio and every edit in one file", "An MP3", "Just the original WAV"], answer: 1, explain: "Audacity 3 projects are single files with everything inside." },
      ],
      exercise: {
        title: "Find the problems",
        task: `<p>Import <strong>interview-raw.wav</strong>, zoom into the first 1.5 seconds and the pause around 9 to 12 seconds, and find the two clicks in the second answer using <strong>episode-plan.txt</strong>. Save the project as garden-hour.aup3.</p>`,
        files: ["interview-raw.wav", "episode-plan.txt"],
        solution: [
          "<em>File › Import › Audio</em>, choose the file.",
          `Select 0–1.5 s and press ${k("Ctrl", "E")}: a low, steady fuzz is the room noise (hum and hiss).`,
          `${k("Ctrl", "F")}, then select 9–12 s and zoom: only room noise, a pause to shorten.`,
          "In 12–22 s, look for two thin, very tall spikes: those are the clicks.",
          "<em>File › Save Project › Save Project As</em>, garden-hour.aup3.",
        ],
      },
    },
    {
      id: "editing",
      title: "Cutting and arranging",
      summary: "Select precisely, delete and split, move clips, tighten long pauses, and undo freely.",
      diagram: { type: "timeline", variant: "trim", title: "Delete a pause and the audio after it closes the gap" },
      steps: [
        {
          title: "Select and delete",
          body: `<p>Drag to select a stretch of audio and press ${k("Delete")} or ${k("Ctrl", "K")} to remove it; everything after it moves left to close the gap. Listen across every cut: a cut in the middle of a breath or word sounds unnatural, so cut in silences.</p>`,
        },
        {
          title: "Zero crossings",
          body: `<p>Cuts in the middle of a wave can click. After selecting, press <code>Z</code> to snap the selection edges to nearby zero crossings, where the waveform crosses the center line. It makes cuts silent.</p>`,
        },
        {
          title: "Split and move clips",
          body: `<p>Place the cursor and press ${k("Ctrl", "I")} to split the track into separate clips. Drag a clip by its top bar to move it in time or to another track. Clips can be renamed by double-clicking the bar, which helps in longer projects.</p>`,
        },
        {
          title: "Tighten pauses",
          body: `<p>For a single long gap, select most of it (leave about half a second) and delete it. For many, <em>Effect › Special › Truncate Silence</em> shortens every silence longer than a threshold you set, such as anything over 0.8 seconds down to 0.5 seconds. Use it gently; natural pauses help listeners.</p>`,
        },
      ],
      quiz: [
        { q: "Why snap cuts to zero crossings?", options: ["To save space", "Cutting mid-wave can make an audible click", "It's required for export", "To change pitch"], answer: 1, explain: "Zero crossings are where the signal is at rest." },
        { q: "What does Ctrl+I do in Audacity?", options: ["Imports audio", "Splits the clip at the cursor or selection", "Inverts the audio", "Opens info"], answer: 1, explain: "Split creates separate clips you can move." },
      ],
      exercise: {
        title: "Tighten the pause",
        task: `<p>Shorten the pause between the two answers (around 9 to 12 seconds) to about half a second, snapping the cut to zero crossings, and check the join sounds natural. How long is the recording now?</p>`,
        files: ["interview-raw.wav", "episode-plan.txt"],
        solution: [
          "Select from about 9.25 s to 11.75 s (leaving a quarter second of pause on each side).",
          "Press Z to snap to zero crossings, then Ctrl+K.",
          "Play across the join from about 8 s: the second answer now follows after a short, natural pause.",
          "The recording is about <strong>21.5 seconds</strong> long (24 − 2.5).",
        ],
      },
    },
    {
      id: "cleanup",
      title: "Removing noise, hum and clicks",
      summary: "Remove steady hiss with Noise Reduction, cut low hum with a high-pass filter, and repair clicks, in an order that avoids artifacts.",
      diagram: { type: "flow", nodes: ["High-pass 80 Hz (hum)", "Noise profile", "Noise Reduction", "Repair clicks"], highlight: 2, title: "A clean-up order that works" },
      steps: [
        {
          title: "Cut the hum first",
          body: `<p>Mains hum is a low tone (50 or 60 Hz) that voices barely use. Select the whole track (${k("Ctrl", "A")}) and choose <em>Effect › EQ and Filters › High-Pass Filter</em> with a frequency of 80 Hz and a rolloff of 12 dB per octave. Most of the hum disappears and the voice is unchanged.</p>`,
        },
        {
          title: "Take a noise profile",
          body: `<p>Select the first 1.5 seconds, which contain only room noise. Choose <em>Effect › Noise Removal and Repair › Noise Reduction</em> and select <em>Get Noise Profile</em>. Audacity remembers what the background sounds like.</p>`,
        },
        {
          title: "Reduce the noise",
          body: `<p>Select the whole track, open Noise Reduction again and apply it with moderate settings: Noise reduction about 12 dB, Sensitivity 6, Frequency smoothing 3. Preview first. Too much makes voices sound watery or robotic; a little background is better than artifacts.</p>`,
        },
        {
          title: "Repair clicks",
          body: `<p>Zoom right into a click so the selection is tiny (well under a tenth of a second), and choose <em>Effect › Noise Removal and Repair › Repair</em>. It rebuilds the selected samples from the surrounding audio. For many small clicks, <em>Click Removal</em> on the whole track is quicker.</p>`,
        },
      ],
      quiz: [
        { q: "Where should you take the noise profile from?", options: ["The loudest speech", "A stretch with only background noise", "The end of the music", "Anywhere"], answer: 1, explain: "The profile must contain only the noise you want removed." },
        { q: "Why use a high-pass filter at about 80 Hz for hum?", options: ["Voices need low frequencies", "Hum sits below the main range of speech, so cutting it barely affects the voice", "It makes the voice louder", "It removes clicks"], answer: 1, explain: "Speech energy is mostly well above 80 Hz." },
      ],
      exercise: {
        title: "Clean the interview",
        task: `<p>Apply a high-pass filter at 80 Hz, take a noise profile from the opening room noise and reduce the noise across the track, then repair both clicks. Compare the start before and after with undo and redo.</p>`,
        files: ["interview-raw.wav", "episode-plan.txt"],
        solution: [
          "Ctrl+A, <em>Effect › EQ and Filters › High-Pass Filter</em>, 80 Hz, 12 dB, <em>Apply</em>.",
          "Select 0–1.5 s, <em>Effect › Noise Removal and Repair › Noise Reduction › Get Noise Profile</em>.",
          "Ctrl+A, Noise Reduction again: 12 dB, sensitivity 6, smoothing 3, <em>Preview</em>, then <em>Apply</em>.",
          "Zoom into each click (in the second answer), select just the spike, <em>Effect › Noise Removal and Repair › Repair</em>.",
          "Ctrl+Z and Ctrl+Y on the steps to hear the difference: the hiss and hum drop away.",
        ],
      },
    },
    {
      id: "levels",
      title: "Levels, compression and loudness",
      summary: "Avoid clipping, even out loud and quiet parts with compression, and set the overall loudness podcasts expect.",
      diagram: { type: "compare", left: { title: "Before", items: ["Quiet overall", "Peaks and dips vary a lot", "Listeners turn it up and down"] }, right: { title: "After", items: ["Compressed: steadier level", "Loudness about −16 LUFS", "Peaks below −1 dB"] }, accentRight: true, title: "Even and loud enough" },
      steps: [
        {
          title: "Clipping",
          body: `<p>Audio louder than the maximum is clipped: flattened, harsh and unfixable. Turn on <em>View › Show Clipping</em> to mark clipped spots in red. Record with peaks well below the top, and leave headroom when you edit.</p>`,
        },
        {
          title: "Compression",
          body: `<p>A compressor turns loud moments down so the level is steadier. Choose <em>Effect › Volume and Compression › Compressor</em>; for speech, try a threshold around −18 dB and a ratio of 3:1. Gentle settings sound natural; heavy compression sounds squashed and brings up background noise.</p>`,
        },
        {
          title: "Normalize versus loudness",
          body: `<p><em>Normalize</em> raises audio until its highest peak reaches a target, such as −1 dB; one loud click would limit the whole file. <em>Loudness Normalization</em> sets the average perceived loudness instead. Podcasts commonly aim for about −16 LUFS for stereo (−19 for mono).</p>`,
        },
        {
          title: "A safety limiter",
          body: `<p>After loudness normalization, peaks may rise too high. <em>Effect › Volume and Compression › Limiter</em> with a limit of −1 dB catches them. Check the result for red clipping marks and listen on headphones and a phone speaker.</p>`,
        },
      ],
      quiz: [
        { q: "Why is clipping a problem?", options: ["It makes files bigger", "The tops of the waveform are flattened, which sounds harsh and can't be undone after export", "It changes the speed", "It removes noise"], answer: 1, explain: "Clipped detail is lost." },
        { q: "What's a common loudness target for stereo podcasts?", options: ["0 LUFS", "About −16 LUFS", "−40 LUFS", "−1 LUFS"], answer: 1, explain: "Around −16 LUFS integrated for stereo." },
      ],
      exercise: {
        title: "Even out and set loudness",
        task: `<p>On the cleaned interview, apply gentle compression, then loudness normalization to −16 LUFS, then a −1 dB limiter. Turn on Show Clipping and check nothing is red.</p>`,
        files: ["interview-raw.wav"],
        solution: [
          "Ctrl+A, <em>Effect › Volume and Compression › Compressor</em>: threshold −18 dB, ratio 3:1, <em>Apply</em>.",
          "<em>Effect › Volume and Compression › Loudness Normalization</em>: perceived loudness, −16 LUFS, <em>Apply</em>. The waveform grows noticeably taller.",
          "<em>Effect › Volume and Compression › Limiter</em>: limit to −1 dB, <em>Apply</em>.",
          "<em>View › Show Clipping</em>: no red marks.",
        ],
      },
    },
    {
      id: "mixing",
      title: "Music, ducking and fades",
      summary: "Add a music track, fade it in and out, lower it automatically under the voice with Auto Duck, and adjust volume by hand with the envelope tool.",
      diagram: { type: "timeline", variant: "titles", title: "Voice on one track, music on another, ducked under speech" },
      steps: [
        {
          title: "A second track",
          body: `<p>Import <strong>music-bed.wav</strong>: it lands on a new track below the voice. Drag its clip so the music starts at 0 and the voice starts about two seconds later; drag the voice clip right by its top bar to make room for the intro.</p>`,
        },
        {
          title: "Fades",
          body: `<p>Select the first two seconds of the music and choose <em>Effect › Fading › Fade In</em>; select the last two seconds and use <em>Fade Out</em>. Fades stop the music starting or stopping abruptly.</p>`,
        },
        {
          title: "Auto Duck",
          body: `<p>Auto Duck lowers one track whenever another has sound. The voice track must be directly <em>below</em> the music, so move it there with the track's menu (<em>Move Track Down</em>). Select the music track and choose <em>Effect › Volume and Compression › Auto Duck</em>; a duck amount of −12 dB keeps the music present but out of the way.</p>`,
        },
        {
          title: "Fine control with the envelope tool",
          body: `<p>Press ${k("F2")} for the envelope tool: click on a track to add points and drag them to shape its volume over time. Use it to bring the music back up after the last words, or to nudge a quiet phrase. ${k("F1")} returns to the selection tool.</p>`,
        },
      ],
      quiz: [
        { q: "For Auto Duck, where must the voice track be?", options: ["Above the music", "Directly below the music track", "In a separate project", "Anywhere"], answer: 1, explain: "Auto Duck uses the track below the selected one as the control track." },
        { q: "What does the envelope tool control?", options: ["Pitch", "Volume over time", "Speed", "Panning only"], answer: 1, explain: "Envelope points shape a track's loudness." },
      ],
      exercise: {
        title: "Mix the intro",
        task: `<p>Add the music bed starting at 0 with the voice starting at 2 seconds, fade the music in over 2 seconds and out over its last 2 seconds, and duck it 12 dB under the voice. Listen to the whole mix.</p>`,
        files: ["music-bed.wav", "interview-raw.wav"],
        solution: [
          "<em>File › Import › Audio</em> › music-bed.wav; drag the voice clip to start at 2.0 s.",
          "Music: select 0–2 s › <em>Effect › Fading › Fade In</em>; select 18–20 s › <em>Fade Out</em>.",
          "Make sure the voice track is directly below the music (track menu › <em>Move Track Down</em> or <em>Up</em>).",
          "Select the music track › <em>Effect › Volume and Compression › Auto Duck</em>, duck amount −12 dB, <em>Apply</em>.",
          "Play from the start: the music dips whenever the voice plays and swells in the gaps.",
        ],
      },
    },
    {
      id: "export",
      title: "Labels, metadata and export",
      summary: "Mark chapters with labels, export a finished MP3 with metadata, and export sections as separate files.",
      diagram: { type: "table", head: ["Format", "Use", "Typical setting"], rows: [["MP3", "podcasts, sharing", "128–192 kbps"], ["WAV", "archive, further editing", "16-bit, 44.1 kHz"], ["FLAC", "lossless, smaller than WAV", "level 5"]], highlight: { rows: [0] }, caption: "File › Export Audio" },
      steps: [
        {
          title: "Labels",
          body: `<p>Place the cursor and press ${k("Ctrl", "B")} to add a label; type its name (Intro, Answer 1, Answer 2) and press Enter. Labels sit on their own track and mark chapters, edits to revisit, or sections to export separately.</p>`,
        },
        {
          title: "Export",
          body: `<p>Choose <em>File › Export Audio</em> (${k("Ctrl", "Shift", "E")}). Pick MP3, a bitrate around 128 to 192 kbps for speech with music, and a file name. Audacity mixes every track down into the file; check that muted tracks are muted on purpose.</p>`,
        },
        {
          title: "Metadata",
          body: `<p>When exporting MP3, Audacity offers the <em>Edit Metadata Tags</em> dialog: fill in Title, Artist, Album (your show's name) and Year. Podcast apps and music players display these tags.</p>`,
        },
        {
          title: "Export sections",
          body: `<p>To save each labeled section as its own file, choose <em>File › Export Audio</em> and select <em>Multiple files</em>, split by labels (in older versions, <em>File › Export › Export Multiple</em>). Each file is named after its label.</p>`,
        },
      ],
      quiz: [
        { q: "Which shortcut adds a label?", options: ["Ctrl+L", "Ctrl+B", "Ctrl+M", "L"], answer: 1, explain: "Ctrl+B adds a label at the cursor or selection." },
        { q: "Why fill in metadata when exporting an MP3?", options: ["It makes the file smaller", "Players and podcast apps show the title, artist and show name", "It's required to play the file", "It improves quality"], answer: 1, explain: "Tags identify the file in apps." },
      ],
      exercise: {
        title: "Export the episode",
        task: `<p>Add labels for Intro (at 0), Answer 1 and Answer 2, export the mix as garden-hour-ep1.mp3 at 160 kbps with title and show name, then export the sections as separate files using the labels.</p>`,
        files: ["episode-plan.txt"],
        solution: [
          "Place the cursor at 0, Ctrl+B, type Intro, Enter; repeat at the start of each answer.",
          "Ctrl+Shift+E: MP3, constant 160 kbps (or a preset), name garden-hour-ep1.mp3, <em>Export</em>.",
          "In the metadata dialog: Title “Episode 1”, Artist your name, Album “Garden Hour”, <em>OK</em>.",
          "Export again choosing <em>Multiple files</em> split by labels: three files named Intro, Answer 1 and Answer 2.",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-macro",
      title: "Bonus project: a one-click clean-up macro",
      summary: "Record your clean-up chain as a macro and run it on any new recording, so every episode gets the same treatment in seconds.",
      diagram: { type: "flow", nodes: ["High-pass 80 Hz", "Compressor 3:1", "Loudness −16 LUFS", "Limiter −1 dB", "Export MP3"], highlight: 2, title: "A saved chain of effects" },
      steps: [
        {
          title: "Macros",
          body: `<p>Choose <em>Tools › Macro Manager</em> and select <em>New</em>; name it “Podcast voice”. A macro is a list of commands with their settings, run in order.</p>`,
        },
        {
          title: "Add the steps",
          body: `<p>Use <em>Insert</em> to add High-Pass Filter, Compressor, Loudness Normalization and Limiter, setting each one's parameters with <em>Edit</em>. Noise Reduction needs a fresh profile from each recording, so do that step by hand before running the macro.</p>`,
        },
        {
          title: "Run it",
          body: `<p>Open a new recording, take a noise profile and apply Noise Reduction, then choose <em>Tools › Apply Macro › Podcast voice</em>. To process a whole folder of files, use <em>Files…</em> in the Macro Manager.</p>`,
        },
      ],
      quiz: [
        { q: "Why isn't Noise Reduction part of the macro?", options: ["Macros can't include effects", "It needs a noise profile taken from each new recording", "It's too slow", "It must run last"], answer: 1, explain: "The profile depends on each recording's background noise." },
        { q: "What does Tools › Apply Macro do?", options: ["Records a macro", "Runs a saved list of commands on the current project", "Deletes a macro", "Exports settings"], answer: 1, explain: "It applies every step in order." },
      ],
      exercise: {
        title: "Build and use the macro",
        task: `<p>Create the Podcast voice macro with the four effects from Lessons 3 and 4, re-import the raw interview, apply noise reduction by hand, run the macro, and compare the result with your manual version.</p>`,
        files: ["interview-raw.wav"],
        solution: [
          "<em>Tools › Macro Manager › New</em>, name Podcast voice.",
          "<em>Insert</em> High-Pass Filter (80 Hz), Compressor (−18 dB, 3:1), Loudness Normalization (−16 LUFS), Limiter (−1 dB); set each with <em>Edit</em>.",
          "Import interview-raw.wav into a new project; noise profile from 0–1.5 s; Noise Reduction on all.",
          "<em>Tools › Apply Macro › Podcast voice</em>.",
          "Its waveform and sound match your manual version from Lessons 3 and 4.",
        ],
      },
    },
    quizbank: [
      { q: "Which key starts and stops playback?", options: ["P", "Space", "Enter", "S"], answer: 1, explain: "Space plays and stops; P pauses." },
      { q: "What does pressing Z after selecting do?", options: ["Zooms in", "Snaps the selection to zero crossings", "Deletes", "Undoes"], answer: 1, explain: "Snapping to zero crossings avoids clicks at cuts." },
      { q: "Which effect category holds Noise Reduction in Audacity 3?", options: ["Special", "Noise Removal and Repair", "Distortion", "Fading"], answer: 1, explain: "Effect › Noise Removal and Repair › Noise Reduction." },
      { q: "What does a compressor do?", options: ["Makes files smaller", "Reduces the volume of loud parts so the level is steadier", "Removes noise", "Changes pitch"], answer: 1, explain: "Audio compression is about dynamics, not file size." },
      { q: "What's the difference between Normalize and Loudness Normalization?", options: ["None", "Normalize targets the highest peak; Loudness Normalization targets perceived average loudness", "Loudness Normalization targets peaks", "Normalize only works on music"], answer: 1, explain: "Peak versus perceived loudness." },
      { q: "Which tool shapes volume over time?", options: ["Selection tool", "Envelope tool (F2)", "Time shift", "Zoom"], answer: 1, explain: "Envelope points control a track's level." },
      { q: "What file does File › Save Project create?", options: ["An MP3", "An .aup3 project", "A WAV", "A ZIP"], answer: 1, explain: "Projects are .aup3 files; exports are audio files." },
      { q: "Why leave some background noise rather than removing it all?", options: ["It's required", "Aggressive noise reduction causes watery, robotic artifacts", "It's louder", "It improves compression"], answer: 1, explain: "Moderate settings sound more natural." },
    ],
  },
  async makeFiles({ wav }) {
    const rate = 22050;
    // Voice-like test signal: harmonic "syllables" with pitch movement, plus hum, hiss and clicks.
    const secs = 24, n = rate * secs;
    const L = new Float32Array(n), R = new Float32Array(n);
    const rnd = lcg(5);
    const syllables = [];
    const addSpeech = (start, end) => {
      let t = start;
      while (t < end) {
        const len = 0.14 + rnd() * 0.26;
        syllables.push([t, Math.min(end, t + len), 110 + rnd() * 70, rnd() < 0.5 ? 1 : -1]);
        t += len + (rnd() < 0.25 ? 0.18 + rnd() * 0.2 : 0.03);
      }
    };
    addSpeech(1.5, 9);
    addSpeech(12, 22);
    let phase = 0;
    for (let i = 0; i < n; i++) {
      const t = i / rate;
      let v = 0;
      for (const [a, b, f0, dir] of syllables) {
        if (t >= a && t < b) {
          const p = (t - a) / (b - a);
          const env = Math.sin(Math.PI * p) ** 0.6;
          const f = f0 * (1 + 0.12 * dir * p);
          phase += (2 * Math.PI * f) / rate;
          for (let h = 1; h <= 8; h++) v += (Math.sin(phase * h) / h) * (h === 3 || h === 5 ? 1.6 : 1);
          v *= env * 0.09;
          break;
        }
      }
      const hum = Math.sin(2 * Math.PI * 60 * t) * 0.02 + Math.sin(2 * Math.PI * 180 * t) * 0.006;
      const hiss = (rnd() - 0.5) * 0.018;
      let click = 0;
      for (const c of [14.3, 18.75]) if (t >= c && t < c + 0.0025) click = 0.9 * (1 - (t - c) / 0.0025) * (i % 2 ? 1 : -1);
      L[i] = R[i] = v + hum + hiss + click;
    }
    // Music bed: 100 BPM, 20 s.
    const ms = 20, mn = rate * ms;
    const ML = new Float32Array(mn), MR = new Float32Array(mn);
    const beat = 60 / 100;
    const prog = [[196, 246.94, 293.66], [164.81, 196, 246.94], [130.81, 164.81, 196], [146.83, 185, 220]];
    for (let i = 0; i < mn; i++) {
      const t = i / rate;
      const bt = t % beat;
      const chord = prog[Math.floor(t / (beat * 4)) % 4];
      const pad = chord.reduce((s, f) => s + Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(4 * Math.PI * f * t), 0) * 0.05;
      const kick = bt < 0.15 ? Math.sin(2 * Math.PI * (50 + 70 * Math.exp(-bt * 35)) * bt) * Math.exp(-bt * 18) * 0.5 : 0;
      const pluck = Math.sin(2 * Math.PI * chord[(Math.floor(t / (beat / 2)) % 3)] * 2 * t) * Math.exp(-(t % (beat / 2)) * 9) * 0.08;
      ML[i] = pad + kick + pluck;
      MR[i] = pad * 0.95 + kick + pluck * 0.8;
    }
    return { "interview-raw.wav": wav(L, R, rate), "music-bed.wav": wav(ML, MR, rate), "episode-plan.txt": PLAN };
  },
};
