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
        const res = await axios.get("http://localhost:5000/api/orders/myorders", {
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
    navigate("/"); // redirige al home, igual que el popup
  };

  return (
    <div className="user-account py-12">
      <div className="container mx-auto px-4">
        <h4 className="mb-8 text-3xl font-bold">My Account</h4>

        {/* Grid de opciones: 2 columnas */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <Link 
            to="/profile/orders" 
            className="account-item flex flex-col items-center p-4 border rounded hover:shadow-lg cursor-pointer"
          >
            <FaShoppingBag size={40} className="mb-2 text-gray-700"/>
            <p>My Orders</p>
          </Link>

          <Link 
            to="/profile/details" 
            className="account-item flex flex-col items-center p-4 border rounded hover:shadow-lg cursor-pointer"
          >
            <FaUser size={40} className="mb-2 text-gray-700"/>
            <p>My Details</p>
          </Link>

          <Link 
            to="/profile/addresses" 
            className="account-item flex flex-col items-center p-4 border rounded hover:shadow-lg cursor-pointer"
          >
            <FaMapMarkerAlt size={40} className="mb-2 text-gray-700"/>
            <p>My Addresses</p>
          </Link>

          <Link 
            to="/profile/marketing" 
            className="account-item flex flex-col items-center p-4 border rounded hover:shadow-lg cursor-pointer"
          >
            <FaEnvelope size={40} className="mb-2 text-gray-700"/>
            <p>Marketing Preferences</p>
          </Link>

          <Link 
            to="/forgot-password"  // Cambio: redirige a la página de recuperar contraseña
            className="account-item flex flex-col items-center p-4 border rounded hover:shadow-lg cursor-pointer"
          >
            <FaLock size={40} className="mb-2 text-gray-700"/>
            <p>Change Password</p>
          </Link>

          <div 
            className="account-item flex flex-col items-center p-4 border rounded hover:shadow-lg cursor-pointer"
            onClick={handleLogout}  // Cambio: usa la misma función que el popup
          >
            <FaSignOutAlt size={40} className="mb-2 text-gray-700"/>
            <p>Logout</p>
          </div>
        </div>

        {/* Historial de compras */}
        <div className="recent-orders">
          <h6 className="mb-4 text-xl font-semibold">Recent Orders</h6>
          {orders.length === 0 ? (
            <p>No hay pedidos todavía.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map(order => (
                <li key={order._id} className="border p-4 rounded flex justify-between items-center">
                  <div>
                    <p><strong>Pedido ID:</strong> {order._id}</p>
                    <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
                    <p><strong>Estado:</strong> {order.isPaid ? "Pagado" : "Pendiente"}</p>
                  </div>
                  <Link 
                    to={`/profile/orders/${order._id}`} 
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-yellow-400"
                  >
                    Ver detalles
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
