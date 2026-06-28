#!/usr/bin/env node
/* Weekly Limitless tournament-results refresh for Champions Reg M-B (VGC doubles).
 *
 * Scrapes completed M-B tournaments from play.limitlesstcg.com and aggregates REAL competitive
 * results — usage, win rate, and top-cut appearances — per species AND per Mega Evolution, then
 * writes app/results-data.js in the shape the app expects:
 *
 *   window.RESULTS = {
 *     meta:  { source, format, events, teams, generated, note },
 *     mons:  { "<DexName>": { teams, use, wins, losses, wr, adjWr, cut, best } },   // any item
 *     megas: { "<MegaLabel>": { teams, wins, losses, wr, adjWr, cut, best, tier } } // by held stone
 *   }
 *
 * Data source: the public standings API — https://play.limitlesstcg.com/api/tournaments/<id>/standings
 * returns a JSON array of players, each with { name, placing, record:{wins,losses,ties}, decklist:[{id,name,item,...}] }.
 * `placing` is non-null for players who reached the final/top-cut standings.
 *
 * adjWr = shrunk win rate (Bayesian: regressed toward 50% with a PRIOR_GAMES pseudo-sample) so
 * tiny samples don't produce fake 0%/100% extremes. Mega `tier` is a composite of adoption + adjWr.
 *
 * SAFETY: refuses to overwrite results-data.js unless it scraped a sane dataset
 * (>= MIN_EVENTS events and >= MIN_TEAMS teams with decklists). A failed/partial scrape exits
 * non-zero and the workflow makes no commit.
 *
 * Usage:
 *   node refresh-limitless.mjs <out-results-data.js> [--debug] [--cache-dir <dir>]
 *     --cache-dir   aggregate from already-downloaded <id>.json standings files instead of fetching
 *                   (used to (re)generate the committed file offline; the weekly Action fetches live).
 */
import fs from "node:fs";
import path from "node:path";

const OUT = process.argv[2];
const DEBUG = process.argv.includes("--debug");
const CACHE_DIR = (() => { const i = process.argv.indexOf("--cache-dir"); return i > 0 ? process.argv[i + 1] : null; })();
const BASE = "https://play.limitlesstcg.com";
const MIN_EVENTS = 10;          // guard: a real 4-week M-B pull has dozens of events
const MIN_TEAMS = 500;          // guard: ...and thousands of teams with decklists
const PRIOR_GAMES = 50;         // win-rate shrinkage strength (pseudo-games at 50%)
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
const HEADERS = { "User-Agent": UA, "Accept": "application/json, text/html, */*" };

if (!OUT) { console.error("usage: node refresh-limitless.mjs <out-results-data.js> [--debug] [--cache-dir <dir>]"); process.exit(2); }

const sleep = ms => new Promise(r => setTimeout(r, ms));
const norm = s => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
async function getText(url) { const r = await fetch(url, { headers: HEADERS }); if (!r.ok) throw new Error(`${r.status} ${url}`); return r.text(); }
async function getJSON(url) { const t = await getText(url); try { return JSON.parse(t); } catch { return null; } }

// ---- map decklist species (showdown id slugs) back to the app's dex names -------------------------
function dexNames() {
  try {
    const src = fs.readFileSync(path.join(path.dirname(OUT), "dex-data.js"), "utf8");
    const w = {}; new Function("window", src)(w);
    return (w.DEX || []).map(d => d.name);
  } catch { return []; }
}
const DEX_NAMES = dexNames();
const BY_NORM = {}; for (const n of DEX_NAMES) BY_NORM[norm(n)] = n;
// gendered/default-form aliases where the tournament slug differs from the dex key
const ALIAS = {
  basculegion: "Basculegion-Male", basculegionf: "Basculegion-Female",
  meowstic: "Meowstic-Male", meowsticf: "Meowstic-Female",
  floetteeternal: "Floette",
};
function toDexName(id, name) {
  const k = norm(id);
  if (BY_NORM[k]) return BY_NORM[k];
  if (ALIAS[k]) return ALIAS[k];
  // progressively strip form suffixes off the slug (e.g. rotom-heat -> rotom)
  const parts = String(id || "").split("-");
  while (parts.length > 1) { parts.pop(); const h = BY_NORM[norm(parts.join(""))]; if (h) return h; }
  return BY_NORM[norm(name)] || null;
}
const MEGA_SPECIES = (() => {
  try {
    const src = fs.readFileSync(path.join(path.dirname(OUT), "dex-data.js"), "utf8");
    const w = {}; new Function("window", src)(w);
    return new Set((w.DEX || []).filter(d => Array.isArray(d.mega) && d.mega.length).map(d => norm(d.name)));
  } catch { return new Set(); }
})();
const isStone = it => { if (!it) return false; it = it.trim(); if (it.toLowerCase() === "eviolite") return false; return /ite( [XY])?$/.test(it); };

