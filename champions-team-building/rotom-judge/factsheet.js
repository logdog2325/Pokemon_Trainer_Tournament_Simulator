// Rotom Judge — fact sheet generator.
//   node factsheet.js <Species>          e.g. node factsheet.js Absol
// Writes factsheets/<Species>.md: every number the advocates are allowed to argue from, for both
// Mega forms, computed by the app's own engine. No AI involved.
const fs = require("fs");
const path = require("path");
const E = require("./engine");
const { mk, P, fmt, calc, best, stats, types, abilityOf, TYPES, typeChart, accuracy, attackingMoves, BOARD, THREAT_FIELD } = E;

// Default: the species' Mega forms. With --forms, any list "Species:formIndex:Label" (formIndex -1 = base form), e.g.
//   node factsheet.js Greninja --forms "Greninja:0:Mega,Greninja-Ash:0:Ash,Greninja-Ash:-1:Battle Bond (before its first KO)"
const species = process.argv[2];
if (!species) { console.error("usage: node factsheet.js <Species> [--forms Sp:fi:Label,...]"); process.exit(1); }
const entry = E.dexf(species);
const fArg = process.argv.indexOf("--forms");
const FORMS = fArg > 0
  ? process.argv[fArg + 1].split(",").map(x => { const [sp, fi, label] = x.split(":"); return { sp, fi: +fi, label }; })
  : (entry && entry.mega || []).map((m, i) => ({ sp: species, fi: i, label: m.label || "Mega" }));
if (FORMS.length < 2) { console.error(species + " does not have two Mega forms in the dex; pass --forms"); process.exit(1); }
for (const f of FORMS) {
  const e = E.dexf(f.sp); if (!e) { console.error("not in dex: " + f.sp); process.exit(1); }
  f.entry = e; f.stone = f.fi >= 0 ? ((e.megaStones || [])[f.fi] || "") : "";
  f.ms = f.fi >= 0 ? e.mega[f.fi] : { label: f.label, type: e.types, ability: (e.abilities || [])[0], baseStats: e.baseStats };
}
const ANY_HYPO = FORMS.some(f => f.entry.hypothetical);

// The field each form brings with it, and extra fields worth pricing.
const OWN_FIELD = { "Drought": { weather: "sun" }, "Drizzle": { weather: "rain" }, "Sand Stream": { weather: "sand" },
  "Snow Warning": { weather: "snow" }, "Electric Surge": { terrain: "electric" }, "Psychic Surge": { terrain: "psychic" },
  "Grassy Surge": { terrain: "grassy" }, "Misty Surge": { terrain: "misty" } };
const EXTRA_FIELD = { "Sand Force": { label: "in SAND (needs a partner setter: Tyranitar, Hippowdon)", field: { weather: "sand" } } };

// Mechanics notes the advocates must not get wrong.
const NOTES = {
  "Drought": "Sets sun on Mega Evolution AND on every later switch-in. Fire x1.5, Water x0.5, Solar Beam fires in one turn. Weather wars are won by whoever enters LAST (confirmed-facts.md).",
  "Tough Claws": "Contact moves x1.3.",
  "Electric Surge": "Sets Electric Terrain on Mega Evolution / switch-in: grounded Electric moves x1.3, grounded Pokemon cannot fall asleep. Does NOT block priority (only Psychic Terrain does). Overwrites Psychic/Grassy terrain - last setter wins.",
  "No Guard": "Every move it uses and every move used on it cannot miss. Zap Cannon (120 BP, 100% paralysis) becomes a guaranteed paralysis spread-control tool; Focus Blast/Thunder/Hurricane are 100% accurate.",
  "Magic Bounce": "Reflects status moves aimed at it back at the user: Spore, Thunder Wave, Will-O-Wisp, Taunt, Encore, Parting Shot, Fake Tears, etc. Does not block damaging moves or Fake Out.",
  "Sharpness": "Slicing moves x1.5 (Night Slash, Psycho Cut, Sacred Sword, Leaf Blade, X-Scissor, Air Slash, Kowtow Cleave...).",
  "Sand Force": "Rock / Ground / Steel moves x1.3 ONLY in sand. Garchomp does not set sand itself; without a sand partner the ability does nothing. Immune to sand chip.",
  "Levitate": "Ground immune, and UNGROUNDED: gets no terrain boosts, and Psychic Terrain does NOT protect it from priority.",
  "Adaptability": "STAB is x2 instead of x1.5.",
  "Protean": "Changes its own type to the type of the move it is about to use, so that attack gets STAB (x1.5) and its defensive typing changes to match. Under current rules this happens ONCE per switch-in: later attacks of a different type get no STAB until it switches out and back. The sheet prices the first attack; the engine takes field.proteanSpent:true for later ones.",
  "Battle Bond": "HYPOTHETICAL GEN 7 VERSION: after this Pokemon knocks out a target with an attack, it transforms into Ash-Greninja for the rest of the battle (even after switching). Ash-Greninja's Water Shuriken is 20 BP and always hits 3 times (+1 priority, special). It holds a normal item and does NOT use the team's one Mega Evolution. Until its first KO it has plain Greninja stats. (Champions' real Battle Bond is the Gen 9 +1 Atk/SpA/Spe version - not this.)",
  "Aura Guard": "Champions-original: halves damage from PHYSICAL CONTACT moves (Close Combat, Sucker Punch, Kowtow Cleave, Flare Blitz...). Non-contact moves (Earthquake, Rock Slide, all special moves) are unaffected.",
};

// Offense side(s): physical and/or special. Show both if the attacking stats are within 15.
function sides(ms) {
  const a = ms.baseStats.atk, s = ms.baseStats.spa;
  if (Math.abs(a - s) <= 15) return ["phys", "spec"];
  return a > s ? ["phys"] : ["spec"];
}
function offenseSet(f, side, ability) {
  return side === "phys"
    ? mk(f.sp, f.fi, f.stone, "Jolly", P(2, 32, 0, 0, 0, 32), [], ability)
    : mk(f.sp, f.fi, f.stone, "Timid", P(2, 0, 0, 32, 0, 32), [], ability);
}

// Every Mega's max positive-nature Speed, for tiering.
function megaSpeedTable() {
  const rows = [];
  for (const e of E.DEX) if (!e.hypothetical || FORMS.some(f => f.sp === e.name)) (e.mega || []).forEach((m, i) => {
    const s = Math.max(E.stats(mk(e.name, i, "", "Timid", P(2, 0, 0, 0, 0, 32), [], m.ability)).spe,
      E.stats(mk(e.name, i, "", "Jolly", P(2, 0, 0, 0, 0, 32), [], m.ability)).spe);
    rows.push({ n: e.name + " " + (m.label || "Mega"), s });
  });
  return rows.sort((a, b) => b.s - a.s);
}

const out = [];
const w = s => out.push(s);
w("# Fact sheet: " + species + " — " + FORMS.map(f => f.label).join(" vs "));
w("");
w("Generated by `rotom-judge/factsheet.js` from the app's damage engine. Argue ONLY from these numbers or from");
w("new numbers you compute with `rotom-judge/engine.js`. Rolls are 16-roll L50 doubles calcs; `(n/16)` = rolls that KO.");
w("Board spreads are realistic common builds (see engine.js BOARD). Spread moves already include the x0.75 doubles penalty.");
w("");
if (ANY_HYPO) { w("> **HYPOTHETICAL.** " + FORMS.filter(f => f.entry.hypothetical).map(f => f.sp).filter((x, i, a) => a.indexOf(x) === i).join(", ") + " is not in Pokemon Champions (see rotom-judge/hypothetical.js for its source and"); w("> mechanics). Every OTHER Pokemon, item and rule must still be Champions-legal."); w(""); }
if (entry) w("Base form: " + entry.types.join("/") + ", " + (entry.abilities || []).join(" / ") + ", " + Object.values(entry.baseStats).join("/"));
w("");
const megaTable = megaSpeedTable();

