import { Meteor } from "meteor/meteor";
import React from "react";
import ProfileName from "./profile-name";
import RoomAction from "./room-action";
import { TRooms } from "/imports/collections/room";
import { UsersGroupIcon } from "/imports/ui/shared/icons";

interface IProps {
  room: TRooms;
}

const ChatHeader: React.FC<IProps> = ({ room }) => {
  const currentUserId = Meteor.userId();

  const names = room.name.split("-");
  const otherUser = names.find((name) => name !== currentUserId);

  return (
    <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(189, 147, 249, 0.15)", backgroundColor: "rgba(40, 42, 54, 0.8)" }}>
      <div className="flex gap-2 items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-dracula-pink flex items-center justify-center font-semibold text-sm">
          <UsersGroupIcon className="w-5 h-5 text-white" />
        </div>
        {otherUser && <ProfileName otherUser={otherUser} />}
      </div>
      <RoomAction room={room} />
    </div>
  );
};

export default ChatHeader;
