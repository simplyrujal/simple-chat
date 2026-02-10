import { Mongo } from "meteor/mongo";

export type TRooms = {
  _id: string;
  roomId: string;
  name: string;
  description: string;
  type: "direct" | "channel";
  createdAt: Date;
  createdBy: string;
};

export const RoomCollection = new Mongo.Collection<TRooms>("rooms");
