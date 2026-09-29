// Rotom Judge — render a workflow result into readable debate transcripts. No AI involved.
//   node render.js <results.json> [<results2.json> ...]
// Each results file is the workflow's return value: { done: [ {species, forms, verdict, teams, debate}, ... ] }.
// Writes out/<Species>/debate.md per matchup and out/README.md indexing every matchup rendered so far.
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "out");

const files = process.argv.slice(2);
if (!files.length) { console.error("usage: node render.js <results.json> [...]"); process.exit(1); }

const quote = t => String(t || "(no text returned)").trim();
// The judge's full opinion: the structured `opinion` field when the run has one, otherwise the
// "## Ruling" section the judge wrote into out/<Species>/verdict.md.
function judgeOpinion(r) {
  if (r.verdict && r.verdict.opinion) return r.verdict.opinion;
  const f = path.join(OUT, r.species, "verdict.md");
  if (!fs.existsSync(f)) return null;
  const md = fs.readFileSync(f, "utf8");
  const m = md.match(/^## (?:Ruling|Short ruling|The ruling|Judge's opinion|Opinion)[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m);
  return m ? m[1].trim().replace(/\n?-{3,}\s*$/, "").trim() : null;
}

function renderMatchup(r) {
  const [A, B] = r.forms, v = r.verdict || {}, d = r.debate || {};
  const [ta, tb] = r.teams || [];
  const win = v.winner === "tie" ? "Tie" : (v.winner === A.label ? A.name : v.winner === B.label ? B.name : v.winner);
  const L = [];
  L.push(`# Rotom Judge: ${A.name} vs ${B.name}`);
  L.push("");
  L.push(`> **Winner: ${win}** — ${A.name} **${v.score_a}** / ${B.name} **${v.score_b}** (out of 100)`);
  L.push("");
  L.push(quote(v.summary));
  L.push("");
  L.push("| | " + A.name + " | " + B.name + " |");
  L.push("|---|---|---|");
  L.push("| Total | " + v.score_a + " | " + v.score_b + " |");
  L.push("| Evidence / Relevance / Rebuttal / Honesty | " + (v.rubric_a || "") + " | " + (v.rubric_b || "") + " |");
  L.push("");
  L.push("Rubric: Evidence 40 (minus 5 per checked claim that fails), Relevance to the Reg M-C board 25, Rebuttal 20, Honesty 15.");
  L.push("");
  L.push("---");
  L.push("## Round 1 — Opening arguments");
  L.push(`### For ${A.name}`); L.push(quote(d.oa)); L.push("");
  L.push(`### For ${B.name}`); L.push(quote(d.ob)); L.push("");
  L.push("---");
  L.push("## Round 2 — Rebuttals");
  L.push(`### ${A.name} responds`); L.push(quote(d.ra)); L.push("");
  L.push(`### ${B.name} responds`); L.push(quote(d.rb)); L.push("");
  L.push("---");
  L.push("## ⚖️ The Judge's Opinion");
  L.push(`_Having heard both openings and both rebuttals, Rotom Judge rules on which Mega is better, and why._`);
  L.push("");
  L.push(quote(judgeOpinion(r) || v.summary));
  L.push("");
  L.push("---");
  L.push("## The judge checks the numbers");
  L.push("Every claim below was recomputed by the judge with the damage engine.");
  L.push("");
  L.push("| side | claim | holds? | judge's number |");
  L.push("|---|---|---|---|");
  for (const c of (v.checked_claims || []))
    L.push(`| ${c.side} | ${String(c.claim).replace(/\|/g, "/")} | ${c.holds ? "✅ yes" : "❌ no"} | ${String(c.recomputed).replace(/\|/g, "/")} |`);
  L.push("");
  L.push("---");
  L.push("## The teams");
  for (const [f, t, brief] of [[A, ta, v.brief_a], [B, tb, v.brief_b]]) {
    L.push(`### Built around ${f.name}`);
    if (brief) {
      L.push(`**Judge's brief.** ${quote(brief.game_plan)}`);
      L.push(`- Lean into: ${(brief.lean_into || []).join("; ")}`);
      L.push(`- Must cover: ${(brief.must_cover || []).join("; ")}`);
      L.push(`- Partner ideas: ${(brief.partner_ideas || []).join("; ")}`);
      L.push("");
    }
    if (!t) { L.push("_Team build failed — no result returned._"); L.push(""); continue; }
    L.push(`**${quote(t.headline)}**`);
    L.push("");
    L.push(`Default bring-4: ${quote(t.default_four)}`);
    L.push("");
    L.push(t.legal ? "Legality: ✅ passed `validate.js`" : "Legality: ❌ **did not pass `validate.js`** — do not use without fixing");
    L.push("");
    L.push("```");
    L.push(quote(t.paste));
    L.push("```");
    L.push(`Full notes (threat table, spread justifications, worst matchup): \`${path.basename(t.notes_path || (f.slug + "-notes.md"))}\``);
    L.push("");
  }
  return L.join("\n") + "\n";
}

const index = {};
const idxFile = path.join(OUT, "index.json");
if (fs.existsSync(idxFile)) Object.assign(index, JSON.parse(fs.readFileSync(idxFile, "utf8")));

for (const f of files) {
  const res = JSON.parse(fs.readFileSync(f, "utf8"));
  for (const r of (res.done || [])) {
    const dir = path.join(OUT, r.species);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "debate.md"), renderMatchup(r));
    fs.writeFileSync(path.join(dir, "result.json"), JSON.stringify(r, null, 2));
    const [A, B] = r.forms, v = r.verdict || {};
    index[r.species] = { a: A.name, b: B.name, winner: v.winner === A.label ? A.name : v.winner === B.label ? B.name : v.winner,
      score_a: v.score_a, score_b: v.score_b,
      legal: (r.teams || []).map((t, i) => (t && t.legal) ? r.forms[i].name : null).filter(Boolean) };
    console.log("rendered " + r.species + "/debate.md");
  }
  for (const s of (res.dropped || [])) console.log("NOT rendered (workflow dropped it): " + s);
}
fs.writeFileSync(idxFile, JSON.stringify(index, null, 2));

const R = ["# Rotom Judge — results", "",
  "Two advocates argue which Mega form is better in Reg M-C, a judge recomputes their numbers and scores them,",
  "then builds the strongest team around each form. Open each matchup's `debate.md` to read the full debate.", "",
  "| Species | Form A | Form B | Winner | Score | Teams validated |", "|---|---|---|---|---|---|"];
for (const [sp, x] of Object.entries(index).sort())
  R.push(`| [${sp}](${sp}/debate.md) | ${x.a} | ${x.b} | **${x.winner}** | ${x.score_a}–${x.score_b} | ${x.legal.length}/2 |`);
fs.writeFileSync(path.join(OUT, "README.md"), R.join("\n") + "\n");
console.log("wrote out/README.md (" + Object.keys(index).length + " matchups)");
