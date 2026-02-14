import React from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { ChatRoomPage } from "./pages/chat-room";
import { DashboardPage } from "./pages/dashboard";

import { useAuth } from "../../shared/hooks/auth/use-auth";
import { userSetStatus } from "../../shared/hooks/user/use-user";

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
        <Routes>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route
            path="chat/:chatRoomId"
            element={<ChatRoomPage onToggleMobile={handleToggleMobile} />}
          />
        </Routes>
      </div>
    </div>
  );
};
