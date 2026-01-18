import { useState } from "react";
import Navbar from "./components/navbar.jsx";
import Loader from "./components/Loader.jsx";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import Products from "./Pages/Products.jsx";
import ProductListing from "./Pages/ProductListing.jsx";
import ProductDetail from "./Pages/ProductDetail.jsx";
import Cart from "./Pages/Cart.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Login from "./Pages/Login.jsx";
import Signin from "./Pages/Signin.jsx";
import Signup from "./Pages/Signup.jsx";
import Checkout from "./Pages/Checkout.jsx";
import OrderTracking from "./Pages/OrderTracking.jsx";
import NotFound from "./Pages/NotFound.jsx";
import UserProfile from "./Pages/UserProfile.jsx";
import OrderHistory from "./Pages/OrderHistory.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext.jsx";
import NewsletterPopup from "./components/NewsletterPopup.jsx";
import ChatBot from "./components/ChatBot.jsx";

// Admin Imports
import AdminLayout from "./Pages/Admin/AdminLayout.jsx";
import AdminDashboard from "./Pages/Admin/Dashboard.jsx";
import AdminProducts from "./Pages/Admin/Products.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onLoadComplete={() => setLoading(false)} />;
  }

  return (
    <ToastProvider>
      <RecentlyViewedProvider>
        <NewsletterPopup />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<div className="p-6"><h1 className="text-3xl font-bold">Orders - Coming Soon</h1></div>} />
            <Route path="customers" element={<div className="p-6"><h1 className="text-3xl font-bold">Customers - Coming Soon</h1></div>} />
            <Route path="categories" element={<div className="p-6"><h1 className="text-3xl font-bold">Categories - Coming Soon</h1></div>} />
            <Route path="analytics" element={<div className="p-6"><h1 className="text-3xl font-bold">Analytics - Coming Soon</h1></div>} />
            <Route path="settings" element={<div className="p-6"><h1 className="text-3xl font-bold">Settings - Coming Soon</h1></div>} />
          </Route>

          {/* Customer Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product-listing" element={<ProductListing />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/track-order" element={<OrderTracking />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/orders" element={<OrderHistory />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <footer className="relative text-gray-800 dark:text-gray-200 pt-12 pb-6 w-full overflow-hidden">
                {/* Darker Blue and White Gradient Background */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-200 via-blue-400 to-blue-500 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 transition-colors duration-500" />
                {/* Neon Bubbles */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute rounded-full opacity-40 animate-pulse"
                      style={{
                        width: `${40 + Math.random() * 60}px`,
                        height: `${40 + Math.random() * 60}px`,
                        left: `${Math.random() * 90}%`,
                        top: `${Math.random() * 80}%`,

                        filter: 'blur(2px)',
                        animationDuration: `${2 + Math.random() * 3}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="container mx-auto px-6 relative z-10">
                  <div className="flex flex-col md:flex-row md:justify-between gap-10">
                    {/* Brand & Message */}
                    <div className="flex-1 min-w-55 md:mb-0">
                      <div className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Shop Smarter</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-4 max-w-xs">Explore trending products, enjoy smooth navigation, fast delivery, and a smarter way to shop online every day.</div>
                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-gray-700 dark:text-gray-300">Made with love for you</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-red-600"><path d="M12.62 20.84a1.75 1.75 0 0 1-1.24 0C7.1 19.13 2 15.36 2 10.28A5.28 5.28 0 0 1 7.28 5a5.13 5.13 0 0 1 4.72 3.13A5.13 5.13 0 0 1 16.72 5 5.28 5.28 0 0 1 22 10.28c0 5.08-5.1 8.85-9.38 10.56z" /></svg>
                      </div>
                    </div>
                    {/* Quick Links */}
                    <div className="flex-1 min-w-45">
                      <div className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Quick Links</div>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li><a href="/" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Home</a></li>
                        <li><a href="/products" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Products</a></li>
                        <li><a href="/about" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">About</a></li>
                        <li><a href="/contact" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Contact</a></li>
                        <li><a href="/cart" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Cart</a></li>
                      </ul>
                    </div>
                    {/* Categories */}
                    <div className="flex-1 min-w-45">
                      <div className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Categories</div>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li><a href="/products?category=Men" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Men</a></li>
                        <li><a href="/products?category=Women" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Women</a></li>
                        <li><a href="/products?category=Kids" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Kids</a></li>
                        <li><a href="/products?category=Footwear" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Footwear</a></li>
                        <li><a href="/products?category=Accessories" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Accessories</a></li>
                        <li><a href="/products?category=New%20Arrivals" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">New Arrivals</a></li>
                      </ul>
                    </div>
                    {/* Customer Services */}
                    <div className="flex-1 min-w-45">
                      <div className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Customer Services</div>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li><a href="/track-order" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Order Tracking</a></li>
                        <li><a href="/contact" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Returns & Refunds</a></li>
                        <li><a href="/contact" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Shipping Info</a></li>
                        <li><a href="/contact#faq" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">FAQs</a></li>
                        <li><a href="/contact" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold">Support</a></li>
                      </ul>
                    </div>
                    {/* Get in Touch */}
                    <div className="flex-1 min-w-55">
                      <div className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Get in Touch</div>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                        <li><span className="font-semibold text-gray-900 dark:text-white">Contact No:</span> <a href="tel:+911800123456" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold ml-1">+91 1800-123-4567</a></li>
                        <li><span className="font-semibold text-gray-900 dark:text-white">Email:</span> <a href="mailto:support@shopnow.com" className="hover:text-gray-900 dark:hover:text-white hover:font-semibold ml-1">support@shopnow.com</a></li>
                        <li><span className="font-semibold text-gray-900 dark:text-white">Address:</span> 123 Shopping Street, Connaught Place, New Delhi, Delhi - 110001, India</li>
                        <li><span className="font-semibold text-gray-900 dark:text-white">Support:</span> Mon-Sun, 24/7 Available</li>
                      </ul>
                    </div>
                  </div>
                  {/* Social Media Icons */}
                  <div className="mt-10 flex justify-center gap-8">
                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                      className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                      <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.991c-.003 5.451-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .06 5.435.058 12.086c0 2.13.557 4.21 1.615 6.033L.057 24l6.063-1.606a11.88 11.88 0 0 0 5.929 1.515h.005c6.554 0 11.89-5.435 11.893-12.085a11.86 11.86 0 0 0-3.48-8.422" /></svg>
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                      className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                      <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#1DA1F2" d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" /></svg>
                    </a>
                    <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                      className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                      <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#1877F3" d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
                    </a>
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                      className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                      <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#0077B5" d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zM7.5 20h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15 10.268h-3v-4.604c0-1.099-.021-2.513-1.531-2.513-1.531 0-1.767 1.197-1.767 2.434V20h-3v-9h2.881v1.233h.041c.401-.761 1.379-1.562 2.841-1.562 3.039 0 3.6 2.001 3.6 4.6V20z" /></svg>
                    </a>
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                      className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                      <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#E4405F" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.808 2.256 6.088 2.243 6.497 2.243 12c0 5.503.013 5.912.072 7.192.059 1.276.353 2.449 1.32 3.416.967.967 2.14 1.261 3.416 1.32 1.28.059 1.689.072 7.192.072s5.912-.013 7.192-.072c1.276-.059 2.449-.353 3.416-1.32.967-.967 1.261-2.14 1.32-3.416.059-1.28.072-1.689.072-7.192s-.013-5.912-.072-7.192c-.059-1.276-.353-2.449-1.32-3.416C21.449.425 20.276.131 19 .072 17.72.013 17.311 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                    </a>
                  </div>
                  <div className="mt-4 text-center text-gray-700 dark:text-gray-300 text-xs">&copy; {new Date().getFullYear()} Shop Smarter. All rights reserved.</div>
                </div>
              </footer>
              <ChatBot />
            </>
          } />
        </Routes>
      </RecentlyViewedProvider>
    </ToastProvider>
  );
}




