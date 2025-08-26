import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Success() {
  const navigate = useNavigate();
  const {setCart} = useContext(CartContext);

  useEffect(() => {
    setCart([]);
    localStorage.removeItem("cart");
  }, [setCart]);

  return (
    <div className="max-w-xl mx-auto text-center py-20 px-4">
      <div className="bg-green-100 p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-green-700">✅ Payment Successful</h1>
        <p className="text-lg mb-6">
          Thank you for your purchase! Your payment has been successfully received.
        </p>
        <p className="mb-6 text-gray-700">
          You will receive an email with your invoice and order details shortly.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Success;
