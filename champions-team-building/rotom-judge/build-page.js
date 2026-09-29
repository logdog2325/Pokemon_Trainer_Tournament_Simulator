// Rotom Judge — build the phone page (read + listen) from every rendered matchup. No AI involved.
//   node build-page.js [out.html]
// Reads out/<Species>/result.json (written by render.js) and the judge's opinion from out/<Species>/verdict.md,
// embeds them as JSON into page-template.html, and writes the page (default: out/rotom-judge.html).
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "out");
const ORDER = ["Charizard", "Mewtwo", "Raichu", "Garchomp", "Absol", "Lucario"];
const HYPO = new Set(require("./hypothetical").map(h => h.name));

function opinionOf(sp, v) {
  if (v && v.opinion) return v.opinion;
  const f = path.join(OUT, sp, "verdict.md");
  if (!fs.existsSync(f)) return "";
  const m = fs.readFileSync(f, "utf8").match(/^## (?:Ruling|Short ruling|The ruling|Judge's opinion|Opinion)[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m);
  return m ? m[1].trim().replace(/\n?-{3,}\s*$/, "").trim() : "";
}

const cases = [], pending = [];
for (const sp of ORDER) {
  const f = path.join(OUT, sp, "result.json");
  if (!fs.existsSync(f)) { pending.push(sp); continue; }
  const r = JSON.parse(fs.readFileSync(f, "utf8"));
  const [A, B] = r.forms, v = r.verdict || {};
  const winnerName = v.winner === A.label ? A.name : v.winner === B.label ? B.name : "Neither (tie)";
  const sideName = s => /^A\b|form a/i.test(s) ? A.name : /^B\b|form b/i.test(s) ? B.name : s;
  cases.push({
    species: sp, slug: sp.toLowerCase(), hypothetical: HYPO.has(sp),
    short: A.label.replace("Mega", "").trim() + " vs " + B.label.replace("Mega", "").trim() || "Mega vs Z",
    forms: r.forms, winnerName, score_a: v.score_a, score_b: v.score_b, rubric_a: v.rubric_a, rubric_b: v.rubric_b,
    ruleLine: winnerName.startsWith("Neither") ? "Rotom Judge rules that neither form is clearly better."
      : "Rotom Judge rules that " + winnerName + " is the better Mega (" + A.name + " " + v.score_a + ", " + B.name + " " + v.score_b + ").",
    opinion: opinionOf(sp, v), conclusion: v.conclusion || v.summary || "",
    debate: r.debate || {}, checks: (v.checked_claims || []).map(c => Object.assign({ sideName: sideName(String(c.side)) }, c)),
    teams: r.teams || [], brief_a: v.brief_a, brief_b: v.brief_b,
  });
}
for (const c of cases) if (!c.short.replace(/vs/, "").trim()) c.short = "Mega vs Mega Z";

const tpl = fs.readFileSync(path.join(__dirname, "page-template.html"), "utf8");
const json = JSON.stringify({ cases, pending }).replace(/</g, "\\u003c");
const html = tpl.replace("/*__DATA__*/", json);
const file = process.argv[2] || path.join(OUT, "rotom-judge.html");
fs.writeFileSync(file, html);
console.log("wrote " + path.relative(process.cwd(), file) + " — " + cases.length + " debates, pending: " + (pending.join(", ") || "none") + ", " + Math.round(html.length / 1024) + " KB");
