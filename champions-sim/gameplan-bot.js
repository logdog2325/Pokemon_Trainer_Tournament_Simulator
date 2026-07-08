/*
 * GameplanBot — a heuristic DOUBLES bot for Champions Reg M-B.
 * ---------------------------------------------------------------------------
 * Informed by the research (Foul Play, poke-env, reuniclusVGC, the documented
 * Gen-4 in-game AI): search/RL is overkill for the doubles action space and for
 * a beginner-to-intermediate bar, so this is a hand-crafted move scorer with
 * explicit game-plan rules for speed control (Trick Room / Tailwind), Fake Out,
 * Protect and redirection — exactly the "follow a plan" behaviour we want.
 *
 * It extends the sim's RandomPlayerAI and overrides receiveRequest. For foe
 * info (targeting / KO checks) it peeks at the live Battle object — fair here
 * because both sides use the same bot in AI-vs-AI matchup analysis.
 *
 * Usage: new GameplanBot(playerStream, { battle: battleStreamRef, side: 'p1' })
 */
const path = require('path');
const DIST = path.join(__dirname, '..', 'pokemon-showdown', 'dist');
const { RandomPlayerAI } = require(path.join(DIST, 'sim', 'tools', 'random-player-ai'));

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

class GameplanBot extends RandomPlayerAI {
	constructor(playerStream, opts = {}) {
		super(playerStream, opts);
		this._bs = opts.battle || null;      // BattleStream ref, has .battle after start
		this._sideId = opts.side || 'p1';
		// optional forced config for the optimizer:
		//   { order: '1 2 3 4' team-preview order (first 4 brought, first 2 lead),
		//     megaSpecies: 'Sceptile' (only this mon may Mega) | null (never Mega) | undefined (bot decides) }
		this._cfg = opts.config || null;
	}

	get battle() { return this._bs && this._bs.battle; }
	get mySide() { return this.battle && this.battle.sides.find(s => s.id === this._sideId); }
	get foeSide() { return this.battle && this.battle.sides.find(s => s.id !== this._sideId); }
	foeActive() { return (this.foeSide ? this.foeSide.active : []).filter(p => p && !p.fainted); }

	trActive() { return !!(this.battle && this.battle.field.getPseudoWeather('trickroom')); }
	twActive() { const s = this.mySide; return !!(s && s.sideConditions['tailwind']); }

	// inspect the foes' known moves (fair in symmetric AI-vs-AI) for guard/status logic
	foeMoves() {
		const b = this.battle; if (!b) return [];
		return this.foeActive().flatMap(f => (f.moveSlots || []).map(ms => b.dex.moves.get(ms.id)));
	}
	foeHasSpread() { return this.foeMoves().some(m => ['allAdjacentFoes', 'allAdjacent'].includes(m.target) && m.basePower); }
	foeHasPriority() { return this.foeMoves().some(m => (m.priority || 0) > 0 && m.category !== 'Status'); }
	foePhysical() { return this.foeMoves().some(m => m.category === 'Physical' && m.basePower >= 55); }
	// foe's kit contains a setup / speed-control move (something to disrupt with Taunt)
	foeHasSetup() {
		const S = ['nastyplot', 'swordsdance', 'calmmind', 'bulkup', 'dragondance', 'shellsmash', 'trickroom', 'tailwind', 'victorydance', 'tidyup'];
		return this.foeMoves().some(m => S.includes(m.id));
	}
	// is Trick Room hurting ME right now? (TR up AND I'm faster than the foes -> I move last)
	trHurtsMe(me) {
		if (!this.trActive() || !me) return false;
		const foes = this.foeActive(); if (!foes.length) return false;
		return me.getStat('spe', false, true) > Math.max(...foes.map(f => f.getStat('spe', false, true)));
	}

	// If this Pokemon Mega-Evolves, what weather (if any) would its mega ability set?
	// (Champions weather wars: Char-Y->Drought, Froslass->Snow Warning, etc. are mega-gated.)
	megaWeatherOf(pokemon) {
		const b = this.battle; if (!b || !pokemon || !pokemon.item) return null;
		if (/-Mega/.test(pokemon.species.name)) return null;        // already mega-evolved
		const item = b.dex.items.get(pokemon.item);
		if (!item.megaStone) return null;
		const mega = b.dex.species.get(item.megaStone);
		const ab = b.toID((mega.abilities && mega.abilities['0']) || '');
		return { drought: 'sunnyday', desolateland: 'sunnyday', drizzle: 'raindance',
			primordialsea: 'raindance', sandstream: 'sandstorm', snowwarning: 'snowscape', snowcloak: null }[ab] || null;
	}

