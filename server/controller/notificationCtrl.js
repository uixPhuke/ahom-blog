const Notification = require("../models/notificationShema");


const notificationCtrl = {
    
    // Get all notifications
    getNotifications: async (req, res) => {
        try {
            const notifications = await Notification.find().populate(
                "userId",
                "username"
            );
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a notification
    createNotification: async (req, res) => {
        const { userId, message, read } = req.body;
        try {
            const newNotification = new Notification({ userId, message, read });
            await newNotification.save();
            res.status(201).json(newNotification);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Mark a notification as read
    markAsRead: async (req, res) => {
        try {
            const notification = await Notification.findByIdAndUpdate(
                req.params.id,
                { read: true },
                { new: true }
            );
            if (!notification)
                return res.status(404).json({ message: "Notification not found" });
            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a notification
    deleteNotification: async (req, res) => {
        try {
            const notification = await Notification.findByIdAndDelete(req.params.id);
            if (!notification)
                return res.status(404).json({ message: "Notification not found" });
            res.status(200).json({ message: "Notification deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports=notificationCtrl
