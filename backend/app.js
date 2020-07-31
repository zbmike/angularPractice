const express = require("express");

const app = express();

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
