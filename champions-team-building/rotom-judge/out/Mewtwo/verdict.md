# Rotom Judge verdict: Mega Mewtwo X vs Mega Mewtwo Y

> **HYPOTHETICAL.** Mewtwo is not in Pokemon Champions. Its stats and movepool come from `rotom-judge/hypothetical.js`
> (main-series stats, Scarlet/Violet learnset). Every other Pokemon, item and rule is Champions-legal, Reg M-C doubles.

## Scores

| | Mega X (A) | Mega Y (B) |
|---|---|---|
| Evidence (40) | 35 | 36 |
| Relevance (25) | 21 | 22 |
| Rebuttal (20) | 16 | 17 |
| Honesty (15) | 10 | 12 |
| **Total** | **82** | **87** |

**Winner: Mega Mewtwo Y (narrowly).**

## Checked claims (all recomputed with `rotom-judge/engine.js`)

Spreads: X = Jolly 2 HP / 32 Atk / 32 Spe (183 HP / 120 Def / 120 SpD / 200 Spe). Y = Timid 2 HP / 32 SpA / 32 Spe (183 / 90 / 140 / 211).

| Side | Claim | Engine result | Holds |
|---|---|---|---|
| A | Kingambit Sucker Punch into Y 99.5-118% (14/16); into X 36.6-44.3% | 99.5-118% (14/16); 36.6-44.3% | yes |
| A | Kowtow Cleave into Y 119.1-142.1% even in Psychic Terrain; into X 44.8-53% | 119.1-142.1% KO (PT or not); 44.8-53% | yes |
| A | Wood Hammer into Y: 102.7-122.4% in Grassy, 79.2-94% in Psychic Terrain | 102.7-122.4% KO; 79.2-94% | yes |
| A | Indeedee-F and Rillaboom tie at 105 Speed (terrain lead is a coin flip) | both 105 on the board | yes |
| A | Drain Punch into Incineroar 87.1-104%; +HH 130.7-155.9%; -1 +HH 86.1-104% (3/16) | 87.1-104% (3/16); 130.7-155.9% KO; 86.1-104% (3/16) | yes |
| A | Drain Punch into Kingambit (Chople) 70.5-84.1%; +HH 105.8-126.1% | 70.5-84.1%; 105.8-126.1% KO | yes |
| A | Incineroar Knock Off: 25.1-30.1% into X, 65.6-78.7% into Y | same | yes |
| A | Zen Headbutt in Psychic Terrain on M-Staraptor 128.1-151.9% | 128.1-151.9% KO | yes |
| A | "Sylveon's Hyper Beam is a spread move, which Wide Guard stops" | Hyper Beam is single-target (engine: no spread flag, 184.2-216.9% on X). Wide Guard does not stop it. Only Hyper Voice (spread) is stopped, which does 82-98.9% to X | **no** |
| B | X at -1 Atk: Brick Break into Incineroar 57.4-69.3%; Ice Punch into M-Salamence 66.7-79.6%; into Garchomp 86.5-103.8% (3/16) | same | yes |
| B | X at -1 + HH Drain Punch into Kingambit 71-84.1%, no KO; -1 unboosted 47.3-56% | 71-84.1%; 47.3-56% | yes |
| B | Y HH Focus Blast: Incineroar 120.3-142.6%, Kingambit 153.6-181.2%; unboosted Kingambit 102.4-120.8% | same (all at 70% accuracy) | yes |
| B | Y Psychic Terrain + HH Psystrike: Milotic 122.8-145.5%, Rillaboom 116.9-138.6%; PT alone Rillaboom 77.8-92.3% | same | yes |
| B | Y HH Psystrike Sylveon 110.2-130.5%; HH Dark Pulse Indeedee-F 100-118.6% | same | yes |
| B | Y sun Fire Blast: Rillaboom 110.1-130.4%, M-Metagross 138-162.6% | same (85% accuracy) | yes |
| B | Sylveon Hyper Beam into X 184.2-216.9% vs Y 78.7-92.9%; M-Staraptor Brave Bird into X 104.9-124.6% | same | yes |

Also confirmed: Pelipper and Whimsicott carry Focus Sash on the board, so neither form OHKOs them from full.
Zen Headbutt and Ice Punch are 100% accurate in the engine, Stone Edge 80%, Focus Blast 70%, Fire Blast 85%.

## Ruling

