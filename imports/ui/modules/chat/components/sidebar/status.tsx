import React from "react";
import { useGetUserStatus } from "/imports/ui/shared/hooks/user/use-user";

interface IProps {
  userId: string;
}

const Status: React.FC<IProps> = ({ userId }) => {
  const status = useGetUserStatus(userId);

  return (
    <span
      className={`absolute bottom-0 border border-white rounded-full w-2.5 h-2.5 ${
        status === "online"
          ? "bg-green-500"
          : status === "busy"
            ? "bg-red-500"
            : "bg-gray-500"
      }`}
    />
  );
};

export default Status;
