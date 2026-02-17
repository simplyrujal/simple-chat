import React from "react";

interface VideoMessageProps {
  fileUrl?: string;
}

export const VideoMessage: React.FC<VideoMessageProps> = ({ fileUrl }) => {
  if (!fileUrl) {
    return <p className="text-sm opacity-75">Video</p>;
  }

  return (
    <video
      src={fileUrl}
      controls
      className="max-w-full h-auto rounded-lg max-h-64"
    >
      Your browser does not support the video tag.
    </video>
  );
};
