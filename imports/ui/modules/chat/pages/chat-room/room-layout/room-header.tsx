import {
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";
import React from "react";
import { useChat } from "../../../provider/chat-provider";
import {
  AudioIcon,
  MoreIcon,
  UsersGroupIcon,
  VideoIcon,
} from "/imports/ui/shared/icons";

interface RoomHeaderProps {
  onBackClick?: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = () => {
  const { roomType } = useChat();
  return (
    <header className="flex-none border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-3 py-3 sm:px-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:block relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-sm">
              <UsersGroupIcon className="w-5 h-5" />
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
            <AudioIcon className="w-4 h-4" />
            <span className="ml-2">Audio</span>
          </Button>

          <Button
            color="gray"
            size="sm"
            className="hidden sm:flex"
            onClick={() => {}}
          >
            <VideoIcon className="w-4 h-4" />
            <span className="ml-2">Video</span>
          </Button>

          <div className="flex sm:hidden gap-1">
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Audio Call"
            >
              <AudioIcon className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Video Call"
            >
              <VideoIcon className="w-4 h-4" />
            </button>
          </div>

          <Dropdown
            label=""
            renderTrigger={() => (
              <button
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="More options"
              >
                <MoreIcon className="w-5 h-5" />
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
