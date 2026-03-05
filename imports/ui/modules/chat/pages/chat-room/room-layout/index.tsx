import React from "react";
import { CallManager } from "/imports/ui/shared/components/call-manager";

interface IProps {
  children: React.ReactNode;
}

const RoomLayout: React.FC<IProps> = ({ children }) => {
  return (
    <main className="flex-1 flex flex-col overflow-hidden h-full" style={{ backgroundColor: "rgba(26, 27, 38, 0.95)" }}>
      <div className="flex-1 overflow-auto">
        <CallManager />
        <div className="h-full flex flex-col">{children}</div>
      </div>
    </main>
  );
};

export default RoomLayout;
