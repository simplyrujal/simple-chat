import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import React from "react";
import { useAuth } from "/imports/ui/shared/hooks/auth/use-auth";
import useLogout from "/imports/ui/shared/hooks/auth/use-logout";
import {
  ChevronDownIcon,
  LogoutIcon,
  UserIcon,
} from "/imports/ui/shared/icons";
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
                <ChevronDownIcon className="w-4 h-4 text-gray-500 transition-transform duration-200" />
              </span>
            )}
          </div>
        </button>
      )}
      placement="top"
      className={isCollapsed ? "w-48" : "w-full min-w-[180px]"}
    >
      <DropdownItem icon={() => <UserIcon size={16} />}>Profile</DropdownItem>
      <DropdownDivider />
      <DropdownItem
        onClick={logout}
        icon={() => <LogoutIcon size={16} />}
        className="text-danger-600 hover:bg-danger-50"
      >
        Logout
      </DropdownItem>
    </Dropdown>
  );
};

export default UserProfileDropDown;
