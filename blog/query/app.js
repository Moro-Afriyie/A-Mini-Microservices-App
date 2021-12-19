const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    // get the post
    const post = posts[postId];

    // update the comments database for that post
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    // get the post
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    // update the comment
    comment.status = status;
    comment.content = content;
  }
};

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
app.get("/posts", (req, res) => {
  res.send(posts);
});

// route to listen to the event emitted by the event bus
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4005, async () => {
  console.log("sever listening on port 4005");

  //  make a request to the event bus and get all the events
  try {
    const res = await axios.get("http://localhost:7000/events");

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
