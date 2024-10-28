const express = require("express");
const router = express.Router();
const mediaCtrl = require("../controller/mediaCtrl");

// Get all media files
router.get("/media", mediaCtrl.getMedia);

// Get media file by ID
router.get("/media/:id", mediaCtrl.getMediaById);

// Upload a new media file
router.post("/media", mediaCtrl.uploadMedia);

// Update media details
router.put("/media/:id", mediaCtrl.updateMedia);

// Delete a media file
router.delete("/media/:id", mediaCtrl.deleteMedia);

module.exports = router;
