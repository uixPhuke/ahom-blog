const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controller/categoryCtrl");

// Get all categories
router.get("/categories", categoryCtrl.getCategories);

// Get a category by ID
router.get("/categories/:id", categoryCtrl.getCategoryById);

// Create a new category
router.post("/categories", categoryCtrl.createCategory);

// Update category details
router.put("/categories/:id", categoryCtrl.updateCategory);

// Delete a category
router.delete("/categories/:id", categoryCtrl.deleteCategory);

module.exports = router;
