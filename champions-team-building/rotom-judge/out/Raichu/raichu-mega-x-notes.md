# Mega Raichu X team, Reg M-C doubles

Paste: `out/Raichu/raichu-mega-x.txt`. Running `node validate.js out/Raichu/raichu-mega-x.txt --require "Raichu:Mega X"`
printed "LEGAL: all checks passed." Every number below comes from `rotom-judge/engine.js` against the 21-threat board
spreads, with spread moves at x0.75. ET = our Electric Terrain (after Raichu Mega Evolves), HH = Helping Hand,
-1 = after our Intimidate. The debate verdict (Y wins 79-63) stands. This is the best team found for X, not a claim that X beats Y.

| Slot | Set | Final stats |
|---|---|---|
| Raichu @ Raichunite X | Jolly 8 HP / 32 Atk / 26 Spe. Fake Out, Volt Tackle, Helping Hand, Protect (Lightning Rod before it Mega Evolves) | 143/187/115/99/115/171 (Mega X) |
| Sneasler @ Electric Seed | Jolly 2 HP / 32 Atk / 32 Spe, Unburden. Close Combat, Gunk Shot, Fake Out, Protect | 157/182/80/54/100/189 (378 after the Seed) |
| Incineroar @ Sitrus Berry | Impish 32 HP / 2 Atk / 32 Def, Intimidate. Fake Out, Flare Blitz, Parting Shot, Taunt | 202/137/156/90/110/80 |
| Hydreigon @ Expert Belt | Timid 7 HP / 32 SpA / 27 Spe, Levitate. Draco Meteor, Dark Pulse, Flamethrower, Tailwind | 174/112/110/177/110/159 |
| Gholdengo @ Life Orb | Modest 7 HP / 2 Def / 32 SpA / 25 Spe, Good as Gold. Make It Rain, Shadow Ball, Focus Blast, Protect | 169/72/117/203/111/129 |
| Milotic @ Leftovers | Modest 32 HP / 14 Def / 20 SpA, Competitive. Scald, Ice Beam, Icy Wind, Protect | 202/72/113/154/145/101 |

## Game plan

Raichu X is the team's field controller. It is not the main damage dealer: on its stone it cannot KO Kingambit,
M-Salamence or M-Metagross even with Helping Hand.

1. **Mega Evolve on turn 1.** Electric Surge fires before anyone moves. It overwrites Rillaboom's Grassy Terrain
   (Wood Hammer on X drops from 104.2-123.8% KO to 80.4-95.1%, and Grassy Glide loses priority) and Indeedee-F's
   Psychic Terrain (Expanding Force drops to 32.2-38.5% and hits one target). Fake Out works on grounded targets again.
   Electric Surge re-fires every time X switches back in.
2. **The terrain also arms Sneasler.** Electric Seed is consumed the moment ET goes up. That gives Sneasler +1 Def and
   doubles its Speed through Unburden (189 to 378), all before turn-1 moves resolve. This is the core of the team and
   the thing Y cannot do. At +1 Def Sneasler takes Kingambit Iron Head at 49.7-59.2%, Garchomp Dragon Claw at 57.3-68.2%
   and Incineroar Flare Blitz at 53.5-63.1%.
3. **X's Helping Hand turns the partners' near-misses into KOs.** HH Sneasler Close Combat takes Chople Kingambit from
   84.1-99.5% to 126.1-149.3% KO. HH Gholdengo Make It Rain does 128-152.9% to Sneasler, and HH Hydreigon Dark Pulse does
   129.9-154.8% to Indeedee-F. X's own HH Volt Tackle KOs Indeedee-F (110.2-129.9%), Incineroar (105.4-125.7%) and
   Farigiraf (100-118.5%) when its partner uses Helping Hand.
4. **Hydreigon (Levitate) and Milotic cover the Dragons X cannot:** Garchomp and M-Salamence. Incineroar's Intimidate
   brings Garchomp's Earthquake on X down to 81.8-97.9%.
5. **Gholdengo takes the Steel/Rock walls** (Kingambit, M-Tyranitar, Archaludon) with Focus Blast, and it is immune to
   Sneasler's whole moveset and to Fake Out.

## Speed control (independent layers)

