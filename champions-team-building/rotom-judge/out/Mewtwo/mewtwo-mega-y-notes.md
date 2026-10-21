# Mega Mewtwo Y: Psychic Terrain hyper-offense (Reg M-C doubles)

> **HYPOTHETICAL TEAM.** Mewtwo is **not in Pokemon Champions**. Its stats, Scarlet/Violet movepool and
> weight come from `rotom-judge/hypothetical.js`. Everything else on this team (the other five species,
> every item, move, ability and rule) is Champions-legal and passed `validate.js`. Paste: `mewtwo-mega-y.txt`.

All numbers below come from `rotom-judge/engine.js` against the Reg M-C BOARD spreads (16-roll L50 doubles
calcs; `(n/16)` = rolls that KO). Accuracy is noted separately, since the engine ignores it.

## Team

| Slot | Set | Job |
|---|---|---|
| Mewtwo @ Mewtwonite Y | Timid 0/0/21/32/0/13: Psystrike, Aura Sphere, Ice Beam, Protect | Win condition. All four moves are 100% accurate. |
| Indeedee-F @ Terrain Extender | Relaxed 32/0/32/0/2/0 (Spe 94): Follow Me, Helping Hand, Reflect, Protect | Psychic Surge, which blocks priority aimed at grounded Mewtwo. Also Helping Hand for the KO thresholds, redirection, and Reflect. |
| Arcanine-Hisui @ Life Orb | Adamant 2/32/0/0/0/32: Head Smash, Flare Blitz, Close Combat, Protect | Intimidate #1. Physical breaker for Kingambit, Golisopod, Incineroar, Salamence and Tyranitar. |
| Incineroar @ Sitrus Berry | Adamant 32/20/0/0/14/0: Flare Blitz, Darkest Lariat, Parting Shot, Will-O-Wisp | Intimidate #2 (cycled with Parting Shot), Golisopod/Rillaboom answer, burns Kowtow Cleave users. |
| Sneasler @ Psychic Seed | Jolly 2/32/0/0/0/32: Close Combat, Dire Claw, Throat Chop, Protect | Our terrain triggers Unburden (Spe 189 -> 378). It is the independent Kingambit/Incineroar answer. |
| Whimsicott @ Focus Sash | Timid 2/0/0/32/0/32: Tailwind, Moonblast, Encore, Taunt | Prankster Tailwind, Taunt against Trick Room, second Garchomp/Salamence answer. |

Item Clause: Mewtwonite Y, Terrain Extender, Life Orb, Sitrus Berry, Psychic Seed and Focus Sash are all distinct and
all in `ITEMS`. The team has one Mega Stone, and it runs **no Fake Out**, because our own Psychic Terrain would block it against grounded targets.

## Game plan

1. **Lead Indeedee-F + Mewtwo.** Relaxed 0-Speed Indeedee-F is 94 Speed, slower than Rillaboom (105) and a
   neutral 0-Speed opposing Indeedee-F (105). Its Psychic Surge therefore resolves last and **wins the terrain on the lead**.
   Terrain Extender makes it last 8 turns. While it is up, Sucker Punch, Grassy Glide and First Impression
   cannot touch the grounded Mega Y.
2. Turn 1: Mega Evolve. Mewtwo (190 Spe) moves before the whole board, including Jolly or Timid max Sneasler and M-Froslass at 189.
   Indeedee uses Helping Hand for the KO threshold, or Follow Me when a Kowtow Cleave or other physical nuke is aimed at Mewtwo.
   - HH Psystrike in terrain: Rillaboom **116.9-138.6% KO**. Sneasler dies to plain Psystrike (443-522%).
   - HH Aura Sphere: Kingambit **102.9-121.7% KO**. It ignores Intimidate and never misses.
   - Ice Beam: M-Salamence 163.4-193.5%, Garchomp 170.8-203.2%.
3. The back line is two Intimidates (Arcanine-Hisui and Incineroar). They take Kowtow Cleave on Mewtwo from 99.4-117.1% (15/16)
   down to 64.1-77.3%, or to 42.5-51.4% at -1 with Reflect up. They also remove the physical threats Mewtwo cannot touch:
   M-Golisopod, Incineroar and M-Tyranitar.
