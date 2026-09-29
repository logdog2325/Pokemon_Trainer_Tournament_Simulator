# HYPOTHETICAL: Ash-Greninja rain team (Reg M-C doubles)

> **This team is hypothetical and cannot be played in Pokemon Champions.** Ash-Greninja is not in the game.
> Here it uses its **Gen 7 Battle Bond**: after it knocks out a target with an attack, it transforms into
> Ash-Greninja (72/145/67/153/71/132) for the rest of the battle, and its Water Shuriken becomes 20 BP x3 hits
> at +1 priority. Before that first KO it has plain Greninja stats. It holds a normal item, so it does not use
> the team's one Mega Evolution. Every other Pokemon, move, item and rule on this team is real Champions data.
> Choice Specs is not in Champions, so the item is Life Orb.

Paste: `out/Greninja/greninja-ash.txt`. `node validate.js out/Greninja/greninja-ash.txt --require "Greninja:Ash"` printed "LEGAL: all checks passed." The only warning is the expected one: Greninja-Ash is hypothetical.
Every number below comes from `rotom-judge/engine.js`, run against the 21-threat Reg M-C board spreads.

**Abbreviations**
- "pre-KO" = Battle Bond Greninja before its first KO.
- "Ash" = after the transformation.
- "HH" = with Helping Hand.
- "rain" = our Drizzle is up.
- "-1" = after one of our Intimidates.
- "+1" = Archaludon after Electro Shot's Special Attack boost.

Spread moves include the x0.75 doubles penalty. The engine ignores accuracy, so **Hydro Pump numbers carry an 80% hit chance** on top of what is shown. Rain does not raise Hydro Pump's accuracy.

| Slot | Set | Final stats |
|---|---|---|
| Greninja-Ash @ Life Orb | Timid 2 HP / 32 SpA / 32 Spe, Battle Bond. Hydro Pump, Dark Pulse, Ice Beam, Water Shuriken | pre-KO 149/103/87/155/91/191; Ash 149/148/87/205/91/202 |
| Pelipper @ Damp Rock | Quiet 32 HP / 26 Def / 8 SpA, Drizzle. Hurricane, Tailwind, Helping Hand, Protect | 167/70/146/135/90/76 |
| Salamence @ Salamencite | Adamant 4 HP / 32 Atk / 30 Spe, Intimidate, then Aerilate after Mega. Double-Edge, Dragon Claw, Tailwind, Protect | Mega 174/216/150/126/110/170 |
| Incineroar @ Sitrus Berry | Impish 32 HP / 32 Def / 2 SpD, Intimidate. Fake Out, Darkest Lariat, Parting Shot, Helping Hand | 202/135/156/90/112/80 |
| Archaludon @ Assault Vest | Modest 32 HP / 32 SpA / 2 Spe, Stamina. Electro Shot, Flash Cannon, Draco Meteor, Aura Sphere | 197/112/150/194/85/107 |
| Tauros-Paldea-Aqua @ Black Belt | Adamant 28 HP / 32 Atk / 6 Spe, Intimidate. Wave Crash, Close Combat, Aqua Jet, Protect | 178/178/125/45/90/126 |

## Game plan

The whole plan is getting the **first KO**, because the transformation is permanent. Rain and Helping Hand make that first KO close to automatic.

**Turn 1: Pelipper + Greninja.**
- Drizzle goes up, Pelipper uses Helping Hand (+5 priority), and pre-KO Greninja fires.
- With rain + HH, pre-KO Life Orb Greninja OHKOs **17/21** board threats. All but two of those use Hydro Pump; M-Salamence is an Ice Beam KO.
- The list of 17: Sneasler, Incineroar, M-Salamence, Kingambit, Indeedee-F, M-Golisopod, Garchomp, Farigiraf, Gholdengo, Pelipper, Whimsicott (Sash), Sylveon, Arcanine-H, M-Froslass, M-Metagross, M-Tyranitar, M-Staraptor.
- Without HH it is 9/21 in rain. With HH but no rain it is 14/21.
- **100%-accurate first KOs:**
  - Ice Beam: M-Salamence 134.4-159.1% and Garchomp 143.2-168.6%, needing no support at all.
  - Dark Pulse: Indeedee-F 121.5-145.2% HH in Psychic Terrain, Farigiraf 115.8-136.9% HH, and M-Metagross 123.4-146.2% HH.
  - When one of these targets is on the field, take it over an 80% Hydro Pump.

