import { useMutation } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";

const useLogout = () => {
  const { mutateAsync: logout } = useMutation({
    mutationFn: () => Meteor.callAsync("user.logout"),
  });

  return { logout };
};

export default useLogout;
