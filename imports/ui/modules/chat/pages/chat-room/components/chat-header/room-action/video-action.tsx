import { Button } from "flowbite-react";
import { Meteor } from "meteor/meteor";
import React, { useCallback, useState } from "react";
import { TRooms } from "/imports/collections/room";
import { useSignaling } from "/imports/ui/shared/hooks/use-signaling";
import { VideoIcon } from "/imports/ui/shared/icons";

interface VideoActionProps {
  room: TRooms;
}

const VideoAction: React.FC<VideoActionProps> = ({ room }) => {
  const currentUserId = Meteor.userId() ?? null;
  const { sendCallRequest } = useSignaling(room.roomId);
  const [isCalling, setIsCalling] = useState(false);

  const roomUserIds = room.name.split("-");
  const targetUserId = roomUserIds.find((id) => id !== currentUserId) ?? null;

  const handleVideoCall = useCallback(() => {
    if (!targetUserId || !currentUserId || isCalling) return;

    setIsCalling(true);

    sendCallRequest(targetUserId, "video");

    // Reset "calling" state after 3 seconds
    setTimeout(() => setIsCalling(false), 3000);
  }, [targetUserId, currentUserId, sendCallRequest, room.roomId, isCalling]);

  return (
    <>
      <Button
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all border-none md:hidden"
        title="Video Call"
        onClick={handleVideoCall}
        disabled={isCalling}
        color="gray"
      >
        <VideoIcon className={`w-5 h-5 ${isCalling ? "animate-pulse text-secondary-500" : "text-gray-600 dark:text-gray-400"}`} />
      </Button>
      <Button
        color="gray"
        size="sm"
        className="hidden md:flex border-none hover:bg-gray-100 ml-2"
        onClick={handleVideoCall}
        disabled={isCalling}
      >
        <VideoIcon className={`w-4 h-4 mr-2 ${isCalling ? "animate-pulse text-secondary-500" : "text-gray-600 dark:text-gray-400"}`} />
        <span>{isCalling ? "Calling..." : "Video"}</span>
      </Button>
    </>
  );
};

export default VideoAction;
