# Rotom Judge verdict: Mega Raichu X vs Mega Raichu Y

Reg M-C doubles, Level 50. Every number below comes from `rotom-judge/engine.js` or `factsheets/Raichu.md`.

## Scores

| | Mega X (A) | Mega Y (B) |
|---|---|---|
| Evidence (40) | 21 | 33 |
| Relevance (25) | 20 | 20 |
| Rebuttal (20) | 14 | 15 |
| Honesty (15) | 8 | 11 |
| **Total** | **63** | **79** |

**Winner: Mega Raichu Y.**

## Checked claims

Spreads used:
- **Mega X (fact sheet):** Jolly 2 HP / 32 Atk / 32 Spe, holding Raichunite X. That gives 137 HP, 187 Atk, 115 Def, 115 SpD and 178 Spe.
- **Mega X (A's bulk spread):** Adamant 32 HP / 32 Atk / 2 Def. That gives 167 HP, 205 Atk, 117 Def and **130 Spe**.
- **Mega Y:** Timid 2 HP / 32 SpA / 32 Spe, holding Raichunite Y. That gives 137 HP, 75 Def, 212 SpA, 100 SpD and 200 Spe.

Two premises decide a lot here:
- **The Life Orb is illegal.** A Mega Raichu has to hold its Raichunite, so neither form can hold a Life Orb. Every "Life Orb X" number in A's case is a set that can't be built. B also accepted those numbers as correct.
- **Focus Sash.** On the board, Pelipper and Whimsicott hold a Focus Sash, so no single hit KOs either of them from full HP.

| Side | Claim | Engine result | Holds |
|---|---|---|---|
| A | Indeedee-F's Expanding Force on X: 48.2-56.9% in Psychic Terrain, 33.6-40.1% in Electric Terrain | Same | yes |
| A | Rillaboom's Wood Hammer on X: 108.8-129.2% in Grassy Terrain, 83.9-99.3% (0/16) in Electric | Same | yes |
| A | Bulk X (32/32/2 Adamant): Garchomp EQ 103-121.6%, M-Golisopod FI 75.4-89.2%, Sneasler CC 63.5-75.4%, Grassy Wood Hammer 87.4-103.6% (4/16) | All reproduce. This spread has **130 Spe**, not the 178 that point 6 uses. | yes (numbers) |
| A | "With Life Orb, X OHKOs 9 of 21" (Sneasler 171.3-201.3%, Gholdengo 108.9-130.2%, Sylveon 112.4-134.5%) | The rolls reproduce, but Mega X cannot hold a Life Orb. The count also includes Pelipper and Whimsicott, which hold Focus Sash. On the legal stone, the fact sheet has 6/21, which is 4 once the Sash holders are removed. | **no** |
| A | LO + HH Volt Tackle in Electric Terrain KOs Kingambit (110.1-130%), M-Salamence (114.5-136%) and M-Metagross (112.9-133.3%) | Illegal item. On the legal stone with HH: Kingambit 85-100% (1/16), M-Salamence 88.2-104.8% (5/16), M-Metagross 86.5-102.9% (2/16). None of these is a reliable KO. | **no** |
| A | Even at -1 after Intimidate, HH Volt Tackle KOs Indeedee-F in 12/16 rolls and Incineroar in 7/16 | Legal stone at -1 with HH: Indeedee-F 74-87% (0/16), Incineroar 70.3-84.2% (0/16) | **no** |
| A | HH Volt Tackle (legal stone) KOs Indeedee-F and Farigiraf | Indeedee-F 110.2-129.9% KO, Farigiraf 100-118.5% KO, Incineroar 105.4-125.7% KO (not claimed) | yes |
| A | "X survives Sneasler's Close Combat (78.8-92.7%), KOs it back with Volt Tackle (131.8-154.8%) and wins the exchange every time" | The damage numbers hold. But after Close Combat, X has 10-29 HP left. Volt Tackle's recoil on 157 damage dealt is 52 HP, so **X faints to its own recoil every time**. The result is a 1-for-1 trade, not a win. | **no** |
| A | Priority on Y: Grassy Glide 76.6-91.2%, Sucker Punch 79.6-94.2%, Incineroar Fake Out 21.9-26.3% (FO + GG 98.5-117.5%). The same pair does about 53-64% to X. | Same. On X: Grassy Glide 49.6-59.9% and Fake Out 14.6-17.5%. | yes |
| A | Garchomp is immune to Zap Cannon | IMMUNE | yes |
| B | Timid Mega Y has 200 Spe and outspeeds all 21 board threats. Jolly X has 178 and is outsped by Sneasler, Whimsicott and M-Froslass, and ties M-Staraptor. | Holds on the board spreads. Caveat: under Indeedee's Psychic Terrain, Sneasler's Psychic Seed triggers Unburden (378 Spe), which outspeeds Y. | yes (with caveat) |
| B | No-item Focus Blast OHKOs Archaludon (124.9-147%) and M-Tyranitar (131.4-156.5%). Surf OHKOs Arcanine-H (125.6-148.8%). | Same (fact sheet) | yes |
| B | HH Zap Cannon: Sneasler 137.6-161.1%, M-Salamence 104.8-124.2%, Gholdengo 114.2-135.5%, Milotic 124.8-148.5%, M-Froslass 122.4-144.9% | Same | yes |
| B | HH Focus Blast: Incineroar 104-123.3%, Kingambit 131.9-156.5% (Chople applied), M-Baxcalibur 115-136.9%. HH Alluring Voice on Garchomp 100.5-118.4%. HH Zap Cannon on Indeedee-F 13/16. | Same | yes |
| B | The Sneasler HH Zap Cannon KO holds in the Indeedee mode | That is not a claim B made, but it matters. After the Psychic Seed, Sneasler is at +1 SpD, and HH Zap Cannon does 91.7-108.9% (8/16). Unboosted it does 61.1-72.6%. | caveat |
| B | A's bulk spread has 130 Spe, and 9 board threats outspeed it | 130. Sneasler, Whimsicott, M-Froslass, M-Staraptor, Garchomp, M-Salamence, Arcanine-H, M-Metagross and Gholdengo = 9 | yes |
| B | "X's Life Orb + HH numbers are correct" and "X's plan uses up the team's one Life Orb" | The rolls reproduce, but B missed that the set is illegal. The recoil argument (about 60% HP spent to KO Kingambit) is moot, because X can't KO Kingambit on a legal item. | **no** |
| B | "Indeedee-F: Y paralyses it before Expanding Force goes off" | Zap Cannon does 64.4-76.3%. Paralysis halves Indeedee's Speed but does not stop it moving that turn, and Indeedee sets Trick Room anyway. | overstated |

## Ruling

Almost every damage roll either side cited reproduces. The case turns on which premises survived checking.

**A's damage case falls apart on items.** Points 4 and 5 (9 OHKOs, and the Helping Hand KOs on Kingambit, M-Salamence and M-Metagross) all need a Life Orb that Mega Raichu X can't hold. A's rebuttal claimed Helping Hand gives X "the same KOs" as Y. On the legal stone that is false:

| Target (HH, Electric Terrain) | X Volt Tackle | Y |
|---|---|---|
| Kingambit | 1/16 | KO (Focus Blast) |
| M-Salamence | 5/16 | KO (Zap Cannon) |
| M-Metagross | 2/16 | — |

A's line on Sneasler, "wins the exchange every time", ignores Volt Tackle recoil. X dies in that trade.

**A's real, proven points:**
- **Terrain denial.** Mega Evolving on turn 1 overwrites Grassy or Psychic Terrain.
  - Wood Hammer falls from a KO to 83.9-99.3%.
  - Grassy Glide loses priority.
  - Expanding Force drops to 33.6-40.1% and is no longer a spread move.
  - Fake Out works again.
- **Double the bulk.** X is OHKO'd by 5/21 board threats; Y by 11/21.
- **Priority punishes Y.** Grassy Glide + Fake Out does 98.5-117.5% to Y and about 53-64% to X. First Impression and Garchomp's EQ OHKO Y.

**B's case held.**
- Y moves first against the whole board on its standard spread.
- No Guard makes Zap Cannon guaranteed paralysis.
- Focus Blast covers the Steel and Dark walls that X can't touch (Archaludon, M-Tyranitar, Kingambit).
- Its Helping Hand KO list is all legal and correct. It reaches 3 of the top 5 threats (Sneasler, Incineroar, Kingambit) plus M-Salamence and Garchomp.
- B's best rebuttal was the Speed catch. A's bulk spread and A's 178-Speed spread are different Pokemon.

**B's weak spots:**
- It accepted A's illegal Life Orb numbers.
- It oversold "moves first on every set". Priority from Rillaboom, Kingambit, Incineroar, M-Golisopod and Arcanine-H ignores Speed, and so does an Unburden Sneasler under Psychic Terrain (378 Spe).
- It never answered Rillaboom. Wood Hammer does 165.7-196.4% to Y, and 127.7-151.1% even outside Grassy Terrain.

**What each form is for:**
- **Mega Y** is the better Mega. It hits harder across the board, has wider legal Helping Hand coverage, gives guaranteed Speed control, and costs nothing to hold as base Raichu. The Worlds 2026 reports confirm this, and they played it as support/speed control.
- **Mega X** is a narrower anti-terrain Fake Out lead. It is the better pick only if a team specifically needs to deny Rillaboom and Indeedee terrain.

## Team brief: Mega Raichu Y (winner)

**Game plan.** Lead base Raichu (Lightning Rod, Fake Out, Helping Hand available). Mega Evolve on the turn you choose; bulk is identical, so waiting costs nothing. Timid 32 SpA / 32 Spe (200 Spe). Moves: Zap Cannon / Focus Blast / Fake Out or Helping Hand / Protect. Alluring Voice or Surf go in the flex slot. Zap Cannon paralyses whatever it doesn't KO. A Helping Hand partner turns Y's hits into KOs across the top of the usage board. The Life Orb goes to a teammate.

**Lean into (proven):**
- 200 Spe outspeeds all 21 board threats on their standard spreads.
- Zap Cannon is 100% accurate under No Guard, so paralysis is guaranteed. Garchomp is the one target it can't touch (immune).
- No-item OHKOs:
  - Archaludon: Focus Blast, 124.9-147%
  - M-Tyranitar: Focus Blast, 131.4-156.5%
  - Arcanine-H: Surf, 125.6-148.8%
  - M-Staraptor: Zap Cannon, 140.5-166.5%
- No-item near-KOs:
  - Kingambit: Focus Blast, 87.9-104.3%
  - Sneasler: Zap Cannon, 8/16
- Helping Hand KOs, all guaranteed:

| Move | Target | Damage |
|---|---|---|
| Zap Cannon | Sneasler | 137.6-161.1% |
| Zap Cannon | M-Salamence | 104.8-124.2% |
| Zap Cannon | Gholdengo | 114.2-135.5% |
| Zap Cannon | Milotic | 124.8-148.5% |
| Zap Cannon | M-Froslass | 122.4-144.9% |
| Focus Blast | Incineroar | 104-123.3% |
| Focus Blast | Kingambit | 131.9-156.5% |
| Focus Blast | M-Baxcalibur | 115-136.9% |
| Alluring Voice | Garchomp | 100.5-118.4% |

  HH Zap Cannon on Indeedee-F is 13/16.

**Must cover** (11/21 board threats OHKO Y):
- **Rillaboom.** Wood Hammer does 165.7-196.4% in Grassy Terrain and 127.7-151.1% outside it. Grassy Glide is priority for 76.6-91.2%. Incineroar Fake Out + Grassy Glide does 98.5-117.5%.
- **Sneasler.** Close Combat does 120.4-142.3%. With Indeedee-F, its Psychic Seed gives Unburden (378 Spe, faster than Y) and +1 SpD. That drops HH Zap Cannon to 8/16 and unboosted Zap Cannon to 61.1-72.6%.
- **Garchomp.** Earthquake does 193.4-229.9%, and Garchomp is immune to Zap Cannon.
- **Priority that ignores Y's Speed:**
  - M-Golisopod First Impression: 143.1-168.6%
  - Kingambit Sucker Punch: 79.6-94.2% (Kowtow Cleave is 12/16)
  - Arcanine-H Extreme Speed: 64.2-75.9% (Head Smash: 177.4-210.9%)
- **Other OHKOs and near-OHKOs:** Incineroar Flare Blitz (13/16), M-Salamence Dragon Claw (11/16), Archaludon Draco Meteor, M-Baxcalibur Glaive Rush, M-Metagross Zen Headbutt, M-Tyranitar Crunch, M-Staraptor Close Combat.
- **Trick Room** from Indeedee-F and Farigiraf turns Y's Speed around.
- **No Guard works both ways.** Blizzard, Rock Slide, Hurricane and Draco Meteor always hit Y.
- **Fake Out** from Incineroar or Sneasler cancels the Helping Hand turn.
- **Focus Sash** on Pelipper and Whimsicott stops single-hit KOs.

**Partner ideas:**
- **Indeedee-F** (Follow Me + Helping Hand + Psychic Surge). Y is grounded, so Psychic Terrain blocks Grassy Glide, Sucker Punch, Fake Out, First Impression and Extreme Speed against it. Indeedee-F also redirects Close Combat and Wood Hammer. Caveat: your own Psychic Terrain also triggers an enemy Sneasler's Psychic Seed (Unburden, +1 SpD).
- **Intimidate Incineroar** (Fake Out + Helping Hand). It blunts Rillaboom, Kingambit, Sneasler and M-Golisopod, and its Fire typing checks Rillaboom.
- **Levitate Rotom-Wash or Hydreigon** (both learn Helping Hand) as the Garchomp answer and Ground immunity. Rotom-Wash also hits Garchomp and Arcanine-H.
- **Maushold** (Friend Guard + Follow Me + Helping Hand) to patch Y's bulk.
- A **Trick Room answer**: Taunt, a Fake Out on the setter, or Imprison.
- A **Rillaboom answer**: Fire or Flying attacker, or Intimidate.
- A **Life Orb physical attacker** for Garchomp and Rillaboom.

## Team brief: Mega Raichu X

**Game plan.** Anti-terrain Fake Out lead, holding Raichunite X. It **cannot** hold a Life Orb. Jolly 2 HP / 32 Atk / 32 Spe (178 Spe). Moves: Fake Out / Volt Tackle / Protect, plus Helping Hand, Electroweb or Brick Break/Iron Tail. Mega Evolve turn 1: Electric Surge overwrites Rillaboom's Grassy Terrain and Indeedee-F's Psychic Terrain before anyone moves. That kills Grassy Glide priority, un-spreads and weakens Expanding Force, restores Fake Out, and re-fires on every switch-in. Do **not** use the 32 HP / 32 Atk / 2 Def bulk spread: it drops X to 130 Spe, outsped by 9 board threats, and still loses to Garchomp's EQ.

**Lean into (proven):**
- **Terrain denial:**
  - Indeedee-F's Expanding Force drops from 48.2-56.9% to 33.6-40.1%, and it is no longer spread.
  - Rillaboom's Wood Hammer drops from 108.8-129.2% (KO) to 83.9-99.3% (0/16).
  - Grassy Glide drops from 49.6-59.9% to 38-46% and loses its priority.
- **Bulk:** only 5/21 board threats OHKO X.
  - Sneasler Close Combat: 78.8-92.7%
  - Incineroar Flare Blitz: 63.5-75.2%
  - M-Salamence Dragon Claw and Kingambit Kowtow Cleave: 62-74.5% each
  - Sucker Punch: 51.1-61.3%
  - Fake Out: 14.6-17.5%
- **No-item OHKOs in its own terrain:** Sneasler 131.8-154.8%, Milotic 150.5-177.7%, M-Froslass 124.5-146.9%, M-Staraptor 149.2-177.3%.
- **Helping Hand Volt Tackle KOs (legal stone):** Indeedee-F 110.2-129.9%, Incineroar 105.4-125.7%, Farigiraf 100-118.5%, Gholdengo 126-150.3%, Sylveon 129.9-155.4%.
- **Speed:** 178 outspeeds 17/21 board threats, including Garchomp (169) and M-Salamence (158).

**Must cover:**
- **Garchomp.** Earthquake does 127-149.6% (103-121.6% even on the bulk spread).
- **Other threats that OHKO or nearly OHKO X:**
  - Sylveon Hyper Beam: 127-151.1%
  - Arcanine-H Head Smash: 116.8-137.2%
  - M-Baxcalibur Glaive Rush: 107.3-127%
  - M-Golisopod First Impression (priority): 9/16
  - Archaludon Draco Meteor: 7/16
- **Rillaboom** still KOs X if X hasn't Mega Evolved yet (Grassy Wood Hammer, 108.8-129.2%).
- **Walls it can't break:**
  - Archaludon: 39.8-47.5%
  - M-Tyranitar: 59.9-71.5%
  - Kingambit: 56.5-66.7%, and only 1/16 even with Helping Hand
  - M-Salamence: 58.6-69.9%, 5/16 with Helping Hand
  - M-Metagross: 2/16 with Helping Hand
  - Rillaboom: 36.7-43.5%
- **Intimidate** kills its Helping Hand KOs. At -1, Indeedee-F takes 74-87% and Incineroar 70.3-84.2%.
- **Volt Tackle recoil.** Trading with Sneasler costs X its life: after Close Combat it has 10-29 HP left, and the recoil is 52 HP.
- **Faster threats:** Sneasler (189, or 378 with Unburden), Whimsicott (184) and M-Froslass (189) outspeed it, and M-Staraptor (178) ties.
- **Trick Room** from Indeedee-F and Farigiraf.

**Partner ideas:**
- A **special Steel/Dark breaker** for Archaludon, M-Tyranitar and Kingambit. It should use Fighting or Ground coverage and carry the team's **Life Orb**.
- **Intimidate Incineroar** for Garchomp, M-Salamence and Kingambit. Its Fire typing also handles Rillaboom.
- A **Levitate Helping Hand partner** (Rotom-Wash or Hydreigon) as the Ground immunity, so Garchomp's EQ is a one-target problem.
- **Prankster Whimsicott** (Tailwind + Helping Hand) to flip the 4 faster threats and push back against Trick Room.
- A **physical answer to Kingambit and M-Salamence**. X can't KO either even with Helping Hand.
- Electric Terrain also blocks sleep for grounded allies. Avoid a partner that needs Psychic or Grassy Terrain.
