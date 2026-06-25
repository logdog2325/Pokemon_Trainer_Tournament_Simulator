/* Champions Team Builder — UI */
'use strict';
const E = window.ENGINE;
const TCOL={Normal:"#9aa0aa",Fire:"#ff7043",Water:"#4d8cf5",Electric:"#f7c948",Grass:"#5cc46b",Ice:"#76d0d6",Fighting:"#e0533b",Poison:"#b061d6",Ground:"#dcae54",Flying:"#8fa9 f5".replace(" ",""),Psychic:"#ff6ea9",Bug:"#9bbb3a",Rock:"#caa552",Ghost:"#7d6bd1",Dragon:"#6a5cf0",Dark:"#6b6f86",Steel:"#7f9aae",Fairy:"#ff9ad1"};
const $=s=>document.querySelector(s), app=$("#app"), titleEl=$("#title"), backBtn=$("#back"), teambar=$("#teambar"), exportBtn=$("#exportBtn");
let STATE={screen:"start",lead:null,role:null,team:[],q:""};

function img(e){return `<img loading="lazy" src="${e.spritePrimary||e.spriteFallback}" onerror="this.onerror=null;this.src='${e.spriteFallback}'" alt="${e.name}">`;}
function tbadges(types){return `<div class="types">${types.map(t=>`<span class="tt" style="background:${TCOL[t]||'#888'}">${t}</span>`).join("")}</div>`;}
const POWDER=["Rage Powder","Spore","Sleep Powder","Stun Spore","Poison Powder","Cotton Spore","Powder","Magic Powder"];
function caveats(e){
  const out=[];
  if((e.abilities||[]).includes("Prankster") && e.moves.some(m=>E.DISRUPT.includes(m)&&m!=="Fake Out"))
    out.push("Prankster status moves don't affect Dark-types");
  if(e.moves.some(m=>POWDER.includes(m)))
    out.push("Powder moves (e.g. Rage Powder) don't affect Grass-types, Overcoat or Safety Goggles");
  return out;
}
function pranksterCaveat(e){const c=caveats(e);return c.length?c.join(" · "):null;}

function go(screen){STATE.screen=screen;render();window.scrollTo(0,0);}
backBtn.onclick=()=>{ if(STATE.screen==="builder")go("role"); else if(STATE.screen==="role")go("start"); };
exportBtn.onclick=()=>showExport();

/* ---------------- START ---------------- */
function renderStart(){
  titleEl.textContent="Pick your core Pokémon";
  backBtn.classList.add("hidden"); exportBtn.classList.add("hidden"); teambar.classList.add("hidden");
  const list=E.DEX.filter(e=>e.name.toLowerCase().includes(STATE.q.toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name));
  app.innerHTML=`<input class="search" id="q" placeholder="Search ${E.DEX.length} Pokémon…" value="${STATE.q}">
    <div class="grid">${list.slice(0,400).map(e=>`<div class="mon" data-n="${e.name}">${img(e)}<div class="nm">${e.name}</div>${tbadges(e.types)}</div>`).join("")}</div>`;
  const q=$("#q"); q.oninput=()=>{STATE.q=q.value;const g=app.querySelector(".grid");const l=E.DEX.filter(e=>e.name.toLowerCase().includes(STATE.q.toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name));g.innerHTML=l.slice(0,400).map(e=>`<div class="mon" data-n="${e.name}">${img(e)}<div class="nm">${e.name}</div>${tbadges(e.types)}</div>`).join("");bindMons();};
  bindMons();
}
function bindMons(){app.querySelectorAll(".mon").forEach(m=>m.onclick=()=>{STATE.lead=E.byName[m.dataset.n];STATE.role=null;STATE.team=[];STATE.q="";go("role");});}

