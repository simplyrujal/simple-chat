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
    <div className="fixed top-4 right-4 z-100 animate-slide-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 w-72 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              {callType === "video" ? (
                <VideoIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              ) : (
                <AudioIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Incoming {callType} call
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {callerName}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onReject}
            className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
            </svg>
            Decline
          </button>
          <button
            onClick={onAccept}
            className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;
