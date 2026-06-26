#!/usr/bin/env node
/* Weekly Pikalytics usage refresh for Champions Reg M-B (doubles, battledataregmbs3).
 *
 * Scrapes the current usage data and regenerates app/usage-data.js in the SAME shape the app expects:
 *   window.USAGE_SETS = { "<DexName>": { moves, movePct, items, abilities, natures, spreads, teammates, src, rank } }
 *
 * SAFETY: this is the only thing that writes usage-data.js. It refuses to write unless it scraped a sane
 * dataset (>= MIN_MONS mons, each with >=1 move and a rank). A failed/partial scrape exits non-zero and the
 * workflow makes no commit — usage-data.js is never half-overwritten with garbage.
 *
 * NOTE: Pikalytics serves usage through a client-side app that calls /api/p/<dataDate>/<format>/<slug>.
 * The exact JSON shape can drift; the parser below reads fields defensively and logs the first response's
 * keys so the shape can be confirmed/locked from the run log. Run with --debug to print extra diagnostics.
 *
 * Usage: node refresh-usage.mjs <out-usage-data.js> [--debug]
 */
import fs from "node:fs";
import path from "node:path";

const OUT = process.argv[2];
const DEBUG = process.argv.includes("--debug");
const FORMAT = "battledataregmbs3";
const BASE = "https://www.pikalytics.com";
const MIN_MONS = 100;                       // guard: a real Reg M-B scrape has ~180+ ranked mons
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
const HEADERS = { "User-Agent": UA, "Referer": `${BASE}/pokedex/${FORMAT}`, "X-Requested-With": "XMLHttpRequest", "Accept": "application/json, text/javascript, */*" };

if(!OUT){ console.error("usage: node refresh-usage.mjs <out-usage-data.js> [--debug]"); process.exit(2); }

const sleep = ms => new Promise(r=>setTimeout(r,ms));
async function getText(url){ const r=await fetch(url,{headers:HEADERS}); if(!r.ok) throw new Error(`${r.status} ${url}`); return r.text(); }
async function getJSON(url){ const t=await getText(url); try{ return JSON.parse(t); }catch{ return null; } }

// carry the current app dex names so scraped slugs map back to the keys the app uses
function currentNames(){
  try{
    const src=fs.readFileSync(path.join(path.dirname(OUT),"usage-data.js"),"utf8");
    const w={}; new Function("window",src)(w);
    return Object.keys(w.USAGE_SETS||{});
  }catch{ return []; }
}
const norm = s => String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
function buildNameMap(){
  const map={};
  for(const n of currentNames()) map[norm(n)] = n;     // normalized -> canonical app name
  return map;
}
const NAME_MAP = buildNameMap();
function displayName(slug, apiName){
  const cand = apiName || slug;
  return NAME_MAP[norm(cand)] || NAME_MAP[norm(slug)]
    || cand.split(/[_-]/).map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join("-");  // title-case fallback
}

// sanitize a Champions point spread: each stat 0..32, total <= 66 (drop mainline-EV leakage)
function cleanSpread(s){
  if(typeof s!=="string") return null;
  const p=s.split("/").map(x=>parseInt(x,10));
  if(p.length!==6 || p.some(x=>!Number.isFinite(x))) return null;
  if(p.some(x=>x<0||x>32) || p.reduce((a,b)=>a+b,0)>66) return null;
  return p.join("/");
}

// defensively pull a list of {label, pct} from whatever the API returns for a category
function pickList(obj, keys, labelKeys){
  for(const k of keys){ const v=obj && obj[k]; if(Array.isArray(v) && v.length) {
    return v.map(row=>{
      if(typeof row==="string") return {label:row, pct:null};
      const label = labelKeys.map(lk=>row[lk]).find(x=>typeof x==="string");
      const pct = ["percent","pct","usage","value"].map(pk=>row[pk]).find(x=>typeof x==="number");
      return label?{label, pct}:null;
    }).filter(Boolean);
  }}
  return [];
}

function parseMon(slug, rank, data){
  if(!data || typeof data!=="object") return null;
  const apiName = data.name || data.pokemon || data.title;
  const moves = pickList(data, ["moves","top_moves","key_moves"], ["move","name","label"]);
  const items = pickList(data, ["items","top_items"], ["item","name","label"]);
  const abils = pickList(data, ["abilities","abils","top_abilities"], ["ability","name","label"]);
  const nats  = pickList(data, ["natures","top_natures"], ["nature","name","label"]);
  const spreadsRaw = pickList(data, ["spreads","top_spreads","evs"], ["spread","ev","name","label"]);
  if(!moves.length) return null;                          // no usable data for this mon
  const spreads = spreadsRaw.map(s=>cleanSpread(s.label)).filter(Boolean).slice(0,2);
  const teammates = pickList(data, ["team","teammates","partners"], ["pokemon","name","label"])
    .map(t=>displayName(norm(t.label), t.label)).slice(0,6);
  const movePct = {}; for(const m of moves){ if(m.pct!=null) movePct[m.label]=m.pct; }
  return {
    moves: moves.map(m=>m.label).slice(0,4),
    movePct,
    items: items.map(i=>i.label).slice(0,3),
    abilities: abils.map(a=>a.label).slice(0,2),
    natures: nats.map(n=>n.label).slice(0,3),
    spreads,
    teammates,
    src: "api",
    rank
  };
}

