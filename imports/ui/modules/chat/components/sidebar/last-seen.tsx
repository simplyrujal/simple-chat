import React from 'react';
import { useGetUserStatus } from '/imports/ui/shared/hooks/user/use-user';

const LastSeen: React.FC<{ userId: string, lastSeenAt: Date }> = ({ userId, lastSeenAt }) => {
    const status = useGetUserStatus(userId)
    const isActive = status === 'online';

    return <p className={`mb-0 smaller text-truncate ${isActive ? 'text-white-50' : 'text-muted'}`}>
        {isActive ? 'Active now' : 'Last seen ' + (lastSeenAt ? new Date(lastSeenAt).toLocaleDateString() : 'recently')}
    </p>
}

export default LastSeen