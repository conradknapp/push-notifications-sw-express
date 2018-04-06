# Push Notifications with Service Worker and Express

In this repo, I've set up push notifications with a service worker and an Express server. Here is the simplified flow:

0) We register a service worker
1) The service worker/browser asks user if they want notifications.
2) The user says yes (obviously)
3) In the promise upon registration, we encode a public key that will be sent as an object and then verified on the server
4) We make a post request to an endpoint on our server
5) We use the web-push library to send a notification upon successfully receiving/handling the post request (with a given payload)
6) The service worker listens for the push event and likely uses the notifications API to display the payload from the server

## Helpful Resources

- [web-push for Express docs](https://github.com/web-push-libs/web-push)
- [Push Manager, MDN](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe)
- [Service Worker Cookbook - MDN (Uses the web-push library extensively)](https://serviceworke.rs/push-simple_server_doc.html)
- [web-push CodeLab for Setting Up Public/Private Keys](https://web-push-codelab.glitch.me/)