import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { DashboardPage } from './pages/dashboard';
import ChatProvider from './provider/chat-provider';

export const ChatRoutes: React.FC = () => (
    <div className="chat-layout">
        <Sidebar />
        <ChatProvider>
            <Routes>
                <Route path="dashboard" element={<DashboardPage />} />
            </Routes>
        </ChatProvider>
    </div>
);
