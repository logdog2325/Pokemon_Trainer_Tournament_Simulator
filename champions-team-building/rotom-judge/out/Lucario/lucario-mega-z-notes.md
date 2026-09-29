# Mega Lucario Z team: notes

Reg M-C doubles, Level 50. Every number was computed with `rotom-judge/engine.js` against the board spreads in `engine.js BOARD`, each threat in its own field unless a field is named. Spread moves already include x0.75. Paste: `lucario-mega-z.txt`. `node validate.js out/Lucario/lucario-mega-z.txt --require "Lucario:Mega Z"` prints **LEGAL: all checks passed.**

| Slot | Set | Final stats (HP/Atk/Def/SpA/SpD/Spe) |
|---|---|---|
| Lucario @ Lucarionite Z | Aura Guard after Mega (Inner Focus before it). Timid 2 HP / 32 SpA / 32 Spe. Aura Sphere, Flash Cannon, Psychic, Protect | 147 / 108 / 90 / 216 / 90 / 223 |
| Incineroar @ Sitrus Berry | Intimidate. Adamant 32 HP / 22 Atk / 12 Def. Fake Out, Flare Blitz, Darkest Lariat, Helping Hand | 202 / 172 / 122 / 90 / 110 / 80 |
| Rillaboom @ Miracle Seed | Grassy Surge. Brave 32 HP / 32 Atk / 2 Def. Fake Out, Grassy Glide, Wood Hammer, High Horsepower | 207 / 194 / 112 / 80 / 90 / 94 |
| Talonflame @ Sharp Beak | Gale Wings. Adamant 10 HP / 32 Atk / 24 Spe. Brave Bird, Flare Blitz, Tailwind, Protect | 163 / 146 / 91 / 84 / 89 / 170 |
| Gholdengo @ Life Orb | Good as Gold. Modest 7 HP / 2 Def / 32 SpA / 25 Spe. Make It Rain, Shadow Ball, Power Gem, Protect | 169 / 72 / 117 / 203 / 111 / 129 |
| Dragonite @ Never-Melt Ice | Multiscale. Adamant 32 HP / 32 Atk / 2 Def. Extreme Speed, Ice Spinner, Tailwind, Helping Hand | 198 / 204 / 117 / 108 / 120 / 100 |

Items are all distinct and all in the engine's `ITEMS` list. The team avoids the contested items (Assault Vest, Rocky Helmet, Seeds), which `confirmed-facts.md` flags as disputed. Only one Mega Stone is on the team.

## Game plan

Mega Lucario Z is the fastest thing on the field at 223, so the team does not spend a slot making it fast. The partners have three jobs:
1. **Bring the damage Z lacks.** Helping Hand comes from two users, Incineroar and Dragonite. It turns Aura Sphere into OHKOs on Incineroar (106.9-126.2%), Kingambit (134.8-160.9%) and M-Baxcalibur (118-139.8%), and Flash Cannon into an OHKO on Sylveon (111.9-132.2%).
2. **Cover what KOs Z.**
   - Garchomp's Earthquake is non-contact, so Aura Guard does not help. Grassy Terrain from Rillaboom halves it: 148.3-176.9% becomes 74.1-88.4%. Intimidate plus Grassy Terrain brings it to 51-61.2%.
   - Dragonite and Talonflame are immune to Earthquake. Dragonite's Ice Spinner OHKOs Garchomp (140-165.9%).
3. **Overwrite Psychic Terrain.** Grassy Surge replaces Indeedee-F's terrain, which unblocks the team's Fake Outs and priority. A Brave 0-Speed Rillaboom (94) is slower than a neutral Indeedee-F (105), so on a simultaneous lead Grassy Terrain is written last and wins.

On its own, Z cleans up the fast and frail threats: Sneasler (Psychic 186-221.7%), M-Froslass (Flash Cannon 111.6-132%), and Archaludon, Arcanine-H and M-Tyranitar with Aura Sphere. Its special damage ignores Intimidate. Aura Guard lets it absorb the contact hits aimed at it: Incineroar Flare Blitz 75.5-89.8%, Kingambit Low Kick 46.9-55.8% and M-Salamence Double-Edge 66-78.2%.

## Speed control (independent layers)

