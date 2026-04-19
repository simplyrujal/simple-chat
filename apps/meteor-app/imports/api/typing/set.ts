import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { TypingCollection } from "../../collections/typing";

Meteor.methods({
  async "typing.start"(data: { roomId: string }) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized", "You must be logged in.");
    }

    check(data.roomId, String);

    await TypingCollection.upsertAsync(
      { userId: this.userId, roomId: data.roomId },
      {
        $set: {
          userId: this.userId,
          roomId: data.roomId,
          updatedAt: new Date(),
        },
      },
    );
  },

  async "typing.stop"(data: { roomId: string }) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized", "You must be logged in.");
    }

    check(data.roomId, String);

    await TypingCollection.removeAsync({
      userId: this.userId,
      roomId: data.roomId,
    });
  },
});
