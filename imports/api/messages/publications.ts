import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { MessageCollection } from "../../collections/message";

Meteor.publish("room.messages", function (roomId: string) {
  if (!this.userId) {
    return this.ready();
  }

  check(roomId, String);

  return MessageCollection.find(
    { roomId },
    {
      sort: { createdAt: 1 },
    },
  );
});
