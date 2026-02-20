import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { MessageCollection } from "../../collections/message";
import { RoomCollection } from "../../collections/room";
import { RoomMemberCollection } from "../../collections/room-member";

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

  async "room.members"(roomId: string) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "You must be logged in to view room members.",
      );
    }
    check(roomId, String);

    // First get the room to find its MongoDB _id
    const room = await RoomCollection.findOneAsync({ roomId: roomId });
    if (!room) {
      throw new Meteor.Error("room-not-found", "Room not found");
    }

    // Get members for this room
    const members = await RoomMemberCollection.find({
      roomId: room._id,
    }).fetch();

    return members;
  },
});
