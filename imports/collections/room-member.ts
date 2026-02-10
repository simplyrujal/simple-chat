import { Mongo } from "meteor/mongo";

type TRoomMember = {
  _id: string;
  roomId: string;
  userId: string;

  role: "admin" | "member";
  muted: boolean;

  joinedAt: Date;
  lastReadAt?: Date;
};

export const RoomMemberCollection = new Mongo.Collection<TRoomMember>(
  "roomMembers",
);
