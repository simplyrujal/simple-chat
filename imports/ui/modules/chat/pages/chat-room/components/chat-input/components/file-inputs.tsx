import React, { memo } from "react";
import AttachmentInput from "./attachment-input";
import AudioInput from "./audio-input";
import ImageInput from "./image-input";
import VideoInput from "./video-input";

const FileInputs: React.FC = memo(() => {
  return (
    <div className="flex items-center gap-1 mt-2 pt-2">
      <ImageInput />
      <VideoInput />
      <AudioInput />
      <AttachmentInput />
    </div>
  );
});

FileInputs.displayName = "FileInputs";

export default FileInputs;
