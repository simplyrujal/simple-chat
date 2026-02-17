import React, { useRef, useState } from "react";
import { VideoIcon } from "/imports/ui/shared/icons";

interface VideoInputProps {
  onRecordingComplete: (blob: Blob) => void;
}

const VideoInput: React.FC<VideoInputProps> = ({ onRecordingComplete }) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        onRecordingComplete(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

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
      <VideoIcon size={18} />
    </button>
  );
};

export default VideoInput;
