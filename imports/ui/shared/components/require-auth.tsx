import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth/use-auth';

export const RequireAuth: React.FC = () => {
    const isAuth = useAuth();

    if (isAuth.isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuth.isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};
