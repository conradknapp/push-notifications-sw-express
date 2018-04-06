if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("sw.js")
    .then(registration => {
      askPermission()
        .then(() => {
          const options = {
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          };
          return registration.pushManager.subscribe(options);
        })
        .then(pushSubscription => {
          const subscription = JSON.stringify(pushSubscription);
          sendToServer(subscription);
        });
    })
    .catch(err => console.warn(err));
}

const askPermission = () => {
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission(result => {
      resolve(result);
    });
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(permissionResult => {
    if (permissionResult !== "granted") {
      console.warn("Permission denied");
    }
  });
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const vapidPublicKey =
  "BJhMsPA8EKF3O1CE4lh8iZd7ykSeLca40vexzYK5PAZM4rLK3jnva5PhyXJKwmI_pLhiFzT5nJ8pZ0dc_AXfrnc";
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

const sendToServer = subscription => {
  return fetch("/api/subscription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: subscription
  })
    .then(res => res.json())
    .then(({ data }) => console.log(data));
};
