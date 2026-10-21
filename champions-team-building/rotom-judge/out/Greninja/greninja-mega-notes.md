# Mega Greninja Helping Hand team (Reg M-C doubles)

Paste: `out/Greninja/greninja-mega.txt`. `node validate.js out/Greninja/greninja-mega.txt --require "Greninja:Mega"` printed "LEGAL: all checks passed."
This is the REAL-Champions side of the Mega vs Ash-Greninja debate. Every Pokemon, item and move here is Champions-legal.
Every number comes from `rotom-judge/engine.js`, run against the 21-threat Reg M-C board spreads.
"HH" means with Helping Hand. "Fresh" means Protean has not fired yet this switch-in; "spent" means it already has. Spread moves include the x0.75 doubles penalty.

| Slot | Set | Final stats |
|---|---|---|
| Greninja @ Greninjite | Timid 2 HP / 32 SpA / 32 Spe, Protean. Ice Beam, Dark Pulse, Hydro Pump, Protect | 149/130/97/185/101/213 (Mega) |
| Incineroar @ Sitrus Berry | Adamant 32 HP / 24 Atk / 10 Def, Intimidate. Fake Out, Flare Blitz, Close Combat, Parting Shot | 202/174/120/90/110/80 |
| Whimsicott @ Focus Sash | Timid 32 HP / 2 Def / 32 Spe, Prankster. Tailwind, Helping Hand, Moonblast, Encore | 167/78/107/97/95/184 |
| Gholdengo @ Life Orb | Modest 32 HP / 14 Def / 20 SpA, Good as Gold. Make It Rain, Shadow Ball, Focus Blast, Protect | 194/72/129/190/111/104 |
| Talonflame @ Sharp Beak | Jolly 2 HP / 32 Atk / 32 Spe, Gale Wings. Brave Bird, Flare Blitz, Tailwind, Taunt | 155/133/91/84/89/195 |
| Weavile @ Never-Melt Ice | Jolly 2 HP / 32 Atk / 32 Spe, Pickpocket. Fake Out, Icicle Crash, Knock Off, Helping Hand | 147/172/85/58/105/194 |

Greninja is the only Mega Stone on the team. The other five items are all different normal items.

## Game plan

- **Mega Greninja is a turn-1 nuke.** At 213 Speed it outspeeds all 21 board threats. Two partners carry Helping Hand (Whimsicott and Weavile), and two carry Fake Out (Incineroar and Weavile), so the four that come to a game can always include both a Fake Out and a Helping Hand.
- **Use the fresh Protean where STAB matters most.** The first attack of each switch-in gets STAB:
  - Ice Beam into Rillaboom: 67.6-81.2% alone, 101.4-121.7% with HH (a KO).
  - Hydro Pump into Incineroar: 83.2-98% alone, 124.8-147% with HH (a KO).
  - Dark Pulse into Indeedee-F: 75.7-89.3% alone, 113.6-133.9% with HH (a KO).
  - Ice Beam kills M-Salamence (182.8-219.4%) and Garchomp (194.6-229.2%) even with Protean spent, with or without HH.
- **Protean caveat.** The engine still gives Water and Dark moves STAB once Protean is spent. In the real game, after Protean turns Greninja into an Ice type, Hydro Pump and Dark Pulse lose STAB until it switches out. Divide those later numbers by 1.5. So pick the first move each switch-in on purpose. After that, switch Greninja out to reset Protean, or Protect.
- **Special set, not physical.** Greninja is immune to the effect of Intimidate. That matters because Incineroar has 26.77% usage.
- **Everything else covers Greninja's must-cover list:**
  - Fire moves (Incineroar and Talonflame) for Rillaboom, M-Golisopod and Kingambit.
  - Gholdengo for Sneasler and the Fairy types.
  - Talonflame's Taunt against Trick Room.
  - Two Tailwinds against the Megas at 216-223 Speed.
  - Weavile's Ice for a second answer to the Dragons.

## Speed control: three independent layers

