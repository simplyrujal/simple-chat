import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export type Role = "admin" | "user";
export type Status = "online" | "offline" | "busy" | "away";

export interface User extends Meteor.User {
  fname: string;
  lname: string;
  username: string;
  avatarUrl?: string;
  role: Role[];
  status: Status;
  lastSeenAt: Date;
  profile: {
    name: string;
    country: string;
    fname: string;
    lname: string;
  };
}

export const UsersCollection =
  Meteor.users as unknown as Mongo.Collection<User>;
