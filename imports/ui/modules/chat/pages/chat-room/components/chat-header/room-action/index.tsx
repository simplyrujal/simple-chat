import React from "react";
import AudioAction from "./audio-action";
import MoreAction from "./more-action";
import VideoAction from "./video-action";

interface RoomActionProps {
  remoteUserId: string | null;
}

const RoomAction: React.FC<RoomActionProps> = ({ remoteUserId }) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <AudioAction remoteUserId={remoteUserId} />
      <VideoAction remoteUserId={remoteUserId} />
      <MoreAction />
    </div>
  );
};

export default RoomAction;
