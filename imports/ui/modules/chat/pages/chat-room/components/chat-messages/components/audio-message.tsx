import React from "react";

interface AudioMessageProps {
  fileUrl?: string;
}

export const AudioMessage: React.FC<AudioMessageProps> = ({ fileUrl }) => {
  if (!fileUrl) {
    return <p className="text-sm opacity-75">Audio</p>;
  }

  return (
    <audio src={fileUrl} controls className="w-[310px]">
      Your browser does not support the audio tag.
    </audio>
  );
};
