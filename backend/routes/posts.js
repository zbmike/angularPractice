const express = require("express");

const Post = require("../models/post");

const router = express.Router();

router.post("/", async (req, res, next) => {
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

router.get("/", async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find();
    res.status(200).json({
      message: "Fetch post successfully",
      posts,
    });
  } catch (error) {}
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {}
});

router.delete("/:id", async (req, res, next) => {
  try {
    result = await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Post deleted!" });
  } catch (error) {}
});

router.put("/:id", async (req, res, next) => {
  console.log(req.body.id);
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });
  try {
    await Post.updateOne({ _id: req.params.id }, post);
    res.status(200).json({ message: "Post updated successfully!" });
  } catch (error) {}
});

module.exports = router;
