# Mega Lucario: Tailwind wallbreaker (Reg M-C doubles)

Paste: `lucario-mega.txt`. `node validate.js out/Lucario/lucario-mega.txt --require "Lucario:Mega"` printed
**LEGAL: all checks passed.** All numbers below come from `rotom-judge/engine.js` and are priced against the BOARD spreads.
Rolls are out of 16, and "KO" means 16/16.

| Slot | Item | Nature / spread | Final stats |
|---|---|---|---|
| Lucario (Mega) | Lucarionite | Jolly 4 HP / 28 Atk / 2 Def / 32 Spe | 149 / 193 / 110 / 144 / 90 / 180 |
| Whimsicott | Focus Sash | Timid 26 HP / 8 SpA / 32 Spe | 161 / 78 / 105 / 105 / 95 / 184 |
| Incineroar | Sitrus Berry | Adamant 32 HP / 22 Atk / 12 Def | 202 / 172 / 122 / 90 / 110 / 80 |
| Talonflame | Life Orb | Jolly 2 HP / 32 Atk / 32 Spe | 155 / 133 / 91 / 84 / 89 / 195 |
| Gholdengo | Expert Belt | Modest 32 Def / 32 SpA / 2 Spe | 162 / 72 / 147 / 203 / 111 / 106 |
| Primarina | Mystic Water | Modest 32 HP / 10 Def / 24 SpA | 187 / 84 / 104 / 187 / 136 / 80 |

## Game plan

Mega Lucario is a physical Adaptability wallbreaker. Its accurate, no-item OHKOs are:
- **Close Combat:** Incineroar, Kingambit (through Chople Berry), Archaludon, Arcanine-H, M-Baxcalibur and M-Tyranitar.
- **Ice Punch:** Garchomp.
- **Meteor Mash (90%):** Sylveon and M-Froslass.

It is outsped and OHKO'd by Sneasler, and 8 of the 21 board threats OHKO it. The other five slots cover that in three ways:

1. **Speed.** Two independent Tailwind setters: Prankster Whimsicott, and Gale Wings Talonflame, whose Tailwind has priority at full HP. Tailwind puts Lucario at 360 Speed.
2. **Damage.** Whimsicott's Helping Hand turns Close Combat into OHKOs on Rillaboom, Indeedee-F, Farigiraf and Milotic.
3. **Protection.** Incineroar provides Fake Out and Intimidate. The team also has resists to the hits that kill Lucario:
   - Fire: Incineroar, Talonflame and Primarina.
   - Ground: Talonflame is immune, and Whimsicott resists it.
   - Fighting: Gholdengo is immune, and Primarina and Talonflame resist it.

### Speed control layers (need 2+, have 4)
1. **Tailwind, from two setters.** Whimsicott uses Prankster priority, and Talonflame uses Gale Wings priority at full HP. If one setter is KO'd, the other still sets Tailwind.
2. **Fake Out** (Incineroar).
3. **Icy Wind** (Primarina). The Speed drop persists after Primarina faints. Sneasler at -1 has 126 Speed, below Lucario's unboosted 180. An Unburden Sneasler at -1 has 252 Speed, which is still below Lucario's 360 in Tailwind.
4. **Priority package.** Gale Wings Brave Bird and Tailwind, plus Prankster Encore and Helping Hand.

The Gale Wings, Prankster and Fake Out moves that target an opponent are blocked into grounded targets under Psychic Terrain. Helping Hand and Tailwind target our own side, so they still work.

## Default bring-4 and leads

- **Default bring:** Lucario, Whimsicott, Incineroar, Talonflame.
  - **Lead:** Whimsicott + Lucario.
  - **Turn 1:** Lucario Mega Evolves. Whimsicott uses Tailwind at Prankster priority.
  - **Lucario's attack:** Close Combat or Ice Punch, depending on the lead. Protect if the opponent leads Sneasler or Incineroar with Fake Out.
  - **Back:** Incineroar (Intimidate and Fake Out reset) and Talonflame (second Tailwind, Rillaboom and Sneasler answer).
- **Sneasler / psyspam** (Indeedee-F + Sneasler): lead Gholdengo + Whimsicott.
  - Gholdengo is immune to Close Combat and Dire Claw, and takes Rock Slide for 10-12%.
  - Psyshock OHKOs Sneasler (235.7-278.3%) once Tailwind or Icy Wind puts Gholdengo ahead.
  - Back: Lucario + Primarina. Primarina's Icy Wind stops Unburden Sneasler from outspeeding Tailwind Lucario.
- **Dragons / Garchomp / M-Salamence:** bring Primarina over Talonflame. Moonblast OHKOs both, and Lucario's Ice Punch OHKOs Garchomp.
- **Rain / Arcanine-H / Incineroar-heavy:** bring Primarina and Incineroar with Lucario. Hydro Pump OHKOs Incineroar and Arcanine-H, but it is 80% accurate.
- **Trick Room** (Indeedee-F / Farigiraf):
  - Lead Incineroar + Lucario.
  - Whimsicott's Prankster Taunt or Encore does not work against Armor Tail or into Psychic Terrain, so the plan is to attack the setter instead.
  - Helping Hand Close Combat OHKOs Indeedee-F (115.3-137.3%) and Farigiraf (105.4-124.3%).
  - Protect through the Trick Room turns, and use Parting Shot to cycle.

