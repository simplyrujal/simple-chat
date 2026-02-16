import React from "react";
import AttachmentInput from "./components/attachment-input";
import AudioInput from "./components/audio-input";
import ImageInput from "./components/image-input";
import VideoInput from "./components/video-input";

const FileInputs: React.FC = () => {
  return (
    <div className="flex items-center gap-1 mt-2 pt-2">
      <ImageInput />
      <VideoInput />
      <AudioInput />
      <AttachmentInput />
    </div>
  );
};

export default FileInputs;
