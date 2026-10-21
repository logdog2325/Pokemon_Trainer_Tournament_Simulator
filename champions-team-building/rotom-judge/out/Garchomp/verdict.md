# Rotom Judge verdict: Mega Garchomp vs Mega Garchomp Z

Reg M-C doubles, Level 50. Every number below comes from `rotom-judge/engine.js` or `factsheets/Garchomp.md`.

## Scores

| | Mega (A) | Mega Z (B) |
|---|---|---|
| Evidence (40) | 30 | 25 |
| Relevance (25) | 17 | 19 |
| Rebuttal (20) | 16 | 14 |
| Honesty (15) | 12 | 10 |
| **Total** | **75** | **68** |

**Winner: Mega Garchomp (Mega).** It is a narrow win, and it depends on building around sand.

## Checked claims

Spreads used:
- **Mega:** Jolly 2 HP / 32 Atk / 32 Spe, holding Garchompite. That gives 185 HP, 222 Atk, 135 Def, 115 SpD and 158 Spe.
- **Mega Z (special):** Timid 2 HP / 32 SpA / 32 Spe, holding Garchompite Z. That gives 185 HP, 105 Def, 193 SpA, 105 SpD and 223 Spe.
- **Mega Z (physical):** Jolly 2/32/32, used for the Earthquake comparison.

Spread damage already includes the x0.75 doubles penalty.

On the board, Pelipper and Whimsicott hold a **Focus Sash**, so no single hit KOs either of them from full HP. The fact sheet's OHKO counts include both of them.

| Side | Claim | Engine result | Holds |
|---|---|---|---|
| A | EQ, Mega vs Mega Z: Incineroar 80.2-95% vs 44.6-52.5%; Gholdengo 95.9-113.6% (11/16) vs 53.3-62.7%; Kingambit 63.8-75.4% vs 34.8-41.5% | Same | yes |
| A | Sand EQ (no HH) OHKOs Sneasler 195.5-229.9%, Incineroar 104.5-123.8%, Gholdengo 124.9-147.9%, Arcanine-H 281.4-335.5%. Archaludon 7/16, M-Froslass 8/16 | Same | yes |
| A | HH + sand EQ OHKOs 9/21: Kingambit 124.2-146.9%, Archaludon 135.9-161.3%, M-Froslass 136.7-163.3%, M-Metagross 125.7-150.3%, M-Tyranitar 101.9-120.8%, plus the four above. Sylveon 13/16 | Same. None of the nine is a Sash holder. | yes |
| A | HH + sand EQ at -1 still KOs Sneasler 193.6-231.2%, Incineroar 104.5-123.8%, Gholdengo 124.9-147.9% and Arcanine-H 285.5-340.1% | Same. Kingambit drops to 81.2-98.1%, so it is no longer a KO. | yes |
| A | EQ OHKOs Sneasler "in every condition" (150.3-177.1% neutral, 129.3-154.1% sand at -1) | Both figures reproduce. At -1 with no sand it is 99.4-118.5% (15/16). With sand and Grassy Terrain it is 97.5-115.3% (13/16). | yes (mild overclaim) |
| A | Defense: Sneasler CC 50.3-58.9%, Arc-H Head Smash 36.8-43.8%, M-Salamence Dragon Claw 78.9-94.1%, Garchomp Dragon Claw 85.9-102.7% (3/16). On Z: 63.8-75.1%, 94.6-111.9% (11/16), 100.5-120%, 110.8-131.9% | Same | yes |
| A | Mega "already OHKOs three of the six faster threats" (Sneasler, Whimsicott, M-Froslass) | Whimsicott holds Focus Sash, so it cannot be OHKO'd from full HP. Against M-Froslass the only KO move is Iron Tail (75% accurate); sand EQ KOs on 8/16 rolls. Only Sneasler is a reliable OHKO. | **no** |
| A | Mega's OHKOs go "from 6/21 to 9/21 in sand" | The sheet's counts include Pelipper and Whimsicott, both Focus Sash holders. The real counts are **4 to 7**, and 7 includes Sylveon via Iron Tail (75% accurate). | **no** |
| A | Hippowdon takes 30.7-36.3% from sand EQ | Same. It takes 46-54.4% when the EQ is Helping Hand boosted. Base Tyranitar takes 90.3-106.8% (6/16). | yes |
| B | Timid 223 outspeeds all 21 threats | Same. The board does not model Sneasler's Psychic Seed + Unburden; see the ruling. | yes |
| B | Timid Mega Z OHKOs 7/21 with no item (Mega OHKOs 6/21) | The count includes Pelipper and Whimsicott (Focus Sash). The real figures are **5 vs 4**. | **no** |
| B | HH additions: Sneasler DM 135.7-160.5%, Archaludon DM 137.6-162.4%, Gholdengo FB 129.6-152.7%, M-Froslass FB 136.7-161.2%, Kingambit FB 110.1-130.4%, M-Metagross FB 108.8-128.1%, M-Staraptor DM 104.3-123.8% | Same | yes |
| B | "OHKOs 14/21 with one Helping Hand" | 14 includes the two Focus Sash holders, so the real count is **12**. Every one is single-target, and every one except Arcanine-H (Earth Power) uses an 85% or 90% accurate move. | **no** |
| B | Sun Fire Blast OHKOs Gholdengo 129-152.7%, Kingambit 110.1-130.4%, M-Metagross 107.6-127.5% | Same. In rain, HH Fire Blast on Gholdengo drops to 63.9-76.3%. | yes |
| B | Typing: Milotic Ice Beam 46.5-55.1% (Mega 84.3-101.6%), M-Froslass Blizzard 90.8-108.1% 8/16 (Mega 164.3-196.8%), Rillaboom Wood Hammer 44.3-51.9% (Mega 68.1-80.5%) | Same. Snow Icy Wind: Mega 84.3-99.5%, Z 45.4-55.1%. | yes |
| B | Sand EQ at -1: Incineroar 69.3-82.2%, Gholdengo 82.8-98.2%, Kingambit 54.1-65.2% | Same | yes |
| B | "Their 104.5-123.8% Incineroar figure is actually their HH + sand + -1 result" | This misreads A's number. A's opening figure is sand EQ with no Helping Hand and no Intimidate, and it reproduces exactly. HH + sand + -1 gives the same number only because 1.5 x 2/3 = 1. The underlying point, that one Intimidate cancels Helping Hand, is correct. | **no** |
| B | Mega Z moves first and KOs Garchomp with DM (145.9-173%) and M-Salamence (138.7-164.5%) | Same, but Draco Meteor is 90% accurate. After the -2 SpA drop, DM does 72.4-87.6% to Garchomp and 44.6-53.5% to Sneasler, so the KO cannot be repeated. | yes |

