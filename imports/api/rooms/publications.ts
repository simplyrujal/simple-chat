import { Meteor } from "meteor/meteor";
import { RoomCollection } from "../../collections/room";
import { RoomMemberCollection } from "../../collections/room-member";

Meteor.publish("room.list", function () {
  if (!this.userId) {
    return this.ready();
  }

  return RoomCollection.find();
});

Meteor.publish("roomMember.list", function () {
  if (!this.userId) {
    return this.ready();
  }

  return RoomMemberCollection.find();
});
