import React from 'react';
import { TRooms } from '/imports/collections/room';

interface IProps {
    room: TRooms;
}

const ChatHeader: React.FC<IProps> = ({ room }) => {
    return (
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
            <div>
                <h5 className="mb-0 fw-bold">{room.name || 'Chat Room'}</h5>
                <small className="text-muted">{room.description || 'Private Conversation'}</small>
            </div>
        </div>
    )
}

export default ChatHeader