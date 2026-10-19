/*
 * One-turn simultaneous-move search (the "lines" engine).
 * ---------------------------------------------------------------------------
 * The same idea the top Reg M-C bots use at play time (mikumiku37, Wolfe_Alt6767):
 *   1. list each side's most plausible joint actions for this turn
 *      (GameplanBot's move scores pick the candidates),
 *   2. for every (our action, their action) pair, copy the battle, force both
 *      choices, and play the copy out with GameplanBot on both sides —
 *      several times with different RNG seeds (rolls, crits, accuracy, speed ties),
 *   3. fill a payoff table of win chances and solve it as a simultaneous game
 *      (regret matching), giving a mixed strategy for both players.
 *
 * Our evaluator is the heuristic bot, not a trained network, so treat the numbers
 * as "how often this line wins against a sensible opponent", not perfect play.
 *
 *   const { searchTurn } = require('./search');
 *   const r = searchTurn(battle, 'p1', { k: 6, samples: 8, horizon: 6 });
 *   r.best, r.table, r.ourStrategy, r.theirStrategy, r.value
 */
const { policyChoice, rollout, clone, PRNG } = require('./sync-battle');
const { GameplanBot } = require('../gameplan-bot.js');

const dummyStream = { write() {}, [Symbol.asyncIterator]() { return { next: () => new Promise(() => {}) }; } };
const PROTECTS = new Set(['protect', 'detect', 'kingsshield', 'spikyshield', 'banefulbunker', 'silktrap', 'burningbulwark']);

// ---------------------------------------------------------------- candidates
// Per active Pokemon: every legal move (and target), scored by GameplanBot; keep the best few.
function monOptions(battle, sideId, idx, perMon) {
	const side = battle.sides.find(s => s.id === sideId);
	const req = side.activeRequest;
	const active = req.active[idx];
	const pm = req.side.pokemon[idx];
	if (!active || pm.condition.endsWith(' fnt') || pm.commanding) return [{ choice: 'pass', label: 'pass', score: 0 }];
	const bot = new GameplanBot(dummyStream, { side: sideId });
	bot._bs = { battle };
	const foes = bot.foeActive();
	const ally = side.active[idx ^ 1];
	const me = side.active[idx];
	const opts = [];
	active.moves.forEach((mv, j) => {
		if (mv.disabled) return;
		const slot = j + 1;
		const m = battle.dex.moves.get(mv.move);
		const s = bot.scoreOption(idx, active, { slot, move: mv.move, target: mv.target }, foes, ally, battle.turn, {});
		if (bot.needsTarget(mv.target)) {
			// one option per foe target, so the search can find "double into X" lines
			for (const f of foes) {
				const t = bot.foeSide.active.indexOf(f) + 1;
				const dmg = bot.estPct(me, m.id, f);
				const hpPct = 100 * f.hp / f.maxhp;
				const score = m.category === 'Status' ? s.score : dmg + (dmg >= hpPct ? 60 : 0);
				opts.push({ choice: `move ${slot} ${t}`, label: `${m.name} → ${f.species.name}`, score, protect: false, move: m.name, target: t });
			}
		} else {
			let suffix = '';
			if (mv.target === 'adjacentAlly') suffix = ` -${(idx ^ 1) + 1}`;
			else if (mv.target === 'adjacentAllyOrSelf') suffix = (ally && !ally.fainted) ? ` -${(idx ^ 1) + 1}` : ` -${idx + 1}`;
			opts.push({ choice: `move ${slot}${suffix}`, label: m.name, score: s.score, protect: PROTECTS.has(m.id), move: m.name });
		}
	});
	opts.sort((a, b) => b.score - a.score);
	const keep = opts.slice(0, perMon);
	const prot = opts.find(o => o.protect);
	if (prot && !keep.includes(prot)) keep.push(prot);       // Protect is always a real option in doubles
	return keep.length ? keep : [{ choice: 'default', label: 'default', score: 0 }];
}

