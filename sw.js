const CACHE_NAME = "keiko-v25";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=22",
  "./app.js?v=18",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./assets/fonts/JetBrainsMono-Regular.woff2",
  "./assets/fonts/JetBrainsMono-Bold.woff2"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith("keiko-") && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("./")));
    return;
  }

  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
