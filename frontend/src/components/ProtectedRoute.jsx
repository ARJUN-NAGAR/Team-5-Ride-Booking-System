import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const userString = localStorage.getItem('userInfo');
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If a driver tries to access admin page, send them back to home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;