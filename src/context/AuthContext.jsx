import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('dashhub_auth') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('dashhub_auth', isAuthenticated);
    }, [isAuthenticated]);

    const login = (email, password) => {
        // Mock authentication check
        if (email === 'admin@dashhub.com' && password === 'password') {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