1. **Gale Wings Tailwind** (Talonflame). It is +1 priority at full HP, so it goes up before any Prankster-less threat moves. **Dragonite** carries a second Tailwind, so the layer survives Talonflame fainting. In Tailwind the team's Speeds are:
   - Dragonite 200 and Gholdengo 258, both above Jolly Sneasler and Timid M-Froslass (189).
   - Talonflame 340.
   - Incineroar 160 and Rillaboom 188, both above Garchomp (169 is the Jolly max). Rillaboom is exactly one point below Sneasler.
2. **Fake Out x2** (Incineroar, Rillaboom). This is independent of Tailwind. Losing one user keeps the layer.
3. **Priority package:**
   - Grassy Glide gets priority in Grassy Terrain.
   - Gale Wings Brave Bird has priority at full HP and OHKOs Sneasler (189.8-224.8%) and Rillaboom (101.9-121.7%).
   - Extreme Speed is +2 priority.
4. **Lucario Z's own 223 Speed**, which no Mega exceeds. Absol-Z and Garchomp-Z tie it.

Caveats:
- Psychic Terrain blocks Fake Out, Grassy Glide, Extreme Speed and Gale Wings Brave Bird against grounded targets. That is why Rillaboom is on the team.
- Farigiraf's Armor Tail blocks all of that priority regardless of terrain.
- Tailwind itself is never blocked.

## Default bring-4 and leads

**Default four:** Lucario + Incineroar lead, with Talonflame + Dragonite in the back.
- Turn 1: Incineroar Fake Outs the biggest physical threat while Lucario Mega Evolves and KOs whatever it outspeeds, such as Sneasler or M-Froslass.
- Turn 2: Incineroar Helping Hands Lucario's Aura Sphere into the slow bulk, such as Incineroar or Kingambit.
- Talonflame (priority Tailwind, Rillaboom and Golisopod answer) and Dragonite (Garchomp and Salamence answer, second Helping Hand and Tailwind) cover the rest.

Matchup swaps:
- **vs Indeedee-F psyspam / Sneasler.**
  - Lead Lucario + Rillaboom, with Gholdengo + Incineroar in the back.
  - Grassy Surge overwrites Psychic Terrain on the lead. The Seed may already have fired, because Indeedee's Surge resolves first. Even so, Lucario's Psychic still OHKOs a +1 SpD Sneasler (127.4-150.3%).
  - Gholdengo is immune to Close Combat, Dire Claw and Fake Out.
- **vs Garchomp / sand.** Lead Lucario + Rillaboom, or Lucario + Dragonite.
  - Grassy Terrain halves Earthquake. Dragonite's Ice Spinner OHKOs Garchomp.
  - Rillaboom takes Earthquake for 21.3-25.6% and Wood Hammers Garchomp in Grassy for 96.8-114.6% (13/16).
- **vs M-Salamence.** Keep Dragonite in the four.
  - Ice Spinner OHKOs it (105.9-126.3%), and still does with Helping Hand at -1 (108.6-128%).
  - Gholdengo is the backup. It takes Double-Edge for 45-52.7% and hits back with Power Gem for 78.5-92.5%.
- **vs Sylveon / Fairy.** Bring Gholdengo. Make It Rain OHKOs Sylveon (101.1-120.3%). Sylveon's Hyper Beam OHKOs Lucario (153.1-180.3%), so do not leave Lucario in front of it unprotected.
- **vs Pelipper rain.** Bring Rillaboom and Gholdengo, and leave Talonflame and Incineroar behind; Weather Ball KOs both.
  - Rillaboom takes Weather Ball for 33.3-39.1%. Its Grassy Wood Hammer does 124.1-148.2% to Pelipper, which has a Focus Sash, so double into it.
  - Gholdengo's Power Gem does 129.2-154% (also Sash-blocked).
  - Dragonite takes Weather Ball for 12.6-15.2%.

## Threat table (two answers per top threat)

