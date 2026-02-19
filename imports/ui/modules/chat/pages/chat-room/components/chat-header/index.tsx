import { Meteor } from "meteor/meteor";
import React from "react";
import ProfileName from "./profile-name";
import { TRooms } from "/imports/collections/room";

interface IProps {
  room: TRooms;
}

const ChatHeader: React.FC<IProps> = ({ room }) => {
  const currentUserId = Meteor.userId();

  const names = room.name.split("-");
  const otherUser = names.find((name) => name !== currentUserId);

  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
      <div>
        {otherUser && <ProfileName otherUser={otherUser} />}

        <small className="text-gray-500 text-sm">
          {room.description || "Private Conversation"}
        </small>
      </div>
    </div>
  );
};

export default ChatHeader;
