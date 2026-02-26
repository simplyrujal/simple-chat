import React, { useCallback, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";

interface JitsiMeetingProps {
  roomName: string;
  userName: string;
  onLeave?: () => void;
}

const JitsiMeetingComponent: React.FC<JitsiMeetingProps> = ({
  roomName,
  userName,
  onLeave,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleApiReady = useCallback((api: any) => {
    setIsLoading(false);
    api.addEventListener("videoConferenceJoined", () => {
      console.log("User joined the meeting");
    });
    api.addEventListener("videoConferenceLeft", () => {
      console.log("User left the meeting");
      onLeave?.();
    });
  }, [onLeave]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
            <p>Connecting to meeting...</p>
          </div>
        </div>
      )}
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={roomName}
        userInfo={{
          displayName: userName,
          email: userName,
        }}
        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: true,
          prejoinPageEnabled: false,
          audioOnly: true,
          disableVideoSettings: true,
          disableDeepLinking: true,
          enableLobby: false,
          lobbyModeEnabled: false,
          p2p: {
            enabled: true,
          },
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_MEETINGS: false,
          DEFAULT_BACKGROUND: "#1a1a1a",
          TOOLBAR_BUTTONS: [
            "microphone",
            "hangup",
            "chat",
            "participants",
            "tileview",
          ],
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100vh";
          iframeRef.style.width = "100vw";
        }}
        onApiReady={handleApiReady}
      />
      <button
        onClick={onLeave}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
      >
        Leave Meeting
      </button>
    </div>
  );
};

export default JitsiMeetingComponent;
