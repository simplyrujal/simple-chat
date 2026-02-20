import React, { createContext, useCallback, useContext, useState } from "react";
import { signalingService } from "../services/webrtc-signaling";
import { useAuth } from "/imports/ui/shared/hooks/auth/use-auth";

interface CallInfo {
  callId: string;
  callerId: string;
  calleeId: string;
  callType: "audio" | "video";
  status: "calling" | "ringing" | "connected" | "ended";
  startTime?: Date;
}

interface ICallContext {
  callInfo: CallInfo | null;
  setCallInfo: (info: CallInfo | null) => void;
  localStream: MediaStream | null;
  setLocalStream: (stream: MediaStream | null) => void;
  remoteStream: MediaStream | null;
  setRemoteStream: (stream: MediaStream | null) => void;
  isInCall: boolean;
  setIsInCall: (inCall: boolean) => void;
  initiateCall: (
    targetUserId: string,
    callType: "audio" | "video",
  ) => Promise<void>;
  answerCall: (callInfo: CallInfo) => Promise<void>;
  rejectCall: () => void;
  endCall: () => void;
}

const CallContext = createContext<ICallContext | undefined>(undefined);

export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error("useCall must be used within a CallProvider");
  }
  return context;
};

interface CallProviderProps {
  children: React.ReactNode;
}

const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

export const CallProvider: React.FC<CallProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const userId = user?._id || "";

  const [callInfo, setCallInfo] = useState<CallInfo | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isInCall, setIsInCall] = useState(false);

  const peerConnectionRef = React.useRef<RTCPeerConnection | null>(null);

  // Set up signaling message handler
  React.useEffect(() => {
    const unsubscribe = signalingService.onMessage(async (message) => {
      console.log("CallProvider received message:", message);

      switch (message.type) {
        case "call-request": {
          // Incoming call
          const incomingCall: CallInfo = {
            callId: message.callId!,
            callerId: message.from!,
            calleeId: userId,
            callType: message.callType as "audio" | "video",
            status: "ringing",
          };
          setCallInfo(incomingCall);
          break;
        }

        case "call-response": {
          if (message.message === "accepted") {
            setCallInfo((prev) =>
              prev
                ? { ...prev, status: "connected", startTime: new Date() }
                : null,
            );
            setIsInCall(true);

            // Create and send offer
            if (peerConnectionRef.current) {
              const offer = await peerConnectionRef.current.createOffer();
              await peerConnectionRef.current.setLocalDescription(offer);
              signalingService.sendSignal(callInfo!.calleeId, offer);
            }
          } else {
            // Call rejected
            endCall();
          }
          break;
        }

        case "call-ended": {
          endCall();
          break;
        }

        case "signal": {
          if (!peerConnectionRef.current || !message.signal) return;

          try {
            const signal = message.signal as
              | RTCSessionDescriptionInit
              | RTCIceCandidateInit;

            if ("sdp" in signal) {
              await peerConnectionRef.current.setRemoteDescription(
                new RTCSessionDescription(signal),
              );

              if (signal.type === "offer") {
                const answer = await peerConnectionRef.current.createAnswer();
                await peerConnectionRef.current.setLocalDescription(answer);
                signalingService.sendSignal(message.from!, answer);
              }
            } else if ("candidate" in signal) {
              await peerConnectionRef.current.addIceCandidate(
                new RTCIceCandidate(signal),
              );
            }
          } catch (err) {
            console.error("Error handling signal:", err);
          }
          break;
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userId, callInfo?.calleeId]);

  const createPeerConnection = useCallback(
    (stream: MediaStream) => {
      const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      pc.ontrack = (event) => {
        const [remoteMediaStream] = event.streams;
        setRemoteStream(remoteMediaStream);
      };

      pc.onicecandidate = (event) => {
        if (event.candidate && callInfo) {
          const targetId =
            callInfo.callerId === userId
              ? callInfo.calleeId
              : callInfo.callerId;
          signalingService.sendSignal(targetId, event.candidate.toJSON());
        }
      };

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
    [callInfo, userId],
  );

  const initiateCall = useCallback(
    async (targetUserId: string, callType: "audio" | "video") => {
      try {
        // Initialize local media
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: callType === "video",
        });
        setLocalStream(stream);

        // Create peer connection
        createPeerConnection(stream);

        // Create call info
        const newCall: CallInfo = {
          callId: `${userId}-${targetUserId}-${Date.now()}`,
          callerId: userId,
          calleeId: targetUserId,
          callType,
          status: "calling",
        };
        setCallInfo(newCall);

        // Send call request
        signalingService.sendCallRequest(
          targetUserId,
          callType,
          newCall.callId,
        );

        // Create offer
        if (peerConnectionRef.current) {
          const offer = await peerConnectionRef.current.createOffer();
          await peerConnectionRef.current.setLocalDescription(offer);
          signalingService.sendSignal(targetUserId, offer);
        }
      } catch (err) {
        console.error("Error initiating call:", err);
        endCall();
      }
    },
    [userId, createPeerConnection],
  );

  const answerCall = useCallback(
    async (incomingCall: CallInfo) => {
      try {
        // Initialize local media
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: incomingCall.callType === "video",
        });
        setLocalStream(stream);

        // Create peer connection
        createPeerConnection(stream);

        // Send acceptance
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
        signalingService.sendCallResponse(
          incomingCall.callerId,
          incomingCall.callId,
          false,
        );
        endCall();
      }
    },
    [createPeerConnection],
  );

  const rejectCall = useCallback(() => {
    if (callInfo) {
      signalingService.sendCallResponse(
        callInfo.callerId,
        callInfo.callId,
        false,
      );
    }
    endCall();
  }, [callInfo]);

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
    if (callInfo) {
      const targetId =
        callInfo.callerId === userId ? callInfo.calleeId : callInfo.callerId;
      signalingService.sendCallEnded(targetId, callInfo.callId);
    }

    setRemoteStream(null);
    setIsInCall(false);
    setCallInfo(null);
  }, [localStream, callInfo, userId]);

  return (
    <CallContext.Provider
      value={{
        callInfo,
        setCallInfo,
        localStream,
        setLocalStream,
        remoteStream,
        setRemoteStream,
        isInCall,
        setIsInCall,
        initiateCall,
        answerCall,
        rejectCall,
        endCall,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export default CallProvider;
