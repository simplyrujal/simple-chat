import React from "react";
import { Dropdown, Image } from "react-bootstrap";
import { useAuth } from "../../../shared/hooks/auth/use-auth";
import useLogout from "../../../shared/hooks/auth/use-logout";

interface UserProfileDropDownProps {
    isCollapsed?: boolean;
}

const UserProfileDropDown: React.FC<UserProfileDropDownProps> = ({ isCollapsed }) => {
    const { user } = useAuth()
    const { logout } = useLogout()

    const username = user?.username || "Guest"
    const initials = username.substring(0, 2).toUpperCase()

    return (
        <Dropdown drop="up" className="w-100">
            <Dropdown.Toggle
                variant="light"
                id="user-profile-dropdown"
                className={`w-100 d-flex align-items-center ${isCollapsed ? 'justify-content-center' : 'justify-content-between'} p-2 border-0 shadow-none bg-transparent`}
            >
                <div className="d-flex align-items-center gap-2 overflow-hidden">
                    <div className="position-relative flex-shrink-0">
                        {user?.avatarUrl ? (
                            <Image src={user.avatarUrl} roundedCircle style={{ width: '36px', height: '36px', objectFit: 'cover' }} />
                        ) : (
                            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold small" style={{ width: '36px', height: '36px' }}>
                                {initials}
                            </div>
                        )}
                        <span
                            className="position-absolute bottom-0 end-0 border border-white rounded-circle bg-success"
                            style={{ width: '10px', height: '10px' }}
                        />
                    </div>
                    {!isCollapsed && (
                        <div className="text-start overflow-hidden">
                            <div className="fw-bold small text-truncate text-dark">{username}</div>
                            <div className="text-success smaller">Online</div>
                        </div>
                    )}
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow-lg border-0 mb-2 p-2" style={{ width: isCollapsed ? 'auto' : '100%', minWidth: '180px' }}>
                <Dropdown.Item onClick={() => console.log("Profile clicked")} className="rounded d-flex align-items-center gap-2 py-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Profile</span>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} className="rounded d-flex align-items-center gap-2 py-2 text-danger">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Logout</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserProfileDropDown