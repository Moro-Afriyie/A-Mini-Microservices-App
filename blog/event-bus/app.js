const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/events", (req, res) => {
  const event = req.body;

  // posts service
  axios
    .post("http://localhost:5000/events", event)
    .catch((err) => console.log(err));

  // comments service
  axios
    .post("http://localhost:4000/events", event)
    .catch((err) => console.log(err));

  //query service
  axios
    .post("http://localhost:4005/events", event)
    .catch((err) => console.log(err));

  //moderation service
  axios
    .post("http://localhost:4006/events", event)
    .catch((err) => console.log(err));

  res.send({ status: "OK" });
});

app.listen(7000, () => {
  console.log("sever is listening on port 7000");
});
