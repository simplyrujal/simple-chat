import React from "react";

interface IProps {
  children: React.ReactNode;
}

const RoomLayout: React.FC<IProps> = ({ children }) => {
  return (
    <main className="flex-1 flex flex-col overflow-hidden h-full bg-white">
      <div className="flex-1 overflow-auto">
        <div className="h-full flex flex-col">{children}</div>
      </div>
    </main>
  );
};

export default RoomLayout;
