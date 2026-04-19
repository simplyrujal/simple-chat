import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { TypingCollection } from "../../collections/typing";

Meteor.publish("typing", function (roomId: string) {
  if (!this.userId) {
    return this.ready();
  }

  check(roomId, String);

  return TypingCollection.find({
    roomId,
    userId: { $ne: this.userId },
  });
});
