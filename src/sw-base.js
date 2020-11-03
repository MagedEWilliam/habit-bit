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
  workbox.routing.registerRoute('index.html', workbox.strategies.cacheFirst())

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);