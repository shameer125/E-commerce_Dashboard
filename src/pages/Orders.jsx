import React, { useContext, useState } from 'react';
import { AppDataContext } from '../context/AppDataContext';
import { Search, Filter, MoreVertical, Eye, Truck, CheckCircle2, XCircle, Clock, ArrowUpDown, Plus, Trash2, Edit2 } from 'lucide-react';
import { useTableParams } from '../hooks/useTableParams';
import OrderModal from '../components/OrderModal';

const Orders = () => {
    const { orders, customers, updateOrderStatus, addOrder, updateOrder, deleteOrder } = useContext(AppDataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const {
        currentPage,
        setCurrentPage,
        sortConfig,
        handleSort,
        processedData,
        totalPages,
        totalItems
    } = useTableParams(filteredOrders, 8);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Processing': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Shipped': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'Cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const handleAdd = () => {
        setEditingOrder(null);
        setIsModalOpen(true);
    };

    const handleEdit = (order) => {
        setEditingOrder(order);
        setIsModalOpen(true);
    };

    const handleSave = (order) => {
        if (editingOrder) updateOrder(order);
        else addOrder(order);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
            case 'Processing': return <Clock className="w-3.5 h-3.5 mr-1" />;
            case 'Shipped': return <Truck className="w-3.5 h-3.5 mr-1" />;
            case 'Cancelled': return <XCircle className="w-3.5 h-3.5 mr-1" />;
            default: return null;
        }
    };

    const statusOptions = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out h-full flex flex-col">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Orders Management</h1>
                    <p className="text-slate-500 mt-2 text-base">Track, manage, and update customer order statuses.</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex bg-slate-100 p-1 rounded-xl flex-1 sm:flex-none">
                        {statusOptions.map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${statusFilter === status
                                    ? 'bg-white text-brand-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleAdd} className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold shadow-md shadow-brand-500/20 active:scale-95 transition-all w-full sm:w-auto justify-center text-sm">
                        <Plus className="w-5 h-5" />
                        Create Order
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex-1 flex flex-col overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
                    <div className="flex-1 max-w-md relative">
                        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by Order ID or Customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all outline-none text-sm shadow-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-semibold shadow-sm transition-colors text-sm">
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-white text-slate-400 font-semibold uppercase tracking-wider text-[11px] sticky top-0 z-10 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('id')}>
                                    <div className="flex items-center gap-1">Order Details <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('customer.name')}>
                                    <div className="flex items-center gap-1">Customer <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('date')}>
                                    <div className="flex items-center gap-1">Date <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('total')}>
                                    <div className="flex items-center gap-1">Total <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('status')}>
                                    <div className="flex items-center gap-1">Status <ArrowUpDown className="w-3 h-3" /></div>
                                </th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {processedData.length > 0 ? (
                                processedData.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors duration-200 group">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-800 group-hover:text-brand-600 transition-colors cursor-pointer">{order.id}</span>
                                            <span className="block text-slate-500 text-xs mt-0.5">{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={order.customer.avatar} alt={order.customer.name} className="w-8 h-8 rounded-full border border-slate-200 shadow-sm" />
                                                <div>
                                                    <span className="block font-semibold text-slate-800">{order.customer.name}</span>
                                                    <span className="block text-xs text-slate-500">{order.customer.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            <span className="block text-xs text-slate-400 mt-0.5">{new Date(order.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-800">
                                            ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border outline-none appearance-none pr-8 cursor-pointer relative bg-no-repeat bg-right ${getStatusColor(order.status)}`}
                                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundSize: '1rem', backgroundPosition: 'calc(100% - 6px) center' }}
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEdit(order)} className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all duration-200" title="Edit Order">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => deleteOrder(order.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 ml-1" title="Delete Order">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-16 text-center">
                                        <p className="text-slate-500">No orders found matching your criteria.</p>
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

            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingOrder}
                customers={customers}
            />
        </div>
    );
};

export default Orders;
