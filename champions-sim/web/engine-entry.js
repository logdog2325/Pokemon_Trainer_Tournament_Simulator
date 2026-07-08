/*
 * Browser engine entry — bundled by build.mjs into the app's engine.web.js.
 * Runs the REAL Champions Reg M-B engine (+ GameplanBot) entirely client-side:
 * matchup matrix, exhaustive bring/lead/Mega optimizer, and live human-vs-AI
 * battles. Exposes globalThis.ChampSim; the Web Worker (app/sim/worker.js) drives it.
 */
const { BattleStream, getPlayerStreams, Teams, Dex } = require('../../pokemon-showdown/dist/sim');
const { TeamValidator } = require('../../pokemon-showdown/dist/sim/team-validator');
const { GameplanBot } = require('../gameplan-bot.js');
const { MY_TEAM, META } = require('../teams.mjs');
const { autospread } = require('../autospread.mjs');
const FORMAT = 'gen9championsvgc2026regmb';
const cdex = Dex.mod('champions');
const validator = new TeamValidator(FORMAT);

// Showdown sometimes exports the Mega forme as the species (e.g. "Gardevoir-Mega @ Gardevoirite"
// with Ability: Pixilate). In Champions you bring the BASE mon holding the stone and it Mega-Evolves
// in battle, so rewrite any Mega-forme species back to its base + a legal base ability.
function demega(paste){
  return String(paste||'').trim().split(/\n\s*\n/).map(block=>{
    const lines=block.split('\n'); if(!lines[0]) return block;
    const at=lines[0].indexOf(' @ ');
    const name=(at>=0?lines[0].slice(0,at):lines[0]).trim();
    const sp=cdex.species.get(name);
    if(sp.exists && sp.forme && /^Mega/i.test(sp.forme) && sp.baseSpecies){
      lines[0]=sp.baseSpecies+(at>=0?lines[0].slice(at):'');
      const baseAbil=Object.values(cdex.species.get(sp.baseSpecies).abilities||{})[0]||'';
      let had=false;
      for(let i=0;i<lines.length;i++) if(/^\s*Ability:/i.test(lines[i])){ lines[i]='Ability: '+baseAbil; had=true; }
      if(!had) lines.splice(1,0,'Ability: '+baseAbil);
    }
    return lines.join('\n');
  }).join('\n\n');
}
function normalizePaste(p){ return demega(p).replace(/^[ \t]*Stat Points:[ \t]*none[ \t]*$/gim,'').replace(/^[ \t]*Stat Points:/gim,'EVs:'); }
function pack(paste){ return Teams.pack(Teams.import(autospread(normalizePaste(paste)))); }

// validate a pasted team the same way the matrix builds it (autospread fills point spreads first)
function validate(paste){
  let team; try{ team = Teams.import(autospread(normalizePaste(paste))); }
  catch(e){ return { count:0, errors:['Could not read the paste: '+e.message] }; }
  const count = team ? team.length : 0;
  if(!count) return { count:0, errors:['No Pokémon recognized — check the species names / format.'] };
  const errors = validator.validateTeam(team) || [];
  return { count, errors };
}

const SPRITEMAP = (()=>{ const map={}; const add=n=>{const s=cdex.species.get(n);if(s.exists)map[s.name]=s.spriteid;};
  for(const paste of [MY_TEAM, ...Object.values(META)]) for(const block of paste.trim().split(/\n\s*\n/)){
    const head=block.trim().split('\n')[0]; const nm=head.split(' @ ')[0].trim(), item=(head.split(' @ ')[1]||'').trim();
    add(nm); const it=cdex.items.get(item); const mega=it.megaStone||it.forcedForme; if(mega)add(mega);
    if(/ite/i.test(item)) add(nm+(/y$/i.test(item)?'-Mega-Y':/x$/i.test(item)?'-Mega-X':'-Mega'));
  } return map; })();

