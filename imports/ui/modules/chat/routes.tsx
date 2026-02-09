import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { ChatRoomPage } from './pages/chat-room';
import { DashboardPage } from './pages/dashboard';
import ChatProvider from './provider/chat-provider';

export const ChatRoutes: React.FC = () => (
    <div className="chat-layout">
        <Sidebar />
        <ChatProvider>
            <Routes>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="chat/:id" element={<ChatRoomPage />} />
            </Routes>
        </ChatProvider>
    </div>
);
