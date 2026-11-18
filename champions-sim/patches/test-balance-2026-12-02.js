#!/usr/bin/env node
/*
 * Checks that the 2026-12-02 balance patch is live in the built engine.
 *   node champions-sim/patches/test-balance-2026-12-02.js
 */
const path = require('path');
const DIST = path.join(__dirname, '..', '..', 'pokemon-showdown', 'dist');
const { Dex, TeamValidator } = require(path.join(DIST, 'sim'));
const S = require('../search/sync-battle');
const FORMAT = 'gen9championsvgc2026regmc';
const dex = Dex.forFormat(FORMAT);
let fails = 0;
const ok = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`); if (!cond) fails++; };

// 1) move data
const rs = dex.moves.get('rockslide');
ok(rs.accuracy === 95 && rs.secondary && rs.secondary.chance === 20 && rs.secondary.volatileStatus === 'flinch', `Rock Slide 95% acc / 20% flinch (got ${rs.accuracy} / ${rs.secondary && rs.secondary.chance})`);
for (const id of ['screech', 'steelwing', 'metalsound', 'frostbreath']) ok(dex.moves.get(id).accuracy === 100, `${dex.moves.get(id).name} 100% accuracy (got ${dex.moves.get(id).accuracy})`);
ok(dex.moves.get('steelwing').secondary && dex.moves.get('steelwing').secondary.chance === 10, 'Steel Wing keeps its 10% Def boost');

// 2) new learnset entries pass the official validator
const v = TeamValidator.get(FORMAT);
const filler = ['Incineroar @ Sitrus Berry\nAbility: Intimidate\nLevel: 50\nEVs: 32 HP / 32 Def / 2 SpD\nImpish Nature\n- Fake Out',
	'Rillaboom @ Miracle Seed\nAbility: Grassy Surge\nLevel: 50\nEVs: 32 HP / 32 Atk / 2 Spe\nAdamant Nature\n- Fake Out',
	'Garchomp @ Life Orb\nAbility: Rough Skin\nLevel: 50\nEVs: 2 HP / 32 Atk / 32 Spe\nJolly Nature\n- Protect',
	'Kingambit @ Chople Berry\nAbility: Defiant\nLevel: 50\nEVs: 32 HP / 32 Atk / 2 SpD\nAdamant Nature\n- Protect',
	'Sinistcha @ Colbur Berry\nAbility: Hospitality\nLevel: 50\nEVs: 32 HP / 32 Def / 2 SpD\nBold Nature\n- Protect'];
const learn = [['Hydreigon', 'Choice Scarf', 'Levitate', 'Roost'], ['Beedrill', 'Beedrillite', 'Swarm', 'Roost'], ['Emboar', 'Emboarite', 'Blaze', 'Slack Off'],
	['Emolga', 'Focus Sash', 'Static', 'Tailwind'], ['Umbreon', 'Leftovers', 'Synchronize', 'Wonder Room'], ['Umbreon', 'Leftovers', 'Synchronize', 'Play Rough'],
	['Sylveon', 'Fairy Feather', 'Pixilate', null], ['Vaporeon', 'Leftovers', 'Water Absorb', 'Play Rough'], ['Rotom-Wash', 'Sitrus Berry', 'Levitate', 'Psych Up'],
	['Annihilape', 'Choice Scarf', 'Defiant', 'Psych Up'], ['Mawile', 'Mawilite', 'Intimidate', 'Psych Up'], ['Weavile', 'Focus Sash', 'Pressure', 'Psych Up']];
for (const [sp, item, ab, mv] of learn) {
	if (!mv) continue;
	const set = `${sp} @ ${item}\nAbility: ${ab}\nLevel: 50\nEVs: 2 HP / 32 Atk / 32 Spe\nJolly Nature\n- ${mv}\n- Protect`;
	const team = [set].concat(filler).join('\n\n');
	const probs = v.validateTeam(require(path.join(DIST, 'sim')).Teams.import(team)) || [];
	const mine = probs.filter(p => p.includes(sp.split('-')[0]) && /learn/i.test(p));
	ok(!mine.length, `${sp} can learn ${mv}${mine.length ? ' — ' + mine.join('; ') : ''}`);
}

// helper: start a doubles battle with both leads chosen (partners only know Protect / Helping Hand)
const protector = 'Garchomp @ Life Orb\nAbility: Rough Skin\nLevel: 50\nEVs: 2 HP / 32 Atk / 32 Spe\nJolly Nature\n- Protect';
function battle(a, b) {
	const pad = s => s.concat(filler.slice(1, 1 + 4 - s.length));
	const bt = S.newBattle(S.pack(pad(a).join('\n\n')), S.pack(pad(b).join('\n\n')));
	S.advanceToDecision(bt, { p1: { order: '1234' }, p2: { order: '1234' } });
	return bt;
}
const slot = (p, id) => p.moveSlots.findIndex(m => m.id === id) + 1;
const turn = (bt, c1, c2) => { bt.choose('p1', c1); bt.choose('p2', c2); S.advanceToDecision(bt, {}); };
const exactDamage = (bt, att, def, moveId) => {
	bt.randomizer = (x) => x; // max roll, no randomness
	const m = bt.dex.getActiveMove(moveId); m.willCrit = false;
	return bt.actions.getDamage(att, def, m, true);
};

// 3) Flash Fire boost survives Mega Evolution (Houndoom: Flash Fire -> Mega Houndoom: Solar Power)
{
	const hd = 'Houndoom @ Houndoominite\nAbility: Flash Fire\nLevel: 50\nEVs: 2 HP / 32 SpA / 32 Spe\nTimid Nature\n- Flamethrower\n- Protect';
	const fire = 'Charizard @ Charcoal\nAbility: Blaze\nLevel: 50\nEVs: 2 HP / 32 SpA / 32 Spe\nTimid Nature\n- Flamethrower\n- Protect';
	const wall = 'Milotic @ Leftovers\nAbility: Competitive\nLevel: 50\nEVs: 32 HP / 2 Def / 32 SpD\nCalm Nature\n- Protect\n- Helping Hand';
	const bt = battle([hd, protector], [fire, wall]);
	const H = bt.sides[0].active[0], C = bt.sides[1].active[0], M = bt.sides[1].active[1];
	// turn 1: Charizard's Flamethrower into Houndoom is absorbed; everyone else Protects
	turn(bt, `move ${slot(H, 'protect')}, move 1`, `move ${slot(C, 'flamethrower')} 1, move ${slot(M, 'protect')}`);
	ok(!H.volatiles['flashfire'], 'sanity: a Protecting Houndoom does not absorb');
	turn(bt, `move ${slot(H, 'flamethrower')} 2, move 1`, `move ${slot(C, 'flamethrower')} 1, move ${slot(M, 'protect')}`);
	ok(!!H.volatiles['flashfire'], 'Flash Fire activates when Houndoom is hit by a Fire move');
	// turn 2: Mega Evolve (ability becomes Solar Power) and attack
	turn(bt, `move ${slot(H, 'flamethrower')} 2 mega, move 1`, `move ${slot(C, 'protect')}, move ${slot(M, 'helpinghand')}`);
	ok(H.species.name === 'Houndoom-Mega' && H.ability === 'solarpower', `Houndoom Mega Evolved (now ${H.species.name}, ${H.ability})`);
	ok(!!H.volatiles['flashfire'], 'the Fire boost is still active after Mega Evolution');
	const boosted = exactDamage(bt, H, M, 'flamethrower');
	const vol = H.volatiles['flashfire']; delete H.volatiles['flashfire'];
	const plain = exactDamage(bt, H, M, 'flamethrower'); H.volatiles['flashfire'] = vol;
	ok(Math.abs(boosted / plain - 1.5) < 0.05, `boost still applies to Mega Houndoom's Fire moves: ${boosted} vs ${plain} HP (x${(boosted / plain).toFixed(2)})`);
}

