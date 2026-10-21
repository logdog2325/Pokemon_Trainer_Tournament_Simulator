/*
 * Does search actually play better? Search bot vs plain GameplanBot, same team on both
 * sides (a mirror isolates skill from team strength), sides alternated.
 *   node champions-sim/search/bench.js <team.txt> [games=20] [k=5] [samples=4] [horizon=5]
 */
const fs = require('fs');
const S = require('./sync-battle');
const { searchTurn } = require('./search');

const [file, games = '20', k = '5', samples = '4', horizon = '5'] = process.argv.slice(2);
const T = S.pack(fs.readFileSync(file, 'utf8'));
const cfg = { k: +k, samples: +samples, horizon: +horizon };

function play(searchSide) {
	const b = S.newBattle(T, T);
	let guard = 0;
	while (!b.ended && guard++ < 300) {
		const p = S.pending(b);
		if (!p.length) break;
		const both = p.length === 2 && p.every(s => s.activeRequest.active && !s.activeRequest.forceSwitch);
		for (const s of p) {
			let ch;
			if (both && s.id === searchSide) ch = searchTurn(b, s.id, cfg).best.choice;
			else ch = S.policyChoice(b, s.id);
			S.submit(b, s.id, ch);
		}
	}
	if (!b.ended) return 0.5;
	return b.winner === b.sides[searchSide === 'p1' ? 0 : 1].name ? 1 : 0;
}

let score = 0;
const t0 = Date.now();
for (let g = 0; g < +games; g++) {
	score += play(g % 2 ? 'p2' : 'p1');
	process.stdout.write(`game ${g + 1}/${games}: search bot ${score}/${g + 1}  (${((Date.now() - t0) / 1000 / (g + 1)).toFixed(1)}s/game)\n`);
}
const n = +games, p = score / n, se = Math.sqrt(p * (1 - p) / n);
console.log(`\nSearch bot win rate vs plain bot (mirror): ${(100 * p).toFixed(1)}% ± ${(196 * se).toFixed(1)} (95% CI)`);
