/* Service worker.
   App shell: NETWORK-FIRST so the app always self-updates when online (falls back
   to cache offline). Sprites: cache-first runtime cache so art shows offline. */
const CACHE = "ctb-v21";
const IMG = "ctb-img-v1";
const ASSETS = ["./","./index.html","./app.js","./ui.js","./dex-data.js","./moves-data.js","./usage-data.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== IMG).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (u.origin === location.origin) {
    // network-first: fetch fresh, update cache, fall back to cache when offline
    e.respondWith(
      fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return resp;
      }).catch(() => caches.match(e.request))
    );
  } else if (e.request.destination === "image" || /\.(png|jpe?g|gif|webp|svg)$/i.test(u.pathname)) {
    // cross-origin sprites: cache-first
    e.respondWith(caches.open(IMG).then(c => c.match(e.request).then(hit =>
      hit || fetch(e.request).then(resp => { try { c.put(e.request, resp.clone()); } catch (x) {} return resp; }).catch(() => hit)
    )));
  }
});
