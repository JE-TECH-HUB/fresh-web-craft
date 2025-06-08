
// Service Worker for caching static assets
const CACHE_NAME = 'medilab-v1';
const urlsToCache = [
    '/',
    '/css/bootstrap.min.css',
    '/css/custom.css',
    '/css/style.css',
    '/js/jquery.min.js',
    '/js/bootstrap.min.js',
    '/js/main.js',
    '/fonts/poppins-regular.woff2',
    '/fonts/poppins-semibold.woff2',
    '/fonts/poppins-bold.woff2'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// Clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