// One matrix game: YOUR bring-4 is fixed (bringOnly) but the bot picks its own leads/Mega
// for those four; the OPPONENT varies its bring. Resolves { winner, order, mega } — the
// bot's actual chosen lead order (4-digit slot string) and the mon it actually Mega-Evolved,
// so the row shows the real line it played (not a guess).
function runBring(myPacked, foePacked, bring){
  return new Promise(res=>{
    const bs=new BattleStream(); const s=getPlayerStreams(bs);
    const meBot=new GameplanBot(s.p1,{battle:bs,side:'p1',config:{bringOnly:bring}});
    const orig=meBot.chooseTeamPreview.bind(meBot);
    let order=null, mega=null, done=false;
    meBot.chooseTeamPreview=(t)=>{ const r=orig(t); order=r.replace(/^team\s*/,''); return r; };
    meBot.start();
    new GameplanBot(s.p2,{battle:bs,side:'p2',vary:true}).start();
    (async()=>{for await(const c of s.omniscient){
      if(mega===null){ const mm=c.match(/\|-mega\|p1[ab]: ([^|]+)\|/); if(mm) mega=mm[1].trim(); }
      const w=c.match(/\|win\|([^\n]*)/),t=/\|tie\b/.test(c);
      if(!done&&(w||t)){done=true;res({winner:w?(w[1].trim()==='A'?'me':'foe'):'tie',order,mega});}
    }})();
    s.omniscient.write('>start '+JSON.stringify({formatid:FORMAT})+'\n>player p1 '+JSON.stringify({name:'A',team:myPacked})+'\n>player p2 '+JSON.stringify({name:'B',team:foePacked}));
  });
}
// "Run matchups": for each opponent, find your BEST bring-4 and report that line's win rate
// (not the auto-pilot's one fixed bring). Screens every bring, then refines the top few — so
// each row shows the strongest line and the number it produces, before you ever hit Optimize.
async function matrix(paste, N, onProgress, oppNames){
  const my=pack(paste); const rows=[];
  const names=(oppNames&&oppNames.length)?oppNames.filter(n=>META[n]):Object.keys(META);
  const slots=slotMeta(paste); const byName=Object.fromEntries(slots.map(s=>[s.slot,s.species]));
  const brings=combos4(slots).map(b=>b.map(s=>s.slot));   // every legal pick-4 (15 for a 6-mon team)
  const G=Math.max(2,Math.min(8,N||3));                   // screen games/bring; refine adds 3×
  const perOpp=brings.length*G + Math.min(3,brings.length)*(3*G);
  const total=names.length*perOpp; let played=0;
  const tally=(c,r)=>{ if(r.winner!=='tie'){c.g++; if(r.winner==='me')c.w++;} if(!c.order)c.order=r.order; if(r.mega){c.megas[r.mega]=(c.megas[r.mega]||0)+1;} played++; };
  for(const name of names){
    const foe=pack(META[name]);
    const cand=brings.map(bring=>({bring,w:0,g:0,order:null,megas:{}}));
    // screen every bring
    for(const c of cand){ for(let i=0;i<G;i++){ tally(c, await runBring(my,foe,c.bring)); } onProgress&&onProgress(played,total,name); }
    cand.sort((a,b)=>(b.w/(b.g||1))-(a.w/(a.g||1)));
    // refine the top few with more games for a tighter, less lucky estimate
    const top=cand.slice(0,3);
    for(const c of top){ for(let i=0;i<3*G;i++){ tally(c, await runBring(my,foe,c.bring)); } onProgress&&onProgress(played,total,name); }
    top.sort((a,b)=>(b.w/(b.g||1))-(a.w/(a.g||1)));
    const best=top[0]; const ord=best.order||best.bring.join('');
    const mega=Object.keys(best.megas).sort((a,b)=>best.megas[b]-best.megas[a])[0]||null;   // the mon it usually Megas
    rows.push({ name, wr:Math.round(100*best.w/(best.g||1)), games:best.g,
      leads:[byName[ord[0]],byName[ord[1]]], back:[byName[ord[2]],byName[ord[3]]], mega });
  }
  rows.sort((a,b)=>a.wr-b.wr); return rows;
}

// exhaustive optimizer: every bring-4 × every lead pairing × every Mega choice
function slotMeta(paste){return normalizePaste(paste).trim().split(/\n\s*\n/).map((block,i)=>{
  const lines=block.trim().split('\n'); let head=lines[0],item=''; const at=head.lastIndexOf(' @ ');
  if(at>=0){item=head.slice(at+3).trim();head=head.slice(0,at).trim();}
  const species=head.replace(/-Mega.*$/,'').trim(); const megaCapable=!!cdex.items.get(item).megaStone;
  return {slot:i+1,species,megaCapable};});}
