const express = require("express");
const router = express.Router();
const { addOrder, getMyOrders, getOrderById } = require("../controllers/orderController");
const {createStripeSession} = require("../controllers/paymentController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/", protect, addOrder);

router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

router.post("/stripe", protect, createStripeSession);

router.get("/all", protect, isAdmin, getAllOrdersController);

module.exports = router;
