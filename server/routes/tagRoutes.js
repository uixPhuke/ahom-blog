const express = require("express");
const router = express.Router();
const tagCtrl = require("../controller/tagCtrl");

// Get all tags
router.get("/tags", tagCtrl.getTags);

// Create a new tag
router.post("/tags", tagCtrl.createTag);

// Update a tag
router.put("/tags/:id", tagCtrl.updateTag);

// Delete a tag
router.delete("/tags/:id", tagCtrl.deleteTag);

module.exports = router;
