/*
 * Validate one or more Showdown pastes against the REAL Champions VGC Reg M-C rules
 * (official Showdown team validator, offline). Stat points go on the "EVs:" line (0-32 each, 66 total).
 *   node champions-sim/validate-paste.mjs <paste.txt> [more.txt ...]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const DIST = path.join(__dirname, '..', 'pokemon-showdown', 'dist');
const { Teams } = require(path.join(DIST, 'sim'));
const { TeamValidator } = require(path.join(DIST, 'sim', 'team-validator'));
const FORMAT = 'gen9championsvgc2026regmc';
const val = new TeamValidator(FORMAT);
let bad = 0;
for (const f of process.argv.slice(2)) {
  const team = Teams.import(fs.readFileSync(f, 'utf8'));
  const errs = team ? val.validateTeam(team) : ['could not parse paste'];
  if (errs) { bad++; console.log(`✗ ${f}\n   - ${errs.join('\n   - ')}`); }
  else console.log(`✓ ${f} — legal in ${FORMAT}`);
}
process.exit(bad ? 1 : 0);
