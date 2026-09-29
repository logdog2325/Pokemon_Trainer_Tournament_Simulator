# Rotom Judge verdict: Mega Greninja vs Ash-Greninja (HYPOTHETICAL)

> **HYPOTHETICAL.** Ash-Greninja is not in Pokemon Champions. This ruling prices it with Gen 7 Battle Bond: it transforms permanently after its first KO, and Water Shuriken becomes 20 BP x3. Every other Pokemon, item and rule is real Champions (Reg M-C doubles, Level 50) data. All numbers come from `rotom-judge/engine.js` or `factsheets/Greninja.md`.

## Scores

| | Mega (A) | Ash (B) |
|---|---|---|
| Evidence (40) | 32 | 24 |
| Relevance (25) | 18 | 21 |
| Rebuttal (20) | 17 | 16 |
| Honesty (15) | 11 | 9 |
| **Total** | **78** | **70** |

**Winner: Ash-Greninja (Ash).** A argued the better debate, but B's conclusion still holds once its numbers are recomputed with legal items.

The main problem is that **Choice Specs is not in Champions.** `confirmed-facts.md` lists Choice Band and Choice Specs as absent; Choice Scarf is the only Choice item. Specs is also missing from the engine's `ITEMS` list. B built its whole case on Specs, and A accepted Specs without challenging it. The task's special note gives Specs as an example item, which probably misled both sides, so the Honesty penalty is reduced. The Evidence penalty stays, because those builds cannot be used.

When B's case is rerun with **Life Orb**, which is legal, the conclusion still holds:
- Transformed Life Orb Ash OHKOs **13/21**. Net of the two Focus Sash holders, that is 11.
- Mega Greninja with fresh Protean OHKOs **8/21**. Net of Sash, that is 7.

## Checked claims

These spreads were used:

| Form | Nature and spread | Item | Stats |
|---|---|---|---|
| Mega Greninja | Jolly or Timid, 2 HP / 32 attacking stat / 32 Spe | Greninjite | HP 149, Atk 177 (Jolly) or SpA 185 (Timid), Def 97, SpD 101, Spe 213 |
| Pre-KO Battle Bond | Timid 2/32/32 | — | HP 149, SpA 155, Spe 191 |
| Transformed Ash | Timid 2/32/32 | — | HP 149, SpA 205, Spe 202 |

Pelipper and Whimsicott hold **Focus Sash**, so "net" counts below leave them out.

| Side | Claim | Engine result | Holds |
|---|---|---|---|
| A | Mega Gunk Shot OHKOs Rillaboom (104.3-122.7%). With Protean spent it drops to 69.6-82.1%. | Same. At -1 from Intimidate it is also 69.6-82.1%. | yes |
| A | Jolly Mega Greninja with Helping Hand OHKOs 13/21, including Incineroar with Liquidation (111.4-130.7%) | 15/21 raw and 13 net of Sash, so the count holds. It needs fresh Protean: with Protean spent it is 11/21. At -1 it is 8/21. Incineroar always holds Intimidate, and into Incineroar at -1 even the Helping Hand Liquidation does only **75.7-89.1%**. | yes |
| A | Pre-KO Greninja with Life Orb "OHKOs just 5/21" | The physical Life Orb spread does give 5/21. The special Life Orb spread gives **7/21** (6 net), which is the fair comparison. A chose the weaker spread. | **no** |
| A | Pre-KO rain Water Shuriken (Specs) does 59.2-70.7% to Sneasler and 71.3-83.2% to Incineroar. Rain Surf does 84.7-100% (1/16) to Sneasler. | Same | yes |
| A | Speeds: Mega 213, Ash 202, pre-KO 191. Sneasler and M-Froslass are 189, Whimsicott 184. | Same | yes |
| B | Specs Ash: Hydro Pump does 87.4-103.4% to Kingambit, and the build OHKOs 14/21 (12 net) | The numbers reproduce, but the item is illegal. With Life Orb: Kingambit takes 75.8-90.3%, and the count is **13/21 (11 net)**. | **no** |
| B | Rain Specs Water Shuriken OHKOs Sneasler (103.2-122.3%), Incineroar (115.8-136.6%) and M-Tyranitar (113-133.3%). With Helping Hand it KOs Sneasler and Incineroar. | Specs is illegal. Life Orb in rain: Incineroar 104-127.7% KO, Sneasler 91.7-110.8% (**7/16**), M-Tyranitar 15/16. Life Orb with Helping Hand: Incineroar KO, Sneasler **11/16**. | **no** |
| B | Pre-KO Specs: Extrasensory does 178.3-211.5% to Sneasler, Hydro Pump does 104-122.8% to Incineroar, and it OHKOs 9/21 | Specs is illegal. With Life Orb: Sneasler 155.4-185.4% KO. Incineroar **90.1-107.9% (8/16)** with an 80%-accurate move. The count is 7/21 (6 net). | **no** |
| B | Mega with Helping Hand reaches 16/21 on fresh Protean and 11/21 once Protean is spent | Special with Helping Hand: 16/21 fresh, 13/21 spent. Physical with Helping Hand: 15/21 fresh, 11/21 spent. B mixed the two spreads, but the point about Protean holds. | yes |
| B | Life Orb Ash Dark Pulse OHKOs Indeedee-F (107.3-127.7%) and Farigiraf (101.8-120.7%) | Same | yes |
| B | Pre-KO Greninja at 191 Speed outspeeds all 21 board threats | This holds on the board spreads. Sneasler's Psychic Seed plus Unburden, in Indeedee-F's terrain, is not modelled. | yes |