/* ---------------- ROLE ---------------- */
function statBars(s){const order=[["HP","hp"],["Atk","atk"],["Def","def"],["SpA","spa"],["SpD","spd"],["Spe","spe"]];return `<div class="statbars">${order.map(([l,k])=>`<div><span class="lab">${l}</span><span class="bar"><i style="width:${Math.min(100,s[k]/2)}%"></i></span><span style="width:30px;text-align:right">${s[k]}</span></div>`).join("")}</div>`;}
function renderRole(){
  const e=STATE.lead; titleEl.textContent=e.name; backBtn.classList.remove("hidden"); exportBtn.classList.add("hidden"); teambar.classList.add("hidden");
  const w=E.weaknessesOf(e); const roles=E.detectRoles(e); const cav=pranksterCaveat(e);
  app.innerHTML=`<div class="card"><div class="row">${img(e)}<div style="flex:1">${tbadges(e.types)}
      <div class="muted" style="margin-top:4px">${(e.abilities||[]).join(", ")}</div></div></div>
      ${statBars(e.baseStats)}
      ${e.transformedStats?`<div class="muted" style="margin-top:6px">⚡ Transforms: ${Object.values(e.transformedStats).join("/")} (${(e.tags||[]).join(", ")})</div>`:""}
      <div class="wk">${w.weak.map(([t,m])=>`<span class="${m>=4?'x4':'x2'}">${t} ×${m}</span>`).join("")}
        ${w.imm.map(t=>`<span style="background:#143a2c;color:#3ad29f">${t} immune</span>`).join("")}</div>
      ${cav?`<div class="muted" style="color:#ffd9a0">⚠ ${cav}</div>`:""}</div>
    <h3 style="margin:6px 2px">Possible roles — pick the team's direction</h3>
    ${roles.map((r,i)=>`<div class="card rolecard" data-i="${i}"><h3>${r.label}</h3><div class="muted">${r.note}</div>
      ${r.moves&&r.moves.length?`<div class="muted" style="margin-top:4px">Key moves: ${r.moves.slice(0,5).join(", ")}</div>`:""}</div>`).join("")}`;
  app.querySelectorAll(".rolecard").forEach(c=>c.onclick=()=>{STATE.role=roles[+c.dataset.i];STATE.team=[{entry:e,ability:E.bestDefAbility(e)}];STATE.q="";go("builder");});
}

