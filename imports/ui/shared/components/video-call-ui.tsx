import React from "react";
import { CallState } from "../hooks/use-webrtc";
import { AudioIcon } from "/imports/ui/shared/icons/AudioIcon";
import { VideoIcon } from "/imports/ui/shared/icons/VideoIcon";
import { PhoneIcon } from "/imports/ui/shared/icons/PhoneIcon";
import { MicrophoneIcon } from "/imports/ui/shared/icons/MicrophoneIcon";
import { CloseIcon } from "/imports/ui/shared/icons/CloseIcon";

interface VideoCallUIProps {
  callState: CallState;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isMuted: boolean;
  isVideoOff: boolean;
  onAnswer: () => void;
  onReject: () => void;
  onEndCall: () => void;
  onToggleMute: () => void;
  onToggleVideo: () => void;
}

export const VideoCallUI: React.FC<VideoCallUIProps> = ({
  callState,
  localStream,
  remoteStream,
  isMuted,
  isVideoOff,
  onAnswer,
  onReject,
  onEndCall,
  onToggleMute,
  onToggleVideo,
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

  if (callState.status === "idle") {
    return null;
  }

  const isRinging = callState.status === "ringing";
  const isCalling = callState.status === "calling";
  const isConnected = callState.status === "connected";
  const isVideo = callState.callType === "video";

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex items-center justify-center">
      {isRinging && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl max-w-sm w-full mx-4">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
              {isVideo ? (
                <VideoIcon size={40} className="text-primary-600 dark:text-primary-400" />
              ) : (
                <AudioIcon size={40} className="text-primary-600 dark:text-primary-400" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Incoming {isVideo ? "Video" : "Audio"} Call
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {callState.remoteUserName || callState.remoteUserId} is calling you
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={onReject}
                className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
              >
                <PhoneIcon size={24} className="rotate-[135deg]" />
              </button>
              <button
                onClick={onAnswer}
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
              >
                <PhoneIcon size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      {(isCalling || isConnected) && (
        <div className="relative w-full h-full">
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
                <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <span className="text-4xl text-white font-semibold">
                    {callState.remoteUserName?.charAt(0).toUpperCase() || callState.remoteUserId?.charAt(0).toUpperCase() || "?"}
                  </span>
                </div>
                <p className="text-white text-lg">
                  {isCalling ? "Calling..." : "Connecting..."}
                </p>
                <p className="text-gray-400 mt-2">
                  {callState.remoteUserName || callState.remoteUserId}
                </p>
              </div>
            </div>
          )}

          <div className="absolute bottom-24 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden shadow-lg border-2 border-gray-700">
            {localStream && isVideo && !isVideoOff ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover mirror"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                <span className="text-white text-sm">Your camera is off</span>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-gray-800 bg-opacity-80 rounded-full px-6 py-3">
            <button
              onClick={onToggleMute}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isMuted ? "bg-red-500 hover:bg-red-600" : "bg-gray-600 hover:bg-gray-500"
              } text-white`}
            >
              <MicrophoneIcon size={20} />
            </button>

            {isVideo && (
              <button
                onClick={onToggleVideo}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  isVideoOff ? "bg-red-500 hover:bg-red-600" : "bg-gray-600 hover:bg-gray-500"
                } text-white`}
              >
                {isVideoOff ? <VideoIcon size={20} /> : <VideoIcon size={20} className="opacity-50" />}
              </button>
            )}

            <button
              onClick={onEndCall}
              className="w-14 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
            >
              <PhoneIcon size={24} className="rotate-[135deg]" />
            </button>
          </div>

          <button
            onClick={onEndCall}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-colors"
          >
            <CloseIcon size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
