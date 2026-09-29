# Mega Garchomp sand team (Reg M-C doubles)

Paste: `out/Garchomp/garchomp-mega.txt`. `node validate.js out/Garchomp/garchomp-mega.txt --require "Garchomp:Mega"` printed "LEGAL: all checks passed."
Every number below comes from `rotom-judge/engine.js`, run against the 21-threat Reg M-C board spreads in `engine.js`.
Abbreviations: "HH" = with Helping Hand, "sand" = our sand is up, "-1" = after an opposing Intimidate. Spread moves include the x0.75 doubles penalty.

| Slot | Set | Final stats |
|---|---|---|
| Garchomp @ Garchompite | Jolly 2 HP / 32 Atk / 32 Spe. Earthquake, Rock Slide, Dragon Claw, Protect | 185/222/135/126/115/158 (Mega, Sand Force) |
| Hippowdon @ Smooth Rock | Impish 32 HP / 32 Def / 2 SpD, Sand Stream. Helping Hand, Protect, High Horsepower, Slack Off | 215/132/187/79/94/67 |
| Rotom-Heat @ Sitrus Berry | Modest 32 HP / 2 Def / 32 SpA, Levitate. Overheat, Electroweb, Will-O-Wisp, Protect | 157/76/129/172/127/106 |
| Aerodactyl @ Focus Sash | Jolly 31 HP / 12 Atk / 23 Spe, Unnerve. Tailwind, Rock Slide, Dual Wingbeat, Wide Guard | 186/137/85/72/95/190 |
| Tyranitar @ Chople Berry | Modest 32 HP / 12 Def / 22 SpA, Sand Stream. Ice Beam, Dark Pulse, Icy Wind, Protect | 207/138/142/150/120/81 |
| Corviknight @ Rocky Helmet | Impish 32 HP / 2 Atk / 32 Def, Mirror Armor. Brave Bird, Iron Head, Tailwind, Taunt | 205/109/172/65/105/87 |

The Paste writes Garchomp's ability as Rough Skin, its base ability. Mega Evolution replaces it with Sand Force, and the engine applies Sand Force automatically.

## Game plan

The team is a sand spread core with Earthquake-immune partners.
- **Setters.** Hippowdon sets sand with Sand Stream and uses Helping Hand on the same turn. At 67 Speed it is slower than every board weather setter (Pelipper 128, M-Tyranitar 91), so on a simultaneous lead its sand is written last and wins. Tyranitar is the second setter. Both are immune to sand chip.
- **The attacker.** Mega Garchomp spams 100%-accurate, spread Earthquake. Sand Force makes it x1.3 in sand.
  - Sand EQ alone OHKOs Sneasler (195.5-229.9%), Incineroar (104.5-123.8%), Gholdengo (124.9-147.9%) and Arcanine-H.
  - HH + sand EQ adds KOs on Kingambit (124.2-146.9%), Archaludon (135.9-161.3%), M-Froslass, M-Metagross and M-Tyranitar. Sylveon is a KO on 13/16 rolls.
  - Through Intimidate, HH + sand EQ still KOs Incineroar (104.5-123.8%), Sneasler, Gholdengo and Arcanine-H.
- **Earthquake-safe partners.** Rotom-Heat (Levitate), Aerodactyl and Corviknight (Flying) take no damage from our EQ. The Ground members' teammates are all Rock or Steel types, and Garchomp is a Ground type, so only Rotom-Heat takes sand chip (9 HP a turn).
- **Hippowdon's cost.** If Hippowdon stays in next to Garchomp, it either Protects or takes our EQ: 30.7-36.3% from sand EQ, 46-54.4% from HH sand EQ. Slack Off repairs that damage.
- **Tyranitar** is never on the field next to an attacking Garchomp unless it Protects. HH sand EQ OHKOs it (135.7-160.4%).

**Speed control. There are three independent layers:**
1. **Tailwind, from two setters.** Aerodactyl at 190 Speed is faster than every board threat, so its Tailwind goes up before Sneasler, M-Froslass or Whimsicott act. Corviknight is a bulky backup setter; Mirror Armor means Icy Wind and Scary Face bounce off it. Under Tailwind:
   - Garchomp has 316 Speed.
   - Tyranitar has 162, which beats M-Salamence 158 and Arcanine-H 156.
   - Rotom-Heat has 212, which beats all 21 board threats at their base Speed.
