import React, { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../api/mockData';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(mockUsers[0]);
    const navigate = useNavigate();

    const login = () => {
        setIsLoggedIn(true);
        navigate('/dashboard');
    };

    const logout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    const value = { isLoggedIn, login, logout, user: currentUser };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};