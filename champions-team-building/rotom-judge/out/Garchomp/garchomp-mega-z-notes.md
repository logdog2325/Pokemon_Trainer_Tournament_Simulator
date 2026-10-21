# Mega Garchomp Z team: notes

Reg M-C doubles, Level 50. Every number below was computed with `rotom-judge/engine.js` against the board spreads in `engine.js BOARD`. Spread moves already include x0.75. Paste: `garchomp-mega-z.txt`. `validate.js --require "Garchomp:Mega Z"` prints **LEGAL: all checks passed.**

| Slot | Set | Final stats |
|---|---|---|
| Garchomp @ Garchompite Z | Timid 30 HP / 32 SpA / 4 Spe. Draco Meteor, Fire Blast, Earth Power, Protect | 213 / 135 / 105 / 193 / 105 / 192 |
| Whimsicott @ Focus Sash | Prankster, Timid 32 HP / 2 Def / 32 Spe. Tailwind, Helping Hand, Sunny Day, Moonblast | 167 / 78 / 107 / 97 / 95 / 184 |
| Incineroar @ Sitrus Berry | Intimidate, Impish 32 HP / 4 Atk / 30 Def. Fake Out, Flare Blitz, Darkest Lariat, Parting Shot | 202 / 139 / 154 / 90 / 110 / 80 |
| Sneasler @ White Herb | Unburden, Jolly 2 HP / 32 Atk / 32 Spe. Fake Out, Close Combat, Dire Claw, Protect | 157 / 182 / 80 / 54 / 100 / 189 |
| Gholdengo @ Life Orb | Good as Gold, Modest 27 HP / 17 Def / 22 SpA. Make It Rain, Psyshock, Shadow Ball, Protect | 189 / 72 / 132 / 192 / 111 / 104 |
| Milotic @ Leftovers | Competitive, Modest 32 HP / 14 Def / 20 SpA. Scald, Ice Beam, Icy Wind, Protect | 202 / 72 / 113 / 154 / 145 / 101 |

Incineroar does not have Knock Off in Champions (the validator rejected it), so it runs Darkest Lariat, which does more damage anyway.

## Game plan

Mega Garchomp Z is a weatherless special nuke. At 192 Speed it moves before every board threat without Tailwind; the fastest are Sneasler and M-Froslass at 189. Each turn it takes one KO before the target acts. Whimsicott is its engine:
- **Prankster Helping Hand** always goes before Garchomp. It turns Draco Meteor into KOs on Sneasler (135.7-160.5%), Archaludon (137.6-162.4%) and M-Staraptor.
- It also turns Fire Blast into KOs on Kingambit (110.1-130.4%), Gholdengo (129.6-152.7%), M-Froslass (136.7-161.2%) and M-Metagross.
- **Prankster Sunny Day** is the rain answer. It overwrites Pelipper's Drizzle before anything moves, which undoes rain's Fire Blast halving: rain Fire Blast on Gholdengo is only 42.6-50.9%. Sun Fire Blast KOs Gholdengo (129-152.7%) and Kingambit (110.1-130.4%) with no Helping Hand.
- In sun with Helping Hand, Fire Blast OHKOs the #1 threat Rillaboom (130.4-153.6%).
- Tailwind covers the four slower teammates.

Incineroar and Sneasler bring Fake Out. Incineroar adds Intimidate, which pulls the physical Dragon hits Mega Z cannot take under OHKO range. Gholdengo is the Sneasler and Fairy wall. Milotic is the second Dragon answer and the Icy Wind layer. After Draco Meteor, Garchomp uses Protect or Incineroar's Parting Shot slot to reset the -2.

## Speed control (independent layers)

1. **Prankster Tailwind** (Whimsicott). In Tailwind, Gholdengo (104 to 208) and Milotic (101 to 202) outspeed 189 Sneasler and M-Froslass.
2. **Fake Out x2** (Incineroar, Sneasler). Two users, so losing one keeps the layer.
3. **Icy Wind** (Milotic): spread -1 Speed, and it survives Whimsicott fainting.
4. **Unburden** (Sneasler): White Herb is consumed after Close Combat and its Speed doubles to 378.
5. Mega Z's raw 192 base Speed needs no setup at all.

