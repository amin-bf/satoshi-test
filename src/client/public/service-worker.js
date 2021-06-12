const CACHE_NAME = "satoshi-v3";

const channel = new BroadcastChannel("satoshi-sw-messages");

// install
self.addEventListener("install", (event) => {
  channel.postMessage({ newWorker: true });

  //   self.skipWaiting();
});

// activate
self.addEventListener("activate", (event) => {
  console.log(event.request);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (CACHE_NAME !== cacheName) {
            console.log(cacheName, "cacheName");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

channel.onmessage = (event) => {
  if (event.data) {
    if (event.data.installConfirmed) {
      self.skipWaiting();
      channel.postMessage({ reload: true });
    }
  }
};