	// ---- rough damage % of a move vs a defender (lvl 50, avg roll) ----
	estPct(attacker, moveId, defender) {
		const b = this.battle; if (!b || !attacker || !defender) return 0;
		const m = b.dex.moves.get(moveId);
		if (!m.basePower || m.category === 'Status') return 0;
		if (!b.dex.getImmunity(m.type, defender)) return 0;
		let bp = m.basePower;
		// Eruption/Water Spout style: scale with HP
		if (['eruption', 'waterspout', 'dragonenergy'].includes(m.id)) bp = Math.max(1, Math.floor(150 * attacker.hp / attacker.maxhp));
		const eff = b.dex.getEffectiveness(m.type, defender);   // integer doublings
		const typeMult = Math.pow(2, eff);
		const stab = attacker.hasType(m.type) ? 1.5 : 1;
		const phys = m.category === 'Physical';
		// unmodified=true: include boosts but skip ability/item modify events (which crash out of battle context)
		const atk = attacker.getStat(phys ? 'atk' : 'spa', false, true);
		const def = Math.max(1, defender.getStat(phys ? 'def' : 'spd', false, true));
		const base = Math.floor(Math.floor((2 * 50 / 5 + 2) * bp * atk / def) / 50) + 2;
		const dmg = base * stab * typeMult * 0.925;             // avg roll
		return dmg / defender.maxhp * 100;
	}

	// ---- score one (move, target) option; returns {score, suffix, foeSlot, dmgPct} ----
	scoreOption(mIdx, active, mv, foes, ally, turn, planned) {
		const b = this.battle;
		const me = this.mySide ? this.mySide.active[mIdx] : null;
		const id = b ? b.toID(mv.move) : mv.move;
		const target = mv.target;

		// --- game-plan / status moves ---
		if (id === 'trickroom') {
			// set TR if my side is (on avg) slower than the foes and TR isn't up
			if (this.trActive()) return { score: -50 };           // never re-cancel our own TR
			const mySpe = me ? me.getStat('spe', false, true) : 100;
			const foeSpe = foes.length ? Math.max(...foes.map(f => f.getStat('spe', false, true))) : 100;
			// high priority to get the mode online early; still below a clean game-ending KO (>=160)
			return { score: mySpe <= foeSpe ? (turn <= 2 ? 110 : 75) : -20 };
		}
		if (['sleeppowder', 'spore', 'hypnosis', 'lovelykiss', 'darkvoid'].includes(id)) {
			// sleep is premium disruption — buys the Trick Room / setup turn
			return { score: foes.length ? 50 : -10 };
		}
		if (id === 'yawn') return { score: foes.length ? 22 : -10 };
		if (id === 'tailwind') {
			if (this.twActive() || this.trActive()) return { score: -30 };
			const mySpe = me ? me.getStat('spe', false, true) : 100;
			const foeSpe = foes.length ? Math.max(...foes.map(f => f.getStat('spe', false, true))) : 100;
			return { score: mySpe >= foeSpe * 0.6 ? 45 : 10 };    // fast-ish team wants it
		}
		if (id === 'fakeout') return { score: turn <= 1 ? 55 : -40 };  // turn 1 only
		if (['ragepowder', 'followme'].includes(id)) return { score: ally && !ally.fainted ? 25 : -20 };
		if (['protect', 'detect', 'kingsshield', 'spikyshield'].includes(id)) {
			if (this.trHurtsMe(me)) return { score: 36 };          // stall out the enemy Trick Room turns
			// don't spam; use when threatened or to stall a clearly winning board
			return { score: (me && me.hp / me.maxhp < 0.4) ? 20 : (turn <= 1 ? -5 : 8) };
		}
		if (['nastyplot', 'swordsdance', 'calmmind', 'bulkup', 'dragondance', 'shellsmash', 'victorydance', 'tidyup'].includes(id)) {
			// only set up when healthy and not staring down a full board that will punish it
			return { score: (me && me.hp / me.maxhp > 0.7 && foes.length < 2) ? 32 : 10 };
		}
		// --- protective moves that react to the foe's kit ---
		if (id === 'wideguard') return { score: this.foeHasSpread() ? 40 : (turn <= 1 ? -8 : 4) };
		if (id === 'quickguard') return { score: this.foeHasPriority() ? 34 : (turn <= 1 ? -8 : 3) };
		// --- disruption / status, differentiated by what it accomplishes ---
		if (id === 'willowisp') return { score: this.foePhysical() ? 28 : 8 };   // cripple a physical attacker
		if (id === 'thunderwave') return { score: 16 };                          // slow a fast foe
		if (id === 'taunt') return { score: (this.foeHasSetup() && turn <= 3) ? 44 : 22 };  // proactively shut off TR/setup/Tailwind
		if (id === 'encore') return { score: 16 };                               // lock a foe into one move
		if (id === 'partingshot') return { score: 15 };                          // pivot + double debuff
		if (id === 'helpinghand') return { score: (ally && !ally.fainted) ? 18 : -20 };
		if (['reflect', 'lightscreen', 'auroraveil', 'safeguard'].includes(id)) return { score: turn <= 2 ? 18 : 6 };

		// --- damaging moves: best target ---
		const spread = ['allAdjacentFoes', 'allAdjacent'].includes(target);
		let best = { pct: 0, suffix: '' };
		if (spread) {
			const total = foes.reduce((a, f) => a + this.estPct(me, id, f) * 0.75, 0);  // spread ×0.75
			const koBonus = foes.filter(f => this.estPct(me, id, f) * 0.75 >= 100 * f.hp / f.maxhp).length * 40;
			best = { pct: total + koBonus, suffix: '' };
		} else if (['self', 'adjacentAlly'].includes(target)) {
			return { score: 0 };
		} else {
			// pick the foe we hit hardest / can KO (focus-fire + priority revenge logic)
			const prio = (b.dex.moves.get(id).priority || 0) > 0;
			const sucker = id === 'suckerpunch';
			foes.forEach((f) => {
				const slot = this.foeSide.active.indexOf(f) + 1;   // 1-based foe slot
				let dmg = this.estPct(me, id, f);
				if (sucker) dmg *= 0.9;                             // conditional: fails if the foe doesn't attack
				const foeHp = 100 * f.hp / f.maxhp;
				const already = (planned && planned[slot]) || 0;
				let pct = dmg;
				if (dmg >= foeHp) pct += 60;                        // solo KO
				else if (already + dmg >= foeHp) pct += 45;         // combined focus-fire KO
				else if (already > 0) pct += 8;                     // chip the already-targeted foe
				if (prio && dmg >= foeHp) pct += 22;                // priority secures the KO before they move
				if (pct > best.pct) best = { pct, suffix: (this.needsTarget(target) ? ` ${slot}` : ''), foeSlot: slot, dmgPct: dmg };
			});
		}
		return { score: best.pct, suffix: best.suffix, foeSlot: best.foeSlot, dmgPct: best.dmgPct };
	}

