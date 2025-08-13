import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

function Navbar() {
  const { cart, animateCart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
      </ul>
    </nav>
  );
}

export default Navbar;
