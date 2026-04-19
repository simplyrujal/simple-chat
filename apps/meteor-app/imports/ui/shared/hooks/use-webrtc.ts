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
  isScreenSharing: boolean;
  isConnecting: boolean;
  error: string | null;
  toggleAudio: () => void;
  toggleVideo: () => void;
  startScreenShare: () => Promise<void>;
  stopScreenShare: () => void;
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
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
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
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    cameraStreamRef.current = null;
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
          console.log("📥 Received WebRTC offer (renegotiation)", signal.offer.type);
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
          console.log("📤 Sent WebRTC answer for renegotiation");
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
        cameraStreamRef.current = stream;
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
          console.log("🎥 Remote track received:", event.track.kind, "streams:", event.streams.length);
          
          // Get the stream from the event, fallback to remoteMediaStream
          const incomingStream = event.streams[0] || remoteMediaStream;
          
          // Add all tracks from the incoming stream
          incomingStream.getTracks().forEach((track) => {
            const existingTrack = remoteMediaStream.getTracks().find(t => t.kind === track.kind);
            if (existingTrack) {
              // Replace existing track of the same kind
              remoteMediaStream.removeTrack(existingTrack);
            }
            remoteMediaStream.addTrack(track);
          });
          
          // Update state with a new stream reference to trigger re-render
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

  const startScreenShare = useCallback(async () => {
    const pc = pcRef.current;
    if (!pc) return;

    try {
      console.log("🖥️ Starting screen share...");
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const screenTrack = screenStream.getVideoTracks()[0];
      screenStreamRef.current = screenStream;

      const sender = pc.getSenders().find((s) => s.track?.kind === "video");

      if (sender) {
        console.log("🔄 Replacing video track with screen share...");
        await sender.replaceTrack(screenTrack);
        
        // Renegotiate to ensure remote peer receives the new track
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        console.log("📤 Sending renegotiation offer for screen share");
        sendWebRTCOffer(targetUserId, offer, callId);
      }

      setLocalStream(screenStream);
      setIsScreenSharing(true);

      screenTrack.onended = async () => {
        stopScreenShare();
      };
    } catch (err: any) {
      if (err.name !== "AbortError" && err.name !== "NotAllowedError") {
        console.error("Screen share error:", err);
      }
    }
  }, [targetUserId, callId, sendWebRTCOffer]);

  const stopScreenShare = useCallback(async () => {
    const pc = pcRef.current;
    if (!pc) return;

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }

    if (cameraStreamRef.current) {
      const cameraTrack = cameraStreamRef.current.getVideoTracks()[0];
      const sender = pc.getSenders().find((s) => s.track?.kind === "video");

      if (sender && cameraTrack) {
        await sender.replaceTrack(cameraTrack);
        
        // Renegotiate to ensure remote peer receives the camera track
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        sendWebRTCOffer(targetUserId, offer, callId);
      }

      setLocalStream(cameraStreamRef.current);
    }

    setIsScreenSharing(false);
  }, [targetUserId, callId, sendWebRTCOffer]);

  const hangup = useCallback(() => {
    cleanup();
    onHangup?.();
  }, [cleanup, onHangup]);

  return {
    localStream,
    remoteStream,
    isAudioMuted,
    isVideoMuted,
    isScreenSharing,
    isConnecting,
    error,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    hangup,
  };
}
