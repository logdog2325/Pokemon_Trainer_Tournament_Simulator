# Rotom Judge: Mega Charizard X vs Mega Charizard Y

> **Winner: Mega Charizard Y** — Mega Charizard X **77** / Mega Charizard Y **89** (out of 100)

| | Mega Charizard X | Mega Charizard Y |
|---|---|---|
| Total | 77 | 89 |
| Evidence / Relevance / Rebuttal / Honesty | 32/40, 19/25, 15/20, 11/15 | 37/40, 22/25, 17/20, 13/15 |

Rubric: Evidence 40 (minus 5 per checked claim that fails), Relevance to the Reg M-C board 25, Rebuttal 20, Honesty 15.

---
## Round 1 — Opening arguments
### For Mega Charizard X
**Thesis:** Mega Charizard X is the better Mega for Reg M-C doubles. One Dragon Dance makes it faster than the whole board and able to OHKO every threat on it, all with 100%-accurate moves. It also takes Rock, Water and Electric hits neutrally where Mega Y breaks, and it does not need sun that the opponent can overwrite.

**1. One Dragon Dance OHKOs the whole board.** These are my engine runs: Jolly, 2 HP / 32 Atk / 32 Spe, moves Flare Blitz, Dragon Claw, Brick Break, Thunder Punch and Earthquake.
- At +1 with no item it OHKOs **17/21** threats (14 or more of 16 rolls).
- At +1 with Life Orb it OHKOs **21/21**.
- At +1 with Helping Hand and no item it also OHKOs **21/21**.

Every one of those moves is 100% accurate. Even at +0, Life Orb X OHKOs **15/21**, the same number Mega Y needs sun to reach.

**2. After one Dragon Dance it outspeeds everything.** Its Speed goes from 167 to **250**. The fastest threats on the board are Sneasler and M-Froslass at 189, and the fastest Megas in the game are 223 (Absol, Garchomp and Lucario Mega Z). The fact sheet lists five board threats faster than both Charizards at +0. At +1, X outspeeds all of them.

**3. It is not 4x weak to Rock.** These are from the fact sheet and my engine runs. Spread damage already includes the x0.75 doubles penalty.

| Attack | vs Mega X | vs Mega Y |
|---|---|---|
| Garchomp Rock Slide | 48.4-58.7% | 131-157.4%, KO |
| Sneasler Rock Slide | 37.4-45.2% | 100.6-121.3%, KO |
| M-Tyranitar Rock Slide | 74.8-89% | 196.1-234.8%, KO |
| Arcanine-Hisui Rock Slide | 70.3-81.9% | 181.3-214.8%, KO |

Sneasler (34.29% usage) and Garchomp (17.12%) are two of the most common Pokemon on the board. X survives their Rock Slide easily and can set up. Y dies to it.

**4. Water and Electric hits are only neutral on X.** These are my engine runs:
- M-Golisopod Liquidation: **45.8-54.2%** on X, **122.6-144.5% KO** on Y.
- Pelipper Weather Ball in rain: **76.1-91%** on X, **120-140.6% KO** on Y.

Over the whole board (fact sheet), X is OHKO'd by **6/21** threats and Y by **8/21**.

**5. Grounded is an advantage for X.** Mega X is grounded (engine `isGrounded` = true), so a Psychic Terrain partner blocks priority aimed at it. That covers Incineroar's Fake Out, Kingambit's Sucker Punch and Arcanine-Hisui's Extreme Speed, which are exactly what stop a setup turn. Mega Y is Flying, so terrain gives it nothing.

**6. X does not depend on weather.** Its power comes from Tough Claws (contact moves x1.3) and Attack boosts, not from a weather effect the opponent can replace.
- In sand from Tyranitar's Sand Stream, which is a base-form ability that resets for free, X still OHKOs **11/21** at +0 and **21/21** at +1 with Life Orb (my engine runs).
- Y's no-item OHKO count falls from **15 in sun to 11 in sand** (my engine runs), and each time Y resets sun it spends a switch.

**Team role and partners**

Mega X is a Dragon Dance sweeper, and the best partner is **Indeedee-F**. On the setup turn, Follow Me redirects single-target attacks away from X. Psychic Terrain blocks priority against grounded X and boosts Indeedee's own Expanding Force.

