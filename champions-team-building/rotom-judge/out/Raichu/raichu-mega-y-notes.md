# Mega Raichu Y psyspam-support team (Reg M-C doubles)

Paste: `out/Raichu/raichu-mega-y.txt`. `validate.js out/Raichu/raichu-mega-y.txt --require "Raichu:Mega Y"` printed "LEGAL: all checks passed."
Every number below comes from `rotom-judge/engine.js`, run against the 21-threat Reg M-C board spreads in `engine.js`.
"HH" means with Helping Hand. "-1" means after our Intimidate. "PT" means our Psychic Terrain is up.

| Slot | Set | Final stats |
|---|---|---|
| Raichu @ Raichunite Y | Timid 2 HP / 8 Def / 32 SpA / 24 Spe, Lightning Rod (base). Zap Cannon, Focus Blast, Alluring Voice, Protect | 137/108/83/212/100/191 (Mega Y, No Guard) |
| Indeedee-F @ Psychic Seed | Bold 32 HP / 32 Def / 2 SpD, Psychic Surge. Follow Me, Helping Hand, Expanding Force, Trick Room | 177/67/128/115/127/105 |
| Incineroar @ Sitrus Berry | Impish 32 HP / 8 Atk / 26 Def, Intimidate. Fake Out, Flare Blitz, Darkest Lariat, Helping Hand | 202/143/149/90/110/80 |
| Arcanine-Hisui @ Life Orb | Jolly 2 HP / 32 Atk / 32 Spe, Rock Head. Head Smash, Flare Blitz, Extreme Speed, Protect | 172/167/100/103/100/156 |
| Hydreigon @ Focus Sash | Timid 2 HP / 32 SpA / 32 Spe, Levitate. Draco Meteor, Dark Pulse, Tailwind, Protect | 169/112/110/177/110/165 |
| Milotic @ Never-Melt Ice | Bold 32 HP / 26 Def / 8 SpA, Competitive. Ice Beam, Icy Wind, Scald, Protect | 202/72/137/128/145/101 |

## Game plan

Raichu is the fast special breaker and the paralysis engine, and **Indeedee-F is its bodyguard and amplifier**.
- Mega Y outspeeds the whole board (191 vs Sneasler / M-Froslass 189). With No Guard, Zap Cannon never misses, so every target it does not KO is paralysed. Garchomp is the exception because it is immune to Electric.
- **Indeedee's Psychic Terrain fixes Raichu's worst problem, which is priority.** Raichu is grounded, so in PT it is immune to Grassy Glide (69.3-82.5%), Sucker Punch (72.3-85.4%), First Impression (127.7-151.8% KO), Extreme Speed and Fake Out. Follow Me soaks the single-target hits that OHKO Raichu: Sneasler Close Combat, Kingambit Kowtow Cleave, Garchomp Dragon Claw and Rillaboom Wood Hammer.
- **Indeedee's Helping Hand turns Raichu's hits into guaranteed KOs:** Zap Cannon on Sneasler 137.6-161.1%, M-Salamence 104.8-124.2%, Gholdengo 114.2-135.5%, Milotic 124.8-148.5% and M-Froslass 122.4-144.9%. Focus Blast on Incineroar 104-123.3%, Kingambit 131.9-156.5% (through Chople Berry) and M-Baxcalibur 115-136.9%. Alluring Voice on Garchomp 100.5-118.4%.
- **Raichu's no-item OHKOs:** Focus Blast on Archaludon 124.9-147%, M-Tyranitar 131.4-156.5% and Arcanine-H 111.6-131.4%. Zap Cannon on M-Staraptor 140.5-166.5%.
- **Indeedee's Expanding Force in PT** is a 120 BP spread move. It OHKOs Sneasler 192.4-228.7%, and still 129.3-152.2% after an enemy Psychic Seed gives Sneasler +1 SpD.

The back line holds the breakers for whatever Raichu can't touch.
- **Arcanine-H @ Life Orb** is the physical cleaner. Flare Blitz OHKOs Rillaboom 128-150.7%, Sneasler 117.8-138.9%, Kingambit 101.9-120.8%, M-Golisopod 165.9-197.3% and Gholdengo 152.1-179.9%. Head Smash (Rock Head, no recoil) OHKOs Incineroar 158.4-186.6%, M-Salamence 131.2-156.5% and M-Baxcalibur 130.1-155.3%.
- **Incineroar** supplies Intimidate, Fake Out and a second Helping Hand. It covers Rillaboom and Kingambit with HH Flare Blitz and M-Golisopod with Flare Blitz alone.
- **Hydreigon and Milotic** are the anti-Dragon and anti-Garchomp slots. Hydreigon's Levitate makes it immune to the Earthquake that OHKOs Raichu (176.6-206.6%).

