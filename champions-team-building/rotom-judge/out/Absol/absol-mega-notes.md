# Mega Absol (Absolite) team, Reg M-C doubles

Paste: `out/Absol/absol-mega.txt`. `validate.js --require "Absol:Mega"` printed "LEGAL: all checks passed."
Every number below comes from `rotom-judge/engine.js` against the 21-threat board spreads. PT = our Psychic Terrain,
HH = Helping Hand.

| Slot | Set | Final stats |
|---|---|---|
| Absol @ Absolite | Timid 26 HP / 20 SpA / 20 Spe. Ice Beam, Dark Pulse, Flamethrower, Protect | 166/153/80/155/80/170 |
| Indeedee-F @ Sitrus Berry | Relaxed 32 HP / 32 Def / 2 SpD, Psychic Surge. Follow Me, Helping Hand, Expanding Force, Trick Room | 177/75/128/115/127/94 |
| Talonflame @ Sharp Beak | Jolly 2 HP / 32 Atk / 32 Spe, Gale Wings. Brave Bird, Flare Blitz, Tailwind, Protect | 155/133/91/84/89/195 |
| Arcanine-Hisui @ Charcoal | Jolly 12 HP / 32 Atk / 22 Spe, Intimidate. Flare Blitz, Head Smash, Extreme Speed, Protect | 182/167/100/103/100/145 |
| Sneasler @ Psychic Seed | Jolly 2 HP / 32 Atk / 32 Spe, Unburden. Close Combat, Gunk Shot, Fake Out, Protect | 157/182/80/54/100/189 |
| Gholdengo @ Life Orb | Modest 7 HP / 2 Def / 32 SpA / 25 Spe, Good as Gold. Make It Rain, Shadow Ball, Focus Blast, Protect | 169/72/117/203/111/129 |

## Two corrections to the brief (these changed the set)

1. **Foul Play is mis-priced by the engine, and the brief's Foul Play KOs are not real.** `calcDamage` in `app/app.js`
   has no Foul Play case, so it uses the *attacker's* Attack. The real move uses the *target's* Attack. I re-priced it by
   feeding the target's Attack into the same engine (scratch helper, engine untouched). Real Foul Play from Mega Absol:
   Gholdengo 40.2-49.7% (brief: 111.2-132.5% KO), M-Froslass 73.5-87.1% (brief: KO), Indeedee-F 31.6-38.4% (brief: 11/16),
   Farigiraf 43.2-51.4% (brief: 4/16). Foul Play is cut and replaced with **Dark Pulse** (special STAB, 100%).
   The engine bug is worth fixing in `app/app.js`. I did not touch it.
