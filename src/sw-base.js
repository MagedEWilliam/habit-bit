importScripts('./workbox-v5.1.4/workbox-sw.js')

workbox.routing.registerRoute(
    ({ event }) => event.request.mode === 'navigate',
    async () => {
        console.log('im here')
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
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);