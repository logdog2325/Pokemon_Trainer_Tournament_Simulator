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
 {key:"antiintim",label:"Anti-Intimidate (Defiant/Competitive)",fill:e=>(e.abilities||[]).some(a=>E.ANTI_INTIM.includes(a))},
 {key:"physical",label:"Physical attacker",need:"physical",fill:e=>E.isPhysical(e)&&E.offense(e)>=100},
 {key:"special",label:"Special attacker",need:"special",fill:e=>!E.isPhysical(e)&&E.offense(e)>=100},
 {key:"priority",label:"Priority",need:"priority",fill:e=>e.moves.some(m=>E.PRIORITY.includes(m))},
 {key:"pivot",label:"Pivot",need:"pivot",fill:e=>e.moves.some(m=>E.PIVOT.includes(m))},
 {key:"weather",label:"Weather setter",fill:e=>(e.abilities||[]).some(a=>E.WEATHER_ABIL[a])},
 {key:"wall",label:"Bulky wall",fill:e=>BULK(e)>=290},
 {key:"any",label:"Best overall",fill:e=>true},
];

function img(e){return `<img loading="lazy" src="${e.spritePrimary||e.spriteFallback}" onerror="this.onerror=null;this.src='${e.spriteFallback}'" alt="${e.name}">`;}
// form-aware sprite: Mega art when a Mega form is selected, falling back to the base sprite
function megaSpriteOf(e,fi){return (fi>=0&&e.mega&&e.mega[fi]&&e.mega[fi].sprite)||e.spritePrimary||e.spriteFallback;}
function imgF(e,fi){return `<img loading="lazy" src="${megaSpriteOf(e,fi)}" onerror="this.onerror=null;this.src='${e.spriteFallback}'" alt="${e.name}">`;}
// best recommended set for a specific form (Mega index >=0, or base)
function formSet(e,fi){
  if(fi>=0) return E.recommendSet(e,"mega"+fi);
  const meta=E.recommendSet(e,"meta"); if(meta&&meta.formIndex<0&&E.usageOf(e)) return meta;
  const roles=E.detectRoles(e).filter(r=>r.key!=="meta"&&!/^mega/.test(r.key));
  return E.recommendSet(e,roles[0]?roles[0].key:"breaker");
}
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
function bindMons(){app.querySelectorAll(".mon").forEach(m=>m.onclick=()=>{STATE.lead=E.byName[m.dataset.n];STATE.role=null;STATE.team=[];STATE.q="";STATE.roleForm=null;go("role");});}

