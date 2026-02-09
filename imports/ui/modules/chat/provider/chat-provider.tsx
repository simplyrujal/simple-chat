import React from 'react';

interface IProps {
    children: React.ReactNode;
}

const ChatProvider: React.FC<IProps> = ({ children }) => {
    return (
        <main className="main-content">
            <header className="top-bar">
                <h1>Chats</h1>
                <div className="actions">
                    <button>New Chat</button>
                </div>
            </header>
            {children}
        </main>
    );
};

export default ChatProvider;