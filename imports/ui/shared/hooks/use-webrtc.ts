import { useCallback, useEffect, useRef, useState } from "react";
import {
  WebRTCSignal,
  useSignalingContext,
} from "../contexts/signaling-context";

const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    // { urls: "stun:stun.l.google.com:19302" },
    // { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:192.168.1.77:3478" },
    {
      urls: "turn:192.168.1.77:3478",
      username: "testuser",
      credential: "testpass",
    },
  ],
  iceCandidatePoolSize: 10,
};

interface UseWebRTCOptions {
  targetUserId: string;
  callId: string;
  callType: "audio" | "video";
  isCaller: boolean;
  onHangup?: () => void;
}

interface UseWebRTCReturn {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  isConnecting: boolean;
  error: string | null;
  toggleAudio: () => void;
  toggleVideo: () => void;
  hangup: () => void;
}

export function useWebRTC({
  targetUserId,
  callId,
  callType,
  isCaller,
  onHangup,
}: UseWebRTCOptions): UseWebRTCReturn {
  const {
    sendWebRTCOffer,
    sendWebRTCAnswer,
    sendICECandidate,
    onWebRTCSignal,
  } = useSignalingContext();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  // Buffer ICE candidates received before remote description is set
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const remoteDescSetRef = useRef(false);

  // Cleanup helper
  const cleanup = useCallback(() => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    setLocalStream(null);
    setRemoteStream(null);
    onWebRTCSignal(null);
  }, [onWebRTCSignal]);

  // Handle incoming WebRTC signals from signaling server
  const handleSignal = useCallback(
    async (signal: WebRTCSignal) => {
      const pc = pcRef.current;
      if (!pc) return;

      try {
        if (signal.type === "webrtc-offer" && signal.offer) {
          console.log("📥 Received WebRTC offer");
          await pc.setRemoteDescription(
            new RTCSessionDescription(signal.offer),
          );
          remoteDescSetRef.current = true;
          // Flush buffered ICE candidates
          for (const candidate of pendingCandidatesRef.current) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          }
          pendingCandidatesRef.current = [];
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          sendWebRTCAnswer(targetUserId, answer, callId);
        } else if (signal.type === "webrtc-answer" && signal.answer) {
          console.log("📥 Received WebRTC answer");
          await pc.setRemoteDescription(
            new RTCSessionDescription(signal.answer),
          );
          remoteDescSetRef.current = true;
          // Flush buffered ICE candidates
          for (const candidate of pendingCandidatesRef.current) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          }
          pendingCandidatesRef.current = [];
        } else if (signal.type === "webrtc-ice-candidate" && signal.candidate) {
          if (remoteDescSetRef.current) {
            await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
          } else {
            // Buffer until remote description is set
            pendingCandidatesRef.current.push(signal.candidate);
          }
        }
      } catch (err) {
        console.error("❌ WebRTC signal handling error:", err);
      }
    },
    [targetUserId, callId, sendWebRTCAnswer],
  );

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        // 1. Get user media
        const stream = await navigator.mediaDevices.getUserMedia({
          video: callType === "video",
          audio: true,
        });

        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        localStreamRef.current = stream;
        setLocalStream(stream);

        // 2. Create peer connection
        const pc = new RTCPeerConnection(ICE_SERVERS);
        pcRef.current = pc;

        // 3. Add local tracks to the connection
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        // 4. Handle remote tracks
        const remoteMediaStream = new MediaStream();
        setRemoteStream(remoteMediaStream);

        pc.ontrack = (event) => {
          console.log("🎥 Remote track received:", event.track.kind);
          event.streams[0]?.getTracks().forEach((track) => {
            remoteMediaStream.addTrack(track);
          });
          setRemoteStream(new MediaStream(remoteMediaStream.getTracks()));
          setIsConnecting(false);
        };

        // 5. ICE candidate handler
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            sendICECandidate(targetUserId, event.candidate.toJSON(), callId);
          }
        };

        // 6. Connection state monitoring
        pc.onconnectionstatechange = () => {
          console.log("🔗 Connection state:", pc.connectionState);
          if (pc.connectionState === "connected") {
            setIsConnecting(false);
          } else if (
            pc.connectionState === "failed" ||
            pc.connectionState === "disconnected"
          ) {
            setError("Connection lost. Please try again.");
            setIsConnecting(false);
          }
        };

        // 7. Register signal handler with context
        onWebRTCSignal(handleSignal);

        // 8. If we are the caller, create and send offer
        if (isCaller) {
          console.log("📤 Creating and sending offer as caller");
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          sendWebRTCOffer(targetUserId, offer, callId);
        }
      } catch (err: any) {
        console.error("❌ WebRTC init error:", err);
        if (!isMounted) return;
        if (
          err.name === "NotFoundError" ||
          err.name === "DevicesNotFoundError"
        ) {
          setError(
            "Camera or microphone not found. Please check your devices.",
          );
        } else if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          setError(
            "Camera/microphone permission denied. Please allow access and retry.",
          );
        } else {
          setError(err?.message || "Failed to initialize call.");
        }
        setIsConnecting(false);
      }
    };

    init();

    return () => {
      isMounted = false;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAudio = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsAudioMuted((prev) => !prev);
  }, []);

  const toggleVideo = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsVideoMuted((prev) => !prev);
  }, []);

  const hangup = useCallback(() => {
    cleanup();
    onHangup?.();
  }, [cleanup, onHangup]);

  return {
    localStream,
    remoteStream,
    isAudioMuted,
    isVideoMuted,
    isConnecting,
    error,
    toggleAudio,
    toggleVideo,
    hangup,
  };
}
