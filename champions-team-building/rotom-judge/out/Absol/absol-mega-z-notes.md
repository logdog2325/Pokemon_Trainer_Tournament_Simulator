# Mega Absol Z team (Reg M-C doubles)

Paste: `out/Absol/absol-mega-z.txt`. `validate.js --require "Absol:Mega Z"` printed "LEGAL: all checks passed."
Every number below comes from `rotom-judge/engine.js`, run against the 21-threat Reg M-C board spreads in `engine.js`.
"HH" means with Helping Hand. "-1" means after an opposing Intimidate.

| Slot | Set | Final stats |
|---|---|---|
| Absol @ Absolite Z | Jolly 2 HP / 30 Atk / 16 Def / 18 Spe. Night Slash, Psycho Cut, Sucker Punch, Protect | 142/204/96/85/80/207 (Mega Z, Sharpness) |
| Incineroar @ Sitrus Berry | Impish 32 HP / 12 Atk / 22 Def, Intimidate. Fake Out, Flare Blitz, Helping Hand, Parting Shot | 202/147/145/90/110/80 |
| Sneasler @ White Herb | Jolly 2 HP / 32 Atk / 32 Spe, Unburden. Close Combat, Gunk Shot, Fake Out, Protect | 157/182/80/54/100/189 |
| Arcanine-Hisui @ Charcoal | Jolly 12 HP / 28 Atk / 26 Spe, Intimidate. Flare Blitz, Head Smash, Extreme Speed, Protect | 182/163/100/103/100/149 |
| Gholdengo @ Life Orb | Modest 7 HP / 2 Def / 32 SpA / 25 Spe, Good as Gold. Make It Rain, Shadow Ball, Focus Blast, Protect | 169/72/117/203/111/129 |
| Milotic @ Leftovers | Modest 32 HP / 14 Def / 20 SpA, Competitive. Scald, Ice Beam, Icy Wind, Protect | 202/72/113/154/145/101 |

## Game plan

Mega Absol Z at 207 Speed moves before all 21 board threats (the fastest are Sneasler and M-Froslass at 189). It is a Dark/Ghost type, so it takes nothing from Fake Out or Fighting moves. With Sharpness it OHKOs, with no item and no help:
- Night Slash: Indeedee-F 108.5-128.8%, Gholdengo 124.3-149.1%, M-Froslass 183.7-216.3%, Farigiraf 98.6-117.6% (14/16)
- Psycho Cut: Sneasler 259.9-305.7%

With Helping Hand it adds Pelipper (110.2-132.8%, though the Sash stops it from full HP), M-Metagross (126.3-149.7%) and Arcanine-H (105.8-125.6%).

The five partners handle what Absol cannot:
1. **Two Intimidate users (Incineroar, Arcanine-H).** Absol Z has no Clear Amulet available, so we blunt the physical hits that OHKO it instead. At -1, M-Salamence Double-Edge does 85.9-102.1% (3/16) instead of a KO, Rillaboom Wood Hammer in Grassy Terrain does 83.1-98.6%, and M-Golisopod First Impression does 72.5-85.9%. Parting Shot and Intimidate cycling also protect Absol against the opposing Incineroar's cycle.
2. **Fighting and Fire for the Dark types Absol can't touch** (Kingambit 20.8-24.6%, Incineroar 25.7-31.2%). These come from Sneasler, Arcanine, Incineroar and Gholdengo's Focus Blast.
3. **Steel and Poison for Fairy** (Whimsicott Moonblast and Sylveon Hyper Beam both OHKO Absol). Gholdengo takes Sylveon's Hyper Voice for 23.7-28.4% and Make It Rain OHKOs it. Sneasler takes Moonblast for 43.9-52.2%, and Gunk Shot OHKOs both Whimsicott and Sylveon.
4. **Ice for the Dragons.** Milotic's Ice Beam OHKOs M-Salamence (103.2-122.6%) and Garchomp (110.3-129.7%). Competitive punishes Intimidate.

