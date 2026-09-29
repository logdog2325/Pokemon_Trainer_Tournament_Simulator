# Rotom Judge: Mega Absol vs Mega Absol Z

**The ruling:** Rotom Judge ruled that **Mega Absol Z** is the better Mega. Final score: Mega Absol 62, Mega Absol Z 81 (out of 100).

## What this is
Rotom Judge is an experiment in settling a Pokémon argument with evidence. Some Pokémon in Pokémon Champions have two
different Mega Evolutions, and players argue about which one is better. For each such Pokémon, two AI advocates each
argued for one Mega form. They were not allowed to rely on memory: every claim had to come from a damage calculator
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
### Mega Absol (Dark type, ability Magic Bounce, holds Absolite)
- Base stats: HP 65, Attack 150, Defense 60, Sp. Atk 115, Sp. Def 60, Speed 115. Total 565.
- Magic Bounce: Reflects status moves aimed at it back at the user: Spore, Thunder Wave, Will-O-Wisp, Taunt, Encore, Parting Shot, Fake Tears, etc. Does not block damaging moves or Fake Out.
- Takes 4x damage from: none. Takes 2x from: Fighting, Bug, Fairy.
- Resists (half damage): Ghost, Dark. Quarter damage: none. Immune to: Psychic.
- Top Speed with full investment: 183. Megas faster than that: Absol Mega Z 223, Garchomp Mega Z 223, Lucario Mega Z 223, Alakazam Mega 222, Aerodactyl Mega 222, Beedrill Mega 216, Sceptile Mega 216, Greninja Mega 213, Mewtwo Mega Y 211, Manectric Mega 205, Lopunny Mega 205, Delphox Mega 204, Raichu Mega Y 200, Gengar Mega 200, Mewtwo Mega X 200, Pyroar Mega 195, Meowstic-Male Mega 193, Pidgeot Mega 190, Starmie Mega 189, Salamence Mega 189, Froslass Mega 189, Hawlucha Mega 187; tied with Houndoom Mega.
- One-hit knockouts against the 21 key threats, with no item: 6 of 21 as a physical attacker.
- Knocked out in one hit by 13 of the 21 key threats when it has no bulk investment.

### Mega Absol Z (Dark/Ghost type, ability Sharpness, holds Absolite Z)
- Base stats: HP 65, Attack 154, Defense 60, Sp. Atk 75, Sp. Def 60, Speed 151. Total 565.
- Sharpness: Slicing moves x1.5 (Night Slash, Psycho Cut, Sacred Sword, Leaf Blade, X-Scissor, Air Slash, Kowtow Cleave...).
- Takes 4x damage from: none. Takes 2x from: Fairy.
- Resists (half damage): Poison. Quarter damage: none. Immune to: Normal, Fighting, Psychic.
- Top Speed with full investment: 223. Megas faster than that: NONE; tied with Garchomp Mega Z, Lucario Mega Z.
- One-hit knockouts against the 21 key threats, with no item: 8 of 21 as a physical attacker.
- Knocked out in one hit by 12 of the 21 key threats when it has no bulk investment.

## Round 1: Opening arguments
### Opening argument for Mega Absol (Advocate A)
**Thesis:** Mega Absol can run a mixed set, and its SpA 115 lets it hit things Mega Absol Z can't touch. With a Life Orb it OHKOs more of the Reg M-C board, it bounces the board's status moves back, and the Fighting immunity people credit to Z saves it from only one extra OHKO.

**1. It OHKOs more of the board: 16 of 21 against Z's 13 (my engine runs).** I ran both at Life Orb and took the best move for each target from the full movepool. Mega was Hasty with P(0,32,0,2,0,32), giving Atk 202, SpA 137 and Spe 183. It OHKOs 16 of 21 threats, and those 16 add up to 255.66 in usage. Mega Z was Jolly with P(2,32,0,0,0,32). It OHKOs 13 of 21, adding up to 196.90. The threats only Mega kills are M-Salamence, Garchomp and M-Golisopod, which together hold 58.76% usage:
- Ice Beam into M-Salamence: 120.4-142.5% KO
- Ice Beam into Garchomp: 126.5-149.2% KO
- Fire Blast into M-Golisopod: 117-140.1% KO

Z's best hits into the same targets are Stone Edge on Salamence for 55.9-66.7% with 80% accuracy, Play Rough on Garchomp for 65.9-77.8%, and Night Slash on Golisopod for 34.6-41.8% (fact sheet, no item).

**2. Ice Beam never misses, and Z needs inaccurate moves just to chip (engine plus fact sheet).** With no item at all, Hasty Mega's Ice Beam does 97.3-114.6% to Garchomp (12/16 rolls) and 92.5-109.7% to M-Salamence (8/16), both at 100% accuracy. Z's answers are Stone Edge (80%) and Play Rough (90%), and neither reaches 80% damage. Salamence is 23.15% usage and Garchomp is 17.12%, so these are two of the top eight threats.

