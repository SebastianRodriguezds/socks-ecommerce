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

// Upload product
app.post('/products', (req, res)=> {
    const imageName = req.body.image;
    const imageUrl = imageName ? `http://localhost:5000/uploads/${imageName}`: null;

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.imageUrl,
        category: req.body.category
    };
    products.push(newProduct);
    fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

//Update product
app.put('/products/:id', (req, res)=>{
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) return res.status(404).json({message: "Product not found"});

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.image = req.body.image ?? product.image;

    fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
    res.json(product)
});

//delete product
app.delete('/products/:id', (req, res)=> {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({message: "Product not found"});

    const deletedProduct  = products.splice(index, 1)[0];
    fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
    res.json(deletedProduct)
});

//socks images
app.use('/uploads', express.static('uploads'));


app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`));