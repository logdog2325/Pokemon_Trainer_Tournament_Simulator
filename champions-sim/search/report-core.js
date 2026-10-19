/*
 * Matchup report core — trickroom.dev-style analysis of one team vs another, offline.
 * Shared by the CLI (matchup-report.js) and the in-browser Battle Lab (web/engine-entry.js).
 * ---------------------------------------------------------------------------
 * Plays the matchup thousands of times with the game-plan bot on both sides and reports:
 *   - who is favoured, with a 95% confidence range
 *   - the best four to bring and the leads, for EACH side (a mixed strategy when it's close)
 *   - how much each Pokemon matters (the side's win rate in games it was brought)
 *   - turn-1 lines for the recommended leads: our move pairs vs theirs, as win chances
 *     against best play AND against what ladder humans usually click
 *
 * Method: every bring/lead plan (15 fours x 6 lead pairs = 90 per side) is screened against the
 * opponent's default plan; the best few per side then play a full grid, solved as a simultaneous
 * game (each side picks its plan without seeing the other's). The ML bots learn this as a
 * "team preview head"; we measure it by simulation instead.
 */
const S = require('./sync-battle');
const { searchTurn, solve } = require('./search');

const LEVELS = {
	quick: { screenN: 6, short: 4, gridN: 16, search: { k: 5, samples: 6, horizon: 6 } },
	standard: { screenN: 12, short: 6, gridN: 30, search: { k: 6, samples: 10, horizon: 8 } },
};

// all 90 plans: choose 4 of 6, then which 2 of the 4 lead
function allPlans(size = 6) {
	const out = [];
	const idx = Array.from({ length: size }, (_, i) => i + 1);
	const fours = [];
	(function pick(start, acc) {
		if (acc.length === Math.min(4, size)) { fours.push(acc.slice()); return; }
		for (let i = start; i < idx.length; i++) { acc.push(idx[i]); pick(i + 1, acc); acc.pop(); }
	})(0, []);
	for (const four of fours) {
		for (let i = 0; i < four.length; i++) for (let j = i + 1; j < four.length; j++) {
			const leads = [four[i], four[j]];
			out.push({ order: leads.concat(four.filter(x => !leads.includes(x))).join(''), four, leads });
		}
	}
	return out;
}

const speciesOf = packed => packed.split(']').map(s => { const f = s.split('|'); return f[1] || f[0]; });

/**
 * @param pasteA our team paste, pasteB theirs (spread-less pastes get autospread)
 * @param opts { level: 'quick'|'standard', prior: human move prior or null }
 * @param onProgress (stage, done, total) optional
 */
function matchupReport(pasteA, pasteB, opts = {}, onProgress = () => {}) {
	const L = LEVELS[opts.level] || LEVELS.standard;
	const prior = opts.prior || null;
	const t0 = Date.now();
	const A = S.pack(pasteA), B = S.pack(pasteB);
	const NA = speciesOf(A), NB = speciesOf(B);
	const PA = allPlans(NA.length), PB = allPlans(NB.length);
	const planLabel = (p, names) => ({
		leads: p.leads.map(i => names[i - 1]),
		back: p.four.filter(x => !p.leads.includes(x)).map(i => names[i - 1]),
	});

	const brought = { A: {}, B: {} };
	let games = 0;
	const playSeries = (pa, pb, n) => {
		let w = 0;
		for (let g = 0; g < n; g++) {
			const swap = g % 2 === 1;
			const b = swap ? S.newBattle(B, A) : S.newBattle(A, B);
			const cfgA = pa ? { order: pa.order } : undefined, cfgB = pb ? { order: pb.order } : undefined;
			const r = S.rollout(b, { maxTurns: 200, configs: swap ? { p1: cfgB, p2: cfgA } : { p1: cfgA, p2: cfgB } });
			const ours = swap ? 1 - r : r;
			w += ours; games++;
			const sideA = b.sides[swap ? 1 : 0], sideB = b.sides[swap ? 0 : 1];
			for (const [side, key, win] of [[sideA, 'A', ours], [sideB, 'B', 1 - ours]]) {
				for (const p of side.pokemon.slice(0, 4)) {
					const sp = (p.set && p.set.species) || p.baseSpecies.name;   // the species as brought (pre-Mega)
					const rec = brought[key][sp] || (brought[key][sp] = [0, 0]);
					rec[0] += win; rec[1]++;
				}
			}
		}
		return w / n;
	};

	// 1) screening
	const totalScreen = PA.length + PB.length;
	let done = 0;
	const screenA = PA.map(p => { const wr = playSeries(p, null, L.screenN); onProgress('screen', ++done, totalScreen); return { p, wr }; }).sort((x, y) => y.wr - x.wr);
	const screenB = PB.map(p => { const wr = 1 - playSeries(null, p, L.screenN); onProgress('screen', ++done, totalScreen); return { p, wr }; }).sort((x, y) => y.wr - x.wr);
	const topA = screenA.slice(0, L.short), topB = screenB.slice(0, L.short);

	// 2) grid, solved as a simultaneous game
	done = 0;
	const M = topA.map(a => topB.map(b => { const v = playSeries(a.p, b.p, L.gridN); onProgress('grid', ++done, topA.length * topB.length); return v; }));
	const sol = solve(M);
	const rowGames = topB.length * L.gridN;
	const se = Math.sqrt(Math.max(sol.value * (1 - sol.value), 0.01) / rowGames);
	const range = [Math.max(0, sol.value - 1.96 * se), Math.min(1, sol.value + 1.96 * se)];

	const ourPlans = topA.map((a, i) => Object.assign(planLabel(a.p, NA), { order: a.p.order, weight: sol.x[i], vsTheirMix: M[i].reduce((s, v, j) => s + v * sol.y[j], 0) })).sort((a, b) => b.weight - a.weight);
	const theirPlans = topB.map((b, j) => Object.assign(planLabel(b.p, NB), { order: b.p.order, weight: sol.y[j], vsOurMix: 1 - M.reduce((s, row, i) => s + row[j] * sol.x[i], 0) })).sort((a, b) => b.weight - a.weight);
	const importance = key => Object.entries(brought[key]).map(([species, [w, n]]) => ({ species, broughtWinRate: w / n, games: n }))
		.sort((a, b) => b.broughtWinRate - a.broughtWinRate);

	// 3) turn-1 lines for the recommended leads
	onProgress('lines', 0, 1);
	const bestA = topA[sol.x.indexOf(Math.max(...sol.x))].p, bestB = topB[sol.y.indexOf(Math.max(...sol.y))].p;
	const b1 = S.newBattle(A, B);
	S.advanceToDecision(b1, { p1: { order: bestA.order }, p2: { order: bestB.order } });
	const lines = b1.ended ? null : searchTurn(b1, 'p1', Object.assign({ prior }, L.search));
	onProgress('lines', 1, 1);
	if (lines) games += lines.ours.length * lines.theirs.length * L.search.samples;

	const v = sol.value;
	return {
		winChance: v, range,
		verdict: v >= 0.6 ? 'favoured' : v >= 0.53 ? 'slightly favoured' : v > 0.47 ? 'even' : v > 0.4 ? 'slightly unfavoured' : 'unfavoured',
		ourTeam: NA, theirTeam: NB,
		ourPlans, theirPlans,
		ourImportance: importance('A'), theirImportance: importance('B'),
		turn1: lines && {
			leads: [b1.sides[0].active.map(p => p.species.name), b1.sides[1].active.map(p => p.species.name)],
			ourLines: lines.ours.map((o, i) => ({
				line: o.label, weight: lines.ourStrategy[i], worst: lines.worst[i],
				vsBestPlay: lines.table[i].reduce((s, x, j) => s + x * lines.theirStrategy[j], 0),
				vsHumans: lines.humanStrategy ? lines.table[i].reduce((s, x, j) => s + x * lines.humanStrategy[j], 0) : null,
				recommended: o === lines.best,
			})),
			theirLines: lines.theirs.map((o, j) => ({ line: o.label, weight: lines.theirStrategy[j], human: lines.humanStrategy ? lines.humanStrategy[j] : null })),
			table: lines.table,
			humanPrior: prior ? { replays: prior.replays, minRating: prior.minRating } : null,
		},
		games, seconds: (Date.now() - t0) / 1000,
	};
}

