import React from 'react';
import { Search } from 'lucide-react';
import NotificationsDropdown from './NotificationsDropdown';

const Header = () => {
    return (
        <header className="bg-white px-6 py-4 flex items-center justify-between z-10 shadow-sm">
            <div className="flex items-center bg-slate-100 rounded-lg px-4 py-2.5 w-full max-w-md focus-within:ring-2 ring-brand-500 focus-within:bg-white transition-all duration-300">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search products, orders, categories..."
                    className="bg-transparent border-none outline-none ml-3 text-sm w-full text-slate-700 placeholder:text-slate-400"
                />
            </div>
            <div className="flex items-center space-x-6">
                <NotificationsDropdown />
                <div className="flex items-center gap-3 cursor-pointer">
                    <img
                        src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
                        alt="User avatar"
                        className="w-10 h-10 rounded-full ring-2 ring-slate-100"
                    />
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-slate-700">Admin User</p>
                        <p className="text-xs text-slate-500">Store Manager</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
