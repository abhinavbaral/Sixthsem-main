import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [successMsg, setSuccessMsg] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (!email || !password || !confirmPassword) {
            setError('Please fill all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const success = await register({ email, password, role });
        if (success) {
            setSuccessMsg('Registration successful! Redirecting to Login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setError('Registration failed. Try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h2>

            {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
            {successMsg && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{successMsg}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block mb-1 font-medium text-gray-700">Register as</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2"
                >
                    Register
                </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
                Already have an account? <Link to="/login" className="text-green-600 hover:text-green-800 font-medium">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
