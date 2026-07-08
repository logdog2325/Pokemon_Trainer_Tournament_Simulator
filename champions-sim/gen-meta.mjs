/*
 * Generates meta-teams.mjs — the opponent gauntlet — from the deduped tournament
 * library (champions-team-building/top-teams-deduped.md, 189 unique teams, one per
 * archetype/Mega). Normalizes species/move/item names, validates each against the
 * real Champions Reg M-B format, drops anything illegal, and names each team by its
 * Mega holder(s). Run: node champions-sim/gen-meta.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const DIST = path.join(__dirname, '..', 'pokemon-showdown', 'dist');
const { Teams, Dex } = require(path.join(DIST, 'sim'));
const { TeamValidator } = require(path.join(DIST, 'sim', 'team-validator'));
const cdex = Dex.mod('champions');
const val = new TeamValidator('gen9championsvgc2026regmb');
const SRC = path.join(__dirname, '..', 'champions-team-building', 'top-teams-deduped.md');

function fixPaste(block) {
  const body = block.split('\n').filter(l => !/^Best team for/.test(l)).join('\n').trim();
  return body.split('\n').map(l => {
    const m = l.match(/^(.+?) @ (.+)$/);
    if (m) {
      let sp = m[1]
        .replace(/^Eternal Flower Floette$/, 'Floette-Eternal').replace(/^Floette$/, 'Floette-Eternal')
        .replace(/^(Heat|Wash|Frost|Mow|Fan) Rotom$/, 'Rotom-$1')
        .replace(/^Hisuian (.+)$/, '$1-Hisui').replace(/^Galarian (.+)$/, '$1-Galar')
        .replace(/^Paldean (.+)$/, '$1-Paldea').replace(/^Alolan (.+)$/, '$1-Alola');
      let item = m[2].replace(/^Sabletite$/, 'Sablenite');
      return sp + ' @ ' + item;
    }
    return l.replace(/^- Psychic Fang$/, '- Psychic Fangs');
  }).join('\n');
}
function tagOf(block) { return (block.match(/Best team for Megas:\s*(.*)/) || [])[1] || ''; }
function nameOf(paste, tag) {
  const holders = [];
  for (const b of paste.trim().split(/\n\s*\n/)) {
    const head = b.trim().split('\n')[0]; const at = head.lastIndexOf(' @ ');
    if (at < 0) continue;
    const sp = head.slice(0, at).trim(), item = head.slice(at + 3).trim();
    if (cdex.items.get(item).megaStone) holders.push(sp);
  }
  holders.sort((a, b) => usg(b) - usg(a));   // primary (highest-usage) Mega first
  if (holders.length) return holders.join(' / ');
  if (tag) return tag.replace(/,\s*/g, ' / ');
  return paste.trim().split(/\n\s*\n/).slice(0, 2).map(b => b.split(' @ ')[0]).join(' / ');
}

// real usage: RESULTS.mons[species].teams = how many of 5607 tournament teams ran it
const RESULTS = (() => {
  try {
    const raw = fs.readFileSync(path.join(__dirname, '..', 'champions-team-building', 'app', 'results-data.js'), 'utf8');
    const j = raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1);
    return JSON.parse(j);
  } catch (e) { console.error('no results-data:', e.message); return { mons: {} }; }
})();
const megasData = RESULTS.megas || {}, pairsData = RESULTS.pairs || {};
const usg = sp => { const m = RESULTS.mons || {}; return (m[sp] || m[sp.replace(/-.*$/, '')] || {}).teams || 0; };
const megaUsg = nm => (megasData[nm] || {}).teams || 0;
// a Mega holder's tracked name matching RESULTS keys, e.g. "Charizard-Y", "Floette"
function megaName(sp, item) {
  const it = cdex.items.get(item); if (!it.megaStone) return null;
  const m = /\b([XY])$/.exec(item);
  const cands = m ? [sp + '-' + m[1]] : [sp, sp.replace(/-.*$/, '')];
  for (const c of cands) if (megasData[c]) return c;
  return cands[0];
}
// the Mega name(s) a team runs, highest-usage first
function megasOf(paste) {
  const mn = [];
  for (const b of paste.trim().split(/\n\s*\n/)) {
    const head = b.trim().split('\n')[0]; const at = head.lastIndexOf(' @ ');
    if (at < 0) continue;
    const nm = megaName(head.slice(0, at).trim(), head.slice(at + 3).trim());
    if (nm) mn.push(nm);
  }
  return mn.sort((a, b) => megaUsg(b) - megaUsg(a));
}
// real archetype frequency: pairing adoption if 2 Megas, else Mega adoption; team usage as tiebreak
function usageScore(paste, mn) {
  const teamU = paste.trim().split(/\n\s*\n/).reduce((a, b) => a + usg(b.split(' @ ')[0]), 0);
  let s = 0;
  if (mn.length >= 2) {
    const tracked = pairsData[[mn[0], mn[1]].sort().join(' + ')];
    s = tracked ? tracked.teams : Math.min(megaUsg(mn[0]), megaUsg(mn[1])) / 5;   // untracked pairing = rare
  } else if (mn.length === 1) s = megaUsg(mn[0]);
  return s * 1000 + teamU;
}

const blocks = fs.readFileSync(SRC, 'utf8').split(/#{20,}/).map(b => b.trim()).filter(b => /@ /.test(b));
const list = []; let ok = 0, fail = 0;
for (const block of blocks) {
  const paste = fixPaste(block);
  let team; try { team = Teams.import(paste); } catch { fail++; continue; }
  if (val.validateTeam(team)) { fail++; continue; }
  const mn = megasOf(paste);
  const name = mn.length ? mn.join(' / ') : nameOf(paste, tagOf(block));
  list.push({ name, paste, score: usageScore(paste, mn) });
  ok++;
}
list.sort((a, b) => b.score - a.score);   // most-faced archetypes first; Charizard variants rank by their own pairing usage
const META = {}; const used = new Set();
for (const t of list) {
  let n = t.name, k = 2; while (used.has(n)) n = `${t.name} #${k++}`;
  used.add(n); META[n] = '\n' + t.paste + '\n';
}
const out = '/*\n * Opponent gauntlet — AUTO-GENERATED by gen-meta.mjs from the deduped tournament\n'
  + ' * library (top-teams-deduped.md). ' + ok + ' validated Champions Reg M-B teams, one per\n'
  + ' * archetype, named by Mega holder(s). Spread-less; autospread fills point spreads.\n'
  + ' * Regenerate: node champions-sim/gen-meta.mjs\n */\nexport const META = '
  + JSON.stringify(META, null, 0).replace(/","/g, '",\n"') + ';\n';
fs.writeFileSync(path.join(__dirname, 'meta-teams.mjs'), out);
console.log(`meta-teams.mjs written: ${ok} valid teams, ${fail} dropped`);
console.log('sample names:', Object.keys(META).slice(0, 12).join(' · '));
