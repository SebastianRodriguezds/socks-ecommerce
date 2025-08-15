require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const productsData = [
    {
        name: "Red Socks",
        description: "Comfy red socks for everyday wear",
        price: 9.99,
        image: "http://localhost:5000/uploads/media1.jpg",
        category: "Socks"
    },
    {
        name: "Blue Socks",
        description: "Stylish blue socks",
        price: 12.5,
        image: "http://localhost:5000/uploads/media2.jpg",
        category: "Socks"
    },
    {
        name: "Green Socks",
        description: "Eco-friendly green socks",
        price: 11.0,
        image: "http://localhost:5000/uploads/media3.jpg",
        category: "Socks"
    }
];

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected");
        
        await Product.deleteMany({});
        console.log("Products collection cleared");

        const inserted = await Product.insertMany(productsData);
        console.log(`Inserted ${inserted.length} products`);

        mongoose.disconnect();
        console.log("MongoDB disconnected");
    }    catch (err) {
        console.log("Error seeding DB:", err);
        mongoose.disconnect();
    }
}

seedDB();