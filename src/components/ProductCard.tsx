import { Plus, Minus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

type Props = { product: Product };

const ProductCard = ({ product }: Props) => {
  const { addItem, removeItem, updateQuantity, state } = useCart();
  const { state: authState } = useAuth();

  const cartItem = state.items.find((item) => item.id === String(product.id));
  const inCart = Boolean(cartItem);

  const handleAdd = () => {
    if (!authState.isAuthenticated) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    toast.success("Item added to cart!");
    addItem({
      id: String(product.id),
      title: product.title,
      price: product.price,
      image: product.image,
    });
  };

  const handleIncrease = () => {
    if (!cartItem) return;
    updateQuantity(cartItem.id, cartItem.quantity + 1);
  };

  const handleDecrease = () => {
    if (!cartItem) return;
    if (cartItem.quantity === 1) {
      removeItem(cartItem.id);
      toast(`Removed from cart.`, { icon: "🗑️" });
    } else {
      updateQuantity(cartItem.id, cartItem.quantity - 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      {/* Image — fixed height so all cards are the same size */}
      <div className="h-40 shrink-0 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 truncate mb-1">
          {product.category}
        </span>
        {/* Fixed 2-line height so all cards are the same height */}
        <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-100 leading-4 line-clamp-2 h-8 overflow-hidden">
          {product.title}
        </h3>

        <div className="flex items-center justify-between gap-2 flex-wrap mt-auto pt-2">
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>

          {inCart && cartItem ? (
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-1.5 py-1">
              <button
                onClick={handleDecrease}
                aria-label="Decrease"
                className="w-5 h-5 flex items-center justify-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
              >
                {cartItem.quantity === 1
                  ? <Trash2 size={11} strokeWidth={2.5} />
                  : <Minus size={11} strokeWidth={2.5} />}
              </button>
              <span className="text-xs font-bold w-4 text-center text-gray-800 dark:text-white">
                {cartItem.quantity}
              </span>
              <button
                onClick={handleIncrease}
                aria-label="Increase"
                className="w-5 h-5 flex items-center justify-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
              >
                <Plus size={11} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 text-xs font-semibold bg-green-500 hover:bg-green-600 text-white px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <Plus size={12} strokeWidth={2.5} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
