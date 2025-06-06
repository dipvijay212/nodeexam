const express = require("express");
const router = express.Router();
const {  registerUser, loginUser, logoutUser } = require("../controllers/user.controller"); 
const rateLimiter = require("../middlewares/rateLimiter.middleware")

// Register route
router.post("/register",rateLimiter, registerUser);
router.post("/login",rateLimiter, loginUser);
router.post("/logout", logoutUser);
module.exports = router;
