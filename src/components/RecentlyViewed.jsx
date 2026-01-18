import { Link } from 'react-router-dom';
import { Star, Eye } from 'lucide-react';
import { useRecentlyViewed } from '../contexts/RecentlyViewedContext';

export default function RecentlyViewed() {
    const { recentlyViewed } = useRecentlyViewed();

    if (!recentlyViewed || recentlyViewed.length === 0) {
        return null;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Recently Viewed
                </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {recentlyViewed.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="group bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="aspect-square overflow-hidden bg-white dark:bg-gray-600">
                            <img
                                src={product.image || product.thumbnail}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
                                {product.title}
                            </h3>
                            <div className="flex items-center justify-between">
                                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                                    ₹{product.price}
                                </span>
                                {product.rating && (
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                            {product.rating}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
