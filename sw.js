// Red primero (comprobando siempre si hay versión nueva), caché como respaldo para jugar sin conexión.
const CACHE = 'mariners16-v30';
const FILES = ['./', 'index.html', 'game.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png',
  'img-equipo.png', 'escudos/barceloneta.png', 'escudos/montcada.png',
  ...Array.from({length: 29}, (_, i) => `caras/cara-${String(i + 1).padStart(2, '0')}.png`)];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, {cache: 'reload'})))).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // 'no-cache' = preguntar siempre al servidor (evita mezclar archivos viejos y nuevos de la caché del navegador)
  e.respondWith(fetch(req.url, {cache: 'no-cache', credentials: 'same-origin'})
    .then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(ca => ca.put(req, c)); } return r; })
    .catch(() => caches.match(req, {ignoreSearch: true})));
});
