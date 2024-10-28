const Like = require("../models/likeSchema");

const likeCtrl = {
    // Get all likes
    getLikes: async (req, res) => {
        try {
            const likes = await Like.find().populate("postId userId", "title username");
            res.status(200).json(likes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Add a like
    addLike: async (req, res) => {
        const { postId, userId } = req.body;
        try {
            const newLike = new Like({ postId, userId });
            await newLike.save();
            res.status(201).json(newLike);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Update reaction on a like

    updateReaction : async (req, res) => {
  const { postId, userId, reaction } = req.body;
  try {
    const like = await Like.findOneAndUpdate(
      { postId, userId },
      { reaction },
      { new: true }
    );
    if (!like) return res.status(404).json({ message: 'Like not found' });
    res.status(200).json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

    // Remove a like
    removeLike: async (req, res) => {
        const { postId, userId } = req.body;
        try {
            const like = await Like.findOneAndDelete({ postId, userId });
            if (!like) return res.status(404).json({ message: "Like not found" });
            res.status(200).json({ message: "Like removed" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports=likeCtrl
