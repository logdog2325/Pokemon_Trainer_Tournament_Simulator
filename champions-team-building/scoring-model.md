# Synergy Scoring Model — research synthesis (Champions Reg M-B)

Calibrated from competitive top-cut data:
- **Structure** (transfers across formats/eras): Champions Reg M-A NAIC + Indianapolis top-16, the
  6,109-player **Skraw VGC Grand Champions Festival** top cut (≈16 Swiss rounds), the official
  closed-sheet **Global Challenge I**, and ~10 years of Worlds/EUIC/NAIC archetype samples.
- **Meta / threat list** (M-B specific): Pikalytics `battledataregmbs3` + the Limitless M-B online
  tournaments (Smogon VGC Major Live, 898 players; INGAGE Frontier #2, 199 players).

## Quantified structural facts the score encodes
- **One committed speed mode.** 9/9 Grand-Champions-Festival top-cut teams ran exactly one
  (Tailwind : Trick Room ≈ 7:1); ~25% of teams instead run **priority hyper-offense** with NO
  Tailwind/TR. → detect mode; reward fit; never require Tailwind on a priority team; penalize hedging
  both modes.
- **Fake Out ≈ 90%** of top teams. → mild penalty if absent.
- **Intimidate is optional and never doubled** (0% of top cut ran two; ~56% ran zero). → reward the
  first, penalize the second; do NOT penalize zero.
- **~2 win-cons + a support/glue backbone** (~2 win-con : ~4 support slots).
- **Protect ≈ 90% of slots** — baseline, NOT a synergy bonus.
- **Megas are the win-cons:** carry 1 (standard) or 2 (matchup flex); the team is built around the
  Mega's speed/weather mode.

## M-B threat list (drives threat-answer + weakness weighting)
Garchomp, Basculegion, Sinistcha, Kingambit, Incineroar, Whimsicott, Charizard-Y, Floette-Eternal,
Sneasler, Pelipper, Archaludon, Swampert-Mega, Metagross-Mega, Gholdengo, Aerodactyl, Sylveon,
Farigiraf, Grimmsnarl, Mawile-Mega, Froslass.

**Dominant spread/offensive types (weight shared weaknesses by these):**
Ground > Rock > Fire > Fairy > Water (then priority layer: Sucker Punch / Aqua Jet / Bullet Punch).

## Per-archetype 6-slot skeletons (for archetype-aware scoring)
- **Tailwind balance (#1):** Tailwind setter + 2 win-cons (≥1 Mega) + Fake Out/priority + glue. Fast attackers.
- **Trick Room:** 1–2 TR setters + 2–3 slow (Spe ≤55) heavy hitters + Fake Out/redirection + a non-TR priority fallback.
- **Rain:** Drizzle setter (Pelipper) + Swift Swim Mega sweeper + rain breaker + glue. Rain = speed control.
- **Sun:** Drought (Charizard-Y) + Fire/Chlorophyll abuser, usually folded into Tailwind.
- **Sand/Snow:** weather setter + Sand/Slush Rush abuser (snow += Aurora Veil) + glue.
- **Redirection-setup:** setup sweeper + 1–2 redirectors + speed control + Fake Out/Intimidate glue + Plan-B attacker (~4 support : 2 attackers).
- **Priority HO:** fast attackers + ≥2 priority users + Fake Out + Intimidate glue, NO Tailwind/TR.

## Implemented in `app.js`
`scoreForSlot` adds a synergy layer: `speedFit` (mode coherence), `enablerBonus` (enabler→payoff
cores), `threatAnswerBonus` (M-B spread-type answers), `intimidateDiscipline`. `teamHealth` is
archetype-aware (`teamSpeedMode`) and weights shared-weakness penalties by `SPREAD_THREAT`.

## Backlog (not yet built)
1. Damage-aware threat answers / win-con realism (use the calc to verify real switch-ins + KOs in the team's enabled state).
2. Archetype skeleton checklist while building (✓/✗ per canonical slot).
3. Start-from-skeleton / sample M-B teams.
4. Threat lookup ("does my team answer Garchomp?").
5. EV/point optimizer (survive X / outspeed Y) and team-image export.
6. Periodic refresh of the M-B threat list from usage data.

Sources: VGC Guide, MetaVGC, StrataDex, Pokeventurer, Smogon VGC, Victory Road, Trainer Tower,
Nimbasa City Post, Pikalytics, Limitless VGC, RK9.
