# Confirmed Champions Facts — Living Memory

Facts **verified by the user or web search** during builds. User corrections override everything.
Web sources have repeatedly been WRONG about Champions (see corrections). Append as we learn.

> ⚠️ Web unreliability log: a "mega list" search falsely claimed Kingambit/Sneasler/Sylveon/
> Basculegion have Megas — they do NOT. Always confirm Megas with the user.

## Mega Evolution — who has one
**Confirmed YES (with Champions ability):**
- **Raichu** — TWO Megas:
  - *Mega Raichu X*: Electric Surge (sets Electric Terrain), physical, ~60/135/95/90/95/110.
  - *Mega Raichu Y*: **No Guard**, special sweeper, ~60/85/95/160/95/130.
- **Garchomp** — Mega exists (meta-rare in current Reg M-B per user).
- **Staraptor** — *Mega Staraptor*: **Contrary**, and **becomes Flying/Fighting** (Close Combat is STAB;
  Contrary makes its self-debuffs into boosts — see combo below). A live meta threat.
- **Eelektross** — *Mega*: **Eelevate** (Ground immunity + immune to all hazards + +1 to highest stat on each KO), ~85/145/80/135/90/80, Electric.
- **Scrafty** — *Mega*: **Intimidate**, Dark/Fighting, ~65/130/135/55/135/68. (Base Scrafty can also have Intimidate.)
- **Chandelure** — *Mega*: **Infiltrator** (ignores Reflect/Light Screen/Aurora Veil), Fire/Ghost, ~60/75/110/175/110/90. Learns **Trick Room**. Highest base SpA in format (175).
- **Glimmora** — *Mega*: **Adaptability** (STAB ×2), Rock/Poison, ~83/90/105/150/96/101. Base 101 Speed (fast → poor TR fit).

**Confirmed NO Mega (user-corrected, despite bad web claims):**
- Kingambit, Sneasler, Sylveon, Basculegion. (Still strong as non-Megas — Kingambit keeps Sucker Punch / Supreme Overlord.)

## Movepool / ability changes confirmed
- **Raichu** learns **Zap Cannon** (120 BP, normally 50% acc / always paralyzes) — with Mega Y's No Guard it **always hits**. Also gets **Fake Out**.
- **Mega Staraptor Contrary combo**: in doubles, have an ally hit Staraptor with a debuff to trigger Contrary as a *boost*:
  - Tickle → +1 Atk / +1 Def · Scary Face → +2 Spe · Fake Tears → +2 SpD.
  - Close Combat self-raises +1 Def / +1 SpD per use. Whimsicott (Prankster) is the classic enabler.
