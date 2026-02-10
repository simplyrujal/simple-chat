import React from "react"
import { Col, Row } from "react-bootstrap"
import { TMessage } from "/imports/collections/message"
import { useGetUser } from "/imports/ui/shared/hooks/user/use-user"

interface MessageProps {
    msg: TMessage
    currentUserId: string
}

const currentUserName = 'You';

const Message: React.FC<MessageProps> = ({ msg, currentUserId }) => {
    const isCurrentUser = msg.from === currentUserId;
    const otherUserId = isCurrentUser ? msg.to : msg.from;
    const { data, isLoading, error } = useGetUser(otherUserId || '')

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <Row
            className={`mb-3 ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'}`}
        >
            <Col xs={10} md={8} lg={6}>
                <div className={`p-3 rounded shadow-sm ${isCurrentUser ? 'bg-primary text-white' : 'bg-white border'}`}>
                    {/* Sender Name */}
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className={`fw-bold small ${isCurrentUser ? 'text-white-50' : 'text-primary'}`}>
                            {isCurrentUser ? currentUserName : `${data?.profile?.name}`}
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
    )
}

export default Message