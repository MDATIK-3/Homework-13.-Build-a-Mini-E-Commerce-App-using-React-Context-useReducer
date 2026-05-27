import { LogOut, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const ProfilePage = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const name = state.user?.username ?? "User";
    logout();
    toast.success(`Goodbye, ${name}! See you soon.`);
    navigate("/products");
  };

  if (!state.user) return null;

  const initials = state.user.username
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full from-green-400 to-green-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 select-none">
          {initials}
        </div>

        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{state.user.username}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{state.user.email}</p>

        <div className="flex flex-col gap-3 mt-7">
          <Link
            to="/cart"
            className="flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            <ShoppingBag size={17} strokeWidth={2} />
            View Cart
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-red-300 dark:hover:border-red-700 hover:text-red-500 dark:hover:text-red-400 font-semibold rounded-xl transition-colors text-sm"
          >
            <LogOut size={16} strokeWidth={2} />
            Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
