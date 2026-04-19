import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import React from "react";
import { MoreIcon } from "/imports/ui/shared/icons";

const MoreAction: React.FC = () => {
  return (
    <Dropdown
      label=""
      renderTrigger={() => (
        <button
          className="p-2 rounded-lg transition-colors hover:bg-gray-700/50"
          style={{ color: "#6272a4" }}
          title="More options"
        >
          <MoreIcon className="w-5 h-5" />
        </button>
      )}
      placement="bottom-end"
    >
      <DropdownItem className="text-gray-100 hover:bg-gray-700">View Profile</DropdownItem>
      <DropdownItem className="text-gray-100 hover:bg-gray-700">Search in conversation</DropdownItem>
      <DropdownItem className="text-gray-100 hover:bg-gray-700">Notifications</DropdownItem>
      <DropdownDivider className="bg-gray-700" />
      <DropdownItem className="text-gray-100 hover:bg-gray-700">Block user</DropdownItem>
      <DropdownItem className="text-danger-500 hover:bg-danger-500/10">
        Report
      </DropdownItem>
    </Dropdown>
  );
};

export default MoreAction;
