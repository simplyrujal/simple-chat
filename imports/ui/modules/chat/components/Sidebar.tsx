import React, { useState } from 'react';
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserProfileDropDown from './drop-down-user-profile';
import { useAuth } from '/imports/ui/shared/hooks/auth/use-auth';
import useUserList from '/imports/ui/shared/hooks/user/user-user-list';

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const sortIdsAndJoin = (ids: string[]) => {
    return ids.sort((a, b) => a.localeCompare(b)).join('-');
}

export const Sidebar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeUserId, setActiveUserId] = useState<string | null>(null);

    const usr = useAuth()

    const { data, isLoading } = useUserList({
        searchString: searchQuery,
        limit: 10,
    });

    if (isLoading) {
        return <div className="p-3 text-center text-muted small">Loading...</div>
    }

    return (
        <aside className="d-flex flex-column bg-white border-end shadow-sm" style={{ width: '300px', height: '100vh' }}>
            {/* Sidebar Header */}
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
                <h2 className="fs-5 fw-bold m-0 text-primary">SimpleChat</h2>
                <div className="d-flex gap-1">
                    <Button as={Link as any} to="/dashboard" variant="link" size="sm" className="p-1 link-secondary" title="Home">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </Button>
                    <Button variant="link" size="sm" className="p-1 link-secondary" title="Settings">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 1v6m0 6v6m-6-6h6m6 0h-6m-3.5 9.5l4.5-4.5m0 0l4.5 4.5M7.5 4.5l4.5 4.5m0 0l4.5-4.5" />
                        </svg>
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="p-3">
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
                                    as={Link as any}
                                    to={`/chat/${sortIdsAndJoin([usr?.user?._id || '', user._id])}`}
                                    action
                                    active={activeUserId === user._id}
                                    onClick={() => setActiveUserId(user._id)}
                                    className="d-flex align-items-center gap-3 py-3 border-0 transition-all hover-bg-light"
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
                                    <div className="flex-grow-1 min-width-0">
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
            <div className="p-2 border-top bg-light">
                <UserProfileDropDown />
            </div>
        </aside>
    );
};

export default Sidebar;