## Threat table: top usage threats, two answers each

| Threat (usage) | Answer 1 | Answer 2 | Also |
|---|---|---|---|
| **Rillaboom** 37.2% | Talonflame LO Brave Bird **101.9-120.8% KO**. Priority at full HP, 195 Spe | Incineroar Flare Blitz **101.4-119.8% KO** into Assault Vest Rillaboom | Lucario HH CC 113-133.3% KO |
| **Sneasler** 34.3% | Talonflame Brave Bird **185.4-220.4% KO**. 195 Spe outruns 189, and Gale Wings adds priority | Gholdengo Psyshock **235.7-278.3% KO**, immune to CC and Dire Claw | Lucario in Tailwind: Meteor Mash 104.5-123.6% KO (90% acc) |
| **Incineroar** 26.8% | Lucario CC **148.5-176.2% KO**, and **101-118.8% KO at -1** | Primarina Mystic Water Hydro Pump **100-118.8% KO** (80% acc) | Primarina takes Flare Blitz for 25.7-30.5% |
| **M-Salamence** 23.2% | Primarina Moonblast **100-117.2% KO** | Lucario HH Ice Punch **119.4-141.9% KO**, or Whimsicott Moonblast (54.8-65.6%) + Lucario Ice Punch at -1 (53.8-64.5%): 108.6% minimum | Gholdengo takes Double-Edge for 37-43.8% |
| **Kingambit** 22.4% | Lucario CC **119.8-141.1% KO** through Chople Berry | Gholdengo Expert Belt Focus Blast **101.9-120.8% KO** (70% acc; Gholdengo is faster, 106 vs 70) | Lucario HH CC at -1: 118.8-142% KO |
| **Indeedee-F** 21.8% | Lucario HH CC **115.3-137.3% KO** | Incineroar Darkest Lariat (74.6-88.1%) + Lucario CC (76.8-91.5%) on one target: 151% minimum | Its Expanding Force does 57.7-67.8% to Lucario |
| **M-Golisopod** 18.5% | Incineroar Flare Blitz **131.9-158.2% KO** | Talonflame LO Flare Blitz **131.3-157.1% KO** | |
| **Garchomp** 17.1% | Lucario Ice Punch **103.8-123.2% KO** (180 outspeeds 169) | Primarina Moonblast **103.8-123.2% KO** | Whimsicott Moonblast 58.4-69.2%. Talonflame is immune to Earthquake. |

### Other board threats
- **Gholdengo:** Incineroar Flare Blitz 120.7-142% KO, Talonflame Flare Blitz 121.3-144.4% KO.
- **M-Froslass:** Gholdengo Make It Rain in snow 138.8-166.7% KO, Lucario Meteor Mash KO, Incineroar Darkest Lariat 126.5-148.3% KO.
- **M-Staraptor:** Talonflame Brave Bird 107-126.5% KO.
- **Whimsicott:** Gholdengo Make It Rain 189.1-222.6%, but it holds a Focus Sash, so this is not an OHKO from full HP.
- **Arcanine-H:** Primarina Hydro Pump 326.7-384.9% KO, Lucario CC KO.
- **Lucario's other CC KOs:** M-Tyranitar 197.1-235.7%, Archaludon 128.2-152.5%, M-Baxcalibur 124.3-147.6%, Sylveon (Meteor Mash) 140.1-165%.
- **Helping Hand CC KOs:** Farigiraf 105.4-124.3%, Milotic 118.8-141.1%.

## Spread justifications

**Lucario: Jolly 4 HP / 28 Atk / 2 Def / 32 Spe**
- **Spe 32 (180).** Outspeeds M-Staraptor (178), Garchomp (169), M-Salamence (158) and Arcanine-H (156), and reaches 360 in Tailwind.
- **Atk 28 (193)** is the lowest value that keeps every key KO at 16/16:
  - CC Kingambit 119.8-141.1%.
  - Ice Punch Garchomp 103.8-123.2%.
  - -1 CC Incineroar 101-118.8%. At 26 Atk this drops to 14/16.
  - HH Ice Punch M-Salamence 119.4-141.9%.
- **4 HP / 2 Def, from the 4 Atk points saved:**
  - Grassy Terrain High Horsepower from Rillaboom drops from 4/16 to **1/16** (84.6-100.7%).
  - -1 Garchomp Earthquake drops from 1/16 to **0/16** (80.5-96%).
  - -1 Incineroar Flare Blitz is 0/16.