1. **Tailwind from two setters.**
   - Whimsicott has Prankster Tailwind.
   - Talonflame has Gale Wings Tailwind, which gets +1 priority at full HP. It is not blocked by Psychic Terrain, because Tailwind targets our own side.
   - If one setter faints or is Taunted, the other still sets it. Under Tailwind, Greninja has 426 Speed, which beats Mega Absol Z, Mega Garchomp Z and Mega Lucario Z (223), Mega Alakazam and Mega Aerodactyl (222), and Mega Beedrill and Mega Sceptile (216). Gholdengo has 208, which beats every board threat.
2. **Fake Out from two users** (Incineroar and Weavile). Fake Out takes one foe out of the turn so Greninja moves unopposed.
3. **Priority.** Gale Wings Brave Bird hits first at full HP. It OHKOs Sneasler (171.3-203.2%) and Whimsicott (148.9-178.8%) before they move. Greninja also has Protect for scouting.

Paralysis and Trick Room are not used. The anti-Trick Room plan is Talonflame's Taunt at 195 Speed plus a KO on the setter (see the Indeedee-F and Farigiraf rows).

## Default bring-4 and leads

**Default four: Greninja + Incineroar lead. Whimsicott + Gholdengo in the back.**
- **Turn 1.** Incineroar uses Fake Out on the biggest threat to Greninja (Sneasler, Rillaboom or Incineroar). Intimidate also weakens the physical attackers. Greninja Mega Evolves and fires its fresh STAB move at the best target.
- **Turn 2.** Incineroar either uses Parting Shot into Whimsicott (Tailwind and Helping Hand), or Flare Blitzes Rillaboom (102.4-121.7%, a KO). Greninja Protects or attacks again.
- **Gholdengo** comes in on Sneasler's Close Combat and Dire Claw (immune to both), on Fake Out (immune), and on Fairy moves (Moonblast does 16-19.1%).

**Swaps by matchup:**
- **Trick Room (Indeedee-F, Farigiraf):** bring Talonflame for Taunt. Also bring Weavile, whose Knock Off does 57.6-67.8% to Indeedee-F and removes its Sitrus Berry, and Greninja's HH Dark Pulse then KOs it.
- **Dragons (M-Salamence, Garchomp) or Hyper Offense:** bring Weavile. Icicle Crash OHKOs both, and it gives a second Fake Out plus Helping Hand.
- **Rillaboom + M-Golisopod:** bring Talonflame. It resists Grass (Wood Hammer does 30.3-35.5%), and its Flare Blitz OHKOs M-Golisopod (101.1-120.9%).
- **Psyspam (Indeedee-F):** Fake Out and Gale Wings are blocked against grounded targets in Psychic Terrain, so lead Greninja + Whimsicott. Whimsicott uses HH on turn 1, and Greninja uses HH Dark Pulse on Indeedee.

## Threat table: two answers per top threat

| Threat | Answer 1 | Answer 2 | Also |
|---|---|---|---|
| **Rillaboom** (37.18%) | **Incineroar** Flare Blitz 102.4-121.7% (KO on 16/16 rolls). Rillaboom's hits on Incineroar: Wood Hammer 34.7-41.6%, High Horsepower 57.4-68.3%. | **Greninja** fresh HH Ice Beam 101.4-121.7% (KO). | Talonflame Brave Bird 93.7-111.1% (10/16), 141.1-167.1% with HH. Weavile HH Icicle Crash 130.4-153.1%. |
| **Sneasler** (34.29%) | **Talonflame** Gale Wings Brave Bird 171.3-203.2% (KO, with priority outside Psychic Terrain). Still 115.9-137.6% at -1. | **Gholdengo** is immune to Close Combat, Dire Claw and Fake Out. Its HH Make It Rain does 119.1-141.4% (KO), 79.6-94.3% alone. | Greninja HH Hydro Pump 109.6-129.9% (80% accurate). Weavile HH Icicle Crash 117.8-140.8%. |
| **Incineroar** (26.77%) | **Greninja** fresh Hydro Pump 83.2-98% alone, 124.8-147% with HH (80% accurate). Incineroar's Flare Blitz does only 34.2-40.9% to it. | **Incineroar** HH Close Combat 101-120.3% (KO), 67.3-80.2% alone. | Gholdengo HH Focus Blast 119.8-143.1% (70% accurate). |
| **M-Salamence** (23.15%) | **Greninja** Ice Beam 182.8-219.4% even with Protean spent. | **Weavile** Icicle Crash 141.9-170.4%, and 95.7-116.1% (14/16) at -1 after Salamence's Intimidate. | Gholdengo HH Make It Rain 92.5-110.2% (9/16). |
| **Kingambit** (22.44%) | **Gholdengo** Focus Blast 102.9-121.7% (KO through the Chople Berry, 70% accurate). | **Incineroar** HH Flare Blitz 121.7-143.5% (KO), 81.2-95.7% alone. | Talonflame HH Flare Blitz 92.8-110.1% (10/16). Kingambit's Kowtow Cleave does only 34.2-40.3% to Greninja and 20.3-23.8% to Incineroar. |
| **Indeedee-F** (21.78%) | **Greninja** fresh HH Dark Pulse 113.6-133.9% (KO). Its Dark Pulse at 213 Speed outspeeds and removes the Trick Room setter. | **Weavile** Knock Off 57.6-67.8% (removes Sitrus). Then Greninja's unboosted Dark Pulse 75.7-89.3% finishes it. **Talonflame's Taunt** stops Trick Room outright. | Gholdengo HH Make It Rain 83.6-99.4%. Note that Psychic Terrain blocks our Fake Out into Indeedee. |
| **M-Golisopod** (18.49%) | **Incineroar** Flare Blitz 131.9-158.2% (KO). First Impression does 60.4-72.3% to it. | **Talonflame** Flare Blitz 101.1-120.9% (KO). First Impression does 25.8-30.3% to it. | Gholdengo takes 14.9-17.5% from First Impression and is immune to Close Combat. |
| **Garchomp** (17.12%) | **Greninja** Ice Beam 194.6-229.2% with Protean spent. It outspeeds (213 vs 169). Garchomp's Dragon Claw does 73.8-89.3% to it. | **Weavile** Icicle Crash 187-220.5% (KO). It outspeeds (194 vs 169). | Whimsicott HH Moonblast 82.7-97.3%. Gholdengo HH Make It Rain 97.8-115.1% (13/16). |
| Farigiraf (15.9%) | Greninja HH Dark Pulse 105.4-125.7% (KO). | Talonflame's Taunt (not priority, so Armor Tail does not block it) at 195 Speed stops Trick Room. | Whimsicott's Prankster moves are blocked by Armor Tail, which is why Whimsicott carries no Taunt. |
| Gholdengo (15.23%) | Incineroar Flare Blitz 120.7-143.2% (KO). | Greninja HH Dark Pulse 134.9-159.8% (KO). Also our Gholdengo's Shadow Ball, 120.1-143.2%. | |
| Whimsicott / Sylveon | Gholdengo Make It Rain: Whimsicott 193.4-227.7%, Sylveon 93.8-111.9% (10/16). Whimsicott's Moonblast does 16-19.1% to it. | Talonflame Brave Bird into Whimsicott, 148.9-178.8%. Greninja Ice Beam into Whimsicott, 146-172.3%. | Sylveon's Hyper Voice does 118.1-140.9% to Greninja. Keep Gholdengo next to it or Protect. |

## Spread justifications

- **Greninja, Timid 2 HP / 32 SpA / 32 Spe:**
  - Speed 213 outruns every board threat, plus Mega Manectric and Mega Lopunny (205) and Mega Delphox (204). Timid with 0 Speed would be 178, slower than Sneasler and M-Froslass (189) and Whimsicott (184).
  - SpA 32 is the minimum for the headline KO: fresh HH Ice Beam into Assault Vest Rillaboom is 101.4% at the lowest roll, so any less SpA loses rolls.
  - The leftover 2 points go into HP.