/* ---------------- ROLE ---------------- */
function statBars(s){const order=[["HP","hp"],["Atk","atk"],["Def","def"],["SpA","spa"],["SpD","spd"],["Spe","spe"]];return `<div class="statbars">${order.map(([l,k])=>`<div><span class="lab">${l}</span><span class="bar"><i style="width:${Math.min(100,s[k]/2)}%"></i></span><span style="width:30px;text-align:right">${s[k]}</span></div>`).join("")}</div>`;}
// view of a chosen form: types/stats/ability/weaknesses (base when fi<0, else Mega fi)
function formView(e,fi){
  if(fi>=0&&e.mega&&e.mega[fi]){const mg=e.mega[fi];const ability=mg.ability,types=mg.type||e.types;
    return {types,baseStats:mg.baseStats,ability,isMega:true,label:mg.label||"Mega",weak:E.weaknessesOf({types,abilities:[ability],baseStats:mg.baseStats},ability)};}
  return {types:e.types,baseStats:e.baseStats,ability:(e.abilities||[])[0],isMega:false,label:"Base",weak:E.weaknessesOf(e)};
}
function renderRole(){
  const e=STATE.lead; titleEl.textContent=e.name; backBtn.classList.remove("hidden"); exportBtn.classList.add("hidden"); teambar.classList.add("hidden");
  const roles=E.detectRoles(e); const cav=pranksterCaveat(e);
  const forms=[...new Set(roles.map(r=>r._form))];               // forms that actually have sets
  if(STATE.roleForm==null || !forms.includes(STATE.roleForm)) STATE.roleForm=roles[0]._form;  // default to the top role's form
  const fi=STATE.roleForm, fv=formView(e,fi);
  // Base / Mega / Mega X / Mega Y … toggle (only when this mon Mega-Evolves)
  let formBtns="";
  if(e.mega&&e.mega.length){
    const order=[-1].concat(e.mega.map((m,i)=>i)).filter(f=>forms.includes(f));
    formBtns=`<div class="formsel" style="margin-bottom:10px">`+order.map(f=>`<button class="btn ${f===fi?'active':''}" data-rf="${f}">${f<0?"Base":(e.mega[f].label||"Mega")}</button>`).join("")+`</div>`;
  }
  const shown=roles.map((r,i)=>({r,i})).filter(x=>x.r._form===fi);
  app.innerHTML=`${formBtns}
    <div class="card"><div class="row">${imgF(e,fi)}<div style="flex:1">${tbadges(fv.types)}
      <div class="muted" style="margin-top:4px">${fv.isMega?fv.label+' · '+fv.ability:(e.abilities||[]).join(", ")}</div></div></div>
      ${statBars(fv.baseStats)}
      ${e.transformedStats&&fi<0?`<div class="muted" style="margin-top:6px">⚡ Transforms: ${Object.values(e.transformedStats).join("/")} (${(e.tags||[]).join(", ")})</div>`:""}
      <div class="wk">${fv.weak.weak.map(([t,m])=>`<span class="${m>=4?'x4':'x2'}">${t} ×${m}</span>`).join("")}
        ${fv.weak.imm.map(t=>`<span style="background:#143a2c;color:#3ad29f">${t} immune</span>`).join("")}</div>
      ${cav?`<div class="muted" style="color:#ffd9a0">⚠ ${cav}</div>`:""}</div>
    <h3 style="margin:6px 2px">${fv.isMega?fv.label+" sets":"Possible roles"} — pick one (you get a suggested set to tweak)</h3>
    ${shown.map(({r,i})=>{const set=E.recommendSet(e,r.key);return `<div class="card rolecard" data-i="${i}"><h3>${r.label}</h3><div class="muted">${r.note}</div>
      <div class="muted" style="margin-top:6px"><b>Item:</b> ${set.item} · <b>${set.nature}</b> · ${spreadStr(set.points)}</div>
      <div style="margin-top:4px">${set.moves.filter(Boolean).map(m=>moveChip(m)).join(" ")}</div></div>`;}).join("")}`;
  app.querySelectorAll("[data-rf]").forEach(b=>b.onclick=()=>{STATE.roleForm=+b.dataset.rf;renderRole();window.scrollTo(0,0);});
  app.querySelectorAll(".rolecard").forEach(c=>c.onclick=()=>{STATE.role=roles[+c.dataset.i];STATE.team=[mkMember(e,roles[+c.dataset.i].key)];STATE.q="";STATE.roleForm=null;go("builder");});
}

