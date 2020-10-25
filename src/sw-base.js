importScripts('./workbox-v5.1.4/workbox-sw.js')
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);