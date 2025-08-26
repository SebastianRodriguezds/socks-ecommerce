const Stripe = require("stripe");
const Order = require("../models/Order");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Crear sesión de checkout
exports.createCheckoutSession = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    const userId = req.user._id;

    console.log("Frontend envió paymentMethod:", paymentMethod);
    console.log("orderItems:", orderItems);
    console.log("shippingAddress:", shippingAddress);

    if (!orderItems || !orderItems.length) {
      return res.status(400).json({ message: "No order items provided" });
    }

    const line_items = orderItems.map(item => {
      const priceNumber = Number(item.price);
      if (isNaN(priceNumber)) {
        throw new Error(`Invalid price for item ${item.name}: ${item.price}`);
      }
      return {
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: Math.round(priceNumber * 100),
        },
        quantity: item.qty,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
      metadata: {
        orderItems: JSON.stringify(orderItems),
        shippingAddress: JSON.stringify(shippingAddress || {}),
        userId: String(userId),
        paymentMethod: String(paymentMethod),
      },
    });

    console.log("Stripe session created:", session.id);
    console.log("Metadata enviada a Stripe:", session.metadata);

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session creation failed:", err);
    res.status(500).json({ message: "Stripe session creation failed", error: err.message });
  }
};

// Webhook para crear orden en MongoDB
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Webhook recibido para session:", session.id);
    console.log("Metadata recibida en webhook:", session.metadata);

    try {
      const orderItems = session.metadata?.orderItems
        ? JSON.parse(session.metadata.orderItems)
        : [];
      const shippingAddress = session.metadata?.shippingAddress
        ? JSON.parse(session.metadata.shippingAddress)
        : {};
      const totalPrice = session.amount_total / 100;
      const userId = session.metadata?.userId;
      const paymentMethod = session.metadata?.paymentMethod;

      console.log("Valor de paymentMethod desde metadata:", paymentMethod);

      if (!userId || userId === "no-user") {
        throw new Error("userId is missing in session metadata");
      }

      // Validar que shippingAddress tenga todos los campos
      const requiredAddressFields = ["address", "city", "postalCode", "country"];
      for (const field of requiredAddressFields) {
        if (!shippingAddress[field]) {
          throw new Error(`Shipping address field "${field}" is missing`);
        }
      }

      const order = new Order({
        user: userId,
        orderItems,
        shippingAddress,
        paymentMethod, 
        itemsPrice: totalPrice,
        totalPrice,
        isPaid: true,
        paidAt: new Date(),
        paymentResult: {
          id: session.payment_intent,
          status: session.payment_status,
          email_address: session.customer_email,
        },
      });

      await order.save();
      console.log("Orden creada exitosamente:", order._id);
    } catch (err) {
      console.error("Error creando orden desde webhook:", err);
    }
  }

  res.status(200).json({ received: true });
};