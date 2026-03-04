import React from "react";
import { Link } from "react-router-dom";
import { 
  ChevronExpandIcon, 
  CloseIcon, 
  HomeIcon, 
  SearchIcon 
} from "../../../../shared/icons";

interface SidebarHeaderOptionsProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onCloseMobile?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SidebarHeaderOptions: React.FC<SidebarHeaderOptionsProps> = ({
  isCollapsed,
  setIsCollapsed,
  onCloseMobile,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <>
      <div
        className={`flex items-center bg-gray-50 border-b border-gray-200 p-3 transition-all duration-300 ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && (
          <h2 className="text-xl font-bold text-primary-600 m-0">SimpleChat</h2>
        )}
        <div className="flex gap-1">
          <button
            className="hidden md:block p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <ChevronExpandIcon 
              size={20} 
              direction={isCollapsed ? "right" : "left"} 
            />
          </button>

          <button
            className="md:hidden p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={onCloseMobile}
            title="Close"
          >
            <CloseIcon size={20} />
          </button>

          {!isCollapsed && (
            <Link
              to="/dashboard"
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
              title="Home"
            >
              <HomeIcon size={20} />
            </Link>
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-3">
          <div className="relative flex items-center">
            <div className="absolute left-3 pointer-events-none">
              <SearchIcon size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="input-field py-2 pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors">
                <CloseIcon size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarHeaderOptions;
