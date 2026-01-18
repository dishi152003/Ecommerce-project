import { Link } from 'react-router-dom';
import { Home, Search, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Animation */}
                <div className="mb-8 relative">
                    <h1 className="text-[150px] md:text-[200px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-none animate-pulse">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ShoppingBag className="w-24 h-24 text-gray-400 dark:text-gray-600 animate-bounce" />
                    </div>
                </div>

                {/* Message */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                        The page you're looking for seems to have wandered off...
                    </p>
                    <p className="text-gray-500 dark:text-gray-500">
                        Don't worry, even the best shoppers get lost sometimes!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link
                        to="/"
                        className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-105"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                    <Link
                        to="/products"
                        className="group inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:border-blue-500 hover:shadow-lg transform hover:scale-105"
                    >
                        <Search className="w-5 h-5" />
                        Browse Products
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Popular Pages
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Products', path: '/products' },
                            { name: 'Cart', path: '/cart' },
                            { name: 'Wishlist', path: '/wishlist' },
                            { name: 'About', path: '/about' },
                            { name: 'Contact', path: '/contact' },
                            { name: 'Track Order', path: '/track-order' },
                            { name: 'Login', path: '/login' }
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="mt-8 inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go back to previous page
                </button>
            </div>
        </div>
    );
}
