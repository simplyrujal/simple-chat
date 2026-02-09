import { Mongo } from "meteor/mongo";

type TMessage = {
  _id: string;
  from: string;
  to: string;
  message: string;
  createdAt: Date;
};

export const MessageCollection = new Mongo.Collection<TMessage>("messages");
