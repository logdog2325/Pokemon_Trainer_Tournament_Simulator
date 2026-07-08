/*
 * Human-vs-bot sparring  (Step 4)
 * ---------------------------------------------------------------------------
 * Play a real offline Champions Reg M-B doubles battle from the terminal
 * against the calibrated GameplanBot. You pick your bring-4 + leads and every
 * move by NUMBER (no need to memorize Showdown's choice syntax); the bot pilots
 * the opposing meta team. Great for rehearsing a game plan (getting Trick Room
 * up, playing around Tailwind, etc.) with no internet.
 *
 *   node champions-sim/spar.mjs [opponentIndex]
 *      opponentIndex: which META archetype to face (default: random-ish first)
 *      list them with:  node champions-sim/spar.mjs list
 */
import path from 'path';
import readline from 'readline';
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

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(res => rl.question(q, a => res(a.trim())));
function pack(paste) { return Teams.pack(Teams.import(autospread(paste))); }

// ---- pretty-print the public battle protocol for the human ----
function render(chunk) {
	for (const line of chunk.split('\n')) {
		const p = line.split('|');
		const tag = p[1];
		switch (tag) {
			case 'turn': console.log(`\n──────── Turn ${p[2]} ────────`); break;
			case 'move': console.log(`  ${p[2]} used ${p[3]}${p[4] && !p[4].startsWith('[') ? ` → ${p[4]}` : ''}`); break;
			case 'switch': case 'drag': console.log(`  ↪ ${p[2]} (${p[3].split(',')[0]})  ${p[4] || ''}`); break;
			case '-damage': console.log(`     ${p[2]} → ${p[3]}${p[4] ? ` ${p[4]}` : ''}`); break;
			case '-heal': console.log(`     ${p[2]} healed → ${p[3]}`); break;
			case 'faint': console.log(`  ✖ ${p[2]} fainted`); break;
			case '-mega': console.log(`  ★ ${p[2]} Mega Evolved (${p[4]})`); break;
			case '-status': console.log(`     ${p[2]} was ${p[3]}'d`); break;
			case '-fieldstart': console.log(`  » ${p[2].replace('move: ', '')} is up`); break;
			case '-fieldend': console.log(`  » ${p[2].replace('move: ', '')} ended`); break;
			case '-sidestart': console.log(`  » ${p[3].replace('move: ', '')} (${p[2]})`); break;
			case '-weather': if (p[2] !== 'none' && !line.includes('[upkeep]')) console.log(`  » weather: ${p[2]}`); break;
			case '-supereffective': console.log(`       (super effective!)`); break;
			case '-crit': console.log(`       (critical hit!)`); break;
			case '-activate': if (/Protect|move:/.test(p[3] || '')) console.log(`     ${p[2]} — ${(p[3] || '').replace('move: ', '')}`); break;
			case 'win': console.log(`\n🏁 Winner: ${p[2]}\n`); break;
			default: break;
		}
	}
}

// which target syntax a move needs in doubles
const SINGLE = ['normal', 'any', 'adjacentFoe'];
const NOTARGET = ['self', 'allAdjacent', 'allAdjacentFoes', 'all', 'allySide', 'foeSide', 'randomNormal', 'scripted'];

async function chooseTeamPreview(req) {
	const mons = req.side.pokemon;
	console.log('\n=== YOUR TEAM (bring 4, first two lead) ===');
	mons.forEach((m, i) => console.log(`  ${i + 1}. ${m.details.split(',')[0].padEnd(14)} ${(m.moves || []).join(', ')}`));
	let ans = await ask('Enter 4 slots, leads first (e.g. 1543), or Enter for a smart default: ');
	if (!/^[1-6]{4}$/.test(ans) || new Set(ans).size !== 4) {
		// smart default via the bot's own Team-Preview heuristic
		const tmp = new GameplanBot({ write() {} }, {});
		return null; // signal: let caller fall back
	}
	return `team ${ans}`;
}

