import React from "react";

interface AudioMessageProps {
  fileUrl?: string;
  fileMimeType?: string;
}

export const AudioMessage: React.FC<AudioMessageProps> = ({ fileUrl, fileMimeType }) => {
  if (!fileUrl) {
    return <p className="text-sm opacity-75">Audio</p>;
  }

  const src = fileUrl.startsWith("http") ? fileUrl : `${window.location.origin}${fileUrl}`;
  const mimeType = (fileMimeType || "audio/webm").split(";")[0];

  return (
    <audio
      src={src}
      controls
      preload="metadata"
      style={{ width: "250px", minHeight: "54px", display: "block" }}
    >
      <source src={src} type={mimeType} />
    </audio>
  );
};
