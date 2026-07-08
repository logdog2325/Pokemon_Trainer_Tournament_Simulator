# Champions Team-Building Reference Pack

A persistent knowledge base + process for building VGC teams in **Pokémon Champions**
(Regulation M-B, 2026). This is the "memory" Claude reads at the start of a build,
since Claude's trained knowledge of Champions specifics is unreliable.

## Files
- **team-building-model.md** — the role-first build process (the loop we run every time).
- **champions-ruleset.md** — the fixed rules every team must satisfy (Item Clause, Megas, stat points, etc.).
- **confirmed-facts.md** — Champions-specific facts we've *verified* (Mega list, movepool/ability changes, corrections to bad web data). THE living memory — append as we learn.
- **items.md** — the limited held-item pool (matters for Item Clause planning).
- **roster.md** — the species list (seed; needs verification against the current 235).

## How to use
At the start of a new build, tell Claude: *"Read the Champions reference pack"* and name a Pokémon.
Claude runs the model in `team-building-model.md`, respecting `champions-ruleset.md`,
checking `confirmed-facts.md` before trusting memory, and verifying anything new via web search.

## Status
Seeded 2026-06 from web research + a long build session (Samurott TR team, Volcarona
Tailwind team). Web sources proved unreliable on Champions specifics — **user corrections
in `confirmed-facts.md` always override** the roster/items/memory.
