import { useCallback, useEffect, useRef, useState } from "react";
import { signalingService } from "../../services/webrtc-signaling";

interface CallInfo {
  callId: string;
  callerId: string;
  calleeId: string;
  callType: "audio" | "video";
  status: "calling" | "ringing" | "connected" | "ended";
  startTime?: Date;
}

interface UseWebRTCConnectionOptions {
  userId: string;
  onRemoteStream?: (stream: MediaStream) => void;
  onCallStarted?: (callInfo: CallInfo) => void;
  onCallEnded?: (callInfo: CallInfo) => void;
}

interface UseWebRTCConnectionReturn {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isInCall: boolean;
  callInfo: CallInfo | null;
  error: string | null;
  startCall: (
    targetUserId: string,
    callType: "audio" | "video",
  ) => Promise<void>;
  answerCall: (callInfo: CallInfo) => Promise<void>;
  endCall: () => void;
  toggleAudio: (enabled: boolean) => void;
  toggleVideo: (enabled: boolean) => void;
}

const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

export const useWebRTCConnection = (
  options: UseWebRTCConnectionOptions,
): UseWebRTCConnectionReturn => {
  const { userId, onRemoteStream, onCallStarted, onCallEnded } = options;

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [callInfo, setCallInfo] = useState<CallInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const currentCallRef = useRef<CallInfo | null>(null);
  const signalingUnsubscribeRef = useRef<(() => void) | null>(null);

  // Initialize local media stream
  const initializeLocalStream = useCallback(
    async (callType: "audio" | "video") => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: callType === "video",
        });
        setLocalStream(stream);
        return stream;
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setError(
          `Failed to access ${callType === "video" ? "camera" : "microphone"}`,
        );
        throw err;
      }
    },
    [],
  );

  // Create peer connection
  const createPeerConnection = useCallback(
    (stream: MediaStream) => {
      const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

      // Add local tracks to the connection
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      // Handle incoming remote tracks
      pc.ontrack = (event) => {
        const [remoteMediaStream] = event.streams;
        setRemoteStream(remoteMediaStream);
        onRemoteStream?.(remoteMediaStream);
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate && currentCallRef.current) {
          signalingService.sendSignal(
            currentCallRef.current.calleeId === userId
              ? currentCallRef.current.callerId
              : currentCallRef.current.calleeId,
            event.candidate.toJSON(),
          );
        }
      };

      // Handle connection state changes
      pc.onconnectionstatechange = () => {
        console.log("Connection state:", pc.connectionState);
        if (
          pc.connectionState === "disconnected" ||
          pc.connectionState === "failed"
        ) {
          endCall();
        }
      };

      peerConnectionRef.current = pc;
      return pc;
    },
    [userId, onRemoteStream],
  );

  // Handle signaling messages
  useEffect(() => {
    const unsubscribe = signalingService.onMessage(async (message) => {
      console.log("Received signaling message:", message);

      switch (message.type) {
        case "signal": {
          if (!peerConnectionRef.current || !message.signal) return;

          try {
            const signal = message.signal as
              | RTCSessionDescriptionInit
              | RTCIceCandidateInit;

            if ("sdp" in signal) {
              // It's a session description
              await peerConnectionRef.current.setRemoteDescription(
                new RTCSessionDescription(signal),
              );

              if (signal.type === "offer") {
                // Answer the offer
                const answer = await peerConnectionRef.current.createAnswer();
                await peerConnectionRef.current.setLocalDescription(answer);

                signalingService.sendSignal(message.from!, answer);
              }
            } else if ("candidate" in signal) {
              // It's an ICE candidate
              await peerConnectionRef.current.addIceCandidate(
                new RTCIceCandidate(signal),
              );
            }
          } catch (err) {
            console.error("Error handling signal:", err);
          }
          break;
        }

        case "call-request": {
          // Incoming call request
          const incomingCall: CallInfo = {
            callId: message.callId!,
            callerId: message.from!,
            calleeId: userId,
            callType: message.callType as "audio" | "video",
            status: "ringing",
          };
          currentCallRef.current = incomingCall;
          setCallInfo(incomingCall);
          onCallStarted?.(incomingCall);
          break;
        }

        case "call-response": {
          // Call was accepted or rejected
          if (currentCallRef.current && message.message === "accepted") {
            setCallInfo((prev) =>
              prev
                ? { ...prev, status: "connected", startTime: new Date() }
                : null,
            );
            setIsInCall(true);

            // Create offer since call was accepted
            if (peerConnectionRef.current) {
              const offer = await peerConnectionRef.current.createOffer();
              await peerConnectionRef.current.setLocalDescription(offer);
              signalingService.sendSignal(
                currentCallRef.current.calleeId,
                offer,
              );
            }
          } else if (message.message === "rejected") {
            endCall();
            setError("Call was rejected");
          }
          break;
        }

        case "call-ended": {
          endCall();
          break;
        }

        case "error": {
          setError(message.message || "Unknown error");
          endCall();
          break;
        }
      }
    });

    signalingUnsubscribeRef.current = unsubscribe;

    return () => {
      unsubscribe();
    };
  }, [userId, onCallStarted]);

  // Connect to signaling server
  useEffect(() => {
    if (userId) {
      signalingService.connect(userId).catch(console.error);
    }

    return () => {
      signalingService.disconnect();
    };
  }, [userId]);

  // Start an outgoing call
  const startCall = useCallback(
    async (targetUserId: string, callType: "audio" | "video") => {
      try {
        setError(null);

        // Initialize local media
        const stream = await initializeLocalStream(callType);

        // Create peer connection
        const pc = createPeerConnection(stream);

        // Create call info
        const newCall: CallInfo = {
          callId: `${userId}-${targetUserId}-${Date.now()}`,
          callerId: userId,
          calleeId: targetUserId,
          callType,
          status: "calling",
        };

        currentCallRef.current = newCall;
        setCallInfo(newCall);

        // Send call request via signaling
        signalingService.sendCallRequest(
          targetUserId,
          callType,
          newCall.callId,
        );

        // Create offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        // Send the offer through signaling
        signalingService.sendSignal(targetUserId, offer);
      } catch (err) {
        console.error("Error starting call:", err);
        setError("Failed to start call");
        endCall();
      }
    },
    [userId, initializeLocalStream, createPeerConnection],
  );

  // Answer an incoming call
  const answerCall = useCallback(
    async (incomingCall: CallInfo) => {
      try {
        setError(null);

        // Initialize local media
        const stream = await initializeLocalStream(incomingCall.callType);

        // Create peer connection
        createPeerConnection(stream);

        // Send call acceptance
        signalingService.sendCallResponse(
          incomingCall.callerId,
          incomingCall.callId,
          true,
        );

        setCallInfo({
          ...incomingCall,
          status: "connected",
          startTime: new Date(),
        });
        setIsInCall(true);
      } catch (err) {
        console.error("Error answering call:", err);
        setError("Failed to answer call");
        // Send rejection
        signalingService.sendCallResponse(
          incomingCall.callerId,
          incomingCall.callId,
          false,
        );
      }
    },
    [initializeLocalStream, createPeerConnection],
  );

  // End the current call
  const endCall = useCallback(() => {
    // Stop local tracks
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Notify the other party
    if (currentCallRef.current) {
      signalingService.sendCallEnded(
        currentCallRef.current.calleeId === userId
          ? currentCallRef.current.callerId
          : currentCallRef.current.calleeId,
        currentCallRef.current.callId,
      );

      onCallEnded?.(currentCallRef.current);
    }

    setRemoteStream(null);
    setIsInCall(false);
    setCallInfo(null);
    currentCallRef.current = null;
  }, [localStream, userId, onCallEnded]);

  // Toggle audio
  const toggleAudio = useCallback(
    (enabled: boolean) => {
      if (localStream) {
        localStream.getAudioTracks().forEach((track) => {
          track.enabled = enabled;
        });
      }
    },
    [localStream],
  );

  // Toggle video
  const toggleVideo = useCallback(
    (enabled: boolean) => {
      if (localStream) {
        localStream.getVideoTracks().forEach((track) => {
          track.enabled = enabled;
        });
      }
    },
    [localStream],
  );

  return {
    localStream,
    remoteStream,
    isInCall,
    callInfo,
    error,
    startCall,
    answerCall,
    endCall,
    toggleAudio,
    toggleVideo,
  };
};

export default useWebRTCConnection;