**After the transform (Ash, 205 SpA, 202 Spe):**
- Rain Hydro Pump OHKOs 15/21 without help, including Kingambit (115-135.7%) and M-Metagross (112.3-132.7%). With HH in rain it is 19/21.
- Dark Pulse and Ice Beam give 100%-accurate KOs:
  - Indeedee-F 107.3-127.7%, Farigiraf, Gholdengo, M-Froslass and M-Metagross 109.4-129.2%;
  - M-Salamence, Garchomp, and Whimsicott (Sash).
- **Water Shuriken** is the +1 priority finisher. In rain it OHKOs Incineroar (104-127.7%), M-Tyranitar (15/16) and Arcanine-H. With HH in rain it also OHKOs Sneasler (137.6-168.2%), Garchomp, Gholdengo, M-Froslass and M-Staraptor.

**The second Mega.** Greninja does not use the Mega Evolution, so **Mega Salamence** is the team's Mega.
- It covers what Greninja cannot: Rillaboom and Whimsicott.
- Its base Intimidate fires on entry before it Mega Evolves.

**Intimidate cycling.** Incineroar, Salamence and Tauros-Aqua each carry Intimidate. Incineroar's Parting Shot lets us re-enter them.

**Speed control. There are four independent layers:**
1. **Tailwind from two setters.** Pelipper and Salamence both run it. Under Tailwind:
   - Pelipper 152, Incineroar 160, Archaludon 214, Tauros 252, Greninja 382/404;
   - Archaludon, Tauros and Greninja then outspeed all 21 board threats; Tauros and Greninja also outspeed every 205-223 Mega.
2. **Fake Out** from Incineroar. It protects the turn-1 Hydro Pump from an opposing Fake Out or redirection user.
3. **Priority package.**
   - Ash's Water Shuriken (+1, 3 hits);
   - Tauros's Aqua Jet;
   - Pelipper's and Incineroar's Helping Hand (+5).
   - Water Shuriken, Aqua Jet and Fake Out are blocked by Psychic Terrain into grounded targets.
4. **Raw Speed that needs no setter.** Pre-KO Greninja's 191 already outspeeds all 21 board threats, including Sneasler and M-Froslass (189). Unburden Sneasler after Psychic Seed is the exception.
   - Rain also persists for its 8 Damp Rock turns after Pelipper faints, so Greninja's pre-KO KO range does not die with the setter.

**Trick Room fallback.** If Trick Room goes up anyway, Pelipper (76), Incineroar (80), Archaludon (107) and Tauros (126) move before the opposing Megas. Archaludon and Incineroar are our Trick Room-mode back line.

## Default bring-4 and leads

**Default four: Greninja, Pelipper, Salamence, Incineroar.**

- **Lead Pelipper + Greninja.** Drizzle, HH, first KO. Salamence and Incineroar wait in the back to cycle Intimidate and Tailwind.
- **Versus Fake Out leads (Incineroar, Rillaboom, Sneasler):** lead **Incineroar + Greninja** and put Pelipper in the back.
  - Our Fake Out removes the faster Fake Out user, and Greninja attacks.
  - Without rain, pre-KO targets are Ice Beam into M-Salamence/Garchomp, Dark Pulse into M-Froslass, or Hydro Pump into Arcanine-H.
  - On turn 2, switch Pelipper in for rain.
- **Versus Rillaboom:** Salamence must come.
  - Double-Edge (Flying) OHKOs Rillaboom 150.7-178.7%, and still OHKOs at -1 (101-119.3%).
  - Rillaboom's Wood Hammer does 16.7-19.5% to Salamence.
- **Versus Kingambit:** bring Tauros-Aqua. Close Combat OHKOs 15/16 through Chople Berry. Kingambit's best hit on Tauros is only 21.9-26.4%.
- **Versus Archaludon, Fairy and Electric (Archaludon, Sylveon, Whimsicott, M-Golisopod):** bring our own Archaludon.
  - It takes 18.8-22.3% from rain Electro Shot and 37.1-43.7% from Sylveon Hyper Voice.
  - Flash Cannon OHKOs Whimsicott 135.8-159.1% and Sylveon at +1 (15/16).
- **Versus Trick Room (Indeedee-F, Farigiraf):** lead Greninja + Pelipper and remove the setter turn 1.
  - HH Dark Pulse into Indeedee-F: 121.5-145.2%.
  - HH Dark Pulse into Farigiraf: 115.8-136.9%.
  - Bring Archaludon and Incineroar as the Trick Room-mode back line.

