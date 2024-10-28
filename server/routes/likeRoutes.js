const express = require("express");
const router = express.Router();
const likeCtrl = require("../controller/likeCtrl");

// Get all likes
router.get("/likes", likeCtrl.getLikes);

// Add a like
router.post("/likes", likeCtrl.addLike);

// Update reaction on a like
router.put("/likes/reaction", likeCtrl.updateReaction);

// Remove a like
router.delete("/likes", likeCtrl.removeLike);

module.exports = router;
