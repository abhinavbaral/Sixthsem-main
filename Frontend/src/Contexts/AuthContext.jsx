import React, { createContext, useState, useEffect, useContext } from 'react';
import { ROLES } from '../utils/constants.jsx';
import { login as authLogin, register as authRegister, logout as authLogout } from '../Services/authService';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) setUser(storedUser);
        setLoading(false);
    }, []);

    const login = async (email, password, role) => {
        setError(null);
        try {
            const result = await authLogin(email, password, role);
            if (result.success) {
                setUser(result.user);
                localStorage.setItem('user', JSON.stringify(result.user));
                return true;
            } else {
                setError(result.error || 'Login failed');
                return false;
            }
        } catch {
            setError('Server error. Try again.');
            return false;
        }
    };

    const register = async (userData) => {
        setError(null);
        try {
            const result = await authRegister(userData);
            if (result.success) {
                setUser(result.user);
                localStorage.setItem('user', JSON.stringify(result.user));
                return true;
            } else {
                setError(result.error || 'Registration failed');
                return false;
            }
        } catch {
            setError('Server error. Try again.');
            return false;
        }
    };

    const logout = async () => {
        try {
            await authLogout();
            setUser(null);
            localStorage.removeItem('user');
            return true;
        } catch {
            setError('Logout failed');
            return false;
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAdmin: user?.role === ROLES.ADMIN,
        isCustomer: user?.role === ROLES.CUSTOMER
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContext;