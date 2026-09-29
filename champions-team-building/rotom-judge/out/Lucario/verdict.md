# Rotom Judge verdict: Mega Lucario vs Mega Lucario Z

Reg M-C doubles, Level 50. Every number below comes from `rotom-judge/engine.js` or `factsheets/Lucario.md`.

## Scores

| | Mega (A) | Mega Z (B) |
|---|---|---|
| Evidence (40) | 30 | 32 |
| Relevance (25) | 22 | 19 |
| Rebuttal (20) | 15 | 16 |
| Honesty (15) | 10 | 13 |
| **Total** | **77** | **80** |

**Winner: Mega Lucario (A).** B argued more cleanly and scores slightly higher. The evidence, including B's own concessions, still favours Mega Lucario as the better Mega in this format.

## Checked claims

Spreads used:
- **Mega Jolly:** 2 HP / 32 Atk / 32 Spe, holding Lucarionite. That gives 147 HP, 197 Atk, 108 Def, 144 SpA, 90 SpD and 180 Spe.
- **Mega Timid:** 2 HP / 32 SpA / 32 Spe, which gives 192 SpA.
- **Mega Z Timid:** 2 HP / 32 SpA / 32 Spe, holding Lucarionite Z. That gives 147 HP, 90 Def, 216 SpA and 223 Spe.
- **Mega Z bulk:** 32 HP / 2 Def / 32 Spe. That gives 177 HP, 92 Def, 184 SpA and 223 Spe.

On the board, **Pelipper and Whimsicott hold Focus Sash**, and Kingambit holds a Chople Berry. The engine applies the berry.

| Side | Claim | Engine result | Holds |
|---|---|---|---|
| A | CC OHKOs Incineroar 152.5-180.2%, Kingambit 121.7-144.9%, Archaludon 132.6-156.9%, Arcanine-H 209.3-246.5%, M-Bax 126.2-149.5%, M-Ttar 201-239.6%; Ice Punch Garchomp 105.9-125.4% | Same | yes |
| A | Thunder Punch OHKOs Pelipper (137.2-163.5%), one of "8 sure OHKOs" | The damage reproduces, but Pelipper holds a Focus Sash, so it is not a KO from full HP. That leaves 7 sure OHKOs. | **no** |
| A | Meteor Mash OHKOs Whimsicott 186.9-221.9% (and 125.5-148.9% at -1) | The damage reproduces, but Whimsicott holds a Focus Sash, so it is not an OHKO | **no** |
| A | Meteor Mash on Sneasler 107-126.1%, M-Froslass 201.4-239.5% (90% acc) | Same. E.accuracy gives Meteor Mash 90%. Sneasler moves first and OHKOs Mega, so Mega never throws the Sneasler hit. | yes (numbers) |
| A | Timid Mega Aura Sphere: Kingambit 108.2-127.5%, Incineroar 83.2-99%; Z: 89.9-107.2% (6/16), 71.3-84.2% | Same | yes |
| A | Bullet Punch: M-Froslass 92.5-108.8%, Whimsicott 84.7-102.2% | Same. That is 8/16 and 1/16, and the Whimsicott hit is blocked by Focus Sash. | yes |
| A | HH HJK Rillaboom 124.6-147.8%, HH CC Rillaboom 114.5-136.2%, HH CC Indeedee-F 118.6-140.7%, Farigiraf 106.8-127%, Milotic 121.8-144.1% | Same | yes |
| A | +2 CC: Rillaboom 152.7-180.7%, M-Metagross 122.8-145%, M-Golisopod 98.9-117.6% (15/16); +2 Ice Punch M-Salamence 159.1-189.2% | Same. The +2 CC Pelipper KO (108-127.7%) is blocked by Sash. A also said Gholdengo survives +2 (Meteor Mash 68.6-81.1%), but +2 Blaze Kick OHKOs it (130.2-153.8%), so A undersold itself here. | yes |
| A | At -1: CC Incineroar 101-120.8% KO, CC Kingambit 81.2-96.6%, MM Sylveon 94.9-113% (11/16) | Same | yes |
| A | Rebuttal: Z bulk spread (184 SpA) Aura Sphere on Kingambit 76.3-90.8%, HH AS on Incineroar 89.1-106.9% (5/16), Flash Cannon on Froslass 93.9-111.6% (10/16) | Same | yes |
| B | 223 Speed, outspeeds all 21 threats, no Mega faster, 22 Megas faster than Mega's 180 | Same. The fact sheet lists 22. | yes |
| B | Z Psychic on Sneasler 186-221.7%; Sneasler CC on Mega 155.1-183.7%, on Z 92.5-110.2% (10/16) | Same. The bulk spread takes 76.3-89.8%. | yes |
| B | Aura Guard: Incineroar Flare Blitz on Z 75.5-89.8% (Mega 126.5-148.3%) | Same | yes |
| B | Bulk spread: "no contact move on the board OHKOs it." Arcanine-H Flare Blitz 90.4-106.2%, Golisopod CC 80.2-94.9% | The numbers reproduce, but Flare Blitz still KOs on 7/16 rolls. The same opening also used 216-SpA KO numbers (HH AS Incineroar 106.9-126.2%) that this spread cannot reach (89.1-106.9%, 5/16). B conceded this. | **no** |
| B | At -1: HJK Kingambit 87-104.3% (4/16), HJK Rillaboom 55.1-65.7%, HJK Garchomp 60.5-72.4%, HH CC Rillaboom 76.8-91.3%, HH HJK Rillaboom 82.6-98.6% | Same | yes |
| B | Aura Sphere: M-Ttar 135.3-162.3%, Archaludon 127.1-150.3%, Arcanine-H 115.1-136%; HH AS Kingambit 134.8-160.9%, M-Bax 118-139.8%, Garchomp 75.1-89.7% | Same | yes |
| B | Vacuum Wave: M-Ttar 69.6-83.1%, Archaludon 64.1-76.2% | Same | yes |
| B | Fake Out: 8.2-10.2% on Z vs 6.8-8.2% on Mega, so the engine does not apply Aura Guard to it | Confirmed: `MF_CONTACT` in `app/app.js` has no Fake Out, and it also has no Glaive Rush. B correctly left this out of the argument. | yes (engine gap) |

## Ruling

Almost every damage roll reproduces. The debate turned on three things: Focus Sash, Speed, and how many accurate OHKOs each form actually has.

**Accurate OHKOs decide it.** This count uses moves with at least 90% accuracy, ignores Focus Sash holders and uses no item.
- **Mega Lucario (Jolly)** OHKOs 10 threats: Sneasler (Zen Headbutt), Incineroar, Kingambit, Archaludon, Arcanine-H, M-Baxcalibur and M-Tyranitar (all Close Combat), Garchomp (Ice Punch), and Sylveon and M-Froslass (Meteor Mash). That is 130.61% of summed usage.
- **Mega Lucario Z (Timid)** OHKOs 5: Sneasler (Psychic), Archaludon, Arcanine-H and M-Tyranitar (Aura Sphere), and M-Froslass (Flash Cannon). That is 53.65% of summed usage.
- B conceded that without Focus Blast, Rillaboom, Incineroar and Garchomp are 2HKOs for Z. Rillaboom takes 35.3-42% from Aura Sphere, and Garchomp takes 50.3-60%.

**B's real wins:**
- **Sneasler.** Z moves first and Psychic KOs it (186-221.7%). Mega is outsped and OHKO'd by Close Combat (155.1-183.7%). This is a clean win for Z against the #2 threat.
- **Aura Guard.** Z is OHKO'd by 4/21 threats against Mega's 8/21. Incineroar's Flare Blitz, M-Salamence's Double-Edge and M-Staraptor's Close Combat stop being KOs.
- **Intimidate.** It costs the physical Mega its Kingambit KO (81.2-96.6%), its Garchomp KO (Ice Punch 71.4-84.3%) and its Helping Hand Rillaboom KOs.

**Why Mega still wins:**
- At -1, Mega's Close Combat still OHKOs Incineroar itself (101-120.8%), and Meteor Mash still OHKOs M-Froslass.
- A Timid Mega out-damages Z's best special set on every shared target and ignores Intimidate just as Z does. Aura Sphere does 108.2-127.5% to Kingambit against Z's 89.9-107.2%.
- Z's defensive edge does not cover Garchomp. Earthquake hits Z harder: 148.3-176.9% against Mega's 127.2-150.3%.
- Z cannot take both bulk and damage. A's rebuttal proved this, and B conceded it.

**A's overclaims.** Two of A's OHKOs are blocked by Focus Sash: Pelipper (Thunder Punch) and Whimsicott (Meteor Mash). A also offered Helping Hand Close Combat on Sneasler as a KO even though Sneasler moves first. Bullet Punch is also blocked by Indeedee-F's Psychic Terrain against grounded targets.

**Engine gap (not scored against either side).** Aura Guard is not applied to Fake Out or Glaive Rush, because both are missing from `MF_CONTACT`. The real damage Z takes from those two moves is about half what is shown.

## Team brief: Mega Lucario (Lucarionite)

**Game plan:** A physical Adaptability wallbreaker that removes the board's slow and mid-speed bulk in one hit each. Close Combat covers Incineroar, Kingambit, Archaludon, Arcanine-H, M-Baxcalibur and M-Tyranitar. Ice Punch covers Garchomp. Meteor Mash covers M-Froslass and Sylveon.

It is slower than Sneasler and is OHKO'd by 8/21 threats, so the team has to handle Speed and redirection for it. The build is Jolly 2 HP / 32 Atk / 32 Spe (180 Spe) with Close Combat, Meteor Mash, Ice Punch, and Protect or Swords Dance. A Timid special set (Aura Sphere, Flash Cannon, Psychic, Vacuum Wave) is the anti-Intimidate alternative.

**Lean into:**
- Accurate OHKOs with no item:
  - Close Combat: Incineroar 152.5-180.2%, Kingambit 121.7-144.9%, Archaludon 132.6-156.9%, Arcanine-H 209.3-246.5%, M-Bax 126.2-149.5%, M-Ttar 201-239.6%.
  - Ice Punch: Garchomp 105.9-125.4%.
  - Meteor Mash (90%): Sylveon 140.1-167.2%, M-Froslass 201.4-239.5%.
- Helping Hand OHKOs: HJK on Rillaboom 124.6-147.8%, CC on Rillaboom 114.5-136.2%, CC on Indeedee-F 118.6-140.7%, Farigiraf 106.8-127% and Milotic 121.8-144.1%.
- +2 after Swords Dance: CC OHKOs Rillaboom 152.7-180.7% and M-Metagross 122.8-145%. Ice Punch OHKOs M-Salamence 159.1-189.2%. Blaze Kick OHKOs Gholdengo 130.2-153.8%.
- Survives Intimidate on its key hits: -1 CC still OHKOs Incineroar (101-120.8%), and -1 Meteor Mash still OHKOs M-Froslass.
- Timid set alternative: Aura Sphere OHKOs Kingambit 108.2-127.5% and Archaludon 150.3-179%, and Psychic OHKOs Sneasler 168.2-198.7%.

**Must cover:**
- **Sneasler (34.29%):** 189 Speed beats Mega's 180, and its Close Combat OHKOs Mega at 155.1-183.7%. The team needs Tailwind, a faster Sneasler answer, or Fake Out on it.
- **Contact and physical hits that OHKO Mega:**
  - Incineroar Flare Blitz 126.5-148.3%
  - M-Salamence Double-Edge 110.2-130.6%
  - M-Golisopod CC 164.6-194.6%
  - Garchomp Earthquake 127.2-150.3%
  - Arcanine-H Flare Blitz 185.7-219%
  - M-Staraptor CC 144.2-171.4%
  - Sylveon Hyper Beam 153.1-180.3%
- **Intimidate (Incineroar 26.77%):**
  - -1 CC on Kingambit is only 81.2-96.6%, and -1 Ice Punch on Garchomp is 71.4-84.3%.
  - -1 CC is 88.4-106.1% on Archaludon and 85.4-101% on M-Bax.
  - -1 HH HJK on Rillaboom is 82.6-98.6%.
  - Use the special set or a Defiant or Competitive partner, and don't count on the physical set's Kingambit and Garchomp KOs through Intimidate.
- **Rillaboom (37.18%):** no unboosted OHKO (HJK 83.1-98.6%, and it crashes on a miss). It needs Helping Hand or +2.
- **Focus Sash** on Pelipper and Whimsicott: don't count them as OHKOs.
- **Whimsicott (184) and M-Froslass (189)** outspeed it. M-Froslass Shadow Ball only does 66-78.2%, so Mega survives and hits back.
- **Psychic Terrain** blocks Bullet Punch and Vacuum Wave against grounded targets.
- **Gholdengo** is immune to Close Combat and HJK. Unboosted, Mega only does 66.3-78.1% with Blaze Kick.

**Partner ideas:**
- Tailwind setter (Whimsicott or Pelipper) takes it to 360 Speed, above Sneasler.
- Helping Hand user to turn Rillaboom, Indeedee-F, Farigiraf and Milotic into OHKOs.
- Follow Me or Rage Powder redirector (Indeedee-F or Amoonguss) to cover a Swords Dance turn.
- Fake Out plus Intimidate user (Incineroar) to blunt Flare Blitz, Double-Edge and Close Combat into Lucario.
- Water or Levitate/Flying partner to absorb Fire and Ground hits, plus a Ground-immune partner so Garchomp's Earthquake has fewer good targets.
- A Gholdengo answer: a Dark or Fire special attacker.

