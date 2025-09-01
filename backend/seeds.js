require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const productsData = [
  {
    name: "Red Socks",
    description:
      "Comfy red socks for everyday wear, made with breathable cotton that keeps your feet fresh and comfortable throughout the day.",
    price: 9.99,
    image: "/uploads/media1.jpg",
    category: "Socks",
  },
  {
    name: "Blue Socks",
    description:
      "Stylish blue socks designed with a soft texture and durable stitching, perfect for both casual and formal outfits.",
    price: 12.5,
    image: "/uploads/media2.jpg",
    category: "Socks",
  },
  {
    name: "Green Socks",
    description:
      "Eco-friendly green socks made from sustainable materials, offering maximum comfort while caring for the environment.",
    price: 11.0,
    image: "/uploads/media3.jpg",
    category: "Socks",
  },
  {
    name: "Black T-Shirt",
    description:
      "Classic black t-shirt made with premium cotton, soft to the touch, breathable, and versatile for everyday wear.",
    price: 19.99,
    image: "/uploads/media4.jpg",
    category: "Clothing",
  },
  {
    name: "White T-Shirt",
    description:
      "Comfortable white t-shirt with a modern cut, durable fabric, and lightweight feel, ideal for layering or solo wear.",
    price: 18.5,
    image: "/uploads/media5.jpg",
    category: "Clothing",
  },
  {
    name: "Denim Jeans",
    description:
      "High-quality denim jeans with a slim fit, reinforced stitching, and a timeless style suitable for any occasion.",
    price: 49.99,
    image: "/uploads/media6.jpg",
    category: "Clothing",
  },
  {
    name: "Running Shoes",
    description:
      "Lightweight running shoes with cushioned soles and breathable mesh, designed for maximum comfort and performance.",
    price: 75.0,
    image: "/uploads/media7.jpg",
    category: "Shoes",
  },
  {
    name: "Leather Jacket",
    description:
      "Premium leather jacket with a stylish design, smooth lining, and durable zippers, offering both comfort and elegance.",
    price: 120.0,
    image: "/uploads/media8.jpg",
    category: "Clothing",
  },
  {
    name: "Baseball Cap",
    description:
      "Adjustable baseball cap with breathable fabric, curved visor, and classic style, perfect for sunny days or casual outfits.",
    price: 15.0,
    image: "/uploads/media9.jpg",
    category: "Accessories",
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    await Product.deleteMany({});
    console.log("Products collection cleared");

    const inserted = await Product.insertMany(productsData);
    console.log(`Inserted ${inserted.length} products`);

    mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (err) {
    console.log("Error seeding DB:", err);
    mongoose.disconnect();
  }
}

seedDB();
