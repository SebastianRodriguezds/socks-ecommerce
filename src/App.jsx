import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";

const Home = lazy(() => import("./pages/Home"));
const HomeSkeleton = lazy(() => import("./skeleton/HomeSkeleton"));
const Catalog = lazy(() => import("./pages/Catalog"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPass = lazy(() => import("./pages/ForgotPass"));
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const Profile = lazy(() => import("./pages/Profile"));
const Success = lazy(() => import("./pages/Success"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=> {
      setLoading(false);
    }, 500);
  }, []);


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={loading ? <HomeSkeleton /> : <Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:orderId" element={<OrderConfirmation />} />
        <Route path="/success" element={<Success />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
