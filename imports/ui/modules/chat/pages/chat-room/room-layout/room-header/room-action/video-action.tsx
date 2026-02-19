import { Button } from "flowbite-react";
import React, { Fragment } from "react";
import { VideoIcon } from "/imports/ui/shared/icons";

const VideoAction: React.FC = () => {
  const onClick = () => {
    // TODO: Implement video call functionality
  };
  return (
    <Fragment>
      <Button
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        title="Video Call"
        onClick={onClick}
      >
        <VideoIcon className="w-4 h-4" />
      </Button>
      <Button
        color="gray"
        size="sm"
        className="hidden sm:flex"
        onClick={onClick}
      >
        <VideoIcon className="w-4 h-4" />
        <span className="ml-2">Video</span>
      </Button>
    </Fragment>
  );
};

export default VideoAction;
