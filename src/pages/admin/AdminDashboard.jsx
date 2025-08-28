import { useState, lazy, Suspense } from "react";

const AdminProducts = lazy(() => import("./AdminProducts"));
const AdminUsers = lazy(() => import("./AdminUsers"));
const AdminOrders = lazy(() => import("./AdminOrders"));

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
        return <h2 className="text-2xl font-semibold">Select an option</h2>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full p-2 rounded text-left ${activeTab === "products"
                ? "bg-yellow-500 text-black"
                : "hover:bg-gray-700"
              }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full p-2 rounded text-left ${activeTab === "orders"
                ? "bg-yellow-500 text-black"
                : "hover:bg-gray-700"
              }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`w-full p-2 rounded text-left ${activeTab === "users"
                ? "bg-yellow-500 text-black"
                : "hover:bg-gray-700"
              }`}
          >
            Users
          </button>
        </nav>
      </aside>


      <main className="flex-1 flex flex-col">

        <header className="bg-white shadow p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold capitalize">
            {activeTab === "products"
              ? "Product Management"
              : activeTab === "orders"
                ? "Order Management"
                : activeTab === "users"
                  ? "User Management"
                  : "Admin Panel"}
          </h1>
        </header>

        <section className="flex-1 p-6">
          <Suspense fallback={
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
          >
            {renderContent()}
          </Suspense>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;