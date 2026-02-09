import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  async "room.create"({
    name,
    description,
    type,
    userId,
  }: {
    name: string;
    description: string;
    type: string;
    userId: string;
  }) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    check(name, String);
    check(description, String);
    check(type, String);
    check(userId, String);
  },
});
