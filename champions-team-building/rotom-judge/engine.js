// Rotom Judge — shared calc engine.
//
// Loads the team-builder app's real damage engine (app/app.js) into Node so every agent computes
// numbers from the same code instead of recalling them. Everything the app defines (calcDamage,
// finalStats, effOf, effTable, isGrounded, isSpreadMove, speedLayers, ITEMS, window.DEX, ...) is
// re-exported, plus the helpers below.
//
// Usage from a snippet:   const E=require("./engine"); const {mk,P,calc,BOARD}=E;
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const APP = path.join(__dirname, "..", "app");
const ctx = { window: { USAGE_SETS: {}, RESULTS: {}, RESULTS_MEGAS: {} }, console };
ctx.globalThis = ctx;
vm.createContext(ctx);
let src = "";
for (const f of ["dex-data.js", "moves-data.js", "usage-data.js", "results-data.js", "app.js"])
  src += fs.readFileSync(path.join(APP, f), "utf8") + "\n";
// app.js uses top-level const/function; expose the names we need onto the context object.
src += "\n;Object.assign(globalThis,{calcDamage,finalStats,effOf,effTable,isGrounded,isSpreadMove," +
  "speedLayers,teamTerrain,setMovesOf,ITEMS,WEIGHT,MF_CONTACT});";
vm.runInContext(src, ctx);

const DEX = ctx.window.DEX, MOVES = ctx.window.MOVES;
// Hypothetical species (not in Champions) for "what if" runs. Appended in memory only; see hypothetical.js.
for (const h of require("./hypothetical")) {
  if (h.movesFrom && !h.moves) { const src = DEX.find(e => e.name === h.movesFrom); h.moves = src ? src.moves.slice() : []; }
  if (!DEX.some(e => e.name === h.name)) DEX.push(h);
  if (h.weightKg) ctx.WEIGHT[h.name] = h.weightKg;
}
const dexf = n => DEX.find(e => e.name === n);

// Stat points: 66 total, max 32 per stat. Order: hp, atk, def, spa, spd, spe.
const P = (hp, atk, def, spa, spd, spe) => ({ hp, atk, def, spa, spd, spe });

// formIndex: -1 = base form, 0/1 = entry.mega[i]. Use megaIndex() to look one up by label.
function mk(name, formIndex, item, nature, pts, moves, ability) {
  const entry = dexf(name);
  if (!entry) throw new Error("not in the Champions dex: " + name);
  return { entry, formIndex, set: { item, nature, points: pts, moves: moves || [], ability } };
}
function megaIndex(name, label) {
  const e = dexf(name);
  const i = (e.mega || []).findIndex(m => (m.label || "Mega") === label);
  if (i < 0) throw new Error(name + " has no Mega labelled " + JSON.stringify(label));
  return i;
}

// Formatted damage: "min-max% [KO | n/16]". koRolls counts how many of the 16 rolls kill.
function fmt(r) {
  if (!r) return "-";
  if (r.unknownBP) return "?(" + (r.note || "variable BP") + ")";
  if (r.immune) return "IMMUNE";
  return r.minPct + "-" + r.maxPct + "%" + (r.koRolls === 16 ? " KO" : r.koRolls ? " (" + r.koRolls + "/16)" : "");
}
// calc(att, move, def, field) — sets the doubles spread flag automatically.
function calc(att, move, def, field) {
  field = Object.assign({}, field || {});
  if (field.spread === undefined) field.spread = ctx.isSpreadMove(move, field, att);
  return ctx.calcDamage(att, move, def, field);
}
// Best single move from `moves` into def. Returns {move, r}.
function best(att, def, field, moves) {
  let b = null;
  for (const mv of (moves || ctx.setMovesOf(att))) {
    const r = calc(att, mv, def, field);
    if (!r || r.immune || r.unknownBP) continue;
    if (!b || r.minPct > b.r.minPct) b = { move: mv, r };
  }
  return b;
}
const stats = m => ctx.finalStats(m);
const types = m => ctx.effOf(m).types;
const abilityOf = m => ctx.effOf(m).abilities[0];
const TYPES = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying",
  "Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"];
const typeChart = m => ctx.effTable(ctx.effOf(m), abilityOf(m));