/* ---------------- BUILDER ---------------- */
function renderTeambar(){
  teambar.classList.remove("hidden"); teambar.innerHTML="";
  for(let i=0;i<6;i++){const m=STATE.team[i];const d=document.createElement("div");d.className="slot"+(m?"":" empty");d.dataset.i=i;
    if(m){d.innerHTML=imgF(m.entry,m.formIndex)+`<button class="x" data-i="${i}">×</button>`;}else d.textContent="+";
    teambar.appendChild(d);}
  teambar.querySelectorAll(".slot").forEach(s=>s.onclick=()=>{const i=+s.dataset.i;if(STATE.team[i])openEditor(STATE.team[i],i);});
  teambar.querySelectorAll(".x").forEach(b=>b.onclick=ev=>{ev.stopPropagation();STATE.team.splice(+b.dataset.i,1);renderBuilder();});
}
function needLabels(needs){const map={speed:"Speed control",redir:"Redirection",fakeout:"Fake Out",pivot:"Pivot",intimidate:"Intimidate",physical:"Physical attacker",special:"Special attacker",priority:"Priority"};return Object.entries(needs).filter(([k,v])=>v).map(([k])=>map[k]);}
function healthCard(team){
  if(!team.length)return"";
  const h=E.teamHealth(team);
  const col=h.score>=82?'var(--good)':h.score>=52?'#ffd9a0':'var(--bad)';
  const flags=h.flags.slice(0,5).map(f=>`<span class="wk"><span class="${f.sev>=2?'x4':f.sev>=1?'x2':''}" style="${f.sev<1?'background:#3a2a14;color:#ffd9a0':''}">${f.msg}</span></span>`).join("");
  const ML={tailwind:"Tailwind",trickroom:"Trick Room",priority:"Priority offense",none:"⚠ no speed plan",open:""};
  const arche=team.length>=2&&ML[h.mode]?`<span class="tag good">${ML[h.mode]}</span>`:"";
  return `<div class="card"><div class="row"><div style="flex:1"><b>Team Health</b> ${arche}<div class="muted">Reg M-B synergy · live as you build</div></div>
    <div class="scorebadge"><b style="font-size:30px;color:${col}">${h.score}</b><small>${h.grade}</small></div></div>
    ${h.flags.length?`<div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px">${flags}</div>`:`<div class="muted good" style="margin-top:4px">No red flags ✓</div>`}</div>`;
}
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
    app.innerHTML=healthCard(STATE.team)+weakCard(tally,needs)+`<div class="card"><b>Team complete.</b>
      <div class="seg" style="margin-top:10px;flex-wrap:wrap"><button class="btn primary" id="exp2">Export / Share</button><button class="btn" id="spd6">⚡ Speed</button><button class="btn" id="calc6">🧮 Calc</button><button class="btn" id="opt6">🎯 Optimize</button><button class="btn" id="stress6">Stress test</button></div></div>`;
    $("#exp2").onclick=showExport; $("#spd6").onclick=()=>go("speed"); $("#calc6").onclick=()=>go("calc"); $("#opt6").onclick=()=>go("optimize"); $("#stress6").onclick=()=>go("stress"); return;
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
    app.innerHTML=healthCard(STATE.team)+threatCard+weakCard(tally,null)+
      `<div class="card"><b>Slot ${STATE.team.length+1} — the plan (Phase 3)</b>
        <div class="muted">Your ${STATE.role?STATE.role.label:'lead'} needs these. Pick one to fill (✓ = covered).</div>
        <div class="seg" style="flex-wrap:wrap;margin-top:10px">${planBtns}</div>
        <div class="muted" style="margin-top:10px">Other roles</div>
        <div class="seg" style="flex-wrap:wrap;margin-top:4px">${others}</div>
        ${STATE.team.length>=1?`<button class="btn" id="spd" style="width:100%;margin-top:8px">⚡ Speed tiers vs the meta</button>`:""}
        ${STATE.team.length>=1?`<button class="btn" id="calc" style="width:100%;margin-top:8px">🧮 Damage calc</button>`:""}
        ${STATE.team.length>=1?`<button class="btn" id="opt" style="width:100%;margin-top:8px">🎯 Point optimizer (outspeed / survive)</button>`:""}
        ${STATE.team.length>=3?`<button class="btn" id="stress" style="width:100%;margin-top:8px">Stress-test the team ▸ (Phase 6)</button>`:""}</div>`;
    app.querySelectorAll(".rolepick").forEach(b=>b.onclick=()=>{STATE.slotRole=b.dataset.r;STATE.q="";renderBuilder();window.scrollTo(0,0);});
    const st=$("#stress");if(st)st.onclick=()=>go("stress");
    const sp=$("#spd");if(sp)sp.onclick=()=>go("speed");
    const cl=$("#calc");if(cl)cl.onclick=()=>go("calc");
    const op=$("#opt");if(op)op.onclick=()=>go("optimize");
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
  return `<div class="candrow" data-n="${e.name}">${img(e)}
    <div class="meta"><div class="nm">${e.name} ${tbadges(e.types)}</div>
      <div class="tags">${tags.slice(0,6).map(([t,c])=>`<span class="tag ${c}">${t}</span>`).join("")}</div>
      <div class="brk">role-fit ${s.exe!=null?s.exe:'–'}/40 · typing ${s.typing}/25${s.synergy?' · synergy '+(s.synergy>0?'+':'')+s.synergy:''}${s.enab?' · core +'+s.enab:''}${s.spd<0?' · ⚠ off-speed '+s.spd:''}${cav?' · ⚠ caveat':''}</div></div>
    <div class="scorebadge"><b style="color:${s.total>=70?'var(--good)':s.total>=55?'var(--txt)':'var(--mut)'}">${s.total}</b><small>fit</small></div></div>`;
}
function bindCands(){app.querySelectorAll(".candrow").forEach(r=>r.onclick=()=>{openEditor(mkMember(E.byName[r.dataset.n]),-1);});}

