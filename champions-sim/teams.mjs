/*
 * Shared team library for the analyzer / harness / optimizer.
 * Champions point pastes (points in the EVs field, 0-32; base ability for megas).
 *
 * NOTE: META teams are spread-complete approximations of the tournament
 * archetypes. To use the real tournament pastes from
 * champions-team-building/top-teams-deduped.md (which lack EV spreads), run them
 * through the auto-spread step (see prep-teams.mjs, TODO) and drop them in here.
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

export const META = {
	'Char-Y / Aerodactyl offense': `
Charizard @ Charizardite Y
Ability: Blaze
Level: 50
EVs: 4 HP / 32 SpA / 30 Spe
Timid Nature
- Heat Wave
- Air Slash
- Solar Beam
- Protect

Aerodactyl @ Aerodactylite
Ability: Rock Head
Level: 50
EVs: 4 HP / 32 Atk / 30 Spe
Jolly Nature
- Rock Slide
- Dual Wingbeat
- Tailwind
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Level: 50
EVs: 32 HP / 2 Def / 32 SpD
Careful Nature
- Fake Out
- Flare Blitz
- Parting Shot
- Knock Off

Farigiraf @ Colbur Berry
Ability: Armor Tail
Level: 50
EVs: 32 HP / 32 SpD / 2 Def
Sassy Nature
- Trick Room
- Helping Hand
- Psychic
- Protect

Sylveon @ Fairy Feather
Ability: Pixilate
Level: 50
EVs: 32 HP / 32 SpA / 2 Def
Modest Nature
- Hyper Voice
- Moonblast
- Quick Attack
- Protect

Garchomp @ Life Orb
Ability: Rough Skin
Level: 50
EVs: 4 HP / 32 Atk / 30 Spe
Jolly Nature
- Earthquake
- Rock Slide
- Dragon Claw
- Protect
`,
	'Big 6 (Char-Y / Floette)': `
Charizard @ Charizardite Y
Ability: Blaze
Level: 50
EVs: 4 HP / 32 SpA / 30 Spe
Timid Nature
- Heat Wave
- Air Slash
- Solar Beam
- Protect

Floette @ Floettenite
Ability: Flower Veil
Level: 50
EVs: 32 HP / 32 SpA / 2 SpD
Modest Nature
- Moonblast
- Light of Ruin
- Dazzling Gleam
- Protect

Basculegion @ Focus Sash
Ability: Adaptability
Level: 50
EVs: 32 Atk / 2 Def / 32 Spe
Adamant Nature
- Wave Crash
- Last Respects
- Aqua Jet
- Protect

Kingambit @ Life Orb
Ability: Defiant
Level: 50
EVs: 24 HP / 32 Atk / 10 Spe
Adamant Nature
- Kowtow Cleave
- Sucker Punch
- Iron Head
- Protect

Whimsicott @ Focus Sash
Ability: Prankster
Level: 50
EVs: 32 SpA / 32 Spe / 2 HP
Timid Nature
- Tailwind
- Moonblast
- Encore
- Protect

Garchomp @ Life Orb
Ability: Rough Skin
Level: 50
EVs: 4 HP / 32 Atk / 30 Spe
Jolly Nature
- Earthquake
- Rock Slide
- Dragon Claw
- Protect
`,
	'Delphox / Blastoise control': `
Delphox @ Delphoxite
Ability: Blaze
Level: 50
EVs: 4 HP / 32 SpA / 30 Spe
Timid Nature
- Heat Wave
- Nasty Plot
- Psyshock
- Protect

Blastoise @ Blastoisinite
Ability: Rain Dish
Level: 50
EVs: 4 HP / 32 SpA / 30 Spe
Modest Nature
- Water Spout
- Dark Pulse
- Shell Smash
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Level: 50
EVs: 32 HP / 2 Def / 32 SpD
Careful Nature
- Fake Out
- Flare Blitz
- Parting Shot
- Helping Hand

Kingambit @ Black Glasses
Ability: Defiant
Level: 50
EVs: 24 HP / 32 Atk / 10 Spe
Adamant Nature
- Kowtow Cleave
- Sucker Punch
- Swords Dance
- Protect

Sinistcha @ Kasib Berry
Ability: Hospitality
Level: 50
EVs: 32 HP / 32 Def / 2 SpD
Relaxed Nature
- Trick Room
- Rage Powder
- Matcha Gotcha
- Protect

Sneasler @ Focus Sash
Ability: Poison Touch
Level: 50
EVs: 4 HP / 32 Atk / 30 Spe
Jolly Nature
- Close Combat
- Poison Jab
- Fake Out
- Protect
`,
};