function combos4(a){const o=[];for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)for(let k=j+1;k<a.length;k++)for(let l=k+1;l<a.length;l++)o.push([a[i],a[j],a[k],a[l]]);return o;}
function leadOrderings(b){const o=[];for(let x=0;x<b.length;x++)for(let y=x+1;y<b.length;y++){const back=b.filter((_,z)=>z!==x&&z!==y);o.push([b[x],b[y],...back].map(s=>s.slot).join(''));}return o;}
// One optimizer game. YOUR line is fixed (config); the OPPONENT varies its bring
// (vary:true) so we measure your line against the opponent's realistic RANGE of
// brings, not one fixed lineup it happens to pick every game.
function runCfg(myPacked, foePacked, config){
  return new Promise(res=>{
    const bs=new BattleStream(); const s=getPlayerStreams(bs);
    new GameplanBot(s.p1,{battle:bs,side:'p1',config}).start();
    new GameplanBot(s.p2,{battle:bs,side:'p2',vary:true}).start();
    let done=false;
    (async()=>{for await(const c of s.omniscient){const w=c.match(/\|win\|([^\n]*)/),t=/\|tie\b/.test(c);if(!done&&(w||t)){done=true;res(w?(w[1].trim()==='A'?'me':'foe'):'tie');}}})();
    s.omniscient.write('>start '+JSON.stringify({formatid:FORMAT})+'\n>player p1 '+JSON.stringify({name:'A',team:myPacked})+'\n>player p2 '+JSON.stringify({name:'B',team:foePacked}));
  });
}
async function optimize(paste, oppName, N, onProgress){
  const myPacked=pack(paste); const foePacked=pack(META[oppName]||Object.values(META)[0]);
  const slots=slotMeta(paste); const byName=Object.fromEntries(slots.map(s=>[s.slot,s.species]));
  const configs=[]; for(const bring of combos4(slots)){const megaOpts=[...bring.filter(s=>s.megaCapable).map(s=>s.species),null];for(const ord of leadOrderings(bring))for(const m of megaOpts)configs.push({order:ord,megaSpecies:m,w:0,g:0});}

  // --- Successive-halving evaluation ---
  // A win rate from n games has a std error of ~sqrt(p(1-p)/n): at n=12 that's ±14%,
  // and taking the MAX over ~200 such noisy configs inflates the top number (the
  // "winner's curse"). Instead we screen every config cheaply, then spend more and
  // more games only on the survivors — so the reported winner is measured over ~70
  // games (±6%) AND has beaten the field three times, which removes the luck bias.
  const S = Math.max(1, Math.min(3, (N||12)/12));   // optional intensity scaler (N=12 → 1×, up to 3×)
  const C = configs.length;
  const rounds = [
    { keep: C,                              add: Math.round(6*S)  },  // screen all
    { keep: Math.max(30, Math.round(C*0.2)), add: Math.round(10*S) },
    { keep: 12,                             add: Math.round(16*S) },
    { keep: 4,                              add: Math.round(40*S) },  // heavy final measurement
  ];
  const totalGames = rounds.reduce((sum,r)=>sum + Math.min(r.keep,C)*r.add, 0);
  let played=0;
  let field = configs;
  for(const r of rounds){
    field = field.slice(0, Math.min(r.keep, field.length));
    for(const cfg of field){
      for(let i=0;i<r.add;i++){ const res=await runCfg(myPacked,foePacked,cfg); if(res!=='tie'){cfg.g++; if(res==='me')cfg.w++;} played++; }
      onProgress&&onProgress(played,totalGames);
    }
    field.sort((a,b)=> (b.w/(b.g||1)) - (a.w/(a.g||1)));
  }

  const pretty=r=>({wr:Math.round(100*r.w/(r.g||1)),games:r.g,leads:r.order.slice(0,2).split('').map(d=>byName[d]),back:r.order.slice(2,4).split('').map(d=>byName[d]),mega:r.megaSpecies||null});
  return {best:pretty(field[0]),runnersUp:field.slice(1,4).map(pretty),configs:C};
}

// live battle: you = p1 (driven from the UI), AI = p2 GameplanBot
const battles={}; let bid=1;
function startBattle(oppName, myPaste, onLine){
  const id=String(bid++); const bs=new BattleStream(); const streams=getPlayerStreams(bs);
  // Arena opponent: vary a strong bring each game so you get fresh practice reps.
  new GameplanBot(streams.p2,{battle:bs,side:'p2',vary:true}).start();
  battles[id]={streams,done:false};
  (async()=>{for await(const chunk of streams.p1){for(const line of chunk.split('\n')){if(!line)continue;onLine(line);if(line.startsWith('|win|')||/^\|tie\b/.test(line))battles[id].done=true;}}})();
  streams.omniscient.write('>start '+JSON.stringify({formatid:FORMAT})+'\n>player p1 '+JSON.stringify({name:'You',team:pack(myPaste&&myPaste.trim()?myPaste:MY_TEAM)})+'\n>player p2 '+JSON.stringify({name:'AI · '+oppName,team:pack(META[oppName]||Object.values(META)[0])}));
  return id;
}
function choose(id, choice){const rec=battles[id];if(rec&&!rec.done&&typeof choice==='string')rec.streams.p1.write(choice);}

globalThis.ChampSim = { opponents:Object.keys(META), teams:META, sprites:SPRITEMAP, defaultTeam:MY_TEAM, validate, matrix, optimize, startBattle, choose };
globalThis.simReady = true;
