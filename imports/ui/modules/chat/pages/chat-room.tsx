import React from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useMessages } from '/imports/ui/shared/hooks/rooms/use-messages';
import { useRoom } from '/imports/ui/shared/hooks/rooms/use-room';

export const ChatRoomPage: React.FC = () => {
    const { chatRoomId } = useParams<{ chatRoomId: string }>();
    const { data: room, isLoading: isRoomLoading, error: roomError } = useRoom(chatRoomId);
    const { data: messages, isLoading: isMessagesLoading } = useMessages(chatRoomId);

    if (isRoomLoading) {
        return (
            <div className="h-100 d-flex align-items-center justify-content-center">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!room || roomError) {
        return (
            <div className="h-100 d-flex align-items-center justify-content-center bg-light">
                <Container className="text-center">
                    <div className="mb-4">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                    </div>
                    <h3 className="fw-bold text-dark mb-2">Room Not Available</h3>
                    <p className="text-muted mb-4">The chat room you are looking for does not exist or you don't have access to it.</p>
                    <Button as={Link as any} to="/dashboard" variant="primary" className="px-4">
                        Back to Dashboard
                    </Button>
                </Container>
            </div>
        );
    }

    return (
        <div className="h-100 d-flex flex-column bg-white">
            {/* Chat Header */}
            <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
                <div>
                    <h5 className="mb-0 fw-bold">{(room as any).name || 'Chat Room'}</h5>
                    <small className="text-muted">{(room as any).description || 'Private Conversation'}</small>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow-1 overflow-auto p-4 bg-light d-flex flex-column gap-3">
                {isMessagesLoading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" size="sm" variant="secondary" />
                    </div>
                ) : (messages as any[]) && (messages as any[]).length > 0 ? (
                    (messages as any[]).map((msg: any) => (
                        <div key={msg._id} className="p-3 bg-white rounded shadow-sm border" style={{ maxWidth: '80%' }}>
                            <div className="mb-1 fw-bold small text-primary">{msg.senderId}</div>
                            <div>{msg.content?.text}</div>
                            {msg.createdAt && (
                                <small className="text-muted smaller d-block mt-1">
                                    {new Date(msg.createdAt).toLocaleTimeString()}
                                </small>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="h-100 d-flex align-items-center justify-content-center text-muted">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                )}
            </div>

            {/* Chat Input Placeholder */}
            <div className="p-3 border-top bg-white">
                <div className="d-flex gap-2">
                    <input type="text" className="form-control" placeholder="Type a message..." disabled />
                    <Button variant="primary" disabled>Send</Button>
                </div>
                <small className="text-muted mt-2 d-block">This is a preview of the chat room functionality.</small>
            </div>
        </div>
    );
};