import React, { useRef } from "react";
import { VideoIcon } from "/imports/ui/shared/icons";

const VideoInput: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <button
      type="button"
      //   onClick={() => triggerFileInput(videoInputRef)}
      className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
      title="Send Video"
    >
      <input
        ref={ref}
        type="file"
        accept="video/*"
        className="hidden"
        // onChange={(e) => handleFileSelect(e, "video")}
      />
      <VideoIcon size={18} />
    </button>
  );
};

export default VideoInput;
