# The Build Model

Start from the Pokémon's *job*, not from "six good Pokémon." Run these phases in order.

Revised 2026-09 against two full Worlds 2026 team reports (Wolfe Glick; Hamann/Farzan/Koch —
three players, three Day 2s). The reasoning behind the rules below lives in
**`top-player-methodology.md`** — read it when a rule seems arbitrary.

## Phase 0 — Verify (always on)
Claude's training is unreliable on Champions specifics. Before relying on any of:
*does a Mega exist · a Pokémon's Champions movepool · new/changed abilities · item availability* —
check `confirmed-facts.md` first, then the live dex in `app/dex-data.js`, then web-search, then
flag for the user to confirm. **Never design around an unverified Champions fact.**

## Phase 1 — Role ID  (Claude)
From **base stats + movepool + ability**, tag the Pokémon with its viable role(s):

> setup sweeper · immediate attacker / wallbreaker · speed control (Tailwind / Trick Room /
> paralysis / Sand Rush) · disruption (Fake Out / Taunt / Encore / Will-O-Wisp) ·
> redirection (Follow Me / Rage Powder) · weather / terrain setter ·
> support glue (screens / Helping Hand / Intimidate / pivot) · defensive pivot / wall · chip

Most Pokémon have 1–3 plausible roles. Present each with a sample moveset + the spread it implies.

## Phase 2 — Pick the route  (User)
User chooses which identity to commit to. This sets the team archetype.

## Phase 3 — Speed control, decided now  (Claude + User)
**Not a later checklist item.** Top teams commit early and stack **2+ independent layers**, because
the point is variance reduction, not tempo — Wolfe prioritised it "due to the volatile nature of
[the format], especially having lost NAIC to Rock Slide flinches."

Layers are independent if losing one doesn't disable the others:
Tailwind · Prankster Tailwind · Trick Room · guaranteed paralysis (No Guard Zap Cannon) ·
Sand Rush / Swift Swim / Unburden · a priority package · Fake Out

Prefer at least one layer that **survives its setter fainting** — paralysis and Sand persist;
Tailwind does not.

## Phase 4 — Needs list  (Claude)
What the chosen role requires:
- **Setup sweeper** → a free turn (redirection / screens / Fake Out / Intimidate), speed control,
  a secondary breaker for what walls it, an answer to its revenge-killers.
- **Trick Room attacker** → setter(s), a way to survive the setup turn, fast-mode insurance.
- **Weather / terrain setter** → abusers that *share* it + an answer to opposing setters
  (terrain and weather are overwritten by whoever arrives last).
- **Disruption / support** → win conditions to enable; bulk to stay alive.

## Phase 5 — Source teammates  (Claude proposes, User steers)
Fill each need from the **whole roster**. Usage data is a hint, not a pool.

Apply on every candidate:
- **Multi-role test.** Can this slot do a second job, or win a game by itself? Wolfe rejected a
  purely defensive Farigiraf for a Nasty Plot one because the team "wouldn't be able to dedicate
  too many resources to a Trick Room mode." A slot that only works in one mode is too narrow.
- **Re-test your dismissals.** Both reports reversed an early "no" that became a core piece —
  Wolfe's Whimsicott became his default fourth pick. A bad first impression is often one moveslot
  away from being wrong.

## Phase 6 — Redundancy pass  (Claude) — *the phase most often skipped*
You bring **4 of 6**, so a second answer to the same threat is not waste; it's what makes the
answer *available*. Target: **two members beat each of the top ~10 threats.**

Build the table. A threat with one answer is a threat you lose to whenever that answer is
matched up badly or already fainted.

## Phase 7 — Stress-test and counter-counterplay  (Claude)
Walk the draft through the dominant archetypes and patch holes:
> rain · sun · sand · snow · Trick Room · Tailwind HO · terrain / psyspam · Fairy spam ·
> priority spam · opposing Mega threats

Then ask **how a good opponent beats this plan, and answer that too.** Wolfe saw that teams beat
Tailwind with "priority and bulk" and added Armor Tail; Markus added +2 Extreme Speed to stop a
second Prankster Tailwind. Build the answer to the answer.

## Phase 8 — Spreads  (Claude)
66 points, max 32 per stat. Derive, never default to max/max.

1. **Speed first**, to a named benchmark at the *correct nature* (a positive nature changes the
   number — this has been a repeated error). Speed is the least compressible stat.
2. **Offense to the benchmark and no further.** Compute what the KO actually needs; it is routinely
   far less than 32. Across the twelve Worlds Pokémon only one had maxed offense *and* maxed Speed.
   Two ran 0–1 points in their attacking stat and said the moves hit hard anyway.
3. **Everything left into bulk**, justified against **named opposing spreads** — "survives +1
   Adamant Life Orb max-Attack Kingambit Sucker Punch," not "survives Kingambit."
4. **Optimize the residual to the single point.** Sandstorm is 1/16 max HP, Life Orb recoil 1/10,
   burn/poison 1/16, Grassy Terrain heal 1/16. Wolfe's Staraptor sits at 191 HP because 192 takes
   one more sand damage; his Gholdengo at 169 because 170 takes one more Life Orb point.
5. **Quantify to the roll.** "15/16," "85% to 2HKO" are acceptable answers. Vague ones aren't.
6. Remember spread moves take ×0.75 in doubles, and screens are ×2732/4096 (~0.667), not 0.5.

## Phase 9 — Items  (Claude)
Item Clause: all six distinct. Choose against **team-internal constraints**, not convention:
- A Mega Stone is an **option, not an obligation** — Wolfe dropped Tyranitarite for a Chople Berry.
  Two stones also buy *hidden information*; delaying a Mega keeps the opponent guessing, and can
  preserve the base ability (Markus kept Lightning Rod by holding Raichu's Mega back).
- Chople Berry on a 4x-Fighting-weak slot (Dark/Steel, Rock/Dark) to win the Kingambit trade —
  both teams did this independently.
- If a conventional item is taken by another slot, the replacement is an opportunity:
  Expert Belt Excadrill exists because Whimsicott had the Sash, and it **beats the metagame's
  shared EV benchmark** (opponents train to survive *Kingambit's* Iron Head, not Excadrill's).
- Decide accuracy explicitly. Prefer the 100%-accurate move (Power Gem over stronger options), or
  accept the inaccuracy on purpose and say so.

## Phase 10 — Finish the team  (Claude + User)
The six are not the deliverable. Also produce:
- The **default four** and the bring-4 decision tree per archetype.
- A per-matchup game plan. Both reports ship a matchup spreadsheet.

A slot that comes to few games but wins specific matchups is fine and intended (Wolfe's Excadrill).
Expect the opposite too: one slot will come to nearly every game.

---

## Standing corrections to earlier assumptions in this pack
- **"Fake Out is on ~90% of top teams" is too strong.** Wolfe's Worlds team has *no* Fake Out and
  *no* redirection; Markus's has one Fake Out and no redirection. Both substitute redundant
  turn-order and stat manipulation. Redundant speed control is the hard rule; Fake Out is soft.
- **Healing is optional.** Neither Worlds team runs recovery beyond one Sitrus Berry. Bulk plus
  speed control substitutes for sustain.
- **Clean max/max spreads are the exception, not the default.** Wolfe's Excadrill invests in five
  of six stats and maxes none.
