/*
 * Bot calibration harness — measures GameplanBot vs RandomPlayerAI on several
 * team types. A well-playing bot should beat random clearly (~70%+) on each.
 * Use this to tune gameplan-bot.js:  node champions-sim/calibrate.mjs [N]
 */
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const DIST = path.join(__dirname, '..', 'pokemon-showdown', 'dist');
const { BattleStream, getPlayerStreams, Teams } = require(path.join(DIST, 'sim'));
const { RandomPlayerAI } = require(path.join(DIST, 'sim', 'tools', 'random-player-ai'));
const { GameplanBot } = require(path.join(__dirname, 'gameplan-bot.js'));
const FORMAT = 'gen9championsvgc2026regmb';

// straightforward offense (no TR): good play = set Tailwind, click KOs, focus fire
const OFFENSE = `
Charizard @ Charizardite Y
Ability: Blaze
Level: 50
EVs: 4 HP / 32 SpA / 30 Spe
Timid Nature
- Heat Wave
- Air Slash
- Solar Beam
- Protect

Garchomp @ Life Orb
Ability: Rough Skin
Level: 50
EVs: 4 HP / 32 Atk / 30 Spe
Jolly Nature
- Earthquake
- Rock Slide
- Dragon Claw
- Protect

Whimsicott @ Focus Sash
Ability: Prankster
Level: 50
EVs: 32 SpA / 32 Spe / 2 HP
Timid Nature
- Tailwind
- Moonblast
- Encore
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Level: 50
EVs: 32 HP / 2 Def / 32 SpD
Careful Nature
- Fake Out
- Flare Blitz
- Knock Off
- Parting Shot

Kingambit @ Life Orb
Ability: Defiant
Level: 50
EVs: 24 HP / 32 Atk / 10 Spe
Adamant Nature
- Kowtow Cleave
- Sucker Punch
- Iron Head
- Protect

Sylveon @ Fairy Feather
Ability: Pixilate
Level: 50
EVs: 32 HP / 32 SpA / 2 Def
Modest Nature
- Hyper Voice
- Moonblast
- Quick Attack
- Protect
`;

const TR = `
Gardevoir @ Gardevoirite
Ability: Synchronize
Level: 50
EVs: 32 HP / 32 SpA / 2 SpD
Quiet Nature
- Trick Room
- Hyper Voice
- Psychic
- Protect

Mudsdale @ Life Orb
Ability: Inner Focus
Level: 50
EVs: 32 HP / 32 Atk / 2 SpD
Brave Nature
- High Horsepower
- Rock Slide
- Heavy Slam
- Protect

Torkoal @ Charcoal
Ability: Drought
Level: 50
EVs: 32 HP / 32 SpA / 2 SpD
Quiet Nature
- Eruption
- Flamethrower
- Earth Power
- Protect

Farigiraf @ Sitrus Berry
Ability: Armor Tail
Level: 50
EVs: 32 HP / 32 SpD / 2 Def
Relaxed Nature
- Trick Room
- Helping Hand
- Psychic
- Protect

Vivillon @ Focus Sash
Ability: Compound Eyes
Level: 50
EVs: 32 SpA / 32 Spe / 2 HP
Timid Nature
- Sleep Powder
- Rage Powder
- Hurricane
- Protect

Sceptile @ Sceptilite
Ability: Overgrow
Level: 50
EVs: 32 SpA / 32 Spe / 2 HP
Timid Nature
- Leaf Storm
- Dragon Pulse
- Energy Ball
- Protect
`;

function runOne(packed, smartIsP1) {
	return new Promise(resolve => {
		const bs = new BattleStream();
		const s = getPlayerStreams(bs);
		const smartStream = smartIsP1 ? s.p1 : s.p2;
		const randStream = smartIsP1 ? s.p2 : s.p1;
		new GameplanBot(smartStream, { battle: bs, side: smartIsP1 ? 'p1' : 'p2' }).start();
		new RandomPlayerAI(randStream).start();
		let done = false;
		(async () => { for await (const c of s.omniscient) {
			const w = c.match(/\|win\|([^\n]*)/); const tie = /\|tie\b/.test(c);
			if (!done && (w || tie)) { done = true; resolve(w ? w[1].trim() : 'tie'); }
		} })();
		s.omniscient.write(`>start ${JSON.stringify({ formatid: FORMAT })}
>player p1 ${JSON.stringify({ name: 'A', team: packed })}
>player p2 ${JSON.stringify({ name: 'B', team: packed })}`);
	});
}

async function measure(name, paste, N) {
	const packed = Teams.pack(Teams.import(paste));
	let smartWins = 0, games = 0;
	for (let i = 0; i < N; i++) {
		const smartIsP1 = i % 2 === 0;            // alternate sides to cancel any P1 bias
		const winner = await runOne(packed, smartIsP1);
		if (winner === 'tie') continue;
		games++;
		const smartName = smartIsP1 ? 'A' : 'B';
		if (winner === smartName) smartWins++;
	}
	const wr = (100 * smartWins / (games || 1)).toFixed(1);
	console.log(`  ${name.padEnd(16)} smart ${smartWins}/${games}  = ${wr}%  vs random`);
	return +wr;
}

async function main() {
	const N = parseInt(process.argv[2] || '60', 10);
	console.log(`\nCalibration: GameplanBot vs RandomPlayerAI (${N} games each, sides alternated)\n`);
	const t0 = Date.now();
	const off = await measure('Offense', OFFENSE, N);
	const tr = await measure('Trick Room', TR, N);
	console.log(`\n  avg: ${((off + tr) / 2).toFixed(1)}%   [${((Date.now() - t0) / 1000).toFixed(1)}s]   target: 70%+`);
}
main().catch(e => console.log('ERR:', e.message, e.stack));
