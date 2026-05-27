import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Moon, Sun, LogOut, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { state: authState, logout } = useAuth();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    const name = authState.user?.username ?? "User";
    logout();
    toast.success(`Goodbye, ${name}! See you soon.`);
    navigate("/products");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/products"
            className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white hover:text-green-500 dark:hover:text-green-400 transition-colors"
          >
            <ShoppingBag size={22} strokeWidth={2} className="text-green-500" />
            EasyShop
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/products"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Products
            </Link>

            {authState.isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                >
                  <ShoppingCart size={17} strokeWidth={2} />
                  Cart
                  {totalItems > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-bold">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {authState.user?.username?.charAt(0).toUpperCase() ?? "U"}
                  </span>
                  Profile
                </Link>
              </>
            )}

            {!authState.isAuthenticated && (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                Login
              </Link>
            )}

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "light" ? <Moon size={16} strokeWidth={2} /> : <Sun size={16} strokeWidth={2} />}
            </button>

            {authState.isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <LogOut size={15} strokeWidth={2} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "light" ? <Moon size={16} strokeWidth={2} /> : <Sun size={16} strokeWidth={2} />}
            </button>

            {authState.isAuthenticated && (
              <Link to="/cart" className="relative p-2" onClick={closeMenu}>
                <ShoppingCart size={20} strokeWidth={2} className="text-gray-600 dark:text-gray-300" />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-green-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-2 space-y-0.5 pb-3">
            <Link
              to="/products"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Products
            </Link>

            {authState.isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ShoppingCart size={16} strokeWidth={2} />
                  Cart
                  {totalItems > 0 && (
                    <span className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-bold">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {authState.user?.username?.charAt(0).toUpperCase() ?? "U"}
                  </span>
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut size={16} strokeWidth={2} />
                  Logout
                </button>
              </>
            )}

            {!authState.isAuthenticated && (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 mx-4 py-2.5 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
