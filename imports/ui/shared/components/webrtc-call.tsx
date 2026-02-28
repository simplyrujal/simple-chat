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
}

const WebRTCCall: React.FC<WebRTCCallProps> = ({
    targetUserId,
    callId,
    callType,
    isCaller,
    callerName,
    userName,
    onLeave,
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
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/95 text-white p-6">
                <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full text-center border border-red-500/30">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold mb-4">Connection Issue</h2>
                    <p className="text-gray-300 mb-6">{error}</p>
                    <button
                        onClick={onLeave}
                        className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] bg-[#0a0a0c] text-white flex flex-col font-sans">
            {/* Connecting overlay */}
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

            {/* Header */}
            <div className="flex items-center justify-between p-6 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <h1 className="text-lg font-semibold tracking-tight">
                        {callerName}{" "}
                        <span className="text-gray-500 font-normal ml-2">
                            {callType === "video" ? "Video Call" : "Audio Call"}
                        </span>
                    </h1>
                </div>
                <div className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-sm font-medium">
                    {callType === "video" ? "🎥" : "🎙"} {callType}
                </div>
            </div>

            {/* Main video area — remote takes up most of the screen */}
            <div className="flex-1 relative p-4 overflow-hidden">
                {/* Remote stream fills the main area */}
                <div className="w-full h-full">
                    <VideoTrack
                        stream={remoteStream}
                        isLocal={false}
                        participantName={callerName}
                        isAudioOnly={callType === "audio"}
                    />
                </div>

                {/* Local stream — picture-in-picture bottom right */}
                <div className="absolute bottom-8 right-8 w-48 h-36 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 z-10 transition-all hover:scale-105 hover:border-white/40">
                    <VideoTrack
                        stream={localStream}
                        isLocal={true}
                        participantName={userName}
                        isAudioOnly={callType === "audio" || isVideoMuted}
                        muted={true}
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="p-8 flex justify-center z-10">
                <MeetingControls
                    isAudioMuted={isAudioMuted}
                    isVideoMuted={isVideoMuted}
                    isAudioOnly={callType === "audio"}
                    onToggleAudio={toggleAudio}
                    onToggleVideo={toggleVideo}
                    onHangup={hangup}
                />
            </div>

            {/* Background ambient glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>
        </div>
    );
};

export default WebRTCCall;
