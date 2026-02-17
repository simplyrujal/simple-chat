import React, { useCallback } from "react";
import useMediaRecording from "../hooks/use-media-recording";
import { StopIcon, VideoIcon } from "/imports/ui/shared/icons";

interface VideoInputProps {
  onRecordingComplete: (blob: Blob) => void;
}

const VideoInput: React.FC<VideoInputProps> = ({ onRecordingComplete }) => {
  const { startRecording, stopRecording, isRecording } = useMediaRecording({
    onRecordingComplete,
    mediaType: "video",
  });

  const handleClick = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`p-1.5 rounded transition-colors ${
        isRecording
          ? "text-red-500 bg-red-50 hover:bg-red-100"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
      title={isRecording ? "Stop Recording" : "Record Video"}
    >
      {isRecording ? (
        <div className="relative flex items-center justify-center">
          <span className="absolute w-4 h-4 border-2 border-red-500 rounded-full animate-ping" />
          <StopIcon size={18} />
        </div>
      ) : (
        <VideoIcon size={18} />
      )}
    </button>
  );
};

export default VideoInput;
