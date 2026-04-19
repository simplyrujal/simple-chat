import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { MessageCollection } from "/imports/collections/message";
import { RoomCollection } from "/imports/collections/room";

Meteor.methods({
  async "get.lastMessage"(roomId: string) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "You must be logged in to view messages.",
      );
    }
    check(roomId, String);

    // Some places use the room._id (mongo ID) and others use the calculated roomId field (sorted IDs string).
    // We need to support both to ensure we can always find the last message.
    const room = await RoomCollection.findOneAsync({
      $or: [{ _id: roomId }, { roomId: roomId }],
    });

    if (!room) {
      // If room doesn't exist yet, there are no messages
      return null;
    }

    const messages = await MessageCollection.find(
      { roomId: room._id },
      { sort: { createdAt: -1 }, limit: 1 },
    ).fetchAsync();

    return messages[0] || null;
  },
});
