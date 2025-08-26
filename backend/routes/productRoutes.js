const express = require("express");
const router = express.Router();
const {protect, isAdmin} = require("../middleware/authMiddleware");

const {
  getProductsController,
  getProductController,
  addProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productController");

router.get("/", getProductsController);
router.get("/:id", getProductController);
router.post("/", protect, isAdmin, addProductController);
router.put("/:id",protect, isAdmin, updateProductController);
router.delete("/:id",protect, isAdmin, deleteProductController);

module.exports = router;
