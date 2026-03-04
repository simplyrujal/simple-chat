import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { RoomCollection } from "/imports/collections/room";
import { RoomMemberCollection } from "/imports/collections/room-member";

Meteor.methods({
  async "room.create.direct"({ ids }: { ids: [string, string] }) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    check(ids, [String]);

    const sortedIds = ids.sort().join("-");

    const checkRoom = await RoomCollection.findOneAsync({
      roomId: sortedIds,
    });

    if (checkRoom) {
      return checkRoom.roomId;
    }

    // insertAsync returns the _id (mongoId) of the new document
    const roomId = await RoomCollection.insertAsync({
      roomId: sortedIds,
      name: sortedIds,
      type: "direct",
      createdAt: new Date(),
      description: "",
      createdBy: this.userId,
    });

    for (const id of ids) {
      await RoomMemberCollection.insertAsync({
        roomId: roomId,
        userId: id,
        role: id === this.userId ? "admin" : "user",
        muted: false,
        joinedAt: new Date(),
      });
    }

    return sortedIds;
  },

  async "room.create.channel"({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    check(name, String);
    check(description, String);

    const businessRoomId = Random.id();

    // insertAsync returns the _id (mongoId) of the new document
    const mongoId = await RoomCollection.insertAsync({
      roomId: businessRoomId,
      name,
      description,
      type: "channel",
      createdAt: new Date(),
      createdBy: this.userId,
    });

    await RoomMemberCollection.insertAsync({
      roomId: businessRoomId,
      userId: this.userId,
      role: "admin",
      muted: false,
      joinedAt: new Date(),
    });

    return mongoId;
  },

  async "room.channel.addUsers"({
    roomId,
    userIds,
  }: {
    roomId: string;
    userIds: string[];
  }) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    check(roomId, String);
    check(userIds, [String]);

    const room = await RoomCollection.findOneAsync({
      roomId,
    });

    if (!room) {
      throw new Meteor.Error("room-not-found");
    }

    for (const id of userIds) {
      await RoomMemberCollection.insertAsync({
        roomId: room._id,
        userId: id,
        role: "user",
        muted: false,
        joinedAt: new Date(),
      });
    }

    return room;
  },
});
