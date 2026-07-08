'use strict';
// Champions Arena browser client: renders the offline sim's protocol stream with
// real Showdown sprites + move animations, and lets you choose moves by clicking.

let SPRITES = {};                 // species name -> sprite filename id
let battleId = null;
const $ = s => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
const toId = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

// slot state: { name, details, hp, maxhp, fainted }
const slots = { p1a: {}, p1b: {}, p2a: {}, p2b: {} };
let myPokemon = [];               // from request.side.pokemon (your 4)
const roster = { p1: [], p2: [] }; // full six per side, revealed by Open Team Sheets (|poke| lines)

function spriteFile(details) {
	// details like "Gardevoir-Mega, L50, F" -> filename id
	const species = details.split(',')[0].trim();
	if (SPRITES[species]) return SPRITES[species];
	return toId(species);           // fallback; onerror will retry base forme
}
function baseId(details) { return toId(details.split(',')[0].split('-')[0]); }

function setSprite(slotId, details) {
	const side = slotId[1] === '1' ? 'ani-back' : 'ani';
	const img = $('#' + slotId + ' img');
	const id = spriteFile(details), base = baseId(details);
	img.onerror = () => { img.onerror = () => { img.style.opacity = 0; }; img.src = `/sprites/${side}/${base}.gif`; };
	img.src = `/sprites/${side}/${id}.gif`;
	$('#' + slotId).classList.remove('empty', 'fainted');
}

// ---------- HP / name plates ----------
function renderPlate(slotId) {
	const s = slots[slotId], plate = $('#plate-' + slotId);
	if (!s.details || s.fainted) { plate.classList.add('hidden'); return; }
	plate.classList.remove('hidden');
	const pct = Math.max(0, Math.round(100 * s.hp / s.maxhp));
	const cls = pct <= 20 ? 'low' : pct <= 50 ? 'mid' : '';
	const nm = s.details.split(',')[0];
	const lv = (s.details.match(/L(\d+)/) || [, '50'])[1];
	plate.innerHTML = `<div class="nm"><span>${nm}${s.status ? ` <span class="tag">${s.status.toUpperCase()}</span>` : ''}</span><span class="lv">L${lv}</span></div>`
		+ `<div class="hpbar"><i class="${cls}" style="width:${pct}%"></i></div>`
		+ `<div class="st">${pct}%</div>`;
}

// ---------- animation queue ----------
const q = [];
let busy = false;
const sleep = ms => new Promise(r => setTimeout(r, ms));
function enqueue(line) { q.push(line); pump(); }
async function pump() {
	if (busy) return; busy = true;
	while (q.length) {
		const line = q.shift();
		const stop = await apply(line);
		if (stop) { busy = false; return; }   // a request paused us for input
	}
	busy = false;
}

function slotOf(ref) { // "p1a: Gardevoir" -> "p1a"
	const m = ref.match(/^(p[12][ab])/); return m ? m[1] : null;
}
function logLine(html, big) { const d = el('div', big ? 'big' : '', html); $('#log').appendChild(d); $('#log').scrollTop = 1e9; }

