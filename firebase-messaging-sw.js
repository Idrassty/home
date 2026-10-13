importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCTKpx5ozSXtln0TmjNbzLrCYCoxRn8RnI",
  authDomain: "the-pub---gc.firebaseapp.com",
  projectId: "the-pub---gc",
  storageBucket: "the-pub---gc.firebasestorage.app",
  messagingSenderId: "862303550078",
  appId: "1:862303550078:web:54a2f29a3cf5ab5d56f62f"
});
const messaging = firebase.messaging();

// Shows the notification when the app is closed or in the background
messaging.onBackgroundMessage(payload => {
  const d = payload.data || {};
  const isCall = d.type === 'call';
  return self.registration.showNotification(d.title || 'Study Study', {
    body: d.body || '',
    tag: d.tag || 'msg',
    renotify: true,
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: isCall ? [500, 250, 500, 250, 500] : [120],
    requireInteraction: isCall,
    data: { url: './' }
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if ('focus' in c) return c.focus();
    return clients.openWindow((e.notification.data && e.notification.data.url) || './');
  }));
});
