import { useState, useEffect } from "react";
import { Search, Sun, Moon, ShoppingBag, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { searchProducts } from '../data/productDatabase';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const totalCount = items ? items.reduce((s, i) => s + (i.qty || 0), 0) : 0;
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState(null); // null = not searching, [] = no results, [..] = results
  const [searching, setSearching] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const categories = ['Men', 'Women', 'Kids', 'Accessories', 'Footwear', 'New Arrivals'];

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesOpen && !event.target.closest('.categories-dropdown')) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [categoriesOpen]);

  // Local product search - replaces API call
  useEffect(() => {
    if (search.length < 2) {
      setSuggestions([]);
      console.log('Search too short, clearing suggestions');
      return;
    }
    console.log('Searching local products for:', search);

    // Search local product database
    const results = searchProducts(search);
    console.log('Found', results.length, 'products');
    setSuggestions(results.slice(0, 6)); // Show max 6 suggestions
  }, [search]);

  // Search handler for icon click
  const handleSearch = (e) => {
    e && e.preventDefault && e.preventDefault();
    if (!search || search.length < 2) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }
    setSearching(true);

    // Search local product database
    setTimeout(() => {
      const results = searchProducts(search);
      console.log('Search results:', results.length, 'products');
      setSearchResults(results);
      setShowSuggestions(false);
      setSearching(false);
    }, 300); // Small delay to show loading state
  };

  // Handler for when user clicks on a product
  const handleProductClick = () => {
    setShowSuggestions(false);
    setSearchResults(null);
    setSearch(''); // Clear search input
    console.log('Product clicked, clearing search');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg transition-all duration-300 border-b border-gray-200 dark:border-gray-700 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* LEFT SECTION - Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white transition-all duration-300 flex items-center gap-2 group hover:scale-105">
              <ShoppingBag className="w-8 h-8 text-blue-600 transition-all duration-500 group-hover:scale-110" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                ShopNow
              </span>
            </Link>
          </div>

          {/* CENTER SECTION - Desktop Menu */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <ul className="flex items-center space-x-8 font-medium text-gray-700 dark:text-gray-200">
              <li>
                <Link to="/" className="relative group py-2 px-1 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                  <span className="relative z-10">Home</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li className="relative z-50 categories-dropdown">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="relative group py-2 px-1 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-all duration-300"
                >
                  <span className="relative z-10">Categories</span>
                  <svg className={`w-4 h-4 transition-all duration-300 ${categoriesOpen ? 'rotate-180 text-blue-600' : 'group-hover:translate-y-0.5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
                {categoriesOpen && (
                  <div className="absolute left-0 top-full mt-2 w-48 z-[100]">
                    <div className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-600 rounded-xl shadow-2xl py-2 transition-all duration-300 overflow-hidden">
                      {categories.map((category, index) => (
                        <Link
                          key={category}
                          to={`/products?category=${encodeURIComponent(category)}`}
                          className="block px-4 py-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 text-gray-800 dark:text-gray-200 transition-all duration-200 hover:pl-6 hover:font-semibold"
                          onClick={() => setCategoriesOpen(false)}
                          style={{ transitionDelay: `${index * 30}ms` }}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
              <li>
                <Link to="/cart" className="relative group py-2 px-1 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                  <span className="relative z-10">Cart</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="relative group py-2 px-1 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                  <span className="relative z-10">About</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="relative group py-2 px-1 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                  <span className="relative z-10">Contact</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT SECTION - Search, Theme, Login, Wishlist, Cart, Mobile Menu */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Search Bar - Now visible on md screens */}
            <div className="hidden md:block relative z-50">
              <div className="flex items-center border-2 dark:border-gray-600 rounded-full px-4 py-2 bg-gray-50 dark:bg-gray-800 transition-all hover:border-blue-400 dark:hover:border-blue-500 w-64 lg:w-72 shadow-sm">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="outline-none px-2 py-1 w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm font-medium"
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                    setSearchResults(null);
                    console.log('Search value:', e.target.value, 'Show suggestions:', true);
                  }}
                  onFocus={() => {
                    setShowSuggestions(true);
                    console.log('Input focused, showing suggestions');
                  }}
                  onBlur={() => setTimeout(() => {
                    setShowSuggestions(false);
                    console.log('Input blurred, hiding suggestions');
                  }, 300)}
                  autoComplete="off"
                  onKeyDown={e => { if (e.key === 'Enter') handleSearch(e); }}
                />
                <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" onClick={handleSearch} aria-label="Search">
                  <Search className="w-5 h-5" />
                </button>
              </div>


              {/* Suggestions Dropdown with Images */}
              {showSuggestions && (
                <div className="absolute left-0 top-full mt-2 w-full md:w-96 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-700 rounded-xl shadow-2xl z-[100] max-h-96 overflow-auto">
                  {suggestions.length > 0 ? suggestions.map(s => (
                    <Link
                      key={s.id}
                      to={`/product/${s.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 border-b dark:border-gray-700 last:border-b-0 transition-all group"
                      onClick={handleProductClick}
                    >
                      <img
                        src={s.thumbnail || s.images?.[0] || 'https://via.placeholder.com/50'}
                        alt={s.title}
                        className="w-12 h-12 object-cover rounded-lg shadow-sm group-hover:scale-110 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {s.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ₹{s.price?.toLocaleString('en-IN') || 'N/A'}
                        </p>
                      </div>
                    </Link>
                  )) : (
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm text-center">No suggestions found</div>
                  )}
                </div>
              )}

              {/* Search Results Dropdown with Images */}
              {searchResults && (
                <div className="absolute left-0 top-full mt-2 w-full md:w-96 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-700 rounded-xl shadow-2xl z-[100] max-h-96 overflow-auto">
                  {searching ? (
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm text-center flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? searchResults.map(s => (
                    <Link
                      key={s.id}
                      to={`/product/${s.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 border-b dark:border-gray-700 last:border-b-0 transition-all group"
                      onClick={handleProductClick}
                    >
                      <img
                        src={s.thumbnail || s.images?.[0] || 'https://via.placeholder.com/50'}
                        alt={s.title}
                        className="w-14 h-14 object-cover rounded-lg shadow-md group-hover:scale-110 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {s.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {s.description || 'No description'}
                        </p>
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                          ₹{s.price?.toLocaleString('en-IN') || 'N/A'}
                        </p>
                      </div>
                    </Link>
                  )) : (
                    <div className="px-4 py-8 text-gray-500 dark:text-gray-400 text-sm text-center">
                      <p className="font-semibold mb-1">Sorry, item not available</p>
                      <p className="text-xs">Try searching for something else</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-yellow-400"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative border dark:border-gray-600 px-3 py-1.5 rounded-full hover:bg-black hover:text-white dark:text-gray-200 dark:hover:bg-white dark:hover:text-black transition"
            >
              🛒
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full font-semibold">
                {totalCount}
              </span>
            </Link>

            {/* Login / Welcome User */}
            {user ? (
              <div className="hidden md:flex items-center gap-2 ml-2">
                <span className="text-gray-700 dark:text-gray-300 text-sm flex items-center">Welcome, <span className="font-semibold text-blue-600 dark:text-blue-400 ml-1">{user.username}</span></span>
                <button
                  onClick={logout}
                  className="border dark:border-gray-600 px-3 py-1.5 rounded-full hover:bg-red-500 hover:text-white dark:text-gray-200 transition text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/signup"
                className="hidden md:block border dark:border-gray-600 px-4 py-1.5 rounded-full hover:bg-black hover:text-white dark:text-gray-200 dark:hover:bg-white dark:hover:text-black transition text-sm font-medium ml-2"
              >
                Sign Up
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl text-gray-700 dark:text-white p-2"
            >
              ☰
            </button>
          </div>
        </div>
      </div>


      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md border-t dark:border-gray-800">
          {/* Mobile Search */}
          <div className="flex items-center border dark:border-gray-700 rounded px-2 my-3 mx-4 bg-gray-50 dark:bg-gray-800 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none px-2 py-1 w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              value={search}
              onChange={e => { setSearch(e.target.value); setShowSuggestions(true); setSearchResults(null); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              autoComplete="off"
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(e); }}
            />
            <button className="text-gray-500 dark:text-gray-400" onClick={handleSearch} aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            {/* Same suggestions/results logic repeated for mobile, ensuring styles match */}
            {showSuggestions && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-700 rounded-xl shadow-2xl z-[100] max-h-96 overflow-auto">
                {suggestions.length > 0 ? suggestions.map(s => (
                  <Link
                    key={s.id}
                    to={`/product/${s.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 border-b dark:border-gray-700 last:border-b-0 transition-all group"
                    onClick={handleProductClick}
                  >
                    <img
                      src={s.thumbnail || s.images?.[0] || 'https://via.placeholder.com/50'}
                      alt={s.title}
                      className="w-12 h-12 object-cover rounded-lg shadow-sm group-hover:scale-110 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {s.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ₹{s.price?.toLocaleString('en-IN') || 'N/A'}
                      </p>
                    </div>
                  </Link>
                )) : (
                  <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm text-center">No suggestions found</div>
                )}
              </div>
            )}
            {searchResults && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-gray-700 rounded-xl shadow-2xl z-[100] max-h-96 overflow-auto">
                {searching ? (
                  <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm text-center flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? searchResults.map(s => (
                  <Link
                    key={s.id}
                    to={`/product/${s.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 border-b dark:border-gray-700 last:border-b-0 transition-all group"
                    onClick={handleProductClick}
                  >
                    <img
                      src={s.thumbnail || s.images?.[0] || 'https://via.placeholder.com/50'}
                      alt={s.title}
                      className="w-14 h-14 object-cover rounded-lg shadow-md group-hover:scale-110 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {s.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {s.description || 'No description'}
                      </p>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                        ₹{s.price?.toLocaleString('en-IN') || 'N/A'}
                      </p>
                    </div>
                  </Link>
                )) : (
                  <div className="px-4 py-8 text-gray-500 dark:text-gray-400 text-sm text-center">
                    <p className="font-semibold mb-1">Sorry, item not available</p>
                    <p className="text-xs">Try searching for something else</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <ul className="flex flex-col p-4 space-y-4 text-gray-700 dark:text-gray-200">
            {/* Mobile Theme Toggle */}
            <li className="flex justify-between items-center">
              <span>Appearance</span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-yellow-400 border dark:border-gray-700"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </li>

            <li><Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
            <li>
              <button onClick={() => setCategoriesOpen(!categoriesOpen)} className="flex items-center gap-1 w-full text-left hover:text-blue-600 dark:hover:text-blue-400">
                Categories
                <svg className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {categoriesOpen && (
                <ul className="ml-4 mt-2 space-y-2 border-l pl-4 dark:border-gray-700">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        to={`/products?category=${encodeURIComponent(category)}`}
                        onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li><Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">Cart</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">About</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
            {user ? (
              <li className="border-t dark:border-gray-700 pt-2 mt-2">
                <div className="text-gray-700 dark:text-gray-300 mb-2">Welcome, <span className="font-semibold text-blue-600 dark:text-blue-400">{user.username}</span></div>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="w-full text-left text-red-600 hover:text-red-800 dark:hover:text-red-400"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li><Link to="/signup" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400">Sign Up</Link></li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
