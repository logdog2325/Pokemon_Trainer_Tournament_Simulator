/* Champions Team Builder — engine + UI.
   Data: window.DEX (champions-dex.json). Gen 9 type chart + ability immunities. */
'use strict';
const DEX = window.DEX || [];
const byName = Object.fromEntries(DEX.map(e => [e.name, e]));

/* ---------- Gen 9 type chart (attacking -> {defending: mult}, non-1 only) ---------- */
const TYPES = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"];
const CHART = {
  Normal:{Rock:.5,Ghost:0,Steel:.5},
  Fire:{Fire:.5,Water:.5,Grass:2,Ice:2,Bug:2,Rock:.5,Dragon:.5,Steel:2},
  Water:{Fire:2,Water:.5,Grass:.5,Ground:2,Rock:2,Dragon:.5},
  Electric:{Water:2,Electric:.5,Grass:.5,Ground:0,Flying:2,Dragon:.5},
  Grass:{Fire:.5,Water:2,Grass:.5,Poison:.5,Ground:2,Flying:.5,Bug:.5,Rock:2,Dragon:.5,Steel:.5},
  Ice:{Fire:.5,Water:.5,Grass:2,Ice:.5,Ground:2,Flying:2,Dragon:2,Steel:.5},
  Fighting:{Normal:2,Ice:2,Poison:.5,Flying:.5,Psychic:.5,Bug:.5,Rock:2,Ghost:0,Dark:2,Steel:2,Fairy:.5},
  Poison:{Grass:2,Poison:.5,Ground:.5,Rock:.5,Ghost:.5,Steel:0,Fairy:2},
  Ground:{Fire:2,Electric:2,Grass:.5,Poison:2,Flying:0,Bug:.5,Rock:2,Steel:2},
  Flying:{Electric:.5,Grass:2,Fighting:2,Bug:2,Rock:.5,Steel:.5},
  Psychic:{Fighting:2,Poison:2,Psychic:.5,Dark:0,Steel:.5},
  Bug:{Fire:.5,Grass:2,Fighting:.5,Poison:.5,Flying:.5,Psychic:2,Ghost:.5,Dark:2,Steel:.5,Fairy:.5},
  Rock:{Fire:2,Ice:2,Fighting:.5,Ground:.5,Flying:2,Bug:2,Steel:.5},
  Ghost:{Normal:0,Psychic:2,Ghost:2,Dark:.5},
  Dragon:{Dragon:2,Steel:.5,Fairy:0},
  Dark:{Fighting:.5,Psychic:2,Ghost:2,Dark:.5,Fairy:.5},
  Steel:{Fire:.5,Water:.5,Electric:.5,Ice:2,Rock:2,Steel:.5,Fairy:2},
  Fairy:{Fire:.5,Fighting:2,Poison:.5,Dragon:2,Dark:2,Steel:.5}
};
/* ability defensive modifiers: type -> multiplier (0 = immune). Applied after the chart. */
const ABILITY_MOD = {
  "Levitate":{Ground:0}, "Flash Fire":{Fire:0}, "Lightning Rod":{Electric:0},
  "Volt Absorb":{Electric:0}, "Motor Drive":{Electric:0}, "Water Absorb":{Water:0},
  "Storm Drain":{Water:0}, "Dry Skin":{Water:0,Fire:1.25}, "Sap Sipper":{Grass:0},
  "Earth Eater":{Ground:0}, "Well-Baked Body":{Fire:0}, "Thick Fat":{Fire:.5,Ice:.5},
  "Heatproof":{Fire:.5}, "Water Bubble":{Fire:.5}, "Purifying Salt":{Ghost:.5},
  "Fluffy":{Fire:2}, "Wind Rider":{}, "Sap Sipper ":{Grass:0}
};
/* reductive abilities applied to any super-effective hit */
const SE_REDUCERS = ["Filter","Solid Rock","Prism Armor"];

/* effectiveness of each attacking type vs an entry, honoring a chosen ability */
function effTable(entry, ability){
  const out = {};
  const mod = ABILITY_MOD[ability] || {};
  const seRed = SE_REDUCERS.includes(ability);
  for(const atk of TYPES){
    let m = 1;
    for(const dt of entry.types){ m *= (CHART[atk] && CHART[atk][dt] != null) ? CHART[atk][dt] : 1; }
    if(mod[atk] != null) m = (mod[atk] === .5 || mod[atk] === 1.25 || mod[atk]===2) ? m*mod[atk] : mod[atk];
    if(seRed && m>1) m *= .75;
    out[atk] = m;
  }
  return out;
}
/* pick the most defensively useful ability of an entry (the one granting an immunity/resist) */
function bestDefAbility(entry){
  for(const a of (entry.abilities||[])) if(ABILITY_MOD[a]) return a;
  return (entry.abilities||[])[0] || null;
}
function weaknessesOf(entry, ability){
  const t = effTable(entry, ability||bestDefAbility(entry));
  const weak=[], res=[], imm=[];
  for(const atk of TYPES){ const m=t[atk]; if(m===0) imm.push(atk); else if(m>1) weak.push([atk,m]); else if(m<1) res.push([atk,m]); }
  return {weak,res,imm,table:t};
}

/* ---------- role / move tagging ---------- */
const SETUP=["Quiver Dance","Swords Dance","Dragon Dance","Nasty Plot","Calm Mind","Shell Smash","Bulk Up","Agility","Coil","Work Up","Tidy Up","Victory Dance","Tail Glow","Geomancy","Clangorous Soul","No Retreat","Curse","Iron Defense","Cosmic Power","Acid Armor"];
const PIVOT=["U-turn","Volt Switch","Flip Turn","Parting Shot","Teleport","Baton Pass"];
const REDIR=["Rage Powder","Follow Me"];
const SPEEDCTRL=["Tailwind","Trick Room"];
const DISRUPT=["Fake Out","Taunt","Encore","Will-O-Wisp","Thunder Wave","Spore","Sleep Powder","Yawn","Disable","Glare","Nuzzle"];
const PRIORITY=["Sucker Punch","Bullet Punch","Aqua Jet","Ice Shard","Shadow Sneak","Extreme Speed","Mach Punch","Accelerock","Grassy Glide","Jet Punch","First Impression","Vacuum Wave"];
const HAZARD=["Stealth Rock","Spikes","Toxic Spikes","Sticky Web"];
const SUPPORT=["Helping Hand","Wide Guard","Quick Guard","Reflect","Light Screen","Aurora Veil","Heal Pulse","Life Dew","Pollen Puff","Decorate","Coaching"];
const WEATHER_ABIL={"Drought":"sun","Drizzle":"rain","Sand Stream":"sand","Snow Warning":"snow","Orichalcum Pulse":"sun","Desolate Land":"sun","Primordial Sea":"rain"};
const has=(e,list)=> list.filter(m=>e.moves.includes(m));

function statSum(e){const s=e.baseStats;return s.hp+s.atk+s.def+s.spa+s.spd+s.spe;}
function offense(e){return Math.max(e.baseStats.atk,e.baseStats.spa);}
function isPhysical(e){return e.baseStats.atk>=e.baseStats.spa;}
function bulk(e){const s=e.baseStats;return s.hp+s.def+s.spd;}