// plain-text rendering for the CLI
function formatReport(r, titleA = 'your team', titleB = 'their team') {
	const pct = v => `${(100 * v).toFixed(0)}%`;
	const out = [];
	out.push(`\n=== MATCHUP: ${titleA}  vs  ${titleB} ===`);
	out.push(`Win chance: ${pct(r.winChance)} (95% range ${pct(r.range[0])}–${pct(r.range[1])}) — ${r.verdict}`);
	out.push(`\nYour best plans (game-theory mix — bring/lead each this often):`);
	for (const m of r.ourPlans.filter(m => m.weight > 0.02)) out.push(`  ${pct(m.weight).padStart(4)}  lead ${m.leads.join(' + ')} | back ${m.back.join(' + ')}   [${pct(m.vsTheirMix)} vs their mix]`);
	out.push(`\nTheir best plans:`);
	for (const m of r.theirPlans.filter(m => m.weight > 0.02)) out.push(`  ${pct(m.weight).padStart(4)}  lead ${m.leads.join(' + ')} | back ${m.back.join(' + ')}   [${pct(m.vsOurMix)} vs your mix]`);
	out.push(`\nYour Pokemon — your win rate in games it was brought (games):`);
	for (const x of r.ourImportance) out.push(`  ${x.species.padEnd(16)} ${pct(x.broughtWinRate)} (${x.games})`);
	out.push(`\nTheir Pokemon — their win rate in games it was brought:`);
	for (const x of r.theirImportance) out.push(`  ${x.species.padEnd(16)} ${pct(x.broughtWinRate)} (${x.games})`);
	if (r.turn1) {
		const t = r.turn1;
		out.push(`\nTurn 1 lines: ${t.leads[0].join(' + ')} vs ${t.leads[1].join(' + ')}`);
		out.push(`  their best moves (game theory): ${t.theirLines.filter(l => l.weight > 0.05).map(l => `${l.line} (${pct(l.weight)})`).join(' | ') || '(spread out)'}`);
		if (t.humanPrior) out.push(`  what ladder players usually click (${t.humanPrior.replays} replays, ${t.humanPrior.minRating}+): ${t.theirLines.slice().sort((a, b) => b.human - a.human).slice(0, 3).map(l => `${l.line} (${pct(l.human)})`).join(' | ')}`);
		out.push(`  vs best play | vs humans | worst case | your line`);
		for (const l of t.ourLines.slice().sort((a, b) => (b.vsHumans ?? b.vsBestPlay) - (a.vsHumans ?? a.vsBestPlay))) {
			out.push(`  ${pct(l.vsBestPlay).padStart(4)}         | ${l.vsHumans == null ? '  - ' : pct(l.vsHumans).padStart(4)}      | ${pct(l.worst).padStart(4)}       | ${l.line}${l.recommended ? '   <- recommended' : ''}`);
		}
	}
	out.push(`\n${r.games} simulated games, ${r.seconds.toFixed(0)}s. Bot-vs-bot estimate: directional, not perfect play.`);
	return out.join('\n');
}

module.exports = { matchupReport, formatReport, allPlans, LEVELS };
