#!/usr/bin/env bash
# Builds the browser engine bundle (champions-team-building/app/sim/engine.web.js)
# so the Team Builder's Battle Lab + Arena run the real Champions sim fully offline,
# with no server. Reproducible: installs its own build deps, regenerates the data
# manifest, then bundles with esbuild.
set -euo pipefail
cd "$(dirname "$0")"
echo "[1/3] installing build deps (esbuild, path-browserify)…"
npm install --no-save --no-audit --no-fund esbuild path-browserify >/dev/null 2>&1
echo "[2/3] generating static data manifest…"
node gen-datamap.mjs
echo "[3/3] bundling engine for the browser…"
node build.mjs
echo "done."