## Judge's opinion

I rule for Ash-Greninja. B did not argue it well, but the corrected evidence supports it.

**B's evidence.** B built its case on Choice Specs, which does not exist in Champions. That cost B points on Evidence and Honesty. A never noticed, and conceded the Specs figures. When I reran B's case with Life Orb, the gap mostly held:
- Transformed Ash OHKOs **13/21 (11 net of Sash)** without being locked into one move.
- Mega Greninja with fresh Protean OHKOs **8/21**, and **3/21** once Protean is spent.
- B's strongest rebuttal was the Protean-spent collapse, and it holds.

**A's evidence.** A was right on several points:
- Speed: 213 against 202 and 191.
- Rillaboom: Gunk Shot does 104.3-122.7% to it, while Life Orb Ash's Ice Beam does only 65.2-77.8%.
- Pre-KO rain Water Shuriken is weak: 59.2-70.7% into Sneasler.

A was wrong in two places:
- **Life Orb comparison.** A quoted Ash's weaker physical Life Orb spread (5/21). The special spread OHKOs 7/21 before any KO, which is close to Mega's 8/21.
- **Incineroar.** A's headline is "Helping Hand Liquidation KOs Incineroar." Incineroar's own Intimidate drops that to **75.7-89.1%**. At -1, physical Mega's no-help OHKO count falls to **2/21**.

Neither side mentioned Intimidate.

**B's priority argument.** B's "priority KOs on Sneasler and Incineroar" mostly did not survive the move to Life Orb:
- Rain Water Shuriken against Sneasler KOs on only **7/16** rolls.
- Psychic Terrain blocks it outright.
- It still KOs Incineroar in rain or with Helping Hand (104-127.7%).

**Speed.** Neither side priced Sneasler's Psychic Seed and Unburden. On an Indeedee-F team, Sneasler outspeeds both forms.

**What decided it.** Ash has every advantage Mega Greninja has except about 11-22 points of Speed and one Rillaboom KO. Ash also keeps its item slot and leaves the team's Mega Evolution free.

**What each form is best at:**
- **Mega Greninja:** a fast Helping Hand nuke on the turn after it switches in. Its special set with Helping Hand OHKOs 13/21 even with Protean spent.
- **Ash-Greninja:** a Life Orb special attacker that snowballs after its first KO and shares the team with a second Mega.

