import React from "react";

export const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>SimpleChat</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="#" className="active">Chats</a>
            </li>
            <li>
              <a href="#">Contacts</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
          </ul>
        </nav>
        <div className="user-profile">
          <div className="avatar">JD</div>
          <div className="info">
            <span className="name">John Doe</span>
            <span className="status">Online</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <h1>Chats</h1>
          <div className="actions">
            <button>New Check</button>
            <button>Logout</button>
          </div>
        </header>
        <div className="content-area">
          <div className="empty-state">
            <h3>Select a chat to start messaging</h3>
            <p>Or start a new conversation with your contacts.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
