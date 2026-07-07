#!/usr/bin/env bash
#
# setup-champions-engine.sh
# ---------------------------------------------------------------------------
# Builds an OFFLINE Pokémon Champions battle engine (Reg M-B VGC doubles + Bo3)
# on top of the pokemon-showdown submodule.
#
# The submodule (cRz-Shadows/pokemon-showdown) is our starting point because the
# parent repo's Data/ harness expects the engine at ./pokemon-showdown. That fork
# is Showdown 0.11.9 and has NO Champions format. The official Smogon Showdown
# (0.11.10) DOES ship a first-class `champions` mod plus the exact formats:
#     [Gen 9 Champions] VGC 2026 Reg M-B          (doubles, Open Team Sheets)
#     [Gen 9 Champions] VGC 2026 Reg M-B (Bo3)    (doubles, Best-of-3)
# ...including the Z-A megas (Emboar-Mega, Sceptile-Mega, ...) and the point-based
# stat system (0-32 points/stat, translated to EVs internally by the mod).
#
# So we overlay the official 0.11.10 engine + data onto the submodule so the
# engine and the Champions data are version-consistent, then build.
#
# Run from the repo root:  bash champions-sim/setup-champions-engine.sh
# Once built, everything runs fully offline. Smoke test:  node champions-sim/battle-test.js
# ---------------------------------------------------------------------------
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FORK="$ROOT/pokemon-showdown"
OFFICIAL="${OFFICIAL_SHOWDOWN_DIR:-/tmp/smogon-official}"

echo "==> 1/6  init the pokemon-showdown submodule"
git -C "$ROOT" submodule update --init --recursive

echo "==> 2/6  fetch official Smogon Showdown 0.11.10 (has the champions mod + formats)"
if [ ! -d "$OFFICIAL/.git" ]; then
  git clone --depth 1 https://github.com/smogon/pokemon-showdown "$OFFICIAL"
fi

echo "==> 3/6  overlay official engine + data onto the submodule (version-consistent)"
cp -r "$OFFICIAL/sim/."               "$FORK/sim/"
cp -r "$OFFICIAL/lib/."               "$FORK/lib/"
cp    "$OFFICIAL/config/formats.ts"   "$FORK/config/formats.ts"   # ships the Champions section
cp -r "$OFFICIAL/data/."              "$FORK/data/"               # includes data/mods/champions + Z-A megas in base pokedex
cp    "$OFFICIAL/package.json"        "$FORK/package.json"

echo "==> 4/6  install deps (0.11.10 adds ts-chacha20 for the PRNG)"
cd "$FORK"
npm install --legacy-peer-deps

echo "==> 5/6  compile the engine"
node build

echo "==> 6/6  smoke test: one offline Champions Reg M-B doubles battle"
cd "$ROOT"
node champions-sim/battle-test.js

echo
echo "Done. The engine is at ./pokemon-showdown (offline-ready)."
echo "Champions format ids:  gen9championsvgc2026regmb   |   gen9championsvgc2026regmbbo3"
