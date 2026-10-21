# Rotom Judge: Mega Greninja vs Ash-Greninja

> **Hypothetical debate.** Ash-Greninja is not in Pokémon Champions. Mega Greninja is real Champions data; Ash-Greninja is a what-if using its Gen 7 Battle Bond transformation with Champions Greninja's moves. Every other Pokémon, item and rule is real Champions data.

**The ruling:** Rotom Judge ruled that **Ash-Greninja** is the better form. Final score: Mega Greninja 78, Ash-Greninja 70 (out of 100).

## What this is
Rotom Judge is an experiment in settling a Pokémon argument with evidence. Some Pokémon have two competing
super-forms (two Mega Evolutions, or a Mega against a special battle form), and players argue about which is better. For
each one, two AI advocates each argued for one form. They were not allowed to rely on memory: every claim had to come from a damage calculator
built for Pokémon Champions, and they could run new calculations. Each advocate gave an opening argument, then read the
other side's opening and wrote a rebuttal. An impartial AI judge then recomputed the disputed numbers itself, scored
both sides, wrote its opinion and ruled on which Mega is better. Finally it built the strongest competitive team it
could around each form.

## The format
- **Pokémon Champions, Regulation M-C**: the official competitive (VGC) ruleset running September to December 2026.
- **Doubles**: two Pokémon on each side at once. Each player brings six Pokémon and picks four for each game. Level 50.
- **Mega Evolution**: a Pokémon holding its Mega Stone can transform once per battle into a stronger Mega form. Only one
  Pokémon per team can Mega Evolve per battle. **Z Megas** (Mega Absol Z, Mega Garchomp Z, Mega Lucario Z) are new
  alternate Mega forms added in Regulation M-C.
- **Stat points**: each Pokémon gets 66 points to spread across its six stats, at most 32 in any one stat.
- **Item Clause and Species Clause**: all six items on a team must be different, and so must all six species.

## How to read the numbers
- **Damage ranges** like "99.5-118%" are the percentage of the target's HP one attack removes. Pokémon damage has 16
  random rolls, so every attack has a lowest and highest outcome.
- **"(14/16)"** means 14 of the 16 possible rolls knock the target out. **"KO"** alone means all 16 do.
- **OHKO** means a one-hit knockout. **2HKO** means it takes two hits.
- **Spread moves** hit both opponents at once but deal 25% less damage in doubles.
- **STAB** (same-type attack bonus): a Pokémon's attacks of its own type do 1.5x damage.
- **Speed** decides who moves first. Moves with **priority** (Sucker Punch, Fake Out, First Impression) go first anyway.
- **Usage %** is how often a Pokémon appears on ranked teams (Pikalytics, Regulation M-C). The debates focus on the
  21 most important threats, led by Rillaboom (37%), Sneasler (34%), Incineroar (27%), Mega Salamence (23%) and
  Kingambit (22%).

## Terms that come up a lot
- **Intimidate**: an ability that lowers both opposing Pokémon's Attack by one stage when it enters. It weakens
  physical attackers only.
- **Psychic Terrain**: a field effect that boosts Psychic moves and blocks priority moves aimed at Pokémon that are on
  the ground. Flying types and Pokémon with Levitate are not on the ground, so they are not protected.
- **Tailwind / Trick Room**: speed control. Tailwind doubles your side's Speed; Trick Room makes slower Pokémon move first.
- **Helping Hand**: a support move that makes a partner's attack 50% stronger that turn.
- **Follow Me**: a support move that pulls opposing single-target attacks onto the user.
- **Sun, rain, sand, snow**: weather. Sun boosts Fire moves, rain boosts Water moves; some abilities only work in one weather.

## The two Megas at a glance
### Mega Greninja (Water/Dark type, ability Protean, holds Greninjite)
- Base stats: HP 72, Attack 125, Defense 77, Sp. Atk 133, Sp. Def 81, Speed 142. Total 630.
- Protean: Changes its own type to the type of the move it is about to use, so that attack gets STAB (x1.5) and its defensive typing changes to match. Under current rules this happens ONCE per switch-in: later attacks of a different type get no STAB until it switches out and back. The sheet prices the first attack; the engine takes field.proteanSpent:true for later ones.
- Takes 4x damage from: none. Takes 2x from: Electric, Grass, Fighting, Bug, Fairy.
- Resists (half damage): Fire, Water, Ice, Ghost, Dark, Steel. Quarter damage: none. Immune to: Psychic.
- Top Speed with full investment: 213. Megas faster than that: Absol Mega Z 223, Garchomp Mega Z 223, Lucario Mega Z 223, Alakazam Mega 222, Aerodactyl Mega 222, Beedrill Mega 216, Sceptile Mega 216.
- One-hit knockouts against the 21 key threats, with no item: 8 of 21 as a physical attacker; 6 of 21 as a special attacker.
- Knocked out in one hit by 9 of the 21 key threats when it has no bulk investment.

