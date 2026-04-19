import { Avatar } from "flowbite-react";
import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDirectRoom } from "../../../../hooks/use-room";
import LastMessage from "./last-message";
import LastSeen from "./last-seen";
import Status from "./status";
import { User } from "/imports/collections/user";
import { useSignalingContext } from "/imports/ui/shared/contexts/signaling-context";
import { useAuth } from "/imports/ui/shared/hooks/auth/use-auth";
import { AudioIcon, CloseIcon, VideoIcon } from "/imports/ui/shared/icons";

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
  const {
    activeCall,
    incomingCall,
    sendCallResponse,
    startActiveCall,
    clearIncomingCall
  } = useSignalingContext();

  const currentUserId = usr?.user?._id;
  const roomId = currentUserId ? [currentUserId, user._id].sort().join("-") : null;

  const isIncoming = incomingCall && incomingCall.roomId === roomId;
  const isLive = activeCall && activeCall.callId === roomId;
  const callType = isLive ? activeCall.callType : isIncoming ? incomingCall.callType : null;

  const handleAccept = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!incomingCall) return;

    sendCallResponse(incomingCall.from, incomingCall.callId, "accepted", incomingCall.roomId || "global");

    startActiveCall({
      callId: incomingCall.callId,
      callType: incomingCall.callType,
      targetUserId: incomingCall.from,
      callerName: incomingCall.callerName || user.profile.name || user.username,
      isCaller: false,
    });

    clearIncomingCall();

    // Also navigate to the room
    handleUserClick(user._id);
  }, [incomingCall, sendCallResponse, startActiveCall, clearIncomingCall, user]);

  const handleDecline = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!incomingCall) return;
    sendCallResponse(incomingCall.from, incomingCall.callId, "rejected", incomingCall.roomId || "global");
    clearIncomingCall();
  }, [incomingCall, sendCallResponse, clearIncomingCall]);

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
        className="w-full flex items-center justify-center py-3 px-2 hover:bg-gray-700/50 hover-scale transition-all duration-300 list-item"
        title={user.profile.name}
      >
        <div className="relative">
          {user.avatarUrl ? (
            <Avatar img={user.avatarUrl} alt={user.username} rounded />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-dracula-pink text-white flex items-center justify-center font-bold text-sm shadow-glow">
              {getInitials(user.profile.name || user.username)}
            </div>
          )}
          <Status userId={user._id} />
          {(isLive || isIncoming) && (
            <div className={`absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full border-2 border-slate-900 animate-pulse-glow ${isIncoming ? "bg-green-500" : "bg-red-500"}`}>
              {callType === "video" ? (
                <VideoIcon className="w-2 h-2 text-white" />
              ) : (
                <AudioIcon className="w-2 h-2 text-white" />
              )
              }
            </div>
          )}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => handleUserClick(user._id)}
      className={`w-full flex items-center gap-3 py-3 px-4 transition-all duration-300 list-item ${isActive
        ? "bg-gradient-to-r from-primary-500/40 to-dracula-pink/30 shadow-glow"
        : "hover:bg-gray-700/40"
        }`}
      style={{ borderLeft: isActive ? "3px solid #bd93f9" : "3px solid transparent" }}
    >
      <div className="relative shrink-0">
        {user.avatarUrl ? (
          <Avatar img={user.avatarUrl} alt={user.username} rounded />
        ) : (
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${isActive
              ? "bg-gradient-to-br from-primary-500 to-dracula-pink text-white shadow-glow"
              : "bg-gradient-to-br from-primary-500/80 to-dracula-pink/60 text-white hover:shadow-glow"
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
            className={`truncate text-sm font-semibold transition-all duration-300 ${isActive ? "text-white" : "text-gray-100"
              }`}
          >
            {user.profile.name}
          </span>
          {isLive && (
            <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-500 animate-pulse border border-red-500/30 shadow-glow-pink">
              {callType === "video" ? (
                <VideoIcon className="w-3.5 h-3.5" />
              ) : (
                <AudioIcon className="w-3.5 h-3.5" />
              )
              }
              <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
            </div>
          )}
          {isIncoming && (
            <div className="flex items-center gap-1 ml-auto animate-bounce-in">
              <button
                onClick={handleAccept}
                className="p-1 rounded-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 shadow-glow active:scale-95 hover-scale"
                title="Accept Call"
              >
                {callType === "video" ? <VideoIcon size={14} /> : <AudioIcon size={14} />}
              </button>
              <button
                onClick={handleDecline}
                className="p-1 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 shadow-glow-pink active:scale-95 hover-scale"
                title="Decline Call"
              >
                <CloseIcon size={14} />
              </button>
            </div>
          )}
          {user.createdAt && !isIncoming && (
            <span
              className={`text-xs whitespace-nowrap transition-all duration-300 ${isActive ? "text-white/70" : "text-gray-500"
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
            otherUserName={user.username}
          />
          <LastSeen userId={user._id} lastSeenAt={user.lastSeenAt} />
        </div>
      </div>
    </button>
  );
};

export default memo(UserItem);
