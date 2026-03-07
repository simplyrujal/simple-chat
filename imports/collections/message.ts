// imports/api/messages/MessageCollection.ts
import { Mongo } from "meteor/mongo";

export type TMessageType = "text" | "image" | "file" | "audio" | "video";

export type TMessage = {
  _id?: string;
  roomId: string;
  from?: string;
  to: string;
  content: {
    type: TMessageType;
    text?: string;
    fileUrl?: string;
    fileId?: string;
    fileName?: string;
    fileSize?: number;
    fileMimeType?: string;
    duration?: number;
  };
  createdAt?: Date;
  editedAt?: Date;
  deleted?: boolean;
  read?: boolean;
};

export const MessageCollection = new Mongo.Collection<TMessage>("messages");
