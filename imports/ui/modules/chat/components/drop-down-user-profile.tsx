import React, { useEffect, useRef, useState } from "react";
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

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const username = user?.username || "Guest";
  const initials = username.substring(0, 2).toUpperCase();

  // // close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        // setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="p-2 border-t border-gray-200 bg-gray-50">
      <div ref={dropdownRef} className="relative w-full">
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-200 transition-colors ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-2 overflow-hidden w-full">
            <div className="relative shrink-0">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  className="w-9 h-9 rounded-full object-cover"
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
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
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

        {open && (
          <div
            className={`absolute bottom-full mb-2 bg-white shadow-xl rounded-lg border border-gray-200 p-1.5 z-50 ${
              isCollapsed ? "w-48 left-0" : "w-full min-w-[180px] right-0"
            }`}
          >
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-700 transition-colors">
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
              Profile
            </button>

            <div className="my-1.5 border-t border-gray-200" />

            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-danger-600 hover:bg-danger-50 text-sm transition-colors"
            >
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
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileDropDown;
