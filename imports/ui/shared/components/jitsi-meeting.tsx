import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useCallback, useEffect, useState } from "react";

/**
 * Jitsi domain configuration.
 * 
 * meet.jit.si requires authentication (moderator login) since Aug 2023.
 * Use one of these community servers that allow anonymous room creation:
 *   - "meet.ffmuc.net"      (Freifunk München, Germany)
 *   - "jitsi.debian.social"  (Debian project)
 *   - "meet.calyx.net"       (Calyx Institute, USA)
 * 
 * Or self-host Jitsi for full control.
 */
const JITSI_DOMAIN = "meet.ffmuc.net";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !window.isSecureContext &&
      window.location.hostname !== "localhost"
    ) {
      setError(
        "Camera/mic access requires HTTPS or localhost. Try opening the app via http://localhost:3000 instead."
      );
    }
  }, []);

  const handleApiReady = useCallback(
    (api: any) => {
      setIsLoading(false);
      console.log(`✅ Jitsi API ready — joined room "${roomName}" on ${JITSI_DOMAIN}`);

      api.addEventListener("videoConferenceJoined", () => {
        console.log("🟢 User joined the meeting");
      });

      api.addEventListener("videoConferenceLeft", () => {
        console.log("🔴 User left the meeting");
        onLeave?.();
      });

      api.addEventListener("readyToClose", () => {
        onLeave?.();
      });
    },
    [onLeave, roomName]
  );

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
    <div className="fixed inset-0 z-[60] bg-gray-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white z-[70]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4 mx-auto" />
            <p className="text-lg font-medium">
              Setting up your {callType} call…
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Connecting via {JITSI_DOMAIN}
            </p>
          </div>
        </div>
      )}

      <JitsiMeeting
        domain={JITSI_DOMAIN}
        roomName={roomName}
        userInfo={{
          displayName: userName,
          email: "",
        }}
        configOverwrite={{
          // ── General ──
          prejoinPageEnabled: false,
          startWithAudioMuted: false,
          startWithVideoMuted: callType === "audio",
          disableDeepLinking: true,
          requireDisplayName: false,
          enableInsecureRoomNameWarning: false,
          doNotStoreRoom: true,
          disableInviteFunctions: true,

          // ── Lobby / Auth — disable everything ──
          enableLobby: false,
          lobbyModeEnabled: false,
          hideLobbyButton: true,

          // ── P2P (great for 1-on-1) ──
          p2p: { enabled: true },

          // ── Audio-only optimisation ──
          ...(callType === "audio"
            ? {
              audioOnly: true,
              disableVideoSettings: true,
            }
            : {}),

          // ── Analytics / telemetry — silence the Amplitude errors ──
          analytics: {
            disabled: true,
            rtcstatsEnabled: false,
          },
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_MEETINGS: false,
          DEFAULT_BACKGROUND: "#111827",
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          TOOLBAR_BUTTONS: [
            "microphone",
            ...(callType === "video" ? ["camera"] : []),
            "hangup",
            "chat",
            "tileview",
            "settings",
          ],
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100vh";
          iframeRef.style.width = "100vw";
          iframeRef.style.border = "none";
        }}
        onApiReady={handleApiReady}
      />

      <button
        onClick={onLeave}
        className="absolute top-4 right-4 z-[80] px-6 py-2.5 bg-red-600/90 hover:bg-red-600 text-white rounded-full font-semibold transition-all shadow-xl backdrop-blur-sm"
      >
        End Call
      </button>
    </div>
  );
};

export default JitsiMeetingComponent;
