import React from "react";
import { ChatBubbleIcon, PlusIcon } from "/imports/ui/shared/icons";

const NoMessages: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-dracula-pink/20">
          <ChatBubbleIcon size={40} className="text-primary-500" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-r from-primary-500 to-dracula-pink">
          <PlusIcon size={16} className="text-white" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-100 mb-2">
        No messages yet
      </h3>
      <p className="text-center max-w-xs" style={{ color: "#6272a4" }}>
        Start the conversation by sending a message below
      </p>
    </div>
  );
};

export default NoMessages;
