import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import PaymentMethods from "./PaymentMethods";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="font-bold text-lg mb-3">Contact</h2>
          <p>Tel: +54 261 4606098</p>
          <p>Tel: +44 7898 344398</p>
          <p>Email: sebastianrodriguezds.dev@gmail.com</p>
          <div className="flex space-x-4 mt-3">
            <a href="https://wa.me/447463628490" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="w-6 h-6 hover:text-green-500 transition-colors"/>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="w-6 h-6 hover:text-blue-500 transition-colors"/>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="w-6 h-6 hover:text-blue-400 transition-colors"/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-6 h-6 hover:text-pink-500 transition-colors"/>
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">Policies</h2>
          <ul className="space-y-2">
            <li><button className="hover:text-yellow-400 transition-colors">Shipping</button></li>
            <li><button className="hover:text-yellow-400 transition-colors">Returns & Exchanges</button></li>
            <li><button className="hover:text-yellow-400 transition-colors">Terms & Conditions</button></li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">About Us</h2>
          <ul className="space-y-2">
            <li><button className="hover:text-yellow-400 transition-colors">Who We Are</button></li>
            <li><button className="hover:text-yellow-400 transition-colors">Mission & Vision</button></li>
            <li><button className="hover:text-yellow-400 transition-colors">Contact</button></li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">Payment Methods</h2>
          <PaymentMethods />
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Socks E-commerce. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
