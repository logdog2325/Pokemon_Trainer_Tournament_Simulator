/* Champions Team Builder — UI */
'use strict';
const E = window.ENGINE;
const TCOL={Normal:"#9aa0aa",Fire:"#ff7043",Water:"#4d8cf5",Electric:"#f7c948",Grass:"#5cc46b",Ice:"#76d0d6",Fighting:"#e0533b",Poison:"#b061d6",Ground:"#dcae54",Flying:"#8fa9 f5".replace(" ",""),Psychic:"#ff6ea9",Bug:"#9bbb3a",Rock:"#caa552",Ghost:"#7d6bd1",Dragon:"#6a5cf0",Dark:"#6b6f86",Steel:"#7f9aae",Fairy:"#ff9ad1"};
const $=s=>document.querySelector(s), app=$("#app"), titleEl=$("#title"), backBtn=$("#back"), teambar=$("#teambar"), exportBtn=$("#exportBtn");
let STATE={screen:"start",lead:null,role:null,team:[],q:"",slotRole:null};
const BULK=e=>e.baseStats.hp+e.baseStats.def+e.baseStats.spd;
const SLOT_ROLES=[
 {key:"speed",label:"Speed control (Tailwind)",need:"speed",fill:e=>e.moves.includes("Tailwind")},
 {key:"trsetter",label:"Trick Room setter",fill:e=>e.moves.includes("Trick Room")},
 {key:"redir",label:"Redirection",need:"redir",fill:e=>e.moves.some(m=>E.REDIR.includes(m))},
 {key:"fakeout",label:"Fake Out",need:"fakeout",fill:e=>e.moves.includes("Fake Out")},
 {key:"intimidate",label:"Intimidate",need:"intimidate",fill:e=>(e.abilities||[]).includes("Intimidate")},
 {key:"physical",label:"Physical attacker",need:"physical",fill:e=>E.isPhysical(e)&&E.offense(e)>=100},
 {key:"special",label:"Special attacker",need:"special",fill:e=>!E.isPhysical(e)&&E.offense(e)>=100},
 {key:"priority",label:"Priority",need:"priority",fill:e=>e.moves.some(m=>E.PRIORITY.includes(m))},
 {key:"pivot",label:"Pivot",need:"pivot",fill:e=>e.moves.some(m=>E.PIVOT.includes(m))},
 {key:"weather",label:"Weather setter",fill:e=>(e.abilities||[]).some(a=>E.WEATHER_ABIL[a])},
 {key:"wall",label:"Bulky wall",fill:e=>BULK(e)>=290},
 {key:"any",label:"Best overall",fill:e=>true},
];

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
  app.innerHTML=`<button class="btn" id="imp" style="width:100%;margin-bottom:10px">📋 Import / paste a team</button>
    <input class="search" id="q" placeholder="Search ${E.DEX.length} Pokémon…" value="${STATE.q}">
    <div class="grid">${list.slice(0,400).map(e=>`<div class="mon" data-n="${e.name}">${img(e)}<div class="nm">${e.name}</div>${tbadges(e.types)}</div>`).join("")}</div>`;
  $("#imp").onclick=()=>go("import");
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
    <h3 style="margin:6px 2px">Possible roles — pick one (you get a suggested set to tweak)</h3>
    ${roles.map((r,i)=>{const set=E.recommendSet(e,r.key);return `<div class="card rolecard" data-i="${i}"><h3>${r.label}</h3><div class="muted">${r.note}</div>
      <div class="muted" style="margin-top:6px"><b>Item:</b> ${set.item} · <b>${set.nature}</b> · ${spreadStr(set.points)}</div>
      <div style="margin-top:4px">${set.moves.filter(Boolean).map(m=>moveChip(m)).join(" ")}</div></div>`;}).join("")}`;
  app.querySelectorAll(".rolecard").forEach(c=>c.onclick=()=>{STATE.role=roles[+c.dataset.i];STATE.team=[mkMember(e,roles[+c.dataset.i].key)];STATE.q="";go("builder");});
}

/* ---------------- BUILDER ---------------- */
function renderTeambar(){
  teambar.classList.remove("hidden"); teambar.innerHTML="";
  for(let i=0;i<6;i++){const m=STATE.team[i];const d=document.createElement("div");d.className="slot"+(m?"":" empty");d.dataset.i=i;
    if(m){d.innerHTML=img(m.entry)+`<button class="x" data-i="${i}">×</button>`;}else d.textContent="+";
    teambar.appendChild(d);}
  teambar.querySelectorAll(".slot").forEach(s=>s.onclick=()=>{const i=+s.dataset.i;if(STATE.team[i])openEditor(STATE.team[i],i);});
  teambar.querySelectorAll(".x").forEach(b=>b.onclick=ev=>{ev.stopPropagation();STATE.team.splice(+b.dataset.i,1);renderBuilder();});
}
function needLabels(needs){const map={speed:"Speed control",redir:"Redirection",fakeout:"Fake Out",pivot:"Pivot",intimidate:"Intimidate",physical:"Physical attacker",special:"Special attacker",priority:"Priority"};return Object.entries(needs).filter(([k,v])=>v).map(([k])=>map[k]);}
function weakCard(tally,needs){
  return `<div class="card"><b>Team weaknesses</b>
    <div class="wk">${Object.entries(tally).sort((a,b)=>b[1].count-a[1].count||b[1].max-a[1].max).map(([t,v])=>`<span class="${v.max>=4?'x4':'x2'} ${v.count>=2?'stk':''}">${t} ${v.count>1?'×'+v.count:''}${v.max>=4?' (4×)':''}</span>`).join("")||'<span class="muted">none yet</span>'}</div>
    ${needs?(()=>{const nl=needLabels(needs);return nl.length?`<div class="muted">Still missing:</div><div class="needs">${nl.map(n=>`<span class="need">${n}</span>`).join("")}</div>`:`<div class="muted good">All core needs covered ✓</div>`;})():""}</div>`;
}
function renderBuilder(){
  titleEl.textContent=`Team (${STATE.team.length}/6)`; backBtn.classList.remove("hidden");
  exportBtn.classList.toggle("hidden",STATE.team.length<2);
  renderTeambar();
  const tally=E.teamWeakTally(STATE.team);
  const danger=Object.entries(tally).filter(([t,v])=>v.count>=2||v.max>=4).map(([t])=>t);
  const needs=E.teamNeeds(STATE.team);
  if(STATE.team.length>=6){
    app.innerHTML=weakCard(tally,needs)+`<div class="card"><b>Team complete.</b> <button class="btn primary" id="exp2">Export</button></div>`;
    $("#exp2").onclick=showExport; return;
  }
  // STEP 1: choose what this slot does — driven by the role's needs plan (Phase 3) + threat map (Phase 4)
  if(!STATE.slotRole){
    const threats=E.archetypeThreats(STATE.lead);
    const threatCard=`<div class="card"><b>${STATE.lead.name} — threat map (Phase 4)</b><div class="muted">Loses to: ${threats.join(" · ")||"nothing major"}</div></div>`;
    const plan=E.planForLead(STATE.lead,STATE.role?STATE.role.key:"breaker");
    const planned=new Set(plan.map(p=>p[0]));
    const filledBy=k=>{const rd=SLOT_ROLES.find(r=>r.key===k);if(!rd)return false;return STATE.team.some(m=>{const ef=E.effOf(m);return rd.fill({types:ef.types,baseStats:ef.baseStats,abilities:ef.abilities,moves:(m.set&&m.set.moves)?m.set.moves.filter(Boolean):ef.moves});});};
    const planBtns=plan.map(([k,lab])=>{const done=filledBy(k);return `<button class="btn rolepick ${done?'':'primary'}" data-r="${k}">${done?'✓ ':''}${lab}</button>`;}).join("");
    const others=SLOT_ROLES.filter(r=>!planned.has(r.key)).map(r=>`<button class="btn rolepick" data-r="${r.key}">${r.label}</button>`).join("");
    app.innerHTML=threatCard+weakCard(tally,null)+
      `<div class="card"><b>Slot ${STATE.team.length+1} — the plan (Phase 3)</b>
        <div class="muted">Your ${STATE.role?STATE.role.label:'lead'} needs these. Pick one to fill (✓ = covered).</div>
        <div class="seg" style="flex-wrap:wrap;margin-top:10px">${planBtns}</div>
        <div class="muted" style="margin-top:10px">Other roles</div>
        <div class="seg" style="flex-wrap:wrap;margin-top:4px">${others}</div>
        ${STATE.team.length>=1?`<button class="btn" id="spd" style="width:100%;margin-top:8px">⚡ Speed tiers vs the meta</button>`:""}
        ${STATE.team.length>=3?`<button class="btn" id="stress" style="width:100%;margin-top:8px">Stress-test the team ▸ (Phase 6)</button>`:""}</div>`;
    app.querySelectorAll(".rolepick").forEach(b=>b.onclick=()=>{STATE.slotRole=b.dataset.r;STATE.q="";renderBuilder();window.scrollTo(0,0);});
    const st=$("#stress");if(st)st.onclick=()=>go("stress");
    const sp=$("#spd");if(sp)sp.onclick=()=>go("speed");
    return;
  }
  // STEP 2: candidates that fill the chosen role, scored vs the core
  const roleDef=SLOT_ROLES.find(r=>r.key===STATE.slotRole)||SLOT_ROLES[SLOT_ROLES.length-1];
  const teamNames=new Set(STATE.team.map(m=>m.entry.name));
  const score=()=>{const q=STATE.q.toLowerCase();return E.DEX.filter(e=>!teamNames.has(e.name)&&e.name.toLowerCase().includes(q)&&(q?true:roleDef.fill(e)))
    .map(e=>({e,s:E.scoreForSlot(e,STATE.team,STATE.slotRole)})).sort((a,b)=>b.s.total-a.s.total);};
  const cands=score();
  app.innerHTML=weakCard(tally,null)+
    `<div class="card"><div class="row"><b style="flex:1">Filling: ${roleDef.label} · ${cands.length} fit</b><button class="btn" id="chg">↺ Change</button></div></div>
     <input class="search" id="q" placeholder="Search ANY Pokémon to add it (ignores the role filter)…" value="${STATE.q}">
     <div id="cands">${cands.slice(0,50).map(c=>candRow(c,danger)).join("")||'<div class="card muted">No Pokémon fit this role.</div>'}</div>`;
  $("#chg").onclick=()=>{STATE.slotRole=null;STATE.q="";renderBuilder();window.scrollTo(0,0);};
  const q=$("#q"); q.oninput=()=>{STATE.q=q.value;$("#cands").innerHTML=score().slice(0,50).map(c=>candRow(c,danger)).join("");bindCands();};
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
  if(s.rank!=null)tags.push(["used #"+s.rank,""]);  // info only — usage rank does NOT affect the score
  return `<div class="candrow" data-n="${e.name}">${img(e)}
    <div class="meta"><div class="nm">${e.name} ${tbadges(e.types)}</div>
      <div class="tags">${tags.slice(0,6).map(([t,c])=>`<span class="tag ${c}">${t}</span>`).join("")}</div>
      <div class="brk">typing ${s.typing}/25 · role-fit ${s.exe!=null?s.exe:'–'}/40 · ability ${s.ability}/15${s.weather?' · weather +'+s.weather:''}${cav?' · ⚠ caveat':''}</div></div>
    <div class="scorebadge"><b style="color:${s.total>=70?'var(--good)':s.total>=55?'var(--txt)':'var(--mut)'}">${s.total}</b><small>fit</small></div></div>`;
}
function bindCands(){app.querySelectorAll(".candrow").forEach(r=>r.onclick=()=>{openEditor(mkMember(E.byName[r.dataset.n]),-1);});}

/* ---------------- EXPORT ---------------- */
function showExport(){
  const paste=E.exportPaste(STATE.team);
  titleEl.textContent="Export"; backBtn.classList.remove("hidden"); exportBtn.classList.add("hidden");
  app.innerHTML=`<div class="card"><b>Team (${STATE.team.length})</b><div class="grid" style="margin-top:8px">${STATE.team.map(m=>`<div class="mon">${img(m.entry)}<div class="nm">${m.entry.name}${m.formIndex>=0?' (Mega)':''}</div></div>`).join("")}</div></div>
    <div class="card"><b>Share</b> <button class="btn" id="share">🔗 Copy share link</button><div class="muted" id="shareInfo" style="margin-top:6px">A link that reopens this exact team.</div></div>
    <div class="card"><b>Set list</b> <button class="btn" id="cp">Copy</button><pre class="paste" id="pst">${paste.replace(/</g,"&lt;")}</pre></div>`;
  $("#cp").onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(paste);$("#cp").textContent="Copied ✓";};
  $("#share").onclick=()=>{const url=location.origin+location.pathname+"#t="+E.encodeTeam(STATE.team);navigator.clipboard&&navigator.clipboard.writeText(url);$("#share").textContent="Copied ✓";$("#shareInfo").textContent=url.length>90?url.slice(0,90)+"…":url;};
  backBtn.onclick=()=>go("builder");
}

/* ---------------- SET EDITOR ---------------- */
function spreadStr(p){const o=[["HP","hp"],["Atk","atk"],["Def","def"],["SpA","spa"],["SpD","spd"],["Spe","spe"]];const s=o.filter(([l,k])=>p[k]).map(([l,k])=>p[k]+" "+l).join(" / ");return s||"no investment";}
function moveChip(m){const i=E.moveInfo(m);const c=TCOL[i.t]||'#555';return `<span class="tag" style="background:${i.t?c+'33':'var(--card2)'};color:${i.t?'#fff':'var(--mut)'}">${m}</span>`;}
function mkMember(e,roleKey){roleKey=roleKey||((E.detectRoles(e)[0]||{key:"breaker"}).key);const set=E.recommendSet(e,roleKey);while(set.moves.length<4)set.moves.push("");return {entry:e,formIndex:(set.formIndex!=null?set.formIndex:-1),roleKey,set};}
function openEditor(member,slotIndex){const m={entry:member.entry,formIndex:(member.formIndex==null?-1:member.formIndex),roleKey:member.roleKey,set:JSON.parse(JSON.stringify(member.set))};while(m.set.moves.length<4)m.set.moves.push("");STATE.editing={member:m,slotIndex};go("editor");}
function effForm(M){const e=M.entry;if(M.formIndex>=0&&e.mega&&e.mega[M.formIndex]&&e.mega[M.formIndex].baseStats){const mg=e.mega[M.formIndex];return {types:mg.type||e.types,baseStats:mg.baseStats,ability:mg.ability,isMega:true,label:mg.label||"Mega"};}return {types:e.types,baseStats:e.baseStats,ability:M.set.ability,isMega:false,label:"Base"};}
function moveOpt(name,sel){const i=E.moveInfo(name);const tag=i.t?` (${i.t}·${i.c}${i.bp?'·'+i.bp:''})`:'';return `<option value="${name}" ${name===sel?'selected':''}>${name}${tag}</option>`;}
function renderEditor(){
  const M=STATE.editing.member,e=M.entry,ef=effForm(M);
  titleEl.textContent=e.name;backBtn.classList.remove("hidden");exportBtn.classList.add("hidden");teambar.classList.add("hidden");
  const total=Object.values(M.set.points).reduce((a,b)=>a+(+b||0),0);
  const megaBtns=e.mega&&e.mega.length?`<div class="formsel"><button class="btn ${!ef.isMega?'active':''}" data-f="-1">Base</button>${e.mega.map((mg,i)=>`<button class="btn ${M.formIndex===i?'active':''}" data-f="${i}">${mg.label||'Mega'}</button>`).join("")}</div>`:"";
  const ms=[...e.moves].sort();
  const itemOpts=E.ITEMS.concat(ef.isMega&&e.megaStones?e.megaStones:[]).filter((v,i,a)=>a.indexOf(v)===i);
  app.innerHTML=`
    <div class="card"><div class="row">${img(e)}<div style="flex:1">${tbadges(ef.types)}
      <div class="muted" style="margin-top:4px">${ef.isMega?'Ability: '+ef.ability+' (Mega)':''}</div></div></div>
      ${megaBtns}${statBars(ef.baseStats)}</div>
    <div class="card">
      ${ef.isMega?'':`<div class="field"><label>Ability</label><select id="ab">${(e.abilities||[]).map(a=>`<option ${a===M.set.ability?'selected':''}>${a}</option>`).join("")}</select></div>`}
      <div class="field"><label>Item${ef.isMega?' — Mega Stone needed to evolve':''}</label><select id="it">${itemOpts.map(it=>`<option ${it===M.set.item?'selected':''}>${it}</option>`).join("")}</select></div>
      <div class="field"><label>Nature</label><select id="na">${E.NATURES.map(n=>`<option ${n===M.set.nature?'selected':''}>${n}</option>`).join("")}</select></div>
      <div class="field"><label>Moves</label>${[0,1,2,3].map(i=>`<select class="mv" data-i="${i}" style="margin-bottom:5px"><option value="">— empty —</option>${ms.map(m=>moveOpt(m,M.set.moves[i])).join("")}</select>`).join("")}</div>
      <div class="field"><label>Stat points — <span class="total" id="tot" style="color:${total>66?'var(--bad)':'var(--good)'}">${total}/66</span> · max 32 each</label>
        <div class="sp">${[["HP","hp"],["Atk","atk"],["Def","def"],["SpA","spa"],["SpD","spd"],["Spe","spe"]].map(([l,k])=>`<div class="field"><label>${l}</label><input type="number" class="pt" data-k="${k}" min="0" max="32" value="${M.set.points[k]||0}"></div>`).join("")}</div></div>
      <button class="btn primary" id="save" style="width:100%">${STATE.editing.slotIndex<0?'Add to team':'Save changes'}</button>
    </div>`;
  app.querySelectorAll(".formsel button").forEach(b=>b.onclick=()=>{const f=+b.dataset.f;M.formIndex=f;if(f>=0&&e.megaStones){M.set.item=e.megaStones[f]||e.megaStones[0];}else{M.set.item=E.recommendSet(e,M.roleKey).item;}renderEditor();});
  const ab=$("#ab");if(ab)ab.onchange=()=>M.set.ability=ab.value;
  $("#it").onchange=()=>M.set.item=$("#it").value;
  $("#na").onchange=()=>M.set.nature=$("#na").value;
  app.querySelectorAll(".mv").forEach(s=>s.onchange=()=>M.set.moves[+s.dataset.i]=s.value);
  app.querySelectorAll(".pt").forEach(inp=>inp.oninput=()=>{const v=Math.max(0,Math.min(32,+inp.value||0));M.set.points[inp.dataset.k]=v;const t=Object.values(M.set.points).reduce((a,b)=>a+(+b||0),0);const tt=$("#tot");tt.textContent=t+"/66";tt.style.color=t>66?'var(--bad)':'var(--good)';});
  $("#save").onclick=()=>{const si=STATE.editing.slotIndex;if(si<0){STATE.team.push(M);STATE.slotRole=null;}else STATE.team[si]=M;STATE.q="";go("builder");};
}
/* ---------------- STRESS TEST (Phase 6) + LEGALITY (Phase 7) ---------------- */
function renderStress(){
  titleEl.textContent="Stress test"; backBtn.classList.remove("hidden"); exportBtn.classList.add("hidden"); teambar.classList.add("hidden");
  const res=E.stressTest(STATE.team); const dups=E.itemClause(STATE.team); const off=E.teamOffense(STATE.team);
  const speciesUnique=new Set(STATE.team.map(m=>m.entry.name)).size===STATE.team.length;
  app.innerHTML=`
    <div class="card"><b>Phase 6 — vs the meta archetypes</b>
      ${res.map(r=>`<div class="row" style="margin:7px 0"><span style="width:26px;font-size:18px">${r.ok?'✅':'⚠️'}</span><div><b>${r.a}</b><div class="muted">${r.ok?'Covered — '+r.why:'Risky — no '+r.why}</div></div></div>`).join("")}</div>
    <div class="card"><b>Offensive coverage</b>
      <div class="muted">Attacking types: ${off.atk.join(", ")||"none yet"}</div>
      <div class="muted" style="margin-top:4px">Hits super-effectively: <b style="color:${off.se.length>=12?'var(--good)':'var(--txt)'}">${off.se.length}/18</b> types</div>
      ${off.gaps.length?`<div class="wk" style="margin-top:6px">${off.gaps.map(t=>`<span class="x2">${t}</span>`).join("")}</div><div class="muted">↑ resisted by your whole team — coverage holes a wall of these types exploits.</div>`:`<div class="muted good" style="margin-top:4px">No type resists your entire team ✓</div>`}</div>
    <div class="card"><b>Phase 7 — legality</b>
      <div class="row" style="margin:7px 0"><span style="width:26px;font-size:18px">${dups.length?'⚠️':'✅'}</span><div>Item Clause${dups.length?': duplicate items — '+dups.join(", "):' — all items unique'}</div></div>
      <div class="row" style="margin:7px 0"><span style="width:26px;font-size:18px">${speciesUnique?'✅':'⚠️'}</span><div>Species Clause — ${speciesUnique?'all unique':'DUPLICATE species'}</div></div>
      <div class="muted">Megas: you may carry several stones but evolve only one per battle.</div></div>`;
  backBtn.onclick=()=>go("builder");
}
/* ---------------- SPEED TIERS ---------------- */
function speedRow(r){
  return `<div class="row" style="padding:5px 8px;border-radius:8px;margin:1px 0;${r.mine?'background:var(--card2);outline:1px solid var(--accent)':''}">
    <b style="width:40px;text-align:right;color:${r.mine?'var(--accent)':'var(--txt)'}">${r.spe}</b>
    <div style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;${r.mine?'font-weight:700':''}">${r.name} ${r.rank?`<span class="muted" style="font-size:10px">#${r.rank}</span>`:''}</div>
    <div class="tags">${(r.tags||[]).map(t=>`<span class="tag">${t}</span>`).join("")}</div></div>`;
}
function renderSpeed(){
  titleEl.textContent="Speed tiers"; backBtn.classList.remove("hidden"); exportBtn.classList.add("hidden"); teambar.classList.add("hidden");
  STATE.spd=STATE.spd||{tailwind:false,trickRoom:false};
  const {rows,weather}=E.speedRows(STATE.team,{tailwind:STATE.spd.tailwind,trickRoom:STATE.spd.trickRoom});
  const chip=(on,lab,key)=>`<button class="btn ${on?'primary':''}" data-k="${key}">${lab}</button>`;
  app.innerHTML=`
    <div class="card"><div class="muted">Your team (highlighted) placed against the meta at its most-common spreads — Level 50${weather?', '+weather+' up':''}. Choice Scarf and weather-speed abilities are auto-applied.${STATE.spd.trickRoom?' <b>Trick Room:</b> top of the list moves FIRST.':''}</div>
      <div class="seg" style="margin-top:10px">${chip(STATE.spd.tailwind,'My Tailwind ×2',"tailwind")}${chip(STATE.spd.trickRoom,'Trick Room',"trickRoom")}</div></div>
    <div class="card" style="padding:6px">${rows.map(speedRow).join("")||'<div class="muted">Add a Pokémon first.</div>'}</div>`;
  app.querySelectorAll(".seg button").forEach(b=>b.onclick=()=>{STATE.spd[b.dataset.k]=!STATE.spd[b.dataset.k];renderSpeed();});
  backBtn.onclick=()=>go("builder");
}
/* ---------------- IMPORT ---------------- */
function renderImport(){
  titleEl.textContent="Import team"; backBtn.classList.remove("hidden"); exportBtn.classList.add("hidden"); teambar.classList.add("hidden");
  app.innerHTML=`
    <div class="card"><div class="muted">Paste a Showdown export / pokepaste text — or a pokepast.es link — to load and analyse a full team. Showdown EVs are converted to Champions points.</div>
      <textarea id="pastein" style="width:100%;height:180px;margin-top:10px;background:var(--card2);color:var(--txt);border:1px solid var(--line);border-radius:8px;padding:10px;font:12px/1.4 ui-monospace,monospace" placeholder="Tauros-Paldea-Aqua @ ...&#10;Ability: Intimidate&#10;- Close Combat&#10;...&#10;&#10;or  https://pokepast.es/abc123def456..."></textarea>
      <button class="btn primary" id="load" style="width:100%;margin-top:8px">Load team</button>
      <div class="muted" id="impmsg" style="margin-top:8px"></div></div>`;
  $("#load").onclick=async()=>{
    let text=$("#pastein").value.trim(); const msg=$("#impmsg");
    if(!text){msg.textContent="Paste a team first.";return;}
    const urlm=text.match(/https?:\/\/pokepast\.es\/[0-9a-f]+/i);
    if(urlm){msg.textContent="Fetching pokepaste…";try{const r=await fetch(urlm[0].replace(/\/raw$/,"")+"/raw");text=await r.text();}catch(e){msg.textContent="Couldn't fetch that link (network/CORS). Paste the text instead.";return;}}
    const team=E.parsePaste(text);
    if(!team.length){msg.textContent="No Pokémon recognised. Check the species names.";return;}
    STATE.team=team.slice(0,6); STATE.lead=team[0].entry; STATE.role=null; STATE.slotRole=null; STATE.q="";
    go("builder");
  };
  backBtn.onclick=()=>go("start");
}
function render(){
  backBtn.onclick=()=>{ if(STATE.screen==="builder")go("role"); else if(STATE.screen==="role"||STATE.screen==="import")go("start"); else if(STATE.screen==="editor"||STATE.screen==="stress"||STATE.screen==="speed")go("builder"); };
  if(STATE.screen==="import")renderImport();
  else if(STATE.screen==="start")renderStart();
  else if(STATE.screen==="role")renderRole();
  else if(STATE.screen==="builder")renderBuilder();
  else if(STATE.screen==="editor")renderEditor();
  else if(STATE.screen==="stress")renderStress();
  else if(STATE.screen==="speed")renderSpeed();
}
// open a shared team from the URL (#t=...), if present
(function bootFromHash(){
  const m=(location.hash||"").match(/[#&]t=([^&]+)/);
  if(m){const t=E.decodeTeam(decodeURIComponent(m[1]));if(t&&t.length){STATE.team=t.slice(0,6);STATE.lead=t[0].entry;STATE.screen="builder";}
    try{history.replaceState(null,"",location.pathname);}catch(e){}}
})();
render();
