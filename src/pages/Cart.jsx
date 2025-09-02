import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, getTotal, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(58vh-64px)] max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between bg-gray-50 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`https://socks-ecommerce.onrender.com${item.image}`}
                  alt={item.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg transform transition-transform hover:scale-105"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-700 mt-1">${item.price} x {item.quantity}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mt-4 md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total & Checkout */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg flex flex-col md:flex-row justify-between items-center shadow-md">
            <span className="text-2xl font-bold">Total: ${getTotal().toFixed(2)}</span>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 md:mt-0 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
