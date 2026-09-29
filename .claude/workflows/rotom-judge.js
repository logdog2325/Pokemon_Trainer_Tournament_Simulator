export const meta = {
  name: 'rotom-judge',
  description: 'Two advocates debate which of a species\' two Mega forms is better in Reg M-C, a judge scores them, then builds the strongest team around each form',
  whenToUse: 'Comparing two Mega forms of one species (X vs Y, standard vs Z). Pass args as an array of {species, forms:[{label,name,stone,slug},{...}]}. Needs rotom-judge/factsheets/<Species>.md generated first by `node rotom-judge/factsheet.js <Species>`.',
  phases: [
    { title: 'Opening', detail: 'each advocate argues its form, in parallel, blind to the other' },
    { title: 'Rebuttal', detail: 'each advocate attacks the other opening and concedes where the numbers lose' },
    { title: 'Verdict', detail: 'judge recomputes contested claims, scores, writes a team brief per form' },
    { title: 'Build', detail: 'one full 6-Pokemon team per form, validated by rotom-judge/validate.js' },
  ],
}

// ---------------------------------------------------------------------------------------------
// Shared context every agent gets. Paths are relative to the repo root.
const ROOT = 'champions-team-building'
const RULES = `
GROUND RULES (Pokemon Champions, Regulation M-C doubles, Level 50, bring 6 pick 4):
- Stat points: 66 total, max 32 per stat (not EVs). Positive nature = x1.1.
- Item Clause: all six items distinct. Species Clause: no duplicate species. Only ONE Mega Evolution per battle.
- NOT in Champions: Choice Band, Choice Specs, Toxic Orb, Flame Orb, Black Sludge, Covert Cloak, Safety Goggles, Clear Amulet. Check any item
  against the engine's ITEMS list before using it. Mewtwo is not in the game (unless a SPECIAL NOTE below says this run is a Mewtwo hypothetical).
- Spread moves take x0.75 in doubles. Screens are x0.667 in doubles, not 0.5.
- Entry abilities (weather/terrain setters) resolve in Speed order and the LAST write wins, so the slower setter wins a
  simultaneous lead, and a Mega-granted setter re-fires on every switch-in after it has Mega Evolved.
- Psychic Terrain blocks priority only against GROUNDED targets. Flying types and Levitate are ungrounded.
- Speed benchmarks must use the correct positive nature.
- ${ROOT}/confirmed-facts.md records every mechanic this project has verified or got wrong before. Grep it when unsure.

TOOLS - compute, never recall. Your training data is unreliable on Champions specifics.
- The fact sheet ${ROOT}/rotom-judge/factsheets/<Species>.md holds verified numbers for both forms vs the 21-threat
  Reg M-C board (usage from Pikalytics M-C).
- For any new number, run the real damage engine:
    cd ${ROOT}/rotom-judge && node -e '
      const E=require("./engine"); const {mk,P,calc,fmt,best,stats,BOARD,megaIndex}=E;
      const me=mk("Absol",megaIndex("Absol","Mega Z"),"Absolite Z","Jolly",P(2,32,0,0,0,32),["Night Slash"],null);
      const t=BOARD.find(b=>b.name==="Kingambit").mon;
      console.log(fmt(calc(me,"Night Slash",t,{terrain:"psychic"})), stats(me));'
  mk(species, formIndex(-1 base | megaIndex(...)), item, nature, P(hp,atk,def,spa,spd,spe), moves, ability).
  calc(att, move, def, field) -> result; fmt() prints "min-max% KO" or "(n/16)" = rolls out of 16 that KO.
  field keys: weather ("sun"|"rain"|"sand"|"snow"), terrain ("psychic"|"grassy"|"electric"|"misty"), helpingHand,
  reflect, lightScreen, auroraVeil, atkStage, defStagePhys, defStageSpec, spread (auto-set).
  E.accuracy(move, ability, weather) gives real accuracy; the engine's damage ignores accuracy, so discount inaccurate moves yourself.
- Do NOT edit anything under ${ROOT}/app or ${ROOT}/rotom-judge/*.js. Do NOT run git commit or push.`

// ---------------------------------------------------------------------------------------------
const VERDICT = {
  type: 'object',
  properties: {
    winner: { type: 'string', description: 'label of the winning form exactly as given, or "tie"' },
    score_a: { type: 'number', description: 'form A total out of 100' },
    score_b: { type: 'number', description: 'form B total out of 100' },
    rubric_a: { type: 'string', description: 'evidence/relevance/rebuttal/honesty points for A, e.g. "34/40, 20/25, 15/20, 12/15"' },
    rubric_b: { type: 'string' },
    summary: { type: 'string', description: '3-6 sentences: who won, the decisive numbers, what each form is actually for' },
    opinion: { type: 'string', description: "the judge's full written opinion, first person, 250-450 words: having heard both sides, which Mega you think is better and why" },
    conclusion: { type: 'string', description: "2-4 sentences starting 'Conclusion:' - which Mega is better in this format and the decisive reasons, with the key numbers" },
    checked_claims: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          side: { type: 'string' }, claim: { type: 'string' },
          holds: { type: 'boolean' }, recomputed: { type: 'string', description: 'the number you got from the engine' },
        },
        required: ['side', 'claim', 'holds', 'recomputed'],
      },
    },
    brief_a: {
      type: 'object',
      properties: {
        game_plan: { type: 'string' },
        lean_into: { type: 'array', items: { type: 'string' } },
        must_cover: { type: 'array', items: { type: 'string' } },
        partner_ideas: { type: 'array', items: { type: 'string' } },
      },
      required: ['game_plan', 'lean_into', 'must_cover', 'partner_ideas'],
    },
    brief_b: {
      type: 'object',
      properties: {
        game_plan: { type: 'string' },
        lean_into: { type: 'array', items: { type: 'string' } },
        must_cover: { type: 'array', items: { type: 'string' } },
        partner_ideas: { type: 'array', items: { type: 'string' } },
      },
      required: ['game_plan', 'lean_into', 'must_cover', 'partner_ideas'],
    },
  },
  required: ['winner', 'score_a', 'score_b', 'rubric_a', 'rubric_b', 'summary', 'opinion', 'conclusion', 'checked_claims', 'brief_a', 'brief_b'],
}

const BUILD = {
  type: 'object',
  properties: {
    legal: { type: 'boolean', description: 'true only if the LAST validate.js run printed "LEGAL: all checks passed."' },
    paste: { type: 'string', description: 'the final Showdown paste, exactly as written to the file' },
    default_four: { type: 'string', description: 'default bring-4 and leads' },
    headline: { type: 'string', description: 'one or two sentences: the team plan' },
    notes_path: { type: 'string' },
  },
  required: ['legal', 'paste', 'default_four', 'headline', 'notes_path'],
}

// ---------------------------------------------------------------------------------------------
function openingPrompt(sp, me, them) {
  return `You are the advocate for ${me.name} in "Rotom Judge", a structured debate. Your opponent argues for ${them.name}.
Your job: prove ${me.name} (form label "${me.label}", holds ${me.stone}) is the better Mega form of ${sp} for Reg M-C doubles.
Be one-sided, but every claim must be true: a judge will recompute your numbers and penalise any that are wrong.
${RULES}${noteFor(sp)}

Read ${ROOT}/rotom-judge/factsheets/${sp}.md first. Compute extra calcs where they strengthen your case (items like Life Orb,
Expert Belt, type boosters - a Mega holds its stone and gets no item, and Choice Band / Choice Specs do NOT exist in Champions; Helping Hand; weather/terrain your form sets or wants; Speed tiers; survival with bulk investment).
Argue about the format that exists: the usage-weighted threat board, not hypothetical opponents.

Write your OPENING ARGUMENT, max ~650 words:
1. Thesis in one sentence.
2. Your 4-6 strongest points, each with the exact number behind it (from the sheet or your own engine run, say which).
3. The best team role / partners your form enables.
4. Pre-empt the opponent's strongest point about ${them.name} and why it matters less than it looks.
Return only the argument text.`
}

function rebuttalPrompt(sp, me, them, mine, theirs) {
  return `You are the advocate for ${me.name} in "Rotom Judge". Below are both opening arguments.
${RULES}${noteFor(sp)}

Fact sheet: ${ROOT}/rotom-judge/factsheets/${sp}.md

YOUR OPENING (${me.name}):
<<<
${mine}
>>>

OPPONENT'S OPENING (${them.name}):
<<<
${theirs}
>>>

Write your REBUTTAL, max ~450 words:
- Attack the opponent's 2-3 strongest points. Recompute their numbers with the engine where you doubt them; if a number
  is wrong or missing context (accuracy, spread penalty, a needed partner, wrong nature, an item not in Champions), say so with the correct figure.
- Concede honestly where their numbers beat yours. The judge scores accurate concessions as honesty, not weakness,
  and scores overclaiming down.
- End with one sentence on why ${me.name} still wins.
Return only the rebuttal text.`
}

