import { useMutation } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

type LoginData = {
  email: string;
  password: string;
};

const useLogin = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: LoginData) =>
      new Promise((resolve, reject) => {
        Meteor.loginWithPassword(data.email, data.password, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      }),
  });

  const login = async (data: LoginData) => {
    try {
      await mutateAsync(data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return { login, isLoading: isPending, error };
};

export default useLogin;
