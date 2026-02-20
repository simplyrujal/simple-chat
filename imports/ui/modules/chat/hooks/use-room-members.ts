import { useQuery } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";

interface RoomMember {
  _id: string;
  roomId: string;
  userId: string;
  role: string;
  muted: boolean;
  joinedAt: Date;
  lastReadAt?: Date;
}

export const useRoomMembers = (roomId: string | undefined) => {
  return useQuery<RoomMember[]>({
    queryKey: ["roomMembers", roomId],
    queryFn: () => Meteor.callAsync("room.members", roomId),
    enabled: !!roomId,
  });
};
