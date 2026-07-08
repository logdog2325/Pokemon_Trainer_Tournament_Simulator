/*
 * Champions statistical matchup / best-4 analyzer  (Step 2)
 * ---------------------------------------------------------------------------
 * Fast, OFFLINE estimate — built on the champions-team-building calc engine
 * (calcDamage / finalStats / speed / types). For your team vs a library of
 * meta teams it reports, per matchup: a favorability read, the best 4 to bring,
 * and the key threats. This is a HEURISTIC estimate from the damage/speed math,
 * not a played-out battle (that's the Step-3 engine sim).
 *
 *   node champions-sim/analyze.mjs
 *
 * Team format = the Champions point pastes we've been using (points in the
 * EVs field, 0-32 per stat). Edit MY_TEAM / META below to taste.
 */
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(__dirname, '..', 'champions-team-building', 'app');

// ---- load the calc engine ----
const ctx = { window: {} };
ctx.window.window = ctx.window;
vm.createContext(ctx);
for (const f of ['dex-data.js', 'moves-data.js', 'usage-data.js', 'results-data.js', 'app.js']) {
	vm.runInContext(fs.readFileSync(path.join(APP, f), 'utf8'), ctx, { filename: f });
}
const E = ctx.window.ENGINE;
const byName = E.byName;
const SK = { HP: 'hp', Atk: 'atk', Def: 'def', SpA: 'spa', SpD: 'spd', Spe: 'spe' };

// ---- point-aware paste parser (EVs field = 0-32 points, NOT 252-scale) ----
function parseTeam(paste) {
	return paste.trim().split(/\n\s*\n/).map(block => {
		const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
		let head = lines[0], item = '';
		const at = head.lastIndexOf(' @ ');
		if (at >= 0) { item = head.slice(at + 3).trim(); head = head.slice(0, at).trim(); }
		const e = byName[head] || byName[head.replace(/-Mega.*$/, '')];
		if (!e) return null;
		let formIndex = -1;
		if (e.megaStones && e.megaStones.includes(item)) formIndex = Math.max(0, e.megaStones.indexOf(item));
		const set = { ability: (e.abilities || [])[0] || '', item, nature: 'Hardy',
			points: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }, moves: [] };
		for (const ln of lines.slice(1)) {
			let m;
			if (/^Ability:/i.test(ln)) set.ability = ln.split(':')[1].trim();
			else if ((m = ln.match(/^(?:EVs|Stat Points):\s*(.+)$/i))) {
				m[1].split('/').forEach(p => {
					const mm = p.trim().match(/(\d+)\s*([A-Za-z]+)/);
					if (mm && SK[mm[2]] != null) set.points[SK[mm[2]]] = Math.max(0, Math.min(32, +mm[1]));
				});
			} else if ((m = ln.match(/^(\w+)\s+Nature$/i))) set.nature = m[1];
			else if (/^-\s*/.test(ln)) { const mv = ln.replace(/^-\s*/, '').split('/')[0].replace(/\s*\[[^\]]*\]/, '').trim(); if (mv && set.moves.length < 4) set.moves.push(mv); }
		}
		return { entry: e, formIndex, set };
	}).filter(Boolean);
}

const spe = m => E.finalStats(m).spe;
const name = m => E.effOf(m).name;

// best % a mon can deal to a defender across its moveset
function bestHit(att, def, field) {
	let best = 0;
	for (const mv of (att.set.moves || []).filter(Boolean)) {
		const r = E.calcDamage(att, mv, def, field || {});
		if (r && !r.immune && r.maxPct > best) best = r.maxPct;
	}
	return best;
}

