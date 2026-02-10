import { Meteor } from "meteor/meteor";
import { UsersCollection } from "../../collections/user";

Meteor.publish("user.list", function () {
  if (!this.userId) {
    return this.ready();
  }

  return UsersCollection.find({});
});

Meteor.publish("user.info", function (userId: string) {
  if (!this.userId) {
    return this.ready();
  }

  return UsersCollection.find({ _id: userId });
});