/* ---------------- BUILDER ---------------- */
function renderTeambar(){
  teambar.classList.remove("hidden"); teambar.innerHTML="";
  for(let i=0;i<6;i++){const m=STATE.team[i];const d=document.createElement("div");d.className="slot"+(m?"":" empty");
    if(m){d.innerHTML=img(m.entry)+(i>0?`<button class="x" data-i="${i}">×</button>`:"");}else d.textContent="+";
    teambar.appendChild(d);}
  teambar.querySelectorAll(".x").forEach(b=>b.onclick=ev=>{ev.stopPropagation();STATE.team.splice(+b.dataset.i,1);renderBuilder();});
}
function needLabels(needs){const map={speed:"Speed control",redir:"Redirection",fakeout:"Fake Out",pivot:"Pivot",intimidate:"Intimidate",physical:"Physical attacker",special:"Special attacker",priority:"Priority"};return Object.entries(needs).filter(([k,v])=>v).map(([k])=>map[k]);}
function renderBuilder(){
  titleEl.textContent=`Team (${STATE.team.length}/6)`; backBtn.classList.remove("hidden");
  exportBtn.classList.toggle("hidden",STATE.team.length<2);
  renderTeambar();
  const tally=E.teamWeakTally(STATE.team);
  const danger=Object.entries(tally).filter(([t,v])=>v.count>=2||v.max>=4).map(([t])=>t);
  const needs=E.teamNeeds(STATE.team); const needL=needLabels(needs);
  const full=STATE.team.length>=6;
  // candidate scoring
  const teamNames=new Set(STATE.team.map(m=>m.entry.name));
  let cands=E.DEX.filter(e=>!teamNames.has(e.name)&&e.name.toLowerCase().includes(STATE.q.toLowerCase()))
    .map(e=>({e,s:E.scoreCandidate(e,STATE.team)})).sort((a,b)=>b.s.total-a.s.total);
  app.innerHTML=`
    <div class="card"><b>Team weaknesses</b>
      <div class="wk">${Object.entries(tally).sort((a,b)=>b[1].count-a[1].count||b[1].max-a[1].max).map(([t,v])=>`<span class="${v.max>=4?'x4':'x2'} ${v.count>=2?'stk':''}">${t} ${v.count>1?'×'+v.count:''}${v.max>=4?' (4×)':''}</span>`).join("")||'<span class="muted">none yet</span>'}</div>
      ${needL.length?`<div class="muted">Still missing:</div><div class="needs">${needL.map(n=>`<span class="need">${n}</span>`).join("")}</div>`:`<div class="muted good">All core needs covered ✓</div>`}
    </div>
    ${full?`<div class="card"><b>Team complete.</b> <button class="btn primary" id="exp2">Export paste</button></div>`:`
    <input class="search" id="q" placeholder="Filter candidates…" value="${STATE.q}">
    <div id="cands">${cands.slice(0,60).map(c=>candRow(c,danger)).join("")}</div>`}`;
  if(full){$("#exp2").onclick=showExport;return;}
  const q=$("#q"); q.oninput=()=>{STATE.q=q.value;const cn=$("#cands");let cs=E.DEX.filter(e=>!teamNames.has(e.name)&&e.name.toLowerCase().includes(STATE.q.toLowerCase())).map(e=>({e,s:E.scoreCandidate(e,STATE.team)})).sort((a,b)=>b.s.total-a.s.total);cn.innerHTML=cs.slice(0,60).map(c=>candRow(c,danger)).join("");bindCands();};
  bindCands();
}
function candRow(c,danger){
  const e=c.e,s=c.s; const cav=pranksterCaveat(e);
  const tags=[];
  if(e.moves.some(m=>E.SPEEDCTRL.includes(m)))tags.push(["Speed ctrl","good"]);
  if(e.moves.some(m=>E.REDIR.includes(m)))tags.push(["Redirect","good"]);
  if(e.moves.includes("Fake Out"))tags.push(["Fake Out","good"]);
  if(e.moves.some(m=>E.PIVOT.includes(m)))tags.push(["Pivot","good"]);
  if(e.moves.some(m=>E.PRIORITY.includes(m)))tags.push(["Priority","good"]);
  if((e.abilities||[]).includes("Intimidate"))tags.push(["Intimidate","good"]);
  if(e.mega&&e.mega.length)tags.push(["Mega",""]);
  if(s.weather)tags.push(["+"+s.weatherType,"good"]);
  s.covers.forEach(t=>tags.push(["covers "+t,"good"]));
  s.dangerStacks.forEach(t=>tags.push(["stacks "+t,"bad"]));
  return `<div class="candrow" data-n="${e.name}">${img(e)}
    <div class="meta"><div class="nm">${e.name} ${tbadges(e.types)}</div>
      <div class="tags">${tags.slice(0,6).map(([t,c])=>`<span class="tag ${c}">${t}</span>`).join("")}</div>
      <div class="brk">typing ${s.typing}/25 · stats ${s.stats}/20 · ability ${s.ability}/15 · cov ${s.cov}/30${s.weather?' · weather +'+s.weather:''}${cav?' · ⚠ caveat':''}</div></div>
    <div class="scorebadge"><b style="color:${s.total>=70?'var(--good)':s.total>=55?'var(--txt)':'var(--mut)'}">${s.total}</b><small>fit</small></div></div>`;
}
function bindCands(){app.querySelectorAll(".candrow").forEach(r=>r.onclick=()=>{const e=E.byName[r.dataset.n];STATE.team.push({entry:e,ability:E.bestDefAbility(e)});STATE.q="";renderBuilder();window.scrollTo(0,0);});}

/* ---------------- EXPORT ---------------- */
function showExport(){
  const paste=STATE.team.map(m=>{const e=m.entry;const ab=(e.abilities||[])[0]||"";return `${e.name} @ \nAbility: ${ab}\nLevel: 50\n- \n- \n- \n- `;}).join("\n\n");
  titleEl.textContent="Export"; backBtn.classList.remove("hidden"); exportBtn.classList.add("hidden");
  app.innerHTML=`<div class="card"><b>Team (${STATE.team.length})</b><div class="grid" style="margin-top:8px">${STATE.team.map(m=>`<div class="mon">${img(m.entry)}<div class="nm">${m.entry.name}</div></div>`).join("")}</div></div>
    <div class="card"><b>Showdown skeleton</b> <button class="btn" id="cp">Copy</button><pre class="paste" id="pst">${paste.replace(/</g,"&lt;")}</pre>
    <div class="muted">Items/moves/spreads left blank — fill from the role notes &amp; the dataset.</div></div>`;
  $("#cp").onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(paste);$("#cp").textContent="Copied ✓";};
  backBtn.onclick=()=>go("builder");
}

function render(){
  backBtn.onclick=()=>{ if(STATE.screen==="builder")go("role"); else if(STATE.screen==="role")go("start"); };
  if(STATE.screen==="start")renderStart();
  else if(STATE.screen==="role")renderRole();
  else if(STATE.screen==="builder")renderBuilder();
}
render();
