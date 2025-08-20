import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import ForgotPass from "./pages/ForgotPass";
import Login from "./pages/Login";
import Footer from "./components/Footer";


function App() {
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/catalog" element={<Catalog/>}/> 
        <Route path="/product/:id" element={<ProductDetail />}/> 
        <Route path="/cart" element={<Cart/>}/> 
        <Route path="/register" element={<Register/>}/> 
        <Route path="/login" element={<Login/>}/> 
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;