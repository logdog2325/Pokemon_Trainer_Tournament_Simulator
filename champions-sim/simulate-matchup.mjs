/*
 * Monte Carlo matchup harness  (Step 3 foundation)
 * ---------------------------------------------------------------------------
 * Runs N real offline Champions Reg M-B doubles battles between two teams and
 * reports the win rate. This is the skeleton the bring-4 / mega-choice / lead
 * optimizer plugs into: for each candidate (bring-4, which-to-mega, lead pair)
 * you run N games and keep the highest win rate.
 *
 *   node champions-sim/simulate-matchup.mjs [N]
 *
 * NOTE: currently uses the built-in RandomPlayerAI for both sides, so the win
 * rate mainly reflects raw team power, not skilled play. Swapping in the
 * game-plan bot (sets Tailwind/Trick Room, sane targeting) is the next task and
 * is what makes these numbers a trustworthy matchup read.
 */
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const DIST = path.join(__dirname, '..', 'pokemon-showdown', 'dist');
const { BattleStream, getPlayerStreams, Teams } = require(path.join(DIST, 'sim'));
const { RandomPlayerAI } = require(path.join(DIST, 'sim', 'tools', 'random-player-ai'));

const FORMAT = 'gen9championsvgc2026regmb';

// --- teams (Champions point pastes; base ability for megas becomes mega ability) ---
const TEAM_A_NAME = 'Quivern TR';
const TEAM_A = `
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

const TEAM_B_NAME = 'Big 6';
const TEAM_B = `
Charizard @ Charizardite Y
Ability: Blaze
Level: 50
EVs: 4 HP / 32 SpA / 30 Spe
Timid Nature
- Heat Wave
- Air Slash
- Solar Beam
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

Kingambit @ Life Orb
Ability: Defiant
Level: 50
EVs: 24 HP / 32 Atk / 10 Spe
Adamant Nature
- Kowtow Cleave
- Sucker Punch
- Iron Head
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

Incineroar @ Sitrus Berry
Ability: Intimidate
Level: 50
EVs: 32 HP / 2 Def / 32 SpD
Careful Nature
- Fake Out
- Flare Blitz
- Parting Shot
- Knock Off

Basculegion @ Focus Sash
Ability: Adaptability
Level: 50
EVs: 32 Atk / 2 Def / 32 Spe
Adamant Nature
- Wave Crash
- Last Respects
- Aqua Jet
- Protect
`;

function packOrThrow(paste, who) {
	const t = Teams.import(paste);
	if (!t) throw new Error(`${who}: could not parse team`);
	return Teams.pack(t);
}

// run a single battle, resolve with 'p1' | 'p2' | 'tie'
function runOne(packedA, packedB) {
	return new Promise(resolve => {
		const streams = getPlayerStreams(new BattleStream());
		new RandomPlayerAI(streams.p1).start();
		new RandomPlayerAI(streams.p2).start();
		let done = false;
		(async () => {
			for await (const chunk of streams.omniscient) {
				const w = chunk.match(/\|win\|([^\n]*)/);         // |win|A
				const tie = /\|tie\b/.test(chunk);                // precise: NOT |tier|
				if (!done && (w || tie)) {
					done = true;
					resolve(w ? (w[1].trim() === 'A' ? 'p1' : 'p2') : 'tie');
				}
			}
		})();
		streams.omniscient.write(`>start ${JSON.stringify({ formatid: FORMAT })}
>player p1 ${JSON.stringify({ name: 'A', team: packedA })}
>player p2 ${JSON.stringify({ name: 'B', team: packedB })}`);
	});
}

async function main() {
	const N = parseInt(process.argv[2] || '50', 10);
	const A = packOrThrow(TEAM_A, TEAM_A_NAME);
	const B = packOrThrow(TEAM_B, TEAM_B_NAME);
	console.log(`\nSimulating ${N} battles:  ${TEAM_A_NAME}  vs  ${TEAM_B_NAME}  (${FORMAT})\n`);

	let aw = 0, bw = 0, ties = 0;
	const t0 = Date.now();
	for (let i = 0; i < N; i++) {
		const r = await runOne(A, B);
		if (r === 'p1') aw++; else if (r === 'p2') bw++; else ties++;
		if ((i + 1) % 10 === 0) process.stdout.write(`  ${i + 1}/${N}  (${TEAM_A_NAME} ${aw} - ${bw} ${TEAM_B_NAME}${ties ? `, ${ties} tie` : ''})\r`);
	}
	const secs = ((Date.now() - t0) / 1000).toFixed(1);
	const wr = (100 * aw / (aw + bw || 1)).toFixed(1);
	console.log(`\n\nResult over ${N} games (${secs}s):`);
	console.log(`  ${TEAM_A_NAME}:  ${aw} wins  (${wr}%)`);
	console.log(`  ${TEAM_B_NAME}:  ${bw} wins`);
	if (ties) console.log(`  ties: ${ties}`);
	console.log(`\n(RandomPlayerAI both sides — reflects raw team power, not skilled play. Game-plan bot is next.)`);
}
main().catch(e => console.log('ERR:', e.message));
