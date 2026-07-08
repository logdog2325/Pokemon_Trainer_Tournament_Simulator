# The Role-First Build Model

Wolfe-style team building: start from the Pokémon's *job*, not from "six good Pokémon."
Run these phases in order.

## Phase 1 — Role ID  (Claude)
From **base stats + movepool + ability**, tag the Pokémon with its viable role(s) from this vocabulary:

> setup sweeper · immediate attacker / wallbreaker · speed control (Tailwind / Trick Room) ·
> disruption (Fake Out / Taunt / Encore / Will-O-Wisp) · redirection (Follow Me / Rage Powder) ·
> weather / terrain setter · support glue (screens / Helping Hand / Intimidate / pivot) ·
> defensive pivot / wall · hazards / chip

Most Pokémon have 1–3 plausible roles. Present each with a sample moveset + the stat spread it implies.
Verify any Champions-specific movepool/ability detail (see Phase 0 below).

## Phase 2 — Pick the route  (User)
User chooses which role/identity to commit to. This single decision sets the team archetype
(e.g. sweeper Volcarona → Tailwind HO; bulky-support Volcarona → a different team entirely).

## Phase 3 — Needs list  (Claude)
Write the requirements the chosen role implies. Standard checklists:
- **Setup sweeper** → a free turn (redirection / screens / Fake Out), speed control,
  a secondary breaker for what walls it, an answer to its revenge-killers.
- **Trick Room attacker** → setter(s), redirection / heal to survive setup, fast-mode insurance.
- **Weather setter** → abusers that share the weather + an answer to opposing weather.
- **Disruption / support** → win conditions to enable; bulk to keep it alive.

## Phase 4 — Threat map  (Claude)
Its type weaknesses, speed tier, what revenge-kills it, and which meta archetypes it
structurally loses to.

## Phase 5 — Source teammates  (Claude proposes, User steers)
Fill each need from the **whole Champions roster** (`roster.md`). Use usage-data top-10
teammates only as *hints* about what the meta already likes — not a hard pool.
For each need give 1–3 candidates + a pick + reasoning.

## Phase 6 — Stress-test  (Claude)
Walk the draft through the dominant archetypes and patch holes:
> rain · sun · sand · snow · Trick Room · Tailwind HO · Fairy spam · opposing Mega threats

## Phase 7 — Finalize  (Claude)
Spreads (66-point system), items, legality. Run the `champions-ruleset.md` checklist.

---

## Phase 0 — Verify (always on)
Claude's training is unreliable on Champions specifics. Before relying on any of:
*does a Mega exist · a Pokémon's Champions movepool · new/changed abilities · item availability* —
check `confirmed-facts.md` first, then web-search, then flag for the user to confirm.
**Never design around an unverified Champions fact.**
