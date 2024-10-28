const express = require("express");
const router = express.Router();
const subscriber = require("../controllers/subscriberController");

// Get all subscribers
router.get("/subscribers", subscriberController.getSubscribers);

// Add a new subscriber
router.post("/subscribers", subscriberController.addSubscriber);

// Remove a subscriber
router.delete("/subscribers/:id", subscriberController.removeSubscriber);

module.exports = router;
