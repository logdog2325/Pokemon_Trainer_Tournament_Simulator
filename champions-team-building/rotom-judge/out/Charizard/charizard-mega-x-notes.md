# Mega Charizard X team, Reg M-C doubles

Paste: `out/Charizard/charizard-mega-x.txt`. `node validate.js out/Charizard/charizard-mega-x.txt --require "Charizard:Mega X"`
printed "LEGAL: all checks passed." Every number below comes from `rotom-judge/engine.js` against the 21-threat board
spreads (spread moves include the x0.75). PT = our Psychic Terrain, HH = Helping Hand, +1 = after one Dragon Dance.

| Slot | Set | Final stats |
|---|---|---|
| Charizard @ Charizardite X | Jolly 30 Atk / 10 Def / 26 Spe. Flare Blitz, Dragon Claw, Dragon Dance, Protect | 153/180/141/135/105/160 (Mega X) |
| Indeedee-F @ Colbur Berry | Relaxed 32 HP / 32 Def / 2 SpD, Psychic Surge. Follow Me, Helping Hand, Expanding Force, Trick Room | 177/75/128/115/127/94 |
| Incineroar @ Sitrus Berry | Impish 32 HP / 2 Atk / 32 Def, Intimidate. Fake Out, Flare Blitz, Throat Chop, Parting Shot | 202/137/156/90/110/80 |
| Weavile @ Focus Sash | Jolly 2 HP / 32 Atk / 32 Spe, Pressure. Icicle Crash, Knock Off, Fake Out, Taunt | 147/172/85/58/105/194 |
| Milotic @ Leftovers | Modest 32 HP / 14 Def / 20 SpA, Competitive. Scald, Ice Beam, Icy Wind, Protect | 202/72/113/154/145/101 |
| Gholdengo @ Life Orb | Modest 7 HP / 2 Def / 32 SpA / 25 Spe, Good as Gold. Make It Rain, Shadow Ball, Focus Blast, Protect | 169/72/117/203/111/129 |