**3. Its special attacks ignore Intimidate.** Incineroar is the #3 threat at 26.77%. Z's Sharpness damage is entirely physical, so every Intimidate cuts it by a third. Mega's Ice Beam, Fire Blast and Thunderbolt don't lose anything. Thunderbolt does 151.8-181% to Pelipper even on the physical-leaning spread with no item. Z needs Stone Edge there, which does 94.9-112.4% (11/16) with 80% accuracy.

**4. Magic Bounce sends back status moves the board actually runs (fact sheet and engine BOARD sets).** Incineroar's Parting Shot (26.77%) and Whimsicott's Encore (12.65%) come back at the user. That means Whimsicott can't Encore-lock Mega Absol's Protect or Swords Dance, and Incineroar's Parting Shot debuff lands on Incineroar. Z has Sharpness, which does nothing against either move.

**5. The typing difference is smaller than it looks.** Mega resists Dark and Ghost. Its worst hit from Kingambit (22.44%) is Iron Head at 82.4-97.2%, so it never OHKOs. Against Z, Kowtow Cleave does 86.6-102.1% (3/16) and Sucker Punch is only neutral. Farigiraf's Foul Play does 15.5-18.3% to Mega and 31.7-37.3% to Z (fact sheet).

**Team role and partners.** Mega Absol's job is a fast mixed breaker. At 183 Speed it already outspeeds 18 of 21 board threats, including Garchomp (169), M-Salamence (158) and Arcanine-Hisui (156). Its best partner is Indeedee-F:
- Follow Me pulls Sneasler's Close Combat away from Absol.
- Psychic Terrain blocks priority against grounded targets. Absol is grounded, so Fake Out from Incineroar and Sneasler and Sucker Punch from Kingambit can't touch it.
- Absol is Dark, so it takes nothing from a Psychic-type hit, and it can go on hitting with Ice Beam and Foul Play.

Foul Play uses the target's own Attack, and it OHKOs Gholdengo, Farigiraf, Indeedee-F and M-Froslass on this set. That leaves Absol's Attack points free, so a set of Ice Beam, Foul Play, Close Combat or Fire Blast, and Protect covers 16 KOs.

**Pre-empting Z's strongest points.**
- **Speed (223, nothing on the board is faster).** Speed isn't damage. Mega at 183 is already slower than only Sneasler, Whimsicott and M-Froslass. Whimsicott's Tailwind has Prankster priority, so it goes up before either Absol moves. Sneasler with a Psychic Seed gets Unburden and outspeeds both forms. On raw kills, Z's extra Speed still leaves Salamence and Garchomp alive, and Mega kills them.
- **Fighting immunity.** The fact sheet shows Z is OHKO'd by 12 of 21 threats and Mega by 13 of 21. The one difference is Sneasler. M-Golisopod's First Impression still KOs Z at 128.9-152.1%, and M-Staraptor's Brave Bird still KOs Z at 101.4-119%. Paying for one fewer OHKO taken with three fewer OHKOs dealt, on the three most-used Dragon and Bug attackers, is a bad trade.

**Caveats.**
- Both KO counts are the best move from each form's full movepool, not a real four-move set.
- The count includes Megahorn (85% accuracy) and Iron Tail (75%) for both forms. Mega's Pelipper KO in that count used Thunder (70%), and Thunderbolt covers it at 100% on the no-item spread.
- The Hasty nature lowers Mega's Defense from 80 to 72.

### Opening argument for Mega Absol Z (Advocate B)
**Thesis:** In Reg M-C doubles, Mega Absol Z has the edge in the three things that decide games: Speed, immunities and damage output. It is faster than every threat on the board and cannot be touched by Fake Out or Fighting moves. Sharpness also makes it hit harder than Mega Absol's Foul Play and Night Slash.

**1. It is the fastest Pokemon on the board (fact sheet).** Jolly with 32 Speed gives Z 223 Speed. Every one of the 21 threats is slower. No Mega is faster; it only ties Garchomp Mega Z and Lucario Mega Z. Mega Absol reaches only 183, so it moves after Sneasler (189, 34.29% usage), Whimsicott (184, 12.65%) and M-Froslass (189). Twenty Megas are faster than it. Sneasler is the second most-used threat on the board, and only Z moves before it.

**2. Its typing removes the board's best answers to Absol (fact sheet).** Dark/Ghost is weak only to Fairy and is immune to Normal, Fighting and Psychic. Mega Absol is weak to Fighting, Bug and Fairy. The effect on the two defense tables:
- **Sneasler:** its best hit, Close Combat, does 216.9-257.7% to Mega Absol. Its best hit on Z is Dire Claw at 35.9-43%.
- **M-Golisopod:** First Impression does 258.5-304.2% to Mega Absol and 128.9-152.1% to Z. Z still loses that exchange, but Z moves first.
- **M-Staraptor:** Close Combat does 202.8-238% to Mega Absol. Its best hit on Z is Brave Bird.
- **Fake Out:** Rillaboom (37.18%) and Incineroar (26.77%) are the two most common Fake Out users. Fake Out is a Normal move, so it cannot hit Z at all. Mega Absol has no answer to Fake Out.

