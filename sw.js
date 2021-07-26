const CACHE_NAME = "cache_pelis";
const urlsToCache = [
  "./",
  "./?umt_source=web_app_manifest",
  "./pages/fallback.html",
  "./img/icon48x48.png",
  "./img/icon64x64.png",
  "./img/icon128x128.png",
  "./img/icon256x256.png",
  "./img/icon512x512.png",
  "./img/icon1024x1024.png",
  "./img/icon2048x2048.png",
  "./js/main.js",
  "./js/mountApp.js",
  "./manifest.json",
  "https://unpkg.com/vue@next",
  "./css/main.css",
  "./css/normalized.css"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache
        .addAll(urlsToCache)
        .then(() => self.skipWaiting()
        ).catch((err) => console.log(err))
    )
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        if (res) {
          return res;
        }

        return fetch(e.request);
      })
      .catch(() => caches.match("./pages/fallback.html"))
  );
});