/* ---------------- EXPORT ---------------- */
function showExport(){
  const paste=E.exportPaste(STATE.team);
  titleEl.textContent="Export"; backBtn.classList.remove("hidden"); exportBtn.classList.add("hidden");
  app.innerHTML=`<div class="card"><b>Team (${STATE.team.length})</b><div class="grid" style="margin-top:8px">${STATE.team.map(m=>`<div class="mon">${imgF(m.entry,m.formIndex)}<div class="nm">${m.entry.name}${m.formIndex>=0?' (Mega)':''}</div></div>`).join("")}</div></div>
    <div class="card"><b>Share</b> <button class="btn" id="share">🔗 Copy link</button> <button class="btn" id="imgbtn">🖼️ Team image</button><div class="muted" id="shareInfo" style="margin-top:6px">A link reopens this exact team. The image is a shareable team sheet.</div></div>
    <div class="card"><b>Set list</b> <button class="btn" id="cp">Copy</button><pre class="paste" id="pst">${paste.replace(/</g,"&lt;")}</pre></div>`;
  $("#cp").onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(paste);$("#cp").textContent="Copied ✓";};
  $("#share").onclick=()=>{const url=location.origin+location.pathname+"#t="+E.encodeTeam(STATE.team);navigator.clipboard&&navigator.clipboard.writeText(url);$("#share").textContent="Copied ✓";$("#shareInfo").textContent=url.length>90?url.slice(0,90)+"…":url;};
  $("#imgbtn").onclick=()=>teamImage();
  backBtn.onclick=()=>go("builder");
}
// render a clean, sprite-free (CORS-safe) team-sheet PNG and download it
function teamImage(){
  const W=720, rowH=92, H=70+STATE.team.length*rowH+20, c=document.createElement("canvas"); c.width=W; c.height=H;
  const x=c.getContext("2d");
  x.fillStyle="#15172e"; x.fillRect(0,0,W,H);
  x.fillStyle="#e9eaf6"; x.font="bold 24px system-ui,sans-serif"; x.fillText("Champions Team",20,40);
  const h=E.teamHealth(STATE.team); x.fillStyle="#9aa0c8"; x.font="14px system-ui,sans-serif";
  x.fillText((E.archetypeChecklist(STATE.team).arche)+"  ·  Health "+h.score+" "+h.grade,20,60);
  STATE.team.forEach((m,i)=>{
    const y=72+i*rowH, ef=E.effOf(m);
    x.fillStyle="#1a1c34"; x.fillRect(16,y,W-32,rowH-10);
    // type chips
    let tx=28; (ef.types||m.entry.types).forEach(t=>{const w=x.measureText(t).width+16;x.fillStyle=TCOL[t]||"#888";x.fillRect(tx,y+12,w,18);x.fillStyle="#0b0d1f";x.font="bold 11px system-ui";x.fillText(t.toUpperCase(),tx+8,y+25);tx+=w+6;});
    x.fillStyle="#e9eaf6"; x.font="bold 18px system-ui"; x.fillText(m.entry.name+(m.formIndex>=0?" ("+(m.entry.mega&&m.entry.mega[m.formIndex]&&m.entry.mega[m.formIndex].label||"Mega")+")":""),28,y+50);
    x.fillStyle="#9aa0c8"; x.font="13px system-ui"; x.fillText("@ "+(m.set.item||"—")+"  ·  "+m.set.nature,28,y+70);
    const mv=(m.set.moves||[]).filter(Boolean).join(" / "); x.font="13px system-ui"; x.fillStyle="#c7cbe8";
    x.fillText(mv.length>62?mv.slice(0,62)+"…":mv,360,y+50);
  });
  c.toBlob(b=>{const u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download="champions-team.png";a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);$("#imgbtn").textContent="Saved ✓";});
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
    <div class="card"><div class="row">${imgF(e,M.formIndex)}<div style="flex:1">${tbadges(ef.types)}
      <div class="muted" style="margin-top:4px">${ef.isMega?ef.label+' · Ability: '+ef.ability:''}</div></div></div>
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
  // tapping Base <-> Mega loads that form's recommended set (moves/item/nature/spread) and art
  app.querySelectorAll(".formsel button").forEach(b=>b.onclick=()=>{const f=+b.dataset.f;M.formIndex=f;
    const ns=formSet(e,f);
    if(ns){M.set={ability:ns.ability,item:ns.item,nature:ns.nature,points:Object.assign({},ns.points),moves:(ns.moves||[]).slice()};while(M.set.moves.length<4)M.set.moves.push("");}
    renderEditor();});
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
  const ta=E.threatAnswers(STATE.team), wc=E.winConRealism(STATE.team), ck=E.archetypeChecklist(STATE.team);
  const taOk=ta.rows.filter(r=>r.answered).length;
  app.innerHTML=`
    <div class="card"><b>Archetype skeleton — ${ck.arche}</b> <span class="muted">(${ck.complete}/${ck.total})</span>
      ${ck.items.map(i=>`<div class="row" style="margin:4px 0"><span style="width:22px">${i.ok?'✅':'⬜'}</span><div class="${i.ok?'':'muted'}">${i.label}</div></div>`).join("")}</div>
    <div class="card"><b>Meta threat answers</b> <span class="muted">(a switch-in that survives a hit)</span>
      <div class="muted" style="margin-top:4px">Answers <b style="color:${taOk>=ta.rows.length-1?'var(--good)':taOk>=ta.rows.length-4?'#ffd9a0':'var(--bad)'}">${taOk}/${ta.rows.length}</b> of the Reg M-B meta's top attackers.</div>
      <div style="margin-top:6px">${ta.rows.map(r=>`<div class="row" style="margin:3px 0"><span style="width:22px">${r.answered?'✅':'⚠️'}</span><div style="flex:1">${r.name}</div><div class="muted" style="font-size:11px">${r.answered?r.by+' takes '+r.margin+'%':'no safe switch-in'}</div></div>`).join("")}</div></div>
    <div class="card"><b>Win-condition power</b> <span class="muted">(% of the meta it OHKO/2HKOs)</span>
      ${wc.wins.length?wc.wins.slice(0,4).map(w=>`<div class="row" style="margin:5px 0"><b style="width:46px;color:${w.frac>=70?'var(--good)':w.frac>=45?'#ffd9a0':'var(--bad)'}">${w.frac}%</b><div>${w.name}</div></div>`).join(""):`<div class="muted">Add an attacker.</div>`}
      <div class="muted" style="margin-top:4px">Computed in your team's state (weather applied). A real win-con clears ≥60% of the meta.</div></div>
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
    <div style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;${r.mine?'font-weight:700':''}">${r.name}</div>
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
/* ---------------- DAMAGE CALC ---------------- */
function calcDefenders(){
  const list=STATE.team.map((m,i)=>({key:"team:"+i,label:m.entry.name+(m.formIndex>=0?" (Mega)":"")+" — yours",member:m}));
  const seen=new Set(STATE.team.map(m=>m.entry.name));
  E.metaBenchmarks(30).forEach(b=>{if(seen.has(b.name))return;seen.add(b.name);const mem=E.benchMember(b.name);if(mem)list.push({key:"meta:"+b.name,label:b.name+(mem.formIndex>=0?" (Mega)":""),member:mem});});
  return list;
}
function renderCalc(){
  titleEl.textContent="Damage calc"; backBtn.classList.remove("hidden"); exportBtn.classList.add("hidden"); teambar.classList.add("hidden");
  if(!STATE.team.length){app.innerHTML=`<div class="card muted">Add a Pokémon first.</div>`;backBtn.onclick=()=>go("builder");return;}
  const C=STATE.calc=STATE.calc||{attIdx:0,move:null,defKey:null,weather:null,spread:false,intimidate:false,burn:false,atkStage:0};
  if(C.attIdx>=STATE.team.length)C.attIdx=0;
  const att=STATE.team[C.attIdx];
  const moves=(att.set.moves||[]).filter(m=>{const i=E.moveInfo(m);return m&&(i.c==="Phys"||i.c==="Spec")&&i.bp;});
  if(!moves.includes(C.move))C.move=moves[0]||null;
  const defs=calcDefenders();
  if(!defs.find(d=>d.key===C.defKey))C.defKey=defs.find(d=>!d.key.startsWith("team:"+C.attIdx))?.key||defs[0].key;
  if(C.weather===null)C.weather=E.teamWeather(STATE.team)||"";
  const def=defs.find(d=>d.key===C.defKey).member;
  const res=C.move?E.calcDamage(att,C.move,def,{weather:C.weather,spread:C.spread,intimidate:C.intimidate,burn:C.burn,atkStage:C.atkStage}):null;
  const opt=(v,sel,lab)=>`<option value="${v}" ${v===sel?'selected':''}>${lab||v}</option>`;
  const tog=(on,lab,key)=>`<button class="btn ${on?'primary':''}" data-tog="${key}">${lab}</button>`;
  let resHtml='<div class="muted">Pick a damaging move.</div>';
  if(res&&res.immune)resHtml=`<b style="color:var(--good)">Immune</b> — ${def.entry.name} takes 0 from ${C.move} (${res.type}).`;
  else if(res){const col=res.minPct>=100?'var(--good)':res.maxPct>=100?'#ffd9a0':res.minPct>=50?'#ffd9a0':'var(--bad)';
    resHtml=`<div style="font-size:26px;font-weight:800;color:${col}">${res.minPct}–${res.maxPct}%</div>
      <div style="font-weight:700;color:${col}">${res.ko}</div>
      <div class="muted" style="margin-top:4px">${res.min}–${res.max} dmg of ${res.hp} HP · ${C.move} ×${res.eff} effective</div>`;}
  app.innerHTML=`
    <div class="card"><div class="field"><label>Attacker (your team)</label><select id="att">${STATE.team.map((m,i)=>opt(i,C.attIdx,m.entry.name+(m.formIndex>=0?" (Mega)":""))).join("")}</select></div>
      <div class="field"><label>Move</label><select id="mv">${moves.length?moves.map(m=>{const mi=E.moveInfo(m);return opt(m,C.move,m+" ("+mi.t+"·"+mi.bp+")");}).join(""):'<option>— no damaging move —</option>'}</select></div></div>
    <div class="card"><div class="field"><label>Defender</label><select id="def">${defs.map(d=>opt(d.key,C.defKey,d.label)).join("")}</select></div></div>
    <div class="card"><label class="muted">Field</label>
      <div class="field"><label>Weather</label><select id="wx">${[["","none"],["sun","Sun"],["rain","Rain"],["sand","Sand"],["snow","Snow"]].map(([v,l])=>opt(v,C.weather,l)).join("")}</select></div>
      <div class="seg" style="margin-top:4px">${tog(C.spread,'Spread move',"spread")}${tog(C.intimidate,'Intimidate (−1)',"intimidate")}${tog(C.burn,'Burned',"burn")}</div>
      <div class="field" style="margin-top:8px"><label>Attacker boost: +${C.atkStage}</label><div class="seg">${[0,1,2,6].map(s=>`<button class="btn ${C.atkStage===s?'primary':''}" data-boost="${s}">+${s}</button>`).join("")}</div></div></div>
    <div class="card">${resHtml}</div>`;
  $("#att").onchange=()=>{C.attIdx=+$("#att").value;C.move=null;renderCalc();};
  $("#mv").onchange=()=>{C.move=$("#mv").value;renderCalc();};
  $("#def").onchange=()=>{C.defKey=$("#def").value;renderCalc();};
  $("#wx").onchange=()=>{C.weather=$("#wx").value;renderCalc();};
  app.querySelectorAll("[data-tog]").forEach(b=>b.onclick=()=>{C[b.dataset.tog]=!C[b.dataset.tog];renderCalc();});
  app.querySelectorAll("[data-boost]").forEach(b=>b.onclick=()=>{C.atkStage=+b.dataset.boost;renderCalc();});
  backBtn.onclick=()=>go("builder");
}

/* proven Reg M-B skeletons to start from (built from the real meta cores) */
const SAMPLE_TEAMS=[
  {name:"Tailwind Balance",note:"M-B's #1 core",mons:[["Garchomp",-1],["Charizard",1],["Kingambit",-1],["Basculegion-Male",-1],["Whimsicott",-1],["Floette",-1]]},
  {name:"Rain Offense",note:"Pelipper + Swampert",mons:[["Pelipper",-1],["Swampert",0],["Archaludon",-1],["Metagross",-1],["Sinistcha",-1],["Incineroar",-1]]},
  {name:"Trick Room",note:"Sinistcha setter",mons:[["Sinistcha",-1],["Mawile",0],["Sylveon",-1],["Gholdengo",-1],["Farigiraf",-1],["Incineroar",-1]]},
];
function loadSample(s){
  STATE.team=s.mons.map(([n,f])=>{const e=E.byName[n];if(!e)return null;const set=E.recommendSet(e,f>=0?"mega"+f:"meta");while(set.moves.length<4)set.moves.push("");return {entry:e,formIndex:(set.formIndex!=null?set.formIndex:f),roleKey:"meta",set};}).filter(Boolean);
  STATE.lead=STATE.team[0]&&STATE.team[0].entry; STATE.role=null; STATE.slotRole=null; STATE.q=""; go("builder");
}
/* ---------------- OPTIMIZER (outspeed / survive) ---------------- */
function renderOptimize(){
  titleEl.textContent="Point optimizer"; backBtn.classList.remove("hidden"); exportBtn.classList.add("hidden"); teambar.classList.add("hidden");
  if(!STATE.team.length){app.innerHTML=`<div class="card muted">Add a Pokémon first.</div>`;backBtn.onclick=()=>go("builder");return;}
  const O=STATE.opt=STATE.opt||{mode:"outspeed",mi:0,bench:null,move:null,tailwind:false,scarf:false,weather:""};
  if(O.mi>=STATE.team.length)O.mi=0;
  const me=STATE.team[O.mi];
  const benches=E.metaBenchmarks(40).map(b=>({label:b.name+" ("+b.spe+" Spe)",name:b.name,spe:b.spe})).filter(b=>E.byName[b.name]);
  if(!benches.find(b=>b.name===O.bench))O.bench=benches[0]&&benches[0].name;
  const opt=(v,sel,l)=>`<option value="${v}" ${v===sel?'selected':''}>${l||v}</option>`;
  const tog=(on,l,k)=>`<button class="btn ${on?'primary':''}" data-tog="${k}">${l}</button>`;
  const tgt=benches.find(b=>b.name===O.bench)||benches[0];
  let res="";
  if(O.mode==="outspeed"&&tgt){
    const r=E.optimizeOutspeed(me,tgt.spe,{tailwind:O.tailwind,scarf:O.scarf});
    res=r.possible
      ? `<div style="font-size:22px;font-weight:800;color:var(--good)">${r.points} Spe ${r.plusNature?'+ a +Spe nature':'(any nature)'}</div><div class="muted">reaches ${r.achieved} Spe — outspeeds ${tgt.name} (${tgt.spe})${O.tailwind?' under Tailwind':''}${O.scarf?' + Scarf':''}.</div>`
      : `<div style="font-size:18px;font-weight:700;color:var(--bad)">Can't outspeed ${tgt.name}</div><div class="muted">maxes at ${r.achieved} Spe vs their ${tgt.spe}. Use Tailwind, a Scarf, or priority.</div>`;
  } else if(O.mode==="survive"&&tgt){
    const att=E.benchMember(tgt.name);
    const moves=att?E.DEX&&(att.set.moves||[]).filter(m=>{const i=E.moveInfo(m);return m&&(i.c==="Phys"||i.c==="Spec")&&i.bp;}):[];
    if(!moves.includes(O.move))O.move=moves[0]||null;
    if(att&&O.move){
      const r=E.optimizeSurvive(me,att,O.move,{weather:O.weather});
      const SK={def:"Def",spd:"SpD"};
      res=(`<div class="field"><label>${tgt.name}'s move</label><select id="omv">${moves.map(m=>opt(m,O.move,m)).join("")}</select></div>`)+(
        r.immune?`<div style="color:var(--good);font-weight:700">Immune — takes 0.</div>`:
        r.possible?`<div style="font-size:22px;font-weight:800;color:var(--good)">${r.total===0?'0 investment':r.hp+' HP / '+r.def+' '+SK[r.defStat]}</div><div class="muted">survives ${tgt.name}'s ${O.move} (worst roll ${r.maxPct}% of HP)${O.weather?' in '+O.weather:''}.</div>`:
        `<div style="font-size:18px;font-weight:700;color:var(--bad)">Can't survive</div><div class="muted">${tgt.name}'s ${O.move} still does ${r.maxPct}% at max bulk. It's an OHKO.</div>`);
    }
  }
  app.innerHTML=`
    <div class="card"><div class="seg">${tog(O.mode==="outspeed",'Outspeed',"_outspeed")}${tog(O.mode==="survive",'Survive',"_survive")}</div>
      <div class="field"><label>Your Pokémon</label><select id="ome">${STATE.team.map((m,i)=>opt(i,O.mi,m.entry.name+(m.formIndex>=0?" (Mega)":""))).join("")}</select></div>
      <div class="field"><label>${O.mode==="outspeed"?"Outspeed target":"Incoming attacker"}</label><select id="obench">${benches.map(b=>opt(b.name,O.bench,b.label)).join("")}</select></div>
      ${O.mode==="outspeed"?`<div class="seg">${tog(O.tailwind,'Tailwind',"tailwind")}${tog(O.scarf,'Choice Scarf',"scarf")}</div>`:
        `<div class="field"><label>Weather</label><select id="owx">${[["","none"],["sun","Sun"],["rain","Rain"],["sand","Sand"],["snow","Snow"]].map(([v,l])=>opt(v,O.weather,l)).join("")}</select></div>`}</div>
    <div class="card">${res||'<div class="muted">…</div>'}</div>`;
  $("#ome").onchange=()=>{O.mi=+$("#ome").value;O.move=null;renderOptimize();};
  $("#obench").onchange=()=>{O.bench=$("#obench").value;O.move=null;renderOptimize();};
  const wx=$("#owx");if(wx)wx.onchange=()=>{O.weather=wx.value;renderOptimize();};
  const omv=$("#omv");if(omv)omv.onchange=()=>{O.move=omv.value;renderOptimize();};
  app.querySelectorAll("[data-tog]").forEach(b=>b.onclick=()=>{const k=b.dataset.tog;if(k==="_outspeed")O.mode="outspeed";else if(k==="_survive")O.mode="survive";else O[k]=!O[k];renderOptimize();});
  backBtn.onclick=()=>go("builder");
}
/* ---------------- IMPORT ---------------- */
function renderImport(){
  titleEl.textContent="Import team"; backBtn.classList.remove("hidden"); exportBtn.classList.add("hidden"); teambar.classList.add("hidden");
  app.innerHTML=`
    <div class="card"><b>Start from a proven Reg M-B skeleton</b>
      <div style="margin-top:8px">${SAMPLE_TEAMS.map((s,i)=>`<button class="btn" data-sample="${i}" style="width:100%;margin-bottom:6px;text-align:left">▸ ${s.name} <span class="muted">— ${s.note}</span></button>`).join("")}</div></div>
    <div class="card"><div class="muted">…or paste a Showdown export / pokepaste text — or a pokepast.es link — to load and analyse any team. Showdown EVs are converted to Champions points.</div>
      <textarea id="pastein" style="width:100%;height:160px;margin-top:10px;background:var(--card2);color:var(--txt);border:1px solid var(--line);border-radius:8px;padding:10px;font:12px/1.4 ui-monospace,monospace" placeholder="Tauros-Paldea-Aqua @ ...&#10;Ability: Intimidate&#10;- Close Combat&#10;...&#10;&#10;or  https://pokepast.es/abc123def456..."></textarea>
      <button class="btn primary" id="load" style="width:100%;margin-top:8px">Load team</button>
      <div class="muted" id="impmsg" style="margin-top:8px"></div></div>`;
  app.querySelectorAll("[data-sample]").forEach(b=>b.onclick=()=>loadSample(SAMPLE_TEAMS[+b.dataset.sample]));
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
  backBtn.onclick=()=>{ if(STATE.screen==="builder")go("role"); else if(STATE.screen==="role"||STATE.screen==="import")go("start"); else if(["editor","stress","speed","calc","optimize"].includes(STATE.screen))go("builder"); };
  if(STATE.screen==="import")renderImport();
  else if(STATE.screen==="optimize")renderOptimize();
  else if(STATE.screen==="calc")renderCalc();
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
