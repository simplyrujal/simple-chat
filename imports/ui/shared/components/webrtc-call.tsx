import React from "react";
import { useWebRTC } from "../hooks/use-webrtc";
import MeetingControls from "./meeting-controls";
import VideoTrack from "./video-track";

interface WebRTCCallProps {
    targetUserId: string;
    callId: string;
    callType: "audio" | "video";
    isCaller: boolean;
    callerName: string;
    userName: string;
    onLeave: () => void;
    isMinimized?: boolean;
    onToggleMinimize?: () => void;
}

const WebRTCCall: React.FC<WebRTCCallProps> = ({
    targetUserId,
    callId,
    callType,
    isCaller,
    callerName,
    userName,
    onLeave,
    isMinimized = false,
    onToggleMinimize,
}) => {
    const {
        localStream,
        remoteStream,
        isAudioMuted,
        isVideoMuted,
        isConnecting,
        error,
        toggleAudio,
        toggleVideo,
        hangup,
    } = useWebRTC({
        targetUserId,
        callId,
        callType,
        isCaller,
        onHangup: onLeave,
    });

    if (error) {
        return (
            <div className="fixed bottom-4 right-4 z-[100] w-80 bg-gray-800 rounded-xl shadow-2xl border border-red-500/30 text-white p-4">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-red-500 text-2xl">⚠️</span>
                    <h3 className="font-semibold">Connection Issue</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">{error}</p>
                <button
                    onClick={onLeave}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all text-sm"
                >
                    Close
                </button>
            </div>
        );
    }

    if (isMinimized) {
        return (
            <div className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 bg-gray-900 rounded-full shadow-2xl border border-white/10 px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">
                    {callType === "video" ? "🎥" : "🎙"} {callerName}
                </span>
                <button
                    onClick={onToggleMinimize}
                    className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
                    title="Maximize"
                >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                </button>
                <button
                    onClick={hangup}
                    className="p-1.5 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                    title="End call"
                >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                    </svg>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] bg-[#0a0a0c] text-white flex flex-col font-sans md:relative md:inset-auto md:z-30 md:rounded-xl md:m-2 md:shadow-2xl md:border md:border-white/10 md:overflow-hidden">
            {isConnecting && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white z-[70]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4 mx-auto" />
                        <p className="text-lg font-medium">
                            {isCaller ? "Calling…" : "Connecting…"}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Setting up your {callType} call
                        </p>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between p-3 md:p-4 z-10 bg-gray-900/50">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <h1 className="text-sm md:text-base font-semibold tracking-tight">
                        {callerName}
                        <span className="text-gray-500 font-normal ml-2 text-xs md:text-sm">
                            {callType === "video" ? "Video Call" : "Audio Call"}
                        </span>
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onToggleMinimize}
                        className="p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Minimize"
                    >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                    </button>
                    <button
                        onClick={hangup}
                        className="p-1.5 md:p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        title="End call"
                    >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex-1 relative p-2 md:p-3 overflow-hidden">
                <div className="w-full h-full min-h-[200px] md:min-h-[300px]">
                    <VideoTrack
                        stream={remoteStream}
                        isLocal={false}
                        participantName={callerName}
                        isAudioOnly={callType === "audio"}
                    />
                </div>

                <div className="absolute bottom-3 right-3 w-24 h-20 md:w-36 md:h-28 rounded-lg overflow-hidden shadow-lg border border-white/20 z-10 transition-all hover:scale-105 hover:border-white/40">
                    <VideoTrack
                        stream={localStream}
                        isLocal={true}
                        participantName={userName}
                        isAudioOnly={callType === "audio" || isVideoMuted}
                        muted={true}
                    />
                </div>
            </div>

            <div className="p-3 md:p-4 flex justify-center z-10">
                <MeetingControls
                    isAudioMuted={isAudioMuted}
                    isVideoMuted={isVideoMuted}
                    isAudioOnly={callType === "audio"}
                    onToggleAudio={toggleAudio}
                    onToggleVideo={toggleVideo}
                    onHangup={hangup}
                />
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>
        </div>
    );
};

export default WebRTCCall;
