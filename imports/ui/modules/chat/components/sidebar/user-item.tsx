import React, { memo, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { User } from '/imports/collections/user';
import { useAuth } from '/imports/ui/shared/hooks/auth/use-auth';
import { useCreateDirectRoom } from '/imports/ui/shared/hooks/rooms/use-room';

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

interface UserItemProps {
    user: User;
    onCloseMobile?: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onCloseMobile }) => {

    const [activeUserId, setActiveUserId] = useState<string | null>(null);

    const usr = useAuth()
    const navigate = useNavigate();
    const createDirectRoom = useCreateDirectRoom();


    const handleUserClick = async (targetUserId: string) => {
        const currentUserId = usr?.user?._id;
        if (!currentUserId) return;

        try {
            const roomId = await createDirectRoom.mutateAsync([currentUserId, targetUserId]);
            navigate(`/chat/${roomId}`);
            setActiveUserId(targetUserId);
            if (window.innerWidth < 768) {
                onCloseMobile?.();
            }
        } catch (err) {
            console.error("Error joining room:", err);
        }
    };
    return (
        <ListGroup.Item
            action
            active={activeUserId === user._id}
            onClick={() => handleUserClick(user._id)}
            className="user-list-item d-flex align-items-center gap-3 py-3 border-0 transition-all hover-bg-light"
        >
            <div className="position-relative flex-shrink-0">
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.username} className="rounded-circle" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                ) : (
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold small" style={{ width: '40px', height: '40px' }}>
                        {getInitials(user.profile.name || user.username)}
                    </div>
                )}
                <span
                    className={`position-absolute bottom-0 end-0 border border-white rounded-circle ${user.status === 'online' ? 'bg-success' : 'bg-secondary'}`}
                    style={{ width: '10px', height: '10px' }}
                />
            </div>
            <div className="user-info flex-grow-1 min-width-0">
                <div className="d-flex justify-content-between align-items-center mb-0">
                    <h6 className={`mb-0 text-truncate small fw-bold ${activeUserId === user._id ? 'text-white' : 'text-dark'}`}>{user.profile.name}</h6>
                    {user.createdAt && (
                        <small className={`smaller ${activeUserId === user._id ? 'text-white-50' : 'text-muted'}`}>
                            {new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </small>
                    )}
                </div>
                <p className={`mb-0 smaller text-truncate ${activeUserId === user._id ? 'text-white-50' : 'text-muted'}`}>
                    {user.status === 'online' ? 'Active now' : 'Last seen ' + (user.lastSeenAt ? new Date(user.lastSeenAt).toLocaleDateString() : 'recently')}
                </p>
            </div>
        </ListGroup.Item>
    );
};

export default memo(UserItem);