/*
 * Matchup report CLI — see report-core.js for what it computes.
 *
 *   node champions-sim/search/matchup-report.js <ours.txt> <theirs.txt|meta:Archetype Name> [--quick] [--json out.json]
 *
 * <theirs> can be a paste file or `meta:<name>` to use a team from the Reg M-C opponent library
 * (champions-sim/meta-teams.mjs), e.g. `meta:Swampert / Golisopod`.
 */
const fs = require('fs');
const path = require('path');
const { matchupReport, formatReport } = require('./report-core');

const args = process.argv.slice(2);
const [oursFile, theirsArg] = args;
if (!oursFile || !theirsArg) { console.error('usage: matchup-report.js <ours.txt> <theirs.txt|meta:Name> [--quick] [--json out.json]'); process.exit(2); }
const level = args.includes('--quick') ? 'quick' : 'standard';
const jsonOut = args.includes('--json') ? args[args.indexOf('--json') + 1] : null;

const PRIOR_FILE = path.join(__dirname, '..', 'human', 'move-prior.json');
const prior = fs.existsSync(PRIOR_FILE) ? JSON.parse(fs.readFileSync(PRIOR_FILE, 'utf8')) : null;

let pasteB, titleB;
if (theirsArg.startsWith('meta:')) {
	const { META } = require('../meta-teams.mjs');
	titleB = theirsArg.slice(5);
	pasteB = META[titleB];
	if (!pasteB) { console.error(`no archetype "${titleB}". Some names: ${Object.keys(META).slice(0, 15).join(' · ')}`); process.exit(2); }
} else { pasteB = fs.readFileSync(theirsArg, 'utf8'); titleB = path.basename(theirsArg); }

const report = matchupReport(fs.readFileSync(oursFile, 'utf8'), pasteB, { level, prior },
	(stage, done, total) => { if (done === total || done % 20 === 0) process.stderr.write(`\r${stage} ${done}/${total}   `); });
process.stderr.write('\n');
console.log(formatReport(report, path.basename(oursFile), titleB));
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(report, null, 1));
