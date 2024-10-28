const Post = require("../models/postSchema");


const postCtrl = {
    // Get all posts
    getPosts : async (req, res) => {
        try {
            const posts = await Post.find().populate("author", "username");
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a post by ID
    getPostById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).populate(
                "author",
                "username"
            );
            if (!post) return res.status(404).json({ message: "Post not found" });
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new post
    createPost: async (req, res) => {
        const { title, content, author } = req.body;
        try {
            const newPost = new Post({ title, content, author });
            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a post
    updatePost: async (req, res) => {
        const { title, content } = req.body;
        try {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                { title, content },
                { new: true }
            );
            if (!updatedPost)
                return res.status(404).json({ message: "Post not found" });
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a post
    deletePost: async (req, res) => {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);
            if (!post) return res.status(404).json({ message: "Post not found" });
            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports=postCtrl