2. **Spread speed drops.** Rotom-Heat has Electroweb and Tyranitar has Icy Wind. Each drops both foes by one stage. Unlike Tailwind, the drop stays on the target after our setter faints.
3. **Rock Slide flinches.** Aerodactyl and Garchomp both run Rock Slide, and in Tailwind both move first. (This is flinch pressure, not true speed control.)

## Default bring-4 and leads

**Default four: Garchomp, Hippowdon, Rotom-Heat, Aerodactyl.**

- **Lead Hippowdon + Garchomp.** Turn 1, Garchomp Mega Evolves and uses EQ. Hippowdon either:
  - uses Helping Hand when the foes include one of the nine HH-sand KO targets, accepting 46-54.4% from our own EQ; or
  - uses Protect when sand EQ alone is enough (Sneasler, Incineroar at full Attack, Gholdengo, Arcanine-H).
- **Back line: Aerodactyl + Rotom-Heat.** Aerodactyl comes in for Tailwind and Wide Guard. Rotom-Heat comes in for Overheat on Steels and Grass types.
- **Versus rain (Pelipper) or snow (M-Froslass):** keep the Hippowdon lead. Its slower Sand Stream wins a simultaneous lead against Pelipper. M-Froslass Mega Evolves after entry abilities, so snow overwrites sand on turn 1. Answer that with:
  - Aerodactyl's Wide Guard, which blocks Blizzard and Icy Wind;
  - Rotom-Heat's Overheat, which OHKOs M-Froslass (142.9-168.7%);
  - bringing Hippowdon back in later to reset sand.
- **Versus Rillaboom:** lead Rotom-Heat + Corviknight, and keep Garchomp and Hippowdon in the back. See the worst-matchup section.
- **Versus Trick Room (Indeedee-F, Farigiraf):** bring Corviknight for Taunt and Tyranitar. Tyranitar is immune to Expanding Force and Psychic, and at 81 Speed it moves early under Trick Room.
- **Versus Dragons (M-Salamence, Garchomp):** bring Tyranitar (Ice Beam) with Aerodactyl's Tailwind.

## Threat table (top usage threats, two answers each)

| Threat | Answer 1 | Answer 2 | Also |
|---|---|---|---|
| **Rillaboom** (37.18%) | **Rotom-Heat.** Its 106 Speed beats Rillaboom's 105. Overheat does 89.9-107.2% (6/16), and 134.8-160.9% (KO) with HH. Rotom takes only 42-49.7% from Grassy Wood Hammer and is immune to High Horsepower. | **Corviknight:** Brave Bird does 64.7-76.3%, and Grassy Wood Hammer does only 12.2-14.1% to it. **Aerodactyl:** Dual Wingbeat does 54.1-65.7%, so Dual Wingbeat + Overheat is a KO. | Hippowdon survives Grassy Wood Hammer on 15/16 rolls (84.7-101.4%). Will-O-Wisp halves its attacks. |
| **Sneasler** (34.29%) | **Garchomp.** EQ OHKOs it in every tested condition: sand 195.5-229.9%, sand at -1 129.3-154.1%, sand with Grassy Terrain and HH 146.5-172.6%. | **Aerodactyl.** At 190 Speed it outspeeds Sneasler's 189, and Dual Wingbeat OHKOs it (101.9-122.3%). **Corviknight:** Brave Bird OHKOs it (118.5-138.9%), and Close Combat does only 35.1-41.5% to Corviknight. | Tyranitar's Chople Berry holds Close Combat to 84.1-99.5% (it survives). Garchomp takes 50.3-58.9% from CC. |
| **Incineroar** (26.77%) | **Garchomp.** Sand EQ does 104.5-123.8% (KO). At -1 from its Intimidate, HH sand EQ is still a KO at 104.5-123.8%. | **Hippowdon:** High Horsepower does 60.4-72.3%, so it finishes after Rock Slide chip (Garchomp 53-62.9%). **Corviknight:** Mirror Armor reflects Incineroar's Intimidate back onto it. | Rotom-Heat takes 24.8-32.5% from its hits. |
| **M-Salamence** (23.15%) | **Tyranitar.** Ice Beam OHKOs it (101.1-120.4%). Under Tailwind, Tyranitar's 162 Speed outspeeds Salamence's 158. | **Garchomp:** HH Dragon Claw OHKOs it (108.1-130.6%); unboosted Dragon Claw does 72-87.1%. The two are speed-tied at 158. | Corviknight takes only 24.4-29.8% from Double-Edge. Tyranitar's Icy Wind does 47.3-55.9%. |
| **Kingambit** (22.44%) | **Rotom-Heat:** Overheat OHKOs it (115.9-137.2%). Kingambit's Sucker Punch does 40.1-47.8% to Rotom. | **Garchomp:** HH sand EQ OHKOs it (124.2-146.9%); sand EQ alone does 83.1-98.1%. | Aerodactyl's Unnerve stops it eating its Chople Berry. |
| **Indeedee-F** (21.78%) | **Garchomp.** EQ is a spread move, so Follow Me cannot redirect it. Sand EQ does 53.7-63.8% in Psychic Terrain, and HH sand EQ does 80.2-96%. | **Tyranitar.** It is immune to Expanding Force, and Dark Pulse does 61-72.3%. | Corviknight's Taunt stops Trick Room. Rotom-Heat's Overheat does 56.5-66.7%. |
| **M-Golisopod** (18.49%) | **Rotom-Heat:** Overheat OHKOs it (200-237.4%). | **Corviknight** walls it: First Impression does 10.2-12.2% and Close Combat 37.6-44.4%, and Rocky Helmet punishes every contact hit. **Garchomp:** HH sand EQ does 51.6-61%, which pushes it past 50% and triggers Emergency Exit. | |
| **Garchomp** (17.12%) | **Tyranitar:** Ice Beam OHKOs it (105.9-125.4%). | **Garchomp:** HH Dragon Claw OHKOs it (141.1-167%); unboosted it KOs on 11/16 rolls. Rotom-Heat, Aerodactyl and Corviknight are all immune to its EQ. | It outspeeds our Garchomp (169 vs 158) outside Tailwind. Its LO Dragon Claw KOs our Garchomp on only 3/16 rolls. |

