import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    if (!user) return null; 

    return (
        <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-40">
            <Link to={user.role === 'driver' ? '/driver' : '/rider'} className="text-xl font-extrabold tracking-tight">
                Urban<span className="text-blue-600">Ride</span>
            </Link>

            <div className="flex items-center gap-6">
                <span className="text-gray-500 text-sm hidden sm:block">Welcome, {user.name}</span>
                <Link to="/history" className="text-gray-600 font-semibold hover:text-blue-600 transition">
                    History
                </Link>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
