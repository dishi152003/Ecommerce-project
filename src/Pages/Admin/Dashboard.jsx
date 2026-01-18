import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ShoppingBag,
    Users,
    DollarSign,
    TrendingUp,
    Package,
    ShoppingCart,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalRevenue: 245680,
        totalOrders: 1234,
        totalCustomers: 856,
        totalProducts: 876,
        revenueGrowth: 12.5,
        ordersGrowth: 8.3,
        customersGrowth: 15.2,
        productsGrowth: 5.7
    });

    const [recentOrders, setRecentOrders] = useState([
        { id: '#ORD-2024-001', customer: 'Dishi Jain', amount: '₹4,565', status: 'completed', date: '2024-01-12' },
        { id: '#ORD-2024-002', customer: 'Sandali Saxena', amount: '₹7,890', status: 'pending', date: '2024-01-12' },
        { id: '#ORD-2024-003', customer: 'Kunal Sharma', amount: '₹3,245', status: 'processing', date: '2024-01-11' },
        { id: '#ORD-2024-004', customer: 'Palak Goyal', amount: '₹9,120', status: 'completed', date: '2024-01-11' },
        { id: '#ORD-2024-005', customer: 'Anish Agarwal', amount: '₹5,670', status: 'cancelled', date: '2024-01-10' },
    ]);

    const [topProducts, setTopProducts] = useState([
        { name: 'Casual Sneakers', sales: 245, revenue: '₹91,575', trend: 'up' },
        { name: 'Leather Jacket', sales: 189, revenue: '₹1,88,244', trend: 'up' },
        { name: 'Designer Bag', sales: 156, revenue: '₹1,16,532', trend: 'down' },
        { name: 'Gold Watch', sales: 134, revenue: '₹94,537', trend: 'up' },
        { name: 'Summer Dress', sales: 128, revenue: '₹37,184', trend: 'up' },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'processing': return <AlertCircle className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Today's Date</p>
                                <p className="text-lg font-bold text-gray-900">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Revenue */}
                    <div className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <DollarSign className="w-7 h-7" />
                            </div>
                            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${stats.revenueGrowth >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                {stats.revenueGrowth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                <span className="text-sm font-bold">{Math.abs(stats.revenueGrowth)}%</span>
                            </div>
                        </div>
                        <h3 className="text-white/80 text-sm font-semibold mb-2">Total Revenue</h3>
                        <p className="text-3xl font-extrabold">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
                        <p className="text-white/70 text-xs mt-2">+₹12,450 from last month</p>
                    </div>

                    {/* Total Orders */}
                    <div className="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <ShoppingCart className="w-7 h-7" />
                            </div>
                            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${stats.ordersGrowth >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                {stats.ordersGrowth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                <span className="text-sm font-bold">{Math.abs(stats.ordersGrowth)}%</span>
                            </div>
                        </div>
                        <h3 className="text-white/80 text-sm font-semibold mb-2">Total Orders</h3>
                        <p className="text-3xl font-extrabold">{stats.totalOrders.toLocaleString('en-IN')}</p>
                        <p className="text-white/70 text-xs mt-2">+95 from last month</p>
                    </div>

                    {/* Total Customers */}
                    <div className="group bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Users className="w-7 h-7" />
                            </div>
                            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${stats.customersGrowth >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                {stats.customersGrowth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                <span className="text-sm font-bold">{Math.abs(stats.customersGrowth)}%</span>
                            </div>
                        </div>
                        <h3 className="text-white/80 text-sm font-semibold mb-2">Total Customers</h3>
                        <p className="text-3xl font-extrabold">{stats.totalCustomers.toLocaleString('en-IN')}</p>
                        <p className="text-white/70 text-xs mt-2">+113 new customers</p>
                    </div>

                    {/* Total Products */}
                    <div className="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Package className="w-7 h-7" />
                            </div>
                            <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${stats.productsGrowth >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                {stats.productsGrowth >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                <span className="text-sm font-bold">{Math.abs(stats.productsGrowth)}%</span>
                            </div>
                        </div>
                        <h3 className="text-white/80 text-sm font-semibold mb-2">Total Products</h3>
                        <p className="text-3xl font-extrabold">{stats.totalProducts.toLocaleString('en-IN')}</p>
                        <p className="text-white/70 text-xs mt-2">+47 new products</p>
                    </div>
                </div>

                {/* Recent Orders & Top Products */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                                <Link to="/admin/orders" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                                    View All
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-bold text-gray-900">{order.id}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-700">{order.customer}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-bold text-gray-900">{order.amount}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-600">{order.date}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                                                    <Eye className="w-4 h-4" />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
                            <p className="text-sm text-gray-600 mt-1">Best selling items this month</p>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {topProducts.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
                                            <p className="text-xs text-gray-600 mt-1">{product.sales} sales</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-900">{product.revenue}</p>
                                            <div className={`flex items-center gap-1 justify-end mt-1 ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                                {product.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                                <span className="text-xs font-bold">{product.trend === 'up' ? '+' : '-'}12%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
