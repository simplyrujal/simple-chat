import React, { useEffect, useRef } from 'react';

interface VideoTrackProps {
    track: any;
    isLocal?: boolean;
    participantName?: string;
    isAudioOnly?: boolean;
}

const VideoTrack: React.FC<VideoTrackProps> = ({
    track,
    isLocal = false,
    participantName = 'Participant',
    isAudioOnly = false
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!track) return;

        if (track.getType() === 'video') {
            if (videoRef.current) {
                track.attach(videoRef.current);
            }
        } else if (track.getType() === 'audio') {
            if (audioRef.current) {
                track.attach(audioRef.current);
            }
        }

        return () => {
            if (track) {
                if (track.getType() === 'video' && videoRef.current) {
                    track.detach(videoRef.current);
                } else if (track.getType() === 'audio' && audioRef.current) {
                    track.detach(audioRef.current);
                }
            }
        };
    }, [track]);

    const isVideo = track?.getType() === 'video';

    return (
        <div className="relative w-full h-full bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 group transition-all duration-300 hover:border-blue-500/50">
            {isVideo ? (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted={isLocal}
                    className={`w-full h-full object-cover ${isLocal ? 'scale-x-[-1]' : ''}`}
                />
            ) : (
                <audio ref={audioRef} autoPlay playsInline muted={isLocal} />
            )}

            {(!isVideo || isAudioOnly) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold text-white shadow-inner">
                        {participantName.charAt(0).toUpperCase()}
                    </div>
                </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-semibold shadow-lg border border-white/10">
                    {participantName} {isLocal ? '(You)' : ''}
                </div>
            </div>

            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>
    );
};

export default VideoTrack;