| Threat (usage) | Answer 1 | Answer 2 | Notes |
|---|---|---|---|
| Rillaboom 37.18% | **Talonflame**: Gale Wings Brave Bird **101.9-121.7% KO** at priority. Takes Wood Hammer for 28.8-33.7% and is immune to High Horsepower | **Incineroar**: Flare Blitz **101.4-119.8% KO**. Takes High Horsepower for 56.4-67.3% | At -1 both drop to 67.1-81.2% and 66.7-79.2%. Dragonite resists Grass and Ice Spinners it for 64.7-76.3% as a third answer. |
| Sneasler 34.29% | **Lucario Z**: moves first and Psychic does **186-221.7% KO**, or 127.4-150.3% at +1 SpD after the Seed. Takes Close Combat for 92.5-110.2% (10/16) | **Gholdengo**: immune to Close Combat, Dire Claw and Fake Out. Make It Rain 85.4-101.9% | Talonflame's priority Brave Bird does 189.8-224.8% KO. Rillaboom's High Horsepower does 110.8-131.2% KO. Dragonite takes Close Combat for 13.1-15.7%. |
| Incineroar 26.77% | **Lucario Z**: HH Aura Sphere **106.9-126.2% KO**, 71.3-84.2% alone. Aura Guard: takes Flare Blitz for 75.5-89.8% | **Rillaboom**: Fake Out plus High Horsepower 59.4-70.3%. Unboosted Aura Sphere plus Grassy Glide (20.3-23.8% in Grassy) closes the KO | Its Intimidate does not touch Lucario's special damage. |
| M-Salamence 23.15% | **Dragonite**: NMI Ice Spinner **105.9-126.3% KO**, 72-84.9% at -1, and **108.6-128% KO** with HH at -1. Multiscale: takes Double-Edge for 38.4-44.9% | **Gholdengo**: resists the Aerilate Double-Edge (45-52.7%). Power Gem 78.5-92.5% | Lucario takes Double-Edge for 66-78.2% and chips with Flash Cannon for 48.4-57%. |
| Kingambit 22.44% | **Lucario Z**: HH Aura Sphere **134.8-160.9% KO** through Chople Berry; 89.9-107.2% (6/16) alone. Takes Low Kick for 46.9-55.8% | **Incineroar**: Flare Blitz 79.2-93.7%. Takes Kowtow Cleave for 19.8-23.8% | Talonflame's Flare Blitz does 67.6-81.2%. Chople is used up on the first Fighting hit, so any follow-up KOs. |
| Indeedee-F 21.78% | **Incineroar**: immune to Expanding Force. Darkest Lariat 74.6-88.1% | **Rillaboom**: Grassy Surge overwrites the terrain on entry. Grassy Wood Hammer 91-108.5% (8/16) | Ghost moves do not touch it (Normal type). Talonflame's Brave Bird does 53.1-63.3%. |
| M-Golisopod 18.49% | **Incineroar**: Flare Blitz **131.9-158.2% KO**, 87.9-105.5% (4/16) at -1 | **Talonflame**: Flare Blitz **112.1-134.1% KO** | Dragonite walls it; every hit is under 19%. Golisopod's Close Combat is 15/16 on Lucario. |
| Garchomp 17.12% | **Dragonite**: immune to Earthquake. Ice Spinner **140-165.9% KO**, 93.5-111.4% (10/16) at -1 | **Rillaboom**: takes Earthquake for 21.3-25.6%, and its terrain halves Earthquake on Lucario (74.1-88.4%, or 51-61.2% at -1). Grassy Wood Hammer 96.8-114.6% (13/16) | Talonflame is also immune to Earthquake, but Rock Slide KOs it. |
| Sylveon 10.63% | **Gholdengo**: Make It Rain **101.1-120.3% KO**. Takes Hyper Beam for 53.8-63.9% | **Lucario Z**: HH Flash Cannon **111.9-132.2% KO**, 74.6-88.1% alone | Hyper Beam OHKOs Lucario (153.1-180.3%), so the Lucario answer needs Helping Hand and a turn where Lucario moves first, which it always does. |

## Spread justifications

- **Lucario Z: Timid 2 HP / 32 SpA / 32 Spe** (216 SpA, 223 Spe).
  - Speed: 223 outruns max-Speed Mega Alakazam and Mega Aerodactyl (222) and every board threat. 31 points (222) would only tie them.
  - SpA: the full 216 is needed. HH Aura Sphere on Incineroar is 106.9-126.2%, and the verdict showed the 184-SpA bulk spread falls to 89.1-106.9% (5/16). Flash Cannon on M-Froslass is 111.6-132%.
  - HP: the leftover 2 points go here. Aura Guard provides the physical bulk. There is no residual to tune, because it holds no Life Orb.
