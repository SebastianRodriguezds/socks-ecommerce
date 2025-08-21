import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function OrderConfirmation() {
    const { orderId } = useParams();
    const { user, token } = useContext(AuthContext);
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {

            try {
                const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrder(data);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching order");
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchOrder();
    }, [orderId, user]);

    if (loading) return <p className="text-center py-12">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-12">{error}</p>

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
            <h2 className="text-3xl font-bold text-center">Order Confirmation</h2>

            <div className="border p-4 rounded space-y-4">
                <h3 className="font-semibold text-xl">Shipping</h3>
                <p>
                    <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                <p>
                    <strong>Status:</strong> {order.isDelivered ? `Delivered at ${new Date(order.deliveredAt).toLocaleString()}` : "Not delivered"}
                </p>
            </div>

            <div className="border p-4 rounded space-y-4">
                <h3 className="font-semibold text-xl">Payment</h3>
                <p>
                    <strong>Method:</strong> {order.paymentMethod}
                </p>
                <p>
                    <strong>Status:</strong>{order.isPaid ? `Paid at ${new Date(order.paidAt).toLocaleString()}` : "Not paid"}
                </p>
            </div>
            <div className="border p-4 rounded space-y-4">
                <h3 className="font-semibold text-xl">Order Items</h3>
                <ul>
                    {order.orderItems.map((item) => (
                        <li key={item.product} className="flex justify-between mb-2">
                            <span>{item.name} x {item.qty}</span>
                            <span>${(item.qty * item.price || 0).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border p-4 rounded flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${order.totalPrice.toFixed(2)}</span>
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Continue Shopping
                </button>
            </div>

        </div>
    );
}

export default OrderConfirmation;