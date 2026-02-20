import { useWebRTCConnection } from "/imports/ui/modules/chat/hooks/use-webrtc-connection";
import { useAuth } from "/imports/ui/shared/hooks/auth/use-auth";

interface UseVideoCallReturn {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isInCall: boolean;
  callInfo: any;
  error: string | null;
  startVideoCall: (targetUserId: string) => Promise<void>;
  answerVideoCall: (callInfo: any) => Promise<void>;
  endVideoCall: () => void;
  toggleAudio: (enabled: boolean) => void;
  toggleVideo: (enabled: boolean) => void;
}

export const useVideoCall = (): UseVideoCallReturn => {
  const { user } = useAuth();
  const userId = user?._id || "";

  const {
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
  } = useWebRTCConnection({
    userId,
    onRemoteStream: (stream) => {
      console.log("Remote video stream received:", stream);
    },
    onCallStarted: (callInfo) => {
      console.log("Video call started:", callInfo);
    },
    onCallEnded: (callInfo) => {
      console.log("Video call ended:", callInfo);
    },
  });

  const startVideoCall = async (targetUserId: string) => {
    await startCall(targetUserId, "video");
  };

  const answerVideoCall = async (incomingCall: any) => {
    await answerCall(incomingCall);
  };

  const endVideoCall = () => {
    endCall();
  };

  return {
    localStream,
    remoteStream,
    isInCall,
    callInfo,
    error,
    startVideoCall,
    answerVideoCall,
    endVideoCall,
    toggleAudio,
    toggleVideo,
  };
};

export default useVideoCall;