The recommended set is Charizardite X, Flare Blitz / Dragon Claw / Dragon Dance / Protect. A Helping Hand partner does the job of a Life Orb (21/21 at +1) without the recoil, which leaves the other item slot free under Item Clause.

X also fits sand or neutral-weather teams where Y would be fighting its own side's weather.

**Answering Mega Y's best point: "15/21 OHKOs with no item"**

That number (fact sheet) only holds in Y's own sun, and it depends on two unreliable moves:
- **Overheat** is 90% accurate and drops Y's Special Attack by two stages after one use. It provides most of those KOs: Rillaboom, Kingambit, Gholdengo, Whimsicott, Indeedee-F, Farigiraf and Archaludon.
- **Hurricane** is **50% accurate in sun** (`E.accuracy`). Three of the 15 KOs rely on it: Sneasler, Pelipper and M-Staraptor.

Discount for accuracy and the Special Attack drop, and Y's count falls well below 15. X at +1 has 17/21 KOs with no item and 21/21 with Life Orb, all at 100% accuracy and with no drops.

If the opponent's sun is replaced, Y falls to 11 KOs in sand and 8 in rain (my engine runs). Meanwhile Y loses to the Rock Slides that Sneasler and Garchomp, 51% of the board's combined usage, click on turn one.

Y hits hard in the right conditions. X hits every board threat for a KO after one setup turn and survives the moves that remove Y.

### For Mega Charizard Y
**Thesis:** Mega Charizard Y is the stronger Mega in Reg M-C. Drought gives it sun whenever it Mega Evolves or switches in. Sun raises its OHKO count on the usage board by more than a third. The same sun takes away the Water hits that were supposed to punish it. It also can't be touched by the Ground moves the top threats carry.

**1. It OHKOs more of the board, and more of the popular threats** (fact sheet, confirmed by my own engine runs). With no investment beyond Timid 32 SpA / 32 Spe in its own sun, Y OHKOs **15/21** board threats and X OHKOs **11/21**. Some of Y's 15 rely on 50% Hurricane or 70% Focus Blast, so count only moves at 90% accuracy or better. Y still OHKOs 13: Overheat in sun KOs Sneasler (147.8-174.5%) and M-Staraptor (114.1-134.6%) at 90% (my runs). Y alone OHKOs Indeedee-F (104-122.6%), Farigiraf (14/16), Archaludon (149.7-177.3%) and M-Staraptor, which together are **56.6% usage**. X alone OHKOs Garchomp and Pelipper, which are **30.2%**.

**2. Its spread damage is decisive.** X's physical spread moves do little (my run, Helping Hand on). Earthquake OHKOs only Sneasler and Arcanine-H. Rock Slide OHKOs nothing, with its best roll 4/16 on M-Froslass. Y's Heat Wave in sun with Helping Hand OHKOs **9 threats**, hitting both targets at once (my run, x0.75 spread applied): Rillaboom 136.2-162.3%, Sneasler 121-143.3%, Kingambit, M-Golisopod, Gholdengo, Whimsicott, Archaludon 124.3-146.4%, M-Froslass and M-Metagross. Rillaboom and Sneasler are the two most-used threats (37.18% and 34.29%). Y can remove both from one slot in one turn.

**3. It is immune to Ground, which blanks the top threat.** Y is ungrounded Fire/Flying. The most-used threat, Rillaboom (37.18%), hits X with High Horsepower for 68.4-81.3%. Against Y the same move is **IMMUNE** (my run). Garchomp's Earthquake is also immune. Sneasler's Close Combat does 60.6-72.3% to X but only **40.6-48.4%** to Y, which resists Fighting. Y also resists Fairy: Whimsicott's Moonblast does 16.1-19.4%.

**4. Sun protects it as well as powering it.** Two of the sheet's OHKOs on Y assume the opponent's field or a neutral field. In Y's own sun both stop being OHKOs (my runs):
- Pelipper's Weather Ball drops from 120-140.6% to **20-23.2%**, because it becomes a resisted Fire move.
- M-Golisopod's Liquidation drops from 122.6-144.5% to **60.6-72.3%**.

With sun up, Y is OHKO'd by **6/21**, the same count as X (fact sheet). Mega Evolution resolves after both sides' switch-in abilities (confirmed-facts.md). So a Pelipper lead does not win turn one. Pelipper has to switch out and back in to take the weather back, and Drought fires again every time Y re-enters.

