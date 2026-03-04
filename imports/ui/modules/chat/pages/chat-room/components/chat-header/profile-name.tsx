import React from "react";
import { useGetUser } from "/imports/ui/shared/hooks/user/use-user";

interface IProps {
  otherUser: string;
}

const ProfileName: React.FC<IProps> = ({ otherUser }) => {
  const { data, isLoading, error } = useGetUser(otherUser || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <h5 className="font-bold mb-0 text-gray-900">
      {data?.profile?.name || "Chat Room"}
    </h5>
  );
};

export default ProfileName;
