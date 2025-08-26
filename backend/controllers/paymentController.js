const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createStripeSession = async (req, res) => {
    try{
        const {orderItems} = req.body;

        if (!orderItems || orderItems.length == 0) {
            return res.status(400).json({message: "No order items"});
        }

        console.log("Stripe orderItems:", orderItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: orderItems.map((item)=> ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.round(Number(item.price)*100),
                },
                quantity: Number(item.qty),
            })),
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ url: session.url });
    }catch (err) {
        console.log(err);
        res.status(500).json({message: "Stripe session error"});
    }
};

module.exports = {
    createStripeSession,
};