Every number both sides cited reproduces exactly. The case is decided by which weaknesses a partner can fix.

Y's physical frailty is real. Kowtow Cleave OHKOs it through Psychic Terrain (119.1-142.1%), and Knock Off does 65.6-78.7%. But
its priority deaths (Sucker Punch 14/16, First Impression 179-210%, Grassy Glide) are removed by Psychic Terrain on a grounded Y.
A's strongest counter was the 105-vs-105 Indeedee/Rillaboom terrain tie. That is fixable, because a Relaxed or Quiet
0-Speed Indeedee-F runs at 94 (engine), so it is slower than Rillaboom and wins the lead terrain every time. Y also keeps its
damage through Intimidate, and its PT+HH Psystrike answers the #1 threat, Rillaboom (116.9-138.6%), which X can only
dent (63.8-75.4%).

X's central claim, that Fighting STAB beats the Dark types, fails against the most common Dark type itself. Incineroar's
Intimidate drops X's Helping Hand Drain Punch on Kingambit to 71-84.1%, and Incineroar and Kingambit are the two most-used
Dark types. A also made a mechanics error: Sylveon's Hyper Beam is single-target, so Wide Guard does not cover X's worst
matchup. A's Fake Out/Steadfast point also conflicts with its own Psychic Terrain partner, which blocks Fake Out on X.
A was right about accuracy: 8 of Y's 13 OHKOs need a 70-85% move. That is why the margin is narrow. B used it well by
choosing Helping Hand plus Psychic Terrain boosts that turn 100%-accurate Psystrike into KOs. Also, Aura Sphere
(never misses) with Helping Hand KOs Kingambit at 102.9-121.7% (engine), so Y's Kingambit answer does not have to be a
70% Focus Blast.

---

## Team brief: Mega Mewtwo X (Mewtwonite X)

**Game plan:** A fast, physically bulky Psychic/Fighting attacker (200 Spe, outspeeds all 21 board threats). It stays in
against Dark and Bug priority and uses 100%-accurate coverage. Pair it with Helping Hand, and with Psychic Terrain for Zen
Headbutt. It needs Intimidate management and a plan for Fairy/Flying special hits.

**Lean into**
- Physical bulk against the top physical threats: Kowtow Cleave 44.8-53%, Sucker Punch 36.6-44.3%, M-Golisopod First Impression 66.7-79.8%, Knock Off 25.1-30.1%, M-Tyranitar Crunch 49.2-57.9%.
- 100%-accurate OHKOs: Zen Headbutt Sneasler 346-413%, Ice Punch Garchomp 129.7-153.5%, Ice Punch M-Salamence 98.9-118.3% (15/16), Earthquake Arcanine-H 158-188%, Brick Break M-Tyranitar 115.9-139.1%, Zen Headbutt M-Staraptor 98.4-116.8% (in Psychic Terrain 128.1-151.9%).
- Helping Hand Drain Punch KOs at +0: Incineroar 130.7-155.9%, Kingambit (through Chople) 105.8-126.1%.
- 200 Speed outspeeds every board threat, including M-Salamence (158) and M-Staraptor (178), which both OHKO it.

