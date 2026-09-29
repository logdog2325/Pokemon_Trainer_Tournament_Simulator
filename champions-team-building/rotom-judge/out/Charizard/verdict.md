# Rotom Judge verdict: Charizard (Mega X vs Mega Y), Reg M-C doubles

**Winner: Mega Y** (Charizardite Y)

| | Evidence /40 | Relevance /25 | Rebuttal /20 | Honesty /15 | **Total** |
|---|---|---|---|---|---|
| A: Mega X | 32 | 19 | 15 | 11 | **77** |
| B: Mega Y | 37 | 22 | 17 | 13 | **89** |

All numbers below come from `rotom-judge/engine.js`. The spreads are Jolly 2/32 Atk/32 Spe for X and Timid 2/32 SpA/32 Spe for Y, both on the 21-threat board. Spread moves include the x0.75 penalty.

## Checked claims

| Side | Claim | Holds | Engine result |
|---|---|---|---|
| A | +1, no item, 5 attacks (FB/DC/BB/TP/EQ): 17/21 OHKOs | yes | 17/21 |
| A | +1 Life Orb 21/21, +1 Helping Hand 21/21 (5 attacks) | yes | 21/21 and 21/21 |
| A | Recommended set (FB/DC/DD/Protect): "Helping Hand does the job of Life Orb (21/21 at +1)"; "21/21 still needs LO or HH" | **no** | FB/DC at +1: HH 20/21, LO 18/21 (misses Incineroar 5/16, Milotic 12/16, M-Tyranitar 58.9-69.6%) |
| A | Recommended set at +1, no item: 15/21 (rebuttal correction) | yes | 15/21 |
| A | +1 Speed 250; X is grounded | yes | 250; isGrounded X=true, Y=false |
| A | Rock Slide on X / Y: Garchomp 48.4-58.7 / 131-157.4 KO; Sneasler 37.4-45.2 / 100.6-121.3 KO; M-Ttar 74.8-89 / 196.1-234.8 KO; Arcanine-H 70.3-81.9 / 181.3-214.8 KO | yes | exact match |
| A | Golisopod Liquidation 45.8-54.2 (X) / 122.6-144.5 KO (Y); Pelipper rain Weather Ball 76.1-91 / 120-140.6 KO | yes | exact match |
| A | Sand: X at +0 11/21, X at +1 with LO 21/21; Y 11 in sand, 8 in rain | yes | 11, 21, 11, 8 |
| A | Heat Wave in sun without HH: 6/21; Sneasler 80.9-95.5, Archaludon 82.9-97.8, Rillaboom 7/16 | yes | exact match |
| A | +1 no item: Indeedee-F 105.6-125.4, M-Staraptor 108.1-128.6, Farigiraf 13/16, Garchomp Dragon Claw 151.9-178.4 | yes | exact match |
| B | Y in sun, only moves at 90% accuracy or better: 13/21; Overheat on Sneasler 147.8-174.5, on M-Staraptor 114.1-134.6 | yes | 13/21, same numbers (11 of the 13 are Overheat) |
| B | Heat Wave in sun + HH: 9 OHKOs (Rillaboom 136.2-162.3, Sneasler 121-143.3, Archaludon 124.3-146.4, ...) | yes | 9/21, exact match |
| B | X's spread moves with HH: EQ OHKOs only Sneasler and Arcanine-H; Rock Slide OHKOs nothing, best is 4/16 on M-Froslass | yes | EQ: Sneasler 122.3-145.2, ArcH 177.9-212.8; RS: M-Froslass 87.8-104.1 (4/16) |
| B | Rillaboom High Horsepower 68.4-81.3 (X) / immune (Y); Sneasler CC on Y 40.6-48.4; Whimsicott Moonblast 16.1-19.4 | yes | exact match |
| B | In sun: Pelipper Weather Ball on Y 20-23.2; Golisopod Liquidation 60.6-72.3 | yes | exact match |
| B | Intimidate: Sneasler Rock Slide on Y 67.1-80; Garchomp Rock Slide 87.1-103.9 (4/16) | yes | exact match |
| B | +1 FB/DC misses: Incineroar 68.3-81.2, Farigiraf 13/16, Milotic 73.3-86.6, Archaludon 6/16, Arcanine-H 11/16, M-Ttar 45.4-53.1; Pelipper 14/16 | yes | exact match |
| B | Garchomp Dragon Claw OHKOs X (105.8-125.8), and Garchomp (169) outspeeds X (167) | yes | 105.8-125.8% KO; Speeds 169 vs 167 |
| B | Solar Beam on Pelipper 77.4-91.2; Scorching Sands on Arcanine-H 130.2-153.5; Focus Blast on M-Ttar 131.4-156.5 | yes | exact match |

## Ruling

Mega Y wins because it hits hard from the turn it Mega Evolves, and Mega X has to survive a setup turn first.

