import { ShoppingCart, Trash2, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/CartItemRow";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { state, clearCart, totalPrice, totalItems } = useCart();

  const handleClearCart = () => {
    clearCart();
    toast.success("Your cart has been cleared.");
  };

  const handleCheckout = () => {
    toast.success("Order placed! Thank you for shopping with EasyShop.");
    clearCart();
  };

  if (state.items.length === 0) {
    return (
      <main className="flex-1 flex items-center justify-center px-4 py-16 bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <ShoppingCart size={72} strokeWidth={1} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Browse our products and add something you love!</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors">
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-baseline gap-3 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-2.5 py-1 rounded-full">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {state.items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md lg:sticky lg:top-20">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-500 font-semibold">Free</span>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-4" />
              <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button onClick={handleCheckout} className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors">
                <CreditCard size={17} strokeWidth={2} />
                Proceed to Checkout
              </button>
              <button onClick={handleClearCart} className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-red-300 dark:hover:border-red-700 hover:text-red-500 dark:hover:text-red-400 font-medium rounded-xl transition-colors text-sm">
                <Trash2 size={15} strokeWidth={2} />
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
