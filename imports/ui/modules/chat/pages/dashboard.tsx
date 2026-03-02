import React from "react";
import { ChatBubbleIcon } from "../../../shared/icons";

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full text-center px-4">
      <div>
        <div className="mb-4">
          <ChatBubbleIcon size={64} className="mx-auto text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Select a chat to start messaging
        </h3>
        <p className="text-white text-sm">
          Or start a new conversation with your contacts.
        </p>
      </div>
    </div>
  );
};