Conclusion: Ash-Greninja is the better form in this format, even without the illegal Choice Specs. First, transformed Life Orb Ash OHKOs 13/21 with free move choice (17/21 with Helping Hand). Mega Greninja OHKOs 8/21 on fresh Protean and only 3/21 physical once Protean is spent. Second, before its first KO, Life Orb Battle Bond Greninja already matches Mega Greninja (7/21 against 8/21, and 14/21 against 15/21 with Helping Hand) while still outspeeding all 21 threats at 191. Third, Ash leaves the team's one Mega Evolution free. Mega Greninja's real edges are 213 Speed and the Gunk Shot KO on Rillaboom, and they do not outweigh those three points.

## Team brief: Mega Greninja (A)

**Game plan:** Mega Greninja is a turn-1 nuke. Lead it next to Fake Out and Helping Hand support, and use U-turn or switching to reset Protean.
- **Choose the special set (Timid 2/32 SpA/32 Spe).** It is immune to Intimidate and keeps a Helping Hand count of 13/21 even with Protean spent. The physical set drops to 11/21 when spent and 8/21 at -1.
- **Use the first attack of each switch-in carefully.** Save it for the move whose STAB matters most, such as Ice Beam into Rillaboom.

**Lean into:**
- **Speed:** 213 outspeeds every board threat, plus the 205 Mega tier (Manectric, Lopunny) and Mega Delphox (204).
- **Special with Helping Hand on fresh Protean:** 16/21, including:
  - Rillaboom: Ice Beam 101.4-121.7%
  - Incineroar: Hydro Pump 124.8-147%
  - Indeedee-F: Dark Pulse 113.6-133.9%
  - M-Metagross: Dark Pulse 115.8-136.8%
- **Special with Helping Hand, Protean spent:** still 13/21.
- **Physical no-item KOs on fresh Protean:**
  - Rillaboom: Gunk Shot 104.3-122.7% (80% accurate)
  - M-Salamence: Ice Punch 109.7-129%
  - Garchomp: Ice Punch 142.7-168.6%
- **Slightly better bulk than Ash:**
  - Whimsicott's Moonblast KOs Mega on 10/16 rolls; Ash dies to every roll.
  - Garchomp's Dragon Claw does 73.8-89.3% to Mega.

**Must cover:**
- **Protean spent (no Helping Hand):** physical drops to 3/21 OHKOs, special to 5/21.
- **Intimidate:** Incineroar is at 26.77% usage. Physical Mega at -1 OHKOs 2/21, and even Helping Hand Liquidation does 75.7-89.1% into Incineroar.
- **Hits that OHKO it:**
  - Rillaboom Wood Hammer: 235.6-279.2%
  - Sneasler Close Combat: 170.5-202.7%
  - M-Golisopod First Impression
  - Archaludon Electro Shot: 126.2-149%
  - Sylveon, Arcanine-H Head Smash, M-Baxcalibur, M-Staraptor
- **Walls it:**
  - Kingambit: special 53.1-63.8%
  - M-Golisopod: 28-33.5% physical, 45.1-53.3% special
  - Milotic
- **Trick Room:** Farigiraf and Indeedee-F.
- **Faster Megas at 216-223:** Absol Z, Garchomp Z, Lucario Z, Alakazam, Aerodactyl, Beedrill, Sceptile.
- **Sneasler with Unburden in Psychic Terrain** outspeeds it.
- **Fake Out:** from Incineroar and Sneasler.

**Partner ideas:**
- **Helping Hand user.** This is essential.
- **Fake Out + Intimidate support:** Incineroar.
- **Rillaboom answer:** a Fire- or Flying-type.
- **Anti-Trick Room:** Taunt or Imprison, or Mega Greninja's own Taunt.
- **Speed control:** a Tailwind setter against Megas at 216-223.
- **Fairy-resistant switch-in** for Whimsicott and Sylveon: Gholdengo or a Steel-type.
- **No second Mega.** The Mega slot is used here, so the other five Pokemon carry distinct normal items: Life Orb, Sitrus Berry, Focus Sash, Choice Scarf, Leftovers.

## Team brief: Ash-Greninja (B, HYPOTHETICAL)

