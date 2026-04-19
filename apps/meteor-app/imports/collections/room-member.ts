import { Mongo } from "meteor/mongo";
import { Role } from "./user";

type TRoomMember = {
  _id: string;
  roomId: string;
  userId: string;

  role: Role;
  muted: boolean;

  joinedAt: Date;
  lastReadAt?: Date;
};

export const RoomMemberCollection = new Mongo.Collection<TRoomMember>(
  "roomMembers",
);
