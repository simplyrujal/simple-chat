import { useMutation } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { MessageCollection } from "/imports/collections/message";

type TQuery = {
  limit?: number;
  skip?: number;
  sort?: { [key: string]: 1 | -1 };
};

export const useSubscribeMessages = (roomId: string, query?: TQuery) => {
  // Keeping the subscription for potential background cache updates
  const res = useTracker(() => {
    if (roomId) {
      Meteor.subscribe("room.messages", roomId);
      return MessageCollection.find(
        { roomId },
        // {
        //   ...(query || {}),
        //   sort: { createdAt: 1 },
        // },
      ).fetch();
    }
  }, [roomId]);

  return res;
};

export const useSendMessage = () =>
  useMutation({
    mutationFn: (data: { to: string; content: string; roomId: string }) =>
      Meteor.callAsync("set.message", data),
  });
