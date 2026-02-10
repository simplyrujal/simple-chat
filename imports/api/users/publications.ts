import { Meteor } from "meteor/meteor";
import { UsersCollection } from "../../collections/user";

Meteor.publish("user.list", function () {
  if (!this.userId) {
    return this.ready();
  }

  return UsersCollection.find({});
});

Meteor.publish("user.self", function () {
  if (!this.userId) {
    return this.ready();
  }

  return UsersCollection.find(this.userId);
});
