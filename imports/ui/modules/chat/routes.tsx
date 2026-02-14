import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar } from "./components/sidebar";
import { ChatRoomPage } from "./pages/chat-room";
import { DashboardPage } from "./pages/dashboard";

import { useAuth } from "../../shared/hooks/auth/use-auth";
import { userSetStatus } from "../../shared/hooks/user/use-user";

export const ChatRoutes: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  userSetStatus(user?._id || "");

  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleBackClick = () => {
    navigate("/dashboard");
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
          <Route path="chat/:chatRoomId" element={<ChatRoomPage onBackClick={handleBackClick} />} />
        </Routes>
      </div>
    </div>
  );
};