// Real in-game accuracy. The app's move data has no accuracy field, so this table is the source.
// Weather/ability overrides: No Guard -> everything 100. Rain -> Thunder/Hurricane 100, Sun -> 50.
// Snow -> Blizzard 100.
const ACC = { "Focus Blast":70, "Stone Edge":80, "Hurricane":70, "Thunder":70, "Blizzard":70, "Fire Blast":85,
  "Head Smash":80, "Meteor Mash":90, "Hydro Pump":80, "Draco Meteor":90, "Play Rough":90, "Gunk Shot":80,
  "Rock Slide":90, "Icicle Crash":90, "Iron Tail":75, "Megahorn":85, "Zap Cannon":50, "Dynamic Punch":50,
  "Inferno":50, "Leaf Storm":90, "Overheat":90, "Power Whip":85, "Air Slash":95, "Scale Shot":90,
  "Heat Wave":90, "Electroweb":95, "Dire Claw":100, "Sucker Punch":100, "Cross Chop":80, "High Jump Kick":90,
  "Poison Fang":100, "Fire Punch":100, "Ice Punch":100, "Thunder Punch":100, "Psycho Cut":100, "Solar Beam":100,
  "Solar Blade":100, "Superpower":100, "Close Combat":100, "Crunch":100, "Aura Sphere":100, "Light of Ruin":90 };
function accuracy(move, attAbility, weather) {
  if (attAbility === "No Guard") return 100;
  if (weather === "rain" && (move === "Thunder" || move === "Hurricane")) return 100;
  if (weather === "sun" && (move === "Thunder" || move === "Hurricane")) return 50;
  if (weather === "snow" && move === "Blizzard") return 100;
  return ACC[move] || 100;
}

// Moves excluded from "best move" searches: charge turns, recharge, self-KO, locked/variable junk.
// Solar Beam / Solar Blade are only allowed when the field is sun.
const JUNK = new Set(["Hyper Beam","Giga Impact","Explosion","Self-Destruct","Misty Explosion","Focus Punch",
  "Meteor Beam","Sky Attack","Fly","Dig","Dive","Bounce","Phantom Force","Shadow Force","Future Sight",
  "Belch","Last Resort","Dream Eater","Steel Beam","Mind Blown","Final Gambit","Skull Bash","Razor Wind",
  "Blast Burn","Frenzy Plant","Hydro Cannon","Rollout","Ice Ball","Fling","Natural Gift","Spit Up",
  "Stored Power","Punishment","Trump Card","Reversal","Flail","Endeavor","Super Fang","Night Shade",
  "Seismic Toss","Counter","Mirror Coat","Metal Burst","Bide","Uproar","Thrash","Outrage","Petal Dance",
  "Raging Fury","Steel Roller","Ice Spinner","Power Trip","Round","Echoed Voice","Snore","Fury Cutter",
  "Fire Spin","Whirlpool","Sand Tomb","Bind","Wrap","Infestation","Thief","Covet","Pluck","Bug Bite",
  "False Swipe","Rage","Present","Beat Up","Magnitude","Frustration","Return"]);
function attackingMoves(m, field) {
  return m.entry.moves.filter(mv => {
    const mi = MOVES[mv];
    if (!mi || mi.c === "Stat" || !mi.bp) {
      // keep variable-BP moves the engine understands
      if (!["Grass Knot","Low Kick","Heavy Slam","Heat Crash","Weather Ball","Terrain Pulse","Expanding Force",
            "Rising Voltage","Psyblade"].includes(mv)) return false;
    }
    if (JUNK.has(mv)) return false;
    if ((mv === "Solar Beam" || mv === "Solar Blade") && !(field && field.weather === "sun")) return false;
    return true;
  });
}

