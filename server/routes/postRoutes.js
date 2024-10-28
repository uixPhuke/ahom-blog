const express = require("express");
const router = express.Router();
const postCtrl = require("../controller/postCtrl");

// Get all posts
router.get("/posts", postCtrl.getPosts);

// Get a post by ID
router.get("/posts/:id", postCtrl.getPostById);

// Create a new post
router.post("/posts", postCtrl.createPost);

// Update post details
router.put("/posts/:id", postCtrl.updatePost);

// Delete a post
router.delete("/posts/:id", postCtrl.deletePost);

module.exports = router;
