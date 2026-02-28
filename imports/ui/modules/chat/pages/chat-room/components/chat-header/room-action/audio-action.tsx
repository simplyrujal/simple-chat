import { Button } from "flowbite-react";
import { Meteor } from "meteor/meteor";
import React, { useCallback, useState } from "react";
import { TRooms } from "/imports/collections/room";
import { useSignaling } from "/imports/ui/shared/hooks/use-signaling";
import { AudioIcon } from "/imports/ui/shared/icons";

interface AudioActionProps {
  room: TRooms;
}

const AudioAction: React.FC<AudioActionProps> = ({ room }) => {
  const currentUserId = Meteor.userId() ?? null;
  const { sendCallRequest } = useSignaling(room._id);
  const [isCalling, setIsCalling] = useState(false);

  const roomUserIds = room.name.split("-");
  const targetUserId = roomUserIds.find((id) => id !== currentUserId) ?? null;

  const handleAudioCall = useCallback(() => {
    if (!targetUserId || !currentUserId || isCalling) return;

    console.log("☎️ Triggering audio call for room:", room._id);
    setIsCalling(true);

    const callId = sendCallRequest(targetUserId, "audio");

    // Reset "calling" state after 3 seconds to re-enable button
    setTimeout(() => setIsCalling(false), 3000);
  }, [targetUserId, currentUserId, sendCallRequest, room._id, isCalling]);

  return (
    <>
      <Button
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all border-none"
        title="Audio Call"
        onClick={handleAudioCall}
        disabled={isCalling}
        color="gray"
      >
        <AudioIcon className={`w-5 h-5 ${isCalling ? "animate-pulse text-primary-500" : "text-gray-600 dark:text-gray-400"}`} />
      </Button>
      <Button
        color="gray"
        size="sm"
        className="hidden sm:flex border-none hover:bg-gray-100"
        onClick={handleAudioCall}
        disabled={isCalling}
      >
        <AudioIcon className={`w-4 h-4 mr-2 ${isCalling ? "animate-pulse text-primary-500" : "text-gray-600 dark:text-gray-400"}`} />
        <span>{isCalling ? "Calling..." : "Audio"}</span>
      </Button>
    </>
  );
};

export default AudioAction;
