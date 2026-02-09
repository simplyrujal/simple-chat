import { check } from "meteor/check";
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

Meteor.methods({
  async "users.list"({
    searchString = "",
    limit = 10,
    skip = 0,
  }: {
    searchString?: string;
    limit?: number;
    skip?: number;
  }) {
    // ✅ 1. Allow only logged-in users
    if (!this.userId) {
      throw new Meteor.Error(
        "not-authorized",
        "You must be logged in to list users.",
      );
    }

    check(searchString, String);
    check(limit, Number);
    check(skip, Number);

    // ✅ 2. Base query: exclude current user
    const query: any = {
      _id: { $ne: this.userId },
    };

    // ✅ 3. Add search condition (if any)
    if (searchString.trim()) {
      const regex = { $regex: searchString, $options: "i" };

      query.$or = [
        { username: regex },
        { name: regex },
        { "emails.address": regex },
      ];
    }

    // ✅ 4. Query options
    const options: Mongo.Options<User> = {
      limit: Math.min(limit, 100),
      skip,
      sort: { username: 1 },
      projection: {
        username: 1,
        name: 1,
        status: 1,
        avatarUrl: 1,
        lastSeenAt: 1,
        role: 1,
        emails: 1,
        profile: 1,
      },
    };

    // ✅ 5. Fetch users
    const users = await UsersCollection.find(query, options).fetchAsync();

    // ✅ 6. Correct total count (same query!)
    const total = await UsersCollection.find(query).countAsync();

    return { users, total };
  },
});
