const express = require("express");
const router = express.Router();
const notificationCtrl = require("../controller/notificationCtrl");

// Get all notifications
router.get("/notifications", notificationCtrl.getNotifications);

// Create a notification
router.post("/notifications", notificationCtrl.createNotification);

// Mark a notification as read
router.put("/notifications/:id/read", notificationCtrl.markAsRead);

// Delete a notification
router.delete("/notifications/:id", notificationCtrl.deleteNotification);

module.exports = router;