function verdictPrompt(sp, A, B, oa, ob, ra, rb) {
  return `You are ROTOM JUDGE, the impartial judge. Two advocates argued which Mega form of ${sp} is better in Reg M-C doubles:
form A = ${A.name} (label "${A.label}", ${A.stone}); form B = ${B.name} (label "${B.label}", ${B.stone}).
${RULES}${noteFor(sp)}

Fact sheet: ${ROOT}/rotom-judge/factsheets/${sp}.md

=== A OPENING ===
${oa}
=== B OPENING ===
${ob}
=== A REBUTTAL ===
${ra}
=== B REBUTTAL ===
${rb}

STEP 1 - VERIFY. Recompute at least 6 numeric claims with the engine (at least 3 per side), prioritising the claims the
rebuttals dispute and the claims each side leans on hardest. Record each in checked_claims with the number you got.

STEP 2 - SCORE each side out of 100:
- Evidence 40: claims backed by the sheet or engine. Minus 5 per checked claim that does not hold.
- Relevance 25: matters against the high-usage threats, not edge cases.
- Rebuttal 20: engaged and refuted the other side's strongest points with numbers.
- Honesty 15: accurate concessions, no overclaiming, no items or mechanics that don't exist in Champions.
The winner is whichever form the evidence supports as better in this format, which usually but not always tracks the score.

STEP 3 - YOUR OPINION. Write the judge's opinion in the first person (250-450 words), as a ruling delivered after
hearing both sides: which Mega you think is better in this format and WHY. Say which arguments persuaded you and which
did not, what each advocate got right and got wrong (with the numbers), anything important NEITHER side raised, and
what each form is genuinely best at. END the opinion with a paragraph that starts "Conclusion:" and states plainly
which Mega you think is better in this format and the 2-3 decisive reasons, with their numbers. Return the opinion in
the opinion field, that final paragraph alone in the conclusion field, and put both under "## Judge's opinion" in verdict.md.

STEP 4 - TEAM BRIEFS. The debate now drives two teambuilds, one per form. For EACH form write a brief from what the
debate PROVED (not what either side merely claimed): game_plan; lean_into (the strengths shown with numbers);
must_cover (the threats and weaknesses the debate exposed, by name, with numbers); partner_ideas (specific Pokemon or
roles, e.g. "sand setter for Sand Force", "Fairy answer", "speed control"). Be concrete: the team builder only sees your brief and the fact sheet.

STEP 5 - Write ${ROOT}/rotom-judge/out/${sp}/verdict.md: the scores with the rubric breakdown, the checked-claims table,
your opinion, and both briefs. Then return the structured verdict.`
}

function buildPrompt(sp, me, brief, verdictSummary) {
  const dir = `${ROOT}/rotom-judge/out/${sp}`
  return `You are ROTOM JUDGE's team builder. Build the STRONGEST possible Reg M-C doubles team of six around ${me.name}
(${sp} holding ${me.stone}, form label "${me.label}").
${RULES}${noteFor(sp)}

Inputs:
- Fact sheet: ${ROOT}/rotom-judge/factsheets/${sp}.md
- Build methodology: ${ROOT}/team-building-model.md (read it; follow its phases, especially speed control, the redundancy
  rule of two answers per top threat, and deriving spreads from named benchmarks instead of defaulting to 32/32).
- Debate verdict: ${verdictSummary}
- Your brief for ${me.name}:
${JSON.stringify(brief, null, 2)}

Requirements:
1. ${sp} holds ${me.stone}. It is the centrepiece: pick partners that cover its must_cover list and enable its lean_into list.
   A second Mega Stone on another member is allowed (only one can Mega Evolve per battle), but only if it earns the slot.
2. Two answers to each of the top usage threats (Rillaboom, Sneasler, Incineroar, M-Salamence, Kingambit, Indeedee-F,
   M-Golisopod, Garchomp). Verify with the engine, not intuition.
3. At least two independent speed-control layers (Tailwind, Trick Room, paralysis, Icy Wind/Electroweb, a priority
   package, Fake Out, Unburden, weather speed abilities). Say which.
4. Every spread sums to exactly 66 with no stat over 32, and each is justified by a benchmark: "Speed X to outrun Y",
   "Atk X to OHKO Y (n/16)", "HP X survives Y". Check Life Orb recoil / sand chip residuals where relevant.
5. Every move must be in that species' Champions movepool and every item in the Champions ITEMS list.
6. Write the paste in Showdown format to ${dir}/${me.slug}.txt, then run:
     cd ${ROOT}/rotom-judge && node validate.js out/${sp}/${me.slug}.txt --require "${sp}:${me.label}"
   Fix every ERROR and re-run until it prints "LEGAL: all checks passed." Do not return a paste that has not passed.
7. Write ${dir}/${me.slug}-notes.md: the game plan, default bring-4 and leads, a threat table (each top threat -> your
   two answers with damage numbers), each spread's benchmark justification, and the team's worst matchup, stated honestly.
Return the structured result.`
}

