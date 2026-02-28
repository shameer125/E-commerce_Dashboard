import React, { useContext, useState } from 'react';
import { AppDataContext } from '../context/AppDataContext';
import { Search, Mail, Phone, MapPin, ExternalLink, CalendarDays, MoreVertical, Trash2, Plus, Edit2 } from 'lucide-react';
import { useTableParams } from '../hooks/useTableParams';
import CustomerModal from '../components/CustomerModal';

const Customers = () => {
    const { customers, deleteCustomer, addCustomer, updateCustomer } = useContext(AppDataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const {
        currentPage,
        setCurrentPage,
        processedData,
        totalPages,
        totalItems
    } = useTableParams(filteredCustomers, 8); // Uses default sort based on array order

    const handleAdd = () => {
        setEditingCustomer(null);
        setIsModalOpen(true);
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setIsModalOpen(true);
    };

    const handleSave = (customer) => {
        if (editingCustomer) updateCustomer(customer);
        else addCustomer(customer);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out h-full flex flex-col">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Customers Directory</h1>
                    <p className="text-slate-500 mt-2 text-base">Manage your customer base and view their activity.</p>
                </div>
                <button onClick={handleAdd} className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold shadow-md shadow-brand-500/20 active:scale-95 transition-all text-sm w-full sm:w-auto justify-center">
                    <Plus className="w-5 h-5" />
                    Add Customer
                </button>
            </div>

            <div className="mb-6 max-w-md relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Search customers by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-sm shadow-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {processedData.length > 0 ? (
                    processedData.map(customer => (
                        <div key={customer.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group relative">

                            <div className="absolute top-4 right-4 flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(customer)} className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="Edit Customer">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => deleteCustomer(customer.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Customer">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex flex-col items-center mb-6 pt-2">
                                <div className="relative">
                                    <img src={customer.avatar} alt={customer.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mb-4" />
                                    <div className={`absolute bottom-4 right-0 w-4 h-4 rounded-full border-2 border-white ${customer.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">{customer.name}</h3>
                                <span className="text-sm text-brand-600 font-medium">{customer.id}</span>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center text-slate-500 text-sm">
                                    <Mail className="w-4 h-4 mr-3 text-slate-400" />
                                    <span className="truncate">{customer.email}</span>
                                </div>
                                <div className="flex items-center text-slate-500 text-sm">
                                    <CalendarDays className="w-4 h-4 mr-3 text-slate-400" />
                                    <span>Joined {new Date(customer.joinDate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100">
                                <div className="text-center">
                                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Orders</span>
                                    <span className="block text-lg font-bold text-slate-800">{customer.totalOrders}</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Spent</span>
                                    <span className="block text-lg font-bold text-slate-800">${customer.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <button className="w-full mt-2 py-2.5 bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-600 text-sm font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2">
                                View Profile <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500 bg-white rounded-2xl border border-slate-100 border-dashed">
                        <Search className="w-12 h-12 text-slate-300 mb-4" />
                        <p className="text-lg font-medium text-slate-700">No customers found</p>
                        <p className="text-sm mt-1">Try adjusting your search query.</p>
                    </div>
                )}
            </div>

            <CustomerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingCustomer}
            />
        </div>
    );
};

export default Customers;
