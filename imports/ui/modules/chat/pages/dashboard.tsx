import React from "react";

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full text-center text-secondary">
      <h3 className="mb-2 text-dark fs-5">Select a chat to start messaging</h3>
      <p className="mb-0">Or start a new conversation with your contacts.</p>
    </div>
  );
};
