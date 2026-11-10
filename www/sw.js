const CACHE_NAME = 'clicker-game-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/click-btn.svg',
  '/coin-icon.svg',
  '/shop-btn.svg',
  '/stats-btn.svg',
  '/app-icon.svg',
  '/manifest.json'
];

// Установка service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Кэш открыт');
        return cache.addAll(urlsToCache);
      })
  );
});

// Обработка запросов
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Возвращаем кэшированный ответ
        if (response) {
          return response;
        }
        // Или делаем новый запрос
        return fetch(event.request);
      }
    )
  );
});

// Обновление кэша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Удаление старого кэша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
