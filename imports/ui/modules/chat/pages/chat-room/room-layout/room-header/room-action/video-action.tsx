import { Button } from "flowbite-react";
import React, { Fragment } from "react";
import { useCall } from "/imports/ui/modules/chat/provider/call-provider";
import { VideoIcon } from "/imports/ui/shared/icons";

interface VideoActionProps {
  targetUserId?: string;
}

const VideoAction: React.FC<VideoActionProps> = ({ targetUserId }) => {
  const { initiateCall, isInCall } = useCall();

  const onClick = async () => {
    if (targetUserId && !isInCall) {
      try {
        await initiateCall(targetUserId, "video");
      } catch (error) {
        console.error("Failed to start video call:", error);
      }
    }
  };

  return (
    <Fragment>
      {" "}
      <Button
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        title="Video Call"
        onClick={onClick}
        disabled={isInCall || !targetUserId}
      >
        <VideoIcon className="w-4 h-4" />
      </Button>{" "}
      <Button
        color="gray"
        size="sm"
        className="hidden sm:flex"
        onClick={onClick}
        disabled={isInCall || !targetUserId}
      >
        <VideoIcon className="w-4 h-4" />
        <span className="ml-2">Video</span>
      </Button>
    </Fragment>
  );
};

export default VideoAction;
