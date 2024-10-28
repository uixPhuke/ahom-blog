const Comment = require("../models/commentSchema");

const commentCtrl = {
  // Get all comments
  getComments: async (req, res) => {
    try {
      const comments = await Comment.find().populate("userId", "username");
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a comment by ID
  getCommentById: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id).populate(
        "userId",
        "username"
      );
      if (!comment)
        return res.status(404).json({ message: "Comment not found" });
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new comment
  createComment: async (req, res) => {
    const { postId, userId, content } = req.body;
    try {
      const newComment = new Comment({ postId, userId, content });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update comment details
  updateComment: async (req, res) => {
    const { content } = req.body;
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        { content },
        { new: true }
      );
      if (!updatedComment)
        return res.status(404).json({ message: "Comment not found" });
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a comment
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment)
        return res.status(404).json({ message: "Comment not found" });
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all comments for a post
  getCommentsByPostId: async (req, res) => {
    try {
      const comments = await Comment.find({
        postId: req.params.postId,
      }).populate("userId", "username");
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = commentCtrl;
