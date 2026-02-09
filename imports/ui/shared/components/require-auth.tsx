import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuth } from '../hooks/auth/use-is-auth';

export const RequireAuth: React.FC = () => {
    const isAuth = useIsAuth();

    if (isAuth.isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuth.isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};