### Ash-Greninja (undefined type, ability undefined, holds undefined)
- Base stats: HP 72, Attack 145, Defense 67, Sp. Atk 153, Sp. Def 71, Speed 132. Total 640.
- undefined: HYPOTHETICAL GEN 7 VERSION: after this Pokemon knocks out a target with an attack, it transforms into Ash-Greninja for the rest of the battle (even after switching). Ash-Greninja's Water Shuriken is 20 BP and always hits 3 times (+1 priority, special). It holds a normal item and does NOT use the team's one Mega Evolution. Until its first KO it has plain Greninja stats. (Champions' real Battle Bond is the Gen 9 +1 Atk/SpA/Spe version - not this.)
- Takes 4x damage from: none. Takes 2x from: Electric, Grass, Fighting, Bug, Fairy.
- Resists (half damage): Fire, Water, Ice, Ghost, Dark, Steel. Quarter damage: none. Immune to: Psychic.
- Top Speed with full investment: 202. Megas faster than that: Absol Mega Z 223, Garchomp Mega Z 223, Lucario Mega Z 223, Alakazam Mega 222, Aerodactyl Mega 222, Beedrill Mega 216, Sceptile Mega 216, Greninja Mega 213, Manectric Mega 205, Lopunny Mega 205, Delphox Mega 204.
- One-hit knockouts against the 21 key threats, with no item: 6 of 21 as a physical attacker; 7 of 21 as a special attacker.
- Knocked out in one hit by 10 of the 21 key threats when it has no bulk investment.

### undefined (undefined type, ability undefined, holds undefined)
- Base stats: HP 72, Attack 95, Defense 67, Sp. Atk 103, Sp. Def 71, Speed 122. Total 530.
- undefined: HYPOTHETICAL GEN 7 VERSION: after this Pokemon knocks out a target with an attack, it transforms into Ash-Greninja for the rest of the battle (even after switching). Ash-Greninja's Water Shuriken is 20 BP and always hits 3 times (+1 priority, special). It holds a normal item and does NOT use the team's one Mega Evolution. Until its first KO it has plain Greninja stats. (Champions' real Battle Bond is the Gen 9 +1 Atk/SpA/Spe version - not this.)
- Takes 4x damage from: none. Takes 2x from: Electric, Grass, Fighting, Bug, Fairy.
- Resists (half damage): Fire, Water, Ice, Ghost, Dark, Steel. Quarter damage: none. Immune to: Psychic.
- Top Speed with full investment: 191. Megas faster than that: Absol Mega Z 223, Garchomp Mega Z 223, Lucario Mega Z 223, Alakazam Mega 222, Aerodactyl Mega 222, Beedrill Mega 216, Sceptile Mega 216, Greninja Mega 213, Manectric Mega 205, Lopunny Mega 205, Delphox Mega 204, Greninja-Ash Ash 202, Raichu Mega Y 200, Gengar Mega 200, Pyroar Mega 195, Meowstic-Male Mega 193.
- One-hit knockouts against the 21 key threats, with no item: 2 of 21 as a physical attacker; 5 of 21 as a special attacker.
- Knocked out in one hit by 10 of the 21 key threats when it has no bulk investment.

## Round 1: Opening arguments
### Opening argument for Mega Greninja (Advocate A)
**Thesis:** Mega Greninja is the better Mega form of Greninja. It is at full power from turn 1 with no conditions. Ash-Greninja only reaches its best numbers after it gets a KO, and before that KO it is a plain Greninja with an item and a gamble.

**1. It hits hard with no item, from the first turn.** On Jolly 2/32/32, Mega Greninja OHKOs **8/21** board threats with no item (fact sheet). The Rillaboom Gunk Shot is 80% accurate, and against Focus-Sash Whimsicott a clean OHKO is not possible. Transformed Ash-Greninja on the same physical spread OHKOs only **6/21** (fact sheet). Mega Greninja is also the only form that OHKOs the most-used threat on the board, Rillaboom at 37.18% usage: Gunk Shot does **104.3-122.7%** (sheet). Ash's Gunk Shot does **76.3-90.8%**, and even Ash's Specs Ice Beam does only **75.4-88.9%** (my engine run). Caveat: Protean gives STAB only on the first attack after each switch-in. With Protean already spent, Gunk Shot falls to 69.6-82.1% (my run), so Mega Greninja should lead with the move it needs most.

**2. Ash spends most games as plain Greninja.** Before its first KO it has Speed **191** and Atk 147 / SpA 110 (my run). Holding Life Orb it OHKOs just **5/21** (my run). Choice Specs reaches **9/21** but locks it into one move. Several of those Specs KOs rely on 80%-accurate Hydro Pump (Incineroar, Arcanine-Hisui). The KOs against Indeedee-F (10/16 rolls) and Pelipper (1/16) don't reliably happen. Incineroar (26.77%) and Sneasler (34.29%) both carry Fake Out, which can delay that first KO further. Mega Greninja needs no KO to be at full power.

**3. It is faster.** Mega Greninja runs **213** Speed against Ash's **202** and pre-KO Greninja's **191** (sheet). Nothing on the board outspeeds it. It also clears the Mega Manectric and Mega Lopunny tiers (205) and Mega Delphox (204), which Ash does not. Pre-KO Greninja is slower than 16 Megas, including Mega Gengar and Mega Raichu Y at 200.

**4. It takes hits better.** Mega Greninja's spread is HP 149 / Def 97 / SpD 101. Ash's is 149 / 87 / 91. Mega is OHKO'd by **9/21** threats and Ash by **10/21** (sheet). The difference is Whimsicott's Moonblast: **92.6-110.1% (10/16)** on Mega against a guaranteed **102-122.1%** on Ash. Garchomp's Dragon Claw does 73.8-89.3% to Mega but up to 98% to Ash.

**5. Ash's signature move is weak on this board.** Ash's 20 BP x3 Water Shuriken OHKOs **1/21** threats even with Choice Specs (my run). That one is Arcanine-Hisui, and Hydro Pump already KOs it. Against Sneasler it does 68.8-82.2%, and against Garchomp 53.5-64.9%. On top of that, Indeedee-F (21.78%) sets Psychic Surge, and Psychic Terrain blocks the priority against every grounded target.

**6. With Helping Hand it becomes a nuke.** Jolly Mega Greninja plus Helping Hand OHKOs **13/21** (my run), still with no item. That list includes Incineroar (111.4-130.7%), Pelipper (111.7-131.4%, which breaks its Sash only if it is already chipped), Mega Baxcalibur (128.2-152.9%) and Mega Staraptor (102.2-121.6%).

**Team role and partners:** a fast physical Mega that picks the right STAB for each target, played in a standard Fake Out plus Helping Hand support shell. Incineroar gives Fake Out and Intimidate to protect the Mega Greninja + Helping Hand turn. A Helping Hand partner turns 8 OHKOs into 13. Protect and U-turn let Mega Greninja switch out and switch back in to reset Protean. Because Mega Greninja has the stone, the other five Pokemon keep their items free. Swords Dance and Icy Wind are options when opponents lean on Trick Room teams (Farigiraf, Indeedee-F).

**Pre-empting Ash's best argument: "free item plus a second Mega, and after one KO Specs Ash OHKOs 14/21."** The 14/21 figure is real (my run). But it is a best case that holds only after Ash has already won an exchange as a 191-Speed, 530-BST Pokemon. At that stage it OHKOs 5/21 with Life Orb, or 9/21 with Specs while locked into one move, and it faces Fake Out from the two most-used Fake Out users. Getting the second Mega onto the team is a real benefit. Mega Greninja's answer is Helping Hand: 13/21 OHKOs from turn 1, at 213 Speed, with no KO needed. The second-Mega argument also has a cost. The Ash team needs a partner Mega to justify it, and that Mega can't help while Ash is still trying to find its first KO. Mega Greninja is at its strongest from turn 1; Ash-Greninja has to get a KO before it is.

### Opening argument for Ash-Greninja (Advocate B)
**Thesis:** Ash-Greninja comes out ahead of Mega Greninja on both sides of the ledger. It keeps an item slot, and Choice Specs in that slot hits harder than Greninjite does. It also leaves the team's one Mega Evolution free for another Pokemon. Mega Greninja pays for its extra Speed with both.

**1. Ash is simply the stronger attacker (my engine runs).** Both builds are Timid 2/0/0/32/0/32. Ash with Choice Specs has 205 SpA. Mega Greninja has 185 SpA and no item, because Greninjite fills the slot.
- **Kingambit:** Ash's Specs Hydro Pump does 87.4-103.4% (4/16 rolls KO). Mega's does 52.7-62.8%.
- **Indeedee-F:** Ash's Dark Pulse does 123.2-146.9%, a KO. Mega's does 75.7-89.3%.
- **Farigiraf:** Ash's Dark Pulse does 116.2-137.8%, a KO. Mega's does 70.3-83.8%.
- **Gholdengo:** Ash's Dark Pulse does 149.1-175.1%. Mega's does 89.9-106.5% (6/16).
- **M-Metagross:** Ash's Dark Pulse does 126.3-148.5%. Mega's does 77.2-91.2%.
- **Overall:** Specs Ash OHKOs 14 of the 21 board threats. Two of those 14 are Pelipper and Whimsicott, which carry Focus Sash, so the honest count is 12. The fact sheet gives Mega's best spread 6 of 21.

**2. Water Shuriken becomes a +1 priority attack that can KO (my engine runs).** Ash's Water Shuriken is 20 BP and always hits 3 times.
- **Specs, neutral field:** 251.2-300% into Arcanine-Hisui, 74.3-92.1% into Incineroar and 72.5-89.9% into M-Tyranitar.
- **Specs, in rain:** it OHKOs Incineroar (115.8-136.6%), M-Tyranitar (113-133.3%) and Sneasler (103.2-122.3%).
- **With Helping Hand instead of rain:** it still OHKOs Incineroar (111.4-138.1%).
- **Mega's Water Shuriken for comparison:** 8.7-44.6% into those same targets, apart from Arcanine-Hisui.

Moving first with an attack that KOs Sneasler and Incineroar is the strongest thing a Greninja can do on this board. Sneasler and Incineroar are two of the three highest-usage threats (34.29% and 26.77%).

**3. The first KO needed to transform is easy to get (my engine runs, Specs Battle Bond form, 191 Speed).** Before its first KO it has plain Greninja stats. Even so, it outspeeds all 21 board threats, according to the fact sheet. It OHKOs these high-usage threats:
- Sneasler (34.29%): Extrasensory, 178.3-211.5%.
- Incineroar (26.77%): Hydro Pump, 104-122.8%. Hydro Pump is 80% accurate.
- M-Salamence (23.15%): Ice Beam, 154.8-182.8%.
- Garchomp (17.12%): Ice Beam, 162.2-192.4%.
- Gholdengo (15.23%): Dark Pulse, 111.2-132.5%.
- Arcanine-Hisui (9.38%): Water Shuriken, 146.5-174.4%.

It also has Surf in rain, which hits 11/16 into Incineroar as a spread move. In five of the six most common threats there is at least one clean turn-1 KO. After it transforms, the change lasts for the rest of the battle, even through switches.

**4. The team keeps its Mega Evolution.** Ash is not a Mega, so the same team can Mega Evolve something else, such as M-Salamence or M-Metagross. The Mega Greninja team has spent its Mega on one attacker. The Ash team gets an attacker at Mega level plus a real Mega on top.

**5. It has a full normal-item slot.** Specs is not the only choice. Life Orb keeps it free to change moves and still OHKOs Indeedee-F (107.3-127.7%) and Farigiraf (101.8-120.7%). Focus Sash guarantees it survives long enough to get its first KO.

**Team role and partners.**
- **Rain lead:** Pelipper with Drizzle next to Specs Ash. Rain Water Shuriken OHKOs Sneasler, Incineroar and M-Tyranitar before they can move. Rain Surf from Ash OHKOs Incineroar (125.7-148.5%) and Sneasler (111.5-131.8%), hitting both targets.
- **Second attacker:** a Mega Evolution such as M-Salamence or M-Metagross.
- **Support:** Helping Hand or Tailwind users to cover the turns before it transforms.

**Pre-empting Mega Greninja's case.** My opponent's best argument is Speed and reliability: 213 Speed, a stronger form from turn 1, and slightly more bulk (97/101 defenses against Ash's 87/91).
- **Speed:** No board threat is faster than 191, according to the fact sheet. That means the extra 22 points only matter against other Megas and in the mirror match.
- **Bulk:** The difference changes little. The Rillaboom, Sneasler, M-Salamence, Sylveon and Archaludon hits on the fact sheet OHKO both forms.
- **Protean:** It gives STAB to only one attack per switch-in, so Mega's coverage moves lose STAB after the first one.
- **Reliability:** The "no KO needed" advantage mostly disappears when the Battle Bond form already OHKOs Sneasler, Incineroar, M-Salamence and Garchomp on turn 1.

Mega Greninja's extra Speed comes at the cost of its item and the team's only Mega Evolution. On this board, the Speed is worth less than either of those.

## Round 2: Rebuttals
### Mega Greninja's advocate responds
**Rebuttal (Mega Greninja)**

**Concessions first.** Once Specs Ash has transformed, it hits harder than Mega Greninja's special set. I reran the Kingambit, Indeedee-F, Gholdengo and Metagross numbers and they hold up. The count of 12 honest OHKOs out of 21 is also fair. The pre-KO Specs form does OHKO Sneasler (Extrasensory, 178.3-211.5%), M-Salamence, Garchomp and Gholdengo. Keeping a free Mega is a real benefit. I also accept that Protean gives STAB only once per switch-in.

**1. The rain Water Shuriken OHKOs all come from the transformed form, not from turn 1.** Ash's Shuriken OHKOs Sneasler (103.2-122.3%) and Incineroar in rain, but that is the 20 BP x3 move, which only exists after the first KO. I ran the pre-KO Specs Battle Bond form in rain:
- Water Shuriken does **59.2-70.7%** to Sneasler and **71.3-83.2%** to Incineroar.
- Rain Surf does only **84.7-100% (1/16)** to Sneasler.

So the "moves first and KOs Sneasler and Incineroar" play needs rain from Pelipper and a KO already scored. Indeedee-F's Psychic Surge also blocks the priority into both of those targets, because both are grounded. The Pelipper lead that makes the play work also takes a team slot and a lead slot. That leaves one fewer slot for the second Mega the opponent relies on in point 4.

**2. "Easy first KO" leaves out Fake Out, accuracy and the Specs lock.**
- The Incineroar KO is Hydro Pump, **104-122.8%**, which is **80%** accurate (engine accuracy check). Incineroar also carries Fake Out, and so does Sneasler, so the two KOs they cite are exactly the turns most likely to get Faked Out.
- Whatever move lands the KO, Specs locks Ash into it. If Hydro Pump takes the KO, the new Ash form keeps firing Hydro Pump. To use its +1 Shuriken it has to switch out and come back in, which costs a turn.
- The 191 Speed is barely ahead: Sneasler and M-Froslass sit at **189** and Whimsicott at **184** (engine). Any Tailwind or Speed boost puts pre-KO Greninja behind all three.

Mega Greninja has none of these conditions. Jolly with no item OHKOs **8/21** from turn 1. With Helping Hand it OHKOs **13/21**, including Incineroar at **111.4-130.7%**. At **213** Speed it also outspeeds the 205 Mega tier (Mega Manectric and Mega Lopunny) and Mega Delphox at 204, which Ash, at 202, does not.

**3. The comparison uses the wrong Mega Greninja set.** They compare Specs Ash against Mega Greninja's special spread, which OHKOs 6/21. The fair comparison is against my physical set:
- Gunk Shot OHKOs Rillaboom, the most-used threat at 37.18%, for **104.3-122.7%**. Ash's Specs Ice Beam does only **75.4-88.9%** there.
- Transformed physical Ash OHKOs 6/21.

On bulk, I concede that most big hits OHKO both forms. The Whimsicott Moonblast is the difference: 10/16 rolls KO Mega, while every roll KOs Ash.

**Summary.** Ash's best numbers depend on a chain of conditions: rain, no Fake Out, an 80% Hydro Pump landing, no Psychic Terrain and a Specs re-lock. Mega Greninja's numbers need none of these.

Mega Greninja wins because 13/21 OHKOs at 213 Speed from turn 1 are a sure thing, while Ash's 12/21 come only after it survives, lands a KO and gets back into position as a 191-Speed Greninja with no boosts.

### Ash-Greninja's advocate responds
**Rebuttal (Ash-Greninja)**

**1. The Helping Hand comparison helps Ash more than it helps Mega.** My opponent's best number is "Helping Hand Mega Greninja OHKOs 13/21 from turn 1." I recomputed it, and it depends on Protean.
- **Fresh Protean:** Jolly Mega Greninja with Helping Hand reaches 16/21. Pelipper and Whimsicott carry Focus Sash, so the real count is 14.
- **Protean spent:** after its first attack of the switch-in, it drops to 11/21, or 10 net of Sash. Mega Greninja only gets the 13-14 figure on the first turn after each switch-in. After that it has to switch out to reset Protean, which costs turns and exposes the team to extra hits.
- **Pre-KO Greninja, same partner:** Choice Specs Battle Bond Greninja with Helping Hand OHKOs 15/21, or 13 net of Sash. That matches their headline before Ash has transformed, and it never loses STAB. It includes Kingambit (15/16), Archaludon (102.8-121.5%) and Pelipper (127.7-151.1%).
- **After the transform:** Specs Ash with Helping Hand OHKOs 20/21, or 18 net of Sash. Only M-Baxcalibur survives, at 83.5-99%.

**2. "It spends most games as plain Greninja."** With Specs at 191 Speed, pre-KO Greninja still OHKOs Sneasler (236.9%+ before Helping Hand), M-Salamence, Garchomp, Gholdengo and Indeedee-F without any partner, and it outspeeds all 21 threats. Fake Out is not an argument against Ash in particular. Mega Greninja takes the same Fake Out from Incineroar and Sneasler, and without a Focus Sash option it has nothing to protect its turn.

**3. Water Shuriken "1/21."** On a neutral field their number is correct, and I concede it. But this is doubles, and both Ash builds I proposed run a partner.
- **With Helping Hand:** Ash's Water Shuriken OHKOs Sneasler (103.2-122.3%) and Incineroar (111.4-138.1%).
- **In rain:** it also OHKOs Sneasler and Incineroar, plus M-Tyranitar (113-133.3%).
- **Garchomp:** it does not KO even with help, at 79.5-97.3%.

Those are priority KOs against the second- and third-most-used threats, and neither is something Mega Greninja's Shadow Sneak can do. I also concede that Psychic Terrain from Indeedee-F shuts Water Shuriken off against grounded targets. The Ash player has to remove Indeedee-F first, and Dark Pulse OHKOs it.

**Honest concessions:**
- **Rillaboom:** Mega Greninja's Gunk Shot OHKOs Rillaboom (104.3-122.7%), and my Specs Ice Beam does not (75.4-88.9%). Gunk Shot is only 80% accurate, and Ash needs Helping Hand to KO Rillaboom (113-133.3%).
- **Speed:** 213 against 202 is real. Only Mega Greninja passes the 204-205 Mega tier.
- **Bulk:** Mega Greninja survives Whimsicott's Moonblast on some rolls (6 of 16), and Ash does not.

**What they don't price in.** Mega Greninja's case assumes a Helping Hand partner to reach double-digit OHKOs, the same kind of support Ash uses. It also treats the item slot and the team's Mega Evolution as free. Ash keeps both: Specs or a Focus Sash on Greninja, plus a real M-Salamence or M-Metagross next to it.

**Closing:** Given the same Helping Hand partner, even untransformed Ash-Greninja matches Mega Greninja's best-case OHKO count and keeps STAB on every move, and once transformed it reaches 18 net OHKOs with the team's Mega Evolution still unused. That is why Ash-Greninja wins.

## The judge's opinion
Having heard both openings and both rebuttals, Rotom Judge wrote this opinion.

I rule for Ash-Greninja. B did not argue it well, but the corrected evidence supports it. B built its case on Choice Specs, which does not exist in Champions. That cost B points on Evidence and Honesty. A never noticed, and conceded the Specs figures. When I reran B's case with Life Orb, the gap mostly held. Transformed Ash OHKOs 13/21 (11 net of Sash) without being locked into one move. Mega Greninja OHKOs 8/21 on fresh Protean and 3/21 once Protean is spent. B's strongest rebuttal was the Protean-spent collapse, and it holds.

A was right on several points. Mega is faster, at 213 against 202 and 191. Gunk Shot OHKOs Rillaboom (104.3-122.7%), while Life Orb Ash's Ice Beam does only 65.2-77.8%. Pre-KO rain Water Shuriken is weak, at 59.2-70.7% into Sneasler. A was wrong in two places. First, A quoted Ash's weaker physical Life Orb spread (5/21); the special spread OHKOs 7/21 before any KO, which is close to Mega's 8/21. Second, A's headline is "Helping Hand Liquidation KOs Incineroar", but Incineroar's own Intimidate drops that hit to 75.7-89.1%. At -1, physical Mega's no-help OHKO count falls to 2/21. Neither side mentioned Intimidate.

B's claim of priority KOs on Sneasler and Incineroar mostly did not survive the move to Life Orb. Rain Water Shuriken against Sneasler KOs on only 7/16 rolls, and Psychic Terrain blocks it outright. It still KOs Incineroar in rain or with Helping Hand (104-127.7%). Neither side priced Sneasler's Psychic Seed and Unburden: on an Indeedee-F team, Sneasler outspeeds both forms.

What decided it: Ash has every advantage Mega Greninja has except about 11-22 points of Speed and one Rillaboom KO. Ash also keeps its item slot and leaves the team's Mega Evolution free. Mega Greninja is best as a fast Helping Hand nuke on the turn after it switches in; its special set with Helping Hand OHKOs 13/21 even with Protean spent. Ash is best as a Life Orb special attacker that snowballs after its first KO and shares the team with a second Mega.

Conclusion: Ash-Greninja is the better form in this format, even without the illegal Choice Specs. First, transformed Life Orb Ash OHKOs 13/21 with free move choice (17/21 with Helping Hand). Mega Greninja OHKOs 8/21 on fresh Protean and only 3/21 physical once Protean is spent. Second, before its first KO, Life Orb Battle Bond Greninja already matches Mega Greninja (7/21 against 8/21, and 14/21 against 15/21 with Helping Hand) while still outspeeding all 21 threats at 191. Third, Ash leaves the team's one Mega Evolution free. Mega Greninja's real edges are 213 Speed and the Gunk Shot KO on Rillaboom, and they do not outweigh those three points.

### Conclusion
Rotom Judge rules that Ash-Greninja is the better form (Mega Greninja 78, Ash-Greninja 70).

Conclusion: Ash-Greninja is the better form in this format, even without the illegal Choice Specs. First, transformed Life Orb Ash OHKOs 13/21 with free move choice (17/21 with Helping Hand). Mega Greninja OHKOs 8/21 on fresh Protean and only 3/21 physical once Protean is spent. Second, before its first KO, Life Orb Battle Bond Greninja already matches Mega Greninja (7/21 against 8/21, and 14/21 against 15/21 with Helping Hand) while still outspeeding all 21 threats at 191. Third, Ash leaves the team's one Mega Evolution free. Mega Greninja's real edges are 213 Speed and the Gunk Shot KO on Rillaboom, and they do not outweigh those three points.

### How the score breaks down
Each side was scored out of 100: evidence 40 (minus 5 for each claim the judge found false), relevance to the real format 25, rebuttal 20, honesty 15.
- Mega Greninja: 78 (evidence, relevance, rebuttal, honesty: 32/40, 18/25, 17/20, 11/15)
- Ash-Greninja: 70 (evidence, relevance, rebuttal, honesty: 24/40, 21/25, 16/20, 9/15)

## The judge checks the numbers
The judge re-ran these claims through the damage calculator itself.

- **Holds** (Mega Greninja): Mega Gunk Shot OHKOs Rillaboom 104.3-122.7%; 69.6-82.1% with Protean spent. The judge's result: 104.3-122.7% KO; spent 69.6-82.1%; also 69.6-82.1% at -1 (Intimidate).
- **Holds** (Mega Greninja): Jolly Mega + Helping Hand OHKOs 13/21, incl. Incineroar Liquidation 111.4-130.7%. The judge's result: 15/21 raw, 13 net of Sash; Incineroar 111.4-130.7%. Protean spent: 11/21. At -1: 8/21, and Incineroar (always Intimidate) takes 75.7-89.1%.
- **Does not hold** (Mega Greninja): Pre-KO Battle Bond Greninja with Life Orb OHKOs just 5/21. The judge's result: Physical Life Orb 5/21, but special Life Orb 7/21 (6 net). A chose the weaker spread..
- **Holds** (Mega Greninja): Pre-KO rain Water Shuriken: Sneasler 59.2-70.7%, Incineroar 71.3-83.2%; rain Surf 84.7-100% (1/16) on Sneasler. The judge's result: 59.2-70.7%; 71.3-83.2%; 84.7-100% (1/16).
- **Holds** (Mega Greninja): Speed: Mega 213, Ash 202, pre-KO 191; Sneasler and M-Froslass 189, Whimsicott 184. The judge's result: 213/202/191; 189/189/184.
- **Does not hold** (Ash-Greninja): Specs Ash: Hydro Pump 87.4-103.4% on Kingambit; OHKOs 14/21 (12 net of Sash). The judge's result: Numbers reproduce, but Choice Specs is not in Champions. Life Orb: Kingambit 75.8-90.3%; 13/21 (11 net).
- **Does not hold** (Ash-Greninja): Rain Specs Water Shuriken OHKOs Sneasler 103.2-122.3%, Incineroar 115.8-136.6%, M-Tyranitar 113-133.3%; Helping Hand Shuriken KOs Sneasler and Incineroar. The judge's result: Specs is illegal. Life Orb in rain: Incineroar 104-127.7% KO, Sneasler 91.7-110.8% (7/16), M-Tyranitar 15/16. Life Orb with Helping Hand: Incineroar KO, Sneasler 11/16.
- **Does not hold** (Ash-Greninja): Pre-KO Specs: Sneasler Extrasensory 178.3-211.5%, Incineroar Hydro Pump 104-122.8%, 9/21 OHKOs. The judge's result: Specs is illegal. Life Orb: Sneasler 155.4-185.4% KO; Incineroar 90.1-107.9% (8/16, 80% accurate); 7/21 (6 net).
- **Holds** (Ash-Greninja): Mega + Helping Hand is 16/21 on fresh Protean, 11/21 with Protean spent. The judge's result: Special: 16 fresh, 13 spent. Physical: 15 fresh, 11 spent. B mixed the two spreads, but the Protean point holds..
- **Holds** (Ash-Greninja): Life Orb Ash Dark Pulse OHKOs Indeedee-F 107.3-127.7% and Farigiraf 101.8-120.7%. The judge's result: 107.3-127.7% KO; 101.8-120.7% KO.
- **Holds** (Ash-Greninja): Pre-KO Greninja at 191 Speed outspeeds all 21 board threats. The judge's result: 191 > Sneasler/M-Froslass 189. Unburden with Psychic Seed is not modelled..

## The two teams
After ruling, the judge wrote a brief for each Mega from what the debate proved, and a team builder made the strongest team it could around each one. Both teams passed an automatic legality check (items exist, moves are learnable, stat points add up, no repeated items or species).

### The team built around Mega Greninja
Mega Greninja (Timid, 213 Speed) fires a fresh-Protean STAB nuke boosted by Helping Hand, with two Fake Out users, two Helping Hand users and two Tailwind setters (Prankster Whimsicott and Gale Wings Talonflame) around it. The Fire types, Gholdengo and Weavile give at least two engine-verified answers to each of the top 8 usage threats.

**The judge's plan for it:** Mega Greninja is a turn-1 nuke. Lead it next to Fake Out and Helping Hand support, and use U-turn or switching to reset Protean. Choose the special set, Timid 2 HP / 32 SpA / 32 Spe. It is immune to Intimidate, and with Helping Hand it still OHKOs 13/21 once Protean is spent. The physical set drops to 11/21 when spent and 8/21 at -1. Save the first attack of each switch-in for the move whose STAB matters most, such as Ice Beam into Rillaboom.

**What it leans into:**
- Speed: 213 outspeeds all 21 board threats, plus Mega Manectric and Mega Lopunny (205) and Mega Delphox (204)
- Special with Helping Hand on fresh Protean: 16/21. Rillaboom Ice Beam 101.4-121.7%, Incineroar Hydro Pump 124.8-147%, Indeedee-F Dark Pulse 113.6-133.9%, M-Metagross Dark Pulse 115.8-136.8%
- Special with Helping Hand and Protean spent: still 13/21
- Physical with no item on fresh Protean: Rillaboom Gunk Shot 104.3-122.7% (80% accurate), M-Salamence Ice Punch 109.7-129%, Garchomp Ice Punch 142.7-168.6%
- Slightly better bulk than Ash: Whimsicott's Moonblast KOs Mega on 10/16 rolls against every roll on Ash; Garchomp's Dragon Claw does 73.8-89.3%
- Frees every other team member's item slot

**What the rest of the team has to cover:**
- Protean spent with no Helping Hand: physical drops to 3/21 OHKOs, special to 5/21
- Intimidate (Incineroar, 26.77%): physical at -1 OHKOs 2/21, and Helping Hand Liquidation does only 75.7-89.1% into Incineroar
- Rillaboom Wood Hammer 235.6-279.2% and Sneasler Close Combat 170.5-202.7% OHKO it
- Archaludon Electro Shot 126.2-149%, M-Golisopod First Impression, Arcanine-H Head Smash, M-Baxcalibur, M-Staraptor and Sylveon also OHKO it
- Walls it: Kingambit (special 53.1-63.8%), M-Golisopod (28-33.5% physical, 45.1-53.3% special), Milotic
- Trick Room from Farigiraf and Indeedee-F
- Megas faster than it at 216-223: Absol Z, Garchomp Z, Lucario Z, Alakazam, Aerodactyl, Beedrill, Sceptile
- Sneasler with Unburden in Psychic Terrain outspeeds it
- Fake Out from Incineroar and Sneasler

**How to bring it:** Default four: Greninja and Incineroar lead, with Whimsicott and Gholdengo in the back.

- Turn 1: Incineroar uses Fake Out on the biggest threat to Greninja (Sneasler, Rillaboom or Incineroar), and its Intimidate weakens physical attackers. Greninja Mega Evolves and uses its fresh-Protean STAB move: Ice Beam into Rillaboom, Hydro Pump into Incineroar, or Dark Pulse into Indeedee-F.
- Turn 2: Incineroar either uses Parting Shot into Whimsicott (for Tailwind and Helping Hand) or Flare Blitzes Rillaboom (102.4-121.7%, a KO).
- Swap-ins by matchup:
  - Talonflame against Trick Room teams (it has Taunt), and against Rillaboom with M-Golisopod.
  - Weavile against M-Salamence, Garchomp and hyper offense (Icicle Crash, plus a second Fake Out and Helping Hand).
  - Against psyspam, lead Greninja with Whimsicott, because Psychic Terrain blocks Fake Out and Gale Wings into grounded foes.

**The six Pokémon** (Showdown format):
```
Greninja @ Greninjite
Ability: Protean
Level: 50
EVs: 2 HP / 32 SpA / 32 Spe
Timid Nature
- Ice Beam
- Dark Pulse
- Hydro Pump
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Level: 50
EVs: 32 HP / 24 Atk / 10 Def
Adamant Nature
- Fake Out
- Flare Blitz
- Close Combat
- Parting Shot

Whimsicott @ Focus Sash
Ability: Prankster
Level: 50
EVs: 32 HP / 2 Def / 32 Spe
Timid Nature
- Tailwind
- Helping Hand
- Moonblast
- Encore

Gholdengo @ Life Orb
Ability: Good as Gold
Level: 50
EVs: 32 HP / 14 Def / 20 SpA
Modest Nature
- Make It Rain
- Shadow Ball
- Focus Blast
- Protect

Talonflame @ Sharp Beak
Ability: Gale Wings
Level: 50
EVs: 2 HP / 32 Atk / 32 Spe
Jolly Nature
- Brave Bird
- Flare Blitz
- Tailwind
- Taunt

Weavile @ Never-Melt Ice
Ability: Pickpocket
Level: 50
EVs: 2 HP / 32 Atk / 32 Spe
Jolly Nature
- Fake Out
- Icicle Crash
- Knock Off
- Helping Hand
```

### The team built around Ash-Greninja
HYPOTHETICAL rain team (Ash-Greninja is not in Champions): Pelipper's Drizzle and Helping Hand make Life Orb Battle Bond Greninja's first KO near-automatic (17/21 threats before the transform, 19/21 after it with rain plus Helping Hand). Greninja does not use the Mega, so Mega Salamence is the team's Mega and covers Rillaboom and Whimsicott. Tauros-Aqua, Archaludon and Incineroar cover Kingambit, Fairy types, Trick Room and Fake Out.

**The judge's plan for it:** HYPOTHETICAL team: state this at the top of the notes. Build: Timid 2 HP / 32 SpA / 32 Spe with Life Orb (Choice Specs is not in Champions). Paste format: "Greninja-Ash @ Life Orb" with "Ability: Battle Bond"; Species Clause treats it as Greninja. Turn 1: take the first KO against a target that Life Orb Battle Bond Greninja kills, ideally with Helping Hand. After the transform, snowball with Dark Pulse, Hydro Pump, Ice Beam and Extrasensory, and use Water Shuriken as a priority finisher. Run a second Mega Evolution on the same team. Validator: node validate.js out/Greninja/greninja-ash.txt --require "Greninja:Ash".

**What it leans into:**
- Pre-KO Life Orb OHKOs 7/21: Sneasler Extrasensory 155.4-185.4%, M-Salamence Ice Beam 134.4-159.1%, Garchomp Ice Beam 143.2-168.6%, Gholdengo Dark Pulse 14/16, M-Froslass, Arcanine-H
- Pre-KO with Helping Hand: 14/21, incl. Incineroar Hydro Pump 135.1-162.4% and Indeedee-F Dark Pulse 121.5-145.2%
- Transformed with Life Orb: 13/21 (11 net of Sash), 17/21 with Helping Hand, 15/21 in rain
- Rain adds Kingambit (Hydro Pump 115-135.7%) and M-Metagross (112.3-132.7%)
- Life Orb Water Shuriken (+1 priority) KOs Incineroar in rain or with Helping Hand (104-127.7%), and M-Tyranitar in rain on 15/16 rolls
- Speed: 191 before the KO still outspeeds all 21 board threats; 202 after
- Does not use the team's Mega Evolution

**What the rest of the team has to cover:**
- Rillaboom (37.18%): Life Orb Ice Beam does 65.2-77.8% (98.1-116.9% with Helping Hand); its Wood Hammer does 263.8-310.7% to Ash
- Sneasler: Close Combat 190.6-225.5%; Psychic Seed + Unburden outspeeds Ash; Water Shuriken KOs only 7/16 in rain, 11/16 with Helping Hand
- Whimsicott Moonblast KOs on every roll (102-122.1%), and it can set Prankster Tailwind
- Psychic Terrain from Indeedee-F blocks Water Shuriken into grounded targets
- Pre-KO Incineroar: Life Orb Hydro Pump KOs on only 8/16 rolls and is 80% accurate
- Kingambit takes only 75.8-90.3% from transformed Life Orb Hydro Pump; M-Golisopod, Milotic and Sylveon are not KO'd
- Archaludon Electro Shot 139.6-165.1%, M-Baxcalibur Glaive Rush and M-Staraptor Close Combat KO it
- Fake Out from Incineroar and Sneasler can delay the first KO; Life Orb recoil

**How to bring it:** Greninja-Ash, Pelipper, Mega Salamence and Incineroar. Default lead: Pelipper + Greninja. Turn 1, Drizzle goes up, Pelipper uses Helping Hand and Greninja takes its first KO; before its first KO, Life Orb Greninja OHKOs 17/21 board threats with rain plus Helping Hand, mostly with Hydro Pump (80% accurate). Salamence and Incineroar wait in the back to cycle Intimidate and set Tailwind. Against Fake Out leads, lead Incineroar + Greninja and bring Pelipper in on turn 2. Salamence comes whenever the opponent has Rillaboom. Tauros-Aqua comes against Kingambit, M-Tyranitar or Archaludon. Archaludon comes against Fairy teams, M-Golisopod, Milotic or Trick Room. Worst matchup: Rillaboom + Sneasler + Indeedee-F. Lead Salamence + Pelipper there and hold Greninja back.

**The six Pokémon** (Showdown format):
```
Greninja-Ash @ Life Orb
Ability: Battle Bond
Level: 50
EVs: 2 HP / 32 SpA / 32 Spe
Timid Nature
- Hydro Pump
- Dark Pulse
- Ice Beam
- Water Shuriken

Pelipper @ Damp Rock
Ability: Drizzle
Level: 50
EVs: 32 HP / 26 Def / 8 SpA
Quiet Nature
- Hurricane
- Tailwind
- Helping Hand
- Protect

Salamence @ Salamencite
Ability: Intimidate
Level: 50
EVs: 4 HP / 32 Atk / 30 Spe
Adamant Nature
- Double-Edge
- Dragon Claw
- Tailwind
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Level: 50
EVs: 32 HP / 32 Def / 2 SpD
Impish Nature
- Fake Out
- Darkest Lariat
- Parting Shot
- Helping Hand

Archaludon @ Assault Vest
Ability: Stamina
Level: 50
EVs: 32 HP / 32 SpA / 2 Spe
Modest Nature
- Electro Shot
- Flash Cannon
- Draco Meteor
- Aura Sphere

Tauros-Paldea-Aqua @ Black Belt
Ability: Intimidate
Level: 50
EVs: 28 HP / 32 Atk / 6 Spe
Adamant Nature
- Wave Crash
- Close Combat
- Aqua Jet
- Protect
```

