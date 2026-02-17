import { MessageCollection } from "/imports/collections/message";
import { MediaCollection } from "/imports/collections/media";
import { RoomCollection } from "/imports/collections/room";
import { RoomMemberCollection } from "/imports/collections/room-member";
import { UsersCollection } from "/imports/collections/user";

/**
 * Central registry for debug collections
 */
const collections = {
  UsersCollection,
  RoomCollection,
  MessageCollection,
  RoomMemberCollection,
  MediaCollection,
};

type Key = keyof typeof collections;

/**
 * Register a collection for debugging
 */
function registerCollection(key: Key): void {
  (window as any)[key] = collections[key];
}

export default registerCollection;
