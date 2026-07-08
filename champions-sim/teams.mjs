/*
 * Shared team library. MY_TEAM has explicit point spreads; META teams are the
 * REAL current-meta lists from The Champions Arena II (706 players, Jul 2026),
 * as raw tournament pastes (no spreads). Consumers run them through
 * autospread() (see autospread.mjs) to fill role-based point spreads.
 */

export const MY_TEAM = `
Gardevoir @ Gardevoirite
Ability: Synchronize
Level: 50
EVs: 32 HP / 32 SpA / 2 SpD
Quiet Nature
- Trick Room
- Hyper Voice
- Psychic
- Protect

Mudsdale @ Life Orb
Ability: Inner Focus
Level: 50
EVs: 32 HP / 32 Atk / 2 SpD
Brave Nature
- High Horsepower
- Rock Slide
- Heavy Slam
- Protect

Torkoal @ Charcoal
Ability: Drought
Level: 50
EVs: 32 HP / 32 SpA / 2 SpD
Quiet Nature
- Eruption
- Flamethrower
- Earth Power
- Protect

Farigiraf @ Sitrus Berry
Ability: Armor Tail
Level: 50
EVs: 32 HP / 32 SpD / 2 Def
Relaxed Nature
- Trick Room
- Helping Hand
- Psychic
- Protect

Vivillon @ Focus Sash
Ability: Compound Eyes
Level: 50
EVs: 32 SpA / 32 Spe / 2 HP
Timid Nature
- Sleep Powder
- Rage Powder
- Hurricane
- Protect

Sceptile @ Sceptilite
Ability: Overgrow
Level: 50
EVs: 32 SpA / 32 Spe / 2 HP
Timid Nature
- Leaf Storm
- Dragon Pulse
- Energy Ball
- Protect
`;

// The Champions Arena II — real top teams (spread-less; autospread fills them).
export const META = {
	'Char-Y / Aerodactyl offense (Marco #1)': `
Charizard @ Charizardite Y
Ability: Blaze
Modest Nature
- Heat Wave
- Weather Ball
- Solar Beam
- Protect

Incineroar @ Charcoal
Ability: Intimidate
Brave Nature
- Flare Blitz
- Darkest Lariat
- Fake Out
- Parting Shot

Sylveon @ Fairy Feather
Ability: Pixilate
Modest Nature
- Hyper Voice
- Yawn
- Quick Attack
- Protect

Farigiraf @ Sitrus Berry
Ability: Armor Tail
Calm Nature
- Psyshock
- Helping Hand
- Trick Room
- Protect

Garchomp @ Life Orb
Ability: Rough Skin
Jolly Nature
- Earthquake
- Protect
- Dragon Claw
- Stomping Tantrum

Aerodactyl @ Focus Sash
Ability: Unnerve
Jolly Nature
- Rock Slide
- Tailwind
- Wide Guard
- Protect
`,
	'Big 6 (Toler #2)': `
Kingambit @ Chople Berry
Ability: Defiant
Adamant Nature
- Kowtow Cleave
- Low Kick
- Sucker Punch
- Protect

Charizard @ Charizardite Y
Ability: Solar Power
Modest Nature
- Heat Wave
- Weather Ball
- Solar Beam
- Protect

Floette-Eternal @ Floettite
Ability: Flower Veil
Timid Nature
- Moonblast
- Dazzling Gleam
- Light of Ruin
- Protect

Whimsicott @ Focus Sash
Ability: Prankster
Timid Nature
- Moonblast
- Tailwind
- Encore
- Protect

Garchomp @ Life Orb
Ability: Rough Skin
Jolly Nature
- Earthquake
- Dragon Claw
- Rock Slide
- Protect

Basculegion @ Mystic Water
Ability: Adaptability
Adamant Nature
- Wave Crash
- Aqua Jet
- Last Respects
- Protect
`,
	'Blastoise / Floette control (Jorge #3)': `
Sinistcha @ Occa Berry
Ability: Hospitality
Bold Nature
- Matcha Gotcha
- Trick Room
- Rage Powder
- Protect

Sneasler @ Focus Sash
Ability: Poison Touch
Jolly Nature
- Close Combat
- Poison Jab
- Fake Out
- Rock Tomb

Incineroar @ Sitrus Berry
Ability: Intimidate
Careful Nature
- Flare Blitz
- Fake Out
- Helping Hand
- Parting Shot

Blastoise @ Blastoisinite
Ability: Rain Dish
Modest Nature
- Water Spout
- Dark Pulse
- Shell Smash
- Protect

Kingambit @ Life Orb
Ability: Defiant
Adamant Nature
- Kowtow Cleave
- Sucker Punch
- Swords Dance
- Protect

Floette-Eternal @ Floettite
Ability: Flower Veil
Modest Nature
- Protect
- Calm Mind
- Dazzling Gleam
- Moonblast
`,
	'Delphox / Blastoise (Juan #7)': `
Delphox @ Delphoxite
Ability: Blaze
Timid Nature
- Heat Wave
- Psyshock
- Nasty Plot
- Protect

Sneasler @ Focus Sash
Ability: Poison Touch
Jolly Nature
- Quick Guard
- Fake Out
- Poison Jab
- Close Combat

Incineroar @ Sitrus Berry
Ability: Intimidate
Impish Nature
- Fake Out
- Parting Shot
- Helping Hand
- Flare Blitz

Sinistcha @ Occa Berry
Ability: Hospitality
Bold Nature
- Matcha Gotcha
- Rage Powder
- Trick Room
- Protect

Blastoise @ Blastoisinite
Ability: Rain Dish
Modest Nature
- Water Spout
- Dark Pulse
- Shell Smash
- Protect

Kingambit @ Black Glasses
Ability: Defiant
Adamant Nature
- Protect
- Swords Dance
- Kowtow Cleave
- Sucker Punch
`,
	'Rain (Pelipper / Archaludon)': `
Scovillain @ Scovillainite
Ability: Moody
Calm Nature
- Protect
- Overheat
- Rage Powder
- Leech Seed

Basculegion @ Life Orb
Ability: Swift Swim
Adamant Nature
- Protect
- Wave Crash
- Aqua Jet
- Last Respects

Pelipper @ Sitrus Berry
Ability: Drizzle
Modest Nature
- Protect
- Weather Ball
- Hurricane
- Tailwind

Archaludon @ Leftovers
Ability: Stamina
Bold Nature
- Protect
- Flash Cannon
- Electro Shot
- Dragon Pulse

Grimmsnarl @ Light Clay
Ability: Prankster
Sassy Nature
- Spirit Break
- Light Screen
- Reflect
- Parting Shot

Floette-Eternal @ Floettite
Ability: Flower Veil
Modest Nature
- Protect
- Dazzling Gleam
- Moonblast
- Light of Ruin
`,
};
