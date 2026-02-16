import React, { useRef } from "react";
import { ImageIcon } from "/imports/ui/shared/icons";

const ImageInput: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <button
      type="button"
      // onClick={() => triggerFileInput(ref)}
      className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
      title="Send Image"
    >
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        // onChange={(e) => handleFileSelect(e, "image")}
      />
      <ImageIcon size={18} />
    </button>
  );
};

export default ImageInput;
