import React from "react";

interface FileMessageProps {
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
}

export const FileMessage: React.FC<FileMessageProps> = ({ fileUrl, fileName, fileSize }) => {
  if (!fileUrl) {
    return <p className="text-sm opacity-75">File</p>;
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    return `(${Math.round(bytes / 1024)} KB)`;
  };

  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm hover:underline"
    >
      <span className="font-medium">{fileName || "File"}</span>
      {fileSize && <span className="text-xs opacity-75">{formatFileSize(fileSize)}</span>}
    </a>
  );
};
