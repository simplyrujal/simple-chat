import React, { useCallback, useEffect, useRef, useState } from "react";
import { loadJitsiScript } from "../utils/jitsi-globals";
import MeetingControls from "./meeting-controls";
import VideoTrack from "./video-track";

/**
 * Jitsi domain configuration.
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
  const [localTracks, setLocalTracks] = useState<any[]>([]);
  const [remoteTracks, setRemoteTracks] = useState<{ [id: string]: any[] }>({});
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(callType === "audio");

  const conferenceRef = useRef<any>(null);
  const connectionRef = useRef<any>(null);

  const cleanup = useCallback(() => {
    try {
      if (conferenceRef.current) {
        conferenceRef.current.leave();
        conferenceRef.current = null;
      }
      if (connectionRef.current) {
        connectionRef.current.disconnect();
        connectionRef.current = null;
      }
    } catch (e) {
      // Ignore cleanup errors
    }
    localTracks.forEach(track => {
      try { track.dispose(); } catch (e) { /* ignore */ }
    });
    setLocalTracks([]);
    setRemoteTracks({});
  }, [localTracks]);

  useEffect(() => {
    let isMounted = true;

    const initJitsi = async () => {
      try {
        // Load lib-jitsi-meet from the Jitsi server CDN (latest, compatible version)
        await loadJitsiScript();

        const JitsiMeetJS = (window as any).JitsiMeetJS;
        if (!JitsiMeetJS) {
          throw new Error("JitsiMeetJS not available after script load");
        }

        JitsiMeetJS.init({
          disableAudioLevels: true,
          disableThirdPartyRequests: true,
        });

        const normalizedRoomName = roomName.toLowerCase();
        const options = {
          hosts: {
            domain: JITSI_DOMAIN,
            muc: `conference.${JITSI_DOMAIN}`,
            focus: `focus.${JITSI_DOMAIN}`,
          },
          serviceUrl: `wss://${JITSI_DOMAIN}/xmpp-websocket?room=${normalizedRoomName}`,
          websocket: `wss://${JITSI_DOMAIN}/xmpp-websocket?room=${normalizedRoomName}`,
          bosh: `https://${JITSI_DOMAIN}/http-bind?room=${normalizedRoomName}`,
          clientNode: "http://jitsi.org/jitsimeet",
        };

        const connection = new JitsiMeetJS.JitsiConnection(null, null, options);
        connectionRef.current = connection;

        connection.addEventListener(
          JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
          () => {
            if (!isMounted) return;
            console.log("✅ Connection Established");
            const conference = connection.initJitsiConference(normalizedRoomName, {
              p2p: { enabled: true },
            });
            conferenceRef.current = conference;

            conference.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
              if (!isMounted) return;
              console.log("🟢 Joined conference");
              setIsLoading(false);

              JitsiMeetJS.createLocalTracks({
                devices: callType === "video" ? ["audio", "video"] : ["audio"],
              })
                .then((tracks: any[]) => {
                  if (!isMounted) {
                    tracks.forEach(t => t.dispose());
                    return;
                  }
                  setLocalTracks(tracks);
                  tracks.forEach(track => conference.addTrack(track));
                })
                .catch((err: any) => {
                  console.error("Failed to create local tracks", err);
                  // Still allow joining without local media
                  setIsLoading(false);
                });
            });

            conference.on(JitsiMeetJS.events.conference.TRACK_ADDED, (track: any) => {
              if (track.isLocal()) return;
              const participantId = track.getParticipantId();
              setRemoteTracks(prev => ({
                ...prev,
                [participantId]: [...(prev[participantId] || []), track],
              }));
            });

            conference.on(JitsiMeetJS.events.conference.TRACK_REMOVED, (track: any) => {
              const participantId = track.getParticipantId();
              setRemoteTracks(prev => ({
                ...prev,
                [participantId]: (prev[participantId] || []).filter(t => t !== track),
              }));
            });

            conference.on(JitsiMeetJS.events.conference.CONFERENCE_ERROR, (err: any) => {
              console.error("Conference error:", err);
              setError(`Conference error: ${err}`);
              setIsLoading(false);
            });

            conference.join();
          }
        );

        connection.addEventListener(
          JitsiMeetJS.events.connection.CONNECTION_FAILED,
          (err: any) => {
            if (!isMounted) return;
            console.error("Connection failed:", err);
            setError("Connection Failed. Please check your network.");
            setIsLoading(false);
          }
        );

        connection.addEventListener(
          JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
          () => {
            console.log("🔴 Disconnected");
          }
        );

        connection.connect();
      } catch (e: any) {
        console.error("Jitsi Init Error", e);
        setError(e?.message || "Failed to initialize call");
        setIsLoading(false);
      }
    };

    initJitsi();

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [roomName, callType]);

  const handleToggleAudio = useCallback(() => {
    const audioTrack = localTracks.find(t => t.getType() === "audio");
    if (audioTrack) {
      if (isAudioMuted) audioTrack.unmute();
      else audioTrack.mute();
      setIsAudioMuted(!isAudioMuted);
    }
  }, [localTracks, isAudioMuted]);

  const handleToggleVideo = useCallback(() => {
    const videoTrack = localTracks.find(t => t.getType() === "video");
    if (videoTrack) {
      if (isVideoMuted) videoTrack.unmute();
      else videoTrack.mute();
      setIsVideoMuted(!isVideoMuted);
    }
  }, [localTracks, isVideoMuted]);

  const handleHangup = useCallback(() => {
    cleanup();
    onLeave?.();
  }, [cleanup, onLeave]);

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

  const allParticipants = [
    { id: "local", tracks: localTracks, name: userName, isLocal: true },
    ...Object.entries(remoteTracks).map(([id, tracks]) => ({
      id,
      tracks,
      name: `Participant ${id.slice(0, 4)}`,
      isLocal: false,
    })),
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-[#0a0a0c] text-white flex flex-col font-sans">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white z-[70]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4 mx-auto" />
            <p className="text-lg font-medium">Setting up your {callType} call…</p>
            <p className="text-sm text-gray-500 mt-2">Connecting to secure server...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <h1 className="text-lg font-semibold tracking-tight">
            {roomName} <span className="text-gray-500 font-normal ml-2">Secure Call</span>
          </h1>
        </div>
        <div className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-sm font-medium">
          {allParticipants.length} Participant{allParticipants.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 p-6 flex items-center justify-center overflow-hidden">
        <div className={`grid gap-6 w-full h-full max-w-7xl mx-auto ${allParticipants.length === 1 ? "grid-cols-1" :
            allParticipants.length === 2 ? "grid-cols-1 md:grid-cols-2" :
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}>
          {allParticipants.map((participant) => {
            const videoTrack = participant.tracks.find(t => t.getType() === "video");
            const audioTrack = participant.tracks.find(t => t.getType() === "audio");

            return (
              <div key={participant.id} className="relative aspect-video">
                <VideoTrack
                  track={videoTrack || audioTrack}
                  isLocal={participant.isLocal}
                  participantName={participant.name}
                  isAudioOnly={callType === "audio" || !videoTrack}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls Overlay */}
      <div className="p-8 flex justify-center z-10">
        <MeetingControls
          isAudioMuted={isAudioMuted}
          isVideoMuted={isVideoMuted}
          isAudioOnly={callType === "audio"}
          onToggleAudio={handleToggleAudio}
          onToggleVideo={handleToggleVideo}
          onHangup={handleHangup}
        />
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

export default JitsiMeetingComponent;