## Speed control (independent layers)

1. **Fake Out ×2 (Incineroar, Sneasler).** This buys Absol a free attacking turn. Either user alone is enough.
2. **Icy Wind (Milotic).** A spread Speed drop. It keeps working after Absol faints and it does not depend on Fake Out.
3. **Unburden (Sneasler + White Herb).** White Herb is used up the first time Close Combat drops Sneasler's defenses, and Unburden then doubles its Speed from 189 to 378. It needs no partner. The engine does not simulate item use, so this layer comes from the standard game rules, not an engine check.
4. **Priority package.** Absol's Sucker Punch (Gholdengo 82.8-99.4%, M-Froslass KO) and Arcanine's +2 Extreme Speed. These answer an opposing Tailwind or Trick Room.

Absol already outspeeds the whole board, so speed control mainly protects it against the opponent's Tailwind or Trick Room. **Caveat:** an opposing Indeedee's Psychic Terrain blocks layers 1 and 4 against our grounded targets. That is why Absol's Night Slash OHKO on Indeedee-F is its first job in that matchup.

## Default bring-4 and leads

**Default four: Absol Z, Incineroar, Sneasler, Arcanine-Hisui.**
- **Default lead: Absol + Incineroar.** Turn 1: Mega Evolve. Incineroar uses Fake Out on the biggest threat to Absol (Rillaboom, Salamence or Whimsicott) while Absol KOs Indeedee, Sneasler, Gholdengo or Farigiraf. On turn 2, Incineroar uses Helping Hand on Absol (HH Night Slash KOs M-Metagross and Arcanine-H) or Parting Shot to pivot to Arcanine for a second Intimidate.
- **Fairy (Whimsicott / Sylveon):** bring Gholdengo over Arcanine and lead Absol + Sneasler. Sneasler uses Fake Out or Gunk Shot on Whimsicott and Absol attacks the other slot.
- **Dragons (M-Salamence / Garchomp) or Baxcalibur:** bring Milotic over Sneasler. Ice Beam OHKOs both Dragons, and Icy Wind supports.
- **Kingambit + Incineroar:** Sneasler and Arcanine must both come. Lead Sneasler + Arcanine so Absol comes in after the Intimidate and Fake Out turn.
- **Rain (Pelipper):** bring Milotic and Gholdengo over Arcanine and Incineroar (see worst matchup).

## Threat table (two or more answers each)

