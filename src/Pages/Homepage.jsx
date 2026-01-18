import communityBg2 from '../assets/community-bg-2.jpg';
import placesBg2 from '../assets/places-bg-2.jpg';
import communityBg from '../assets/community-bg.jpg';
import placesBg from '../assets/places-bg.jpg';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { ArrowRight, ChevronLeft, ChevronRight, Star, TrendingUp, ShieldCheck, Truck, Sparkles, Heart, ShoppingCart, Eye, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Helper data (subset of what might be in the app)
// Conversion rate: 1 USD = 83 INR
const TOP_PICKS = [
    { id: 10001, title: 'Casual Sneakers', name: 'Casual Sneakers', price: 3735, priceDisplay: '₹3,735', thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', category: 'Footwear', description: 'Comfortable casual sneakers perfect for everyday wear', rating: 4.5, stock: 25 },
    { id: 10002, title: 'Leather Jacket', name: 'Leather Jacket', price: 9960, priceDisplay: '₹9,960', thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', category: 'Men', description: 'Premium leather jacket for a stylish look', rating: 4.8, stock: 15 },
    { id: 10003, title: 'Gold Watch', name: 'Gold Watch', price: 7055, priceDisplay: '₹7,055', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', category: 'Accessories', description: 'Elegant gold watch for special occasions', rating: 4.7, stock: 20 },
    { id: 10004, title: 'Summer Dress', name: 'Summer Dress', price: 2905, priceDisplay: '₹2,905', thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop', category: 'Women', description: 'Light and breezy summer dress', rating: 4.6, stock: 30 },
    { id: 10005, title: 'Designer Bag', name: 'Designer Bag', price: 7470, priceDisplay: '₹7,470', thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', category: 'Accessories', description: 'Luxury designer bag for fashion enthusiasts', rating: 4.9, stock: 12 },
    { id: 10006, title: 'Denim Jeans', name: 'Denim Jeans', price: 4565, priceDisplay: '₹4,565', thumbnail: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop', category: 'Women', description: 'Classic denim jeans for casual wear', rating: 4.5, stock: 35 },
    { id: 10007, title: 'Running Shoes', name: 'Running Shoes', price: 4980, priceDisplay: '₹4,980', thumbnail: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop', category: 'Footwear', description: 'High-performance running shoes', rating: 4.7, stock: 28 },
];

const HERO_SLIDES = [
    {
        id: 1,
        title: "Summer Collection 2026",
        subtitle: "Discover the hottest trends this season.",
        btnText: "Shop Now",
        img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop",
        link: "/products?category=New%20Arrivals"
    },
    {
        id: 2,
        title: "Premium Accessories",
        subtitle: "Elevate your style with our exclusive range.",
        btnText: "Explore",
        img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=900&fit=crop",
        link: "/products?category=Accessories"
    },
    {
        id: 3,
        title: "Exclusive Footwear",
        subtitle: "Step out in style with unparalleled comfort.",
        btnText: "View Collection",
        img: "https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=1600&h=900&fit=crop",
        link: "/products?category=Footwear"
    }
];

export default function Homepage() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const { addItem } = useCart();
    const { success, error, info } = useToast();

    const [counters, setCounters] = useState({
        customers: 0,
        products: 0,
        rating: 0,
        cities: 0,
    });

    useEffect(() => {
        const targets = {
            customers: 12450,
            products: 876,
            rating: 4.9,
            cities: 7,
        };

        const duration = 2000;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setCounters({
                customers: Math.floor(progress * targets.customers),
                products: Math.floor(progress * targets.products),
                cities: Math.floor(progress * targets.cities),
                rating: parseFloat((progress * targets.rating).toFixed(1))
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }, []);

    const handleAddToCart = (item) => {
        addItem({
            id: item.id,
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail,
            qty: 1
        });
        success(`${item.title} added to cart!`);
    };

    const [newsletterEmail, setNewsletterEmail] = useState('');

    const handleNewsletterSubscribe = (e) => {
        e.preventDefault();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!newsletterEmail) {
            error('Please enter your email address');
            return;
        }

        if (!emailRegex.test(newsletterEmail)) {
            error('Please enter a valid email address');
            return;
        }

        // Save to localStorage (you can replace this with API call)
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');

        // Check if already subscribed
        if (subscribers.includes(newsletterEmail.toLowerCase())) {
            info('You are already subscribed to our newsletter!');
            setNewsletterEmail('');
            return;
        }

        // Add new subscriber
        subscribers.push(newsletterEmail.toLowerCase());
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

        // Show success message
        success('🎉 Successfully subscribed! Check your email for 10% discount code.');

        // Reset form
        setNewsletterEmail('');
    };

    const scrollToCategories = () => {
        const categoriesSection = document.getElementById('categories');
        if (categoriesSection) {
            categoriesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className="relative min-h-screen font-sans">
            {/* Fixed Background Image for Entire Page */}
            <div
                className="fixed inset-0 bg-cover bg-center bg-fixed z-0"
                style={{ backgroundImage: `url('/image 1.jpg')` }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content Wrapper - All sections will be on top of the background */}
            <div className="relative z-10">

                {/* --- HERO SECTION --- */}
                <section className="relative h-[90vh] w-full overflow-hidden pt-20">
                    {/* Static Content Overlay */}
                    <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center text-white">
                        <div className="max-w-4xl animate-fade-in-up flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-pulse">
                                <Sparkles className="w-4 h-4 text-yellow-300" />
                                <span className="text-sm font-semibold text-yellow-100">Welcome To Future Of Shopping</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-2xl">
                                ShopNow <span className="text-blue-400">Shop Smarter</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light max-w-2xl leading-relaxed">
                                Where elegance meets everyday shopping.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-16">
                                <button
                                    onClick={scrollToCategories}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 active:scale-95"
                                >
                                    {/* Animated gradient background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-500"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Glow effect */}
                                    <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>

                                    {/* Shine effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>

                                    <span className="relative z-10 text-white">Shop Now</span>
                                    <ArrowRight className="relative z-10 w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" />
                                </button>

                                <Link
                                    to="/about"
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 active:scale-95"
                                >
                                    {/* Glass morphism background */}
                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-md border-2 border-white/30 transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/60"></div>

                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Glow effect */}
                                    <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>

                                    {/* Shine effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>

                                    <span className="relative z-10 text-white">Learn More</span>
                                </Link>
                            </div>

                            {/* Counters Section */}
                            <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up delay-300 w-full max-w-5xl">
                                <div className="group bg-black/40 backdrop-blur-md border-2 border-white/10 rounded-2xl p-6 min-w-[160px] transform hover:scale-110 hover:border-blue-400/50 transition-all duration-300 flex-1 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/30">
                                    <div className="text-4xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{counters.customers.toLocaleString()}+</div>
                                    <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold group-hover:text-blue-100 transition-colors">Happy Customers</div>
                                </div>
                                <div className="group bg-black/40 backdrop-blur-md border-2 border-white/10 rounded-2xl p-6 min-w-[160px] transform hover:scale-110 hover:border-purple-400/50 transition-all duration-300 flex-1 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/30">
                                    <div className="text-4xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{counters.products}+</div>
                                    <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold group-hover:text-purple-100 transition-colors">Products</div>
                                </div>
                                <div className="group bg-black/40 backdrop-blur-md border-2 border-white/10 rounded-2xl p-6 min-w-[160px] transform hover:scale-110 hover:border-yellow-400/50 transition-all duration-300 flex-1 cursor-pointer hover:shadow-2xl hover:shadow-yellow-500/30">
                                    <div className="text-4xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                                        {counters.rating} <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 group-hover:animate-pulse" />
                                    </div>
                                    <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold group-hover:text-yellow-100 transition-colors">Average Rating</div>
                                </div>
                                <div className="group bg-black/40 backdrop-blur-md border-2 border-white/10 rounded-2xl p-6 min-w-[160px] transform hover:scale-110 hover:border-green-400/50 transition-all duration-300 flex-1 cursor-pointer hover:shadow-2xl hover:shadow-green-500/30">
                                    <div className="text-4xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors">{counters.cities}+</div>
                                    <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold group-hover:text-green-100 transition-colors">Cities Served</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* --- SHOP BY CATEGORY SECTION --- */}
                <section id="categories" className="py-16 relative">
                    {/* Semi-transparent Overlay */}
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
                                Shop By Category
                            </h2>
                            <p className="text-gray-800 text-lg md:text-xl font-bold">
                                Everything you need, all in one place
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                {
                                    name: 'Men',
                                    img: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=300&fit=crop'
                                },
                                {
                                    name: 'Women',
                                    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop'
                                },
                                {
                                    name: 'Kids',
                                    img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=300&fit=crop'
                                },
                                {
                                    name: 'Footwear',
                                    img: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop'
                                },
                                {
                                    name: 'Accessories',
                                    img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop'
                                },
                                {
                                    name: 'New Arrivals',
                                    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop'
                                }
                            ].map((category) => (
                                <Link
                                    key={category.name}
                                    to={`/products?category=${category.name}`}
                                    className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0 bg-gray-200">
                                        <img
                                            src={category.img}
                                            alt={category.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                                        />
                                    </div>

                                    {/* Subtle bottom overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-all duration-300" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                                        <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                            {category.name}
                                        </h3>
                                        <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
                                            <span className="text-xs font-semibold uppercase tracking-wider">
                                                Shop Now
                                            </span>
                                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 group-hover:animate-bounce transition-transform duration-300" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- TOP PICKS SECTION (Carousel) --- */}
                <section className="py-12 relative overflow-hidden">
                    {/* Dark Semi-transparent Overlay */}
                    <div className="absolute inset-0 bg-gray-900/85 backdrop-blur-sm" />

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="relative mb-12">
                            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-pulse">
                                    <Sparkles className="w-4 h-4 text-yellow-300" />
                                    <span className="text-sm font-semibold text-yellow-100">Customer Favorites</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-4 leading-tight">
                                    Top Picks for You
                                </h2>
                                <p className="text-gray-300 text-lg max-w-lg mx-auto">
                                    Curated collection of our most popular items, selected just for your unique taste.
                                </p>
                            </div>

                            {/* Custom Navigation Buttons */}
                            <div className="flex justify-center md:absolute md:right-0 md:bottom-0 gap-4 mt-8 md:mt-0">
                                <button
                                    ref={prevRef}
                                    className="group w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center bg-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                                    aria-label="Previous Slide"
                                >
                                    <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                                </button>
                                <button
                                    ref={nextRef}
                                    className="group w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center bg-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg"
                                    aria-label="Next Slide"
                                >
                                    <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                                </button>
                            </div>
                        </div>

                        <Swiper
                            modules={[Autoplay, Navigation]}
                            spaceBetween={28}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                            speed={800}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }}
                            breakpoints={{
                                640: { slidesPerView: 2.5 },
                                768: { slidesPerView: 3.5 },
                                1024: { slidesPerView: 4.5 },
                                1280: { slidesPerView: 5.5 },
                            }}
                            className="pick-slider !pb-12 !px-2"
                        >
                            {TOP_PICKS.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 h-full border border-gray-100 flex flex-col transform hover:-translate-y-2">
                                        {/* Image Container */}
                                        <div className="relative h-64 overflow-hidden bg-gray-100 p-2">
                                            <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />

                                                {/* Badges */}
                                                <div className="absolute top-3 left-3 flex gap-2">
                                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm uppercase tracking-wide">
                                                        {item.category}
                                                    </span>
                                                </div>

                                                {/* Wishlist Button (Always visible but subtle, pops on hover) */}
                                                <button
                                                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all duration-300 transform md:opacity-0 md:translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 z-20"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        // Add wishlist logic here
                                                    }}
                                                >
                                                    <Heart className="w-5 h-5 transition-transform active:scale-75 hover:fill-current" />
                                                </button>

                                                {/* Overlay Actions */}
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 z-20">
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="flex-1 bg-white text-gray-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleAddToCart(item);
                                                            }}
                                                        >
                                                            <ShoppingCart className="w-4 h-4" />
                                                            Add to Cart
                                                        </button>
                                                        <Link
                                                            to={`/product/${item.id}`}
                                                            className="w-12 h-12 bg-white/90 backdrop-blur text-gray-900 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <Link to={`/product/${item.id}`}>
                                                    <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer">
                                                        {item.title}
                                                    </h3>
                                                </Link>
                                            </div>

                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="flex gap-0.5 text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star key={star} className={`w-3.5 h-3.5 ${star <= Math.floor(item.rating) ? 'fill-current' : 'text-gray-300 fill-gray-200'}`} />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500 font-medium">({item.rating} Rating)</span>
                                            </div>

                                            <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-400 font-medium line-through decoration-red-400">₹{Math.floor(item.price * 1.2)}</span>
                                                    <span className="text-2xl font-extrabold text-gray-900">{item.priceDisplay}</span>
                                                </div>
                                                <Link
                                                    to={`/product/${item.id}`}
                                                    className="group/btn flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                                >
                                                    <ArrowRight className="w-5 h-5 transform group-hover/btn:-rotate-45 transition-transform duration-300" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>



                {/* --- PLACES WE SERVE SECTION --- */}
                <section className="py-20 relative">
                    {/* Unique Gradient Overlay - Teal to Cyan */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-600/90 via-cyan-600/85 to-blue-700/90 backdrop-blur-sm" />

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full mb-4">
                                <Truck className="w-4 h-4 text-yellow-300" />
                                <span className="text-sm font-bold text-white uppercase tracking-wider">Delivering quality products</span>
                            </div>
                            <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
                                Places We Serve
                            </h2>
                            <p className="text-white/90 text-lg font-medium">
                                Reliable delivery across major cities and growing regions.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {[
                                { name: 'Jaipur', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&h=500&fit=crop' },
                                { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=500&h=500&fit=crop' },
                                { name: 'Delhi', img: 'https://images.unsplash.com/photo-1678966432189-d58296e45ad2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGVsaGl8ZW58MHx8MHx8fDA%3D' },
                                { name: 'Bangalore', img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=500&h=500&fit=crop' },
                                { name: 'Hyderabad', img: 'https://images.unsplash.com/photo-1657981630164-769503f3a9a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aHlkZXJhYmFkfGVufDB8fDB8fHww' },
                                { name: 'Chennai', img: 'https://images.unsplash.com/photo-1616843413587-9e3a37f7bbd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlbm5haXxlbnwwfHwwfHx8MA%3D%3D' },
                                { name: 'Kolkata', img: 'https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a29sa2F0YXxlbnwwfHwwfHx8MA%3D%3D' }
                            ].map((city) => (
                                <div key={city.name} className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-gray-200">
                                        <img
                                            src={city.img}
                                            alt={city.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md transform transition-transform duration-300 group-hover:scale-110">
                                            {city.name}
                                        </h3>
                                        <div className="h-0.5 w-0 bg-blue-600 group-hover:w-12 transition-all duration-300" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- NEWSLETTER --- */}
                <section className="py-20 relative overflow-hidden">
                    {/* Bluish Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-indigo-600/85 to-purple-600/90 backdrop-blur-sm"></div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Shopping Community</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Get 10% off your first order and stay updated with our latest offers and products.
                        </p>
                        <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                className="flex-grow px-6 py-4 rounded-full bg-white/95 backdrop-blur-md border-2 border-white/50 text-gray-900 placeholder-gray-500 font-medium shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 focus:bg-white transition-all duration-300 hover:shadow-2xl hover:border-white"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>

            </div>
            {/* End Content Wrapper */}
        </div>
    );
}
