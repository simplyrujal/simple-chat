import React, { useCallback, useState } from "react";
import { useUserList } from "../../../../shared/hooks/user/use-user";
import UserProfileDropDown from "../user-profile";
import SidebarHeaderOptions from "./header-options";
import Users from "./users";

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

  const handleCloseMobile = useCallback(() => {
    onCloseMobile?.();
  }, [onCloseMobile]);

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>
    );
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
      />

      <aside
        className={`fixed md:relative left-0 top-0 bottom-0 flex flex-col bg-white border-r border-gray-200 shadow-sm z-50 h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-sidebar-width"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <SidebarHeaderOptions
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          onCloseMobile={onCloseMobile}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {data && (
          <Users
            users={data.users || []}
            handleCloseMobile={handleCloseMobile}
            isCollapsed={isCollapsed}
          />
        )}

        <UserProfileDropDown isCollapsed={isCollapsed} />
      </aside>
    </>
  );
};

export default Sidebar;
