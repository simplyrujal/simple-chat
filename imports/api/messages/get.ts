import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { MessageCollection } from "/imports/collections/message";

Meteor.methods({
  async "get.messages"(roomId: string) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "You must be logged in to view messages.",
      );
    }
    check(roomId, String);

    const data = MessageCollection.find(
      { roomId },
      { sort: { createdAt: 1 } },
    ).fetch();

    return data;
  },
});