1. **Fake Out on three members:** Raichu, Sneasler and Incineroar. None of them depends on the others. Under our own ET,
   nothing blocks it except Armor Tail (Farigiraf).
2. **Tailwind (Hydreigon).** Needs no terrain and no Mega. It flips the four board threats faster than X: Sneasler 189,
   M-Froslass 189, Whimsicott 184 and M-Staraptor 178.
3. **Icy Wind (Milotic).** A spread Speed drop that stays after Milotic faints. It takes Garchomp (169) to 112, below
   Hydreigon, Gholdengo and X.
4. **Unburden (Sneasler + Electric Seed).** This layer depends on Raichu's terrain, so it is not counted as independent
   of X. Layers 1-3 are independent of each other and of the Mega.

Against Trick Room: Incineroar's Taunt goes before Trick Room (-7 priority). Fake Out stops Indeedee-F, but not
Farigiraf (Armor Tail). Otherwise Protect and stall the five turns out. Parting Shot helps here too.

## Default bring-4 and leads

**Default four: Raichu, Sneasler, Incineroar, Gholdengo.**

- **Default lead: Raichu + Sneasler.** On turn 1 X Mega Evolves, ET goes up and the Seed fires (Sneasler at 378 Spe
  and +1 Def). X uses Fake Out on the bigger threat, and Sneasler uses Close Combat or Gunk Shot. On turn 2, X uses
  Helping Hand into Sneasler Close Combat for Kingambit (126.1-149.3% KO) or Incineroar (-1: 106.9-126.2% KO), or
  Volt Tackle on Sneasler, M-Froslass, Milotic, M-Staraptor or Pelipper (all OHKOs in ET).
  Incineroar and Gholdengo wait in the back: Intimidate cycling, and a Ghost/Steel switch-in to Close Combat.
- **Against Garchomp / M-Salamence:** bring Hydreigon and Milotic over Sneasler and Gholdengo (Garchomp's EQ OHKOs
  Sneasler at 159.2-188.5% and Gholdengo at 101.8-120.1%). Lead Raichu + Hydreigon: X uses Fake Out on Garchomp while
  Hydreigon uses Tailwind or Draco Meteor (161.1-190.8% on Garchomp, 152.2-181.7% on M-Salamence). Hydreigon's Levitate makes
  Garchomp's EQ a threat to X alone.
- **Against Indeedee-F / Farigiraf Trick Room:** Raichu + Incineroar lead. Mega Evolve on turn 1 (Expanding Force goes
  single-target), use Fake Out on Indeedee or Taunt the setter, and keep Hydreigon (immune to Expanding Force, Dark Pulse
  87-103%) in the back.
- **Against Rillaboom:** X's terrain removes Grassy Glide priority and the Grassy boost. Sneasler Gunk Shot does
  105.3-125.6% (80% accurate), and HH Incineroar Flare Blitz does 121.7-143.5%.
- **Against M-Golisopod teams:** Incineroar (Flare Blitz 105.5-125.3%) and Hydreigon (Flamethrower 115.9-137.4%). Intimidate brings First
  Impression on X down to 60.1-70.6%.

## Threat table (two answers each, engine numbers, ET field)

