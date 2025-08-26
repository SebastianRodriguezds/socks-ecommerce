const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripeController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create-session",protect, stripeController.createCheckoutSession);

module.exports = router;
