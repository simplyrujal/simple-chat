import { Meteor } from "meteor/meteor";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSubscribeMessages } from "../../hooks/use-messages";

const ChatMessages: React.FC = () => {
    const { chatRoomId } = useParams<{ chatRoomId: string }>();
    const messages = useSubscribeMessages(chatRoomId || '');
    const currentUserId = Meteor.userId();


    // Get current user's profile name (adjust based on your user data structure)
    const currentUserName = "You";

    return (
        <Container fluid className="flex-grow-1 overflow-auto p-3 bg-light d-flex flex-column">
            {messages && messages.length > 0 ? (
                messages.map((msg: any) => {
                    const isCurrentUser = msg.senderId === currentUserId;

                    return (
                        <Row
                            key={msg._id}
                            className={`mb-3 ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'}`}
                        >
                            <Col xs={10} md={8} lg={6}>
                                <div className={`p-3 rounded shadow-sm ${isCurrentUser ? 'bg-primary text-white' : 'bg-white border'}`}>
                                    {/* Sender Name */}
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span className={`fw-bold small ${isCurrentUser ? 'text-white-50' : 'text-primary'}`}>
                                            {isCurrentUser ? currentUserName : `User ${msg.senderId?.substring(0, 4)}`}
                                        </span>
                                        {msg.createdAt && (
                                            <small className={`${isCurrentUser ? 'text-white-50' : 'text-muted'} smaller`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </small>
                                        )}
                                    </div>

                                    {/* Message Content */}
                                    <div className={isCurrentUser ? 'text-white' : ''}>
                                        {msg.content?.text}
                                    </div>

                                    {/* Message status indicator (optional) */}
                                    {isCurrentUser && (
                                        <div className="text-end mt-1">
                                            <small className="text-white-50 smaller">
                                                {/* Add read/delivered status here if you track it */}
                                            </small>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    );
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