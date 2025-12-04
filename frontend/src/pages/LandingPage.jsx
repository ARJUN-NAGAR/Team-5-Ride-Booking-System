import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold text-white mb-4">
                        🚖 UrbanGlide
                    </h1>
                    <p className="text-xl text-white/90">
                        Your Reliable Ride-Hailing Platform
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Rider Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition hover:scale-105">
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">🙋‍♂️</div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Book a Ride
                            </h2>
                            <p className="text-gray-600">
                                Get to your destination quickly and safely
                            </p>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-sm text-gray-700">Real-time driver tracking</span>
                            </div>
                            <div className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-sm text-gray-700">Transparent fare estimates</span>
                            </div>
                            <div className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-sm text-gray-700">Safe and verified drivers</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                        >
                            Continue as Rider
                        </button>
                    </div>

                    {/* Driver Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition hover:scale-105">
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">🚗</div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Drive & Earn
                            </h2>
                            <p className="text-gray-600">
                                Start earning on your own schedule
                            </p>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-sm text-gray-700">Flexible working hours</span>
                            </div>
                            <div className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-sm text-gray-700">Instant ride notifications</span>
                            </div>
                            <div className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-sm text-gray-700">Competitive earnings</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
                        >
                            Continue as Driver
                        </button>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-white/80">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/register')}
                            className="font-bold underline hover:text-white"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>

                <div className="mt-12 text-center text-white/60 text-sm">
                    <p>© 2024 UrbanGlide. Built for Hackathon Excellence.</p>
                </div>
            </div>
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
export default LandingPage;
