const Order = require("../models/Order");

const addOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if(!orderItems || orderItems.length === 0)
        return res.status(400).json ({message: "No order items"});

    try{
        const order = new Order({
            user: req.user._id, //from authMiddle
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }catch (err) {
        res.status(500).json({message: "Error creating order", error: err.message});
    }
};

const getMyOrders = async (req, res)=> {
    try{
        const orders = await Order.find({user: req.user._id});
        res.json(orders);
    }catch (error) {
        res.status(500).json({message: "Error fetching orders", error: error.message});
    }
};

const getOrderById = async (req, res)=> {
    try{
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if(order) {
            if (order.user._id.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: "Not authorized to view this order"});
            }
            res.json(order);
        }else{
            res.status(404).json({message: "Order nor found"});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error"});
    }
};
 
module.exports = {
    addOrder,
    getMyOrders,
    getOrderById,
};
