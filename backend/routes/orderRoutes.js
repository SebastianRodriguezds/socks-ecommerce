const express = require("express");
const router = express.Router();
const { addOrder, getMyOrders, getOrderById } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addOrder);

router.get("/myorders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);



module.exports = router;