// ---------------------------------------------------------------------------------------------
const MATCHUPS = args
// Optional per-matchup note appended to every prompt (e.g. marking a species as hypothetical).
const NOTE = {}
for (const m of MATCHUPS) if (m.note) NOTE[m.species] = m.note
function noteFor(sp) { return NOTE[sp] ? "\n\nSPECIAL NOTE FOR THIS MATCHUP: " + NOTE[sp] : "" }
log(`Rotom Judge: ${MATCHUPS.length} matchups x 7 agents = ${MATCHUPS.length * 7} agents`)

const results = await pipeline(
  MATCHUPS,
  // Opening: both advocates in parallel, blind to each other.
  async (m) => {
    const [A, B] = m.forms
    const [oa, ob] = await parallel([
      () => agent(openingPrompt(m.species, A, B), { label: `${A.name}: opening`, phase: 'Opening' }),
      () => agent(openingPrompt(m.species, B, A), { label: `${B.name}: opening`, phase: 'Opening' }),
    ])
    if (!oa || !ob) throw new Error(`${m.species}: an opening failed`)
    return { oa, ob }
  },
  // Rebuttal: each sees both openings.
  async (prev, m) => {
    const [A, B] = m.forms
    const [ra, rb] = await parallel([
      () => agent(rebuttalPrompt(m.species, A, B, prev.oa, prev.ob), { label: `${A.name}: rebuttal`, phase: 'Rebuttal' }),
      () => agent(rebuttalPrompt(m.species, B, A, prev.ob, prev.oa), { label: `${B.name}: rebuttal`, phase: 'Rebuttal' }),
    ])
    if (!ra || !rb) throw new Error(`${m.species}: a rebuttal failed`)
    return Object.assign({}, prev, { ra, rb })
  },
  // Verdict.
  async (prev, m) => {
    const [A, B] = m.forms
    const v = await agent(verdictPrompt(m.species, A, B, prev.oa, prev.ob, prev.ra, prev.rb),
      { label: `${m.species}: verdict`, phase: 'Verdict', schema: VERDICT, effort: 'high' })
    if (!v) throw new Error(`${m.species}: verdict failed`)
    log(`${m.species}: ${v.winner} wins ${v.score_a}-${v.score_b}`)
    return Object.assign({}, prev, { v })
  },
  // Build: one full team per form, in parallel.
  async (prev, m) => {
    const [A, B] = m.forms
    const [ta, tb] = await parallel([
      () => agent(buildPrompt(m.species, A, prev.v.brief_a, prev.v.summary), { label: `${A.name}: team`, phase: 'Build', schema: BUILD }),
      () => agent(buildPrompt(m.species, B, prev.v.brief_b, prev.v.summary), { label: `${B.name}: team`, phase: 'Build', schema: BUILD }),
    ])
    const bad = [[A, ta], [B, tb]].filter(([f, t]) => !t || !t.legal).map(([f]) => f.name)
    if (bad.length) log(`${m.species}: team NOT validated for ${bad.join(', ')}`)
    return { species: m.species, forms: m.forms, verdict: prev.v, teams: [ta, tb],
      debate: { oa: prev.oa, ob: prev.ob, ra: prev.ra, rb: prev.rb } }
  },
)

const done = results.filter(Boolean)
const dropped = MATCHUPS.filter(m => !done.some(d => d.species === m.species)).map(m => m.species)
if (dropped.length) log(`FAILED matchups (no result): ${dropped.join(', ')}`)
return { done, dropped }
