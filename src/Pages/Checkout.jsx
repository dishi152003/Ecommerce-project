import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Package, CheckCircle, Truck, Home as HomeIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

export default function Checkout() {
    const navigate = useNavigate();
    const { items, clear } = useCart();
    const { success } = useToast();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Shipping
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        // Payment
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        paymentMethod: 'card'
    });

    const steps = [
        { number: 1, title: 'Shipping', icon: MapPin },
        { number: 2, title: 'Payment', icon: CreditCard },
        { number: 3, title: 'Review', icon: Package }
    ];

    const subtotal = items?.reduce((sum, item) => sum + (item.price * item.qty), 0) || 0;
    const shipping = subtotal > 1000 ? 0 : 50;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateStep = (step) => {
        if (step === 1) {
            return formData.fullName && formData.email && formData.phone &&
                formData.address && formData.city && formData.state && formData.pincode;
        }
        if (step === 2) {
            if (formData.paymentMethod === 'card') {
                return formData.cardNumber && formData.cardName && formData.expiryDate && formData.cvv;
            }
            return true; // COD doesn't need validation
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 3));
        } else {
            alert('Please fill all required fields');
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handlePlaceOrder = () => {
        success('Order placed successfully! 🎉 Redirecting to track your order...');
        clear();
        setTimeout(() => navigate('/track-order'), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Checkout</h1>
                    <p className="text-gray-600 dark:text-gray-400">Complete your purchase in 3 easy steps</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between max-w-2xl mx-auto">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.number;
                            const isCompleted = currentStep > step.number;

                            return (
                                <div key={step.number} className="flex items-center flex-1">
                                    <div className="flex flex-col items-center flex-1">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted
                                            ? 'bg-green-500 text-white'
                                            : isActive
                                                ? 'bg-blue-600 text-white ring-4 ring-blue-200 dark:ring-blue-900'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                                            }`}>
                                            {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                        </div>
                                        <p className={`mt-2 text-sm font-semibold ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                            {step.title}
                                        </p>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`h-1 flex-1 mx-4 transition-all duration-300 ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                                            }`}></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
                            {/* Step 1: Shipping */}
                            {currentStep === 1 && (
                                <div className="space-y-4 animate-fade-in">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Shipping Information</h2>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="Full Name *"
                                            className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Email Address *"
                                            className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Phone Number *"
                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />

                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Street Address *"
                                        rows="3"
                                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    ></textarea>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="City *"
                                            className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            placeholder="State *"
                                            className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            placeholder="Pincode *"
                                            className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Payment */}
                            {currentStep === 2 && (
                                <div className="space-y-4 animate-fade-in">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payment Method</h2>

                                    {/* Payment Method Selection */}
                                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                                        <button
                                            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                                            className={`p-4 border-2 rounded-xl transition-all ${formData.paymentMethod === 'card'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-600'
                                                }`}
                                        >
                                            <CreditCard className="w-6 h-6 mb-2 mx-auto text-blue-600" />
                                            <p className="font-semibold text-gray-900 dark:text-white">Credit/Debit Card</p>
                                        </button>
                                        <button
                                            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                                            className={`p-4 border-2 rounded-xl transition-all ${formData.paymentMethod === 'cod'
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-600'
                                                }`}
                                        >
                                            <HomeIcon className="w-6 h-6 mb-2 mx-auto text-green-600" />
                                            <p className="font-semibold text-gray-900 dark:text-white">Cash on Delivery</p>
                                        </button>
                                    </div>

                                    {/* Card Details */}
                                    {formData.paymentMethod === 'card' && (
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                placeholder="Card Number"
                                                maxLength="16"
                                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                name="cardName"
                                                value={formData.cardName}
                                                onChange={handleInputChange}
                                                placeholder="Cardholder Name"
                                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    value={formData.expiryDate}
                                                    onChange={handleInputChange}
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                    className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    placeholder="CVV"
                                                    maxLength="3"
                                                    className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 3: Review */}
                            {currentStep === 3 && (
                                <div className="space-y-6 animate-fade-in">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Review Your Order</h2>

                                    {/* Shipping Details */}
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                            <Truck className="w-5 h-5" />
                                            Shipping Address
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300">{formData.fullName}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{formData.address}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {formData.city}, {formData.state} - {formData.pincode}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">{formData.phone}</p>
                                    </div>

                                    {/* Payment Details */}
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                            <CreditCard className="w-5 h-5" />
                                            Payment Method
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {formData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
                                        </p>
                                        {formData.paymentMethod === 'card' && (
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                •••• •••• •••• {formData.cardNumber.slice(-4)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                {currentStep > 1 && (
                                    <button
                                        onClick={handleBack}
                                        className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        Back
                                    </button>
                                )}
                                {currentStep < 3 ? (
                                    <button
                                        onClick={handleNext}
                                        className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                                    >
                                        Continue
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePlaceOrder}
                                        className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center gap-2"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Place Order
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                    <span>Tax (18%)</span>
                                    <span>₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            {shipping > 0 && (
                                <p className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                    Add ₹{(1000 - subtotal).toFixed(2)} more for FREE shipping!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
