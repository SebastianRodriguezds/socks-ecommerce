import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Checkout() {
    const { cart, getTotal } = useContext(CartContext);
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const [error, setError] = useState("");

    useEffect(()=>{
        if(!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const placeOrderHandler = async () => {
        if (!user) {
            setError("You must be logged in to place an order");
            return;
        };

        try {

            const { data } = await axios.post("http://localhost:5000/api/orders",
                {
                    orderItems: cart.map(item => ({
                        name: item.name,
                        qty: item.quantity,
                        image: item.image,
                        product: item._id
                    })),
                    shippingAddress: { address, city, postalCode, country },
                    paymentMethod,
                    itemsPrice: getTotal(),
                    taxPrice: 0,
                    shippingPrice: 0,
                    totalPrice: getTotal()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            navigate(`/order/${data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Error placing order");
        }
    };
    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="space-y-6">
                <div className="border p-4 rounded space-y-4">
                    <h3 className="font-semibold text-xl mb-2">Shipping Address</h3>
                    <input type="text" placeholder="Address" value={address} className="w-full border px-3 py-2 rounded" required onChange={(e) => setAddress(e.target.value)} />

                    <input type="text" placeholder="City" value={city} className="w-full border px-3 py-2 rounded" required onChange={(e) => setCity(e.target.value)} />

                    <input type="text" placeholder="Postal Code" value={postalCode} className="w-full border px-3 py-2 rounded" required onChange={(e) => setPostalCode(e.target.value)} />

                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div className="border p-4 rounded space-y-4">
                    <h3 className="font-semibold text-xl mb-2">Payment Method</h3>
                    <select value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)} className="2-full border px-3 py-2 rounded">
                        <option value="PayPal">PayPal</option>
                        <option value="Card">Card</option>
                    </select>
                </div>
                <div className="border p-4 rounded space-y-4">
                    <h3 className="font-semibold text-xl mb-2">Order Summary</h3>
                    <ul>
                        {cart.map((item) => (
                            <li key={item._id} className="flex justify-between mb-2">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${getTotal().toFixed(2)}</span>
                    </div>
                </div>

                <div className="text-right">
                    <button
                        onClick={placeOrderHandler}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                        Place Order
                    </button>
                </div>

            </div>
        </div>
    )
};

export default Checkout;