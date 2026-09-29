# Mega Charizard Y sun team (Reg M-C doubles)

Paste: `out/Charizard/charizard-mega-y.txt`. `validate.js --require "Charizard:Mega Y"` printed "LEGAL: all checks passed."
Every number below comes from `rotom-judge/engine.js`, run against the 21-threat Reg M-C board spreads in `engine.js`.
"HH" means with Helping Hand. "-1" means after our Intimidate. "sun" means our Drought is up.

| Slot | Set | Final stats |
|---|---|---|
| Charizard @ Charizardite Y | Timid 8 HP / 32 SpA / 26 Spe. Heat Wave, Overheat, Solar Beam, Protect | 161/111/98/211/135/160 (Mega Y, Drought) |
| Incineroar @ Sitrus Berry | Impish 32 HP / 8 Atk / 26 Def, Intimidate. Fake Out, Flare Blitz, Helping Hand, Parting Shot | 202/143/149/90/110/80 |
| Whimsicott @ Focus Sash | Timid 2 HP / 32 SpA / 32 Spe, Prankster. Tailwind, Helping Hand, Moonblast, Sunny Day | 137/78/105/129/95/184 |
| Garchomp @ Life Orb | Jolly 2 HP / 32 Atk / 32 Spe, Rough Skin. Earthquake, Dragon Claw, Stone Edge, Protect | 185/182/115/90/105/169 |
| Sneasler @ White Herb | Jolly 2 HP / 32 Atk / 32 Spe, Unburden. Fake Out, Close Combat, Gunk Shot, Protect | 157/182/80/54/100/189 |
| Milotic @ Never-Melt Ice | Bold 32 HP / 26 Def / 8 SpA, Competitive. Ice Beam, Icy Wind, Scald, Protect | 202/72/137/128/145/101 |

## Game plan

Charizard Mega Evolves on turn one. That happens after both sides' entry abilities, so Drought overwrites whatever weather they led with. It then fires at once, with no setup turn. In sun, with no item:
- **Heat Wave (spread)** OHKOs Kingambit 116.9-139.1%, Gholdengo 136.1-160.9%, M-Golisopod 200-237.4%, Whimsicott 194.2-229.2%, M-Metagross 115.8-136.8% and M-Froslass 144.2-171.4%. With **Helping Hand** it also OHKOs Rillaboom 136.2-162.3%, Sneasler 121-143.3% and Archaludon 124.3-146.4%.
- **Overheat (90%)** OHKOs Rillaboom 166.2-197.1%, Sneasler 147.8-174.5%, Indeedee-F 104-122.6%, Archaludon 149.7-177.3%, M-Staraptor 114.1-134.6% and Farigiraf 14/16.
- **Solar Beam** is the Water / Rock coverage move: Pelipper 77.4-91.2%, M-Tyranitar 65.7-78.3% and Milotic 55.4-65.3%.

The five partners each cover part of Charizard's must_cover list:
1. **Rock Slide (4x).** Incineroar's Intimidate drops Sneasler's Rock Slide from 96.9-116.8% (13/16) to 64.6-77%, and Garchomp's from a KO to 83.9-100% (1/16). Two Fake Outs (Incineroar, Sneasler) stop the Rock Slide user entirely on turn one. Charizard's 8 HP points are what took -1 Garchomp's Rock Slide from 4/16 down to 1/16.
2. **Helping Hand ×2 (Whimsicott with Prankster, Incineroar).** This turns Heat Wave into the 9-KO spread.
3. **Weather wars.** Prankster **Sunny Day** on Whimsicott gets sun back from Tyranitar or Pelipper without spending a switch. Charizard's Drought also re-fires every time Incineroar's Parting Shot or a Protect-and-switch brings it back in.
4. **The walls Charizard can't break.** Sneasler's Close Combat covers Incineroar (105-124.8%) and M-Tyranitar (139.1-164.3%). Milotic's Ice Beam covers M-Salamence (103.2-123.7%) and Garchomp (109.2-129.7%). Garchomp's Earthquake covers Arcanine-H (229.7-275%) and Gholdengo (103-121.3%). Charizard is immune to Earthquake, so Garchomp can spam it next to it.

## Speed control (independent layers)

1. **Prankster Tailwind (Whimsicott).** Under Tailwind, Charizard (320) and Milotic (202) outspeed all 21 board threats. It goes first even against opposing Tailwind setters that lack Prankster.
2. **Fake Out ×2 (Incineroar, Sneasler).** Either one alone buys Charizard its Mega turn.
3. **Icy Wind (Milotic).** A spread Speed drop that still works after Whimsicott has fainted.
4. **Unburden (Sneasler + White Herb).** White Herb is used up the first time Close Combat drops Sneasler's defenses, and Unburden then doubles its Speed from 189 to 378. The engine does not simulate item use, so this layer comes from the game rules, not an engine check.

**Caveat:** an opposing Indeedee's Psychic Terrain blocks Fake Out against its own grounded side, and it blocks Prankster moves that target grounded Pokémon. Tailwind targets our side, so it is not blocked. Charizard is not grounded, so opposing priority still reaches it in Psychic Terrain.

