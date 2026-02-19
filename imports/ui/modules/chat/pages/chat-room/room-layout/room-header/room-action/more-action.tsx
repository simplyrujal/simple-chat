import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import React from "react";
import { MoreIcon } from "/imports/ui/shared/icons";

const MoreAction: React.FC = () => {
  return (
    <Dropdown
      label=""
      renderTrigger={() => (
        <button
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title="More options"
        >
          <MoreIcon className="w-5 h-5" />
        </button>
      )}
      placement="bottom-end"
    >
      <DropdownItem>View Profile</DropdownItem>
      <DropdownItem>Search in conversation</DropdownItem>
      <DropdownItem>Notifications</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Block user</DropdownItem>
      <DropdownItem className="text-danger-600 hover:bg-danger-50">
        Report
      </DropdownItem>
    </Dropdown>
  );
};

export default MoreAction;
