import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill all fields');
            return;
        }

        const success = await login(email, password, role);
        if (success) {
            navigate(role === 'admin' ? '/admin/dashboard' : '/');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>
                
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                <label className="block mb-1 font-semibold">Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <label className="block mb-1 font-semibold">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <label className="block mb-1 font-semibold">Login as</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded"
                >
                    Login
                </button>

                <p className="mt-4 text-center text-gray-600">
                    Don't have an account? <Link className="text-blue-600 hover:underline" to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
