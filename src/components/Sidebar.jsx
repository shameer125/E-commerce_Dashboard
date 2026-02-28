import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Overview', path: '/', icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: 'Products', path: '/products', icon: <Package className="w-5 h-5" /> },
        { name: 'Orders', path: '/orders', icon: <ShoppingCart className="w-5 h-5" /> },
        { name: 'Customers', path: '/customers', icon: <Users className="w-5 h-5" /> },
        { name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
    ];

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col h-full shadow-2xl z-20">
            <div className="h-20 flex items-center px-6 border-b border-slate-800/60 bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                        <Package className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white tracking-wide">Dash<span className="text-brand-400">Hub</span></span>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                ? 'bg-brand-500/10 text-brand-400 font-semibold before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-brand-500'
                                : 'hover:bg-slate-800 hover:text-white font-medium text-slate-400'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`mr-4 transition-colors duration-300 ${isActive ? 'text-brand-400' : 'text-slate-500 group-hover:text-brand-300'}`}>
                                    {item.icon}
                                </div>
                                {item.name}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800/60">
                <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 rounded-xl font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-300 group">
                    <LogOut className="w-5 h-5 mr-4 text-slate-500 group-hover:text-rose-400 transition-colors duration-300" />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
