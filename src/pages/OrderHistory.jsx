import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function OrderHistory() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get("/api/orders/myorders", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setOrders(data);
            } catch (err) {
                setError("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        if (user?.token) {
            fetchOrders();
        }
    }, [user]);

    if (loading) return <p className="text-center mt-6">Loading..</p>;
    if (error) return <p className="text-center text-red-600 mt-6">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">My Orders</h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-600">You have no orders yet.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) =>
                        <div key={order._id}
                            className="border rounded p-4 shadow flex justify-between items-center">
                            <div>
                                <p>
                                    <span className="font-semibold">Order ID:</span> {order._id}
                                </p>
                                <p>
                                    <span className="font-semibold">Date:</span> {" "}
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="font-semibold">Total:</span>
                                    {order.totalPrice.toFixed(2)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p
                                    className={`${order.isPaid ? "text-green-600" : "text-red-600"
                                        } font-semibold`}
                                >
                                    {order.isPaid ? "Paid" : "Not Paid"}
                                </p>
                                <p
                                    className={`${order.isDelivered ? "text-green-600" : "text-red-600"
                                        } font-semibold`}
                                >
                                    {order.isDelivered ? "Delivered" : "Not Delivered"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default OrderHistory;
