import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(data.role === 'rider' ? '/rider' : '/driver');
        } catch (error) {
            alert('Invalid Credentials');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl mb-6 font-bold text-center">Login</h2>
                <input className="w-full mb-3 p-2 border rounded" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input className="w-full mb-4 p-2 border rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
                <p className="mt-4 text-center text-sm">New? <Link to="/register" className="text-blue-500">Register</Link></p>
            </form>
        </div>
    );
};

export default Login;
