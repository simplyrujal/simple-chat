import React from "react";
import { useFormContext } from "react-hook-form";
import { IFormValues } from "..";

const MediaOutput: React.FC = () => {
  const { watch, reset } = useFormContext<IFormValues>();
  const media = watch("media");
  const mediaType = watch("mediaType");
  const mediaUrl = media ? URL.createObjectURL(media) : null;

  const handleMediaClear = () => {
    reset({
      message: "",
      media: null,
      mediaType: "text",
    });
  };

  if (media && mediaType && mediaUrl) {
    return (
      <div className="mb-2 p-2 border rounded bg-gray-50">
        {mediaType === "video" ? (
          <video src={mediaUrl} controls className="max-h-48 w-full rounded" />
        ) : mediaType === "image" ? (
          <img
            src={mediaUrl}
            alt="Preview"
            className="max-h-48 w-full rounded object-cover"
          />
        ) : (
          <audio src={mediaUrl} controls className="w-full" />
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
  }
  return null;
};

export default MediaOutput;
