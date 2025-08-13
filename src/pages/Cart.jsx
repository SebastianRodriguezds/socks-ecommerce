import { useContext } from "react";
import { CartContext } from "../context/CartContext";


function Cart() {
    const { cart, removeFromCart, getTotal, updateQuantity } = useContext(CartContext);

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

            {cart.length == 0 ? (
                <p className="text-center text-gray-600">Your car is empty</p>
            ) : (
                <div className="space-y-6">
                    {cart.map((item) =>
                        <div key={item.id} className="flex items-center justify-between border p-4 rounded">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p>${item.price} x {item.quantity}</p>
                                    <div className="flex gap-2 mt-2">
                                        <button onClick={() => updateQuantity(item.id, -1)}
                                            className="bg-gray-300 px-2 rounded hover:bg-gray-400">
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={()=>updateQuantity(item.id, 1)}
                                            className="bg-gray-300 px-2 rounded hover:bg-gray-400">
                                            +        
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                Remove
                            </button>
                        </div>
                    )}
                    <div className="text-right font-bold text-xl">
                        Total: ${getTotal().toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;