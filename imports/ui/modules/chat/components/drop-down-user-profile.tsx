import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import React from "react";
import { useAuth } from "../../../shared/hooks/auth/use-auth";
import useLogout from "../../../shared/hooks/auth/use-logout";
interface UserProfileDropDownProps {
  isCollapsed?: boolean;
}

const UserProfileDropDown: React.FC<UserProfileDropDownProps> = ({
  isCollapsed,
}) => {
  const { user } = useAuth();
  const { logout } = useLogout();

  const username = user?.username || "Guest";
  const initials = username.substring(0, 2).toUpperCase();

  return (
    <Dropdown
      label="" // no label, we use custom trigger
      renderTrigger={() => (
        <button
          className={`w-full flex items-center p-2 bg-gray-200 transition-colors ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-2 overflow-hidden w-full">
            <div className="relative shrink-0">
              {user?.avatarUrl ? (
                <Avatar
                  img={user.avatarUrl}
                  // className="w-9 h-9 rounded-full object-cover"
                  alt="User avatar"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                  {initials}
                </div>
              )}

              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success-500 border-2 border-white rounded-full" />
            </div>

            {!isCollapsed && (
              <div className="text-left overflow-hidden">
                <div className="font-semibold text-sm truncate text-gray-900">
                  {username}
                </div>
                <div className="text-success-600 text-xs">Online</div>
              </div>
            )}

            {!isCollapsed && (
              <span className="ml-auto">
                <svg
                  className="w-4 h-4 text-gray-500 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            )}
          </div>
        </button>
      )}
      placement="top"
      className={isCollapsed ? "w-48" : "w-full min-w-[180px]"}
    >
      <DropdownItem
        icon={() => (
          <svg
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      >
        Profile
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem
        onClick={logout}
        icon={() => (
          <svg
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        )}
        className="text-danger-600 hover:bg-danger-50"
      >
        Logout
      </DropdownItem>
    </Dropdown>
  );
};

export default UserProfileDropDown;