Z is OHKO'd by 12 of the 21 threats; Mega Absol is OHKO'd by 13.

**3. Sharpness gives Z more reliable OHKOs (fact sheet and engine).** With no item, Z OHKOs 8 of 21 threats; Mega Absol OHKOs 6. Night Slash comparisons from the sheet:
- Farigiraf: 98.6-117.6% (14/16 rolls) from Z, against 87.4-103.6% (4/16) from Mega Absol's Foul Play.
- Indeedee-F: a guaranteed KO from Z, against 11/16 rolls for Mega Absol.
- M-Metagross: 86-101.8% from Z, against 74.9-88.9% for Mega Absol.

Engine run: Night Slash from Z does 58.4-68.6% to Garchomp, and from Mega Absol 37.8-45.4%. Both forms must hold their Mega Stone, so neither can use Life Orb or Choice Band. Z's advantage comes from Sharpness and needs no item.

**4. X-Scissor beats Rillaboom, the most-used threat (engine).** X-Scissor from Z does 81.2-95.7% to Rillaboom. That equals the sheet's Megahorn number, but with 100% accuracy instead of 85%. With Helping Hand it does 121.7-143.5%, a guaranteed OHKO. Mega Absol has no slicing boost; its best Helping Hand Night Slash on Rillaboom does 52.2-61.4%.

**5. Helping Hand and Swords Dance extend its OHKO list (engine).**
- **Helping Hand Night Slash:** Pelipper 110.2-132.8% KO, M-Metagross 128.7-152.6% KO.
- **Helping Hand Phantom Force:** Gholdengo 161.5-191.7% KO.
- **After one Swords Dance (+2), Night Slash OHKOs:** Rillaboom 104.8-124.6%, Garchomp 115.1-136.2%, Milotic 111.4-131.2%.

Z can set up behind Protect. Fake Out cannot touch it, and Sneasler cannot hurt it much, so the two usual ways to stop a set-up turn do not work.

**6. Ghost STAB gives it a second attacking type (engine).** Phantom Force does 107.7-127.8% to Gholdengo, a KO without help. Shadow Sneak gives Z Ghost-type priority on top of the Dark-type Sucker Punch.

**Team role and partners.** Z works as the team's fast lead sweeper. The moveset is Night Slash / X-Scissor or Phantom Force / Sucker Punch / Protect. Suggested partners:
- **A Helping Hand user.** This turns the Rillaboom, Pelipper and Metagross 2HKOs into OHKOs.
- **A Fairy-resistant partner such as Kingambit or a Steel-type,** to cover Z's one weakness.
- **Fake Out and Intimidate support** is still useful for the partner's own safety. Z does not need it itself.

Z does not want Tailwind, because it is already the fastest Pokemon on the board. That frees the partner's move slot for Helping Hand or a second attack.

**Pre-empting Magic Bounce.** Mega Absol's best argument is Magic Bounce, which reflects Taunt, Encore, Parting Shot, Will-O-Wisp and Thunder Wave. That matters less than it looks, for three reasons:
- It does nothing against damaging moves. Mega Absol is still OHKO'd by 13 of 21 threats, including a 216.9-257.7% Close Combat from Sneasler.
- It does not stop Fake Out, the board's most common way to disrupt a Pokemon, and Z is immune to Fake Out.
- Whimsicott (184 Speed) is the main source of disrupting status moves on this board. Z outspeeds it; Mega Absol does not. So Z can attack before Whimsicott does anything that isn't a Prankster move. In practice, Z avoids more disruption through its typing and Speed than Mega Absol does through reflecting status moves.

## Round 2: Rebuttals
### Mega Absol's advocate responds
**Rebuttal: Mega Absol**

**The concession first.** Z's advocate is right that Absol has to hold its Mega Stone. My Life Orb numbers (16 KOs against 13) are invalid, and I withdraw them. I reran it with no item: Hasty Mega P(0,32,0,2,0,32) OHKOs **7 of 21** (14/16 rolls or better), and Z OHKOs **8**. Z's raw no-item KO count is higher. Z is also truly immune to Fake Out, and Magic Bounce does not reflect Fake Out.

**1. The Helping Hand and Swords Dance KOs assume nobody interferes.** Both need a free turn or a partner's slot, and Incineroar (26.77%) is right there. Z's damage is entirely physical, so Intimidate works on it. I recomputed:
- **Helping Hand X-Scissor on Rillaboom at -1:** 82.6-97.6%. That is no longer a KO.
- **Helping Hand Night Slash on Pelipper at -1:** 75.2-90.5%. Not a KO either.
- **Swords Dance then Intimidate (+1) Night Slash on Garchomp:** 85.9-102.2%, only 2 of 16 rolls. Their "+2 OHKOs Garchomp" needs Swords Dance with no Intimidate at all.

