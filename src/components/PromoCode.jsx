import { useState } from 'react';
import { Tag, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function PromoCode({ onApplyPromo }) {
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Available promo codes
    const promoCodes = {
        'SAVE10': { discount: 10, type: 'percentage', description: '10% off your order' },
        'SAVE20': { discount: 20, type: 'percentage', description: '20% off your order' },
        'FLAT100': { discount: 100, type: 'fixed', description: '₹100 off your order' },
        'FLAT500': { discount: 500, type: 'fixed', description: '₹500 off your order' },
        'WELCOME': { discount: 15, type: 'percentage', description: '15% off for new customers' },
        'FREESHIP': { discount: 0, type: 'shipping', description: 'Free shipping on this order' }
    };

    const handleApply = () => {
        setError('');
        const code = promoCode.toUpperCase().trim();

        if (!code) {
            setError('Please enter a promo code');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (promoCodes[code]) {
                setAppliedPromo({ code, ...promoCodes[code] });
                onApplyPromo && onApplyPromo({ code, ...promoCodes[code] });
                setPromoCode('');
                setError('');
            } else {
                setError('Invalid promo code');
                setAppliedPromo(null);
            }
            setIsLoading(false);
        }, 500);
    };

    const handleRemove = () => {
        setAppliedPromo(null);
        onApplyPromo && onApplyPromo(null);
        setPromoCode('');
        setError('');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
            <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900 dark:text-white">Promo Code</h3>
            </div>

            {/* Applied Promo */}
            {appliedPromo && (
                <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                            <p className="font-semibold text-green-700 dark:text-green-400">{appliedPromo.code}</p>
                            <p className="text-sm text-green-600 dark:text-green-500">{appliedPromo.description}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleRemove}
                        className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Input Form */}
            {!appliedPromo && (
                <div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => {
                                setPromoCode(e.target.value.toUpperCase());
                                setError('');
                            }}
                            onKeyPress={(e) => e.key === 'Enter' && handleApply()}
                            placeholder="Enter promo code"
                            className="flex-1 px-4 py-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all uppercase"
                        />
                        <button
                            onClick={handleApply}
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Apply'
                            )}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {/* Available Codes */}
                    <div className="mt-4">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Available Codes:</p>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(promoCodes).slice(0, 3).map(([code, details]) => (
                                <button
                                    key={code}
                                    onClick={() => {
                                        setPromoCode(code);
                                        setError('');
                                    }}
                                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                >
                                    {code}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
