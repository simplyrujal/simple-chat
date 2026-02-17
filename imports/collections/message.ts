// imports/api/messages/MessageCollection.ts
import { Mongo } from "meteor/mongo";

export type TMessage = {
  _id: string;
  roomId: string;
  from: string;
  to: string;
  content: {
    type: "text" | "image" | "file" | "audio" | "video";
    text?: string;
    fileUrl?: string; // public URL to stream/download
    fileId?: string; // reference to MediaFiles._id
    fileName?: string;
    fileSize?: number;
    fileMimeType?: string;
    duration?: number; // for audio/video in seconds
  };
  createdAt: Date;
  editedAt?: Date;
  deleted: boolean;
};

export const MessageCollection = new Mongo.Collection<TMessage>("messages");