Helping Hand on my side does more. **Helping Hand Ice Beam** does 145.9-171.9% to Garchomp and 138.7-164.5% to M-Salamence. Both are guaranteed KOs at 100% accuracy, and Intimidate does not reduce either one.

**2. The KO counts are close, but Mega's KOs are on the board's biggest threats.** Without an item, Ice Beam still hits Garchomp for 97.3-114.6% (12 of 16 rolls) and M-Salamence for 92.5-109.7% (8 of 16). Those two hold 40.27% of usage between them. Z's best hits on them are Play Rough at 65.9-77.8% (90% accuracy) and Stone Edge at 55.9-66.7% (80% accuracy), which are not close to a KO. Thunderbolt kills Pelipper at 151.8-181%. Z's answer there is Stone Edge at 94.9-112.4% (11 of 16) with 80% accuracy. Z's extra kills come from Sharpness, and Sharpness only boosts physical slicing moves. That means Intimidate lowers all of those kills and none of mine.

**3. Several things in Z's opening are overstated.**
- **Phantom Force** takes two turns. In doubles, Gholdengo simply Protects or switches out.
- **Speed does not make up for Z's defense.** Z is still OHKO'd by 12 of 21 threats. That includes M-Golisopod's First Impression at 128.9-152.1%, which is priority, so outspeeding it does nothing. It also includes Whimsicott's Moonblast at 122.5-145.1%.
- **Z is not safe from Dark and Ghost hits.** Kingambit's Kowtow Cleave does 86.6-102.1% to Z, and Farigiraf's Foul Play does double what it does to Mega (31.7-37.3% against 15.5-18.3%). Mega resists both types.
- **Fake Out has a fix.** Mega Absol's Fake Out problem is solved by the Indeedee-F partner I already proposed. Absol is grounded, so Psychic Terrain blocks Fake Out and Sucker Punch against it. That same partner also redirects Sneasler with Follow Me.

**4. Magic Bounce still does something Z cannot.** Z's advocate argues that outspeeding Whimsicott solves the disruption problem. It doesn't, because Whimsicott's Encore has Prankster priority and goes first anyway. Encore still works on Z: a Z that just used Protect or Swords Dance gets locked into it. Against Mega, Encore and Incineroar's Parting Shot bounce back at the user.

**Honest summary.** Z is faster, immune to Fake Out, and has one more no-item OHKO. Mega pays for its advantages with a Fighting weakness, so Sneasler's Close Combat does 216.9-257.7% to it.

Mega Absol still wins because its special attacks ignore Intimidate. Its 100%-accurate Ice Beam threatens Garchomp and M-Salamence, and becomes a guaranteed KO on both with Helping Hand. Magic Bounce blanks Encore and Parting Shot. Z's Sharpness damage, by contrast, loses a third to the #3 threat's Intimidate.

### Mega Absol Z's advocate responds
**Rebuttal: Mega Absol Z**

**1. Their headline count uses an item Mega Absol cannot hold.** Mega Absol has to hold Absolite to Mega Evolve, so it cannot also hold a Life Orb. My opening said this about both forms, and their fact sheet's "no item" column exists for this reason. I re-ran the engine with their exact Hasty P(0,32,0,2,0,32) spread holding Absolite, taking the best move against each target from 13 moves:
- **Mega Absol OHKOs 7 of 21 threats (84.64% total usage), not 16.**
- **Z (Jolly, Absolite Z, 11 moves) OHKOs 8 of 21 (109.23%).**

The "Mega-only" kills disappear without Life Orb:
- Ice Beam on Garchomp does 97.3-114.6% (12/16 rolls).
- Ice Beam on M-Salamence does 92.5-109.7% (8/16).
- Fire Blast on M-Golisopod does 90.1-107.7% (7/16).

The Foul Play kills they list also need Life Orb. Without it, Foul Play does 94.9-113% (11/16) to Indeedee-F and 87.4-103.6% (4/16) to Farigiraf. Against the same two targets, Z's Night Slash is a guaranteed KO on Indeedee-F and 14/16 on Farigiraf.

One more correction: Mega Absol's Whimsicott KO relies on Iron Tail, which has 75% accuracy. With legal items, Z still kills more of the board.

**2. Their Indeedee-F plan helps the opposing Sneasler.** Psychic Surge sets Psychic Terrain, which triggers the Psychic Seed they said Sneasler holds. Sneasler gets Unburden and outspeeds Mega Absol. Close Combat then does 216.9-257.7% to Mega Absol. Follow Me can redirect it, but only if Indeedee is still standing and not Taunted. Z never needed this partner, because it is immune to Fighting and Fake Out.

