import { Button } from "flowbite-react";
import React, { Fragment } from "react";
import { AudioIcon } from "/imports/ui/shared/icons";

const AudioAction: React.FC = () => {
  const onClick = () => {
    // TODO: Implement audio call functionality
  };

  return (
    <Fragment>
      {" "}
      <Button
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        title="Audio Call"
        onClick={onClick}
      >
        <AudioIcon className="w-4 h-4" />
      </Button>{" "}
      <Button
        color="gray"
        size="sm"
        className="hidden sm:flex"
        onClick={onClick}
      >
        <AudioIcon className="w-4 h-4" />
        <span className="ml-2">Audio</span>
      </Button>
    </Fragment>
  );
};

export default AudioAction;