## Threat table (top usage threats, two answers each)

| Threat | Answer 1 | Answer 2 | Also |
|---|---|---|---|
| **Rillaboom** (37.18%) | **Salamence.** Double-Edge 150.7-178.7% (KO); 101-119.3% at -1 (KO). Wood Hammer does 16.7-19.5% to it. | **Ash-Greninja + HH:** Ice Beam 98.1-116.9% (15/16). Our Intimidate keeps Greninja alive: at -1, Grassy Glide does 80.5-96% (it is 120.1-143% at full Attack). | Pelipper rain Hurricane 60.9-72.5% (100% accurate in rain). Rillaboom is the main pre-KO non-target: pre-KO HH Ice Beam does only 73.4-88.4%. |
| **Sneasler** (34.29%) | **Pelipper:** rain Hurricane 107-127.4% (KO, 100% accurate in rain, and not blocked by Psychic Terrain). | **Salamence:** Double-Edge 187.9-221.7% at -1 (KO). Sneasler's Dire Claw does 31.6-37.9% to it. **Greninja:** pre-KO rain Hydro Pump 119.7-142.7% (80% acc); Ash rain+HH Water Shuriken 137.6-168.2%. | Close Combat KOs Greninja even at -1 (126.2-150.3%), so Greninja must move first. It does at 191 unless Sneasler has Psychic Seed + Unburden. |
| **Incineroar** (26.77%) | **Greninja:** pre-KO rain Hydro Pump 136.6-162.4% (KO; 80% acc). Ash rain Water Shuriken 104-127.7% (KO, priority, 100% acc). | **Tauros-Aqua:** rain Wave Crash at -1 102-121.8% (KO). | Its Darkest Lariat does 27.5-32.2% to Greninja. Without rain, pre-KO Hydro Pump is only 8/16. |
| **M-Salamence** (23.15%) | **Greninja:** Ice Beam pre-KO 134.4-159.1% (KO, 100% acc). It outspeeds (191 vs 158). | **Archaludon:** Draco Meteor 138.7-164.5% (KO). It takes 33.5-39.6% from Dragon Claw. | Our Salamence's Dragon Claw does 71-83.9%. Its Double-Edge at -1 does 89.9-107.4% (7/16) to Greninja. |
| **Kingambit** (22.44%) | **Tauros-Aqua:** Black Belt Close Combat 98.6-118.4% (15/16) through Chople Berry. It takes 21.9-26.4% from Kowtow Cleave. | **Greninja:** Ash rain Hydro Pump 115-135.7% (KO); pre-KO rain+HH Hydro Pump 130-153.6% (KO); both 80% acc. **Archaludon:** +1 Aura Sphere 81.2-95.7%, and 121.7-143.5% with HH. | Kingambit's Low Kick does 72.5-85.9% to Greninja. Against a **Defiant** Kingambit (the board runs Supreme Overlord), our three Intimidates backfire: do not lead Intimidate into it. |
| **Indeedee-F** (21.78%) | **Greninja:** Dark Pulse in Psychic Terrain: pre-KO HH 121.5-145.2% (KO); Ash 107.3-127.7% (KO) unassisted. Follow Me cannot redirect an attack aimed at Indeedee-F itself. | **Tauros-Aqua:** rain Wave Crash 80.2-94.9%. **Incineroar:** Darkest Lariat 57.6-68.9%. Together they are a KO. | Psychic Terrain blocks Fake Out, Aqua Jet and Water Shuriken into grounded targets. Archaludon's Draco Meteor does 63.3-75.1%. |
| **M-Golisopod** (18.49%, Bug/Steel) | **Greninja:** pre-KO rain+HH Hydro Pump 110.4-131.9% (KO); Ash rain Hydro Pump 97.3-115.9% (13/16); Ash rain+HH 145.6-173.6%. | **Salamence** walls and 2HKOs it: First Impression does 28.2-33.3% and Close Combat 25.3-29.9% to it. Double-Edge does 49.5-58.2%. | Archaludon's +1 Electro Shot does 56-65.9%. Intimidate x3 blunts it. First Impression at -1 still OHKOs Greninja (151.7-179.9%), so Greninja must KO it or switch out; it does move first (191 vs 60). |
| **Garchomp** (17.12%) | **Greninja:** Ice Beam pre-KO 143.2-168.6% (KO, 100% acc). It outspeeds (191 vs 169). | **Archaludon:** Draco Meteor 145.9-173% (KO). It takes 67.5-80.7% from Garchomp's EQ. **Salamence:** HH Dragon Claw 137.8-165.4% (KO). It outspeeds at 170 vs 169. | At -1 Garchomp does 50.3-61.1% (EQ) and 55-65.1% (Dragon Claw) to Greninja. |

