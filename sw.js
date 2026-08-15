/* * TheBukitBesi PWA SW (classic) - GitHub Pages safe, no external imports */
const VERSION = 'v1.0.4';
const STATIC_CACHE = `tbb-static-${VERSION}`;
const RUNTIME_CACHE = `tbb-runtime-${VERSION}`;
const OFFLINE_URL = './offline.html';

const PRECACHE_URLS = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './pwa/assets/src/icon-192.png',
  './pwa/assets/src/icon-512.png',
  './styles.css'
];

// ---- Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ---- Activate (Cleanup old caches)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (![STATIC_CACHE, RUNTIME_CACHE].includes(key)) {
          return caches.delete(key);
        }
      }));
    }).then(() => self.clients.claim())
  );
});

// ---- Fetch (Crucial Missing Link for Offline Mode)
self.addEventListener('fetch', (event) => {
  // Only handle same-origin or specific asset requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((networkResponse) => {
            // Cache valid responses dynamically
            if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
              const responseToCache = networkResponse.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Return offline fallback page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
          });
      })
    );
  }
});
