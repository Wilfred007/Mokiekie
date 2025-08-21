
import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch('/Api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                setMessage(data.message || 'Password reset link sent to your email');
                setEmail(""); // Clear the form
            } else {
                setError(data.message || 'Failed to send reset email');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        // You can replace this with your routing logic
        // For example, if using React Router: navigate('/signin')
        window.location.href = '/signin';
    };

    const handleSignInClick = () => {
        // You can replace this with your routing logic
        window.location.href = '/signin';
    };

    const resetForm = () => {
        setSuccess(false);
        setError("");
        setMessage("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back button */}
                <Link to='/'
                    // onClick={handleBackToLogin}
                    className="group flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-8 transition-colors duration-200"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span className="text-sm font-medium">Home</span>
                </Link>

                {/* Main card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                    {/* Success State */}
                    {success ? (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-800 mb-2">Email Sent!</h1>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={resetForm}
                                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 px-4 rounded-xl transition-all duration-200"
                                >
                                    Send Another Link
                                </button>
                                <button
                                    onClick={handleSignInClick}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
                                >
                                    Back to Sign In
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-blue-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800 mb-2">Reset Your Password</h1>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        <p className="text-red-700 text-sm">{error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Success Message (for non-success state) */}
                            {message && !success && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <p className="text-green-700 text-sm">{message}</p>
                                    </div>
                                </div>
                            )}

                            {/* Form */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email address"
                                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 disabled:opacity-50"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && !loading) {
                                                    handleSubmit();
                                                }
                                            }}
                                            disabled={loading}
                                        />
                                        <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    onClick={handleSubmit}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Reset Link'
                                    )}
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <p className="text-center text-sm text-slate-600">
                                    Remember your password?{' '}
                                    <button 
                                        onClick={handleSignInClick}
                                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                    >
                                        Sign in here
                                    </button>
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Security notice */}
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="font-medium text-blue-900 text-sm mb-1">Security Notice</h3>
                            <p className="text-blue-700 text-xs leading-relaxed">
                                For your security, password reset links expire after 15 minutes and can only be used once.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;