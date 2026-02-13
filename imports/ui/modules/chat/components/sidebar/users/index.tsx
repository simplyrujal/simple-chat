import { ListGroup } from "flowbite-react";
import React from "react";
import UserItem from "./user-item";
import { User } from "/imports/collections/user";

interface UsersProps {
  users: User[];
  handleCloseMobile: () => void;
  isCollapsed: boolean;
}

const Users: React.FC<UsersProps> = ({
  users,
  handleCloseMobile,
  isCollapsed,
}) => {
  return (
    <ListGroup className="flex-1">
      {users.length > 0 ? (
        users.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            onCloseMobile={handleCloseMobile}
            isCollapsed={isCollapsed}
          />
        ))
      ) : (
        <div className="p-4 text-center text-gray-500 text-sm">
          No users found
        </div>
      )}
    </ListGroup>
  );
};

export default Users;