4. Speed control has three independent layers:
   - **Prankster Tailwind** (Whimsicott).
   - **Unburden Sneasler.** The Psychic Seed is consumed as soon as it enters our terrain, and the doubled Speed stays after Whimsicott faints.
   - **Psychic Terrain priority denial**, which stops opposing priority from reaching our grounded slower mons.
   - Anti-Trick Room support on top of those: Whimsicott's Prankster **Taunt/Encore** stops Farigiraf and Indeedee setting Trick Room (neither is Dark).

## Default bring-4 and leads

- **Default four: Mewtwo, Indeedee-F, Arcanine-Hisui, Incineroar.** Lead Indeedee-F + Mewtwo, with Arcanine and Incineroar in the back.
- **Against Tailwind or hyper-offense** (Whimsicott, Pelipper, M-Staraptor, Garchomp): Mewtwo, Indeedee-F, Whimsicott, Arcanine.
  Lead Whimsicott + Mewtwo, so Tailwind and Mewtwo's attack go up on turn 1, and bring Indeedee in later to reset the terrain.
- **Against Trick Room** (Farigiraf, Indeedee TR, Sinistcha): Mewtwo, Whimsicott, Sneasler, Arcanine.
  Lead Whimsicott (Taunt the setter) + Mewtwo, with Sneasler as the late Unburden cleaner.
- **Against Kingambit + Incineroar Dark cores**: Mewtwo, Indeedee-F, Sneasler, Arcanine.
  Sneasler HH Close Combat KOs Kingambit through Chople Berry (126.1-149.3%) and KOs Incineroar unboosted (105-124.8%).
- **Against Rillaboom Grassy**: always lead Indeedee-F so our terrain overwrites Grassy Terrain.
  Arcanine and Incineroar Flare Blitz are the backups if Indeedee goes down.

## Threat table: two or more answers per top threat (engine-verified)

| Threat (usage) | Answer 1 | Answer 2 (and 3) | What it does to us |
|---|---|---|---|
| **Rillaboom** 37.2% | Mewtwo HH Psystrike in Psychic Terrain **116.9-138.6% KO** (77.8-92.3% without HH) | Arcanine Flare Blitz **139.6-165.7% KO** (94.2-110.6%, 9/16 at -1). Incineroar Flare Blitz in Grassy **99.5-118.8% (15/16)** | Wood Hammer on Mewtwo: 84.5-101.1% (2/16) in Grassy, **65.2-77.9% under our terrain**. Grassy Glide is blocked by our terrain |
| **Sneasler** 34.3% | Mewtwo Psystrike **443.3-522.3% KO** (Mewtwo is faster) | Arcanine Flare Blitz **127.4-151.6% KO**. Incineroar Flare Blitz 91.7-108.9% (8/16) | Dire Claw on Mewtwo: 41.4-48.6%. Close Combat KOs Arcanine/Incineroar unless Intimidated (71.3-84.2% on Incineroar at -1) |
| **Incineroar** 26.8% | Sneasler Close Combat **105-124.8% KO** (71.3-84.2% at -1) | Arcanine Head Smash **115.8-136.6% KO even at -1** (80% acc) | Darkest Lariat on Mewtwo: 70.7-84% (see correction note) |
| **M-Salamence** 23.2% | Mewtwo Ice Beam **163.4-193.5% KO** | Arcanine Head Smash **144.1-172% KO** (13/16 at -1 after base-form Intimidate). Whimsicott HH Moonblast **103.2-122.6% KO** | Double-Edge on Mewtwo: 87.3-103.3% (3/16), **58.6-69.6% at -1** |
| **Kingambit** 22.4% | Mewtwo HH Aura Sphere **102.9-121.7% KO** (100% acc, ignores Intimidate) | Arcanine Flare Blitz **110.6-131.9% KO**. Sneasler HH Close Combat through Chople **126.1-149.3% KO** | Kowtow Cleave on Mewtwo: 99.4-117.1% (15/16), -1: 64.1-77.3%, Reflect: 66.3-77.9%, both: 42.5-51.4%. **Sucker Punch 80.7-96.1% (0/16)**, and it is blocked in terrain |
| **Indeedee-F** 21.8% | Arcanine Head Smash 88.7-105.6% (6/16), **HH 133.3-158.8% KO** | Incineroar Darkest Lariat 72.3-85.9%. Whimsicott Taunt/Encore stops its Trick Room and Follow Me | Expanding Force on Mewtwo: 14.9-17.7%. Its Psychic Terrain also protects our Mewtwo |
| **M-Golisopod** 18.5% | Arcanine Flare Blitz **183-217% KO** | Incineroar Flare Blitz **127.5-153.8% KO** | First Impression (146.4-174% on Mewtwo) is **priority, so our terrain blocks it**. Liquidation on Mewtwo: 45.9-54.7%. Mewtwo cannot hurt it (Psystrike 24.7-30.2%) |
| **Garchomp** 17.1% | Mewtwo Ice Beam **170.8-203.2% KO** | Whimsicott HH Moonblast **108.6-128.1% KO** (72.4-85.4% alone). Sneasler Close Combat 58.4-68.6% for chip | Dragon Claw on Mewtwo: 53.6-63%. **Earthquake KOs Arcanine (154-184% at -1)**, so keep Arcanine away from it |

