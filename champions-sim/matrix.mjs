/*
 * Matchup matrix — your team vs one real team per meta archetype, win-rate
 * table (worst matchup first). Both sides use the calibrated GameplanBot with
 * its own bring/mega/lead choices (this is the "how does my team do vs the
 * meta" overview; use optimizer.mjs to find the best bring per matchup).
 *
 *   node champions-sim/matrix.mjs [N]
 */
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const DIST = path.join(__dirname, '..', 'pokemon-showdown', 'dist');
const { BattleStream, getPlayerStreams, Teams } = require(path.join(DIST, 'sim'));
const { GameplanBot } = require(path.join(__dirname, 'gameplan-bot.js'));
import { MY_TEAM, META } from './teams.mjs';
import { autospread } from './autospread.mjs';
const FORMAT = 'gen9championsvgc2026regmb';

function pack(paste) { return Teams.pack(Teams.import(autospread(paste))); }

function runOne(myPacked, foePacked, meIsP1) {
	return new Promise(resolve => {
		const bs = new BattleStream();
		const s = getPlayerStreams(bs);
		const meStream = meIsP1 ? s.p1 : s.p2, foeStream = meIsP1 ? s.p2 : s.p1;
		new GameplanBot(meStream, { battle: bs, side: meIsP1 ? 'p1' : 'p2' }).start();
		new GameplanBot(foeStream, { battle: bs, side: meIsP1 ? 'p2' : 'p1' }).start();
		let done = false;
		(async () => { for await (const c of s.omniscient) {
			const w = c.match(/\|win\|([^\n]*)/); const tie = /\|tie\b/.test(c);
			if (!done && (w || tie)) { done = true; resolve(w ? w[1].trim() : 'tie'); }
		} })();
		s.omniscient.write(`>start ${JSON.stringify({ formatid: FORMAT })}
>player p1 ${JSON.stringify({ name: 'A', team: meIsP1 ? myPacked : foePacked })}
>player p2 ${JSON.stringify({ name: 'B', team: meIsP1 ? foePacked : myPacked })}`);
	});
}

async function main() {
	const N = parseInt(process.argv[2] || '60', 10);
	const my = pack(MY_TEAM);
	console.log(`\nMatchup matrix — your team vs the meta (${N} games each, sides alternated)\n`);
	const t0 = Date.now();
	const rows = [];
	for (const [name, paste] of Object.entries(META)) {
		const foe = pack(paste);
		let w = 0, g = 0;
		for (let i = 0; i < N; i++) {
			const meIsP1 = i % 2 === 0;
			const winner = await runOne(my, foe, meIsP1);
			if (winner === 'tie') continue;
			g++;
			if (winner === (meIsP1 ? 'A' : 'B')) w++;
		}
		rows.push({ name, wr: 100 * w / (g || 1) });
	}
	rows.sort((a, b) => a.wr - b.wr);
	for (const r of rows) {
		const bar = '█'.repeat(Math.round(r.wr / 5)).padEnd(20);
		const tag = r.wr < 40 ? ' ⚠️' : r.wr >= 60 ? ' ✓' : '';
		console.log(`  ${r.name.padEnd(38)} ${bar} ${r.wr.toFixed(0)}%${tag}`);
	}
	const avg = rows.reduce((a, r) => a + r.wr, 0) / rows.length;
	console.log(`\n  overall: ${avg.toFixed(0)}%   [${((Date.now() - t0) / 1000).toFixed(0)}s]`);
}
main().catch(e => console.log('ERR:', e.message, e.stack));
