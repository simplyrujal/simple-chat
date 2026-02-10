import { Meteor } from "meteor/meteor";
import React from "react";
import { Container } from "react-bootstrap";
import { useSubscribeMessages } from "../../../hooks/use-messages";
import Message from "./message";

const ChatMessages: React.FC<{ roomId: string }> = ({ roomId }) => {
    const messages = useSubscribeMessages(roomId);

    const currentUserId = Meteor.userId();

    return (
        <Container fluid className="flex-grow-1 overflow-auto p-3 bg-light d-flex flex-column">
            {currentUserId && messages && messages.length > 0 ? (
                messages.map((msg) => {
                    return <Message key={msg._id} msg={msg} currentUserId={currentUserId} otherUserId={roomId} />
                })
            ) : (
                <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                    <div className="mb-3">
                        <i className="bi bi-chat-dots fs-1"></i>
                    </div>
                    <p className="text-center">No messages yet.<br />Start the conversation!</p>
                </div>
            )}
        </Container>
    );
};

export default ChatMessages;