**3. Ice Beam and the two Dragons.** Here I concede. Without an item, Mega's Ice Beam has 100% accuracy and KOs Garchomp on 12/16 rolls, a real advantage over Z's Play Rough (65.9-77.8%, 90% accuracy). But 12/16 is not a guaranteed KO. Salamence survives it half the time (8/16). Z moves 40 Speed points ahead of both Dragons and can 2HKO either one, or take Salamence down with a Helping Hand hit.

**Honest concessions:**
- Intimidate from Incineroar cuts Z's physical damage and does not touch Mega's special attacks.
- Magic Bounce really does reflect Parting Shot and Encore back at the user.
- Thunderbolt KOs Pelipper cleanly, while Z needs Stone Edge (11/16 rolls, 80% accuracy).
- Mega takes half as much from Farigiraf's Foul Play.

Speed is not damage, but it decides who acts first. Z at 223 moves before Sneasler and Whimsicott, and Mega Absol at 183 does not.

**Bottom line:** once Mega Absol holds its own stone, Z KOs more of the board, moves first against everything and cannot be hit by the board's most common Fake Out and Close Combat users, so Mega Absol Z still wins.

## The judge's opinion
Having heard both openings and both rebuttals, Rotom Judge wrote this opinion.

Nearly every damage roll both sides cited reproduces. The debate turned on which premises survived.

A's opening depended on a Life Orb that Mega Absol cannot hold alongside Absolite. Without it, the claim that A OHKOs more of the board reverses. On legal items, with 100%-accurate moves only and not counting Focus Sash holders, Z OHKOs **7** threats (96.58% usage) and Mega OHKOs **5** (58.90%).

A's defensive argument was built on the fact sheet's Jolly spread. A then recommended a Hasty spread that drops Defense to 72. On that spread, Mega is OHKO'd by **16 of 21** threats, not 13. Kingambit's Iron Head, Incineroar's Flare Blitz and Garchomp's Dragon Claw all become KOs.

A's Magic Bounce case also shrinks. Under the standard Prankster-vs-Dark rule, Whimsicott's Encore already fails against both Absol forms. That leaves Incineroar's Parting Shot as the main status move that Magic Bounce uniquely stops on this board.

A's real, proven points are these:
- 100%-accurate Ice Beam is the only answer to Garchomp and M-Salamence that either form has. It lands 12/16 and 8/16 unboosted and guarantees both KOs with Helping Hand.
- Intimidate takes a third off every one of Z's kills. B's Helping Hand and +1 KOs all fall short at -1.

B's case held up. Z moves first against the whole board. It is immune to both Fake Out users and to the Fighting moves of Sneasler (34.29%) and M-Staraptor. It is OHKO'd by 12 of 21 threats against Mega's 13-16, and it OHKOs more of the board without needing an item.

B's weak points:
- The Pelipper Helping Hand KO ignores Focus Sash.
- Phantom Force is two-turn, so it is not a real lead KO.
- B conceded, correctly, that Intimidate hurts Z.

Z is the better form. Its main liabilities are Intimidate, Fairy hits and Garchomp/Salamence, and each can be fixed with a partner. Mega's Fighting/Bug weakness and low Defense cannot be fixed that way.

### Conclusion
Rotom Judge rules that Mega Absol Z is the better Mega (Mega Absol 62, Mega Absol Z 81).

Mega Absol Z wins. Mega Absol's opening count of 16 OHKOs depended on a Life Orb, which it cannot hold alongside Absolite. Without it, and counting only 100%-accurate moves and non-Sash targets, Z OHKOs 7 threats (96.58% usage) and Mega OHKOs 5 (58.90%). Mega's defensive claims also used the Jolly spread, but A recommended Hasty. On Hasty (72 Def), Mega is OHKO'd by 16 of 21 threats, not 13, and Kingambit's Iron Head KOs 8/16. Z's 223 Speed outspeeds every board threat, and it is immune to both top Fake Out users and to Sneasler's and Staraptor's Close Combat. Mega's proven strength is 100%-accurate Ice Beam on Garchomp (12/16) and M-Salamence (8/16), which becomes a guaranteed KO on both with Helping Hand. Intimidate also knocks every one of Z's Helping Hand and +1 KOs under 100%. That makes Mega a niche Dragon-killer. Z is the better lead sweeper, as long as a partner handles Intimidate and Fairy.

### How the score breaks down
Each side was scored out of 100: evidence 40 (minus 5 for each claim the judge found false), relevance to the real format 25, rebuttal 20, honesty 15.
- Mega Absol: 62 (evidence, relevance, rebuttal, honesty: 20/40, 18/25, 15/20, 9/15)
- Mega Absol Z: 81 (evidence, relevance, rebuttal, honesty: 33/40, 21/25, 16/20, 11/15)

## The judge checks the numbers
The judge re-ran these claims through the damage calculator itself.

