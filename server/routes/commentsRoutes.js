const express = require("express");
const router = express.Router();
const commentCtrl = require("../controller/commentCtrl");

// Get all comments
router.get("/comments", commentCtrl.getComments);

// Get a comment by ID
router.get("/comments/:id", commentCtrl.getCommentById);

// Create a new comment
router.post("/comments", commentCtrl.createComment);

// Update comment details
router.put("/comments/:id", commentCtrl.updateComment);

// Delete a comment
router.delete("/comments/:id", commentCtrl.deleteComment);

module.exports = router;
