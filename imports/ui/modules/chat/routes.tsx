import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/dashboard';

export const ChatRoutes: React.FC = () => (
    <div className="chat-layout">
        <Sidebar />
        <Routes>
            <Route path="dashboard" element={<DashboardPage />} />
        </Routes>
    </div>
);
