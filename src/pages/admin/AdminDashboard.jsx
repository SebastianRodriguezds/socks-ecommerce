import { useState } from "react";
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <AdminProducts />;
      case "orders":
        return <AdminOrders />
      case "users":
        return <AdminUsers />;
      default:
        return <h2 className="text-2xl font-semibold">Selecciona una opción</h2>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full p-2 rounded text-left ${
              activeTab === "products"
                ? "bg-yellow-500 text-black"
                : "hover:bg-gray-700"
            }`}
          >
            Productos
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full p-2 rounded text-left ${
              activeTab === "orders"
                ? "bg-yellow-500 text-black"
                : "hover:bg-gray-700"
            }`}
          >
            Pedidos
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full p-2 rounded text-left ${
              activeTab === "users"
                ? "bg-yellow-500 text-black"
                : "hover:bg-gray-700"
            }`}
          >
            Usuarios
          </button>
        </nav>
      </aside>


      <main className="flex-1 flex flex-col">

        <header className="bg-white shadow p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold capitalize">
            {activeTab === "products"
              ? "Gestión de productos"
              : activeTab === "orders"
              ? "Gestión de pedidos"
              : activeTab === "users"
              ? "Gestión de usuarios"
              : "Panel de administración"}
          </h1>
        </header>

        {/* Content */}
        <section className="flex-1 p-6">{renderContent()}</section>
      </main>
    </div>
  );
};

export default AdminDashboard;