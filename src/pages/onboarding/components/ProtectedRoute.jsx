import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const isOnboarded = localStorage.getItem('is_Onboarded');
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (token && !isOnboarded) {
        return <Navigate to="/kuesioner" replace />;
    }

    return children;
};

export default ProtectedRoute;