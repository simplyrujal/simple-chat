import React from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useRoom } from '../../hooks/use-room';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import ChatMessages from './chat-messages';

export const ChatRoomPage: React.FC = () => {
    const { chatRoomId } = useParams<{ chatRoomId: string }>();
    const { data: room, isLoading: isRoomLoading, error: roomError } = useRoom(chatRoomId);

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
            <ChatHeader room={room} />

            {/* Chat Messages */}
            <ChatMessages roomId={room._id} />

            {/* Chat Input Placeholder */}
            <ChatInput room={room} />
        </div>
    );
};