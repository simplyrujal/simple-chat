import React, { memo } from "react";
import { useGetUserStatus } from "/imports/ui/shared/hooks/user/use-user";

interface IProps {
  userId: string;
}

const Status: React.FC<IProps> = ({ userId }) => {
  const status = useGetUserStatus(userId)

  return (
    <span
      className={`position-absolute bottom-0 end-0 border border-white rounded-circle ${status === 'online' ? 'bg-success' : status === "busy" ? "bg-danger" : 'bg-secondary'}`}
      style={{ width: '10px', height: '10px' }}
    />
  );
};

export default memo(Status);
