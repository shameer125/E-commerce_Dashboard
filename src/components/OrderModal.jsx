import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const OrderModal = ({ isOpen, onClose, onSave, initialData, customers }) => {
    const [formData, setFormData] = useState({
        customerId: '',
        items: 1,
        total: 0,
        status: 'Processing',
        paymentMethod: 'Credit Card'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                customerId: initialData.customer.id
            });
        } else {
            setFormData({
                customerId: customers[0]?.id || '',
                items: 1,
                total: 100,
                status: 'Processing',
                paymentMethod: 'Credit Card'
            });
        }
    }, [initialData, isOpen, customers]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedCustomer = customers.find(c => c.id === formData.customerId);

        onSave({
            id: initialData?.id || `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
            customer: selectedCustomer,
            date: initialData?.date || new Date().toISOString(),
            items: Number(formData.items),
            total: Number(formData.total),
            status: formData.status,
            paymentMethod: formData.paymentMethod
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800">
                        {initialData ? 'Edit Order Details' : 'Create New Order'}
                    </h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Customer</label>
                        <select
                            required
                            value={formData.customerId}
                            onChange={e => setFormData({ ...formData, customerId: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none text-sm"
                            disabled={!!initialData}
                        >
                            {customers.map(c => (
                                <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Item Count</label>
                            <input
                                type="number"
                                min="1"
                                required
                                value={formData.items}
                                onChange={e => setFormData({ ...formData, items: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Total Price ($)</label>
                            <input
                                type="number"
                                min="0" step="0.01"
                                required
                                value={formData.total}
                                onChange={e => setFormData({ ...formData, total: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none text-sm"
                            >
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Payment Method</label>
                            <select
                                value={formData.paymentMethod}
                                onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none text-sm"
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Apple Pay">Apple Pay</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-sm">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl shadow-md shadow-brand-500/20 active:scale-95 transition-all text-sm">
                            {initialData ? 'Save Changes' : 'Create Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
