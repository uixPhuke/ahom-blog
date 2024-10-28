const Tag = require("../models/tagSchema");

const tagCtrl = {
    // Get all tags
    getTags: async (req, res) => {
        try {
            const tags = await Tag.find();
            res.status(200).json(tags);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new tag
    createTag: async (req, res) => {
        const { name } = req.body;
        try {
            const newTag = new Tag({ name });
            await newTag.save();
            res.status(201).json(newTag);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update a tag
    updateTag: async (req, res) => {
        const { name } = req.body;
        try {
            const updatedTag = await Tag.findByIdAndUpdate(
                req.params.id,
                { name },
                { new: true }
            );
            if (!updatedTag) return res.status(404).json({ message: "Tag not found" });
            res.status(200).json(updatedTag);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a tag
    deleteTag: async (req, res) => {
        try {
            const tag = await Tag.findByIdAndDelete(req.params.id);
            if (!tag) return res.status(404).json({ message: "Tag not found" });
            res.status(200).json({ message: "Tag deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
