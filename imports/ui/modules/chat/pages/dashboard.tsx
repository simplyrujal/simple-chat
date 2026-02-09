import React from "react";

export const DashboardPage: React.FC = () => {
  return (
    <main className="main-content">
      <header className="top-bar">
        <h1>Chats</h1>
        <div className="actions">
          <button>New Chat</button>
        </div>
      </header>
      <div className="content-area">
        <div className="empty-state">
          <h3>Select a chat to start messaging</h3>
          <p>Or start a new conversation with your contacts.</p>
        </div>
      </div>
    </main>
  );
};