// which speed modes my team can bring (I choose the best one per matchup)
const TR_SETTERS = m => (m.set.moves || []).includes('Trick Room');
const TW_SETTERS = m => (m.set.moves || []).includes('Tailwind');
function teamModes(team) {
	const modes = ['natural'];
	if (team.some(TR_SETTERS)) modes.push('tr');
	if (team.some(TW_SETTERS)) modes.push('tw');
	return modes;
}
// am I faster than the target, given my active mode?
function amFaster(mine, theirs, mode) {
	if (mode === 'tr') return spe(mine) <= spe(theirs);   // Trick Room inverts order
	if (mode === 'tw') return spe(mine) * 2 >= spe(theirs); // Tailwind doubles my speed
	return spe(mine) >= spe(theirs);
}

// classify my mon vs one opposing mon under a given mode
function duel(mine, theirs, mode = 'natural') {
	const myHit = bestHit(mine, theirs);
	const theirHit = bestHit(theirs, mine);
	const faster = amFaster(mine, theirs, mode);
	let score = 0;             // + good for me
	if (myHit >= 100) score += faster ? 3 : 1.5;      // I OHKO (huge if I outspeed)
	else if (myHit >= 50) score += 0.75;              // I 2HKO
	if (theirHit >= 100) score -= faster ? 1 : 2.5;   // they OHKO me (worse if they outspeed)
	else if (theirHit >= 50) score -= 0.5;
	return { score, myHit, theirHit, faster };
}

// score one of my mons vs the whole opposing team under a mode
function vsTeam(mine, foes, mode = 'natural') {
	let s = 0, answers = 0;
	for (const f of foes) { const d = duel(mine, f, mode); s += d.score; if (d.myHit >= 100 && d.faster) answers++; }
	return { s, answers };
}

// pick best 4 of my 6 vs their 6: coverage of their team + at least one speed-control/support
const SPEEDCTRL = ['Tailwind', 'Trick Room', 'Icy Wind', 'Electroweb', 'Thunder Wave'];
const SUPPORT = ['Fake Out', 'Rage Powder', 'Follow Me', 'Helping Hand', 'Will-O-Wisp', 'Parting Shot', 'Encore', 'Taunt', 'Protect'];
function hasAny(m, list) { return (m.set.moves || []).some(mv => list.includes(mv)); }

function comb4(arr) {
	const out = [];
	for (let a = 0; a < arr.length; a++) for (let b = a + 1; b < arr.length; b++)
		for (let c = b + 1; c < arr.length; c++) for (let d = c + 1; d < arr.length; d++)
			out.push([arr[a], arr[b], arr[c], arr[d]]);
	return out;
}

function bestBring(mine6, foes6, mode) {
	let best = null;
	for (const four of comb4(mine6)) {
		// coverage: each foe answered if some of my 4 OHKOs+outspeeds OR 2HKOs it
		let covered = 0;
		for (const f of foes6) {
			const ok = four.some(m => { const d = duel(m, f, mode); return (d.myHit >= 100 && d.faster) || d.myHit >= 60; });
			if (ok) covered++;
		}
		const offense = four.reduce((a, m) => a + vsTeam(m, foes6, mode).s, 0);
		const speedctrl = four.some(m => hasAny(m, mode === 'tr' ? ['Trick Room'] : SPEEDCTRL)) ? 1 : 0;
		const support = four.filter(m => hasAny(m, SUPPORT)).length;
		const score = covered * 3 + offense + speedctrl * 2 + Math.min(support, 3) * 0.5;
		if (!best || score > best.score) best = { four, score, covered, offense };
	}
	return best;
}

// do I have a mon that OHKOs this foe AND moves first (under my mode)? -> I remove it before it acts
function neutralizes(mine6, foe, mode) {
	return mine6.some(m => { const d = duel(m, foe, mode); return d.myHit >= 100 && d.faster; });
}
// favorability under one mode
function favUnder(mine6, foes6, mode) {
	const myTop = mine6.map(m => vsTeam(m, foes6, mode).s).sort((a, b) => b - a).slice(0, 4).reduce((a, b) => a + b, 0);
	// opponent plays natural; discount foes I reliably KO first (they never get their hit off)
	const theirTop = foes6.map(f => vsTeam(f, mine6, 'natural').s * (neutralizes(mine6, f, mode) ? 0.35 : 1))
		.sort((a, b) => b - a).slice(0, 4).reduce((a, b) => a + b, 0);
	return myTop - theirTop;
}

