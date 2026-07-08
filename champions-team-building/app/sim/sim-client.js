/* SimClient — main-thread wrapper over the sim Web Worker. Promise-based matrix /
   optimize (with progress), plus a streaming battle channel. Used by the Battle Lab
   and the Arena so the app runs the real engine offline, with no server. */
'use strict';
(function () {
  function SimClient(workerUrl) {
    this.w = new Worker(workerUrl || 'sim/worker.js');
    this.rid = 0; this.pending = {}; this.battleHandlers = {};
    this.ready = new Promise((res) => { this._readyRes = res; });
    this.w.onmessage = (e) => {
      const m = e.data || {};
      if (m.type === 'ready') { this._readyRes(); return; }
      if (m.type === 'battle:line') { const h = this.battleHandlers[m.bid]; if (h) h(m.line); return; }
      const p = this.pending[m.rid]; if (!p) return;
      if (m.type === 'progress') { p.onProgress && p.onProgress(m); return; }
      if (m.type === 'error') { p.reject(new Error(m.error)); delete this.pending[m.rid]; return; }
      if (m.type === 'result') { p.resolve(m); delete this.pending[m.rid]; }
    };
  }
  SimClient.prototype._call = function (msg, onProgress) {
    return new Promise((resolve, reject) => {
      const rid = ++this.rid;
      this.pending[rid] = { resolve, reject, onProgress };
      this.w.postMessage(Object.assign({ rid }, msg));
    });
  };
  SimClient.prototype.meta = function () { return this._call({ type: 'meta' }); };
  SimClient.prototype.matrix = function (paste, n, count, onProgress) { return this._call({ type: 'matrix', paste, n, count }, onProgress).then((r) => r.rows); };
  SimClient.prototype.optimize = function (paste, opponent, n, onProgress) { return this._call({ type: 'optimize', paste, opponent, n }, onProgress).then((r) => r.best); };
  SimClient.prototype.startBattle = function (opponent, paste, onLine) {
    const bid = ++this.rid; this.battleHandlers[bid] = onLine;
    this.w.postMessage({ type: 'battle:start', bid, opponent, paste });
    return bid;
  };
  SimClient.prototype.choose = function (bid, choice) { this.w.postMessage({ type: 'battle:choose', bid, choice }); };
  self.SimClient = SimClient;
})();
