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

    const data = await MessageCollection.insertAsync({
      roomId,
      content: {
        type: "text",
        text: content,
      },
      createdAt: new Date(),
      from: this.userId,
      to,
      deleted: false,
    });
    return data;
  },
});
