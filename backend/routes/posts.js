const express = require("express");
const multer = require("multer");

const Post = require("../models/post");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

router.post(
  "/",
  multer({ storage }).single("image"),
  async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
    });
    try {
      const result = await post.save();
      res.status(201).json({
        message: "Post added successfully",
        post: {
          id: post._id,
          title: post.title,
          content: post.content,
          imagePath: post.imagePath,
        },
      });
    } catch (error) {}
  }
);

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

router.put(
  "/:id",
  multer({ storage }).single("image"),
  async (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      imagePath,
    });
    try {
      await Post.updateOne({ _id: req.params.id }, post);
      res.status(200).json({ message: "Post updated successfully!" });
    } catch (error) {}
  }
);

module.exports = router;
