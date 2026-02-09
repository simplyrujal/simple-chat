import { LinksCollection } from "/imports/api/links";

/**
 * Central registry for debug collections
 */
const collections = {
  LinksCollection,
};

type Key = keyof typeof collections;

/**
 * Register a collection for debugging
 */
function registerCollection(key: Key): void {
  (window as any)[key] = collections[key];
}

export default registerCollection;
