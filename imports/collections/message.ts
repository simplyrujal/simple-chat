import { Mongo } from "meteor/mongo";

type TMessage = {
  _id: string;
  roomId: string;

  from: string;
  to: string;

  content: {
    type: "text" | "image" | "file";
    text?: string;
    fileUrl?: string;
  };
  createdAt: Date;
  editedAt?: Date;
  deleted: boolean;
};

export const MessageCollection = new Mongo.Collection<TMessage>("messages");