- **Does not hold** (Mega Absol): Life Orb Mega OHKOs 16/21 (Ice Beam Garchomp 126.5-149.2%, Salamence 120.4-142.5%, Fire Blast Golisopod 117-140.1%). The judge's result: Rolls reproduce, but Mega must hold Absolite, so Life Orb is not possible. A withdrew it..
- **Holds** (Mega Absol): No-item Ice Beam: Garchomp 97.3-114.6% (12/16), M-Salamence 92.5-109.7% (8/16). The judge's result: 97.3-114.6% (12/16); 92.5-109.7% (8/16).
- **Holds** (Mega Absol): HH Ice Beam: Garchomp 145.9-171.9%, Salamence 138.7-164.5%. The judge's result: 145.9-171.9% KO; 138.7-164.5% KO.
- **Holds** (Mega Absol): Intimidate cuts Z: HH X-Scissor Rillaboom -1 82.6-97.6%, HH Night Slash Pelipper -1 75.2-90.5%, +1 Night Slash Garchomp 85.9-102.2% (2/16). The judge's result: 82.6-97.6%; 75.2-90.5%; 85.9-102.2% (2/16).
- **Does not hold** (Mega Absol): Thunderbolt kills Pelipper (151.8-181%). The judge's result: 151.8-181%, but the board Pelipper holds Focus Sash, so it is not a KO from full.
- **Does not hold** (Mega Absol): Kingambit Iron Head (82.4-97.2%) never OHKOs Mega. The judge's result: On A's own Hasty spread (72 Def): 92.1-109.3% (8/16).
- **Does not hold** (Mega Absol): Mega OHKO'd by 13/21 vs Z 12/21, only one extra. The judge's result: On Hasty, Mega is OHKO'd by 16/21 (Incineroar Flare Blitz 14/16, Garchomp Dragon Claw 105.7-125%, M-Tyranitar Low Kick 105.7-125.7%); Z by 12.
- **Holds** (Mega Absol Z): Z 223 Speed outspeeds all 21 threats; 20 Megas outspeed Mega's 183. The judge's result: Spe 223 vs 183; fact sheet lists 20 faster Megas.
- **Holds** (Mega Absol Z): Night Slash on Garchomp: Z 58.4-68.6%, Mega 37.8-45.4%. The judge's result: 58.4-68.6%; 37.8-45.4%.
- **Holds** (Mega Absol Z): X-Scissor Rillaboom 81.2-95.7%, HH 121.7-143.5%. The judge's result: 81.2-95.7%; 121.7-143.5% KO.
- **Does not hold** (Mega Absol Z): HH Night Slash KOs Pelipper 110.2-132.8% and M-Metagross 128.7-152.6%. The judge's result: Rolls reproduce, but Pelipper's Focus Sash stops the KO from full; Metagross holds.
- **Holds** (Mega Absol Z): +2 Night Slash: Rillaboom 104.8-124.6%, Garchomp 115.1-136.2%, Milotic 111.4-131.2%. The judge's result: Same, all KO.
- **Holds** (Mega Absol Z): Phantom Force Gholdengo 107.7-127.8%, HH 161.5-191.7%. The judge's result: Same (two-turn move).
- **Holds** (Mega Absol Z): With legal items Mega OHKOs 7/21 (84.64%), Z 8/21 (109.23%). The judge's result: 7 (84.64) vs 8 (109.23); without Sash holders at 100% accuracy, 5 (58.90) vs 7 (96.58).
- **Holds** (Mega Absol Z): Sneasler CC 216.9-257.7% on Mega, Dire Claw 35.9-43% on Z; Fake Out cannot hit Z. The judge's result: Same on Jolly (Hasty: CC 244.3-288.6%); Fake Out IMMUNE into Z.

## The two teams
After ruling, the judge wrote a brief for each Mega from what the debate proved, and a team builder made the strongest team it could around each one. Both teams passed an automatic legality check (items exist, moves are learnable, stat points add up, no repeated items or species).

### The team built around Mega Absol
Timid special Mega Absol (170 Speed) guarantees Ice Beam OHKOs on Garchomp (110.3-129.7%) and M-Salamence (103.2-122.6%) with no Helping Hand, and opposing Intimidate cannot lower its damage. Indeedee-F's Psychic Terrain and Follow Me shield it from Fake Out, priority and Close Combat, and Talonflame, Arcanine-H, Sneasler and Gholdengo beat what Absol can't touch. Speed control is Tailwind plus Unburden, with Trick Room as a third layer. Note: the brief's Foul Play KOs came from an engine bug (app.js prices Foul Play with the attacker's Attack instead of the target's), so Foul Play was replaced with Dark Pulse. The worst matchup is rain.

**The judge's plan for it:** Fast mixed attacker (Hasty 183 Spe) whose job is to fire 100%-accurate special coverage that Intimidate cannot touch, with Magic Bounce reflecting Parting Shot. Set: Ice Beam / Foul Play / Close Combat or Thunderbolt / Protect. Run it next to Helping Hand plus a redirector, because it is extremely frail: on the Hasty spread it is OHKO'd by 16 of 21 threats. Consider Jolly or some Def points if the team cannot shield it.