// favorability: I pick my BEST mode for this matchup (models the dual-mode bring)
function favorability(mine6, foes6) {
	let best = { net: -1e9, mode: 'natural' };
	for (const mode of teamModes(mine6)) {
		const net = favUnder(mine6, foes6, mode);
		if (net > best.net) best = { net, mode };
	}
	const winPct = Math.round(100 / (1 + Math.exp(-best.net / 8)));   // logistic squash
	const label = winPct >= 60 ? 'Favorable' : winPct >= 45 ? 'Even' : winPct >= 33 ? 'Unfavorable' : 'Hard';
	return { net: +best.net.toFixed(1), winPct, label, mode: best.mode };
}

// ------------------------------------------------------------------ teams
const MY_TEAM = `
Gardevoir @ Gardevoirite
Ability: Pixilate
EVs: 32 HP / 32 SpA / 2 SpD
Quiet Nature
- Trick Room
- Hyper Voice
- Psychic
- Protect

Mudsdale @ Life Orb
Ability: Inner Focus
EVs: 32 HP / 32 Atk / 2 SpD
Brave Nature
- High Horsepower
- Rock Slide
- Heavy Slam
- Earthquake

Torkoal @ Charcoal
Ability: Drought
EVs: 32 HP / 32 SpA / 2 SpD
Quiet Nature
- Eruption
- Flamethrower
- Earth Power
- Protect

Farigiraf @ Sitrus Berry
Ability: Armor Tail
EVs: 32 HP / 32 SpD / 2 Def
Relaxed Nature
- Trick Room
- Helping Hand
- Psychic
- Protect

Vivillon @ Focus Sash
Ability: Compound Eyes
EVs: 32 SpA / 32 Spe / 2 HP
Timid Nature
- Sleep Powder
- Rage Powder
- Hurricane
- Protect

Sceptile @ Sceptilite
Ability: Overgrow
EVs: 32 SpA / 32 Spe / 2 HP
Timid Nature
- Leaf Storm
- Dragon Pulse
- Energy Ball
- Protect
`;