// 4) Stalwart ignores Substitute (Archaludon: Stalwart vs Sturdy control)
{
	const subber = 'Gholdengo @ Life Orb\nAbility: Good as Gold\nLevel: 50\nEVs: 32 HP / 32 Def / 2 SpD\nBold Nature\n- Substitute\n- Protect';
	const run = (ability) => {
		const ar = `Archaludon @ Leftovers\nAbility: ${ability}\nLevel: 50\nEVs: 32 HP / 32 SpA / 2 SpD\nModest Nature\n- Dragon Pulse\n- Protect`;
		const bt = battle([ar, protector], [subber, protector]);
		const A = bt.sides[0].active[0], G = bt.sides[1].active[0];
		turn(bt, `move ${slot(A, 'protect')}, move 1`, `move ${slot(G, 'substitute')}, move 1`);
		const subUp = !!G.volatiles['substitute'], hp = G.hp;
		turn(bt, `move ${slot(A, 'dragonpulse')} 1, move 1`, `move ${slot(G, 'substitute')}, move 1`);
		return { subUp, hpLost: hp - G.hp, subStill: !!G.volatiles['substitute'] };
	};
	const st = run('Stalwart'), ctl = run('Sturdy');
	ok(st.subUp && ctl.subUp, 'Gholdengo gets a Substitute up');
	ok(st.hpLost > 0 && st.subStill, `Stalwart Dragon Pulse hits Gholdengo through its Substitute (lost ${st.hpLost} HP, Substitute untouched)`);
	ok(ctl.hpLost === 0, `control: Sturdy Archaludon's Dragon Pulse is absorbed by the Substitute (lost ${ctl.hpLost} HP)`);
}

console.log(fails ? `\n${fails} check(s) FAILED` : '\nAll balance-patch checks passed.');
process.exit(fails ? 1 : 0);
