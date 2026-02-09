import React from "react";
import { Button } from "react-bootstrap";

interface IProps {
    children: React.ReactNode;
}

const ChatProvider: React.FC<IProps> = ({ children }) => {
    return (
        <main className="flex-grow-1 d-flex flex-column overflow-hidden">
            <header className="p-3 bg-white border-bottom d-flex justify-content-between align-items-center">
                <h1 className="m-0 fs-4 fw-bold">Chats</h1>
                <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm">
                        Video Call
                    </Button>
                    <Button variant="outline-primary" size="sm">
                        Audio Call
                    </Button>
                </div>
            </header>
            <div className="flex-grow-1 overflow-auto p-4">{children}</div>
        </main>
    );
};

export default ChatProvider;
