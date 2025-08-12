const CACHE_NAME = "groceries-helper-cache-v2";
const urlsToCache = [
  "/",
  "/index.php",
  "/main.php",
  "/components/calculator.php",
  "/components/settings.php",
  "/manifest.json",
  "/styles/main.css",
  "/styles/popup.css",
  "/scripts/app.js",
  "/scripts/calculator.js",
  "/scripts/popup.js",
  "/scripts/storage-manager.js",
  "/scripts/translations.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Install the service worker and cache the necessary files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch resources from the cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        return response || caches.match("/offline.html");
      });
    })
  );
});