import React from "react";
import ChatProvider from "../../../provider/chat-provider";

interface IProps {
  children: React.ReactNode;
  roomType: "direct" | "channel";
}

const RoomLayout: React.FC<IProps> = ({ children, roomType }) => {
  return (
    <main className="flex-1 flex flex-col overflow-hidden h-full bg-white">
      <div className="flex-1 overflow-auto">
        <div className="h-full flex flex-col">
          <ChatProvider roomType={roomType}>{children}</ChatProvider>
        </div>
      </div>
    </main>
  );
};

export default RoomLayout;
