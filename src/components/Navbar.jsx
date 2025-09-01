import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

function Navbar() {
  const { cart, animateCart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { user, login, logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const popupRef = useRef(null);


  useEffect(() => {
    const handleClickOut = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowLogin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOut);
    return () => document.removeEventListener("mousedown", handleClickOut);
  }, []);


  useEffect(() => {
    setShowLogin(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowLogin(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUserClick = () => setShowLogin(!showLogin);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md relative">
      {/* Logo */}
      <div className="text-2xl font-extrabold tracking-wide">
        <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">
          Socks E-commerce
        </Link>
      </div>


      <ul className="hidden md:flex space-x-8 text-lg items-center">
        <li>
          <Link to="/" className="hover:text-yellow-400 transition-colors duration-300">Home</Link>
        </li>
        <li>
          <Link to="/catalog" className="hover:text-yellow-400 transition-colors duration-300">Catalog</Link>
        </li>
        {user && user.role === "admin" && (
          <li>
            <Link to="/admin" className="hover:text-yellow-400 transition-colors duration-300">Admin Panel</Link>
          </li>
        )}
        <li className="relative">
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="w-8 h-8 cursor-pointer text-white" />
            {totalItems > 0 && (
              <span
                className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white 
                transition-all duration-300 ease-out
                ${animateCart ? "bg-green-500 scale-125 shadow-lg" : "bg-red-500 scale-100"}`}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </li>
        <li>
          <button onClick={handleUserClick}>
            <UserIcon className="w-8 h-8 cursor-pointer text-white hover:text-yellow-400 transition-colors duration-300" />
          </button>
        </li>
      </ul>


      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="md:hidden"
      >
        {isOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
      </button>


      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 flex flex-col space-y-4 p-4 md:hidden z-40">
          <Link to="/" className="hover:text-yellow-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/catalog" className="hover:text-yellow-400" onClick={() => setIsOpen(false)}>Catalog</Link>
          {user && user.role === "admin" && (
            <Link to="/admin" className="hover:text-yellow-400" onClick={() => setIsOpen(false)}>Admin Panel</Link>
          )}
          <Link to="/cart" className="hover:text-yellow-400" onClick={() => setIsOpen(false)}>
            Cart ({totalItems})
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:text-yellow-400" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="hover:text-yellow-400 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
              className="hover:text-yellow-400 text-left"
            >
              Sign In
            </button>
          )}
        </div>
      )}

      {showLogin && (
        <div
          ref={popupRef}
          className="absolute top-16 right-4 w-64 bg-white text-black rounded shadow-lg p-4 z-50"
        >
          {!user ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await login({ email, password });
                  setShowLogin(false);
                } catch (err) {
                  setError(err.message || "Login failed");
                }
              }}
              className="flex flex-col space-y-2"
            >
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="bg-gray-800 text-white p-2 rounded hover:bg-yellow-400">
                Sign In
              </button>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <div className="flex justify-between text-sm mt-2">
                <Link to="/forgot-password" className="hover:text-yellow-400">Forgot Password?</Link>
                <Link to="/register" className="hover:text-yellow-400">Create account</Link>
              </div>
            </form>
          ) : (
            <div>
              <p className="mb-2">Hola, {user.name}</p>
              <Link to="/profile" className="block mb-2 hover:text-yellow-500">Profile</Link>
              <button onClick={handleLogout} className="bg-gray-800 text-white p-2 w-full rounded hover:bg-red-500">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
