import { Meteor } from "meteor/meteor";
import { useCallback, useEffect, useRef, useState } from "react";

export type CallStatus = "idle" | "calling" | "ringing" | "connected" | "ended";

export interface CallState {
  status: CallStatus;
  callId: string | null;
  callType: "audio" | "video" | null;
  remoteUserId: string | null;
  remoteUserName: string | null;
}

export interface UseWebRTCReturn {
  callState: CallState;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  startCall: (remoteUserId: string, callType: "audio" | "video") => void;
  answerCall: (callId: string) => void;
  rejectCall: (callId: string) => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  isMuted: boolean;
  isVideoOff: boolean;
}

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

export const useWebRTC = (): UseWebRTCReturn => {
  const [callState, setCallState] = useState<CallState>({
    status: "idle",
    callId: null,
    callType: null,
    remoteUserId: null,
    remoteUserName: null,
  });
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const currentUserId = Meteor.userId();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getSignalingUrl = (): string => {
    if (typeof window === "undefined") return "ws://localhost:8080";
    const host = window.location.hostname;
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${host}:8080`;
  };

  const signalingUrl = isClient ? getSignalingUrl() : "ws://localhost:8080";

  const isMediaDevicesAvailable = (): boolean => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return false;
    }
    return !!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia;
  };

  const isSecureContext = (): boolean => {
    if (typeof window === "undefined") return false;
    const hostname = window.location.hostname.toLowerCase();
    if (window.location.protocol === "https:") return true;
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;
    return window.location.protocol === "https:";
  };

  useEffect(() => {
    if (!isClient) return;
    
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connect = () => {
      try {
        ws = new WebSocket(signalingUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log("WebRTC Signaling connected to:", signalingUrl);
          if (currentUserId) {
            ws?.send(
              JSON.stringify({
                type: "register",
                userId: currentUserId,
              })
            );
          }
        };

        ws.onmessage = async (event) => {
          try {
            const message = JSON.parse(event.data);
            console.log("WebRTC Received message:", message);

            switch (message.type) {
              case "registered":
                console.log("Registered with signaling server");
                break;

              case "call-request":
                handleIncomingCall(message);
                break;

              case "call-response":
                handleCallResponse(message);
                break;

              case "call-ended":
                handleCallEnded(message);
                break;

              case "signal":
                await handleSignal(message);
                break;

              case "error":
                console.error("Signaling error:", message.message);
                break;
            }
          } catch (e) {
            console.error("Failed to parse WebRTC message:", e);
          }
        };

        ws.onclose = () => {
          console.log("WebRTC Signaling disconnected");
          reconnectTimeout = setTimeout(() => {
            if (ws?.readyState === WebSocket.CLOSED) {
              connect();
            }
          }, 3000);
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
      } catch (error) {
        console.error("Failed to connect to signaling server:", error);
      }
    };

    connect();

    return () => {
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (ws) ws.close();
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [currentUserId, isClient, signalingUrl]);

  const createPeerConnection = (): RTCPeerConnection => {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    pc.onicecandidate = (event) => {
      if (event.candidate && wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "signal",
            targetUserId: callState.remoteUserId,
            signal: {
              type: "candidate",
              candidate: event.candidate,
            },
          })
        );
      }
    };

    pc.ontrack = (event) => {
      console.log("Received remote track:", event.streams[0]);
      setRemoteStream(event.streams[0]);
    };

    pc.oniceconnectionstatechange = () => {
      console.log("ICE Connection State:", pc.iceConnectionState);
      if (pc.iceConnectionState === "connected") {
        setCallState((prev) => ({ ...prev, status: "connected" }));
      } else if (pc.iceConnectionState === "disconnected" || pc.iceConnectionState === "failed") {
        handleEndCall();
      }
    };

    return pc;
  };

  const handleIncomingCall = async (message: {
    from: string;
    callId: string;
    callType: "audio" | "video";
  }) => {
    setCallState({
      status: "ringing",
      callId: message.callId,
      callType: message.callType,
      remoteUserId: message.from,
      remoteUserName: message.from,
    });
  };

  const handleCallResponse = async (message: {
    from: string;
    callId: string;
    message: "accepted" | "rejected";
  }) => {
    if (message.message === "accepted") {
      console.log("Call accepted, creating offer...");
      setCallState((prev) => ({
        ...prev,
        status: "calling",
        callId: message.callId,
      }));

      try {
        const pc = createPeerConnection();
        peerConnectionRef.current = pc;

        if (localStream) {
          localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
          });
        }

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        wsRef.current?.send(
          JSON.stringify({
            type: "signal",
            targetUserId: message.from,
            signal: offer,
          })
        );
      } catch (error) {
        console.error("Error creating offer:", error);
      }
    } else {
      console.log("Call rejected");
      handleEndCall();
      setCallState({
        status: "idle",
        callId: null,
        callType: null,
        remoteUserId: null,
        remoteUserName: null,
      });
    }
  };

  const handleSignal = async (message: {
    from: string;
    signal: RTCSessionDescriptionInit | { type: string; candidate: RTCIceCandidateInit };
  }) => {
    const pc = peerConnectionRef.current;

    if (!pc) {
      console.log("Creating peer connection for incoming signal");
      const newPc = createPeerConnection();
      peerConnectionRef.current = newPc;

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          newPc.addTrack(track, localStream);
        });
      }

      if (message.signal.type === "offer") {
        try {
          await newPc.setRemoteDescription(message.signal);
          const answer = await newPc.createAnswer();
          await newPc.setLocalDescription(answer);

          wsRef.current?.send(
            JSON.stringify({
              type: "signal",
              targetUserId: message.from,
              signal: answer,
            })
          );
        } catch (error) {
          console.error("Error handling offer:", error);
        }
      } else if (message.signal.type === "answer") {
        try {
          await newPc.setRemoteDescription(message.signal);
        } catch (error) {
          console.error("Error handling answer:", error);
        }
      } else if (message.signal.type === "candidate") {
        try {
          await newPc.addIceCandidate(message.signal.candidate);
        } catch (error) {
          console.error("Error handling ICE candidate:", error);
        }
      }
    } else {
      if (message.signal.type === "offer") {
        try {
          await pc.setRemoteDescription(message.signal);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          wsRef.current?.send(
            JSON.stringify({
              type: "signal",
              targetUserId: message.from,
              signal: answer,
            })
          );
        } catch (error) {
          console.error("Error handling offer:", error);
        }
      } else if (message.signal.type === "answer") {
        try {
          await pc.setRemoteDescription(message.signal);
        } catch (error) {
          console.error("Error handling answer:", error);
        }
      } else if (message.signal.type === "candidate") {
        try {
          await pc.addIceCandidate(message.signal.candidate);
        } catch (error) {
          console.error("Error handling ICE candidate:", error);
        }
      }
    }
  };

  const handleCallEnded = (message: { from: string; callId: string }) => {
    handleEndCall();
  };

  const handleEndCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    setRemoteStream(null);
    setCallState({
      status: "idle",
      callId: null,
      callType: null,
      remoteUserId: null,
      remoteUserName: null,
    });
  };

  const getMediaStream = async (callType: "audio" | "video"): Promise<MediaStream | null> => {
    console.log("Getting media stream, checking prerequisites...");
    
    // Check if we're in a browser environment
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      console.error("Not in browser environment");
      alert("Cannot access camera/microphone from server-side.");
      return null;
    }
    
    // Check if MediaDevices exists
    if (!navigator.mediaDevices) {
      console.error("MediaDevices not available in this browser");
      alert("Your browser does not support camera/microphone access.");
      return null;
    }
    
    // Warn about secure context but try anyway
    if (!isSecureContext()) {
      console.warn("Not a secure context (HTTPS/localhost). Camera/microphone may be blocked.");
      console.log("Current URL:", window.location.href);
    }
    
    try {
      const constraints: MediaStreamConstraints = {
        audio: true,
        video: callType === "video" ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        } : false
      };
      
      console.log("Requesting media with constraints:", constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("Got media stream:", stream);
      return stream;
    } catch (error: any) {
      console.error("Error getting media stream:", error.name, error.message);
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        alert("Camera/Microphone access denied.\n\nPlease:\n1. Click the camera icon in browser address bar\n2. Allow camera and microphone permissions");
      } else if (error.name === "NotFoundError") {
        alert("No camera or microphone found.\n\nPlease connect a camera/microphone to your device.");
      } else if (error.name === "NotReadableError") {
        alert("Camera or microphone is already in use.\n\nPlease close other apps using camera/microphone.");
      } else if (error.name === "NotSupportedError") {
        alert("Camera/microphone not supported.\n\nThis feature requires HTTPS or localhost.");
      } else {
        alert(`Error: ${error.name}\n${error.message}`);
      }
      return null;
    }
  };

  const startCall = useCallback(
    async (remoteUserId: string, callType: "audio" | "video") => {
      console.log("Starting call, isClient:", isClient);
      const stream = await getMediaStream(callType);
      if (!stream) {
        console.error("Failed to get media stream");
        return;
      }
      setLocalStream(stream);
      setIsMuted(false);
      setIsVideoOff(callType === "video" ? false : true);

      const callId = `call-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setCallState({
        status: "calling",
        callId,
        callType,
        remoteUserId,
        remoteUserName: remoteUserId,
      });

      wsRef.current?.send(
        JSON.stringify({
          type: "call-request",
          targetUserId: remoteUserId,
          callId,
          callType,
        })
      );
    },
    []
  );

  const answerCall = useCallback(
    async (callId: string) => {
      const callType = callState.callType || "audio";
      const stream = await getMediaStream(callType);
      if (!stream) {
        console.error("Failed to get media stream");
        return;
      }
      setLocalStream(stream);
      setIsMuted(false);
      setIsVideoOff(callType === "video" ? false : true);

      setCallState((prev) => ({ ...prev, status: "connected" }));

      wsRef.current?.send(
        JSON.stringify({
          type: "call-response",
          targetUserId: callState.remoteUserId,
          callId,
          message: "accepted",
        })
      );
    },
    [callState.callType, callState.remoteUserId]
  );

  const rejectCall = useCallback(
    (callId: string) => {
      wsRef.current?.send(
        JSON.stringify({
          type: "call-response",
          targetUserId: callState.remoteUserId,
          callId,
          message: "rejected",
        })
      );
      setCallState({
        status: "idle",
        callId: null,
        callType: null,
        remoteUserId: null,
        remoteUserName: null,
      });
    },
    [callState.remoteUserId]
  );

  const endCall = useCallback(() => {
    if (callState.callId && callState.remoteUserId) {
      wsRef.current?.send(
        JSON.stringify({
          type: "call-ended",
          targetUserId: callState.remoteUserId,
          callId: callState.callId,
        })
      );
    }
    handleEndCall();
  }, [callState.callId, callState.remoteUserId]);

  const toggleMute = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  }, [localStream]);

  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  }, [localStream]);

  return {
    callState,
    localStream,
    remoteStream,
    startCall,
    answerCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleVideo,
    isMuted,
    isVideoOff,
  };
};
