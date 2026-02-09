import React, { useEffect, useRef, useState } from "react"
import { useAuth } from "../../../shared/hooks/auth/use-auth"
import useLogout from "../../../shared/hooks/auth/use-logout"

const UserProfileDropDown: React.FC = () => {
    const { user } = useAuth()
    const { logout } = useLogout()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => setIsOpen(!isOpen)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const username = user?.username || "Guest"
    const initials = username.substring(0, 2).toUpperCase()

    return (
        <div className="sidebar-footer" ref={dropdownRef}>
            <div className={`current-user ${isOpen ? 'active' : ''}`} onClick={toggleDropdown}>
                <div className="user-avatar small">
                    <div className="avatar-placeholder">{initials}</div>
                    <span className="status-indicator online" />
                </div>
                <div className="user-info">
                    <h4 className="user-name">{username}</h4>
                    <span className="user-status">Online</span>
                </div>
                <div className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className="user-profile-dropdown">
                    <button className="dropdown-item" onClick={() => console.log("Profile clicked")}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>Profile</span>
                    </button>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item logout" onClick={logout}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserProfileDropDown