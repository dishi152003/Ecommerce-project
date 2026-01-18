import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, Eye, Download } from 'lucide-react';

export default function OrderHistory() {
    const [filter, setFilter] = useState('all');

    // Sample order data
    const orders = [
        {
            id: 'ORD-2026-001',
            date: 'Jan 15, 2026',
            status: 'delivered',
            total: 2499,
            items: 2,
            products: [
                { name: 'Premium Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop', qty: 1 },
                { name: 'Smart Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop', qty: 1 }
            ]
        },
        {
            id: 'ORD-2026-002',
            date: 'Jan 12, 2026',
            status: 'shipped',
            total: 1899,
            items: 1,
            products: [
                { name: 'Designer Sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop', qty: 1 }
            ]
        },
        {
            id: 'ORD-2026-003',
            date: 'Jan 10, 2026',
            status: 'processing',
            total: 3499,
            items: 3,
            products: [
                { name: 'Leather Wallet', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop', qty: 2 },
                { name: 'Casual Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop', qty: 1 }
            ]
        },
        {
            id: 'ORD-2026-004',
            date: 'Jan 8, 2026',
            status: 'cancelled',
            total: 999,
            items: 1,
            products: [
                { name: 'Phone Case', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=100&h=100&fit=crop', qty: 1 }
            ]
        },
        {
            id: 'ORD-2026-005',
            date: 'Jan 5, 2026',
            status: 'delivered',
            total: 5999,
            items: 2,
            products: [
                { name: 'Laptop Bag', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop', qty: 1 },
                { name: 'Wireless Mouse', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop', qty: 1 }
            ]
        }
    ];

    const statusConfig = {
        delivered: { icon: CheckCircle, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30', label: 'Delivered' },
        shipped: { icon: Package, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30', label: 'Shipped' },
        processing: { icon: Clock, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30', label: 'Processing' },
        cancelled: { icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', label: 'Cancelled' }
    };

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.status === filter);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Order History</h1>
                    <p className="text-gray-600 dark:text-gray-400">View and track all your orders</p>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6">
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${filter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            All Orders ({orders.length})
                        </button>
                        <button
                            onClick={() => setFilter('delivered')}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${filter === 'delivered'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            Delivered ({orders.filter(o => o.status === 'delivered').length})
                        </button>
                        <button
                            onClick={() => setFilter('shipped')}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${filter === 'shipped'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            Shipped ({orders.filter(o => o.status === 'shipped').length})
                        </button>
                        <button
                            onClick={() => setFilter('processing')}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${filter === 'processing'
                                    ? 'bg-yellow-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            Processing ({orders.filter(o => o.status === 'processing').length})
                        </button>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.map((order) => {
                        const StatusIcon = statusConfig[order.status].icon;

                        return (
                            <div
                                key={order.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                    {/* Order Info */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                {order.id}
                                            </h3>
                                            <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                                                <StatusIcon className="w-4 h-4" />
                                                {statusConfig[order.status].label}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Placed on {order.date} • {order.items} items
                                        </p>
                                    </div>

                                    {/* Total */}
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            ₹{order.total.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Products */}
                                <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2">
                                    {order.products.map((product, idx) => (
                                        <div key={idx} className="flex-shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Link
                                        to="/track-order"
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Track Order
                                    </Link>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                        <Download className="w-4 h-4" />
                                        Download Invoice
                                    </button>
                                    {order.status === 'delivered' && (
                                        <button className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                                            Write Review
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            No orders found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            You don't have any {filter !== 'all' ? filter : ''} orders yet.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
