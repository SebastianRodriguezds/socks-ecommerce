const express = require("express");
const router = express.Router();

const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('./productService');


const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/products', asyncHandler(async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
}));

router.get('/products/:id', asyncHandler(async (req, res) => {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
}));

app.post('/products', asyncHandler(async (req, res) => {
    const imageUrl = req.body.image ? `http://localhost:${PORT}/uploads/${req.body.image}` : null;
    const newProduct = await addProduct({ ...req.body, image: imageUrl });
    res.status(201).json(newProduct);
}));

app.put('/products/:id', asyncHandler(async (req, res) => {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
}));

app.delete('/products/:id', asyncHandler(async (req, res) => {
    const deletedProduct = await deleteProduct(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(deletedProduct);
}));

module.exports = router;