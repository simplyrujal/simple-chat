import { Button } from "flowbite-react";
import { Meteor } from "meteor/meteor";
import React, { useCallback } from "react";
import { TRooms } from "/imports/collections/room";
import { useSignaling } from "/imports/ui/shared/hooks/use-signaling";
import { AudioIcon } from "/imports/ui/shared/icons";

interface AudioActionProps {
  room: TRooms;
}

const AudioAction: React.FC<AudioActionProps> = ({ room }) => {
  const currentUserId = Meteor.userId() ?? null;
  const { sendCallRequest } = useSignaling(room._id);

  const roomUserIds = room.name.split("-");
  const targetUserId = roomUserIds.find((id) => id !== currentUserId) ?? null;

  const handleAudioCall = useCallback(() => {
    if (!targetUserId || !currentUserId) return;
    sendCallRequest(targetUserId, "audio");
  }, [targetUserId, currentUserId, sendCallRequest]);

  return (
    <>
      <Button
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border-none"
        title="Audio Call"
        onClick={handleAudioCall}
        color="gray"
      >
        <AudioIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </Button>
      <Button
        color="gray"
        size="sm"
        className="hidden sm:flex border-none hover:bg-gray-100"
        onClick={handleAudioCall}
      >
        <AudioIcon className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
        <span>Audio</span>
      </Button>
    </>
  );
};

export default AudioAction;