Other board threats:
- **Whimsicott:** Its Moonblast KOs Greninja (102-122.1%), and it can set Prankster Tailwind.
  - Flash Cannon 135.8-159.1%, Double-Edge 243.8-289.1% and rain Hurricane 128.5-153.3% all hit the Focus Sash.
  - Kill it with a two-hit sequence, or with Water Shuriken's multi-hit (3 hits break the Sash).
- **Sylveon:** Its Hyper Voice OHKOs Greninja (133.6-158.4%). Answers:
  - Archaludon's +1 Flash Cannon (15/16);
  - Greninja's pre-KO rain+HH Hydro Pump;
  - Salamence's Double-Edge (9/16).
- **Archaludon:** In our rain its Electro Shot needs no charge turn. It KOs Greninja (139.6-165.1%), Pelipper and Tauros. Answers:
  - Tauros's Close Combat 107.2-127.1% (KO);
  - Ash's HH Dark Pulse (KO).
- **M-Baxcalibur:** Tauros's Close Combat 102.4-122.3% (KO).
- **M-Staraptor:** Double-Edge 159.5-188.1% (KO); +1 Electro Shot 140.5-165.4% (KO).
- **Gholdengo:** Pre-KO Dark Pulse 14/16; pre-KO rain Hydro Pump KO.
- **M-Tyranitar:** Tauros's Close Combat 162.3-194.7% (KO); pre-KO rain Hydro Pump 129.5-154.6% (KO).
- **Arcanine-H:** Pre-KO Hydro Pump 293-347.7%; rain Water Shuriken 198.8-244.2%.
- **Milotic:** Archaludon rain +1 HH Electro Shot 123.3-145.5% (KO). Nothing else touches it.
- **M-Froslass:** Pre-KO Dark Pulse 102.7-123.8% (KO); Double-Edge 132-156.5% (KO). Its Mega Snow Warning overwrites our rain.

## Spread justifications

- **Greninja, Timid 2 HP / 32 SpA / 32 Spe.**
  - **Speed.** 191 pre-KO is the only value that beats Jolly/Timid max Sneasler and M-Froslass (189). Anything less loses the race for the first KO. After the transform it has 202, which outruns every board threat.
  - **Special Attack.** Every point is load-bearing:
    - Gholdengo Dark Pulse is only 14/16 even at max;
    - pre-KO Incineroar Hydro Pump without rain is 8/16;
    - Ash's rain Hydro Pump on M-Golisopod is 13/16.
  - **HP.** The last 2 points go into HP: 149 HP gives 14 Life Orb recoil per attack. There is no sand chip in rain.
- **Pelipper, Quiet 32 HP / 26 Def / 8 SpA.**
  - **Speed 76** (minus-Speed nature, 0 points) is slower than every board weather setter:
    - opposing Pelipper 128;
    - base Tyranitar 81 on entry.
  - Because the slower setter writes last, our Drizzle wins a simultaneous lead. Mega Froslass's snow comes on Mega Evolution, so it still overwrites us.
  - **Special Attack.** 8 SpA is the minimum for rain Hurricane to OHKO Sneasler on 16/16 rolls (107-127.4%). 0 points gives 15/16. It also OHKOs Whimsicott through to the Sash.
  - **Defense.** 32 HP / 26 Def survives:
    - M-Salamence's Double-Edge (73.1-86.2%);
    - Rillaboom's Grassy Wood Hammer (70.7-83.8%);
    - M-Baxcalibur's Glaive Rush (70.1-82.6%).
  - **What it gives up.** Archaludon's Electro Shot, Sylveon's Hyper Beam and Arcanine-H's Head Smash KO it on any spread.
- **Salamence (Mega), Adamant 4 HP / 32 Atk / 30 Spe.**
  - **Speed.** 30 Spe gives 170, which outruns Garchomp (169, Jolly max) by one point. 32 Spe would give 172 and buy nothing extra on the board.
  - **Attack.** 32 Atk is needed for Double-Edge to OHKO Rillaboom at -1 (101-119.3%, no margin), and for Dragon Claw to reach 9/16 on Garchomp.
  - **HP.** The rest goes into HP.
