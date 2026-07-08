/*
 * Browser engine entry — bundled by build.mjs into the app's engine.web.js.
 * Runs the REAL Champions Reg M-B engine (+ GameplanBot) entirely client-side:
 * matchup matrix, exhaustive bring/lead/Mega optimizer, and live human-vs-AI
 * battles. Exposes globalThis.ChampSim; the Web Worker (app/sim/worker.js) drives it.
 */
const { BattleStream, getPlayerStreams, Teams, Dex } = require('../../pokemon-showdown/dist/sim');
const { GameplanBot } = require('../gameplan-bot.js');
const { MY_TEAM, META } = require('../teams.mjs');
const { autospread } = require('../autospread.mjs');
const FORMAT = 'gen9championsvgc2026regmb';
const cdex = Dex.mod('champions');

function normalizePaste(p){ return String(p||'').replace(/^[ \t]*Stat Points:[ \t]*none[ \t]*$/gim,'').replace(/^[ \t]*Stat Points:/gim,'EVs:'); }
function pack(paste){ return Teams.pack(Teams.import(autospread(normalizePaste(paste)))); }

const SPRITEMAP = (()=>{ const map={}; const add=n=>{const s=cdex.species.get(n);if(s.exists)map[s.name]=s.spriteid;};
  for(const paste of [MY_TEAM, ...Object.values(META)]) for(const block of paste.trim().split(/\n\s*\n/)){
    const head=block.trim().split('\n')[0]; const nm=head.split(' @ ')[0].trim(), item=(head.split(' @ ')[1]||'').trim();
    add(nm); const it=cdex.items.get(item); const mega=it.megaStone||it.forcedForme; if(mega)add(mega);
    if(/ite/i.test(item)) add(nm+(/y$/i.test(item)?'-Mega-Y':/x$/i.test(item)?'-Mega-X':'-Mega'));
  } return map; })();

function runMatch(myPacked, foePacked, meIsP1){
  return new Promise(res=>{
    const bs=new BattleStream(); const s=getPlayerStreams(bs);
    const me=meIsP1?s.p1:s.p2, foe=meIsP1?s.p2:s.p1;
    new GameplanBot(me,{battle:bs,side:meIsP1?'p1':'p2'}).start();
    new GameplanBot(foe,{battle:bs,side:meIsP1?'p2':'p1'}).start();
    let done=false;
    (async()=>{for await(const c of s.omniscient){const w=c.match(/\|win\|([^\n]*)/),t=/\|tie\b/.test(c);if(!done&&(w||t)){done=true;res(w?w[1].trim():'tie');}}})();
    s.omniscient.write('>start '+JSON.stringify({formatid:FORMAT})+'\n>player p1 '+JSON.stringify({name:'A',team:meIsP1?myPacked:foePacked})+'\n>player p2 '+JSON.stringify({name:'B',team:meIsP1?foePacked:myPacked}));
  });
}
async function matrix(paste, N, onProgress){
  N=Math.max(4,Math.min(60,N||20)); const my=pack(paste); const rows=[]; let done=0; const total=Object.keys(META).length;
  for(const [name,foePaste] of Object.entries(META)){
    const foe=pack(foePaste); let w=0,g=0;
    for(let i=0;i<N;i++){const meIsP1=i%2===0;const winner=await runMatch(my,foe,meIsP1);if(winner==='tie')continue;g++;if(winner===(meIsP1?'A':'B'))w++;}
    rows.push({name,wr:Math.round(100*w/(g||1)),games:g}); done++; onProgress&&onProgress(done,total,name);
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
function runCfg(myPacked, foePacked, config){
  return new Promise(res=>{
    const bs=new BattleStream(); const s=getPlayerStreams(bs);
    new GameplanBot(s.p1,{battle:bs,side:'p1',config}).start();
    new GameplanBot(s.p2,{battle:bs,side:'p2'}).start();
    let done=false;
    (async()=>{for await(const c of s.omniscient){const w=c.match(/\|win\|([^\n]*)/),t=/\|tie\b/.test(c);if(!done&&(w||t)){done=true;res(w?(w[1].trim()==='A'?'me':'foe'):'tie');}}})();
    s.omniscient.write('>start '+JSON.stringify({formatid:FORMAT})+'\n>player p1 '+JSON.stringify({name:'A',team:myPacked})+'\n>player p2 '+JSON.stringify({name:'B',team:foePacked}));
  });
}
async function optimize(paste, oppName, N, onProgress){
  N=Math.max(4,Math.min(30,N||12));
  const myPacked=pack(paste); const foePacked=pack(META[oppName]||Object.values(META)[0]);
  const slots=slotMeta(paste); const byName=Object.fromEntries(slots.map(s=>[s.slot,s.species]));
  const configs=[]; for(const bring of combos4(slots)){const megaOpts=[...bring.filter(s=>s.megaCapable).map(s=>s.species),null];for(const ord of leadOrderings(bring))for(const m of megaOpts)configs.push({order:ord,megaSpecies:m});}
  const results=[]; let n=0;
  for(const cfg of configs){let w=0,g=0;for(let i=0;i<N;i++){const r=await runCfg(myPacked,foePacked,cfg);if(r!=='tie'){g++;if(r==='me')w++;}}results.push({cfg,wr:100*w/(g||1),g});onProgress&&onProgress(++n,configs.length);}
  results.sort((a,b)=>b.wr-a.wr);
  const pretty=r=>({wr:Math.round(r.wr),games:r.g,leads:r.cfg.order.slice(0,2).split('').map(d=>byName[d]),back:r.cfg.order.slice(2,4).split('').map(d=>byName[d]),mega:r.cfg.megaSpecies||null});
  return {best:pretty(results[0]),runnersUp:results.slice(1,4).map(pretty),configs:configs.length};
}

// live battle: you = p1 (driven from the UI), AI = p2 GameplanBot
const battles={}; let bid=1;
function startBattle(oppName, myPaste, onLine){
  const id=String(bid++); const bs=new BattleStream(); const streams=getPlayerStreams(bs);
  new GameplanBot(streams.p2,{battle:bs,side:'p2'}).start();
  battles[id]={streams,done:false};
  (async()=>{for await(const chunk of streams.p1){for(const line of chunk.split('\n')){if(!line)continue;onLine(line);if(line.startsWith('|win|')||/^\|tie\b/.test(line))battles[id].done=true;}}})();
  streams.omniscient.write('>start '+JSON.stringify({formatid:FORMAT})+'\n>player p1 '+JSON.stringify({name:'You',team:pack(myPaste&&myPaste.trim()?myPaste:MY_TEAM)})+'\n>player p2 '+JSON.stringify({name:'AI · '+oppName,team:pack(META[oppName]||Object.values(META)[0])}));
  return id;
}
function choose(id, choice){const rec=battles[id];if(rec&&!rec.done&&typeof choice==='string')rec.streams.p1.write(choice);}

globalThis.ChampSim = { opponents:Object.keys(META), sprites:SPRITEMAP, defaultTeam:MY_TEAM, matrix, optimize, startBattle, choose };
globalThis.simReady = true;
