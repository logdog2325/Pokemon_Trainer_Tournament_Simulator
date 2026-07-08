/* Champions sim Web Worker — runs the baked-in engine off the UI thread.
   Loads engine.web.js (globalThis.ChampSim) and answers RPC messages for the
   matchup matrix, the optimizer, and live human-vs-AI battles. */
'use strict';
importScripts('engine.web.js');
const CS = self.ChampSim;
const battles = {};

self.onmessage = async (e) => {
  const m = e.data || {};
  try {
    if (m.type === 'validate') {
      self.postMessage({ rid: m.rid, type: 'result', result: CS.validate(m.paste) });
    } else if (m.type === 'meta') {
      self.postMessage({ rid: m.rid, type: 'result', opponents: CS.opponents, teams: CS.teams, sprites: CS.sprites, defaultTeam: CS.defaultTeam });
    } else if (m.type === 'matrix') {
      const names = CS.opponents.slice(0, m.count || CS.opponents.length);
      const rows = await CS.matrix(m.paste, m.n, (done, total, name) => self.postMessage({ rid: m.rid, type: 'progress', done, total, name }), names);
      self.postMessage({ rid: m.rid, type: 'result', rows });
    } else if (m.type === 'optimize') {
      const result = await CS.optimize(m.paste, m.opponent, m.n, (done, total) => self.postMessage({ rid: m.rid, type: 'progress', done, total }));
      self.postMessage({ rid: m.rid, type: 'result', result });
    } else if (m.type === 'battle:start') {
      battles[m.bid] = CS.startBattle(m.opponent, m.paste, (line) => self.postMessage({ type: 'battle:line', bid: m.bid, line }));
    } else if (m.type === 'battle:choose') {
      CS.choose(battles[m.bid], m.choice);
    }
  } catch (err) {
    self.postMessage({ rid: m.rid, type: 'error', error: String(err && err.message || err) });
  }
};
self.postMessage({ type: 'ready' });
