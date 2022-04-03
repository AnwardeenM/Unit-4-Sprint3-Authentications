const express = require("express");

const Post = require("../models/posts.model");

const Authenticate = require("../middleware/authendicate");

const router = express.Router();

router.post("/", Authenticate, async (req, res) => {
  try {
    const user = req.user;

    const posts = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user: user.user._id,
    });

    return res.status(201).json({ posts });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/",Authenticate, async (req, res) => {
  const posts = await Post.find().lean().exec();

  return res.send(posts);
});

module.exports = router;