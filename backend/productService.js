const fs = require('fs')
const path = './data/products.json';

const Product = require('./models/Product');

const getAllProducts = async ()=>{ 
    return await Product.find()
}

const getProductById = async (id)=>{ 
    return await Product.findById(id);
};

const addProduct = async (data)=>{ 
    const newProduct = new Product(data);
    return await newProduct.save();
};

const updateProduct = async (id, updatedFields)=>{ 
    return await Product.findByIdAndUpdate(id, updatedFields, {new: true});
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct}