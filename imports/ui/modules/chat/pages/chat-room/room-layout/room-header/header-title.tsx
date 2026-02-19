import React from "react";
import { useChat } from "/imports/ui/modules/chat/provider/chat-provider";
import { UsersGroupIcon } from "/imports/ui/shared/icons";

const HeaderTitle: React.FC = () => {
  const { roomType } = useChat();

  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="hidden sm:block relative shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-sm">
          <UsersGroupIcon className="w-5 h-5" />
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success-500 border-2 border-white rounded-full" />
      </div>

      <div className="min-w-0">
        <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate">
          {roomType === "direct" ? "Private Chat" : "Group Chat"}
        </h1>
        {roomType === "channel" && (
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            Click to view participants
          </p>
        )}
      </div>
    </div>
  );
};

export default HeaderTitle;
