import React, { useRef, useState } from "react";
import { AudioIcon, StopIcon } from "/imports/ui/shared/icons";

interface AudioInputProps {
  onRecordingComplete: (blob: Blob) => void;
}

const AudioInput: React.FC<AudioInputProps> = ({ onRecordingComplete }) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        onRecordingComplete(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
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
      title={isRecording ? "Stop Recording" : "Record Audio"}
    >
      {isRecording ? (
        <div className="relative flex items-center justify-center">
          <span className="absolute w-4 h-4 border-2 border-red-500 rounded-full animate-ping" />
          <StopIcon size={18} />
        </div>
      ) : (
        <AudioIcon size={18} />
      )}
    </button>
  );
};

export default AudioInput;
