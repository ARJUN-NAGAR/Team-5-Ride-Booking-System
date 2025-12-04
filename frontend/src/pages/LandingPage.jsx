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
        </div>
    );
};

export default LandingPage;