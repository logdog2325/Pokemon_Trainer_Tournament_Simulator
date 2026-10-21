// Rotom Judge — team legality validator. No AI involved.
//   node validate.js <paste.txt> [--require "Absol:Mega Z"]
// Checks a Showdown-format paste against the Champions rules this repo has confirmed:
//   - every species is in the Champions dex, no duplicate species (Species Clause)
//   - every item exists in Champions (ITEMS or the species' own Mega Stone), all six distinct (Item Clause)
//   - stat points: each <= 32, total <= 66 (warns if under 66 = wasted points)
//   - ability is one of the species' base abilities; nature is real
//   - four distinct moves, each in the species' Champions movepool
//   - with --require, the team holds that Mega form's stone on that species
// Exits 1 on any hard error. Prints final stats (Mega form when holding its stone).
const fs = require("fs");
const E = require("./engine");

const args = process.argv.slice(2);
const file = args[0];
const reqIdx = args.indexOf("--require");
const require_ = reqIdx >= 0 ? args[reqIdx + 1] : null;
if (!file) { console.error('usage: node validate.js <paste.txt> [--require "Species:Label"]'); process.exit(1); }

const NATURES = ["Hardy","Lonely","Brave","Adamant","Naughty","Bold","Docile","Relaxed","Impish","Lax","Timid","Hasty",
  "Serious","Jolly","Naive","Modest","Mild","Quiet","Bashful","Rash","Calm","Gentle","Sassy","Careful","Quirky"];
const ALIAS = { "Indeedee (M)": "Indeedee-Male", "Indeedee (F)": "Indeedee-Female", "Indeedee-M": "Indeedee-Male",
  "Indeedee-F": "Indeedee-Female", "Basculegion (M)": "Basculegion-Male", "Basculegion (F)": "Basculegion-Female" };
const STAT = { HP: "hp", Atk: "atk", Def: "def", SpA: "spa", SpD: "spd", Spe: "spe" };

const text = fs.readFileSync(file, "utf8").replace(/\r/g, "");
const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(b => b && !b.startsWith("#") && /@|Ability:/.test(b));
const errors = [], warns = [];
const mons = [];

for (const b of blocks) {
  const lines = b.split("\n").map(l => l.trim());
  const head = lines[0].match(/^(.+?)(?:\s*\((?:M|F)\))?\s*(?:@\s*(.+))?$/);
  let rawName = lines[0].split("@")[0].trim();
  // strip nickname "Nick (Species)"
  const nick = rawName.match(/^.+\((.+)\)$/);
  if (nick && !/^(M|F)$/.test(nick[1])) rawName = nick[1];
  const name = ALIAS[rawName] || rawName.replace(/\s*\((M|F)\)$/, "");
  const item = (lines[0].split("@")[1] || "").trim();
  const m = { raw: rawName, name, item, ability: null, nature: null, pts: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, moves: [] };
  for (const l of lines.slice(1)) {
    if (l.startsWith("Ability:")) m.ability = l.slice(8).trim();
    else if (/Nature$/.test(l)) m.nature = l.replace(/Nature$/, "").trim();
    else if (l.startsWith("EVs:")) for (const part of l.slice(4).split("/")) {
      const mm = part.trim().match(/^(\d+)\s+(HP|Atk|Def|SpA|SpD|Spe)$/);
      if (mm) m.pts[STAT[mm[2]]] = +mm[1]; else errors.push(name + ": can't read EV part '" + part.trim() + "'");
    }
    else if (l.startsWith("- ")) m.moves.push(l.slice(2).trim());
  }
  mons.push(m);
}