Raichu's bulk is identical in base and Mega form, so it can stay unevolved to keep **Lightning Rod** (it redirects Electric attacks aimed at Indeedee or Milotic). The default is to Mega Evolve on turn one.

## Speed control: five independent layers

1. **Guaranteed paralysis (Zap Cannon + No Guard).** This survives Raichu fainting. A paralysed Sneasler / M-Froslass (94), M-Salamence (79), Arcanine-H (78) or Gholdengo (72) is outsped by Milotic (101), and some of them by Incineroar (80).
2. **Tailwind (Hydreigon, 165 Spe, Focus Sash guarantees it lives to set it).** Under Tailwind: Raichu 382, Hydreigon 330, Arcanine 312, Milotic 202, all faster than every board threat, including Garchomp (169). Garchomp is the one Pokémon paralysis can't slow.
3. **Icy Wind (Milotic).** Spread Speed drop. After a Competitive boost, +2 Icy Wind alone OHKOs Garchomp (101.1-119.5%).
4. **Fake Out (Incineroar) + Extreme Speed (Arcanine-H, +2 priority).** Both only work **outside our own Psychic Terrain**, or into ungrounded targets (Extreme Speed still hits ungrounded M-Salamence, M-Staraptor and Pelipper in PT). They are the "non-Indeedee" mode.
5. **Trick Room (Indeedee), used as a reverse.** When an opponent sets Trick Room, Indeedee's Trick Room the next turn cancels it.

## Default bring-4 and leads

**Default four: Raichu, Indeedee-F, Arcanine-H, Incineroar.**
- **Default lead: Raichu + Indeedee.** Turn 1: Mega Evolve. Indeedee uses Follow Me (against a Sneasler, Kingambit, Garchomp or Rillaboom lead) or Helping Hand (when their board has no single-target OHKO on Raichu). Raichu uses HH Zap Cannon on the biggest target, or Focus Blast on Incineroar / Kingambit. The opposing Fake Out, Grassy Glide, Sucker Punch and First Impression do nothing into our grounded pair.
- **Back: Arcanine-H and Incineroar.** Once PT expires, Incineroar's Fake Out and Arcanine's Extreme Speed switch on.
- **Rillaboom + Incineroar goodstuffs:** default four. The last terrain setter to enter wins. On simultaneous leads the slower one resolves last, and Indeedee (105) and Rillaboom (105) are a speed tie, so the terrain is a coin flip on turn 1. Whenever Grassy Terrain wins, Arcanine's Flare Blitz (128-150.7% KO, faster) is the plan. Re-switching Indeedee in takes PT back.
- **Dragons (M-Salamence, Garchomp, M-Baxcalibur):** Raichu, Indeedee, Hydreigon, Milotic. Hydreigon Tailwind turn 1 (Sash), then Draco Meteor and Ice Beam.
- **Rain (Pelipper + Archaludon):** Raichu, Indeedee, Arcanine-H, Hydreigon. Zap Cannon on Pelipper is 467% (Sash, then paralysis/second hit), Focus Blast OHKOs Archaludon.
- **Trick Room (Indeedee-F / Farigiraf):** Raichu, Indeedee, Hydreigon, Arcanine-H. See worst matchup.
- **Sand (M-Tyranitar):** Raichu, Indeedee, Milotic, Incineroar. Focus Blast OHKOs M-Tyranitar 131.4-156.5%; Milotic Scald 40.6-49.3% is the second answer.

## Threat table (top usage threats, two or more answers each)

