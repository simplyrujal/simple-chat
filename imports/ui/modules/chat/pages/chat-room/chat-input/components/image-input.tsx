import React, { useRef, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { ImageIcon } from "/imports/ui/shared/icons";

const ImageInput: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { setValue } = useFormContext();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setValue("media", file);
        setValue("mediaType", "image");
      }
    },
    [setValue],
  );

  return (
    <button
      type="button"
      onClick={() => ref.current?.click()}
      className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
      title="Send Image"
    >
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <ImageIcon size={18} />
    </button>
  );
};

export default ImageInput;
