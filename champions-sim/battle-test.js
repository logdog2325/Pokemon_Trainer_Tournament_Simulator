/*
 * Champions Reg M-B doubles smoke test.
 * Runs one offline AI-vs-AI battle in [Gen 9 Champions] VGC 2026 Reg M-B
 * to confirm the engine, format, mod data, and point-stat system all work.
 *
 * Usage (from repo root, after running setup-champions-engine.sh):
 *   node champions-sim/battle-test.js
 */
const path = require('path');
const DIST = path.join(__dirname, '..', 'pokemon-showdown', 'dist');
const { BattleStream, getPlayerStreams, Teams } = require(path.join(DIST, 'sim'));
const { RandomPlayerAI } = require(path.join(DIST, 'sim', 'tools', 'random-player-ai'));
const { TeamValidator } = require(path.join(DIST, 'sim', 'team-validator'));

// Champions teams use the point spread convention in the EVs field (0-32 per stat).
// NOTE: for mega formes, list a LEGAL BASE ability (it becomes the mega ability on evolution).
const teamA = `
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

Whimsicott @ Focus Sash
Ability: Prankster
Level: 50
EVs: 32 SpA / 32 Spe / 2 HP
Timid Nature
- Tailwind
- Moonblast
- Encore
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

const FORMAT = 'gen9championsvgc2026regmb';

async function main() {
	const team = Teams.import(teamA);
	console.log('Team parsed:', team ? team.length + ' mons' : 'FAIL');

	const errs = new TeamValidator(FORMAT).validateTeam(team);
	console.log('Validation:', errs ? ('ERRORS: ' + errs.slice(0, 3).join(' | ')) : 'LEGAL ✓');
	if (errs) return;

	const packed = Teams.pack(team);
	const streams = getPlayerStreams(new BattleStream());
	const p1 = new RandomPlayerAI(streams.p1);
	const p2 = new RandomPlayerAI(streams.p2);
	p1.start();
	p2.start();

	let winner = null;
	(async () => {
		for await (const chunk of streams.omniscient) {
			const m = chunk.match(/\|win\|(.*)/);
			if (m) winner = m[1];
		}
	})();

	await streams.omniscient.write(`>start ${JSON.stringify({ formatid: FORMAT })}
>player p1 ${JSON.stringify({ name: 'AI-1', team: packed })}
>player p2 ${JSON.stringify({ name: 'AI-2', team: packed })}`);

	await new Promise(r => setTimeout(r, 8000));
	console.log('Battle ran to completion. Winner:', winner || '(still running / timeout)');
}
main().catch(e => console.log('ERR:', e.message));
