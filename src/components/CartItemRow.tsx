import { X, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";
import { CartItem } from "../types";
import { useCart } from "../context/CartContext";

type Props = { item: CartItem };

const CartItemRow = ({ item }: Props) => {
  const { removeItem, updateQuantity } = useCart();

  const handleDecrease = () => {
    if (item.quantity === 1) {
      removeItem(item.id);
      toast(`"${item.title.slice(0, 24)}…" removed from cart.`, {
        icon: "🗑️",
        style: { fontWeight: 500 },
      });
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
    toast(`"${item.title.slice(0, 24)}…" removed from cart.`, { icon: "🗑️" });
  };

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-gray-50 dark:bg-gray-700 p-2 flex-shrink-0"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
          {item.title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          ${item.price.toFixed(2)} each
        </p>

        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {/* Qty controls */}
          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg px-2 py-1">
            <button
              onClick={handleDecrease}
              aria-label="Decrease quantity"
              className="w-5 h-5 flex items-center justify-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              <Minus size={13} strokeWidth={2.5} />
            </button>
            <span className="text-sm font-semibold w-5 text-center text-gray-800 dark:text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="w-5 h-5 flex items-center justify-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              <Plus size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* Subtotal */}
          <span className="text-sm font-bold text-green-600 dark:text-green-400">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Remove */}
      <button
        onClick={handleRemove}
        aria-label="Remove item"
        className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      >
        <X size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default CartItemRow;