// The Reg M-C threat board. Usage from Pikalytics gen9championsvgc2026regmc (M-C, not M-B).
// Spreads are realistic common builds, not maximums. `moves` = what the threat hits you with.
// Every move is checked against the species' Champions movepool at load time (see the guard below).
const T = (name, usage, species, fi, item, nat, pts, moves, ab) => ({ name, usage, mon: mk(species, fi, item, nat, pts, moves, ab) });
const BOARD = [
  T("Rillaboom", 37.18, "Rillaboom", -1, "Assault Vest", "Adamant", P(32,32,2,0,0,0), ["Wood Hammer","Grassy Glide","High Horsepower","U-turn"], "Grassy Surge"),
  T("Sneasler", 34.29, "Sneasler", -1, "Psychic Seed", "Jolly", P(2,32,0,0,0,32), ["Close Combat","Dire Claw","Rock Slide","Fake Out"], "Unburden"),
  T("Incineroar", 26.77, "Incineroar", -1, "Sitrus Berry", "Careful", P(32,12,6,0,16,0), ["Flare Blitz","Darkest Lariat","Fake Out","Parting Shot"], "Intimidate"),
  T("M-Salamence", 23.15, "Salamence", 0, "Salamencite", "Adamant", P(16,32,0,0,0,18), ["Double-Edge","Dragon Claw","Protect"], "Aerilate"),
  T("Kingambit", 22.44, "Kingambit", -1, "Chople Berry", "Adamant", P(32,32,2,0,0,0), ["Kowtow Cleave","Sucker Punch","Iron Head","Low Kick"], "Supreme Overlord"),
  T("Indeedee-F", 21.78, "Indeedee-Female", -1, "Sitrus Berry", "Bold", P(32,0,32,0,2,0), ["Expanding Force","Follow Me","Trick Room"], "Psychic Surge"),
  T("M-Golisopod", 18.49, "Golisopod", 0, "Golisopite", "Adamant", P(32,32,2,0,0,0), ["First Impression","Close Combat","Liquidation"], "Tough Claws"),
  T("Garchomp", 17.12, "Garchomp", -1, "Life Orb", "Jolly", P(2,32,0,0,0,32), ["Earthquake","Dragon Claw","Rock Slide"], "Rough Skin"),
  T("Farigiraf", 15.90, "Farigiraf", -1, "Sitrus Berry", "Bold", P(27,0,12,5,17,5), ["Psychic","Foul Play","Trick Room"], "Armor Tail"),
  T("Gholdengo", 15.23, "Gholdengo", -1, "Life Orb", "Timid", P(7,0,0,32,0,27), ["Make It Rain","Shadow Ball","Nasty Plot"], "Good as Gold"),
  T("Pelipper", 13.09, "Pelipper", -1, "Focus Sash", "Timid", P(2,0,0,32,0,32), ["Hurricane","Weather Ball","Tailwind"], "Drizzle"),
  T("Whimsicott", 12.65, "Whimsicott", -1, "Focus Sash", "Timid", P(2,0,0,32,0,32), ["Moonblast","Tailwind","Encore"], "Prankster"),
  T("Milotic", 11.42, "Milotic", -1, "Sitrus Berry", "Calm", P(32,0,10,12,12,0), ["Scald","Ice Beam","Life Dew"], "Marvel Scale"),
  T("Sylveon", 10.63, "Sylveon", -1, "Fairy Feather", "Modest", P(7,0,22,20,0,17), ["Hyper Voice","Hyper Beam"], "Pixilate"),
  T("Archaludon", 9.98, "Archaludon", -1, "Leftovers", "Modest", P(16,0,0,32,0,18), ["Draco Meteor","Flash Cannon","Electro Shot"], "Stamina"),
  T("Arcanine-Hisui", 9.38, "Arcanine-Hisui", -1, "Life Orb", "Jolly", P(2,32,0,0,0,32), ["Head Smash","Flare Blitz","Extreme Speed"], "Rock Head"),
  T("M-Baxcalibur", null, "Baxcalibur", 0, "Baxcalibrite", "Adamant", P(16,32,0,0,0,18), ["Icicle Crash","Glaive Rush"], "Thermal Exchange"),
  T("M-Froslass", null, "Froslass", 0, "Froslassite", "Timid", P(2,0,0,32,0,32), ["Blizzard","Shadow Ball","Icy Wind"], "Snow Warning"),
  T("M-Metagross", null, "Metagross", 0, "Metagrossite", "Adamant", P(16,32,0,0,0,18), ["Meteor Mash","Zen Headbutt","Bullet Punch"], "Tough Claws"),
  T("M-Tyranitar", null, "Tyranitar", 0, "Tyranitarite", "Adamant", P(32,32,2,0,0,0), ["Rock Slide","Crunch","Low Kick"], "Sand Stream"),
  T("M-Staraptor", 8.94, "Staraptor", 0, "Staraptite", "Jolly", P(25,9,0,0,0,32), ["Brave Bird","Close Combat","Tailwind"], "Contrary"),
];
// Guard: a board move the species cannot learn in Champions is a data error (Incineroar was once given Knock Off).
for (const t of BOARD) for (const mv of t.mon.set.moves)
  if (!t.mon.entry.moves.includes(mv)) throw new Error("BOARD: " + t.name + " cannot learn " + mv + " in Champions");
// Weather each board threat brings with it (so its own hits are priced in its own field).
const THREAT_FIELD = { "Pelipper": { weather: "rain" }, "M-Froslass": { weather: "snow" },
  "M-Tyranitar": { weather: "sand" }, "Rillaboom": { terrain: "grassy" }, "Indeedee-F": { terrain: "psychic" } };

module.exports = Object.assign({}, {
  DEX, MOVES, dexf, P, mk, megaIndex, fmt, calc, best, stats, types, abilityOf, TYPES, typeChart,
  ACC, accuracy, JUNK, attackingMoves, BOARD, THREAT_FIELD,
  calcDamage: ctx.calcDamage, finalStats: ctx.finalStats, effOf: ctx.effOf, effTable: ctx.effTable,
  isGrounded: ctx.isGrounded, isSpreadMove: ctx.isSpreadMove, speedLayers: ctx.speedLayers,
  teamTerrain: ctx.teamTerrain, setMovesOf: ctx.setMovesOf, ITEMS: ctx.ITEMS, WEIGHT: ctx.WEIGHT,
  MF_CONTACT: ctx.MF_CONTACT,
});
