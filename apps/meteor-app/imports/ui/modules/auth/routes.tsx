import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';

export const AuthRoutes: React.FC = () => (
    <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
    </Routes>
);
