import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { 
  FaShoppingBag, 
  FaUser, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaLock, 
  FaSignOutAlt 
} from "react-icons/fa";

function Profile() {
  const { token, user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        const res = await axios.get("https://socks-ecommerce.onrender.com/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <div className="user-account py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h4 className="mb-8 text-2xl md:text-3xl font-bold text-center md:text-left">My Account</h4>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
  <Link 
    to="/profile/orders" 
    className="account-item flex flex-col items-center p-3 sm:p-4 border rounded-lg bg-white hover:shadow-lg transition-shadow duration-300"
  >
    <FaShoppingBag size={28} className="mb-1 sm:mb-2 text-gray-700"/>
    <p className="text-center text-sm sm:text-base">My Orders</p>
  </Link>

  <Link 
    to="/profile/details" 
    className="account-item flex flex-col items-center p-3 sm:p-4 border rounded-lg bg-white hover:shadow-lg transition-shadow duration-300"
  >
    <FaUser size={28} className="mb-1 sm:mb-2 text-gray-700"/>
    <p className="text-center text-sm sm:text-base">My Details</p>
  </Link>

  <Link 
    to="/profile/addresses" 
    className="account-item flex flex-col items-center p-3 sm:p-4 border rounded-lg bg-white hover:shadow-lg transition-shadow duration-300"
  >
    <FaMapMarkerAlt size={28} className="mb-1 sm:mb-2 text-gray-700"/>
    <p className="text-center text-sm sm:text-base">My Addresses</p>
  </Link>

  <Link 
    to="/profile/marketing" 
    className="account-item flex flex-col items-center p-3 sm:p-4 border rounded-lg bg-white hover:shadow-lg transition-shadow duration-300"
  >
    <FaEnvelope size={28} className="mb-1 sm:mb-2 text-gray-700"/>
    <p className="text-center text-sm sm:text-base">Marketing Preferences</p>
  </Link>

  <Link 
    to="/forgot-password" 
    className="account-item flex flex-col items-center p-3 sm:p-4 border rounded-lg bg-white hover:shadow-lg transition-shadow duration-300"
  >
    <FaLock size={28} className="mb-1 sm:mb-2 text-gray-700"/>
    <p className="text-center text-sm sm:text-base">Change Password</p>
  </Link>

  <div 
    className="account-item flex flex-col items-center p-3 sm:p-4 border rounded-lg bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    onClick={handleLogout} 
  >
    <FaSignOutAlt size={28} className="mb-1 sm:mb-2 text-gray-700"/>
    <p className="text-center text-sm sm:text-base">Logout</p>
  </div>
</div>


        <div className="recent-orders">
          <h6 className="mb-4 text-xl md:text-2xl font-semibold">Recent Orders</h6>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders yet.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map(order => (
                <li key={order._id} className="border p-4 rounded-lg bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="mb-2 sm:mb-0">
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
                    <p><strong>Status:</strong> {order.isPaid ? "Paid" : "Pending"}</p>
                  </div>
                  <Link 
                    to={`/profile/orders/${order._id}`} 
                    className="mt-2 sm:mt-0 bg-gray-800 text-white px-4 py-2 rounded hover:bg-yellow-400 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
