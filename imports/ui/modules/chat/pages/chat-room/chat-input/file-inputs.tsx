import React from "react";
import { useChatInput } from "../context/chat-input-provider";
import AttachmentInput from "./components/attachment-input";
import AudioInput from "./components/audio-input";
import ImageInput from "./components/image-input";
import VideoInput from "./components/video-input";

interface FileInputsProps {
  setMedia: (media: Blob | null) => void;
}

const FileInputs: React.FC<FileInputsProps> = ({ setMedia }) => {
  const { setMediaType } = useChatInput();

  const handleVideoRecording = (blob: Blob) => {
    setMedia(blob);
    setMediaType("video");
  };

  const handleAudioRecording = (blob: Blob) => {
    setMedia(blob);
    setMediaType("audio");
  };

  return (
    <div className="flex items-center gap-1 mt-2 pt-2">
      <ImageInput />
      <VideoInput onRecordingComplete={handleVideoRecording} />
      <AudioInput onRecordingComplete={handleAudioRecording} />
      <AttachmentInput />
    </div>
  );
};

export default FileInputs;
