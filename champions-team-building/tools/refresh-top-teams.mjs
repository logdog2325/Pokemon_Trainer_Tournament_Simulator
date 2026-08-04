#!/usr/bin/env node
/* Rebuild the deduped tournament team library (top-teams-deduped.md) from Limitless standings.
 *
 * This file is the SOURCE the Battle Lab / Arena opponent gauntlet is built from:
 *   top-teams-deduped.md  ->  champions-sim/gen-meta.mjs  ->  champions-sim/meta-teams.mjs
 *                         ->  champions-sim/web/build-web-engine.sh -> app/sim/engine.web.js
 * It had no generator committed, so the archetypes the Battle Lab simulated against were frozen at
 * whatever sample the file was last written from (91 events / 6830 teams, 2026-06-30) — i.e. the lab
 * was testing you against a pre-GCF-Encore metagame.
 *
 * Selection: for every Mega, and every Mega pairing, pick the real tournament team with the best
 * Wilson lower bound on its win/loss record (so a strong record over many games beats a tiny
 * undefeated run). Identical teams are deduped first and their records pooled.
 *
 * Standings are cached to --cache-dir so re-runs are cheap; delete the dir to force a refetch.
 *
 * Usage: node refresh-top-teams.mjs <out-top-teams-deduped.md> [--debug] [--cache-dir <dir>]
 */
import fs from "node:fs";
import path from "node:path";

const OUT = process.argv[2];
const DEBUG = process.argv.includes("--debug");
const CACHE_DIR = (() => { const i = process.argv.indexOf("--cache-dir"); return i > 0 ? process.argv[i + 1] : ".standings-cache"; })();
const BASE = "https://play.limitlesstcg.com";
const MB_START = "2026-06-17";
const MIN_EVENTS = 10, MIN_TEAMS = 500;
const REQ_DELAY = 350, RETRY_BASE = 1000, MAX_RETRY = 5;
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
const HEADERS = { "User-Agent": UA, "Accept": "application/json, text/html, */*" };

if (!OUT) { console.error("usage: node refresh-top-teams.mjs <out.md> [--debug] [--cache-dir <dir>]"); process.exit(2); }

const sleep = ms => new Promise(r => setTimeout(r, ms));
const norm = s => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

async function getText(url) {
  let wait = RETRY_BASE;
  for (let attempt = 0; ; attempt++) {
    const r = await fetch(url, { headers: HEADERS });
    if (r.ok) return r.text();
    if ((r.status === 429 || r.status >= 500) && attempt < MAX_RETRY) {
      wait *= 2; if (DEBUG) console.error(`  ${r.status} — backoff ${wait}ms`); await sleep(wait); continue;
    }
    throw new Error(`${r.status} ${url}`);
  }
}
const getJSON = async u => { try { return JSON.parse(await getText(u)); } catch { return null; } };

// ---- dex names / mega detection (mirrors refresh-limitless.mjs) -----------------------------------
const APP = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "app");
function loadDex() {
  const w = {}; new Function("window", fs.readFileSync(path.join(APP, "dex-data.js"), "utf8"))(w);
  return w.DEX || [];
}
const DEX = loadDex();
const BY_NORM = {}; for (const d of DEX) BY_NORM[norm(d.name)] = d.name;
const ALIAS = { basculegion: "Basculegion-Male", basculegionf: "Basculegion-Female",
  meowstic: "Meowstic-Male", meowsticf: "Meowstic-Female", floetteeternal: "Floette" };
const MEGA_SPECIES = new Set(DEX.filter(d => d.megaStones && d.megaStones.length).map(d => norm(d.name)));
const toDexName = (id, name) => BY_NORM[ALIAS[norm(id)] ? norm(ALIAS[norm(id)]) : norm(id)]
  || BY_NORM[norm(ALIAS[norm(id)] || "")] || ALIAS[norm(id)] || BY_NORM[norm(name)] || BY_NORM[norm(id)] || null;
const isStone = it => { if (!it) return false; it = it.trim(); if (it.toLowerCase() === "eviolite") return false; return /ite( [XY])?$/.test(it); };

