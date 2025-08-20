const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile, ForgotPassword } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post("/forgot-password", ForgotPassword)

module.exports = router;