- **Incineroar, Impish 32 HP / 32 Def / 2 SpD.**
  - **Defense.** Max physical bulk survives:
    - Jolly Psychic Seed Sneasler's Close Combat (78.2-93.1%). The Careful 32 SpD spread dies to it: 107.9-128.7%.
    - M-Golisopod's Close Combat (83.7-99%). The Careful spread dies to it.
  - **Attack.** It runs 0 Attack. Its job is Fake Out, Parting Shot and Helping Hand, and Darkest Lariat is chip only (Indeedee-F 57.6-68.9%).
  - **What it gives up.** Pelipper's rain Weather Ball KOs it (109.9-130.7%). The opposing rain is overwritten by our slower Drizzle, so that is accepted.
- **Archaludon, Modest 32 HP / 32 SpA / 2 Spe.**
  - **Speed.** 2 Spe gives 107, which outruns Adamant 0-Speed Rillaboom and Indeedee-F (105) instead of tying them.
  - **Special Attack.** 32 SpA is needed for Draco Meteor to OHKO M-Salamence (138.7%) and Garchomp, for +1 Flash Cannon to OHKO Sylveon (15/16), and for HH +1 Aura Sphere to OHKO Kingambit.
  - **Item.** Assault Vest and Stamina carry the special side. It takes 18.8-22.3% from rain Electro Shot and 37.1-43.7% from Sylveon's Hyper Voice.
- **Tauros-Paldea-Aqua, Adamant 28 HP / 32 Atk / 6 Spe.**
  - **Attack.** 32 Atk + Black Belt is required for Close Combat to OHKO Kingambit 15/16. It is 14/16 at 30 Atk, 13/16 at 28.
  - **Speed.** 6 Spe gives 126, which outruns M-Baxcalibur (125) and Archaludon (123). It OHKOs both with Close Combat (102.4-122.3% and 107.2-127.1%).
  - **HP.** The remaining 28 go into HP.
  - **Recoil.** Wave Crash recoil is its cost. It is a late-game cleaner, not a lead.

## Worst matchup, stated honestly

**Rillaboom + Sneasler with Indeedee-F / Psychic Terrain** (the #1, #2 and #6 usage threats) is the worst matchup.
- **Rillaboom.**
  - It is the one top threat pre-KO Greninja cannot take as its first KO: HH Ice Beam does only 73.4-88.4%.
  - Its Grassy Glide is priority that OHKOs Greninja at full Attack (120.1-143%).
- **Sneasler.**
  - With Psychic Seed + Unburden it outspeeds Greninja.
  - Its Close Combat OHKOs Greninja even at -1 (126.2-150.3%).
- **Psychic Terrain.**
  - It shuts off our Fake Out, Aqua Jet and Water Shuriken into grounded targets.
  - It enables Expanding Force spam.
- **The plan.**
  - Lead Salamence + Pelipper:
    - Intimidate on Rillaboom and Sneasler;
    - Salamence's Double-Edge OHKOs both (Rillaboom even at -1);
    - Pelipper's rain Hurricane OHKOs Sneasler.
  - Hold Greninja back until one of Rillaboom and Sneasler is gone.
  - Then its HH Dark Pulse removes Indeedee-F (121.5-145.2%) for the transformation.
- **It stays hard.** The first KO is delayed, and a Rillaboom that simply stays in and Grassy Glides keeps Greninja under priority pressure.

**Other honest weak points:**
- **The transformation is not free.** Pre-KO Greninja without rain or HH OHKOs only 6/21. The Hydro Pump-based first KOs miss 20% of the time. Every plan that routes through Hydro Pump has a one-in-five failure turn.
- **Fairy spam (Sylveon + Whimsicott)** KOs Greninja from full HP. Only Archaludon and Salamence handle both comfortably.
- **Opposing Archaludon abuses our own rain.** Its Electro Shot needs no charge and KOs Greninja, Pelipper and Tauros. Keep Tauros or Archaludon in reserve.
- **Snow from Mega Froslass** overwrites our rain on the turn it Mega Evolves. That drops Greninja back to its non-rain numbers until Pelipper re-enters.
- **Defiant Kingambit** punishes all three of our Intimidates with +2 Attack.
