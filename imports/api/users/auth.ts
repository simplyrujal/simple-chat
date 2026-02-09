import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

type Role = "admin" | "user";
type Status = "online" | "offline" | "busy" | "away";

export interface User extends Meteor.User {
  name: string;
  avatarUrl?: string;
  role: Role[];
  status: Status;
  lastSeenAt: Date;
}

export const UsersCollection =
  Meteor.users as unknown as Mongo.Collection<User>;

Meteor.methods({
  /**
   * Register a new user
   */
  async "user.register"({
    email,
    password,
    username,
    name,
  }: {
    email: string;
    password: string;
    username: string;
    name: string;
  }) {
    check(email, String);
    check(password, String);
    check(username, String);
    check(name, String);

    // Check if user already exists
    const existingUser = await Accounts.findUserByEmail(email);
    if (existingUser) {
      throw new Meteor.Error(
        "user-exists",
        "User with this email already exists",
      );
    }

    const existingUsername = await Accounts.findUserByUsername(username);
    if (existingUsername) {
      throw new Meteor.Error("username-exists", "Username already taken");
    }

    // Create the user
    const userId = Accounts.createUser({
      email,
      password,
      username,
      profile: {
        name,
      },
    });

    return { userId, success: true };
  },

  /**
   * Check if the current user is authenticated
   */
  async "auth.check"() {
    const userId = Meteor.userId();
    const user = await Meteor.userAsync();

    return {
      isAuthenticated: !!userId,
      userId: userId || null,
      user: user
        ? {
            _id: user._id,
            username: user.username,
            emails: user.emails,
            profile: user.profile,
          }
        : null,
    };
  },

  /**
   * Logout the current user
   */
  async "user.logout"() {
    Meteor.logout();
    return { success: true };
  },
});
