const Media = require("../models/mediaSchema");


const mediaCtrl = {
    // Get all media files
    getMedia: async (req, res) => {
        try {
            const media = await Media.find().populate("userId", "username");
            res.status(200).json(media);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a media file by ID
    getMediaById: async (req, res) => {
        try {
            const media = await Media.findById(req.params.id).populate(
                "userId",
                "username"
            );
            if (!media) return res.status(404).json({ message: "Media not found" });
            res.status(200).json(media);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Upload a new media file
    uploadMedia: async (req, res) => {
        const { url, type, title, description, userId } = req.body;
        try {
            const newMedia = new Media({ url, type, title, description, userId });
            await newMedia.save();
            res.status(201).json(newMedia);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Update media details
    updateMedia: async (req, res) => {
        const { url, type, title, description, userId } = req.body;
        try {
            const updatedMedia = await Media.findByIdAndUpdate(
                req.params.id,
                { url, type, title, description, userId },
                { new: true }
            );
            if (!updatedMedia)
                return res.status(404).json({ message: "Media not found" });
            res.status(200).json(updatedMedia);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a media file
    deleteMedia: async (req, res) => {
        try {
            const media = await Media.findByIdAndDelete(req.params.id);
            if (!media) return res.status(404).json({ message: "Media not found" });
            res.status(200).json({ message: "Media deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports=mediaCtrl
