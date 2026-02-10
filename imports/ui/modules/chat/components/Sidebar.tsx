import React, { useState } from 'react';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserProfileDropDown from './drop-down-user-profile';
import { useAuth } from '/imports/ui/shared/hooks/auth/use-auth';
import { useCreateDirectRoom } from '/imports/ui/shared/hooks/rooms/use-room';
import useUserList from '/imports/ui/shared/hooks/user/user-user-list';

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

interface SidebarProps {
    isMobileOpen?: boolean;
    onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeUserId, setActiveUserId] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const usr = useAuth()
    const navigate = useNavigate();
    const createDirectRoom = useCreateDirectRoom();

    const { data, isLoading } = useUserList({
        searchString: searchQuery,
        limit: 10,
    });

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

    if (isLoading) {
        return <div className="p-3 text-center text-muted small">Loading...</div>
    }

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isMobileOpen ? 'show' : ''}`}
                onClick={onCloseMobile}
            />

            <aside
                className={`sidebar-container d-flex flex-column bg-white border-end shadow-sm ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'show-mobile' : ''}`}
                style={{ width: '300px', height: '100vh' }}
            >
                {/* Sidebar Header */}
                <div className="sidebar-header p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
                    <h2 className="fs-5 fw-bold m-0 text-primary">SimpleChat</h2>
                    <div className="d-flex gap-1">
                        <Button
                            variant="link"
                            size="sm"
                            className="p-1 link-secondary d-none d-md-block"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            title={isCollapsed ? "Expand" : "Collapse"}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {isCollapsed ? (
                                    <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                                ) : (
                                    <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                                )}
                            </svg>
                        </Button>
                        <Button
                            variant="link"
                            size="sm"
                            className="p-1 link-secondary d-md-none"
                            onClick={onCloseMobile}
                            title="Close"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </Button>
                        {!isCollapsed && (
                            <>
                                <Button as={Link as any} to="/dashboard" variant="link" size="sm" className="p-1 link-secondary" title="Home">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="search-container p-3">
                    <InputGroup size="sm">
                        <InputGroup.Text className="bg-white border-end-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                            </svg>
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search users..."
                            className="border-start-0 ps-0 shadow-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <Button variant="outline-secondary" className="border-start-0" onClick={() => setSearchQuery('')}>
                                &times;
                            </Button>
                        )}
                    </InputGroup>
                </div>

                {/* User List */}
                <div className="flex-grow-1 overflow-auto">
                    {data && (
                        <ListGroup variant="flush">
                            {data.users?.length > 0 ? (
                                data.users.map(user => (
                                    <ListGroup.Item
                                        key={user._id}
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
                                                    {getInitials(user.username)}
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
                                                        {user.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </small>
                                                )}
                                            </div>
                                            <p className={`mb-0 smaller text-truncate ${activeUserId === user._id ? 'text-white-50' : 'text-muted'}`}>
                                                {user.status === 'online' ? 'Active now' : 'Last seen ' + user.createdAt?.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <div className="p-4 text-center text-muted small">No users found</div>
                            )}
                        </ListGroup>
                    )}
                </div>

                {/* Current User Profile */}
                <div className="user-profile-container p-2 border-top bg-light">
                    <UserProfileDropDown isCollapsed={isCollapsed} />
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
