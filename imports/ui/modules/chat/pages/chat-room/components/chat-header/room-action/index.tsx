import React from "react";
import AudioAction from "./audio-action";
import MoreAction from "./more-action";
import VideoAction from "./video-action";

const RoomAction: React.FC = () => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <AudioAction />
      <VideoAction />
      <MoreAction />
    </div>
  );
};

export default RoomAction;