// ---- discover completed M-B tournaments ----------------------------------------------------------
function parseListing(html) {
  const out = [];
  for (const tr of html.match(/<tr[\s\S]*?<\/tr>/g) || []) {
    const idm = tr.match(/\/tournament\/([a-z0-9]+)/);
    if (!idm) continue;
    const cells = (tr.match(/<td[^>]*>([\s\S]*?)<\/td>/g) || [])
      .map(c => c.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#?\w+;/g, "").trim());
    const row = cells.join(" | ");
    if (!/M-?B|Champions|Reg\.?\s*M/i.test(row)) continue;      // M-B only
    const nums = cells.filter(c => /^\d+$/.test(c));
    out.push({ id: idm[1], players: nums.length ? +nums[nums.length - 1] : 0, name: cells[0] || "" });
  }
  return out;
}
async function discover() {
  const urls = [
    `${BASE}/tournaments/completed?game=VGC&format=M-B&platform=all&type=all&time=all&show=200`,
    `${BASE}/tournaments/completed?game=VGC&format=M-B&platform=all&type=online&time=4weeks`,
    `${BASE}/tournaments/completed?game=VGC&show=100`,
  ];
  const byId = {};
  for (const u of urls) {
    try { for (const t of parseListing(await getText(u))) if (!byId[t.id]) byId[t.id] = t; }
    catch (e) { if (DEBUG) console.error("listing failed:", u, e.message); }
  }
  return Object.values(byId);
}

// ---- aggregation ---------------------------------------------------------------------------------
function blankAgg() { return { teams: 0, w: 0, l: 0, cut: 0, best: 9999 }; }
function blankMon() { return { teams: 0, w: 0, l: 0, cut: 0, best: 9999, moves: {}, items: {}, abil: {}, nat: {}, mates: {} }; }
function fold(a, wins, losses, isCut, placing, fieldSize) {
  a.teams++; a.w += wins; a.l += losses;
  if (isCut) { a.cut++; if (placing < a.best) a.best = placing;
    if (placing <= 8) { a.t8 = (a.t8 || 0) + 1; a.cutW = (a.cutW || 0) + (fieldSize || 1); }      // cutW = field-size-weighted top-8s
    if (placing === 1) { a.won = (a.won || 0) + 1; a.wonW = (a.wonW || 0) + (fieldSize || 1); } }  // wonW = field-size-weighted wins
}
// count a labelled option (move/item/etc.) on a species, carrying the team's W/L so we can
// surface BOTH how often it's run and how well teams that run it do.
function bump(map, key, wins, losses) { if (!key) return; const e = map[key] || (map[key] = { n: 0, w: 0, l: 0 }); e.n++; e.w += wins; e.l += losses; }
function finalize(a) {
  const g = a.w + a.l;
  return { teams: a.teams, wins: a.w, losses: a.l,
    wr: g ? +(100 * a.w / g).toFixed(1) : 0,
    adjWr: +(100 * (a.w + PRIOR_GAMES / 2) / (g + PRIOR_GAMES)).toFixed(1),
    cut: a.cut, best: a.best < 9999 ? a.best : null, won: a.won || 0, top8: a.t8 || 0 };
}
// extra bonus for actually WINNING events (1st place), weighted by EVENT SIZE so winning a big event
// counts far more than winning a tiny one. Input is wonW = sum of field sizes over 1st-place finishes
// (e.g. one 200-player win = 200; one 8-player win = 8). Diminishing returns + a cap so it tops up
// the score without dominating it.
function eventBonus(wonW) { return wonW ? Math.min(0.7, 0.045 * Math.sqrt(wonW)) : 0; }
// parallel bonus for TOP-CUTTING (top-8), also size-weighted (cutW = sum of field sizes over top-8s),
// so cutting a big event counts far more than a small one. Capped just below the win cap, so top-cut
// performance is weighted CLOSE to (but a notch under) actually winning.
function cutBonus(cutW) { return cutW ? Math.min(0.6, 0.02 * Math.sqrt(cutW)) : 0; }
// --- scientific Mega-tier helpers: EB Beta prior (MoM), z-scores, 1-D k-means natural breaks ---
// Fit a Beta prior to a set of {s,n} rates by method of moments (between-group variance minus the
// binomial sampling variance) → returns the population mean and prior strength (alpha+beta), both
// ESTIMATED FROM THE DATA so the shrinkage isn't a hand-picked constant.
function fitBeta(items) {
  const tot = items.reduce((a, x) => a + x.n, 0) || 1;
  const mu = items.reduce((a, x) => a + x.s, 0) / tot;
  let num = 0, den = 0, samp = 0;
  for (const x of items) { if (x.n < 1) continue; const p = x.s / x.n; num += x.n * (p - mu) ** 2; den += x.n; samp += mu * (1 - mu); }
  const Vobs = den ? num / den : 0, Vsamp = den ? samp / den : 0;   // Vsamp = mu(1-mu)/avg(n)
  const Vtrue = Math.max(1e-6, Vobs - Vsamp);
  return { mu, M: Math.max(1, mu * (1 - mu) / Vtrue - 1) };
}
function zscores(rows, key) {
  const m = rows.reduce((s, r) => s + r[key], 0) / rows.length;
  const sd = Math.sqrt(rows.reduce((s, r) => s + (r[key] - m) ** 2, 0) / rows.length) || 1;
  rows.forEach(r => r["z_" + key] = (r[key] - m) / sd);
}
// 1-D k-means → returns a classifier mapping a value to a tier index (0=best). Deterministic restarts.
function kmeans1d(vals, k, iters = 120, restarts = 50) {
  const sorted = [...vals].sort((a, b) => a - b); let best = null;
  for (let r = 0; r < restarts; r++) {
    let cent = Array.from({ length: k }, (_, i) => sorted[Math.floor((i + 0.5) / k * sorted.length)] + (r ? Math.sin(r * 7.13 + i * 3.7) * 0.04 : 0));
    let assign = new Array(vals.length).fill(0);
    for (let it = 0; it < iters; it++) {
      assign = vals.map(v => { let bi = 0, bd = Infinity; cent.forEach((c, i) => { const d = (v - c) ** 2; if (d < bd) { bd = d; bi = i; } }); return bi; });
      const sum = new Array(k).fill(0), cnt = new Array(k).fill(0);
      vals.forEach((v, i) => { sum[assign[i]] += v; cnt[assign[i]]++; });
      cent = cent.map((c, i) => cnt[i] ? sum[i] / cnt[i] : c);
    }
    const wss = vals.reduce((s, v, i) => s + (v - cent[assign[i]]) ** 2, 0);
    if (!best || wss < best.wss - 1e-9) best = { wss, cent: [...cent] };
  }
  const rank = {}; best.cent.map((c, i) => [c, i]).sort((a, b) => b[0] - a[0]).forEach(([, i], ti) => rank[i] = ti);
  return v => { let bi = 0, bd = Infinity; best.cent.forEach((c, i) => { const d = (v - c) ** 2; if (d < bd) { bd = d; bi = i; } }); return rank[bi]; };
}

// rank options by usage, return [label, pct-of-species-teams, win-rate] tuples
function topOpts(map, teams, limit, minN) {
  return Object.entries(map)
    .filter(([, e]) => e.n >= (minN || 1))
    .sort((a, b) => b[1].n - a[1].n)
    .slice(0, limit)
    .map(([k, e]) => { const g = e.w + e.l; return [k, +(100 * e.n / teams).toFixed(0), g ? +(100 * e.w / g).toFixed(0) : null]; });
}

function aggregate(standingsList) {
  const mons = {}, megas = {}, pairs = {};
  let events = 0, teams = 0, maxMegaTeams = 1;
  for (const data of standingsList) {
    if (!Array.isArray(data) || !data.length) continue;
    events++;
    const fieldSize = data.filter(p => (p.decklist || []).length).length;   // teams in THIS event (its size)
    for (const p of data) {
      const dl = p.decklist || []; if (!dl.length) continue;
      teams++;
      const rec = p.record || {}; const wins = rec.wins || 0, losses = rec.losses || 0;
      const isCut = p.placing != null, placing = p.placing;
      // resolve the team's species once (item clause → one of each), so we can mine co-occurrence
      const roster = [];
      for (const mon of dl) { const dn = toDexName(mon.id, mon.name); if (dn && !roster.find(r => r.dn === dn)) roster.push({ dn, mon }); }
      for (const { dn, mon } of roster) {
        const a = mons[dn] || (mons[dn] = blankMon());
        fold(a, wins, losses, isCut, placing, fieldSize);
        for (const mv of (mon.attacks || [])) bump(a.moves, mv, wins, losses);
        bump(a.items, mon.item, wins, losses);
        bump(a.abil, mon.ability, wins, losses);
        bump(a.nat, mon.nature, wins, losses);
        for (const other of roster) if (other.dn !== dn) bump(a.mates, other.dn, wins, losses);
      }
      const teamMegas = [];
      for (const mon of dl) {
        if (MEGA_SPECIES.has(norm(mon.id)) && isStone(mon.item)) {
          const dn = toDexName(mon.id, mon.name);
          let label = (dn || mon.name || "?"); const m = String(mon.item).match(/ ([XY])$/); if (m) label += "-" + m[1];
          const a = megas[label] || (megas[label] = blankAgg());
          fold(a, wins, losses, isCut, placing, fieldSize);
          if (a.teams > maxMegaTeams) maxMegaTeams = a.teams;
          teamMegas.push(label);
        }
      }
      // mega PAIRINGS: every unordered pair of Mega stones a team flexes together (≈half of teams carry 2)
      const uniqMega = [...new Set(teamMegas)];
      for (let i = 0; i < uniqMega.length; i++) for (let j = i + 1; j < uniqMega.length; j++) {
        const key = [uniqMega[i], uniqMega[j]].sort().join(" + ");
        const a = pairs[key] || (pairs[key] = blankAgg());
        fold(a, wins, losses, isCut, placing, fieldSize);
      }
    }
  }
  // ---- Mega tier = data-driven score; tier cutpoints found by k-means (no hand-set thresholds) -----
  // Quality score = win rate + top-8 rate + a stepped usage bonus, combined as:
  //   1. WIN RATE   — lightly-shrunk win rate (record nudged toward the field mean so 1-2 game flukes
  //                   don't spike), standardized. By far the heaviest factor.                           [weight .90]
  //   2. TOP-8 RATE — lightly-shrunk top-8 cut rate, standardized.                                      [weight .10]
  //   3. USAGE      — a STEPPED bonus, because bringing a Mega to many events is itself proof players
  //                   trust it: 100+ teams = big boost, 50+ = solid, 10-49 = tiny, <10 = heavy penalty
  //                   (almost nobody found it worth trying). This lets volume lift a proven-popular Mega
  //                   and sinks fringe one-offs, while win rate still leads.
  // Tier CUTPOINTS are not chosen by hand — 1-D k-means (Jenks natural breaks) finds the gaps in the
  // score distribution and those define S..F.
  const TN = ["S", "A", "B", "C", "D", "F"];
  const KWR = 12;                                  // light shrinkage strength (pseudo-games / pseudo-teams)
  const list = Object.entries(megas).map(([k, a]) => {
    const f = finalize(a), games = f.wins + f.losses;
    return { k, f, a, games, teams: a.teams };
  });
  const totW = list.reduce((s, r) => s + r.a.w, 0), totG = list.reduce((s, r) => s + r.games, 0) || 1;
  const totT8 = list.reduce((s, r) => s + (r.a.t8 || 0), 0), totTeams = list.reduce((s, r) => s + r.teams, 0) || 1;
  const muW = totW / totG, muC = totT8 / totTeams;
  const usageBonus = t => t >= 100 ? 0.9 : t >= 50 ? 0.7 : t >= 10 ? 0.05 : -2.0;
  for (const r of list) {
    r.wr = (r.a.w + muW * KWR) / (r.games + KWR);
    r.cut = ((r.a.t8 || 0) + muC * KWR) / (r.teams + KWR);
  }
  zscores(list, "wr");
  list.forEach(r => r.comp = 1.0 * r.z_wr + usageBonus(r.teams) + eventBonus(r.a.wonW || 0) + cutBonus(r.a.cutW || 0));
  const classify = kmeans1d(list.map(r => r.comp), 6);
  const megaOut = {};
  for (const r of list) {
    r.f.tier = TN[classify(r.comp)];
    r.f.games = r.games; r.f.score = +r.comp.toFixed(2); r.f.top8 = r.a.t8 || 0;
    megaOut[r.k] = r.f;
  }
  if (DEBUG) console.log(`field win rate mu=${(muW * 100).toFixed(1)}% top8 base=${(muC * 100).toFixed(1)}%`);

  // ---- Mega PAIRING tiers — same model, usage thresholds scaled down (pairs run smaller samples) ---
  // Only pairs seen on >= MIN_PAIR teams are tiered (fewer teams = pure noise). Same win-rate-led score
  // + a stepped usage bonus (50+ pairings big, 20+ solid, 8-19 tiny) + k-means natural breaks.
  const MIN_PAIR = 8;
  const plist = Object.entries(pairs).filter(([, a]) => a.teams >= MIN_PAIR).map(([k, a]) => {
    const f = finalize(a), games = f.wins + f.losses;
    return { k, f, a, games, teams: a.teams };
  });
  const pairOut = {};
  if (plist.length >= 6) {
    const pUse = t => t >= 50 ? 0.9 : t >= 20 ? 0.7 : 0.05;     // pairs never get the <8 penalty (already filtered)
    for (const r of plist) {
      r.wr = (r.a.w + muW * KWR) / (r.games + KWR);
      r.cut = ((r.a.t8 || 0) + muC * KWR) / (r.teams + KWR);
    }
    zscores(plist, "wr");
    plist.forEach(r => r.comp = 1.0 * r.z_wr + pUse(r.teams) + eventBonus(r.a.wonW || 0) + cutBonus(r.a.cutW || 0));
    const pclassify = kmeans1d(plist.map(r => r.comp), 6);
    for (const r of plist) {
      r.f.tier = TN[pclassify(r.comp)];
      r.f.games = r.games; r.f.score = +r.comp.toFixed(2); r.f.top8 = r.a.t8 || 0;
      pairOut[r.k] = r.f;
    }
  }

  const monOut = {};
  for (const [k, a] of Object.entries(mons)) {
    const f = finalize(a);
    f.moves = topOpts(a.moves, a.teams, 10, 1);     // win-rate-weighted real sets
    f.items = topOpts(a.items, a.teams, 4, 1);
    f.abilities = topOpts(a.abil, a.teams, 3, 1);
    f.natures = topOpts(a.nat, a.teams, 3, 1);
    f.mates = topOpts(a.mates, a.teams, 10, 2);      // teammate co-occurrence + pair win rate
    monOut[k] = f;
  }
  return { events, teams, mons: monOut, megas: megaOut, pairs: pairOut };
}

// ---- main ----------------------------------------------------------------------------------------
async function main() {
  let standings = [];
  if (CACHE_DIR) {
    for (const f of fs.readdirSync(CACHE_DIR).filter(f => f.endsWith(".json"))) {
      try { standings.push(JSON.parse(fs.readFileSync(path.join(CACHE_DIR, f), "utf8"))); } catch {}
    }
    console.log(`aggregating ${standings.length} cached standings from ${CACHE_DIR}`);
  } else {
    const events = await discover();
    if (!events.length) { console.error("no M-B tournaments discovered"); process.exit(1); }
    console.log(`discovered ${events.length} M-B tournaments — fetching standings`);
    for (const t of events) {
      try {
        const s = await getJSON(`${BASE}/api/tournaments/${t.id}/standings`);
        if (Array.isArray(s) && s.length) standings.push(s);
        else if (DEBUG) console.error("  empty", t.id, t.name);
      } catch (e) { if (DEBUG) console.error("  skip", t.id, e.message); }
      await sleep(120);
    }
  }

  const { events, teams, mons, megas, pairs } = aggregate(standings);

  // GUARD — never overwrite with a thin/broken scrape
  console.log(`aggregated ${events} events, ${teams} teams (need >= ${MIN_EVENTS} events, >= ${MIN_TEAMS} teams)`);
  if (events < MIN_EVENTS || teams < MIN_TEAMS) {
    console.error(`ABORT: only ${events} events / ${teams} teams — refusing to overwrite results-data.js`);
    process.exit(1);
  }

  const generated = process.env.DATA_DATE || new Date().toISOString().slice(0, 10);
  const meta = { source: "play.limitlesstcg.com", format: "M-B", events, teams, generated,
    note: "Champions Reg M-B VGC doubles — completed tournaments. wr=win rate, adjWr=shrunk, cut=top-cut entries, best=best finish." };
  const header = "// Limitless tournament results — Pokemon Champions Reg M-B (VGC doubles).\n"
    + `// Auto-refreshed ${generated} from ${events} tournaments / ${teams} teams. Per species + per Mega: usage, win rate, top-cut.\n`;
  fs.writeFileSync(OUT, header + "window.RESULTS = " + JSON.stringify({ meta, mons, megas, pairs }) + ";\n");
  console.log(`wrote ${OUT} — ${Object.keys(mons).length} species, ${Object.keys(megas).length} megas, ${Object.keys(pairs).length} pairings`);
}
main().catch(e => { console.error("FATAL", e.message); process.exit(1); });
