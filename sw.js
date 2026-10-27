const CACHE_NAME = 'esencia-del-mar-v3'; // Cambiamos la versión a v3 para forzar actualización
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  './img/rosa-silvestre.jpeg',
  './img/limon-maritimo.jpeg',
  './img/lavanda-serena.jpeg',
  './img/canela-costera.jpeg',
  './img/naranja-solar.jpeg',
  './img/eucalipto-marino.jpeg',
  './img/brisa-de-acantilado.jpeg',
  './img/atardecer-en-la-playa.jpeg'
];

// Instalación y limpieza de cachés antiguos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Elimina la versión v1 vieja
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia: Red primero, si falla usa caché (Network First)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
