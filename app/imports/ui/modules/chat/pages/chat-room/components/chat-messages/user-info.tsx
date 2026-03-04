import React from "react";
import { useGetUser } from "/imports/ui/shared/hooks/user/use-user";

interface IProps {
  isCurrentUser: boolean;
  currentUserName?: string;
  otherUserId: string;
}

const UserInfo: React.FC<IProps> = ({
  isCurrentUser,
  currentUserName = "You",
  otherUserId,
}) => {
  const { data, isLoading, error } = useGetUser(otherUserId || "");

  if (isLoading) {
    return (
      <span className="text-xs font-medium text-gray-400">Loading...</span>
    );
  }

  if (error) {
    return (
      <span className="text-xs font-medium text-red-400">Unknown</span>
    );
  }

  return (
    <span
      className={`text-xs font-semibold tracking-wide ${
        isCurrentUser ? "text-white/80" : "text-primary-600"
      }`}
    >
      {isCurrentUser ? currentUserName : data?.profile?.name || "Unknown User"}
    </span>
  );
};

export default UserInfo;
