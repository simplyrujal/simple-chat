import { Mongo } from "meteor/mongo";

type TRooms = {
  _id: string;
  roomId: string;
  name: string;
  uids: string[];
  description: string;
  type: "public" | "private";
  createdAt: Date;
};

export const RoomCollection = new Mongo.Collection<TRooms>("rooms");
