/* eslint-disable */
// Service Worker for India Toolkit PWA

const CACHE_NAME = 'india-toolkit-v3.2.1';
const PRECACHE_URLS = [
  '/',
  '/offline',
  '/manifest.json',
  '/favicon.ico',
];

const RUNTIME_CACHE_URLS = [
  '/tools',
  '/api/tools',
];

// Install event - pre-cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error('Pre-cache failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network-first for API, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // API requests - network first
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone response for caching
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || new Response(JSON.stringify({ error: 'Offline' }), {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
            });
          });
        })
    );
    return;
  }

  // Tool pages - network-first with offline fallback
  if (request.url.includes('/tool/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          return caches.match('/offline').then((response) => response || caches.match('/'));
        })
    );
    return;
  }

  // Static assets - cache-first strategy
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'worker' ||
    (request.destination === 'document' && !request.url.includes('/tool/'))
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });

            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/offline');
            }
          });
      })
    );
  }
});

// Background sync for deferred actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-tool-usage') {
    event.waitUntil(syncToolUsage());
  }
});

// Periodic sync for cache updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCache());
  }
});

async function syncToolUsage() {
  const pendingActions = await getPendingActions();
  
  for (const action of pendingActions) {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action),
      });
      await removePendingAction(action.id);
    } catch (error) {
      console.error('Failed to sync action:', error);
    }
  }
}

async function updateCache() {
  const cache = await caches.open(CACHE_NAME);
  const requests = PRECACHE_URLS.map(url => new Request(url));
  
  await cache.addAll(requests);
}

async function getPendingActions() {
  return [];
}

async function removePendingAction(id) {
  // Implementation would go here
}

// Push notification handler
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  
  const options = {
    body: data.body || 'Check out the latest tools on India Toolkit!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
    },
    actions: [
      {
        action: 'open',
        title: 'Open',
        icon: '/icons/icon-192.png',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'India Toolkit', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const url = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      const existingClient = windowClients.find((client) => client.url === url);
      
      if (existingClient) {
        return existingClient.focus();
      }
      
      return clients.openWindow(url);
    })
  );
});
