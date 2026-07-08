# Champions Arena — offline graphical battle vs the AI

A local, **offline** Pokémon-Showdown-style battle client where you pilot your team
against the calibrated `GameplanBot` running real current-meta teams. Real animated
Showdown sprites, the classic grassy battle background, move/HP/faint animations,
weather + Trick Room overlays, and click-to-choose controls — no internet needed.

## Run

```
node champions-sim/server.mjs      # the unified Champions Lab server
# Team Builder:  http://localhost:8790/
# Arena:         http://localhost:8790/arena/
```

(`node champions-sim/arena/server.mjs` still works — it just launches the same
unified server.) The Arena is reachable on its own, and the Team Builder's
**Battle Lab** links straight into it ("Play ▶") with your current team.

## What you get

- **Pick your opponent** — any archetype/mega core (Char-Y, Big 6, Blastoise/Floette,
  Delphox/Blastoise, Rain), or hit **🎲 Random** to face a surprise team.
- **Team Preview with Open Team Sheets** — you see the opponent's **full six** before
  you pick, then tap your **4 to bring** in order (first two are your leads).
- **Real doubles battle** — the AI brings & plays its team with the game-plan bot
  (Trick Room / Tailwind / Fake Out / redirection / focus-fire / anti-TR). You choose
  each move by clicking (tap a target for single-target moves, or Mega / Switch).
- Renders with real `play.pokemonshowdown.com` animated sprites (bundled locally in
  `sprites/`) and Showdown field/weather art (`fx/`), so it works with **zero network**.

## How it fits together

- `server.mjs` — dependency-free Node HTTP server. Runs the real Champions sim
  (`pokemon-showdown` engine) with `GameplanBot` on p2, streams p1's battle protocol
  to the browser over Server-Sent Events, and takes your choices over POST. Also serves
  the local sprite/fx assets and a species→sprite map from the champions dex.
- `app.js` — the browser client: parses the Showdown protocol, animates the scene, and
  builds the move/target/switch/team-preview controls.
- `style.css`, `arena.html` — the battle UI.
- `sprites/` (ani + ani-back), `fx/` (backgrounds + weather) — bundled Showdown art.

Assets are the property of Pokémon Showdown / their respective owners and are cached
here only to make the sandbox work offline.
