import { useQueryClient } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      // 1. Update status on server first
      await Meteor.callAsync("user.logout");

      // 2. Clear client session
      Meteor.logout();

      // 3. Clear cache and redirect
      queryClient.clear();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { logout };
};

export default useLogout;