	needsTarget(t) { return ['normal', 'any', 'adjacentFoe'].includes(t); }

	// ---------- main decision ----------
	receiveRequest(request) {
		if (request.wait) return;
		if (request.forceSwitch) {
			// send in the mon that best threatens the current foes (no double-picking)
			const foes = this.foeActive();
			const chosen = [];
			const choices = request.forceSwitch.map((must) => {
				if (!must) return 'pass';
				const cands = range(1, 6).filter(j => {
					const p = request.side.pokemon[j - 1];
					return p && !p.active && !p.condition.endsWith(' fnt') && !chosen.includes(j);
				});
				if (!cands.length) return 'pass';
				const best = cands.map(j => {
					const mon = this.mySide ? this.mySide.pokemon[j - 1] : null;
					const moves = (request.side.pokemon[j - 1].moves || []);
					const power = mon ? Math.max(0, ...moves.map(mid => Math.max(0, ...foes.map(f => this.estPct(mon, mid, f))))) : 0;
					return { j, power };
				}).sort((a, b) => b.power - a.power)[0];
				chosen.push(best.j);
				return `switch ${best.j}`;
			});
			return this.choose(choices.join(', '));
		}
		if (request.teamPreview) {
			return this.choose(this.chooseTeamPreview(request.side.pokemon));
		}
		if (!request.active) return;

		const turn = this.battle ? this.battle.turn : 1;
		const foes = this.foeActive();
		let canMegaEvo = true;
		const planned = {};              // foeSlot -> cumulative damage % planned this turn (focus-fire)
		const choices = request.active.map((active, i) => {
			const pm = request.side.pokemon[i];
			if (pm.condition.endsWith(' fnt') || pm.commanding) return 'pass';
			canMegaEvo = canMegaEvo && active.canMegaEvo;
			const ally = this.mySide ? this.mySide.active[i ^ 1] : null;

			const legal = range(1, active.moves.length)
				.filter(j => !active.moves[j - 1].disabled)
				.map(j => ({ slot: j, move: active.moves[j - 1].move, target: active.moves[j - 1].target }));
			if (!legal.length) return 'pass';

			const scored = legal.map(mv => {
				const s = this.scoreOption(i, active, mv, foes, ally, turn, planned);
				return { mv, ...s };
			}).sort((a, b) => b.score - a.score);

			const pick = scored[0];
			// record planned damage on the target so the partner can focus-fire the same foe
			if (pick.foeSlot && pick.dmgPct) planned[pick.foeSlot] = (planned[pick.foeSlot] || 0) + pick.dmgPct;
			// resolve the target suffix for the picked move (status foe/ally moves need one too)
			let suffix = pick.suffix || '';
			if (!suffix) {
				const t = pick.mv.target;
				const foeSlots = this.foeSide ? this.foeSide.active.map((f, k) => (f && !f.fainted) ? k + 1 : 0).filter(Boolean) : [1];
				if (['normal', 'any', 'adjacentFoe'].includes(t)) suffix = ` ${foeSlots[0] || 1}`;
				else if (t === 'adjacentAlly') suffix = ` -${(i ^ 1) + 1}`;
				else if (t === 'adjacentAllyOrSelf') suffix = (ally && !ally.fainted) ? ` -${(i ^ 1) + 1}` : ` -${i + 1}`;
			}
			let choice = `move ${pick.mv.slot}${suffix}`;
			// --- Mega-evolution timing (one mega per battle) ---
			if (canMegaEvo && active.canMegaEvo) {
				const myMon = this.mySide ? this.mySide.active[i] : null;
				const baseName = (myMon && myMon.species) ? (myMon.species.baseSpecies || myMon.species.name) : '';
				const myWeather = this.megaWeatherOf(myMon);   // weather my mega would set, or null
				let doMega = true;
				if (myWeather) {
					// Weather-war logic: our weather ability only fires on Mega Evolution, so
					// time it to set weather LAST and override the opponent.
					const cur = this.battle.field.weather;                       // current weather id ('' if none)
					const foeWeatherThreat = foes.some(f => this.megaWeatherOf(f)); // un-megaed weather-mega on their side
					if (cur && cur !== myWeather) doMega = true;                 // override their active weather NOW
					else if (!cur && foeWeatherThreat) doMega = false;           // HOLD: let them commit, override next
					else doMega = true;                                          // no threat -> set our weather
				}
				// optimizer override: only Mega the designated mon (null = never Mega)
				if (this._cfg && this._cfg.megaSpecies !== undefined) {
					doMega = doMega && this._cfg.megaSpecies !== null && baseName === this._cfg.megaSpecies;
				}
				if (doMega) { choice += ' mega'; canMegaEvo = false; }
			}
			return choice;
		});
		this.choose(choices.join(', '));
	}

