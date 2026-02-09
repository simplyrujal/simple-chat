import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login';

export const AuthRoutes: React.FC = () => (
    <Routes>
        <Route path="login" element={<LoginPage />} />
    </Routes>
);
