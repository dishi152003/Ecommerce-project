import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Clock, Star } from 'lucide-react';

export default function FlashSales() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 12,
        minutes: 30,
        seconds: 45
    });

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    // Reset to 24 hours when countdown ends
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Sample flash sale products
    const flashSaleProducts = [
        {
            id: 1,
            title: 'Premium Wireless Headphones',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
            originalPrice: 4999,
            salePrice: 2499,
            discount: 50,
            rating: 4.5,
            stock: 15
        },
        {
            id: 2,
            title: 'Smart Watch Pro',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
            originalPrice: 8999,
            salePrice: 5399,
            discount: 40,
            rating: 4.7,
            stock: 8
        },
        {
            id: 3,
            title: 'Designer Sunglasses',
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
            originalPrice: 2999,
            salePrice: 1499,
            discount: 50,
            rating: 4.3,
            stock: 20
        },
        {
            id: 4,
            title: 'Leather Wallet',
            image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
            originalPrice: 1999,
            salePrice: 999,
            discount: 50,
            rating: 4.6,
            stock: 12
        }
    ];

    return (
        <section className="relative py-12 px-4 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-900 dark:via-orange-900 dark:to-yellow-900 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4">
                        <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
                        <span className="text-white font-bold">Limited Time Offer</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        ⚡ Flash Sales ⚡
                    </h2>
                    <p className="text-white/90 text-lg">Hurry! Deals end soon</p>
                </div>

                {/* Countdown Timer */}
                <div className="flex justify-center gap-4 mb-8">
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 min-w-[80px] text-center">
                        <div className="text-3xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                        <div className="text-xs text-white/80 uppercase">Hours</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 min-w-[80px] text-center">
                        <div className="text-3xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                        <div className="text-xs text-white/80 uppercase">Minutes</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 min-w-[80px] text-center">
                        <div className="text-3xl font-bold text-white animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</div>
                        <div className="text-xs text-white/80 uppercase">Seconds</div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {flashSaleProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            {/* Discount Badge */}
                            <div className="relative">
                                <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                                    {product.discount}% OFF
                                </div>
                                <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                    {product.title}
                                </h3>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                                        ₹{product.salePrice}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                        ₹{product.originalPrice}
                                    </span>
                                </div>

                                {/* Stock */}
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-orange-500" />
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Only {product.stock} left!
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-8">
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                        View All Flash Deals
                        <Zap className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