**5. Its damage costs nothing and it keeps its bulk.** X's main moves are Flare Blitz, which has recoil, and Dragon Rush. The Stat line comes from its 159 base SpA (211 in-game at Timid 32) and it has 135 SpD, compared with X's 105 (fact sheet). The two forms have identical Speed (167) and identical HP (155).

**Team role and partners:** Y is a sun-based spread nuke. Its best partners are:
- **Whimsicott**, for Prankster Tailwind. Doubled Speed from 167 outspeeds all 21 board threats.
- **Incineroar**, for Fake Out and Intimidate while Y Mega Evolves on turn one.
- **A Helping Hand user**, which turns Heat Wave into the 9-KO spread shown above.

Solar Beam fires in one turn in sun, so Y also has an answer to Water types: 77.4-91.2% on Pelipper (my run).

**Pre-empting X's case, the 4x Rock weakness:** X's side will point to Rock Slide. Three things weaken that argument:
1. Rock Slide is 90% accurate and a spread move (x0.75).
2. Y outspeeds and OHKOs two of the Rock Slide users first: Arcanine-H with Scorching Sands (130.2-153.5%, 100% accuracy) and M-Tyranitar with Focus Blast (131.4-156.5%, 70% accuracy).
3. X has its own unavoidable weakness. Garchomp's Dragon Claw OHKOs X (105.8-125.8%), M-Salamence's Dragon Claw OHKOs it 14/16, and Sylveon and Archaludon OHKO it too. Dragon Claw is single-target and 100% accurate, and Tailwind and Wide Guard do nothing to stop it.

Both forms are OHKO'd by 6 threats while their own conditions hold. Only one of them also OHKOs 13-15 threats and can take two out in the same turn.

---
## Round 2 — Rebuttals
### Mega Charizard X responds
**Rebuttal for Mega Charizard X**

**1. The "9-KO Heat Wave" needs two conditions.** I re-ran it (Timid 32 SpA, sun, x0.75 spread applied). The 9 KOs only happen with sun and Helping Hand together. Without Helping Hand, sun Heat Wave OHKOs just **6/21**: Kingambit, M-Golisopod, Gholdengo, Whimsicott, M-Froslass and M-Metagross. It no longer OHKOs Sneasler (80.9-95.5%), Archaludon (82.9-97.8%) or Rillaboom, which is only 7/16.

Heat Wave is also 90% accurate against each target (`E.accuracy`), so a clean double KO lands about 81% of the time.

Y's plan also needs three partners in one partner slot: Whimsicott for Tailwind, Incineroar for Fake Out, and a Helping Hand user. Only one of them can be on the field with Y. I concede their Helping Hand numbers are correct, and that X's spread moves are weak. X is a single-target sweeper and I do not claim otherwise.

**2. "Y alone OHKOs Indeedee-F, Farigiraf, Archaludon and M-Staraptor" compares Y at +0 with X at +0.** X's whole plan is to use Dragon Dance first. After one Dragon Dance, X with no item OHKOs Indeedee-F with Flare Blitz (105.6-125.4%) and M-Staraptor (108.1-128.6%), and Farigiraf 13/16 of the time.

Y reaches those KOs with Overheat, which drops Y's Special Attack by two stages after one use. Y's accuracy-filtered figure of 13 therefore counts KOs that each cost the next attack.

I also need to correct my own opening. The 17/21 figure used five attacking moves. With the set I actually recommended (Flare Blitz / Dragon Claw / Dragon Dance / Protect), X at +1 with no item OHKOs **15/21**. That equals Y's in-sun figure, but every move is 100% accurate and nothing drops. The 21/21 figure still needs Life Orb or Helping Hand.

**3. Ground immunity: I concede most of this point.** I don't dispute these numbers:
- Rillaboom's High Horsepower does 68.4-81.3% to X and nothing to Y.
- Sneasler's Close Combat does 60.6-72.3% to X.
- Garchomp's Dragon Claw OHKOs X, and at +0 Garchomp (169) moves before X (167).

These hits do not OHKO X, though, except Garchomp's Dragon Claw. The Rock Slides are a different matter. Sneasler's and Garchomp's Rock Slides **KO Y** (100.6-121.3% and 131-157.4%), while X takes them at 37-59%. Sneasler outspeeds both forms at +0, so Y cannot remove it first.

After X's Dragon Dance, the Garchomp problem reverses. X moves first and OHKOs it with Dragon Claw (151.9-178.4%).

