import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCartIcon, UserIcon  } from "@heroicons/react/24/solid";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { cart, animateCart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [showLogin, setShowLogin] = useState(false);
  const { user,login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const popupRef = useRef(null);

  const handleUserClick = () => setShowLogin(!showLogin);

  useEffect (()=> {
    const handleClickOut = (e)=> {
      if (popupRef.current && !popupRef.current.contains(e.target)){
        setShowLogin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOut);
    return ()=> document.removeEventListener("mousedown", handleClickOut);
  }, []);

  useEffect(()=> {
    setShowLogin(false);
  }, [location]);

  const handleLogout = ()=>{
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-extrabold tracking-wide">
        <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">
          Socks E-commerce
        </Link>
      </div>
      <ul className="flex space-x-8 text-lg">
        <li>
          <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/catalog" className="hover:text-yellow-400 transition-colors duration-300">
            Catalog
          </Link>
        </li>
        <li className="relative">
          <Link to="/cart">
            <ShoppingCartIcon
              className="w-8 h-8 cursor-pointer text-white"
            />
            {totalItems > 0 && (
              <span
                className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white 
    transition-all duration-300 ease-out
    ${animateCart ? "bg-green-500 scale-125 shadow-lg" : "bg-red-500 scale-100"}`}>
                {totalItems}
              </span>
            )}
          </Link>
        </li>

        <li className="relative">
          <button onClick={handleUserClick}>
            <UserIcon className="w-8 h-8 cursor-pointer text-white hover:text-yellow-400 transition-colors duration-300" />
          </button>

          {showLogin && !user && (
            <div ref={popupRef}
             className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg p-4 z-50">
              <form onSubmit={async (e)=> {
                e.preventDefault();
                try{
                  await login({email, password});
                  setShowLogin(false);
                }catch (err) {
                  setError(err.message || "Login failed");
                }
              }}
              className="flex flex-col space-y-2">
                <input type="email" placeholder="Email" className="border p-2 rounded" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                <input type="password" placeholder="Password" className="border p-2 rounded"  value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required/>
                <button type="submit" className="bg-gray-800 text-white p-2 rounded hover:bg-yellow-400">
                  Sign In
                </button>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                <div className="flex justify-between text-sm mt-2">
                  <Link to="/forgot-password" className="hover:text-yellow-400">
                    Forgot Password?
                  </Link>

                  <Link to="/register" className="hover:text-yellow-400">
                    Create account
                  </Link>
                </div>
              </form>
            </div>
          )}
          {showLogin && user && (
            <div ref={popupRef} 
            className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg p-4 z-50">
              <p className="mb-2">Hola, {user.name}</p>
              <Link to="/profile" className="block mb-2 hover:text-yellow-500">
                Profile
              </Link>
              <button onClick={handleLogout} className="bg-gray-800 text-white p-2 w-full rounded hover:bg-red-500">
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