async function main(){
  // 1) load the index page: gives us both the data date (via the game bundle) and the ranked mon list
  let idx;
  try{ idx = await getText(`${BASE}/pokedex/${FORMAT}`); }
  catch(e){ console.error("index fetch failed:", e.message); process.exit(1); }
  // ordered slug list (rank = order of appearance) from the index sprites; mega arts duplicate the base mon
  const slugs = [...new Set([...idx.matchAll(/championssprites\/([a-z0-9_]+)\.png/g)].map(m=>m[1]))]
    .filter(s=>!/_mega$|_megax$|_megay$/.test(s));
  // current data date (drifts monthly) from the game bundle's GameConfig, unless pinned via env
  let dataDate = process.env.PIKA_DATE || "";
  if(!dataDate){
    const jsm = idx.match(/scripts\/(game\.[a-f0-9]+\.js)/);
    if(jsm){ try{ const game = await getText(`https://cdn.pikalytics.com/scripts/${jsm[1]}`);
      const dm = game.match(/dataDate:"(\d{4}-\d{2})"/); if(dm) dataDate = dm[1]; }catch{} }
  }
  if(!dataDate){ console.error("could not determine dataDate"); process.exit(1); }
  // Prefer the LIST endpoint for the full ranked roster (the static index only exposes the top ~40 sprites).
  // The list may also carry per-mon data inline — if so we use it and skip the per-mon calls.
  let listRows = [];
  try{
    const list = await getJSON(`${BASE}/api/l/${dataDate}/${FORMAT}`);
    if(Array.isArray(list) && list.length) listRows = list;
    else if(list && Array.isArray(list.pokemon)) listRows = list.pokemon;
  }catch(e){ if(DEBUG) console.error("list endpoint failed:", e.message); }
  if(DEBUG && listRows.length) console.log("list row[0] keys:", Object.keys(listRows[0]).join(", "));
  // unify into [{slug, rank, inline}]
  let roster;
  if(listRows.length){
    roster = listRows.map((row,i)=>{
      const slugOrName = row.url || row.slug || row.pokemon || row.name || "";
      return { slug: norm(slugOrName) || slugOrName, name: row.name||row.pokemon, rank: row.rank||i+1, inline: row };
    }).filter(r=>r.slug);
  } else {
    roster = slugs.map((s,i)=>({ slug:s, name:null, rank:i+1, inline:null }));
  }
  if(!roster.length){ console.error("no mons found (list + index both empty)"); process.exit(1); }
  console.log(`Pikalytics ${FORMAT} @ ${dataDate} — ${roster.length} mons (source: ${listRows.length?"list API":"index sprites"})`);

  // 3) per-mon fetch + parse (use inline list data when present, else fetch the individual endpoint)
  const USAGE = {};
  let firstShapeLogged = false, ok=0;
  for(const r of roster){
    try{
      let data = r.inline && (r.inline.moves || r.inline.top_moves) ? r.inline : null;
      if(!data) data = await getJSON(`${BASE}/api/p/${dataDate}/${FORMAT}/${r.slug}`);
      if(DEBUG && !firstShapeLogged && data && typeof data==="object"){ firstShapeLogged=true;
        console.log("First mon response keys:", Object.keys(data).join(", ")); }
      const mon = parseMon(r.slug, r.rank, data);
      if(mon){ USAGE[displayName(r.slug, (data && (data.name||data.pokemon)) || r.name)] = mon; ok++; }
    }catch(e){ if(DEBUG) console.error("  skip", r.slug, e.message); }
    if(!(r.inline && (r.inline.moves||r.inline.top_moves))) await sleep(120);  // be polite when hitting per-mon
  }

  // 4) GUARD — never overwrite with a thin/broken scrape
  console.log(`parsed ${ok} mons (need >= ${MIN_MONS})`);
  if(ok < MIN_MONS){ console.error(`ABORT: only ${ok} mons parsed — refusing to overwrite usage-data.js`); process.exit(1); }

  const header = "// Pikalytics usage data — Pokemon Champions Reg M-B S3 Ranked Battle Data (VGC doubles).\n"
    + `// Auto-refreshed ${dataDate}. Per-mon: rank (lower=more used), top moves/items/abilities/natures + Champions point spreads + teammates.\n`;
  fs.writeFileSync(OUT, header + "window.USAGE_SETS = " + JSON.stringify(USAGE) + ";\n");
  console.log(`wrote ${OUT} (${ok} mons)`);
}
main().catch(e=>{ console.error("FATAL", e.message); process.exit(1); });
