import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Star, Sparkles, TrendingUp } from 'lucide-react';

export default function Loader({ onLoadComplete }) {
    const [progress, setProgress] = useState(0);
    const [loadingMessage, setLoadingMessage] = useState('Initializing...');
    const [particles, setParticles] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    // Generate floating particles
    useEffect(() => {
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 8 + 4,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
        }));
        setParticles(newParticles);
    }, []);

    // Update loading messages based on progress
    useEffect(() => {
        if (progress < 25) {
            setLoadingMessage('Preparing your shopping experience...');
        } else if (progress < 50) {
            setLoadingMessage('Loading amazing products...');
        } else if (progress < 75) {
            setLoadingMessage('Setting up exclusive deals...');
        } else if (progress < 100) {
            setLoadingMessage('Almost ready...');
        } else {
            setLoadingMessage('Welcome to ShopNow!');
        }
    }, [progress]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onLoadComplete(), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onLoadComplete]);

    const floatingIcons = [
        { Icon: ShoppingBag, delay: 0, color: '#3b82f6' },
        { Icon: Heart, delay: 0.5, color: '#8b5cf6' },
        { Icon: Star, delay: 1, color: '#ec4899' },
        { Icon: Sparkles, delay: 1.5, color: '#06b6d4' },
        { Icon: TrendingUp, delay: 2, color: '#f59e0b' },
    ];

    return (
        <div className="fixed inset-0 bg-cover bg-center bg-no-repeat flex items-center justify-center z-50 overflow-hidden"
            style={{ backgroundImage: `url('/image 1.jpg')` }}>

            {/* Enhanced dark overlay with gradient - MATCHING HOMEPAGE */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-blue-900/70"></div>

            {/* Animated floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full bg-white/20 animate-float-particle"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Animated background circles - MATCHING HOMEPAGE */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl top-20 left-10 animate-float"></div>
                <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-20 right-10 animate-float-delayed"></div>
                <div className="absolute w-48 h-48 bg-pink-500/10 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse"></div>
            </div>

            {/* Floating icons around the main loader */}
            <div className="absolute inset-0 pointer-events-none">
                {floatingIcons.map(({ Icon, delay, color }, index) => (
                    <div
                        key={index}
                        className="absolute animate-orbit"
                        style={{
                            left: '50%',
                            top: '50%',
                            animationDelay: `${delay}s`,
                        }}
                    >
                        <Icon
                            size={24}
                            style={{
                                color: color,
                                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))',
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="relative z-10 text-center">
                {/* Top Badge - MATCHING HOMEPAGE STYLE */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-400/30 px-6 py-3 rounded-full shadow-lg mb-8 animate-pulse">
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
                    <span className="text-sm font-bold text-yellow-100 uppercase tracking-wide">Welcome To Future Of Shopping</span>
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
                </div>

                {/* Interactive 3D Logo Circle with hover effect */}
                <div
                    className="relative mb-8 mx-auto w-44 h-44 transition-transform duration-500 cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        transform: isHovered ? 'scale(1.1) rotateY(10deg)' : 'scale(1)',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* Outer rotating rings with multiple layers */}
                    <div className="absolute inset-0 rounded-full border-4 border-blue-400/40 animate-spin-slow"></div>
                    <div className="absolute inset-1 rounded-full border-2 border-purple-400/30 animate-spin-reverse"></div>

                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ripple"></div>

                    {/* Main circle with enhanced 3D effect - MATCHING HOMEPAGE COLORS */}
                    <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white via-blue-50 to-purple-100 shadow-2xl flex items-center justify-center transform transition-all duration-500"
                        style={{
                            boxShadow: isHovered
                                ? '0 30px 80px rgba(59, 130, 246, 0.5), inset 0 -15px 30px rgba(0,0,0,0.15), inset 0 15px 30px rgba(255,255,255,0.6)'
                                : '0 20px 60px rgba(59, 130, 246, 0.4), inset 0 -10px 20px rgba(0,0,0,0.1), inset 0 10px 20px rgba(255,255,255,0.5)'
                        }}>

                        {/* Gradient Definitions - MATCHING HOMEPAGE THEME */}
                        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                            <defs>
                                <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="50%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                                <linearGradient id="icon-gradient-hover" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#06b6d4" />
                                    <stop offset="50%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* 3D Shop Icon with Enhanced Animation */}
                        <div className="flex items-center justify-center animate-zoom-pulse-smooth">
                            <ShoppingBag
                                size={72}
                                strokeWidth={1.5}
                                stroke={isHovered ? "url(#icon-gradient-hover)" : "url(#icon-gradient)"}
                                className="transition-all duration-500"
                                style={{
                                    filter: 'drop-shadow(4px 4px 12px rgba(0,0,0,0.4))',
                                    transform: 'perspective(100px) translateZ(10px)',
                                    fill: 'rgba(255, 255, 255, 0.5)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Enhanced inner glow - MATCHING HOMEPAGE COLORS */}
                    <div className="absolute inset-5 rounded-full bg-gradient-to-br from-blue-400/50 to-purple-600/50 blur-xl animate-pulse-glow"></div>
                    <div className="absolute inset-6 rounded-full bg-gradient-to-br from-pink-400/40 to-blue-600/40 blur-lg animate-pulse-glow delay-500"></div>
                </div>

                {/* Brand Name - MATCHING HOMEPAGE */}
                <h1 className="text-5xl md:text-6xl font-extrabold mb-2 tracking-wider drop-shadow-2xl">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                        ShopNow
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 font-light mb-8 animate-fade-in-up">
                    Where elegance meets everyday shopping.
                </p>

                {/* Enhanced 3D Progress Bar Container - MATCHING HOMEPAGE THEME */}
                <div className="w-96 max-w-[90vw] mx-auto">
                    <div className="relative h-10 bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/20"
                        style={{
                            boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.4), 0 4px 8px rgba(255,255,255,0.1)'
                        }}>
                        {/* Progress fill - MATCHING HOMEPAGE GRADIENT */}
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 transition-all duration-300 ease-out rounded-full relative overflow-hidden"
                            style={{
                                width: `${progress}%`,
                                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.6), inset 0 -2px 6px rgba(0,0,0,0.3), inset 0 2px 6px rgba(255,255,255,0.4)'
                            }}
                        >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-fast"></div>

                            {/* Sparkle effect */}
                            <div className="absolute inset-0 opacity-50">
                                <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full animate-sparkle"></div>
                                <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-sparkle delay-300"></div>
                                <div className="absolute top-2/3 left-3/4 w-2 h-2 bg-white rounded-full animate-sparkle delay-600"></div>
                            </div>
                        </div>

                        {/* Progress percentage with enhanced styling */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-base drop-shadow-lg z-10 animate-pulse-text">
                                {progress}%
                            </span>
                        </div>
                    </div>

                    {/* Dynamic loading text - MATCHING HOMEPAGE TEXT STYLE */}
                    <p className="text-gray-200 text-base mt-5 font-medium animate-fade-in-out">
                        {loadingMessage}
                    </p>

                    {/* Loading dots animation - MATCHING HOMEPAGE COLORS */}
                    <div className="flex justify-center gap-2 mt-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce-dot"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce-dot delay-200"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce-dot delay-400"></div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                @keyframes shimmer-fast {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }

                @keyframes zoom-pulse-smooth {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 0.9; transform: scale(1.05); }
                }

                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }

                @keyframes ripple {
                    0% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.1); opacity: 0.3; }
                    100% { transform: scale(1.2); opacity: 0; }
                }

                @keyframes float-particle {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                    25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
                    50% { transform: translateY(-40px) translateX(-10px); opacity: 0.8; }
                    75% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-30px); }
                }

                @keyframes orbit {
                    0% { transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg); }
                }

                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0); }
                    50% { opacity: 1; transform: scale(1.5); }
                }

                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fade-in-out {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }

                @keyframes bounce-dot {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes pulse-text {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                .animate-spin-slow { animation: spin-slow 4s linear infinite; }
                .animate-spin-reverse { animation: spin-reverse 6s linear infinite; }
                .animate-shimmer-fast { animation: shimmer-fast 1.5s infinite; }
                .animate-zoom-pulse-smooth { animation: zoom-pulse-smooth 3s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
                .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                .animate-ripple { animation: ripple 2s ease-out infinite; }
                .animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
                .animate-orbit { animation: orbit 8s linear infinite; }
                .animate-sparkle { animation: sparkle 1.5s ease-in-out infinite; }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
                .animate-fade-in-out { animation: fade-in-out 2s ease-in-out infinite; }
                .animate-bounce-dot { animation: bounce-dot 1.4s ease-in-out infinite; }
                .animate-gradient-text { animation: gradient-shift 3s ease infinite; }
                .animate-pulse-text { animation: pulse-text 2s ease-in-out infinite; }

                .bg-300% { background-size: 300% 300%; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-500 { animation-delay: 0.5s; }
                .delay-600 { animation-delay: 0.6s; }
                .delay-1000 { animation-delay: 1s; }
                .delay-2000 { animation-delay: 2s; }

                .border-gradient-animated {
                    border-image: linear-gradient(45deg, #FF0080, #7928CA, #FF8000, #00D4FF) 1;
                }
            `}</style>
        </div>
    );
}
