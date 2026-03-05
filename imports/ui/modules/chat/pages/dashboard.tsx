import React from "react";
import { ChatBubbleIcon } from "../../../shared/icons";

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full text-center px-4">
      <div className="p-8 rounded-2xl" style={{ background: "rgba(40, 42, 54, 0.5)", border: "1px solid rgba(189, 147, 249, 0.15)" }}>
        <div className="mb-4">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-dracula-pink/20 mb-4">
            <ChatBubbleIcon size={40} className="text-primary-500" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-100 mb-2">
          Select a chat to start messaging
        </h3>
        <p className="text-sm" style={{ color: "#6272a4" }}>
          Or start a new conversation with your contacts.
        </p>
      </div>
    </div>
  );
};
