const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../productService");

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const getProductsController = asyncHandler(async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
});

const getProductController = asyncHandler(async (req, res) => {
  const product = await getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

const addProductController = asyncHandler(async (req, res) => {
  const newProduct = await addProduct(req.body);
  res.status(201).json(newProduct);
});

const updateProductController = asyncHandler(async (req, res) => {
  const updatedProduct = await updateProduct(req.params.id, req.body);
  if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
  res.json(updatedProduct);
});

const deleteProductController = asyncHandler(async (req, res) => {
  const deletedProduct = await deleteProduct(req.params.id);
  if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
  res.json(deletedProduct);
});

module.exports = {
  getProductsController,
  getProductController,
  addProductController,
  updateProductController,
  deleteProductController,
};
