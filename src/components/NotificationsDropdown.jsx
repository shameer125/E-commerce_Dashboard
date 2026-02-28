import React, { useState, useEffect, useRef } from 'react';
import { Bell, Package, UserPlus, FileText, X } from 'lucide-react';

const mockNotifications = [
    { id: 1, type: 'order', title: 'New Order Received', desc: 'Order #ORD-89432 for $849.50', time: '5 mins ago', read: false },
    { id: 2, type: 'customer', title: 'New Customer Registered', desc: 'Brooklyn Simmons joined the store.', time: '1 hour ago', read: false },
    { id: 3, type: 'report', title: 'Weekly Report Ready', desc: 'Your store generated $14,240 this week.', time: '2 hours ago', read: true },
    { id: 4, type: 'alert', title: 'Low Stock Alert', desc: 'Nike Air Max 2024 is running low on inventory.', time: '1 day ago', read: true },
];

const NotificationsDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);
    const dropdownRef = useRef(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const removeNotification = (id, e) => {
        e.stopPropagation();
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'order': return <Package className="w-4 h-4 text-brand-600" />;
            case 'customer': return <UserPlus className="w-4 h-4 text-blue-600" />;
            case 'report': return <FileText className="w-4 h-4 text-emerald-600" />;
            default: return <Bell className="w-4 h-4 text-amber-600" />;
        }
    };

    const getBgColor = (type) => {
        switch (type) {
            case 'order': return 'bg-brand-50';
            case 'customer': return 'bg-blue-50';
            case 'report': return 'bg-emerald-50';
            default: return 'bg-amber-50';
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-slate-100 flexitems-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors relative flex items-center"
            >
                <Bell className="w-5 h-5 mx-auto" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">Notifications</h3>
                        {unreadCount > 0 && (
                            <button onClick={markAllRead} className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="max-h-[360px] overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50/80 transition-colors cursor-pointer flex gap-4 group ${!notif.read ? 'bg-slate-50/50' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getBgColor(notif.type)}`}>
                                        {getIcon(notif.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm truncate ${!notif.read ? 'font-bold text-slate-800' : 'font-semibold text-slate-700'}`}>
                                            {notif.title}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notif.desc}</p>
                                        <p className="text-[10px] text-slate-400 mt-1 font-medium">{notif.time}</p>
                                    </div>
                                    <button onClick={(e) => removeNotification(notif.id, e)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-all">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center text-slate-500 flex flex-col items-center">
                                <Bell className="w-8 h-8 text-slate-300 mb-2" />
                                <p className="text-sm font-medium text-slate-700">All caught up!</p>
                                <p className="text-xs">You have no new notifications.</p>
                            </div>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 text-center">
                            <button className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                                View All Notification History
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationsDropdown;
