const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", express.static("/"));
app.use("/public", express.static(path.join(__dirname, "public")));

const webpush = require("web-push");

const PUBLIC_KEY =
  "BJhMsPA8EKF3O1CE4lh8iZd7ykSeLca40vexzYK5PAZM4rLK3jnva5PhyXJKwmI_pLhiFzT5nJ8pZ0dc_AXfrnc";
const PRIVATE_KEY = "6GVZO0PmVa2ExHAuBlAVpYHJOr0JunNHVh9L62N0Z94";

const vapidKeys = {
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY
};

webpush.setVapidDetails(
  "mailto:my@email.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/sw.js", (req, res) => {
  res.set("Content-Type", "application/javascript");
  const input = fs.createReadStream(`${__dirname}/sw.js`);
  input.pipe(res);
});

app.post("/api/subscription", (req, res) => {
  const dataToSend = "hello there";
  const pushSubscription = req.body;

  res.json({ data: pushSubscription });
  webpush
    .sendNotification(pushSubscription, dataToSend)
    .then(() => {
      // res.sendStatus(201);
    })
    .catch(function(error) {
      // res.sendStatus(500);
      console.log(error);
    });
});

app.listen(4000, () => {
  console.log("Listening");
});
