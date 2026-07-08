# Browser engine build — bake the sim into the app

Compiles the **real Champions Reg M-B engine + GameplanBot + analyzers** to run
entirely **in the browser** (a Web Worker), so the Team Builder's **Battle Lab**
and **Arena** work fully offline — no Node server. This is what makes the hosted
PWA (GitHub Pages / iOS Add-to-Home-Screen) and the Android APK self-contained.

## Build

```
bash champions-sim/web/build-web-engine.sh
```

Outputs `champions-team-building/app/sim/engine.web.js` (~7.5 MB, minified).

## How it works

The official `pokemon-showdown` engine assumes Node: it loads data with dynamic
`require(dataFile)` and `fs.readdirSync(mods)`, and pulls in server/DB/mail code.
The build:

1. **`gen-datamap.mjs`** emits `datamap.gen.js` — a static manifest of the ~28
   data modules the offline sim needs (base + `champions` mod + text +
   `config/formats`, filtered to Champions formats only).
2. **`build.mjs`** (esbuild) bundles `engine-entry.js` for the browser:
   - stubs Node-only modules the offline sim never touches (net, http, fs, repl,
     nodemailer, pg, the whole `server/` dir, …),
   - shims `util` (`util-shim.js`) and `path` (path-browserify), `process`
     (`process-shim.js`), `global` → `globalThis`,
   - rewrites the engine's dynamic data `require`/`readdirSync` to the manifest.
3. `engine-entry.js` exposes `globalThis.ChampSim`: `matrix()`, `optimize()`,
   `startBattle()/choose()`, plus `opponents`, `sprites`, `defaultTeam`.

`engine.web.js` is a generated artifact committed so GitHub Pages can serve it
without a build step; regenerate it with the script above whenever the engine,
`gameplan-bot.js`, or `teams.mjs` change.
