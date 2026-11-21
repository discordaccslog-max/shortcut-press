# Shortcut Press: notes for Claude

Read README.md for structure and commands. State as of 2026-11-20:

- 33 products live at https://www.shortcutpress.online: the 7 original guides, the $149 Library (unlocks only those 7), and 25 standalone guides with 3–4 add-ons each ($1–5, a 4-bit mask in the license code).
- Deploy: `vercel deploy --prod --yes` (aliases www.shortcutpress.online); `git push` updates GitHub Pages. Run `npm test` (about 3 minutes) before deploying.
- Don't add the 25 new products to `fulfillment-kit/` unless the user asks.

## Open decisions (the user hasn't chosen yet)
- Rename the "Complete Software Skills Library", which no longer contains every guide.
- Whether the original 7 guides should get add-ons.
- Payment isn't wired. The provider must pass `?addons=` through to `/thank-you/<slug>/` along with the order ID.
- Menu paths for apps that couldn't be run locally need an expert spot check: Docker, GIMP, Krita, Canva, Godot, FreeCAD, After Effects, Audacity, LMMS, OBS, Power BI, PowerPoint.

## Habits
- Compute any number quoted in a guide by running the code. node:sqlite works for SQL. Python is installed; add pandas and sklearn with `pip install --target %TEMP%\sp-pylib pandas scikit-learn` and set `PYTHONPATH`.
- On Windows, write multi-line patches as script files or use the Edit tool. Inline `node -e` with backticks or `${}` breaks in the shell.
- In guide content, quiz options are inserted as HTML: escape literal tags as `&lt;…&gt;`. `tests/content.test.mjs` catches malformed markup.
