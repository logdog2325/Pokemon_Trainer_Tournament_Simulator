# Mega Mewtwo X team (Reg M-C doubles)

> **HYPOTHETICAL TEAM.** Mewtwo is **not in Pokemon Champions**. Its stats and movepool come from
> `rotom-judge/hypothetical.js` (main-series stats, Scarlet/Violet learnset). Every teammate, item, move and rule
> below is Champions-legal and was checked by `validate.js` ("LEGAL: all checks passed.").
> Every number comes from `rotom-judge/engine.js` against the 21-threat Reg M-C board spreads.

Paste: `out/Mewtwo/mewtwo-mega-x.txt`

| Slot | Set | Final stats |
|---|---|---|
| Mewtwo @ Mewtwonite X | Jolly 11 HP / 32 Atk / 23 Spe. Zen Headbutt, Drain Punch, Ice Punch, Protect | 192/242/120/156/120/190 |
| Indeedee-F @ Sitrus Berry | Relaxed 32 HP / 26 Def / 8 SpD, Psychic Surge. Follow Me, Helping Hand, Expanding Force, Trick Room | 177/75/122/115/133/94 |
| Talonflame @ Sharp Beak | Jolly 2 HP / 32 Atk / 32 Spe, Gale Wings. Tailwind, Brave Bird, Flare Blitz, Protect | 155/133/91/84/89/195 |
| Arcanine-Hisui @ Charcoal | Jolly 12 HP / 32 Atk / 22 Spe, Intimidate. Flare Blitz, Head Smash, Extreme Speed, Protect | 182/167/100/103/100/145 |
| Sneasler @ Psychic Seed | Jolly 2 HP / 32 Atk / 32 Spe, Unburden. Close Combat, Gunk Shot, Fake Out, Protect | 157/182/80/54/100/189 |
| Gholdengo @ Life Orb | Modest 7 HP / 2 Def / 32 SpA / 25 Spe, Good as Gold. Make It Rain, Shadow Ball, Focus Blast, Protect | 169/72/117/203/111/129 |

## Game plan

Mega Mewtwo X is a fast (190), physically bulky Psychic/Fighting attacker whose moves never miss. The team gives it three things:

1. **Helping Hand + Psychic Terrain (Indeedee-F).** The combination turns its near-misses into KOs. HH Drain Punch KOs Chople Kingambit (105.8-126.1%) and Incineroar (130.7-155.9%) and heals Mewtwo. PT Zen Headbutt KOs M-Staraptor (128.1-151.9%), and HH PT Zen Headbutt KOs Sylveon (112.4-133.3%). Psychic Terrain also blocks Grassy Glide, Sucker Punch and Fake Out into our grounded mons. Relaxed 0-Speed Indeedee runs at **94**, slower than Rillaboom (105), so our terrain is set last on a simultaneous lead.
2. **Follow Me for the special and Flying hits that OHKO Mewtwo X.** Sylveon Hyper Beam is 175.5-206.8% on Mewtwo but only 85.3-101.1% (2/16) on Indeedee. Indeedee takes M-Salamence Double-Edge at 81.4-96% and M-Staraptor Brave Bird at 53.1-63.3%, and it is **immune to Gholdengo's Shadow Ball** (Normal type).
3. **Partners that remove what Mewtwo cannot.** Arcanine-H and Talonflame both OHKO Rillaboom-side Fire targets (M-Golisopod, Gholdengo). Sneasler and Gholdengo take the Dark types and Sylveon when Intimidate has blunted Mewtwo.

Intimidate plan: there is no Clear Amulet, so we don't force Mewtwo through a -1. At -1, Mewtwo either Protects or switches to reset, or it keeps doing the jobs Intimidate doesn't break: -1 PT Zen Headbutt still KOs Sneasler (301-358%), and -1 HH Ice Punch still KOs M-Salamence (100-119.4%). The Dark-type KOs move to Sneasler (Close Combat on Incineroar 105-124.8%, HH Close Combat on Chople Kingambit 126.1-149.3%), Arcanine (Head Smash on Incineroar 121.8-143.6%) and Gholdengo (Focus Blast on Kingambit 110.6-130.4%, 70%).

## Speed control (independent layers)

1. **Tailwind (Talonflame, Gale Wings).** It has priority at full HP. Tailwind targets our own side, so our own Psychic Terrain does not block it. Without priority, Talonflame is still 195, faster than every board threat.
2. **Unburden (Sneasler + Psychic Seed).** The seed is consumed in our terrain, which doubles Sneasler's Speed to 378 and gives it +1 SpD. This works without Talonflame.
3. **Fake Out (Sneasler)** is a supporting layer only. It works whenever our terrain is not up, and against ungrounded Flying/Levitate targets even when it is.
4. **Trick Room (Indeedee-F)** is used only in reverse, to cancel an opposing Farigiraf/Indeedee Trick Room that would make Mewtwo move last. **Extreme Speed** (Arcanine) is a +2 priority finisher against Flying targets or when terrain is down.

