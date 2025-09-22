const CACHE = 'meditrade-v1';
const CORE = ['/', '/manifest.webmanifest'];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Estrategias:
// - Navegación (HTML): network-first (para tener siempre la SPA al día)
// - Estáticos (JS/CSS/WEBP/PNG/SVG): stale-while-revalidate
self.addEventListener('fetch', (e) => {
    const req = e.request;
    const url = new URL(req.url);

    if (req.mode === 'navigate') {
        e.respondWith(
            fetch(req).then(res => {
                const copy = res.clone();
                caches.open(CACHE).then(c => c.put('/', copy));
                return res;
            }).catch(() => caches.match('/'))
        );
        return;
    }

    if (/\.(js|css|woff2?|webp|png|jpg|jpeg|svg)$/.test(url.pathname)) {
        e.respondWith(
            caches.match(req).then(cached => {
                const fetchPromise = fetch(req).then(res => {
                    const copy = res.clone();
                    caches.open(CACHE).then(c => c.put(req, copy));
                    return res;
                }).catch(() => cached);
                return cached || fetchPromise;
            })
        );
    }
});