**Whimsicott: Timid 26 HP / 8 SpA / 32 Spe**
- **Spe 32 (184)** ties an opposing max-Speed Timid Whimsicott in the Prankster Tailwind or Encore race, and outruns every non-Prankster Tailwind setter up to 184.
- **SpA 8** makes Moonblast + Lucario's Ice Punch at -1 (after Salamence's Intimidate) a guaranteed KO on M-Salamence, with a 108.6% minimum. At 0 SpA the minimum is 105.4%.
- **HP 26:** the Focus Sash covers single hits from full HP. The HP is for chip damage after the Sash breaks. For example, Sylveon's Hyper Voice does 59-69.6%.

**Incineroar: Adamant 32 HP / 22 Atk / 12 Def**
- **Atk 22** is the minimum for Flare Blitz to OHKO Assault Vest Rillaboom at 16/16 (101.4-119.8%). At 20 Atk it is 15/16.
- **HP 32 / Def 12** survives Life Orb Garchomp Earthquake (81.2-96.5%, 0/16).
- Sneasler's Close Combat still OHKOs it at +0 (101-118.8%). After Intimidate it only does **66.3-80.2%**, so Incineroar leads into Sneasler with Intimidate already applied.
- HP 202 makes the Sitrus Berry heal 50.

**Talonflame: Jolly 2 HP / 32 Atk / 32 Spe**
- **Spe 32 (195)** outspeeds Sneasler (189), M-Froslass (189) and Whimsicott (184) even after Gale Wings is lost.
- **Atk 32 with Life Orb** is needed for Brave Bird to OHKO Rillaboom (101.9-120.8%). At 26 Atk it is 12/16, and with Sharp Beak at 32 Atk it is 10/16.
- **Life Orb over Sharp Beak:** Brave Bird's own recoil already turns Gale Wings off, so Life Orb's 15 recoil per hit (1/10 of 155) costs nothing extra.

**Gholdengo: Modest 32 Def / 32 SpA / 2 Spe**
- **SpA 32 with Expert Belt** is needed for Focus Blast to OHKO Chople Kingambit (101.9-120.8%). At 26 SpA it is 14/16.
- **Spe 2 (106)** outspeeds Adamant 0-Speed Rillaboom and Indeedee-F (105). In Tailwind it has 212, which beats Sneasler (189).
- **Def 32** leaves these hits at 1/16 each:
  - Incineroar Flare Blitz: 82.7-100%.
  - Kingambit Kowtow Cleave: 82.7-100%.
  - Garchomp Earthquake: 83.3-101.2%.

  With 32 HP instead, all three are 5/16 or 6/16.
- **Expert Belt** has no recoil, so the HP value needs no residual tuning.

**Primarina: Modest 32 HP / 10 Def / 24 SpA**
- **SpA 24** is the minimum for these OHKOs:
  - Moonblast on M-Salamence (100-117.2%) and Garchomp (103.8-123.2%).
  - Mystic Water Hydro Pump on Incineroar (100-118.8%). At 16 SpA these are 11/16, 14/16 and 13/16.
- **HP 32 / Def 10** survives:
  - Grassy Glide from Rillaboom (80.7-97.3%, 0/16).
  - Dire Claw from Sneasler (84.5-100.5%, 1/16).
  - Double-Edge from M-Salamence at -1 (60.4-71.7%).
- **Spe 0 (80):** Primarina is the slow Icy Wind user, and it is at its best under our Tailwind or their Trick Room.

## Worst matchup, stated honestly

**Psyspam built on Indeedee-F + Unburden Sneasler (Psychic Seed), especially with a Trick Room mode.**
- **Unburden Sneasler (378 Speed) outruns Tailwind Lucario (360)** and OHKOs it with Close Combat (150.3-178.5%).
- Psychic Terrain blocks Talonflame's priority Brave Bird, Incineroar's Fake Out, and Whimsicott's Prankster Encore and Taunt into grounded targets. That strips three of our four speed layers.
- The answers are:
  - Gholdengo, which is immune to both of Sneasler's STABs.
  - Primarina's Icy Wind, after which Sneasler is at 252 Speed, below Tailwind Lucario.
  - Lucario's own Protect.

  All of these cost a turn.
- If the opponent sets Trick Room on top, Lucario at 180 Speed is mid-speed and bad either way. We have to KO the setter with Helping Hand Close Combat or stall out the turns.

**Second weakness: Mega Lucario itself is frail.** It is OHKO'd by:
- Incineroar Flare Blitz (122.1-145%).
- -1 Arcanine-H Flare Blitz (120.1-143%).
- M-Staraptor Close Combat (140.9-166.4%).
- -1 M-Golisopod Close Combat (108.1-127.5%).

Protect and Intimidate positioning are mandatory, not optional.

**Third: Rock Slide spam.**
- Talonflame is OHKO'd by +0 Sneasler Rock Slide (111-131.6%), M-Tyranitar Rock Slide in sand (211.6-250.3%), and 12/16 by -1 Garchomp Rock Slide.
- Whimsicott relies on its Focus Sash.

Against sand or Garchomp teams, Primarina takes Talonflame's slot.

**Intimidate teams** push Lucario's Kingambit CC to 79.2-94.7% and Ice Punch on Salamence to 53.8-64.5%. Helping Hand (Kingambit HH CC at -1 is 118.8-142% KO) or Primarina then does the job.
