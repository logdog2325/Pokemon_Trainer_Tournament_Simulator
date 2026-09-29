// Rotom Judge — export one self-contained source file per debate for NotebookLM. No AI involved.
//   node export-notebooklm.js            -> every finished matchup
//   node export-notebooklm.js Mewtwo     -> one matchup
// Writes out/notebooklm/rotom-judge-<species>.md. Each file carries its own context (format primer, glossary,
// both forms at a glance) so NotebookLM can explain it without guessing what "14/16" or "OHKO" means.
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "out");
const DIR = path.join(OUT, "notebooklm");
const HYPO = new Set(require("./hypothetical").flatMap(h => [h.name, h.baseSpecies].filter(Boolean)));
const HYPO_NOTE = {}; for (const h of require("./hypothetical")) HYPO_NOTE[h.baseSpecies || h.name] = h.debateNote;

function opinionOf(sp, v) {
  if (v && v.opinion) return v.opinion;
  const f = path.join(OUT, sp, "verdict.md");
  if (!fs.existsSync(f)) return "";
  const m = fs.readFileSync(f, "utf8").match(/^## (?:Ruling|Short ruling|The ruling|Judge's opinion|Opinion)[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m);
  return m ? m[1].trim().replace(/\n?-{3,}\s*$/, "").trim() : "";
}

// Pull each form's headline facts out of its fact sheet.
function atAGlance(sp, forms) {
  const f = path.join(__dirname, "factsheets", sp + ".md");
  if (!fs.existsSync(f)) return "";
  const md = fs.readFileSync(f, "utf8");
  const parts = md.split(/^## /m).slice(1);
  const STAT = { hp: "HP", atk: "Attack", def: "Defense", spa: "Sp. Atk", spd: "Sp. Def", spe: "Speed" };
  const list = s => (!s || s === "none") ? "none" : s;
  return parts.map((p, i) => {
    const head = p.split("\n")[0];                       // "Mega X — Psychic/Fighting, Steadfast, stone: Mewtwonite X"
    const hm = head.match(/^(.*?) — (.*?), (.*?), stone: (.*)$/) || [];
    const name = (forms[i] && forms[i].name) || hm[1];
    const grab = re => { const m = p.match(re); return m ? m[1].trim() : ""; };
    const base = grab(/^Base stats (.*)$/m).replace(/\b(hp|atk|def|spa|spd|spe) (\d+)/g, (_, k, v) => STAT[k] + " " + v)
      .replace(/ \/ /g, ", ").replace(/\s*\(BST (\d+)\)/, ". Total $1");
    const note = grab(/^\*\*[^*]+:\*\* (.*)$/m);
    const w = p.match(/^- 4x: (.*?) \| 2x: (.*)$/m) || [];
    const r = p.match(/^- 0\.5x: (.*?) \| 0\.25x: (.*?) \| immune: (.*)$/m) || [];
    const speed = grab(/^- Jolly\/Timid 32: (\d+)/m);
    const faster = grab(/^- Megas faster than its max \(\d+\): (.*)$/m).replace(/ \| ties: /, "; tied with ");
    const ko = [...p.matchAll(/### Offense — (Jolly|Timid)[^\n]*\n[\s\S]*?OHKOs \(14\+\/16 rolls\) with no item: \*\*(\d+) \/ (\d+)\*\*/g)]
      .map(m => m[2] + " of " + m[3] + " as a " + (m[1] === "Jolly" ? "physical" : "special") + " attacker");
    const dead = (grab(/OHKO'd by \*\*(\d+ \/ \d+)\*\*/) || "").replace(" / ", " of ");
    return [
      "### " + name + " (" + hm[2] + " type, ability " + hm[3] + ", holds " + hm[4] + ")",
      "- Base stats: " + base + ".",
      note ? "- " + hm[3] + ": " + note : "",
      "- Takes 4x damage from: " + list(w[1]) + ". Takes 2x from: " + list(w[2]) + ".",
      "- Resists (half damage): " + list(r[1]) + ". Quarter damage: " + list(r[2]) + ". Immune to: " + list(r[3]) + ".",
      "- Top Speed with full investment: " + speed + ". Megas faster than that: " + (faster || "none") + ".",
      "- One-hit knockouts against the 21 key threats, with no item: " + (ko.join("; ") || "n/a") + ".",
      "- Knocked out in one hit by " + dead.replace(" of ", " of the ") + " key threats when it has no bulk investment.",
    ].filter(Boolean).join("\n");
  }).join("\n\n");
}

const PRIMER = `## What this is
Rotom Judge is an experiment in settling a Pokémon argument with evidence. Some Pokémon have two competing
super-forms (two Mega Evolutions, or a Mega against a special battle form), and players argue about which is better. For
each one, two AI advocates each argued for one form. They were not allowed to rely on memory: every claim had to come from a damage calculator
built for Pokémon Champions, and they could run new calculations. Each advocate gave an opening argument, then read the
other side's opening and wrote a rebuttal. An impartial AI judge then recomputed the disputed numbers itself, scored
both sides, wrote its opinion and ruled on which Mega is better. Finally it built the strongest competitive team it
could around each form.

## The format
- **Pokémon Champions, Regulation M-C**: the official competitive (VGC) ruleset running September to December 2026.
- **Doubles**: two Pokémon on each side at once. Each player brings six Pokémon and picks four for each game. Level 50.
- **Mega Evolution**: a Pokémon holding its Mega Stone can transform once per battle into a stronger Mega form. Only one
  Pokémon per team can Mega Evolve per battle. **Z Megas** (Mega Absol Z, Mega Garchomp Z, Mega Lucario Z) are new
  alternate Mega forms added in Regulation M-C.
- **Stat points**: each Pokémon gets 66 points to spread across its six stats, at most 32 in any one stat.
- **Item Clause and Species Clause**: all six items on a team must be different, and so must all six species.

## How to read the numbers
- **Damage ranges** like "99.5-118%" are the percentage of the target's HP one attack removes. Pokémon damage has 16
  random rolls, so every attack has a lowest and highest outcome.
- **"(14/16)"** means 14 of the 16 possible rolls knock the target out. **"KO"** alone means all 16 do.
- **OHKO** means a one-hit knockout. **2HKO** means it takes two hits.
- **Spread moves** hit both opponents at once but deal 25% less damage in doubles.
- **STAB** (same-type attack bonus): a Pokémon's attacks of its own type do 1.5x damage.
- **Speed** decides who moves first. Moves with **priority** (Sucker Punch, Fake Out, First Impression) go first anyway.
- **Usage %** is how often a Pokémon appears on ranked teams (Pikalytics, Regulation M-C). The debates focus on the
  21 most important threats, led by Rillaboom (37%), Sneasler (34%), Incineroar (27%), Mega Salamence (23%) and
  Kingambit (22%).

## Terms that come up a lot
- **Intimidate**: an ability that lowers both opposing Pokémon's Attack by one stage when it enters. It weakens
  physical attackers only.
- **Psychic Terrain**: a field effect that boosts Psychic moves and blocks priority moves aimed at Pokémon that are on
  the ground. Flying types and Pokémon with Levitate are not on the ground, so they are not protected.
- **Tailwind / Trick Room**: speed control. Tailwind doubles your side's Speed; Trick Room makes slower Pokémon move first.
- **Helping Hand**: a support move that makes a partner's attack 50% stronger that turn.
- **Follow Me**: a support move that pulls opposing single-target attacks onto the user.
- **Sun, rain, sand, snow**: weather. Sun boosts Fire moves, rain boosts Water moves; some abilities only work in one weather.`;

function exportOne(sp) {
  const rf = path.join(OUT, sp, "result.json");
  if (!fs.existsSync(rf)) return null;
  const r = JSON.parse(fs.readFileSync(rf, "utf8"));
  const [A, B] = r.forms, v = r.verdict || {}, d = r.debate || {};
  const win = v.winner === A.label ? A.name : v.winner === B.label ? B.name : "neither (a tie)";
  const hypo = HYPO.has(sp);
  const sideName = s => /^A\b|form a/i.test(String(s)) ? A.name : /^B\b|form b/i.test(String(s)) ? B.name : s;
  const L = [];
  L.push("# Rotom Judge: " + A.name + " vs " + B.name);
  L.push("");
  if (hypo) L.push("> **Hypothetical debate.** " + (HYPO_NOTE[sp] || sp + " is not in Pokémon Champions yet.") + "\n");
  L.push("**The ruling:** Rotom Judge ruled that **" + win + "** is the better Mega. Final score: " + A.name + " " + v.score_a + ", " + B.name + " " + v.score_b + " (out of 100).");
  L.push("");
  L.push(PRIMER);
  L.push("");
  L.push("## The two Megas at a glance");
  L.push(atAGlance(sp, r.forms));
  L.push("");
  L.push("## Round 1: Opening arguments");
  L.push("### Opening argument for " + A.name + " (Advocate A)"); L.push(String(d.oa || "").trim()); L.push("");
  L.push("### Opening argument for " + B.name + " (Advocate B)"); L.push(String(d.ob || "").trim()); L.push("");
  L.push("## Round 2: Rebuttals");
  L.push("### " + A.name + "'s advocate responds"); L.push(String(d.ra || "").trim()); L.push("");
  L.push("### " + B.name + "'s advocate responds"); L.push(String(d.rb || "").trim()); L.push("");
  L.push("## The judge's opinion");
  L.push("Having heard both openings and both rebuttals, Rotom Judge wrote this opinion.");
  L.push("");
  L.push(opinionOf(sp, v));
  L.push("");
  L.push("### Conclusion");
  L.push("Rotom Judge rules that " + win + " is the better Mega (" + A.name + " " + v.score_a + ", " + B.name + " " + v.score_b + ").");
  L.push("");
  L.push(String(v.conclusion || v.summary || "").trim());
  L.push("");
  L.push("### How the score breaks down");
  L.push("Each side was scored out of 100: evidence 40 (minus 5 for each claim the judge found false), relevance to the real format 25, rebuttal 20, honesty 15.");
  L.push("- " + A.name + ": " + v.score_a + " (evidence, relevance, rebuttal, honesty: " + (v.rubric_a || "") + ")");
  L.push("- " + B.name + ": " + v.score_b + " (evidence, relevance, rebuttal, honesty: " + (v.rubric_b || "") + ")");
  L.push("");
  L.push("## The judge checks the numbers");
  L.push("The judge re-ran these claims through the damage calculator itself.");
  L.push("");
  for (const c of (v.checked_claims || []))
    L.push("- **" + (c.holds ? "Holds" : "Does not hold") + "** (" + sideName(c.side) + "): " + c.claim + ". The judge's result: " + c.recomputed + ".");
  L.push("");
  L.push("## The two teams");
  L.push("After ruling, the judge wrote a brief for each Mega from what the debate proved, and a team builder made the strongest team it could around each one. Both teams passed an automatic legality check (items exist, moves are learnable, stat points add up, no repeated items or species).");
  L.push("");
  (r.teams || []).forEach((t, i) => {
    const f = r.forms[i], br = i === 0 ? v.brief_a : v.brief_b;
    L.push("### The team built around " + f.name);
    if (!t) { L.push("This team build failed and has no result."); L.push(""); return; }
    L.push(String(t.headline || "").trim());
    L.push("");
    if (br) {
      L.push("**The judge's plan for it:** " + br.game_plan);
      L.push("");
      L.push("**What it leans into:**"); (br.lean_into || []).forEach(x => L.push("- " + x));
      L.push("");
      L.push("**What the rest of the team has to cover:**"); (br.must_cover || []).forEach(x => L.push("- " + x));
      L.push("");
    }
    L.push("**How to bring it:** " + String(t.default_four || "").trim());
    L.push("");
    L.push("**The six Pokémon** (Showdown format):");
    L.push("```");
    L.push(String(t.paste || "").trim());
    L.push("```");
    L.push("");
  });
  fs.mkdirSync(DIR, { recursive: true });
  const file = path.join(DIR, "rotom-judge-" + sp.toLowerCase() + ".md");
  fs.writeFileSync(file, L.join("\n") + "\n");
  return file;
}

const only = process.argv[2];
const list = only ? [only] : fs.readdirSync(OUT).filter(n => fs.existsSync(path.join(OUT, n, "result.json")));
for (const sp of list) {
  const f = exportOne(sp);
  console.log(f ? "wrote " + path.relative(process.cwd(), f) + " (" + Math.round(fs.statSync(f).size / 1024) + " KB, " + fs.readFileSync(f, "utf8").split(/\s+/).length + " words)" : "skipped " + sp + " (not finished)");
}
