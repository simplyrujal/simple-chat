import { useQuery } from "@tanstack/react-query";
import { Meteor } from "meteor/meteor";
import { User } from "/imports/api/users";

type TUsers = {
  users: User[];
  total: number;
};

interface IParams {
  searchString?: string;
  limit?: number;
  skip?: number;
}

const useUserList = (params?: IParams) => {
  return useQuery<TUsers>({
    queryKey: ["users.list", params],
    queryFn: () => Meteor.callAsync("users.list", params),
  });
};

export default useUserList;
