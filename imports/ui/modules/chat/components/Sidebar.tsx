import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfileDropDown from './drop-down-user-profile';

interface User {
    id: string;
    name: string;
    avatar?: string;
    status: 'online' | 'offline' | 'away';
    lastMessage?: string;
    lastMessageTime?: string;
    unreadCount?: number;
}

// Mock data - replace with actual data from your backend
const mockUsers: User[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        status: 'online',
        lastMessage: 'Hey, how are you?',
        lastMessageTime: '2m ago',
        unreadCount: 2,
    },
    {
        id: '2',
        name: 'Bob Smith',
        status: 'offline',
        lastMessage: 'See you tomorrow!',
        lastMessageTime: '1h ago',
    },
    {
        id: '3',
        name: 'Carol Williams',
        status: 'away',
        lastMessage: 'Thanks for the help',
        lastMessageTime: '3h ago',
        unreadCount: 1,
    },
    {
        id: '4',
        name: 'David Brown',
        status: 'online',
        lastMessage: 'Let me know when you\'re free',
        lastMessageTime: '5h ago',
    },
    {
        id: '5',
        name: 'Emma Davis',
        status: 'offline',
        lastMessage: 'Great work on the project!',
        lastMessageTime: '1d ago',
    },
];

export const Sidebar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeUserId, setActiveUserId] = useState<string | null>(null);

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <aside className="sidebar">
            {/* Sidebar Header */}
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <h2>SimpleChat</h2>
                </div>
                <div className="sidebar-actions">
                    <Link to="/dashboard" className="icon-btn" title="Home">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </Link>
                    <button className="icon-btn" title="Settings">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 1v6m0 6v6m-6-6h6m6 0h-6m-3.5 9.5l4.5-4.5m0 0l4.5 4.5M7.5 4.5l4.5 4.5m0 0l4.5-4.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="sidebar-search">
                <div className="search-input-wrapper">
                    <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button
                            className="clear-search"
                            onClick={() => setSearchQuery('')}
                            title="Clear search"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* User List */}
            <div className="sidebar-content">
                <div className="user-list">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <Link key={user.id} to="/chat/1234546">
                                <div

                                    className={`user-item ${activeUserId === user.id ? 'active' : ''}`}
                                    onClick={() => setActiveUserId(user.id)}
                                >
                                    <div className="user-avatar">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} />
                                        ) : (
                                            <div className="avatar-placeholder">{getInitials(user.name)}</div>
                                        )}
                                        <span className={`status-indicator ${user.status}`} />
                                    </div>
                                    <div className="user-info">
                                        <div className="user-header">
                                            <h4 className="user-name">{user.name}</h4>
                                            {user.lastMessageTime && (
                                                <span className="message-time">{user.lastMessageTime}</span>
                                            )}
                                        </div>
                                        {user.lastMessage && (
                                            <p className="last-message">{user.lastMessage}</p>
                                        )}
                                    </div>
                                    {user.unreadCount && user.unreadCount > 0 && (
                                        <div className="unread-badge">{user.unreadCount}</div>
                                    )}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="empty-state">
                            <p>No users found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Current User Profile */}
            <UserProfileDropDown />
        </aside>
    );
};