Other board threats:
- **Gholdengo:** Overheat 134.9-159.8% (KO); sand EQ 124.9-147.9% (KO).
- **Pelipper:** Electroweb 175.2-210.2%, but its Focus Sash holds. Garchomp's Rock Slide does 73.7-89.1%.
- **M-Froslass:** Overheat 142.9-168.7% (KO); Garchomp's sand Rock Slide 9/16; Tyranitar's Dark Pulse 78.9-93.9%.
- **Whimsicott:** Overheat 194.2-229.2%, but its Focus Sash holds.
- **Archaludon:** HH sand EQ 135.9-161.3% (KO).
- **M-Metagross:** Overheat 113.5-134.5% (KO).
- **Sylveon:** HH sand EQ 97.2-115.8% (13/16); Wide Guard blocks Hyper Voice.
- **M-Baxcalibur:** Garchomp's Dragon Claw 72.8-85.4%. Our Ice Beam does only 20.9-24.8% to it. Its Icicle Crash OHKOs our Garchomp, so Garchomp Protects or switches out against it.

## Spread justifications

- **Garchomp, Jolly 2/32/0/0/0/32.**
  - **Speed 158** outruns Arcanine-H 156, M-Metagross 148 and Gholdengo 144, and ties M-Salamence.
  - **Attack 222** is required for sand EQ to OHKO Incineroar (min roll 104.5%), for HH sand EQ to OHKO M-Tyranitar (101.9%), and for HH sand EQ at -1 to still OHKO Incineroar (104.5%). Every one of these has almost no margin, so Attack stays maxed.
  - **HP.** The last 2 points go into HP. Garchomp is immune to sand, and it holds its Mega Stone, so it takes no Life Orb recoil.
- **Hippowdon, Impish 32/0/32/0/2/0.**
  - **Speed 67** with no investment is slower than Pelipper 128 and M-Tyranitar 91, so it wins the weather write on a simultaneous lead.
  - **Defense.** 32 HP / 32 Def lets it survive Adamant AV Rillaboom's Grassy Wood Hammer on 15/16 rolls (84.7-101.4%). A 20 Def / 14 SpD split drops that to 7/16. Full Def also minimises our own HH sand EQ to 46-54.4%, against 48.8-58.1% on the split.
  - **What it gives up.** Pelipper's rain Weather Ball KOs it on any spread. Since Hippowdon's slower sand overwrites rain on the lead, that is accepted.
