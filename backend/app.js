const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({ message: "Post added successfully" });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "id1fkljvo453",
      title: "First post title",
      content: "The first post's content",
    },
    {
      id: "id2fk534o453",
      title: "Second post title",
      content: "The second post's content",
    },
    {
      id: "id3fkkm32453",
      title: "Third post title",
      content: "The third post's content",
    },
  ];
  res.status(200).json({
    message: "Fetch post successfully",
    posts,
  });
});

module.exports = app;
