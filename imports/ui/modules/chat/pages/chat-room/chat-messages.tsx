import React from "react";
import { useParams } from "react-router-dom";
import { useSubscribeMessages } from "../../hooks/use-messages";

const ChatMessages: React.FC = () => {
    const { chatRoomId } = useParams<{ chatRoomId: string }>();
    const messages = useSubscribeMessages(chatRoomId || '');

    return (
        <div className="flex-grow-1 overflow-auto p-4 bg-light d-flex flex-column gap-3">
            {(messages as any[]) && (messages as any[]).length > 0 ? (
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
    )
}

export default ChatMessages