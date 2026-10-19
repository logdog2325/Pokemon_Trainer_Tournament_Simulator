/*
 * Build the human-prediction prior from downloaded Showdown replays.
 * ---------------------------------------------------------------------------
 * RotomDotExe's trick: a model of what HUMANS click, so the search plays the best
 * response to real players rather than to a perfect opponent. Ours is a counting model:
 *   P(move | species, turn-1 or later)   — with back-off to P(move | species)
 *   P(protect again | protected last turn)
 *   P(both foes target the same Pokemon)  — how often humans double into one target
 *   P(switch) per species                 — voluntary switches (not U-turn / Parting Shot / faint replacements)
 * Only chosen actions count: called moves ([from] ...), locked moves and forced
 * replacements are skipped.
 *
 *   node champions-sim/human/build-prior.mjs <replayDir> [out=champions-sim/human/move-prior.json]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [dir, outArg] = process.argv.slice(2);
if (!dir) { console.error('usage: build-prior.mjs <replayDir> [out.json]'); process.exit(2); }
const OUT = outArg || path.join(__dirname, 'move-prior.json');

const base = details => details.split(',')[0].replace(/-Mega(-[XYZ])?$/, '').replace(/-Mega$/, '');
const PROTECT = new Set(['Protect', 'Detect', "King's Shield", 'Spiky Shield', 'Baneful Bunker', 'Silk Trap', 'Burning Bulwark']);

const prior = { replays: 0, minRating: Infinity, species: {}, protectRepeat: [0, 0], doubleTarget: [0, 0] };
const bump = (sp, bucket, move) => {
	const s = prior.species[sp] || (prior.species[sp] = { n: 0, switch: 0, t1: {}, later: {} });
	if (move === '(switch)') { s.switch++; s.n++; return; }
	s[bucket][move] = (s[bucket][move] || 0) + 1;
	s.n++;
};

for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) {
	let rep; try { rep = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch { continue; }
	if (!rep.log) continue;
	prior.replays++;
	prior.minRating = Math.min(prior.minRating, rep.rating || 0);
	const slot = {};                       // 'p1a' -> species
	const lastProtect = {};                // 'p1a' -> turn number of last protect
	let turn = 0, afterUpkeep = false;
	let turnTargets = {};                  // side -> [target slots of single-target attacks]
	for (const line of rep.log.split('\n')) {
		const p = line.split('|');
		const tag = p[1];
		if (tag === 'turn') {
			// close out the previous turn's double-target statistic
			for (const t of Object.values(turnTargets)) if (t.length === 2) { prior.doubleTarget[1]++; if (t[0] === t[1]) prior.doubleTarget[0]++; }
			turnTargets = {};
			turn = +p[2]; afterUpkeep = false; continue;
		}
		if (tag === 'upkeep') { afterUpkeep = true; continue; }
		if (tag === 'switch' || tag === 'drag' || tag === 'replace') {
			const who = p[2].slice(0, 3);
			const voluntary = tag === 'switch' && turn > 0 && !afterUpkeep && !line.includes('[from]');
			if (voluntary && slot[who]) bump(slot[who], turn === 1 ? 't1' : 'later', '(switch)');
			slot[who] = base(p[3]);
			continue;
		}
		if (tag === 'detailschange') { slot[p[2].slice(0, 3)] = base(p[3]); continue; }
		if (tag === 'move' && turn > 0) {
			if (line.includes('[from]')) continue;            // called / locked / bounced — not a choice
			const who = p[2].slice(0, 3), move = p[3];
			const sp = slot[who]; if (!sp) continue;
			bump(sp, turn === 1 ? 't1' : 'later', move);
			if (PROTECT.has(move)) {
				if (lastProtect[who] === turn - 1) prior.protectRepeat[0]++;
				lastProtect[who] = turn;
			}
			if (lastProtect[who] === turn - 1 && !PROTECT.has(move)) prior.protectRepeat[1]++;
			if (PROTECT.has(move) && lastProtect[who] === turn && prior._x === undefined) { /* counted above */ }
			// single-target attacks into the other side: did both of a side's mons pick the same target?
			const tgt = p[4] || '';
			const foe = who[1] === '1' ? 'p2' : 'p1';
			if (tgt.startsWith(foe) && !line.includes('[spread]')) (turnTargets[who.slice(0, 2)] || (turnTargets[who.slice(0, 2)] = [])).push(tgt.slice(0, 3));
		}
	}
}
// protectRepeat: [times protected two turns running, times had the chance (protected last turn)]
prior.protectRepeat[1] += prior.protectRepeat[0];
const out = {
	note: 'Counts of human choices on the Showdown Reg M-C ladder. Built by champions-sim/human/build-prior.mjs.',
	replays: prior.replays, minRating: prior.minRating, builtAt: new Date().toISOString().slice(0, 10),
	protectRepeatRate: prior.protectRepeat[1] ? prior.protectRepeat[0] / prior.protectRepeat[1] : 0.1,
	doubleTargetRate: prior.doubleTarget[1] ? prior.doubleTarget[0] / prior.doubleTarget[1] : 0.5,
	species: prior.species,
};
fs.writeFileSync(OUT, JSON.stringify(out));
const top = Object.entries(out.species).sort((a, b) => b[1].n - a[1].n).slice(0, 8)
	.map(([s, v]) => `${s} (${v.n})`).join(', ');
console.log(`prior from ${out.replays} replays (rating >= ${out.minRating}): ${Object.keys(out.species).length} species`);
console.log(`protect twice in a row: ${(100 * out.protectRepeatRate).toFixed(1)}%   both attackers into one target: ${(100 * out.doubleTargetRate).toFixed(1)}%`);
console.log(`most-seen: ${top}`);
