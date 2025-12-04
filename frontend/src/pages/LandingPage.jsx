import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Urban<span className="text-yellow-400">Ride</span></h1>
            <p className="text-xl mb-10 text-blue-100 text-center max-w-lg">
                The future of fair, transparent, and real-time urban transportation.
            </p>

            <div className="flex gap-6 w-full max-w-md">
                <Link to="/login" className="flex-1 text-center bg-white text-blue-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
                    Login
                </Link>
                <Link to="/register" className="flex-1 text-center bg-transparent border-2 border-white text-white py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-900 transition transform hover:-translate-y-1">
                    Register
                </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm text-blue-200">
                <div>
                    <span className="text-3xl block mb-2">⚡</span>
                    <p>Real-Time Matching</p>
                </div>
                <div>
                    <span className="text-3xl block mb-2">📍</span>
                    <p>Live Tracking</p>
                </div>
                <div>
                    <span className="text-3xl block mb-2">🛡️</span>
                    <p>Verified Drivers</p>
                </div>
            </div>
            
            <footer className="absolute bottom-4 text-xs text-blue-300">
                Hackathon Project | Team 5
            </footer>
        </div>
    );
};

export default LandingPage;
