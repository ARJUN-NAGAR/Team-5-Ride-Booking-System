import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
            <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
            <p className="text-2xl font-semibold mt-4 text-gray-800">Page Not Found</p>
            <p className="text-gray-500 mt-2 mb-8">The route you are looking for does not exist.</p>
            <Link to="/" className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;