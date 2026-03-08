import React, { useEffect, useRef } from 'react';

interface VideoTrackProps {
    stream: MediaStream | null;
    isLocal?: boolean;
    participantName?: string;
    isAudioOnly?: boolean;
    muted?: boolean;
    hideLabels?: boolean;
}

const VideoTrack: React.FC<VideoTrackProps> = ({
    stream,
    isLocal = false,
    participantName = 'Participant',
    isAudioOnly = false,
    muted = false,
    hideLabels = false,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const hasVideo = stream && stream.getVideoTracks().length > 0 && !isAudioOnly;

    return (
        <div className="relative w-full h-full bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 group transition-all duration-300 hover:border-blue-500/50">
            {/* Video element — always rendered; hidden if audio-only so audio still plays */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={isLocal || muted}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isLocal ? 'scale-x-[-1]' : ''} ${hasVideo ? 'opacity-100' : 'opacity-0 absolute'}`}
            />

            {/* Avatar overlay when no video */}
            {!hasVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800">
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl ring-4 ring-white/10">
                        {participantName.charAt(0).toUpperCase()}
                    </div>
                </div>
            )}

            {/* Name label */}
            {!hideLabels && (
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-semibold shadow-lg border border-white/10">
                        {participantName} {isLocal ? '(You)' : ''}
                    </div>
                </div>
            )}

            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>
    );
};

export default VideoTrack;
