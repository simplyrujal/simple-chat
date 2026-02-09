import React from "react";

interface IProps {
    children: React.ReactNode;
}

const ChatProvider: React.FC<IProps> = ({ children }) => {
    return (
        <main className="main-content">
            <header className="top-bar">
                <h1>Chats</h1>
                <div className="actions">
                    <button>Video Call</button>
                    <button>Audio Call</button>

                </div>
            </header>
            <div className="content-area">{children}</div>
        </main>
    );
};

export default ChatProvider;
