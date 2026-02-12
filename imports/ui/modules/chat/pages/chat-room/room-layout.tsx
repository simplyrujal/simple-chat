import React from "react";
import RoomHeader from "./room-header";

interface IProps {
  children: React.ReactNode;
}

const RoomLayout: React.FC<IProps> = ({ children }) => {
  return (
    <main className="flex-1 flex flex-col overflow-hidden h-full  bg-white">
      <RoomHeader />
      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="h-full flex flex-col bg-white">{children}</div>
      </div>
    </main>
  );
};

export default RoomLayout;
