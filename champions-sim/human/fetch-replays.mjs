/*
 * Download public Reg M-C ladder replays from replay.pokemonshowdown.com for the
 * human-prediction model. Polite: one request per second, resumable (skips files
 * already on disk). Only public replays are listed by the search API.
 *
 *   node champions-sim/human/fetch-replays.mjs <outDir> [maxReplays=1500] [minRating=1300]
 */
import fs from 'fs';
import path from 'path';

const [outDir, maxArg = '1500', minArg = '1300'] = process.argv.slice(2);
if (!outDir) { console.error('usage: fetch-replays.mjs <outDir> [max] [minRating]'); process.exit(2); }
const MAX = +maxArg, MIN_RATING = +minArg;
const FORMAT = 'gen9championsvgc2026regmc';
const BASE = 'https://replay.pokemonshowdown.com';
const sleep = ms => new Promise(r => setTimeout(r, ms));
fs.mkdirSync(outDir, { recursive: true });

async function get(url) {
	for (let a = 0, wait = 2000; a < 5; a++, wait *= 2) {
		const r = await fetch(url, { headers: { 'User-Agent': 'champions-team-building research (offline analysis)' } });
		if (r.ok) return r.json();
		if (r.status === 429 || r.status >= 500) { await sleep(wait); continue; }
		throw new Error(`${r.status} ${url}`);
	}
	throw new Error('gave up: ' + url);
}

let saved = fs.readdirSync(outDir).filter(f => f.endsWith('.json')).length;
let before = null, pages = 0;
while (saved < MAX && pages < 400) {
	const list = await get(`${BASE}/search.json?format=${FORMAT}${before ? `&before=${before}` : ''}`);
	pages++;
	await sleep(1000);
	if (!list.length) break;
	for (const r of list.slice(0, 50)) {
		if (saved >= MAX) break;
		if ((r.rating || 0) < MIN_RATING) continue;
		const file = path.join(outDir, `${r.id}.json`);
		if (fs.existsSync(file)) continue;
		try {
			const rep = await get(`${BASE}/${r.id}.json`);
			fs.writeFileSync(file, JSON.stringify({ id: rep.id, rating: rep.rating || r.rating, players: rep.players, log: rep.log }));
			saved++;
		} catch (e) { console.error('skip', r.id, e.message); }
		await sleep(1000);
	}
	before = list[list.length - 1].uploadtime;
	console.log(`page ${pages}: ${saved} replays saved (rating >= ${MIN_RATING})`);
}
console.log(`done: ${saved} replays in ${outDir}`);