Caveat: Psychic Terrain blocks both Fake Outs against grounded targets, and Armor Tail (Farigiraf) blocks them too. That is the hole; see the worst matchup section.

## Default bring-4 and leads

- **Default:** Garchomp + Whimsicott lead, with Incineroar + Gholdengo in the back.
  - Turn 1: Whimsicott uses Helping Hand (or Tailwind if the target dies anyway) while Garchomp Mega Evolves and KOs the biggest threat.
- **vs Rillaboom + Incineroar** (the sand-Garchomp killer; Mega Z does not care about Grassy Terrain): lead Incineroar + Garchomp.
  - Fake Out one side. Garchomp Fire Blasts Rillaboom (58-68.6%), or Earth Powers Incineroar.
  - Bring Whimsicott in the back for Sunny Day, where Incineroar's sun Flare Blitz KOs Rillaboom (122.7-144.9%). Sneasler is the fourth.
- **vs Pelipper rain:** lead Whimsicott (Sunny Day) + Garchomp. Draco Meteor handles Pelipper, which has a Sash, so double into it. Gholdengo + Milotic in the back.
- **vs Sneasler-heavy / Indeedee psyspam:** lead Gholdengo + Garchomp.
  - Gholdengo is immune to both Sneasler STABs and to Fake Out.
  - Its Psyshock hits Defense, so the Psychic Seed's +1 SpD does nothing: 242-284.7% even after the Seed. Draco Meteor after the Seed does only 59.9-71.3%.
  - Whimsicott + Incineroar in the back.
- **vs Trick Room (Farigiraf / Indeedee-F):** lead Sneasler + Garchomp, with Incineroar + Milotic in the back.
  - Sneasler hits Farigiraf with Close Combat for 49.1-58.6%, and Garchomp Draco Meteors it for 59.9-70.7%, so together they KO before TR goes up.
  - If TR goes up anyway, Protect-stall with Garchomp and let Incineroar (80) and Milotic (101) move first.
- **vs Dragons (M-Salamence, Garchomp, M-Baxcalibur):** Garchomp + Milotic, with Incineroar for Intimidate.

## Threat table (two answers per top threat)

| Threat (usage) | Answer 1 | Answer 2 | Notes |
|---|---|---|---|
| Rillaboom 37.18% | Incineroar: resists Grass. Flare Blitz 81.2-96.6%; **sun Flare Blitz 122.7-144.9% KO** | Garchomp: resists Grass (Wood Hammer 38.5-45.1% in Grassy). Fire Blast 58-68.6%; sun 87-102.4%; **HH + sun 130.4-153.6% KO** | Sneasler Dire Claw 72.5-85% as a third. Its Assault Vest blunts special hits, so it is a two-hit or sun target, not a clean OHKO. |
| Sneasler 34.29% | Gholdengo: immune to Close Combat, Dire Claw and Fake Out. **Psyshock 242-284.7% KO even at +1 SpD** | Garchomp: moves first unless Unburden has fired. **HH Draco Meteor 135.7-160.5% KO**; unboosted 7/16 | Its Seed + Unburden (Speed 378) outruns Garchomp; Gholdengo is the real answer. |
| Incineroar 26.77% | Sneasler: **Close Combat 105-124.8% KO** (71.3-84.2% at -1) | Milotic: Competitive turns Intimidate into +2. **+2 Scald 101-118.8% KO**; 50.5-60.4% neutral | Garchomp's HH Earth Power does only 71.3-84.7%. Special attacks ignore its Intimidate. |
| M-Salamence 23.15% | Garchomp: **Draco Meteor 138.7-164.5% KO**, and moves first (192 vs 158) | Milotic: **Ice Beam 103.2-122.6% KO** (4x) | Incineroar's Intimidate drops Dragon Claw on Garchomp to 59.2-70.4%. |
| Kingambit 22.44% | Garchomp: **HH or sun Fire Blast 110.1-130.4% KO**; 73.4-87% alone | Sneasler: Close Combat 84.1-99.5% through Chople Berry, and Kingambit's Kowtow Cleave does only 38.9-45.9% back | Incineroar's sun Flare Blitz is 12/16. Beware Sucker Punch on the Draco Meteor turn. |
| Indeedee-F 21.78% | Garchomp: Draco Meteor 62.7-74.6%; **HH Draco Meteor 93.8-111.9% (11/16)** | Incineroar: Darkest Lariat 58.8-71.2%. **Draco Meteor + Lariat is at least 121.5% combined** | Weakest row: no clean single-mon OHKO, and Psychic Terrain blocks our Fake Outs on it. Gholdengo Make It Rain does 55.9-66.7%. |
| M-Golisopod 18.49% | Garchomp: **Fire Blast 125.3-149.5% KO** | Incineroar: **Flare Blitz 107.7-127.5% KO**, and Intimidate on entry | Both use 4x Fire. Emergency Exit usually pulls it out at 50%. |
| Garchomp 17.12% | Mega Garchomp Z: **Draco Meteor 145.9-173% KO**, moves first (192 vs 169), and Levitate blanks Earthquake | Milotic: **Ice Beam 110.3-129.7% KO** | Its Dragon Claw is 96.2-114.6% (13/16) on Mega Z, or 63.4-77% after Intimidate. Its EQ does 159.2-188.5% to Sneasler, so keep Sneasler away from it. |