- **Incineroar: Adamant 32 HP / 22 Atk / 12 Def** (202 / 172 / 122).
  - Attack: 22 is the minimum for Flare Blitz to OHKO the #1 threat Rillaboom 16/16 (101.4-119.8%). 20 Atk is 15/16.
  - Defense: the remaining points let it survive Life Orb Jolly Garchomp's spread Earthquake (81.2-96.5%). 28 Atk would give 2/16 KO rolls.
  - Intimidated Sneasler's Close Combat does 66.3-80.2%.
- **Rillaboom: Brave 32 HP / 32 Atk / 2 Def** (207 / 194 / 94 Spe).
  - Nature: Brave with 0 Speed makes 94, slower than a neutral Indeedee-F (105) and Indeedee-M. On a simultaneous lead, Grassy Surge fires last and wins. It only ties a minimum-Speed Trick Room Indeedee (94).
  - Attack: 32 Atk plus Miracle Seed is what gets Grassy Wood Hammer to 13/16 on Garchomp and 8/16 on Indeedee-F.
  - HP: 207 HP heals 12 per turn in Grassy Terrain; 208 would be the next step at 13. HP is maxed anyway.
- **Talonflame: Adamant 10 HP / 32 Atk / 24 Spe** (163 HP, 146 Atk, 170 Spe).
  - Attack: 32 Atk is required for Brave Bird to OHKO Rillaboom. At 24 Atk it is 13/16, and Jolly is 10/16.
  - Speed: 24 Speed gives 170, enough to outrun Jolly Garchomp (169), M-Salamence (158) and Arcanine-H (156) once Gale Wings is off after taking damage.
  - HP: the remainder.
- **Gholdengo: Modest 7 HP / 2 Def / 32 SpA / 25 Spe** (169 HP, 203 SpA, 129 Spe).
  - HP: 169 takes 16 Life Orb recoil, and 170 would take 17.
  - Speed: 25 Speed gives 129, outrunning Timid max Pelipper (128), M-Baxcalibur (125) and Archaludon (123).
  - SpA: 32 is required for Make It Rain to OHKO Sylveon (101.1-120.3%, 16/16).
- **Dragonite: Adamant 32 HP / 32 Atk / 2 Def** (198 / 204 / 117, 100 Spe).
  - Attack: Never-Melt Ice plus 32 Atk is exactly what OHKOs M-Salamence (105.9-126.3%) at neutral.
  - Speed: in Tailwind, 0 Speed gives 200, above the 189 Speed tier, so no points go into Speed.
  - HP: max HP backs up Multiscale, which is still worth having after it breaks.

## Worst matchup (honest)

**Trick Room with Farigiraf (Armor Tail) and Indeedee-F (Follow Me), with slow physical hitters such as Kingambit, M-Golisopod and M-Tyranitar.**
- Under Trick Room, Lucario Z's 223 Speed makes it move last.
- Armor Tail blocks both Fake Outs and the whole priority package, which removes two of the three speed-control layers.
- The team has no Trick Room setter, no Taunt and no Imprison.
- The damage on Farigiraf is too low:
  - Lucario's HH Aura Sphere does only 62.6-73.4%.
  - Rillaboom's Grassy Wood Hammer does 82.9-97.7%, which is the best on the team, and Rillaboom (94) is the second-fastest member under Trick Room after Incineroar (80).
- The plan is to lead Rillaboom + Incineroar and double Farigiraf on turn 1. Fake Out still works on Indeedee-F if Farigiraf is not beside it. Otherwise, Protect and stall out Trick Room with Lucario.

**Pelipper rain is second-worst.**
- Weather Ball OHKOs Incineroar (112.9-133.7%) and Talonflame (173-203.7%), and hits Lucario 11/16.
- Pelipper's Focus Sash means it survives the first hit, so it has to be doubled.

Engine caveat: `MF_CONTACT` is missing Fake Out and Glaive Rush, so the true damage Z takes from those two moves is about half what the engine prints.