- **Incineroar, Adamant 32 HP / 24 Atk / 10 Def:**
  - Atk 24 (174) is the lowest value where Flare Blitz OHKOs Assault Vest Rillaboom on 16/16 rolls (102.4-121.7%). 20 Atk gives 15/16 and 16 Atk gives 13/16.
  - HP 32 and Def 10 survive Garchomp's spread Earthquake (82.2-98%) and -1 Sneasler Close Combat (68.3-81.2%). Putting the 10 points into SpD instead lets Earthquake KO on 6/16 rolls.
- **Whimsicott, Timid 32 HP / 2 Def / 32 Spe:**
  - Speed 184 speed-ties the board Timid Whimsicott in the Prankster-vs-Prankster order for Tailwind and Encore.
  - HP 32 is for chip and spread damage, since Focus Sash only covers one hit from full HP.
  - It has no SpA, because it never needs to KO anything.
- **Gholdengo, Modest 32 HP / 14 Def / 20 SpA:**
  - SpA 20 (190) is the minimum for Life Orb Focus Blast to OHKO Chople Berry Kingambit (102.9-121.7%). Timid with 20 SpA gets only 10/16.
  - Def 14 survives Kingambit's Kowtow Cleave (78.4-93.8%), Garchomp's Earthquake (80.4-96.4%) and Incineroar's Flare Blitz (80.4-95.9%). With the 14 points in SpD instead, all three KO on 5-6/16 rolls.
  - It has no Speed, because Tailwind doubles it to 208, which beats the board.
  - Life Orb recoil at 194 HP is 19 per attack. The next recoil breakpoint would only matter at 200 HP.
- **Talonflame, Jolly 2 HP / 32 Atk / 32 Spe:**
  - Speed 195 outruns Sneasler and M-Froslass (189) and Whimsicott (184). That matters for Taunting a non-Prankster Trick Room setter and for Brave Bird after Gale Wings is lost.
  - Atk 32 with Sharp Beak is still only 10/16 on Rillaboom. 24 Atk gives 4/16, so Attack stays maxed.
- **Weavile, Jolly 2 HP / 32 Atk / 32 Spe:**
  - Speed 194 outruns Sneasler (189), Garchomp (169) and M-Salamence (158).
  - Atk 32 is needed for -1 Icicle Crash to KO M-Salamence on 14/16 rolls (95.7-116.1%). 24 Atk gives 11/16 and 20 Atk gives 8/16.

## Worst matchup (honest)

**Psyspam Indeedee-F with Unburden Sneasler (Psychic Seed), backed by Trick Room.** Psychic Terrain does three things:
- It consumes Sneasler's Psychic Seed, triggering Unburden and doubling its Speed to 378. That outspeeds Greninja unless Tailwind is up (426 under Tailwind).
- It blocks our Fake Out into both grounded foes.
- It blocks Gale Wings Brave Bird into Sneasler.

Sneasler's Close Combat OHKOs Greninja (170.5-202.7%), Incineroar (102-121.8%) and Weavile. That leaves Gholdengo (immune) as the only clean switch-in, while Indeedee sets Trick Room.

Our line: lead Greninja + Whimsicott or Greninja + Gholdengo, and Protect with Greninja on turn 1. Gholdengo's HH Make It Rain kills Sneasler (119.1-141.4%), and Greninja's HH Dark Pulse kills Indeedee (113.6-133.9%). Talonflame's Taunt is a Trick Room backup. It is winnable, but it is the matchup most likely to lose Greninja before it acts.

Other soft spots:
- **Rillaboom's Wood Hammer** (235.6-279.2%) and **Grassy Glide** (110.1-130.9%, priority in Grassy Terrain) both OHKO Greninja. Fake Out Rillaboom first.
- **Mega Golisopod's First Impression** OHKOs Greninja (204-240.9%). Intimidate helps, and Protect scouts it on turn 1.
- **Archaludon's Electro Shot** OHKOs Greninja (126.2-149%). Gholdengo's Focus Blast KOs Archaludon back (146.4-172.4%).