async function apply(line) {
	if (!line.startsWith('|')) return false;
	const p = line.split('|'); const tag = p[1];
	switch (tag) {
		case 'request': { handleRequest(JSON.parse(p.slice(2).join('|'))); return true; }
		case 'clearpoke': roster.p1 = []; roster.p2 = []; break;
		case 'poke': { if (roster[p[2]]) roster[p[2]].push(p[3]); break; }   // OTS reveal: "|poke|p2|Kingambit, F|"
		case 'turn': logLine(`<span class="t">— Turn ${p[2]} —</span>`); clearControls(); break;
		case 'switch': case 'drag': {
			const sl = slotOf(p[2]); if (!sl) break;
			slots[sl] = { details: p[3], hp: 100, maxhp: 100, fainted: false, status: '' };
			const hp = (p[4] || '100/100').split(' ')[0].split('/'); slots[sl].hp = +hp[0]; slots[sl].maxhp = +hp[1] || 100;
			setSprite(sl, p[3]); renderPlate(sl);
			logLine(`${sl[1] === '1' ? 'Go! ' : 'Foe sent out '}<b>${p[3].split(',')[0]}</b>!`);
			await sleep(250); break;
		}
		case 'move': {
			const sl = slotOf(p[2]); logLine(`${p[2].split(': ')[1] || p[2]} used <b>${p[3]}</b>`);
			if (sl) { const up = sl[1] === '1'; $('#' + sl).classList.add(up ? 'lungeUp' : 'lungeDown');
				await sleep(220); $('#' + sl).classList.remove('lungeUp', 'lungeDown'); }
			break;
		}
		case '-damage': case '-sethp': {
			const sl = slotOf(p[2]); if (!sl) break;
			const hp = (p[3] || '0/100').split(' ')[0].split('/');
			if (p[3].includes('fnt') || +hp[0] === 0) slots[sl].hp = 0; else { slots[sl].hp = +hp[0]; slots[sl].maxhp = +hp[1] || slots[sl].maxhp; }
			$('#' + sl).classList.add('hit'); const fl = $('#' + sl + ' .flash'); fl.classList.add('go');
			renderPlate(sl); await sleep(340);
			$('#' + sl).classList.remove('hit'); fl.classList.remove('go'); break;
		}
		case '-heal': { const sl = slotOf(p[2]); if (!sl) break; const hp = (p[3] || '').split(' ')[0].split('/'); slots[sl].hp = +hp[0]; slots[sl].maxhp = +hp[1] || slots[sl].maxhp; renderPlate(sl); await sleep(200); break; }
		case 'faint': { const sl = slotOf(p[2]); if (!sl) break; slots[sl].fainted = true; $('#' + sl).classList.add('fainted'); renderPlate(sl); logLine(`<b>${p[2].split(': ')[1]}</b> fainted!`); await sleep(450); break; }
		case 'detailschange': case '-formechange': { const sl = slotOf(p[2]); if (!sl) break; slots[sl].details = p[3]; setSprite(sl, p[3]); renderPlate(sl); break; }
		case '-mega': { const sl = slotOf(p[2]); if (sl) { $('#' + sl).classList.add('megaglow'); logLine(`★ <b>${p[2].split(': ')[1]}</b> Mega Evolved!`, true); await sleep(700); $('#' + sl).classList.remove('megaglow'); } break; }
		case '-status': { const sl = slotOf(p[2]); if (sl) { slots[sl].status = p[3]; renderPlate(sl); } break; }
		case '-curestatus': { const sl = slotOf(p[2]); if (sl) { slots[sl].status = ''; renderPlate(sl); } break; }
		case '-fieldstart': { if (/Trick Room/i.test(p[2])) { $('#field').classList.add('tr'); logLine('Trick Room twisted the dimensions!', true); } await sleep(200); break; }
		case '-fieldend': { if (/Trick Room/i.test(p[2])) $('#field').classList.remove('tr'); break; }
		case '-weather': { setWeather(p[2], line.includes('[upkeep]')); break; }
		case '-sidestart': { logLine(`<span class="t">${p[3].replace('move: ', '')} — ${p[2]}</span>`); break; }
		case '-supereffective': logLine(`<span class="t">It's super effective!</span>`); break;
		case '-crit': logLine(`<span class="t">Critical hit!</span>`); break;
		case '-activate': if (/move:/.test(p[3] || '')) logLine(`<span class="t">${p[2].split(': ')[1] || ''} — ${(p[3] || '').replace('move: ', '')}</span>`); break;
		case 'win': logLine(`🏁 <b>${p[2]} won!</b>`, true); showRematch(p[2]); break;
		case 'error': logLine(`<span class="t">⚠ ${p.slice(2).join('|')}</span>`); return true;
		default: break;
	}
	return false;
}

let curWeather = '';
function setWeather(w, upkeep) {
	const map = { SunnyDay: 'sun', Sun: 'sun', DesolateLand: 'sun', RainDance: 'rain', Rain: 'rain', PrimordialSea: 'rain', Sandstorm: 'sand', Snow: 'snow', Hail: 'hail', none: '' };
	const cls = map[w] !== undefined ? map[w] : '';
	if (upkeep && w === curWeather) return;
	curWeather = w; $('#wx').className = 'wx ' + (cls || '');
	if (w && w !== 'none' && !upkeep) logLine(`<span class="t">Weather: ${w}</span>`);
}

// ---------- controls ----------
function clearControls() { $('#controls').innerHTML = ''; $('#field').classList.remove('targeting'); document.querySelectorAll('.slot.pick').forEach(s => s.classList.remove('pick')); }
function submit(choice) { clearControls(); fetch('/choose', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: battleId, choice }) }); }

function handleRequest(req) {
	if (req.wait) return;
	if (req.teamPreview) return teamPreviewUI(req);
	if (req.forceSwitch) return forceSwitchUI(req);
	if (req.active) return moveUI(req);
}

