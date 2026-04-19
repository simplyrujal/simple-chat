import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { MessageCollection } from "../../collections/message";
import { RoomCollection } from "../../collections/room";

Meteor.methods({
  async "room.get"(roomId: `${string}-${string}`) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "You must be logged in to view rooms.",
      );
    }
    check(roomId, String);

    const data = await RoomCollection.findOneAsync({ roomId: roomId });

    return data;
  },

  async "room.messages"(roomId: string) {
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
