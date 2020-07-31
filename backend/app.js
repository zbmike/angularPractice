const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const Post = require("./models/post");

const app = express();

mongoose
  .connect(process.env.MONGODB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(() => {
    console.log("Connect to DB failed!");
  });

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

app.post("/api/posts", async (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const result = await post.save();
    res
      .status(201)
      .json({ message: "Post added successfully", postId: result._id });
  } catch (error) {}
});

app.get("/api/posts", async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find();
    res.status(200).json({
      message: "Fetch post successfully",
      posts,
    });
  } catch (error) {}
});

app.delete("/api/posts/:id", async (req, res, next) => {
  try {
    result = await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Post deleted!" });
  } catch (error) {}
});

module.exports = app;
