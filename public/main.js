if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(res => {
      if (res.installing) {
        console.log("SW Installing");
      } else if (res.waiting) {
        console.log("SW Installed");
      } else if (res.active) {
        console.log("SW Active");
      }
    })
    .catch(err => console.log(err));
}