// which active slot (if any) the bot would Mega Evolve this turn — keep that decision fixed
function megaSlot(battle, sideId) {
	const c = policyChoice(battle, sideId) || '';
	const parts = c.split(',').map(s => s.trim());
	return parts.findIndex(p => / mega$/.test(p));
}

// joint actions for a side: cartesian product of per-mon options, best K by summed score,
// always including the plain GameplanBot choice so the search can only improve on it
function jointActions(battle, sideId, k, perMon) {
	const side = battle.sides.find(s => s.id === sideId);
	const n = side.activeRequest.active.length;
	const per = Array.from({ length: n }, (_, i) => monOptions(battle, sideId, i, perMon));
	const mega = megaSlot(battle, sideId);
	let combos = [[]];
	for (const opts of per) combos = combos.flatMap(c => opts.map(o => c.concat([o])));
	const joint = combos.map(c => ({
		parts: c,
		choice: c.map((o, i) => o.choice + (i === mega && o.choice.startsWith('move') ? ' mega' : '')).join(', '),
		label: c.map((o, i) => o.label + (i === mega && o.choice.startsWith('move') ? ' (Mega)' : '')).join(' + '),
		score: c.reduce((a, o) => a + o.score, 0),
	})).sort((a, b) => b.score - a.score);
	const base = policyChoice(battle, sideId);
	const out = [];
	const baseHit = joint.find(j => j.choice === base);
	if (baseHit) out.push(Object.assign({ bot: true }, baseHit));
	for (const j of joint) { if (out.length >= k) break; if (!out.includes(j) && j.choice !== base) out.push(j); }
	if (!baseHit && base) out.unshift({ choice: base, label: base, score: 0, bot: true, parts: [] });
	return out.slice(0, Math.max(k, 1));
}

// ---------------------------------------------------------------- human prior
// How likely a human is to click each candidate joint action, from ladder replays
// (champions-sim/human/move-prior.json). Unknown species fall back to uniform.
function humanWeights(battle, sideId, joints, prior) {
	const side = battle.sides.find(s => s.id === sideId);
	const bucket = battle.turn <= 1 ? 't1' : 'later';
	const w = joints.map(j => {
		if (!j.parts || !j.parts.length) return 1;
		let p = 1;
		j.parts.forEach((o, i) => {
			if (!o.move) return;
			const mon = side.active[i];
			const sp = mon ? mon.baseSpecies.name : '';
			const rec = prior.species[sp] || prior.species[sp.replace(/-.*$/, '')];
			const legal = (side.activeRequest.active[i] || { moves: [] }).moves.filter(m => !m.disabled).map(m => m.move);
			let pm = 1 / Math.max(1, legal.length);
			if (rec) {
				const counts = Object.assign({}, rec.later, bucket === 't1' ? rec.t1 : {});
				const tot = legal.reduce((a, m) => a + (counts[m] || 0) + 1, 0);
				pm = ((counts[o.move] || 0) + 1) / tot;
			}
			if (o.protect && mon && mon.volatiles && mon.volatiles.stall) pm *= prior.protectRepeatRate / 0.3;
			p *= pm;
		});
		const tg = j.parts.filter(o => o.target).map(o => o.target);
		if (tg.length === 2) p *= tg[0] === tg[1] ? 2 * prior.doubleTargetRate : 2 * (1 - prior.doubleTargetRate);
		return p;
	});
	const t = w.reduce((a, b) => a + b, 0) || 1;
	return w.map(x => x / t);
}

