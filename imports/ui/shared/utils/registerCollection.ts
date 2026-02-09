import { UsersCollection } from "/imports/api/users";

/**
 * Central registry for debug collections
 */
const collections = {
  UsersCollection,
};

type Key = keyof typeof collections;

/**
 * Register a collection for debugging
 */
function registerCollection(key: Key): void {
  (window as any)[key] = collections[key];
}

export default registerCollection;
