import React from "react";

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full text-center px-4">
      <div>
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M21 15a4 4 0 0 1-4 4H8l-4 4V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Select a chat to start messaging
        </h3>
        <p className="text-gray-500 text-sm">
          Or start a new conversation with your contacts.
        </p>
      </div>
    </div>
  );
};
