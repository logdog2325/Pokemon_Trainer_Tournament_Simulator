'use strict';
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    if (a instanceof Date || b instanceof Date) return +a === +b;
    if (a instanceof RegExp || b instanceof RegExp) return String(a) === String(b);
    if (a instanceof Map || b instanceof Map) { if (!(a instanceof Map && b instanceof Map) || a.size !== b.size) return false; for (const [k,v] of a) { if (!b.has(k) || !deepEqual(v,b.get(k))) return false; } return true; }
    if (a instanceof Set || b instanceof Set) { if (!(a instanceof Set && b instanceof Set) || a.size !== b.size) return false; for (const v of a) if (!b.has(v)) return false; return true; }
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) { if (!Object.prototype.hasOwnProperty.call(b,k) || !deepEqual(a[k], b[k])) return false; }
    return true;
  }
  return a !== a && b !== b; // NaN
}
function isDeepStrictEqual(a, b) { return deepEqual(a, b); }
function format(...args) { return args.map(x => typeof x === 'string' ? x : inspect(x)).join(' '); }
function inspect(x) { try { return typeof x === 'string' ? x : JSON.stringify(x); } catch { return String(x); } }
function promisify(fn) { return (...args) => new Promise((res, rej) => fn(...args, (e, v) => e ? rej(e) : res(v))); }
function inherits(ctor, sup) { ctor.super_ = sup; Object.setPrototypeOf(ctor.prototype, sup.prototype); }
function deprecate(fn) { return fn; }
const types = { isDate: x => x instanceof Date, isRegExp: x => x instanceof RegExp, isMap: x => x instanceof Map, isSet: x => x instanceof Set, isPromise: x => x && typeof x.then === 'function', isNativeError: x => x instanceof Error, isArrayBuffer: x => x instanceof ArrayBuffer };
module.exports = { isDeepStrictEqual, format, inspect, promisify, inherits, deprecate, types, debuglog: () => (() => {}), TextEncoder: globalThis.TextEncoder, TextDecoder: globalThis.TextDecoder };
