import { Button } from "flowbite-react";
import React, { Fragment } from "react";
import { VideoIcon } from "/imports/ui/shared/icons";
import { useWebRTCContext } from "/imports/ui/shared/hooks/use-webrtc-context";

interface VideoActionProps {
  remoteUserId: string | null;
}

const VideoAction: React.FC<VideoActionProps> = ({ remoteUserId }) => {
  const { startCall, callState } = useWebRTCContext();

  const onClick = () => {
    if (remoteUserId) {
      startCall(remoteUserId, "video");
    }
  };

  const isInCall = callState.status !== "idle" && callState.remoteUserId === remoteUserId;

  return (
    <Fragment>
      <Button
        className={`p-2 rounded-lg transition-colors ${
          isInCall
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        }`}
        title="Video Call"
        onClick={onClick}
        disabled={!remoteUserId || isInCall}
      >
        <VideoIcon className="w-4 h-4" />
      </Button>
      <Button
        color="gray"
        size="sm"
        className="hidden sm:flex"
        onClick={onClick}
        disabled={!remoteUserId || isInCall}
      >
        <VideoIcon className="w-4 h-4" />
        <span className="ml-2">Video</span>
      </Button>
    </Fragment>
  );
};

export default VideoAction;
