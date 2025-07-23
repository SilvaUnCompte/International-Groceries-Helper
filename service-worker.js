const CACHE_NAME = "groceries-helper-cache-v1";
const urlsToCache = [
  "/",
  "/main.php",
  "/manifest.json",
  "/styles.css",
  "/scripts/app.js",
  "/scripts/calculator.js",
  "/scripts/cookie-manager.js",
  "/scripts/translations.js",
  "/components/calculator.php",
  "/components/settings.php",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