## Ruling

Nearly every damage roll both sides cited reproduces.

**A's case.** A's Ground-STAB spread plan holds up under checking:
- With sand and Helping Hand, one 100%-accurate Earthquake OHKOs 9 board threats.
- Through Intimidate it still KOs 4 of them: Sneasler, Incineroar, Gholdengo and Arcanine-H.
- Mega Garchomp survives the physical hits that OHKO or nearly OHKO Mega Z: Garchomp and M-Salamence Dragon Claw, Arcanine-H Head Smash and Sneasler Close Combat.

**A's key rebuttal point also holds.** Mega Z's KOs are single-target and 85-90% accurate, and Draco Meteor cannot be repeated. At -2 SpA it does only 44.6-53.5% to Sneasler.

**B's "three slots" argument also fails, for a reason B missed.** Hippowdon learns Helping Hand. It sets sand on entry and uses Helping Hand in the same turn, so the full sand + Helping Hand setup needs two slots, not three.

**B's case.** B's real, proven points are these:
- 223 Speed outspeeds the whole board.
- Special attacks ignore Intimidate. At -1 in sand without Helping Hand, Mega's EQ loses the Incineroar, Gholdengo and Kingambit KOs.
- Removing the 4x Ice weakness is real: Milotic Ice Beam 46.5-55.1% and snow Icy Wind 45.4-55.1%.

But B's headline counts are inflated by the two Focus Sash holders: 7/21 is really 5, and 14/21 is really 12. B also misread A's Incineroar number.

