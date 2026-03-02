import React from 'react';
import { AudioIcon, ScreenShareIcon, StopIcon, VideoIcon } from "/imports/ui/shared/icons";

interface MeetingControlsProps {
    isAudioMuted: boolean;
    isVideoMuted: boolean;
    isAudioOnly?: boolean;
    isScreenSharing?: boolean;
    onToggleAudio: () => void;
    onToggleVideo: () => void;
    onToggleScreenShare: () => void;
    onHangup: () => void;
}

const MeetingControls: React.FC<MeetingControlsProps> = ({
    isAudioMuted,
    isVideoMuted,
    isAudioOnly = false,
    isScreenSharing = false,
    onToggleAudio,
    onToggleVideo,
    onToggleScreenShare,
    onHangup,
}) => {
    return (
        <div className="flex items-center gap-6 p-4 px-8 bg-gray-900/80 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
            <button
                onClick={onToggleAudio}
                className={`p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg ${isAudioMuted
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                    }`}
                title={isAudioMuted ? 'Unmute' : 'Mute'}
            >
                <AudioIcon className={`w-6 h-6 ${isAudioMuted ? 'opacity-100' : 'opacity-80'}`} />
            </button>

            {!isAudioOnly && (
                <button
                    onClick={onToggleVideo}
                    className={`p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg ${isVideoMuted
                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                        }`}
                    title={isVideoMuted ? 'Start Camera' : 'Stop Camera'}
                >
                    <VideoIcon className={`w-6 h-6 ${isVideoMuted ? 'opacity-100' : 'opacity-80'}`} />
                </button>
            )}

            {!isAudioOnly && (
                <button
                    onClick={onToggleScreenShare}
                    className={`p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg ${isScreenSharing
                        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                        }`}
                    title={isScreenSharing ? 'Stop Screen Share' : 'Share Screen'}
                >
                    <ScreenShareIcon className={`w-6 h-6 ${isScreenSharing ? 'opacity-100' : 'opacity-80'}`} />
                </button>
            )}

            <div className="w-px h-8 bg-white/10 mx-2" />

            <button
                onClick={onHangup}
                className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 shadow-red-600/30 group"
                title="End Call"
            >
                <StopIcon className="w-6 h-6 rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </button>
        </div>
    );
};

export default MeetingControls;
