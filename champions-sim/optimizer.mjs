/*
 * Bring-4 / mega / lead optimizer  (Step 2)
 * ---------------------------------------------------------------------------
 * For a matchup, enumerates candidate configs — which 4 to bring (first 2 lead)
 * and which single mon to Mega — runs N real games of each with the calibrated
 * GameplanBot (opponent plays its own best), and ranks by measured win rate.
 * Answers: "bring these 4, Mega this one, lead these 2, ~X% win."
 *
 *   node champions-sim/optimizer.mjs [gamesPerConfig]
 */
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const DIST = path.join(__dirname, '..', 'pokemon-showdown', 'dist');
const { BattleStream, getPlayerStreams, Teams, Dex } = require(path.join(DIST, 'sim'));
const { GameplanBot } = require(path.join(__dirname, 'gameplan-bot.js'));
const FORMAT = 'gen9championsvgc2026regmb';
const cdex = Dex.mod('champions');

import { MY_TEAM, META } from './teams.mjs';
import { autospread } from './autospread.mjs';

// ---- parse a paste into slot metadata (species, mega-capable, is-lead-ish) ----
const LEADISH = ['trickroom', 'tailwind', 'fakeout', 'ragepowder', 'followme', 'icywind', 'electroweb', 'sleeppowder', 'protect'];
function meta(paste) {
	return paste.trim().split(/\n\s*\n/).map((block, i) => {
		const lines = block.trim().split('\n');
		let head = lines[0], item = '';
		const at = head.lastIndexOf(' @ ');
		if (at >= 0) { item = head.slice(at + 3).trim(); head = head.slice(0, at).trim(); }
		const species = head.replace(/-Mega.*$/, '').trim();
		const megaCapable = !!cdex.items.get(item).megaStone;
		const moves = lines.filter(l => /^-/.test(l)).map(l => cdex.toID(l.replace(/^-\s*/, '').split('/')[0]));
		const leadScore = moves.filter(m => LEADISH.includes(m)).length;
		return { slot: i + 1, species, megaCapable, leadScore };
	});
}

function combos4(slots) {
	const out = [];
	for (let a = 0; a < slots.length; a++) for (let b = a + 1; b < slots.length; b++)
		for (let c = b + 1; c < slots.length; c++) for (let d = c + 1; d < slots.length; d++)
			out.push([slots[a], slots[b], slots[c], slots[d]]);
	return out;
}

// every unordered lead pair within a bring-4 (leads first, back two after).
// returns order strings like '1543' — exhaustive, not heuristic.
function leadOrderings(bring) {
	const out = [];
	for (let a = 0; a < bring.length; a++) for (let b = a + 1; b < bring.length; b++) {
		const leads = [bring[a], bring[b]];
		const back = bring.filter((_, k) => k !== a && k !== b);
		out.push([...leads, ...back].map(s => s.slot).join(''));
	}
	return out;
}

function runOne(myPacked, foePacked, config) {
	return new Promise(resolve => {
		const bs = new BattleStream();
		const s = getPlayerStreams(bs);
		new GameplanBot(s.p1, { battle: bs, side: 'p1', config }).start();
		new GameplanBot(s.p2, { battle: bs, side: 'p2' }).start();
		let done = false;
		(async () => { for await (const c of s.omniscient) {
			const w = c.match(/\|win\|([^\n]*)/); const tie = /\|tie\b/.test(c);
			if (!done && (w || tie)) { done = true; resolve(w ? (w[1].trim() === 'A' ? 'me' : 'foe') : 'tie'); }
		} })();
		s.omniscient.write(`>start ${JSON.stringify({ formatid: FORMAT })}
>player p1 ${JSON.stringify({ name: 'A', team: myPacked })}
>player p2 ${JSON.stringify({ name: 'B', team: foePacked })}`);
	});
}

async function winRate(myPacked, foePacked, config, N) {
	let w = 0, g = 0;
	for (let i = 0; i < N; i++) { const r = await runOne(myPacked, foePacked, config); if (r !== 'tie') { g++; if (r === 'me') w++; } }
	return { wr: 100 * w / (g || 1), w, g };
}

export async function optimize(myPaste, foePaste, foeName, N) {
	const myPacked = Teams.pack(Teams.import(autospread(myPaste)));
	const foePacked = Teams.pack(Teams.import(autospread(foePaste)));
	const slots = meta(myPaste);
	const byName = Object.fromEntries(slots.map(s => [s.slot, s.species]));

	// build configs EXHAUSTIVELY: every bring-4 × every lead pairing × every Mega choice
	// (each mega-capable mon in the bring, plus "none"). Truly brute-forced, not heuristic.
	const configs = [];
	for (const bring of combos4(slots)) {
		const megaOpts = [...bring.filter(s => s.megaCapable).map(s => s.species), null];  // each mega, or none
		for (const ord of leadOrderings(bring))
			for (const m of megaOpts) configs.push({ order: ord, megaSpecies: m, bring: bring.map(s => s.slot) });
	}

	console.log(`\n=== vs ${foeName} ===  (${configs.length} configs x ${N} games)`);
	const results = [];
	let n = 0;
	for (const cfg of configs) {
		const { wr, g } = await winRate(myPacked, foePacked, cfg, N);
		results.push({ cfg, wr, g });
		process.stdout.write(`  ${++n}/${configs.length}\r`);
	}
	results.sort((a, b) => b.wr - a.wr);
	const fmt = r => {
		const leads = r.cfg.order.slice(0, 2).split('').map(d => byName[d]);
		const back = r.cfg.order.slice(2, 4).split('').map(d => byName[d]);
		return `${r.wr.toFixed(0)}%  lead ${leads.join(' + ')} / back ${back.join(' + ')}  | Mega: ${r.cfg.megaSpecies || 'none'}`;
	};
	console.log(`  BEST:  ${fmt(results[0])}`);
	console.log(`  runners-up:`);
	results.slice(1, 4).forEach(r => console.log(`    ${fmt(r)}`));
	return results[0];
}

async function main() {
	const N = parseInt(process.argv[2] || '30', 10);
	const t0 = Date.now();
	// optimize vs each archetype
	for (const [name, paste] of Object.entries(META)) {
		await optimize(MY_TEAM, paste, name, N);
	}
	console.log(`\n[${((Date.now() - t0) / 1000).toFixed(0)}s]`);
}
// only auto-run when invoked directly (so `import { optimize }` doesn't launch every matchup)
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch(e => console.log('ERR:', e.message, e.stack));
}