| Threat (usage) | Answer 1 | Answer 2 | Extra |
|---|---|---|---|
| Rillaboom (37.18%) | Arcanine Flare Blitz 115-135.7% KO | Sneasler Gunk Shot 105.3-125.6% KO (80% acc) | Incineroar Flare Blitz 87-102.4% (2/16); Absol HH Night Slash 79.2-94.7%. Two Intimidates cut Wood Hammer on Absol to 83.1-98.6% |
| Sneasler (34.29%) | Absol Psycho Cut 259.9-305.7% KO (172-206.4% even at -1) | Arcanine Flare Blitz 105.7-124.8% KO | Gholdengo Make It Rain 85.4-101.9% (2/16), HH 128-152.9% KO. Absol takes Dire Claw for 29.6-35.9% and is immune to Close Combat |
| Incineroar (26.77%) | Sneasler Close Combat 105-124.8% KO | Arcanine Head Smash 116.8-139.6% KO (80% acc) | Gholdengo Focus Blast 86.1-101.5% (2/16), HH KO; Milotic Scald 50.5-60.4% (burn chance). Absol is immune to its Fake Out |
| M-Salamence (23.15%) | Milotic Ice Beam 103.2-122.6% KO | Arcanine Head Smash 100-117.2% KO (80% acc) | Gholdengo HH Make It Rain 97.3-116.1% (14/16). Our Intimidates make its Double-Edge 85.9-102.1% (3/16) on Absol |
| Kingambit (22.44%) | Gholdengo Focus Blast 110.6-130.4% KO (70% acc) | Sneasler Close Combat 84.1-99.5% into Chople Berry; HH 126.1-149.3% KO | Arcanine Flare Blitz 90.3-107.7% (7/16), HH 135.7-161.8% KO; Incineroar Flare Blitz 67.6-81.2%. Kingambit's Sucker Punch does 59.2-70.4% to Absol |
| Indeedee-F (21.78%) | Absol Night Slash 108.5-128.8% KO | Absol Sucker Punch HH 108.5-128.8% KO, or Arcanine HH Head Smash 92.1-109% (9/16) | No second single-hit OHKO: 2HKO with Incineroar Flare Blitz 44.1-52.5% plus Gholdengo Make It Rain 59.3-70.6%. **This is a one-answer threat (Absol).** |
| M-Golisopod (18.49%) | Arcanine Flare Blitz 150.5-176.9% KO | Incineroar Flare Blitz 112.1-134.1% KO | Our Intimidate cuts First Impression on Absol to 72.5-85.9% |
| Garchomp (17.12%) | Milotic Ice Beam 110.3-129.7% KO | Gholdengo HH Make It Rain 104.3-123.2% KO (69.7-82.2% alone) | Sneasler HH Close Combat 87.6-102.7% (3/16); Absol HH Night Slash 84.9-102.2% (1/16) |
| Gholdengo (15.23%) | Absol Night Slash 124.3-149.1% KO | Arcanine Flare Blitz 136.1-162.1% KO | Incineroar Flare Blitz 103-121.9% KO; our Gholdengo Shadow Ball 129-152.1% KO |
| Whimsicott (12.65%, Sash) | Sneasler Gunk Shot 344.5-405.8% (KOs through the Sash only after Fake Out chip or a second hit) | Gholdengo Make It Rain 205.1-240.9% | Fake Out breaks the Sash; Arcanine Flare Blitz 183.9-217.5%, Incineroar 137.2-163.5% |
| Sylveon (10.63%) | Gholdengo Make It Rain 101.1-120.3% KO | Sneasler Gunk Shot 129.9-153.7% KO (80% acc) | Arcanine HH Head Smash 109-129.4% KO |
| Farigiraf (15.9%) | Absol Night Slash 98.6-117.6% (14/16) | Absol HH Sucker Punch 98.6-117.6% (14/16), or 2HKO with Gholdengo | Weak spot, as with Indeedee |

## Spread justifications

- **Absol, Jolly 2/30/16/0/0/18.**
  - **Speed 18 → 207.** This outspeeds every board threat (189 max) and the fast off-board Megas Lopunny/Manectric (205), Delphox (204), Raichu Y and Gengar (200). We give up the 223 speed tie with Garchomp Z and Lucario Z and the edge over Alakazam and Aerodactyl (222). That was a deliberate trade for bulk.
  - **Atk 30 → 204.** 30 is the minimum that keeps Night Slash on Farigiraf at 14/16 (28 Atk gives only 13/16). It also keeps Indeedee-F and Gholdengo 16/16.
  - **Def 16, HP 2.** On the default 2/32/0/0/0/32 spread, five hits could KO Absol. On this spread none of them do:

    | Hit into Absol | Default spread | This spread |
    |---|---|---|
    | Incineroar Flare Blitz | 88.7-104.2% (5/16) | 72.5-86.6% |
    | Kingambit Kowtow Cleave | 86.6-102.1% (3/16) | 71.8-85.2% |
    | Garchomp Dragon Claw | 94.4-112.7% (11/16) | 77.5-93.7% |
    | M-Tyranitar Crunch | 95.1-112% (11/16) | 78.2-93% |
    | M-Staraptor Brave Bird | 101.4-119% (KO) | 83.1-99.3% |

    That takes Absol from 12 board OHKOs down to 11. The five hits in the table all fail to KO now, but M-Golisopod First Impression (107.7-127.5%) and M-Metagross Meteor Mash (104.9-124.6%) still KO. Our Intimidate brings First Impression down to 72.5-85.9%.