- **Rotom-Heat, Modest 32/2/32/0/0/0.**
  - **Speed 106** with 0 points outspeeds Rillaboom 105 (Adamant, 0 Speed) and Indeedee-F 105.
  - **Special Attack** is maxed because Overheat on AV Rillaboom is only 6/16 at max. Max SpA also gives clean OHKOs on Kingambit (115.9% min), Gholdengo and M-Metagross.
  - **Bulk.** 32 HP gives 157 HP, which takes 9 sand chip a turn; Sitrus Berry covers it. The 2 Def points reduce M-Golisopod's Liquidation to 93-109.6% (8/16).
- **Aerodactyl, Jolly 31/12/0/0/0/23.**
  - **Speed 190** (23 points) is the smallest investment that outspeeds Sneasler 189 and M-Froslass 189, which both run max Jolly/Timid.
  - **Attack 137** (12 points) is the smallest investment for Dual Wingbeat to OHKO Sneasler on 16/16 rolls (101.9-122.3%). 11 points gives only 13/16.
  - **HP.** The rest (31) goes into HP. Focus Sash handles the first hit, and Aerodactyl is immune to sand, so the Sash is never broken by chip.
- **Tyranitar, Modest 32/0/12/22/0/0.**
  - **Special Attack 150** (22 points) is the smallest investment for Ice Beam to OHKO M-Salamence on 16/16 rolls (101.1-120.4%). 20 points gives 15/16. It also OHKOs Garchomp (105.9-125.4%).
  - **Speed 81** with 0 points doubles to 162 under Tailwind, which outspeeds M-Salamence 158.
  - **Defense.** 12 Def with Chople Berry survives Jolly Psychic Seed Sneasler's Close Combat (84.1-99.5%). With those points in SpD instead it would be KO'd on 7/16 rolls. The same Def holds Kingambit's Low Kick to 63.8-75.4%.
- **Corviknight, Impish 32/2/32/0/0/0.**
  - **Defense.** Max HP and Def reduce Close Combat to 35.1-41.5% (Sneasler) and 37.6-44.4% (M-Golisopod). Arcanine-H's Flare Blitz KOs on only 1/16 rolls.
  - **Attack.** 2 Atk is enough for Brave Bird to OHKO Sneasler (118.5-138.9%) and break Whimsicott's Sash.
  - **Speed 87** with no investment; it is a Tailwind setter and does not need to move first.
  - **Sand.** Corviknight is a Steel type, so it is immune to sand chip.

## Worst matchup

**Rillaboom + Incineroar** is the worst matchup. They are the #1 and #3 usage threats and the most common pairing.
- **What it does to Earthquake.** Grassy Terrain halves EQ, and Intimidate cuts it again. HH sand EQ at -1 in Grassy Terrain does only 52-61.9% to Incineroar and 13-15.5% to Rillaboom.
- **Why sand can't fix it.** Hippowdon resets the weather, not the terrain.
- **The plan.**
  - Keep Garchomp in the back.
  - Lead Rotom-Heat + Corviknight: Overheat into Rillaboom, 134.8-160.9% with HH; Brave Bird for 64.7-76.3%; Mirror Armor bounces Intimidate; Will-O-Wisp on whichever physical attacker stays.
  - Bring Garchomp in only after Rillaboom is gone.
- **It stays hard.** Rillaboom's Fake Out plus Grassy Glide can pressure Rotom, and Incineroar can simply switch Rillaboom back in to re-set Grassy Terrain.

**Other honest weak points:**
- **Ice attacks into our Garchomp.** M-Froslass's snow comes from its Mega Evolution, so it overwrites our sand on turn 1. Blizzard then OHKOs Garchomp (164.3-196.8%), and so does M-Baxcalibur's Icicle Crash (190.3-227%). Wide Guard only covers the spread Blizzard. The single-target Icicle Crash has to be played around with Protect or a switch.
- **Special Normal and Fairy hits.** Sylveon's Hyper Beam OHKOs Garchomp (188.1-224.3%), and so does Archaludon's Draco Meteor (134.1-158.9%). Both are single-target.
- **M-Staraptor (8.94%)** has no clean answer: Electroweb 53-62.7%, HH sand Rock Slide 41.1-49.7%. Corviknight walls it (Brave Bird 16.1-19%, Close Combat 32.7-38.5%).
- **Rotom-Heat's weak spots.** Rain Weather Ball KOs it through Sitrus, and Arcanine-H's Head Smash OHKOs it.
