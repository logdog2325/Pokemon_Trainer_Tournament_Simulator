#!/usr/bin/env node
// Diff two usage-data.js snapshots and emit a human-readable "meta shifts" report.
// Usage: node meta-shifts.mjs <old-usage-data.js> <new-usage-data.js> [outFile.md]
// Prints the report to stdout and, if outFile given, writes it there. Exits 0 always.
import fs from "node:fs";

function loadUsage(path){
  if(!path || !fs.existsSync(path)) return {};
  const src = fs.readFileSync(path, "utf8");
  const sandbox = { window: {} };
  // usage-data.js is `window.USAGE_SETS = {...}` — evaluate it in a tiny sandbox
  new Function("window", src)(sandbox.window);
  return sandbox.window.USAGE_SETS || {};
}

const [,, oldPath, newPath, outFile] = process.argv;
const A = loadUsage(oldPath);   // previous
const B = loadUsage(newPath);   // new

const rank = (u,n)=> (u[n] && u[n].rank!=null) ? u[n].rank : null;
const item0 = (u,n)=> (u[n] && u[n].items && u[n].items[0]) || null;
const moveSet = (u,n)=> new Set(((u[n] && u[n].moves) || []).filter(Boolean));
const ability0 = (u,n)=> (u[n] && u[n].abilities && u[n].abilities[0]) || null;

const allNames = [...new Set([...Object.keys(A), ...Object.keys(B)])];

// 1) entrants / departures (by presence of a rank)
const entered = [], left = [];
for(const n of allNames){
  const ra = rank(A,n), rb = rank(B,n);
  if(ra==null && rb!=null) entered.push([n, rb]);
  if(ra!=null && rb==null) left.push([n, ra]);
}
entered.sort((a,b)=>a[1]-b[1]);
left.sort((a,b)=>a[1]-b[1]);

// 2) biggest rank movers (present in both)
const movers = [];
for(const n of allNames){
  const ra = rank(A,n), rb = rank(B,n);
  if(ra!=null && rb!=null && ra!==rb) movers.push({n, ra, rb, d: ra-rb}); // d>0 => climbed
}
const risers = movers.filter(m=>m.d>0).sort((a,b)=>b.d-a.d).slice(0,12);
const fallers = movers.filter(m=>m.d<0).sort((a,b)=>a.d-b.d).slice(0,12);

// 3) set / item / ability changes among mons relevant in EITHER snapshot (top 60 by best rank)
const relevant = allNames
  .map(n=>({n, r: Math.min(rank(A,n)??999, rank(B,n)??999)}))
  .filter(x=>x.r<=60).sort((a,b)=>a.r-b.r).map(x=>x.n);
const itemChanges = [], moveChanges = [], abilityChanges = [];
for(const n of relevant){
  const ia=item0(A,n), ib=item0(B,n);
  if(ia && ib && ia!==ib) itemChanges.push(`${n}: ${ia} → ${ib}`);
  const aa=ability0(A,n), ab=ability0(B,n);
  if(aa && ab && aa!==ab) abilityChanges.push(`${n}: ${aa} → ${ab}`);
  const ma=moveSet(A,n), mb=moveSet(B,n);
  if(ma.size && mb.size){
    const added=[...mb].filter(x=>!ma.has(x)), dropped=[...ma].filter(x=>!mb.has(x));
    if(added.length||dropped.length)
      moveChanges.push(`${n}: ${added.length?"+"+added.join(", +"):""}${added.length&&dropped.length?"  ":""}${dropped.length?"−"+dropped.join(", −"):""}`);
  }
}

const arrow = d => d>0 ? `▲${d}` : `▼${-d}`;
const L = [];
L.push(`# Meta shifts — Champions Reg M-B (Pikalytics doubles)`);
L.push(``);
const totalChanges = entered.length+left.length+risers.length+fallers.length+itemChanges.length+moveChanges.length+abilityChanges.length;
if(!totalChanges){ L.push(`_No usage changes detected this week._`); }
else {
  if(entered.length){ L.push(`## New to the meta`); entered.slice(0,15).forEach(([n,r])=>L.push(`- **${n}** (now #${r})`)); L.push(``); }
  if(left.length){ L.push(`## Dropped out`); left.slice(0,15).forEach(([n,r])=>L.push(`- ${n} (was #${r})`)); L.push(``); }
  if(risers.length){ L.push(`## Biggest risers`); risers.forEach(m=>L.push(`- **${m.n}** ${arrow(m.d)}  (#${m.ra} → #${m.rb})`)); L.push(``); }
  if(fallers.length){ L.push(`## Biggest fallers`); fallers.forEach(m=>L.push(`- ${m.n} ${arrow(m.d)}  (#${m.ra} → #${m.rb})`)); L.push(``); }
  if(itemChanges.length){ L.push(`## Item shifts (top 60)`); itemChanges.slice(0,20).forEach(s=>L.push(`- ${s}`)); L.push(``); }
  if(abilityChanges.length){ L.push(`## Ability shifts (top 60)`); abilityChanges.slice(0,20).forEach(s=>L.push(`- ${s}`)); L.push(``); }
  if(moveChanges.length){ L.push(`## Moveset shifts (top 60)`); moveChanges.slice(0,25).forEach(s=>L.push(`- ${s}`)); L.push(``); }
}
const report = L.join("\n");
process.stdout.write(report + "\n");
if(outFile) fs.writeFileSync(outFile, report + "\n");