**What neither side raised, and it cuts both ways:**
- **Grassy Terrain from Rillaboom (37.18%, the #1 threat) halves Earthquake on grounded targets.** Sand EQ drops to 52-61.9% on Incineroar, 62.1-74% on Gholdengo and 41.5-48.8% on Kingambit. It still KOs Sneasler on 13/16 rolls. A Rillaboom + Incineroar lead is the worst matchup for Mega Garchomp.
- **Rain from Pelipper (13.09%) halves Fire Blast.** HH Fire Blast on Gholdengo drops to 63.9-76.3%. It also overwrites sand on any later switch-in.
- **Sneasler (34.29%) holds a Psychic Seed.** In Indeedee-F's Psychic Terrain it gets +1 SpD, which drops Mega Z's Draco Meteor to 59.9-71.3%. Unburden then doubles its Speed. That is a standard mechanic the engine does not model, and it would put Sneasler above 223.

**Verdict.** On what was proven, Mega Garchomp is the stronger Mega for a team built around sand. Mega Z is a real alternative for a weather-free, fast special attacker.

## Brief: Mega Garchomp (Garchompite)

**Game plan.** Build a sand spread core. Hippowdon (Sand Stream, Helping Hand, 60-67 Speed, slower than Pelipper's 128, so its sand wins a simultaneous lead) sets sand and uses Helping Hand. Jolly 2/32/32 Mega Garchomp spams 100%-accurate Earthquake alongside ungrounded or EQ-immune partners, aiming for turn-one double KOs. Protect Hippowdon or accept 46-54.4% self-damage from HH sand EQ. Otherwise pair Garchomp with Levitate or Flying partners so EQ is free.

**Lean into:**
- Ground-STAB spread EQ does about twice what Mega Z's EQ does: Incineroar 80.2-95%, Gholdengo 95.9-113.6% (11/16), Kingambit 63.8-75.4%, all on a neutral field.
- Sand EQ, no HH, OHKOs Sneasler 195.5-229.9%, Incineroar 104.5-123.8%, Gholdengo 124.9-147.9% and Arcanine-H 281.4-335.5%. Archaludon 7/16, M-Froslass 8/16.
- HH + sand EQ OHKOs 9/21 across both slots, adding Kingambit 124.2-146.9%, Archaludon 135.9-161.3%, M-Froslass 136.7-163.3%, M-Metagross 125.7-150.3% and M-Tyranitar 101.9-120.8%. Sylveon 13/16.
- Through Intimidate (-1), HH + sand EQ still KOs Sneasler, Incineroar, Gholdengo and Arcanine-H.
- Physical bulk (185/135 Def):
  - Sneasler CC 50.3-58.9%
  - Arcanine-H Head Smash 36.8-43.8%
  - Kingambit Kowtow Cleave 39.5-47%
  - M-Salamence Dragon Claw 78.9-94.1%
  - Garchomp LO Dragon Claw only 3/16 to KO
- It outspeeds 15/21 threats at 158, including Gholdengo 144, M-Metagross 148 and Arcanine-H 156, and it OHKOs the faster Sneasler back after taking Close Combat.
- It is immune to Electric.

**Must cover:**
- **Ice, 4x weak:**
  - M-Froslass Blizzard 164.3-196.8% KO, and at 189 Speed it moves first
  - snow Icy Wind 84.3-99.5%
  - M-Baxcalibur Icicle Crash 190.3-227% KO
  - Milotic Ice Beam 84.3-101.6%
- **Intimidate (Incineroar 26.77%).** At -1 in sand without HH: Incineroar 69.3-82.2%, Gholdengo 82.8-98.2%, Kingambit 54.1-65.2%.
- **Grassy Terrain (Rillaboom 37.18%)** halves EQ: sand EQ does Incineroar 52-61.9%, Gholdengo 62.1-74%, Kingambit 41.5-48.8%. Rillaboom itself takes only 39.6-47.3% even from HH sand EQ, and Wood Hammer does 68.1-80.5% to Mega.
- **Rain (Pelipper, Drizzle)** overwrites sand when it switches in later.
- **Faster threats:**
  - Sneasler 189
  - Whimsicott 184 (Focus Sash + Tailwind)
  - M-Froslass 189
  - M-Staraptor 178
  - Garchomp 169
  - M-Salamence (speed tie at 158)
- **Special nukes:** Sylveon Hyper Beam 188.1-224.3% and Archaludon Draco Meteor 134.1-158.9% both OHKO.
- **Focus Sash** on Pelipper and Whimsicott, so spread damage has to be doubled up on them.

**Partner ideas:**
- **Hippowdon (Sand Stream + Helping Hand), Smooth Rock.** It is the core partner: it sets sand and uses Helping Hand on the same turn.
- **Base Tyranitar (Sand Stream, 81 Speed) as the second setter.** It must Protect when Garchomp uses EQ, because sand EQ does 90.3-106.8% to it. Only one Mega is allowed, so no M-Tyranitar.
- **Rotom-Wash (Levitate, Helping Hand, Electric/Water).** It is EQ-immune and can use Helping Hand. It checks Pelipper and M-Froslass, and it answers Rillaboom poorly.
- **An ungrounded speed-control user so Garchomp outspeeds Sneasler, Whimsicott and M-Froslass.** Dragonite (Flying, Multiscale, Tailwind, Helping Hand, Icy Wind) or Corviknight (Flying/Steel, Tailwind; resists Ice and Fairy).
- **Grassy Terrain answer.** A Flying or Fire attacker that removes Rillaboom quickly, such as Talonflame (Gale Wings, Tailwind) or Charizard. Or overwrite the terrain.
- **Ice and Fairy answer.** A Steel or Fire partner such as Corviknight or Scizor. Incineroar also works (Fake Out, Intimidate, Fire vs Ice), but it takes EQ, so it must Protect or be benched on EQ turns.

## Brief: Mega Garchomp Z (Garchompite Z)

**Game plan.** Timid 2/32 SpA/32 Spe Mega Z (223 Speed, faster than the whole board) runs Draco Meteor, Fire Blast, Earth Power and Protect as a fast special attacker. It needs no weather. Pair it with a Helping Hand user, and optionally a sun setter to power Fire Blast, so it takes one guaranteed KO per turn before the target moves. Levitate lets a grounded-spread-EQ partner fire freely beside it. Use Protect or switch after Draco Meteor to reset the -2 SpA drop.

**Lean into:**
- **Speed.** At 223 it outspeeds all 21 threats, and no Mega is faster (Absol Mega Z and Lucario Mega Z tie).
- **No-item OHKOs:**
  - Garchomp: Draco Meteor 145.9-173%
  - M-Salamence: Draco Meteor 138.7-164.5%
  - M-Baxcalibur: Draco Meteor 114.6-135%
  - M-Golisopod: Fire Blast 125.3-149.5%
  - Arcanine-H: Earth Power 153.5-181.4%, 100% accurate
- **With Helping Hand:**
  - Sneasler: Draco Meteor 135.7-160.5%
  - Archaludon: Draco Meteor 137.6-162.4%
  - Gholdengo: Fire Blast 129.6-152.7%
  - M-Froslass: Fire Blast 136.7-161.2%
  - Kingambit: Fire Blast 110.1-130.4%
  - M-Metagross: Fire Blast 108.8-128.1%
  - M-Staraptor: Draco Meteor 104.3-123.8%
  - That is 12 real OHKOs, not counting the two Focus Sash holders.
- **Sun Fire Blast without HH:** Gholdengo 129-152.7%, Kingambit 110.1-130.4%, M-Metagross 107.6-127.5%.
- **Intimidate immunity.** Its special attacks ignore Incineroar's Intimidate.
- **Only 2x Ice-weak:**
  - Milotic Ice Beam 46.5-55.1%
  - snow Icy Wind 45.4-55.1%
  - M-Froslass Blizzard 90.8-108.1% (8/16)
- **Resistances.** It resists Water, Electric, Grass and Fire; Rillaboom Wood Hammer does 44.3-51.9%. Levitate makes it immune to Ground.

**Must cover:**
- **Accuracy.** Draco Meteor is 90% accurate and Fire Blast is 85%.
- **Draco Meteor -2 SpA.** Afterwards it does Sneasler 44.6-53.5% and Garchomp 72.4-87.6%.
- **Physical hits it cannot take if it loses Speed** (Tailwind from Whimsicott or M-Staraptor, Trick Room from Indeedee-F or Farigiraf):
  - Garchomp Dragon Claw 110.8-131.9% KO
  - M-Salamence Dragon Claw 100.5-120% KO
  - Arcanine-H Head Smash 94.6-111.9% (11/16)
  - M-Baxcalibur Glaive Rush 173-205.4%
  - Sneasler Close Combat 63.8-75.1%
- **Special attacks that OHKO or nearly OHKO it:**
  - Sylveon Hyper Voice 93.5-111.9% (9/16) and Hyper Beam 207-244.3%
  - Archaludon Draco Meteor 145.9-173%
  - Whimsicott Moonblast 72.4-85.4%
- **Rain (Pelipper)** halves Fire Blast: HH Fire Blast on Gholdengo drops to 63.9-76.3%.
- **Sneasler's Psychic Seed** in Psychic Terrain (Indeedee-F 21.78%) gives +1 SpD, and Draco Meteor drops to 59.9-71.3%. Unburden then doubles Sneasler's Speed past 223.
- **Targets it barely dents:**
  - Incineroar: Draco Meteor 50.5-59.9%
  - Milotic: Draco Meteor 41.6-49%
  - Sylveon: Fire Blast 30.5-36.2%
  - Unboosted Steels: Kingambit Fire Blast 73.4-87%, M-Metagross Fire Blast 72.5-85.4%
- **Focus Sash** on Pelipper and Whimsicott.

**Partner ideas:**
- **Helping Hand user.** Indeedee-F (Helping Hand, Fake Out, Follow Me; its Psychic Terrain also stops opposing priority on grounded partners, but it also triggers an opposing Sneasler's Psychic Seed) or Maushold (Friend Guard, Helping Hand).
- **Sun setter for Fire Blast.** Torkoal (Drought, Helping Hand, 36 Speed, so its sun wins a simultaneous lead against Pelipper) or Ninetales (Drought, Helping Hand).
- **Grounded spread-EQ partner that Levitate ignores.** Excadrill (Ground/Steel) or Hippowdon. No second Garchomp (Species Clause).
- **Fake Out + Intimidate support against the physical Dragons and Arcanine-H.** Incineroar.
- **Fairy and Ice answer.** A Steel type such as Gholdengo, Kingambit or Archaludon (Archaludon also punishes Sylveon).
- **Anti-speed-control plan.** Protect plus a partner that can Taunt, KO or Fake Out Tailwind and Trick Room setters (Whimsicott, Indeedee-F, Farigiraf).
