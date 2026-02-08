import { Mongo } from "meteor/mongo";

type Role = "admin" | "user";
type Status = "online" | "offline" | "busy" | "away";

export interface User {
  _id?: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatarUrl?: string;
  role: Role[];
  status: Status;
  lastSeenAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const UsersCollection = new Mongo.Collection<User>("users");