Legality notes found while building: **Incineroar does not have Knock Off in its Champions movepool** (the validator
rejected it, even though the engine's board Incineroar carries it). It runs Throat Chop instead, which also silences
Sylveon's Hyper Voice. Charizard's Life Orb option from the brief does not apply, because Charizard must hold its stone.
Helping Hand from Indeedee is the power boost instead.

## Game plan

Mega X is a single-target Dragon Dance sweeper. It needs one safe setup turn. After that it runs 240 Speed at +1, which is
faster than every board threat (fastest 189) and every Mega Z (223). It KOs most of the board with Flare Blitz or
Dragon Claw.

1. **Indeedee-F makes the setup turn.** Psychic Terrain blocks Fake Out, Sucker Punch, Extreme Speed, Grassy Glide and
   First Impression against grounded Charizard X. Follow Me pulls single-target hits: Garchomp Dragon Claw (100-119.5% on
   Zard), M-Salamence Dragon Claw (90-107%), Sneasler Close Combat. Indeedee takes those at 48.6-57.1%, 42.9-51.4% and
   54.8-65%. Relaxed 0 Speed gives 94, slower than Rillaboom (105) and the board Indeedee-F (105), so our terrain lands
   last on a shared lead. Colbur Berry halves Kingambit Kowtow Cleave from 85.9-102.8% to 42.9-51.4%.
2. **Helping Hand turns +1 near-misses into KOs:** +1 HH Dragon Claw KOs Incineroar (101.5-119.8%) and Milotic
   (107.9-128.2%). +1 HH Flare Blitz KOs Farigiraf (143.2-169.4%), Archaludon (132.6-156.4%) and M-Baxcalibur (127.7-150.5%).
3. **Weavile and Milotic remove Garchomp and M-Salamence,** the two Dragons that threaten X before it moves.
4. **Incineroar and Gholdengo take what X cannot:** Intimidate plus Fake Out on non-PT turns, and a special Fighting
   hit for Kingambit, M-Tyranitar and Archaludon.

## Speed control (independent layers)

1. **Dragon Dance (Charizard).** Self-contained: +1 takes X from 160 to 240.
2. **Icy Wind (Milotic).** Spread Speed drop. It does not depend on any other slot, and it slows Garchomp (169) to 112,
   below Charizard's +0 160.
3. **Fake Out (Weavile, Incineroar).** Two users. It works on turns without our PT, or on Flying and Levitate targets
   under PT. Weavile's is the faster one (194).
4. **Trick Room (Indeedee-F) and Taunt (Weavile).** These answer opposing Trick Room. Weavile Taunts Farigiraf or
   Indeedee from 194 before Trick Room (which has -7 priority). If Trick Room goes up anyway, Indeedee reverses it.

Layers 2 and 3 do not depend on each other or on Indeedee. Icy Wind's Speed drop also stays after Milotic faints.

## Default bring-4 and leads

**Default four: Charizard, Indeedee-F, Weavile, Incineroar.**

- **Default lead: Indeedee-F + Charizard.** Mega Evolve on turn 1. Indeedee uses Follow Me and Charizard uses Dragon Dance. On turn 2,
  Charizard attacks at +1 and Indeedee uses Helping Hand or Expanding Force (it OHKOs Sneasler even after the seed's +1 SpD:
  129.3-152.2%). Weavile and Incineroar wait in the back.
- **Against Garchomp** (whose spread Earthquake bypasses Follow Me, 7/16 to OHKO X): **lead Weavile + Charizard.**
  Weavile outspeeds (194 vs 169) and Icicle Crash OHKOs (155.7-183.8%, and 105.9-125.4% even at -1 from their Incineroar's Intimidate).
  Or Fake Out Garchomp while Charizard Dragon Dances. Keep Indeedee in the back. With no PT on the field our Fake Out works.
- **Against Incineroar + Kingambit:** bring Gholdengo over Weavile. Focus Blast KOs Kingambit (110.6-130.4%, 70%
  accurate). Charizard's +0 Flare Blitz KOs Kingambit (106.8-128%), but not after Intimidate (72.9-86.5%), so Dragon Dance before
  attacking, or Parting Shot/switch to reset.
- **Against M-Salamence / Dragon-heavy:** bring Milotic. Ice Beam OHKOs M-Salamence (103.2-122.6%) whether or not it
  Intimidates, and Competitive punishes the Intimidate with +2 SpA.
- **Against Trick Room (Farigiraf / Indeedee-F):** Weavile (Taunt) + Indeedee (reverse TR) + Charizard + Gholdengo.
- **Against Rain:** Charizard's Fire is halved, so bring Gholdengo and Milotic and use Dragon Claw as X's main hit. Pelipper
  Weather Ball does 76.1-91% to X, so it survives.

## Threat table (two answers each, engine numbers)

| Threat | Answer 1 | Answer 2 | Extra |
|---|---|---|---|
| Rillaboom | Charizard +0 Flare Blitz 136.7-161.8% KO (Grass does x0.25 to X; HHP 65.4-77.1%) | Incineroar: resists Grass (Wood Hammer 27.2-32.2%), Intimidate, Flare Blitz 81.2-95.7%, HH Flare Blitz 121.7-143.5% KO | Weavile Icicle Crash 72.5-85% |
| Sneasler | Indeedee Expanding Force in PT 129.3-152.2% KO (with the seed's +1 SpD) | Charizard +0 Flare Blitz 126.8-149% KO. Takes Close Combat at 57.5-68.6% first | Gholdengo is immune to Close Combat, Dire Claw and Fake Out |
| Incineroar | Milotic: Competitive turns Intimidate into +2, and +2 Scald does 101-118.8% KO (+0 50.5-60.4%) | Gholdengo Focus Blast 86.1-101.5% (2/16, 70%) | Charizard +1 HH Dragon Claw 101.5-119.8% KO |
| M-Salamence | Weavile Icicle Crash 118.3-141.9% KO (-1: 79.6-96.8%) | Milotic Ice Beam 103.2-122.6% KO | Charizard +1 Dragon Claw 114.5-135.5% KO |
| Kingambit | Charizard +0 Flare Blitz 106.8-128% KO (the board's Chople does not apply to Fire). Sucker Punch is blocked by PT | Gholdengo Focus Blast 110.6-130.4% KO (70%) | Indeedee Colbur takes Kowtow Cleave at 42.9-51.4% |
| Indeedee-F | Charizard +1 Flare Blitz 105.6-124.3% KO | Weavile Knock Off 57.6-67.8% (removes Sitrus) plus Taunt against its Trick Room | Incineroar Throat Chop 55.4-65.5%, Gholdengo Make It Rain 59.3-70.6% |
| M-Golisopod | Charizard +0 Flare Blitz 180.2-214.3% KO. First Impression is blocked by PT against grounded targets | Incineroar Flare Blitz 105.5-125.3% KO (2 Atk is enough) | Gholdengo immune to Close Combat |
| Garchomp | Weavile Icicle Crash 155.7-183.8% KO, outspeeds (194 vs 169) | Milotic Ice Beam 110.3-129.7% KO | Charizard +0 Dragon Claw 101.1-119.5% KO (slower), +1 149.2-177.3% |
| M-Tyranitar | Gholdengo Focus Blast 165.7-196.1% KO (70%) | Incineroar Intimidate + Milotic Scald 52.2-61.8% (2HKO) | Weak spot, see below |
| Archaludon | Gholdengo Focus Blast 155.2-184% KO (70%) | Charizard +1 HH Flare Blitz 132.6-156.4% KO | Draco Meteor OHKOs X (174-207%), so don't set up into it |
| Arcanine-Hisui | Milotic Scald 162.8-195.3% KO | Gholdengo Focus Blast 139-164.5% KO | Head Smash OHKOs X |
| Sylveon / Whimsicott | Gholdengo Make It Rain 101.1-120.3% / 205.1-240.9% KO | Charizard Flare Blitz (+1 125.4-148.6% on Sylveon; +0 221.9-262% on Whimsicott) | Throat Chop stops Hyper Voice |

## Spread justifications

- **Charizard, Jolly 0 HP / 30 Atk / 10 Def / 26 Spe.** Spe 26 gives 160. That outruns M-Salamence (158) and Arcanine-H (156)
  at +0. At +1 it gives 240, which beats the Mega Z trio (223) and every board threat (189). Spe 24 would give 158, a tie with Salamence. Atk 30 (180) is the
  lowest that makes +0 Dragon Claw a guaranteed OHKO on Garchomp (101.1-119.5%; 28 Atk gives 15/16). It also keeps +1 Flare Blitz on
  Indeedee-F and M-Staraptor at 16/16. The last 10 points go into Def, which was better than any HP/Def split tested. Garchomp spread
  EQ drops from 11/16 (10 HP) to 7/16 (91.5-108.5%), and M-Salamence Dragon Claw drops to 6/16 (90.2-107.2%). 153 HP takes 9 sand chip.
  Flare Blitz recoil is 1/3 of damage dealt, so it caps X at about three attacks. Don't use it on something already low.
- **Indeedee-F, Relaxed 32 HP / 32 Def / 2 SpD.** Minus-Speed nature, 0 Spe gives 94, so it sets PT after Rillaboom and opposing Indeedee-F (105).
  Max physical bulk because Follow Me absorbs physical hits: M-Salamence Double-Edge 78-92.1%, Sneasler Close Combat
  54.8-65%, Garchomp Dragon Claw 48.6-57.1%. Colbur Berry halves Kowtow Cleave (to 42.9-51.4%) and M-Tyranitar Crunch (to 47.5-56.5%).
- **Incineroar, Impish 32 HP / 2 Atk / 32 Def.** Survives Sneasler Close Combat 78.2-93.1%, M-Golisopod Close Combat
  83.7-99% and Garchomp EQ 65.8-77.2% before Sitrus (50 HP) and before its own Intimidate. 2 Atk is enough for Flare Blitz to KO M-Golisopod
  (105.5-125.3%). Adamant 20 Atk would make Rillaboom a 15/16 KO but lets Sneasler Close Combat KO 14/16, so bulk won.
- **Weavile, Jolly 2 HP / 32 Atk / 32 Spe.** Spe 32 gives 194, which outruns Sneasler and M-Froslass (189) and Whimsicott (184). Atk 32 keeps
  Icicle Crash an OHKO on Garchomp even at -1 from Intimidate (105.9-125.4%) and on M-Salamence at +0 (118.3-141.9%). Focus Sash
  replaces bulk. Icicle Crash is 90% accurate, which is accepted.
- **Milotic, Modest 32 HP / 14 Def / 20 SpA.** SpA 20 (154) is the lowest that makes Ice Beam a 16/16 OHKO on M-Salamence
  (103.2-122.6%; 16 SpA is 15/16) and Garchomp (110.3-129.7%). The rest goes into bulk, with Def over SpD: M-Salamence Double-Edge 76.7-91.1%
  (the SpD version takes 88.1-104%), Arcanine-H Head Smash 81.2-95%. 202 HP gives 12 Leftovers per turn.
- **Gholdengo, Modest 7 HP / 2 Def / 32 SpA / 25 Spe.** Spe 25 gives 129, which outspeeds Pelipper (128). 32 SpA with Life Orb is needed for Focus Blast
  on Kingambit (110.6-130.4%) and Make It Rain on Sylveon (101.1-120.3%). 7 HP gives 169, exactly 16 Life Orb recoil
  (170 would lose 17).

## Worst matchup (honest)

**Trick Room with Intimidate, e.g. Farigiraf + Incineroar + M-Tyranitar or Kingambit.** Armor Tail blocks our Fake Out.
Intimidate cancels X's Dragon Dance, and under Trick Room X's +1 Speed is a liability. M-Tyranitar takes +1 Flare Blitz at 33.8-39.6%
and Dragon Claw at 45.4-53.1%, and its Rock Slide in sand does 74.8-89% to X. Our answers are Weavile Taunt on Farigiraf (Follow Me or Ally
Switch can still stop it), Indeedee reversing Trick Room, and Gholdengo Focus Blast (70% accurate). In that game Charizard is a
late cleaner, not the lead.

Second weakness: **Garchomp + Rock Slide/EQ spread pressure.** EQ ignores Follow Me and does 91.5-108.5% to X. The team
needs Weavile on the field first, or Intimidate plus Fake Out, before X can set up. Sneasler under our own PT gets its Psychic Seed
(+1 SpD, Unburden 378 Speed), so against Sneasler plus Garchomp, lead Weavile + Charizard and keep Indeedee back.
