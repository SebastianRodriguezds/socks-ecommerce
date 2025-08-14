require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('./productService');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

app.get('/products', asyncHandler(async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
}));

app.get('/products/:id', asyncHandler(async (req, res) => {
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

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Server error" });
});

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    }
}

startServer();
