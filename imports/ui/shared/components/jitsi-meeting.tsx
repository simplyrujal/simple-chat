import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useCallback, useState } from "react";

interface JitsiMeetingProps {
  roomName: string;
  userName: string;
  onLeave?: () => void;
  callType?: "audio" | "video";
}

const JitsiMeetingComponent: React.FC<JitsiMeetingProps> = ({
  roomName,
  userName,
  onLeave,
  callType = "video",
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
    <div className="fixed inset-0 z-[60] bg-gray-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white z-[70]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4 mx-auto"></div>
            <p>Connecting to meeting...</p>
            <p className="text-sm text-gray-400 mt-2">Joining room: {roomName}</p>
          </div>
        </div>
      )}
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={roomName}
        userInfo={{
          displayName: userName,
          email: `${userName}@example.com`,
        }}
        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: callType === "audio",
          prejoinPageEnabled: false,
          audioOnly: callType === "audio",
          disableVideoSettings: callType === "audio",
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
            ...(callType === "video" ? ["camera"] : []),
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
        className="absolute top-4 right-4 z-[80] px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg"
      >
        Leave Meeting
      </button>
    </div>
  );
};

export default JitsiMeetingComponent;
