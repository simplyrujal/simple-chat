import { Button } from "flowbite-react";
import React, { Fragment } from "react";
import { useCall } from "/imports/ui/modules/chat/provider/call-provider";
import { AudioIcon } from "/imports/ui/shared/icons";

interface AudioActionProps {
  targetUserId?: string;
}

const AudioAction: React.FC<AudioActionProps> = ({ targetUserId }) => {
  const { initiateCall, isInCall } = useCall();

  const onClick = async () => {
    if (targetUserId && !isInCall) {
      try {
        await initiateCall(targetUserId, "audio");
      } catch (error) {
        console.error("Failed to start audio call:", error);
      }
    }
  };

  return (
    <Fragment>
      {" "}
      <Button
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        title="Audio Call"
        onClick={onClick}
        disabled={isInCall || !targetUserId}
      >
        <AudioIcon className="w-4 h-4" />
      </Button>{" "}
      <Button
        color="gray"
        size="sm"
        className="hidden sm:flex"
        onClick={onClick}
        disabled={isInCall || !targetUserId}
      >
        <AudioIcon className="w-4 h-4" />
        <span className="ml-2">Audio</span>
      </Button>
    </Fragment>
  );
};

export default AudioAction;