**Turn-one damage.** On the set A recommended (Flare Blitz / Dragon Claw), Mega X at +0 OHKOs only **9/21** threats. Mega Y in its own sun OHKOs **13/21** using only moves at 90% accuracy or better. Even without Overheat, Y still OHKOs **10/21** with 100%-accurate Weather Ball, Solar Beam, Scorching Sands and Air Slash, with no drops. Neither advocate found that last figure; it removes most of A's objection to Overheat's Special Attack drop.

**Mega X's case.** A's numbers are real. Once X has used Dragon Dance, it reaches Speed 250 and OHKOs 15/21 with no item. It also takes Rock Slide at 37-59% from Sneasler and Garchomp, where the same attacks KO Y.

**Garchomp stops X's setup turn.** B showed that Garchomp (169 Speed) moves before X (167) and OHKOs it with Dragon Claw (105.8-125.8%). My own run adds that Garchomp's spread Earthquake also does **97.4-117.4% (15/16)** to X. X can't make Garchomp's attacks miss or redirect all of them, and Y is immune to Earthquake and takes Dragon Claw for only 70.3-83.9%.

**A's headline number was inflated.** "OHKOs the whole board" used five attacking moves. A corrected the no-item figure to 15 in its rebuttal but kept a 21/21 figure that is still wrong for the four-move set: 20/21 with Helping Hand and 18/21 with Life Orb.

**B conceded Y's real weaknesses honestly.** Y is OHKO'd by 8/21 threats on a neutral field and has a 4x Rock weakness. B then showed that Intimidate reduces Sneasler's Rock Slide on Y to 67-80%.

Neither side made an item or mechanic error. Minor loose points:
- B's "Intimidate halves Dragon Dance progress" is imprecise. Intimidate cancels the Attack boost and leaves the Speed boost.
- A's "51% of the board" adds up usage rates, which can't be summed as a share of teams.

**Engine note.** The engine's accuracy table has no entry for Dragon Rush, so the fact sheet lists it at 100%. In the main-series games Dragon Rush is 75% accurate. The team builder should prefer Dragon Claw.

## Brief: Mega Charizard X (Charizardite X)

**Game plan:** Mega X is a single-target Dragon Dance sweeper. It needs one protected setup turn, then uses Speed 250 and +1 Attack to OHKO most of the board with Flare Blitz and Dragon Claw.
- Keep it grounded under Psychic Terrain, which stops priority from Fake Out, Sucker Punch and Extreme Speed.
- Use a redirector (Follow Me or Rage Powder) on the setup turn.
- It works on any weather, including sand and rain, where Y loses power.

**Lean into:**
- **After one Dragon Dance:** Speed 250 outspeeds every board threat (the fastest are 189) and every Mega in the game (the fastest is 223).
- **+1 FB/DC with no item:** OHKOs 15/21, including Rillaboom 207-245%, Sneasler 191-226%, Garchomp 151.9-178.4% with Dragon Claw, Indeedee-F 105.6-125.4%, M-Salamence 117-138% and M-Staraptor 108-129%.
- **With a boost at +1:** Helping Hand raises this to 20/21. Life Orb raises it to 18/21.
- **Rock resistance compared with Y:** Garchomp's Rock Slide does 48.4-58.7%, Sneasler's 37.4-45.2%, Arcanine-H's 70.3-81.9% and M-Tyranitar's in sand 74.8-89%.
- **Water hits are only neutral:** M-Golisopod's Liquidation does 45.8-54.2% and Pelipper's Weather Ball in rain 76.1-91%. Incineroar's Flare Blitz does 12.3-14.2%.
- **Weather does not matter:** In sand, X still OHKOs 11/21 at +0 and 21/21 at +1 with Life Orb (five-move pool).

**Must cover:**
- **Garchomp** (17.12% usage, Speed 169, faster than X at +0). Its Dragon Claw does 105.8-125.8% (KO) and its spread Earthquake 97.4-117.4% (15/16). Intimidate lowers Earthquake to 65.2-77.4% and Dragon Claw to 70.3-85.8%. Rough Skin also chips X when it hits Garchomp with Dragon Claw.
- **Rillaboom's High Horsepower:** 68.4-81.3%.
- **Sneasler** (faster than X): Close Combat does 60.6-72.3%.
- **M-Salamence's Dragon Claw:** 98.1-116.1% (14/16).
- **One-hit KOs:**
  - Archaludon's Draco Meteor: 174.2-206.5%.
  - Arcanine-H's Head Smash: 182.6-216.1%.
  - M-Baxcalibur's Glaive Rush: 166.5-197.4%.
  - Sylveon's Hyper Beam: 123.9-145.8%. Its Hyper Voice does 55.5-67.1%.
- **Intimidate** (Incineroar, 26.77%) cancels its Attack boost.
- **Threats it cannot OHKO even at +1 with no item:**
  - Incineroar: Dragon Claw 68.3-81.2%.
  - M-Tyranitar: 45.4-53.1%.
  - Milotic: 73.3-86.6%.
  - Archaludon: 6/16.
  - Farigiraf: 13/16.
  - Arcanine-H: 11/16.
  - Its Rock Slide and Earthquake spread damage is weak.
