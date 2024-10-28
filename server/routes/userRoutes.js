const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/userCtrl");

// Get all users
router.get("/user/info", userCtrl.getUsers);

// Get a user by ID
router.get("/user/:id", userCtrl.getUserById);

// Create a new user
router.post("/user/register", userCtrl.registerUser);
// login user
router.post("/user/login", userCtrl.loginUser);
router.post("/user/logout", userCtrl.logoutUser);

// Update user details
router.put("/user/update/:id", userCtrl.updateUser);
router.get("/user/refresh_token", userCtrl.refreshtoken);

// Delete a user
router.delete("/user/:id", userCtrl.deleteUser);

router.post('/user/google',userCtrl.signInGoogle)

module.exports = router;