	// ---------- bring-6 / pick-4 ----------
	chooseTeamPreview(team) {
		if (this._cfg && this._cfg.order) return `team ${this._cfg.order.replace(/\s+/g, '')}`;  // forced by optimizer
		// Reg M-B brings 4. Pick 4 by simple coverage: keep speed-control + best raw offense.
		const n = this.battle && this.battle.ruleTable ? (this.battle.ruleTable.pickedTeamSize || 4) : 4;
		if (!this.battle || team.length <= n) return 'default';
		const idx = team.map((p, i) => {
			const mon = this.mySide.pokemon[i];
			const moves = (p.moves || []).map(m => this.battle.toID(m));
			const speedctrl = moves.some(m => ['trickroom', 'tailwind', 'icywind', 'electroweb'].includes(m)) ? 100 : 0;
			const support = moves.some(m => ['fakeout', 'ragepowder', 'followme', 'protect', 'helpinghand'].includes(m)) ? 20 : 0;
			const off = mon ? Math.max(mon.getStat('atk', false, true), mon.getStat('spa', false, true)) : 0;
			return { i: i + 1, val: speedctrl + support + off / 3 };
		}).sort((a, b) => b.val - a.val).slice(0, n).map(x => x.i);
		return `team ${idx.join('')}`;
	}
}

module.exports = { GameplanBot };