// Wilson lower bound on a win rate — rewards a good record over many games.
function wilson(w, l) {
  const n = w + l; if (!n) return 0;
  const z = 1.96, p = w / n;
  return (p + z * z / (2 * n) - z * Math.sqrt((p * (1 - p) + z * z / (4 * n)) / n)) / (1 + z * z / n);
}

async function discover() {
  const byId = {};
  const rows = await getJSON(`${BASE}/api/tournaments?game=VGC&limit=1000`);
  for (const t of (Array.isArray(rows) ? rows : [])) {
    const date = String(t.date || "").slice(0, 10);
    if (!t.id || date < MB_START) continue;
    byId[t.id] = { id: t.id, date, players: +t.players || 0, name: t.name || "" };
  }
  return Object.values(byId);
}

function pasteOf(dl) {
  return dl.map(m => {
    const sp = toDexName(m.id, m.name) || m.name || m.id;
    const lines = [`${sp}${m.item ? " @ " + m.item : ""}`];
    if (m.ability) lines.push(`Ability: ${m.ability}`);
    if (m.nature) lines.push(`${m.nature} Nature`);
    for (const a of (m.attacks || [])) lines.push(`- ${a}`);
    return lines.join("\n");
  }).join("\n\n");
}
const sigOf = dl => dl.map(m => `${norm(toDexName(m.id, m.name) || m.id)}@${norm(m.item)}`).sort().join("|");

