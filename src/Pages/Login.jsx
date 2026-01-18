import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });
    const [validation, setValidation] = useState({
        email: { valid: null, message: '' },
        password: { valid: null, message: '' },
        username: { valid: null, message: '' },
        confirmPassword: { valid: null, message: '' }
    });
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });
    const [focusedField, setFocusedField] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    // Toast notification function
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    };

    // Password strength calculator
    const calculatePasswordStrength = (password) => {
        let score = 0;
        if (!password) return { score: 0, label: '', color: '' };

        // Length check
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;

        // Character variety checks
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        // Determine label and color
        if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
        if (score <= 4) return { score, label: 'Medium', color: 'bg-yellow-500' };
        return { score, label: 'Strong', color: 'bg-green-500' };
    };

    // Real-time validation
    useEffect(() => {
        // Email validation
        if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(formData.email);
            setValidation(prev => ({
                ...prev,
                email: {
                    valid: isValid,
                    message: isValid ? 'Valid email' : 'Please enter a valid email'
                }
            }));
        } else {
            setValidation(prev => ({ ...prev, email: { valid: null, message: '' } }));
        }

        // Username validation (for sign up)
        if (isSignUp && formData.username) {
            const isValid = formData.username.length >= 3;
            setValidation(prev => ({
                ...prev,
                username: {
                    valid: isValid,
                    message: isValid ? 'Username looks good' : 'Username must be at least 3 characters'
                }
            }));
        } else {
            setValidation(prev => ({ ...prev, username: { valid: null, message: '' } }));
        }

        // Password validation
        if (formData.password) {
            const strength = calculatePasswordStrength(formData.password);
            setPasswordStrength(strength);

            const isValid = formData.password.length >= 6;
            setValidation(prev => ({
                ...prev,
                password: {
                    valid: isValid,
                    message: isValid ? 'Password strength: ' + strength.label : 'Password must be at least 6 characters'
                }
            }));
        } else {
            setPasswordStrength({ score: 0, label: '', color: '' });
            setValidation(prev => ({ ...prev, password: { valid: null, message: '' } }));
        }

        // Confirm password validation
        if (isSignUp && formData.confirmPassword) {
            const isValid = formData.password === formData.confirmPassword;
            setValidation(prev => ({
                ...prev,
                confirmPassword: {
                    valid: isValid,
                    message: isValid ? 'Passwords match' : 'Passwords do not match'
                }
            }));
        } else {
            setValidation(prev => ({ ...prev, confirmPassword: { valid: null, message: '' } }));
        }
    }, [formData, isSignUp]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (showForgotPassword) {
            showToast(`Password reset link sent to ${formData.email}`, 'success');
            setShowForgotPassword(false);
            setFormData({ ...formData, email: '' });
        } else if (isSignUp) {
            if (formData.password !== formData.confirmPassword) {
                showToast('Passwords do not match!', 'error');
                setIsLoading(false);
                return;
            }
            if (passwordStrength.score < 3) {
                showToast('Please use a stronger password', 'warning');
                setIsLoading(false);
                return;
            }
            // Sign up successful
            login({ username: formData.username, email: formData.email, isNewUser: true });
            sessionStorage.setItem('justLoggedIn', 'true');
            showToast('Account created successfully!', 'success');
            setTimeout(() => navigate('/'), 1000);
        } else {
            // Sign in successful
            const username = formData.username || formData.email.split('@')[0];
            login({ username, email: formData.email, isNewUser: false });
            sessionStorage.setItem('justLoggedIn', 'true');
            showToast('Login successful! Welcome back!', 'success');
            setTimeout(() => navigate('/'), 1000);
        }

        setIsLoading(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSocialLogin = (provider) => {
        showToast(`${provider} login coming soon!`, 'info');
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setFormData({ email: '', password: '', confirmPassword: '', username: '' });
        setValidation({
            email: { valid: null, message: '' },
            password: { valid: null, message: '' },
            username: { valid: null, message: '' },
            confirmPassword: { valid: null, message: '' }
        });
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundImage: `url('/image%201.jpg')` }}>
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 animate-gradient" />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
                <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000" />
            </div>

            {/* Toast Notification */}
            {toast.show && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-in-right ${toast.type === 'success' ? 'bg-green-500 text-white' :
                    toast.type === 'error' ? 'bg-red-500 text-white' :
                        toast.type === 'warning' ? 'bg-yellow-500 text-white' :
                            'bg-blue-500 text-white'
                    }`}>
                    {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                    {toast.type === 'error' && <XCircle className="w-5 h-5" />}
                    {toast.type === 'warning' && <AlertCircle className="w-5 h-5" />}
                    {toast.type === 'info' && <AlertCircle className="w-5 h-5" />}
                    <span className="font-medium">{toast.message}</span>
                </div>
            )}

            <div className="relative max-w-md w-full space-y-8 bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 animate-fade-in-up">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 animate-bounce-slow">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {showForgotPassword ? 'Reset Password' : isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="mt-3 text-sm text-gray-600">
                        {showForgotPassword ? (
                            'Enter your email to receive a password reset link'
                        ) : isSignUp ? (
                            <>
                                Already have an account?{' '}
                                <button
                                    onClick={toggleMode}
                                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
                                >
                                    Sign in
                                </button>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <button
                                    onClick={toggleMode}
                                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
                                >
                                    Sign up
                                </button>
                            </>
                        )}
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Username Field (Sign Up Only) */}
                        {!showForgotPassword && isSignUp && (
                            <div className="relative">
                                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'username' ? 'text-blue-500' : 'text-gray-400'}`} />
                                    </div>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('username')}
                                        onBlur={() => setFocusedField('')}
                                        className={`appearance-none relative block w-full pl-12 pr-12 py-3.5 border ${validation.username.valid === true ? 'border-green-500 ring-2 ring-green-200' :
                                            validation.username.valid === false ? 'border-red-500 ring-2 ring-red-200' :
                                                'border-gray-300'
                                            } placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400`}
                                        placeholder="Choose a username"
                                    />
                                    {validation.username.valid !== null && (
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                            {validation.username.valid ?
                                                <CheckCircle className="w-5 h-5 text-green-500" /> :
                                                <XCircle className="w-5 h-5 text-red-500" />
                                            }
                                        </div>
                                    )}
                                </div>
                                {validation.username.message && (
                                    <p className={`mt-1.5 text-xs font-medium ${validation.username.valid ? 'text-green-600' : 'text-red-600'}`}>
                                        {validation.username.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField('')}
                                    className={`appearance-none relative block w-full pl-12 pr-12 py-3.5 border ${validation.email.valid === true ? 'border-green-500 ring-2 ring-green-200' :
                                        validation.email.valid === false ? 'border-red-500 ring-2 ring-red-200' :
                                            'border-gray-300'
                                        } placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400`}
                                    placeholder="Enter your email"
                                />
                                {validation.email.valid !== null && (
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                        {validation.email.valid ?
                                            <CheckCircle className="w-5 h-5 text-green-500" /> :
                                            <XCircle className="w-5 h-5 text-red-500" />
                                        }
                                    </div>
                                )}
                            </div>
                            {validation.email.message && (
                                <p className={`mt-1.5 text-xs font-medium ${validation.email.valid ? 'text-green-600' : 'text-red-600'}`}>
                                    {validation.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        {!showForgotPassword && (
                            <>
                                <div className="relative">
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'}`} />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField('')}
                                            className={`appearance-none relative block w-full pl-12 pr-12 py-3.5 border ${validation.password.valid === true ? 'border-green-500 ring-2 ring-green-200' :
                                                validation.password.valid === false ? 'border-red-500 ring-2 ring-red-200' :
                                                    'border-gray-300'
                                                } placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400`}
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 p-1 hover:bg-gray-100 rounded-lg"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {isSignUp && formData.password && (
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-medium text-gray-600">Password Strength</span>
                                                <span className={`text-xs font-semibold ${passwordStrength.label === 'Strong' ? 'text-green-600' :
                                                    passwordStrength.label === 'Medium' ? 'text-yellow-600' :
                                                        'text-red-600'
                                                    }`}>
                                                    {passwordStrength.label}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className={`h-full ${passwordStrength.color} transition-all duration-300 ease-out`}
                                                    style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {validation.password.message && !isSignUp && (
                                        <p className={`mt-1.5 text-xs font-medium ${validation.password.valid ? 'text-green-600' : 'text-red-600'}`}>
                                            {validation.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password Field (Sign Up Only) */}
                                {isSignUp && (
                                    <div className="relative">
                                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'confirmPassword' ? 'text-blue-500' : 'text-gray-400'}`} />
                                            </div>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('confirmPassword')}
                                                onBlur={() => setFocusedField('')}
                                                className={`appearance-none relative block w-full pl-12 pr-12 py-3.5 border ${validation.confirmPassword.valid === true ? 'border-green-500 ring-2 ring-green-200' :
                                                    validation.confirmPassword.valid === false ? 'border-red-500 ring-2 ring-red-200' :
                                                        'border-gray-300'
                                                    } placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400`}
                                                placeholder="Confirm your password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 p-1 hover:bg-gray-100 rounded-lg"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        {validation.confirmPassword.message && (
                                            <p className={`mt-1.5 text-xs font-medium ${validation.confirmPassword.valid ? 'text-green-600' : 'text-red-600'}`}>
                                                {validation.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    {!showForgotPassword && !isSignUp && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center group">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer transition-all duration-200"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer group-hover:text-gray-900 transition-colors duration-200">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(true)}
                                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative flex items-center gap-2">
                                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                                {showForgotPassword ? 'Send Reset Link' : isSignUp ? 'Create Account' : 'Sign In'}
                            </span>
                        </button>
                    </div>

                    {/* Social Login Buttons */}
                    {!showForgotPassword && (
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white/95 text-gray-500 font-medium">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Google')}
                                    className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Facebook')}
                                    className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-105 hover:shadow-md"
                                >
                                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Back to Sign In */}
                    {showForgotPassword && (
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(false)}
                                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline"
                            >
                                ← Back to sign in
                            </button>
                        </div>
                    )}

                    {/* Back to Home */}
                    <div className="text-center pt-2">
                        <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline inline-flex items-center gap-1">
                            ← Back to home
                        </Link>
                    </div>
                </form>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }

                .animate-slide-in-right {
                    animation: slide-in-right 0.4s ease-out;
                }

                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 15s ease infinite;
                }

                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    );
}
