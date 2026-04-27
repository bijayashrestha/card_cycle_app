// Card Cycle Manager - Service Worker
const CACHE_NAME = 'ccm-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Handle notification click - open the app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});

// Listen for messages from the main app
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIFICATION') {
    const { title, body, tag } = e.data;
    self.registration.showNotification(title, {
      body,
      tag,
      icon: 'https://cdn.jsdelivr.net/npm/twemoji@14/2/72x72/1f4b3.png',
      badge: 'https://cdn.jsdelivr.net/npm/twemoji@14/2/72x72/1f4b3.png',
      vibrate: [200, 100, 200],
      requireInteraction: false,
    });
  }
});
