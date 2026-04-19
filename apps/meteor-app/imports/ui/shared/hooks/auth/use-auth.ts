import { useQuery } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";

type TCheckAuth = {
  isAuthenticated: boolean;
  userId: string | null;
  user: {
    _id: string;
    username: string | undefined;
    emails: Meteor.UserEmail[] | undefined;
    profile: Meteor.UserProfile | undefined;
    avatarUrl?: string;
    status?: string;
  } | null;
};

export const useAuth = () => {
  const { data, isLoading } = useQuery<TCheckAuth>({
    queryKey: ["auth.check"],
    queryFn: () => Meteor.callAsync("auth.check"),
  });

  return {
    isLoading,
    isAuthenticated: data?.isAuthenticated,
    user: data?.user,
  };
};
