import { useQueryClient } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = async () => {
    await new Promise((resolve, reject) => {
      Meteor.logout((err) => {
        if (err) {
          console.error("Logout failed:", err);
          reject(err);
        } else {
          resolve(true);
        }
      });
    }).then(() => {
      queryClient.clear();
      navigate("/auth/login");
    });
  };

  return { logout };
};

export default useLogout;
