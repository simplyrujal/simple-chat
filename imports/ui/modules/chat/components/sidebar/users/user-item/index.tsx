import { Avatar } from "flowbite-react";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDirectRoom } from "../../../../hooks/use-room";
import LastMessage from "./last-message";
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

  const currentUserId = usr?.user?._id;
  const roomId = currentUserId ? [currentUserId, user._id].sort().join("-") : null;

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

  if (isCollapsed) {
    return (
      <button
        onClick={() => handleUserClick(user._id)}
        className="w-full flex items-center justify-center py-3 px-2 hover:bg-gray-700/50 transition-colors"
        title={user.profile.name}
      >
        <div className="relative">
          {user.avatarUrl ? (
            <Avatar img={user.avatarUrl} alt={user.username} rounded />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-dracula-pink text-white flex items-center justify-center font-bold text-sm">
              {getInitials(user.profile.name || user.username)}
            </div>
          )}
          <Status userId={user._id} />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => handleUserClick(user._id)}
      className={`w-full flex items-center gap-3 py-3 px-4 transition-all duration-200 ${isActive
        ? "bg-gradient-to-r from-primary-500/30 to-dracula-pink/30"
        : "hover:bg-gray-700/30"
        }`}
      style={{ borderLeft: isActive ? "3px solid #bd93f9" : "3px solid transparent" }}
    >
      <div className="relative shrink-0">
        {user.avatarUrl ? (
          <Avatar img={user.avatarUrl} alt={user.username} rounded />
        ) : (
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm ${isActive
              ? "bg-gradient-to-br from-primary-500 to-dracula-pink text-white"
              : "bg-primary-500 text-white"
              }`}
          >
            {getInitials(user.profile.name || user.username)}
          </div>
        )}
        <Status userId={user._id} />
      </div>

      <div className="flex flex-col min-w-0">
        <div className="flex justify-between items-center gap-2">
          <span
            className={`truncate text-sm font-semibold ${isActive ? "text-white" : "text-gray-100"
              }`}
          >
            {user.profile.name}
          </span>
          {user.createdAt && (
            <span
              className={`text-xs whitespace-nowrap ${isActive ? "text-white/70" : "text-gray-500"
                }`}
            >
              {new Date(user.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 items-baseline">
          <LastMessage
            roomId={roomId}
            currentUserId={currentUserId}
            isActive={isActive}
          />
          <LastSeen userId={user._id} lastSeenAt={user.lastSeenAt} />
        </div>
      </div>
    </button>
  );
};

export default memo(UserItem);