- **Trick Room** from Indeedee-F or Farigiraf reverses its Speed advantage.

**Partner ideas:**
- **Indeedee-F** for Follow Me and Psychic Terrain. This blocks Fake Out, Sucker Punch and Extreme Speed against grounded X, and can pass Helping Hand instead of X holding Life Orb.
- **Intimidate support** (Incineroar) to blunt Garchomp's Dragon Claw and Earthquake on the setup turn.
- **A fast Ice or Fairy attacker** to remove Garchomp and M-Salamence before X sets up.
- **A special Water or Fighting answer** to Incineroar, M-Tyranitar and Milotic, the threats X cannot OHKO.
- **Wide Guard or a Ground-immune partner** to deal with Garchomp's Earthquake.

## Brief: Mega Charizard Y (Charizardite Y)

**Game plan:** Mega Y is an immediate sun nuke. It Mega Evolves on turn one, which resolves after both sides' entry abilities, so its Drought takes the weather. It then fires Heat Wave, Overheat or Weather Ball at once, with no setup.
- Pair it with Intimidate and Fake Out to cover its 4x Rock weakness.
- Pair it with Helping Hand to turn Heat Wave into a double KO.
- Pivot out and back in to reset sun, since Drought re-fires on every switch-in.

**Lean into:**
- **Sun, only moves at 90% accuracy or better:** OHKOs 13/21 with no item. This includes Rillaboom 166-197%, Sneasler 147.8-174.5% (Overheat), Indeedee-F 104-122.6%, Farigiraf 14/16, Archaludon 149.7-177.3%, Arcanine-H 130.2-153.5% (Scorching Sands) and M-Staraptor 114.1-134.6%.
- **Without Overheat, still 10/21** with 100%-accurate Weather Ball and friends. Examples: Rillaboom 128.5-151.7% and Archaludon 116.6-137.6%.
- **Heat Wave in sun + Helping Hand:** OHKOs 9/21, hitting both targets: Rillaboom 136.2-162.3%, Sneasler 121-143.3%, Kingambit, Golisopod, Gholdengo, Whimsicott, Archaludon, M-Froslass and M-Metagross. Without Helping Hand, Heat Wave OHKOs 6/21.
- **Immune to Ground:** Rillaboom's High Horsepower and Garchomp's Earthquake do nothing.
- **Resisted hits:**
  - Sneasler's Close Combat: 40.6-48.4%.
  - Whimsicott's Moonblast: 16.1-19.4%.
  - Garchomp's Dragon Claw: 70.3-83.9%.
- **Sun also protects it from Water:**
  - Pelipper's Weather Ball: 20-23.2%.
  - M-Golisopod's Liquidation: 60.6-72.3%.
  - Solar Beam hits Pelipper back for 77.4-91.2%.

**Must cover:**
- **4x Rock weakness:**
  - Sneasler's Rock Slide (34.29% usage, faster than Y): 100.6-121.3%.
  - Garchomp's Rock Slide (faster than Y): 131-157.4%.
  - M-Tyranitar's Rock Slide: 196.1-234.8%.
  - Arcanine-H's Rock Slide: 181.3-214.8%, and its Head Smash 483-574%.
  - Gholdengo with Power Gem and Life Orb: 140.6-167.7%.
- **Intimidate helps only partly.** It brings Sneasler's Rock Slide down to 67.1-80%, but Garchomp's still KOs 4/16.
- **Other OHKOs:**
  - M-Salamence's Double-Edge: 116.1-136.8%.
  - M-Baxcalibur's Glaive Rush: 111-131.6%.
  - Archaludon's Electro Shot in rain: 91.6-108.4% (8/16).
- **Weather wars:** Tyranitar's Sand Stream and Pelipper's Drizzle reset weather for free on switch-in. Y drops to 11/21 OHKOs in sand and 8/21 in rain, so it has to pivot to re-set sun.
- **Walls it cannot OHKO:**
  - Incineroar: best hit 41.6-49%.
  - Milotic: Solar Beam 55.4-65.3%.
  - Garchomp: Dragon Pulse 70.3-83.2%.
  - M-Salamence: 66.7-78.5%.
  - M-Tyranitar without Focus Blast: Solar Beam 65.7-78.3%.
- **Move risks:** Overheat drops its Special Attack by two stages. Hurricane is 50% accurate in sun, and Focus Blast is 70%.

**Partner ideas:**
- **Incineroar** for Intimidate and Fake Out on the turn Y Mega Evolves. This covers the Rock Slides from Sneasler and Garchomp.
- **A Helping Hand user** to turn Heat Wave into the 9-KO spread.
- **Tailwind** from Whimsicott with Prankster. At Speed 334, Y outspeeds all 21 threats, including Sneasler and Garchomp.
- **Wide Guard** to block spread Rock Slide.
- **A Water or Fighting partner** to remove M-Tyranitar, Incineroar and Garchomp, which Y cannot OHKO.
- **A Rock-resistant pivot**, so Y can switch out and re-enter to reset Drought against sand or rain.
