import React from "react";
import { AudioIcon, VideoIcon } from "/imports/ui/shared/icons";

interface IncomingCallModalProps {
  isOpen: boolean;
  callerName: string;
  callType: "audio" | "video";
  onAccept: () => void;
  onReject: () => void;
}

const IncomingCallModal: React.FC<IncomingCallModalProps> = ({
  isOpen,
  callerName,
  callType,
  onAccept,
  onReject,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
          {callType === "video" ? (
            <VideoIcon className="h-8 w-8 text-primary-600" />
          ) : (
            <AudioIcon className="h-8 w-8 text-primary-600" />
          )}
        </div>
        <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
          Incoming {callType} call
        </h3>
        <p className="text-gray-500 mb-6">{callerName}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onReject}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;