function detectRoles(e){
  const roles=[]; const sp=e.baseStats.spe; const off=offense(e);
  const setup=has(e,SETUP), sc=has(e,SPEEDCTRL), rd=has(e,REDIR), fo=e.moves.includes("Fake Out"),
        pv=has(e,PIVOT), dis=has(e,DISRUPT), pr=has(e,PRIORITY), hz=has(e,HAZARD), sup=has(e,SUPPORT);
  const weatherA=(e.abilities||[]).find(a=>WEATHER_ABIL[a]);
  if(setup.length && off>=95) roles.push({key:"sweeper",label:"Setup sweeper",note:`Sets up with ${setup[0]} then sweeps.`,moves:setup});
  if(sp<=55 && off>=100) roles.push({key:"tr",label:"Trick Room attacker",note:`Slow + hard-hitting — wants Trick Room up.`,moves:has(e,["Trick Room"])});
  if(sc.length) roles.push({key:"speed",label:"Speed control",note:`Provides ${sc.join(" / ")}.`,moves:sc});
  if(rd.length) roles.push({key:"redir",label:"Redirection support",note:`Pulls aggro with ${rd.join(" / ")}.`,moves:rd});
  if(fo) roles.push({key:"fakeout",label:"Fake Out "+(off>=100?"attacker":"support"),note:`Fake Out tempo`+((e.abilities||[]).includes("Intimidate")?" + Intimidate":"")+".",moves:["Fake Out"].concat(dis)});
  if(weatherA) roles.push({key:"weather",label:`Weather setter (${WEATHER_ABIL[weatherA]})`,note:`${weatherA} sets ${WEATHER_ABIL[weatherA]} on entry.`,moves:[]});
  if(pv.length && (bulk(e)>=240||e.tags&&e.tags.includes("pivot"))) roles.push({key:"pivot",label:"Defensive pivot",note:`Pivots with ${pv.join(" / ")}.`,moves:pv});
  if(bulk(e)>=270 && (sup.length||e.moves.includes("Recover")||e.moves.includes("Roost"))) roles.push({key:"wall",label:"Defensive wall / support",note:`Bulky support.`,moves:sup});
  if(off>=110 && !setup.length) roles.push({key:"breaker",label:"Immediate attacker / breaker",note:`Hits hard without setup.`,moves:pr});
  if(!roles.length) roles.push({key:"breaker",label:"Attacker",note:`General offensive role.`,moves:[]});
  // dedupe by key
  const seen=new Set();return roles.filter(r=>!seen.has(r.key)&&seen.add(r.key));
}

/* ---------- team analysis ---------- */
function teamWeakTally(team){
  const tally={}; // type -> {count, max}
  for(const m of team){ const w=weaknessesOf(m.entry,m.ability); for(const [t,mult] of w.weak){ tally[t]=tally[t]||{count:0,max:1}; tally[t].count++; tally[t].max=Math.max(tally[t].max,mult);} }
  return tally;
}
function teamNeeds(team){
  const flat=team.flatMap(m=>m.entry.moves);
  const ab=team.flatMap(m=>m.entry.abilities||[]);
  return {
    speed: !flat.some(m=>SPEEDCTRL.includes(m)),
    redir: !flat.some(m=>REDIR.includes(m)),
    fakeout: !flat.includes("Fake Out"),
    pivot: !flat.some(m=>PIVOT.includes(m)),
    intimidate: !ab.includes("Intimidate"),
    physical: team.filter(m=>isPhysical(m.entry)&&offense(m.entry)>=95).length < 1,
    special: team.filter(m=>!isPhysical(m.entry)&&offense(m.entry)>=95).length < 1,
    priority: !flat.some(m=>PRIORITY.includes(m)),
  };
}

/* ---------- weather synergy (Gen 9) ---------- */
const WEATHER_BENEFIT_ABIL={
  sun:["Chlorophyll","Solar Power","Flower Gift","Leaf Guard","Drought","Orichalcum Pulse","Protosynthesis"],
  rain:["Swift Swim","Rain Dish","Hydration","Dry Skin","Drizzle","Primordial Sea"],
  sand:["Sand Rush","Sand Force","Sand Veil","Sand Stream"],
  snow:["Slush Rush","Snow Cloak","Ice Body","Snow Warning","Ice Face"]
};
function teamWeather(team){
  for(const m of team) for(const a of (m.entry.abilities||[])) if(WEATHER_ABIL[a]) return WEATHER_ABIL[a];
  return null;
}
function weatherBonus(e,weather){
  if(!weather) return 0;
  let b=0; const ab=e.abilities||[], ty=e.types;
  if(weather==="snow"&&ty.includes("Ice")) b+=6;          // 1.5x Def
  if(weather==="sand"&&ty.includes("Rock")) b+=6;         // 1.5x SpD
  if(weather==="sand"&&(ty.includes("Ground")||ty.includes("Steel"))) b+=2; // chip-immune
  if(weather==="sun"&&ty.includes("Fire")) b+=5;          // 1.5x Fire STAB
  if(weather==="rain"&&ty.includes("Water")) b+=5;        // 1.5x Water STAB
  if(ab.some(a=>WEATHER_BENEFIT_ABIL[weather].includes(a))) b+=6;  // speed/heal abilities
  if(weather==="snow"&&(e.moves.includes("Blizzard")||e.moves.includes("Aurora Veil"))) b+=3;
  if(weather==="rain"&&(e.moves.includes("Thunder")||e.moves.includes("Hurricane"))) b+=3;
  if(weather==="sun"&&e.moves.includes("Solar Beam")) b+=2;
  return Math.min(12,b);
}