| Threat | Answer 1 | Answer 2 | Extra |
|---|---|---|---|
| Rillaboom | Sneasler Gunk Shot 105.3-125.6% KO (80% acc). It takes High Horsepower at 73.9-87.9% after the Seed | Incineroar: resists Grass (Wood Hammer 20.8-24.8%), Intimidate, Flare Blitz 81.2-95.7%, HH 121.7-143.5% KO | X's ET denies Grassy Glide priority and the Wood Hammer KO on X |
| Sneasler | Gholdengo: immune to CC, Dire Claw and Fake Out. Make It Rain 85.4-101.9%, HH 128-152.9% KO | Raichu Volt Tackle 131.8-154.8% KO (X is slower, 171 vs 189. It takes CC 75.5-88.8% first, and the recoil then KOs X; at -1, CC is 50.3-59.4% and X survives the recoil) | Our Sneasler at 378 outspeeds it and takes its CC at 32.5-38.9% at +1 Def |
| Incineroar | Sneasler CC 105-124.8% KO (-1: 71.3-84.2%, HH at -1: 106.9-126.2% KO) | Milotic: Competitive +2 Scald 101-118.8% KO (+0 50.5-60.4%) | Gholdengo Focus Blast 86.1-101.5%, HH 129.2-152.5% (70% acc). X HH Volt Tackle 105.4-125.7% KO |
| M-Salamence | Milotic Ice Beam 103.2-122.6% KO | Hydreigon Draco Meteor 152.2-181.7% KO, and it outspeeds (159 vs 158) | Gholdengo Make It Rain 65.1-77.4% |
| Kingambit | Gholdengo Focus Blast 110.6-130.4% KO (70% acc) | Sneasler CC 84.1-99.5% through Chople; with X's HH 126.1-149.3% KO | Hydreigon HH Flamethrower 99-118.4% (15/16). Its Kowtow Cleave does only 38.9-45.9% to +1 Def Sneasler |
| Indeedee-F | Raichu: ET overwrites its terrain, Fake Out lands again, HH Volt Tackle 110.2-129.9% KO | Hydreigon: immune to Expanding Force, Dark Pulse 87-102.8%, HH 129.9-154.8% KO | Incineroar Taunt stops its Trick Room |
| M-Golisopod | Incineroar Flare Blitz 105.5-125.3% KO; takes CC 83.7-99% | Hydreigon Flamethrower 115.9-137.4% KO (moves first unless it uses First Impression on turn 1) | X Volt Tackle 47.3-55.5% (HH 70.9-83.5%) |
| Garchomp | Milotic Ice Beam 110.3-129.7% KO; takes EQ at only 43.1-52% | Hydreigon Draco Meteor 161.1-190.8% KO; needs Tailwind or Fake Out first (Dragon Claw 113.8-134.5% on it, -1: 76.4-89.7%) | Intimidate: EQ on X -1 81.8-97.9%, on Gholdengo 66.3-79.9%. Icy Wind 49.7-60.5% |
| M-Tyranitar | Sneasler CC 139.1-164.3% KO | Gholdengo Focus Blast 165.7-196.1% KO (70% acc) | |
| Archaludon | Gholdengo Focus Blast 155.2-184% KO (70% acc) | Sneasler CC 92.8-109.4% (8/16) | Its Electro Shot is boosted by OUR ET; X resists it |
| Sylveon | Gholdengo Make It Rain 101.1-120.3% KO | Sneasler Gunk Shot 129.9-153.7% KO | Hyper Beam OHKOs X (121.7-144.8%) |
| M-Froslass / M-Staraptor / Pelipper / Milotic | X Volt Tackle KO: 124.5-146.9% / 149.2-177.3% / 402.2-478.1% / 150.5-177.7% | Gholdengo MIR 150.3-180.3% on Froslass; Hydreigon Draco Meteor 105.1-124.8% on Pelipper | |

## Spread justifications

- **Raichu, Jolly 8 HP / 32 Atk / 26 Spe (143/187/171).** Speed 26 gives 171. That outruns max-Speed Jolly
  Garchomp (169), Salamence (158), Arcanine-H (156) and Gholdengo (144). Speed 25 gives 170 and 24 gives 169 (a tie). The only board
  mon between 171 and the 178 max is M-Staraptor, which X would only tie at 178. Atk 32 is needed for the HH Volt Tackle KO on
  Farigiraf (100-118.5% exactly) and keeps Incineroar at 105.4-125.7% and Indeedee-F at 110.2-129.9%. The 8 HP (137 to 143) take
  M-Golisopod First Impression from 9/16 to 6/16, Archaludon Draco Meteor from 7/16 to 3/16 and Sneasler CC to 75.5-88.8%.
- **Sneasler, Jolly 2 HP / 32 Atk / 32 Spe (189, 378 after the Seed).** Before the Seed fires, 189 ties opposing
  Jolly Sneasler and outruns Whimsicott (184). After it fires, 378 ties a Psychic-Seed Unburden Sneasler and outruns
  anything short of a doubled 189. Atk 32 keeps the Chople Kingambit CC at 84.1-99.5% (28 Atk gives 82.1-98.6%) and Archaludon CC at 8/16
  (28 Atk gives 5/16). Gunk Shot on Rillaboom and CC on Incineroar are already KOs at 24 Atk, so Atk goes no higher than it needs.
