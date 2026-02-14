import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import React from "react";
import { useChat } from "../../../provider/chat-provider";

interface RoomHeaderProps {
  onBackClick?: () => void;
  onToggleMobile?: () => void;
}

const VideoIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);

const AudioIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const MoreIcon = () => (
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
      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
    />
  </svg>
);

const MenuIcon = () => (
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
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const RoomHeader: React.FC<RoomHeaderProps> = ({ onToggleMobile }) => {
  const { roomType } = useChat();
  return (
    <header className="flex-none border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-3 py-3 sm:px-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleMobile}
            className="md:hidden flex items-center justify-center p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Open sidebar"
          >
            <MenuIcon />
          </button>

          <div className="hidden sm:block relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-sm">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success-500 border-2 border-white rounded-full" />
          </div>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate">
              {roomType === "direct" ? "Private Chat" : "Group Chat"}
            </h1>
            {roomType === "channel" && (
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Click to view participants
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            color="gray"
            size="sm"
            className="hidden sm:flex"
            onClick={() => {}}
          >
            <AudioIcon />
            <span className="ml-2">Audio</span>
          </Button>

          <Button
            color="gray"
            size="sm"
            className="hidden sm:flex"
            onClick={() => {}}
          >
            <VideoIcon />
            <span className="ml-2">Video</span>
          </Button>

          <div className="flex sm:hidden gap-1">
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Audio Call"
            >
              <AudioIcon />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Video Call"
            >
              <VideoIcon />
            </button>
          </div>

          <Dropdown
            label=""
            renderTrigger={() => (
              <button
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="More options"
              >
                <MoreIcon />
              </button>
            )}
            placement="bottom-end"
          >
            <DropdownItem>View Profile</DropdownItem>
            <DropdownItem>Search in conversation</DropdownItem>
            <DropdownItem>Notifications</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Block user</DropdownItem>
            <DropdownItem className="text-danger-600 hover:bg-danger-50">
              Report
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default RoomHeader;
