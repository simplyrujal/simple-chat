import { Button } from "flowbite-react";
import React from "react";
import { AudioIcon, CloseIcon, VideoIcon } from "/imports/ui/shared/icons";

interface CallInfo {
  callId: string;
  callerId: string;
  calleeId: string;
  callType: "audio" | "video";
  status: "calling" | "ringing" | "connected" | "ended";
  startTime?: Date;
}

interface CallModalProps {
  isOpen: boolean;
  callInfo: CallInfo | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isIncoming: boolean;
  callerName?: string;
  onAccept: () => void;
  onReject: () => void;
  onEndCall: () => void;
}

const CallModal: React.FC<CallModalProps> = ({
  isOpen,
  callInfo,
  localStream,
  remoteStream,
  isIncoming,
  callerName = "Unknown User",
  onAccept,
  onReject,
  onEndCall,
}) => {
  const localVideoRef = React.useRef<HTMLVideoElement>(null);
  const remoteVideoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  React.useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  if (!isOpen || !callInfo) return null;

  const isVideo = callInfo.callType === "video";
  const isConnected = callInfo.status === "connected";
  const isRinging =
    callInfo.status === "calling" || callInfo.status === "ringing";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-900 rounded-lg overflow-hidden w-full max-w-2xl shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-800 border-b border-gray-700">
          <h3 className="text-lg font-medium text-white">
            {isIncoming
              ? `Incoming ${isVideo ? "Video" : "Audio"} Call`
              : isConnected
                ? "Call in Progress"
                : `${isVideo ? "Video" : "Audio"} Calling...`}
          </h3>
        </div>

        {/* Body */}
        <div className="relative h-96 bg-gray-800">
          {/* Remote Video (full screen) */}
          {isConnected && remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
                  {isVideo ? (
                    <VideoIcon className="w-12 h-12 text-gray-400" />
                  ) : (
                    <AudioIcon className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <p className="text-white text-lg font-medium">{callerName}</p>
                <p className="text-gray-400 mt-2">
                  {isIncoming
                    ? isRinging
                      ? "is calling you..."
                      : "Call ended"
                    : isRinging
                      ? "Calling..."
                      : "Call ended"}
                </p>
              </div>
            </div>
          )}

          {/* Local Video (picture-in-picture) */}
          {isConnected && localStream && isVideo && (
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 border-gray-600">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Calling animation */}
          {isRinging && !isIncoming && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100" />
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-800 border-t border-gray-700">
          <div className="flex justify-center gap-4">
            {isIncoming && isRinging ? (
              <>
                <Button
                  color="failure"
                  onClick={onReject}
                  className="rounded-full w-14 h-14 p-0 flex items-center justify-center"
                >
                  <CloseIcon className="w-6 h-6" />
                </Button>
                <Button
                  color="success"
                  onClick={onAccept}
                  className="rounded-full w-14 h-14 p-0 flex items-center justify-center"
                >
                  {isVideo ? (
                    <VideoIcon className="w-6 h-6" />
                  ) : (
                    <AudioIcon className="w-6 h-6" />
                  )}
                </Button>
              </>
            ) : isConnected ? (
              <Button
                color="failure"
                onClick={onEndCall}
                className="rounded-full w-14 h-14 p-0 flex items-center justify-center"
              >
                <CloseIcon className="w-6 h-6" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
