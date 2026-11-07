// Red primero, caché como respaldo (para jugar sin conexión)
const CACHE = 'mariners16-v26';
const FILES = ['./', 'index.html', 'game.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png',
  'img-equipo.png', 'escudos/barceloneta.png', 'escudos/montcada.png',
  ...Array.from({length: 29}, (_, i) => `caras/cara-${String(i + 1).padStart(2, '0')}.png`)];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok && new URL(e.request.url).origin === location.origin) { const c = r.clone(); caches.open(CACHE).then(ca => ca.put(e.request, c)); } return r; })
    .catch(() => caches.match(e.request)));
});
