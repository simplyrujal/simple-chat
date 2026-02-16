import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { MessageCollection } from "/imports/collections/message";

Meteor.methods({
  async "set.message"({
    to,
    content,
    roomId,
  }: {
    to: string;
    content: string;
    roomId: string;
  }) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "You must be logged in to view messages.",
      );
    }
    check(roomId, String);
    check(to, String);
    check(content, String);

    let contentObj: { type: "text" | "image" | "file"; text?: string; fileUrl?: string };
    
    try {
      const parsed = JSON.parse(content);
      if (parsed.messageType && parsed.name) {
        contentObj = {
          type: parsed.messageType as "text" | "image" | "file",
          fileUrl: parsed.name,
        };
      } else {
        contentObj = {
          type: "text",
          text: content,
        };
      }
    } catch {
      contentObj = {
        type: "text",
        text: content,
      };
    }

    const data = await MessageCollection.insertAsync({
      roomId,
      content: contentObj,
      createdAt: new Date(),
      from: this.userId,
      to,
      deleted: false,
    });
    return data;
  },
});
