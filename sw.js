// BoToc Trading — Service Worker
// Network-first: always fetches fresh files, cache used for offline fallback only

const CACHE_NAME = 'botoc-v4';

// Install: skip waiting immediately so new SW activates right away
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Activate: clean up old caches and claim all clients immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - Non-GET → skip
// - Cross-origin (Supabase, goldprice, coingecko, fonts, etc.) → skip
// - Same-origin → network-first, cache as offline fallback
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request).then(response => {
      // Cache a copy of good responses for offline fallback
      if (response && response.status === 200 && response.type !== 'opaque') {
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
      }
      return response;
    }).catch(() => {
      // Network failed → serve from cache (offline mode)
      return caches.match(event.request);
    })
  );
});
