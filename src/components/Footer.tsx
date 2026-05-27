import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
          <ShoppingBag size={20} strokeWidth={2} className="text-green-500" />
          <span>EasyShop</span>
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Muku. All rights reserved.
        </p>

        <nav className="flex items-center gap-5">
          <Link
            to="/products"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
          >
            Cart
          </Link>
          <Link
            to="/profile"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
          >
            Profile
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
