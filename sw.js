self.addEventListener("push", event =>
  event.waitUntil(
    self.registration.showNotification("Time Notification", {
      body: `The time is now ${new Date(Date.now()).toLocaleTimeString()}`
    })
  )
);
