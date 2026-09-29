// HYPOTHETICAL Pokemon — NOT in Pokemon Champions. Used only for Rotom Judge "what if" comparisons.
//
// Kept out of app/dex-data.js on purpose so the team-builder app never treats these as legal.
// engine.js appends them to its in-memory dex and tags them `hypothetical: true`; validate.js rejects a
// hypothetical species on any team unless it is the --require centrepiece of that run.
//
// Sources: main-series base stats, abilities and weights, and the Scarlet/Violet learnset, from
// https://www.serebii.net/pokedex-sv/mewtwo/ (fetched 2026-09-29). Champions curates its own movepools,
// so if Mewtwo is ever added its real Champions movepool may differ from this one.
module.exports = [
  {
    name: "Mewtwo",
    hypothetical: true,
    debateNote: "Mewtwo is not in Pokémon Champions yet. This debate uses its main-series stats and Scarlet/Violet moves as a what-if. Every other Pokémon, item and rule is real Champions data.",
    types: ["Psychic"],
    baseStats: { hp: 106, atk: 110, def: 90, spa: 154, spd: 90, spe: 130 },
    abilities: ["Pressure", "Unnerve"],
    weightKg: 122, // Mega X 127 kg (same tier), Mega Y 33 kg (lower Grass Knot / Low Kick tier: 60 BP not 100)
    mega: [
      { label: "Mega X", type: ["Psychic", "Fighting"], ability: "Steadfast",
        baseStats: { hp: 106, atk: 190, def: 100, spa: 154, spd: 100, spe: 130 },
        sprite: "https://play.pokemonshowdown.com/sprites/home/mewtwo-megax.png" },
      { label: "Mega Y", type: ["Psychic"], ability: "Insomnia",
        baseStats: { hp: 106, atk: 150, def: 70, spa: 194, spd: 120, spe: 140 },
        sprite: "https://play.pokemonshowdown.com/sprites/home/mewtwo-megay.png" },
    ],
    megaStones: ["Mewtwonite X", "Mewtwonite Y"],
    dex: 150,
    moves: ["Confusion","Swift","Psybeam","Psycho Cut","Safeguard","Amnesia","Aura Sphere","Psychic","Mist",
      "Psystrike","Recover","Future Sight","Psyshock","Calm Mind","Toxic","Thunder Wave","Brick Break","Bulk Up",
      "Rock Slide","Ice Beam","Light Screen","Protect","Power Gem","Aerial Ace","Thunder Punch","Ice Punch",
      "Energy Ball","Fire Punch","Reflect","Endure","Rock Tomb","Fire Blast","Discharge","Hyper Beam","Agility",
      "Self-Destruct","Earth Power","Giga Impact","Double-Edge","Will-O-Wisp","Zen Headbutt","Flamethrower",
      "Solar Beam","Stone Edge","Thunderbolt","Earthquake","Shadow Ball","Poison Jab","Hurricane","Nasty Plot",
      "Substitute","Iron Tail","Dark Pulse","Taunt","Heal Block","Metronome","Focus Blast","Blizzard","Thunder",
      "Comet Punch","Facade","Chilling Water","Low Sweep","Trailblaze","Pay Day","Ancient Power","Dream Eater",
      "Drain Punch","Tri Attack","Vacuum Wave"],
  },
  {
    // Gen 7 Battle Bond. Starts as Battle Bond Greninja (base stats below); after it knocks out a Pokemon with an
    // attack it becomes Ash-Greninja (entry.mega[0], label "Ash") for the rest of the battle, even after switching.
    // It holds a normal item and does NOT use the team's one Mega Evolution. Water Shuriken becomes 20 BP and always
    // hits 3 times (handled in app.js, keyed on `battleBond`). Champions' own Greninja has the Gen 9 Battle Bond
    // (+1 Atk/SpA/Spe once after a KO) instead; that is not what this entry models.
    // Stats: Serebii / Bulbapedia, Ash-Greninja 72/145/67/153/71/132.
    name: "Greninja-Ash",
    baseSpecies: "Greninja",
    hypothetical: true,
    debateNote: "Ash-Greninja is not in Pokémon Champions. Mega Greninja is real Champions data; Ash-Greninja is a what-if using its Gen 7 Battle Bond transformation with Champions Greninja's moves. Every other Pokémon, item and rule is real Champions data.",
    battleBond: true,
    types: ["Water", "Dark"],
    baseStats: { hp: 72, atk: 95, def: 67, spa: 103, spd: 71, spe: 122 },
    abilities: ["Battle Bond"],
    weightKg: 40,
    mega: [
      { label: "Ash", type: ["Water", "Dark"], ability: "Battle Bond",
        baseStats: { hp: 72, atk: 145, def: 67, spa: 153, spd: 71, spe: 132 },
        sprite: "https://play.pokemonshowdown.com/sprites/home/greninja-ash.png" },
    ],
    megaStones: [],
    dex: 658,
    movesFrom: "Greninja", // same Champions movepool as Greninja, so only the form mechanics differ
  },
];
