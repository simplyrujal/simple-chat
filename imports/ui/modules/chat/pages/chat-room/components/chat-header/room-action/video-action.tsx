import { Button } from "flowbite-react";
import { Meteor } from "meteor/meteor";
import React, { useCallback } from "react";
import { TRooms } from "/imports/collections/room";
import { useSignaling } from "/imports/ui/shared/hooks/use-signaling";
import { VideoIcon } from "/imports/ui/shared/icons";

interface VideoActionProps {
  room: TRooms;
}

const VideoAction: React.FC<VideoActionProps> = ({ room }) => {
  const currentUserId = Meteor.userId() ?? null;
  const { sendCallRequest } = useSignaling(room._id);

  const roomUserIds = room.name.split("-");
  const targetUserId = roomUserIds.find((id) => id !== currentUserId) ?? null;

  const handleVideoCall = useCallback(() => {
    if (!targetUserId || !currentUserId) return;
    sendCallRequest(targetUserId, "video");
  }, [targetUserId, currentUserId, sendCallRequest]);

  return (
    <>
      <Button
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border-none"
        title="Video Call"
        onClick={handleVideoCall}
        color="gray"
      >
        <VideoIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </Button>
      <Button
        color="gray"
        size="sm"
        className="hidden sm:flex border-none hover:bg-gray-100 ml-2"
        onClick={handleVideoCall}
      >
        <VideoIcon className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
        <span>Video</span>
      </Button>
    </>
  );
};

export default VideoAction;
