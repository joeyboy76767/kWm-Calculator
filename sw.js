const CACHE_NAME = 'sae-calc-v1';
const ASSETS = [
  '',
  'Open-Meteo.html',
  'manifest.json',
  'app-icon.png'
];

// Installs the service worker and caches your project files for offline use
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Controls network requests so the app launches instantly without internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