// ---------------------------------------------------------------- matrix game
// Regret matching for a zero-sum matrix game; M[i][j] = row player's payoff in [0,1].
function solve(M, iters = 3000) {
	const R = M.length, C = M[0].length;
	const rr = new Array(R).fill(0), rc = new Array(C).fill(0);
	const sr = new Array(R).fill(0), sc = new Array(C).fill(0);
	const strat = (reg) => { const pos = reg.map(r => Math.max(r, 0)); const t = pos.reduce((a, b) => a + b, 0); return t > 0 ? pos.map(p => p / t) : reg.map(() => 1 / reg.length); };
	for (let it = 0; it < iters; it++) {
		const x = strat(rr), y = strat(rc);
		const rowVal = M.map(row => row.reduce((a, v, j) => a + v * y[j], 0));
		const colVal = M[0].map((_, j) => M.reduce((a, row, i) => a + row[j] * x[i], 0));
		const v = rowVal.reduce((a, rv, i) => a + rv * x[i], 0);
		rowVal.forEach((rv, i) => { rr[i] += rv - v; sr[i] += x[i]; });
		colVal.forEach((cv, j) => { rc[j] += v - cv; sc[j] += y[j]; });   // column player minimizes
	}
	const norm = a => { const t = a.reduce((p, q) => p + q, 0); return a.map(q => q / t); };
	const x = norm(sr), y = norm(sc);
	const value = M.reduce((a, row, i) => a + x[i] * row.reduce((b, v, j) => b + v * y[j], 0), 0);
	return { x, y, value };
}

// ---------------------------------------------------------------- search
function searchTurn(battle, sideId, opts = {}) {
	const { k = 6, kFoe = k, perMon = 3, samples = 8, horizon = 8, prior = null, humanBlend = 0.5 } = opts;
	const foeId = sideId === 'p1' ? 'p2' : 'p1';
	const ours = jointActions(battle, sideId, k, perMon);
	const theirs = jointActions(battle, foeId, kFoe, perMon);
	const seeds = Array.from({ length: samples }, () => PRNG.generateSeed());
	const M = ours.map(() => theirs.map(() => 0));
	ours.forEach((a, i) => theirs.forEach((b, j) => {
		let tot = 0;
		for (const seed of seeds) {
			const c = clone(battle, seed);
			const okA = c.choose(sideId, a.choice); if (!okA) { c.sides.find(s => s.id === sideId).clearChoice(); c.choose(sideId, 'default'); }
			const okB = c.choose(foeId, b.choice); if (!okB) { c.sides.find(s => s.id === foeId).clearChoice(); c.choose(foeId, 'default'); }
			c.log.length = 0; c.sentLogPos = 0;
			const r = rollout(c, { maxTurns: horizon });       // p1 perspective
			tot += sideId === 'p1' ? r : 1 - r;
		}
		M[i][j] = tot / samples;
	}));
	const sol = solve(M);
	const worst = M.map(row => Math.min(...row));
	let bi = 0, human = null, vsHuman = null;
	if (prior) {
		// best response to a blend of "perfect opponent" (equilibrium) and "what humans click"
		human = humanWeights(battle, foeId, theirs, prior);
		const y = sol.y.map((q, j) => (1 - humanBlend) * q + humanBlend * human[j]);
		vsHuman = M.map(row => row.reduce((a, v, j) => a + v * y[j], 0));
		vsHuman.forEach((v, i) => { if (v > vsHuman[bi] + 1e-9) bi = i; });
	} else {
		// highest equilibrium weight; ties -> better worst case
		sol.x.forEach((p, i) => { if (p > sol.x[bi] + 1e-9 || (Math.abs(p - sol.x[bi]) < 1e-9 && worst[i] > worst[bi])) bi = i; });
	}
	return {
		best: ours[bi], ours, theirs, table: M, ourStrategy: sol.x, theirStrategy: sol.y, value: sol.value,
		botLineValue: M[ours.findIndex(o => o.bot)] ? M[ours.findIndex(o => o.bot)].reduce((a, v, j) => a + v * sol.y[j], 0) : null,
		worst, humanStrategy: human, vsHuman,
	};
}

module.exports = { searchTurn, jointActions, solve };
