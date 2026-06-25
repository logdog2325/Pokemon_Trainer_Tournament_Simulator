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

const RECOVERY=["Recover","Roost","Synthesis","Slack Off","Soft-Boiled","Moonlight","Morning Sun","Wish","Strength Sap","Milk Drink","Shore Up","Rest"];
function detectRoles(e){
  const roles=[]; const sp=e.baseStats.spe, off=offense(e);
  const setup=has(e,SETUP), sc=has(e,SPEEDCTRL), rd=has(e,REDIR), fo=e.moves.includes("Fake Out"),
        pv=has(e,PIVOT), sup=has(e,SUPPORT); const weatherA=(e.abilities||[]).find(a=>WEATHER_ABIL[a]); const bv=bulk(e);
  // a mon can legitimately fill several offensive roles at once (Emboar = sweeper + breaker + TR breaker)
  if(setup.length && off>=95) roles.push({key:"sweeper",label:"Setup sweeper",note:`Boosts with ${setup[0]}, then sweeps.`});
  if(off>=105) roles.push({key:"breaker",label:"Wallbreaker",note:`Hits hard immediately — Tailwind/offense friendly.`});
  if(off>=100 && sp<=70) roles.push({key:"tr",label:"Trick Room wallbreaker",note:`Slow + huge offense — scary under Trick Room.`});
  if(sc.length) roles.push({key:"speed",label:"Speed control",note:`Provides ${sc.join(" / ")}.`});
  if(rd.length) roles.push({key:"redir",label:"Redirection support",note:`Pulls aggro with ${rd.join(" / ")}.`});
  if(fo) roles.push({key:"fakeout",label:"Fake Out "+(off>=100?"attacker":"support"),note:`Fake Out tempo`+((e.abilities||[]).includes("Intimidate")?" + Intimidate":"")+`.`});
  if(weatherA) roles.push({key:"weather",label:`Weather setter (${WEATHER_ABIL[weatherA]})`,note:`${weatherA} sets ${WEATHER_ABIL[weatherA]} on entry.`});
  if(pv.length && bv>=240) roles.push({key:"pivot",label:"Bulky pivot",note:`Pivots with ${pv.join(" / ")}.`});
  if(bv>=280 && (sup.length||RECOVERY.some(m=>e.moves.includes(m)))) roles.push({key:"wall",label:"Defensive wall",note:`Bulky support / staller.`});
  if(!roles.length) roles.push({key:"breaker",label:"Attacker",note:`General offensive role.`});
  const seen=new Set();return roles.filter(r=>!seen.has(r.key)&&seen.add(r.key));
}

