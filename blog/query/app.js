const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route to send back the posts and comments of a particular post
app.get("/posts", (req, res) => {});

// route to listen to the event emitted by the event bus
app.post("/events", (req, res) => {});

app.listen(6000, () => {
  console.log("sever listening on port 6000");
});
