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
const PRIOR_GAMES = 40;         // win-rate shrinkage strength (pseudo-games at 50%)
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
function fold(a, wins, losses, isCut, placing) {
  a.teams++; a.w += wins; a.l += losses;
  if (isCut) { a.cut++; if (placing < a.best) a.best = placing; }
}
function finalize(a) {
  const g = a.w + a.l;
  return { teams: a.teams, wins: a.w, losses: a.l,
    wr: g ? +(100 * a.w / g).toFixed(1) : 0,
    adjWr: +(100 * (a.w + PRIOR_GAMES / 2) / (g + PRIOR_GAMES)).toFixed(1),
    cut: a.cut, best: a.best < 9999 ? a.best : null };
}

function aggregate(standingsList) {
  const mons = {}, megas = {};
  let events = 0, teams = 0, maxMegaTeams = 1;
  for (const data of standingsList) {
    if (!Array.isArray(data) || !data.length) continue;
    events++;
    for (const p of data) {
      const dl = p.decklist || []; if (!dl.length) continue;
      teams++;
      const rec = p.record || {}; const wins = rec.wins || 0, losses = rec.losses || 0;
      const isCut = p.placing != null, placing = p.placing;
      const seenSpecies = new Set();
      for (const mon of dl) {
        const dn = toDexName(mon.id, mon.name);
        if (dn && !seenSpecies.has(dn)) {            // count a species once per team
          seenSpecies.add(dn);
          fold(mons[dn] || (mons[dn] = blankAgg()), wins, losses, isCut, placing);
        }
        if (MEGA_SPECIES.has(norm(mon.id)) && isStone(mon.item)) {
          let label = (dn || mon.name || "?"); const m = String(mon.item).match(/ ([XY])$/); if (m) label += "-" + m[1];
          const a = megas[label] || (megas[label] = blankAgg());
          fold(a, wins, losses, isCut, placing);
          if (a.teams > maxMegaTeams) maxMegaTeams = a.teams;
        }
      }
    }
  }
  // mega tier = composite of adoption (log) + shrunk performance
  const megaOut = {};
  for (const [k, a] of Object.entries(megas)) {
    const f = finalize(a);
    const adoptZ = Math.log(a.teams) / Math.log(maxMegaTeams);
    const perfZ = Math.max(0, Math.min(1, (f.adjWr - 42) / (58 - 42)));
    const comp = 0.5 * perfZ + 0.5 * adoptZ;
    f.tier = comp >= 0.78 ? "S" : comp >= 0.62 ? "A" : comp >= 0.46 ? "B" : comp >= 0.30 ? "C" : comp >= 0.18 ? "D" : "F";
    megaOut[k] = f;
  }
  const monOut = {}; for (const [k, a] of Object.entries(mons)) monOut[k] = finalize(a);
  return { events, teams, mons: monOut, megas: megaOut };
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

  const { events, teams, mons, megas } = aggregate(standings);

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
  fs.writeFileSync(OUT, header + "window.RESULTS = " + JSON.stringify({ meta, mons, megas }) + ";\n");
  console.log(`wrote ${OUT} — ${Object.keys(mons).length} species, ${Object.keys(megas).length} megas`);
}
main().catch(e => { console.error("FATAL", e.message); process.exit(1); });