Mewtwo X at 190 already outspeeds all 21 board threats. Speed control here protects it against *opposing* Tailwind and Trick Room, the only ways M-Staraptor (Brave Bird 100-118.8%) or M-Salamence (Double-Edge 153.6-181.3%) get to move first.

## Default bring-4 and leads

**Default four: Mewtwo X, Indeedee-F, Talonflame, Arcanine-Hisui.**
- **Default lead: Indeedee-F + Mewtwo X.** Turn 1: Mega Evolve. Indeedee uses Helping Hand when the target is Kingambit, Incineroar, Rillaboom or Sylveon, and Follow Me when Sylveon, Gholdengo, Staraptor or Salamence would hit Mewtwo. The back is Talonflame (Tailwind on entry) and Arcanine (Intimidate cycle, Fire coverage).
- **Against Tailwind / Trick Room teams:** lead Talonflame + Mewtwo. Talonflame uses Tailwind (priority) while Mewtwo attacks. Keep Indeedee in the back to reverse Trick Room.
- **Against Incineroar + Kingambit (Intimidate / Dark):** bring Sneasler over Talonflame. Lead Indeedee + Sneasler so the seed triggers and Sneasler outspeeds at 378 for HH Close Combat. Mewtwo comes in after the Intimidate is spent.
- **Against Sylveon / Fairy or Gholdengo:** bring Gholdengo over Talonflame. Make It Rain KOs Sylveon (101.1-120.3%) and Whimsicott, and Shadow Ball KOs the mirror (129-152.1%).
- **Against Rain (Pelipper):** bring Sneasler and Gholdengo over Talonflame and Arcanine (see worst matchup).

## Threat table (two or more answers each; engine numbers, PT = Psychic Terrain)

| Threat (usage) | Answer 1 | Answer 2 | Extra |
|---|---|---|---|
| Rillaboom (37.18%) | Arcanine-H Flare Blitz 118.4-139.1% KO (in Grassy) | Sneasler Gunk Shot 105.3-125.6% KO (80% acc) | Talonflame Brave Bird 93.7-111.1% (10/16); Mewtwo HH PT Zen Headbutt 93.2-110.1% (9/16). PT blocks Grassy Glide on our grounded mons, and our 94-Speed Indeedee wins the lead terrain |
| Sneasler (34.29%) | Mewtwo PT Zen Headbutt 450-536% KO (301-358% even at -1) | Talonflame Brave Bird 171.3-203.2% KO | Arcanine Flare Blitz 108.3-128.7% KO (PT) |
| Incineroar (26.77%) | Sneasler Close Combat 105-124.8% KO | Arcanine Head Smash 121.8-143.6% KO (80%) | Mewtwo HH Drain Punch 130.7-155.9% KO at +0 |
| M-Salamence (23.15%) | Mewtwo Ice Punch 98.9-118.3% (15/16); -1 + HH 100-119.4% KO | Arcanine Head Smash 101.1-120.4% KO (80%) | Indeedee Follow Me soaks Double-Edge at 81.4-96% |
| Kingambit (22.44%) | Mewtwo HH Drain Punch 105.8-126.1% KO (through Chople) | Sneasler HH Close Combat 126.1-149.3% KO (through Chople) | Gholdengo Focus Blast 110.6-130.4% KO (70%); Arcanine Flare Blitz 93.7-111.1% (10/16). PT blocks Sucker Punch |
| Indeedee-F (21.78%) | Sneasler HH Close Combat 81.9-97.2% | Mewtwo HH Drain Punch 68.4-81.4% | No single OHKO: 2HKO and focus fire. Gholdengo Make It Rain (spread, ignores Follow Me) 59.3-70.6%. Our Indeedee's Trick Room reverses theirs |
| M-Golisopod (18.49%) | Arcanine Flare Blitz 152.7-181.9% KO (102.7-121.4% at -1) | Talonflame Flare Blitz 101.1-120.9% KO | Mewtwo takes First Impression at 63.5-76% |
| Garchomp (17.12%) | Mewtwo Ice Punch 129.7-153.5% KO | Gholdengo HH Make It Rain 104.3-123.2% KO (69.7-82.2% alone) | Talonflame Brave Bird 51.4-61.1% chip |
| Sylveon (10.63%) | Gholdengo Make It Rain 101.1-120.3% KO | Sneasler Gunk Shot 129.9-153.7% KO (80%) | Mewtwo HH PT Zen Headbutt 112.4-133.3% KO; Indeedee Follow Me absorbs Hyper Beam |
| Gholdengo (15.23%) | Arcanine Flare Blitz 140.8-166.3% KO (145 Spe outruns its 144) | Gholdengo Shadow Ball 129-152.1% KO | Talonflame Flare Blitz 93.5-111.2% (10/16); Indeedee is immune to Shadow Ball |
| M-Staraptor (8.94%) | Mewtwo PT Zen Headbutt 128.1-151.9% KO (Mewtwo is faster) | Talonflame Brave Bird 98.4-116.8% (14/16) | Follow Me soaks Brave Bird |