- **Incineroar, Impish 32 HP / 2 Atk / 32 Def (202/137/156).** Chosen over the Careful 32/16/16 split. It survives Sneasler CC
  (78.2-93.1% vs 98-115.8% 13/16 on Careful), M-Golisopod CC (83.7-99% vs 103-122.3% KO) and Garchomp EQ (65.8-77.2%).
  2 Atk already OHKOs M-Golisopod with Flare Blitz (105.5-125.3%). The cost is special bulk: rain Pelipper Weather Ball
  KOs it (112.9-133.7%), so it doesn't stay in against Pelipper. Sitrus heals 50.
- **Hydreigon, Timid 7 HP / 32 SpA / 27 Spe (174/177/159).** Speed 27 gives 159, one point above Adamant M-Salamence (158)
  so Draco Meteor lands first (26 gives 158, a tie). It also outruns Arcanine-H (156). SpA 32 plus Expert Belt is what pushes Dark Pulse on
  Indeedee-F to 2/16 alone and 16/16 with HH, and Flamethrower on M-Golisopod to 115.9-137.4%. Draco Meteor would OHKO Garchomp
  and M-Salamence even at 20 SpA, but the other benchmarks need 32. The leftover 7 go into HP.
- **Gholdengo, Modest 7 HP / 2 Def / 32 SpA / 25 Spe (169/203/129).** Speed 129 outruns Pelipper (128), M-Baxcalibur (125)
  and Archaludon (123). HP stops at 169, where Life Orb recoil is 16 (170 HP would take 17). SpA 32 keeps Make It Rain on Sylveon at a KO
  (101.1-120.3%) and HH Make It Rain on Sneasler at 128-152.9%.
- **Milotic, Modest 32 HP / 14 Def / 20 SpA (202/154/101).** SpA 20 is the smallest investment that makes both Ice Beam on
  M-Salamence (103.2-122.6%) and +2 Scald on Incineroar (101-118.8%) guaranteed KOs. 16 SpA gives 15/16 and 13/16. The rest
  goes into bulk: 202 HP is the Leftovers step (12 per turn). It takes Garchomp EQ at 43.1-52% and M-Salamence Double-Edge at 76.7-91.1%.

Residuals: Gholdengo's Life Orb takes 16 per hit, and the Sitrus/Leftovers values are noted above. No slot sets sand, and
Raichu can't take recoil items. Volt Tackle recoil is 1/3 of damage dealt, so plan around it against Sneasler (see table).

## Worst matchups, stated honestly

1. **Garchomp + Sneasler or Kingambit.** Earthquake OHKOs Raichu (121.7-143.4%), Sneasler (159.2-188.5%) and Gholdengo
   (101.8-120.1%), which is three of the default four. Only Hydreigon, Milotic and Incineroar are safe from it, and
   Hydreigon is slower than Garchomp and loses to Dragon Claw. The plan is Intimidate plus Fake Out on Garchomp, then
   Hydreigon Tailwind and Draco Meteor, or Milotic Ice Beam. Against a Garchomp lead you are always spending turn 1 on it.
2. **Farigiraf Trick Room.** Armor Tail blocks all three Fake Outs on Farigiraf and its partner, so only Incineroar's
   Taunt stops the Room. Under Trick Room, Incineroar (80) and Milotic (101) are the only slow members.
3. **M-Metagross.** No member OHKOs it except Gholdengo Shadow Ball (106.4-127.5%) and Hydreigon Dark Pulse (3/16).
   Zen Headbutt OHKOs Sneasler.
4. **Opposing Mega Raichu Y / fast Electric attackers.** Our ET boosts their grounded Electric moves too, and this also applies to
   Archaludon Electro Shot (a Sneasler takes 78.3-93%).
5. **X itself on the damage race.** As the debate found, X's own damage is narrow. Without Helping Hand it OHKOs 6/21
   board threats, and Intimidate removes its HH KOs. The team relies on Sneasler, Gholdengo and Hydreigon for KOs.
   X's job is terrain, Fake Out and Helping Hand.
