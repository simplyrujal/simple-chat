import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuth } from '../hooks/use-is-auth';

export const RequireAuth: React.FC = () => {
    const isAuth = useIsAuth();

    if (!isAuth) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
};
