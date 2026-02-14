import React from "react";
import { useGetUserStatus } from "/imports/ui/shared/hooks/user/use-user";

const LastSeen: React.FC<{ userId: string; lastSeenAt: Date; isActive?: boolean }> = ({
  userId,
  lastSeenAt,
  isActive: propIsActive,
}) => {
  const status = useGetUserStatus(userId);
  const isActiveStatus = status === "online";
  const isActive = propIsActive ?? isActiveStatus;

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