**Must cover**
- Intimidate (Incineroar, 26.77%): at -1, Brick Break/Drain Punch on Incineroar 57.4-69.3%, HH Drain Punch on Kingambit 71-84.1% (no KO), Ice Punch on M-Salamence 66.7-79.6%, Garchomp 86.5-103.8%. There is no Clear Amulet in Champions. Needs a Defiant/Competitive-style answer, Intimidate pressure removed, or a partner that deals with Incineroar.
- Sylveon (10.63%): single-target Hyper Beam 184.2-216.9% (a Light Screen still leaves 123-144.8% KO). Wide Guard does not stop it; only Hyper Voice (82-98.9%) is a spread move. Needs a Steel/Poison answer or to KO Sylveon first.
- M-Staraptor Brave Bird 104.9-124.6% and M-Salamence Double-Edge 161.2-190.2% (still 107.7-127.3% at -1). X is faster, but a Tailwind or Trick Room flip loses the trade.
- Gholdengo Shadow Ball 99.5-119.1% (15/16), and X only does 71-84% back with Fire Punch.
- Rillaboom (#1, 37.18%): X's best hit is 63.8-75.4% (Poison Jab), and Wood Hammer in Grassy does 77.6-92.3% to it.
- Do not plan on Steadfast if the team runs Psychic Terrain: the terrain blocks Fake Out on X.

**Partner ideas**
- Helping Hand + Follow Me support (Indeedee-F: Psychic Terrain for Zen Headbutt plus Follow Me for Sylveon/Staraptor hits).
- An Intimidate answer or its own Intimidate (Incineroar or Arcanine-Hisui) to blunt M-Salamence and M-Staraptor.
- A Steel type that walls Fairy/Flying and threatens Sylveon (M-Metagross, Archaludon, or Kingambit).
- A Rillaboom and Gholdengo answer: a Fire attacker (Arcanine-Hisui, Incineroar) or a Flying attacker.
- Speed control (Tailwind from Whimsicott or Pelipper) so Tailwind opponents do not outspeed X.

## Team brief: Mega Mewtwo Y (Mewtwonite Y)

**Game plan:** Psychic Terrain hyper-offense. A min-Speed Indeedee-F (Relaxed/Quiet 0 Spe = 94, slower than Rillaboom's 105, so its
terrain is set last) blocks every priority move on grounded Y and provides Helping Hand plus Follow Me. Y moves first (211)
and fires boosted Psystrike, with Aura Sphere/Focus Blast for the Dark types. Its damage ignores Intimidate.

**Lean into**
- 13/21 OHKOs with no item. The 100%-accurate ones are Psystrike Sneasler 443-522% and M-Staraptor 126.5-149.2%, Ice Beam M-Salamence 163-194% and Garchomp 171-203%, and Earth Power Arcanine-H 195-230%.
- Terrain + HH Psystrike: Rillaboom 116.9-138.6%, Milotic 122.8-145.5%. HH Psystrike Sylveon 110.2-130.5%, HH Dark Pulse Indeedee-F 100-118.6%.
- Dark answers that ignore Intimidate: HH Aura Sphere Kingambit 102.9-121.7% (never misses). Focus Blast Kingambit 102.4-120.8% (70%), HH Focus Blast Incineroar 120.3-142.6% (70%).
- Fire Blast (85%): Gholdengo 108.9-129%, M-Golisopod 160-191%, in sun Rillaboom 110.1-130.4% and M-Metagross 138-162.6%.
- Special bulk: Sylveon Hyper Beam 78.7-92.9%, Whimsicott Moonblast 27.9-32.8%, M-Staraptor Brave Bird 69.4-82.5%.

**Must cover**
- Kingambit Kowtow Cleave 119.1-142.1% (not priority, so terrain does not stop it). Even with 32 HP it takes 101.4-119.2%. Intimidate brings it to 79.8-95.1% and Reflect to 79.2-94.5%.
- Priority when Psychic Terrain is down: Sucker Punch 99.5-118% (14/16), M-Golisopod First Impression 179-210% (119-142% even at -1), Rillaboom Grassy Glide.
- Rillaboom in Grassy Terrain: Wood Hammer 102.7-122.4%. It is only safe while Psychic Terrain is up (79.2-94%). Lose the terrain war and Y is exposed.
- Incineroar Knock Off 65.6-78.7% (45.9-53.6% at -1), and Y only does 80.2-95% back without Helping Hand.
- Other physical OHKOs: M-Tyranitar Crunch 129-154%, Arcanine-H Head Smash 111-132%, M-Baxcalibur Glaive Rush 102-121%, M-Salamence Double-Edge 106-126%. Y outspeeds all of them, so it must KO them first or Protect.
- Accuracy: 8 of the 13 OHKOs rely on Focus Blast (70%), Fire Blast (85%) or Thunder (70%). Prefer Aura Sphere + HH on Kingambit.
- Pelipper and Whimsicott have Focus Sash, so neither form OHKOs them from full.

**Partner ideas**
- Indeedee-F (Psychic Surge, Follow Me, Helping Hand, Relaxed/Quiet 0 Spe so it wins the terrain on a Rillaboom lead). Do not run your own Fake Out: Psychic Terrain blocks it on grounded foes.
- An Intimidate user (Incineroar or Arcanine-Hisui) to take Kowtow Cleave and Knock Off out of KO range (79.8-95.1% and 45.9-53.6%).
- Reflect support, which puts Kowtow at 79.2-94.5%.
- A Fighting/Fairy or Steel partner that can KO Kingambit/Tyranitar independently, so Y is not relying on Focus Blast.
- Torkoal (Drought, slow setter) as an alternative mode for Fire Blast in sun.
