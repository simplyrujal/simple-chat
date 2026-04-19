import React, { useState } from "react";

interface ImageMessageProps {
  fileUrl?: string;
  fileName?: string;
}

export const ImageMessage: React.FC<ImageMessageProps> = ({ fileUrl, fileName }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!fileUrl) {
    return <p className="text-sm opacity-75">Image</p>;
  }

  return (
    <>
      <div className="relative">
        <img
          src={fileUrl}
          alt={fileName || "Image"}
          className="max-w-full h-auto rounded-lg cursor-zoom-in max-h-64 object-cover"
          onClick={() => setIsZoomed(true)}
        />
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={fileUrl}
            alt={fileName || "Zoomed Image"}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
            onClick={() => setIsZoomed(false)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};
