import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import UserItem from "./users/user-item";
import { useAuth } from "/imports/ui/shared/hooks/auth/use-auth";
import useLogout from "/imports/ui/shared/hooks/auth/use-logout";
import { useUserList } from "/imports/ui/shared/hooks/user/use-user";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  LogoIcon,
  SearchIcon,
} from "/imports/ui/shared/icons";
import { debounce } from "/imports/ui/shared/utils/debounce";

interface ChatSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<ChatSidebarProps> = ({
  isMobileOpen,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data } = useUserList({
    searchString: searchQuery,
    limit: 10,
  });

  const handleSearch = useCallback(
    debounce((value: string) => setSearchQuery(value), 300),
    [],
  );

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-900/50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
      />

      <aside
        className={`fixed md:relative left-0 top-0 bottom-0 z-50 flex flex-col border-r transition-all duration-300 ${
          isCollapsed ? "w-sidebar-collapsed" : "w-sidebar-width"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ backgroundColor: "rgba(40, 42, 54, 0.95)", borderColor: "rgba(189, 147, 249, 0.15)" }}
      >
        <div className="flex flex-col h-full">
          <header className="flex-none" style={{ borderBottom: "1px solid rgba(189, 147, 249, 0.15)" }}>
            <div className="flex items-center justify-between p-4" style={{ backgroundColor: "rgba(26, 27, 38, 0.5)" }}>
              <Link
                to="/dashboard"
                className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}
              >
                <div className="p-1.5 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br from-primary-500 to-dracula-pink">
                  <LogoIcon className="w-6 h-6 text-white" />
                </div>
                {!isCollapsed && (
                  <span className="text-lg font-bold text-gray-50">
                    SimpleChat
                  </span>
                )}
              </Link>
              <div className="flex items-center gap-1">
                <button
                  className="hidden md:flex p-2 rounded-lg transition-colors items-center justify-center hover:bg-gray-700/50"
                  style={{ color: "#6272a4" }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  title={isCollapsed ? "Expand" : "Collapse"}
                >
                  {isCollapsed ? (
                    <ChevronRightIcon className="w-5 h-5" />
                  ) : (
                    <ChevronLeftIcon className="w-5 h-5" />
                  )}
                </button>
                <button
                  className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-700/50"
                  style={{ color: "#6272a4" }}
                  onClick={onCloseMobile}
                  title="Close"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isCollapsed && (
              <div className="p-4 pt-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="w-5 h-5" style={{ color: "#6272a4" }}>
                      <SearchIcon />
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm transition-all border-0"
                    style={{ 
                      backgroundColor: "rgba(26, 27, 38, 0.8)", 
                      color: "#f8f8f2",
                      border: "1px solid rgba(189, 147, 249, 0.2)"
                    }}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>
            )}
          </header>

          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {data && data.users && data.users.length > 0 ? (
              <div className="py-2">
                {!isCollapsed && (
                  <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "#6272a4" }}>
                    Chats
                  </div>
                )}
                {data.users.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    onCloseMobile={onCloseMobile}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm" style={{ color: "#6272a4" }}>
                No users found
              </div>
            )}
          </div>

          <div className="flex-none" style={{ borderTop: "1px solid rgba(189, 147, 249, 0.15)" }}>
            <UserProfileDropdown isCollapsed={isCollapsed} />
          </div>
        </div>
      </aside>
    </>
  );
};

interface UserProfileDropdownProps {
  isCollapsed?: boolean;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  isCollapsed,
}) => {
  const { user } = useAuth();
  const { logout } = useLogout();

  const username = user?.username || "Guest";
  const initials = username.substring(0, 2).toUpperCase();

  return (
    <Dropdown
      label=""
      renderTrigger={() => (
        <button
          className={`w-full flex items-center p-4 transition-colors hover:bg-gray-700/30 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div
            className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? "justify-center w-full" : ""}`}
          >
            <div className="relative shrink-0">
              {user?.avatarUrl ? (
                <Avatar img={user.avatarUrl} alt="User avatar" rounded />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-dracula-pink text-white flex items-center justify-center font-bold text-sm">
                  {initials}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-gray-800 rounded-full" />
            </div>

            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <div className="font-semibold text-sm truncate text-gray-50">
                  {username}
                </div>
                <div className="text-xs text-success-500">Online</div>
              </div>
            )}
          </div>
        </button>
      )}
      placement="top"
    >
      <DropdownItem className="text-gray-100 hover:bg-gray-700">Profile</DropdownItem>
      <DropdownDivider className="bg-gray-700" />
      <DropdownItem
        onClick={logout}
        className="text-danger-500 hover:bg-danger-500/10"
      >
        Logout
      </DropdownItem>
    </Dropdown>
  );
};

export default Sidebar;