/* ---------- team analysis ---------- */
/* resolve a team member to its effective battle form (Mega applies its type/ability/stats) */
function effOf(m){
  const e=m.entry;
  if(m && m.formIndex>=0 && e.mega && e.mega[m.formIndex] && e.mega[m.formIndex].baseStats){
    const mg=e.mega[m.formIndex];
    return {name:e.name+" (Mega)",types:mg.type||e.types,abilities:[mg.ability],baseStats:mg.baseStats,moves:e.moves,mega:[]};
  }
  const ab=(m&&m.set&&m.set.ability)?[m.set.ability]:(m&&m.ability?[m.ability]:(e.abilities||[]));
  return {name:e.name,types:e.types,abilities:ab,baseStats:e.baseStats,moves:e.moves,mega:e.mega,megaStones:e.megaStones};
}
function teamWeakTally(team){
  const tally={};
  for(const m of team){ const ef=effOf(m); const w=weaknessesOf(ef,ef.abilities[0]); for(const [t,mult] of w.weak){ tally[t]=tally[t]||{count:0,max:1}; tally[t].count++; tally[t].max=Math.max(tally[t].max,mult);} }
  return tally;
}
function teamNeeds(team){
  const flat=team.flatMap(m=>m.entry.moves);
  const ab=team.flatMap(m=>effOf(m).abilities);
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
  for(const m of team) for(const a of effOf(m).abilities) if(WEATHER_ABIL[a]) return WEATHER_ABIL[a];
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
  // incoming-move mitigation: Sun halves Water, Rain halves Fire -> soften those weaknesses
  const wk=new Set(weaknessesOf(e).weak.map(x=>x[0]));
  if(weather==="sun"&&wk.has("Water")) b+=3;
  if(weather==="rain"&&wk.has("Fire")) b+=3;
  // offensive flip: Sun halves Water STAB, Rain halves Fire STAB -> penalize that attacker
  if(weather==="sun"&&e.types.includes("Water")) b-=4;
  if(weather==="rain"&&e.types.includes("Fire")) b-=4;
  return Math.max(-6,Math.min(14,b));
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

/* ---------- recommended sets / editor data ---------- */
const NATURE_MOD={Hardy:null,Adamant:["atk","spa"],Modest:["spa","atk"],Jolly:["spe","spa"],Timid:["spe","atk"],
  Brave:["atk","spe"],Quiet:["spa","spe"],Bold:["def","atk"],Calm:["spd","atk"],Careful:["spd","spa"],
  Impish:["def","spa"],Relaxed:["def","spe"],Sassy:["spd","spe"],Naive:["spe","spd"],Hasty:["spe","def"],
  Lonely:["atk","def"],Mild:["spa","def"],Rash:["spa","spd"],Gentle:["spd","def"],Naughty:["atk","spd"]};
const NATURES=Object.keys(NATURE_MOD);
const ITEMS=["Life Orb","Leftovers","Focus Sash","Sitrus Berry","Choice Scarf","Assault Vest","Mystic Water","Charcoal",
  "Black Glasses","Black Belt","Magnet","Miracle Seed","Never-Melt Ice","Poison Barb","Soft Sand","Sharp Beak","Silk Scarf",
  "Silver Powder","Hard Stone","Spell Tag","Twisted Spoon","Dragon Fang","Metal Coat","Fairy Feather","Light Ball",
  "Expert Belt","Muscle Band","Wise Glasses","Bright Powder","Wide Lens","Zoom Lens","Scope Lens","Quick Claw","King's Rock",
  "Mental Herb","White Herb","Shell Bell","Focus Band","Iron Ball","Shed Shell","Metronome","Big Root","Light Clay",
  "Heat Rock","Damp Rock","Smooth Rock","Icy Rock",
  "Charti Berry","Occa Berry","Passho Berry","Shuca Berry","Wacan Berry","Yache Berry","Chople Berry","Kebia Berry",
  "Coba Berry","Payapa Berry","Tanga Berry","Colbur Berry","Haban Berry","Kasib Berry","Babiri Berry","Roseli Berry",
  "Chilan Berry","Rindo Berry","Lum Berry","Oran Berry","Cheri Berry","Chesto Berry","Pecha Berry","Rawst Berry","Aspear Berry","Persim Berry","Leppa Berry"];
const GOOD_AB={"Intimidate":13,"Unburden":12,"Parental Bond":15,"Adaptability":12,"Technician":11,"Huge Power":14,"Pure Power":14,"Speed Boost":13,"Magic Bounce":11,"Regenerator":11,"Levitate":9,"Flash Fire":8,"Lightning Rod":9,"Good as Gold":12,"Sharpness":11,"Tough Claws":10,"No Guard":11,"Mold Breaker":8,"Dry Skin":9,"Thick Fat":9,"Sand Rush":9,"Swift Swim":9,"Chlorophyll":9,"Protosynthesis":11,"Quark Drive":11,"Contrary":12,"Prankster":11,"Water Absorb":9,"Volt Absorb":9,"Storm Drain":9,"Sap Sipper":9,"Drought":11,"Drizzle":11,"Sand Stream":11,"Snow Warning":11};
function moveInfo(n){return (window.MOVES&&window.MOVES[n])||{t:null,c:"",bp:0,pri:0};}
function recommendAbility(e){let best=(e.abilities||[])[0]||"",sc=-1;for(const a of(e.abilities||[])){const v=GOOD_AB[a]||5;if(v>sc){sc=v;best=a;}}return best;}
const BAD_MOVES=new Set(["Giga Impact","Hyper Beam","Frenzy Plant","Blast Burn","Hydro Cannon","Roar of Time","Prismatic Laser","Eternabeam","Self-Destruct","Explosion","Misty Explosion","Last Resort","Focus Punch","Sky Attack","Razor Wind","Skull Bash","Solar Beam","Solar Blade","Synchronoise","Belch","Spit Up","Bide","Dream Eater","Bounce","Dig","Dive","Fly","Wood Hammer"]);
const goodMove=m=>{const i=moveInfo(m);return (i.c==="Phys"||i.c==="Spec")&&i.bp>=55&&!BAD_MOVES.has(m);};
function recommendMoves(e,roleKey){
  const mp=e.moves,picked=[],phys=isPhysical(e),pref=phys?"Phys":"Spec";
  const add=m=>{if(m&&mp.includes(m)&&!picked.includes(m)&&picked.length<4)picked.push(m);};
  const setupMoves=SETUP.filter(m=>mp.includes(m));
  if(roleKey==="sweeper"&&setupMoves.length)add(setupMoves[0]);
  if(roleKey==="speed")add(mp.includes("Tailwind")?"Tailwind":"Trick Room");
  if(roleKey==="redir")add(mp.includes("Rage Powder")?"Rage Powder":"Follow Me");
  if(roleKey==="fakeout")add("Fake Out");
  if(roleKey==="pivot")add(PIVOT.find(m=>mp.includes(m)));
  for(const ty of e.types){
    const c=mp.filter(m=>moveInfo(m).t===ty&&goodMove(m))
      .sort((a,b)=>{const A=moveInfo(a),B=moveInfo(b);return ((B.c===pref)-(A.c===pref))||(B.bp-A.bp);});
    if(c.length)add(c[0]);
  }
  const have=new Set(picked.map(m=>moveInfo(m).t));
  const cov=mp.filter(m=>moveInfo(m).c===pref&&goodMove(m)&&!have.has(moveInfo(m).t)).sort((a,b)=>moveInfo(b).bp-moveInfo(a).bp);
  if(cov.length)add(cov[0]);
  add(mp.includes("Protect")?"Protect":null);
  // priority/STAB filler for wallbreakers, else best remaining damaging move
  if(picked.length<4){const rest=mp.filter(goodMove).sort((a,b)=>moveInfo(b).bp-moveInfo(a).bp);for(const m of rest)add(m);}
  if(picked.length<4)for(const m of mp)add(m);
  return picked.slice(0,4);
}
function recommendSpread(e,roleKey){
  const phys=isPhysical(e),off=phys?"atk":"spa",slow=roleKey==="tr"||e.baseStats.spe<=55;
  const support=["speed","redir","fakeout","wall","pivot","weather"].includes(roleKey)&&offense(e)<100;
  let pts={hp:0,atk:0,def:0,spa:0,spd:0,spe:0},nature;
  if(support){pts.hp=32;pts.def=16;pts.spd=16;nature=phys?"Impish":"Calm";}
  else if(slow){pts.hp=32;pts[off]=32;pts.def=2;nature=phys?"Brave":"Quiet";}
  else{pts[off]=32;pts.spe=32;pts.hp=2;nature=phys?"Jolly":"Timid";}
  return {nature,points:pts};
}
function recommendItem(e,roleKey){
  const fourxRock=weaknessesOf(e).weak.some(([t,m])=>t==="Rock"&&m>=4);
  if(fourxRock&&["sweeper","tr","breaker"].includes(roleKey))return "Charti Berry";
  if(roleKey==="weather"){const a=(e.abilities||[]).find(x=>WEATHER_ABIL[x]);const r={sun:"Heat Rock",rain:"Damp Rock",sand:"Smooth Rock",snow:"Icy Rock"};return r[WEATHER_ABIL[a]]||"Leftovers";}
  if(["speed","redir","fakeout","pivot"].includes(roleKey))return "Focus Sash";
  if(roleKey==="wall")return "Leftovers";
  if(["sweeper","breaker","tr"].includes(roleKey))return "Life Orb";
  return "Sitrus Berry";
}
function recommendSet(e,roleKey){const sp=recommendSpread(e,roleKey);return {ability:recommendAbility(e),item:recommendItem(e,roleKey),nature:sp.nature,points:sp.points,moves:recommendMoves(e,roleKey)};}

/* expose for ui.js */
window.ENGINE={DEX,byName,TYPES,CHART,effTable,weaknessesOf,bestDefAbility,detectRoles,teamWeakTally,teamNeeds,teamWeather,scoreCandidate,offense,isPhysical,statSum,has,effOf,SETUP,PIVOT,REDIR,SPEEDCTRL,DISRUPT,PRIORITY,HAZARD,SUPPORT,WEATHER_ABIL,NATURES,ITEMS,moveInfo,recommendSet,recommendMoves};
