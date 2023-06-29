self.addEventListener('push', (event) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  console.log(event);

  const data = event.data?.json() ?? {};
  const title = data.title || 'Something Has Happened';
  const message = data.message || 'Here\'s something you might want to check out.';
  const icon = data.icon||'images/new-notification.png';
  const tag = data.tag||'simple-push-Tag';
  const clickURL=data.url||'https://datatracker.ietf.org/doc/html/rfc8292#section-2.1';

  event.waitUntil(
    self.registration.showNotification(title, {
      actions: [
        {
          action: "click",
          title:clickURL,
        },
      ],
      body: message,
      tag,
      icon,
      data: { url: clickURL }, // Add this line to store the clickURL
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const clickURL = event.notification.data.url; // Retrieve the URL from the notification data

  event.waitUntil(
    clients.openWindow(clickURL) // Open the clickURL when notification is clicked
  );
});
