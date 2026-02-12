import React from "react";
import { useGetUser } from "/imports/ui/shared/hooks/user/use-user";

interface IProps {
  isCurrentUser: boolean;
  currentUserName: string;
  otherUserId: string;
}

const UserInfo: React.FC<IProps> = ({
  isCurrentUser,
  currentUserName,
  otherUserId,
}) => {
  const { data, isLoading, error } = useGetUser(otherUserId || "");
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <span
      className={`font-semibold text-xs ${
        isCurrentUser ? "text-white/80" : "text-primary-600"
      }`}
    >
      {isCurrentUser ? currentUserName : data?.profile?.name}
    </span>
  );
};

export default UserInfo;
