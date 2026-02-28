import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const success = login(email, password);
            if (success) {
                navigate('/');
            } else {
                setError('Invalid email or password. Use admin@dashhub.com / password');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-400/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/30 mb-4 transform hover:rotate-12 transition-transform duration-300">
                        <Package className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome back to DashHub</h1>
                    <p className="text-slate-500 text-sm mt-1">Sign in to manage your store</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 text-rose-600 text-sm font-medium rounded-xl border border-rose-100 flex items-center animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 hover:border-slate-300 transition-all outline-none text-slate-800 placeholder:text-slate-400"
                                placeholder="admin@dashhub.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 hover:border-slate-300 transition-all outline-none text-slate-800 placeholder:text-slate-400"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="flex justify-end mt-2">
                            <button type="button" className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline">
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md shadow-brand-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
                    >
                        {isLoading ? 'Signing in...' : (
                            <>
                                Sign In <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-500">
                        <p className="font-semibold text-slate-700 mb-1">Demo Credentials:</p>
                        <p>Email: <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 ml-1">admin@dashhub.com</span></p>
                        <p className="mt-1">Password: <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 ml-1">password</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