/* ---------- the scoring formula ---------- */
function scoreCandidate(e, team){
  const tally=teamWeakTally(team);
  const danger=Object.entries(tally).filter(([t,v])=>v.count>=2||v.max>=4).map(([t])=>t);
  const w=weaknessesOf(e);
  // Typing /25
  let typing=12;
  const resSet=new Set(w.res.map(x=>x[0]).concat(w.imm)); const weakSet=new Set(w.weak.map(x=>x[0]));
  for(const t of Object.keys(tally)){
    const isDanger=danger.includes(t);
    if(resSet.has(t)) typing += isDanger?5:3;
    if(weakSet.has(t)){ // stacking
      const sev=(tally[t].max>=4||isDanger)?5:3; typing -= sev;
    }
  }
  // brand-new 4x weakness it introduces
  for(const [t,mult] of w.weak){ if(mult>=4 && !tally[t]) typing-=3; }
  typing=Math.max(0,Math.min(25,typing));
  // Stats /20 (offense + speed, or bulk)
  const off=offense(e), sp=e.baseStats.spe;
  let stats=Math.min(20, Math.round((off-60)/8) + Math.round(sp/18));
  if(e.transformedStats){ const t=e.transformedStats; stats=Math.min(20,Math.round((Math.max(t.atk,t.spa)-60)/8)+Math.round(sp/18)); }
  stats=Math.max(2,stats);
  // Ability /15
  const goodAb={"Intimidate":13,"Unburden":12,"Protosynthesis":11,"Quark Drive":11,"Parental Bond":15,"Adaptability":12,"Technician":11,"Huge Power":14,"Pure Power":14,"Speed Boost":13,"Magic Bounce":11,"Regenerator":11,"Levitate":9,"Flash Fire":8,"Lightning Rod":9,"Good as Gold":12,"Sharpness":11,"Tough Claws":10,"Sand Rush":9,"Swift Swim":9,"Chlorophyll":9,"No Guard":11,"Mold Breaker":8,"Dry Skin":9,"Thick Fat":9};
  let ability=6; for(const a of (e.abilities||[])) ability=Math.max(ability, goodAb[a]||6);
  // Role coverage /30 — does it fill a current team NEED?
  const needs=teamNeeds(team); let cov=8;
  const flat=e.moves;
  if(needs.speed && flat.some(m=>SPEEDCTRL.includes(m))) cov+=7;
  if(needs.redir && flat.some(m=>REDIR.includes(m))) cov+=6;
  if(needs.fakeout && flat.includes("Fake Out")) cov+=4;
  if(needs.pivot && flat.some(m=>PIVOT.includes(m))) cov+=4;
  if(needs.intimidate && (e.abilities||[]).includes("Intimidate")) cov+=4;
  if(needs.priority && flat.some(m=>PRIORITY.includes(m))) cov+=4;
  if(needs.physical && isPhysical(e)&&off>=100) cov+=6;
  if(needs.special && !isPhysical(e)&&off>=100) cov+=6;
  cov=Math.min(30,cov);
  // Weather synergy bonus (only when the team runs a weather setter)
  const weather=teamWeather(team);
  const wb=weatherBonus(e,weather);
  const total=Math.min(100,typing+stats+ability+cov+wb);
  return {total:Math.round(total),typing:Math.round(typing),stats,ability,cov,weather:wb,weatherType:weather,
    dangerStacks:w.weak.filter(([t])=>tally[t]).map(x=>x[0]),
    covers:w.res.map(x=>x[0]).concat(w.imm).filter(t=>danger.includes(t))};
}

/* expose for ui.js */
window.ENGINE={DEX,byName,TYPES,CHART,effTable,weaknessesOf,bestDefAbility,detectRoles,teamWeakTally,teamNeeds,scoreCandidate,offense,isPhysical,statSum,has,SETUP,PIVOT,REDIR,SPEEDCTRL,DISRUPT,PRIORITY,HAZARD,SUPPORT,WEATHER_ABIL};
