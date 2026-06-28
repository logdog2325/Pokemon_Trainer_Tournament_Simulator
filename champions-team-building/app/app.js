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
const INTIM_BOOST=["Defiant","Competitive","Guard Dog","Contrary"];      // Intimidate becomes a free +Atk/+SpA
const INTIM_IMMUNE=["Inner Focus","Oblivious","Own Tempo","Scrappy","Clear Body","White Smoke","Full Metal Body","Hyper Cutter","Guard Dog"]; // Attack never drops
const ANTI_INTIM=[...new Set(INTIM_BOOST.concat(INTIM_IMMUNE))];        // anything that beats Intimidate
// dedicated team-support moves (buff an ally / cripple a foe for a partner). Dragon Cheer wants Dragon allies.
const TEAM_SUPPORT_MV=["Coaching","Decorate","Helping Hand","Dragon Cheer","Aromatic Mist","Fake Tears","Screech","Psych Up","Howl"];
function bestSupportMove(e){
  const mv=e.moves||[], dragon=(e.types||[]).includes("Dragon");
  // Dragon Cheer leaps up the priority for Dragon types (it crit-boosts Dragon allies the most)
  const order=dragon
    ? ["Coaching","Decorate","Dragon Cheer","Helping Hand","Fake Tears","Screech","Aromatic Mist","Psych Up","Howl"]
    : ["Coaching","Decorate","Helping Hand","Fake Tears","Screech","Aromatic Mist","Dragon Cheer","Psych Up","Howl"];
  return order.find(m=>mv.includes(m))||null;
}
// which speed-control mode a Pokémon's own Speed wants, and (constrained to what it can learn) which to run:
//   slow (≤55) -> Trick Room (it moves first under TR; Tailwind does nothing for it)
//   fast (≥80) -> Tailwind (Tailwind doubles it past the field; Trick Room would hurt it)
//   middling (56–79) -> EITHER — it can abuse Tailwind or Trick Room.
function speedTierOf(sp){return sp<=55?"slow":sp>=80?"fast":"mid";}
function speedModeWant(sp){const t=speedTierOf(sp);return t==="slow"?"trickroom":t==="fast"?"tailwind":"either";}
function recommendSpeedCtrl(e,lean){
  const sp=e.baseStats.spe, mv=e.moves||[], hasTW=mv.includes("Tailwind"), hasTR=mv.includes("Trick Room");
  if(!hasTW&&!hasTR) return null;
  // a committed team mode overrides the setter's own Speed (a setter serves the TEAM, not itself)
  if(lean==="trickroom"&&hasTR) return {move:"Trick Room",mode:"trickroom",why:"team is going Trick Room"};
  if(lean==="tailwind"&&hasTW) return {move:"Tailwind",mode:"tailwind",why:"team is going Tailwind"};
  const want=speedModeWant(sp);
  if(want==="trickroom") return hasTR?{move:"Trick Room",mode:"trickroom",why:"slow — wants Trick Room"}:{move:"Tailwind",mode:"tailwind",why:"only learns Tailwind"};
  if(want==="tailwind") return hasTW?{move:"Tailwind",mode:"tailwind",why:"fast — wants Tailwind"}:{move:"Trick Room",mode:"trickroom",why:"only learns Trick Room"};
  if(hasTW&&hasTR) return {move:"Tailwind",mode:"either",why:"middling Speed — works under Tailwind or Trick Room"};
  return hasTW?{move:"Tailwind",mode:"tailwind",why:"middling Speed — Tailwind"}:{move:"Trick Room",mode:"trickroom",why:"middling Speed — Trick Room"};
}
// immune to Electric (so a Scarf-locked Discharge ally never chips it): Ground type, or Volt Absorb /
// Lightning Rod / Motor Drive. These are the "safe Discharge partners" a Lightning Rod core wants as backup.
function electricImmune(e){
  if((e.types||[]).includes("Ground")) return true;
  const abs=(e.abilities||[]).concat((e.mega||[]).map(m=>m.ability||""));
  return abs.some(a=>["Volt Absorb","Lightning Rod","Motor Drive"].includes(a));
}
// the offensive/support archetypes a (base or Mega) stat line can fill
function archetypeRoles(e){
  const roles=[]; const sp=e.baseStats.spe, off=offense(e), phys=isPhysical(e);
  const setup=has(e,SETUP), sc=has(e,SPEEDCTRL), rd=has(e,REDIR), fo=e.moves.includes("Fake Out"),
        pv=has(e,PIVOT), sup=has(e,SUPPORT); const weatherA=(e.abilities||[]).find(a=>WEATHER_ABIL[a]); const bv=bulk(e);
  const ab0=e.abilities||[];
  // physical: Defiant/Guard Dog/immune all help; special: only Competitive (Intimidate -> +SpA)
  const physBoost=ab0.find(a=>["Defiant","Guard Dog","Contrary"].includes(a));
  const physAnti=phys && (physBoost||ab0.some(a=>INTIM_IMMUNE.includes(a)));
  const specAnti=!phys && ab0.includes("Competitive");
  const antiNote=specAnti?"Competitive turns opposing Intimidate into a free Special Attack boost.":physBoost?`${physBoost} turns opposing Intimidate into a free Attack boost.`:`${ab0.find(a=>INTIM_IMMUNE.includes(a))} ignores Intimidate — its attack never drops.`;
  const sweepSetup=bestSetup(e,phys);   // a SAME-CATEGORY setup (null if its only setup is off-category)
  if(sweepSetup && off>=95) roles.push({key:"sweeper",label:"Setup sweeper",note:`Boosts with ${sweepSetup}, then sweeps.`});
  if(off>=105){const t=speedTierOf(sp);
    // a heavy hitter that isn't fast leans Trick Room even in the "mid" band — Tailwind only doubles it so far
    const note=t==="slow"?"best under Trick Room":t==="fast"?"Tailwind / offense friendly":(off>=110&&sp<=78?"a strong Trick Room wallbreaker, also workable under Tailwind":"works under Tailwind or Trick Room");
    roles.push({key:"breaker",label:"Wallbreaker",note:`Hits hard immediately — ${note}.`});}
  if(off>=100 && sp<=80) roles.push({key:"tr",label:"Trick Room wallbreaker",note:`Slow + huge offense — scary under Trick Room.`});
  if((physAnti||specAnti) && off>=95) roles.push({key:"antiintim",label:"Anti-Intimidate attacker",note:antiNote});
  if(sc.length){const rec=recommendSpeedCtrl(e);
    roles.push({key:"speed",label:"Speed control",note:rec?`Provides ${sc.join(" / ")} — run ${rec.mode==="either"?"Tailwind or Trick Room":rec.move} (${rec.why}).`:`Provides ${sc.join(" / ")}.`});}
  if(rd.length) roles.push({key:"redir",label:"Redirection support",note:`Pulls aggro with ${rd.join(" / ")}.`});
  if(fo) roles.push({key:"fakeout",label:"Fake Out "+(off>=100?"attacker":"support"),note:`Fake Out tempo`+((e.abilities||[]).includes("Intimidate")?" + Intimidate":"")+`.`});
  if(e.moves.some(m=>TEAM_SUPPORT_MV.includes(m))){const sm=TEAM_SUPPORT_MV.filter(m=>e.moves.includes(m)).slice(0,3);
    roles.push({key:"support",label:"Team support",note:`Buffs a partner with ${sm.join(" / ")}${fo?" + Fake Out":""}.`});}
  if(weatherA) roles.push({key:"weather",label:`Weather setter (${WEATHER_ABIL[weatherA]})`,note:`${weatherA} sets ${WEATHER_ABIL[weatherA]} on entry.`});
  if(pv.length && bv>=240) roles.push({key:"pivot",label:"Bulky pivot",note:`Pivots with ${pv.join(" / ")}.`});
  if(bv>=280 && (sup.length||RECOVERY.some(m=>e.moves.includes(m)))) roles.push({key:"wall",label:"Defensive wall",note:`Bulky support / staller.`});
  if(!roles.length) roles.push({key:"breaker",label:"Attacker",note:`General offensive role.`});
  const seen=new Set();return roles.filter(r=>!seen.has(r.key)&&seen.add(r.key));
}
function detectRoles(e){
  let out=archetypeRoles(e); out.forEach(r=>r._form=-1);   // base-form roles
  // for every Mega form, offer 2-3 sets covering the archetypes that form can run
  if(e.mega&&e.mega.length){
    e.mega.forEach((mg,i)=>{
      const lbl=e.mega.length>1?(mg.label||("Mega "+(i+1))):"Mega";
      const pseudo={name:e.name,types:mg.type||e.types,abilities:[mg.ability],baseStats:mg.baseStats,moves:e.moves};
      archetypeRoles(pseudo).slice(0,3).forEach(r=>out.push({key:"mega"+i+":"+r.key,_form:i,label:lbl+" · "+r.label,note:`Mega-Evolves → ${(mg.type||e.types).join("/")} · ${mg.ability}. ${r.note}`}));
    });
  }
  // surface the REAL most-used Reg M-B build first, when Pikalytics has data for this mon
  const u=usageOf(e);
  if(u&&u.moves&&u.moves.length){
    const ms=metaSet(e), metaForm=ms?ms.formIndex:-1;
    const desc=metaDescriptor(e,u);
    out.unshift({key:"meta",_form:metaForm,label:`Meta set — ${desc}`,meta:true,
      note:`The standard Reg M-B build for this role${u.teammates&&u.teammates.length?`. Common partners: ${u.teammates.slice(0,4).join(", ")}`:"."}`});
  }
  return out;
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
function setMovesOf(m){return (m&&m.set&&m.set.moves)?m.set.moves.filter(Boolean):(m&&m.entry?m.entry.moves:[]);}
function teamNeeds(team){
  const flat=team.flatMap(m=>setMovesOf(m));
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

/* ---------- Pikalytics usage data (Reg M-B doubles) ---------- */
const USAGE=window.USAGE_SETS||{};
function usageOf(e){return e&&USAGE[e.name]||null;}

/* ---------- Limitless tournament results (Reg M-B): usage / win rate / top-cut ---------- */
const RESULTS=window.RESULTS||{meta:{},mons:{},megas:{},pairs:{}};
const RES_MONS=RESULTS.mons||{}, RES_MEGAS=RESULTS.megas||{}, RES_PAIRS=RESULTS.pairs||{};
const RES_MIN_GAMES=25;                          // below this the win rate is too noisy to act on
function resultsFor(e){return e&&RES_MONS[e.name]||null;}     // per-species tournament record
// per-Mega record (by held stone). For dual-mega mons pass the form label suffix (e.g. "Y").
function megaResultsFor(name,variant){const k=variant?name+"-"+variant:name;return RES_MEGAS[k]||RES_MEGAS[name]||null;}
// tournament-proven score nudge: shrunk win rate vs the 50% field baseline, sample-gated and capped.
// This is PERFORMANCE (does it win games in real events), distinct from raw usage/popularity.
function provenBonus(e){
  const r=resultsFor(e); if(!r) return 0;
  const games=(r.wins||0)+(r.losses||0); if(games<RES_MIN_GAMES) return 0;
  const conf=Math.min(1,games/200);              // ramp confidence with sample size
  return Math.max(-5,Math.min(5,Math.round((r.adjWr-50)*0.55*conf)));
}
// Real teammate cores: reward a candidate that co-occurs often with the CURRENT team in winning M-B
// lists. Co-occurrence % (how often this pair shows up together) × the pair's win-rate edge over 50%.
// Floored at 0 — proven cores get a boost; an unseen pairing is simply neutral, never penalized.
function teammateSynergy(e,team){
  const r=resultsFor(e); if(!r||!r.mates||!r.mates.length||!team.length) return 0;
  const map={}; r.mates.forEach(a=>{map[a[0]]={pct:a[1],wr:a[2]};});
  let b=0;
  for(const m of team){ if(m.entry.name===e.name) continue; const o=map[m.entry.name]; if(!o) continue;
    const edge=(o.wr!=null?o.wr:50)-50; if(edge<-4) continue;            // skip pairs that underperform
    b+=Math.min(4,o.pct/12)+Math.min(2,Math.max(0,edge)*0.2);           // co-occurrence + win edge
  }
  return Math.min(8,Math.round(b));
}
// Mega tier list from real results, sorted strongest first. Resolves each mega label back to its
// base species so the UI can show art and the correct mega form.
const _TIER_ORDER={S:0,A:1,B:2,C:3,D:4,F:5};
function megaTierList(){
  return Object.entries(RES_MEGAS).map(([label,r])=>{
    const m=label.match(/^(.*?)-([XY])$/), base=m?m[1]:label, variant=m?m[2]:null;
    return {label,base,variant,entry:byName[base]||null,tier:r.tier||"F",
      teams:r.teams,wr:r.wr,adjWr:r.adjWr,cut:r.cut,best:r.best,score:r.score,top8:r.top8};
  }).sort((a,b)=>(_TIER_ORDER[a.tier]-_TIER_ORDER[b.tier])||((b.score||0)-(a.score||0))||(b.adjWr-a.adjWr));
}
// Mega-pairing tier list (flex-mega duos): each entry resolves both megas to their base species.
function megaPairList(){
  return Object.entries(RES_PAIRS).map(([label,r])=>{
    const parts=label.split(" + ").map(p=>{const m=p.match(/^(.*?)-([XY])$/);const base=m?m[1]:p,variant=m?m[2]:null;return {label:p,base,variant,entry:byName[base]||null};});
    return {label,parts,tier:r.tier||"F",teams:r.teams,wr:r.wr,cut:r.cut,best:r.best,score:r.score,top8:r.top8};
  }).sort((a,b)=>(_TIER_ORDER[a.tier]-_TIER_ORDER[b.tier])||((b.score||0)-(a.score||0))||(b.wr-a.wr));
}
function parseSpread(s){const p=(s||"").split("/").map(n=>parseInt(n,10));if(p.length!==6||p.some(n=>isNaN(n)))return null;return {hp:p[0],atk:p[1],def:p[2],spa:p[3],spd:p[4],spe:p[5]};}
// short tag describing what the real set actually does (for the role label)
function metaDescriptor(e,u){
  const mv=u.moves||[], it=(u.items||[])[0]||"", ab=(u.abilities||[])[0]||"";
  const choice=it==="Choice Scarf"?"Choice Scarf ":it==="Choice Specs"?"Choice Specs ":it==="Choice Band"?"Choice Band ":"";
  if(WEATHER_ABIL[ab]) return WEATHER_ABIL[ab].charAt(0).toUpperCase()+WEATHER_ABIL[ab].slice(1)+" setter";
  if(mv.includes("Trick Room")) return "Trick Room";
  if(mv.includes("Tailwind")) return "Tailwind / speed control";
  if(mv.some(m=>REDIR.includes(m))) return "Redirection support";
  if(mv.includes("Eruption")) return choice+"Eruption (sun)";
  if(mv.includes("Water Spout")) return choice+"Water Spout (rain)";
  if(e.megaStones&&e.megaStones.includes(it)){const i=e.megaStones.indexOf(it);const lab=(e.mega&&e.mega[i]&&e.mega[i].label)||"Mega";return lab;}
  if(choice) return choice.trim();
  if(it==="Assault Vest") return "Assault Vest pivot";
  if(mv.includes("Fake Out")) return "Fake Out tempo";
  const su=SETUP.find(m=>mv.includes(m)); if(su) return "Setup ("+su+")";
  if(RECOVERY.some(m=>mv.includes(m))) return "Bulky support";
  return "Standard build";
}
// build the real most-used set; auto-selects the Mega form if the item is that mon's stone
function metaSet(e){
  const u=usageOf(e); if(!u||!u.moves||!u.moves.length) return null;
  let moves=u.moves.filter(m=>e.moves.includes(m));
  if(moves.length<4){for(const m of recommendMoves(e,"breaker")){if(moves.length<4&&!moves.includes(m))moves.push(m);}}
  moves=moves.slice(0,4); while(moves.length<4) moves.push("");
  const item=(u.items||[])[0]||"Leftovers";
  let formIndex=-1;
  if(e.megaStones&&e.megaStones.includes(item)) formIndex=Math.max(0,e.megaStones.indexOf(item));
  const ability=(u.abilities||[]).find(a=>(e.abilities||[]).includes(a))||recommendAbility(e);
  let nature=(u.natures||[]).find(n=>NATURES.includes(n))||"Modest";
  const points=parseSpread((u.spreads||[])[0])||recommendSpread(e,"breaker").points;
  return {ability,item,nature,points,moves,formIndex,desc:metaDescriptor(e,u),rank:u.rank};
}
const BAD_MOVES=new Set(["Giga Impact","Hyper Beam","Frenzy Plant","Blast Burn","Hydro Cannon","Roar of Time","Prismatic Laser","Eternabeam","Self-Destruct","Explosion","Misty Explosion","Last Resort","Focus Punch","Sky Attack","Razor Wind","Skull Bash","Solar Beam","Solar Blade","Synchronoise","Belch","Spit Up","Bide","Dream Eater","Bounce","Dig","Dive","Fly","Wood Hammer"]);
const goodMove=m=>{const i=moveInfo(m);return (i.c==="Phys"||i.c==="Spec")&&i.bp>=55&&!BAD_MOVES.has(m);};
// move-quality tables: recovery attacks are great on bulky/setup sets; recoil shouldn't stack; stat-drop moves fight setup
const RECOIL_MV=new Set(["Flare Blitz","Brave Bird","Wood Hammer","Head Smash","Double-Edge","Wild Charge","Take Down","Submission","Volt Tackle","Light of Ruin","Chloroblast","Wave Crash"]);
const DRAIN_MV=new Set(["Drain Punch","Giga Drain","Leech Life","Horn Leech","Draining Kiss","Bitter Blade","Parabolic Charge","Bouncy Bubble","Oblivion Wing","Matcha Gotcha","Dream Eater"]);
const SELFDROP_MV=new Set(["Close Combat","Superpower","Draco Meteor","Overheat","Leaf Storm","Fleur Cannon","Make It Rain","V-create","Hammer Arm","Psycho Boost"]);
// lock-in moves: in doubles you can't pick the target and you're stuck 2-3 turns (can hit your ally / an immune mon)
const LOCK_MV=new Set(["Outrage","Petal Dance","Thrash","Raging Fury","Uproar"]);
// shaky-accuracy attacks (~<=80%) — prefer the reliable option unless No Guard makes them hit
const RISKY_MV=new Set(["Dragon Rush","Stone Edge","Cross Chop","Iron Tail","Hydro Pump","Focus Blast","Thunder","Blizzard","Hurricane","Zap Cannon","Dynamic Punch","Gunk Shot","Inferno","Megahorn","Fire Blast","Sing","Will-O-Wisp","Mud Bomb"]);
// the worst offenders (≤70% accuracy, no weather redemption) — penalized harder so an accurate option wins
const VERY_RISKY=new Set(["Focus Blast","Inferno","Zap Cannon","Dynamic Punch","Sing"]);
// setup-move preference: [boosts atk/spa/both, score] — speed-boosting setups rank highest for sweepers
const SETUP_INFO={"Dragon Dance":["atk",10],"Shift Gear":["atk",10],"Victory Dance":["atk",9],"Tidy Up":["atk",7],"Swords Dance":["atk",7],"Bulk Up":["atk",6],"Coil":["atk",6],"Hone Claws":["atk",5],"Howl":["atk",4],"Curse":["atk",3],
  "Quiver Dance":["spa",10],"Tail Glow":["spa",10],"Geomancy":["spa",10],"Nasty Plot":["spa",7],"Calm Mind":["spa",6],"Take Heart":["spa",6],
  "Shell Smash":["both",9],"Clangorous Soul":["both",9],"Work Up":["both",5],"Growth":["both",4]};
function bestSetup(e,phys){
  const want=phys?"atk":"spa";
  const cand=(e.moves||[]).filter(m=>SETUP_INFO[m]&&(SETUP_INFO[m][0]===want||SETUP_INFO[m][0]==="both")).sort((a,b)=>SETUP_INFO[b][1]-SETUP_INFO[a][1]);
  return cand[0]||null;   // no off-category fallback: a +Atk setup is useless on a special set (and vice versa)
}
function recommendMoves(e,roleKey,lean){
  const mp=e.moves,picked=[],phys=isPhysical(e);
  const bulky=["sweeper","tr","wall","pivot","redir"].includes(roleKey);
  const rockHead=(e.abilities||[]).includes("Rock Head");
  const noGuard=(e.abilities||[]).includes("No Guard");
  // tournament-proven moves for this species (Limitless M-B): how often real winning teams run each.
  const proven={}; {const pr=resultsFor(e); if(pr&&pr.moves) pr.moves.forEach(([mv,pct])=>{proven[mv]=pct;});}
  const add=m=>{if(m&&mp.includes(m)&&!picked.includes(m)&&picked.length<4){picked.push(m);return true;}return false;};
  const hasRecoil=()=>picked.some(m=>RECOIL_MV.has(m));
  // If this set runs a single-category setup (Swords Dance / Dragon Dance -> Atk; Nasty Plot / Calm Mind -> SpA),
  // commit the WHOLE offensive moveset to that category — a +Atk boost does nothing for special moves and vice versa.
  const setupMove=(roleKey==="sweeper")?bestSetup(e,phys):null;
  const setupCat=setupMove&&SETUP_INFO[setupMove]?SETUP_INFO[setupMove][0]:null;   // "atk" | "spa" | "both"
  let pref=phys?"Phys":"Spec";
  let mixed=Math.abs(e.baseStats.atk-e.baseStats.spa)<=10;          // genuine mixed attacker?
  if(setupCat==="atk"){pref="Phys";mixed=false;}                    // Swords/Dragon Dance set -> physical only
  else if(setupCat==="spa"){pref="Spec";mixed=false;}              // Nasty Plot/Calm Mind set -> special only
  // quality score for a damaging move in this role/context
  const score=m=>{const i=moveInfo(m);let s=i.bp||0;
    if(e.types.includes(i.t))s+=25;                                  // STAB
    if(i.c===pref)s+=6; else if(!mixed)s-=30;                        // off-category move wastes the unused stat
    if(i.t==="Normal"&&!e.types.includes("Normal"))s-=25;            // Normal "coverage" hits nothing super-effectively
    if(RISKY_MV.has(m)&&!noGuard)s-=(VERY_RISKY.has(m)?35:22);      // ≤70% accuracy hurts more — misses lose games
    if(DRAIN_MV.has(m))s+=bulky?25:8;                                // recovery — huge on setup/bulky
    if(RECOIL_MV.has(m))s-=(hasRecoil()&&!rockHead)?55:(rockHead?0:6); // don't stack recoil
    if(SELFDROP_MV.has(m)){                                          // -2 stat undoes boosts / cuts staying power
      // if a reliable same-type alternative exists (Energy Ball vs Leaf Storm), strongly prefer it; you keep the coverage
      const altSameType=mp.some(x=>x!==m&&moveInfo(x).t===i.t&&moveInfo(x).c===i.c&&moveInfo(x).bp>=70&&!SELFDROP_MV.has(x)&&!BAD_MOVES.has(x));
      s-= altSameType?60 : (roleKey==="sweeper"||roleKey==="tr"||roleKey==="wall"?40:10);
    }
    if(LOCK_MV.has(m))s-=45;                                         // lock-in is bad in doubles (no target choice)
    if(proven[m])s+=Math.min(16,proven[m]*0.16);                     // real winning M-B sets run this move (usage %)
    return s;};
  // a category-locked set (Swords/Dragon Dance/Bulk Up -> Phys; Nasty Plot/Calm Mind -> Spec) takes ONLY that category
  const categoryLocked=setupCat==="atk"||setupCat==="spa";
  const damaging=m=>{const i=moveInfo(m);return (i.c==="Phys"||i.c==="Spec")&&i.bp>=55&&!BAD_MOVES.has(m)&&(!categoryLocked||i.c===pref);};
  // 1) role utility move
  if(roleKey==="sweeper")add(bestSetup(e,phys));
  if(roleKey==="tr"&&mp.includes("Trick Room"))add("Trick Room");
  if(roleKey==="speed"){const rec=recommendSpeedCtrl(e,lean);add(rec?rec.move:(mp.includes("Tailwind")?"Tailwind":"Trick Room"));}
  if(roleKey==="redir")add(mp.includes("Rage Powder")?"Rage Powder":"Follow Me");
  if(roleKey==="fakeout")add("Fake Out");
  if(roleKey==="support"){add(bestSupportMove(e)); if(mp.includes("Fake Out"))add("Fake Out"); if(mp.includes("Protect"))add("Protect");}
  if(roleKey==="lrfeeder")add(["Discharge","Parabolic Charge","Electroweb"].find(m=>mp.includes(m)));
  if(roleKey==="pivot")add(PIVOT.find(m=>mp.includes(m)));
  // 2) best STAB per type (quality-scored, not just BP)
  for(const ty of e.types){
    const c=mp.filter(m=>damaging(m)&&moveInfo(m).t===ty).sort((a,b)=>score(b)-score(a));
    if(c.length)add(c[0]);
  }
  // 3) a priority move for physical attackers (revenge / chip) — allow low-BP priority like Mach Punch/Bullet Punch
  if(phys&&picked.length<4){const pr=mp.filter(m=>PRIORITY.includes(m)&&moveInfo(m).bp>0&&!BAD_MOVES.has(m)&&(!categoryLocked||moveInfo(m).c===pref)).sort((a,b)=>score(b)-score(a));if(pr.length)add(pr[0]);}
  // 4) a recovery attack on bulky/setup sets if not already in
  if(bulky&&picked.length<4){const dr=mp.filter(m=>DRAIN_MV.has(m)&&damaging(m)).sort((a,b)=>score(b)-score(a));if(dr.length)add(dr[0]);}
  // 5) coverage: best damaging move of a new type
  const have=new Set(picked.map(m=>moveInfo(m).t));
  const cov=mp.filter(m=>damaging(m)&&!have.has(moveInfo(m).t)).sort((a,b)=>score(b)-score(a));
  if(cov.length)add(cov[0]);
  // 6) Protect for doubles, then best remaining (never junk)
  if(picked.length<4)add(mp.includes("Protect")?"Protect":null);
  if(picked.length<4){const rest=mp.filter(damaging).sort((a,b)=>score(b)-score(a));for(const m of rest)add(m);}
  if(picked.length<4)for(const m of mp){const i=moveInfo(m);const offCat=categoryLocked&&(i.c==="Phys"||i.c==="Spec")&&i.c!==pref;if(!BAD_MOVES.has(m)&&!offCat)add(m);}
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
// heuristic set for a Mega form (used when there's no Pikalytics usage to copy)
function megaFormSet(e,idx,roleKey){
  const mg=e.mega&&e.mega[idx]; if(!mg||!mg.baseStats)return null;
  const pseudo={name:e.name,types:mg.type||e.types,abilities:[mg.ability],baseStats:mg.baseStats,moves:e.moves,mega:[],megaStones:e.megaStones};
  const role=roleKey||(SETUP.some(m=>e.moves.includes(m))?"sweeper":(mg.baseStats.spe<=55?"tr":"breaker"));
  const sp=recommendSpread(pseudo,role);
  return {ability:mg.ability,item:(e.megaStones&&(e.megaStones[idx]||e.megaStones[0]))||"",nature:sp.nature,points:sp.points,moves:recommendMoves(pseudo,role),formIndex:idx};
}
function recommendSet(e,roleKey,lean){
  if(roleKey==="meta"){const ms=metaSet(e);if(ms)return ms;}
  const mm=/^mega(\d+)(?::(.+))?$/.exec(roleKey||""); if(mm){const ms=megaFormSet(e,+mm[1],mm[2]);if(ms)return ms;}
  const sp=recommendSpread(e,roleKey);return {ability:recommendAbility(e),item:recommendItem(e,roleKey),nature:sp.nature,points:sp.points,moves:recommendMoves(e,roleKey,lean),formIndex:-1};}
// which speed-control setters belong in the speed slot, by what the team has COMMITTED to:
//   "tr" (a Trick Room move or TR-wallbreaker role is on the team) · "tailwind" (a Tailwind move) · "both" (uncommitted).
function speedSetterPref(team){
  if(!team||!team.length) return "both";
  const tm=team.flatMap(m=>setMovesOf(m));
  const trCommit=tm.includes("Trick Room")||team.some(m=>/(^|:)tr$/.test(m.roleKey||""));
  const twCommit=tm.includes("Tailwind");
  if(trCommit&&!twCommit) return "trickroom";
  if(twCommit&&!trCommit) return "tailwind";
  return "both";
}

/* ---------- model phases: needs plan (3), threat map (4), stress test (6), legality (7) ---------- */
function planForLead(lead,roleKey){
  const second=isPhysical(lead)?"special":"physical";
  const P={
    sweeper:[["redir","Free setup turn — redirection"],["speed","Speed control"],[second,"Secondary breaker"],["priority","Revenge / priority"],["fakeout","Disruption / Fake Out"]],
    tr:[["trsetter","Trick Room setter"],["redir","Redirection / heal to survive setup"],[second,"2nd Trick Room attacker"],["intimidate","Defensive glue"]],
    breaker:[["speed","Speed control"],["redir","Free turn / disruption"],[second,"Partner that covers its checks"],["priority","Priority"]],
    weather:[[isPhysical(lead)?"physical":"special","Weather abuser"],["speed","Speed control"],["redir","Free turn"],["intimidate","Glue"]],
    speed:[["physical","Win condition"],["special","Win condition"],["redir","Free turn"],["priority","Priority"]],
    redir:[["special","Win condition it enables"],["physical","Win condition it enables"],["speed","Speed control"],["fakeout","Fake Out"]],
    fakeout:[["special","Win condition"],["physical","Win condition"],["speed","Speed control"],["redir","Redirection"]],
    pivot:[["special","Win condition"],["physical","Win condition"],["speed","Speed control"],["intimidate","Glue"]],
    wall:[["special","Win condition"],["physical","Win condition"],["speed","Speed control"],["priority","Priority"]],
    antiintim:[["speed","Speed control"],["redir","Free turn / disruption"],[second,"Partner that covers its checks"],["priority","Priority"]],
    meta:[["speed","Speed control"],["redir","Redirection / free turn"],[second,"Partner covering its checks"],["priority","Priority"],["intimidate","Defensive glue"]]
  };
  let plan=P[roleKey]||P.breaker;
  // Lightning Rod self-boost core: a special Lightning Rod lead wants a spread-Electric (Discharge) feeder;
  // a Discharge lead wants a Lightning Rod absorber to soak it for the free +SpA.
  const megaAbil=(lead.mega||[]).map(m=>m.ability);
  const leadLR=(lead.abilities||[]).includes("Lightning Rod")||megaAbil.includes("Lightning Rod");
  const leadSpecial=Math.max(lead.baseStats.spa,...(lead.mega||[]).map(m=>m.baseStats.spa||0))>=lead.baseStats.atk;
  const leadFeeds=(lead.moves||[]).some(m=>["Discharge","Electroweb","Parabolic Charge"].includes(m));
  if(leadLR&&leadSpecial) plan=[["lrfeeder","Discharge partner — feeds its Lightning Rod (+SpA each turn)"],["safedischarge","Safe Discharge backup — Electric-immune body (Ground, etc.) for the locked Scarf user"]].concat(plan);
  else if(leadFeeds) plan=[["lrabsorber","Lightning Rod partner to soak your Discharge for a free +SpA"],["safedischarge","Safe Discharge backup — a 2nd Electric-immune body (Ground, etc.)"]].concat(plan);
  // physical-attacker teams want a Defiant/Competitive answer so opposing Intimidate doesn't sap them
  if(isPhysical(lead) && ["sweeper","breaker","tr","antiintim","meta"].includes(roleKey) && !plan.some(p=>p[0]==="antiintim"))
    plan=plan.concat([["antiintim","Anti-Intimidate (Defiant / Competitive)"]]);
  return plan;
}
function archetypeThreats(lead){
  const m=Object.fromEntries(weaknessesOf(lead).weak); const out=[];
  if(m.Rock) out.push((m.Rock>=4?"4× ":"")+"Sand / Rock (Tyranitar, Aerodactyl)");
  if(m.Water) out.push("Rain (Water spam)");
  if(m.Fire) out.push("Sun (Fire)");
  if(m.Ice) out.push("Snow / Ice");
  if(m.Fairy) out.push("Fairy");
  if(m.Flying) out.push("Flying offense");
  if(m.Electric) out.push("Electric");
  if(lead.baseStats.spe>=100) out.push("priority users");
  return out;
}
function teamResists(team,atk){return team.some(mm=>{const ef=effOf(mm);return effTable(ef,ef.abilities[0])[atk]<1;});}
function teamAtk(team,types){return team.some(mm=>setMovesOf(mm).some(mv=>{const i=moveInfo(mv);return types.includes(i.t)&&i.bp>=55;}));}
function stressTest(team){
  const prio=team.some(mm=>setMovesOf(mm).some(x=>PRIORITY.includes(x)));
  return [
    {a:"Rain",ok:teamResists(team,"Water")||teamAtk(team,["Grass","Electric"]),why:"resist Water or Grass/Electric offense"},
    {a:"Sun",ok:teamResists(team,"Fire")||teamAtk(team,["Water","Rock"]),why:"resist Fire or Water/Rock offense"},
    {a:"Sand (Tyranitar)",ok:teamResists(team,"Rock")||teamAtk(team,["Fighting","Ground","Water","Grass","Steel","Fairy"]),why:"resist Rock or hit it super-effectively"},
    {a:"Snow / Ice",ok:teamResists(team,"Ice")||teamAtk(team,["Fire","Fighting","Rock","Steel"]),why:"resist Ice or hit Ice SE"},
    {a:"Fairy",ok:teamResists(team,"Fairy")||teamAtk(team,["Steel","Poison"]),why:"resist Fairy or Steel/Poison offense"},
    {a:"Opposing Trick Room",ok:team.some(mm=>setMovesOf(mm).includes("Taunt"))||team.some(mm=>setMovesOf(mm).includes("Trick Room"))||team.some(mm=>offense(mm.entry)>=95&&effOf(mm).baseStats.spe<=55)||prio,why:"Taunt or your own Trick Room to take it down, a slow attacker to abuse it, or priority"},
    {a:"Opposing Tailwind HO",ok:prio||team.some(mm=>setMovesOf(mm).some(x=>SPEEDCTRL.includes(x))),why:"your own speed control or priority"}
  ];
}
function itemClause(team){const items=team.map(m=>m.set&&m.set.item).filter(Boolean);const seen={},dups=new Set();for(const it of items){if(seen[it])dups.add(it);seen[it]=1;}return [...dups];}

/* ---------- slot-role-aware scoring (rank by how GOOD a mon is at the role, not raw BST) ---------- */
const SUPPORT_KIT=["Encore","Light Screen","Reflect","Aurora Veil","Helping Hand","Fake Out","Rage Powder","Follow Me","Taunt","Will-O-Wisp","Thunder Wave","Icy Wind","Electroweb","Parting Shot","Heal Pulse","Life Dew","Coaching","Snarl","Pollen Puff","Wide Guard"];
function roleExecution(e,slot){
  const ab=e.abilities||[], mv=e.moves, off=offense(e), bv=bulk(e), sp=e.baseStats.spe;
  const kit=mv.filter(m=>SUPPORT_KIT.includes(m)).length;
  const bulkPts=Math.max(0,Math.min(12,Math.round((bv-210)/12)));
  switch(slot){
    case "speed": {let s=6;if(ab.includes("Prankster"))s+=18;s+=bulkPts;s+=Math.min(10,kit*3);return Math.min(40,s);}      // Tailwind setter
    case "trsetter": {let s=6;s+=bulkPts+2;if(sp<=55)s+=10;s+=Math.min(8,kit*2);return Math.min(40,s);}
    case "redir": {let s=8;if(ab.includes("Prankster"))s+=8;if(ab.includes("Friend Guard")||ab.includes("Hospitality"))s+=12;s+=bulkPts;s+=Math.min(6,kit*2);return Math.min(40,s);}
    case "fakeout": {let s=8;if(ab.includes("Intimidate"))s+=12;s+=Math.min(8,bulkPts);if(mv.some(m=>PIVOT.includes(m)))s+=4;s+=Math.min(8,Math.round((off-80)/12));return Math.min(40,s);}
    case "intimidate": {let s=ab.includes("Intimidate")?20:2;s+=bulkPts;s+=Math.min(8,Math.round((off-70)/12));return Math.min(40,s);}
    case "antiintim": {let s=ab.some(a=>INTIM_BOOST.includes(a))?24:ab.some(a=>INTIM_IMMUNE.includes(a))?14:2;s+=Math.min(12,Math.round((off-70)/6))+Math.min(4,bulkPts);return Math.min(40,s);}  // Defiant/Competitive > immune
    case "pivot": {let s=6;if(mv.some(m=>PIVOT.includes(m)))s+=10;s+=Math.min(16,bulkPts+4);return Math.min(40,s);}
    case "support": {let s=8;if(mv.includes("Coaching")||mv.includes("Decorate"))s+=12;else if(mv.some(m=>TEAM_SUPPORT_MV.includes(m)))s+=8;if(mv.includes("Fake Out"))s+=4;if(ab.includes("Intimidate"))s+=6;s+=Math.min(8,bulkPts);return Math.min(40,s);}
    case "wall": {let s=Math.min(22,Math.round((bv-250)/8));if(RECOVERY.some(m=>mv.includes(m)))s+=12;return Math.min(40,s);}
    case "weather": return 22;
    case "priority": {let s=4;if(mv.some(m=>PRIORITY.includes(m)))s+=16;if(ab.includes("Gale Wings")||ab.includes("Triage"))s+=14;s+=Math.min(14,Math.round((off-70)/8));if(ab.includes("Technician"))s+=4;return Math.min(40,s);}
    default: { // physical / special / breaker / any: offense + coverage breadth + speed
      const covT=new Set(mv.filter(m=>moveInfo(m).bp>=70).map(m=>moveInfo(m).t)).size;
      let s=Math.max(0,Math.round((off-70)/4)); s+=Math.min(8,covT*2); if(sp>=95)s+=4; return Math.min(40,s);
    }
  }
}
// does this candidate offensively threaten the things that beat the lead? (covers the lead's checks)
function leadCoverageBonus(e,lead){
  if(!lead) return 0;
  const leadWeak=weaknessesOf(lead).weak.map(x=>x[0]);
  const myAtk=new Set(e.moves.filter(m=>moveInfo(m).bp>=55).map(m=>moveInfo(m).t));
  let b=0;
  for(const wt of leadWeak){ for(const at of myAtk){ if(CHART[at]&&CHART[at][wt]>1){ b+=2; break; } } }
  return Math.min(8,b);
}
// which defending types does the team's actual attacking moves hit super-effectively?
function teamOffense(team){
  const atk=new Set();
  for(const m of team) for(const mv of setMovesOf(m)){const i=moveInfo(mv); if(i.bp>=55&&i.t) atk.add(i.t);}
  const best={};
  for(const dt of TYPES){let b=0; for(const at of atk){const x=(CHART[at]&&CHART[at][dt]!=null)?CHART[at][dt]:1; b=Math.max(b,x);} best[dt]=b;}
  return {atk:[...atk], se:TYPES.filter(t=>best[t]>=2), neutralOrBetter:TYPES.filter(t=>best[t]>=1), gaps:TYPES.filter(t=>best[t]<1)};
}
// does adding this candidate give the team NEW super-effective coverage (STAB proxy)?
function offCoverageBonus(e,team){
  const cur=new Set();
  for(const m of team){const ef=effOf(m);for(const t of ef.types)for(const dt of TYPES)if(CHART[t]&&CHART[t][dt]>=2)cur.add(dt);}
  const added=new Set();
  for(const t of e.types)for(const dt of TYPES)if(CHART[t]&&CHART[t][dt]>=2&&!cur.has(dt))added.add(dt);
  return Math.min(8,added.size*1.5);
}

/* ---------- format-meta (Champions Reg M-B, calibrated from NAIC/Indianapolis/Global-Challenge/Smogon-Major top cut) ---------- */
// the offensive types the format punishes most via common spread/strong moves (weight = how scary a shared weakness is)
const SPREAD_THREAT={Ground:1.0,Rock:1.0,Fire:.9,Fairy:.85,Water:.7,Ice:.5,Flying:.5,Steel:.45,Dark:.4,Electric:.4,Ghost:.4};
const REDIR_MV=["Follow Me","Rage Powder"];
const WEATHER_SET_ABIL={Drought:"sun",Drizzle:"rain","Sand Stream":"sand","Snow Warning":"snow","Orichalcum Pulse":"sun"};
const STAT_DROP_SUPPORT=["Fake Tears","Charm","Tickle","Screech","Metal Sound","Parting Shot","Snarl"]; // open KO ranges for a partner
/* which "speed mode" is this team committed to? tailwind / trickroom / priority-HO / none / open(early) */
function teamSpeedMode(team){
  if(!team.length) return "open";
  const mv=team.flatMap(m=>setMovesOf(m));
  const tw=mv.includes("Tailwind"), tr=mv.includes("Trick Room");
  const atk=team.filter(m=>offense(m.entry)>=95);
  const fast=atk.filter(m=>effOf(m).baseStats.spe>=80).length, slow=atk.filter(m=>effOf(m).baseStats.spe<=55).length;
  const prio=team.filter(m=>setMovesOf(m).some(x=>PRIORITY.includes(x))).length;
  if(tr&&!tw) return "trickroom";
  if(tw&&!tr) return "tailwind";
  if(tw&&tr) return slow>fast?"trickroom":"tailwind";
  if(prio>=2&&fast>=2) return "priority";                 // priority hyper-offense — a real ~25% Champions archetype
  return team.length>=4?"none":"open";
}
// suggestion-time speed LEAN: if no setter is committed yet, infer Tailwind vs Trick Room from the attacker
// speed profile + any Trick Room role already chosen — so the speed-control slot offers the right setters early.
function teamSpeedLean(team){
  const base=teamSpeedMode(team);
  if(base==="tailwind"||base==="trickroom"||base==="priority") return base;   // a real plan is already committed
  const trRole=team.some(m=>/(^|:)tr$/.test(m.roleKey||""));                  // a Trick Room wallbreaker was picked
  const slow=team.filter(m=>offense(m.entry)>=100&&effOf(m).baseStats.spe<=75).length;   // slow heavy hitters
  const fast=team.filter(m=>offense(m.entry)>=95&&effOf(m).baseStats.spe>=80).length;    // fast attackers
  if(trRole||slow>fast) return "trickroom";
  if(fast>slow) return "tailwind";
  return base;
}
// how well does the candidate fit the team's committed speed plan?
function speedFit(e,team){
  const mode=teamSpeedLean(team), spe=e.baseStats.spe, off=offense(e), prio=e.moves.some(m=>PRIORITY.includes(m));
  // counts of existing on/off-mode ATTACKERS, so the FIRST off-mode piece reads as flex, not a mistake
  const slowN=team.filter(m=>offense(m.entry)>=95&&effOf(m).baseStats.spe<=55).length;   // slow (TR-abusing) attackers
  const fastN=team.filter(m=>offense(m.entry)>=95&&effOf(m).baseStats.spe>=90).length;   // fast cleaners
  switch(mode){
    case "tailwind":
      if(e.moves.includes("Tailwind"))return 7;
      if(spe>=80||prio)return 6;
      // a slow attacker is the FLEX piece — it relishes the opponent's Trick Room. Reward the first; a 2nd is a liability.
      if(off>=95&&spe<=55)return slowN===0?3:-5;
      return 1;
    case "trickroom":
      if(e.moves.includes("Trick Room"))return 7;
      if(spe<=55&&off>=95)return 7;
      // a fast attacker is the CLEANER — it mops up once TR ends or the setter falls. Reward the first; a 2nd undercuts TR.
      if(spe>=90&&off>=95&&!prio)return fastN===0?3:-6;
      return 1;
    case "priority": if(prio)return 6; if(spe>=95)return 4; if(off>=95&&spe<60&&!prio)return -3; return 1;
    case "none": if(e.moves.includes("Tailwind")||e.moves.includes("Trick Room"))return 8; if(prio)return 4; return 0; // team has no speed plan yet — adding one is valuable
    default: return e.moves.includes("Tailwind")||e.moves.includes("Trick Room")?4:0;
  }
}
// is THIS candidate the team's flex/off-mode piece (for a UI tag only — scoring lives in speedFit)?
function flexSpeedRole(e,team){
  if(team.length<3) return null;
  const mode=teamSpeedLean(team), spe=e.baseStats.spe, off=offense(e), prio=e.moves.some(m=>PRIORITY.includes(m));
  const slowN=team.filter(m=>offense(m.entry)>=95&&effOf(m).baseStats.spe<=55).length;
  const fastN=team.filter(m=>offense(m.entry)>=95&&effOf(m).baseStats.spe>=90).length;
  if(mode==="tailwind"&&off>=95&&spe<=55&&!prio&&slowN===0) return "flex vs Trick Room";
  if(mode==="trickroom"&&off>=95&&spe>=90&&!prio&&fastN===0) return "fast cleaner";
  return null;
}
// does the candidate complete an enabler→payoff core (the single highest-value synergy signal)?
function enablerBonus(e,team){
  let b=0; const tm=team.flatMap(m=>setMovesOf(m)), tAb=team.flatMap(m=>effOf(m).abilities);
  const eSetupSweeper=has(e,SETUP).length&&offense(e)>=95, eRedir=e.moves.some(m=>REDIR_MV.includes(m));
  const teamRedir=tm.some(m=>REDIR_MV.includes(m)), teamSetupSweeper=team.some(m=>has(m.entry,SETUP).length&&offense(m.entry)>=95);
  if(teamRedir&&eSetupSweeper)b+=8;                       // existing redirection protects a new setup sweeper
  if(teamSetupSweeper&&eRedir)b+=8;                       // new redirection protects an existing setup sweeper
  if(tm.includes("Beat Up")&&e.moves.includes("Rage Fist"))b+=8;
  if(team.some(m=>m.entry.moves.includes("Rage Fist"))&&e.moves.includes("Beat Up"))b+=8;
  if(tm.some(m=>STAT_DROP_SUPPORT.includes(m))&&offense(e)>=110)b+=4;   // -SpD/-Atk support opens KOs for a big attacker
  if(e.moves.some(m=>STAT_DROP_SUPPORT.includes(m))&&team.some(m=>offense(m.entry)>=110))b+=4;
  // Lightning Rod / Storm Drain self-boost engine: an ally's SPREAD move feeds the absorber +1 SpA each turn
  // while still hitting both opponents — e.g. Mega Sceptile (Lightning Rod) + a fast Discharge user.
  const ELEC_SPREAD=["Discharge","Electroweb","Parabolic Charge"], WATER_SPREAD=["Surf","Muddy Water","Sparkling Aria"];
  const abilsOf=m=>(effOf(m).abilities||[]).concat((m.entry.mega||[]).map(x=>x.ability));   // active + any mega ability
  const specialMon=m=>Math.max(m.entry.baseStats.spa,...(m.entry.mega||[]).map(x=>x.baseStats.spa||0))>=m.entry.baseStats.atk;
  const eAb=(e.abilities||[]).concat((e.mega||[]).map(x=>x.ability));
  const eSpecial=Math.max(e.baseStats.spa,...(e.mega||[]).map(x=>x.baseStats.spa||0))>=e.baseStats.atk;
  const eFeedsElec=e.moves.some(m=>ELEC_SPREAD.includes(m)), eFeedsWater=e.moves.some(m=>WATER_SPREAD.includes(m));
  const teamFeedsElec=tm.some(m=>ELEC_SPREAD.includes(m)), teamFeedsWater=tm.some(m=>WATER_SPREAD.includes(m));
  const teamLR=team.some(m=>abilsOf(m).includes("Lightning Rod")&&specialMon(m));
  const teamSD=team.some(m=>abilsOf(m).includes("Storm Drain")&&specialMon(m));
  if(eAb.includes("Lightning Rod")&&eSpecial&&teamFeedsElec)b+=9;   // special Lightning Rod mon + an ally's spread Electric
  if(eFeedsElec&&teamLR)b+=9;                                       // spread-Electric ally feeds a Lightning Rod attacker
  if(eAb.includes("Storm Drain")&&eSpecial&&teamFeedsWater)b+=8;    // Storm Drain equivalent with spread Water
  if(eFeedsWater&&teamSD)b+=8;
  // safe Discharge backup: with a (often Choice Scarf, locked) Discharge user already on the team, a second
  // Electric-immune body lets the locked Discharge fire freely when the Lightning Rod absorber isn't out
  if(teamFeedsElec&&teamLR&&electricImmune(e)&&!eAb.includes("Lightning Rod"))b+=5;
  // weather setter <-> abuser
  const eWeather=(e.abilities||[]).map(a=>WEATHER_SET_ABIL[a]).find(Boolean);
  const teamWeatherSet=tAb.map(a=>WEATHER_SET_ABIL[a]).find(Boolean);
  const abuses=(mon,w)=>(mon.abilities||[]).some(a=>WEATHER_BENEFIT_ABIL[w]&&WEATHER_BENEFIT_ABIL[w].includes(a))||(w==="sun"&&mon.types.includes("Fire"))||(w==="rain"&&mon.types.includes("Water"));
  if(teamWeatherSet&&abuses(e,teamWeatherSet))b+=6;
  if(eWeather&&team.some(m=>abuses(m.entry,eWeather)))b+=6;
  return Math.min(14,b);
}
// does the candidate answer an M-B threat the team is currently weak to (resists a scary spread type the team stacks)?
function threatAnswerBonus(e,team){
  if(team.length<2) return 0;
  const tally=teamWeakTally(team); let b=0;
  const ef={types:e.types,abilities:e.abilities,baseStats:e.baseStats};
  const tbl=effTable(ef,(e.abilities||[])[0]);
  for(const [t,v] of Object.entries(tally)){
    const w=SPREAD_THREAT[t]||0; if(!w) continue;
    if((v.count>=2||v.max>=4)&&tbl[t]<1) b+=6*w;          // team stacks a scary type AND candidate resists/immune it
  }
  return Math.min(12,Math.round(b));
}
// reward the 1st Intimidate, penalize stacking a 2nd (top Champions teams never double-Intimidate)
function intimidateDiscipline(e,team){
  if(!(e.abilities||[]).includes("Intimidate")) return 0;
  return team.some(m=>effOf(m).abilities.includes("Intimidate"))?-5:0;
}
// Damage-aware: does this candidate PATCH a meta threat the team currently can't check?
// Memoised on the team's matchup state so it's computed once per scoring pass, not per candidate.
let _muMemo={sig:null,mu:null,tm:null};
function teamMatchupState(team){
  const sig=team.map(m=>m.entry.name+":"+m.formIndex+":"+(m.set&&m.set.nature||"")+":"+JSON.stringify(m.set&&m.set.points||{})+":"+(m.set&&m.set.item||"")).join("|");
  if(_muMemo.sig!==sig){_muMemo={sig,mu:threatMatchups(team),tm:threatMembers()};}
  return _muMemo;
}
function checkCoverageBonus(e,team,slot){
  if(team.length<1) return 0;
  const {mu,tm}=teamMatchupState(team);
  if(!mu.uncovered&&!mu.neutral) return 0;             // already check everything → no patch available
  const weather=teamWeather(team);
  const set=recommendSet(e,slot&&slot.key?slot.key:"meta");
  const cm={entry:e,formIndex:(set.formIndex!=null?set.formIndex:-1),set};
  let b=0;
  mu.rows.forEach((row,i)=>{
    if(row.tier>=2) return;                             // already a check — nothing to patch
    const t=tm[i]; if(!t) return;
    const inc=bestHitPct(t,cm,{weather});               // threat's max% on the candidate
    const ko=memberKOon(cm,t,{weather,spread:false});   // candidate's KO on the threat
    const survives=inc<100, faster=memberSpeed(cm,{weather}).spe>memberSpeed(t,{weather}).spe;
    const becomesCheck=(survives&&ko.mn>=50)||(faster&&ko.mn>=100);
    if(becomesCheck) b+=row.tier===0?7:2;              // patching an UNCOVERED threat >> upgrading a soft one
  });
  return Math.min(16,Math.round(b));
}
function scoreForSlot(e,team,slot){
  const b=scoreCandidate(e,team), exe=roleExecution(e,slot);
  const lead=team[0]&&team[0].entry, leadCov=leadCoverageBonus(e,lead), offCov=offCoverageBonus(e,team);
  // synergy layer (Champions Reg M-B calibrated): speed-mode fit, enabler→payoff cores, threat answers, Intimidate discipline
  const spd=speedFit(e,team), enab=enablerBonus(e,team), threat=threatAnswerBonus(e,team), intim=intimidateDiscipline(e,team);
  const chk=checkCoverageBonus(e,team,slot);   // damage-aware: patches an uncovered/soft top threat
  const proven=provenBonus(e);                  // tournament win rate vs the field (performance, not popularity)
  const mate=teammateSynergy(e,team);           // proven teammate cores (co-occurrence × pair win rate)
  // Score is purely about fit: how well it executes the role + how it supports THIS team.
  // Raw usage/popularity is NOT a factor (`rank` is informational); win rate IS, because it measures
  // whether the Pokémon actually wins games in real M-B events — modest, sample-gated, capped at ±5.
  const teamFit=b.typing+Math.min(18,b.cov)+b.weather+leadCov+offCov;
  const synergy=spd+enab+threat+intim+chk+proven+mate;   // Reg M-B synergy layer
  const total=Math.max(0,Math.min(100,Math.round(teamFit*0.62+exe+synergy)));
  const u=usageOf(e), res=resultsFor(e);
  return {...b,exe,leadCov,offCov,spd,enab,threat,intim,chk,proven,mate,synergy,rank:u&&u.rank!=null?u.rank:null,
    wr:res?res.wr:null,adjWr:res?res.adjWr:null,cut:res?res.cut:null,best:res?res.best:null,resTeams:res?res.teams:null,total};
}

/* ---------- live team health score ---------- */
const MODE_LABEL={tailwind:"Tailwind",trickroom:"Trick Room",priority:"Priority offense",none:"No speed plan",open:"—"};
function teamHealth(team){
  if(!team||!team.length) return {score:0,grade:"–",flags:[],tally:{},mode:"open"};
  const tally=teamWeakTally(team), needs=teamNeeds(team), off=teamOffense(team), n=team.length;
  const mode=teamSpeedMode(team), tm=team.flatMap(m=>setMovesOf(m));
  const fastN=team.filter(m=>offense(m.entry)>=95&&effOf(m).baseStats.spe>=80).length;   // fast attackers
  const slowN=team.filter(m=>offense(m.entry)>=95&&effOf(m).baseStats.spe<=55).length;   // slow (TR-abusing) attackers
  const trAnswer=tm.includes("Taunt")||tm.includes("Trick Room")||slowN>=1;              // can interact with opposing TR
  let score=100; const flags=[];
  // defensive: shared weaknesses weighted by how scary that type is as a Reg M-B spread move.
  // This is a SOFT proxy — the damage-aware matchup check below is the real signal — so it's capped,
  // and a weakness the team has a resist/immunity to is downgraded to info (you can pivot into it).
  let defPen=0;
  for(const [t,v] of Object.entries(tally)){
    const answer=teamResists(team,t), threat=0.6+(SPREAD_THREAT[t]||0)*0.6;   // Ground/Rock/Fire/Fairy hurt more
    const k=(answer?0.3:1)*threat, sfx=answer?` — but ${t} is resisted on the team`:"";
    if(v.count>=3){defPen+=7*k;flags.push({sev:answer?0:2,msg:`${v.count} members weak to ${t}${sfx}`});}
    else if(v.count>=2){defPen+=3*k;flags.push({sev:answer?0:1,msg:`${v.count} members weak to ${t}${sfx}`});}
    if(v.max>=4&&!answer){defPen+=3*threat;flags.push({sev:2,msg:`4× ${t} weakness, no resist`});}     // 4× only stings with no answer
  }
  score-=Math.min(20,defPen);   // cap the abstract type penalty; matchup viability carries the real weight
  if(n>=3&&off.gaps.length){score-=Math.min(15,off.gaps.length*4);flags.push({sev:2,msg:`No super-effective hit on ${off.gaps.join(", ")}`});}
  if(n>=3&&off.se.length<10) score-=(10-off.se.length)*1.5;
  // role backbone — calibrated to Champions top-cut frequencies (Intimidate is OPTIONAL, never required)
  if(n>=4){
    if(mode==="none"){score-=12;flags.push({sev:2,msg:"no speed-control plan (Tailwind / Trick Room / priority)"});}
    if(needs.fakeout){score-=4;flags.push({sev:1,msg:"no Fake Out (≈90% of top teams run one)"});}
    if(needs.priority){score-=5;flags.push({sev:1,msg:"no priority move"});}
    if(needs.redir && team.some(m=>has(m.entry,SETUP).length&&offense(m.entry)>=95)){score-=4;flags.push({sev:1,msg:"setup sweeper with no redirection to protect it"});}
    // Trick Room matchup: every team should be able to interact with opposing Trick Room
    if(!trAnswer){score-=4;flags.push({sev:1,msg:"no answer to opposing Trick Room — run Taunt, your own Trick Room, or a slow attacker to abuse it"});}
    // a non-hard Trick Room team needs fast cleaners for when the room ends or the setter is KO'd
    if(mode==="trickroom"){const hardTR=slowN>=3&&fastN===0;
      if(!hardTR&&fastN===0){score-=4;flags.push({sev:1,msg:"Trick Room team with no fast Pokémon — add 1–2 fast cleaners for when the room ends or the setter falls"});}}
    // mixed fast+slow attackers: you can relish whichever speed mode is up — yours OR the opponent's
    if(fastN>=1&&slowN>=1&&(mode==="tailwind"||mode==="trickroom"))
      flags.push({sev:0,msg:mode==="tailwind"
        ? "flex Speed — your slow attacker also capitalizes when the opponent sets Trick Room"
        : "flex Speed — your fast attacker(s) punish opposing Tailwind and clean up once Trick Room ends"});
  }
  // running both Tailwind AND Trick Room is a legit two-mode team (primary + insurance), not hedging — info, no penalty
  if(tm.includes("Tailwind")&&tm.includes("Trick Room"))
    flags.push({sev:0,msg:"two-mode team (Tailwind + Trick Room) — fine; keep one as the clear plan A and the other as the matchup flex"});
  // Intimidate discipline: never double-stacked in Champions top cut
  const intimN=team.filter(m=>effOf(m).abilities.includes("Intimidate")).length;
  if(intimN>=2){score-=6;flags.push({sev:1,msg:`${intimN} Intimidate users — top teams run at most one`});}
  // Item Clause is a legality rule (Champions enforces it) — warn to swap the item, but it's not a
  // measure of team QUALITY, so it does NOT dock the health score.
  const dups=itemClause(team); if(dups.length){flags.push({sev:2,msg:`Item Clause: change a duplicate ${dups.join(", ")} — every Pokémon needs a unique item`});}
  if(new Set(team.map(m=>m.entry.name)).size!==n){score-=10;flags.push({sev:2,msg:"duplicate species"});}
  // viability vs the top meta threats: do you have a real check, a soft/neutral matchup, or nothing?
  let mu=null;
  if(n>=3){
    mu=threatMatchups(team);
    if(mu.uncovered){score-=Math.min(24,mu.uncovered*5);
      flags.push({sev:2,msg:`no check for ${mu.uncovered} top threat${mu.uncovered>1?"s":""}: ${mu.uncoveredNames.slice(0,4).join(", ")}${mu.uncoveredNames.length>4?"…":""}`});}
    if(mu.neutral){score-=Math.min(8,mu.neutral*1.5);
      flags.push({sev:1,msg:`only a soft/neutral matchup into ${mu.neutral} threat${mu.neutral>1?"s":""} (survive or trade, not a clean check)`});}
  }
  score=Math.max(0,Math.min(100,Math.round(score)));
  const grade=score>=82?"A":score>=68?"B":score>=52?"C":score>=38?"D":"F";
  flags.sort((a,b)=>b.sev-a.sev);
  return {score,grade,flags,tally,off,needs,mode,mu};
}

/* ---------- archetype skeleton checklist (is the team a complete <archetype>?) ---------- */
function archetypeChecklist(team){
  const mode=teamSpeedMode(team), needs=teamNeeds(team), weather=teamWeather(team), tm=team.flatMap(m=>setMovesOf(m));
  const wins=team.filter(m=>offense(m.entry)>=105||m.formIndex>=0||has(m.entry,SETUP).length).length;
  const fast=team.filter(m=>offense(m.entry)>=95&&effOf(m).baseStats.spe>=85).length;
  const slow=team.filter(m=>offense(m.entry)>=95&&effOf(m).baseStats.spe<=55).length;
  const prio=team.filter(m=>setMovesOf(m).some(x=>PRIORITY.includes(x))).length;
  const items=[], add=(label,ok)=>items.push({label,ok});
  const screens=(tm.includes("Light Screen")&&tm.includes("Reflect"))||tm.includes("Aurora Veil");
  const lightClay=team.some(m=>m.set&&m.set.item==="Light Clay");
  const bellyDrum=team.some(m=>setMovesOf(m).includes("Belly Drum"));
  const weatherAbuser=weather&&team.some(m=>{const e=m.entry;return (e.abilities||[]).some(a=>WEATHER_BENEFIT_ABIL[weather]&&WEATHER_BENEFIT_ABIL[weather].includes(a))||(weather==="sun"&&e.types.includes("Fire"))||(weather==="rain"&&e.types.includes("Water"));});
  let arche="Balance";
  add("2+ win conditions",wins>=2);
  add("Fake Out (≈90% of top teams)",!needs.fakeout);
  const snowVeil=tm.includes("Aurora Veil")&&team.some(m=>(m.entry.abilities||[]).includes("Snow Warning"));
  if(weather&&weatherAbuser){const ab=weather.charAt(0).toUpperCase()+weather.slice(1); arche=ab+" offense";
    add(ab+" setter",true); add(ab+" abuser",weatherAbuser); if(weather==="snow")add("Aurora Veil",tm.includes("Aurora Veil"));}
  else if(snowVeil){arche="Snow / Aurora Veil offense"; add("Snow Warning setter",true); add("Aurora Veil",true); add("Light Clay",lightClay); add("2+ fast attackers",fast>=2);}
  else if(bellyDrum){arche="Belly Drum offense"; add("Belly Drum sweeper",true); add("priority to cash in the boost",prio>=1); add("redirection / Fake Out / screens to land it",!needs.redir||!needs.fakeout||screens);}
  else if(screens&&fast>=2&&mode!=="trickroom"){arche="Dual-screens hyper-offense";
    add("dual screens (Light Screen + Reflect / Aurora Veil)",screens); add("Light Clay to extend screens",lightClay); add("2+ fast attackers",fast>=2); add("priority to close games",!needs.priority);}
  else if(mode==="trickroom"){const hardTR=slow>=3&&fast===0; arche=hardTR?"Trick Room (hard)":"Trick Room (semi)"; add("Trick Room setter",tm.includes("Trick Room")); add("2+ slow attackers (Spe ≤55)",slow>=2); add("redirection or Fake Out to set up safely",!needs.redir||!needs.fakeout);
    if(hardTR)add("a non-TR priority/Scarf fallback",prio>=1);
    else add("1–2 fast Pokémon to clean up if the setter falls / after TR ends",fast>=1);}
  else if(mode==="tailwind"){arche="Tailwind offense"; add("Tailwind setter",tm.includes("Tailwind")); add("2+ fast attackers",fast>=2); add("a priority move",!needs.priority);
    add("an answer to opposing Trick Room (Taunt / your own TR / a slow attacker)", tm.includes("Taunt")||tm.includes("Trick Room")||team.some(m=>offense(m.entry)>=95&&effOf(m).baseStats.spe<=55));}
  else if(mode==="priority"){arche=bellyDrum?"Belly Drum / priority offense":"Priority hyper-offense"; add("2+ priority users",prio>=2); add("2+ fast attackers",fast>=2); if(bellyDrum)add("redirection/Fake Out to land Belly Drum",!needs.redir||!needs.fakeout);}
  else {arche="Balance / no speed mode"; add("a speed-control mode (Tailwind / Trick Room)",mode!=="none"); add("a priority move",!needs.priority);}
  add("redirection if a setup sweeper is present", !(team.some(m=>has(m.entry,SETUP).length&&offense(m.entry)>=95)) || !needs.redir);
  add("Intimidate glue (optional)",!needs.intimidate);
  return {arche,items,complete:items.filter(i=>i.ok).length,total:items.length};
}

/* ---------- damage-aware meta analysis (Reg M-B threat list) ---------- */
const MB_OFFENSE=["Garchomp","Basculegion-Male","Kingambit","Charizard","Floette","Sneasler","Metagross","Archaludon","Swampert","Aerodactyl","Sylveon","Gholdengo","Mawile"];
function threatMembers(){return MB_OFFENSE.map(n=>benchMember(n)).filter(Boolean);}
// highest % an attacker's set can deal to a defender (single-target worst case)
function bestHitPct(att,def,field){let mx=0;for(const mv of setMovesOf(att)){const r=calcDamage(att,mv,def,field||{});if(r&&!r.immune&&r.maxPct>mx)mx=r.maxPct;}return mx;}
// for each meta threat, does the team have a switch-in that is never OHKO'd by it?
function threatAnswers(team){
  if(!team.length) return {rows:[],frac:0,unanswered:[]};
  const rows=threatMembers().map(t=>{
    let best=999,by=null;
    for(const d of team){const mx=bestHitPct(t,d,{});if(mx<best){best=mx;by=d;}}
    return {name:t.entry.name+(t.formIndex>=0?" (Mega)":""),answered:best<100,margin:Math.round(best),by:by&&by.entry.name};
  });
  return {rows,frac:rows.filter(r=>r.answered).length/Math.max(1,rows.length),unanswered:rows.filter(r=>!r.answered).map(r=>r.name)};
}
// how much of the meta does each win-condition actually KO, in the team's enabled state?
function winConRealism(team){
  if(!team.length) return {wins:[],best:0};
  const threats=threatMembers(), weather=teamWeather(team);
  const wins=team.filter(m=>{const e=m.entry;return offense(e)>=110||m.formIndex>=0||has(e,SETUP).length;});
  const out=wins.map(w=>{
    let ko=0;
    for(const t of threats){let best=0;for(const mv of setMovesOf(w)){const r=calcDamage(w,mv,t,{weather,spread:false});if(r&&!r.immune&&r.maxPct>best)best=r.maxPct;}
      if(best>=100)ko+=1; else if(best>=50)ko+=0.5;}
    return {name:w.entry.name+(w.formIndex>=0?" (Mega)":""),frac:Math.round(ko/threats.length*100)};
  }).sort((a,b)=>b.frac-a.frac);
  return {wins:out,best:out[0]?out[0].frac:0};
}
// best KO our member lands on a defender: the move with the highest guaranteed (min-roll) damage.
function memberKOon(att,def,field){
  let best={mn:0,mx:0,move:null};
  for(const mv of setMovesOf(att)){const r=calcDamage(att,mv,def,field||{});
    if(r&&!r.immune&&r.minPct>best.mn) best={mn:r.minPct,mx:r.maxPct,move:mv};}
  if(!best.move){for(const mv of setMovesOf(att)){const r=calcDamage(att,mv,def,field||{});  // fallback: hardest max-roll move
    if(r&&!r.immune&&r.maxPct>best.mx) best={mn:r.minPct,mx:r.maxPct,move:mv};}}
  return best;
}
// the attacker's single hardest hit on a defender: {pct (max roll), move}
function worstHit(att,def,field){let best={pct:0,move:null};for(const mv of setMovesOf(att)){const r=calcDamage(att,mv,def,field||{});if(r&&!r.immune&&r.maxPct>best.pct)best={pct:r.maxPct,move:mv};}return best;}
// Matchup viability vs each top meta threat. A "check" (VGC sense) = a member that survives the threat's
// strongest hit AND reliably KOs back (≥2HKO), or that outspeeds it and OHKOs it. Tiers:
//   3 hard check (walls it + KOs back) · 2 offensive check (faster + OHKOs) · 1 neutral/soft · 0 uncovered.
// top-N most-used Reg M-B mons straight from Pikalytics usage ranks (cached per N)
const _threatCache={};
function metaThreatList(n){
  n=n||20;
  if(_threatCache[n]) return _threatCache[n];
  const ranked=Object.keys(USAGE).filter(name=>USAGE[name].rank!=null&&byName[name])
    .sort((a,b)=>USAGE[a].rank-USAGE[b].rank).slice(0,n);
  return _threatCache[n]=ranked.map(name=>benchMember(name)).filter(Boolean);
}
// `list` (optional) = explicit threat members, e.g. metaThreatList(20)/(50). Default = curated key threats.
// opts.mode: "none" (raw speed) · "tailwind" (our Speed ×2, theirs not) · "trickroom" (lower Speed acts first).
function threatMatchups(team,list,opts){
  if(!team||!team.length) return {rows:[],checked:0,neutral:0,uncovered:0,uncoveredNames:[],total:0,mode:(opts&&opts.mode)||"none"};
  const weather=teamWeather(team), mode=(opts&&opts.mode)||"none";
  const rows=(list&&list.length?list:threatMembers()).map(t=>{
    const tSpe=memberSpeed(t,{weather}).spe;
    let tier=0,by=null,note="",det=null;
    let lowInc=999,lowBy=null,lowMove=null;                // best (least-OHKO'd) wall, for the uncovered case
    for(const d of team){
      const take=worstHit(t,d,{weather});                  // threat's hardest hit on us {pct,move}
      const inc=take.pct;
      const ko=memberKOon(d,t,{weather,spread:false});     // our best KO on the threat {mn,mx,move}
      const sd=memberSpeed(d,{weather}).spe;
      // "both" = a two-mode team that can bring up whichever speed mode is favorable for this matchup
      const faster = mode==="both" ? (sd*2>tSpe||sd<tSpe) : mode==="trickroom" ? sd<tSpe : mode==="tailwind" ? sd*2>tSpe : sd>tSpe;
      const survives=inc<100;
      const ohko=ko.mn>=100, twohko=ko.mn>=50;             // guaranteed (min-roll) KOs
      const revenge=ko.mx>=100&&ko.mn>=75;                 // OHKOs on most rolls — enough to revenge-kill if faster
      if(inc<lowInc){lowInc=inc;lowBy=d.entry.name;lowMove=take.move;}
      let tr=0,nt="";
      if(survives&&twohko){tr=3;nt=ohko?"walls + OHKOs":"walls + 2HKOs";}
      else if(faster&&revenge){tr=2;nt=(mode==="trickroom"?"underspeeds (TR) + OHKOs":mode==="tailwind"?"outspeeds (Tailwind) + OHKOs":mode==="both"?"outspeeds (Tailwind/TR) + OHKOs":"outspeeds + OHKOs");}
      else if(survives&&ko.mx>=50){tr=1;nt="survives, soft (rolls a 2HKO)";}
      else if(survives){tr=1;nt="walls but can't KO it";}
      else if(revenge){tr=1;nt="OHKOs it but is outsped (needs speed control)";}
      else if(twohko){tr=1;nt="revenge-KOs but is OHKO'd (frail trade)";}
      if(tr>tier){tier=tr;by=d.entry.name;note=nt;det={byMove:ko.move,deal:Math.round(ko.mn),dealMax:Math.round(ko.mx),take:Math.round(inc),takeMove:take.move};}
    }
    const base={name:t.entry.name+(t.formIndex>=0?" (Mega)":""),tier,by,note};
    if(det) Object.assign(base,det);
    else base.bestWall=lowBy, base.take=lowInc<999?Math.round(lowInc):null, base.takeMove=lowMove;  // uncovered: who tanks it best
    return base;
  });
  const uncovered=rows.filter(r=>r.tier===0);
  return {rows,checked:rows.filter(r=>r.tier>=2).length,neutral:rows.filter(r=>r.tier===1).length,
    uncovered:uncovered.length,uncoveredNames:uncovered.map(r=>r.name),total:rows.length,mode};
}

/* ---------- point optimizer (outspeed / survive) ---------- */
// min Speed points (+ whether a +Spe nature is needed) for `m` to outspeed targetSpe
function optimizeOutspeed(m,targetSpe,opt){
  opt=opt||{}; const base=effOf(m).baseStats.spe;
  for(const nat of [null,"Timid"]){           // try neutral, then +Spe
    for(let p=0;p<=32;p++){
      let s=rawSpeed(base,p,nat||"Hardy");
      if(opt.tailwind)s*=2; if(opt.scarf)s=Math.floor(s*1.5);
      if(s>targetSpe) return {possible:true,points:p,plusNature:!!nat,achieved:s};
    }
  }
  let mx=rawSpeed(base,32,"Timid"); if(opt.tailwind)mx*=2; if(opt.scarf)mx=Math.floor(mx*1.5);
  return {possible:false,achieved:mx};
}
// min HP+defense points for `def` to survive `att`'s `move` (max roll < 100% HP)
function optimizeSurvive(def,att,move,opt){
  opt=opt||{}; const phys=moveInfo(move).c==="Phys", dk=phys?"def":"spd";
  for(let tot=0;tot<=64;tot++){
    for(let hp=0;hp<=Math.min(32,tot);hp++){
      const dp=tot-hp; if(dp>32) continue;
      const pts={hp,atk:0,def:0,spa:0,spd:0,spe:0}; pts[dk]=dp;
      const d={entry:def.entry,formIndex:def.formIndex,set:Object.assign({},def.set,{points:pts})};
      const r=calcDamage(att,move,d,{weather:opt.weather,spread:opt.spread});
      if(!r) return {possible:false,immune:false};
      if(r.immune) return {possible:true,immune:true,hp:0,def:0,total:0,maxPct:0};
      if(r.maxPct<100) return {possible:true,hp,def:dp,defStat:dk,total:tot,maxPct:r.maxPct};
    }
  }
  // not survivable even at 32/32
  const d={entry:def.entry,formIndex:def.formIndex,set:Object.assign({},def.set,{points:{hp:32,atk:0,def:phys?32:0,spa:0,spd:phys?0:32,spe:0}})};
  const r=calcDamage(att,move,d,{weather:opt.weather,spread:opt.spread});
  return {possible:false,maxPct:r?r.maxPct:999};
}
// min attacking points so `m` (with nature) reaches a KO benchmark on a meta defender.
// ko: "ohko" => guaranteed OHKO (min roll ≥ 100%); "2hko" => guaranteed 2HKO (min roll ≥ 50%).
function optimizeKO(m,nature,atkK,def,ko,weather,fixedMove){
  const thr=ko==="2hko"?50:100;
  // pick the move: explicit, else whichever hits this defender hardest at full investment
  let mv=fixedMove;
  if(!mv){
    let bp=-1; const fp={hp:0,atk:0,def:0,spa:0,spd:0,spe:0}; fp[atkK]=32;
    const fa={entry:m.entry,formIndex:m.formIndex,set:Object.assign({},m.set,{points:fp,nature})};
    for(const c of setMovesOf(fa)){const r=calcDamage(fa,c,def,{weather,spread:false});if(r&&!r.immune&&r.minPct>bp){bp=r.minPct;mv=c;}}
  }
  if(!mv) return {possible:false,move:null};
  for(let p=0;p<=32;p++){
    const pts={hp:0,atk:0,def:0,spa:0,spd:0,spe:0}; pts[atkK]=p;
    const fa={entry:m.entry,formIndex:m.formIndex,set:Object.assign({},m.set,{points:pts,nature})};
    const r=calcDamage(fa,mv,def,{weather,spread:false});
    if(r&&!r.immune&&r.minPct>=thr) return {possible:true,points:p,move:mv,pct:r.minPct};
  }
  // not reachable even at 32 — report the best we can do
  const fp={hp:0,atk:0,def:0,spa:0,spd:0,spe:0}; fp[atkK]=32;
  const fa={entry:m.entry,formIndex:m.formIndex,set:Object.assign({},m.set,{points:fp,nature})};
  const r=calcDamage(fa,mv,def,{weather,spread:false});
  return {possible:false,move:mv,pct:r?r.minPct:0};
}
// full 66-point spread that satisfies a speed benchmark + survival constraints + KO benchmarks at once.
// Offense is NOT a leftover dump: it invests exactly enough to OHKO/2HKO the requested meta threats;
// only points beyond every constraint (speed + survive + KO) spill into extra bulk.
function optimizeSpread(m,goals){
  goals=goals||{}; const e=m.entry, phys=isPhysical(e), atkK=phys?"atk":"spa";
  // 1) speed: min points; decide whether a +Spe nature is required
  let speP=0,plusSpe=false,speOK=true,speTxt="";
  if(goals.speed&&goals.speedTargetSpe!=null){
    const r=optimizeOutspeed(m,goals.speedTargetSpe,{tailwind:goals.speedTW,scarf:goals.speedScarf});
    if(r.possible){speP=r.points;plusSpe=r.plusNature;speTxt="outspeed "+goals.speedName+" ("+r.achieved+" Spe)";}
    else {speOK=false;speTxt="outspeed "+goals.speedName+" (impossible — maxes "+r.achieved+")";}
  }
  const nature=plusSpe?(phys?"Jolly":"Timid"):(phys?"Adamant":"Modest");   // +Spe vs offensive nature
  // 2) survival: share HP across all constraints; find the HP allocation that minimises total defensive points
  const survs=(goals.survivals||[]).map(s=>({att:benchMember(s.benchName),move:s.move,weather:s.weather,name:s.benchName})).filter(s=>s.att&&s.move);
  let best={hp:0,def:0,spd:0,tot:0,fails:survs.map(s=>s.name+"|"+s.move)};
  for(let hp=0;hp<=32;hp++){
    let needDef=0,needSpd=0,fails=[];
    for(const s of survs){
      const pm=moveInfo(s.move).c==="Phys"; let ok=false,p=0;
      for(p=0;p<=32;p++){
        const pts={hp,atk:0,def:pm?p:0,spa:0,spd:pm?0:p,spe:0};
        const d={entry:e,formIndex:m.formIndex,set:Object.assign({},m.set,{points:pts,nature})};
        const r=calcDamage(s.att,s.move,d,{weather:s.weather});
        if(!r||r.immune||r.maxPct<100){ok=true;break;}
      }
      if(!ok)fails.push(s.name+"|"+s.move); else if(pm)needDef=Math.max(needDef,p); else needSpd=Math.max(needSpd,p);
    }
    const tot=hp+needDef+needSpd;
    if(fails.length<best.fails.length||(fails.length===best.fails.length&&tot<best.tot)) best={hp,def:needDef,spd:needSpd,tot,fails};
  }
  // 3) offense: invest exactly enough to hit the requested KO/2HKO benchmarks (max across targets)
  const kos=(goals.kos||[]).map(k=>({def:benchMember(k.benchName),ko:k.ko||"ohko",move:k.move,weather:k.weather,name:k.benchName})).filter(k=>k.def);
  let needAtk=0; const koAch=[],koFail=[];
  for(const k of kos){
    const r=optimizeKO(m,nature,atkK,k.def,k.ko,k.weather,k.move);
    const label=(k.ko==="2hko"?"2HKO ":"OHKO ")+k.name+(r.move?" with "+r.move:"");
    if(r.possible){needAtk=Math.max(needAtk,r.points);koAch.push(label);}
    else koFail.push(label+(r.pct!=null?" (max "+r.pct+"%)":""));
  }
  // 4) assemble within 66. Constraints fixed; leftover spills into offense (no KO goal) or bulk (KO met).
  const pts={hp:best.hp,atk:0,def:best.def,spa:0,spd:best.spd,spe:speP};
  pts[atkK]=needAtk;
  let used=pts.hp+pts.def+pts.spd+pts.spe+pts[atkK];
  let left=Math.max(0,66-used);
  if(left>0){
    if(!kos.length){ const a=Math.min(32-pts[atkK],left); pts[atkK]+=a; left-=a; }   // classic: max the attack
    // remaining (or all, when KO already satisfied) goes to bulk: HP first, then the lighter defense
    const ah=Math.min(32-pts.hp,left); pts.hp+=ah; left-=ah;
    if(left>0){const ad=Math.min(32-pts.def,left);pts.def+=ad;left-=ad;}
    if(left>0){const as=Math.min(32-pts.spd,left);pts.spd+=as;left-=as;}
  }
  const required=best.hp+best.def+best.spd+speP+needAtk;   // points the constraints demand
  const achieves=[],failures=[];
  if(goals.speed){(speOK?achieves:failures).push(speTxt);}
  for(const s of survs){const key=s.name+"|"+s.move; (best.fails.includes(key)?failures:achieves).push("survive "+s.name+"'s "+s.move);}
  koAch.forEach(x=>achieves.push(x)); koFail.forEach(x=>failures.push(x));
  return {points:pts,nature,achieves,failures,offensePts:pts[atkK],required,
    feasible:speOK&&best.fails.length===0&&koFail.length===0&&required<=66};
}

/* ---------- speed tiers (Champions: L50, 0-32 points, no IVs, natures apply) ---------- */
// verified vs mainline L50: 32 points ≈ 252 EVs, so this reproduces known speeds (Jolly Garchomp 169).
const SPEED_ABIL={Chlorophyll:"sun","Swift Swim":"rain","Sand Rush":"sand","Slush Rush":"snow"};
function spdNatureMod(nat){const m=NATURE_MOD[nat];if(!m)return 1;if(m[0]==="spe")return 1.1;if(m[1]==="spe")return 0.9;return 1;}
function rawSpeed(base,pts,nat){pts=Math.max(0,Math.min(32,pts||0));return Math.floor((Math.floor((2*base+31)/2)+5+pts)*spdNatureMod(nat));}
function memberSpeed(m,opts){
  opts=opts||{};
  const ef=effOf(m), base=ef.baseStats.spe, pts=(m.set&&m.set.points&&m.set.points.spe)||0, nat=(m.set&&m.set.nature)||"Hardy";
  let spe=rawSpeed(base,pts,nat); const tags=[];
  if(m.set&&m.set.item==="Choice Scarf"){spe=Math.floor(spe*1.5);tags.push("Scarf");}
  const ab=ef.abilities&&ef.abilities[0];
  if(ab&&SPEED_ABIL[ab]&&opts.weather===SPEED_ABIL[ab]){spe=Math.floor(spe*2);tags.push(ab);}
  if(opts.tailwind){spe=Math.floor(spe*2);tags.push("Tailwind");}
  if(opts.para){spe=Math.floor(spe*0.5);tags.push("PAR");}
  return {spe,base,nat,tags};
}
// meta benchmarks straight from usage data: top-ranked mons at their most-common spread
function metaBenchmarks(maxRank){
  maxRank=maxRank||45; const out=[];
  for(const name in USAGE){const u=USAGE[name]; if(u.rank==null||u.rank>maxRank)continue; const e=byName[name]; if(!e)continue;
    let base=e.baseStats.spe, mega=null; const item=(u.items||[])[0]||"";
    if(e.megaStones&&e.megaStones.includes(item)&&e.mega){const fi=e.megaStones.indexOf(item);if(e.mega[fi]&&e.mega[fi].baseStats){base=e.mega[fi].baseStats.spe;mega=e.mega[fi].label||"Mega";}}
    const sp=parseSpread((u.spreads||[])[0]); const pts=sp?sp.spe:0; const nat=(u.natures||[]).find(n=>NATURES.includes(n))||"Hardy";
    let spe=rawSpeed(base,pts,nat); const tags=[];
    if(item==="Choice Scarf"){spe=Math.floor(spe*1.5);tags.push("Scarf");}
    out.push({name,spe,base,rank:u.rank,mega,tags});
  }
  return out.sort((a,b)=>b.spe-a.spe);
}
function speedRows(team,opts){
  opts=opts||{}; const weather=teamWeather(team);
  const mine=team.map(m=>{const s=memberSpeed(m,{tailwind:opts.tailwind,para:false,weather});
    return {name:m.entry.name+(m.formIndex>=0?" (Mega)":""),spe:s.spe,base:s.base,mine:true,tags:s.tags};});
  const teamNames=new Set(team.map(m=>m.entry.name));
  const bench=metaBenchmarks(opts.maxRank||45).filter(b=>!teamNames.has(b.name))
    .map(b=>({name:b.name+(b.mega?" ("+b.mega+")":""),spe:b.spe,base:b.base,mine:false,rank:b.rank,tags:b.tags}));
  let rows=mine.concat(bench).sort((a,b)=>b.spe-a.spe||(a.mine?-1:1));
  if(opts.trickRoom)rows=rows.slice().reverse();
  return {rows,weather};
}

/* ---------- stat math (general) ---------- */
function statAt(base,pts,natKey,statKey){ // non-HP stat at L50 in Champions points
  pts=Math.max(0,Math.min(32,pts||0));
  const m=NATURE_MOD[natKey]; let mod=1; if(m){ if(m[0]===statKey)mod=1.1; else if(m[1]===statKey)mod=0.9; }
  return Math.floor((Math.floor((2*base+31)/2)+5+pts)*mod);
}
function hpAt(base,pts){pts=Math.max(0,Math.min(32,pts||0));return Math.floor((2*base+31)/2)+pts+60;}
// final stats for a built member (respects mega form)
function finalStats(m){
  const ef=effOf(m), b=ef.baseStats, p=(m.set&&m.set.points)||{}, nat=(m.set&&m.set.nature)||"Hardy";
  return {hp:hpAt(b.hp,p.hp),atk:statAt(b.atk,p.atk,nat,"atk"),def:statAt(b.def,p.def,nat,"def"),
    spa:statAt(b.spa,p.spa,nat,"spa"),spd:statAt(b.spd,p.spd,nat,"spd"),spe:statAt(b.spe,p.spe,nat,"spe")};
}

/* ---------- damage calculator (Gen 9 doubles, practical estimate) ---------- */
const TYPE_ITEM={"Charcoal":"Fire","Mystic Water":"Water","Magnet":"Electric","Miracle Seed":"Grass","Never-Melt Ice":"Ice","Black Belt":"Fighting","Poison Barb":"Poison","Soft Sand":"Ground","Sharp Beak":"Flying","Twisted Spoon":"Psychic","Silver Powder":"Bug","Hard Stone":"Rock","Spell Tag":"Ghost","Dragon Fang":"Dragon","Black Glasses":"Dark","Metal Coat":"Steel","Silk Scarf":"Normal","Fairy Feather":"Fairy"};
function stageMul(s){s=Math.max(-6,Math.min(6,s||0));return s>=0?(2+s)/2:2/(2-s);}
function pokeRound(x){return (x-Math.floor(x))>0.5?Math.ceil(x):Math.floor(x);} // round half down
function koText(min,max,hp){
  if(min>=hp)return "guaranteed OHKO";
  if(max>=hp)return "possible OHKO";
  if(2*min>=hp)return "guaranteed 2HKO";
  if(2*max>=hp)return "possible 2HKO";
  if(3*min>=hp)return "guaranteed 3HKO";
  if(3*max>=hp)return "possible 3HKO";
  return Math.max(4,Math.ceil(hp/max))+"HKO";
}
// build a member from a mon name at its meta set (for the defender dropdown)
function benchMember(name){const e=byName[name];if(!e)return null;const set=recommendSet(e,"meta");return {entry:e,formIndex:(set.formIndex!=null?set.formIndex:-1),set};}
function calcDamage(att,move,def,field){
  field=field||{};
  const mi=moveInfo(move); if(!mi.bp||!(mi.c==="Phys"||mi.c==="Spec"))return null;
  const phys=mi.c==="Phys", wt=mi.t;
  const aEf=effOf(att),dEf=effOf(def),aS=finalStats(att),dS=finalStats(def);
  const aAb=(aEf.abilities||[])[0]||"",dAb=(dEf.abilities||[])[0]||"";
  const aItem=(att.set&&att.set.item)||"",dItem=(def.set&&def.set.item)||"";
  const eff=effTable(dEf,dAb)[wt]; if(eff===0)return {immune:true,move,type:wt};
  let A=phys?aS.atk:aS.spa, D=phys?dS.def:dS.spd;
  if((aAb==="Huge Power"||aAb==="Pure Power")&&phys)A*=2;
  if(aItem==="Choice Band"&&phys)A=Math.floor(A*1.5);
  if(aItem==="Choice Specs"&&!phys)A=Math.floor(A*1.5);
  let atkStage=field.atkStage||0; if(field.intimidate&&phys)atkStage-=1;
  A=Math.floor(A*stageMul(atkStage));
  D=Math.floor(D*stageMul(field.defStage||0));
  if(dItem==="Assault Vest"&&!phys)D=Math.floor(D*1.5);
  if(field.weather==="sand"&&dEf.types.includes("Rock")&&!phys)D=Math.floor(D*1.5);
  if(field.weather==="snow"&&dEf.types.includes("Ice")&&phys)D=Math.floor(D*1.5);
  let bp=mi.bp; if(aAb==="Technician"&&bp<=60)bp=Math.floor(bp*1.5);
  const base=Math.floor(Math.floor(22*bp*A/D)/50)+2;
  let weatherMod=1;
  if(field.weather==="sun"){if(wt==="Fire")weatherMod=1.5;if(wt==="Water")weatherMod=0.5;}
  if(field.weather==="rain"){if(wt==="Water")weatherMod=1.5;if(wt==="Fire")weatherMod=0.5;}
  const spreadMod=field.spread?0.75:1;
  const stab=aEf.types.includes(wt)?(aAb==="Adaptability"?2:1.5):1;
  let fm=1;
  if(aItem==="Life Orb")fm*=1.3;
  if(aItem==="Expert Belt"&&eff>1)fm*=1.2;
  if(aItem==="Muscle Band"&&phys)fm*=1.1;
  if(aItem==="Wise Glasses"&&!phys)fm*=1.1;
  if(TYPE_ITEM[aItem]===wt)fm*=1.2;
  if(dAb==="Multiscale"&&field.fullHP!==false)fm*=0.5;
  if((dAb==="Filter"||dAb==="Solid Rock"||dAb==="Prism Armor")&&eff>1)fm*=0.75;
  if(field.burn&&phys&&aAb!=="Guts")fm*=0.5;
  const rolls=[];
  for(let r=85;r<=100;r++){
    let d=base;
    d=pokeRound(d*spreadMod); d=pokeRound(d*weatherMod);
    d=Math.floor(d*r/100);
    d=pokeRound(d*stab);
    d=Math.floor(d*eff);
    d=pokeRound(d*fm);
    rolls.push(Math.max(1,d));
  }
  const hp=dS.hp,min=rolls[0],max=rolls[15];
  return {min,max,hp,eff,phys,type:wt,move,
    minPct:Math.round(min/hp*1000)/10,maxPct:Math.round(max/hp*1000)/10,ko:koText(min,max,hp)};
}

/* ---------- pokepaste / Showdown import ---------- */
function dexLookup(species){
  if(!species) return null;
  if(byName[species]) return byName[species];
  let s=species.replace(/-Mega(-[XY])?$/i,"").replace(/-Gmax$/i,"").trim();
  if(byName[s]) return byName[s];
  const al={"-F":"-Female","-M":"-Male"};
  for(const k in al){ if(s.endsWith(k)&&byName[s.slice(0,-k.length)+al[k]]) return byName[s.slice(0,-k.length)+al[k]]; }
  // base of a male/female line typed bare -> default to -Male
  if(byName[s+"-Male"]) return byName[s+"-Male"];
  // case-insensitive fallback
  const lc=s.toLowerCase(); for(const e of DEX) if(e.name.toLowerCase()===lc) return e;
  return null;
}
function parsePaste(text){
  const blocks=(text||"").replace(/\r/g,"").split(/\n\s*\n/).map(b=>b.trim()).filter(Boolean);
  const out=[];
  for(const blk of blocks){
    const lines=blk.split("\n").map(l=>l.trim()).filter(Boolean);
    if(!lines.length) continue;
    let head=lines[0], item="";
    const at=head.lastIndexOf(" @ "); if(at>=0){item=head.slice(at+3).trim();head=head.slice(0,at).trim();}
    head=head.replace(/\s*\((M|F)\)\s*$/,"");                 // gender
    const pm=head.match(/^(.*?)\s*\(([^)]+)\)\s*$/);           // Nickname (Species)
    let species=pm?pm[2].trim():head.trim();
    const e=dexLookup(species); if(!e) continue;
    const set={ability:(e.abilities||[])[0]||"",item:item||"",nature:"Hardy",points:{hp:0,atk:0,def:0,spa:0,spd:0,spe:0},moves:[]};
    let formIndex=-1;
    if(e.megaStones&&e.megaStones.includes(item)) formIndex=Math.max(0,e.megaStones.indexOf(item));
    else if(/-Mega-Y$/i.test(species)&&e.megaStones) formIndex=e.megaStones.findIndex(s=>/Y$/.test(s));
    else if(/-Mega(-X)?$/i.test(species)&&e.mega&&e.mega.length) formIndex=0;
    const SK={hp:"hp",atk:"atk",def:"def",spa:"spa",spd:"spd",spe:"spe",HP:"hp",Atk:"atk",Def:"def",SpA:"spa",SpD:"spd",Spe:"spe"};
    for(const ln of lines.slice(1)){
      let mt;
      if(/^Ability:/i.test(ln)) set.ability=ln.split(":")[1].trim();
      else if((mt=ln.match(/^(?:EVs|Stat Points):\s*(.+)$/i))){
        const ev=/^EVs/i.test(ln); // EVs (0-252) -> points; Stat Points already 0-32
        mt[1].split("/").forEach(part=>{const m2=part.trim().match(/(\d+)\s*([A-Za-z]+)/);if(m2&&SK[m2[2]]!=null){let v=+m2[1];if(ev)v=Math.round(v/8);set.points[SK[m2[2]]]=Math.max(0,Math.min(32,v));}});
      }
      else if((mt=ln.match(/^(\w+)\s+Nature$/i))) set.nature=mt[1];
      else if(/^-\s*/.test(ln)){const mv=ln.replace(/^-\s*/,"").split("/")[0].replace(/\s*\[[^\]]*\]/,"").trim();if(mv&&set.moves.length<4)set.moves.push(mv);}
      // Level / IVs / Tera Type / Shiny etc. ignored (Champions: L50, no IVs/Tera)
    }
    while(set.moves.length<4) set.moves.push("");
    out.push({entry:e,formIndex,roleKey:"meta",set});
  }
  return out;
}
function exportPaste(team){
  const SP=[["HP","hp"],["Atk","atk"],["Def","def"],["SpA","spa"],["SpD","spd"],["Spe","spe"]];
  return team.map(m=>{const e=m.entry,s=m.set,ab=s.ability||(e.abilities||[])[0]||"";
    const pts=SP.filter(([l,k])=>s.points[k]).map(([l,k])=>s.points[k]+" "+l).join(" / ");
    const mv=(s.moves||[]).filter(Boolean).map(x=>"- "+x).join("\n");
    return `${e.name} @ ${s.item||""}\nAbility: ${ab}\nLevel: 50\n${s.nature} Nature\nStat Points: ${pts||"none"}\n${mv}`;}).join("\n\n");
}

/* ---------- shareable team URL ---------- */
function encodeTeam(team){
  const arr=team.map(m=>[m.entry.name,m.formIndex,m.set.item||"",m.set.ability||"",m.set.nature||"",
    ["hp","atk","def","spa","spd","spe"].map(k=>m.set.points[k]||0),(m.set.moves||[]).filter(Boolean)]);
  try{return btoa(unescape(encodeURIComponent(JSON.stringify(arr)))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}catch(e){return"";}
}
function decodeTeam(str){
  try{
    let b=str.replace(/-/g,"+").replace(/_/g,"/"); while(b.length%4)b+="=";
    const arr=JSON.parse(decodeURIComponent(escape(atob(b))));
    return arr.map(a=>{const e=byName[a[0]];if(!e)return null;
      const pk=["hp","atk","def","spa","spd","spe"],pts={};pk.forEach((k,i)=>pts[k]=(a[5]||[])[i]||0);
      const moves=(a[6]||[]).slice(0,4);while(moves.length<4)moves.push("");
      return {entry:e,formIndex:a[1]==null?-1:a[1],roleKey:"meta",set:{item:a[2]||"",ability:a[3]||"",nature:a[4]||"Hardy",points:pts,moves}};
    }).filter(Boolean);
  }catch(e){return null;}
}

/* expose for ui.js */
window.ENGINE={DEX,byName,TYPES,CHART,effTable,weaknessesOf,bestDefAbility,detectRoles,teamWeakTally,teamNeeds,teamWeather,scoreCandidate,scoreForSlot,offense,isPhysical,statSum,has,effOf,SETUP,PIVOT,REDIR,SPEEDCTRL,DISRUPT,PRIORITY,HAZARD,SUPPORT,WEATHER_ABIL,NATURES,ITEMS,moveInfo,recommendSet,recommendMoves,planForLead,archetypeThreats,stressTest,itemClause,teamOffense,usageOf,metaSet,speedRows,memberSpeed,rawSpeed,metaBenchmarks,statAt,hpAt,finalStats,parsePaste,exportPaste,encodeTeam,decodeTeam,calcDamage,benchMember,teamHealth,ANTI_INTIM,teamSpeedMode,teamSpeedLean,speedSetterPref,speedFit,flexSpeedRole,electricImmune,enablerBonus,threatAnswerBonus,threatAnswers,winConRealism,threatMatchups,metaThreatList,archetypeChecklist,optimizeOutspeed,optimizeSurvive,optimizeSpread,RESULTS,resultsFor,megaResultsFor,provenBonus,teammateSynergy,megaTierList,megaPairList};
