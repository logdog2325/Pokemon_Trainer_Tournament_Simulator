#!/usr/bin/env node
/* Weekly Pikalytics usage refresh for Champions Reg M-B (doubles, battledataregmbs3).
 *
 * Scrapes the current usage data and regenerates app/usage-data.js in the SAME shape the app expects:
 *   window.USAGE_SETS = { "<DexName>": { moves, movePct, items, abilities, natures, spreads, teammates, wr, src, rank } }
 *
 * SAFETY: this is the only thing that writes usage-data.js. It refuses to write unless it scraped a sane
 * dataset (>= MIN_MONS mons, each with >=1 move and a rank). A failed/partial scrape exits non-zero and the
 * workflow makes no commit — usage-data.js is never half-overwritten with garbage.
 *
 * DATA SOURCE (rewritten 2026-08): Pikalytics retired the client-side JSON API this scraper used to call
 * (/api/p/<dataDate>/<format>/<slug> now returns `false`; /api/l/... returns []), which is why the weekly
 * job had been failing its guard and silently making no commit. The site is server-rendered now, so we
 * parse HTML instead:
 *   - ranked list  -> /pokedex/<FORMAT>?page=N   (26 mons/page: name + winrate, in rank order)
 *   - per-mon data -> /pokedex/<FORMAT>/<Name>
 *        * JSON-LD FAQPage blocks carry moves/items/abilities/teammates with usage percentages
 *        * the rendered body carries nature usage ("Jolly 60.500%") and Champions point spreads
 *          ("2/ 30/ 1/ 0/ 1/ 32 0.400%")
 * Pikalytics rate-limits aggressively (HTTP 429), so requests are paced and retried with backoff.
 *
 * Usage: node refresh-usage.mjs <out-usage-data.js> [--debug] [--limit N]
 */
import fs from "node:fs";
import path from "node:path";

const OUT = process.argv[2];
const DEBUG = process.argv.includes("--debug");
const LIMIT = (() => { const i = process.argv.indexOf("--limit"); return i > 0 ? parseInt(process.argv[i + 1], 10) : 0; })();
const FORMAT = "battledataregmbs3";
const BASE = "https://www.pikalytics.com";
const MIN_MONS = 100;                       // guard: a real Reg M-B scrape has ~180+ ranked mons
const REQ_DELAY = 900;                      // ms between requests (Pikalytics 429s if you go much faster)
const MAX_RETRY = 4;
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
const HEADERS = { "User-Agent": UA, "Referer": `${BASE}/pokedex/${FORMAT}`, "Accept": "text/html,application/xhtml+xml" };

if(!OUT){ console.error("usage: node refresh-usage.mjs <out-usage-data.js> [--debug] [--limit N]"); process.exit(2); }

const sleep = ms => new Promise(r=>setTimeout(r,ms));

// paced fetch with exponential backoff on 429/5xx
async function getText(url){
  let wait = REQ_DELAY;
  for(let attempt=0; attempt<=MAX_RETRY; attempt++){
    const r = await fetch(url,{headers:HEADERS});
    if(r.ok) return r.text();
    if(r.status===429 || r.status>=500){
      if(attempt===MAX_RETRY) throw new Error(`${r.status} ${url}`);
      wait *= 2;
      if(DEBUG) console.error(`  ${r.status} — backing off ${wait}ms  ${url}`);
      await sleep(wait);
      continue;
    }
    throw new Error(`${r.status} ${url}`);
  }
}

// carry the current app dex names so scraped names map back to the keys the app uses.
// NOTE: OUT is usually a temp path (the workflow writes /tmp/new-usage.js then installs it), so the
// previous dataset must be read from the app copy — not from OUT, which may not exist yet.
const PREV_PATH = (() => {
  const i = process.argv.indexOf("--prev");
  if(i > 0) return process.argv[i + 1];
  const sibling = path.join(path.dirname(OUT), "usage-data.js");
  if(fs.existsSync(sibling)) return sibling;
  return path.join(path.dirname(new URL(import.meta.url).pathname), "..", "app", "usage-data.js");
})();
function currentUsage(){
  try{
    const src=fs.readFileSync(PREV_PATH,"utf8");
    const w={}; new Function("window",src)(w);
    return w.USAGE_SETS||{};
  }catch{ return {}; }
}
const PREV = currentUsage();
const norm = s => String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
const NAME_MAP = (()=>{ const m={}; for(const n of Object.keys(PREV)) m[norm(n)]=n; return m; })();
// Pikalytics form names that differ from the app dex's keys
const ALIAS = { basculegion:"Basculegion-Male", floetteeternal:"Floette", lycanroc:"Lycanroc-Midday" };
function displayName(raw){
  const cand = String(raw||"").trim();
  return ALIAS[norm(cand)] || NAME_MAP[norm(cand)]
    || cand.split(/[_\s-]/).filter(Boolean).map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join("-");
}