async function main() {
  const events = await discover();
  if (!events.length) { console.error("no M-B tournaments discovered"); process.exit(1); }
  console.log(`discovered ${events.length} M-B-dated tournaments`);
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  const teams = new Map();        // signature -> aggregated team record
  let usedEvents = 0, totalTeams = 0;
  for (const ev of events) {
    const cacheFile = path.join(CACHE_DIR, `${ev.id}.json`);
    let s = null;
    if (fs.existsSync(cacheFile)) { try { s = JSON.parse(fs.readFileSync(cacheFile, "utf8")); } catch {} }
    if (!s) {
      try { s = await getJSON(`${BASE}/api/tournaments/${ev.id}/standings`); }
      catch (e) { if (DEBUG) console.error("  skip", ev.id, e.message); continue; }
      if (s) fs.writeFileSync(cacheFile, JSON.stringify(s));
      await sleep(REQ_DELAY);
    }
    if (!Array.isArray(s) || !s.length) continue;
    // Champions guard: a Reg M-B event carries Mega stones; a same-dated Reg H/I event does not.
    let st = 0, tot = 0;
    for (const p of s) for (const m of (p.decklist || [])) { tot++; if (isStone(m.item)) st++; }
    if (!tot || st / tot < 0.05) { if (DEBUG) console.error("  non-Champions", ev.name); continue; }
    usedEvents++;
    const fieldSize = s.filter(p => (p.decklist || []).length).length;

    for (const p of s) {
      const dl = p.decklist || []; if (dl.length < 4) continue;
      totalTeams++;
      const sig = sigOf(dl);
      const wins = (p.record && p.record.wins) || 0, losses = (p.record && p.record.losses) || 0;
      let t = teams.get(sig);
      if (!t) {
        const megas = [];
        for (const m of dl) {
          const dn = toDexName(m.id, m.name);
          if (dn && MEGA_SPECIES.has(norm(dn)) && isStone(m.item)) {
            const x = String(m.item).match(/ ([XY])$/);
            megas.push(dn + (x ? "-" + x[1] : ""));
          }
        }
        t = { sig, paste: pasteOf(dl), megas: [...new Set(megas)], w: 0, l: 0, n: 0,
              best: { placing: 9999, event: ev.name, player: p.player || p.name || "?", field: fieldSize, w: 0, l: 0 } };
        teams.set(sig, t);
      }
      t.w += wins; t.l += losses; t.n++;
      const placing = p.placing == null ? 9999 : p.placing;
      // prefer the most impressive single appearance for the label
      if (placing < t.best.placing || (placing === t.best.placing && fieldSize > t.best.field))
        t.best = { placing, event: ev.name, player: p.player || p.name || "?", field: fieldSize, w: wins, l: losses };
    }
  }
  console.log(`aggregated ${usedEvents} events, ${totalTeams} teams (need >= ${MIN_EVENTS} events, >= ${MIN_TEAMS} teams)`);
  if (usedEvents < MIN_EVENTS || totalTeams < MIN_TEAMS) { console.error("ABORT: thin scrape — refusing to overwrite"); process.exit(1); }

  // ---- pick the best team per Mega and per pairing ------------------------------------------------
  // Only pairings with real adoption earn a gauntlet slot. Every unordered stone combination that ever
  // appeared would be ~1270 "pairings", but most are one-offs (a lone player flexing two odd stones),
  // not archetypes — so gate on the pairings results-data actually tracks.
  const TRACKED = (() => {
    try {
      const w = {}; new Function("window", fs.readFileSync(path.join(APP, "results-data.js"), "utf8"))(w);
      return new Set(Object.keys((w.RESULTS || {}).pairs || {}));
    } catch { return null; }
  })();
  if (TRACKED) console.log(`gating pairings on ${TRACKED.size} tracked in results-data`);

  const all = [...teams.values()].filter(t => t.megas.length);
  for (const t of all) t.score = wilson(t.w, t.l);
  const bestFor = {}, pairFor = {};
  const megaSet = new Set(), pairSet = new Set();
  for (const t of all) {
    for (const m of t.megas) {
      megaSet.add(m);
      if (!bestFor[m] || t.score > bestFor[m].score) bestFor[m] = t;
    }
    for (let i = 0; i < t.megas.length; i++) for (let j = i + 1; j < t.megas.length; j++) {
      const k = [t.megas[i], t.megas[j]].sort().join(" + ");
      if (TRACKED && !TRACKED.has(k)) continue;
      pairSet.add(k);
      if (!pairFor[k] || t.score > pairFor[k].score) pairFor[k] = t;
    }
  }
  // one entry per unique team, tagged with every Mega/pairing it tops
  const chosen = new Map();
  const tag = (t, key, bucket) => {
    let e = chosen.get(t.sig);
    if (!e) { e = { t, megas: [], pairs: [] }; chosen.set(t.sig, e); }
    e[bucket].push(key);
  };
  for (const [m, t] of Object.entries(bestFor)) tag(t, m, "megas");
  for (const [k, t] of Object.entries(pairFor)) tag(t, k, "pairs");

  const list = [...chosen.values()].sort((a, b) =>
    (b.megas.length + b.pairs.length) - (a.megas.length + a.pairs.length) || b.t.score - a.t.score);

  const stamp = new Date().toISOString().slice(0, 10);
  let md = "CHAMPIONS REG M-B — TOP TOURNAMENT TEAMS (deduplicated)\n";
  md += "======================================================================\n\n";
  md += `Built from ${usedEvents} completed Limitless M-B tournaments (${totalTeams} teams), updated ${stamp}.\n`;
  md += "Each unique team is listed once, tagged with every Mega and pairing it is the most effective team for.\n";
  md += '"Most effective" = highest win rate against the most opponents (Wilson lower-bound on W/L, so a strong record over many games beats a tiny undefeated run).\n';
  md += `${list.length} unique teams cover ${Object.keys(bestFor).length} of ${megaSet.size} Megas + all ${Object.keys(pairFor).length} pairings. Sorted by how many they top.\n`;
  md += "NOTE: Limitless doesn't publish EV/point spreads — pastes have exact moves/item/ability/nature only.\n\n";
  list.forEach((e, i) => {
    const b = e.t.best;
    const place = b.placing < 9999 ? `#${b.placing} at` : "played";
    md += "######################################################################\n";
    md += `TEAM ${i + 1} — ${b.player} · ${place} ${b.event} (${b.field} teams) · ${b.w}-${b.l}\n`;
    md += "######################################################################\n";
    if (e.megas.length) md += `Best team for Megas: ${e.megas.join(", ")}\n`;
    if (e.pairs.length) md += `Best team for Pairings: ${e.pairs.join(", ")}\n`;
    md += "\n" + e.t.paste.trim() + "\n\n";
  });
  fs.writeFileSync(OUT, md);
  console.log(`wrote ${OUT} — ${list.length} unique teams covering ${Object.keys(bestFor).length} Megas / ${Object.keys(pairFor).length} pairings`);
}
main().catch(e => { console.error("FATAL", e.message); process.exit(1); });
