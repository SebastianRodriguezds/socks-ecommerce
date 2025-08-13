import { Link } from "react-router-dom";

function Navbar() {
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
        <li>
          <Link to="/cart" className="hover:text-yellow-400 transition-colors duration-300">
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
