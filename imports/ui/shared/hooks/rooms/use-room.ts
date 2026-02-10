import { useMutation, useQuery } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";

export const useRoom = (roomId: string | undefined) => {
  return useQuery({
    queryKey: ["room", roomId],
    queryFn: () => Meteor.callAsync("room.get", roomId),
    enabled: !!roomId,
  });
};

export const useCreateDirectRoom = () => {
  return useMutation({
    mutationFn: (ids: [string, string]) => {
      return Meteor.callAsync("room.create.direct", { ids });
    },
  });
};