// meta opponent teams (The Champions Arena II top archetypes)
const META = {
	'Char-Y / Aerodactyl offense (#1)': `
Charizard @ Charizardite Y
Ability: Blaze
EVs: 4 HP / 32 SpA / 30 Spe
Timid Nature
- Heat Wave
- Air Slash
- Solar Beam
- Protect

Aerodactyl @ Aerodactylite
Ability: Rock Head
EVs: 4 HP / 32 Atk / 30 Spe
Jolly Nature
- Rock Slide
- Dual Wingbeat
- Tailwind
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
EVs: 32 HP / 2 Def / 32 SpD
Careful Nature
- Fake Out
- Flare Blitz
- Parting Shot
- Knock Off

Farigiraf @ Colbur Berry
Ability: Armor Tail
EVs: 32 HP / 32 SpD / 2 Def
Sassy Nature
- Trick Room
- Helping Hand
- Psychic
- Protect

Sylveon @ Fairy Feather
Ability: Pixilate
EVs: 32 HP / 32 SpA / 2 Def
Modest Nature
- Hyper Voice
- Moonblast
- Quick Attack
- Protect

Garchomp @ Life Orb
Ability: Rough Skin
EVs: 4 HP / 32 Atk / 30 Spe
Jolly Nature
- Earthquake
- Rock Slide
- Dragon Claw
- Protect
`,
	'Big 6 (Char-Y / Floette)': `
Charizard @ Charizardite Y
Ability: Blaze
EVs: 4 HP / 32 SpA / 30 Spe
Timid Nature
- Heat Wave
- Air Slash
- Solar Beam
- Protect

Floette @ Floettenite
Ability: Flower Veil
EVs: 32 HP / 32 SpA / 2 SpD
Modest Nature
- Moonblast
- Light of Ruin
- Dazzling Gleam
- Protect

Basculegion @ Focus Sash
Ability: Adaptability
EVs: 32 Atk / 2 Def / 32 Spe
Adamant Nature
- Wave Crash
- Last Respects
- Aqua Jet
- Protect

Kingambit @ Life Orb
Ability: Defiant
EVs: 24 HP / 32 Atk / 10 Spe
Adamant Nature
- Kowtow Cleave
- Sucker Punch
- Iron Head
- Protect

Whimsicott @ Focus Sash
Ability: Prankster
EVs: 32 SpA / 32 Spe / 2 HP
Timid Nature
- Tailwind
- Moonblast
- Encore
- Protect

Garchomp @ Life Orb
Ability: Rough Skin
EVs: 4 HP / 32 Atk / 30 Spe
Jolly Nature
- Earthquake
- Rock Slide
- Dragon Claw
- Protect
`,
	'Delphox / Blastoise control': `
Delphox @ Delphoxite
Ability: Blaze
EVs: 4 HP / 32 SpA / 30 Spe
Timid Nature
- Heat Wave
- Nasty Plot
- Psyshock
- Protect

Blastoise @ Blastoisinite
Ability: Rain Dish
EVs: 4 HP / 32 SpA / 30 Spe
Modest Nature
- Water Spout
- Dark Pulse
- Shell Smash
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
EVs: 32 HP / 2 Def / 32 SpD
Careful Nature
- Fake Out
- Flare Blitz
- Parting Shot
- Helping Hand

Kingambit @ Black Glasses
Ability: Defiant
EVs: 24 HP / 32 Atk / 10 Spe
Adamant Nature
- Kowtow Cleave
- Sucker Punch
- Swords Dance
- Protect

Sinistcha @ Kasib Berry
Ability: Hospitality
EVs: 32 HP / 32 Def / 2 SpD
Relaxed Nature
- Trick Room
- Rage Powder
- Matcha Gotcha
- Protect

Sneasler @ Focus Sash
Ability: Poison Touch
EVs: 4 HP / 32 Atk / 30 Spe
Jolly Nature
- Close Combat
- Poison Jab
- Fake Out
- Protect
`,
};

// ------------------------------------------------------------------ run
const mine = parseTeam(MY_TEAM);
console.log(`\nYour team: ${mine.map(name).join(', ')}\n`);
console.log('='.repeat(78));

const rows = [];
const MODE_LABEL = { natural: 'natural speed', tr: 'Trick Room', tw: 'Tailwind' };
for (const [label, paste] of Object.entries(META)) {
	const foes = parseTeam(paste);
	const fav = favorability(mine, foes);
	const bring = bestBring(mine, foes, fav.mode);
	rows.push({ label, fav, bring, foes });
}
rows.sort((a, b) => a.fav.winPct - b.fav.winPct); // worst matchups first

for (const r of rows) {
	console.log(`\n### ${r.label}`);
	console.log(`   Verdict: ${r.fav.label}  (~${r.fav.winPct}% est.)   Mode: ${MODE_LABEL[r.fav.mode]}`);
	console.log(`   Bring 4: ${r.bring.four.map(name).join(', ')}   [covers ${r.bring.covered}/6 of their team]`);
	// key threats: their mons that OHKO one of my brought 4 (they play natural speed)
	const threats = [];
	for (const f of r.foes) {
		const kills = r.bring.four.filter(m => { const d = duel(f, m, 'natural'); return d.myHit >= 100 && d.faster; }).length;
		if (kills) threats.push(`${name(f)} (KOs ${kills})`);
	}
	if (threats.length) console.log(`   Watch:   ${threats.join(', ')}`);
}
console.log('\n' + '='.repeat(78));
console.log('Heuristic estimate from damage+speed math. Step-3 engine sim will play these out for real win-rates.');
