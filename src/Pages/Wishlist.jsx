import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';

export default function Wishlist() {
    const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
    const { addItem } = useCart();

    const handleAddToCart = (product) => {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            img: product.image,
            qty: 1
        });

        // Show success toast
        const toast = document.createElement('div');
        toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
        toast.innerHTML = `
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Added to cart!</span>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    };

    const handleRemove = (productId) => {
        removeFromWishlist(productId);

        // Show removed toast
        const toast = document.createElement('div');
        toast.className = 'fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
        toast.innerHTML = `
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <span>Removed from wishlist!</span>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <Heart className="w-8 h-8 fill-red-500 text-red-500" />
                            My Wishlist
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>
                    {wishlistItems.length > 0 && (
                        <button
                            onClick={clearWishlist}
                            className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-medium"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Empty State */}
                {wishlistItems.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <Heart className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                            Your wishlist is empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Save your favorite items to buy them later!
                        </p>
                        <Link
                            to="/products"
                            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    /* Wishlist Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group relative"
                            >
                                {/* Remove Button */}
                                <button
                                    onClick={() => handleRemove(product.id)}
                                    className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all group/remove"
                                    title="Remove from wishlist"
                                >
                                    <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/remove:text-red-500" />
                                </button>

                                {/* Product Image */}
                                <Link to={`/product/${product.id}`} className="block">
                                    <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                            }}
                                        />
                                    </div>
                                </Link>

                                {/* Product Info */}
                                <div className="p-4">
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            {product.title}
                                        </h3>
                                    </Link>

                                    {/* Rating */}
                                    {product.rating && (
                                        <div className="flex items-center gap-1 mb-3">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {product.rating}
                                            </span>
                                        </div>
                                    )}

                                    {/* Price */}
                                    <div className="mb-4">
                                        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                            ₹{product.price}
                                        </span>
                                    </div>

                                    {/* Stock Status */}
                                    {product.stock !== undefined && (
                                        <p className="text-sm mb-3">
                                            {product.stock > 0 ? (
                                                <span className="text-green-600 dark:text-green-400">
                                                    In Stock ({product.stock} available)
                                                </span>
                                            ) : (
                                                <span className="text-red-600 dark:text-red-400">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </p>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.stock === 0}
                                            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Continue Shopping */}
                {wishlistItems.length > 0 && (
                    <div className="mt-8 text-center">
                        <Link
                            to="/products"
                            className="inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                        >
                            ← Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
