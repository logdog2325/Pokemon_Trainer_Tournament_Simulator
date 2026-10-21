/*
 * Synchronous battle driver for search + rollouts.
 * ---------------------------------------------------------------------------
 * The stream-based harness (simulate-matchup.mjs) is fine for whole games, but
 * search needs to (a) copy a battle mid-game, (b) force specific choices for
 * both sides, and (c) play the copy out fast. This drives Showdown's Battle
 * object directly: no streams, no async.
 *
 *   const { newBattle, policyChoice, rollout, clone } = require('./sync-battle');
 */
// static paths so the same file bundles into the browser engine (esbuild) and runs in Node
const { Battle, Teams, PRNG } = require('../../pokemon-showdown/dist/sim');
const { GameplanBot } = require('../gameplan-bot.js');

const FORMAT = 'gen9championsvgc2026regmc';

const { autospread } = require('../autospread.mjs');
// tournament pastes often have no spreads; autospread fills role-based Champions points
const pack = paste => {
	const t = Teams.import(autospread(paste));
	if (!t) throw new Error('could not parse team');
	return Teams.pack(t);
};

function newBattle(packedA, packedB, seed) {
	const b = new Battle({ formatid: FORMAT, seed: seed || PRNG.generateSeed() });
	b.setPlayer('p1', { name: 'A', team: packedA });
	b.setPlayer('p2', { name: 'B', team: packedB });
	b.send = () => {};
	return b;
}

// one reusable GameplanBot per side; we hand it the battle + request and capture its choice
const dummyStream = { write() {}, [Symbol.asyncIterator]() { return { next: () => new Promise(() => {}) }; } };
const _bots = {};
function botFor(sideId, config) {
	const key = sideId + JSON.stringify(config || null);
	if (!_bots[key]) _bots[key] = new GameplanBot(dummyStream, { side: sideId, config });
	return _bots[key];
}
// the GameplanBot's choice for a side at the battle's current request
function policyChoice(battle, sideId, config) {
	const side = battle.sides.find(s => s.id === sideId);
	const req = side && side.activeRequest;
	if (!req || req.wait) return null;
	const bot = botFor(sideId, config);
	bot._bs = { battle };
	bot._sideId = sideId;
	let out = null;
	bot.choose = c => { out = c; };
	try { bot.receiveRequest(req); } catch (e) { out = null; }
	return out || 'default';
}

function pending(battle) {
	return battle.sides.filter(s => s.activeRequest && !s.activeRequest.wait && !s.isChoiceDone());
}

// submit a choice; fall back to 'default' if the sim rejects it
function submit(battle, sideId, choice) {
	if (!battle.choose(sideId, choice)) {
		const side = battle.sides.find(s => s.id === sideId);
		side.clearChoice();
		battle.choose(sideId, 'default');
	}
	// nothing reads the protocol log here; keep it from growing (Showdown aborts past 1000 unsent lines)
	battle.log.length = 0; battle.sentLogPos = 0;
}

// advance until a decision point where BOTH sides must choose moves (or the game ends),
// letting the policy handle team preview and forced switches
function advanceToDecision(battle, configs = {}) {
	let guard = 0;
	while (!battle.ended && guard++ < 50) {
		const p = pending(battle);
		if (!p.length) return;
		const both = p.length === 2 && p.every(s => s.activeRequest.active && !s.activeRequest.forceSwitch);
		if (both) return;
		for (const s of p) submit(battle, s.id, policyChoice(battle, s.id, configs[s.id]));
	}
}

// play the battle out with the policy on both sides; returns 1 (p1 win), 0 (p2), 0.5 (tie/cutoff)
function rollout(battle, { maxTurns = 40, configs = {} } = {}) {
	const stopAt = battle.turn + maxTurns;
	let guard = 0;
	while (!battle.ended && battle.turn < stopAt && guard++ < 400) {
		const p = pending(battle);
		if (!p.length) break;
		for (const s of p) submit(battle, s.id, policyChoice(battle, s.id, configs[s.id]));
	}
	// compare against the sides' own names: Arena battles call the players "You" / "AI · ..."
	if (battle.ended) return battle.winner === battle.sides[0].name ? 1 : battle.winner === battle.sides[1].name ? 0 : 0.5;
	return evaluate(battle);
}

// static evaluation for cut-off rollouts: remaining HP fraction, p1 share
function evaluate(battle) {
	const hp = side => side.pokemon.filter(p => p.isStarted || p.position < 4 || !p.fainted)
		.reduce((a, p) => a + (p.fainted ? 0 : p.hp / p.maxhp), 0);
	const a = hp(battle.sides[0]), b = hp(battle.sides[1]);
	return a + b ? a / (a + b) : 0.5;
}

// deep copy with a fresh RNG stream (so each sample sees different rolls / crits / accuracy)
function clone(battle, seed) {
	const c = Battle.fromJSON(battle.toJSON());
	c.resetRNG(seed || PRNG.generateSeed());
	// the copy must not print or send anywhere
	c.send = () => {};
	c.log.length = 0; c.sentLogPos = 0;
	return c;
}

module.exports = { FORMAT, pack, newBattle, policyChoice, advanceToDecision, rollout, evaluate, clone, submit, pending, PRNG, Battle };
