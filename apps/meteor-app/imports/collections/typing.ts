import { Mongo } from "meteor/mongo";

export type TTyping = {
  _id?: string;
  userId: string;
  roomId: string;
  updatedAt: Date;
};

export const TypingCollection = new Mongo.Collection<TTyping>("typing");
