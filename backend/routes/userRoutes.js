const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile, ForgotPassword, updateCart, getCart, getUsersController } = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

router.post("/forgot-password", ForgotPassword)
router.put("/cart", protect, updateCart);
router.get("/cart", protect, getCart);

router.get("/admin", protect, isAdmin, getUsersController);

module.exports = router;