## Default bring-4 and leads

**Default four: Charizard, Incineroar, Whimsicott, Garchomp.** Back line is Garchomp and Incineroar.
- **Default lead: Charizard + Incineroar.** Turn 1: Mega Evolve. Incineroar uses Fake Out on the Rock Slide user (Sneasler or Garchomp) or on whatever outspeeds Charizard. Charizard uses Heat Wave, or Overheat into the single target it KOs. Turn 2: Incineroar uses Helping Hand on Heat Wave, or Parting Shot to bring in Whimsicott for Tailwind.
- **Alternative lead: Charizard + Whimsicott.** Prankster Tailwind plus a Mega Heat Wave on turn one, or Helping Hand Heat Wave when the opposing pair is Rillaboom / Sneasler / Archaludon.
- **Dragons (M-Salamence, Garchomp, M-Baxcalibur):** bring Milotic over Whimsicott.
- **Kingambit + Incineroar goodstuffs, or M-Tyranitar sand:** bring Sneasler over Garchomp. Sneasler's Close Combat plus Fake Out makes it the Tyranitar and Incineroar answer.
- **Rain (Pelipper + Archaludon):** Charizard, Whimsicott, Garchomp, Incineroar. Whimsicott's Sunny Day reclaims the weather, Garchomp's Stone Edge KOs Pelipper (108-129.2%, before its Sash), and Garchomp's Earthquake hits Archaludon.
- **Trick Room (Indeedee-F / Farigiraf):** Charizard, Sneasler, Incineroar, Garchomp. Overheat OHKOs Indeedee-F and does 14/16 to Farigiraf. Fake Out does not work into Psychic Terrain, so Charizard has to KO the setter before Trick Room goes up.

## Threat table (two or more answers each)

| Threat (usage) | Answer 1 | Answer 2 | Extra |
|---|---|---|---|
| Rillaboom (37.18%) | Charizard Overheat 166.2-197.1% KO (HH Heat Wave 136.2-162.3% KO) | Incineroar Flare Blitz (sun) 125.6-148.8% KO | Sneasler Gunk Shot 105.3-125.6% KO (80% acc). Charizard takes Wood Hammer for about 28-33% |
| Sneasler (34.29%) | Charizard Overheat 147.8-174.5% KO (HH Heat Wave 121-143.3% KO) | Garchomp Earthquake 159.2-188.5% KO | Incineroar Flare Blitz (sun) 116.6-137.6% KO. After Intimidate its Rock Slide does 64.6-77% to Charizard |
| Incineroar (26.77%) | Sneasler Close Combat 105-124.8% KO | Garchomp HH Earthquake 129.2-152.5% KO (86.1-101.5%, 2/16 without HH) | Fire-resistant, so Charizard only chips it (Overheat 41.6-49%) |
| M-Salamence (23.15%) | Milotic Ice Beam 103.2-123.7% KO | Whimsicott HH Moonblast 103.2-122.6% KO | Garchomp HH Dragon Claw 115.6-138.2% KO. Its Double-Edge does 64.4-75.2% to Milotic and 74.5-88.2% to Charizard at -1 |
| Kingambit (22.44%) | Charizard Heat Wave (sun) 116.9-139.1% KO | Incineroar Flare Blitz (sun) 99.5-118.8% (15/16) | Sneasler HH Close Combat 126.1-149.3% KO (84.1-99.5% into Chople Berry alone). -1 Kowtow Cleave does 41.6-49.1% to Charizard |
| Indeedee-F (21.78%) | Charizard Overheat 104-122.6% KO | Incineroar HH Flare Blitz (sun) 96.6-114.1% (13/16) | Otherwise a guaranteed two-hit: Heat Wave 56.5-66.7% + Flare Blitz 64.4-76.3%. **Thinnest answer on the table.** |
| M-Golisopod (18.49%) | Charizard Heat Wave (sun) 200-237.4% KO | Incineroar Flare Blitz (sun) 167-197.8% KO | Sun halves its Liquidation: 38.5-46.6% to Charizard at -1 |
| Garchomp (17.12%) | Milotic Ice Beam 109.2-129.7% KO | Garchomp Dragon Claw 101.1-119.5% KO (speed tie at 169) | Whimsicott HH Moonblast 108.6-128.1% KO. Its Earthquake does nothing to Charizard |
| Gholdengo (15.23%) | Charizard Heat Wave (sun) 136.1-160.9% KO | Garchomp Earthquake 103-121.3% KO | Incineroar Flare Blitz 150.3-177.5% KO |
| Pelipper (13.09%) | Garchomp Stone Edge 108-129.2% KO (80% acc; Sash) | Charizard Solar Beam 77.4-91.2% | Whimsicott Prankster Sunny Day reclaims the weather |
| Archaludon (9.98%) | Charizard Overheat (sun) 149.7-177.3% KO | Garchomp HH Earthquake 109.9-131.5% KO | Sneasler Close Combat 92.8-109.4% (8/16) |
| Arcanine-Hisui (9.38%) | Garchomp Earthquake 229.7-275% KO | Sneasler Close Combat 144.2-170.9% KO | Head Smash OHKOs Charizard even at -1 (309.9-368.3%), so Charizard must not stay in against it |
| M-Tyranitar | Sneasler Close Combat 139.1-164.3% KO | Charizard Solar Beam 65.7-78.3% + Garchomp EQ 56.5-67.6% | -1 Rock Slide in sand still OHKOs Charizard (126.7-151.6%) |

