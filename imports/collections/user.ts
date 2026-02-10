import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export type Role = "admin" | "user";
export type Status = "online" | "offline" | "busy" | "away";

export interface User extends Meteor.User {
  username: string;
  avatarUrl?: string;

  roles: Role[]; // ["admin", "user"]

  profile: {
    name: string;
    fname: string;
    lname: string;
    country?: string;
  };

  status: Status;
  lastSeenAt: Date;
  createdAt: Date;
}

export const UsersCollection =
  Meteor.users as unknown as Mongo.Collection<User>;
