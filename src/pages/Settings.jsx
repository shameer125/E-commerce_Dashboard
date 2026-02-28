import React, { useState } from 'react';
import { User, Store, Bell, Shield, Save } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            // Simulate toast notification here if we had one
        }, 800);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out h-full max-w-5xl mx-auto flex flex-col">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
                <p className="text-slate-500 mt-2 text-base">Manage your account preferences and store configurations.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 flex-1">
                {/* Settings Navigation */}
                <div className="w-full lg:w-64 shrink-0">
                    <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm whitespace-nowrap ${activeTab === 'profile'
                                    ? 'bg-brand-50 text-brand-600 shadow-sm border border-brand-100'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-transparent'
                                }`}
                        >
                            <User className="w-5 h-5" /> My Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('store')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm whitespace-nowrap ${activeTab === 'store'
                                    ? 'bg-brand-50 text-brand-600 shadow-sm border border-brand-100'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-transparent'
                                }`}
                        >
                            <Store className="w-5 h-5" /> Store Details
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm whitespace-nowrap ${activeTab === 'notifications'
                                    ? 'bg-brand-50 text-brand-600 shadow-sm border border-brand-100'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-transparent'
                                }`}
                        >
                            <Bell className="w-5 h-5" /> Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm whitespace-nowrap ${activeTab === 'security'
                                    ? 'bg-brand-50 text-brand-600 shadow-sm border border-brand-100'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-transparent'
                                }`}
                        >
                            <Shield className="w-5 h-5" /> Security
                        </button>
                    </nav>
                </div>

                {/* Settings Content Area */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative">

                    <div className="p-8 pb-32">

                        {activeTab === 'profile' && (
                            <div className="animate-in fade-in duration-300">
                                <h2 className="text-xl font-bold text-slate-800 mb-6">Profile Information</h2>
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-md overflow-hidden relative group">
                                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff&size=150" alt="Avatar" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <span className="text-xs font-semibold text-white">Change</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-slate-800">Profile Picture</h3>
                                        <p className="text-xs text-slate-500 mt-1 max-w-xs">JPG, GIF or PNG. Max size of 800K.</p>
                                    </div>
                                </div>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">First Name</label>
                                            <input type="text" defaultValue="Admin" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-slate-800" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last Name</label>
                                            <input type="text" defaultValue="User" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-slate-800" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                                        <input type="email" defaultValue="admin@dashhub.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-slate-800" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role / Job Title</label>
                                        <input type="text" defaultValue="Store Manager" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-slate-800" />
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'store' && (
                            <div className="animate-in fade-in duration-300">
                                <h2 className="text-xl font-bold text-slate-800 mb-6">Store Details</h2>
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Store Name</label>
                                        <input type="text" defaultValue="DashHub Official Store" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-slate-800" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Support Email</label>
                                        <input type="email" defaultValue="support@dashhub.com" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-slate-800" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Currency</label>
                                            <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-slate-800 appearance-none">
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                                <option value="GBP">GBP (£)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Timezone</label>
                                            <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-slate-800 appearance-none">
                                                <option value="PST">Pacific Time (US & Canada)</option>
                                                <option value="EST">Eastern Time (US & Canada)</option>
                                                <option value="UTC">UTC</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {(activeTab === 'notifications' || activeTab === 'security') && (
                            <div className="animate-in fade-in duration-300 h-64 flex flex-col justify-center items-center text-center">
                                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
                                    {activeTab === 'notifications' ? <Bell className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{activeTab === 'notifications' ? 'Notification Preferences' : 'Security Settings'}</h3>
                                <p className="text-sm text-slate-500 max-w-sm">This section is part of the UI demonstration. Backend integration is required to save these specific preferences.</p>
                            </div>
                        )}

                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-md shadow-brand-500/20 active:scale-95 transition-all flex items-center gap-2 ${isSaving ? 'opacity-80' : ''}`}
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};



export default Settings;