Other board threats: M-Tyranitar goes down to Sneasler Close Combat 139.1-164.3% or Arcanine Close Combat 123.2-145.9% (both in sand).
Gholdengo goes down to Arcanine Flare Blitz 167.5-198.2%.
Whimsicott, Pelipper, M-Staraptor and M-Froslass all die to Mewtwo (Pelipper and Whimsicott only through Focus Sash).

> **Correction to the brief:** Incineroar's **Knock Off is not in its Champions movepool**, per the validator and `dexf("Incineroar").moves`.
> Its real Dark STAB is **Darkest Lariat**, which does **70.7-84%** to our Mewtwo. That is *more* than the 65.6-78.7% Knock Off
> figure in the brief, but still not a KO. Our Incineroar runs Darkest Lariat for the same reason.

## Spread justifications

**Mewtwo @ Mewtwonite Y**, Timid, 0 HP / 21 Def / 32 SpA / 13 Spe (181/153/111/246/140/190)
- **Spe 13 -> 190.** Outruns Jolly/Timid max Sneasler and M-Froslass (189). 12 points would only tie them at 189.
  Every other board threat is slower. The 19 points left in Speed go to Defense.
- **SpA 32 -> 246.** HH Aura Sphere on Kingambit is 16/16 only at max; at 24 SpA it drops to 15/16.
  HH Psystrike on Rillaboom stays a KO either way.
- **Def 21 -> 111.** Survives unboosted **Sucker Punch 80.7-96.1% (0/16)**. On the 2/32 spread that was 14/16, which covers turns without terrain.
  Also survives M-Baxcalibur Glaive Rush 84.5-99.4% (0/16), M-Tyranitar -1 Crunch in sand 72.9-86.2%,
  and Kowtow Cleave at -1 (64.1-77.3%). Sand chip is 11 at 181 HP either way. No Life Orb.
- **Moves:** all 100% accurate. We deliberately use Aura Sphere over Focus Blast (70%) and Ice Beam over Fire Blast (85%).
  Fire Blast's targets (Golisopod, Gholdengo, Metagross) are covered by Arcanine and Incineroar Flare Blitz.

**Indeedee-F @ Terrain Extender**, Relaxed, 32 HP / 32 Def / 2 SpD (177/75/128/115/127/94)
- **Spe 0 with a -Spe nature -> 94.** This is slower than Rillaboom (105) and a neutral 0-Speed Indeedee-F (105), so our terrain lands last on the lead.
- **HP/Def 32/32.** Must survive the physical hits it redirects: Kowtow Cleave 85.9-102.8% (2/16), Sneasler Close Combat 54.8-65%.
  SpD 2 is the leftover.

**Arcanine-Hisui @ Life Orb**, Adamant, 2 HP / 32 Atk / 32 Spe (172/183/100/103/100/142)
- **Atk 32.** Head Smash on M-Salamence after its base-form Intimidate is 13/16 even at max Attack (144.1-172% if it switches in un-Intimidated).
  Flare Blitz on Rillaboom at -1 is 9/16. Offense is short of its benchmarks, so none can be cut.
