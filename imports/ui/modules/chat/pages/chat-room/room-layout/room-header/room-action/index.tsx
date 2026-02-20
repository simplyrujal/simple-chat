import React from "react";
import AudioAction from "./audio-action";
import MoreAction from "./more-action";
import VideoAction from "./video-action";

interface RoomActionProps {
  targetUserId?: string;
}

const RoomAction: React.FC<RoomActionProps> = ({ targetUserId }) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <AudioAction targetUserId={targetUserId} />
      <VideoAction targetUserId={targetUserId} />
      <MoreAction />
    </div>
  );
};

export default RoomAction;