**4. Weather.** I concede that sun turns Pelipper's Weather Ball and M-Golisopod's Liquidation into non-KOs on Y, and that Drought re-fires whenever Y switches in. Even so, each weather reset costs Y a switch, and Sand Stream or Drizzle resets just as easily. X loses nothing when the weather changes.

**Why X still wins:** Y matches X's KO numbers only with sun, a Helping Hand partner, 90% moves and an Overheat drop, while X reaches 15/21 after one Dragon Dance with 100%-accurate moves on any field and survives the Rock Slides from Sneasler and Garchomp (51% combined usage) that KO Mega Y.

### Mega Charizard Y responds
**Rebuttal (Mega Charizard Y)**

**1. "One Dragon Dance OHKOs 21/21" needs five attacking moves on a four-move set.** X's side lists Flare Blitz, Dragon Claw, Brick Break, Thunder Punch and Earthquake as its attacks, but the set it recommends is Flare Blitz / Dragon Claw / Dragon Dance / Protect. I ran that set at +1 with no item. It OHKOs **15/21**:
- **Misses:** Incineroar (Dragon Claw 68.3-81.2%), Farigiraf (Flare Blitz 13/16), Milotic (73.3-86.6%), Archaludon (Flare Blitz 6/16), Arcanine-H (Dragon Claw 11/16) and M-Tyranitar (45.4-53.1%).
- **Pelipper** is a KO on only 14/16 rolls.
- **21/21 costs extra.** It needs a Life Orb or a Helping Hand partner on top of the setup turn. Helping Hand also uses up the turn that partner would spend on Follow Me.

So X's real count is 15 after a free turn. Y reaches 13 at 90% accuracy or better with no setup turn at all.

**2. The Dragon Dance turn is not free.** Garchomp's Speed is 169 and X's is 167, so Garchomp moves first. Its Dragon Claw OHKOs X at +0 (**105.8-125.8%**, my run). Follow Me can redirect that attack, but Garchomp can still hit X with Rock Slide or Earthquake instead.

The Indeedee-F plan has its own problem: Y OHKOs Indeedee-F in sun (104-122.6%). Psychic Terrain blocks priority, but it does nothing about the faster Sneasler, M-Froslass, Whimsicott or M-Staraptor.

X's "outspeeds everything" point depends on surviving the setup turn. Y already outspeeds 16 of the 21 threats with no setup, and Tailwind covers the rest.

**3. Rock Slide: I concede the raw numbers.** Unboosted Rock Slide from Sneasler (100.6-121.3%) and Garchomp (131-157.4%) OHKOs Y. This is Y's real weakness, and it is why Y wants Incineroar as a partner. With Intimidate applied (my runs):
- Sneasler's Rock Slide falls to **67.1-80%**, with no KO.
- Garchomp's Rock Slide falls to **87.1-103.9%**, a KO on 4/16 rolls.
- Rock Slide is also only 90% accurate.

X has the same kind of exposure: Garchomp's Dragon Claw OHKOs it, and Intimidate halves X's Dragon Dance progress.

**4. Further concessions:**
- On the fact sheet's neutral field, Y is OHKO'd by **8/21** threats to X's 6. My "6 in sun" number depends on Drought being active.
- Hurricane is 50% accurate in sun.
- Overheat's Special Attack drop is real.
- In sand, Y's count does fall to 11.

That is why I already counted only moves at 90% accuracy or better (13 KOs). Heat Wave is also on the set, and it has no Special Attack drop.

As for sand: Drought fires again every time Y switches in, and Mega Evolution resolves after the opponent's entry abilities. So a Tyranitar lead does not take the weather on turn one.

**5. Grounded status helps X in one way and hurts it in another.** Being grounded lets Psychic Terrain protect X from priority. It also leaves X open to Rillaboom's High Horsepower (68.4-81.3%) and Garchomp's Earthquake. The most-used threat can hit X hard, while Y is immune to both moves.

**Summary:** X's best case needs a free setup turn, a Life Orb or a partner's Helping Hand, and one more attacking move than it has room for. Even then it reaches 15 KOs. Y gets 13 accurate OHKOs from turn one, and Heat Wave with Helping Hand removes Rillaboom and Sneasler from the same slot in one turn.

Mega Charizard Y still wins because it does its damage immediately, to both targets, with no setup turn to survive, and its one real weakness (Rock Slide) is fixed by Intimidate.