**What it leans into:**
- Ice Beam, 100% accurate and unaffected by Intimidate: Garchomp 97.3-114.6% (12/16), M-Salamence 92.5-109.7% (8/16)
- Helping Hand Ice Beam guarantees both KOs: Garchomp 145.9-171.9%, Salamence 138.7-164.5%
- Foul Play: Gholdengo 111.2-132.5% KO, M-Froslass 163.3-193.2% KO, Indeedee-F 94.9-113% (11/16), Farigiraf 87.4-103.6% (4/16)
- Zen Headbutt Sneasler 193.6-229.3%, Close Combat Arcanine-H 105.8-125.6% and M-Tyranitar 104.3-123.7%
- Resists Dark and Ghost: Kowtow Cleave 48.6-57.9%, Sucker Punch 40-47.1%, Foul Play 17.9-20.7%
- Magic Bounce reflects Incineroar's Parting Shot (Whimsicott's Prankster Encore already fails on Dark types)

**What the rest of the team has to cover:**
- Sneasler (34.29%, 189 Spe, faster than Mega): Close Combat 244.3-288.6% on Hasty
- M-Golisopod First Impression 291.4-345.7% (priority); M-Staraptor Close Combat 227.1-267.1%, Brave Bird 113.6-133.6%
- Fake Out from Rillaboom (29.3-35%) and Incineroar (22.1-26.4%); Magic Bounce does not stop it
- Hasty 72 Def: Kingambit Iron Head 92.1-109.3% (8/16), Incineroar Flare Blitz 98.6-116.4% (14/16), Garchomp Dragon Claw 105.7-125%, M-Tyranitar Low Kick 105.7-125.7%, Rillaboom Wood Hammer 170-200.7%
- Whimsicott Moonblast 124.3-147.1%, and Whimsicott (184) is faster
- Rillaboom (37.18%): best answer is Megahorn 79.2-93.7% at 85%; Fire Blast only 41.5-49.3% into Assault Vest
- Pelipper and Whimsicott hold Focus Sash; only 5 honest no-item OHKOs (58.90% usage)

**How to bring it:** Absol, Indeedee-F, Talonflame and Arcanine-Hisui. Default lead is Indeedee-F + Absol: Mega Evolve on turn 1, with Follow Me or Helping Hand from Indeedee. Talonflame (Tailwind) and Arcanine (Intimidate) wait in the back. Against Sneasler teams, lead Talonflame + Absol and keep Indeedee in the back: our Psychic Terrain would trigger their Psychic Seed (378 Speed) and block our Gale Wings priority into it. Against Incineroar + Kingambit, bring Sneasler over Talonflame. Against Fairy or Gholdengo, bring Gholdengo over Arcanine. Against rain, bring Absol, Indeedee, Sneasler and Gholdengo.

