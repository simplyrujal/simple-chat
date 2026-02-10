import { useQuery } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

export const useMessages = (roomId: string | undefined) => {
  // Keeping the subscription for potential background cache updates
  const handle = useTracker(() => {
    if (roomId) {
      return Meteor.subscribe("messages.list", roomId);
    }
    return null;
  }, [roomId]);

  return useQuery({
    queryKey: ["messages", roomId, handle?.ready()],
    queryFn: () => Meteor.callAsync("get.messages", roomId),
    enabled: !!roomId && handle?.ready(),
  });
};
