import React, { useRef } from "react";
import { AudioIcon } from "/imports/ui/shared/icons";

const AudioInput: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <button
      type="button"
      //   onClick={() => triggerFileInput(audioInputRef)}
      className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
      title="Send Audio"
    >
      <input
        ref={ref}
        type="file"
        accept="audio/*"
        className="hidden"
        // onChange={(e) => handleFileSelect(e, "audio")}
      />
      <AudioIcon size={18} />
    </button>
  );
};

export default AudioInput;
