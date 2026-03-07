import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { MessageCollection, TMessageType } from "/imports/collections/message";

Meteor.methods({
  async "set.message"(data: {
    to: string;
    from?: string;
    roomId: string;
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
  }) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "You must be logged in to view messages.",
      );
    }
    check(data.roomId, String);
    check(data.to, String);
    check(data.content, Object);

    const dataToInsert = {
      roomId: data.roomId,
      content: data.content,
      createdAt: new Date(),
      from: this.userId,
      to: data.to,
      deleted: false,
    };

    const result = await MessageCollection.insertAsync(dataToInsert);
    return result;
  },
});

Meteor.methods({
  async "set.message.read"(messageId: string) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "You must be logged in to view messages.",
      );
    }
    check(messageId, String);

    const result = await MessageCollection.updateAsync(messageId, {
      $set: {
        read: true,
      },
    });
    return result;
  },
});