Other board threats:
- **Gholdengo:** Garchomp HH or sun Fire Blast KOs (129.6-152.7% / 129-152.7%); Incineroar Darkest Lariat does 68.6-82.8%.
- **Sylveon:** Gholdengo Make It Rain 97.2-114.7% (12/16); Sneasler Dire Claw 85.9-102.8%.
- **M-Froslass:** Gholdengo Make It Rain 143.5-170.1% KO; Incineroar Darkest Lariat 102-119.7% KO.
- **Arcanine-H:** Garchomp Earth Power 153.5-181.4% KO; Milotic Scald 162.8-195.3% KO.
- **Archaludon:** HH Draco Meteor 137.6-162.4% KO.
- **Pelipper:** Draco Meteor 114.6-135.8% (Sash); Gholdengo Shadow Ball 92-108.8%.

## Spread justifications

- **Garchomp, Timid 30 HP / 32 SpA / 4 Spe** (213 HP, 193 SpA, 192 Spe).
  - **Speed:** 4 points gives 192, which outruns Jolly max Sneasler and Timid max M-Froslass (189, the board's fastest). 0 points is 188 and 1 point ties at 189.
  - **SpA:** max. That keeps the unboosted coin-flips (Draco Meteor on Sneasler 7/16, on Archaludon 8/16; Fire Blast on Gholdengo 2/16) and every Helping Hand KO listed above. At 2 SpA it drops to 163 SpA.
  - **HP:** the 28 points moved out of Speed (versus 2/32/32) buy these survivals:
    - Arcanine-H Life Orb Head Smash: 94.6-111.9% (11/16) becomes 82.2-97.2%, so it survives.
    - Sylveon Hyper Voice: 9/16 becomes 81.2-97.2%, so it survives.
    - Snow Blizzard from M-Froslass: 8/16 becomes 78.9-93.9%, so it survives.
    - M-Salamence Dragon Claw: 16/16 becomes 3/16.
    - Garchomp Dragon Claw: 16/16 becomes 13/16.
  - HP was tested against Def and SpD splits, and 30 HP won on every benchmark. Sand chip is 13 per turn at 213 HP.
  - **The cost:** Garchomp now loses the 223 speed tie with Mega Absol Z and Mega Lucario Z, and to a Choice Scarf Timid Gholdengo (223). Neither is on the M-C board.
- **Whimsicott, Timid 32 HP / 2 Def / 32 Spe.**
  - 184 Speed ties the Whimsicott mirror, so Prankster Tailwind or Sunny Day order is a coin-flip rather than a loss.
  - It needs no SpA: its job is Helping Hand, Tailwind and Sun. Moonblast is only there so Taunt does not leave it helpless (55.1-64.9% on Garchomp).
  - HP keeps it alive after its Sash breaks: Rillaboom Grassy Wood Hammer does 47.3-56.3%, and Incineroar Fake Out 13.2-15.6%.
- **Incineroar, Impish 32 HP / 4 Atk / 30 Def.**
  - It survives Jolly max Sneasler Close Combat (80.2-95%). The board's Careful spread takes 105-124.8% and dies.
  - M-Golisopod Close Combat KOs on only 1/16 rolls, and Garchomp Earthquake does 65.8-77.2%.
  - 4 Atk is the leftover. Flare Blitz still KOs M-Golisopod (107.7-127.5%) and Rillaboom in sun.
  - Rain Weather Ball KOs it (112.9-133.7%). That is one more reason to use Sunny Day against rain.
- **Sneasler, Jolly 2 HP / 32 Atk / 32 Spe.**
  - 189 Speed ties the Sneasler mirror before Unburden.
  - Max Atk is needed for Close Combat to KO Incineroar: 105-124.8% (16/16) at 32 Atk, but only 87.1-104% (3/16) at 0 Atk. It also reaches 84.1-99.5% on the Chople Kingambit.
- **Gholdengo, Modest 27 HP / 17 Def / 22 SpA** (189 HP, 104 Spe).
  - **HP:** 27 points is 189 HP, so Life Orb recoil is 18 per hit instead of 19 at 190.
  - **Def:** it survives Incineroar Flare Blitz (80.4-95.2%), Kingambit Kowtow Cleave (80.4-95.2%) and Life Orb Garchomp Earthquake (79.9-94.7%). The max SpA/Spe build takes 106-125% from each and dies.
  - **SpA:** 22 keeps Make It Rain on M-Baxcalibur at 16/16 (102.4-121.4%) and on Sylveon at 12/16, and Shadow Ball on the Gholdengo mirror and M-Metagross as KOs.
  - **Speed:** 0 points. In Tailwind it reaches 208, above 189, and it is slow under Trick Room.
- **Milotic, Modest 32 HP / 14 Def / 20 SpA.**
  - 20 SpA is the minimum that keeps Ice Beam a 16/16 OHKO on both M-Salamence (103.2-122.6%) and Garchomp (110.3-129.7%). At 16 SpA it is only 15/16 on Salamence.
  - The rest goes into physical bulk:
    - Grassy Glide does 69.3-82.2%.
    - M-Golisopod First Impression does 64.4-75.7%.
    - Sneasler Close Combat does 54-64.4%.
  - Tested against Bold 32/2/32 and Calm, Modest won.
  - Leftovers heals 12 per turn at 202 HP.

## Worst matchup (honest)

**Indeedee-F Psychic Terrain Trick Room with Sneasler (Psychic Seed) and a slow physical attacker such as Kingambit or M-Golisopod.**
- Psychic Terrain blocks both our Fake Outs against the grounded Indeedee.
- Follow Me soaks Garchomp's single-target nukes, and Indeedee takes only 62.7-74.6% from Draco Meteor.
- Under Trick Room, Mega Z at 192 moves last. It then takes M-Golisopod First Impression (65.7-77.5%) and Kingambit Kowtow Cleave (44.1-52.6%) before acting.
- Sneasler's Seed takes Draco Meteor down to 59.9-71.3%, and Unburden outspeeds us outside Trick Room.
- Our outs:
  - Gholdengo's Psyshock ignores the Seed.
  - Incineroar Darkest Lariat + Garchomp Draco Meteor KO Indeedee (at least 121.5% combined), but only if Follow Me is not redirecting.
  - Protect-stall the four Trick Room turns.
- None of these is clean.

A close second is **Rillaboom + Pelipper-rain Tailwind**. Grassy Glide priority and rain-halved Fire Blast take the team's two Fire answers to Rillaboom away until Whimsicott gets Sunny Day off. Whimsicott also has to survive past Fake Out, because a Rillaboom Fake Out breaks its Sash.

Accuracy is always live: Draco Meteor is 90% and Fire Blast is 85%. Every single-target KO this team relies on from Garchomp carries that miss chance, and nothing here fixes it.
