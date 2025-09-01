import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
    const { cart, removeFromCart, getTotal, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(58vh-64px)] flex flex-col justify-center max-w-6xl mx-auto py-12 px-4">

            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Your Cart</h2>

            {cart.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty</p>
            ) : (
                <div className="space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item._id}
                            className="flex flex-col md:flex-row items-center justify-between border p-4 rounded gap-4 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p>${item.price} x {item.quantity}</p>
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item._id, -1)}
                                            className="bg-gray-300 px-1 sm:px-2 rounded hover:bg-gray-400"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, 1)}
                                            className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                        <span className="text-xl font-bold">Total: ${getTotal().toFixed(2)}</span>
                    </div>
                    {cart.length > 0 && (
                        <div className="text-right mt-6">
                            <button
                                onClick={() => navigate("/checkout")}
                                className="mt-4 md:mt-0 bg-green-600 text-white px-4 sm:px-6 py-2 rounded hover:bg-green-700 mx-auto md:mx-0 block md:inline-block"
                                >
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

export default Cart;
