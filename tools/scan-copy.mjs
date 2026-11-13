// Scans visitor-facing text (pages, guide content, scripts) for wording that shouldn't be on the site.
import fs from "node:fs";
import path from "node:path";
const files = [];
const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!["node_modules", ".git", "fulfillment-kit", "vendor", "tests", ".vercel", "files"].includes(e.name)) walk(p); } else if (/\.(html|js|mjs|webmanifest|txt|xml)$/.test(e.name) && !p.includes(path.join("tools", "scan-copy"))) files.push(p); } };
walk(".");
const rules = [
  ["old delivery method", /\b(PDF guide|\.zip|zip file|zip download|download link)\b/i],
  ["not open/finished", /coming soon|launching soon|not accepting|isn'?t connected|not connected|in development|not yet (available|live|open)|under construction|beta\b/i],
  ["placeholder", /\bTODO\b|\bFIXME\b|lorem|ipsum|\bTBD\b|example\.com|placeholder text|\[(insert|your|name|date)\b/i],
  ["career/outcome claim", /\b(get hired|hired|career|promotion|earn more|salary|income|freelanc|land a job|job[- ]ready)\b/i],
  ["mastery/timeline", /\bmaster(y|ing)?\b|\bexpert\b|pro in|in (\d+|a few|just) (days|hours|weeks)/i],
  ["social proof/urgency", /testimonial|\breviews?\b|\brating|\bstars?\b|students|customers love|limited[- ]time|hurry|only \d+ left|countdown|act now|best[- ]?seller/i],
  ["endorsement", /\bofficial\b|\bcertified\b|\bcertificate|\bapproved by|\baccredited/i],
];
const allow = [/not official materials of any software maker/, /don'?t come with certificates/, /isn'?t a Shortcut Press backup/, /Not included/, /no feedback on your work/, /star(s)? and polygons|Star and Polygon|Star\/Polygon|stars or regular polygons|Draw stars|stars, and/i, /reviewed?/i];
let hits = 0;
for (const f of files) {
  const raw = fs.readFileSync(f, "utf8");
  const text = /\.html$/.test(f) ? raw.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ") : raw;
  for (const [name, re] of rules) {
    const g = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
    for (const m of text.matchAll(g)) {
      const ctx = text.slice(Math.max(0, m.index - 70), m.index + 70).replace(/\s+/g, " ");
      if (allow.some((a) => a.test(ctx))) continue;
      hits++;
      console.log(`${name.padEnd(22)} ${f}: …${ctx}…`);
    }
  }
}
console.log(hits ? `\n${hits} matches to review` : "\nNo matches.");
