# Champions Offline Battle Sim — Status

Goal: an **offline** Pokémon Champions (Reg M-B VGC doubles) sandbox to
1. **spar vs AI bots** running the most-used meta teams,
2. **find which teams my team performs poorly against** (AI-vs-AI matchup matrix),
3. **test whether minor tweaks make a meaningful difference**,
4. and support the **bring-6 / pick-4** Team Preview decision.

Eventual home: ideally wired into the `champions-team-building` app; a standalone tool is fine too.

## AI bar (agreed)
The bot does **not** need to be Wolfe-level. It needs to be smart enough to **follow a game plan**
(e.g. set Tailwind or Trick Room, then leverage it) and hold its own against **beginner-to-intermediate**
VGC players. Correct doubles fundamentals (targeting, Protect, Fake Out, spread moves, redirection,
sensible bring-4) matter more than deep prediction.

## ✅ Step 1 — Offline engine (DONE, verified)
Real Champions **Reg M-B doubles** battles run fully offline.
- Engine rebased to Smogon Showdown **0.11.10** so the engine and the official `champions` mod are
  version-consistent (fixed the 0.11.9-vs-0.11.10 skew: missing `checkMoveBypassesProtect`, valued
  `Item Clause = 1`, new `ts-chacha20` PRNG dep).
- Formats registered: `gen9championsvgc2026regmb` and `gen9championsvgc2026regmbbo3` (Best-of-3).
- Z-A megas load (Emboar-Mega, Sceptile-Mega/Lightning Rod, Metagross-Mega/Tough Claws, Gardevoir-Mega/
  Pixilate, Feraligatr-Mega/Dragonize, ...) and the **point-stat system** works.
- Team **validation enforces real Champions legality** (Item Clause, ability legality, etc.).
- Verified: a 6-mon team validates LEGAL and a doubles AI-vs-AI battle runs to a winner.

Reproduce: `bash champions-sim/setup-champions-engine.sh`  →  `node champions-sim/battle-test.js`

Note on architecture: the engine lives in the `pokemon-showdown` **submodule** (a fork we can't push to),
so the Champions integration is captured here as a **reproducible setup script** rather than committed
inside the submodule. `.gitmodules` marks the submodule `ignore = dirty` so local engine edits don't
show as repo changes.

## ✅ Step 2 — Fast statistical matchup / best-4 analyzer (SHIPPED v1)
`champions-sim/analyze.mjs` — offline, built on the in-repo Champions calc engine. For your team vs a
library of meta teams it prints, per matchup: a favorability verdict + rough win%, the **best 4 to bring**,
the **mode** to play (natural / Trick Room / Tailwind — it picks your best mode per matchup), coverage of
their team, and the **key threats to watch**. Worst matchups are listed first.

    node champions-sim/analyze.mjs        # edit MY_TEAM / META inside to your teams

Mode-aware (a Trick Room team is evaluated moving first under TR, not on natural speed), and it discounts
opposing mons you reliably KO before they act. Current sample output for the Quivern TR team: Delphox/
Blastoise control ~Favorable, Big 6 ~Even, Char-Y/Aerodactyl offense ~Hard (Garchomp flagged as #1 threat).

CAVEATS (why Step 3 exists): this is a static damage+speed HEURISTIC. It does not model turn-by-turn play
(protects, switches, redirection, double-targets, item/ability procs), and the bring-4 metric favors
attackers over enablers (e.g. it may skip Vivillon). Treat the win% as directional and the best-4/threats
as a strong starting read — the Step-3 engine sim plays games out for real win-rates.

## ⏳ Step 3 — Smart doubles bot + harness (AFTER)
- Extend the sim's AI from singles-only to **doubles**: targeting, spread moves, Protect/Fake Out,
  redirection, and **game-plan awareness** (recognize + set up Tailwind/Trick Room and play to it).
- **Bring-6-pick-4** selection at Team Preview (evaluate lead/bring combinations).
- Adapt the Python mass-sim harness (`Data/`) for VGC to output a **matchup win-rate matrix** vs the
  meta teams and the best bring per matchup.
- Local server for **human-vs-bot** sparring.

## Meta opponent teams
Source the top teams from recent results (e.g. The Champions Arena II top 8: Char-Y/Aerodactyl offense,
Big 6, Delphox/Blastoise control) plus Pikalytics usage for `gen9championsvgc2026regmb`.
