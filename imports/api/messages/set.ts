import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { MessageCollection } from "/imports/collections/message";

Meteor.methods({
  async "set.message"({
    from,
    to,
    content,
    roomId,
  }: {
    from: string;
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

    const data = MessageCollection.insertAsync({
      roomId,
      content: {
        type: "text",
        text: content,
      },
      createdAt: new Date(),
      from,
      to,
      deleted: false,
    });

    return data;
  },
});
