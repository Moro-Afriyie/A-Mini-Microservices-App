const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: id, content, staus: "pending" });

  commentsByPostId[req.params.id] = comments;

  // emit the event to the event bus
  await axios.post("http://localhost:7000/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      postId: req.params.id,
      staus: "pending",
    },
  });

  res.status(201).send(comments);
});

// route to listen to events
app.post("/events", async (req, res) => {
  console.log("Received Event: ", req.body.type);

  const { type, data } = req.body;
  if (type === "CommentModerated") {
    // get the comment by PostId and update the status
    const { id, postId, status, content } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    await axios.post("http://localhost:7000/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4000, () => {
  console.log("Server is Listening on Port 4000");
});
