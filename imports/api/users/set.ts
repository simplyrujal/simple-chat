import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Status, UsersCollection } from "/imports/collections/user";

Meteor.methods({
  async "user.setStatus"({
    userId,
    status,
  }: {
    userId: string;
    status: Status;
  }) {
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "You must be logged in to set your status.",
      );
    }

    check(userId, String);
    check(status, String);

    await UsersCollection.updateAsync(
      { _id: userId },
      {
        $set: {
          status,
          lastSeenAt: new Date(),
        },
      },
    );

    return { success: true };
  },
});
