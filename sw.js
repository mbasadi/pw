self.addEventListener("push", (event) => {
  if (!(self.Notification && self.Notification.permission === "granted")) {
    return;
  }

  const data = event.data?.json() ?? {};
  const title = data.title || "Something Has Happened";
  const message =
    data.message || "Here's something you might want to check out.";
  const icon = "images/new-notification.png";

  event.waitUntil(
    self.registration.showNotification(title, {
      body: message,
      tag: "simple-push-demo-notification",
      icon,
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://developer.mozilla.org/en-US/docs/Web/API/PushEvent")
  );
});