| Threat (usage) | Answer 1 | Answer 2 | Extra / notes |
|---|---|---|---|
| Rillaboom (37.18%) | Arcanine Flare Blitz 128-150.7% KO (outspeeds, 156 vs 105) | Incineroar HH Flare Blitz 126.1-149.3% KO (84.1-99.5% alone) | Wood Hammer does 28.2-33.7% to Incineroar. PT blocks Grassy Glide on Raichu. High Horsepower OHKOs Arcanine even at -1 (107-127.9%), so Arcanine must move first. |
| Sneasler (34.29%) | Indeedee Expanding Force (PT) 192.4-228.7% KO, 129.3-152.2% at +1 SpD after its Seed | Raichu HH Zap Cannon 137.6-161.1% KO (91.7-107.6%, 8/16 alone; faster at 191 vs 189) | Arcanine Flare Blitz 117.8-138.9% KO. Hydreigon HH Draco 124.2-147.1% KO. Its Close Combat does 54.8-65% to Indeedee and 83.2-98% (0/16) to Incineroar. |
| Incineroar (26.77%) | Arcanine Head Smash 158.4-186.6% KO (80% acc) | Raichu HH Focus Blast 104-123.3% KO | Its Flare Blitz on Raichu is 87.6-103.6% (4/16), not a KO at our 8 Def points. |
| M-Salamence (23.15%) | Hydreigon Draco Meteor 126.9-151.6% KO (outspeeds, 165 vs 158) | Milotic Ice Beam 103.2-123.7% KO | Arcanine Head Smash 131.2-156.5% KO. Raichu HH Zap Cannon 104.8-124.2% KO. Its Dragon Claw on Raichu is 86.1-101.5% (2/16). |
| Kingambit (22.44%) | Arcanine Flare Blitz 101.9-120.8% KO (Chople doesn't apply to Fire) | Raichu HH Focus Blast 131.9-156.5% KO (87.9-104.3%, 4/16 alone) | Incineroar HH Flare Blitz 100-118.8% KO. PT blocks Sucker Punch on our grounded mons. Kowtow Cleave on Raichu 86.1-102.9% (3/16). |
| Indeedee-F (21.78%) | Hydreigon HH Dark Pulse 108.5-128.8% KO (72.3-85.9% alone); immune to its Expanding Force | Arcanine HH Head Smash 122-145.2% KO (81.4-97.2% alone) | Incineroar Darkest Lariat 61-72.3% (HH 7/16) and Raichu HH Zap Cannon 96.6-114.1% (13/16). **Only KO'd by HH or two attackers**, but it cannot hurt us much: Expanding Force does 54.7-65.7% to Raichu. |
| M-Golisopod (18.49%) | Incineroar Flare Blitz 112.1-131.9% KO | Arcanine Flare Blitz 165.9-197.3% KO | First Impression (127.7-151.8% on Raichu) is blocked by PT. Liquidation OHKOs Arcanine, so Arcanine should move first (156 vs 60). |
| Garchomp (17.12%) | Milotic Ice Beam 109.2-129.7% KO; takes Dragon Claw 38.6-46.5% and EQ 36.6-43.1% | Hydreigon Draco Meteor 134.1-158.9% KO; EQ-immune; Sash survives Dragon Claw (117.2-138.5%) | Raichu HH Alluring Voice 100.5-118.4% KO (outspeeds it). Zap Cannon is immune. EQ OHKOs Raichu (176.6-206.6%), so Protect / Follow Me. |

Lower-usage board, checked: Gholdengo (Arcanine Flare Blitz 152.1-179.9% KO, Incineroar Flare Blitz 15/16), Farigiraf (Hydreigon HH Dark Pulse 102.7-121.6% KO, Arcanine HH Head Smash 111.7-131.5% KO), Archaludon (Raichu Focus Blast 124.9-147% KO), Arcanine-H (Milotic Scald 134.9-162.8% KO, Raichu Focus Blast 111.6-131.4% KO), M-Baxcalibur (Arcanine Head Smash 130.1-155.3% KO, Hydreigon Draco 104.9-123.3% KO), M-Metagross (Arcanine Flare Blitz 101.8-119.9% KO, Incineroar HH Flare Blitz KO), M-Staraptor (Raichu Zap Cannon 140.5-166.5% KO), M-Froslass (Incineroar Flare Blitz 146.9-172.8% KO, Arcanine Head Smash KO), Sylveon (Arcanine Head Smash 97.7-115.3%, 14/16), Whimsicott (Incineroar / Arcanine Flare Blitz KO, through Sash only with a second hit).

## Spread benchmarks

- **Raichu, Timid 2 HP / 8 Def / 32 SpA / 24 Spe.**
  - **Speed 24 → 191.** Outruns Jolly max Sneasler and Timid max M-Froslass (189), Whimsicott (184) and M-Staraptor (178), so it moves first against the whole board. 32 Spe (200) only adds ties with Mega Gengar and the Raichu Y mirror, so those 8 points went into Def.
  - **SpA 32 is required.** HH Alluring Voice on Garchomp is 100.5-118.4% at 32, and 30 SpA falls to 14/16. HH Zap Cannon on Indeedee-F drops from 13/16 to 12/16.
  - **Def 8 (83 Def)** takes Incineroar Flare Blitz from 13/16 to 4/16, M-Salamence Dragon Claw from 11/16 to 2/16, Kingambit Kowtow Cleave from 12/16 to 3/16 and M-Tyranitar Crunch from a KO to 10/16. Putting the same points into HP (10 HP) only reached 8/16, 6/16 and 7/16.
- **Indeedee-F, Bold 32 HP / 32 Def / 2 SpD.** It needs no SpA, because Expanding Force in PT already OHKOs Sneasler at +1 SpD (129.3-152.2%) with 0 SpA. Max physical bulk takes Kingambit Kowtow Cleave to 85.9-102.8% (2/16) and 57.6-68.9% at -1, Rillaboom Grassy Wood Hammer to 75.7-90.4%, M-Salamence Double-Edge to 78-92.1% and Sneasler Close Combat to 54.8-65%. Moving 8 points into SpA made Kowtow Cleave 7/16. Psychic Seed gives +1 SpD on entry into its own terrain.
- **Incineroar, Impish 32 HP / 8 Atk / 26 Def.** Def 149 survives Jolly max Sneasler Close Combat at 83.2-98% (0/16), so the Sitrus Berry activates. M-Golisopod Close Combat is 87.6-103% (3/16). **Atk 8 is the least** that makes HH Flare Blitz OHKO Kingambit 16/16 (100-118.8%): 4 Atk gives 14/16 and 0 Atk gives 12/16. It also takes Flare Blitz on Gholdengo to 15/16 and keeps the M-Golisopod OHKO (112.1-131.9%).
- **Arcanine-H, Jolly 2 HP / 32 Atk / 32 Spe @ Life Orb.**
  - **Speed 156** outruns board Gholdengo (144), M-Metagross (148), Pelipper (128) and Rillaboom (105), and ties opposing Jolly Arcanine-H.
  - **Atk 32 is required.** Flare Blitz on Kingambit is 101.9-120.8% at 32, and 28 Atk falls to 13/16.
  - **Life Orb residual:** HP 172 takes 17 per attack. Every HP from 170 to 179 takes 17, so the 2 HP points cost nothing extra. Rock Head makes Head Smash recoil-free, but its 80% accuracy is accepted on purpose: it is the only move that OHKOs Incineroar and M-Salamence from this slot.
- **Hydreigon, Timid 2 HP / 32 SpA / 32 Spe @ Focus Sash.** Speed 165 outruns M-Salamence (158), Arcanine-H (156) and Mega Charizard Y at 160, and ties opposing Timid Hydreigon. It does not outrun Jolly Garchomp (169), which is why it holds the Sash: it survives LO Dragon Claw (117.2-138.5%), then KOs with Draco Meteor (134.1-158.9%), or sets Tailwind. Bulk points do nothing on a Sash holder: 22 HP still loses to Dragon Claw (104.8-123.8%). **SpA 32:** Dark Pulse on Gholdengo is 86.4-103% (2/16) and HH Dark Pulse on Farigiraf is 102.7-121.6% (16/16), and 28 SpA falls to 14/16.
- **Milotic, Bold 32 HP / 26 Def / 8 SpA @ Never-Melt Ice.** At 0 SpA, Ice Beam on M-Salamence is 14/16. 4 SpA is 16/16 at a 100.5% minimum, and 8 SpA gives 103.2-123.7%, a 3% margin against a bulkier Salamence. Garchomp is 109.2-129.7%. Def 137 survives unboosted M-Salamence Double-Edge (64.4-75.2%) and -1 Grassy Wood Hammer (82.2-98%).

## Items

Raichunite Y, Psychic Seed, Sitrus Berry, Life Orb, Focus Sash and Never-Melt Ice: six distinct items, all in `ITEMS`. The only Mega Stone is Raichunite Y. A second stone would not earn a slot here: no partner's Mega does more than Life Orb Arcanine or Sash Hydreigon.

## Worst matchup, honestly

**Farigiraf Trick Room (Farigiraf + Indeedee-F, or Farigiraf + a slow breaker such as M-Golisopod, Kingambit or M-Tyranitar).**
- Armor Tail blocks both our priority layers, Incineroar's Fake Out and Arcanine's Extreme Speed, so we can't stop Trick Room going up on turn 1.
- Nothing we have OHKOs Farigiraf without Helping Hand. Zap Cannon does 60.8-71.6% and Dark Pulse 68.5-81.1%.
- Under Trick Room, paralysis **helps** them, because it halves Speed and a slower Pokémon moves first. Only the 25% full-paralysis chance still works for us.
- Raichu (191) and Hydreigon (165) move last and are OHKO'd by M-Golisopod, Kingambit and M-Tyranitar.

Our plan:
1. Double into Farigiraf on turn 1: Hydreigon HH Dark Pulse (102.7-121.6% KO), or Arcanine HH Head Smash (111.7-131.5%).
2. Otherwise, let Trick Room go up and reverse it with Indeedee's own Trick Room on turn 2, while Protect / Follow Me absorb the turn.

It is winnable, but it is the matchup where we have the least slack.

Secondary soft spots:
- **M-Tyranitar sand.** Only Raichu's Focus Blast OHKOs it, and Low Kick OHKOs Arcanine.
- **Sylveon.** Arcanine's Head Smash is 14/16 and 80% accurate, and Hyper Voice spread pressures Hydreigon, which is 4x weak to Fairy.
- **Rillaboom + Incineroar Fake Out + Grassy Glide** when we don't lead Indeedee: 89.8-106.6% on this Raichu, which KOs in 88/256 roll combinations. The 8 Def points brought this down from the fact sheet's 98.5-117.5%.
- **Extreme Speed in PT** still hits ungrounded targets (M-Salamence, M-Staraptor, Pelipper), but not grounded ones.
