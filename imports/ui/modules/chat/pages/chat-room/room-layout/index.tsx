import React from "react";
import RoomHeader from "./room-header";

interface IProps {
  children: React.ReactNode;
  onBackClick?: () => void;
  onToggleMobile?: () => void;
}

const RoomLayout: React.FC<IProps> = ({ children, onBackClick, onToggleMobile }) => {
  return (
    <main className="flex-1 flex flex-col overflow-hidden h-full bg-white">
      <RoomHeader onBackClick={onBackClick} onToggleMobile={onToggleMobile} />
      <div className="flex-1 overflow-auto">
        <div className="h-full flex flex-col">{children}</div>
      </div>
    </main>
  );
};

export default RoomLayout;
