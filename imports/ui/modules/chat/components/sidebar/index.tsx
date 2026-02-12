import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserList } from "../../../../shared/hooks/user/use-user";
import UserProfileDropDown from "../drop-down-user-profile";
import UserItem from "./user-item";

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  onCloseMobile,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data, isLoading } = useUserList({
    searchString: searchQuery,
    limit: 10,
  });

  if (isLoading) {
    return (
      <div className="p-3 text-center text-gray-500 text-sm">Loading...</div>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-1040 md:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
      />

      <aside
        className={`fixed md:relative left-0 top-0 bottom-0 flex flex-col bg-white border-r border-gray-200 shadow-sm z-1050 h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-[300px]"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div
          className={`flex items-center bg-gray-50 border-b border-gray-200 p-3 transition-all duration-300 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-blue-600 m-0">SimpleChat</h2>
          )}
          <div className="flex gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              className="hidden md:block p-1 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isCollapsed ? (
                  <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                ) : (
                  <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                )}
              </svg>
            </button>

            {/* Mobile Close Button */}
            <button
              className="md:hidden p-1 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={onCloseMobile}
              title="Close"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Home Button */}
            {!isCollapsed && (
              <Link
                to="/dashboard"
                className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                title="Home"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <div className="p-3">
            <div className="relative flex items-center">
              <div className="absolute left-3 pointer-events-none">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-400"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className="w-full py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setSearchQuery("")}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {data && (
            <div>
              {data.users?.length > 0 ? (
                data.users.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    onCloseMobile={onCloseMobile}
                  />
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No users found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Current User Profile */}
        <div className="p-2 border-t border-gray-200 bg-gray-50">
          <UserProfileDropDown isCollapsed={isCollapsed} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
