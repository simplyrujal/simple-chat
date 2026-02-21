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
    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
      <div className="flex gap-2 items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-sm">
          <UsersGroupIcon className="w-5 h-5" />
        </div>
        {otherUser && <ProfileName otherUser={otherUser} />}
      </div>
      <RoomAction />
    </div>
  );
};

export default ChatHeader;
