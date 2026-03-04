import React from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { ChatRoomPage } from "./pages/chat-room";
import { DashboardPage } from "./pages/dashboard";

import { useAuth } from "../../shared/hooks/auth/use-auth";
import { userSetStatus } from "../../shared/hooks/user/use-user";
import { MenuIcon } from "../../shared/icons";

export const ChatRoutes: React.FC = () => {
  const { user } = useAuth();

  userSetStatus(user?._id || "");

  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleToggleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <div className="h-screen flex overflow-hidden relative">
      <Sidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden border-b border-gray-200 bg-white p-2">
          <button
            onClick={handleToggleMobile}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Open sidebar"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
        <Routes>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="chat/:chatRoomId"
            element={<ChatRoomPage />}
          />
        </Routes>
      </div>
    </div>
  );
};
