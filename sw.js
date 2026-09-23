const CACHE_NAME = 'esencia-mar-v1';
const urlsToCache = [
  './',
  './index.html',
  './rosa-silvestre.html',
  './limon-maritimo.html',
  './lavanda-serena.html',
  './eucalipto-marino.html',
  './canela-costera.html',
  './brisa-de-acantilado.html',
  './naranja-solar.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
