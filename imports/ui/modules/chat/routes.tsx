import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard';

export const ChatRoutes: React.FC = () => (
    <Routes>
        <Route path="dashboard" element={<DashboardPage />} />
    </Routes>
);
