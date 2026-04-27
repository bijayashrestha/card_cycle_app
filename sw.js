// Card Cycle Manager - Service Worker v2
const CACHE_NAME = 'ccm-v2';

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      for (const c of list) { if (c.url && 'focus' in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow('./');
    })
  );
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(e.data.title, {
      body: e.data.body,
      tag: e.data.tag || 'ccm',
      icon: 'https://cdn.jsdelivr.net/npm/twemoji@14/2/72x72/1f4b3.png',
      badge: 'https://cdn.jsdelivr.net/npm/twemoji@14/2/72x72/1f4b3.png',
      vibrate: [200, 100, 200],
      requireInteraction: e.data.urgent || false,
    });
  }
});