## Spread benchmarks

- **Charizard, Timid 8 HP / 32 SpA / 26 Spe.** Speed 160 outruns the board's M-Salamence (158), Jolly max Arcanine-H (156) and any neutral max base-100 Pokémon (152). That is as far as Speed goes without Tailwind: Garchomp (169) and Sneasler (189) are faster even at max, and Tailwind takes Charizard to 320. **SpA 32 is required:** Overheat on Indeedee-F is 104-122.6%, only 4% of margin, and Heat Wave on Kingambit is 116.9%. The 8 HP points (HP 161, up from 155) take -1 Garchomp Rock Slide from 4/16 to 1/16, Archaludon Electro Shot from 8/16 to 4/16, and Sneasler's +0 Rock Slide from a KO to 13/16.
- **Incineroar, Impish 32 HP / 8 Atk / 26 Def.** Def 149 survives Jolly max-Atk Sneasler Close Combat at 83.2-98% (0/16 KO), so Sitrus Berry activates and Incineroar keeps cycling Intimidate. M-Golisopod Close Combat is 87.6-103% (3/16). Atk 8 is the least that makes Flare Blitz in sun OHKO Kingambit 15/16 (4 Atk gave 12/16) and AV Rillaboom 16/16. It has 0 SpD because the special threats (Gholdengo, Archaludon) do 21-64% to it.
- **Whimsicott, Timid 2 HP / 32 SpA / 32 Spe.** Speed 184 ties opposing max-Speed Whimsicott for Prankster Tailwind / Sunny Day ordering. **SpA 32 is required:** HH Moonblast OHKOs M-Salamence 103.2-122.6% and M-Staraptor 103.8-123.2%, and 28 SpA falls to 15/16 on both.
- **Garchomp, Jolly 2 HP / 32 Atk / 32 Spe.** Speed 169 ties opposing Jolly Garchomp and outruns Charizard's 160. Atk 32 is required: Life Orb Dragon Claw into the board Garchomp is 101.1-119.5%, which leaves no room to trim. **Life Orb residual:** HP 185 loses 18 per attack, and 180-189 HP all lose 18, so the 2 HP points cost nothing.
- **Sneasler, Jolly 2 HP / 32 Atk / 32 Spe.** Speed 189 ties opposing Sneasler and M-Froslass. Atk 32 is required for Close Combat on Careful Incineroar (105-124.8%, 16/16) and for Gunk Shot on AV Rillaboom (105.3-125.6%).
- **Milotic, Bold 32 HP / 26 Def / 8 SpA @ Never-Melt Ice.** SpA 8 with Never-Melt Ice is the least that makes Ice Beam OHKO M-Salamence 16/16 (103.2-123.7%; 0-2 SpA only reaches 14/16). Garchomp is 109.2-129.7%. Def 137 survives unboosted Adamant M-Salamence Double-Edge (64.4-75.2%, so it lives to fire Ice Beam) and -1 Rillaboom Wood Hammer in Grassy Terrain (82.2-98%).

## Items

Charizardite Y, Sitrus Berry, Focus Sash, Life Orb, White Herb and Never-Melt Ice: six distinct items, all in `ITEMS`. The only Mega Stone is Charizardite Y.

## Worst matchup, honestly

**M-Tyranitar sand with a Rock Slide partner, or Hisuian Arcanine.** Tyranitar's -1 Rock Slide in sand still OHKOs Charizard (126.7-151.6%). Sand Stream re-fires on every switch-in, and sand only has to be up for the one turn Tyranitar attacks. Arcanine-H's Head Smash OHKOs Charizard through Intimidate (309.9-368.3%).

In these games Charizard is a backline cleaner, not a lead. Lead Sneasler + Incineroar with double Fake Out, Close Combat Tyranitar, and Earthquake Arcanine with Garchomp. Charizard comes in only after the Rock user is gone. Whimsicott's Sunny Day is the backup when Charizard has to come in against sand.

**Rain is the second-worst matchup.** In rain Overheat on Rillaboom falls to 55.1-64.7% and on Archaludon to 49.7-58.6%. Pelipper's Weather Ball OHKOs Charizard (115.5-135.4%), and Electro Shot in rain does 88.2-104.3% (4/16). So we need sun back before Charizard does anything: Prankster Sunny Day, or Charizard Mega Evolving after Pelipper is already in.

**Least-covered top threat: Indeedee-F.** Only Overheat OHKOs it. The second answer is 13/16 (HH Flare Blitz), and its Psychic Terrain turns off both our Fake Outs against its side.
