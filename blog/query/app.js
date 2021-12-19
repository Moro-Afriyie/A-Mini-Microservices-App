const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = {};

// example
// posts === {
//     "12345": {
//         id: "12345",
//         title: "post titile",
//         comments: [
//             {id: "123er", content: "comment"}
//         ]
//     }
// }

// route to send back the posts and comments of a particular post
app.get("/posts", (req, res) => {});

// route to listen to the event emitted by the event bus
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    // get the post
    const post = posts[postId];

    // update the comments database for that post
    post.comments.push({ id, content });
  }

  res.send({});
});

app.listen(6000, () => {
  console.log("sever listening on port 6000");
});
