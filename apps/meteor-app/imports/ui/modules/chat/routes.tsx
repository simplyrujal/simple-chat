import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { ChatRoomPage } from "./pages/chat-room";
import { DashboardPage } from "./pages/dashboard";

import { useAuth } from "../../shared/hooks/auth/use-auth";
import { userSetStatus } from "../../shared/hooks/user/use-user";
import { MenuIcon } from "../../shared/icons";
import { CallManager } from "/imports/ui/shared/components/call-manager";
import { SignalingProvider } from "/imports/ui/shared/contexts/signaling-context";

export const ChatRoutes: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  userSetStatus(user?._id || "");

  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleToggleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const isChatRoom = location.pathname.includes('/chat/');

  return (
    <SignalingProvider>
      <CallManager />
      <div className="h-screen flex overflow-hidden relative">
        <Sidebar
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          {!isChatRoom && (
            <div
              className="md:hidden border-b p-2 flex items-center justify-between"
              style={{
                backgroundColor: "rgba(26, 27, 38, 0.8)",
                borderColor: "rgba(189, 147, 249, 0.15)"
              }}
            >
              <button
                onClick={handleToggleMobile}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                title="Open sidebar"
              >
                <MenuIcon className="w-5 h-5" />
              </button>
              <span className="text-gray-100 font-bold text-sm mr-2">SimpleChat</span>
            </div>
          )}
          <Routes>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route
              path="chat/:chatRoomId"
              element={<ChatRoomPage onToggleSidebar={handleToggleMobile} />}
            />
          </Routes>
        </div>
      </div>
    </SignalingProvider>
  );
};
