import React, { useState, useEffect } from 'react';
import { X, UploadCloud } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        image: ''
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({ name: '', category: '', price: '', stock: '', image: '' });
        }
    }, [product, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-xl font-bold text-slate-800">
                        {product ? 'Edit Product details' : 'Add New Product'}
                    </h2>
                    <button onClick={onClose} className="p-2 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="flex gap-4">
                        <div className="w-32 h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 shrink-0 overflow-hidden group relative">
                            {formData.image ? (
                                <>
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <UploadCloud className="w-6 h-6 text-white" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <UploadCloud className="w-8 h-8 mb-2 text-slate-300" />
                                    <span className="text-xs font-medium px-2 text-center text-slate-500">Image Preview</span>
                                </>
                            )}
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 hover:border-slate-300 transition-all outline-none text-slate-800 placeholder:text-slate-400" placeholder="e.g. MacBook Pro M3" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                                <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 hover:border-slate-300 transition-all outline-none text-slate-800 placeholder:text-slate-400" placeholder="e.g. Computers" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price ($)</label>
                            <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 hover:border-slate-300 transition-all outline-none text-slate-800 placeholder:text-slate-400" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Stock Quantity</label>
                            <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 hover:border-slate-300 transition-all outline-none text-slate-800 placeholder:text-slate-400" placeholder="0" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Image URL</label>
                        <input required type="url" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 hover:border-slate-300 transition-all outline-none text-slate-800 placeholder:text-slate-400" placeholder="https://images.unsplash.com/photo-..." />
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 mt-6">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-6 py-2.5 bg-brand-600 text-white font-semibold hover:bg-brand-700 rounded-xl shadow-md shadow-brand-500/20 active:scale-95 transition-all">
                            {product ? 'Save Changes' : 'Publish Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