## Spread justifications

- **Mewtwo X, Jolly 11 HP / 32 Atk / 23 Spe.** Speed 23 gives **190**, which outruns Jolly max Sneasler and Timid M-Froslass (189) and so every board threat. Maxing Speed to 200 would only change Mega Raichu Y and Gengar from a loss to a tie. Atk 32 is needed: at 28, Ice Punch on M-Salamence drops from 15/16 to 13/16. The 9 points saved go to HP (192). That drops Gholdengo Shadow Ball from 15/16 to 11/16 KO (94.8-113.5%) and Wood Hammer in Grassy to 74-88%. Drain Punch recovery covers the rest.
- **Indeedee-F, Relaxed 32 HP / 26 Def / 8 SpD, 0 Spe.** Relaxed with 0 Speed gives **94**, slower than Rillaboom and Indeedee at 105, so our Psychic Surge resolves last on the lead. The Def/SpD split came from a scan over every split. At 26/8 it survives M-Salamence Double-Edge (81.4-96%) and Arcanine-H Head Smash (85.9-101.1%, 2/16). It is KO'd by Sylveon Hyper Beam in only 2/16 rolls (85.3-101.1%) and by Kowtow Cleave in 7/16 rolls. At 32/2 Def/SpD, Hyper Beam rises to 6/16. Sitrus Berry lets it take a second redirected hit.
- **Talonflame, Jolly 2 HP / 32 Atk / 32 Spe.** Speed 195 outruns Sneasler and M-Froslass (189) when Gale Wings is off (below full HP) or blocked by terrain on a grounded target. Atk 32 is needed for Brave Bird on M-Staraptor 14/16 and Flare Blitz on M-Golisopod 101.1-120.9% (no fire item, so no rolls to spare).
- **Arcanine-Hisui, Jolly 12 HP / 32 Atk / 22 Spe, Charcoal.** Speed 22 gives **145**, which outruns the board's Timid Life Orb Gholdengo (144) so Flare Blitz KOs first (140.8-166.3%). Atk 32 keeps Head Smash on M-Salamence a KO (101.1-120.4%), and at 24 it falls to 13/16. Charcoal lets Flare Blitz KO Rillaboom in Grassy (118.4-139.1%) and M-Golisopod even at -1 (102.7-121.4%). The rest goes to HP.
- **Sneasler, Jolly 2 HP / 32 Atk / 32 Spe.** Speed 189 ties opposing Sneasler before the seed and reaches 378 after it. Atk 32 is needed for Close Combat on Incineroar 105-124.8% KO and Gunk Shot on Rillaboom 105.3-125.6%.
- **Gholdengo, Modest 7 HP / 2 Def / 32 SpA / 25 Spe, Life Orb.** Modest 32 SpA is needed for Make It Rain on Sylveon (101.1-120.3%; Timid is only 9/16) and Shadow Ball on opposing Gholdengo. Speed 25 gives **129**, which outruns Pelipper (128), Archaludon (123) and M-Baxcalibur (125). HP 7 gives **169**, so Life Orb recoil is 16 per hit (170 would be 17).

## Worst matchup (honest)

**Rain (Pelipper) with Intimidate support.** Pelipper's Weather Ball OHKOs Talonflame (181.9-214.2%) and Arcanine-H (276.9-325.3%), which are two of the default four. Its Focus Sash means Mewtwo's Zen Headbutt (86.1-102.2%) never OHKOs it from full. Add Incineroar and Mewtwo is at -1 while two of our Fire types can't stay on the field. The fix is to bring Sneasler and Gholdengo instead. That loses Tailwind, so speed control falls back to Unburden alone, with nothing in reserve.

Also weak:
- **Garchomp spread pressure.** Rock Slide OHKOs Talonflame (144.5-171%), and Earthquake OHKOs Gholdengo (101.8-120.1%) and Arcanine.
- **Opposing Indeedee-F.** Nothing on the team OHKOs it, so a Follow Me + Trick Room Indeedee can buy a full Trick Room cycle unless our own Indeedee reverses it (there is no Encore or Taunt on this team).
- **Mewtwo X is still OHKO'd by** Sylveon Hyper Beam, M-Salamence Double-Edge and M-Staraptor Brave Bird when Follow Me is unavailable or the opponent has Tailwind.
