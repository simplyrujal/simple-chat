import { useQuery } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";

export const useMessages = (roomId: string | undefined) => {
  return useQuery({
    queryKey: ["room.messages", roomId],
    queryFn: () => Meteor.callAsync("room.messages", roomId),
    enabled: !!roomId,
  });
};