- **Incineroar, Impish 32/12/22/0/0/0.** 12 Atk is the minimum for Flare Blitz to OHKO Gholdengo 16/16 (8 Atk gives 15/16). 22 Def means Jolly max-Attack Sneasler's Close Combat does 84.2-101% (1/16), so it survives 15 of 16 rolls even before our Intimidate. M-Golisopod's Close Combat does 88.6-105.4% (5/16). Speed 0: it is a Fake Out pivot.
- **Sneasler, Jolly 2/32/0/0/0/32.** 32 Spe gives 189, which ties opposing Sneasler and M-Froslass, and Unburden doubles it to 378. 32 Atk is needed for two KOs. Close Combat OHKOs Incineroar at 105-124.8%, so there is only a 5% margin at max. Gunk Shot OHKOs Assault Vest Rillaboom at 105.3-125.6%.
- **Arcanine-H, Jolly 12/28/0/0/0/26.**
  - **Spe 26 → 149.** Outspeeds M-Metagross (148) and Timid Gholdengo (144).
  - **Atk 28 → 163.** The minimum for Head Smash to KO M-Salamence 16/16 (100-117.2%; 24 Atk gives 13/16). Flare Blitz still OHKOs Rillaboom and Sneasler.
  - **HP 12 → 182.** Rillaboom's Wood Hammer drops from a guaranteed KO to 10/16 (94.5-111.5%), and Kingambit's Low Kick from 7/16 to 2/16.
- **Gholdengo, Modest 7/2/0/32/0/25.** 32 SpA is the minimum for Make It Rain to OHKO Sylveon 16/16 (28 SpA gives 15/16). Spe 25 gives 129, which outspeeds Pelipper (128) and Archaludon (123). HP 7 gives 169: Life Orb recoil is floor(169/10) = 16, and 170 HP would lose 17. The last 2 points go into Def.
- **Milotic, Modest 32/14/0/20/0/0.** 20 SpA is the minimum for Ice Beam to OHKO M-Salamence 16/16 (103.2-122.6%; 16 SpA gives 15/16) and Garchomp (110.3-129.7%). The rest is bulk. With 32 HP / 14 Def, M-Salamence's Double-Edge does 76.7-91.1% (putting the 14 in SpD instead lets 5/16 rolls KO) and Arcanine-H's Head Smash is not a KO. Leftovers because Sitrus Berry is on Incineroar.

## Worst matchup (honest)

**Rain: Pelipper + Archaludon / Basculegion.** Pelipper's rain Weather Ball OHKOs Arcanine (276.9-325.3%), Incineroar (Weather Ball 112.9-133.7% KO) and Absol (109.9-129.6% KO). In rain, Archaludon's Electro Shot needs no charge turn. Our answers are thin. Absol's HH Night Slash takes Pelipper to 110.2-132.8%, but the Sash survives it. Gholdengo's Shadow Ball does 97.1-114.6% (13/16), and Gholdengo takes Weather Ball for 67.5-79.9%. Sneasler's Close Combat on Archaludon is only 92.8-109.4% (8/16), while Gholdengo's Focus Blast (70% accuracy) KOs it. The plan is Milotic (which resists Water), Gholdengo, Sneasler and Absol. Fake Out goes on Pelipper to break the Sash, then Pelipper is focused down. This matchup is roughly even at best.

**Second weakness: Indeedee-F and Farigiraf have only one real answer (Absol).** Everything else 2HKOs them. If Absol is Intimidated or KO'd, a Trick Room from Farigiraf or Indeedee is hard to stop. Our Icy Wind and priority do not reverse Trick Room, and Psychic Terrain blocks our Fake Out and Sucker Punch into grounded targets. Absol must remove the setter on turn 1. The fallback is to Protect/stall with Arcanine's Extreme Speed (blocked in terrain on grounded targets) or to bring Gholdengo and Milotic, which play fine at their natural speed under Trick Room.
