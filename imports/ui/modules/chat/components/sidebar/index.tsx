import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../shared/hooks/auth/use-auth";
import useLogout from "../../../../shared/hooks/auth/use-logout";
import { useUserList } from "../../../../shared/hooks/user/use-user";
import UserItem from "./users/user-item";
import Loading from "/imports/ui/shared/components/loading";
import { debounce } from "/imports/ui/shared/utils/debounce";

interface ChatSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const SearchIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const LogoIcon = () => (
  <svg
    className="w-6 h-6 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

export const Sidebar: React.FC<ChatSidebarProps> = ({
  isMobileOpen,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data, isLoading } = useUserList({
    searchString: searchQuery,
    limit: 10,
  });

  const handleSearch = useCallback(
    debounce((value: string) => setSearchQuery(value), 300),
    [],
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-900/50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
      />

      <aside
        className={`fixed md:relative left-0 top-0 bottom-0 z-50 flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-300 ${
          isCollapsed ? "w-sidebar-collapsed" : "w-sidebar-width"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <header className="flex-none border-b border-gray-200">
            <div className="flex items-center justify-between p-4 bg-gray-50">
              <Link
                to="/dashboard"
                className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}
              >
                <div className="p-1.5 bg-primary-600 rounded-lg flex items-center justify-center shrink-0">
                  <LogoIcon />
                </div>
                {!isCollapsed && (
                  <span className="text-lg font-bold text-gray-900">
                    SimpleChat
                  </span>
                )}
              </Link>
              <div className="flex items-center gap-1">
                <button
                  className="hidden md:flex p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors items-center justify-center"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  title={isCollapsed ? "Expand" : "Collapse"}
                >
                  {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </button>
                <button
                  className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                  onClick={onCloseMobile}
                  title="Close"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {!isCollapsed && (
              <div className="p-4 pt-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
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
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
              <div className="p-4 text-center text-gray-500 text-sm">
                No users found
              </div>
            )}
          </div>

          <div className="flex-none border-t border-gray-200">
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
          className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors ${
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
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm">
                  {initials}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-white rounded-full" />
            </div>

            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <div className="font-semibold text-sm truncate text-gray-900">
                  {username}
                </div>
                <div className="text-xs text-success-600">Online</div>
              </div>
            )}
          </div>
        </button>
      )}
      placement="top"
    >
      <DropdownItem>Profile</DropdownItem>
      <DropdownDivider />
      <DropdownItem
        onClick={logout}
        className="text-danger-600 hover:bg-danger-50"
      >
        Logout
      </DropdownItem>
    </Dropdown>
  );
};

export default Sidebar;
