import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, updateItem, removeItem } = useCart();
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price || 999) * (item.qty || 1), 0);
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!items || items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 pt-24 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🛒</span>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Your cart is empty</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1 space-y-4">
          {items.map((it) => (
            <div key={it.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
              <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
                <img src={it.img} alt={it.title} className="w-full h-full object-contain" />
              </div>

              <div className="flex-1 w-full text-center sm:text-left">
                <h3 className="font-bold text-lg text-black dark:text-white">{it.title || 'Product Name'}</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Price: <span className="font-semibold text-black dark:text-white">₹{it.price || 999}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => updateItem(it.id, Math.max(1, it.qty - 1))}
                    className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors text-black dark:text-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="w-8 text-center font-semibold text-black dark:text-white">{it.qty}</div>
                  <button
                    onClick={() => updateItem(it.id, Math.min(10, it.qty + 1))}
                    className="p-2 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors text-black dark:text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(it.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Invoice / Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (18% GST)</span>
                <span className="font-medium text-gray-900 dark:text-white">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-black hover:bg-gray-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              Checkout Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Secure Checkout - 100% Money Back Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

