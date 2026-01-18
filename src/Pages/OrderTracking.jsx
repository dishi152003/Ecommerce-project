import { useState } from 'react';
import { Package, MapPin, Truck, CheckCircle, Clock, Search } from 'lucide-react';

export default function OrderTracking() {
    const [orderId, setOrderId] = useState('');
    const [trackingData, setTrackingData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTrack = (e) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setTrackingData({
                orderId: orderId,
                status: 'In Transit',
                estimatedDelivery: 'Jan 20, 2026',
                currentLocation: 'Mumbai Distribution Center',
                timeline: [
                    {
                        status: 'Order Placed',
                        description: 'Your order has been confirmed',
                        date: 'Jan 15, 2026 10:30 AM',
                        completed: true
                    },
                    {
                        status: 'Processing',
                        description: 'Order is being prepared',
                        date: 'Jan 15, 2026 02:15 PM',
                        completed: true
                    },
                    {
                        status: 'Shipped',
                        description: 'Package has been dispatched',
                        date: 'Jan 16, 2026 09:00 AM',
                        completed: true
                    },
                    {
                        status: 'In Transit',
                        description: 'Package is on the way',
                        date: 'Jan 17, 2026 06:45 PM',
                        completed: true,
                        current: true
                    },
                    {
                        status: 'Out for Delivery',
                        description: 'Package is out for delivery',
                        date: 'Pending',
                        completed: false
                    },
                    {
                        status: 'Delivered',
                        description: 'Package has been delivered',
                        date: 'Pending',
                        completed: false
                    }
                ],
                items: [
                    {
                        name: 'Casual Sneakers',
                        quantity: 1,
                        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop'
                    },
                    {
                        name: 'Designer Bag',
                        quantity: 1,
                        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop'
                    }
                ]
            });
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-4">
                        <Package className="w-4 h-4" />
                        <span className="text-sm font-semibold">Track Your Order</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                        Order Tracking
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Enter your order ID to track your package in real-time
                    </p>
                </div>

                {/* Search Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
                    <form onSubmit={handleTrack} className="flex gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="Enter Order ID (e.g., ORD123456)"
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Tracking...
                                </>
                            ) : (
                                <>
                                    <Truck className="w-5 h-5" />
                                    Track
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Tracking Results */}
                {trackingData && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Status Card */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-blue-100 text-sm mb-1">Order ID</p>
                                    <p className="text-2xl font-bold">{trackingData.orderId}</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <p className="font-semibold">{trackingData.status}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-blue-100">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">Estimated Delivery: {trackingData.estimatedDelivery}</span>
                            </div>
                            <div className="flex items-center gap-2 text-blue-100 mt-2">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">Current Location: {trackingData.currentLocation}</span>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Tracking Timeline</h2>
                            <div className="space-y-6">
                                {trackingData.timeline.map((step, index) => (
                                    <div key={index} className="relative flex gap-4">
                                        {/* Line */}
                                        {index < trackingData.timeline.length - 1 && (
                                            <div className={`absolute left-5 top-12 w-0.5 h-full ${step.completed ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                        )}

                                        {/* Icon */}
                                        <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${step.current
                                                ? 'bg-blue-500 ring-4 ring-blue-200 dark:ring-blue-900'
                                                : step.completed
                                                    ? 'bg-blue-500'
                                                    : 'bg-gray-300 dark:bg-gray-600'
                                            }`}>
                                            {step.completed ? (
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            ) : (
                                                <div className="w-3 h-3 bg-white rounded-full"></div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-8">
                                            <div className={`font-bold ${step.current ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                                                {step.status}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{step.description}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{step.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Order Items</h2>
                            <div className="space-y-4">
                                {trackingData.items.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!trackingData && !isLoading && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Tracking Data</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Enter your order ID above to track your package
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
