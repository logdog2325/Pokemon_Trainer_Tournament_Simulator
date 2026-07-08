/*
 * autospread — fill sensible Champions point spreads onto a spread-less paste
 * (tournament pastes from Limitless/vrpastes have moves/item/ability/nature but
 * no EVs). Role-based heuristic in the 66-point system (0-32 per stat). Mons that
 * already carry an EVs / Stat Points line are left untouched.
 */
const FAST = ['Jolly', 'Timid', 'Naive', 'Hasty'];
const SLOW = ['Brave', 'Relaxed', 'Quiet', 'Sassy'];
const PHYS_NATURE = ['Adamant', 'Brave', 'Jolly', 'Impish', 'Careful', 'Naughty', 'Lonely', 'Naive', 'Gentle'];
const DEF_NATURE = { Bold: 'Def', Impish: 'Def', Relaxed: 'Def', Calm: 'SpD', Careful: 'SpD', Sassy: 'SpD' };
const SUPPORT = ['fake out', 'helping hand', 'tailwind', 'rage powder', 'follow me', 'light screen',
	'reflect', 'aurora veil', 'will-o-wisp', 'parting shot', 'wide guard', 'quick guard', 'yawn',
	'thunder wave', 'encore', 'taunt', 'sleep powder', 'trick room'];
const STATUS = ['trick room', 'tailwind', 'protect', 'detect', 'fake out', 'helping hand', 'rage powder',
	'follow me', 'nasty plot', 'swords dance', 'calm mind', 'bulk up', 'dragon dance', 'shell smash',
	'will-o-wisp', 'parting shot', 'wide guard', 'quick guard', 'yawn', 'thunder wave', 'encore', 'taunt',
	'sleep powder', 'light screen', 'reflect', 'aurora veil', 'leech seed', 'stomping tantrum'];

function spreadLine(nature, moves) {
	const m = moves.map(x => x.toLowerCase());
	const hasTR = m.includes('trick room');
	const attacks = m.filter(x => !STATUS.includes(x)).length;
	const supportCount = m.filter(x => SUPPORT.includes(x)).length;
	const phys = PHYS_NATURE.includes(nature) ? true : (SLOW.concat(FAST).includes(nature) ? false : false);
	// pick attacking stat by nature (Adamant/Jolly-> Atk, Modest/Timid-> SpA); default SpA
	const off = ['Adamant', 'Brave', 'Jolly', 'Naughty', 'Lonely'].includes(nature) ? 'Atk' : 'SpA';
	const bulkySupport = supportCount >= 2 && attacks <= 1;

	if (DEF_NATURE[nature] && bulkySupport) {                 // dedicated wall / support
		const d = DEF_NATURE[nature], o = d === 'Def' ? 'SpD' : 'Def';
		return `32 HP / 32 ${d} / 2 ${o}`;
	}
	if (SLOW.includes(nature) || hasTR) {                     // Trick Room mon
		if (attacks >= 2) return `32 HP / 32 ${off} / 2 SpD`;  // TR attacker (nature gives low speed)
		const d = DEF_NATURE[nature] || 'SpD', o = d === 'Def' ? 'SpD' : 'Def';
		return `32 HP / 32 ${d} / 2 ${o}`;                      // TR support
	}
	if (DEF_NATURE[nature]) {                                 // bulky pivot (neutral speed, +def nature)
		const d = DEF_NATURE[nature], o = d === 'Def' ? 'SpD' : 'Def';
		return `32 HP / 24 ${d} / 10 ${off}`;
	}
	// fast / neutral offense -> hit hard and outspeed
	return `32 ${off} / 32 Spe / 2 HP`;
}

export function autospread(paste) {
	return paste.trim().split(/\n\s*\n/).map(block => {
		const lines = block.trim().split('\n');
		if (lines.some(l => /^(EVs|Stat Points):/i.test(l))) return block;      // already has a spread
		const nature = (block.match(/^(\w+)\s+Nature/im) || [])[1] || 'Hardy';
		const moves = lines.filter(l => /^-\s*/.test(l)).map(l => l.replace(/^-\s*/, '').split('/')[0].replace(/\s*\[[^\]]*\]/, '').trim());
		const evs = `EVs: ${spreadLine(nature, moves)}`;
		// insert the EVs line right before the "<Nature> Nature" line (or after level/ability)
		const out = [];
		let inserted = false;
		for (const l of lines) {
			if (!inserted && /\bNature\b/i.test(l)) { out.push(evs); inserted = true; }
			out.push(l);
		}
		if (!inserted) out.push(evs);
		return out.join('\n');
	}).join('\n\n');
}
