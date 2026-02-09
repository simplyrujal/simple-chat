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
    country,
  }: {
    email: string;
    password: string;
    username: string;
    country: string;
  }) {
    check(email, String);
    check(password, String);
    check(username, String);
    check(country, String);

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
        name: username, // Use username as display name initially
        country,
      },
    });

    // Add default chat-related data
    await UsersCollection.updateAsync(
      { _id: userId },
      {
        $set: {
          name: username,
          role: ["user"] as Role[],
          status: "online" as Status,
          lastSeenAt: new Date(),
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=3b82f6&color=fff&size=128`,
          createdAt: new Date(),
          profile: {
            name: username,
            country,
          },
        },
      },
    );

    return { userId, success: true };
  },

  async "user.login"({ email, password }: { email: string; password: string }) {
    check(email, String);
    check(password, String);

    // 1️⃣ Find user
    const user = await Accounts.findUserByEmail(email);
    if (!user) {
      throw new Meteor.Error("user-not-found", "User not found");
    }

    // 2️⃣ Check password
    const result = await Accounts._checkPasswordAsync(user, password);
    if (result.error) {
      throw new Meteor.Error("invalid-password", "Invalid password");
    }

    // 3️⃣ CREATE LOGIN TOKEN (THIS IS LOGIN)
    const stampedToken = Accounts._generateStampedLoginToken();
    Accounts._insertHashedLoginToken(user._id, {
      hashedToken: Accounts._hashLoginToken(stampedToken.token),
      when: stampedToken.when,
    });

    // 4️⃣ Return token to client
    return {
      userId: user._id,
      token: stampedToken.token,
      tokenExpires: stampedToken.when,
      success: true,
    };
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
});
