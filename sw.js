self.addEventListener('push', (event) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const data = event.data?.json() ?? {};
  const title = data.title || 'Something Has Happened';
  const message = data.message || 'Here\'s something you might want to check out.';
  const icon = data.icon||'images/new-notification.png';
  const tag = data.tag||'simple-push-Tag';

  // Log the URL of each client this service worker controls
  clients.matchAll({ includeUncontrolled: true, type: 'window' })
    .then(windowClients => {
      windowClients.forEach(windowClient => {
        console.log(windowClient.url);
      });
    });

  event.waitUntil(
    self.registration.showNotification(title, {
      body: message,
      tag,
      icon,
    })
  );
  event.waitUntil(
    console.log(title)
  )
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  
  // Log the URL of each client this service worker controls
  clients.matchAll({ includeUncontrolled: true, type: 'window' })
    .then(windowClients => {
      windowClients.forEach(windowClient => {
        console.log(windowClient.url);
      });
    });

  event.waitUntil(
    clients.openWindow('https://developer.mozilla.org/en-US/docs/Web/API/PushEvent')
  );
});
