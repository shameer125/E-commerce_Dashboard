import React, { createContext, useState, useEffect } from 'react';
import { mockCustomers, mockOrders } from '../data/mockData';

export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
    const [customers, setCustomers] = useState(() => {
        const saved = localStorage.getItem('dashhub_customers');
        if (saved) return JSON.parse(saved);
        return mockCustomers;
    });

    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('dashhub_orders');
        if (saved) return JSON.parse(saved);
        return mockOrders;
    });

    useEffect(() => {
        localStorage.setItem('dashhub_customers', JSON.stringify(customers));
    }, [customers]);

    useEffect(() => {
        localStorage.setItem('dashhub_orders', JSON.stringify(orders));
    }, [orders]);

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    };

    const addOrder = (order) => setOrders([order, ...orders]);
    const updateOrder = (order) => setOrders(orders.map(o => o.id === order.id ? order : o));
    const deleteOrder = (orderId) => setOrders(orders.filter(o => o.id !== orderId));

    const addCustomer = (customer) => setCustomers([customer, ...customers]);
    const updateCustomer = (customer) => setCustomers(customers.map(c => c.id === customer.id ? customer : c));
    const deleteCustomer = (customerId) => setCustomers(customers.filter(c => c.id !== customerId));

    return (
        <AppDataContext.Provider value={{
            customers,
            orders,
            updateOrderStatus,
            addOrder,
            updateOrder,
            deleteOrder,
            addCustomer,
            updateCustomer,
            deleteCustomer
        }}>
            {children}
        </AppDataContext.Provider>
    );
};
