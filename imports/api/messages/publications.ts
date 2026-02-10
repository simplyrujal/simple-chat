import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { MessageCollection } from "../../collections/message";

type TQuery = {
  limit?: number;
  skip?: number;
  sort?: { [key: string]: 1 | -1 };
};

Meteor.publish("room.messages", function (roomId: string, query?: TQuery) {
  if (!this.userId) {
    return this.ready();
  }

  console.log(
    "Publishing messages for room:",
    roomId,
    "by user:",
    this.userId,
    "query:",
    query,
  );

  try {
    check(roomId, String);
    if (query) {
      check(query, Object);
    }

    return MessageCollection.find({ roomId }, {});
  } catch (error) {
    console.error("Error in room.messages publication:", error);
  }
});

Meteor.publish("all.messages", function () {
  if (!this.userId) {
    return this.ready();
  }

  return MessageCollection.find();
});
