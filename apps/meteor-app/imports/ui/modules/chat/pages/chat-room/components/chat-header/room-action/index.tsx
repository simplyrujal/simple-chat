import React from "react";
import AudioAction from "./audio-action";
import MoreAction from "./more-action";
import VideoAction from "./video-action";
import { TRooms } from "/imports/collections/room";

interface RoomActionProps {
  room: TRooms;
}

const RoomAction: React.FC<RoomActionProps> = ({ room }) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <AudioAction room={room} />
      <VideoAction room={room} />
      <MoreAction />
    </div>
  );
};

export default RoomAction;
