import React from "react";
import { TMessageType } from "/imports/collections/message";

interface IProps {
  mediaType: TMessageType;
  media: Blob;
  handleMediaClear: () => void;
}

const MediaOutput: React.FC<IProps> = ({
  mediaType,
  media,
  handleMediaClear,
}) => {
  return (
    <div className="mb-2 p-2 border rounded bg-gray-50">
      {mediaType === "video" ? (
        <video
          src={URL.createObjectURL(media)}
          controls
          className="max-h-48 w-full rounded"
        />
      ) : (
        <audio src={URL.createObjectURL(media)} controls className="w-full" />
      )}
      <button
        type="button"
        onClick={handleMediaClear}
        className="mt-1 text-sm text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default MediaOutput;