## Team brief: Mega Lucario Z (Lucarionite Z)

**Game plan:** A fast special lead at 223 Speed. It outspeeds all 21 board threats without Tailwind, KOs Sneasler, M-Froslass, Archaludon, Arcanine-H and M-Tyranitar with accurate moves, and uses Aura Guard to survive the physical contact hits that KO regular Mega Lucario.

Its damage is lower than regular Mega Lucario's. Rillaboom, Incineroar, Garchomp and Kingambit are 2HKOs without Focus Blast (70%) or Helping Hand, so the team must bring that damage. The build is Timid 2 HP / 32 SpA / 32 Spe (216 SpA) with Aura Sphere, Flash Cannon, Psychic, and Vacuum Wave or Protect. Do not use the 32 HP bulk spread if you need the KOs, because at 184 SpA it loses them.

**Lean into:**
- **Speed and Sneasler:**
  - 223 Speed; no Mega is faster, and Absol Mega Z and Garchomp Mega Z tie it.
  - Psychic OHKOs Sneasler 186-221.7% before it moves.
  - Flash Cannon OHKOs M-Froslass 111.6-132%.
- **Accurate Aura Sphere OHKOs:** M-Ttar 135.3-162.3%, Archaludon 127.1-150.3%, Arcanine-H 115.1-136%.
- **Helping Hand Aura Sphere OHKOs:** Incineroar 106.9-126.2%, Kingambit 134.8-160.9%, M-Bax 118-139.8%.
- **Helping Hand Focus Blast (70%):** Garchomp 112.4-133.5%.
- **Aura Guard, OHKO'd by only 4/21 threats:**
  - Incineroar Flare Blitz 75.5-89.8%
  - M-Salamence Double-Edge 66-78.2%
  - Kingambit Low Kick 46.9-55.8%
  - Sneasler CC 92.5-110.2% (10/16)
  - M-Staraptor CC 3/16
- **Immune to Intimidate:** all of its damage is special.

**Must cover:**
- **Garchomp Earthquake:** 148.3-176.9% OHKO. Non-contact, so Aura Guard does not help, and it hits Z harder than regular Mega. It is also a spread move, so a Wide Guard partner or a Flying/Levitate partner matters.
- **Hits that still KO or nearly KO it** (Arcanine-H and M-Golisopod are contact moves that get through even at half damage):
  - Sylveon Hyper Beam 153.1-180.3% KO
  - Arcanine-H Flare Blitz 111.6-130.6% KO on the offensive spread
  - M-Golisopod CC 99.3-117% (15/16)
  - Pelipper rain Weather Ball 93.9-110.9% (11/16)
  - Gholdengo Shadow Ball 82.3-98%
- **Low damage into top threats:**
  - Rillaboom: Aura Sphere 35.3-42%, HH Focus Blast only 78.7-93.2%.
  - Garchomp: Aura Sphere 50.3-60%.
  - Incineroar: Aura Sphere 71.3-84.2%.
  - Kingambit: Aura Sphere 89.9-107.2% (6/16).
  - Sylveon: Flash Cannon 74.6-88.1%.
  - The team needs a Rillaboom answer and a second damage source.
- **Indeedee-F Psychic Terrain (21.78%):** it triggers Sneasler's Psychic Seed and Unburden (2x Speed, which outspeeds Z) and blocks Vacuum Wave against grounded targets.
- **Focus Sash** on Whimsicott and Pelipper: Flash Cannon's 150.4-179.6% does not OHKO Whimsicott.

**Partner ideas:**
- Helping Hand user to turn Aura Sphere into OHKOs on Incineroar, Kingambit and M-Bax.
- Grass or Fire answer for Rillaboom (37.18%), e.g. a Flying or Fire attacker, since Z only does 35-42% to it.
- Wide Guard user, or a Flying/Levitate partner, against Garchomp's Earthquake.
- Terrain override (Grassy, Electric or Misty Surge setter) to deny Indeedee-F's Psychic Terrain and Sneasler's Psychic Seed.
- Fake Out user to cover the turn it needs.
- Fairy answer and a Special Defense check: Sylveon's Hyper Beam OHKOs it.
- Physical attacker partner so the team still pressures slow bulk. Z itself does not need Tailwind, which frees a slot.
