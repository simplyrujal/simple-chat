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
  } | null;
};

export const useIsAuth = () => {
  const { data, isLoading } = useQuery<TCheckAuth>({
    queryKey: ["auth.check"],
    queryFn: () => Meteor.callAsync("auth.check"),
  });

  console.log({ data });

  return { isLoading, isAuthenticated: data?.isAuthenticated };
};
