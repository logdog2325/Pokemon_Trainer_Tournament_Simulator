/*
 * Champions Lab — unified local server (offline)
 * ---------------------------------------------------------------------------
 * One server that ties the whole offline toolkit together:
 *   /            → the Champions Team Builder PWA (champions-team-building/app)
 *   /arena/      → the graphical Champions Arena (play a real battle vs the AI)
 *   /api/*       → sim endpoints the app calls:
 *                    POST /api/matrix   {paste}                 → win-rate vs each meta archetype
 *                    POST /api/optimize {paste, opponent, n}    → best bring / lead / Mega
 *                    GET  /api/opponents                        → archetypes + sprite map
 *                    POST /api/new      {opponent, paste?}      → start an Arena battle
 *                    GET  /api/stream?id= (SSE) · POST /api/choose {id, choice}
 *
 * So from the app you can literally drop a pokepaste and see simulated matchups,
 * optimize your bring for a bad one, then play it out — all offline.
 *
 *   node champions-sim/server.mjs      # → http://localhost:8790
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const DIST = path.join(__dirname, '..', 'pokemon-showdown', 'dist');
const { BattleStream, getPlayerStreams, Teams, Dex } = require(path.join(DIST, 'sim'));
const { GameplanBot } = require(path.join(__dirname, 'gameplan-bot.js'));
import { MY_TEAM, META } from './teams.mjs';
import { autospread } from './autospread.mjs';
import { optimize } from './optimizer.mjs';

const FORMAT = 'gen9championsvgc2026regmb';
const PORT = process.env.PORT || 8790;
const cdex = Dex.mod('champions');
const APP_DIR = path.join(__dirname, '..', 'champions-team-building', 'app');

// the app exports point spreads as "Stat Points:"; the sim reads them from the EVs field.
function normalizePaste(paste) {
	return String(paste || '')
		.replace(/^[ \t]*Stat Points:[ \t]*none[ \t]*$/gim, '')
		.replace(/^[ \t]*Stat Points:/gim, 'EVs:');
}
function pack(paste) { return Teams.pack(Teams.import(autospread(normalizePaste(paste)))); }

// name -> sprite filename for every species + mega in the pool (for the Arena client)
const SPRITEMAP = (() => {
	const map = {}; const add = n => { const s = cdex.species.get(n); if (s.exists) map[s.name] = s.spriteid; };
	for (const paste of [MY_TEAM, ...Object.values(META)]) for (const block of paste.trim().split(/\n\s*\n/)) {
		const head = block.trim().split('\n')[0];
		const nm = head.split(' @ ')[0].trim(), item = (head.split(' @ ')[1] || '').trim();
		add(nm);
		const it = cdex.items.get(item); const mega = it.megaStone || it.forcedForme;
		if (mega) add(mega);
		if (/ite/i.test(item)) add(nm + (/y$/i.test(item) ? '-Mega-Y' : /x$/i.test(item) ? '-Mega-X' : '-Mega'));
	}
	return map;
})();

// ---------- sim: one battle to a result ----------
function runMatch(myPacked, foePacked, meIsP1) {
	return new Promise(resolve => {
		const bs = new BattleStream(); const s = getPlayerStreams(bs);
		const meStream = meIsP1 ? s.p1 : s.p2, foeStream = meIsP1 ? s.p2 : s.p1;
		new GameplanBot(meStream, { battle: bs, side: meIsP1 ? 'p1' : 'p2' }).start();
		new GameplanBot(foeStream, { battle: bs, side: meIsP1 ? 'p2' : 'p1' }).start();
		let done = false;
		(async () => { for await (const c of s.omniscient) {
			const w = c.match(/\|win\|([^\n]*)/); const tie = /\|tie\b/.test(c);
			if (!done && (w || tie)) { done = true; resolve(w ? w[1].trim() : 'tie'); }
		} })();
		s.omniscient.write(`>start ${JSON.stringify({ formatid: FORMAT })}
>player p1 ${JSON.stringify({ name: 'A', team: meIsP1 ? myPacked : foePacked })}
>player p2 ${JSON.stringify({ name: 'B', team: meIsP1 ? foePacked : myPacked })}`);
	});
}
async function matrixOf(paste, N) {
	const my = pack(paste); const rows = [];
	for (const [name, foePaste] of Object.entries(META)) {
		const foe = pack(foePaste); let w = 0, g = 0;
		for (let i = 0; i < N; i++) {
			const meIsP1 = i % 2 === 0;
			const winner = await runMatch(my, foe, meIsP1);
			if (winner === 'tie') continue; g++;
			if (winner === (meIsP1 ? 'A' : 'B')) w++;
		}
		rows.push({ name, wr: Math.round(100 * w / (g || 1)), games: g });
	}
	rows.sort((a, b) => a.wr - b.wr);
	return rows;
}

// ---------- Arena battles ----------
const battles = new Map(); let nextId = 1;
function startBattle(myPaste, oppName) {
	const id = String(nextId++);
	const bs = new BattleStream(); const streams = getPlayerStreams(bs);
	new GameplanBot(streams.p2, { battle: bs, side: 'p2' }).start();
	const rec = { streams, clients: new Set(), buffer: [], done: false };
	battles.set(id, rec);
	(async () => {
		try {
			for await (const chunk of streams.p1) for (const line of chunk.split('\n')) {
				if (!line) continue;
				rec.buffer.push(line);
				for (const res of rec.clients) { try { res.write(`data: ${line.replace(/\r/g, '')}\n\n`); } catch {} }
				if (line.startsWith('|win|') || /^\|tie\b/.test(line)) rec.done = true;
			}
		} catch (e) { console.error('[pump]', e && e.message); }
	})();
	streams.omniscient.write(`>start ${JSON.stringify({ formatid: FORMAT })}
>player p1 ${JSON.stringify({ name: 'You', team: pack(myPaste) })}
>player p2 ${JSON.stringify({ name: `AI · ${oppName}`, team: pack(META[oppName]) })}`);
	return id;
}

// ---------- static + routing ----------
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json', '.gif': 'image/gif', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
function serveFile(res, fp) {
	fs.readFile(fp, (err, data) => {
		if (err) { res.writeHead(404); res.end('not found'); return; }
		res.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream' });
		res.end(data);
	});
}
function body(req) { return new Promise(r => { let b = ''; req.on('data', c => b += c); req.on('end', () => r(b)); }); }
function json(res, obj, code = 200) { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(obj)); }
// contain a URL path to a base dir (no traversal), return absolute file path or null
function within(base, rel) {
	const fp = path.join(base, path.normalize('/' + rel));
	return fp.startsWith(base) ? fp : null;
}

const server = http.createServer(async (req, res) => {
	const u = new URL(req.url, `http://${req.headers.host}`); const p = u.pathname;
	try {
		// ---- API ----
		if (p === '/api/opponents') return json(res, { opponents: Object.keys(META), sprites: SPRITEMAP });
		if (p === '/api/matrix' && req.method === 'POST') {
			const { paste, n } = JSON.parse(await body(req) || '{}');
			if (!paste) return json(res, { error: 'no paste' }, 400);
			try { const rows = await matrixOf(paste, Math.max(4, Math.min(60, n || 20))); return json(res, { rows }); }
			catch (e) { return json(res, { error: String(e && e.message) }, 400); }
		}
		if (p === '/api/optimize' && req.method === 'POST') {
			const { paste, opponent, n } = JSON.parse(await body(req) || '{}');
			const oppName = Object.keys(META).includes(opponent) ? opponent : Object.keys(META)[0];
			try {
				const best = await optimize(normalizePaste(paste), META[oppName], oppName, Math.max(4, Math.min(30, n || 12)), true);
				return json(res, { opponent: oppName, best });
			} catch (e) { return json(res, { error: String(e && e.message) }, 400); }
		}
		if (p === '/api/new' && req.method === 'POST') {
			const { opponent, paste } = JSON.parse(await body(req) || '{}');
			const oppName = Object.keys(META).includes(opponent) ? opponent : Object.keys(META)[0];
			const id = startBattle(paste && paste.trim() ? paste : MY_TEAM, oppName);
			return json(res, { id, opponent: oppName });
		}
		if (p === '/api/stream') {
			const rec = battles.get(u.searchParams.get('id'));
			if (!rec) { res.writeHead(404); return res.end(); }
			res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
			for (const line of rec.buffer) res.write(`data: ${line.replace(/\r/g, '')}\n\n`);
			rec.clients.add(res); req.on('close', () => rec.clients.delete(res)); return;
		}
		if (p === '/api/choose' && req.method === 'POST') {
			const { id, choice } = JSON.parse(await body(req) || '{}');
			const rec = battles.get(id);
			if (rec && !rec.done && typeof choice === 'string') rec.streams.p1.write(choice);
			return json(res, { ok: true });
		}
		// ---- Team Builder PWA at root (self-contained: it runs the sim in-browser;
		//      the /arena page and /sim worker are served as normal app files) ----
		if (p === '/arena' || p === '/arena/') { res.writeHead(302, { Location: '/arena/arena.html' }); return res.end(); }
		if (p === '/') return serveFile(res, path.join(APP_DIR, 'index.html'));
		const appFp = within(APP_DIR, p);
		if (appFp && fs.existsSync(appFp) && fs.statSync(appFp).isFile()) return serveFile(res, appFp);
		res.writeHead(404); res.end('not found');
	} catch (e) { res.writeHead(500); res.end(String(e && e.message)); }
});
server.listen(PORT, () => console.log(`\n  Champions Lab → http://localhost:${PORT}\n    ·  /         Team Builder (drop a paste → Battle Lab matchups)\n    ·  /arena/   graphical battle vs the AI\n  Ctrl-C to stop.\n`));
