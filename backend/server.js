const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

//// Endpoint for list products
app.get('/products', (req, res) => {
    res.json(products);
});

// Endpoint for particular product by id
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`));