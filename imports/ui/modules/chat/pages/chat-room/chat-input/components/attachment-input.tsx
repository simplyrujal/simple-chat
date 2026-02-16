import React, { useRef } from "react";
import { AttachmentIcon } from "/imports/ui/shared/icons";

const AttachmentInput: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <button
      type="button"
      //   onClick={() => triggerFileInput(fileInputRef)}
      className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
      title="Send File"
    >
      <input
        ref={ref}
        type="file"
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
        className="hidden"
        // onChange={(e) => handleFileSelect(e, "file")}
      />
      <AttachmentIcon size={18} />
    </button>
  );
};

export default AttachmentInput;
