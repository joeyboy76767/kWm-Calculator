// This service worker satisfies the install criteria but completely disables caching
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
});

// EVERY TIME THE APP OPENS: Vaporizes old cache and takes control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          console.log('Vaporizing old data and cache:', cache);
          return caches.delete(cache); 
        })
      );
    }).then(() => self.clients.claim()) // <--- TAKES IMMEDIATE CONTROL
  );
});

// Always forces both the PWA and APK to stream live from your GitHub URL
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request)); 
});