const TYPECOLOR = {}; // (kept simple; could color by move type)
function moveUI(req) {
	clearControls();
	myPokemon = req.side.pokemon;
	const picks = [];
	let megaLeft = true;
	const actives = req.active.map((a, i) => ({ a, i })).filter(x => {
		const pm = req.side.pokemon[x.i]; return !(pm.condition.endsWith(' fnt') || pm.commanding);
	});
	let step = 0;
	const foeSlots = () => ['p2a', 'p2b'].map((s, k) => ({ s, n: k + 1 })).filter(x => slots[x.s].details && !slots[x.s].fainted);

	function renderStep() {
		clearControls();
		if (step >= actives.length) { submit(picks.join(', ')); return; }
		const { a, i } = actives[step];
		const pm = req.side.pokemon[i];
		const c = $('#controls');
		c.appendChild(el('div', 'ctrlhead', `Choose for <b>${pm.details.split(',')[0]}</b> ${actives.length > 1 ? `(${step + 1}/${actives.length})` : ''}`));
		const grid = el('div', 'moves');
		a.moves.forEach((mv, j) => {
			if (mv.disabled) return;
			const b = el('button', 'mv' + (a.canMegaEvo && megaLeft ? '' : ''), `${mv.move} <small>${mv.pp != null ? mv.pp + '/' + mv.maxpp : ''}</small>`);
			b.onclick = () => pickMove(a, i, j + 1, mv);
			grid.appendChild(b);
		});
		c.appendChild(grid);
		const row = el('div', 'row');
		if (a.canMegaEvo && megaLeft) {
			const mb = el('button', 'btn' + (megaOn ? ' p' : ''), megaOn ? '★ Mega: ON' : '☆ Mega Evolve');
			mb.onclick = () => { megaOn = !megaOn; renderStep(); };
			row.appendChild(mb);
		}
		// switch option
		const bench = pm.canSwitch !== false ? req.side.pokemon.map((pp, k) => ({ pp, n: k + 1 })).filter(x => x.pp && !x.pp.active && !x.pp.condition.endsWith(' fnt')) : [];
		if (bench.length && !req.side.pokemon[i].trapped) {
			const sb = el('button', 'btn', '⇄ Switch');
			sb.onclick = () => switchMenu(bench, n => { picks.push(`switch ${n}`); step++; megaOn = false; renderStep(); });
			row.appendChild(sb);
		}
		c.appendChild(row);
	}
	let megaOn = false;
	function pickMove(a, i, slot, mv) {
		const single = ['normal', 'any', 'adjacentFoe'].includes(mv.target);
		const finalize = suffix => {
			let ch = `move ${slot}${suffix}`;
			if (megaOn && a.canMegaEvo && megaLeft) { ch += ' mega'; megaLeft = false; }
			picks.push(ch); step++; megaOn = false; renderStep();
		};
		if (mv.target === 'adjacentAlly') return finalize(` -${(i ^ 1) + 1}`);
		if (mv.target === 'adjacentAllyOrSelf') return finalize(` -${i + 1}`);
		if (!single) return finalize('');
		// choose a foe target by clicking
		const fs = foeSlots();
		if (fs.length <= 1) return finalize(fs.length ? ` ${fs[0].n}` : ' 1');
		$('#controls').innerHTML = '<div class="ctrlhead">Tap the target ↑</div>';
		$('#field').classList.add('targeting');
		fs.forEach(f => { const sd = $('#' + f.s); sd.classList.add('pick'); sd.onclick = () => { document.querySelectorAll('.slot.pick').forEach(s => { s.classList.remove('pick'); s.onclick = null; }); $('#field').classList.remove('targeting'); finalize(` ${f.n}`); }; });
	}
	renderStep();
}

function switchMenu(bench, cb) {
	clearControls();
	const c = $('#controls');
	c.appendChild(el('div', 'ctrlhead', 'Switch to:'));
	const row = el('div', 'row');
	bench.forEach(x => { const b = el('button', 'btn', x.pp.details.split(',')[0]); b.onclick = () => cb(x.n); row.appendChild(b); });
	const back = el('button', 'btn', '‹ back'); back.onclick = () => handleRequest(window._lastReq);
	row.appendChild(back); c.appendChild(row);
}

