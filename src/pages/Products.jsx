import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductModal from '../components/ProductModal';
import { Plus, Edit2, Trash2, Search, Filter, MoreVertical, ArrowUpDown } from 'lucide-react';
import { useTableParams } from '../hooks/useTableParams';

const Products = () => {
    const { products, addProduct, updateProduct, removeProduct } = useContext(ProductContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleSave = (productData) => {
        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const {
        currentPage,
        setCurrentPage,
        sortConfig,
        handleSort,
        processedData,
        totalPages,
        totalItems
    } = useTableParams(filteredProducts, 8);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out h-full flex flex-col">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Products Management</h1>
                    <p className="text-slate-500 mt-2 text-base">Manage your inventory, pricing, and product details.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-brand-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex-1 flex flex-col overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
                    <div className="flex-1 max-w-md relative">
                        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search products by name or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-sm shadow-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-semibold shadow-sm transition-colors text-sm">
                        <Filter className="w-4 h-4" />
                        Filter View
                    </button>
                </div>

                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-white text-slate-400 font-semibold uppercase tracking-wider text-[11px] sticky top-0 z-10 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('name')}>
                                    <div className="flex items-center gap-1">Product <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('category')}>
                                    <div className="flex items-center gap-1">Category <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('price')}>
                                    <div className="flex items-center gap-1">Price <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('stock')}>
                                    <div className="flex items-center gap-1">Stock <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {processedData.length > 0 ? (
                                processedData.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors duration-200 group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-100 bg-white shadow-sm shrink-0">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <span className="font-bold text-slate-800 text-base block group-hover:text-brand-600 transition-colors">{product.name}</span>
                                                    <span className="text-slate-500 text-xs">ID: {product.id.substring(0, 8)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-800 text-base">
                                            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${product.stock > 20 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                product.stock > 0 ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${product.stock > 20 ? 'bg-emerald-500' :
                                                    product.stock > 0 ? 'bg-amber-500' : 'bg-rose-500'
                                                    }`}></span>
                                                {product.stock} in stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all duration-200"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this product?')) {
                                                            removeProduct(product.id)
                                                        }
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200 ml-1">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <Search className="w-10 h-10 mb-3 text-slate-300" />
                                            <p className="text-base font-semibold text-slate-600">No products found</p>
                                            <p className="text-sm mt-1">Try adjusting your search query or add a new product.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalItems > 0 && (
                    <div className="border-t border-slate-100 p-4 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
                        <div>
                            Showing <span className="font-semibold text-slate-700">{(currentPage - 1) * 8 + 1}</span> to <span className="font-semibold text-slate-700">{Math.min(currentPage * 8, totalItems)}</span> of <span className="font-semibold text-slate-700">{totalItems}</span> entries
                        </div>
                        <div className="flex gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm bg-slate-50"
                            >
                                Previous
                            </button>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm bg-slate-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                product={editingProduct}
            />
        </div>
    );
};

export default Products;