---
## ⚖️ The Judge's Opinion
_Having heard both openings and both rebuttals, Rotom Judge rules on which Mega is better, and why._

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

### 🏆 Conclusion
**Rotom Judge rules that Mega Charizard Y is the better Mega** (Mega Charizard X 77, Mega Charizard Y 89).

Mega Y wins. On turn one, Y in its own sun OHKOs 13/21 board threats using only moves at 90% accuracy or better, and still 10/21 without Overheat (100%-accurate Weather Ball, Solar Beam and others). Mega X on its recommended Flare Blitz / Dragon Claw set OHKOs only 9/21 at +0. X's case is real but conditional. After one Dragon Dance it has Speed 250 and OHKOs 15/21 with no item, and it takes Rock Slide at 37-59% from Sneasler and Garchomp, where the same attacks KO Y. But Garchomp (169 Speed) outspeeds X at +0 and OHKOs it with Dragon Claw (105.8-125.8%), and its spread Earthquake also does 97.4-117.4% (15/16), so X's setup turn is not safe. A's headline 21/21 used five attacking moves. On the four-move set it is 20/21 with Helping Hand and 18/21 with Life Orb. B's numbers all held and its concessions (8/21 OHKO'd on a neutral field, the Rock weakness, and Intimidate reducing it to 67-80% from Sneasler) were accurate. Y is an immediate sun spread nuke: Heat Wave in sun with Helping Hand OHKOs 9/21 across both targets. X is a single-target Dragon Dance sweeper that fits sand, rain or neutral-weather teams and needs Follow Me, Psychic Terrain and Intimidate support.

---
## The judge checks the numbers
Every claim below was recomputed by the judge with the damage engine.

| side | claim | holds? | judge's number |
|---|---|---|---|
| A | +1 no item with 5 attacks (FB/DC/BB/TP/EQ) OHKOs 17/21; +1 Life Orb 21/21; +1 Helping Hand 21/21 | ✅ yes | 17/21, 21/21, 21/21 |
| A | Recommended FB/DC/DD/Protect set: Helping Hand does the job of Life Orb (21/21 at +1); 21/21 still needs LO or HH | ❌ no | FB/DC at +1: HH 20/21, LO 18/21 (misses Incineroar 5/16, Milotic 12/16, M-Tyranitar 58.9-69.6%) |
| A | Rock Slide on X vs Y: Garchomp 48.4-58.7 vs 131-157.4 KO; Sneasler 37.4-45.2 vs 100.6-121.3 KO; Arcanine-H 70.3-81.9 vs 181.3-214.8 KO | ✅ yes | exact match |
| A | Golisopod Liquidation 45.8-54.2 (X) / 122.6-144.5 KO (Y); Pelipper rain Weather Ball 76.1-91 / 120-140.6 KO | ✅ yes | exact match |
| A | Sun Heat Wave without HH OHKOs 6/21; Sneasler 80.9-95.5, Archaludon 82.9-97.8, Rillaboom 7/16 | ✅ yes | 6/21, exact match |
| A | Sand: X +0 11/21, X +1 LO 21/21; Y 11 in sand, 8 in rain; +1 Speed 250; X grounded | ✅ yes | 11, 21, 11, 8; Spe 250; isGrounded X true / Y false |
| A | +1 no item: Indeedee-F 105.6-125.4, M-Staraptor 108.1-128.6, Farigiraf 13/16, Garchomp Dragon Claw 151.9-178.4 | ✅ yes | exact match |
| B | Y in sun, only moves at 90% accuracy or better: 13/21; Overheat Sneasler 147.8-174.5, M-Staraptor 114.1-134.6 | ✅ yes | 13/21 (11 via Overheat); exact numbers; 10/21 without Overheat |
| B | Sun Heat Wave with Helping Hand OHKOs 9 (Rillaboom 136.2-162.3, Sneasler 121-143.3, Archaludon 124.3-146.4) | ✅ yes | 9/21, exact match |
| B | X spread with HH: EQ OHKOs only Sneasler and Arcanine-H; Rock Slide OHKOs nothing, best 4/16 M-Froslass | ✅ yes | EQ Sneasler 122.3-145.2, ArcH 177.9-212.8; RS M-Froslass 87.8-104.1 (4/16) |
| B | Rillaboom High Horsepower 68.4-81.3 on X, immune on Y; Sneasler CC on Y 40.6-48.4 | ✅ yes | exact match |
| B | In sun: Pelipper Weather Ball on Y 20-23.2, Golisopod Liquidation 60.6-72.3 | ✅ yes | exact match |
| B | Intimidate: Sneasler Rock Slide on Y 67.1-80, Garchomp Rock Slide 87.1-103.9 (4/16) | ✅ yes | exact match |
| B | +1 FB/DC misses Incineroar 68.3-81.2, Farigiraf 13/16, Milotic 73.3-86.6, Archaludon 6/16, Arcanine-H 11/16, M-Ttar 45.4-53.1; Garchomp Dragon Claw OHKOs X at +0 (105.8-125.8) and outspeeds 169 vs 167 | ✅ yes | exact match |

---
## The teams
### Built around Mega Charizard X
**Judge's brief.** Mega X is a single-target Dragon Dance sweeper. It needs one protected setup turn, then uses Speed 250 and +1 Attack to OHKO most of the board with Flare Blitz and Dragon Claw. Keep it grounded under Psychic Terrain, which stops priority from Fake Out, Sucker Punch and Extreme Speed. Use Follow Me or Rage Powder to redirect attacks on the setup turn. It fits sand, rain or neutral-weather teams, where Mega Y loses power. Prefer Dragon Claw over Dragon Rush: Dragon Rush is really 75% accurate even though the engine lists it at 100%.
- Lean into: After one Dragon Dance, Speed 250 outspeeds every board threat (the fastest are 189) and every Mega (the fastest is 223); At +1 with no item, Flare Blitz and Dragon Claw OHKO 15/21: Rillaboom 207-245%, Sneasler 191-226%, Garchomp 151.9-178.4%, Indeedee-F 105.6-125.4%, M-Salamence 117-138%, M-Staraptor 108-129%; At +1, Helping Hand raises the count to 20/21 and Life Orb to 18/21; Rock resistance compared with Y: Rock Slide from Garchomp does 48.4-58.7%, Sneasler 37.4-45.2%, Arcanine-H 70.3-81.9%, M-Tyranitar in sand 74.8-89%; Water hits are only neutral: M-Golisopod Liquidation 45.8-54.2%, Pelipper Weather Ball in rain 76.1-91%; Incineroar Flare Blitz does 12.3-14.2%; Weather does not matter: in sand X still OHKOs 11/21 at +0 and 21/21 at +1 with Life Orb
- Must cover: Garchomp (Speed 169, faster than X at +0): Dragon Claw 105.8-125.8% (KO) and spread Earthquake 97.4-117.4% (15/16); Intimidate lowers these to 70.3-85.8% and 65.2-77.4%; Rillaboom High Horsepower 68.4-81.3%; Sneasler (faster than X) Close Combat 60.6-72.3%; M-Salamence Dragon Claw 98.1-116.1% (14/16); OHKOs on X: Archaludon Draco Meteor 174-207%, Arcanine-H Head Smash 183-216%, M-Baxcalibur Glaive Rush 167-197%, Sylveon Hyper Beam 124-146%; Intimidate (Incineroar, 26.77%) cancels its Attack boost; Threats it cannot OHKO even at +1 with no item: Incineroar (68.3-81.2%), M-Tyranitar (45.4-53.1%), Milotic (73.3-86.6%), Archaludon (6/16), Farigiraf (13/16), Arcanine-H (11/16); Weak spread damage: with Helping Hand, Rock Slide OHKOs nothing and Earthquake OHKOs only Sneasler and Arcanine-H; Trick Room from Indeedee-F or Farigiraf reverses its Speed advantage
- Partner ideas: Indeedee-F for Follow Me and Psychic Terrain, which block priority against grounded X; it can pass Helping Hand instead of X holding Life Orb; Intimidate support (Incineroar) to blunt Garchomp on the setup turn; A fast Ice or Fairy attacker to remove Garchomp and M-Salamence; A special Water or Fighting attacker for Incineroar, M-Tyranitar and Milotic; Wide Guard or a Ground-immune partner against Garchomp's Earthquake; A Trick Room answer (Taunt or Imprison) against Indeedee-F and Farigiraf

**Indeedee-F's Psychic Terrain and Follow Me buy Mega Charizard X a Dragon Dance turn. At +1 Charizard runs 240 Speed and KOs most of the board. Weavile and Milotic remove Garchomp and M-Salamence, Incineroar brings Intimidate and Fake Out, and Gholdengo covers Kingambit, Tyranitar, Archaludon and the Fairies. Speed control is Dragon Dance, Icy Wind, two Fake Out users, and Taunt plus Trick Room against opposing Trick Room. Incineroar has no Knock Off in Champions, so it runs Throat Chop.**

Default bring-4: Charizard-X, Indeedee-F, Weavile, Incineroar. Default lead: Indeedee-F + Charizard. On turn 1, Charizard Mega Evolves and uses Dragon Dance while Indeedee uses Follow Me, with Psychic Terrain blocking priority. On turn 2, Charizard attacks at +1 (240 Speed) and Indeedee uses Helping Hand or Expanding Force. Against Garchomp or Sneasler, lead Weavile + Charizard: Weavile Fake Outs or uses Icicle Crash while Charizard sets up, and Indeedee stays in the back. Against Incineroar + Kingambit, bring Gholdengo. Against M-Salamence or Dragon-heavy teams, bring Milotic. Against Trick Room, bring Weavile (Taunt), Indeedee (to reverse Trick Room), Charizard and Gholdengo.

Legality: ✅ passed `validate.js`

```
Charizard @ Charizardite X
Ability: Blaze
Level: 50
EVs: 30 Atk / 10 Def / 26 Spe
Jolly Nature
- Flare Blitz
- Dragon Claw
- Dragon Dance
- Protect

Indeedee-F @ Colbur Berry
Ability: Psychic Surge
Level: 50
EVs: 32 HP / 32 Def / 2 SpD
Relaxed Nature
- Follow Me
- Helping Hand
- Expanding Force
- Trick Room

Incineroar @ Sitrus Berry
Ability: Intimidate
Level: 50
EVs: 32 HP / 2 Atk / 32 Def
Impish Nature
- Fake Out
- Flare Blitz
- Throat Chop
- Parting Shot

Weavile @ Focus Sash
Ability: Pressure
Level: 50
EVs: 2 HP / 32 Atk / 32 Spe
Jolly Nature
- Icicle Crash
- Knock Off
- Fake Out
- Taunt

Milotic @ Leftovers
Ability: Competitive
Level: 50
EVs: 32 HP / 14 Def / 20 SpA
Modest Nature
- Scald
- Ice Beam
- Icy Wind
- Protect

Gholdengo @ Life Orb
Ability: Good as Gold
Level: 50
EVs: 7 HP / 2 Def / 32 SpA / 25 Spe
Modest Nature
- Make It Rain
- Shadow Ball
- Focus Blast
- Protect
```
Full notes (threat table, spread justifications, worst matchup): `charizard-mega-x-notes.md`

### Built around Mega Charizard Y
**Judge's brief.** Mega Y is an immediate sun nuke. It Mega Evolves on turn one, which resolves after both sides' entry abilities, so its Drought takes the weather. It then fires Heat Wave, Weather Ball or Overheat at once, with no setup. Pair it with Intimidate and Fake Out to cover its 4x Rock weakness, and with Helping Hand to turn Heat Wave into double KOs. Pivot out and back in to reset sun, since Drought re-fires on every switch-in. Suggested set: Heat Wave / Weather Ball or Overheat / Solar Beam or Scorching Sands / Protect, Timid 32 SpA / 32 Spe.
- Lean into: In sun with only moves at 90% accuracy or better, Y OHKOs 13/21 with no item: Rillaboom 166-197%, Sneasler 147.8-174.5%, Indeedee-F 104-122.6%, Farigiraf 14/16, Archaludon 149.7-177.3%, Arcanine-H 130.2-153.5%, M-Staraptor 114.1-134.6%; Without Overheat it still OHKOs 10/21 with 100%-accurate Weather Ball, Solar Beam, Scorching Sands and Air Slash, with no Special Attack drop; Heat Wave in sun with Helping Hand OHKOs 9/21 across both targets, including Rillaboom 136-162% and Sneasler 121-143%; without Helping Hand it OHKOs 6/21; Immune to Ground: Rillaboom High Horsepower and Garchomp Earthquake do nothing; it resists Sneasler Close Combat (40.6-48.4%) and Whimsicott Moonblast (16.1-19.4%); Sun cuts Water damage: Pelipper Weather Ball does 20-23.2% and M-Golisopod Liquidation 60.6-72.3%; Solar Beam hits Pelipper for 77.4-91.2%
- Must cover: Rock Slide (4x): Sneasler 100.6-121.3% and Garchomp 131-157.4% (both faster than Y); M-Tyranitar 196-235%, Arcanine-H 181-215%; With Intimidate, Sneasler's Rock Slide falls to 67.1-80%, but Garchomp's still KOs 4/16; Arcanine-H Head Smash 483-574% (Arcanine-H is OHKO'd first by Scorching Sands); Gholdengo with Power Gem and Life Orb: 140.6-167.7%; M-Salamence Double-Edge 116.1-136.8%; M-Baxcalibur Glaive Rush 111-131.6%; Archaludon Electro Shot in rain 8/16; Weather wars: in sand Y OHKOs only 11/21 and in rain 8/21, and Tyranitar and Pelipper reset weather for free; Walls it cannot OHKO: Incineroar (41.6-49%), Milotic (55.4-65.3%), Garchomp (70.3-83.2%), M-Salamence (66.7-78.5%), M-Tyranitar without Focus Blast (65.7-78.3%); Overheat drops Special Attack by two stages; Hurricane is 50% accurate in sun and Focus Blast 70%
- Partner ideas: Incineroar for Intimidate and Fake Out on the turn Y Mega Evolves, covering Sneasler and Garchomp Rock Slide; A Helping Hand user to turn Heat Wave into the 9-KO spread; Prankster Whimsicott for Tailwind: at Speed 334, Y outspeeds all 21 threats; Wide Guard to block spread Rock Slide; A Water or Fighting partner for M-Tyranitar, Incineroar and Garchomp; A Rock-resistant pivot so Y can switch out and re-enter to reset Drought

**Mega Charizard Y sun offence: it Mega Evolves on turn one while Incineroar's Intimidate and two Fake Outs (Incineroar, Sneasler) cover its 4x Rock Slide weakness. Prankster Whimsicott gives Tailwind, Helping Hand and a Sunny Day to win back the weather. Garchomp (spamming Earthquake, which Charizard is immune to), Sneasler and Milotic (Ice Beam, Icy Wind) handle the walls Charizard cannot break.**

Default bring-4: The default four are Charizard-Mega-Y, Incineroar, Whimsicott and Garchomp. Lead Charizard with Incineroar: on turn 1 Charizard Mega Evolves while Incineroar uses Fake Out on the Rock Slide user, and Charizard fires Heat Wave or Overheat. On turn 2 Incineroar either uses Helping Hand on Heat Wave or Parting Shot to bring Whimsicott in for Tailwind. The alternative lead is Charizard with Whimsicott, for Prankster Tailwind or Helping Hand Heat Wave on turn one. Swap in by matchup: Milotic against dragons, and Sneasler against Kingambit, Incineroar or Tyranitar sand. Against sand or Hisuian Arcanine, lead Sneasler with Incineroar and keep Charizard in the back until the Rock user is gone.

Legality: ✅ passed `validate.js`

```
Charizard @ Charizardite Y
Ability: Solar Power
Level: 50
EVs: 8 HP / 32 SpA / 26 Spe
Timid Nature
- Heat Wave
- Overheat
- Solar Beam
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Level: 50
EVs: 32 HP / 8 Atk / 26 Def
Impish Nature
- Fake Out
- Flare Blitz
- Helping Hand
- Parting Shot

Whimsicott @ Focus Sash
Ability: Prankster
Level: 50
EVs: 2 HP / 32 SpA / 32 Spe
Timid Nature
- Tailwind
- Helping Hand
- Moonblast
- Sunny Day

Garchomp @ Life Orb
Ability: Rough Skin
Level: 50
EVs: 2 HP / 32 Atk / 32 Spe
Jolly Nature
- Earthquake
- Dragon Claw
- Stone Edge
- Protect

Sneasler @ White Herb
Ability: Unburden
Level: 50
EVs: 2 HP / 32 Atk / 32 Spe
Jolly Nature
- Fake Out
- Close Combat
- Gunk Shot
- Protect

Milotic @ Never-Melt Ice
Ability: Competitive
Level: 50
EVs: 32 HP / 26 Def / 8 SpA
Bold Nature
- Ice Beam
- Icy Wind
- Scald
- Protect
```
Full notes (threat table, spread justifications, worst matchup): `charizard-mega-y-notes.md`

