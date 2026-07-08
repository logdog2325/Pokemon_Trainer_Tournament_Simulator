# Champions Arena — now baked into the app (offline, no server)

The graphical Arena now lives **inside the Team Builder PWA** and runs the real
Champions engine **in the browser** (a Web Worker) — no Node server needed. See:

- `champions-team-building/app/arena/` — the Arena page (arena.html / arena.js /
  arena.css) + local Showdown sprites & field art (`sprites/`, `fx/`).
- `champions-team-building/app/sim/` — `engine.web.js` (the bundled engine),
  `worker.js` (runs it off the UI thread), `sim-client.js` (main-thread wrapper).
- `champions-sim/web/` — the reproducible build that produces `engine.web.js`.

## Run

Just open the app (any static host works, including offline once installed):

```
node champions-sim/server.mjs      # optional local static host
# Team Builder:  http://localhost:8790/
# Arena:         http://localhost:8790/arena/arena.html
```

In the Arena you choose **which team you pilot** (a meta archetype or your own
pasted team) and **which archetype you face** (or 🎲 Random); the AI opponent
plays with the calibrated game-plan bot. The Battle Lab's "Play ▶" links here
with your team pre-loaded.

`server.mjs` (this folder) is a thin shim that launches `champions-sim/server.mjs`.
The old server-streamed Arena client was replaced by this in-browser version.