**Game plan:**
- **Build:** Timid 2 HP / 32 SpA / 32 Spe, **Life Orb**. Do NOT use Choice Specs: it is not in Champions.
- **Paste format:** write it as "Greninja-Ash @ Life Orb" with "Ability: Battle Bond". Species Clause treats it as Greninja.
- **Turn 1:** find the first KO against a target that dies to Life Orb Battle Bond Greninja, ideally with Helping Hand.
- **After the transform:** snowball with Dark Pulse, Hydro Pump, Ice Beam and Extrasensory, using Water Shuriken as a priority finisher.
- **Mega:** run a second Mega Evolution on the same team.
- **Notes file:** the Ash notes must say at the top that the team is hypothetical.
- **Validator:** `node validate.js out/Greninja/greninja-ash.txt --require "Greninja:Ash"`.

**Lean into:**
- **Pre-KO Life Orb KOs (7/21):**
  - Sneasler: Extrasensory 155.4-185.4%
  - M-Salamence: Ice Beam 134.4-159.1%
  - Garchomp: Ice Beam 143.2-168.6%
  - Gholdengo: Dark Pulse 14/16
  - M-Froslass: Dark Pulse 102.7-123.8%
  - Arcanine-H: Hydro Pump
- **Pre-KO with Helping Hand:** 14/21, including Incineroar (Hydro Pump 135.1-162.4%) and Indeedee-F (Dark Pulse 121.5-145.2%).
- **Transformed with Life Orb:** 13/21 with free move choice, 17/21 with Helping Hand, and 15/21 in rain.
- **Rain adds KOs:** Kingambit (Hydro Pump 115-135.7%) and M-Metagross (112.3-132.7%).
- **Priority Water Shuriken (Life Orb):**
  - Incineroar: KO in rain or with Helping Hand (104-127.7%)
  - M-Tyranitar in rain: 15/16
- **Speed:** 191 before the KO still outspeeds all 21 board threats. After the transform it is 202.

**Must cover:**
- **Rillaboom:** the top threat at 37.18% usage. Life Orb Ice Beam does only 65.2-77.8% (98.1-116.9% with Helping Hand), and its Wood Hammer does 263.8-310.7% to Ash.
- **Sneasler:** Close Combat does 190.6-225.5%, and with Psychic Seed plus Unburden it outspeeds Ash. Water Shuriken KOs it on only 7/16 rolls in rain, and 11/16 with Helping Hand.
- **Whimsicott:** Moonblast KOs on every roll (102-122.1%), and it can set up Prankster Tailwind.
- **Psychic Terrain (Indeedee-F):** blocks Water Shuriken against grounded targets.
- **Pre-KO misses:**
  - Incineroar: only 8/16 KO rolls with Life Orb Hydro Pump, which is 80% accurate
  - Kingambit: 75.8-90.3% even after the transform
  - M-Golisopod, Milotic and Sylveon are not KO'd
- **Other hits that KO Ash:** Archaludon Electro Shot (139.6-165.1%), M-Baxcalibur Glaive Rush, M-Staraptor Close Combat.
- **Fake Out:** from Incineroar and Sneasler can delay the first KO.
- **Life Orb recoil.**

**Partner ideas:**
- **Second Mega:** M-Salamence (Aerilate Flying hits Rillaboom and Sneasler) or M-Metagross (Fairy answer for Whimsicott and Sylveon).
- **Rain:** Pelipper with Drizzle (Damp Rock) for rain Hydro Pump and Water Shuriken. It also has Tailwind.
- **Helping Hand user:** pushes pre-KO damage to 14/21 and makes the first KO reliable.
- **Fake Out + Intimidate support:** Incineroar.
- **Psychic Terrain counter:** a Dark or Bug attacker for Indeedee-F. Ash's own Dark Pulse also KOs Indeedee-F after the transform.
- **Speed control:** Tailwind against Megas at 205-223 and against Unburden Sneasler.
- **Grassy/Rillaboom answer:** a Fire- or Flying-type.
