require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require("morgan");

const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Server error" });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

const startServer = async() => {
    await connectDB();
    app.listen(PORT, ()=>{
        console.log(`Server running at http://localhost: ${PORT}`)
    });
};

startServer();
