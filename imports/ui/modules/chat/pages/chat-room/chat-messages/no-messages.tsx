import React from "react";
import { ChatBubbleIcon, PlusIcon } from "/imports/ui/shared/icons";

const NoMessages: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
          <ChatBubbleIcon size={40} className="text-primary-600" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
          <PlusIcon size={16} className="text-white" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        No messages yet
      </h3>
      <p className="text-gray-500 text-center max-w-xs">
        Start the conversation by sending a message below
      </p>
    </div>
  );
};

export default NoMessages;
