import { Meteor } from "meteor/meteor";
import { TypingCollection } from "/imports/collections/typing";

Meteor.startup(() => {
  Meteor.setInterval(async () => {
    const staleTime = new Date(Date.now() - 5000);
    await TypingCollection.removeAsync({ updatedAt: { $lt: staleTime } });
  }, 3000);
});