- **Spe 32 -> 142.** Outruns Pelipper 128, M-Baxcalibur 125, Archaludon 123 and Rillaboom 105.
  Under Tailwind it reaches 284, above everything on the board.
- **HP 2 -> 172.** Life Orb recoil is 17 at both 170 and 172, so the two points are free bulk. Rock Head removes Head Smash recoil.
  Head Smash is 80% accurate. We accept that on purpose, because it is the only Rock STAB and it hits Incineroar and Salamence.

**Incineroar @ Sitrus Berry**, Adamant, 32 HP / 20 Atk / 14 SpD (202/170/110/90/124/80)
- **Atk 20.** Flare Blitz on Rillaboom through Grassy Terrain is **15/16** (99.5-118.8%). The Careful 12-Atk board spread is 2/16.
  It also KOs M-Golisopod 127.5-153.8%.
- **HP 32 -> 202.** Maximises Sitrus value (50 HP) and the Parting Shot pivot cycle.
- **SpD 14.** Survives Sylveon Hyper Beam 79.7-95%. Honest cost: it no longer survives Pelipper's rain Weather Ball (101-119.8% KO).

**Sneasler @ Psychic Seed**, Jolly, 2 HP / 32 Atk / 32 Spe (157/182/80/54/100/189)
- **Spe 32 -> 189** before the seed. That ties opposing Sneasler and outruns Whimsicott 184 and Garchomp 169.
  It becomes 378 under Unburden as soon as it touches our terrain.
- **Atk 32.** Close Combat KOs Incineroar at +0 (105-124.8%), and HH Close Combat KOs Chople Kingambit (126.1-149.3%).
  Unboosted, it only does 84.1-99.5% to Kingambit, so the Attack is needed.
- The seed also gives +1 SpD, which matters because Sneasler is 4x weak to Psychic.
  Farigiraf's terrain-boosted Psychic still does 152.2-182.2% at +1 SpD (228.7-271.3% at +0), and Indeedee-F's Expanding Force does 129.3-152.2% at +1.
  Keep Sneasler away from opposing psyspam.

**Whimsicott @ Focus Sash**, Timid, 2 HP / 32 SpA / 32 Spe (137/78/105/129/95/184)
- **Spe 32 -> 184.** Moonblast lands before M-Staraptor 178, Garchomp 169 and M-Salamence 158. Tailwind, Taunt and Encore are Prankster regardless of Speed.
- **SpA 32.** HH Moonblast on Garchomp 108.6-128.1% KO and on M-Salamence 103.2-122.6% KO. Both are 0/16 without HH, so the Attack is needed.
- Sash is the bulk plan. Bulk points would not stop any of the KOs it takes.

## Worst matchup (honest)

**Trick Room with physical Dark/Steel attackers**: Farigiraf (Armor Tail) or Indeedee setting Trick Room, alongside Kingambit, M-Tyranitar and M-Golisopod.
- Under Trick Room, Mewtwo (190) and the 142-189 support all move last.
- Farigiraf is hard for us to damage: Arcanine Head Smash 80.6-95.5%, Mewtwo HH Psystrike 54.5-64%.
- Kowtow Cleave (15/16 on Mewtwo), and Liquidation and Close Combat from Golisopod, get free hits in.
- Our outs:
  - Whimsicott's Prankster Taunt on the setter turn 1. Farigiraf and Indeedee are not Dark, so Taunt connects.
  - Protect-stalling the four Trick Room turns.
  - Two Intimidates plus Reflect, which keep Kowtow Cleave to 42.5-51.4%.
  - Sneasler's Unburden Speed doesn't help under Trick Room.

Second-worst: **Garchomp with an Intimidate partner.** Earthquake KOs both Arcanine and Sneasler. Garchomp's only clean answer is Mewtwo's Ice Beam.
The other answer, Whimsicott's Moonblast, needs Helping Hand.

The final soft spot is **Pincurchin (15 base Speed Electric Surge)**. It will always outslow our Indeedee on the lead.
Mewtwo is grounded, so under Electric Terrain it loses its priority shield. The answer is to switch Indeedee back in mid-game so our terrain is written last.
