const express = require("express");
const router = express.Router();

const {
  getProductsController,
  getProductController,
  addProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productController");

router.get("/", getProductsController);
router.get("/:id", getProductController);
router.post("/", addProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

module.exports = router;
