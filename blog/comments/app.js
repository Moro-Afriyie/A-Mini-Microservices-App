const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: id, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen("4000", () => {
  console.log("Server is Listening on Port 4000");
});