async function chooseActive(req, battle, sideId) {
	const side = battle.sides.find(s => s.id === sideId);
	const foe = battle.sides.find(s => s.id !== sideId);
	const foeActive = foe.active.map((f, i) => ({ f, slot: i + 1 })).filter(x => x.f && !x.f.fainted);
	const choices = [];
	let megaUsed = false;
	for (let i = 0; i < req.active.length; i++) {
		const pm = req.side.pokemon[i];
		if (pm.condition.endsWith(' fnt') || pm.commanding) { choices.push('pass'); continue; }
		const act = req.active[i];
		const me = side.active[i];
		console.log(`\n— Choose for ${pm.details.split(',')[0]} (${pm.condition}) —`);
		if (foeActive.length) console.log(`   Foes: ${foeActive.map(x => `[${x.slot}] ${x.f.species.name} ${Math.round(100 * x.f.hp / x.f.maxhp)}%`).join('   ')}`);
		const legal = act.moves.map((mv, j) => ({ ...mv, slot: j + 1 })).filter(mv => !mv.disabled);
		legal.forEach(mv => console.log(`   ${mv.slot}. ${mv.move}${mv.pp !== undefined ? ` (${mv.pp}/${mv.maxpp})` : ''}`));
		const canSwitch = req.side.pokemon.filter((p, k) => p && !p.active && !p.condition.endsWith(' fnt'));
		if (act.canMegaEvo && !megaUsed) console.log(`   (append  m  to Mega Evolve)`);
		if (canSwitch.length) console.log(`   s. switch`);
		let raw = await ask(`   pick move # (e.g. "1" or "1 2" to target foe 2, "1 m" to mega, "s" to switch): `);
		if (raw.toLowerCase().startsWith('s')) {
			const opts = req.side.pokemon.map((p, k) => ({ p, n: k + 1 })).filter(x => x.p && !x.p.active && !x.p.condition.endsWith(' fnt'));
			opts.forEach(o => console.log(`      ${o.n}. ${o.p.details.split(',')[0]}`));
			const sn = await ask('      switch to slot #: ');
			choices.push(`switch ${parseInt(sn, 10) || opts[0].n}`);
			continue;
		}
		const parts = raw.split(/\s+/).filter(Boolean);
		let mvNum = parseInt(parts[0], 10);
		let mv = legal.find(x => x.slot === mvNum) || legal[0];
		const wantMega = parts.includes('m') || parts.includes('mega');
		let targetTok = parts.find(t => /^-?[12]$/.test(t));
		let suffix = '';
		if (SINGLE.includes(mv.target)) {
			let tgt = targetTok ? parseInt(targetTok, 10) : (foeActive[0] ? foeActive[0].slot : 1);
			suffix = ` ${tgt}`;
		} else if (mv.target === 'adjacentAlly') suffix = ` -${(i ^ 1) + 1}`;
		else if (mv.target === 'adjacentAllyOrSelf') suffix = ` -${i + 1}`;
		let c = `move ${mv.slot}${suffix}`;
		if (wantMega && act.canMegaEvo && !megaUsed) { c += ' mega'; megaUsed = true; }
		choices.push(c);
	}
	return choices.join(', ');
}

async function chooseForceSwitch(req) {
	const choices = [];
	const chosen = [];
	for (let i = 0; i < req.forceSwitch.length; i++) {
		if (!req.forceSwitch[i]) { choices.push('pass'); continue; }
		const opts = req.side.pokemon.map((p, k) => ({ p, n: k + 1 })).filter(x => x.p && !x.p.active && !x.p.condition.endsWith(' fnt') && !chosen.includes(x.n));
		console.log('\n— Send in a Pokémon —');
		opts.forEach(o => console.log(`   ${o.n}. ${o.p.details.split(',')[0]} (${o.p.condition})`));
		const sn = await ask('   switch to slot #: ');
		const n = opts.find(o => o.n === parseInt(sn, 10)) ? parseInt(sn, 10) : opts[0].n;
		chosen.push(n); choices.push(`switch ${n}`);
	}
	return choices.join(', ');
}

async function main() {
	const arg = process.argv[2];
	const names = Object.keys(META);
	if (arg === 'list') { names.forEach((n, i) => console.log(`  ${i}. ${n}`)); rl.close(); return; }
	const oppIdx = Math.max(0, Math.min(names.length - 1, parseInt(arg || '0', 10) || 0));
	const oppName = names[oppIdx];
	console.log(`\nSparring: YOUR team  vs  ${oppName}  (bot)\nReg M-B doubles, Open Team Sheets. You are p1.\n`);

	const myPacked = pack(MY_TEAM), foePacked = pack(META[oppName]);
	const bs = new BattleStream();
	const streams = getPlayerStreams(bs);
	// bot on p2
	new GameplanBot(streams.p2, { battle: bs, side: 'p2' }).start();
	// a fallback bot to compute a smart default Team Preview / choice if the human just hits Enter
	const helper = new GameplanBot({ write() {} }, { battle: bs, side: 'p1' });

	const send = c => streams.p1.write(c);

	(async () => {
		for await (const chunk of streams.p1) {
			// find a request line if present
			const reqLine = chunk.split('\n').find(l => l.startsWith('|request|'));
			render(chunk);
			if (!reqLine) continue;
			const req = JSON.parse(reqLine.slice('|request|'.length));
			if (req.wait) continue;
			let choice;
			if (req.teamPreview) {
				choice = await chooseTeamPreview(req);
				if (!choice) choice = helper.chooseTeamPreview(req.side.pokemon);   // smart default
			} else if (req.forceSwitch) {
				choice = await chooseForceSwitch(req);
			} else if (req.active) {
				choice = await chooseActive(req, bs.battle, 'p1');
			} else continue;
			send(choice);
		}
		rl.close();
	})();

	streams.omniscient.write(`>start ${JSON.stringify({ formatid: FORMAT })}
>player p1 ${JSON.stringify({ name: 'You', team: myPacked })}
>player p2 ${JSON.stringify({ name: 'Bot', team: foePacked })}`);
}
main().catch(e => { console.log('ERR:', e.message, e.stack); rl.close(); });
