import { ListGroupItem } from "flowbite-react";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDirectRoom } from "../../../../hooks/use-room";
import LastSeen from "./last-seen";
import Status from "./status";
import { User } from "/imports/collections/user";
import { useAuth } from "/imports/ui/shared/hooks/auth/use-auth";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

interface UserItemProps {
  user: User;
  onCloseMobile?: () => void;
  isCollapsed: boolean;
}

const UserItem: React.FC<UserItemProps> = ({
  user,
  onCloseMobile,
  isCollapsed,
}) => {
  const url = window.location.href;
  const parts = url.split("/");
  const chatRoomId = parts[parts.length - 1];
  const usr = useAuth();
  const navigate = useNavigate();
  const createDirectRoom = useCreateDirectRoom();

  const isActive = chatRoomId?.split("-")?.includes(user._id);

  const handleUserClick = async (targetUserId: string) => {
    const currentUserId = usr?.user?._id;
    if (!currentUserId) return;

    try {
      const roomId = await createDirectRoom.mutateAsync([
        currentUserId,
        targetUserId,
      ]);
      navigate(`/chat/${roomId}`);
      if (window.innerWidth < 768) {
        onCloseMobile?.();
      }
    } catch (err) {
      console.error("Error joining room:", err);
    }
  };

  return (
    <ListGroupItem
      onClick={() => handleUserClick(user._id)}
      className={`w-full flex items-center gap-3 py-2.5 px-4 border-0 transition-all duration-200 rounded-lg ${
        isCollapsed ? "justify-center px-2" : ""
      } ${
        isActive
          ? "bg-blue-600 text-white shadow-sm"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      {/* Avatar with Status */}
      <div className="relative shrink-0">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10"
          />
        ) : (
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm ring-2 ring-white/10 ${
              isActive ? "bg-blue-700 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {getInitials(user.profile.name || user.username)}
          </div>
        )}
        <Status userId={user._id} />
      </div>

      {/* User Info - Hidden when collapsed */}
      {!isCollapsed && (
        <div className="flex flex-col">
          <div className="flex justify-between items-start gap-2">
            <h6
              className={`truncate text-sm font-semibold ${
                isActive ? "text-white" : "text-gray-800"
              }`}
            >
              {user.profile.name}
            </h6>
            {user.createdAt && (
              <span
                className={`text-xs whitespace-nowrap ${
                  isActive ? "text-white/60" : "text-gray-400"
                }`}
              >
                {new Date(user.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
          <LastSeen userId={user._id} lastSeenAt={user.lastSeenAt} />
        </div>
      )}
    </ListGroupItem>
  );
};

export default memo(UserItem);
