import React, { createContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/mockProducts';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('dashboard_products');
        if (saved) return JSON.parse(saved);
        return initialProducts;
    });

    useEffect(() => {
        localStorage.setItem('dashboard_products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        setProducts([{ ...product, id: Date.now().toString() }, ...products]);
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    };

    const removeProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, removeProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