function forceSwitchUI(req) {
	window._lastReq = req; clearControls();
	const chosen = [];
	const steps = req.forceSwitch.map((f, i) => f ? i : -1).filter(i => i >= 0);
	let k = 0;
	function next() {
		clearControls();
		if (k >= steps.length) { const arr = req.forceSwitch.map((f, i) => f ? `switch ${chosen[steps.indexOf(i)]}` : 'pass'); submit(arr.join(', ')); return; }
		const c = $('#controls');
		c.appendChild(el('div', 'ctrlhead', `Send in a Pokémon (${k + 1}/${steps.length})`));
		const row = el('div', 'row');
		req.side.pokemon.map((pp, n) => ({ pp, n: n + 1 })).filter(x => x.pp && !x.pp.active && !x.pp.condition.endsWith(' fnt') && !chosen.includes(x.n))
			.forEach(x => { const b = el('button', 'btn', x.pp.details.split(',')[0]); b.onclick = () => { chosen.push(x.n); k++; next(); }; row.appendChild(b); });
		c.appendChild(row);
	}
	next();
}

function tpSprite(details) { const nm = details.split(',')[0]; const id = SPRITES[nm] || toId(nm); return { id, base: toId(nm.split('-')[0]), nm }; }

function teamPreviewUI(req) {
	window._lastReq = req; clearControls();
	const c = $('#controls');
	// opponent's full six (Open Team Sheets) — scout before you pick
	if (roster.p2.length) {
		c.appendChild(el('div', 'ctrlhead', `Opponent's six <span class="muted">(Open Team Sheets)</span>:`));
		const opp = el('div', 'opprow');
		roster.p2.forEach(d => { const s = tpSprite(d); opp.appendChild(el('div', 'oppmon', `<img src="/sprites/ani/${s.id}.gif" onerror="this.onerror=null;this.src='/sprites/ani/${s.base}.gif'"><span>${s.nm}</span>`)); });
		c.appendChild(opp);
	}
	c.appendChild(el('div', 'ctrlhead', 'Choose 4 to bring — tap in order, first two are your leads:'));
	const grid = el('div', 'teamgrid');
	const order = [];
	req.side.pokemon.forEach((pm, i) => {
		const id = SPRITES[pm.details.split(',')[0]] || toId(pm.details.split(',')[0]);
		const tp = el('div', 'tp');
		tp.innerHTML = `<span class="pos"></span><img src="/sprites/ani/${id}.gif" onerror="this.src='/sprites/ani/${toId(pm.details.split(',')[0].split('-')[0])}.gif'"><div class="nm2">${pm.details.split(',')[0]}</div><div class="mv2">${(pm.moves || []).slice(0, 4).join(', ')}</div>`;
		tp.onclick = () => {
			const idx = order.indexOf(i);
			if (idx >= 0) { order.splice(idx, 1); } else if (order.length < 4) { order.push(i); }
			redraw();
		};
		tp._i = i; grid.appendChild(tp);
	});
	c.appendChild(grid);
	const row = el('div', 'row');
	const go = el('button', 'btn p', 'Battle! ▶'); row.appendChild(go);
	const hint = el('span', 'muted', ''); row.appendChild(hint);
	c.appendChild(row);
	function redraw() {
		[...grid.children].forEach(tp => { const o = order.indexOf(tp._i); tp.classList.toggle('sel', o >= 0); tp.querySelector('.pos').textContent = o >= 0 ? o + 1 : ''; });
		hint.textContent = order.length < 4 ? `pick ${4 - order.length} more` : 'ready';
	}
	go.onclick = () => { if (order.length !== 4) return; submit('team ' + order.map(i => i + 1).join('')); };
	redraw();
}

// ---------- lifecycle ----------
function showRematch(winner) {
	const c = $('#controls');
	const row = el('div', 'row');
	const r = el('button', 'btn p', '↻ New battle'); r.onclick = () => location.reload();
	row.appendChild(r); c.appendChild(row);
}

let OPPONENTS = [];
async function boot() {
	const data = await (await fetch('/teams')).json();
	SPRITES = data.sprites || {};
	OPPONENTS = data.opponents || [];
	const list = $('#oppList');
	// Random button first
	const rnd = el('button', 'opp rnd', '🎲 &nbsp;Random opponent <span class="muted">— face a surprise team</span>');
	rnd.onclick = () => startBattle(OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)]);
	list.appendChild(rnd);
	OPPONENTS.forEach(name => {
		const b = el('button', 'opp', name);
		b.onclick = () => startBattle(name);
		list.appendChild(b);
	});
}
async function startBattle(opponent) {
	const r = await (await fetch('/new', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ opponent }) })).json();
	battleId = r.id;
	$('#start').style.display = 'none'; $('#game').style.display = '';
	const es = new EventSource('/stream?id=' + battleId);
	es.onmessage = e => enqueue(e.data);
}
boot();
