self.addEventListener("push", (event) => {
  const data = event.data.json();
  const title = data.notification.title;
  const options = {
    body: data.notification.body,
    icon: data.notification.icon,
    badge: data.notification.badge,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
