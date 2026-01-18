import { useState, useEffect } from 'react';
import { X, Mail, Gift } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const { success } = useToast();

    useEffect(() => {
        // Check if user has already subscribed or dismissed
        const hasSubscribed = localStorage.getItem('newsletterSubscribed');
        const hasDismissed = localStorage.getItem('newsletterDismissed');

        if (!hasSubscribed && !hasDismissed) {
            // Show popup after 5 seconds
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;

        // Save subscription
        localStorage.setItem('newsletterSubscribed', 'true');
        success('Successfully subscribed to newsletter! 🎉');
        setIsOpen(false);
    };

    const handleClose = () => {
        localStorage.setItem('newsletterDismissed', 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fade-in"
                onClick={handleClose}
            ></div>

            {/* Popup */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-md mx-4 animate-slide-in-right">
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1 rounded-2xl shadow-2xl">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 relative">
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Gift className="w-8 h-8 text-white" />
                        </div>

                        {/* Content */}
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
                            Get 15% Off Your First Order!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                            Subscribe to our newsletter and receive exclusive deals, new arrivals, and special offers.
                        </p>

                        {/* Form */}
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Subscribe & Get 15% Off
                            </button>
                        </form>

                        {/* No Thanks */}
                        <button
                            onClick={handleClose}
                            className="w-full mt-3 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                        >
                            No thanks, I'll pay full price
                        </button>

                        {/* Benefits */}
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">15%</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Discount</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">24/7</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Support</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">Free</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Shipping</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