2. **Timid beats Hasty and Jolly for this job.** Once Foul Play goes, the set has no physical move, so Atk is dead weight.
   Timid keeps 80 Def (the verdict showed Hasty's 72 Def turns 13 OHKOs into 16), and it adds SpA. The Ice Beam KOs that
   were 12/16 and 8/16 on Hasty become guaranteed with no Helping Hand: Garchomp 110.3-129.7%, M-Salamence 103.2-122.6%.
   Opposing Intimidate does nothing to Absol's damage, and Magic Bounce returns Parting Shot to Incineroar.

## Game plan

Mega Absol is a special Dragon-and-Steel breaker. It outspeeds Garchomp and M-Salamence and OHKOs both with 100%-accurate
Ice Beam. Flamethrower removes M-Golisopod with HH (125.3-148.4%) and Dark Pulse removes Gholdengo with HH
(113.6-134.9%). The partners do three jobs:

1. **Indeedee-F shields Absol.** Psychic Terrain blocks Fake Out (Rillaboom 22.3-26.5%, Incineroar 16.9-20.5%),
   Grassy Glide (59.6-70.5%), Kingambit Sucker Punch and M-Golisopod First Impression (221.1-260.2%) into grounded Absol.
   Follow Me pulls Close Combat. Indeedee takes Sneasler CC at 54.8-65% and Absol would take 185.5-220.5%.
   Helping Hand turns Absol's 2HKOs into KOs. Relaxed 0 Spe gives 94, slower than Rillaboom (105) and the board
   Indeedee-F (105), so our terrain lands last on a shared lead.
2. **Partners take what Absol cannot touch.** Absol does 12.4-14.9% to Incineroar, 49.3-58% to Kingambit and 37.7-45.4%
   to Rillaboom. Sneasler (CC), Arcanine-H (Flare Blitz / Head Smash) and Gholdengo (Focus Blast) handle those.
3. **Fighting and Fairy cover.** Talonflame (Flying) resists Fighting and Gholdengo (Ghost) is immune to it. Talonflame and
   Gholdengo both OHKO Whimsicott, and Gholdengo OHKOs Sylveon (Make It Rain 101.1-120.3%). Sneasler is KO'd by Talonflame
   Brave Bird (171.3-203.2%), Indeedee Expanding Force in PT (129.3-152.2% even after its seed's +1 SpD) and Arcanine Flare
   Blitz (108.3-128.7%).

## Speed control (independent layers)

1. **Tailwind, Talonflame (Gale Wings).** Priority at full HP. It targets our own side, so our Psychic Terrain does
   not block it. Under Tailwind, Absol runs 340.
2. **Unburden, Sneasler + Psychic Seed.** The seed is consumed in our terrain, so Sneasler runs 378. This does not
   depend on Talonflame.
3. **Trick Room, Indeedee-F.** Mainly for reversing an opposing Farigiraf or Indeedee Trick Room that would put Absol
   (170) last.
4. **Priority and Fake Out (supporting).** Arcanine Extreme Speed and Sneasler Fake Out. Both fail into grounded
   targets while our PT is up, so they work on no-Indeedee leads or into Flying/Levitate targets.

Layers 1 and 2 are independent. Unburden survives Talonflame fainting.

## Default bring-4 and leads

**Default four: Absol, Indeedee-F, Talonflame, Arcanine-Hisui.**
- **Default lead: Indeedee-F + Absol.** Mega Evolve turn 1. Indeedee Follow Me when a physical Fighting, Bug or
  Normal hit would kill Absol. Helping Hand when Absol has a HH-only KO lined up (Golisopod, Gholdengo, Indeedee-F 10/16).
  Back: Talonflame (Tailwind) and Arcanine (Intimidate, Fire).
- **Against Sneasler teams:** lead **Talonflame + Absol** with Indeedee in the back. Without our terrain, their seed
  never fires, and Gale Wings Brave Bird (priority) KOs Sneasler 171.3-203.2% before it moves. Under our own PT,
  priority into grounded Sneasler is blocked and their seed takes them to 378, so Indeedee on the lead hands them the
  best version of Sneasler.
- **Against Incineroar + Kingambit:** bring Sneasler over Talonflame. Lead Indeedee + Sneasler: the seed fires,
  Sneasler moves at 378, and HH CC KOs Chople Kingambit (126.1-149.3%). Absol comes in once Intimidate is spent. Intimidate
  does not reduce Absol's damage anyway.
- **Against Fairy (Sylveon, Whimsicott) or Gholdengo:** bring Gholdengo over Arcanine.
- **Against Trick Room (Farigiraf / Indeedee):** keep Indeedee to reverse, and bring Sneasler.
- **Against Rain:** Absol, Indeedee, Sneasler, Gholdengo (see worst matchup).

## Threat table (two or more answers each)

| Threat (usage) | Answer 1 | Answer 2 | Extra |
|---|---|---|---|
| Rillaboom (37.18%) | Arcanine Flare Blitz 118.4-139.1% KO | Sneasler Gunk Shot 105.3-125.6% KO (80%) | Talonflame HH Brave Bird 141.1-167.1% KO (93.7-111.1%, 10/16 alone). PT blocks Fake Out and Grassy Glide on Absol |
| Sneasler (34.29%) | Talonflame Brave Bird 171.3-203.2% KO (Gale Wings priority, no-PT lead) | Indeedee Expanding Force in PT 129.3-152.2% KO (after the seed's +1 SpD) | Arcanine Flare Blitz 108.3-128.7% KO; Intimidate drops its CC on Indeedee to 37.9-45.8% |
| Incineroar (26.77%) | Sneasler Close Combat 105-124.8% KO | Arcanine Head Smash 121.8-143.6% KO (80%) | Gholdengo HH Focus Blast 129.2-152.5%. Magic Bounce reflects Parting Shot |
| M-Salamence (23.15%) | Absol Ice Beam 103.2-122.6% KO, outspeeds (170 vs 158) | Arcanine Head Smash 101.1-120.4% KO (80%) | Gholdengo HH Make It Rain 97.3-116.1% (14/16). Its Double-Edge on Absol: 132.5-156%, at -1 89.2-104.8% (6/16) |
| Kingambit (22.44%) | Sneasler HH Close Combat 126.1-149.3% KO through Chople | Gholdengo Focus Blast 110.6-130.4% KO (70%) | Arcanine HH Flare Blitz 141.1-167.1% KO. Absol survives Iron Head 70.5-83.1% and Kowtow Cleave 36.7-43.4% |
| Indeedee-F (21.78%) | Absol HH Dark Pulse 93.2-111.9% (10/16) | Sneasler HH Close Combat 81.9-97.2% | No clean OHKO: a 2HKO target. Talonflame HH Brave Bird 71.2-85.3%. Our Trick Room reverses theirs |
| M-Golisopod (18.49%) | Arcanine Flare Blitz 152.7-181.9% KO (102.7-121.4% at -1) | Talonflame Flare Blitz 101.1-120.9% KO | Absol HH Flamethrower 125.3-148.4% KO (83.5-98.9% alone). PT blocks First Impression into Absol |
| Garchomp (17.12%) | Absol Ice Beam 110.3-129.7% KO, outspeeds (170 vs 169) | Gholdengo HH Make It Rain 104.3-123.2% KO | Absol survives its Dragon Claw (80.7-96.4%) and Earthquake (75.3-89.2%) |
| Gholdengo (15.23%) | Arcanine Flare Blitz 140.8-166.3% KO (145 outruns 144) | Gholdengo Shadow Ball 129-152.1% KO | Absol HH Dark Pulse 113.6-134.9% KO |
| Whimsicott / Sylveon | Gholdengo Make It Rain 205.1-240.9% / 101.1-120.3% KO | Talonflame Brave Bird 148.9-178.8% KO (Whimsicott); Sneasler Gunk Shot 129.9-153.7% (Sylveon, 80%) | Whimsicott's Sash stops single-hit KOs from full |

## Spread justifications

- **Absol, Timid 26 HP / 20 SpA / 20 Spe.** Spe 20 → **170** outruns max-Speed Jolly Garchomp (169), and so
  M-Salamence (158) and Gholdengo (144). More Speed buys nothing: M-Staraptor (178) is not OHKO'd by Ice Beam
  (51.9-61.6%) and Sneasler (189) is handled by the partners. SpA 20 → **155** is the smallest round figure that keeps
  both Dragon KOs guaranteed: Salamence 103.2-122.6%, Garchomp 110.3-129.7%. The rest goes to HP → **166**, which gives:
  survives Incineroar Flare Blitz 75.9-89.2% (the fact-sheet 0-HP spread took 5/16), Kingambit Iron Head 70.5-83.1%,
  Garchomp Dragon Claw 80.7-96.4% (was 11/16), M-Tyranitar Low Kick 81.9-96.4% (was 12/16), M-Staraptor Brave Bird
  86.7-101.8% (2/16). Gholdengo Make It Rain drops to 8/16 and rain Weather Ball to 10/16. HP beat Def: 26 Def
  instead left Make It Rain and Weather Ball as full KOs. Sand chip is 10 at 166, the same as at 160.
- **Indeedee-F, Relaxed 32 HP / 32 Def / 2 SpD.** 0 Spe with -Spe → **94**, below Rillaboom and the opposing Indeedee-F
  (105), so our terrain lands last. Max physical bulk, because it redirects physical hits: Kingambit Kowtow Cleave
  85.9-102.8% (2/16; 7/16 on the 26 Def / 8 SpD split, and Kingambit outnumbers Sylveon 2:1 in usage), Salamence
  Double-Edge 78-92.1%, Rillaboom Wood Hammer 75.7-90.4%, Sneasler CC 54.8-65%. Sylveon Hyper Beam is 88.7-105.6% (6/16).
- **Talonflame, Jolly 2 HP / 32 Atk / 32 Spe.** 195 outruns Sneasler (189), M-Froslass (189) and Whimsicott (184)
  when Gale Wings is off. Full Atk is needed: Brave Bird on Rillaboom is only 10/16 even at 32.
- **Arcanine-Hisui, Jolly 12 HP / 32 Atk / 22 Spe.** 22 Spe → 145 outruns Timid Gholdengo (144) for Flare Blitz
  140.8-166.3%. 32 Atk keeps Head Smash on Salamence a KO (101.1-120.4%). The rest goes to HP.
- **Sneasler, Jolly 2 HP / 32 Atk / 32 Spe.** 189 ties opposing Sneasler without the seed. Max Atk is needed: HH CC on
  Kingambit through Chople is 126.1-149.3%, and unboosted it is 84.1-99.5%.
- **Gholdengo, Modest 7 HP / 2 Def / 32 SpA / 25 Spe.** 25 Spe → 129 outruns Timid max Pelipper (128). HP 169 is the
  Life Orb-optimal point: recoil is 16 at 160-169 and 17 at 170. 32 SpA: Make It Rain on Sylveon is 101.1-120.3%.

## Worst matchup (honest)

**Rain (Pelipper + Archaludon, often with Milotic).** Talonflame is OHKO'd by Weather Ball (181.9-214.2%) and Electro
Shot (138.1-162.6%), and Arcanine by Weather Ball (276.9-325.3%) and Scald (200-237.4%). Absol takes Weather Ball
at 94-110.8% (10/16) and Draco Meteor at 107.2-126.5%. It has nothing good into the rain side: Dark Pulse on Archaludon
46.4-54.7%, HH Dark Pulse on Milotic 31.2-36.1%, and Pelipper holds a Focus Sash. The plan is Absol / Indeedee /
Sneasler / Gholdengo. Sneasler HH CC KOs Archaludon (139.2-164.1%), Gholdengo Focus Blast KOs it at 70%, Gholdengo
Shadow Ball breaks Pelipper's Sash, and our Trick Room can flip their Tailwind. Absol is mostly Protect and Ice Beam
chip there. I would call this matchup unfavoured.

Also watch **Sneasler + our own Psychic Terrain**. Their seed takes it to 378 and +1 SpD, and our Gale Wings and
Extreme Speed are blocked into it. Its CC OHKOs Absol even at -1 (122.9-145.8%). That is why the Sneasler lead above
leaves Indeedee in the back.

Accuracy accepted on purpose: Head Smash 80% (Salamence, Incineroar), Gunk Shot 80% (Rillaboom, Sylveon), Focus Blast
70% (Kingambit). Each threat that depends on one of these also has a 100%-accurate answer in the table.
