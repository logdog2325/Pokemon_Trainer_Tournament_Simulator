#!/usr/bin/env node
/*
 * Pokémon Champions battle balance adjustments — maintenance of 2026-12-02.
 * Source: https://news.pokemon-home.com/en/page/877.html ("applied to battles in all regulations")
 * ---------------------------------------------------------------------------
 * Patches the Champions mod data in the pokemon-showdown submodule (TypeScript sources), so every
 * consumer of the built engine — sims, search, validator, server, browser bundle — gets the change.
 * Idempotent: every insertion is tagged with PATCH_TAG and skipped if already present.
 *
 *   node champions-sim/patches/balance-2026-12-02.mjs      (then rebuild: cd pokemon-showdown && node build)
 *
 * setup-champions-engine.sh runs this automatically after overlaying the official data.
 *
 * Changes:
 *   Moves     Rock Slide 90% -> 95% acc, flinch 30% -> 20%
 *             Screech 85 -> 100, Steel Wing 90 -> 100, Metal Sound 85 -> 100, Frost Breath 90 -> 100 acc
 *   Learnsets Psych Up: Alakazam, Starmie, Mr. Mime, Mawile, Altaria, Castform, Absol, Roserade, Weavile,
 *               all Rotom forms, Liepard, Musharna, Audino, Cofagrigus, Slurpuff, Drampa, Annihilape
 *             Slack Off: Emboar · Roost: Beedrill, Hydreigon · Tailwind: Emolga · Wonder Room: Umbreon
 *             Play Rough: Vaporeon, Jolteon, Flareon, Espeon, Umbreon, Leafeon, Glaceon
 *   Abilities Flash Fire — the Fire boost it grants persists after Mega Evolution
 *             Stalwart   — its moves also ignore the target's Substitute
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MOD = process.env.CHAMPIONS_MOD_DIR ||
	path.resolve(__dirname, '..', '..', 'pokemon-showdown', 'data', 'mods', 'champions');
const PATCH_TAG = 'balance-2026-12-02';

const read = f => fs.readFileSync(path.join(MOD, f), 'utf8');
const write = (f, s) => fs.writeFileSync(path.join(MOD, f), s);
const hasKey = (src, key) => new RegExp(`^\\t${key}: \\{`, 'm').test(src);
let changed = 0;

// Insert whole table entries right after the table's opening line.
function addEntries(file, header, entries) {
	let src = read(file);
	if (src.includes(`[${PATCH_TAG}]`)) return console.log(`  ${file}: already patched`);
	for (const key of Object.keys(entries)) {
		if (hasKey(src, key)) throw new Error(`${file} already has an entry for "${key}" — merge the patch by hand`);
	}
	const at = src.indexOf(header);
	if (at < 0) throw new Error(`${file}: table header not found`);
	const eol = src.indexOf('\n', at) + 1;
	const block = `\t// [${PATCH_TAG}] ${'https://news.pokemon-home.com/en/page/877.html'}\n` +
		Object.values(entries).join('') + `\t// [/${PATCH_TAG}]\n`;
	write(file, src.slice(0, eol) + block + src.slice(eol));
	changed++; console.log(`  ${file}: added ${Object.keys(entries).join(', ')}`);
}

// ---------------------------------------------------------------- moves
addEntries('moves.ts', 'export const Moves', {
	rockslide: `\trockslide: {\n\t\tinherit: true,\n\t\taccuracy: 95,\n\t\tsecondary: {\n\t\t\tchance: 20,\n\t\t\tvolatileStatus: 'flinch',\n\t\t},\n\t},\n`,
	screech: `\tscreech: {\n\t\tinherit: true,\n\t\taccuracy: 100,\n\t},\n`,
	steelwing: `\tsteelwing: {\n\t\tinherit: true,\n\t\taccuracy: 100,\n\t},\n`,
	metalsound: `\tmetalsound: {\n\t\tinherit: true,\n\t\taccuracy: 100,\n\t},\n`,
	frostbreath: `\tfrostbreath: {\n\t\tinherit: true,\n\t\taccuracy: 100,\n\t},\n`,
});

// ---------------------------------------------------------------- abilities
addEntries('abilities.ts', 'export const Abilities', {
	flashfire: `\tflashfire: {
		inherit: true,
		onEnd(pokemon) {
			// Champions: the Fire boost survives Mega Evolution (the species is already the Mega
			// forme when the old ability ends inside formeChange). Any other way of losing the
			// ability still ends the boost.
			const ff = pokemon.volatiles['flashfire'];
			if (ff && pokemon.species.isMega) {
				ff.keptThroughMega = true;
				return;
			}
			pokemon.removeVolatile('flashfire');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && (attacker.hasAbility('flashfire') || this.effectState.keptThroughMega)) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && (attacker.hasAbility('flashfire') || this.effectState.keptThroughMega)) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			},
		},
	},\n`,
	stalwart: `\tstalwart: {
		inherit: true,
		onModifyMovePriority: 1,
		onModifyMove(move) {
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
			// Champions: also ignores the target's Substitute (copy flags — they are shared with the dex)
			move.flags = { ...move.flags, bypasssub: 1 };
		},
	},\n`,
});

// ---------------------------------------------------------------- learnsets
const LEARN = {
	psychup: ['alakazam', 'starmie', 'mrmime', 'mawile', 'altaria', 'castform', 'absol', 'roserade', 'weavile',
		'rotom', 'rotomheat', 'rotomwash', 'rotomfrost', 'rotomfan', 'rotommow',
		'liepard', 'musharna', 'audino', 'cofagrigus', 'slurpuff', 'drampa', 'annihilape'],
	slackoff: ['emboar'],
	roost: ['beedrill', 'hydreigon'],
	tailwind: ['emolga'],
	wonderroom: ['umbreon'],
	playrough: ['vaporeon', 'jolteon', 'flareon', 'espeon', 'umbreon', 'leafeon', 'glaceon'],
};
{
	let src = read('learnsets.ts'); let n = 0; const missing = [];
	for (const [move, species] of Object.entries(LEARN)) {
		for (const sp of species) {
			const head = new RegExp(`^\\t${sp}: \\{\\n\\t\\tlearnset: \\{\\n`, 'm');
			const m = head.exec(src);
			if (!m) { missing.push(sp); continue; }
			// find this species' learnset block and check the move isn't already there
			const start = m.index + m[0].length; const end = src.indexOf('\n\t\t},', start);
			if (new RegExp(`^\\t\\t\\t${move}: \\[`, 'm').test(src.slice(start, end))) continue;
			src = src.slice(0, start) + `\t\t\t${move}: ["9M"], // [${PATCH_TAG}]\n` + src.slice(start);
			n++;
		}
	}
	if (n) { write('learnsets.ts', src); changed++; }
	console.log(`  learnsets.ts: ${n ? `added ${n} move entries` : 'already patched'}` + (missing.length ? ` — species not in Champions: ${missing.join(', ')}` : ''));
}

// ---------------------------------------------------------------- Team Builder app movepools
// The app keeps its own Champions dex (movepools by display name); keep it in step with the engine.
{
	const APP = path.resolve(__dirname, '..', '..', 'champions-team-building');
	const NAMES = { psychup: 'Psych Up', slackoff: 'Slack Off', roost: 'Roost', tailwind: 'Tailwind', wonderroom: 'Wonder Room', playrough: 'Play Rough' };
	const DISPLAY = { mrmime: 'Mr. Mime', rotomheat: 'Rotom-Heat', rotomwash: 'Rotom-Wash', rotomfrost: 'Rotom-Frost', rotomfan: 'Rotom-Fan', rotommow: 'Rotom-Mow' };
	const disp = id => DISPLAY[id] || id[0].toUpperCase() + id.slice(1);
	const patchDex = (dex) => { let n = 0; const missing = [];
		for (const [move, species] of Object.entries(LEARN)) for (const sp of species) {
			const e = dex.find(x => x.name === disp(sp)); if (!e) { missing.push(disp(sp)); continue; }
			if (!e.moves.includes(NAMES[move])) { e.moves.push(NAMES[move]); e.moves.sort(); n++; }
		}
		return { n, missing }; };
	const jsFile = path.join(APP, 'app', 'dex-data.js'), jsonFile = path.join(APP, 'champions-dex.json');
	if (fs.existsSync(jsFile)) {
		const src = fs.readFileSync(jsFile, 'utf8'); const pre = 'window.DEX=';
		const dex = JSON.parse(src.slice(src.indexOf(pre) + pre.length).replace(/;?\s*$/, ''));
		const { n, missing } = patchDex(dex);
		if (n) fs.writeFileSync(jsFile, src.slice(0, src.indexOf(pre)) + pre + JSON.stringify(dex) + (src.trimEnd().endsWith(';') ? ';' : '') + '\n');
		console.log(`  app/dex-data.js: ${n ? `added ${n} moves` : 'already patched'}${missing.length ? ` — not in app dex: ${missing.join(', ')}` : ''}`);
	}
	if (fs.existsSync(jsonFile)) {
		const dex = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
		if (Array.isArray(dex)) { const { n } = patchDex(dex); if (n) fs.writeFileSync(jsonFile, JSON.stringify(dex, null, 0) + '\n'); console.log(`  champions-dex.json: ${n ? `added ${n} moves` : 'already patched'}`); }
	}
}

console.log(changed ? `Applied ${PATCH_TAG}. Rebuild the engine: (cd pokemon-showdown && node build)` : `${PATCH_TAG}: nothing to do.`);
