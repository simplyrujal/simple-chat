import React from "react";
import HeaderTitle from "./header-title";
import RoomAction from "./room-action";

interface RoomHeaderProps {
  onBackClick?: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = () => {
  return (
    <header className="flex-none border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-3 py-3 sm:px-4">
        <HeaderTitle />
        <RoomAction />
      </div>
    </header>
  );
};

export default RoomHeader;