FORMS.forEach(f => {
  const ms = f.ms, fi = f.fi, sp = f.sp;
  const label = f.label;
  const ab = ms.ability;
  w("---");
  w("## " + label + " — " + ms.type.join("/") + ", " + ab + ", " + (f.stone ? "stone: " + f.stone : "item: any normal item (not a Mega; does not use the team's Mega Evolution)"));
  w("");
  w("Base stats " + Object.entries(ms.baseStats).map(([k, v]) => k + " " + v).join(" / ") + "  (BST " + Object.values(ms.baseStats).reduce((a, b) => a + b, 0) + ")");
  if (NOTES[ab]) w("\n**" + ab + ":** " + NOTES[ab]);
  w("");

  // Typing
  const probe = mk(sp, fi, f.stone, "Timid", P(2, 0, 0, 32, 0, 32), [], ab);
  const tc = typeChart(probe);
  const bucket = x => TYPES.filter(t => tc[t] === x);
  w("### Typing");
  w("- 4x: " + (bucket(4).join(", ") || "none") + " | 2x: " + (bucket(2).join(", ") || "none"));
  w("- 0.5x: " + (bucket(0.5).join(", ") || "none") + " | 0.25x: " + (bucket(0.25).join(", ") || "none") + " | immune: " + (bucket(0).join(", ") || "none"));
  w("- Grounded: " + (E.isGrounded(probe) ? "yes" : "NO (terrain neither helps it nor protects it from priority)"));
  w("");

  // Speed
  w("### Speed");
  const spd = [["Jolly/Timid 32", "Timid", 32], ["Jolly/Timid 0", "Timid", 0], ["neutral 32", "Hardy", 32], ["Brave/Quiet 0 (Trick Room)", "Quiet", 0]];
  w("- " + spd.map(([l, n, p]) => l + ": " + E.stats(mk(sp, fi, "", n, P(2, 0, 0, 0, 0, p), [], ab)).spe).join(" | "));
  const maxS = E.stats(mk(sp, fi, "", "Timid", P(2, 0, 0, 0, 0, 32), [], ab)).spe;
  const above = megaTable.filter(r => r.s > maxS).map(r => r.n + " " + r.s);
  const tie = megaTable.filter(r => r.s === maxS && !r.n.startsWith(sp + " " + (ms.label || "Mega"))).map(r => r.n);
  w("- Megas faster than its max (" + maxS + "): " + (above.join(", ") || "NONE") + (tie.length ? " | ties: " + tie.join(", ") : ""));
  w("- Board threats it outspeeds at max: " + BOARD.filter(t => E.stats(t.mon).spe < maxS).map(t => t.name + " " + E.stats(t.mon).spe).join(", "));
  w("- Board threats faster than it at max: " + (BOARD.filter(t => E.stats(t.mon).spe >= maxS).map(t => t.name + " " + E.stats(t.mon).spe).join(", ") || "none"));
  w("");

  // Movepool highlights
  const mp = f.entry.moves;
  const pick = re => mp.filter(m => re.test(m));
  w("### Movepool highlights");
  w("- Priority attacks: " + (mp.filter(m => (E.MOVES[m] || {}).pri > 0 && (E.MOVES[m] || {}).bp > 0).join(", ") || "none"));
  w("- Setup: " + (pick(/^(Swords Dance|Nasty Plot|Dragon Dance|Calm Mind|Bulk Up|Agility|Shell Smash|Quiver Dance|Coil|Belly Drum)$/).join(", ") || "none"));
  w("- Support / speed control: " + (pick(/^(Fake Out|Tailwind|Trick Room|Thunder Wave|Icy Wind|Electroweb|Follow Me|Helping Hand|Taunt|Encore|Will-O-Wisp|Parting Shot|Snarl|Wide Guard|Quick Guard|Protect|Detect|Feint|Zap Cannon|Nuzzle|Glare|Scary Face|Light Screen|Reflect|Sunny Day|Rain Dance|U-turn|Volt Switch|Knock Off|Coaching)$/).join(", ") || "none"));
  w("");

  // Offense vs board
  const fields = [{ label: "neutral field", field: {} }];
  if (OWN_FIELD[ab]) fields[0] = { label: "its own " + JSON.stringify(OWN_FIELD[ab]), field: OWN_FIELD[ab] };
  if (EXTRA_FIELD[ab]) fields.push(EXTRA_FIELD[ab]);
  for (const side of sides(ms)) {
    const att = offenseSet(f, side, ab);
    const st = E.stats(att);
    for (const F of fields) {
      w("### Offense — " + (side === "phys" ? "Jolly 2/32 Atk/32 Spe" : "Timid 2/32 SpA/32 Spe") + " (Atk " + st.atk + " / SpA " + st.spa + " / Spe " + st.spe + "), " + F.label + ", no item");
      w("| threat | usage | Spe | best move | damage | acc |");
      w("|---|---|---|---|---|---|");
      let ko = 0;
      for (const t of BOARD) {
        const mvs = attackingMoves(att, F.field).filter(m => (E.MOVES[m] || {}).c === (side === "phys" ? "Phys" : "Spec") || !(E.MOVES[m] || {}).bp);
        const b = best(att, t.mon, F.field, mvs);
        if (b && b.r.koRolls >= 14) ko++;
        w("| " + t.name + " | " + (t.usage ? t.usage + "%" : "-") + " | " + E.stats(t.mon).spe + " | " + (b ? b.move : "-") + " | " + (b ? fmt(b.r) : "-") + " | " + (b ? accuracy(b.move, ab, F.field.weather) + "%" : "") + " |");
      }
      w("\nOHKOs (14+/16 rolls) with no item: **" + ko + " / " + BOARD.length + "**. A Life Orb is x1.3, a type item x1.2, Choice Band/Specs x1.5 on top.");
      w("");
    }
  }

  // Defense vs board
  const bulkSet = offenseSet(f, sides(ms)[0], ab);
  const bs = E.stats(bulkSet);
  w("### Defense — on the offensive spread above (HP " + bs.hp + " / Def " + bs.def + " / SpD " + bs.spd + "), threat in its own field");
  w("| threat | its best hit | damage |");
  w("|---|---|---|");
  let dead = 0;
  for (const t of BOARD) {
    const b = best(t.mon, bulkSet, THREAT_FIELD[t.name] || {}, E.setMovesOf(t.mon));
    if (b && b.r.koRolls >= 14) dead++;
    w("| " + t.name + " | " + (b ? b.move : "-") + " | " + (b ? fmt(b.r) : "no damaging move") + " |");
  }
  w("\nOHKO'd by **" + dead + " / " + BOARD.length + "** board threats on a no-investment spread.");
  w("");
});

const dir = path.join(__dirname, "factsheets");
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, species + ".md");
fs.writeFileSync(file, out.join("\n") + "\n");
console.log("wrote " + path.relative(process.cwd(), file) + " (" + out.length + " lines)");