**The six Pokémon** (Showdown format):
```
Absol @ Absolite
Ability: Justified
Level: 50
EVs: 26 HP / 20 SpA / 20 Spe
Timid Nature
- Ice Beam
- Dark Pulse
- Flamethrower
- Protect

Indeedee-F @ Sitrus Berry
Ability: Psychic Surge
Level: 50
EVs: 32 HP / 32 Def / 2 SpD
Relaxed Nature
- Follow Me
- Helping Hand
- Expanding Force
- Trick Room

Talonflame @ Sharp Beak
Ability: Gale Wings
Level: 50
EVs: 2 HP / 32 Atk / 32 Spe
Jolly Nature
- Brave Bird
- Flare Blitz
- Tailwind
- Protect

Arcanine-Hisui @ Charcoal
Ability: Intimidate
Level: 50
EVs: 12 HP / 32 Atk / 22 Spe
Jolly Nature
- Flare Blitz
- Head Smash
- Extreme Speed
- Protect

Sneasler @ Psychic Seed
Ability: Unburden
Level: 50
EVs: 2 HP / 32 Atk / 32 Spe
Jolly Nature
- Close Combat
- Gunk Shot
- Fake Out
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

### The team built around Mega Absol Z
Mega Absol Z runs 207 Speed, which outspeeds all 21 board threats. It OHKOs Indeedee-F, Gholdengo, Sneasler and M-Froslass, and Farigiraf 14/16. Two Intimidate users (Incineroar and Arcanine-Hisui) cut the physical hits that would OHKO it. Sneasler, Arcanine and Gholdengo take the Dark types, Gholdengo and Sneasler take the Fairies, and Milotic's Ice Beam takes the Dragons. Speed control is layered: two Fake Outs, Icy Wind, Unburden, and priority (Sucker Punch and Extreme Speed). Weakest matchups are rain, and Indeedee-F/Farigiraf, which only Absol answers cleanly.

**The judge's plan for it:** Fastest Pokemon on the board (Jolly 32 Spe, 223; outspeeds all 21 threats), used as a Sharpness lead sweeper. Set: Night Slash / X-Scissor / Sucker Punch or Shadow Sneak / Protect, with Swords Dance as an option. It ignores Fake Out and Fighting moves, and a Helping Hand partner turns its 2HKOs into OHKOs. Partners must keep Intimidate off it and remove Fairy attackers and the Dragons.

**What it leans into:**
- 223 Speed: moves before Sneasler 189, Whimsicott 184, M-Froslass 189 and M-Staraptor 178; only ties Garchomp Z and Lucario Z
- Immune to Fake Out (Rillaboom, Incineroar) and to Close Combat from Sneasler and Staraptor; Sneasler's best hit is Dire Claw 35.9-43%
- No-item OHKOs: Night Slash Indeedee-F 108.5-128.8%, Gholdengo 127.8-150.9%, Farigiraf 98.6-117.6% (14/16), M-Froslass 185.7-220.4%; Psycho Cut Sneasler 259.9-309.6%; Close Combat Arcanine-H 108.1-127.9% and M-Tyranitar 106.3-125.6%
- Helping Hand: X-Scissor Rillaboom 121.7-143.5% KO, Night Slash M-Metagross 128.7-152.6% KO, Play Rough Garchomp 98.9-116.8% (14/16)
- +2 Night Slash OHKOs Rillaboom 104.8-124.6%, Garchomp 115.1-136.2%, Milotic 111.4-131.2%; +1 X-Scissor Rillaboom 121.7-143.5%
- OHKO'd by only 12/21 threats, against Mega's 13 (Jolly) or 16 (Hasty)

**What the rest of the team has to cover:**
- Intimidate (Incineroar 26.77%): at -1, Night Slash Gholdengo 85.2-101.2% (1/16), Indeedee-F 71.2-86.4%, Farigiraf 66.2-78.4%, HH X-Scissor Rillaboom 82.6-97.6%; no Clear Amulet in Champions; Parting Shot also lands on Z
- Fairy: Whimsicott Moonblast 122.5-145.1% KO (Whimsicott holds Sash), Sylveon Hyper Beam 354.9-419.7%
- M-Golisopod First Impression 128.9-152.1%, which is priority, so Speed does not help
- Cannot OHKO the Dragons: Stone Edge Salamence 55.9-66.7% (80% acc; HH 83.9-100%), Play Rough Garchomp 65.9-77.8% (90%); Salamence Double-Edge does 154.9-182.4% to Z
- Rillaboom Wood Hammer 150.7-178.2%, M-Staraptor Brave Bird 101.4-119%, Kingambit Kowtow Cleave 86.6-102.1% (3/16) and Sucker Punch 71.8-84.5%
- Poor into Kingambit (Night Slash 20.8-24.6%, Close Combat 63.8-75.4% into Chople) and Incineroar (Night Slash 25.7-31.2%)

**How to bring it:** Default four: Mega Absol Z, Incineroar, Sneasler and Arcanine-Hisui. Lead Absol + Incineroar. On turn 1 Absol Mega Evolves, and Incineroar uses Fake Out on Rillaboom, Salamence or Whimsicott while Absol KOs Indeedee-F, Sneasler, Gholdengo or Farigiraf. On turn 2 Incineroar either uses Helping Hand on Absol or Parting Shot to bring in Arcanine for a second Intimidate. Swaps: Gholdengo in for Arcanine against Fairy teams (then lead Absol + Sneasler); Milotic in for Sneasler against Salamence, Garchomp or Baxcalibur; lead Sneasler + Arcanine against Kingambit + Incineroar; bring Milotic + Gholdengo over Arcanine + Incineroar against rain.

**The six Pokémon** (Showdown format):
```
Absol @ Absolite Z
Ability: Justified
Level: 50
EVs: 2 HP / 30 Atk / 16 Def / 18 Spe
Jolly Nature
- Night Slash
- Psycho Cut
- Sucker Punch
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Level: 50
EVs: 32 HP / 12 Atk / 22 Def
Impish Nature
- Fake Out
- Flare Blitz
- Helping Hand
- Parting Shot

Sneasler @ White Herb
Ability: Unburden
Level: 50
EVs: 2 HP / 32 Atk / 32 Spe
Jolly Nature
- Close Combat
- Gunk Shot
- Fake Out
- Protect

Arcanine-Hisui @ Charcoal
Ability: Intimidate
Level: 50
EVs: 12 HP / 28 Atk / 26 Spe
Jolly Nature
- Flare Blitz
- Head Smash
- Extreme Speed
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

Milotic @ Leftovers
Ability: Competitive
Level: 50
EVs: 32 HP / 14 Def / 20 SpA
Modest Nature
- Scald
- Ice Beam
- Icy Wind
- Protect
```

