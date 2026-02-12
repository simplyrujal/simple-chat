import React from "react";
import { useGetUserStatus } from "/imports/ui/shared/hooks/user/use-user";

const LastSeen: React.FC<{ userId: string; lastSeenAt: Date }> = ({
  userId,
  lastSeenAt,
}) => {
  const status = useGetUserStatus(userId);
  const isActive = status === "online";

  return (
    <span
      className={`text-xs truncate ${
        isActive ? "text-white/70 font-medium" : "text-gray-400"
      }`}
    >
      {isActive
        ? "Active now"
        : "Last seen " +
          (lastSeenAt ? new Date(lastSeenAt).toLocaleDateString() : "recently")}
    </span>
  );
};

export default LastSeen;