- **Grimmsnarl** can **NOT** learn Thunder Wave anymore (user-confirmed). Still has Reflect, Light Screen, Spirit Break, Fake Tears, Taunt.
- **Sinistcha** runs **Rage Powder** (99.2% usage — its #1 move), plus Trick Room, Matcha Gotcha, Strength Sap, Life Dew. Ability **Hospitality** (heals partner on switch-in).
- **Volcarona**: ability **Flame Body** (97%). Movepool incl. Quiver Dance, Heat Wave, Giga Drain, Fiery Dance, Bug Buzz, **Rage Powder**, **Tailwind**, Struggle Bug, Will-O-Wisp.

## Items confirmed present / absent  (full verified list in items.md)
- Present: Mystic Water, Wise Glasses (×1.1 special), Life Orb, Expert Belt, Soft Sand, Charti Berry (Rock-resist), Focus Sash, Black Glasses, Leftovers, Sitrus, Charcoal, weather rocks, etc.
- **NOT in Champions** (verified vs Serebii): Clear Amulet, Assault Vest, Choice Band, Choice Specs,
  Rocky Helmet, Throat Spray, Covert Cloak, Safety Goggles, the Seeds, Booster Energy, Loaded Dice.
  The item pool is more restrictive than standard VGC — only Choice **Scarf** exists (no Band/Specs).
- **Mega Stone name gotchas** (Serebii spellings): **Scraftinite** (not Scraftite — user was right),
  **Staraptite** (not Staraptorite), **Glimmoranite** (not Glimmorite). Chandelurite, Garchompite,
  Raichunite X/Y are correct as written.

## Roster + items verified
roster.md and items.md were verified against Serebii 2026-06 (the authoritative source). The earlier
web-scraped seed was incomplete/spotty; the current files are trustworthy. Count: ~210 base+regional
species, 76 Mega-capable.

## Worked examples (teams we built)
1. **Samurott (Unovan) — Snow Trick Room.** Role: mixed special TR attacker. Final team:
   Samurott @ Life Orb · Mega Chandelure · Mega Scrafty · Sinistcha (Rage Powder) · Vanilluxe · Glimmora @ Expert Belt.
2. **Volcarona — Tailwind HO.** Role: special setup sweeper. Team:
   Volcarona @ Charti Berry · Whimsicott (Tailwind + Contrary combo) · Mega Raichu Y (Zap Cannon) ·
   Mega Staraptor (Contrary) · Kingambit · Sinistcha (Rage Powder).

## Stat-point system (see ruleset)
66 points total, 32 cap, no IVs, natures apply.

---

## Regulation M-C (2026-09-09 → 2026-12-02) — VERIFIED
Source: serebii.net/pokemonchampions/rankedbattle/regulationm-c.shtml + per-species Champions Pokédex
pages, scraped 2026-09-09. All 26 entries are now in `app/dex-data.js` (258 total).

### New Pokémon (23 species / 26 dex entries)
Wigglytuff · Persian + **Persian-Alola** · Farfetch'd · Mr. Mime · Swalot · **Salamence** · Gogoat ·
**Golisopod** · **Rillaboom** · Cinderace · Inteleon · Thievul · Toxtricity + **Toxtricity-Low-Key** ·
Grapploct · Perrserker · Sirfetch'd · **Pincurchin** · **Indeedee-Male** + **Indeedee-Female** ·
Pawmot · Arboliva · Squawkabilly · Mabosstiff · **Baxcalibur**

### New Megas (6) — the three Z-megas plus three more
| Mega | Type | Ability | Base stats | Stone |
|---|---|---|---|---|
| Absol Z | Dark/Ghost | Sharpness | 65/154/60/75/60/151 | Absolite Z |
| Garchomp Z | Dragon | Levitate | 108/130/85/141/85/151 | Garchompite Z |
| Lucario Z | Fighting/Steel | Aura Guard | 70/100/70/164/70/151 | Lucarionite Z |
| **Salamence** | Dragon/Flying | Aerilate | 95/145/130/120/90/120 | Salamencite |
| **Golisopod** | **Bug/Steel** (was Bug/Water) | Tough Claws | 75/150/175/70/120/40 | Golisopite |
| **Baxcalibur** | Dragon/Ice | Thermal Exchange | 115/175/117/105/101/87 | Baxcalibrite |

- Mega Salamence's split is **Def +50 (80→130), SpD +10** — it megas into a *physical* wall, which is
  why physical answers to it fail and special ones work.
- **Aerilate is 1.2× in this gen** (nerfed from 1.3×) and converts *any* Normal move, including
  special ones — Salamence is a mixed attacker (Hyper Voice as well as Double-Edge).

### Terrain arrived (the headline change)
Before M-C the only terrain ability in the whole dex was **Mega Raichu X (Electric Surge)**.
M-C added all three of the missing setters at once:
- **Psychic Surge** — Indeedee-Male (60/65/55/105/95/95, base 95 Spe) and Indeedee-Female
  (70/55/65/95/105/85, base 85 Spe). Both are **Psychic/Normal**, so both are **immune to Ghost**.
- **Grassy Surge** — Rillaboom (100/125/90/60/70/85)
- **Electric Surge** — Pincurchin (48/101/95/91/85/15)
- plus **Terrain Extender** and all four **Seeds**.

Rules that matter and are easy to get wrong:
1. Terrain only affects **grounded** Pokémon — no boost for the user, no protection for the target.
   A Levitate mega (Delphox, Chimecho, **Garchomp Z**) gets *nothing* from a terrain team, and
   Expanding Force stays 80 BP and single-target for it. Air Balloon un-grounds you too.
2. **Psychic Terrain blocks every priority move aimed at a grounded target** — including your OWN
   Fake Out, and Grassy Glide / Sucker Punch / Bullet Punch / Aqua Jet / Extreme Speed.
   A psyspam team should not run Fake Out.
3. Simultaneous entry: terrain abilities fire in **Speed order and the LAST one wins**, so the
   *slower* setter takes the terrain on the lead. Mid-game it is whoever switches in last.
   Terrain Extender lengthens your terrain; it does not defend it.
4. Expanding Force: 80 → 120 BP **and** becomes a spread move in Psychic Terrain, **and** takes the
   terrain's separate 1.3× Psychic boost on top. Rising Voltage 70→140, Psyblade 80→120 (Electric).
5. **Fairy does not resist Fairy**, and Fighting is **4×** on Dark/Steel (Kingambit) and Rock/Dark
   (Tyranitar) — Aura Sphere / Focus Blast are the psyspam answers to the Dark immunity, not
   Pixilate Hyper Voice (only ~42-49% on Kingambit).

### Notable abilities that came with the drop
Grassy Surge · Psychic Surge · Electric Surge · Libero (Cinderace) · Aerilate (M-Salamence) ·
Punk Rock (Toxtricity) · Steely Spirit (Perrserker) · Guard Dog + Stakeout (Mabosstiff) ·
Fur Coat (Persian-Alola) · Thermal Exchange (Baxcalibur) · Sniper (Inteleon) · Seed Sower (Arboliva) ·
Emergency Exit (Golisopod — a liability in doubles, it force-switches at 50%).

### Not added (worth noting)
**Weezing was left out**, so **Neutralizing Gas** is still absent — there is no ability-off switch for
Surge/Intimidate/Protosynthesis in this format.