if (mons.length !== 6) errors.push("team has " + mons.length + " Pokemon, expected 6");
const seenSp = {}, seenIt = {};
for (const m of mons) {
  const e = E.dexf(m.name);
  if (!e) { errors.push(m.raw + ": NOT in the Champions dex"); continue; }
  if (e.hypothetical) {
    const reqSp = require_ ? require_.split(":")[0] : null;
    if (reqSp === m.name || reqSp === e.baseSpecies) warns.push(m.name + " is HYPOTHETICAL (not in Champions yet) - allowed only as this run's centrepiece");
    else errors.push(m.name + " is HYPOTHETICAL and not in Champions - not allowed on this team");
  }
  const spKey = e.baseSpecies || m.name; // Greninja-Ash counts as Greninja for Species Clause
  if (seenSp[spKey]) errors.push("Species Clause: two " + spKey); seenSp[spKey] = 1;
  if (!m.item) errors.push(m.name + ": no item");
  else {
    const stones = e.megaStones || [];
    const isStone = /ite( [XYZ])?$/.test(m.item) && !E.ITEMS.includes(m.item);
    if (isStone && !stones.includes(m.item)) errors.push(m.name + ": " + m.item + " is not this species' Mega Stone (has: " + (stones.join(", ") || "none") + ")");
    else if (!isStone && !E.ITEMS.includes(m.item)) errors.push(m.name + ": item '" + m.item + "' does NOT exist in Champions");
    if (seenIt[m.item]) errors.push("Item Clause: " + m.item + " used twice"); seenIt[m.item] = 1;
  }
  if (!m.ability || !(e.abilities || []).includes(m.ability))
    errors.push(m.name + ": ability '" + m.ability + "' not legal (base abilities: " + (e.abilities || []).join(", ") + ")");
  if (!NATURES.includes(m.nature)) errors.push(m.name + ": nature '" + m.nature + "' invalid");
  const tot = Object.values(m.pts).reduce((a, b) => a + b, 0);
  for (const [k, v] of Object.entries(m.pts)) if (v > 32) errors.push(m.name + ": " + v + " points in " + k + " (max 32)");
  if (tot > 66) errors.push(m.name + ": " + tot + " stat points (max 66)");
  else if (tot < 66) warns.push(m.name + ": only " + tot + " of 66 stat points spent");
  if (m.moves.length !== 4) errors.push(m.name + ": " + m.moves.length + " moves");
  if (new Set(m.moves).size !== m.moves.length) errors.push(m.name + ": duplicate move");
  for (const mv of m.moves) if (!e.moves.includes(mv)) errors.push(m.name + ": '" + mv + "' not in its Champions movepool");
}
if (require_) {
  const [sp, label] = require_.split(":");
  let e = E.dexf(sp), mm = mons.find(x => x.name === sp);
  let i = e ? (e.mega || []).findIndex(x => (x.label || "Mega") === label) : -1;
  // A form that is not a Mega (e.g. Gen 7 Ash-Greninja) lives on its own entry with baseSpecies = sp.
  const alt = i < 0 && E.DEX.find(x => x.baseSpecies === sp && (x.mega || []).some(f => (f.label || "Mega") === label));
  if (alt) {
    const am = mons.find(x => x.name === alt.name);
    if (!am) errors.push("required " + alt.name + " (" + label + " form) is not on the team");
    else if (/ite( [XYZ])?$/.test(am.item) && !E.ITEMS.includes(am.item)) errors.push(alt.name + " must hold a normal item, not a Mega Stone");
  }
  else if (!mm) errors.push("required " + sp + " is not on the team");
  else if (i < 0) errors.push(sp + " has no form '" + label + "'");
  else if (mm.item !== (e.megaStones || [])[i]) errors.push(sp + " must hold " + (e.megaStones || [])[i] + " for " + label + " (holds " + mm.item + ")");
}

// Final stats
console.log("FINAL STATS (Mega form shown when holding its own stone)");
for (const m of mons) {
  const e = E.dexf(m.name); if (!e) continue;
  let fi = (e.megaStones || []).indexOf(m.item);
  if (e.battleBond) { // show both states: before and after its first knockout
    try { const pre = E.stats(E.mk(m.name, -1, m.item, m.nature, m.pts, m.moves, m.ability));
      console.log("  " + (m.name + " [before KO]").padEnd(24) + "".padEnd(32) + ["hp","atk","def","spa","spd","spe"].map(k => k.toUpperCase() + " " + pre[k]).join("  ")); } catch (err) {}
    fi = 0;
  }
  try {
    const mon = E.mk(m.name, fi, m.item, m.nature, m.pts, m.moves, m.ability);
    const s = E.stats(mon);
    console.log("  " + (m.name + (fi >= 0 ? " [" + (e.mega[fi].label || "Mega") + "]" : "")).padEnd(24) + E.types(mon).join("/").padEnd(16) +
      E.abilityOf(mon).padEnd(16) + ["hp", "atk", "def", "spa", "spd", "spe"].map(k => k.toUpperCase() + " " + s[k]).join("  "));
  } catch (err) { errors.push(m.name + ": stat calc failed: " + err.message); }
}
const megas = mons.filter(m => { const e = E.dexf(m.name); return e && (e.megaStones || []).includes(m.item); });
console.log("\nMega Stones on team: " + (megas.map(m => m.name + " @ " + m.item).join(", ") || "none") + "  (only one can Mega Evolve per battle)");
if (warns.length) console.log("\nWARNINGS\n  " + warns.join("\n  "));
if (errors.length) { console.log("\nERRORS\n  " + errors.join("\n  ")); process.exit(1); }
console.log("\nLEGAL: all checks passed.");
