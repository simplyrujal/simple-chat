import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { ChatRoomPage } from './pages/chat-room';
import { DashboardPage } from './pages/dashboard';
import ChatProvider from './provider/chat-provider';

import { Button } from 'react-bootstrap';
import { useAuth } from '../../shared/hooks/auth/use-auth';
import { userSetStatus } from '../../shared/hooks/user/use-user';

export const ChatRoutes: React.FC = () => {
    const { user } = useAuth();

    userSetStatus(user?._id || '')

    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    return (
        <div className="vh-100 d-flex overflow-hidden position-relative">
            <Sidebar
                isMobileOpen={isMobileOpen}
                onCloseMobile={() => setIsMobileOpen(false)}
            />

            <div className="flex-grow-1 d-flex flex-column min-width-0">
                {/* Mobile Header Toggle */}
                <div className="d-md-none p-2 border-bottom bg-white d-flex align-items-center">
                    <Button
                        variant="link"
                        className="p-1 link-dark"
                        onClick={() => setIsMobileOpen(true)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </Button>
                    <span className="ms-2 fw-bold text-primary">SimpleChat</span>
                </div>

                <ChatProvider>
                    <Routes>
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="chat/:chatRoomId" element={<ChatRoomPage />} />
                    </Routes>
                </ChatProvider>
            </div>
        </div>
    );
};
