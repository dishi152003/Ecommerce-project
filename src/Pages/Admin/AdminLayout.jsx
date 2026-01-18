import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Store,
    BarChart3,
    Tag
} from 'lucide-react';

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Products', href: '/admin/products', icon: Package },
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
        { name: 'Customers', href: '/admin/customers', icon: Users },
        { name: 'Categories', href: '/admin/categories', icon: Tag },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const isActive = (path) => {
        if (path === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                {/* Logo */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-gray-700">
                    <Link to="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Store className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold">ShopNow</h1>
                            <p className="text-xs text-gray-400">Admin Panel</p>
                        </div>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-160px)]">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    group flex items-center justify-between px-4 py-3 rounded-xl
                                    transition-all duration-200
                                    ${active
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                                    <span className="font-semibold">{item.name}</span>
                                </div>
                                {active && <ChevronRight className="w-5 h-5" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">AD</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold">Admin User</p>
                            <p className="text-xs text-gray-400">admin@shopnow.com</p>
                        </div>
                    </div>
                    <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-semibold">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-72">
                {/* Top Bar */}
                <header className="h-20 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center px-6">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600 hover:text-gray-900 mr-4"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex-1 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
                            </h2>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition-colors"
                            >
                                View Store
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