// sanitize a Champions point spread: each stat 0..32, total <= 66 (drop mainline-EV leakage)
function cleanSpread(s){
  if(typeof s!=="string") return null;
  const p=s.split("/").map(x=>parseInt(x,10));
  if(p.length!==6 || p.some(x=>!Number.isFinite(x))) return null;
  if(p.some(x=>x<0||x>32) || p.reduce((a,b)=>a+b,0)>66) return null;
  return p.join("/");
}

const stripTags = h => String(h).replace(/<[^>]+>/g," ")
  .replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g," ")
  .replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ");

// pull every FAQ question/answer pair out of the page's JSON-LD blocks
function faqPairs(html){
  const out=[];
  for(const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)){
    let data; try{ data=JSON.parse(m[1]); }catch{ continue; }
    (function walk(o){
      if(Array.isArray(o)) return o.forEach(walk);
      if(o && typeof o==="object"){
        if(o["@type"]==="Question"){
          const q=String(o.name||"");
          const a=String((o.acceptedAnswer&&o.acceptedAnswer.text)||"");
          out.push([q, a.replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&quot;/g,'"')]);
        }
        for(const v of Object.values(o)) walk(v);
      }
    })(data);
  }
  return out;
}
// "…Battle Data are Dragon Claw (89.4%), Rock Slide (82.0%)" -> [{label,pct}]
// Labels are Title Case ("Dragon Claw", "Life Orb", "Rough Skin", "U-turn"), so a label is a chain of
// capitalised tokens. Requiring that stops the answer's lowercase preamble ("... Data are") from being
// swallowed into the first match — which previously dropped every mon's TOP move/item/ability.
// A few real names carry a lowercase connector ("Light of Ruin", "Good as Gold"), so those specific
// words may bridge the chain — but "are"/"with" may not, which is what keeps the preamble out.
const LABEL_PCT = /([A-Z][A-Za-z0-9'’.\-]*(?:\s(?:of|as|the)\s[A-Z][A-Za-z0-9'’.\-]*|\s[A-Z][A-Za-z0-9'’.\-]*)*)\s*\((?:([\d.]+)|undefined)%\)/g;
const labelPct = txt => [...String(txt).matchAll(LABEL_PCT)]
  .map(m=>({label:m[1].trim(), pct:m[2]!=null?parseFloat(m[2]):null}))
  .filter(x=>x.label && x.label.length<=24);

const NATURES = ["Adamant","Bashful","Bold","Brave","Calm","Careful","Docile","Gentle","Hardy","Hasty","Impish",
  "Jolly","Lax","Lonely","Mild","Modest","Naive","Naughty","Quiet","Quirky","Rash","Relaxed","Sassy","Serious","Timid"];

function parseMonPage(html, rank, wrFromIndex){
  const pairs = faqPairs(html);
  const find = re => (pairs.find(([q])=>re.test(q))||[])[1] || "";
  const moves = labelPct(find(/best moves/i));
  if(!moves.length) return null;                         // no usable data for this mon
  const items = labelPct(find(/what item/i));
  const abils = labelPct(find(/what ability/i));
  const mates = labelPct(find(/best teammates/i)).map(t=>displayName(t.label)).slice(0,6);

  const text = stripTags(html);
  const natures = NATURES
    .map(n=>{ const m=text.match(new RegExp(`\\b${n}\\s+([\\d.]+)%`)); return m?{label:n,pct:parseFloat(m[1])}:null; })
    .filter(Boolean).sort((a,b)=>b.pct-a.pct);
  const spreads = [...text.matchAll(/(\d{1,3})\/\s*(\d{1,3})\/\s*(\d{1,3})\/\s*(\d{1,3})\/\s*(\d{1,3})\/\s*(\d{1,3})\s+([\d.]+)%/g)]
    .map(m=>({spread:cleanSpread(m.slice(1,7).join("/")), pct:parseFloat(m[7])}))
    .filter(x=>x.spread).sort((a,b)=>b.pct-a.pct);

  let wr = wrFromIndex;
  const wrm = find(/winrate/i).match(/([\d.]+)%\s*winrate/i);
  if(wrm) wr = parseFloat(wrm[1]);

  const movePct = {}; for(const m of moves) movePct[m.label]=m.pct;
  return {
    moves: moves.map(m=>m.label).slice(0,4),
    movePct,
    items: items.map(i=>i.label).slice(0,3),
    abilities: abils.map(a=>a.label).slice(0,2),
    natures: natures.map(n=>n.label).slice(0,3),
    spreads: [...new Set(spreads.map(s=>s.spread))].slice(0,2),
    teammates: mates,
    wr: wr!=null ? wr : null,
    src: "html",
    rank
  };
}

async function main(){
  // 1) paginate the ranked index: name + winrate in rank order
  const roster=[]; const seen=new Set();
  for(let page=1; page<=20; page++){
    let html;
    try{ html = await getText(`${BASE}/pokedex/${FORMAT}${page>1?`?page=${page}`:""}`); }
    catch(e){ console.error(`index page ${page} failed: ${e.message}`); break; }
    const names=[...html.matchAll(/<span class="pokemon-name">([^<]+)<\/span>/g)]
      .map(m=>m[1].trim())
      .filter(n=>n && !/[{}]/.test(n));            // drop un-rendered Handlebars placeholders
    const wrs=[...html.matchAll(/<span class="pokedex-list-winrate">([\d.]+)%/g)].map(m=>parseFloat(m[1]));
    let added=0;
    names.forEach((n,i)=>{ const k=norm(n); if(n && !seen.has(k)){ seen.add(k); roster.push({name:n, wr:wrs[i]??null, rank:roster.length+1}); added++; } });
    if(DEBUG) console.log(`  index page ${page}: +${added} (total ${roster.length})`);
    if(!added) break;
    await sleep(REQ_DELAY);
  }
  if(!roster.length){ console.error("ABORT: index yielded no mons"); process.exit(1); }
  const fromIndex = roster.length;
  // The index's pagination is client-side and caps out around 50 entries, so extend the fetch list with
  // every mon we already know about. Those keep their previous rank (the fresh index re-ranks the top tier,
  // which is what drives the app's threat lists) but still get fully refreshed sets.
  for(const [name,prev] of Object.entries(PREV)){
    if(!seen.has(norm(name))){ seen.add(norm(name)); roster.push({name, wr:null, rank:prev.rank ?? null}); }
  }
  console.log(`Pikalytics ${FORMAT} — ${fromIndex} ranked from index, ${roster.length} total to fetch`);

  // 2) per-mon detail pages
  const USAGE={}; let ok=0;
  const list = LIMIT ? roster.slice(0,LIMIT) : roster;
  for(const r of list){
    try{
      const html = await getText(`${BASE}/pokedex/${FORMAT}/${encodeURIComponent(r.name)}`);
      const mon = parseMonPage(html, r.rank, r.wr);
      if(mon){ USAGE[displayName(r.name)] = mon; ok++; }
      else if(DEBUG) console.error("  no data parsed for", r.name);
    }catch(e){ if(DEBUG) console.error("  skip", r.name, e.message); }
    await sleep(REQ_DELAY);
  }

  // 3) carry forward any previously-known mon the index no longer lists, so the app keeps its sets
  let carried=0;
  for(const [name,prev] of Object.entries(PREV)){
    if(!USAGE[name]){ USAGE[name]={...prev, src:(prev.src||"api")+"-carried"}; carried++; }
  }

  // 4) GUARD — never overwrite with a thin/broken scrape
  console.log(`parsed ${ok} mons (need >= ${MIN_MONS}), carried ${carried} previous entries`);
  if(ok < MIN_MONS){ console.error(`ABORT: only ${ok} mons parsed — refusing to overwrite usage-data.js`); process.exit(1); }

  const stamp = new Date().toISOString().slice(0,10);
  const header = "// Pikalytics usage data — Pokemon Champions Reg M-B S3 Ranked Battle Data (VGC doubles).\n"
    + `// Auto-refreshed ${stamp} from server-rendered pages. Per-mon: rank (lower=more used), win rate,\n`
    + "// top moves/items/abilities/natures + Champions point spreads + teammates.\n";
  fs.writeFileSync(OUT, header + "window.USAGE_SETS = " + JSON.stringify(USAGE) + ";\n");
  console.log(`wrote ${OUT} (${ok} scraped + ${carried} carried)`);
}
main().catch(e=>{ console.error("FATAL", e.message); process.exit(1); });
