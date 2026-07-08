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

## Step 3 — Simulation-based analyzer + smart bot

### ✅ Monte Carlo harness (foundation DONE)
`champions-sim/simulate-matchup.mjs` runs N real offline Reg M-B **doubles** battles between two teams
and reports the win rate. Verified: **100 games in ~4 seconds.** That speed means we can brute-force
every bring/lead/mega combo cheaply.

    node champions-sim/simulate-matchup.mjs 100

Currently uses the built-in RandomPlayerAI for both sides, so the win% reflects **raw team power, not
skilled play** — the game-plan bot below is what makes it a trustworthy matchup read.

### ✅ Game-plan doubles bot — BUILT + CALIBRATED
`champions-sim/gameplan-bot.js` — a hand-crafted heuristic doubles player (extends the sim's
RandomPlayerAI, peeks the live Battle for foe info). Implements: damage-based targeting + KO-seeking,
**focus-fire** (both attackers combine onto one foe to secure KOs), spread moves, sleep as premium
disruption, and game-plan rules for **Trick Room / Tailwind** (set TR when slower & not up, prioritized
early; Tailwind when fast-ish & no TR), **Fake Out** (turn 1), situational Protect, redirection, setup,
and **weather-war mega timing** (holds Char-Y / Froslass to set weather LAST and override the opponent).

Full move-category logic: damage/KO + **focus-fire**, spread moves, **priority revenge-KO** (+ Sucker
Punch conditionality), **Wide Guard / Quick Guard** (react to foe spread/priority kits), differentiated
status (Will-O-Wisp reads physical threats, Taunt vs setup/TR, Thunder Wave, Encore, Parting Shot),
screens, setup (only when safe), redirection (Rage Powder/Follow Me), Protect (situational), sleep
(premium), Trick Room / Tailwind timing, Fake Out (T1), and weather-war mega timing.

Strength (`champions-sim/calibrate.mjs`, vs RandomPlayerAI, sides alternated):
**Offense ~93%, Trick Room ~88%, avg ~91%** — clears the bar and executes game plans. Trustworthy
for the beginner-to-intermediate target, so matchup win-rates are believable.

**Anti-Trick-Room play (added):** the bot now (a) does NOT stall its *own* favorable TR (`myHasTR`
gate), and (b) actively fights *enemy* TR before it goes up — a live foe TR setter is the #1 **Taunt**
target (score 60) / **Encore** target (40), and both attackers get a focus-fire bonus to **KO the setter
before Trick Room lands**. Under enemy TR it stalls with Protect.

**Team-Preview intelligence (rewritten):** `chooseTeamPreview` now brings a *coherent four*, not four
attackers — it weights speed control (TR/Tailwind), **redirection** (Rage Powder/Follow Me, protects the
setter), disruption (sleep/Fake Out), weather & Intimidate abilities, and the Mega, above raw offense.
Leads are chosen as **setter + a partner that shields it** (redirect / Fake Out / a priority-blocking
ability like Farigiraf's **Armor Tail**), so Trick Room reliably goes up instead of the setter being
Fake-Out'd or revenge-KO'd. (For the Quivern team it now correctly leads **Gardevoir + Vivillon** and
brings Torkoal + Farigiraf back.)

### ✅ Bring-4 / mega optimizer — BUILT
`champions-sim/optimizer.mjs` (+ shared `teams.mjs`). The bot's Team-Preview choices are now injectable
(`config: { order, megaSpecies }`), so the optimizer enumerates every bring-4 × mega choice, runs N
games of each with the calibrated bot (opponent plays its own best), and reports the **best bring +
leads + Mega by measured win rate** with runners-up. Verified: for the Quivern TR team it correctly
recommends *lead Gardevoir + Farigiraf (the setters), back Mudsdale + Torkoal, Mega Gardevoir*.

    node champions-sim/optimizer.mjs 30      # games per config

    node champions-sim/optimizer.mjs 30      # games per config

The optimizer is now **truly exhaustive**: it brute-forces *every* bring-4 × *every* lead pairing ×
*every* Mega choice (incl. "none") — ~210 configs for a 6-mon team — and ranks by measured win rate.
This finds brings the general heuristic misses (e.g. for the bad Delphox matchup it surfaces
*lead Mudsdale + Vivillon, Mega Gardevoir ≈ 50%* vs the ~3% you'd get bringing your default four).

### ✅ Step 4 — Human-vs-bot sparring — SHIPPED
`champions-sim/spar.mjs` — play a real offline Reg M-B doubles battle from the terminal against the
calibrated bot. You pick your bring-4 + leads and each move **by number** (foes and HP% shown; `m` to
Mega, `s` to switch); the bot pilots a chosen meta team with its **smart** auto-selection. Renders
moves/damage/faints/Trick Room/weather and forced switches, plays to a winner.

    node champions-sim/spar.mjs list     # show opponent archetypes
    node champions-sim/spar.mjs 3        # spar vs archetype #3

### ✅ Real archetype teams — SOURCED
`champions-sim/teams.mjs` now holds **real current-meta tournament pastes** from The Champions Arena II
(Jul 2026): Char-Y/Aerodactyl offense (Marco #1), Big 6 (Toler #2), Blastoise/Floette control (Jorge #3),
Delphox/Blastoise (Juan #7), and a Rain (Pelipper/Archaludon) core. Pastes are spread-less; `autospread.mjs`
fills role-based Champions point spreads (TR/fast/bulky detection) so consumers get complete, legal teams.

### ✅ Step 3 — Matchup matrix — SHIPPED
`champions-sim/matrix.mjs` plays your team vs one real team per archetype (both sides the calibrated bot,
sides alternated) and prints a win-rate table, **worst matchup first**.

    node champions-sim/matrix.mjs 60

Current read for the Quivern TR team (honest self-play, both bots smart):

    Delphox / Blastoise (Juan #7)             3% ⚠️   (double Fire — Delphox + Incineroar — is the wall)
    Big 6 (Toler #2)                         27% ⚠️
    Blastoise / Floette control (Jorge #3)   63% ✓
    Char-Y / Aerodactyl offense (Marco #1)   83% ✓
    Rain (Pelipper / Archaludon)             83% ✓
    overall ~52%

The two ⚠️ matchups are real, actionable weaknesses (Fire spam vs a Grass/Fairy/Psychic TR core). Use
`optimizer.mjs` to search the best bring/lead/Mega for a specific bad matchup.

### ⏳ Remaining
- **Human-vs-bot** local server for sparring (Step 4).
- **App integration**: drop a pokepaste into the `champions-team-building` app → see the matrix.
