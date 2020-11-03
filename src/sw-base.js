importScripts('./workbox-v5.1.4/workbox-sw.js')

workbox.routing.registerRoute(
    ({ event }) => event.request.mode === 'navigate',
    async () => {
      const defaultBase = '/index.html';
      return caches
        .match(workbox.precaching.getCacheKeyForURL(defaultBase))
        .then(response => {
            return response || fetch(defaultBase);
        })
        .catch(err => {
          return fetch(defaultBase);
        });
    }
  );
  
  workbox.routing.registerRoute(
    '/build/app.esm.js',
    new workbox.strategies.CacheFirst({
      cacheName: 'html-cache'
    })
  );
  
  workbox.routing.registerRoute(
    '/build/app.css',
    new workbox.strategies.CacheFirst({
      cacheName: 'html-cache'
    })
  );

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);