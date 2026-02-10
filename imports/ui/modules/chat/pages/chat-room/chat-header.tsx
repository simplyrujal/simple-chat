import { Meteor } from 'meteor/meteor';
import React from 'react';
import { TRooms } from '/imports/collections/room';
import { useGetUser } from '/imports/ui/shared/hooks/user/use-user';

interface IProps {
    room: TRooms;
}

const ChatHeader: React.FC<IProps> = ({ room }) => {
    const currentUserId = Meteor.userId();

    const names = room.name.split('-');
    const otherUser = names.find((name) => name !== currentUserId);

    const { data, isLoading, error } = useGetUser(otherUser || '')


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
            <div>
                <h5 className="mb-0 fw-bold">{data?.profile?.name || 'Chat Room'}</h5>
                <small className="text-muted">{room.description || 'Private Conversation'}</small>
            </div>
        </div>
    )
}

export default ChatHeader