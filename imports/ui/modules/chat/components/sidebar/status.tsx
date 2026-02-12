import React from "react";
import { useGetUserStatus } from "/imports/ui/shared/hooks/user/use-user";

interface IProps {
  userId: string;
}

const Status: React.FC<IProps> = ({ userId }) => {
  const status = useGetUserStatus(userId);

  return (
    <span
      className={`absolute bottom-0 right-0 border-2 border-white rounded-full w-3 h-3 ${
        status === "online"
          ? "bg-green-500"
          : status === "busy"
            ? "bg-red-500"
            : "bg-gray-400"
      }`}
    />
  );
};

export default Status;
