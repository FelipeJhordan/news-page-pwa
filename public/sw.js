/* eslint-disable no-restricted-globals */
var CACHE_NAME = 'pwa-news'
var urlToCache = [
    '/',
    'index.html'
]
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlToCache)
        })
    )
})

self.addEventListener('active', event => {
    var cacheWhiteList = ['pwa-task-manager']
    event.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(response ){
                    cache.put(event.request, response.clone())
                })
            })
        })
    )
})