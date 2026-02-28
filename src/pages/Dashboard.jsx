import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { AppDataContext } from '../context/AppDataContext';
import { TrendingUp, Package, Users, DollarSign, ArrowUpRight, ArrowDownRight, ShoppingCart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCSVExport } from '../hooks/useCSVExport';

const StatCard = ({ title, value, icon, trend, isPositive }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-brand-100 transition-all duration-300 group cursor-pointer relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-50 to-transparent opacity-0 group-hover:opacity-100 rounded-bl-full transition-opacity duration-500 pointer-events-none" />
        <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{title}</h3>
            <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-brand-50 group-hover:text-brand-600 flex items-center justify-center text-slate-600 transition-colors duration-300">
                {icon}
            </div>
        </div>
        <div className="flex items-baseline gap-3 relative z-10">
            <h2 className="text-4xl font-bold text-slate-800 tracking-tight">{value}</h2>
            <span className={`flex items-center text-sm font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {isPositive ? <ArrowUpRight className="w-4 h-4 mr-0.5" /> : <ArrowDownRight className="w-4 h-4 mr-0.5" />}
                {trend}
            </span>
        </div>
    </div>
);

const Dashboard = () => {
    const { products } = useContext(ProductContext);
    const { orders, customers } = useContext(AppDataContext);
    const { exportToCSV } = useCSVExport();

    const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0);

    // Calculate revenue from mockOrders for a more realistic dashboard
    const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);

    const chartData = [
        { name: 'Mon', revenue: 4000 },
        { name: 'Tue', revenue: 3000 },
        { name: 'Wed', revenue: 5000 },
        { name: 'Thu', revenue: 2780 },
        { name: 'Fri', revenue: 1890 },
        { name: 'Sat', revenue: 2390 },
        { name: 'Sun', revenue: 3490 },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-2 text-base">Here's a snapshot of your store's performance today.</p>
                </div>
                <button
                    onClick={() => exportToCSV(orders, 'dashHub_orders_report', ['ID', 'Customer', 'Date', 'Items', 'Total', 'Status', 'PaymentMethod'])}
                    className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl shadow-sm hover:bg-slate-50 hover:text-brand-600 transition-colors hidden sm:block"
                >
                    Download Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Total Revenue"
                    value={`$${(totalRevenue / 1000).toFixed(1)}k`}
                    icon={<DollarSign className="w-6 h-6" />}
                    trend="12.5%"
                    isPositive={true}
                />
                <StatCard
                    title="Active Products"
                    value={products.length}
                    icon={<Package className="w-6 h-6" />}
                    trend="3"
                    isPositive={true}
                />
                <StatCard
                    title="Total Orders"
                    value={orders.length.toLocaleString()}
                    icon={<ShoppingCart className="w-6 h-6" />}
                    trend="8.1%"
                    isPositive={true}
                />
                <StatCard
                    title="Total Customers"
                    value={customers.length.toLocaleString()}
                    icon={<Users className="w-6 h-6" />}
                    trend="4.2%"
                    isPositive={true}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col lg:col-span-2 min-h-[400px]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Revenue Analytics</h3>
                            <p className="text-sm text-slate-500 mt-1">Daily revenue over the past 7 days</p>
                        </div>
                        <select className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-1.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-brand-500/20">
                            <option>Last 7 Days</option>
                            <option>This Month</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    <div className="flex-1 min-h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} tickFormatter={(value) => `$${value}`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#0f766e', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col min-h-[400px]">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
                        Recent Orders
                        <span className="text-sm font-medium text-brand-600 cursor-pointer hover:underline">View All</span>
                    </h3>
                    <div className="flex flex-col gap-6">
                        {orders.slice(0, 4).map((order) => (
                            <div key={order.id} className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-100">
                                    <img src={order.customer.avatar} alt={order.customer.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-brand-600 transition-colors truncate">{order.id}</h4>
                                    <p className="text-xs text-slate-500 mt-1 truncate">{order.customer.name} • {order.status}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-sm font-bold text-slate-700 block">${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
