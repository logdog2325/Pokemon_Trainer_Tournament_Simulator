/*
 * Champions Arena — local graphical battle server (offline)
 * ---------------------------------------------------------------------------
 * Serves a browser battle client (real Showdown animated sprites + move
 * animations) and runs REAL offline Reg M-B doubles battles where the opponent
 * is the calibrated GameplanBot. You are p1 in the browser; the AI is p2.
 *
 *   node champions-sim/arena/server.mjs           # then open http://localhost:8790
 *
 * No external deps: Node's http + Server-Sent Events for the protocol stream,
 * POST for your choices. All sprites are local (./sprites), so it works with
 * no internet.
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const DIST = path.join(__dirname, '..', '..', 'pokemon-showdown', 'dist');
const { BattleStream, getPlayerStreams, Teams, Dex } = require(path.join(DIST, 'sim'));
const { GameplanBot } = require(path.join(__dirname, '..', 'gameplan-bot.js'));
import { MY_TEAM, META } from '../teams.mjs';
import { autospread } from '../autospread.mjs';

const FORMAT = 'gen9championsvgc2026regmb';
const PORT = process.env.PORT || 8790;
const cdex = Dex.mod('champions');
function pack(paste) { return Teams.pack(Teams.import(autospread(paste))); }

// name -> sprite filename (matches the local ./sprites files), for every species + mega in the pool
const SPRITEMAP = (() => {
	const map = {};
	const add = name => { const s = cdex.species.get(name); if (s.exists) map[s.name] = s.spriteid; };
	for (const paste of [MY_TEAM, ...Object.values(META)]) {
		for (const block of paste.trim().split(/\n\s*\n/)) {
			const head = block.trim().split('\n')[0];
			const nm = head.split(' @ ')[0].trim(), item = (head.split(' @ ')[1] || '').trim();
			add(nm);
			const it = cdex.items.get(item);
			const mega = it.megaStone || it.forcedForme;
			if (mega) add(mega);
			if (/ite/i.test(item)) add(nm + (/y$/i.test(item) ? '-Mega-Y' : /x$/i.test(item) ? '-Mega-X' : '-Mega'));
		}
	}
	return map;
})();

const battles = new Map();   // id -> { streams, clients:Set<res>, buffer:[], done }
let nextId = 1;

function startBattle(myPaste, oppName) {
	const id = String(nextId++);
	const bs = new BattleStream();
	const streams = getPlayerStreams(bs);
	new GameplanBot(streams.p2, { battle: bs, side: 'p2' }).start();   // AI opponent, smart selection
	const rec = { streams, clients: new Set(), buffer: [], done: false, bs };
	battles.set(id, rec);
	// pump p1's protocol stream to SSE clients
	(async () => {
		try {
			for await (const chunk of streams.p1) {
				for (const line of chunk.split('\n')) {
					if (!line) continue;
					if (process.env.DEBUG) console.error('[p1]', line.slice(0, 40));
					rec.buffer.push(line);
					for (const res of rec.clients) { try { res.write(`data: ${line.replace(/\r/g, '')}\n\n`); } catch {} }
					if (line.startsWith('|win|') || /^\|tie\b/.test(line)) rec.done = true;
				}
			}
		} catch (e) { console.error('[pump ERR]', e && e.message); }
	})();
	streams.omniscient.write(`>start ${JSON.stringify({ formatid: FORMAT })}
>player p1 ${JSON.stringify({ name: 'You', team: pack(myPaste) })}
>player p2 ${JSON.stringify({ name: `AI · ${oppName}`, team: pack(META[oppName]) })}`);
	return id;
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.gif': 'image/gif', '.png': 'image/png', '.json': 'application/json' };
function serveFile(res, fp) {
	fs.readFile(fp, (err, data) => {
		if (err) { res.writeHead(404); res.end('not found'); return; }
		res.writeHead(200, { 'Content-Type': MIME[path.extname(fp)] || 'application/octet-stream', 'Cache-Control': 'max-age=86400' });
		res.end(data);
	});
}
function body(req) { return new Promise(r => { let b = ''; req.on('data', c => b += c); req.on('end', () => r(b)); }); }

const server = http.createServer(async (req, res) => {
	const u = new URL(req.url, `http://${req.headers.host}`);
	const p = u.pathname;
	try {
		if (p === '/' ) return serveFile(res, path.join(__dirname, 'arena.html'));
		if (p === '/app.js') return serveFile(res, path.join(__dirname, 'app.js'));
		if (p === '/style.css') return serveFile(res, path.join(__dirname, 'style.css'));
		if (p.startsWith('/sprites/') || p.startsWith('/fx/')) {
			const safe = path.normalize(p).replace(/^(\.\.[/\\])+/, '');
			return serveFile(res, path.join(__dirname, safe));
		}
		if (p === '/teams') {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify({ opponents: Object.keys(META), sprites: SPRITEMAP }));
		}
		if (p === '/new' && req.method === 'POST') {
			const { opponent } = JSON.parse(await body(req) || '{}');
			const oppName = Object.keys(META).includes(opponent) ? opponent : Object.keys(META)[0];
			const id = startBattle(MY_TEAM, oppName);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify({ id, opponent: oppName }));
		}
		if (p === '/stream') {
			const rec = battles.get(u.searchParams.get('id'));
			if (!rec) { res.writeHead(404); return res.end(); }
			res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
			for (const line of rec.buffer) res.write(`data: ${line.replace(/\r/g, '')}\n\n`);   // replay so late joiners catch up
			rec.clients.add(res);
			req.on('close', () => rec.clients.delete(res));
			return;
		}
		if (p === '/choose' && req.method === 'POST') {
			const { id, choice } = JSON.parse(await body(req) || '{}');
			const rec = battles.get(id);
			if (process.env.DEBUG) console.error('[choose]', id, JSON.stringify(choice), 'rec?', !!rec, 'done?', rec && rec.done);
			if (rec && !rec.done && typeof choice === 'string') rec.streams.p1.write(choice);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			return res.end('{"ok":true}');
		}
		res.writeHead(404); res.end('not found');
	} catch (e) { res.writeHead(500); res.end(String(e && e.message)); }
});
server.listen(PORT, () => console.log(`\n  Champions Arena → http://localhost:${PORT}\n  (You pilot your team vs the AI. Ctrl-C to stop.)\n`));
